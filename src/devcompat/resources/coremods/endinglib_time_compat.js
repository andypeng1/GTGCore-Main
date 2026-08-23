// auto-generated coremod for net.minecraft.client.Minecraft
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
    return {
        'gtgcore_auto': {
            'target': { 'type': 'CLASS', 'name': 'net.minecraft.client.Minecraft' },
            'transformer': function (classNode) {
                var fields = classNode.fields;
                var methods = classNode.methods;
                // f_XXX = chatListener (net.minecraft.client.multiplayer.chat.ChatListener)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_240378_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_240378_', 'Lnet/minecraft/client/multiplayer/chat/ChatListener;', null, null)); }
                // f_XXX = timer (net.minecraft.client.Timer)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_90991_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_90991_', 'Lnet/minecraft/client/Timer;', null, null)); }
                // f_XXX = tutorial (net.minecraft.client.tutorial.Tutorial)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91005_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91005_', 'Lnet/minecraft/client/tutorial/Tutorial;', null, null)); }
                // f_XXX = singleplayerServer (net.minecraft.client.server.IntegratedServer)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91007_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91007_', 'Lnet/minecraft/client/server/IntegratedServer;', null, null)); }
                // f_XXX = rightClickDelay (int)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91011_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91011_', 'I', null, null)); }
                // f_XXX = pause (boolean)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91012_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91012_', 'Z', null, null)); }
                // f_XXX = pausePartialTick (float)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91013_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91013_', 'F', null, null)); }
                // f_XXX = profiler (net.minecraft.util.profiling.ProfilerFiller)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91026_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91026_', 'Lnet/minecraft/util/profiling/ProfilerFiller;', null, null)); }
                // f_XXX = soundManager (net.minecraft.client.sounds.SoundManager)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91043_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91043_', 'Lnet/minecraft/client/sounds/SoundManager;', null, null)); }
                // f_XXX = gameRenderer (net.minecraft.client.renderer.GameRenderer)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91063_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91063_', 'Lnet/minecraft/client/renderer/GameRenderer;', null, null)); }
                // f_XXX = gui (net.minecraft.client.gui.Gui)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91065_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91065_', 'Lnet/minecraft/client/gui/Gui;', null, null)); }
                // f_XXX = options (net.minecraft.client.Options)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91066_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91066_', 'Lnet/minecraft/client/Options;', null, null)); }
                // f_XXX = keyboardHandler (net.minecraft.client.KeyboardHandler)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91068_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91068_', 'Lnet/minecraft/client/KeyboardHandler;', null, null)); }
                // f_XXX = gameMode (net.minecraft.client.multiplayer.MultiPlayerGameMode)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91072_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91072_', 'Lnet/minecraft/client/multiplayer/MultiPlayerGameMode;', null, null)); }
                // f_XXX = level (net.minecraft.client.multiplayer.ClientLevel)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91073_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91073_', 'Lnet/minecraft/client/multiplayer/ClientLevel;', null, null)); }
                // f_XXX = player (net.minecraft.client.player.LocalPlayer)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91074_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91074_', 'Lnet/minecraft/client/player/LocalPlayer;', null, null)); }
                // f_XXX = hitResult (net.minecraft.world.phys.HitResult)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91077_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91077_', 'Lnet/minecraft/world/phys/HitResult;', null, null)); }
                // f_XXX = missTime (int)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91078_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91078_', 'I', null, null)); }
                // f_XXX = screen (net.minecraft.client.gui.screens.Screen)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91080_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91080_', 'Lnet/minecraft/client/gui/screens/Screen;', null, null)); }
                // f_XXX = overlay (net.minecraft.client.gui.screens.Overlay)
                var hasF = false; for (var i=0;i<fields.size();i++){ if(fields.get(i).name==='f_91081_'){hasF=true;break;} }
                if(!hasF){ fields.add(new FieldNode(Opcodes.ACC_PUBLIC, 'f_91081_', 'Lnet/minecraft/client/gui/screens/Overlay;', null, null)); }
                // m_XXX = hasSingleplayerServer ()Z
                var hasM = false; for (var j=0;j<methods.size();j++){ var mm=methods.get(j); if(mm.name==='m_91091_' && mm.desc==='()Z'){hasM=true;break;} }
                if(!hasM){ var mm=new MethodNode(Opcodes.ACC_PUBLIC, 'm_91091_', '()Z', null, null);
                    var d='()Z'; var nArgs=0; for(var a=1;a<d.indexOf(')');a++){ var c=d.charAt(a); if(c!='[') nArgs++; }
                    for(var a=0;a<=nArgs;a++){ mm.instructions.add(new VarInsnNode(Opcodes.ALOAD, a)); }
                    mm.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL, 'net/minecraft/client/Minecraft', 'hasSingleplayerServer', '()Z', false)); mm.instructions.add(new InsnNode(Opcodes.IRETURN));
                    methods.add(mm); }
                // m_XXX = setScreen (Lnet/minecraft/client/gui/screens/Screen;)V
                var hasM = false; for (var j=0;j<methods.size();j++){ var mm=methods.get(j); if(mm.name==='m_91152_' && mm.desc==='(Lnet/minecraft/client/gui/screens/Screen;)V'){hasM=true;break;} }
                if(!hasM){ var mm=new MethodNode(Opcodes.ACC_PUBLIC, 'm_91152_', '(Lnet/minecraft/client/gui/screens/Screen;)V', null, null);
                    var d='(Lnet/minecraft/client/gui/screens/Screen;)V'; var nArgs=0;
                    var i2=1; while(d.charAt(i2)!==')'){ if(d.charAt(i2)==='L'){ nArgs++; while(d.charAt(i2)!==';'){i2++;} } else if(d.charAt(i2)!=='['){ nArgs++; } i2++; }
                    for(var a=0;a<=nArgs;a++){ mm.instructions.add(new VarInsnNode(Opcodes.ALOAD, a)); }
                    mm.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL, 'net/minecraft/client/Minecraft', 'setScreen', '(Lnet/minecraft/client/gui/screens/Screen;)V', false)); mm.instructions.add(new InsnNode(Opcodes.RETURN));
                    methods.add(mm); }
                // m_XXX = handleKeybinds ()V
                var hasM = false; for (var j=0;j<methods.size();j++){ var mm=methods.get(j); if(mm.name==='m_91279_' && mm.desc==='()V'){hasM=true;break;} }
                if(!hasM){ var mm=new MethodNode(Opcodes.ACC_PUBLIC, 'm_91279_', '()V', null, null);
                    var d='()V'; var nArgs=0; for(var a=1;a<d.indexOf(')');a++){ var c=d.charAt(a); if(c!='[') nArgs++; }
                    for(var a=0;a<=nArgs;a++){ mm.instructions.add(new VarInsnNode(Opcodes.ALOAD, a)); }
                    mm.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL, 'net/minecraft/client/Minecraft', 'handleKeybinds', '()V', false)); mm.instructions.add(new InsnNode(Opcodes.RETURN));
                    methods.add(mm); }
                // m_XXX = tick ()V
                var hasM = false; for (var j=0;j<methods.size();j++){ var mm=methods.get(j); if(mm.name==='m_91398_' && mm.desc==='()V'){hasM=true;break;} }
                if(!hasM){ var mm=new MethodNode(Opcodes.ACC_PUBLIC, 'm_91398_', '()V', null, null);
                    var d='()V'; var nArgs=0; for(var a=1;a<d.indexOf(')');a++){ var c=d.charAt(a); if(c!='[') nArgs++; }
                    for(var a=0;a<=nArgs;a++){ mm.instructions.add(new VarInsnNode(Opcodes.ALOAD, a)); }
                    mm.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL, 'net/minecraft/client/Minecraft', 'tick', '()V', false)); mm.instructions.add(new InsnNode(Opcodes.RETURN));
                    methods.add(mm); }
                return classNode;
            }
        }
    };
}
