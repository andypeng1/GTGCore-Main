import org.objectweb.asm.ClassReader;
import java.util.List;
import org.objectweb.asm.tree.*;
import java.util.jar.*;
public class DebugScan {
    public static void main(String[] args) throws Exception {
        try (JarFile jf = new JarFile(args[0])) {
            ClassReader cr = new ClassReader(jf.getInputStream(jf.getEntry("com/moakiee/ae2lt/mixin/LivingEntityShieldHitFeedbackMixin.class")));
            ClassNode cn = new ClassNode();
            cr.accept(cn, 0);
            System.out.println("class: " + cn.name);
            List<AnnotationNode> anns = new java.util.ArrayList<>();
            if (cn.visibleAnnotations != null) anns.addAll(cn.visibleAnnotations);
            if (cn.invisibleAnnotations != null) anns.addAll(cn.invisibleAnnotations);
            for (AnnotationNode a : anns) {
                System.out.println("anno: " + a.desc + " values=" + a.values);
            }
        }
    }
}
