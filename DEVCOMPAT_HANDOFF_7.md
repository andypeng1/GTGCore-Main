# GTG Core dev 兼容战 — 第七轮交接（2026-08-23 20:50 状态）

> 给接手 AI 的上下文。先读 DEVCOMPAT_HANDOFF.md → HANDOFF_2 → HANDOFF_3 → HANDOFF_4 → HANDOFF_5 → HANDOFF_6 → 本文件。
> 任务：`./gradlew runClient` 进入世界**正常游玩**（dev 环境 105 mod，Forge 1.20.1 + GTCEu 7.5.3，Java 17，官方 mappings）。

## 一、当前进度（重要）

**run94（20:46 崩溃）是重大进展**：
- ✅ **启动成功**（过了 LevelRenderer 的 mixin 阶段——之前 run89/90/93 都在此处崩）
- ✅ **方法体转发方案生效**（日志确认 `[LRDBG] forwarded renderChunkLayer -> m_172993_`、`forwarded setupRender -> m_194338_`）
- ✅ 游戏进入**创造模式背包界面**（EffectRenderingInventoryScreen 渲染）
- ❌ **新崩溃**：打开创造背包时 **FTB 侧边栏按钮渲染除零**：
  ```
  ArithmeticException: / by zero
      at Mth.positiveCeilDiv
      at GuiGraphics.slices(GuiGraphics.java:441)
      at GuiGraphics.blitRepeating → blitNineSliced → AbstractButton.renderWidget(AbstractButton.java:33)
      at SidebarGroupGuiButton.renderWidget（ftb-library）
  ```

**当前 coremods.json 状态**（3 个修复 + 之前的全套）：
- `sodium_options_gui_init.js`（视频设置 init 桥接，未验证——run94 没到视频设置）
- `fix_screen_init_bridge.js`（Screen/ACS m_7856_ 桥接改 INVOKESPECIAL，run94 已生效——Screen 帧有转换标记）
- `fix_levelrenderer_embeddium.js`（**方法体转发版**，run94 启动验证通过，世界渲染效果待验证）
- 已移除：`disable_oculus_entitylist_sorting.js`（不再需要）、`debug_dump_render.js`（调试完）

## 二、run94 崩溃（FTB 侧边栏除零）——调查起点

### 现象
```
Mth.positiveCeilDiv → / by zero
  GuiGraphics.slices(GuiGraphics.java:441)   // positiveCeilDiv(某值, 0)
  GuiGraphics.blitRepeating(GuiGraphics.java:425/418)
  GuiGraphics.blitNineSliced(GuiGraphics.java:411/386)
  AbstractButton.renderWidget(AbstractButton.java:33)
  SidebarGroupGuiButton.renderWidget（ftb-library-forge）
```
- 打开创造背包（EffectRenderingInventoryScreen）时 FTB 侧边栏（SidebarGroupGuiButton）渲染
- 栈帧：`AbstractButton.m_87963_`（SRG renderWidget）→ `AbstractButton.renderWidget`（MCP）——生成器的 render 桥接在正常工作
- **除零**：`positiveCeilDiv(x, 0)` —— blitNineSliced/blitRepeating 的**宽度或高度参数为 0**

### 排查方向（接手后做）
1. **怀疑我们的字段引用改写**：SidebarGroupGuiButton / AbstractButton 的 width/height 字段（f_93618_/f_93619_）或 getWidth/getHeight 调用被改写错 → 读到 0。dump ftb-library jar 里 SidebarGroupGuiButton 的 GETFIELD 引用 + auto_srg_compat.js 里该类的改写块
2. **或 blitNineSliced 的尺寸参数**（AbstractButton.renderWidget:33 传的 u/v 或 w/h）——对比 vanilla 与运行时字节码
3. **或与 render 桥接相关**：SidebarGroupGuiButton.renderWidget（MCP，自己的实现）→ 内部 `super.renderWidget(...)`？→ AbstractButton.renderWidget（被我们的桥接 SRG 化？）——看 auto_srg_compat.js 里 AbstractButton 块的改写
4. 也注意：这可能是**19:13 之前就存在的潜在问题**（游戏进不了背包所以没暴露），不一定是本轮引入

## 三、已确认的修复与机制（截至 run94）

### 1. 视频设置崩溃（SodiumOptionsGUI applyButton null）——修复待最终验证
- 根因：`Minecraft.setScreen` 调 MCP 名 `Screen.init` → dispatch 不到 SRG 域 mod 类的 `m_7856_` → init 空转 → 控件不创建
- 修复：`sodium_options_gui_init.js`（init 桥接 INVOKESPECIAL m_7856_）+ `fix_screen_init_bridge.js`（Screen/ACS m_7856_ 桥接改 INVOKESPECIAL 防递归）
- run94 中 Screen/ACS 帧有 `gtgcore_fix_screen_init_bridge` 转换标记（生效 ✓），**效果未测**（run94 没打开视频设置）

