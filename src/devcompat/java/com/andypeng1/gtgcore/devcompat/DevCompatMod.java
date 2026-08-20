package com.andypeng1.gtgcore.devcompat;

import net.minecraftforge.fml.common.Mod;

/**
 * dev 环境专用兼容小模组（仅存在于 dev runtimeClasspath，不进入正式产物）。
 * <p>
 * 作用：Forge 1.20.1 的 dev 目录型模组无法被 mixin 容器扫描注册 mixin 配置
 * （mods.toml [[mixins]] 不被解析、Mixins.addConfiguration 时机太晚），
 * 所以把兼容 mixin（GuiGraphicsCompatMixin，为 GTCEu 7.5.3 的 GuiGraphicsMixin
 * 补充 m_280405_ 目标方法）打包成独立 jar 模组，让 dev 环境能正常加载它。
 */
@Mod("gtgcore_devcompat")
public class DevCompatMod {

    public DevCompatMod() {
    }
}
