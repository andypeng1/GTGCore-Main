/**
 * dev 调试专用 CoreMod（临时）：打印 Player 类的完整方法列表（验证 mixin 与 coremod 的处理顺序）。
 * 验证完删除。
 */
function initializeCoreMod() {
    return {
        'gtgcore_debug_player_methods': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.world.entity.player.Player'
            },
            'transformer': function (classNode) {
                var sb = '=== GTGCORE DEBUG === Player methods total=' + classNode.methods.size() + ' \\n';
                for (var i = 0; i < classNode.methods.size(); i++) {
                    var m = classNode.methods.get(i);
                    sb += '    ' + m.name + ' ' + m.desc + ' insns=' + m.instructions.size() + '\\n';
                }
                print(sb);
                return classNode;
            }
        }
    };
}