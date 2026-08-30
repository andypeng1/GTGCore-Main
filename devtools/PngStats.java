import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;

/** 打印 png 尺寸与颜色统计（透明像素/非透明像素占比、主色） */
public class PngStats {
    public static void main(String[] args) throws Exception {
        for (String p : args) {
            BufferedImage img = ImageIO.read(new File(p));
            if (img == null) { System.out.println(p + ": UNREADABLE"); continue; }
            int w = img.getWidth(), h = img.getHeight();
            int opaque = 0, transparent = 0, total = w * h;
            long rsum = 0, gsum = 0, bsum = 0;
            int minR = 255, maxR = 0, minG = 255, maxG = 0, minB = 255, maxB = 0;
            for (int y = 0; y < h; y++) {
                for (int x = 0; x < w; x++) {
                    int px = img.getRGB(x, y);
                    int a = (px >> 24) & 255, r = (px >> 16) & 255, g = (px >> 8) & 255, b = px & 255;
                    if (a > 16) { opaque++; rsum += r; gsum += g; bsum += b; }
                    else transparent++;
                    minR = Math.min(minR, r); maxR = Math.max(maxR, r);
                    minG = Math.min(minG, g); maxG = Math.max(maxG, g);
                    minB = Math.min(minB, b); maxB = Math.max(maxB, b);
                }
            }
            System.out.printf("%s: %dx%d opaque=%d(%d%%) transparent=%d avgRGB=(%d,%d,%d) rng=(%d-%d,%d-%d,%d-%d)%n",
                p, w, h, opaque, 100 * opaque / total, transparent,
                opaque == 0 ? -1 : rsum / opaque, opaque == 0 ? -1 : gsum / opaque, opaque == 0 ? -1 : bsum / opaque,
                minR, maxR, minG, maxG, minB, maxB);
        }
    }
}
