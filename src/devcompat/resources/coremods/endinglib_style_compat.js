// auto-generated coremod for net.minecraft.network.chat.Style
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
    return {
        'gtgcore_endinglib_style': {
            'target': { 'type': 'CLASS', 'name': 'net.minecraft.network.chat.Style' },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                var methods = classNode.methods;
                // f_XXX = EMPTY (net.minecraft.network.chat.Style)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_131099_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_131099_', 'Lnet/minecraft/network/chat/Style;', null, null)); }
                // f_XXX = color (net.minecraft.network.chat.TextColor)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_131101_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_131101_', 'Lnet/minecraft/network/chat/TextColor;', null, null)); }
                // f_XXX = bold (java.lang.Boolean)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_131102_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_131102_', 'Ljava/lang/Boolean;', null, null)); }
                // f_XXX = italic (java.lang.Boolean)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_131103_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_131103_', 'Ljava/lang/Boolean;', null, null)); }
                // f_XXX = underlined (java.lang.Boolean)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_131104_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_131104_', 'Ljava/lang/Boolean;', null, null)); }
                // f_XXX = strikethrough (java.lang.Boolean)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_131105_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_131105_', 'Ljava/lang/Boolean;', null, null)); }
                // f_XXX = obfuscated (java.lang.Boolean)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_131106_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_131106_', 'Ljava/lang/Boolean;', null, null)); }
                return classNode;
            }
        }
    };
}
