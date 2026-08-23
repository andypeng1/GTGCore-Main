import org.objectweb.asm.*;
import org.objectweb.asm.tree.*;
import java.io.*;
import java.util.*;
import java.util.jar.*;

/**
 * 临时调试工具：扫描 run/mods + recomp jar，找出所有引用
 * m_101154_ / m_101315_ / m_107419_ / m_10863_ / m_11553_ / m_11615_ / m_119379_ / m_120169_ 等
 * create 系列 SRG 名的调用点（owner/name/desc + 所在类），确认错误桥接的来源。
 */
public class TraceCreateRefs {
    static final Set<String> WATCH = new HashSet<>(Arrays.asList(
        "m_101154_", "m_101315_", "m_107419_", "m_10863_", "m_11553_", "m_11615_",
        "m_119379_", "m_119383_", "m_120169_", "m_120640_", "m_122779_", "m_125025_",
        "m_125592_", "m_125601_"));
    static final Set<String> WATCH_OWNER = new HashSet<>(Arrays.asList(
        "net/minecraft/server/packs/resources/SimpleReloadInstance"));

    public static void main(String[] args) throws Exception {
        scanDir(new File(args[0]), args.length > 1 ? args[1] : null);
    }

    static void scanDir(File dir, String recomp) throws Exception {
        if (dir.isDirectory()) {
            File[] fs = dir.listFiles();
            if (fs != null) {
                for (File f : fs) {
                    if (f.getName().endsWith(".jar")) scanJar(f);
                    else if (f.isDirectory()) scanDir(f, null);
                }
            }
        }
        if (recomp != null) scanJar(new File(recomp));
    }

    static void scanJar(File jar) throws Exception {
        try (JarFile jf = new JarFile(jar)) {
            Enumeration<JarEntry> en = jf.entries();
            while (en.hasMoreElements()) {
                JarEntry e = en.nextElement();
                if (!e.getName().endsWith(".class")) continue;
                ClassReader cr = new ClassReader(jf.getInputStream(e));
                ClassNode cn = new ClassNode();
                cr.accept(cn, 0);
                for (MethodNode m : cn.methods) {
                    for (AbstractInsnNode insn : m.instructions) {
                        if (insn instanceof MethodInsnNode) {
                            MethodInsnNode min = (MethodInsnNode) insn;
                            if (WATCH.contains(min.name)) {
                                System.out.println(jar.getName().replace('\\', '/') + " " + cn.name
                                    + "." + m.name + m.desc + " -> " + min.getOpcode() + " "
                                    + min.owner + "." + min.name + min.desc);
                            }
                        }
                    }
                }
            }
        }
    }
}