### 2. 单区块渲染——方法体转发方案（run94 启动通过）
- 根因：embeddium @Overwrite 注入 m_172993_/m_194338_，但生成器 skip renderLevel → 调用点走 vanilla → embeddium 半接管 → 单区块
- **失败路线（教训）**：改 renderLevel 调用点 → 级联破坏 ae2lt `LevelRendererPhaseFlightMixin`（@ModifyArg setupRender 调用点，0/1 Critical）和 oculus `EntityListSorting`（@ModifyVariable 变量分析失败）→ **确认：coremod 改方法前必须盘点该方法的所有 mixin 注入者**
- **成功路线**：`fix_levelrenderer_embeddium.js` 方法体转发（renderChunkLayer 方法体 → m_172993_；setupRender 方法体 → m_194338_）——调用点不变，mixin 注入点不受影响。已逐一确认**无任何 mixin 以 renderChunkLayer/setupRender 方法体为注入目标**（gtceu@renderLevel HEAD、botania@renderSky、goety@renderLevel INVOKE、modernui@renderLevel OutlineBuffer、ae2cs@renderLevel BlockEntity.getRenderBoundingBox、ae2lt@ModifyArg setupRender 调用点、oculus EntityListSorting@iterator 调用点——全部在 renderLevel/renderSky 方法体或调用点，不受影响）
- **待验证**：进世界后的实际渲染（多区块？）——run94 只到背包界面，还没进世界

### 3. Wraith getTrueOwner AME（19:09 server crash）——大概率已修复
- 19:12 `disable_revelationfix_goety.js`（移除 OwnedMixin 注入注解）后，Owned.getTrueOwner 已 concrete；goety 自身 <init> 期间 entityData NPE 是 WARN（正式环境同样存在，无害）

## 四、关键文件

| 文件 | 说明 |
|---|---|
| `src/devcompat/resources/coremods/fix_levelrenderer_embeddium.js` | **方法体转发版**（run94 验证通过启动；含 LRDBG 打印，成功后删） |
| `src/devcompat/resources/coremods/sodium_options_gui_init.js` | 视频设置 init 桥接（待最终验证） |
| `src/devcompat/resources/coremods/fix_screen_init_bridge.js` | Screen/ACS m_7856_ 桥接改 INVOKESPECIAL（run94 生效） |
| `src/devcompat/resources/coremods/disable_oculus_entitylist_sorting.js` | **已从 coremods.json 移除**（方法体转发方案不需要），文件保留备用 |
| `devtools/GenerateCompatJs.java` | 生成器（LevelRenderer 块 skip renderLevel——单区块根因；IM 只补接口义务——init 漏补根因） |
| run87 后新增 coremod（m_6117_ 修复功臣） | goal_compat.js、fix_finalize_spawn_recursion.js、fix_config_read_before_load.js、disable_player_mixins_batch.js、disable_endinglib_personal_rule.js、disable_revelationfix_goety.js |

## 五、下一步（接手后）

1. **修 FTB 侧边栏除零**（第二节方向）——或先试：**打开背包不崩**（如果崩溃可绕过，先验证世界渲染）
2. **进世界验证单区块修复**（方法体转发是否让 embeddium 渲染接管 → 多区块正常）
3. **验证视频设置**（sodium init 桥接是否有效）
4. 全部通过后清理：LRDBG 打印、debug_dump_render.js（如恢复使用）、disable_oculus_entitylist_sorting.js（未用则删）、HANDOFF_5/6 的旧清理清单（FIXINJ-DBG/NSS-DBG、debug_player_methods.js、PlayerStateDumpMixin、devtools 临时文件、根目录 .class/.txt、run/mods jar 的 .bak）
5. git 提交（**用户发起**；`.zcode/` 不提交）

## 六、常用命令与环境备忘

```bash
./gradlew.bat devCompatJar copyDevcompatToMods   # 改 coremod 后打包
./gradlew.bat runClient > /tmp/runNN.log 2>&1    # 运行（日志必须 grep -a）
grep -a "Caused by\|ERROR\|LRDBG" /tmp/runNN.log | head -20
```
- 崩溃报告 run/crash-reports/；run 日志 /tmp/runNN.log（run94 最新，20:46 崩溃）
- 禁 `mixin.debug.export`（OOM）；`-Xmx8G` 已配
- nashorn：AnnotationNode/反射不可用；target 用斜杠格式
- **教训（重要）**：coremod 修改任何方法前，先盘点该方法的所有 mixin 注入者（javap 查 method= 目标）；改调用点比改方法体更容易级联破坏 mixin
- **关键经验**：embeddium 类（LevelRenderer/SodiumOptionsGUI 等）的 mixin 生态复杂，修复优先"方法体转发/桥接"而不是"调用点改名"
