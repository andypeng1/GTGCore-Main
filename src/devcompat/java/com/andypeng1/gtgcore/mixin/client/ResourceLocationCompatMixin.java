package com.andypeng1.gtgcore.mixin.client;

import net.minecraft.resources.ResourceLocation;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;

/**
 * 开发环境兼容 mixin（随 devcompat jar 加载，由 GTDevCompatMixinPlugin 门控，仅 dev 生效）。
 * <p>
 * FTB Library 的 ResourceLocationMixin 用 @Inject 引用 SRG 方法
 * m_135828_/m_135835_（validPathChar/validNamespaceChar），dev 类名是官方名。
 * 这里补对应方法（委托官方实现），让注入目标能解析成功。
 */
@Mixin(ResourceLocation.class)
public abstract class ResourceLocationCompatMixin {

    @Shadow
    public static boolean validPathChar(char c) {
        throw new AssertionError();
    }

    @Shadow
    public static boolean validNamespaceChar(char c) {
        throw new AssertionError();
    }

    @Shadow
    public static boolean isValidPath(String path) {
        throw new AssertionError();
    }

    @Shadow
    public static boolean isValidNamespace(String namespace) {
        throw new AssertionError();
    }

    protected static boolean m_135828_(char c) {
        return validPathChar(c);
    }

    protected static boolean m_135835_(char c) {
        return validNamespaceChar(c);
    }

    protected static boolean m_135841_(String path) {
        return isValidPath(path);
    }

    protected static boolean m_135843_(String namespace) {
        return isValidNamespace(namespace);
    }
}
