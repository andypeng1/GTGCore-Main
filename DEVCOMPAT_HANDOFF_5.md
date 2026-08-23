# GTG Core dev 兼容战 — 第五轮交接（2026-08-23 18:10 状态）

> 给接手 AI 的上下文。先读 DEVCOMPAT_HANDOFF.md（第一轮）→ DEVCOMPAT_HANDOFF_2.md → DEVCOMPAT_HANDOFF_3.md → DEVCOMPAT_HANDOFF_4.md → 本文件。
> 任务：`./gradlew runClient` 启动并**进入世界正常游玩**（dev 环境 105 mod，Forge 1.20.1 + GTCEu 7.5.3，Java 17，官方 mappings）。

## 一、当前进度（重要）

**已推进到：世界创建成功 → 世界渲染第一帧崩溃**（run87，2026-08-23 17:54）。
主菜单 ✅ 单人游戏列表 ✅ 创建世界（experimental 页）✅ 世界加载 ✅ **渲染 ❌（当前阻塞项）**。

自 HANDOFF_4 以来的进展（run70→run87，解决 15+ 个崩溃）：

1. **SimpleReloadInstance NPE** → 生成器 iface_def 的 default 空实现返回 `CompletableFuture.completedFuture(null)`（HANDOFF_4 的"下一步"已完成并验证）
2. **OOM 根因解决**：build.gradle 加 `jvmArgs '-Xmx8G', '-Xms2G'`，移除 `mixin.debug.export`/`mixin.debug.injectors`（run86 在 SelectWorldScreen 点击时 OOM → run87 用 8G 成功创建世界，无 OOM）
3. **新 coremod 一批**（见第三节清单）：unfinal_abstract_container_event_handler（sodium ConfigCorruptedScreen final setDragging）、guard_bewlr（entityModelSet null 守卫）、disable_jade_translation_check（isDevEnv→ICONST_0）、disable_sodium_vertexbuffer、disable_goety_netherstar_shaders（清空事件 handler 方法体——AutomaticEventSubscriber 先于 coremod 注册，strip 注解无效）
4. 其余已解决：GlassModel 白方块（IM 接口链）、ANFakePlayer（final 父类跳过）、ModMenuButtonWidget 递归、sodium setSamplersManually、NetherStarShaders ATAUniform、modernui EditBox（配置层移除）、Jade 翻译检查等

## 二、当前阻塞项（run87）——`m_6117_` AbstractMethodError

### 崩溃现象（run87.log / crash-2026-08-23_17.54.34-client.txt）

```
java.lang.AbstractMethodError: Receiver class net.minecraft.client.player.LocalPlayer
  does not define or inherit an implementation of the resolved method 'boolean m_6117_()'
  of abstract class net.minecraft.world.entity.player.Player.
  Selected method is 'abstract boolean net.minecraft.client.player.LocalPlayer.m_6117_()'.
	at com.Polarice3.Goety.client.events.ClientEvents.RenderWorldLast(ClientEvents.java:763)
```

- 位置：世界渲染的 RenderLevelStageEvent（Goety 事件），**世界已加载成功**，第一帧渲染即崩
- `m_6117_` = `isUsingItem`（LivingEntity 方法，Player 继承）
- Goety ClientEvents 同时被 3 个 mixin 处理：`mixins.goety_revelation.json:ClientEventsMixin`、`revelationfix.mixins.json:goety.ClientEventsMixin`、`revelationfix.mixins.json:gr.ClientEventsMixin`（这些 @Shadow 目标是 playBossMusic，与 m_6117_ 无关——已排除）

### 已确认的事实链（本轮的调查结论）

1. **JS 侧正确**：auto_srg_compat.js 给 LocalPlayer 生成 PUBLIC 非 abstract `m_6117_ ()Z` 桥接（`ALOAD 0; INVOKEVIRTUAL LocalPlayer.isUsingItem; IRETURN`，文件第 1262894 行，`hasMethod` 守卫）；ServerPlayer 同理（第 1301806 行）
2. **运行时 Player 侧正确**：mixin preApply 时刻的 Player 类 dump（GTDevCompatMixinPlugin 打印，490 个方法）**有** `m_6117_ ()Z insns=3`——3 指令 = 桥接体特征，是 concrete
3. **LocalPlayer 侧异常**：JVM 报错明确说 LocalPlayer 声明的 `m_6117_` 是 **abstract**，遮蔽了 Player 的 concrete 桥接
4. **fix_injections.js 不背锅**：它的 'A' 条目只给 endinglib `LivingEntityMixin`/`LocalPlayerMixin` 的 @Shadow m_6117_ 加 `aliases=isUsingItem`（注解级别名，不改目标类方法）
5. **结论（推理）**：LocalPlayer 的 abstract m_6117_ 只可能来自 **mixin @Shadow 注入的 abstract 占位**（remap 失败时 mixin 会把目标上找不到的 shadow 以 abstract 方法注入目标类），并且 auto_srg_compat 的 `hasMethod` 检查**先看到了这个 abstract 方法而跳过了 concrete 桥接**；或者 auto_srg 的 LocalPlayer 块在运行时**根本没执行**（类名 guard 不匹配）。两个假设都未验证。

