import org.objectweb.asm.ClassReader;
import org.objectweb.asm.tree.*;
import java.util.*;
import java.util.jar.*;
import java.io.*;
import java.nio.file.*;

/** 找出所有 @Mixin(target=Player/LocalPlayer/ServerPlayer) 的 mixin 类及其 @Inject/@Overwrite method 值 */
public class ScanPlayerMixin {
    static Set<String> visited = new HashSet<>();
    public static void main(String[] args) throws Exception {
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
                    // 找 @Mixin 注解（类级）
                    String mixinTarget = null;
                    List<AnnotationNode> clsAnns = new ArrayList<>();
                    if (cn.visibleAnnotations != null) clsAnns.addAll(cn.visibleAnnotations);
                    if (cn.invisibleAnnotations != null) clsAnns.addAll(cn.invisibleAnnotations);
                    for (AnnotationNode a : clsAnns) {
                        if (a.desc.equals("Lorg/spongepowered/asm/mixin/Mixin;")) {
                            StringBuilder sb = new StringBuilder();
                            if (a.values != null) {
                                for (int i = 0; i < a.values.size() - 1; i += 2) {
                                    Object v = a.values.get(i + 1);
                                    if (v instanceof List) {
                                        for (Object o : (List<?>) v) {
                                            sb.append(o).append(",");
                                        }
                                    } else sb.append(v).append(",");
                                }
                            }
                            mixinTarget = sb.toString();
                        }
                    }
                    if (mixinTarget == null || !mixinTarget.contains("player/Player") && !mixinTarget.contains("player/LocalPlayer")
                        && !mixinTarget.contains("player/ServerPlayer") && !mixinTarget.contains("AbstractClientPlayer")) continue;
                    System.out.println("=== [" + jar.getName() + "] " + cn.name + " @Mixin(" + mixinTarget + ")");
                    for (MethodNode m : cn.methods) {
                        List<AnnotationNode> anns = new ArrayList<>();
                        if (m.invisibleAnnotations != null) anns.addAll(m.invisibleAnnotations);
                        if (m.visibleAnnotations != null) anns.addAll(m.visibleAnnotations);
                        for (AnnotationNode a : anns) {
                            if (a.desc.contains("mixin/injection/") || a.desc.contains("mixin/Overwrite")) {
                                StringBuilder detail = new StringBuilder("    " + m.name + m.desc + " :: " + a.desc.substring(a.desc.lastIndexOf('/') + 1, a.desc.length() - 1));
                                if (a.values != null) {
                                    for (int i = 0; i < a.values.size() - 1; i += 2) {
                                        Object v = a.values.get(i + 1);
                                        detail.append(" ").append(a.values.get(i)).append("=").append(v instanceof List ? ((List<?>) v).toString() : v);
                                    }
                                }
                                System.out.println(detail);
                            }
                        }
                    }
                } catch (Exception ex) {}
            }
        }
    }
}
