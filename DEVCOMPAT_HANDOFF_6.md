# GTG Core dev 兼容战 — 第六轮交接（2026-08-23 20:00 状态）

> 给接手 AI 的上下文。先读 DEVCOMPAT_HANDOFF.md → HANDOFF_2 → HANDOFF_3 → HANDOFF_4 → HANDOFF_5 → 本文件。
> 任务：`./gradlew runClient` 进入世界**正常游玩**（dev 环境 105 mod，Forge 1.20.1 + GTCEu 7.5.3，Java 17，官方 mappings）。

## 一、当前进度（重要）

**游戏已能进入世界**（m_6117_ 阻塞已解决——run87 后 18:29-19:12 之间添加的 coremod 之功：goal_compat、fix_finalize_spawn_recursion、fix_config_read_before_load、disable_player_mixins_batch 等）。
**剩余两个问题**：
1. **世界只渲染一个区块**（根因已确认，修复方案与 oculus mixin 冲突，进行中）
2. **打开视频设置崩溃**（根因已确认，修复已写未验证）

**当前运行**：run91 正在跑——coremods.json 临时只保留两个视频设置修复（sodium_options_gui_init + fix_screen_init_bridge），**确认：① 视频设置修复是否有效；② 无 LevelRenderer coremod 时能否恢复到 19:13 的可进世界状态**。run91 结果出来前不要继续改 LevelRenderer 相关 coremod。

## 二、问题 1：视频设置崩溃（SodiumOptionsGUI applyButton null）——修复已写，未验证

### 崩溃
```
NullPointerException: Cannot invoke "FlatButtonWidget.setEnabled(boolean)" because "this.applyButton" is null
	at SodiumOptionsGUI.updateControls(SodiumOptionsGUI.java:289)
	at SodiumOptionsGUI.m_88315_(SodiumOptionsGUI.java:256)
	at Screen.renderWithTooltip(Screen.java:109)
```

### 根因链（已证实）
1. `Minecraft.setScreen` 调 **MCP 名** `Screen.init` → JVM dispatch 找不到 SRG 域 mod 类的 `m_7856_`（sodium 的 init）→ **init 空转**（执行 vanilla 空 Screen.init）
2. 生成器的 IM 机制只为**接口 abstract 义务**补 MCP 桥接（getFocused/getRectangle 等），`init` 是 **protected 非接口方法** → 漏补
3. sodium 的控件（applyButton 等）在 `m_7856_` 里创建 → init 空转 → applyButton null → 渲染时 updateControls NPE
4. **连带发现（递归隐患）**：生成器给 Screen 加的 `m_7856_` 桥接用 `INVOKEVIRTUAL Screen.init`——若给 mod GUI 补 init 桥接，sodium `m_7856_` 内的 `super.m_7856_()`（= 生成器桥接）会 dispatch 回新桥接 → **init ↔ m_7856_ 无限递归**。必须把 Screen 系 m_7856_ 桥接改为 INVOKESPECIAL。

### 修复（2 个 coremod，run91 正在验证）
- `sodium_options_gui_init.js`：给 SodiumOptionsGUI 加 `init()V` 桥接 → `INVOKESPECIAL SodiumOptionsGUI.m_7856_`
- `fix_screen_init_bridge.js`：Screen + AbstractContainerScreen 的 `m_7856_` 桥接体 `INVOKEVIRTUAL init` → `INVOKESPECIAL init`

### 备注
**所有 SRG 域 mod GUI 都有 init 空转问题**（AE2 等只是控件在构造器创建所以没暴露）。如果后续遇到其他 GUI 控件不显示/崩，用同样手法补 init 桥接。

## 三、问题 2：单区块渲染——根因确认，修复方案有 mixin 冲突（进行中）

### 症状
进入世界后只能看到玩家所在 1 个区块，无渲染报错（静默）。

### 调查证据（RENDERDBG dump，run88 数据）
1. **embeddium `core.render.world.WorldRendererMixin` @Overwrite 了一组方法**（注入名 = mixin 方法名，SRG 域）：
   - `m_172993_` = renderChunkLayer、`m_194338_` = setupRender、`m_109732_` = setBlockDirty、`m_109821_` = countRenderedChunks、`m_202430_` = isChunkCompiled、`m_109494_`/`m_109490_` = setSectionDirty 系列、`m_109825_` 等
   - **注入后 LevelRenderer 同时存在 vanilla MCP 方法（原实现）+ embeddium SRG 名方法**——调用点必须 SRG 化才能走 embeddium 实现
2. **生成器的 LevelRenderer 块方法级 skip `renderLevel`**（skip 列表含 `renderLevel`/`renderChunkLayer` 等）→ renderLevel 内的 `renderChunkLayer`/`setupRender` 调用**保持 MCP 名** → dispatch 到 vanilla 原版实现
3. 但 embeddium 的 @Inject（onTerrainUpdateScheduled 等）已部分接管 vanilla 调度 → **混合状态**：编译/调度走 embeddium，渲染走 vanilla → 只渲染最初编译的一个区块

### 修复尝试（已失败，已回退）
`fix_levelrenderer_embeddium.js`：把 renderLevel 内 `renderChunkLayer → m_172993_`、`setupRender → m_194338_`。
**结果**：确定性崩溃（run89/run90 均复现）：
```
MixinApplyError: oculus-batched-entity-rendering.mixins.json:MixinLevelRenderer_EntityListSorting FAILED during APPLY
InvalidImplicitDiscriminatorException: Found 0 candidate variables but exactly 1 is required.
	@ModifyVariable(method=["renderLevel"], at=INVOKE_ASSIGN Iterable.iterator(),
		slice.from=INVOKE RenderBuffers.bufferSource(), slice.to=INVOKE EntityRenderDispatcher.shouldRender(...))
```
**已从 coremods.json 移除**，恢复 19:13 状态验证中。