### 下一步排查（按顺序做）

1. **确认 LocalPlayer 块是否执行**：在 auto_srg_compat.js 第 1262894 行前加 `print('[AUTO-DBG] LocalPlayer m_6117_ hasMethod=' + hasMethod(methods,'m_6117_','()Z'))`，重跑
2. **看运行时 LocalPlayer 方法表**：仿照 Player dump（GTDevCompatMixinPlugin.preApply + 一个空 @Mixin(LocalPlayer.class) 触发），打印 LocalPlayer 的 m_6117_ 条目（abstract? access? insns?）——直接证实 5 的哪个假设
3. **找注入 abstract m_6117_ 的 mixin**：重点嫌疑 `com/mega/endinglib/mixin/advanced/data_expand/component/LocalPlayerMixin`（fix_injections 条目 316-331 显示它和 LivingEntityMixin 都有 m_6117_）。查 endinglib jar 的 refmap 中 m_6117_ → isUsingItem 是否生效；或直接 grep run/mods 里各 jar 的 mixin 类字节码中 @Shadow m_6117_
4. **修复选项**（按优先级）：
   - **a) 配置层移除**：改 run/mods/EndingLibrary jar 的 mixins.json，移除 LocalPlayerMixin（与 MixinEditBox 同手法，最可靠）
   - **b) fix_injections 末尾加「abstract m_ 清理 pass」**：对非接口类中 `m_` 前缀的 abstract 方法，层次里有对应 MCP 实现 → 改成 redirect 桥接（复用 iface_def/IM 逻辑）；没有 → 按返回类型填默认值 stub（false/0/null）。这能一劳永逸覆盖同类崩溃
   - **c) 若确认是顺序问题**：auto_srg 的 hasMethod 检查改为"已有方法非 abstract 才跳过"
5. **验证**：重新生成 → 打包 → `./gradlew.bat runClient > /tmp/run88.log 2>&1`（日志必须 `grep -a`）

### 观察模式（已收敛的套路，继续沿用）

| 崩溃形态 | 处理 |
|---|---|
| `merged by X` | 配置层移除冲突方（X 或失败方） |
| `lambda 实现接口 AbstractMethodError` | iface_def 机制（已通用） |
| 桥接无限递归 | IM/iface_def 互调 → 检查生成器判定（super: 优先 + hijack 检查） |
| `NoSuchMethodError f_/m_` | srgMethodOwner/srgFieldOwner 反查（已通用） |
| `AbstractMethodError ... abstract m_XXXX_ on vanilla class` | **本轮套路：mixin @Shadow abstract 占位 → 配置层移除或 abstract 清理 pass** |
| OOM/卡死 | -Xmx8G；禁止开 mixin.debug.export |

## 三、关键文件

| 文件 | 说明 |
|---|---|
| `devtools/GenerateCompatJs.java` | 生成器（IM/OV/default/iface_def 全套；iface_def default 返回 completedFuture(null)；IM 收集含 jarjar 接口表） |
| `devtools/GenerateFixInjections2.java` | fix_injections 生成器（R 条目 + STRIP_LIST + aliasMap + @Shadow 可见性提升 + require=0） |
| `src/devcompat/resources/coremods/auto_srg_compat.js` | 生成的 SRG 桥接库（几十万行；LocalPlayer m_6117_ @1262894，ServerPlayer @1301806） |
| `src/devcompat/resources/coremods/fix_injections.js` | @Shadow alias（m_6117_→isUsingItem 等）+ 注解修复 + protected→public 提升 + require=0（'A' 条目 316-331） |
| `src/devcompat/java/.../mixin/client/PlayerStateDumpMixin.java` | 调试用空 mixin：触发 GTDevCompatMixinPlugin.preApply 打印 Player 运行时方法表（临时，成功后删） |
| `run/mods/*.jar`（6 个已改） | 配置层移除冲突 mixin（重打包，均有 .bak）：GoetyRevelation、RevelationFix、EndingLibrary、Botania、modernfix、configuration |

