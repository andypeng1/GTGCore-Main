import org.objectweb.asm.ClassReader;
import org.objectweb.asm.tree.*;
import java.util.*;
import java.util.jar.*;
import java.io.*;
import java.nio.file.*;

/** 扫描 mixin @Shadow 的 SRG 成员：若在 output.srg 有 MCP 映射（运行时类为 MCP 域）→ 缺失，需 coremod 补 */
public class ScanShadowMissing2 {
    static Set<String> visited = new HashSet<>();
    static Map<String, String> srgToMcp = new HashMap<>();

    public static void main(String[] args) throws Exception {
        // 加载 output.srg：MD: srgOwner/m_srg desc mcpOwner/m_mcp desc → srgSimple -> mcpSimple
        try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(args[2])))) {
            String l;
            while ((l = br.readLine()) != null) {
                if (l.startsWith("MD:") || l.startsWith("FD:")) {
                    String[] p = l.substring(4).split(" ", 4);
                    if (p.length >= 3) {
                        srgToMcp.put(p[0].substring(p[0].lastIndexOf('/') + 1),
                                     p[2].substring(p[2].lastIndexOf('/') + 1));
                    }
                }
            }
        }
        System.out.println("srg entries: " + srgToMcp.size());
        File modsDir = new File(args[0]);
        for (File f : modsDir.listFiles((d, n) -> n.endsWith(".jar"))) scanJar(f);
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
                                    for (Object o : (List<?>) v) mixinTarget = String.valueOf(o);
                                }
                            }
                        }
                    }
                    if (mixinTarget == null || !mixinTarget.startsWith("Lnet/minecraft")) continue;
                    for (MethodNode m : cn.methods) {
                        List<AnnotationNode> anns = new ArrayList<>();
                        if (m.invisibleAnnotations != null) anns.addAll(m.invisibleAnnotations);
                        if (m.visibleAnnotations != null) anns.addAll(m.visibleAnnotations);
                        for (AnnotationNode a : anns) {
                            if (a.desc.equals("Lorg/spongepowered/asm/mixin/Shadow;")) {
                                String srgName = m.name;
                                if (srgName.startsWith("m_") && srgToMcp.containsKey(srgName)) {
                                    System.out.println("MISSING-METHOD [" + jar.getName() + "] " + cn.name
                                        + " @Shadow " + srgName + " (=" + srgToMcp.get(srgName) + ")" + m.desc
                                        + " -> " + mixinTarget);
                                }
                            }
                        }
                    }
                    for (FieldNode f : cn.fields) {
                        List<AnnotationNode> anns = new ArrayList<>();
                        if (f.invisibleAnnotations != null) anns.addAll(f.invisibleAnnotations);
                        if (f.visibleAnnotations != null) anns.addAll(f.visibleAnnotations);
                        for (AnnotationNode a : anns) {
                            if (a.desc.equals("Lorg/spongepowered/asm/mixin/Shadow;") && f.name.startsWith("f_") && srgToMcp.containsKey(f.name)) {
                                System.out.println("MISSING-FIELD [" + jar.getName() + "] " + cn.name
                                    + " @Shadow " + f.name + " (=" + srgToMcp.get(f.name) + ") " + f.desc
                                    + " -> " + mixinTarget);
                            }
                        }
                    }
                } catch (Exception ex) {}
            }
        }
    }
}
