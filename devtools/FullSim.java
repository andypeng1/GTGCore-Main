import org.objectweb.asm.ClassReader;
import org.objectweb.asm.tree.*;
import org.spongepowered.asm.mixin.injection.selectors.ElementNode;
import org.spongepowered.asm.mixin.injection.selectors.ITargetSelector;
import org.spongepowered.asm.mixin.injection.selectors.ITargetSelector.Configure;
import org.spongepowered.asm.mixin.injection.selectors.MatchResult;
import org.spongepowered.asm.mixin.injection.struct.MemberInfo;
import java.util.*;
import java.nio.file.*;
import java.util.jar.*;

public class FullSim {
    static Map<String,String> loadSrgs(String path) throws Exception {
        Map<String,String> map = new HashMap<>();
        for (String line : Files.readAllLines(Paths.get(path))) {
            if (line.isEmpty() || line.startsWith("#") || line.startsWith("CL:")) continue;
            if (line.startsWith("MD:") || line.startsWith("FD:")) {
                String[] parts = line.substring(4).split(" ", 4);
                if (parts.length >= 3) {
                    String key = parts[0].substring(parts[0].lastIndexOf('/') + 1);
                    String val = parts[2].substring(parts[2].lastIndexOf('/') + 1);
                    map.put(key, val);
                }
            }
        }
        return map;
    }

    public static void main(String[] args) throws Exception {
        // 1. load srgs map (SRG -> MCP)
        Map<String,String> srgs = loadSrgs(args.length > 1 ? args[1] : "build/createSrgToMcp/output.srg");
        System.out.println("srgs size=" + srgs.size() + " m_8119_ -> " + srgs.get("m_8119_") + ", m_5446_ -> " + srgs.get("m_5446_"));

        // 2. refmap 查询 + remapRefMap 替换
        String refmapVal = "Lnet/minecraft/world/entity/player/Player;m_8119_()V";
        String remapped = refmapVal;
        for (Map.Entry<String,String> e : srgs.entrySet()) {
            remapped = remapped.replace(e.getKey(), e.getValue());
        }
        System.out.println("refmap result after remap: " + remapped);

        // 3. parse to MemberInfo
        MemberInfo mi = MemberInfo.parse(remapped, null);
        System.out.println("strict selector: owner=" + mi.getOwner() + " name=" + mi.getName() + " desc=" + mi.getDesc());

        // 4. permissive
        ITargetSelector perm = mi.configure(Configure.PERMISSIVE, new String[0]);
        System.out.println("permissive selector: " + perm + " class=" + perm.getClass().getSimpleName());
        if (perm instanceof MemberInfo) {
            MemberInfo p = (MemberInfo) perm;
            System.out.println("  permissive owner=" + p.getOwner() + " name=" + p.getName() + " desc=" + p.getDesc());
        }

        // 5. match against Player (SRG domain)
        ClassNode cn;
        try (JarFile jar = new JarFile(args[0])) {
            ClassReader cr = new ClassReader(jar.getInputStream(jar.getEntry("net/minecraft/world/entity/player/Player.class")));
            cn = new ClassNode();
            cr.accept(cn, 0);
        }
        System.out.println("== strict match ==");
        for (MethodNode m : cn.methods) {
            MatchResult r = mi.match(ElementNode.of(cn, m));
            if (r != MatchResult.NONE) System.out.println("  " + m.name + m.desc + " insns=" + m.instructions.size() + " => " + r);
        }
        System.out.println("== permissive match ==");
        for (MethodNode m : cn.methods) {
            MatchResult r = perm.match(ElementNode.of(cn, m));
            if (r != MatchResult.NONE) System.out.println("  " + m.name + m.desc + " insns=" + m.instructions.size() + " => " + r);
        }
    }
}
