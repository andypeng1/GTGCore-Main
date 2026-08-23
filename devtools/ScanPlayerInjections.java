import org.objectweb.asm.ClassReader;
import org.objectweb.asm.tree.*;
import java.util.*;
import java.util.jar.*;
import java.io.*;
import java.nio.file.*;

/** 扫描 run/mods 所有 jar（含 jarjar）里 mixin 的 @Inject/@Redirect/@ModifyXxx method 目标，找出引用 Player 的注入 */
public class ScanPlayerInjections {
    static Set<String> visitedJars = new HashSet<>();

    public static void main(String[] args) throws Exception {
        File modsDir = new File(args[0]);
        List<File> jars = new ArrayList<>();
        for (File f : modsDir.listFiles((d, n) -> n.endsWith(".jar"))) jars.add(f);
        for (File jar : jars) {
            scanJar(jar);
        }
    }

    static void scanJar(File jar) throws Exception {
        String key = jar.getAbsolutePath();
        if (!visitedJars.add(key)) return;
        try (JarFile jf = new JarFile(jar)) {
            // jarjar 内嵌 jar 也要扫
            Enumeration<JarEntry> en = jf.entries();
            List<JarEntry> nested = new ArrayList<>();
            while (en.hasMoreElements()) {
                JarEntry e = en.nextElement();
                if (e.getName().endsWith(".jar") && e.getName().startsWith("META-INF/jarjar/")) {
                    nested.add(e);
                }
            }
            for (JarEntry n : nested) {
                File tmp = File.createTempFile("nested", ".jar");
                try (InputStream is = jf.getInputStream(n)) {
                    Files.copy(is, tmp.toPath(), StandardCopyOption.REPLACE_EXISTING);
                }
                scanJar(tmp);
                tmp.delete();
            }

            // 找 mixins.json 配置
            List<String> mixinConfigs = new ArrayList<>();
            Enumeration<JarEntry> en2 = jf.entries();
            while (en2.hasMoreElements()) {
                JarEntry e = en2.nextElement();
                if (e.getName().endsWith("mixins.json") || e.getName().endsWith("mixin.json")) {
                    mixinConfigs.add(e.getName());
                }
            }
            for (String cfg : mixinConfigs) {
                String json = new String(readAll(jf.getInputStream(jf.getEntry(cfg))), "UTF-8");
                // 简单解析 package + mixin 类名（不引 gson，手写正则）
                String pkg = null;
                java.util.regex.Matcher pm = java.util.regex.Pattern.compile("\"package\"\\s*:\\s*\"([^\"]+)\"").matcher(json);
                if (pm.find()) pkg = pm.group(1);
                java.util.regex.Matcher cm = java.util.regex.Pattern.compile("\"(client|mixins|common|server|compat|forge|api)\"\\s*:\\s*\\[([^\\]]*)\\]").matcher(json);
                while (cm.find()) {
                    String list = cm.group(2);
                    for (String m : list.split(",")) {
                        m = m.trim().replaceAll("\"", "");
                        if (m.isEmpty() || m.startsWith("[")) continue;
                        String clsName = (pkg == null ? "" : pkg + ".") + m;
                        scanMixinClass(jf, clsName, jar.getName());
                    }
                }
            }
        }
    }

    static byte[] readAll(InputStream is) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buf = new byte[8192];
        int n;
        while ((n = is.read(buf)) > 0) bos.write(buf, 0, n);
        return bos.toByteArray();
    }

    static void scanMixinClass(JarFile jf, String className, String jarName) {
        String path = className.replace('.', '/') + ".class";
        try {
            java.util.zip.ZipEntry ze = jf.getEntry(path);
            if (ze == null) return;
            ClassReader cr = new ClassReader(jf.getInputStream(ze));
            ClassNode cn = new ClassNode();
            cr.accept(cn, 0);
            for (MethodNode m : cn.methods) {
                if (m.invisibleAnnotations == null && m.visibleAnnotations == null) continue;
                List<AnnotationNode> anns = new ArrayList<>();
                if (m.invisibleAnnotations != null) anns.addAll(m.invisibleAnnotations);
                if (m.visibleAnnotations != null) anns.addAll(m.visibleAnnotations);
                for (AnnotationNode a : anns) {
                    if (a.desc.contains("Injection/Inject") || a.desc.contains("Injection/Redirect")
                        || a.desc.contains("ModifyArg") || a.desc.contains("ModifyArgs")
                        || a.desc.contains("ModifyVariable") || a.desc.contains("ModifyConstant")
                        || a.desc.contains("WrapOperation") || a.desc.contains("WrapMethod")
                        || a.desc.contains("Overwrite")) {
                        List<String> methods = getAnnValues(a, "method");
                        List<String> targets = getAnnValues(a, "target");
                        for (String t : methods) {
                            if (t.contains("Player") || t.equals("tick") || t.contains("m_") || t.contains("f_")) {
                                System.out.println("[" + jarName + "] " + className + " :: " + m.name
                                    + " @Inject method=\"" + t + "\"");
                            }
                        }
                        for (String t : targets) {
                            if (t.contains("Player")) {
                                System.out.println("[" + jarName + "] " + className + " :: " + m.name
                                    + " @At target=\"" + t + "\"");
                            }
                        }
                    }
                }
            }
        } catch (Exception ex) {
            // 跳过
        }
    }

    static List<String> getAnnValues(AnnotationNode a, String key) {
        List<String> out = new ArrayList<>();
        if (a.values == null) return out;
        for (int i = 0; i < a.values.size() - 1; i += 2) {
            if (key.equals(a.values.get(i))) {
                Object v = a.values.get(i + 1);
                if (v instanceof List) {
                    for (Object o : (List<?>) v) out.add(String.valueOf(o));
                } else {
                    out.add(String.valueOf(v));
                }
            }
        }
        return out;
    }
}
