import org.objectweb.asm.ClassReader;
import org.objectweb.asm.tree.*;
import java.util.jar.JarFile;
import java.util.Enumeration;
import java.util.jar.JarEntry;

public class InspectTicks {
    public static void main(String[] args) throws Exception {
        try (JarFile jar = new JarFile(args[0])) {
            Enumeration<JarEntry> en = jar.entries();
            while (en.hasMoreElements()) {
                JarEntry e = en.nextElement();
                if (!e.getName().equals("net/minecraft/world/entity/player/Player.class")) continue;
                ClassReader cr = new ClassReader(jar.getInputStream(e));
                ClassNode cn = new ClassNode();
                cr.accept(cn, 0);
                for (MethodNode m : cn.methods) {
                    if (m.name.contains("tick") || m.name.contains("m_8119_")) {
                        System.out.println("name=" + m.name + " desc=" + m.desc + " insns=" + m.instructions.size() + " access=0x" + Integer.toHexString(m.access));
                    }
                }
                return;
            }
        }
    }
}
