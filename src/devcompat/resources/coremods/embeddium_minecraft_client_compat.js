// auto-generated coremod for net.minecraft.client.Minecraft
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
    return {
        'gtgcore_embeddium_mc_client': {
            'target': { 'type': 'CLASS', 'name': 'net.minecraft.client.Minecraft' },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                var methods = classNode.methods;
                // f_XXX = resourceManager (net.minecraft.server.packs.resources.ReloadableResourceManager)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91036_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91036_', 'Lnet/minecraft/server/packs/resources/ReloadableResourceManager;', null, null)); }
                // f_XXX = screen (net.minecraft.client.gui.screens.Screen)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91080_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91080_', 'Lnet/minecraft/client/gui/screens/Screen;', null, null)); }
                // m_XXX = setScreen (Lnet/minecraft/client/gui/screens/Screen;)V
                var hasM = false; for (var j=0;j<methods.size();j++){ var mm=methods.get(j); if(mm.name==='m_91152_' && mm.desc==='(Lnet/minecraft/client/gui/screens/Screen;)V'){hasM=true;break;} }
                if(!hasM){ var mm=new MethodNode(Opcodes.ACC_PUBLIC, 'm_91152_', '(Lnet/minecraft/client/gui/screens/Screen;)V', null, null);
                    var d='(Lnet/minecraft/client/gui/screens/Screen;)V'; var nArgs=0; for(var a=1;a<d.indexOf(')');a++){ var c=d.charAt(a); if(c!='[') nArgs++; }
                    for(var a=0;a<=nArgs;a++){ mm.instructions.add(new VarInsnNode(Opcodes.ALOAD, a)); }
                    mm.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL, 'net/minecraft/client/Minecraft', 'setScreen', '(Lnet/minecraft/client/gui/screens/Screen;)V', false)); mm.instructions.add(new InsnNode(Opcodes.RETURN));
                    methods.add(mm); }
                return classNode;
            }
        }
    };
}
