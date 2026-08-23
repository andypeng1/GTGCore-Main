import java.awt.*;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;

/** dev 自动化辅助：截图 / 点击 / 双击 / 按键 / 打字（配合 runClient 验证用） */
public class AutoPlay {
    public static void main(String[] args) throws Exception {
        Robot r = new Robot();
        String mode = args[0];
        switch (mode) {
            case "shot": {
                Rectangle screen = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());
                BufferedImage img = r.createScreenCapture(screen);
                ImageIO.write(img, "png", new File(args[1]));
                System.out.println("shot saved: " + args[1]);
                break;
            }
            case "click": {
                int x = Integer.parseInt(args[1]);
                int y = Integer.parseInt(args[2]);
                r.mouseMove(x, y);
                r.delay(250);
                r.mousePress(InputEvent.BUTTON1_DOWN_MASK);
                r.delay(90);
                r.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);
                r.delay(150);
                System.out.println("clicked " + x + "," + y);
                break;
            }
            case "dblclick": {
                int x = Integer.parseInt(args[1]);
                int y = Integer.parseInt(args[2]);
                r.mouseMove(x, y);
                r.delay(250);
                for (int i = 0; i < 2; i++) {
                    r.mousePress(InputEvent.BUTTON1_DOWN_MASK);
                    r.delay(70);
                    r.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);
                    r.delay(120);
                }
                System.out.println("dblclicked " + x + "," + y);
                break;
            }
            case "key": {
                int code = Integer.parseInt(args[1]);
                r.keyPress(code);
                r.delay(70);
                r.keyRelease(code);
                r.delay(120);
                System.out.println("key " + code);
                break;
            }
            case "type": {
                String s = args[1];
                for (char c : s.toCharArray()) {
                    int code = KeyEvent.getExtendedKeyCodeForChar(c);
                    if (code == KeyEvent.VK_UNDEFINED) continue;
                    boolean shift = Character.isUpperCase(c);
                    if (shift) r.keyPress(KeyEvent.VK_SHIFT);
                    r.keyPress(code);
                    r.delay(40);
                    r.keyRelease(code);
                    if (shift) r.keyRelease(KeyEvent.VK_SHIFT);
                    r.delay(30);
                }
                System.out.println("typed: " + s);
                break;
            }
            case "analyze": {
                BufferedImage img = ImageIO.read(new File(args[1]));
                int w = img.getWidth(), h = img.getHeight();
                long magenta = 0, white = 0, black = 0, total = 0;
                long rsum = 0, gsum = 0, bsum = 0;
                for (int y = 0; y < h; y++) {
                    for (int x = 0; x < w; x++) {
                        int p = img.getRGB(x, y);
                        int pr = (p >> 16) & 255, pg = (p >> 8) & 255, pb = p & 255;
                        if (pr > 200 && pg < 60 && pb > 200) magenta++;          // 品红/紫黑 missing texture
                        if (pr > 240 && pg > 240 && pb > 240) white++;
                        if (pr < 16 && pg < 16 && pb < 16) black++;
                        rsum += pr; gsum += pg; bsum += pb;
                        total++;
                    }
                }
                System.out.printf("size=%dx%d avgRGB=(%d,%d,%d) magenta=%.2f%% white=%.2f%% black=%.2f%%%n",
                    w, h, rsum / total, gsum / total, bsum / total,
                    100.0 * magenta / total, 100.0 * white / total, 100.0 * black / total);
                break;
            }
            case "diff": {
                BufferedImage a = ImageIO.read(new File(args[1]));
                BufferedImage b = ImageIO.read(new File(args[2]));
                int w = Math.min(a.getWidth(), b.getWidth());
                int h = Math.min(a.getHeight(), b.getHeight());
                long diff = 0, total = 0;
                for (int y = 0; y < h; y += 4) {
                    for (int x = 0; x < w; x += 4) {
                        int pa = a.getRGB(x, y), pb = b.getRGB(x, y);
                        if (Math.abs(((pa >> 16) & 255) - ((pb >> 16) & 255)) > 12
                            || Math.abs(((pa >> 8) & 255) - ((pb >> 8) & 255)) > 12
                            || Math.abs((pa & 255) - (pb & 255)) > 12) diff++;
                        total++;
                    }
                }
                System.out.printf("diff=%.2f%%%n", 100.0 * diff / total);
                break;
            }
            case "wait": {
                Thread.sleep(Long.parseLong(args[1]));
                System.out.println("waited " + args[1] + "ms");
                break;
            }
            default:
                System.out.println("usage: shot <png> | click x y | dblclick x y | key <vk> | type <text> | wait <ms>");
        }
    }
}
