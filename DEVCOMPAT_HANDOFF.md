# GTG Core dev 环境兼容战 — 交接文档（2026-08-22 01:00 状态）

> 给接手 AI 的完整上下文。先读本文件 + 本文末尾的"关键文件"清单，再动手。
> **重大进展：游戏已 BUILD SUCCESSFUL 完整启动**（原版 bootstrap 4.8s + mod 加载全过）。

## 一、项目背景

- 仓库：`D:\GTGCore-Main`（GitHub: andypeng1/GTGCore-Main），GTG 整合包核心 mod（modid=gtgcore，Forge 1.20.1 + GTCEu 7.5.3，Java 17）
- 任务：**让 dev 环境（`./gradlew runClient`）带着 run/mods 里 105 个 mod 完整启动**
- 用户是中文开发者，中文交流；用户会主动要求 git 操作，提交前先确认真实改动

## 二、核心根因（最重要，两个）

### 根因 1：`mixin.refMapRemappingFile` 属性名缺 `env` 段（build.gradle 已修）

```groovy
// 错误（remapRefMap 机制静默失效）：
property 'mixin.refMapRemappingFile', '.../output.srg'
// 正确（mixin 0.8.5 的 REFMAP_REMAP_RESOURCE 选项名）：
property 'mixin.env.refMapRemappingFile', '.../output.srg'
```

- 修好后所有 mod 的 refmap 被 RemappingReferenceMapper 正确反查（日志出现 `Remapping refMap xxx.json using ...output.srg`）
- **效果**：原版目标的 @Inject/@Redirect 大量自动修复（modernfix checkAliveAfterCap 等）

### 根因 2：dev 环境类域分裂（原版 MCP 域 vs mod 发布版 SRG 域）

| 目标 | dev 类名 | 注入 method 值需要 |
|---|---|---|
| 原版类（net/minecraft、com/mojang） | MCP 域（`tick`） | MCP 名（refmap 反查或 remap=false 均可） |
| mod 类（com/Polarice3/Goety 等发布版） | **SRG 域**（`m_8119_`） | **SRG 名**（refmap 反查后又被 remapRefMap 反查回 MCP → 错） |

- **mod 间 mixin 无解**（refmap 反查 + remapRefMap 双重反查必然错）→ **逐个禁用**（disable_*.js）

## 三、修复体系（src/devcompat/resources/coremods/ 下，仅 dev 生效）

### 方案 A：disable_*.js（strip 注解 → mixin 空壳）
用于无法绕过的注入（mod 间 mixin、写 final @Mutable 字段的 perf mixin）：
- `disable_modernfix_state_def.js`（state_definition_construct：@Shadow 实例引用字段 null NPE）
- `disable_modernfix_mapped_registry.js`（compact_mojang_registries：PUTFIELD 写 final lifecycles）
- `disable_revelationfix_goety.js`（goety.OwnedMixin：mod 间注入 SRG 域）
- 早期：`disable_endinglib_personal_rule.js`、`disable_playeranimator_player.js`、`disable_goety_player.js`、`disable_player_mixins_batch.js`（14 个 Player 系批量）、`disable_modernfix_dre.js` 等

**注意**：只 strip 方法/字段级注解，**保留类级 @Mixin**（否则 PREPARE 报 "missing an @Mixin annotation"）。

### 方案 B：auto_srg_compat.js（给目标类补 SRG 名成员 + 调用/字段改写）
由 `devtools/GenerateCompatJs.java` 自动生成（改生成器后重跑）。能力清单：
1. **@Shadow 字段补桥接**（mixin 不允许字段别名——alias 目标必须 private）：实例字段补壳（基本类型安全，引用类型 null 需配合 #4）；static 字段在 `<clinit>` 末尾用 MCP 字段值初始化（Bootstrap.LOGGER 等）
2. **@Overwrite 方法补桥接**（@Overwrite 不走 remap，按 SRG 名匹配）+ **调用改写**（把调用者类里对 MCP 原方法的调用改写成 SRG 名——dev 原版字节码调用 MCP 名，不改则被覆盖的桥接永远不被调用，如 StateDefinition.createFromMap 调 populateNeighbours→m_61133_；**调用者可能在别的类，需扫描所有 jar + recomp jar**）
3. **指令内 SRG 引用扫描**（mixin <clinit> 或普通 mod 类写死的 GETSTATIC f_XXX / INVOKEVIRTUAL m_XXX，如 Fluids.f_76191_、Util.m_137583_）：**方法引用→补桥接；字段引用→在引用处改写为 MCP 字段名**（接口 static 字段无法补桥接——接口字段必须 public static final 且引用类型无常量值 → ClassFormatError 0x9）
4. **清除 @Shadow 对应 MCP 字段的 ACC_FINAL**（@Mutable 语义——fix_injections 把 PUTFIELD 改写为真实 MCP 字段，不清 final 会 IllegalAccessError）
5. **接口方法补 public abstract**（接口方法非法 protected → ClassFormatError 0x4）
6. **static 桥接**（static @Shadow/@Overwrite：不加载 this、INVOKESTATIC；static 校验 compareFlags）
7. **long/double 参数双 slot**（参数加载 slot 按 getSize 累计）