手写 coremod 清单（src/devcompat/resources/coremods/）：
`auto_srg_compat.js`、`fix_injections.js`、`reload_resource_packs.js`（KubeJS/ModernFix 注入点 m_168019_ 真实字节码）、`unfinal_abstract_container_event_handler.js`、`guard_bewlr.js`、`disable_jade_translation_check.js`、`disable_sodium_vertexbuffer.js`、`disable_goety_netherstar_shaders.js`、`disable_modernui_text.js`、`disable_endinglib_personal_rule.js`、`disable_goety_player.js`、`disable_player_mixins_batch.js`、`disable_playeranimator_player.js`、`disable_revelationfix_goety.js`、`disable_modernfix_mapped_registry.js`、`disable_modernfix_state_def.js`、`endinglib_player.js`、`endinglib_time_compat.js`、`embeddium_minecraft_client_compat.js`、`fix_ferritecore_handler.js`、`fix_interface_lambda.js`（冗余但无害）、`modernfix_suspend_compat.js`、`debug_player_methods.js`（临时调试）

## 四、待清理（启动成功后）

1. `disable_revelationfix_anvil.js` 可删（配置层方案取代）
2. 调试输出：fix_injections.js 的 `[FIXINJ-DBG]`、disable_goety_netherstar_shaders.js 的 `[NSS-DBG]`、debug_player_methods.js、PlayerStateDumpMixin.java、GTDevCompatMixinPlugin 的 dump 打印
3. devtools 临时文件：TraceCreateRefs.java、Inspect*.java、Scan*.java、Simulate*.java、Test*.java、DebugScan*.java、audit_auto_tmp.js、generator 日志、本轮新加的 extract_m6117.py / m6117_hits.txt；根目录 .class/.txt 文件
4. build.gradle 的 mixin.debug.verbose（可选保留）
5. run/mods jar 的 .bak 文件
6. git 提交（**用户发起**——改动巨大：生成器重构 + 9 个 coremod + 6 个 jar 重打包 + 调试文件清理；`.zcode/` 不提交）

## 五、常用命令

```bash
# 1) 重新生成两个 JS（改了生成器或 run/mods jar 后必须重跑）
cd devtools
javac -encoding UTF-8 -cp "asm-9.9.1.jar;asm-tree-9.9.1.jar" GenerateCompatJs.java GenerateFixInjections2.java
java -Dfile.encoding=UTF-8 -cp ".;asm-9.9.1.jar;asm-tree-9.9.1.jar" GenerateCompatJs \
    ../run/mods ../build/createSrgToMcp/output.srg ../src/devcompat/resources/coremods/auto_srg_compat.js \
    "/c/Users/Hi/.gradle/caches/forge_gradle/minecraft_user_repo/net/minecraftforge/forge/1.20.1-47.4.22_mapped_official_1.20.1/forge-1.20.1-47.4.22_mapped_official_1.20.1-recomp.jar"
cd ..

# 2) 打包 + 部署 + 启动
./gradlew.bat devCompatJar copyDevcompatToMods
./gradlew.bat runClient > /tmp/run88.log 2>&1

# 3) 查日志（必须 grep -a；run87 = 世界渲染崩溃，run86 = OOM 对照）
grep -a "AbstractMethodError\|ERROR\|Exception" /tmp/run88.log | head -40
```

## 六、环境备忘

- 日志全部要 `grep -a`（含二进制字符）
- 崩溃报告在 `run/crash-reports/`，完整日志在 `run/logs/debug.log`
- run 日志在 `/tmp/runNN.log`（NN 递增，run87 为最新）
- mixin 调试开关会 OOM，不要开 `mixin.debug.export`；`mixin.debug.verbose` 可开
- nashorn coremod 限制：AnnotationNode/反射不可用，只能用 Opcodes/Type/tree 节点；class filter 不支持 lambda 时用 `Java.type` 全名
- Forge CoreMod target 用斜杠格式（`net/minecraft/xxx`），点分格式从未生效
- 配置层（改 run/mods jar 的 mixins.json）是比 disable coremod 更可靠的修复手段
