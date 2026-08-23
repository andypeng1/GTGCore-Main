import org.objectweb.asm.ClassReader;
import org.objectweb.asm.tree.*;
import java.util.*;
import java.io.*;
public class TestScan {
    public static void main(String[] args) throws Exception {
        ClassReader cr = new ClassReader(new FileInputStream(args[0]));
        ClassNode cn = new ClassNode();
        cr.accept(cn, 0);
        String mixinTarget = null;
        for (AnnotationNode a : cn.visibleAnnotations != null ? cn.visibleAnnotations : new ArrayList<AnnotationNode>()) {
            if (a.desc.equals("Lorg/spongepowered/asm/mixin/Mixin;")) {
                System.out.println("@Mixin values=" + a.values);
            }
        }
        for (FieldNode f : cn.fields) {
            List<AnnotationNode> anns = new ArrayList<>();
            if (f.invisibleAnnotations != null) anns.addAll(f.invisibleAnnotations);
            if (f.visibleAnnotations != null) anns.addAll(f.visibleAnnotations);
            for (AnnotationNode a : anns) {
                System.out.println("field " + f.name + " " + f.desc + " anno=" + a.desc + " vis=" + (f.visibleAnnotations != null && f.visibleAnnotations.contains(a)));
            }
        }
    }
}