### 方案 C：fix_injections.js（修改注入注解值 + @Shadow aliases + 字段引用改写）
由 `devtools/GenerateFixInjections2.java` 自动生成（含 gson.jar 解析 refmap）。能力清单：
1. **remap=false**：注入注解加 `remap=false`（必须用 JS 原语 `false`，`Boolean(false)` 是 NativeBoolean 类型不匹配失效；已有 remap 键强制改 false）
2. **method/target 值替换**（toFullName：method → `name(desc)` 不能带 owner；target → 全名 `Lowner;MCPname(desc)`）
3. **@Shadow 方法加 aliases=[MCP名]**（apply 阶段 attachFields/findMethod 按别名命中真实方法；**字段不做 aliases**——alias 目标必须 private，真实 MCP 字段几乎都是非 private → "Non-private field cannot be aliased"）
4. **@Shadow 字段引用改写**（fieldRefMap）：mixin 字节码里 GETFIELD/PUTFIELD f_XXX → 真实 MCP 字段（**含无 @Shadow 声明的指令引用**，如 modernfix WallBlockMixin handler 直接 getfield f_49792_）；owner 匹配 target 类**或 mixin 类自身**（patch 前 owner 是 mixin 类）
5. **mod 目标注入：refmap 映射替换为 SRG 名**（mod 类发布版 SRG 域：读各 jar 的 *.refmap.json，method 值 → `m_XXX_(desc)`，target 值 → `Lowner;m_XXX_(desc)`；配合 remap=false 防反查）
6. **fixStr 按类名匹配**（fixes[i][0] === clsName——**否则同名 method 值（如 'tick'）被其他类的条目污染**）

### 方案 D：fix_ferritecore_handler.js（重写 @Redirect handler 方法体）
FerriteCore FastMapStateHolderMixin.getNeighborFromFastMap 无条件解引用 globalTable（map.size()==1 时不初始化）→ NPE。**重写方法体**加 `if (globalTable != null) ... else return table.get(...)` fallback。**不能简单禁用该 mixin**——禁用后 @Redirect 失效，setValue 走原版 Table.get，撞上 CrashNeighborTable（ferritecore 的非法访问保护）→ UnsupportedOperationException。

### 手修（生成产物直接改，非生成器）
- `embeddium_minecraft_client_compat.js` / `endinglib_time_compat.js`：nArgs 参数计数 bug（把 desc 每个字符当参数 → 42 个 aload VerifyError；L 分支漏 nArgs++ → 0 参数栈错乱）
- `modernfix_suspend_compat.js`：boolean 参数用 ILOAD（循环 ALOAD 全错）

## 四、错误修复链（按出现顺序，全部已解决）