### 冲突分析（接手继续的点）
- oculus 的 @ModifyVariable 注入目标就是 **renderLevel**（slice 范围 bufferSource→shouldRender 理论上不含我们改的调用点），但 apply 阶段 `findImplicitLocal` 找不到 Iterator 局部变量
- 直接改 mixin 注入目标方法的字节码会让该 mixin 的**变量分析**（apply 阶段，非 prepare）失效——**教训：coremod 修改某方法前必须盘点该方法的 mixin 注入者**
- **下一步候选**：
  a) **只改 renderChunkLayer 调用、不动 setupRender**——缩小改动面，试是否避开冲突
  b) **不用 coremod，改生成器**（去掉 renderLevel 的 skip，重新生成 auto_srg_compat.js）——注意：与手写 coremod 等价，若机制相同可能同样冲突，但生成器改动伴随其他方法的调用点 SRG 化，行为可能不同
  c) **让 oculus 的 EntityListSorting @ModifyVariable 空转**（像 disable_revelationfix_goety 那样 strip 注解）——代价：丢 oculus 的实体渲染排序优化（可接受，dev 环境）
  d) 用 debug coremod dump **renderLevel 在 EntityListSorting apply 前的字节码**（含前面 mixin 注入后）确认变量布局——理解"为什么 19:13 成功、改名后失败"的真正机制
- **优先做 d 或 a**：先理解机制再动手，避免再次踩坑

## 四、Wraith getTrueOwner AbstractMethodError（19:09 server crash）——大概率已修复，未最终验证

- 19:09 crash：Wraith 自然生成时 `AbstractMethodError: Owned.getTrueOwner() is abstract`（revelationfix OwnedMixin 的 @Shadow abstract getTrueOwner + 注入注解未禁用时的残留）
- 19:12 的 `disable_revelationfix_goety.js`（移除 OwnedMixin 的 injection 注解、保留 @Shadow）之后，19:13 运行里 Owned.getTrueOwner 已 concrete（只有 goety 自身在 <init> 期间读 entityData 的 NPE——WARN 被 catch，正式环境同样存在，无害）
- run89/90 没到世界阶段，**未最终验证**；run91 进世界后观察日志有无 Wraith/Reaper AME

## 五、关键文件

| 文件 | 说明 |
|---|---|
| `devtools/GenerateCompatJs.java` | 生成器（IM 只补接口 abstract 义务——init 漏补的根源） |
| `src/devcompat/resources/coremods/auto_srg_compat.js` | 生成的 SRG 桥接库（LevelRenderer 块 skip renderLevel；Screen 块 m_7856_ 桥接 INVOKEVIRTUAL） |
| `src/devcompat/resources/coremods/sodium_options_gui_init.js` | 新：SodiumOptionsGUI init 桥接（待验证） |
| `src/devcompat/resources/coremods/fix_screen_init_bridge.js` | 新：Screen/AbstractContainerScreen m_7856_ 桥接改 INVOKESPECIAL（待验证） |
| `src/devcompat/resources/coremods/fix_levelrenderer_embeddium.js` | 新：renderLevel 调用点 SRG 化（**冲突，已从 coremods.json 移除**，保留文件待续） |
| `src/devcompat/resources/coremods/debug_dump_render.js` | 新：LevelRenderer/ChunkRenderDispatcher/RebuildTask 方法表 + renderLevel 调用点 dump（调试用，成功后删） |
| run87 后新增（18:29-19:12，m_6117_ 修复功臣）：`goal_compat.js`、`fix_finalize_spawn_recursion.js`、`fix_config_read_before_load.js`、`disable_player_mixins_batch.js`（改）、`disable_endinglib_personal_rule.js`（改）、`disable_revelationfix_goety.js`（改） | 见各文件头注释 |

## 六、常用命令

```bash
# 改 coremod 后：打包 + 启动（日志必须 grep -a）
./gradlew.bat devCompatJar copyDevcompatToMods
./gradlew.bat runClient > /tmp/runNN.log 2>&1

# 查崩溃
grep -a "Caused by\|ERROR" /tmp/runNN.log | head -20
ls -lat run/crash-reports/ | head -3
```

## 七、待清理（全部成功后）

1. `debug_dump_render.js`（调试完删）、`fix_levelrenderer_embeddium.js`（若方案改走生成器则删）
2. 旧清单（HANDOFF_5 第四节）：FIXINJ-DBG/NSS-DBG prints、debug_player_methods.js、PlayerStateDumpMixin、GTDevCompatMixinPlugin dump、devtools 临时文件（含 extract_m6117.py/m6117_hits.txt）、根目录 .class/.txt、run/mods jar 的 .bak
3. git 提交（**用户发起**；`.zcode/` 不提交）

## 八、环境备忘（沿用）

- 日志必须 `grep -a`；崩溃报告在 run/crash-reports/；run 日志 /tmp/runNN.log（run91 最新）
- 禁 `mixin.debug.export`（OOM）；`-Xmx8G` 已配好
- nashorn：AnnotationNode/反射不可用，只有 Opcodes/Type/tree；target 用斜杠格式
- 配置层（改 run/mods jar 的 mixins.json）是最可靠修复；**coremod 改字节码前先盘点目标方法的 mixin 注入者**
