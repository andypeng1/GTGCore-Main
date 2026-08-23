import org.objectweb.asm.ClassReader;
import org.objectweb.asm.tree.*;
import java.util.jar.JarFile;
import java.util.Enumeration;
import java.util.jar.JarEntry;

public class InspectPlayer {
    public static void main(String[] args) throws Exception {
        String jarPath = args[0];
        try (JarFile jar = new JarFile(jarPath)) {
            Enumeration<JarEntry> en = jar.entries();
            while (en.hasMoreElements()) {
                JarEntry e = en.nextElement();
                if (!e.getName().equals("net/minecraft/world/entity/player/Player.class")) continue;
                ClassReader cr = new ClassReader(jar.getInputStream(e));
                ClassNode cn = new ClassNode();
                cr.accept(cn, 0);
                System.out.println("Class: " + cn.name + " methods=" + cn.methods.size());
                for (MethodNode m : cn.methods) {
                    if (m.name.equals("tick") || m.name.equals("m_8119_")) {
                        System.out.println("  tick: desc=" + m.desc + " insns=" + m.instructions.size());
                        // print first 10 instructions
                        int count = 0;
                        for (AbstractInsnNode insn : m.instructions) {
                            System.out.println("    " + insn.getOpcode() + " " + insn.getClass().getSimpleName() + (insn instanceof MethodInsnNode ? " " + ((MethodInsnNode)insn).owner + "." + ((MethodInsnNode)insn).name : ""));
                            if (++count >= 10) break;
                        }
                    }
                }
                return;
            }
            System.out.println("Player.class not found");
        }
    }
}