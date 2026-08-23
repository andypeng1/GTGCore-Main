# GTG Core dev 兼容战 — 第二轮交接（2026-08-22 15:20 状态）

> 给接手 AI 的上下文。先读第一轮 `DEVCOMPAT_HANDOFF.md` 再看本文件。
> 本轮任务：`./gradlew runClient` 启动一次，修复无法启动的 bug。

## 一、本轮已定位的问题

### 问题 1（已解决）：`fix_injections.js` 顶部 `Java.type('org.objectweb.asm.tree.AnnotationNode')` 崩溃

- **现象**：CoreMod 加载 `coremods/fix_injections.js` 时抛
  `ClassNotFoundException: org.objectweb.asm.tree.AnnotationNode`，BUILD FAILED。
- **根因**：Forge 的 Nashorn CoreMod 引擎启用了 **class filter（白名单）**。
  - `org.objectweb.asm.Opcodes`、`org.objectweb.asm.Type`（asm 核心）→ 在白名单，可用。
  - `org.objectweb.asm.tree.MethodNode` / `FieldNode` / `VarInsnNode` / `MethodInsnNode` /
    `FieldInsnNode` / `InsnNode`（asm-tree 常用节点类）→ 在白名单（`auto_srg_compat.js` 用了，能加载）。
  - `org.objectweb.asm.tree.AnnotationNode` → **不在白名单**，`Java.type` 抛 CNFE。

### 问题 2（已定位，未解决）：反射构造 AnnotationNode 也被 class filter 禁止

- 我第一版修复：删掉 `Java.type` 的 AnnotationNode 声明，改成
  `ann.getClass().getConstructor(Java.type('java.lang.String')).newInstance('...Desc;')`
  从已有注解实例反射取类构造。
- **结果**：`Java.type` 的 CNFE 解决了（fix_injections.js 能加载了），但 transformer 转换
  `DeathArrowMixin` 时报：
  ```
  TypeError: Java reflection not supported when class filter is present
      at ... ECMAErrors.typeError(...)
  ```
- **结论**：class filter 同时**禁止 Java 反射**（`getConstructor`/`newInstance` 等）。
  → 在 Nashorn class filter 环境下，**既拿不到 AnnotationNode 类，也反射不了**。

### 问题 3（当前崩溃）：`z1gned.goetyrevelation.mixin.DeathArrowMixin` 注入失败

```
Critical injection failure: @Inject annotation on createExplosion could not find any targets
matching 'Lcom/Polarice3/Goety/common/entities/projectiles/DeathArrow;onHit(Lnet/minecraft/world/phys/HitResult;)V'
```

- `DeathArrowMixin` 的 `@Inject(method=["onHit"], at=@At("HEAD"))` 注入 goety 的 DeathArrow。
- refmap（`mixins.goety_revelation.refmap.json`）里：`onHit` → `Lcom/Polarice3/Goety/.../DeathArrow;m_6532_(...)V`。
- dev 环境 `mixin.env.remapRefMap=true` 把 `m_6532_` 用 output.srg 反查回 MCP 名 `onHit`，
  但 DeathArrow 是发布版 mod（SRG 域，方法名就是 `m_6532_`），所以 `onHit` 找不到。
- 这正是第一轮 handoff「根因 2 / 方案 C 第 5 点」要解决的 mod 间 mixin 问题。

## 二、根因（本轮最核心）

生成器 `GenerateFixInjections2.java` 对 **mod 目标的 method 注入** 新引入了 **@Desc 方案**（descFixes）：
- 把 method 值 `onHit` 转成 `@Desc(owner=DeathArrow, value=m_6532_, ret=void, args=[HitResult])` 注解，
  放进 `target` 成员，让 Mixin 不走 refmap string remapper。
- 但 @Desc 是 `AnnotationNode`，需要 `new AnnotationNode(...)` —— 在 Nashorn class filter 下
  **既不能 `Java.type` 到该类，也不能反射构造**（见问题 1、2）。

**@Desc 方案在 Nashorn class filter 环境下根本不可行。**

第一轮 handoff 里验证过的方案（BUILD SUCCESSFUL 时）是 **method 值替换**：
> 方案 C 第 5 点：mod 目标注入，method 值 → `m_XXX_(desc)`，target 值 → `Lowner;m_XXX_(desc)`，
> 配合 `remap=false` 防反查。

所以本轮应 **回退 @Desc 方案，改回 method 值替换（fixStr M 条目）**。

## 三、下一步修复

1. 改生成器 `devtools/GenerateFixInjections2.java`：约第 198-210 行，mod 目标 `key.equals("method")`
   分支，把 `descFixes.add(new String[]{s, owner, name, desc})` 改为
   `fixes.add(new String[]{"M", s, name + desc})`（method 值 `onHit` → `m_6532_(desc)`）。
2. 重新编译生成器 + 重新生成 `fix_injections.js`（或直接手改生成的 js）。
3. 重新 `devCompatJar` + `copyDevcompatToMods` + `runClient` 验证。

> 生成器编译/生成命令见第一轮 handoff 第五节；`fix_injections.js` 里 descFixes 数组约在 2090-2160 行，
> 对应的 `makeDesc`/`convertMethodSelectors` 函数在 2503-2554 行（descFixes 为空时不执行，可保留）。

## 四、本轮已做的代码改动

- `src/devcompat/resources/coremods/fix_injections.js`：
  - 删掉了顶部 `var AnnotationNode = Java.type('org.objectweb.asm.tree.AnnotationNode');`
  - `makeDesc` 改用反射构造（**此方案已确认无效，需回退**）
- `devtools/GenerateFixInjections2.java`：同步改了上面的模板（**同样需回退**）

## 五、关键文件

| 文件 | 说明 |
|---|---|
| `devtools/GenerateFixInjections2.java` | 生成器；descFixes 生成逻辑约 198-210 行 |
| `src/devcompat/resources/coremods/fix_injections.js` | 生成产物；descFixes 数组约 2090-2160 行 |
| `run/mods/GoetyRevelation-2.3.3fix(1).jar` | 含 `mixins.goety_revelation.refmap.json`（`onHit`→`m_6532_`） |
| `run/mods/goety-2.5.56.5.jar` | DeathArrow 所在 mod（SRG 域） |

## 六、验证要点

- 日志里 CoreMod 加载顺序：`auto_srg_compat.js`（能加载，说明 MethodNode 等 asm-tree 类在白名单）
  → `fix_injections.js`（之前崩在 AnnotationNode）。
- 崩溃定位：`grep -a "FIXINJ-DBG\|Caused by\|Mixin apply failed\|Critical injection failure" /tmp/run.log`。
- `FIXINJ-DBG` 调试打印由 `makeTransformer` 的 `isDbg` 控制（DeathArrowMixin / revelationfix LivingEntityMixin）。
