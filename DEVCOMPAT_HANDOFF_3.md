# GTG Core dev 兼容战 — 第三轮交接（2026-08-22 17:00 状态）

> 给接手 AI 的上下文。先读 DEVCOMPAT_HANDOFF.md（第一轮）→ DEVCOMPAT_HANDOFF_2.md（第二轮）→ 本文件。
> 本轮任务：`./gradlew runClient` 启动，修复连环崩溃。

## 一、本轮已解决（10 个连环崩溃，每个都是修好上一个才暴露下一个）

| # | 崩溃 | 修复 |
|---|---|---|
| 1 | `z1gned DeathArrowMixin` @Inject `onHit` 注入失败（mod 目标 SRG 域） | **fix_injections：mod 目标注入注解设 require=0 静默失效**（method 值保持 MCP 名不替换） |
| 2 | `NamespacedDefaultedWrapper` AbstractMethodError（DefaultedRegistry 接口被补 abstract 桥接） | **接口桥接改补 default 方法**（Java 8+ 带方法体，实现类自动继承） |
| 3 | `Codecs.<clinit>` NoSuchMethodError `DefaultedRegistry.m_194605_`（调用方已加载，改写无效） | 接口 default 兜底：**JVM 接口方法解析沿父接口链查 default**（Registry 补 default m_194605_ 即够） |
| 4 | `Renderable` VerifyError "Illegal type at constant pool entry" | **MethodInsnNode 的 itf 标志**：接口方法调用必须 `itf=true`（写 InterfaceMethodref） |
| 5 | `Component.translatable` ICCE "must be InterfaceMethodref" | **接口 static 方法调用（INVOKESTATIC）也必须 itf=true** |
| 6 | `AppEngAdvancementTrigger` 未实现 `CriterionTrigger.getId`（AE2 SRG 域 vs dev 接口 MCP 域） | **IM 桥接：给实现类补 MCP 名方法**（调类里已有的 SRG 方法） |
| 7 | `CertusQuartzClusterBlock` waterlogged 属性未注册（`AEBaseBlock.m_7926_` override 失效） | **OV 桥接：给原版父类补 SRG 名桥接 + 调用改写**（原版内部 MCP 调用→SRG 名，动态分派到 mod 子类） |
| 8 | modernfix `checkAliveAfterCap` @Redirect 回归（OV 调用改写破坏 @At INVOKE） | **atTargetKeys：被 @At target 引用的方法不做 OV**（collectAtTargetsAll 独立预扫描） |
| 9 | `MappedRegistry.m_255331_` 无限递归 | **桥接方法体用 INVOKESPECIAL**（不虚分派，调用改写只认 INVOKEVIRTUAL/INVOKESTATIC） |
| 10 | `Property.getPossibleValues` AbstractMethodError（INVOKESPECIAL 调抽象方法） | **M 桥接按目标方法是否抽象选指令**：抽象→INVOKEVIRTUAL（动态分派到 IM 桥接）；具体→INVOKESPECIAL；**IM 扩展到抽象类**（extends 链） |

## 二、当前 bug（未解决）

**崩溃**：`Cannot set property BooleanProperty{name=snowy} as it does not exist in Block{minecraft:air}`

**栈**：`Blocks.<clinit> → GrassBlock.<init> → SnowyDirtBlock.<init> → registerDefaultState(setValue(SNOWY))` → StateHolder.setValue 抛。

**已定位的根因**：
- OV 调用改写把 **Block.<init> 内部对 createBlockStateDefinition 的调用**改写成 `m_7926_`。
- 原版子类（草方块等，MCP 域）override 的是 `createBlockStateDefinition`（MCP 名），**没有 m_7926_** → 动态分派落到 **Block.m_7926_ 桥接** → 桥接体 `INVOKESPECIAL Block.createBlockStateDefinition`（空实现）→ **子类属性注册逻辑丢失**（snowy 未注册）→ setValue 炸。
- AE2 案例成功是因为 AEBaseBlock 自己声明了 `m_7926_`（SRG 域），分派直接命中它；原版子类没有。

**修复方向（已验证可行，未实施）**：**调用改写跳过桥接方法体**：
1. Block.m_7926_ 桥接体改用 **INVOKEVIRTUAL 调 createBlockStateDefinition**（动态分派→原版子类 MCP override；抽象方法也 OK，同样动态分派到 IM 桥接）——即 M/OV/OM 桥接统一 INVOKEVIRTUAL；
2. **generate() 里 callRewrites 的 JS 代码先于 missing 桥接代码输出**（先改写原始方法，后补桥接）——桥接方法体就不会被调用改写命中 → 不递归也不丢分派。
3. 预期效果：原版子类（MCP 域）走 `m_7926_`→桥接→INVOKEVIRTUAL createBlockStateDefinition→命中子类 override ✅；mod 子类（SRG 域）直接命中自己的 m_7926_ ✅。

## 三、本轮生成器改动（devtools/GenerateCompatJs.java）

按时间顺序（全部已编译验证，`./gradlew devCompatJar copyDevcompatToMods` 通过）：