| 崩溃 | 修复 |
|---|---|
| modernfix checkAliveAfterCap @Redirect 失败 | 根因 1（refMapRemappingFile 属性名） |
| Minecraft.setScreen VerifyError（42 aload） | embeddium/endinglib nArgs 计数 |
| doWorldLoad VerifyError（boolean ALOAD） | modernfix_suspend_compat ILOAD |
| Oculus @Shadow f_83924_ 找不到 | GenerateCompatJs 补 com/mojang target |
| embeddium @Overwrite m_233612_ 找不到 | @Overwrite 扫描补桥接 |
| m_96149_/f_96140_ STATIC 不匹配 | static 桥接支持 |
| Bootstrap.LOGGER NPE | static 字段 <clinit> 初始化 |
| StateDefinition f_61048_ NPE | 禁用 state_def mixin |
| revelationfix @Shadow m_21204_ 找不到 | @Shadow 方法 aliases（values 为 null 需先建 ArrayList） |
| 注解 values 出现 JS 函数 | aliasMap 用 Object.create(null) + hasOwnProperty（`aliasMap['toString']` 命中原型） |
| Non-private field cannot be aliased | @Shadow 字段不走 aliases，改补桥接 |
| NoSuchFieldError f_76191_（Fluids.EMPTY） | 指令内 SRG 引用扫描 |
| 接口 illegal modifiers 0x4/0x9 | 接口补 abstract 方法；接口字段改引用改写 |
| IllegalAccessError m_76145_（protected 跨类） | 桥接方法改 public |
| ferritecore_globalTable NPE | 字段引用改写（owner 含 mixin 类自身）→ 后改为 handler 重写（方案 D） |
| getVanillaPropertyMap NPE | 字段引用改写 GETFIELD |
| Update to final field lifecycles | PUTFIELD 改写 + MCP 字段清 ACC_FINAL |
| NoSuchMethodError Util.m_137583_ | 指令扫描扩展到所有类（不只 mixin） |
| FormattedText 接口字段 0x9 | 字段引用改写方案（不再补接口字段） |
| ferritecore CrashNeighborTable 保护 | 恢复 mixin + handler fallback 重写（方案 D） |
| WallBlock f_49792_ NoSuchFieldError | 指令内字段引用改写（无 @Shadow 声明） |
| revelationfix OwnedMixin tick 注入失败 | mod 目标 refmap→SRG 替换；fixStr 按类匹配；最后禁用该 mixin |
| Botania PollinateGoalMixin f_28063_ 找不到 | @Mixin(targets=...) 点分→斜杠统一（两生成器） |

**最终状态：`./gradlew runClient` → BUILD SUCCESSFUL（游戏完整启动）**

## 五、生成器运行命令

```bash
cd devtools
# 方案 B（需先有 build/createSrgToMcp/output.srg，由 gradle 任务生成）
javac -encoding UTF-8 -cp "asm-9.9.1.jar;asm-tree-9.9.1.jar" GenerateCompatJs.java
java -Dfile.encoding=UTF-8 -cp ".;asm-9.9.1.jar;asm-tree-9.9.1.jar" GenerateCompatJs \
    ..\run\mods ..\build\createSrgToMcp\output.srg ..\src\devcompat\resources\coremods\auto_srg_compat.js

# 方案 C（需要 gson.jar 解析 refmap）
javac -encoding UTF-8 -cp "asm-9.9.1.jar;asm-tree-9.9.1.jar;gson.jar" GenerateFixInjections2.java
java -Dfile.encoding=UTF-8 -cp ".;asm-9.9.1.jar;asm-tree-9.9.1.jar;gson.jar" GenerateFixInjections2 \
    ..\run\mods ..\build\createSrgToMcp\output.srg ..\src\devcompat\resources\coremods\fix_injections.js

# 重新打包 + 运行
cd ..
./gradlew.bat devCompatJar copyDevcompatToMods
./gradlew.bat runClient
```

**改动生成器后必须重新生成 js + devCompatJar + copyDevcompatToMods**；新增手写 js 必须注册到 `src/devcompat/resources/META-INF/coremods.json`。

## 六、关键文件

| 文件 | 说明 |
|---|---|
| `build.gradle` | `mixin.env.refMapRemappingFile`（注意 env 段）；runs 配置；devcompat sourceSet/jar/复制任务 |
| `devtools/GenerateCompatJs.java` | 生成 auto_srg_compat（桥接/改写/扫描，含 recomp jar 扫描） |
| `devtools/GenerateFixInjections2.java` | 生成 fix_injections（remap=false/aliases/字段改写/mod 目标 SRG 替换） |
| `devtools/asm-9.9.1.jar`、`asm-tree-9.9.1.jar`、`gson.jar` | 生成器依赖 |
| `src/devcompat/resources/META-INF/coremods.json` | CoreMod 注册表（新增必须注册） |
| `src/devcompat/resources/gtgcore.mixins.json` | devcompat 的 mixin 配置 |
| `src/devcompat/java/com/andypeng1/gtgcore/mixin/GTDevCompatMixinPlugin.java` | mixin 插件（preApply 调试打印待清理） |
| `run/mods/gtgcore-devcompat.jar` | dev 运行用的 jar（build/devcompat 也有，两个都会被加载） |

