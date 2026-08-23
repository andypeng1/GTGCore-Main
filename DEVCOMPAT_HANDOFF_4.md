# GTG Core dev 兼容战 — 第四轮交接（2026-08-23 00:40 状态）

> 给接手 AI 的上下文。先读 DEVCOMPAT_HANDOFF.md（第一轮）→ DEVCOMPAT_HANDOFF_2.md → DEVCOMPAT_HANDOFF_3.md → 本文件。
> 任务：`./gradlew runClient` 启动（dev 环境 105 mod）。

## 一、当前进度（重要）

**已经推进到 `Minecraft.<init>` 的资源重载阶段**（SimpleReloadInstance NPE）——mod 加载、mixin 应用、客户端初始化大部分已通过。

**已解决的关键问题（本轮）**：
1. **revelationfix 从 GoetyRevelation 的 jarjar 解出为 run/mods 独立 mod**（`[Forge]RevelationFix-1.20.1-4.4.jar`）——嵌套 jar 的 mixin 类 mixin 系统用自己的字节解析，CoreMod 转换无效
2. **配置层移除冲突 mixin**（改 run/mods 里 jar 的 mixins.json，用 jar 命令重打包）：
   - GoetyRevelation jarjar 里的 revelationfix → 独立 mod
   - revelationfix 配置移除 `AnvilMenuMixin`（merge createResult 阻碍 ae2/gtceu 注入）
   - revelationfix 配置移除 `HurtByTargetGoalMixin`
   - endinglib 配置移除 `LoomMenuMixin`
   - botania 配置移除 `LoomMenuMixin`
   - modernfix 配置移除 `smart_ingredient_sync.ClientPacketListenerMixin`
   - configuration 配置移除 `ClientPacketListenerMixin`
   - **已改的 jar**：GoetyRevelation-2.3.3fix(1).jar、[Forge]RevelationFix-1.20.1-4.4.jar、EndingLibrary-1.20.1-2.2-all.jar、Botania-1.20.1-454-FORGE.jar、modernfix-forge-5.27.76+mc1.20.1.jar、configuration-forge-1.20.1-3.1.0.jar（都在 run/mods）
3. **生成器（GenerateCompatJs）修复链**：
   - IM 桥接跳过接口类（ComponentKJS default 递归）
   - IM 桥接跳过 mixin 类（MinecraftMixin.setWindowActive 合并污染 → m_7440_ 递归）
   - IM 桥接统一 INVOKESPECIAL 调类自己的 SRG 方法（不调接口——分派回 IM 桥接递归）
   - IM 收集回退分支（mcpSigToSrg）一律跳过（类方法匹配不到的接口义务不补 IM）
   - IM 收集父接口链递归（collectIfaceMethods——kubejs ExportablePackResources→PackResources 的 packId）
   - iface_def 的 SRG 名桥接（m_7686_/m_5540_ 等）**空实现**（不调 MCP 名——与 IM 桥接互调递归）
   - iface_def 的 default 空实现返回 **CompletableFuture.completedFuture(null)**（SimpleReloadInstance NPE——**已改代码已编译，尚未生成验证**）

## 二、下一步（睡醒后直接做）

1. **重新生成 + 打包 + 跑**（验证 CompletableFuture 修复）：
   ```bash
   cd devtools && javac -encoding UTF-8 -cp "asm-9.9.1.jar;asm-tree-9.9.1.jar" GenerateCompatJs.java
   java -Dfile.encoding=UTF-8 -cp ".;asm-9.9.1.jar;asm-tree-9.9.1.jar" GenerateCompatJs \
       ../run/mods ../build/createSrgToMcp/output.srg ../src/devcompat/resources/coremods/auto_srg_compat.js \
       "/c/Users/Hi/.gradle/caches/forge_gradle/minecraft_user_repo/net/minecraftforge/forge/1.20.1-47.4.22_mapped_official_1.20.1/forge-1.20.1-47.4.22_mapped_official_1.20.1-recomp.jar"
   cd .. && ./gradlew.bat devCompatJar copyDevcompatToMods
   ./gradlew.bat runClient > /tmp/run.log 2>&1   # 日志必须 grep -a
   ```
2. **预期**：SimpleReloadInstance NPE 解决后继续深入（可能还有同类问题——lambda 接口方法/配置冲突/域分裂变体）
3. **观察模式**（已收敛的套路）：
   - 崩溃 `merged by X` → 配置层移除冲突方（X 或失败方）
   - 崩溃 `lambda 实现接口 AbstractMethodError` → iface_def 机制（已通用）
   - 崩溃 `递归` → IM/iface_def 桥接互调 → 检查生成器判定
   - 崩溃 `NoSuchMethodError f_/m_` → srgMethodOwner/srgFieldOwner 反查（已通用）

## 三、关键文件

| 文件 | 说明 |
|---|---|
| `devtools/GenerateCompatJs.java` | 生成器（IM/OV/default/iface_def 全套机制，最后改动：CompletableFuture 默认值） |
| `devtools/GenerateFixInjections2.java` | fix_injections 生成器（R 条目 + STRIP_LIST + toFullName 不补 desc） |
| `src/devcompat/resources/coremods/fix_interface_lambda.js` | 手写 RepositorySource default 化（已冗余——生成器 iface_def 覆盖，保留无害） |
| `src/devcompat/resources/coremods/disable_*.js` | 手写 disable（revelationfix_anvil 对 gradle 依赖类无效——已废弃改用配置层） |
| `run/mods/*.jar`（6 个已改） | 配置层移除冲突 mixin（重打包） |

## 四、待清理（启动成功后）

1. `disable_revelationfix_anvil.js` 可删（配置层方案取代）
2. FIXINJ-DBG 打印、debug_player_methods.js、PlayerStateDumpMixin、GTDevCompatMixinPlugin 打印
3. build.gradle mixin.debug.injectors
4. devtools 临时文件 + 根目录 .class/.txt
5. git 提交（用户发起——改动巨大：git 合并 + 6 个 jar 重打包 + 生成器重构）
