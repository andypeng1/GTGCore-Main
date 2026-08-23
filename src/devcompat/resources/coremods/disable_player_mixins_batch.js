/**
 * dev 环境专用 CoreMod（随 devcompat jar 加载，仅 dev 存在）。
 * <p>
 * 批量禁用 target Player/LocalPlayer/AbstractClientPlayer 且带 @Inject 的 mixin：
 * dev 环境下 mixin 的 refmap 反查（remapRefMap）不生效，selector 保持 SRG 名，
 * 而类为 MCP 域 → 匹配失败 → Critical injection failure 或 mixin 0.8.5 内部 NPE。
 * 移除方法级 mixin 注解使注入失效（dev 环境相关功能不可用，正式环境不受影响）。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');

    // Removing Mixin annotations neutralizes injection handlers, but an
    // abstract @Shadow method must not be left behind: without @Shadow it
    // is merged as an abstract method into the target class.
    function removeEndingLibraryLocalPlayerShadow(methods) {
        for (var i = methods.size() - 1; i >= 0; i--) {
            var m = methods.get(i);
            if (String(m.name) !== 'm_6117_' || String(m.desc) !== '()Z') { continue; }
            if ((m.access & Opcodes.ACC_ABSTRACT) !== 0) { methods.remove(i); }
        }
    }

    function stripAnnotations(ann) {
        if (ann === null) { return; }
        for (var j = ann.size() - 1; j >= 0; j--) {
            var a = ann.get(j);
            if (a.desc.indexOf('org/spongepowered/asm/mixin/') !== -1 ||
                a.desc.indexOf('com/llamalad7/mixinextras/') !== -1) {
                ann.remove(j);
            }
        }
    }

    function makeTransformer() {
        return function (classNode) {
            var methods = classNode.methods;
            if (String(classNode.name) === 'com/mega/endinglib/mixin/advanced/data_expand/component/LocalPlayerMixin') {
                removeEndingLibraryLocalPlayerShadow(methods);
            }
            for (var i = 0; i < methods.size(); i++) {
                var m = methods.get(i);
                stripAnnotations(m.visibleAnnotations);
                stripAnnotations(m.invisibleAnnotations);
            }
            return classNode;
        };
    }

    var targets = {};
    var names = [
        'gtgcore_disable_botania_player',
        'gtgcore_disable_adastra_player',
        'gtgcore_disable_ae2lt_player_phase',
        'gtgcore_disable_endinglib_component_player',
        'gtgcore_disable_endinglib_component_local',
        'gtgcore_disable_endinglib_multijump_local',
        'gtgcore_disable_endinglib_camera_local',
        'gtgcore_disable_endinglib_capability_local',
        'gtgcore_disable_endinglib_personal_abstract_client',
        'gtgcore_disable_goety_abstract_client',
        'gtgcore_disable_goety_local',
        'gtgcore_disable_revelationfix_local',
        'gtgcore_disable_avaritia_player',
        'gtgcore_disable_ars_elytra_player'
    ];
    var classes = [
        'vazkii.botania.mixin.PlayerMixin',
        'earth.terrarium.adastra.mixins.common.PlayerMixin',
        'com.moakiee.ae2lt.mixin.PlayerPhaseFlightMixin',
        'com.mega.endinglib.mixin.advanced.data_expand.component.PlayerMixin',
        'com.mega.endinglib.mixin.advanced.data_expand.component.LocalPlayerMixin',
        'com.mega.endinglib.mixin.advanced.data_expand.multi_jump.LocalPlayerMixin',
        'com.mega.endinglib.mixin.camera.LocalPlayerMixin',
        'com.mega.endinglib.mixin.capability.LocalPlayerMixin',
        'com.mega.endinglib.mixin.personal_rule.AbstractClientPlayerMixin',
        'com.Polarice3.Goety.mixin.AbstractClientPlayerMixin',
        'com.Polarice3.Goety.mixin.LocalPlayerMixin',
        'com.mega.revelationfix.mixin.LocalPlayerMixin',
        'committee.nova.mods.avaritia.init.mixins.PlayerMixin',
        'com.hollingsworth.arsnouveau.common.mixin.elytra.ElytraPlayerMixin'
    ];
    for (var i = 0; i < names.length; i++) {
        targets[names[i]] = {
            'target': { 'type': 'CLASS', 'name': classes[i] },
            'transformer': makeTransformer()
        };
    }
    return targets;
}