## 七、运行与验证

```bash
cd /d/GTGCore-Main
./gradlew runClient > /tmp/run.log 2>&1   # 后台跑，约 1-3 分钟
grep -a "BUILD SUCCESSFUL\|BUILD FAILED" /tmp/run.log
grep -a "Caused by\|FATAL" /tmp/run.log    # 定位崩溃
```
- 日志必须 `grep -a`（文件含非 UTF-8 字节）
- 崩溃链：`Mixin apply failed <config>:<mixin> -> <target>: <InvalidMixinException> <错误>`
- `.mixin.out/class/` 有转换后导出类（`mixin.debug.export=true`），可 javap 验证改写是否生效
- **注意**：`mixin.env.remapRefMap=true` 后日志出现 `Remapping refMap xxx.json` 是正常现象；`Reflective setAccessible(true) disabled` 是 netty 警告（非致命）

## 八、待清理（全部完成后）

1. `src/devcompat/resources/coremods/fix_injections.js` 里的 FIXINJ-DBG 调试打印（生成器 GenerateFixInjections2.java 的 makeTransformer 模板里 isDbg 段，删掉后重新生成）
2. `src/devcompat/java/com/andypeng1/gtgcore/mixin/client/PlayerStateDumpMixin.java` + gtgcore.mixins.json 注册（临时调试）
3. `GTDevCompatMixinPlugin.java` 的 preApply 调试打印（MIXIN VIEW / SELECTOR / REAL REMAP）
4. `build.gradle` 的 `mixin.debug.injectors`（verbose/export 可留）
5. `src/devcompat/resources/coremods/debug_player_methods.js`（临时打印）
6. 无用 devtools 临时文件（InspectPlayer/TestMatch/FullSim/DebugScan 等），保留两个生成器
7. `ResourceLocationCompatMixin.java` 源码文件可删（已不注册）
8. `gtgcore_devcompat` 的 `run/mods` 副本与 `build/devcompat` 重复加载问题（UniqueModListBuilder 报 2 个 mod——当前选择其一，无碍但可优化：删除 runtimeOnly files() 依赖或删 run/mods 副本）

## 九、踩坑记录

- `grep` 必须 `-a`（日志含非 UTF-8 字节）
- nashorn（coremod JS）：`Boolean(false)` 是 NativeBoolean 不是 java.lang.Boolean（mixin 读 remap 失效）→ 用原语 `false`；`@Shadow` 无参数时 AnnotationNode.values 为 null → 需先 `new java.util.ArrayList()`；`aliasMap` 用 `Object.create(null)` + hasOwnProperty（防 `aliasMap['toString']` 命中原型返回函数塞进注解）
- `@Inject method` 值不允许带 owner；@At target 必须全名
- mixin 类级 @Mixin 不能 strip；mixin 不允许非 private 字段/方法别名（alias 目标必须 private）
- TreeSet 去重比较器必须含 kind（`x[1]+"|"+x[0]`）——否则 @Overwrite 的 OM 条目被指令扫描的 M 条目挤掉，调用改写丢失
- `@Mixin(targets="net.minecraft...")` 是点分格式，解析必须 `.replace('.', '/')`
- fixStr 必须按类名匹配（同名 method 值跨类污染）
- 接口：方法只能补 public abstract（0x4 非法）；字段无法补桥接（0x9）→ 字段引用改改写
- dev 原版字节码调用 MCP 名——@Overwrite 覆盖的 SRG 桥接需要"调用改写"（含 recomp jar 里的调用者）
- ferritecore 的 @Redirect(remap=false, method=MCP 名) 在正式环境（SRG 域）本就不生效；dev 环境 remapRefMap 修复后它"过度生效"——这类 mixin 需要 handler 重写（方案 D）而非禁用（禁用撞 CrashNeighborTable）
- output.srg：FD 行 2 段无 desc；MD 行 4 段；同名 MCP 方法多 desc 会互相覆盖
- AdvancedAE（net/pedroksl/advanced_ae）未安装，ExtendedAE Plus 的 mixin 引用它 → "Cannot find class"（当前已通过，如复现再 disable）