1. **按目标类合并 transformer 块**（blocks Map）——CoreMod targets 是 Map，同一类多个块只执行一个（Codecs 字段改写+方法改写互斥的教训）
2. **scanInsnRefs**：INVOKEINTERFACE → missing（补 default 桥接）+ methodRefRewrites（调用改写双保险）
3. **接口实例方法补 default**（ACC_PUBLIC 带方法体，非 abstract）
4. **调用指令按 owner 是否接口**：INVOKEINTERFACE + itf=true；**接口 static 也 itf=true**
5. **recomp jar 扫描**（第 4 个参数）：接口 owner、接口方法表（含继承展开）、全部类方法表、父类链、抽象类抽象方法表、抽象方法集合
6. **IM 桥接**（接口 + 抽象类）：实现类补 MCP 名方法调 SRG 方法——**srg 匹配用 desc+srgToMcp 精确匹配**（mcpToSrg 反查会被同名方法覆盖，如 getId→m_83633_ 覆盖 m_7295_）
7. **OV 桥接**：mod 类 SRG override 方法 → 原版父类补 SRG 桥接 + 调用改写（collectCallRewrites 认 OV）
8. **atTargetKeys**：@At(INVOKE) target 引用的方法跳过 OV（collectAtTargetsAll 在 scanJar 前预扫描）
9. **桥接方法体指令**：owner 接口→INVOKEINTERFACE；M/MS 目标抽象→INVOKEVIRTUAL、具体→INVOKESPECIAL；OM/OV→INVOKESPECIAL；IM→INVOKESPECIAL
10. **mcp.equals(srg) 跳过**（同名映射桥接会无限递归）

## 四、生成器运行命令（关键）

```bash
cd devtools
javac -encoding UTF-8 -cp "asm-9.9.1.jar;asm-tree-9.9.1.jar" GenerateCompatJs.java
java -Dfile.encoding=UTF-8 -cp ".;asm-9.9.1.jar;asm-tree-9.9.1.jar" GenerateCompatJs \
    ../run/mods ../build/createSrgToMcp/output.srg ../src/devcompat/resources/coremods/auto_srg_compat.js \
    "/c/Users/Hi/.gradle/caches/forge_gradle/minecraft_user_repo/net/minecraftforge/forge/1.20.1-47.4.22_mapped_official_1.20.1/forge-1.20.1-47.4.22_mapped_official_1.20.1-recomp.jar"
# 注意：第 4 个参数（recomp jar）必须传！接口/抽象类/override 体系依赖它。
# 产物 51MB，Nashorn 加载约 15-30 秒（正常）。

# fix_injections（本轮的 require=0 改动已落盘，勿回退）
javac -encoding UTF-8 -cp "asm-9.9.1.jar;asm-tree-9.9.1.jar;gson.jar" GenerateFixInjections2.java
java -Dfile.encoding=UTF-8 -cp ".;asm-9.9.1.jar;asm-tree-9.9.1.jar;gson.jar" GenerateFixInjections2 \
    ../run/mods ../build/createSrgToMcp/output.srg ../src/devcompat/resources/coremods/fix_injections.js

cd ..
./gradlew.bat devCompatJar copyDevcompatToMods
./gradlew.bat runClient > /tmp/run.log 2>&1   # 日志必须 grep -a
```

## 五、本轮关键认知（重要，勿重蹈）

1. **mixin 0.8.5 的 selector 反查是全局的**（RemappingReferenceMapper 对结果做 SRG→MCP 字符串替换），**注解 remap=false 无效**（AnnotatedMethodInfo.remap 无条件走 ReferenceMapper）。mod 目标（SRG 域）注入在 dev 环境无解 → require=0 静默失效（已实现）。
2. **接口不能补 abstract 桥接**（实现类必须实现 → AbstractMethodError）；**补 default**（实现类自动继承）。
3. **接口方法调用必须 InterfaceMethodref**：INVOKEINTERFACE 和 INVOKESTATIC（接口 static）都要 itf=true。
4. **发布版 mod 类在 dev 环境是 SRG 域且不被 Forge remap**：实现接口/抽象类缺 MCP 名方法（IM 桥接）；override 原版方法不生效（OV 桥接 + 调用改写）。
5. **调用改写（INVOKEVIRTUAL/INVOKESTATIC → SRG 名）会误伤**：桥接方法体（递归）、@At INVOKE target（匹配失败）。
6. **mcpToSrg 按名字反查会被覆盖**（同名多 desc/多类），必须用 desc+srgToMcp 精确匹配。
7. **INVOKESPECIAL 调抽象方法会 AbstractMethodError**；INVOKEVIRTUAL 调接口方法会 ICCE。

## 六、当前文件状态

- `devtools/GenerateCompatJs.java`：已含全部改动，**下一步修改点：generate() 循环顺序（callRewrites 先于 missing 输出）+ 桥接统一 INVOKEVIRTUAL（见第二节方向 1、2）**
- `src/devcompat/resources/coremods/auto_srg_compat.js`：51MB 生成产物（targets=5511, members=25214）
- `src/devcompat/resources/coremods/fix_injections.js`：require=0 方案（R 条目）已生成
- `devtools/GenerateFixInjections2.java`：mod 目标分支改为 R 条目，@Desc 机制已彻底删除

## 七、验证要点

- 日志 grep：`grep -a "Caused by\|BUILD" /tmp/run.log`
- 崩溃链已从 mod 加载早期（DeathArrowMixin）推进到 **Blocks.<clinit>**（原版注册表初始化）——说明 mixin 层已全通
- 修复第二节方向后预期：继续推进（后面可能还有原版/其他 mod 的同类 override 问题，OV 机制已覆盖）
