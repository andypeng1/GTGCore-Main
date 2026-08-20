/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * ModernFix 的 thread_priorities.UtilMixin 的 @ModifyArg 目标 m_137477_
 * （官方名 Util.makeExecutor(String)ExecutorService），refmap 无条目且
 * 目标查找基于 ClassInfo，只能走 CoreMod 补方法（委托官方实现）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    return {
        'gtgcore_modernfix_util': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.Util'
            },
            'transformer': function (classNode) {
                var methods = classNode.methods;
                var desc = '(Ljava/lang/String;)Ljava/util/concurrent/ExecutorService;';
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name === 'm_137477_' && m.desc === desc) { return classNode; }
                }
                var method = new MethodNode(Opcodes.ACC_PUBLIC + Opcodes.ACC_STATIC, 'm_137477_', desc, null, null);
                // new ForkJoinPool(0, null, null, false);（ModernFix @ModifyArg 的 @At(INVOKE) 注入点要求）
                var TypeInsnNode = Java.type('org.objectweb.asm.tree.TypeInsnNode');
                method.instructions.add(new TypeInsnNode(Opcodes.NEW, 'java/util/concurrent/ForkJoinPool'));
                method.instructions.add(new InsnNode(Opcodes.DUP));
                method.instructions.add(new InsnNode(Opcodes.ICONST_0));
                method.instructions.add(new InsnNode(Opcodes.ACONST_NULL));
                method.instructions.add(new InsnNode(Opcodes.ACONST_NULL));
                method.instructions.add(new InsnNode(Opcodes.ICONST_0));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKESPECIAL,
                    'java/util/concurrent/ForkJoinPool', '<init>',
                    '(ILjava/util/concurrent/ForkJoinPool$ForkJoinWorkerThreadFactory;Ljava/lang/Thread$UncaughtExceptionHandler;Z)V', false));
                method.instructions.add(new InsnNode(Opcodes.POP));
                // return makeExecutor(name);
                method.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
                method.instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC,
                    'net/minecraft/Util', 'makeExecutor', desc, false));
                method.instructions.add(new InsnNode(Opcodes.ARETURN));
                methods.add(method);

                // KubeJS UtilMixin 的 @Inject 目标 m_137580_ → shutdownExecutors()
                var desc2 = '()V';
                var has2 = false;
                for (var k = 0; k < methods.size(); k++) {
                    var mk = methods.get(k);
                    if (mk.name === 'm_137580_' && mk.desc === desc2) { has2 = true; break; }
                }
                if (!has2) {
                    var method2 = new MethodNode(Opcodes.ACC_PUBLIC + Opcodes.ACC_STATIC, 'm_137580_', desc2, null, null);
                    method2.instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC,
                        'net/minecraft/Util', 'shutdownExecutors', desc2, false));
                    method2.instructions.add(new InsnNode(Opcodes.RETURN));
                    methods.add(method2);
                }
                return classNode;
            }
        }
    };
}
