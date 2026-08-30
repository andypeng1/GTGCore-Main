// priority: 10

const LDLib = Java.loadClass('com.lowdragmc.lowdraglib.LDLib')


function formatting(text, formats, speed) {
    if (speed <= 0) speed = 0.001
    const index = Math.floor((Date.now() & 16383) / speed) % formats.length
    let result = ''
    for (let i = 0; i < text.length; i++) {
        result += formats[(formats.length + i - index) % formats.length] + text.charAt(i)
    }
    return result
}

const GOLDEN = ['§e', '§6']
const DARK_GREEN = ['§a', '§2']

ForgeEvents.onEvent('net.minecraftforge.event.entity.player.ItemTooltipEvent', event => {
    if (!LDLib.isClient()) return
    function addtooltip(text) {
        event.getToolTip().add(Component.literal('§7' + text))
    }
    function adddark_greentooltip(text) {
        event.getToolTip().add(Component.literal(formatting(text, DARK_GREEN, 160)))
    }
    function addgoldentooltip(text) {
        event.getToolTip().add(Component.literal(formatting(text, GOLDEN, 160)))
    }
    switch (event.getItemStack().getId()) {
        // ===== bioware（生物活性）=====
        case 'gtceu:bioware_processor':
            addtooltip('粘稠的有机浆液附着于表面')
            adddark_greentooltip('ZPM级电路')
            break
        case 'gtceu:bioware_assembly':
            addtooltip('似乎能听到窃窃私语')
            adddark_greentooltip('UV级电路')
            break
        case 'gtceu:bioware_computer':
            addtooltip('金属之间布满了黏菌')
            adddark_greentooltip('UHV级电路')
            break
        case 'gtceu:bioware_mainframe':
            addtooltip('菌群意识网络')
            adddark_greentooltip('UEV级电路')
            break
        // ===== optical（光学）=====
        case 'gtceu:optical_processor':
            addtooltip('超高效光电子载运')
            addgoldentooltip('UV级电路')
            break
        case 'gtceu:optical_assembly':
            addtooltip('光子涌流')
            addgoldentooltip('UHV级电路')
            break
        case 'gtceu:optical_computer':
            addtooltip('超大规模计算数据支持')
            addgoldentooltip('UEV级电路')
            break
        case 'gtceu:optical_mainframe':
            addtooltip('计算速度无限逼近于光速')
            addgoldentooltip('UIV级电路')
            break
    }
})
