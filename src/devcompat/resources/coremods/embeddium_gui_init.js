/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * SRG 域 mod GUI 类 override 的是 Screen.m_7856_（init 的 SRG 名），而 dev 环境
 * vanilla 的 Minecraft.setScreen 调用的是 MCP 名 Screen.init——dispatch 不到
 * mod 类的 m_7856_ → init 空转 → 控件/布局（frame、logoDim 等）从不初始化 →
 * 渲染时 NPE（EmbeddiumVideoOptionsScreen.logoDim null 等）。
 * <p>
 * 给 embeddium 的 GUI 类补 MCP 名 init 桥接（INVOKESPECIAL 直调自身 m_7856_，
 * 不 dispatch，避免与 Screen 系 m_7856_ 桥接互调递归——见 fix_screen_init_bridge.js）。
 * 注意 m_7856_ 是 protected：桥接方法位于同类内部，INVOKESPECIAL 调用合法。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');
    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

    function makeBridge(classNode) {
        var methods = classNode.methods;
        for (var i = 0; i < methods.size(); i++) {
            var m = methods.get(i);
            if (m.name === 'init' && m.desc === '()V') { return classNode; }
        }
        var hasSrg = false;
        for (var i = 0; i < methods.size(); i++) {
            var m = methods.get(i);
            if (m.name === 'm_7856_' && m.desc === '()V') { hasSrg = true; break; }
        }
        if (!hasSrg) { return classNode; }
        var bridge = new MethodNode(Opcodes.ACC_PUBLIC, 'init', '()V', null, null);
        bridge.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));
        bridge.instructions.add(new MethodInsnNode(Opcodes.INVOKESPECIAL,
            classNode.name, 'm_7856_', '()V', false));
        bridge.instructions.add(new InsnNode(Opcodes.RETURN));
        methods.add(bridge);
        return classNode;
    }

    return {
        'gtgcore_embeddium_video_options_init': {
            'target': { 'type': 'CLASS', 'name': 'org/embeddedt/embeddium/gui/EmbeddiumVideoOptionsScreen' },
            'transformer': makeBridge
        },
        'gtgcore_embeddium_prompt_screen_init': {
            'target': { 'type': 'CLASS', 'name': 'org/embeddedt/embeddium/gui/screen/PromptScreen' },
            'transformer': makeBridge
        },
        'gtgcore_sodium_config_corrupted_init': {
            'target': { 'type': 'CLASS', 'name': 'me/jellysquid/mods/sodium/client/gui/screen/ConfigCorruptedScreen' },
            'transformer': makeBridge
        }
    };
}
