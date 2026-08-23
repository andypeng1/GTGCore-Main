import org.objectweb.asm.ClassReader;
import org.objectweb.asm.tree.*;
import java.util.*;
import java.util.jar.*;
import java.io.*;
import java.nio.file.*;

/** 扫描所有 mixin 的 @Shadow/@Overwrite/@Inject 引用的 SRG 成员（m_/f_），对照目标类检查缺失 */
public class ScanShadowMissing {
    static Set<String> visited = new HashSet<>();
    static Map<String, ClassNode> mcClasses = new HashMap<>();
    static String MC_JAR;

    public static void main(String[] args) throws Exception {
        MC_JAR = args[1];
        // 预加载 MC 类索引（方法名+desc）
        try (JarFile jf = new JarFile(MC_JAR)) {
            Enumeration<JarEntry> en = jf.entries();
            while (en.hasMoreElements()) {
                JarEntry e = en.nextElement();
                if (!e.getName().endsWith(".class")) continue;
                try {
                    ClassReader cr = new ClassReader(jf.getInputStream(e));
                    ClassNode cn = new ClassNode();
                    cr.accept(cn, 0);
                    mcClasses.put(cn.name, cn);
                } catch (Exception ex) {}
            }
        }
        System.out.println("MC classes loaded: " + mcClasses.size());
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
                    // @Mixin 目标
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
                    if (mixinTarget == null) continue;
                    for (MethodNode m : cn.methods) {
                        List<AnnotationNode> anns = new ArrayList<>();
                        if (m.invisibleAnnotations != null) anns.addAll(m.invisibleAnnotations);
                        if (m.visibleAnnotations != null) anns.addAll(m.visibleAnnotations);
                        for (AnnotationNode a : anns) {
                            if (a.desc.equals("Lorg/spongepowered/asm/mixin/Shadow;")) {
                                // @Shadow 方法：名字在方法名（SRG 名）
                                String srgName = m.name;
                                if (srgName.startsWith("m_") || srgName.startsWith("f_")) {
                                    ClassNode target = mcClasses.get(mixinTarget);
                                    if (target != null) {
                                        boolean found = false;
                                        for (MethodNode tm : target.methods) {
                                            if (tm.name.equals(srgName) && tm.desc.equals(m.desc)) { found = true; break; }
                                        }
                                        if (!found) {
                                            System.out.println("MISSING-METHOD [" + jar.getName() + "] " + cn.name
                                                + " @Shadow " + srgName + m.desc + " -> " + mixinTarget);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // 字段 @Shadow
                    for (FieldNode f : cn.fields) {
                        List<AnnotationNode> anns = new ArrayList<>();
                        if (f.invisibleAnnotations != null) anns.addAll(f.invisibleAnnotations);
                        if (f.visibleAnnotations != null) anns.addAll(f.visibleAnnotations);
                        for (AnnotationNode a : anns) {
                            if (a.desc.equals("Lorg/spongepowered/asm/mixin/Shadow;") && (f.name.startsWith("m_") || f.name.startsWith("f_"))) {
                                ClassNode target = mcClasses.get(mixinTarget);
                                if (target != null) {
                                    boolean found = false;
                                    for (FieldNode tf : target.fields) {
                                        if (tf.name.equals(f.name) && tf.desc.equals(f.desc)) { found = true; break; }
                                    }
                                    if (!found) {
                                        System.out.println("MISSING-FIELD [" + jar.getName() + "] " + cn.name
                                            + " @Shadow " + f.name + " " + f.desc + " -> " + mixinTarget);
                                    }
                                }
                            }
                        }
                    }
                } catch (Exception ex) {}
            }
        }
    }
}
