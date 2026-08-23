import org.objectweb.asm.ClassReader;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.tree.*;
import java.util.*;
import java.util.jar.*;
import java.io.*;
import java.nio.file.*;
import java.util.regex.*;

/** v2：把注入注解 method/target 值改成"全名"（Lowner;MCP名(desc)），refmap 键必不匹配，
 *  selector 保持 MCP 名匹配 dev 的 MCP 域类 */
public class GenerateFixInjections2 {
    static Set<String> visited = new HashSet<>();
    static Map<String, String> srgToMcp = new HashMap<>();
    static Map<String, String> mcpDesc = new HashMap<>();   // mcpName -> desc
    static Map<String, Set<String[]>> fixes = new TreeMap<>();
    // 与其他 mod mixin 冲突的注入整体禁用的类（原版目标但 merge 冲突：
    // revelationfix AnvilMenuMixin merge createResult → ae2/gtceu 的 @At(INVOKE)
    // 无法注入。revelationfix 已从 GoetyRevelation 的 jarjar 解出为 run/mods 独立
    // mod（mixin 类加载路径与 mods 目录一致，strip 生效））
    static final Set<String> STRIP_LIST = new HashSet<>(Arrays.asList(
        "com/mega/revelationfix/mixin/AnvilMenuMixin"
    ));
    // @Shadow 字段引用改写：mixin类 -> Set<[target类, srg字段, mcp字段, desc]>
    static Map<String, Set<String[]>> fieldRefFixes = new TreeMap<>();
    static Pattern SRG_PATTERN = Pattern.compile("(m_\\d+_|f_\\d+_)");

