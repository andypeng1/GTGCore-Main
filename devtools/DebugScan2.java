import org.objectweb.asm.ClassReader;
import org.objectweb.asm.tree.*;
import java.util.*;
import java.util.jar.*;
public class DebugScan2 {
    public static void main(String[] args) throws Exception {
        Map<String, String> srgToMcp = new HashMap<>();
        try (java.io.BufferedReader br = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(args[1])))) {
            String l;
            while ((l = br.readLine()) != null) {
                if (l.startsWith("MD:") || l.startsWith("FD:")) {
                    String[] p = l.substring(4).split(" ", 4);
                    if (p.length >= 3) srgToMcp.put(p[0].substring(p[0].lastIndexOf('/') + 1), p[2].substring(p[2].lastIndexOf('/') + 1));
                }
            }
        }
        try (JarFile jf = new JarFile(args[0])) {
            java.util.Enumeration<JarEntry> en = jf.entries();
            while (en.hasMoreElements()) {
                JarEntry e = en.nextElement();
                if (!e.getName().endsWith(".class")) continue;
                try {
                    ClassReader cr = new ClassReader(jf.getInputStream(e));
                    ClassNode cn = new ClassNode();
                    cr.accept(cn, 0);
                    if (!cn.name.contains("ae2lt")) continue;
                    List<AnnotationNode> clsAnns = new ArrayList<>();
                    if (cn.visibleAnnotations != null) clsAnns.addAll(cn.visibleAnnotations);
                    if (cn.invisibleAnnotations != null) clsAnns.addAll(cn.invisibleAnnotations);
                    String mixinTarget = null;
                    for (AnnotationNode a : clsAnns) {
                        if (a.desc.equals("Lorg/spongepowered/asm/mixin/Mixin;")) {
                            for (int i = 0; i < a.values.size() - 1; i += 2) {
                                Object v = a.values.get(i + 1);
                                if (v instanceof List) { for (Object o : (List<?>) v) mixinTarget = String.valueOf(o); }
                            }
                        }
                    }
                    for (org.objectweb.asm.tree.MethodNode m : cn.methods) {
                        List<AnnotationNode> anns = new ArrayList<>();
                        if (m.invisibleAnnotations != null) anns.addAll(m.invisibleAnnotations);
                        if (m.visibleAnnotations != null) anns.addAll(m.visibleAnnotations);
                        for (AnnotationNode a : anns) {
                            if (a.desc.equals("Lorg/spongepowered/asm/mixin/Shadow;")) {
                                System.out.println(cn.name + " mixinTarget=" + mixinTarget + " @Shadow " + m.name + m.desc
                                    + " inSrgMap=" + srgToMcp.containsKey(m.name) + " isMC=" + (mixinTarget != null && mixinTarget.startsWith("net/minecraft")));
                            }
                        }
                    }
                } catch (Exception ex) { System.out.println("ERR: " + e.getName() + " " + ex); }
            }
        }
    }
}
