/**
 * dev 调试专用（临时，验证后删）：dump LevelRenderer / ChunkRenderDispatcher /
 * RebuildTask 的方法表与关键调用点，排查"一次只能渲染一个区块"。
 */
function initializeCoreMod() {
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');

    function dumpClass(classNode, label) {
        var sb = '[RENDERDBG] ' + label + ' methods:';
        for (var i = 0; i < classNode.methods.size(); i++) {
            var m = classNode.methods.get(i);
            if (m.name.indexOf('m_') === 0 || m.name.indexOf('render') === 0
                || m.name.indexOf('compile') === 0 || m.name.indexOf('rebuild') === 0
                || m.name.indexOf('upload') === 0 || m.name.indexOf('schedule') === 0
                || m.name.indexOf('update') === 0 || m.name.indexOf('Chunk') === 0
                || m.name.indexOf('chunk') === 0 || m.name.indexOf('section') === 0
                || m.name.indexOf('Section') === 0) {
                sb += ' ' + m.name + m.desc + ' acc=' + (m.access & 0x7) + (m.access & 0x400 ? '/abstract' : '') + ';';
            }
        }
        print(sb);
        // dump renderLevel / renderChunkLayer 调用点
        for (var i = 0; i < classNode.methods.size(); i++) {
            var m = classNode.methods.get(i);
            if (m.name.indexOf('renderLevel') === 0 || m.name === 'm_109604_'
                || (m.name.indexOf('renderChunkLayer') === 0) || m.name === 'm_172993_') {
                var sb2 = '[RENDERDBG] ' + label + '.' + m.name + m.desc + ' insns:';
                for (var j = 0; j < m.instructions.size(); j++) {
                    var insn = m.instructions.get(j);
                    if (insn.getOpcode() >= Opcodes.INVOKEVIRTUAL && insn.getOpcode() <= Opcodes.INVOKEINTERFACE) {
                        sb2 += ' [' + insn.owner + '.' + insn.name + insn.desc + ']';
                    }
                }
                print(sb2);
            }
        }
    }

    return {
        'gtgcore_debug_dump_render': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/renderer/LevelRenderer' },
            'transformer': function (classNode) { dumpClass(classNode, 'LevelRenderer'); return classNode; }
        },
        'gtgcore_debug_dump_cdr': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/renderer/chunk/ChunkRenderDispatcher' },
            'transformer': function (classNode) { dumpClass(classNode, 'ChunkRenderDispatcher'); return classNode; }
        },
        'gtgcore_debug_dump_rt': {
            'target': { 'type': 'CLASS', 'name': 'net/minecraft/client/renderer/chunk/ChunkRenderDispatcher$RenderChunk$RebuildTask' },
            'transformer': function (classNode) { dumpClass(classNode, 'RebuildTask'); return classNode; }
        }
    };
}