    public static void main(String[] args) throws Exception {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(args[1])))) {
            String l;
            boolean isTsrg2 = false;
            while ((l = br.readLine()) != null) {
                if (l.startsWith("tsrg2")) { isTsrg2 = true; continue; }
                if (isTsrg2) {
                    // tsrg2 format: tab-indented members
                    // method: \t mcpName desc srgName
                    // field: \t mcpName srgName
                    if (l.startsWith("\t")) {
                        String[] p = l.trim().split(" ");
                        if (p.length >= 2) {
                            String mcpName = p[0];
                            String srgName = p[p.length - 1];
                            if (srgName.startsWith("m_") || srgName.startsWith("f_")) {
                                srgToMcp.put(srgName, mcpName);
                                if (p.length >= 3 && p[1].startsWith("(")) {
                                    // method: mcpName desc srgName
                                    mcpDesc.put(mcpName, p[1]);
                                }
                            }
                        }
                    }
                } else {
                    // old format with FD:/MD: prefixes
                    if (l.startsWith("FD:")) {
                        String[] p = l.substring(4).split(" ");
                        if (p.length >= 2) srgToMcp.put(simple(p[0]), simple(p[1]));
                    } else if (l.startsWith("MD:")) {
                        String[] p = l.substring(4).split(" ", 4);
                        if (p.length >= 3) {
                            srgToMcp.put(simple(p[0]), simple(p[2]));
                            mcpDesc.put(simple(p[2]), p[1]);
                        }
                    }
                }
            }
        }
        System.out.println("srg=" + srgToMcp.size() + " mcpDesc=" + mcpDesc.size());
        File modsDir = new File(args[0]);
        for (File f : modsDir.listFiles((d, n) -> n.endsWith(".jar"))) scanJar(f);
        generate(args[2]);
    }

    static String simple(String s) { return s.substring(s.lastIndexOf('/') + 1); }

    // refmap 数据：mixin类(斜杠) -> Map<method值, SRG全名 Lowner;m_XXX_(desc)>
    static Map<String, Map<String, String>> refmapData = new HashMap<>();

    static void scanRefmaps(JarFile jf) {
        try {
            Enumeration<JarEntry> en = jf.entries();
            while (en.hasMoreElements()) {
                JarEntry e = en.nextElement();
                if (!e.getName().endsWith(".refmap.json")) continue;
                com.google.gson.JsonObject root;
                try (InputStream is = jf.getInputStream(e)) {
                    root = com.google.gson.JsonParser.parseReader(new java.io.InputStreamReader(is, java.nio.charset.StandardCharsets.UTF_8)).getAsJsonObject();
                }
                com.google.gson.JsonObject mappings = root.getAsJsonObject("mappings");
                if (mappings == null) continue;
                for (String mixinCls : mappings.keySet()) {
                    com.google.gson.JsonObject entry = mappings.getAsJsonObject(mixinCls);
                    if (entry == null) continue;
                    Map<String, String> map = refmapData.computeIfAbsent(mixinCls.replace('.', '/'), k -> new HashMap<>());
                    for (String key : entry.keySet()) {
                        com.google.gson.JsonElement val = entry.get(key);
                        if (val != null && val.isJsonPrimitive()) map.put(key, val.getAsString());
                    }
                }
            }
        } catch (Exception ex) {}
    }

    static void scanJar(File jar) throws Exception {
        if (!visited.add(jar.getAbsolutePath())) return;
        try (JarFile jf = new JarFile(jar)) {
            Enumeration<JarEntry> en = jf.entries();
            List<JarEntry> nested = new ArrayList<>();
            while (en.hasMoreElements()) {
                JarEntry e = en.nextElement();
                if (e.getName().endsWith(".jar") && e.getName().startsWith("META-INF/jarjar/")) nested.add(e);
            }
            for (JarEntry n : nested) {
                File tmp = File.createTempFile("nested", ".jar");
                try (InputStream is = jf.getInputStream(n)) { Files.copy(is, tmp.toPath(), StandardCopyOption.REPLACE_EXISTING); }
                scanJar(tmp);
                tmp.delete();
            }
            scanRefmaps(jf);
            Enumeration<JarEntry> en2 = jf.entries();
            while (en2.hasMoreElements()) {
                JarEntry e = en2.nextElement();
                if (!e.getName().endsWith(".class")) continue;
                try {
                    ClassReader cr = new ClassReader(jf.getInputStream(e));
                    ClassNode cn = new ClassNode();
                    cr.accept(cn, 0);
                    String mixinTarget = null;
                    List<AnnotationNode> clsAnns = new ArrayList<>();
                    if (cn.visibleAnnotations != null) clsAnns.addAll(cn.visibleAnnotations);
                    if (cn.invisibleAnnotations != null) clsAnns.addAll(cn.invisibleAnnotations);
                    for (AnnotationNode a : clsAnns) {
                        if (a.desc.equals("Lorg/spongepowered/asm/mixin/Mixin;") && a.values != null) {
                            for (int i = 0; i < a.values.size() - 1; i += 2) {
                                Object v = a.values.get(i + 1);
                                if (v instanceof List) {
                                    for (Object o : (List<?>) v) {
                                        String t = String.valueOf(o);
                                        mixinTarget = (t.startsWith("L") ? t.substring(1).replace(";", "") : t).replace('.', '/');
                                    }
                                }
                            }
                        }
                    }
                    if (mixinTarget == null) continue;
                    for (MethodNode m : cn.methods) {
                        List<AnnotationNode> anns = new ArrayList<>();
                        if (m.invisibleAnnotations != null) anns.addAll(m.invisibleAnnotations);
                        if (m.visibleAnnotations != null) anns.addAll(m.visibleAnnotations);
                        for (AnnotationNode a : anns) {
                            // @Shadow：加 aliases=[MCP名]（apply 阶段 attachFields 会先按别名找真实字段/方法；
                            // dev 环境类为 MCP 域，@Shadow 写死的 SRG 名直接命中补的 null 桥接会 NPE）
                            // 注意：@Shadow 无参数时 AnnotationNode.values 为 null，不能用 values 判存在
                            if (a.desc.equals("Lorg/spongepowered/asm/mixin/Shadow;")) {
                                String srg = m.name;
                                if (srg.startsWith("shadow$")) srg = srg.substring("shadow$".length());
                                String mcp = srgToMcp.get(srg);
                                if (mcp != null && !mcp.equals(srg)) {
                                    fixes.computeIfAbsent(cn.name, k -> new TreeSet<>(Comparator.comparing(x -> x[1])))
                                        .add(new String[]{"A", srg, mcp});
                                }
                            }
                            if (!a.desc.contains("mixin/injection/")) continue;
                            // 记录该类（保证 remap=false 应用到所有注入注解）
                            fixes.computeIfAbsent(cn.name, k -> new TreeSet<>(Comparator.comparing(x -> x[1])));
                            if (a.values == null) continue;
                            for (int i = 0; i < a.values.size() - 1; i += 2) {
                                String key = String.valueOf(a.values.get(i));
                                if (!key.equals("method") && !key.equals("target")) continue;
                                Object v = a.values.get(i + 1);
                                List<Object> vals = new ArrayList<>();
                                if (v instanceof List) vals.addAll((List<?>) v);
                                else if (v != null) vals.add(v);
                                for (Object o : vals) {
                                    String s = String.valueOf(o);
                                    boolean isTarget = key.equals("target");
                                    boolean isModTarget = mixinTarget != null
                                            && !(mixinTarget.startsWith("net/minecraft") || mixinTarget.startsWith("com/mojang"));
                                    if (!isModTarget) {
                                        // 原版目标（dev 类为 MCP 域）：规范化 method/target 值
                                        String ns = toFullName(s, mixinTarget, isTarget);
                                        if (ns != null && !ns.equals(s)) {
                                            fixes.computeIfAbsent(cn.name, k -> new TreeSet<>(Comparator.comparing(x -> x[1])))
                                                .add(new String[]{key.equals("method") ? "M" : "T", s, ns});
                                        }
                                    } else {
                                        // mod 目标（dev 类为 SRG 域，如 goety 的类）的注入：dev 环境无解，只能静默失效。
                                        // 反查链：RemappingReferenceMapper.remap 先把 selector 过 refmap 的 key，
                                        // 再对结果做 output.srg 的 SRG→MCP 全局字符串替换（mixin 0.8.5 的
                                        // AnnotatedMethodInfo.remap 无条件走 ReferenceMapper，注解 remap=false 无效）。
                                        // 所以 method 值无论写 MCP 名还是 SRG 名，最终都会被反查回 MCP 名，
                                        // 而 SRG 域目标类里只有 m_XXX_ 方法 → 注入必找不到目标。
                                        // 处理：method 值保持 MCP 名不动（不生成 M/T 条目），对该类的注入注解
                                        // 设 require=0（parseRequirements 读注解 require，0 时 validateTargets
                                        // 不抛 Critical，注入静默跳过，与第一轮无 fix_injections 时的行为一致）。
                                        // 不能用 @Desc（AnnotationNode）：Nashorn class filter 下既 Java.type 不到
                                        // asm-tree 的 AnnotationNode，也禁止反射构造（见 DEVCOMPAT_HANDOFF_2.md）。
                                        fixes.computeIfAbsent(cn.name, k -> new TreeSet<>(Comparator.comparing(x -> x[1])))
                                            .add(new String[]{"R", "", ""});
                                    }
                                }
                            }
                        }
                    }
                    for (FieldNode f : cn.fields) {
                        List<AnnotationNode> fanns = new ArrayList<>();
                        if (f.invisibleAnnotations != null) fanns.addAll(f.invisibleAnnotations);
                        if (f.visibleAnnotations != null) fanns.addAll(f.visibleAnnotations);
                        for (AnnotationNode a : fanns) {
                            // @Shadow 字段：mixin 不允许非 private 别名，且补的桥接字段为 null，
                            // mixin 代码读取（如 ferritecore getVanillaPropertyMap 读 f_61111_）会 NPE。
                            // 解决：记录 (mixin类, target类, f_XXX, MCP名)，transformer 里把 mixin 字节码
                            // 中对该字段的 GETFIELD/PUTFIELD 引用直接改写为 MCP 字段名，
                            // mixin 代码访问真实字段（与正式环境 SRG 域行为一致）。
                            if (a.desc.equals("Lorg/spongepowered/asm/mixin/Shadow;")) {
                                String mcp = srgToMcp.get(f.name);
                                if (mcp != null && !mcp.equals(f.name) && mixinTarget != null) {
                                    fieldRefFixes.computeIfAbsent(cn.name, k -> new TreeSet<>(Comparator.comparing(x -> x[1])))
                                        .add(new String[]{mixinTarget, f.name, mcp, f.desc});
                                }
                            }
                        }
                    }
                    // 指令内的 SRG 字段引用（可能没有 @Shadow 声明，如 modernfix WallBlockMixin 的
                    // handler 直接 getfield f_49792_）：同样改写为 MCP 字段名
                    for (MethodNode m : cn.methods) {
                        for (AbstractInsnNode insn = m.instructions.getFirst(); insn != null; insn = insn.getNext()) {
                            if (!(insn instanceof FieldInsnNode)) continue;
                            FieldInsnNode fin = (FieldInsnNode) insn;
                            int op = fin.getOpcode();
                            if (op != Opcodes.GETFIELD && op != Opcodes.PUTFIELD
                                    && op != Opcodes.GETSTATIC && op != Opcodes.PUTSTATIC) continue;
                            if (!fin.name.startsWith("f_")) continue;
                            String mcp = srgToMcp.get(fin.name);
                            if (mcp == null || mcp.equals(fin.name)) continue;
                            // owner 是原版类（目标类）或 mixin 类自身（编译期引用）
                            if (!(fin.owner.startsWith("net/minecraft") || fin.owner.startsWith("com/mojang")
                                    || fin.owner.equals(cn.name))) continue;
                            fieldRefFixes.computeIfAbsent(cn.name, k -> new TreeSet<>(Comparator.comparing(x -> x[1])))
                                .add(new String[]{fin.owner, fin.name, mcp, fin.desc});
                        }
                    }
                } catch (Exception ex) {}
            }
        }
    }

    /**
     * 把成员引用规范化：
     * - target（@At 的 INVOKE 目标）：返回全名 Lowner;mcpName(desc)
     * - method（@Inject/@Redirect 等）：返回 name(desc)（mixin 0.8.5 的 method 不允许带 owner）
     * 已带 L 前缀的全名：method 时提取 name(desc)；target 时原样（跳过）
     */
    static String toFullName(String s, String owner, boolean isTarget) {
        if (s.startsWith("L")) {
            if (isTarget) {
                String ns = s;
                Matcher mat = SRG_PATTERN.matcher(s);
                while (mat.find()) {
                    String mcp = srgToMcp.get(mat.group(1));
                    if (mcp != null) ns = ns.replace(mat.group(1), mcp);
                }
                return ns.equals(s) ? null : ns;
            }
            int semi = s.indexOf(';');
            if (semi < 0) return null;
            String rest = s.substring(semi + 1); // name(desc)
            String ns = rest;
            Matcher mat = SRG_PATTERN.matcher(rest);
            while (mat.find()) {
                String mcp = srgToMcp.get(mat.group(1));
                if (mcp != null) ns = ns.replace(mat.group(1), mcp);
            }
            return ns;
        }
        int paren = s.indexOf('(');
        String name = paren >= 0 ? s.substring(0, paren) : s;
        String desc = paren >= 0 ? s.substring(paren) : null;
        if (desc == null) {
            // 无 desc 的短名不补 desc：mcpDesc 是"同名方法多 desc 互相覆盖"的单映射
            // （如 add → 最后一行 add(I)V 覆盖 addToast 的 (IToast)V），补错签名会让
            // refmap key 反查失效（sodium-extra MixinToastManager @Inject method="add"
            // 被补成 add(I)V 后 ToastComponent 找不到）。保持原名走完整反查链：
            // refmap key "add" 命中 → SRG 全名 → RemappingReferenceMapper 全局替换回
            // MCP 名 addToast → 精确匹配 dev 类。
            return null;
        } else {
            Matcher mat = SRG_PATTERN.matcher(name);
            if (mat.find()) {
                String mcp = srgToMcp.get(mat.group(1));
                if (mcp != null) name = mcp;
            }
        }
        return isTarget ? "L" + owner + ";" + name + desc : name + desc;
    }

    static void generate(String outPath) throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append("/**\n");
        sb.append(" * auto-generated dev compat fix (GenerateFixInjections2):\n");
        sb.append(" * rewrite injection method/target values to full names Lowner;MCPname(desc)\n");
        sb.append(" * so refmap lookup misses and selector stays in MCP domain.\n");
        sb.append(" */\n");
        sb.append("function initializeCoreMod() {\n");
        sb.append("    var Opcodes = Java.type('org.objectweb.asm.Opcodes');\n");
        sb.append("    var Type = Java.type('org.objectweb.asm.Type');\n");
        sb.append("    var fixes = [\n");
        for (Map.Entry<String, Set<String[]>> e : fixes.entrySet()) {
            // 为每个类生成至少一个条目（保证 remap=false 被应用）
            if (e.getValue().isEmpty()) {
                // 空条目：只设置 remap=false，不替换任何值
                sb.append("        ['").append(esc(e.getKey())).append("', 'X', '', ''],\n");
            }
            for (String[] f : e.getValue()) {
                sb.append("        ['").append(esc(e.getKey())).append("', '")
                  .append(esc(f[0])).append("', '").append(esc(f[1])).append("', '").append(esc(f[2])).append("'],\n");
            }
        }
        sb.append("    ];\n");
        sb.append("    // @Shadow aliases：srgName -> MCP 名（dev 类为 MCP 域，mixin 按别名命中真实成员）\n");
        sb.append("    var aliasMap = Object.create(null);\n");
        for (Map.Entry<String, Set<String[]>> e : fixes.entrySet()) {
            for (String[] f : e.getValue()) {
                if (f[0].equals("A")) {
                    sb.append("    aliasMap['").append(esc(f[1])).append("'] = '").append(esc(f[2])).append("';\n");
                }
            }
        }
        sb.append("    // 使用 duck typing 检测类型（避免 Java.type 的 classloader 问题）\n");
        sb.append("    function isAnnotationNode(obj) { return obj && obj.desc && obj.values; }\n");
        sb.append("    function isList(obj) { return obj && typeof obj.size === 'function' && typeof obj.get === 'function'; }\n");
        sb.append("    function applyShadowAlias(ann, memberName) {\n");
        sb.append("        if (!ann) { return; }\n");
        sb.append("        // 防原型属性命中（如 toString/constructor）：只认自有键\n");
        sb.append("        if (!Object.prototype.hasOwnProperty.call(aliasMap, memberName)) { return; }\n");
        sb.append("        var alias = aliasMap[memberName];\n");
        sb.append("        if (typeof alias !== 'string' || alias.length === 0) { return; }\n");
        sb.append("        // @Shadow 无参数时 AnnotationNode.values 为 null，需先创建\n");
        sb.append("        var values = ann.values;\n");
        sb.append("        if (!values) {\n");
        sb.append("            values = new java.util.ArrayList();\n");
        sb.append("            ann.values = values;\n");
        sb.append("        }\n");
        sb.append("        for (var k = 0; k < values.size() - 1; k += 2) {\n");
        sb.append("            if (String(values.get(k)) === 'aliases') { return; }\n");
        sb.append("        }\n");
        sb.append("        values.add('aliases');\n");
        sb.append("        var lst = new java.util.ArrayList();\n");
        sb.append("        lst.add(alias);\n");
        sb.append("        values.add(lst);\n");
        sb.append("    }\n");
        sb.append("    // mod 目标（SRG 域类）的注入在 dev 环境必找不到目标（selector 反查是全局的，\n");
        sb.append("    // remap=false 无效），设 require=0 让注入静默跳过而不是 Critical 崩溃\n");
        sb.append("    function hasRequireZero(clsName) {\n");
        sb.append("        var key = String(clsName);\n");
        sb.append("        for (var i = 0; i < fixes.length; i++) {\n");
        sb.append("            if (fixes[i][0] === key && fixes[i][1] === 'R') { return true; }\n");
        sb.append("        }\n");
        sb.append("        return false;\n");
        sb.append("    }\n");
        sb.append("    function setRequireZero(values) {\n");
        sb.append("        for (var k = 0; k < values.size() - 1; k += 2) {\n");
        sb.append("            if (String(values.get(k)) === 'require') { values.set(k + 1, 0); return; }\n");
        sb.append("        }\n");
        sb.append("        values.add('require');\n");
        sb.append("        values.add(0);\n");
        sb.append("    }\n");
        sb.append("    function isInjectionAnnotation(desc) {\n");
        sb.append("        return desc === 'Lorg/spongepowered/asm/mixin/injection/Inject;' ||\n");
        sb.append("            desc === 'Lorg/spongepowered/asm/mixin/injection/Redirect;' ||\n");
        sb.append("            desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyArg;' ||\n");
        sb.append("            desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyArgs;' ||\n");
        sb.append("            desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyVariable;' ||\n");
        sb.append("            desc === 'Lorg/spongepowered/asm/mixin/injection/ModifyConstant;' ||\n");
        sb.append("            // mixinextras 注入注解（@WrapOperation/@WrapWithCondition/@ModifyExpressionValue\n");
        sb.append("            // 等）：revelationfix ApollyonMixin 的 mod 目标注入靠 require=0 静默跳过\n");
        sb.append("            desc.indexOf('Lcom/llamalad7/mixinextras/injector') === 0;\n");
        sb.append("    }\n");
        sb.append("    function applyFix(ann, clsName) {\n");
        sb.append("        if (!ann || !ann.values) { return; }\n");
        sb.append("        if (String(ann.desc) === 'Lorg/spongepowered/asm/mixin/injection/Desc;') { return; }\n");
        sb.append("        var values = ann.values;\n");
        sb.append("        // remap=false：注入目标名不经过 refmap 反查，method 值保持 MCP 名直接匹配\n");
        sb.append("        // 注意：必须用原语 false 而不是 Boolean(false)——后者在 Nashorn 里是 NativeBoolean 对象，\n");
        sb.append("        // 不是 java.lang.Boolean，mixin 读取 remap 值时类型不匹配而失效。\n");
        sb.append("        var hasRemap = false;\n");
        sb.append("        for (var r = 0; r < values.size() - 1; r += 2) {\n");
        sb.append("            if (String(values.get(r)) === 'remap') { hasRemap = true; break; }\n");
        sb.append("        }\n");
        sb.append("        if (hasRemap) {\n");
        sb.append("            // 已有 remap 键（可能是 true）：强制改为 false\n");
        sb.append("            for (var r = 0; r < values.size() - 1; r += 2) {\n");
        sb.append("                if (String(values.get(r)) === 'remap') { values.set(r + 1, false); break; }\n");
        sb.append("            }\n");
        sb.append("        } else {\n");
        sb.append("            values.add('remap');\n");
        sb.append("            values.add(false);\n");
        sb.append("        }\n");
        sb.append("        for (var k = 0; k < values.size() - 1; k += 2) {\n");
        sb.append("            var key = values.get(k);\n");
        sb.append("            var val = values.get(k + 1);\n");
        sb.append("            // 递归处理嵌套注解（如 @At）\n");
        sb.append("            if (isAnnotationNode(val)) {\n");
        sb.append("                applyFix(val, clsName);\n");
        sb.append("                continue;\n");
        sb.append("            }\n");
        sb.append("            if (String(key) !== 'method' && String(key) !== 'target') { continue; }\n");
        sb.append("            if (isList(val)) {\n");
        sb.append("                for (var x = 0; x < val.size(); x++) {\n");
        sb.append("                    var el = val.get(x);\n");
        sb.append("                    if (isAnnotationNode(el)) {\n");
        sb.append("                        applyFix(el, clsName);\n");
        sb.append("                    } else {\n");
        sb.append("                        val.set(x, fixStr(el, clsName));\n");
        sb.append("                    }\n");
        sb.append("                }\n");
        sb.append("            } else if (val !== null) {\n");
        sb.append("                values.set(k + 1, fixStr(val, clsName));\n");
        sb.append("            }\n");
        sb.append("        }\n");
        sb.append("    }\n");
        sb.append("    function fixStr(s, clsName) {\n");
        sb.append("        // classNode.name is a java.lang.String proxy in Nashorn; normalize it before strict comparison.\n");
        sb.append("        var classKey = String(clsName);\n");
        sb.append("        var dbgDeath = classKey.indexOf('z1gned/goetyrevelation/mixin/DeathArrowMixin') >= 0;\n");
        sb.append("        if (dbgDeath) { print('[FIXINJ-DBG] fixStr class=' + classKey + ' value=' + String(s) + ' type=' + typeof s); }\n");
        sb.append("        for (var i = 0; i < fixes.length; i++) {\n");
        sb.append("            if (fixes[i][0] === classKey && String(s) === fixes[i][2]) { if (dbgDeath) { print('[FIXINJ-DBG] matched ' + fixes[i][2] + ' -> ' + fixes[i][3]); } return fixes[i][3]; }\n");
        sb.append("        }\n");
        sb.append("        return s;\n");
        sb.append("    }\n");
        sb.append("    // 与其他 mod mixin 冲突的注入整体禁用的类（strip 名单）\n");
        sb.append("    function isStripClass(name) {\n");
        sb.append("        var n = String(name);\n");
        for (String sc : STRIP_LIST) {
            sb.append("        if (n === '").append(sc).append("') { return true; }\n");
        }
        sb.append("        return false;\n");
        sb.append("    }\n");
        sb.append("    function makeTransformer() {\n");
        sb.append("        return function (classNode) {\n");
        sb.append("            var isDbg = String(classNode.name).indexOf('revelationfix/mixin/LivingEntityMixin') >= 0 || String(classNode.name).indexOf('z1gned/goetyrevelation/mixin/DeathArrowMixin') >= 0 || String(classNode.name).indexOf('endinglib/mixin/personal_rule/PlayerMixin') >= 0;\n");
        sb.append("            if (isDbg) { print('[FIXINJ-DBG] transforming ' + classNode.name); }\n");
        sb.append("            var methods = classNode.methods;\n");
        sb.append("            // 与其他 mod mixin 冲突的注入整体禁用（删除方法级注解，保留类级 @Mixin）——\n");
        sb.append("            // 如 revelationfix AnvilMenuMixin merge createResult 导致 ae2 的\n");
        sb.append("            // @At(INVOKE) 无法注入（disable_*.js 对 gradle 依赖的 mixin 类不可靠）\n");
        sb.append("            if (isStripClass(classNode.name)) {\n");
        sb.append("                for (var si = 0; si < methods.size(); si++) {\n");
        sb.append("                    var sm = methods.get(si);\n");
        sb.append("                    var stabs = [sm.visibleAnnotations, sm.invisibleAnnotations];\n");
        sb.append("                    for (var st = 0; st < stabs.length; st++) {\n");
        sb.append("                        var slist = stabs[st];\n");
        sb.append("                        if (!slist) { continue; }\n");
        sb.append("                        for (var sj = slist.size() - 1; sj >= 0; sj--) {\n");
        sb.append("                            var sa = slist.get(sj);\n");
        sb.append("                            if (String(sa.desc).indexOf('org/spongepowered/asm/mixin/') >= 0 ||\n");
        sb.append("                                String(sa.desc).indexOf('mixinextras') >= 0) {\n");
        sb.append("                                slist.remove(sj);\n");
        sb.append("                            }\n");
        sb.append("                        }\n");
        sb.append("                    }\n");
        sb.append("                }\n");
        sb.append("                return classNode;\n");
        sb.append("            }\n");
        sb.append("            for (var i = 0; i < methods.size(); i++) {\n");
        sb.append("                var m = methods.get(i);\n");
        sb.append("                var tabs = [m.visibleAnnotations, m.invisibleAnnotations];\n");
        sb.append("                for (var t = 0; t < tabs.length; t++) {\n");
        sb.append("                    var list = tabs[t];\n");
        sb.append("                    if (!list) { continue; }\n");
        sb.append("                    for (var j = 0; j < list.size(); j++) {\n");
        sb.append("                        var ann = list.get(j);\n");
        sb.append("                        if (isDbg) { print('[FIXINJ-DBG]   method=' + m.name + ' ann=' + (ann && ann.desc ? ann.desc : 'null')); }\n");
        sb.append("                        if (ann && ann.desc === 'Lorg/spongepowered/asm/mixin/Shadow;') {\n");
        sb.append("                            var srgName = m.name;\n");
        sb.append("                            if (srgName.indexOf('shadow$') === 0) { srgName = srgName.substring(7); }\n");
        sb.append("                            if (isDbg) { print('[FIXINJ-DBG]     shadow srg=' + srgName + ' alias=' + aliasMap[srgName]); }\n");
        sb.append("                            applyShadowAlias(ann, srgName);\n");
        sb.append("                            // @Shadow 方法可见性提升：mixin 的 conformVisibility 检查 handler\n");
        sb.append("                            // 可见性不能低于目标方法（endinglib PlayerMixin m_36218_ protected\n");
        sb.append("                            // shadow -> decorateDisplayNameComponent public -> \"cannot reduce\n");
        sb.append("                            // visibiliy of PUBLIC target method\"）。正式环境 SRG 域目标同名\n");
        sb.append("                            // 同 access 不触发；dev 环境按 handler 提升到 public 后检查通过。\n");
        sb.append("                            // @Shadow 只是引用声明（不注入目标类），提升无副作用。\n");
        sb.append("                            if ((m.access & Opcodes.ACC_PROTECTED) !== 0) {\n");
        sb.append("                                m.access = (m.access & ~Opcodes.ACC_PROTECTED) | Opcodes.ACC_PUBLIC;\n");
        sb.append("                            }\n");
        sb.append("                            if (isDbg && ann.values) { print('[FIXINJ-DBG]     after values=' + ann.values.toString()); }\n");
        sb.append("                        }\n");
        sb.append("                        // mod 目标类（SRG 域）的注入注解：require=0 静默跳过\n");
        sb.append("                        if (ann && ann.desc && isInjectionAnnotation(String(ann.desc)) && hasRequireZero(classNode.name)) {\n");
        sb.append("                            if (ann.values) { setRequireZero(ann.values); }\n");
        sb.append("                        }\n");
        sb.append("                        applyFix(ann, classNode.name);\n");
        sb.append("                        if (isDbg && ann && ann.values) { print('[FIXINJ-DBG]     final values=' + ann.values.toString()); }\n");
        sb.append("                    }\n");
        sb.append("                }\n");
        sb.append("            }\n");
        sb.append("            var fields = classNode.fields;\n");
        sb.append("            if (fields) {\n");
        sb.append("                for (var fi = 0; fi < fields.size(); fi++) {\n");
        sb.append("                    var f = fields.get(fi);\n");
        sb.append("                    var ftabs = [f.visibleAnnotations, f.invisibleAnnotations];\n");
        sb.append("                    for (var ft = 0; ft < ftabs.length; ft++) {\n");
        sb.append("                        var flist = ftabs[ft];\n");
        sb.append("                        if (!flist) { continue; }\n");
        sb.append("                        for (var fj = 0; fj < flist.size(); fj++) {\n");
        sb.append("                            var fann = flist.get(fj);\n");
        sb.append("                            if (fann && fann.desc === 'Lorg/spongepowered/asm/mixin/Shadow;') {\n");
        sb.append("                                applyShadowAlias(fann, f.name);\n");
        sb.append("                            }\n");
        sb.append("                        }\n");
        sb.append("                    }\n");
        sb.append("                }\n");
        sb.append("            }\n");
        sb.append("            // @Shadow 字段引用改写：mixin 字节码里 GETFIELD/PUTFIELD (target)f_XXX\n");
        sb.append("            // 改写为 (target)mcpField——补的桥接字段是 null/不同步，mixin 读写会 NPE/不一致。\n");
        sb.append("            // PUTFIELD 写真实 final 字段会 IllegalAccessError：auto_srg 会给 @Shadow\n");
        sb.append("            // 对应 MCP 字段清 ACC_FINAL（@Mutable 语义），保证写入合法。\n");
        sb.append("            var fieldRefs = fieldRefMap[classNode.name];\n");
        sb.append("            if (fieldRefs) {\n");
        sb.append("                for (var fi2 = 0; fi2 < methods.size(); fi2++) {\n");
        sb.append("                    var fm = methods.get(fi2);\n");
        sb.append("                    for (var fj2 = 0; fj2 < fm.instructions.size(); fj2++) {\n");
        sb.append("                        var fin2 = fm.instructions.get(fj2);\n");
        sb.append("                        var op = fin2.getOpcode();\n");
        sb.append("                        if (op !== Opcodes.GETFIELD && op !== Opcodes.PUTFIELD\n");
        sb.append("                            && op !== Opcodes.GETSTATIC && op !== Opcodes.PUTSTATIC) { continue; }\n");
        sb.append("                        for (var fr = 0; fr < fieldRefs.length; fr++) {\n");
        sb.append("                            var frr = fieldRefs[fr];\n");
        sb.append("                            // owner 可能是 target 类，也可能是 mixin 类自身（@Shadow 字段声明处，\n");
        sb.append("                            // mixin 应用时才 patch 成 target 类；转换发生在 patch 之前）。\n");
        sb.append("                            // 改写时把 owner 也设为 target 类（mixin 类合并后不存在）\n");
        sb.append("                            if ((fin2.owner === frr[0] || fin2.owner === classNode.name) && fin2.name === frr[1] && fin2.desc === frr[3]) {\n");
        sb.append("                                fin2.name = frr[2];\n");
        sb.append("                                fin2.owner = frr[0];\n");
        sb.append("                                break;\n");
        sb.append("                            }\n");
        sb.append("                        }\n");
        sb.append("                    }\n");
        sb.append("                }\n");
        sb.append("            }\n");
        sb.append("            // @Shadow/抽象 handler 方法可见性提升（无条件）：mixin 的 conformVisibility\n");
        sb.append("            // 检查 handler 可见性不能低于目标方法（endinglib PlayerMixin m_36218_\n");
        sb.append("            // protected shadow -> decorateDisplayNameComponent public -> \"cannot\n");
        sb.append("            // reduce visibiliy of PUBLIC target method\"）。正式环境 SRG 域目标同名\n");
        sb.append("            // 同 access 不触发；dev 环境把 protected/private 的 m_ 名方法提升到 public\n");
        sb.append("            // 后检查通过。@Shadow 只是引用声明（不注入目标类），提升无副作用；\n");
        sb.append("            // @Unique 方法提升后注入目标类也更宽（无碍）。不依赖 @Shadow 注解\n");
        sb.append("            // 存在（其他 transformer 可能已移除注解，mixin 的 PREPARE 已缓存类结构）。\n");
        sb.append("            for (var vi = 0; vi < methods.size(); vi++) {\n");
        sb.append("                var vm = methods.get(vi);\n");
        sb.append("                if (vm.name.indexOf('m_') === 0 && (vm.access & Opcodes.ACC_PROTECTED) !== 0) {\n");
        sb.append("                    vm.access = (vm.access & ~Opcodes.ACC_PROTECTED) | Opcodes.ACC_PUBLIC;\n");
        sb.append("                }\n");
        sb.append("            }\n");
        sb.append("            return classNode;\n");
        sb.append("        };\n");
        sb.append("    }\n\n");
        sb.append("    var fieldRefMap = {};\n");
        for (Map.Entry<String, Set<String[]>> e : fieldRefFixes.entrySet()) {
            sb.append("    fieldRefMap['").append(esc(e.getKey())).append("'] = [\n");
            for (String[] fr : e.getValue()) {
                sb.append("        ['").append(esc(fr[0])).append("', '").append(esc(fr[1])).append("', '").append(esc(fr[2])).append("', '").append(esc(fr[3])).append("'],\n");
            }
            sb.append("    ];\n");
        }
        sb.append("    var targets = {};\n");
        sb.append("    var seen = {};\n");
        sb.append("    for (var i = 0; i < fixes.length; i++) {\n");
        sb.append("        var cls = fixes[i][0];\n");
        sb.append("        if (!seen[cls]) {\n");
        sb.append("            seen[cls] = true;\n");
        sb.append("            targets['gtgcore_fix_inj_' + i] = {\n");
        sb.append("                'target': { 'type': 'CLASS', 'name': cls },\n");
        sb.append("                'transformer': makeTransformer()\n");
        sb.append("            };\n");
        sb.append("        }\n");
        sb.append("    }\n");
        sb.append("    // @Shadow 字段引用改写的类也要注册 transformer（可能没有注入注解条目）\n");
        sb.append("    for (var fk in fieldRefMap) {\n");
        sb.append("        if (!seen[fk]) {\n");
        sb.append("            seen[fk] = true;\n");
        sb.append("            targets['gtgcore_fix_inj_field_' + fk.replace(/\\//g, '_')] = {\n");
        sb.append("                'target': { 'type': 'CLASS', 'name': fk },\n");
        sb.append("                'transformer': makeTransformer()\n");
        sb.append("            };\n");
        sb.append("        }\n");
        sb.append("    }\n");
        sb.append("    return targets;\n");
        sb.append("}\n");
        Files.write(Paths.get(outPath), sb.toString().getBytes("UTF-8"));
        System.out.println("Generated: " + outPath + " (mixin classes=" + fixes.size()
            + ", value pairs=" + fixes.values().stream().mapToInt(Set::size).sum() + ")");
    }

    static String esc(String s) {
        return s.replace("\\", "\\\\").replace("'", "\\'");
    }
}
