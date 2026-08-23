import org.objectweb.asm.ClassReader;
import org.objectweb.asm.tree.*;
import org.spongepowered.asm.mixin.injection.selectors.ElementNode;
import org.spongepowered.asm.mixin.injection.selectors.ITargetSelector;
import org.spongepowered.asm.mixin.injection.selectors.MatchResult;
import org.spongepowered.asm.mixin.injection.struct.MemberInfo;
import java.util.jar.JarFile;

public class TestMatch {
    public static void main(String[] args) throws Exception {
        ClassNode cn;
        try (JarFile jar = new JarFile(args[0])) {
            ClassReader cr = new ClassReader(jar.getInputStream(jar.getEntry("net/minecraft/world/entity/player/Player.class")));
            cn = new ClassNode();
            cr.accept(cn, 0);
        }
        String[] names = {"tick", "m_8119_", "Lnet/minecraft/world/entity/player/Player;tick()V", "Lnet/minecraft/world/entity/player/Player;m_8119_()V"};
        for (String n : names) {
            MemberInfo mi = MemberInfo.parse(n, (org.spongepowered.asm.mixin.injection.selectors.ISelectorContext) null);
            System.out.println("== selector: " + n + " -> parsed owner=" + mi.getOwner() + " name=" + mi.getName() + " desc=" + mi.getDesc());
            for (MethodNode m : cn.methods) {
                if (!m.name.equals("tick") && !m.name.equals("m_8119_")) continue;
                MatchResult r = mi.match(ElementNode.of(cn, m));
                System.out.println("    vs " + m.name + m.desc + " insns=" + m.instructions.size() + " => " + r);
            }
        }
    }
}
