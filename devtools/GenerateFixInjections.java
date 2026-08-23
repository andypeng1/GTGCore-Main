import org.objectweb.asm.ClassReader;
import org.objectweb.asm.tree.*;
import java.util.*;
import java.util.jar.*;
import java.io.*;
import java.nio.file.*;
import java.util.regex.*;

/** 扫描所有 mixin 的注入注解（@Inject/@Redirect/@ModifyXxx/@WrapXxx）method/target 值，
 *  把 SRG 名（m_/f_）替换成 MCP 名（保留 desc），生成 fix_injections.js */
public class GenerateFixInjections {
    static Set<String> visited = new HashSet<>();
    static Map<String, String> srgToMcp = new HashMap<>();
    // mixinClass -> [(kind, oldVal, newVal)]  kind: M=method T=target
    static Map<String, Set<String[]>> fixes = new TreeMap<>();
    static Pattern SRG_PATTERN = Pattern.compile("(m_\\d+_|f_\\d+_)");

    public static void main(String[] args) throws Exception {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(args[1])))) {
            String l;
            while ((l = br.readLine()) != null) {
                if (l.startsWith("FD:")) {
                    String[] p = l.substring(4).split(" ");
                    if (p.length >= 2) srgToMcp.put(simple(p[0]), simple(p[1]));
                } else if (l.startsWith("MD:")) {
                    String[] p = l.substring(4).split(" ", 4);
                    if (p.length >= 3) srgToMcp.put(simple(p[0]), simple(p[2]));
                }
            }
        }
        File modsDir = new File(args[0]);
        for (File f : modsDir.listFiles((d, n) -> n.endsWith(".jar"))) scanJar(f);
        generate(args[2]);
    }

    static String simple(String s) { return s.substring(s.lastIndexOf('/') + 1); }

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
            Enumeration<JarEntry> en2 = jf.entries();
            while (en2.hasMoreElements()) {
                JarEntry e = en2.nextElement();
                if (!e.getName().endsWith(".class")) continue;
                try {
                    ClassReader cr = new ClassReader(jf.getInputStream(e));
                    ClassNode cn = new ClassNode();
                    cr.accept(cn, 0);
                    boolean isMixin = false;
                    List<AnnotationNode> clsAnns = new ArrayList<>();
                    if (cn.visibleAnnotations != null) clsAnns.addAll(cn.visibleAnnotations);
                    if (cn.invisibleAnnotations != null) clsAnns.addAll(cn.invisibleAnnotations);
                    for (AnnotationNode a : clsAnns) {
                        if (a.desc.equals("Lorg/spongepowered/asm/mixin/Mixin;")) { isMixin = true; break; }
                    }
                    if (!isMixin) continue;
                    for (MethodNode m : cn.methods) {
                        List<AnnotationNode> anns = new ArrayList<>();
                        if (m.invisibleAnnotations != null) anns.addAll(m.invisibleAnnotations);
                        if (m.visibleAnnotations != null) anns.addAll(m.visibleAnnotations);
                        for (AnnotationNode a : anns) {
                            if (!a.desc.contains("mixin/injection/")) continue;
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
                                    if (!SRG_PATTERN.matcher(s).find()) continue;
                                    String ns = remapStr(s);
                                    if (!ns.equals(s)) {
                                        fixes.computeIfAbsent(cn.name, k -> new TreeSet<>(Comparator.comparing(x -> x[1])))
                                            .add(new String[]{key.equals("method") ? "M" : "T", s, ns});
                                    }
                                }
                            }
                        }
                    }
                } catch (Exception ex) {}
            }
        }
    }

    static String remapStr(String s) {
        String out = s;
        Matcher mat = SRG_PATTERN.matcher(s);
        while (mat.find()) {
            String srg = mat.group(1);
            String mcp = srgToMcp.get(srg);
            if (mcp != null) out = out.replace(srg, mcp);
        }
        return out;
    }

    static void generate(String outPath) throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append("/**\n");
        sb.append(" * auto-generated dev 兼容补丁（GenerateFixInjections 生成）：\n");
        sb.append(" * dev 环境 refmap 反查后 selector 保持 SRG 名，MCP 域类匹配失败；\n");
        sb.append(" * 把注入注解 method/target 值里的 SRG 名替换为 MCP 名（保留 desc），\n");
        sb.append(" * 使 refmap 查询 miss、selector 保持 MCP 名匹配成功。\n");
        sb.append(" */\n");
        sb.append("function initializeCoreMod() {\n");
        sb.append("    function fixAnnotationValues(ann) {\n");
        sb.append("        if (ann === null || ann.values === null) { return; }\n");
        sb.append("        var values = ann.values;\n");
        sb.append("        for (var k = 0; k < values.size() - 1; k += 2) {\n");
        sb.append("            var key = values.get(k);\n");
        sb.append("            if (key !== 'method' && key !== 'target') { continue; }\n");
        sb.append("            var val = values.get(k + 1);\n");
        sb.append("            if (val instanceof java.util.List) {\n");
        sb.append("                for (var x = 0; x < val.size(); x++) {\n");
        sb.append("                    val.set(x, remapStr(val.get(x)));\n");
        sb.append("                }\n");
        sb.append("            } else if (val !== null) {\n");
        sb.append("                values.set(k + 1, remapStr(val));\n");
        sb.append("            }\n");
        sb.append("        }\n");
        sb.append("    }\n");
        sb.append("    var srgMap = {\n");
        // 收集所有替换对
        Set<String> pairs = new TreeSet<>();
        for (Set<String[]> fs : fixes.values()) {
            for (String[] f : fs) {
                // 按 srg 名分组替换（用完整旧值→新值映射，避免全局替换误伤）
                pairs.add("        '" + esc(f[1]) + "': '" + esc(f[2]) + "'");
            }
        }
        sb.append(String.join(",\n", pairs));
        sb.append("\n    };\n");
        sb.append("    function remapStr(s) {\n");
        sb.append("        var out = s;\n");
        sb.append("        for (var k in srgMap) {\n");
        sb.append("            if (srgMap.hasOwnProperty(k) && out.indexOf(k) !== -1) {\n");
        sb.append("                out = out.split(k).join(srgMap[k]);\n");
        sb.append("            }\n");
        sb.append("        }\n");
        sb.append("        return out;\n");
        sb.append("    }\n\n");
        sb.append("    function makeTransformer() {\n");
        sb.append("        return function (classNode) {\n");
        sb.append("            var methods = classNode.methods;\n");
        sb.append("            for (var i = 0; i < methods.size(); i++) {\n");
        sb.append("                var m = methods.get(i);\n");
        sb.append("                fixAnnotationValues(m.visibleAnnotations);\n");
        sb.append("                fixAnnotationValues(m.invisibleAnnotations);\n");
        sb.append("            }\n");
        sb.append("            return classNode;\n");
        sb.append("        };\n");
        sb.append("    }\n\n");
        sb.append("    var targets = {};\n");
        int idx = 0;
        for (Map.Entry<String, Set<String[]>> e : fixes.entrySet()) {
            sb.append("    targets['gtgcore_fix_inj_").append(idx++).append("'] = {\n");
            sb.append("        'target': { 'type': 'CLASS', 'name': '").append(e.getKey()).append("' },\n");
            sb.append("        'transformer': makeTransformer()\n");
            sb.append("    };\n");
        }
        sb.append("    return targets;\n");
        sb.append("}\n");
        Files.write(Paths.get(outPath), sb.toString().getBytes("UTF-8"));
        System.out.println("Generated: " + outPath + " (mixin classes=" + fixes.size() + ", value pairs=" + pairs.size() + ")");
    }

    static String esc(String s) {
        return s.replace("\\", "\\\\").replace("'", "\\'");
    }
}
