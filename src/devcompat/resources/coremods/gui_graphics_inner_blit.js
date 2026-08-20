/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * EndingLibrary 的 GuiGraphicsMixin 用 @Shadow 引用 SRG 方法（refmap 无条目，
 * @Shadow 方法查找基于 ClassInfo，mixin 动态添加的方法不可见），只能走 CoreMod：
 * - m_280444_ (Lnet/minecraft/resources/ResourceLocation;IIIIIFFFF)V → 官方名 innerBlit
 * - m_280479_ (Lnet/minecraft/resources/ResourceLocation;IIIIIFFFFFFFF)V → 官方名 innerBlit
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_gui_graphics_inner_blit': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.gui.GuiGraphics'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                function addEmpty(name, desc) {
                    for (var i = 0; i < methods.size(); i++) {
                        var m = methods.get(i);
                        if (m.name === name && m.desc === desc) { return; }
                    }
                    // instance 方法（EndingLibrary 的 @Shadow 声明为非 static）
                    var method = new MethodNode(Opcodes.ACC_PRIVATE, name, desc, null, null);
                    method.instructions.add(new InsnNode(Opcodes.RETURN));
                    methods.add(method);
                }

                // renderTooltipInternal：方法体内含 List.size() 调用（EndingLibrary 的注入点要求），
                // 并提供 RenderTooltipEvent$Pre 局部变量（null）供 @Local 捕获
                function addRenderTooltipInternal(name, desc) {
                    for (var i = 0; i < methods.size(); i++) {
                        var m = methods.get(i);
                        if (m.name === name && m.desc === desc) { return; }
                    }
                    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
                    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
                    var LabelNode = Java.type('org.objectweb.asm.tree.LabelNode');
                    var LocalVariableNode = Java.type('org.objectweb.asm.tree.LocalVariableNode');
                    var method = new MethodNode(Opcodes.ACC_PRIVATE, name, desc, null, null);
                    var labelStart = new LabelNode();
                    var labelEnd = new LabelNode();
                    method.instructions.add(labelStart);
                    // RenderTooltipEvent$Pre event = null;（注入点前赋值，供 @Local 捕获）
                    method.instructions.add(new InsnNode(Opcodes.ACONST_NULL));
                    method.instructions.add(new VarInsnNode(Opcodes.ASTORE, 6));
                    // list.size();（@At(INVOKE, target="Ljava/util/List;size()I") 注入点）
                    method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));
                    method.instructions.add(new MethodInsnNode(Opcodes.INVOKEINTERFACE,
                        'java/util/List', 'size', '()I', true));
                    method.instructions.add(new InsnNode(Opcodes.POP));
                    method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 6));
                    method.instructions.add(new InsnNode(Opcodes.POP));
                    method.instructions.add(labelEnd);
                    method.instructions.add(new InsnNode(Opcodes.RETURN));
                    // 局部变量表：slot6 = RenderTooltipEvent$Pre（作用域覆盖注入点）
                    method.localVariables.add(new LocalVariableNode('event',
                        'Lnet/minecraftforge/client/event/RenderTooltipEvent$Pre;', null,
                        labelStart, labelEnd, 6));
                    methods.add(method);
                }
                addEmpty('m_280444_', '(Lnet/minecraft/resources/ResourceLocation;IIIIIFFFF)V');
                addEmpty('m_280479_', '(Lnet/minecraft/resources/ResourceLocation;IIIIIFFFFFFFF)V');
                // EndingLibrary 的 @Inject 目标 renderTooltipInternal（1.20.2+ 方法），
                // 注入点要求方法体内有 List.size() 调用（@At(INVOKE, target="Ljava/util/List;size()I")）
                addRenderTooltipInternal('m_280497_',
                    '(Lnet/minecraft/client/gui/Font;Ljava/util/List;IILnet/minecraft/client/gui/screens/inventory/tooltip/ClientTooltipPositioner;)V');
                // EndingLibrary AccessorGuiGraphics 的 @Invoker 目标 flushIfManaged
                addEmpty('m_287246_', '()V');
                return classNode;
            }
        }
    };
}
