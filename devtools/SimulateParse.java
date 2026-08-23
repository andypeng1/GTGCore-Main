import org.spongepowered.asm.mixin.injection.selectors.ISelectorContext;
import org.spongepowered.asm.mixin.injection.selectors.ITargetSelector;
import org.spongepowered.asm.mixin.injection.selectors.TargetSelector;
import org.spongepowered.asm.mixin.injection.struct.MemberInfo;
import org.spongepowered.asm.mixin.refmap.IMixinContext;
import org.spongepowered.asm.mixin.refmap.IReferenceMapper;
import org.spongepowered.asm.mixin.refmap.ReferenceMapper;
import org.spongepowered.asm.mixin.MixinEnvironment;
import org.spongepowered.asm.util.asm.IAnnotationHandle;

import java.io.FileReader;

/** 模拟 mixin 对 @Inject(method="tick") 的解析，打印 refmap 查询结果 */
public class SimulateParse {
    public static void main(String[] args) throws Exception {
        String refmapFile = args[0];
        ReferenceMapper mapper = ReferenceMapper.read(refmapFile);
        mapper.setContext("com/mega/endinglib/mixin/personal_rule/PlayerMixin");

        IMixinContext mixinCtx = new IMixinContext() {
            public org.spongepowered.asm.mixin.extensibility.IMixinInfo getMixin() { return null; }
            public org.spongepowered.asm.mixin.transformer.ext.Extensions getExtensions() { return null; }
            public String getClassName() { return "com.mega.endinglib.mixin.personal_rule.PlayerMixin"; }
            public String getClassRef() { return "com/mega/endinglib/mixin/personal_rule/PlayerMixin"; }
            public String getTargetClassRef() { return "net/minecraft/world/entity/player/Player"; }
            public IReferenceMapper getReferenceMapper() { return mapper; }
            public boolean getOption(MixinEnvironment.Option o) { return false; }
            public int getPriority() { return 900; }
        };

        ISelectorContext ctx = new ISelectorContext() {
            public ISelectorContext getParent() { return null; }
            public IMixinContext getMixin() { return mixinCtx; }
            public Object getMethod() { return null; }
            public IAnnotationHandle getAnnotation() { return null; }
            public IAnnotationHandle getSelectorAnnotation() { return null; }
            public String getSelectorCoordinate(boolean b) { return null; }
            public String remap(String name) {
                String r = mapper.remapWithContext("com/mega/endinglib/mixin/personal_rule/PlayerMixin", "net/minecraft/world/entity/player/Player", name);
                System.out.println("  [context.remap] \"" + name + "\" -> \"" + r + "\"");
                return r;
            }
        };

        System.out.println("== parse(\"tick\") ==");
        ITargetSelector sel = TargetSelector.parse("tick", ctx);
        System.out.println("  selector: " + sel.getClass().getName() + " => " + sel);

        System.out.println("== MemberInfo.parse(\"tick\") ==");
        MemberInfo mi = MemberInfo.parse("tick", ctx);
        System.out.println("  owner=" + mi.getOwner() + " name=" + mi.getName() + " desc=" + mi.getDesc());

        System.out.println("== parse(\"getDisplayName\") ==");
        MemberInfo mi2 = MemberInfo.parse("getDisplayName", ctx);
        System.out.println("  owner=" + mi2.getOwner() + " name=" + mi2.getName() + " desc=" + mi2.getDesc());

        System.out.println("== remapWithContext tick (tick) ==");
        System.out.println("  " + mapper.remapWithContext("com/mega/endinglib/mixin/personal_rule/PlayerMixin", "net/minecraft/world/entity/player/Player", "tick"));
    }
}