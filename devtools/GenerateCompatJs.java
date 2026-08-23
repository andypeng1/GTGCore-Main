import org.objectweb.asm.ClassReader;
import org.objectweb.asm.Handle;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.tree.*;
import org.objectweb.asm.Type;
import java.util.*;
import java.util.jar.*;
import java.io.*;
import java.nio.file.*;
import java.util.regex.*;

/** 扫描所有 mixin 的 @Shadow SRG 缺失（运行时 MCP 域类没有 SRG 名成员），生成 auto_srg_compat.js */
public class GenerateCompatJs {
    static Set<String> visited = new HashSet<>();
    static Map<String, String> srgToMcp = new HashMap<>();
    // targetClass -> [(kind, srgName, desc)]
    static Map<String, Set<String[]>> missing = new TreeMap<>();
    // Keep overloaded members distinct. The first three fields identify the
    // bridge kind/name/descriptor; the optional fourth field disambiguates IM
    // entries whose MCP signature can map to more than one SRG member.
    static final Comparator<String[]> MISSING_COMPARATOR = Comparator.comparing(
            (String[] x) -> x.length > 1 ? x[1] : "")
        .thenComparing(x -> x.length > 2 ? x[2] : "")
        .thenComparing(x -> x.length > 0 ? x[0] : "")
        .thenComparing(x -> x.length > 3 ? x[3] : "");
    // 字段引用改写：调用者类 -> Set<[owner, srg字段, mcp字段, desc, mcpOwner]>
    static Map<String, Set<String[]>> fieldRefRewrites = new TreeMap<>();
    // 方法引用改写：调用者类 -> Set<[owner, srg方法, mcp方法, desc]>
    // 接口（ACC_INTERFACE）方法无法补桥接——补 abstract 方法要求所有实现类实现
    // （如给 Registry/DefaultedRegistry 补 m_XXX_ → NamespacedDefaultedWrapper
    // AbstractMethodError），所以接口的 SRG 方法引用改为在调用处改写为 MCP 名。
    static Map<String, Set<String[]>> methodRefRewrites = new TreeMap<>();
    // srg全名（owner/f_srg）-> mcp全名（owner/f_mcp）
    static Map<String, String> srgFieldFull = new HashMap<>();
    // 接口类集合（ACC_INTERFACE）
    static Set<String> interfaces = new HashSet<>();
    // 接口 owner 集合（mod 接口 + recomp jar 里的原版/Forge 接口）：
    // 桥接方法体内调用接口方法必须用 INVOKEINTERFACE + itf=true
    // （INVOKEVIRTUAL → IncompatibleClassChangeError: must be InterfaceMethodref constant）
    static Set<String> interfaceOwners = new HashSet<>();
    // srg方法名 -> 所属原版类（MD 行解析；mod 类调用父类 SRG 方法时按此反查补桥接类）
    static Map<String, String> srgMethodOwner = new HashMap<>();
    // srg 字段名 -> 所属原版类（FD 行解析；mod 类引用继承的 static 字段时按此反查改写）
    static Map<String, String> srgFieldOwner = new HashMap<>();
    // lambda 实现的接口方法 default 化：接口名 -> Set<"mcp方法名|samDesc|srg方法名">
    // 发布版 mod（SRG 域）的 lambda 合成类（运行时生成，转换不到）实现原版接口
    // （MCP 域）时方法名不匹配 → AbstractMethodError（RepositorySource.loadPacks、
    // ResourceProvider.getResource 等）。把接口抽象方法改成 default 空实现兜底。
    static Map<String, Set<String>> interfaceDefaultify = new HashMap<>();
    // 接口方法表：接口名 -> Set<"mcp方法名|desc">（含父接口传递收集）。
    // 方法名本身不能作为 key：VertexConsumer 等接口有多个同名重载，覆盖 desc
    // 会漏掉实现类所需的 MCP bridge，并在 dev 环境触发 AbstractMethodError。
    // 发布版 mod 类（SRG 域）实现 dev 原版接口（MCP 域）时缺 MCP 名方法
    // （如 AE2 AppEngAdvancementTrigger 只有 m_7295_ 没有 getId）→ AbstractMethodError；
    // 为这些实现类补 MCP 名桥接（方法体调类里已有的 SRG 方法）。
    static Map<String, Set<String>> interfaceMethods = new HashMap<>();
    // 接口 -> 父接口集合（用于继承展开）
    static Map<String, Set<String>> interfaceParents = new HashMap<>();
    // 所有接口（原版 + mod）的方法表：接口名 -> Map<方法名, desc>。
    // IM 桥接回退用：实现类自身没有 SRG 实现（如 AE2 GlassModel 只有 bake，
    // getDependencies 由 BasicUnbakedModel 的 default m_7970_ 提供）时，沿接口链
    // 找接口声明的 SRG 方法（srgToMcp 反查匹配），给实现类补 MCP 名桥接调它
    // （INVOKEINTERFACE）。否则 dev 域 dispatch MCP 接口方法 → AbstractMethodError
    // （ModelBakery 调 GlassModel.getDependencies 崩 → 资源包全被移除 → 字体白块）。
    static Map<String, Map<String, String>> ifaceMethodTable = new HashMap<>();
    // 所有类（含 mod 类）的方法表：类名 -> Map<方法名, desc>。IM 回退先沿父类链
    // 找 MCP 方法（super 调用最安全——gtceu GTHoeItem.asItem ← HoeItem/Item.asItem
    // 返回 this；调接口 IGTTool.m_5456_ 会被父类链上补的 Item.m_5456_ 桥接劫持
    // → GTHoeItem.asItem ↔ Item.m_5456_ 无限递归）
    static Map<String, Map<String, String>> classMethodTable = new HashMap<>();
    // 所有类的方法 access：类名 -> Map<"方法名|desc", access>（super 回退检查 final：
    // 父类 final 方法（如 Forge CapabilityProvider.areCapsCompatible 真 final）已有
    // 实现，子类补桥接会 IncompatibleClassChangeError）
    static Map<String, Map<String, Integer>> classMethodAccess = new HashMap<>();
    // mod 类声明的接口：类名 -> 接口名列表（IM 收集沿父类链找接口义务——
    // mekanism EnrichingIRecipe extends 抽象类 ItemStackToItemStackRecipe（implements
    // Recipe）缺 getType 实现 → AbstractMethodError；vanillaInterfaces 只有 recomp 类）
    static Map<String, List<String>> modClassInterfaces = new HashMap<>();
    // mod 抽象类的抽象方法义务：类名 -> Set<"方法名|desc">（与 abstractMethods 同构）
    static Map<String, Set<String>> modAbstractMethods = new HashMap<>();
    // recomp jar（原版 + Forge）所有类的方法表与父类名（override 桥接用）
    static Map<String, Map<String, String>> vanillaMethods = new HashMap<>();
    static Map<String, String> vanillaParents = new HashMap<>();
    // Published mod classes may sit between a mod override and the vanilla
    // class that declares the corresponding MCP method.
    static Map<String, String> modParents = new HashMap<>();
    static Set<String> hierarchyVisited = new HashSet<>();
    // Interfaces declared by every vanilla/Forge class. Implementors can inherit
    // interface obligations through a superclass (for example SimpleCriterionTrigger).
    static Map<String, Set<String>> vanillaInterfaces = new HashMap<>();
    // 原版方法 access 表：类名 -> Map<方法名|desc, access>（@Overwrite 桥接可见性跟随）
    static Map<String, Map<String, Integer>> vanillaMethodAccess = new HashMap<>();
    // 抽象类（非接口）的抽象方法表：类名 -> Map<方法名, desc>（含父类传递）——
    // mod 类（SRG 域）继承抽象类时缺 MCP 名抽象方法实现（如 Property.getPossibleValues）
    static Map<String, Set<String>> abstractMethods = new HashMap<>();
    // 所有类的抽象方法集合：类名 -> Set<"方法名|desc">（M 桥接目标为抽象方法时
    // 必须 INVOKEVIRTUAL 动态分派到实现类的 IM 桥接，INVOKESPECIAL 调抽象会炸）
    static Map<String, Set<String>> vanillaAbstractMethods = new HashMap<>();
    // @At(INVOKE, target=...) 引用的方法（owner|mcp名|desc）——OV 调用改写不能动它们
    static Set<String> atTargetKeys = new HashSet<>();

    // 独立扫描所有 mods 的 mixin 注解，收集 @At target（须在 scanJar 之前执行，
    // 否则 OV 收集时集合尚未完整）
    static void collectAtTargetsAll(File modsDir) throws Exception {
        for (File f : modsDir.listFiles((d, n) -> n.endsWith(".jar"))) {
            try (JarFile jf = new JarFile(f)) {
                Enumeration<JarEntry> en = jf.entries();
                while (en.hasMoreElements()) {
                    JarEntry e = en.nextElement();
                    if (!e.getName().endsWith(".class")) continue;
                    try {
                        ClassReader cr = new ClassReader(jf.getInputStream(e));
                        ClassNode cn = new ClassNode();
                        cr.accept(cn, 0);
                        for (MethodNode m : cn.methods) {
                            List<AnnotationNode> anns = new ArrayList<>();
                            if (m.invisibleAnnotations != null) anns.addAll(m.invisibleAnnotations);
                            if (m.visibleAnnotations != null) anns.addAll(m.visibleAnnotations);
                            for (AnnotationNode a : anns) {
                                // 收集所有方法注解的 @At target（不按包过滤——mixinextras 的
                                // @WrapOperation/@WrapWithCondition 等也用标准 @At 嵌套，ae2lt
                                // 的注入点就是这样被 OV 调用改写误伤的）
                                if (a.values == null) continue;
                                for (int i = 0; i < a.values.size() - 1; i += 2) {
                                    Object av = a.values.get(i + 1);
                                    if (av instanceof AnnotationNode) {
                                        collectAtTargets((AnnotationNode) av);
                                    } else if (av instanceof List) {
                                        for (Object o2 : (List<?>) av) {
                                            if (o2 instanceof AnnotationNode) collectAtTargets((AnnotationNode) o2);
                                        }
                                    }
                                }
                            }
                        }
                    } catch (Exception ex) {}
                }
            }
        }
    }

    // 解析 @At 注解的 target 值（可能为 "Lowner;name(desc)" 或 "name(desc)"），
    // 记录 (owner, mcp名, desc) 三元组
    static void collectAtTargets(AnnotationNode at) {
        if (!at.desc.equals("Lorg/spongepowered/asm/mixin/injection/At;") || at.values == null) return;
        for (int i = 0; i < at.values.size() - 1; i += 2) {
            if (!String.valueOf(at.values.get(i)).equals("target")) continue;
            Object v = at.values.get(i + 1);
            List<Object> vals = new ArrayList<>();
            if (v instanceof List) vals.addAll((List<?>) v);
            else if (v != null) vals.add(v);
            for (Object o : vals) {
                String s = String.valueOf(o);
                String owner = null;
                String name = s;
                if (s.startsWith("L")) {
                    int semi = s.indexOf(';');
                    if (semi > 0) {
                        owner = s.substring(1, semi);
                        name = s.substring(semi + 1);
                    }
                }
                int paren = name.indexOf('(');
                String nm = paren >= 0 ? name.substring(0, paren) : name;
                String desc = paren >= 0 ? name.substring(paren) : null;
                if (nm.isEmpty() || desc == null) continue;
                if (owner == null) continue;   // 无 owner 的 @At target 少见，跳过
                atTargetKeys.add(owner + "|" + nm + "|" + desc);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(args[1])))) {
            String l;
            while ((l = br.readLine()) != null) {
                if (l.startsWith("FD:")) {
                    // FD: owner/f_srg owner/f_mcp（2 段，无 desc）
                    String[] p = l.substring(4).split(" ");
                    if (p.length >= 2) {
                        srgToMcp.put(p[0].substring(p[0].lastIndexOf('/') + 1),
                                     p[1].substring(p[1].lastIndexOf('/') + 1));
                        // 全名映射（owner 信息）：用于 mixin 继承类里非 @Shadow 的父类字段引用
                        srgFieldFull.put(p[0], p[1]);
                        // srg 字段名 -> 所属原版类：mod 类引用继承的 static 字段时
                        // （如 TextRenderType.f_110139_ ← RenderStateShard）按此反查改写
                        String fowner = p[0].substring(0, p[0].lastIndexOf('/'));
                        if (fowner.startsWith("net/minecraft") || fowner.startsWith("com/mojang")) {
                            srgFieldOwner.put(p[0].substring(p[0].lastIndexOf('/') + 1), fowner);
                        }
                    }
                } else if (l.startsWith("MD:")) {
                    // MD: owner/m_srg desc owner/m_mcp desc（4 段）
                    String[] p = l.substring(4).split(" ", 4);
                    if (p.length >= 3) {
                        String srg = p[0].substring(p[0].lastIndexOf('/') + 1);
                        String mcp = p[2].substring(p[2].lastIndexOf('/') + 1);
                        srgToMcp.put(srg, mcp);
                        srgMethodNames.add(srg);
                        srgMethodOwner.put(srg, p[0].substring(0, p[0].lastIndexOf('/')));
                        mcpToSrg.put(mcp, srg);
                        mcpSigToSrg.put(mcp + p[1], srg);
                        mcpDesc.put(mcp, p[1]);
                    }
                }
            }
        }
        File modsDir = new File(args[0]);
        // 必须先扫描 recomp jar（收集 interfaceMethods/interfaceOwners）——
        // scanJar 的接口实现桥接（IM）收集依赖它
        if (args.length > 3) {
            try (JarFile jf = new JarFile(args[3])) {
                Enumeration<JarEntry> en = jf.entries();
                while (en.hasMoreElements()) {
                    JarEntry e = en.nextElement();
                    if (!e.getName().endsWith(".class")) continue;
                    try {
                        ClassReader cr = new ClassReader(jf.getInputStream(e));
                        String cn2 = cr.getClassName();
                        ClassNode icn = new ClassNode();
                        cr.accept(icn, 0);
                        // 所有类的方法表 + 父类（用于 override 桥接：mod 类 SRG override
                        // 方法 → 在原版父类链找 MCP 方法）
                        Map<String, String> ms2 = new HashMap<>();
                        for (MethodNode im : icn.methods) {
                            if (im.name.equals("<clinit>")) continue;
                            ms2.put(im.name, im.desc);
                        }
                        vanillaMethods.put(cn2, ms2);
                        vanillaParents.put(cn2, icn.superName);
                        vanillaInterfaces.put(cn2, new HashSet<>(icn.interfaces));
                        // 方法 access 表（OM @Overwrite 桥接可见性跟随原方法：
                        // mixin 检查 "cannot reduce visibility"，原方法 private/protected
                        // 时桥接 public 会崩——正式环境目标 private 不走可见性检查）
                        Map<String, Integer> accMap = new HashMap<>();
                        for (MethodNode im : icn.methods) {
                            accMap.put(im.name + "|" + im.desc, im.access);
                        }
                        vanillaMethodAccess.put(cn2, accMap);
                        Set<String> amset = new HashSet<>();
                        for (MethodNode im : icn.methods) {
                            if ((im.access & Opcodes.ACC_ABSTRACT) != 0) amset.add(im.name + "|" + im.desc);
                        }
                        vanillaAbstractMethods.put(cn2, amset);
                        if ((icn.access & Opcodes.ACC_INTERFACE) != 0) {
                            interfaceOwners.add(cn2);
                            Set<String> ms = new HashSet<>();
                            Map<String, String> mt = new HashMap<>();
                            for (MethodNode im : icn.methods) {
                                if (im.name.equals("<clinit>") || (im.access & Opcodes.ACC_STATIC) != 0) continue;
                                ms.add(im.name + "|" + im.desc);
                                mt.putIfAbsent(im.name, im.desc);
                            }
                            interfaceMethods.put(cn2, ms);
                            interfaceParents.put(cn2, new HashSet<>(icn.interfaces));
                            ifaceMethodTable.put(cn2, mt);
                        } else if ((icn.access & Opcodes.ACC_ABSTRACT) != 0) {
                            // 抽象类（非接口）：记录抽象方法表（实现类必须实现）
                            Set<String> ams = new HashSet<>();
                            for (MethodNode im : icn.methods) {
                                if (im.name.equals("<clinit>") || (im.access & Opcodes.ACC_ABSTRACT) == 0) continue;
                                ams.add(im.name + "|" + im.desc);
                            }
                            abstractMethods.put(cn2, ams);
                        }
                    } catch (Exception ex) {}
                }
            } catch (Exception ex) {
                System.err.println("recomp jar 扫描失败: " + ex);
            }
            // 递归展开父接口方法（子接口继承父接口 abstract 方法）
            for (int pass = 0; pass < 8; pass++) {
                boolean changed = false;
                for (Map.Entry<String, Set<String>> e2 : new ArrayList<>(interfaceMethods.entrySet())) {
                    Set<String> parents = interfaceParents.get(e2.getKey());
                    if (parents == null) continue;
                    for (String parent : new ArrayList<>(parents)) {
                        Set<String> pm = interfaceMethods.get(parent);
                        if (pm == null) continue;
                        if (e2.getValue().addAll(pm)) changed = true;
                    }
                }
                if (!changed) break;
            }
            // 抽象类继承展开：父类的抽象方法也是子类的义务
            for (int pass = 0; pass < 8; pass++) {
                boolean changed = false;
                for (Map.Entry<String, Set<String>> e2 : new ArrayList<>(abstractMethods.entrySet())) {
                    String parent = vanillaParents.get(e2.getKey());
                    if (parent == null) continue;
                    Set<String> pm = abstractMethods.get(parent);
                    if (pm == null) continue;
                    if (e2.getValue().addAll(pm)) changed = true;
                }
                if (!changed) break;
            }
        }
        interfaceOwners.addAll(interfaces);
        // Jar entry order is not hierarchical. Collect every mod parent link
        // before scanning overrides so a concrete class can traverse through
        // mod-owned base classes to its vanilla ancestors.
        collectModParentsAll(modsDir);
        // 先收集所有 mixin 的 @At(INVOKE) target（OV 收集与调用改写必须跳过它们）
        collectAtTargetsAll(modsDir);
        collectIfaceTableAll(modsDir);
        for (File f : modsDir.listFiles((d, n) -> n.endsWith(".jar"))) scanJar(f);
        collectCallRewrites(modsDir);
        generate(args[2]);
    }

    // 收集所有 jar（含嵌套 jarjar）的接口方法表：实现类沿接口链找 SRG 方法时用
    // （AE2 GlassModel 的 getDependencies 由 BasicUnbakedModel 的 default m_7970_ 提供，
    // 类自身没有 SRG 实现——IM 回退需查接口表）
    static void collectIfaceTableAll(File modsDir) throws Exception {
        File[] jars = modsDir.listFiles((d, n) -> n.endsWith(".jar"));
        if (jars == null) return;
        for (File jar : jars) collectIfaceTableInJar(jar);
    }

    static void collectIfaceTableInJar(File jar) throws Exception {
        try (JarFile jf = new JarFile(jar)) {
            List<JarEntry> nested = new ArrayList<>();
            Enumeration<JarEntry> en = jf.entries();
            while (en.hasMoreElements()) {
                JarEntry e = en.nextElement();
                if (e.getName().endsWith(".jar") && e.getName().startsWith("META-INF/jarjar/")) {
                    nested.add(e);
                } else if (e.getName().endsWith(".class")) {
                    try {
                        ClassReader cr = new ClassReader(jf.getInputStream(e));
                        ClassNode icn = new ClassNode();
                        cr.accept(icn, 0);
                        Map<String, String> mt = new HashMap<>();
                        Map<String, Integer> accMap = new HashMap<>();
                        for (MethodNode im : icn.methods) {
                            if (im.name.equals("<clinit>")) continue;
                            mt.putIfAbsent(im.name, im.desc);
                            accMap.putIfAbsent(im.name + "|" + im.desc, im.access);
                        }
                        if ((icn.access & Opcodes.ACC_INTERFACE) != 0) {
                            ifaceMethodTable.put(icn.name, mt);
                            // mod 接口的父接口链（IM 回退沿链查 SRG 方法需要）
                            if (icn.interfaces != null && !icn.interfaces.isEmpty()) {
                                interfaceParents.put(icn.name, new HashSet<>(icn.interfaces));
                            }
                        } else {
                            classMethodTable.put(icn.name, mt);
                            classMethodAccess.put(icn.name, accMap);
                            if (icn.interfaces != null && !icn.interfaces.isEmpty()) {
                                modClassInterfaces.put(icn.name, new ArrayList<>(icn.interfaces));
                            }
                            if ((icn.access & Opcodes.ACC_ABSTRACT) != 0) {
                                Set<String> ams = new HashSet<>();
                                for (MethodNode im : icn.methods) {
                                    if ((im.access & Opcodes.ACC_ABSTRACT) == 0) continue;
                                    ams.add(im.name + "|" + im.desc);
                                }
                                if (!ams.isEmpty()) modAbstractMethods.put(icn.name, ams);
                            }
                        }
                    } catch (Exception ex) {}
                }
            }
            for (JarEntry n : nested) {
                File tmp = File.createTempFile("nested-iface", ".jar");
                try {
                    try (InputStream is = jf.getInputStream(n)) {
                        Files.copy(is, tmp.toPath(), StandardCopyOption.REPLACE_EXISTING);
                    }
                    collectIfaceTableInJar(tmp);
                } finally {
                    tmp.delete();
                }
            }
        }
    }

    // 调用改写：调用者类 -> Set<[srgName, desc]>（把对该类里 INVOKEVIRTUAL/INVOKESTATIC
    // 目标类 MCP 方法的调用改写成 SRG 名，让 @Overwrite 覆盖的桥接被真正调用）。
    // 调用者可能不在桥接所在类（如 StateDefinition.createFromMap 调用 StateHolder.populateNeighbours）。
    static Map<String, Set<String[]>> callRewrites = new TreeMap<>();
    static Set<String> visited2 = new HashSet<>();
    // @Inject method targets whose internal calls must retain MCP names until Mixin
    // resolves their @At(INVOKE) selectors.
    static Map<String, Set<String>> injectionTargets = new TreeMap<>();

    static void collectModParentsAll(File modsDir) throws Exception {
        File[] jars = modsDir.listFiles((d, n) -> n.endsWith(".jar"));
        if (jars == null) return;
        for (File jar : jars) collectModParentsInJar(jar);
    }

    static void collectModParentsInJar(File jar) throws Exception {
        if (!hierarchyVisited.add(jar.getAbsolutePath())) return;
        try (JarFile jf = new JarFile(jar)) {
            List<JarEntry> nested = new ArrayList<>();
            Enumeration<JarEntry> en = jf.entries();
            while (en.hasMoreElements()) {
                JarEntry entry = en.nextElement();
                if (entry.getName().endsWith(".jar") && entry.getName().startsWith("META-INF/jarjar/")) {
                    nested.add(entry);
                } else if (entry.getName().endsWith(".class")) {
                    try {
                        ClassReader cr = new ClassReader(jf.getInputStream(entry));
                        String parent = cr.getSuperName();
                        if (parent != null) modParents.put(cr.getClassName(), parent);
                    } catch (Exception ex) {}
                }
            }
            for (JarEntry entry : nested) {
                File tmp = File.createTempFile("nested-hierarchy", ".jar");
                try {
                    try (InputStream is = jf.getInputStream(entry)) {
                        Files.copy(is, tmp.toPath(), StandardCopyOption.REPLACE_EXISTING);
                    }
                    collectModParentsInJar(tmp);
                } finally {
                    tmp.delete();
                }
            }
        }
    }

    static String parentOf(String className) {
        String parent = modParents.get(className);
        return parent != null ? parent : vanillaParents.get(className);
    }

    // 递归收集接口及其父接口链的方法表（mod 接口的父接口可能是原版接口，
    // 如 kubejs ExportablePackResources extends PackResources）
    static void collectIfaceMethods(String iface, List<Set<String>> out, Set<String> seen) {
        if (!seen.add(iface)) return;
        Set<String> ifMs = interfaceMethods.get(iface);
        if (ifMs != null) out.add(ifMs);
        Set<String> parents = interfaceParents.get(iface);
        if (parents != null) {
            for (String p : parents) collectIfaceMethods(p, out, seen);
        }
    }

    // 收集接口链（含父接口递归）——IM 回退查接口 SRG 方法用
    static void collectIfaceChain(String iface, List<String> out, Set<String> seen) {
        if (!seen.add(iface)) return;
        out.add(iface);
        Set<String> parents = interfaceParents.get(iface);
        if (parents != null) {
            for (String p : parents) collectIfaceChain(p, out, seen);
        }
    }

    static boolean isMixinClass(ClassNode cn) {
        List<AnnotationNode> annotations = new ArrayList<>();
        if (cn.visibleAnnotations != null) annotations.addAll(cn.visibleAnnotations);
        if (cn.invisibleAnnotations != null) annotations.addAll(cn.invisibleAnnotations);
        for (AnnotationNode annotation : annotations) {
            if ("Lorg/spongepowered/asm/mixin/Mixin;".equals(annotation.desc)) return true;
        }
        return false;
    }

    static void recordInjectionTarget(String selector, String defaultOwner) {
        if (selector == null || selector.isEmpty()) return;
        String owner = defaultOwner;
        String method = selector;
        if (selector.startsWith("L")) {
            int semi = selector.indexOf(';');
            if (semi > 0) {
                owner = selector.substring(1, semi);
                method = selector.substring(semi + 1);
            }
        }
        int paren = method.indexOf('(');
        String name = paren >= 0 ? method.substring(0, paren) : method;
        String desc = paren >= 0 ? method.substring(paren) : "*";
        if (name.startsWith("m_")) {
            String mcp = srgToMcp.get(name);
            if (mcp != null) name = mcp;
        }
        injectionTargets.computeIfAbsent(owner, k -> new TreeSet<>()).add(name + "|" + desc);
    }

    static void collectCallRewrites(File modsDir) throws Exception {
        for (File f : modsDir.listFiles((d, n) -> n.endsWith(".jar"))) collectInJar(f);
        // 原版类（StateDefinition 等）在 forge recomp jar（dev 类路径），不在 run/mods
        Path userRepo = Paths.get(System.getProperty("user.home"), ".gradle", "caches", "forge_gradle", "minecraft_user_repo");
        try (java.util.stream.Stream<Path> stream = java.nio.file.Files.walk(userRepo)) {
            stream.filter(p -> p.toString().contains("_mapped_official_") && p.toString().endsWith("-recomp.jar"))
                  .forEach(p -> { try { collectInJar(p.toFile()); } catch (Exception ex) {} });
        }
    }

    static void collectInJar(File jar) throws Exception {
        if (!visited2.add(jar.getAbsolutePath())) return;
        try (JarFile jf = new JarFile(jar)) {
            Enumeration<JarEntry> en = jf.entries();
            List<JarEntry> nested = new ArrayList<>();
            while (en.hasMoreElements()) {
                JarEntry e = en.nextElement();
                if (e.getName().endsWith(".jar") && e.getName().startsWith("META-INF/jarjar/")) nested.add(e);
            }
            for (JarEntry n : nested) {
                File tmp = File.createTempFile("nested", ".jar");
                try (InputStream is = jf.getInputStream(n)) { Files.copy(is, tmp.toPath(), StandardCopyOption.REPLACE_EXISTING); }
                collectInJar(tmp);
                tmp.delete();
            }
            Enumeration<JarEntry> en2 = jf.entries();
            while (en2.hasMoreElements()) {
                JarEntry e = en2.nextElement();
                if (!e.getName().endsWith(".class")) continue;
                try {
                    ClassReader cr = new ClassReader(jf.getInputStream(e));
                    ClassNode cn = new ClassNode();
                    cr.accept(cn, 0);
                    // Mixin method bodies are remapped by Mixin itself. Rewriting their
                    // MCP calls here also changes @Inject/@At descriptors and can make
                    // otherwise valid injection targets disappear.
                    if (isMixinClass(cn)) continue;
                    for (MethodNode m : cn.methods) {
                        for (AbstractInsnNode insn = m.instructions.getFirst(); insn != null; insn = insn.getNext()) {
                            if (!(insn instanceof MethodInsnNode)) continue;
                            MethodInsnNode min = (MethodInsnNode) insn;
                            if (min.getOpcode() != Opcodes.INVOKEVIRTUAL && min.getOpcode() != Opcodes.INVOKESTATIC) continue;
                            // 调用指令名是 MCP 域（dev 字节码）；missing 里的 OM/OMS 条目是 SRG 名，
                            // 需把调用名反查成 SRG 再匹配
                            String callSrg = mcpToSrg.get(min.name);
                            if (callSrg == null) continue;
                            // 是否命中 @Overwrite 桥接（missing 里 kind=OM/OMS 的 target+srg）
                            Set<String[]> targetMembers = missing.get(min.owner);
                            if (targetMembers == null) continue;
                            for (String[] om : targetMembers) {
                                if ((om[0].equals("OM") || om[0].equals("OMS") || om[0].equals("OV")) && om[1].equals(callSrg) && om[2].equals(min.desc)) {
                                    // 被 @At(INVOKE) target 引用的调用不能改写——mixin 按反查后的
                                    // MCP 名匹配指令，改写成 SRG 名后注入点找不到
                                    // （sodium-extra MixinToastManager @At target=ToastComponent.add(I)V）
                                    if (atTargetKeys.contains(min.owner + "|" + min.name + "|" + min.desc)) continue;
                                    callRewrites.computeIfAbsent(cn.name, k -> new TreeSet<>(
                                        Comparator.comparing((String[] x) -> x[0])
                                            .thenComparing(x -> x[1])
                                            .thenComparing(x -> x[2])
                                            .thenComparing(x -> x[3])))
                                        .add(new String[]{om[1], om[2], min.owner, min.name});
                                }
                            }
                        }
                    }
                } catch (Exception ex) {}
            }
        }
    }

    static String mcpOf(String srg, String owner) {
        // missing 里 OM/OMS 条目只有 srg/desc；MCP 名从 srgToMcp 查
        return srgToMcp.get(srg);
    }

    static void scanJar(File jar) throws Exception {
        if (!visited.add(jar.getAbsolutePath())) return;
        try (JarFile jf = new JarFile(jar)) {
            Enumeration<JarEntry> en = jf.entries();
            List<JarEntry> nested = new ArrayList<>();
            while (en.hasMoreElements()) {
                JarEntry e = en.nextElement();
                if (e.getName().endsWith(".jar") && e.getName().startsWith("META-INF/jarjar/")) nested.add(e);
            }
            for (JarEntry n : nested) {
                File tmp = File.createTempFile("nested", ".jar");
                try (InputStream is = jf.getInputStream(n)) { Files.copy(is, tmp.toPath(), StandardCopyOption.REPLACE_EXISTING); }
                scanJar(tmp);
                tmp.delete();
            }
            Enumeration<JarEntry> en2 = jf.entries();
            while (en2.hasMoreElements()) {
                JarEntry e = en2.nextElement();
                if (!e.getName().endsWith(".class")) continue;
                try {
                    ClassReader cr = new ClassReader(jf.getInputStream(e));
                    ClassNode cn = new ClassNode();
                    cr.accept(cn, 0);
                    if ((cn.access & Opcodes.ACC_INTERFACE) != 0) {
                        interfaces.add(cn.name);
                        // mod 接口也记录父接口（IM 收集按父接口链找原版接口方法义务，
                        // 如 kubejs ExportablePackResources extends PackResources）
                        interfaceParents.put(cn.name, new HashSet<>(cn.interfaces));
                    }
                    String mixinTarget = null;
                    List<AnnotationNode> clsAnns = new ArrayList<>();
                    if (cn.visibleAnnotations != null) clsAnns.addAll(cn.visibleAnnotations);
                    if (cn.invisibleAnnotations != null) clsAnns.addAll(cn.invisibleAnnotations);
                    for (AnnotationNode a : clsAnns) {
                        if (a.desc.equals("Lorg/spongepowered/asm/mixin/Mixin;") && a.values != null) {
                            for (int i = 0; i < a.values.size() - 1; i += 2) {
                                Object v = a.values.get(i + 1);
                                if (v instanceof List) {
                                    for (Object o : (List<?>) v) {
                                        // value 可能是 "Lnet/...;"（斜杠）或 targets 的 "net.minecraft..."（点分），统一斜杠
                                        String t = String.valueOf(o);
                                        mixinTarget = (t.startsWith("L") ? t.substring(1).replace(";", "") : t).replace('.', '/');
                                    }
                                }
                            }
                        }
                    }
                    // 所有类（含非 mixin 的 mod 类，如 ferritecore 的 PropertyIndexer.<clinit> 调
                    // Util.m_137583_）的字节码内写死的 SRG 引用都需要在 owner 类补桥接
                    for (MethodNode m : cn.methods) {
                        scanInsnRefs(m, cn);
                    }
                    // 发布版 mod 类（SRG 域，不被 Forge remap）实现 dev 原版接口/抽象类
                    // （MCP 域）时缺 MCP 名方法（如 AE2 AppEngAdvancementTrigger 只有
                    // m_7295_ 没有 getId；ferritecore 场景下 Property.getPossibleValues
                    // 抽象方法实现类只有 m_6908_）→ AbstractMethodError。为缺失的抽象方法
                    // 补 MCP 名桥接（调类里已有的 SRG 方法）。mod 自有类（MCP 域编译）
                    // 已有 MCP 方法，自然跳过。
                    // 接口类（如 kubejs ComponentKJS）"实现"接口不需要实现 abstract 方法，
                    // 补 default 桥接会分派回自己无限递归（getString → getString）；
                    // mixin 类（@Mixin 注解）的方法会被合并到目标类（同名覆盖），
                    // 补 IM 桥接会污染目标类（如 MinecraftMixin.setWindowActive 覆盖
                    // Minecraft.setWindowActive → 与 m_7440_ 桥接互调递归）——都跳过
                    if ((cn.access & Opcodes.ACC_INTERFACE) == 0 && !isMixinClass(cn)
                            && (!interfaceMethods.isEmpty() || !abstractMethods.isEmpty())) {
                        // 收集"需要实现的抽象方法"来源：implements 的接口（含父接口链——
                        // mod 接口如 kubejs ExportablePackResources extends PackResources
                        // 的原版接口方法义务也传递）+ extends 链上的抽象类
                        List<Set<String>> requiredMaps = new ArrayList<>();
                        // 完整接口链（含父接口递归）：IM 回退时沿链查接口声明的 SRG 方法
                        // （AE2 GlassModel.getDependencies ← BasicUnbakedModel.m_7970_）
                        List<String> ifaceChain = new ArrayList<>();
                        if (cn.interfaces != null) {
                            for (String iface : cn.interfaces) {
                                collectIfaceMethods(iface, requiredMaps, new HashSet<>());
                                collectIfaceChain(iface, ifaceChain, new HashSet<>());
                            }
                        }
                        String anc = cn.superName;
                        while (anc != null) {
                            Set<String> am = abstractMethods.get(anc);
                            if (am != null) requiredMaps.add(am);
                            // mod 抽象类的抽象方法义务（mekanism ItemStackToItemStackRecipe 等）
                            Set<String> mam = modAbstractMethods.get(anc);
                            if (mam != null) requiredMaps.add(mam);
                            Set<String> inheritedIfaces = vanillaInterfaces.get(anc);
                            if (inheritedIfaces != null) {
                                for (String iface : inheritedIfaces) {
                                    collectIfaceMethods(iface, requiredMaps, new HashSet<>());
                                    collectIfaceChain(iface, ifaceChain, new HashSet<>());
                                }
                            }
                            // mod 类（抽象类/父类）声明的接口（Recipe 义务传递——
                            // EnrichingIRecipe.getType ← Recipe.getType）
                            List<String> modIfaces = modClassInterfaces.get(anc);
                            if (modIfaces != null) {
                                for (String iface : modIfaces) {
                                    collectIfaceMethods(iface, requiredMaps, new HashSet<>());
                                    collectIfaceChain(iface, ifaceChain, new HashSet<>());
                                }
                            }
                            anc = parentOf(anc);
                        }
                        for (Set<String> ifMs : requiredMaps) {
                            for (String signature : ifMs) {
                                int split = signature.indexOf('|');
                                if (split < 0) continue;
                                String mcpName = signature.substring(0, split);
                                String desc = signature.substring(split + 1);
                                boolean has = false;
                                for (MethodNode mm : cn.methods) {
                                    if (mm.name.equals(mcpName) && mm.desc.equals(desc)) { has = true; break; }
                                }
                                if (has) continue;
                                // 找类里对应的 SRG 方法：不能用 mcpToSrg 反查（同名 MCP 方法
                                // 多 desc/多类会互相覆盖，如 getId → m_83633_ 覆盖 m_7295_），
                                // 直接按 desc + srgToMcp 精确匹配类方法
                                String srg = null;
                                String bridgeOwner = cn.name;
                                for (MethodNode mm : cn.methods) {
                                    if (mm.name.startsWith("m_") && mm.desc.equals(desc)
                                            && mcpName.equals(srgToMcp.get(mm.name))) {
                                        srg = mm.name;
                                        break;
                                    }
                                }
                                if (srg != null) {
                                    // 类自身有 SRG 方法（真实 override）。但父类链已有具体 MCP
                                    // 实现时（如 ModMenuButtonWidget.m_88315_ override render，
                                    // 父类 AbstractButton.render 真实实现）不需要补 MCP 桥接——
                                    // dispatch MCP 名会命中父类真实实现（语义继承）；补了桥接后
                                    // SRG 桥接（AbstractButton.m_88315_）的 INVOKEVIRTUAL 分派
                                    // 会命中该桥接 → render ↔ m_88315_ 无限递归。
                                    // 父类实现是 abstract 时不跳过（接口抽象义务仍需本类实现）。
                                    String ancP = cn.superName;
                                    boolean skipDueToParent = false;
                                    while (ancP != null) {
                                        Map<String, String> cmtP = classMethodTable.get(ancP);
                                        if (cmtP == null) cmtP = vanillaMethods.get(ancP);
                                        if (cmtP != null && desc.equals(cmtP.get(mcpName))) {
                                            Map<String, Integer> paP = classMethodAccess.get(ancP);
                                            if (paP == null) paP = vanillaMethodAccess.get(ancP);
                                            if (paP != null) {
                                                Integer accP = paP.get(mcpName + "|" + desc);
                                                if (accP != null && (accP & Opcodes.ACC_ABSTRACT) == 0) {
                                                    skipDueToParent = true;
                                                    break;
                                                }
                                            }
                                        }
                                        ancP = parentOf(ancP);
                                    }
                                    if (skipDueToParent) {
                                        continue;
                                    }
                                }
                                if (srg == null) {
                                    // 类自身没有 SRG 方法。先沿父类链找 MCP 方法（super 调用最
                                    // 安全——如 gtceu GTHoeItem.asItem ← HoeItem/Item.asItem 返回
                                    // this；调接口 IGTTool.m_5456_ 会被父类链上补的 Item.m_5456_
                                    // 桥接劫持 → GTHoeItem.asItem ↔ Item.m_5456_ 无限递归）；
                                    // 父类没有时沿接口链找接口声明的 SRG 方法（如 AE2 GlassModel
                                    // getDependencies ← BasicUnbakedModel default m_7970_），
                                    // 否则 dev 域 dispatch MCP 接口方法 → AbstractMethodError
                                    // （ModelBakery 调 GlassModel.getDependencies 崩 →
                                    // 资源包全被移除 → 字体白块）。
                                    String ifaceSrg = null;
                                    String srgOwner = null;
                                    String superMcp = null;
                                    String superOwner = null;
                                    // 1) 父类链 MCP 方法（INVOKESPECIAL super 调用）
                                    String anc2 = cn.superName;
                                    boolean finalParent = false;
                                    while (anc2 != null) {
                                        Map<String, String> cmt = classMethodTable.get(anc2);
                                        if (cmt == null) cmt = vanillaMethods.get(anc2);
                                        if (cmt != null && desc.equals(cmt.get(mcpName))) {
                                            // 父类 final 方法（如 Forge CapabilityProvider.
                                            // areCapsCompatible 源码真 final）：父类实现已满足
                                            // 接口义务，子类补桥接会 "overrides final method"
                                            // IncompatibleClassChangeError（ars ANFakePlayer）——
                                            // 跳过整个 IM 生成（运行时 dispatch 走父类实现）
                                            Map<String, Integer> pa = classMethodAccess.get(anc2);
                                            if (pa == null) pa = vanillaMethodAccess.get(anc2);
                                            if (pa != null) {
                                                Integer acc = pa.get(mcpName + "|" + desc);
                                                if (acc != null && (acc & Opcodes.ACC_FINAL) != 0) {
                                                    finalParent = true;
                                                    break;
                                                }
                                            }
                                            superMcp = mcpName;
                                            superOwner = anc2;
                                            break;
                                        }
                                        anc2 = parentOf(anc2);
                                    }
                                    if (finalParent) {
                                        continue;
                                    }
                                    if (superMcp != null) {
                                        srg = superMcp;
                                        bridgeOwner = "super:" + superOwner;
                                    } else {
                                        // 2) 接口链 SRG 方法（INVOKEINTERFACE）——但类链（父类们）
                                        // 若已有同 srg+desc 的 M 桥接条目（我们要补的），invokeinterface
                                        // 会劫持到类方法（JVM 类方法优先于接口 default）→ 互调递归。
                                        for (String iface : ifaceChain) {
                                            Map<String, String> imt = ifaceMethodTable.get(iface);
                                            if (imt == null) continue;
                                            for (Map.Entry<String, String> ie : imt.entrySet()) {
                                                // 只认真正的 SRG 名（m_ 前缀）：接口方法名是 MCP 名
                                                // （如 PackResources.close）时 srgToMcp 反查可能命中
                                                // output.srg 的同名映射（某些方法 SRG 名 == MCP 名），
                                                // 误判为 SRG 方法 → 桥接调同名方法 self-dispatch
                                                // 无限递归（ldlib CustomResourcePack.close）。
                                                if (ie.getKey().startsWith("m_")
                                                        && ie.getValue().equals(desc)
                                                        && mcpName.equals(srgToMcp.get(ie.getKey()))) {
                                                    // 类链劫持检查：父类们有没有同 srg 的 M/OV 桥接
                                                    boolean hijacked = false;
                                                    String anc3 = cn.superName;
                                                    while (anc3 != null) {
                                                        Set<String[]> pms = missing.get(anc3);
                                                        if (pms != null) {
                                                            for (String[] pm : pms) {
                                                                if ((pm[0].equals("M") || pm[0].equals("MS")
                                                                        || pm[0].equals("OV"))
                                                                        && pm[1].equals(ie.getKey())
                                                                        && pm[2].equals(desc)) {
                                                                    hijacked = true;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                        if (hijacked) break;
                                                        anc3 = parentOf(anc3);
                                                    }
                                                    if (!hijacked) {
                                                        ifaceSrg = ie.getKey();
                                                        srgOwner = iface;
                                                    }
                                                    break;
                                                }
                                            }
                                            if (ifaceSrg != null) break;
                                        }
                                        if (ifaceSrg != null) {
                                            srg = ifaceSrg;
                                            bridgeOwner = srgOwner;
                                        }
                                    }
                                    if (srg == null) {
                                        // 都不行：不补 IM——接口义务由"声明 implements 的类或其
                                        // 父类"的 IM 桥接承担（类方法匹配命中）；回退用接口官方
                                        // SRG 会与接口 default/SRG 桥接互调递归（如
                                        // PreparableReloadListener.m_5540_ ↔ 6 参数 reload IM
                                        // 桥接、RepositorySource.m_7686_ ↔ loadPacks）
                                        continue;
                                    }
                                }
                                if (srg == null) continue;
                                missing.computeIfAbsent(cn.name, k -> new TreeSet<>(MISSING_COMPARATOR))
                                    .add(new String[]{"IM", mcpName, desc, srg, bridgeOwner});
                            }
                        }
                    }
                    // override 桥接：发布版 mod 类（SRG 域）的 m_XXX_ 方法 override 原版
                    // 父类（MCP 域）的 MCP 方法——父类没有 SRG 名方法 → JVM 不认为子类
                    // override（如 AEBaseBlock.m_7926_ 不 override Block.createBlockStateDefinition）
                    // → 子类逻辑丢失（如 WATERLOGGED 属性未注册 → 构造器 setValue 抛异常）。
                    // 给原版父类补 SRG 桥接 + 调用改写（collectCallRewrites 认 OV 条目）
                    if (cn.superName != null && !vanillaMethods.isEmpty()) {
                        for (MethodNode mm : cn.methods) {
                            if (!mm.name.startsWith("m_") || (mm.access & Opcodes.ACC_STATIC) != 0) continue;
                            String mcp = srgToMcp.get(mm.name);
                            if (mcp == null || mcp.equals(mm.name)) continue;
                            String parent = cn.superName;
                            while (parent != null) {
                                if (parent.startsWith("net/minecraft") || parent.startsWith("com/mojang")) {
                                    Map<String, String> pm = vanillaMethods.get(parent);
                                    if (pm != null && pm.containsKey(mcp) && pm.get(mcp).equals(mm.desc)) {
                                        // 父类有 MCP 名方法（同 desc）→ 补 SRG 桥接；
                                        // 但被 mixin @At(INVOKE) target 引用的方法不能动
                                        // （调用改写后 mixin 按反查 MCP 名找不到指令）
                                        if (atTargetKeys.contains(parent + "|" + mcp + "|" + mm.desc)) break;
                                        missing.computeIfAbsent(parent, k -> new TreeSet<>(MISSING_COMPARATOR))
                                            .add(new String[]{"OV", mm.name, mm.desc});
                                    }
                                }
                                parent = parentOf(parent);
                            }
                        }
                    }
                    // 只对原版/Forge 域类补 SRG 成员（net/minecraft 与 com/mojang 都是原版包；
                    // mod 自有类在 dev 用 MCP 域编译，@Shadow 本就是 MCP 名，无需补）
                    if (mixinTarget == null || !(mixinTarget.startsWith("net/minecraft") || mixinTarget.startsWith("com/mojang"))) continue;
                    for (MethodNode m : cn.methods) {
                        List<AnnotationNode> anns = new ArrayList<>();
                        if (m.invisibleAnnotations != null) anns.addAll(m.invisibleAnnotations);
                        if (m.visibleAnnotations != null) anns.addAll(m.visibleAnnotations);
                        for (AnnotationNode a : anns) {
                            // @Overwrite 不走 refmap/RemapperChain 反查，直接按方法名匹配目标类，
                            // 因此 SRG 名 @Overwrite 需要在目标类里有对应 SRG 桥接方法。
                            // 用 OM/OMS 标记：除补桥接外，还要把目标类内对 MCP 原方法的调用改写成
                            // SRG 名（dev 原版字节码调用 MCP 名，不改则 @Overwrite 覆盖的桥接永远不被调用）。
                            if (a.desc.equals("Lorg/spongepowered/asm/mixin/Overwrite;") && m.name.startsWith("m_") && srgToMcp.containsKey(m.name)) {
                                missing.computeIfAbsent(mixinTarget, k -> new TreeSet<>(MISSING_COMPARATOR))
                                    .add(new String[]{(m.access & Opcodes.ACC_STATIC) != 0 ? "OMS" : "OM", m.name, m.desc, String.valueOf(m.access)});
                            }
                            // 注入注解的 method/target 值里的 SRG 名（refmap 反查后 selector 保持 SRG，
                            // 需要目标类里有对应 SRG 成员才能匹配）
                            if (a.desc.contains("mixin/injection/") && a.values != null) {
                                // 收集 @At 的 target 值（INVOKE 注入点引用的方法）——
                                // OV 调用改写不能动这些方法（mixin 按反查后的 MCP 名匹配指令，
                                // 改写为 SRG 名后 @At INVOKE 找不到 → injection check 失败）
                                for (int i = 0; i < a.values.size() - 1; i += 2) {
                                    Object av = a.values.get(i + 1);
                                    if (av instanceof AnnotationNode) {
                                        collectAtTargets((AnnotationNode) av);
                                    } else if (av instanceof List) {
                                        for (Object o2 : (List<?>) av) {
                                            if (o2 instanceof AnnotationNode) collectAtTargets((AnnotationNode) o2);
                                        }
                                    }
                                }
                                for (int i = 0; i < a.values.size() - 1; i += 2) {
                                    String key = String.valueOf(a.values.get(i));
                                    if (!key.equals("method") && !key.equals("target")) continue;
                            Object v = a.values.get(i + 1);
                            List<Object> vals = new ArrayList<>();
                            if (v instanceof List) vals.addAll((List<?>) v);
                            else if (v != null) vals.add(v);
                            for (Object o : vals) {
                                        if (key.equals("method")) {
                                            recordInjectionTarget(String.valueOf(o), mixinTarget);
                                        }
                                        collectSrgFrom(String.valueOf(o), mixinTarget);
                            }
                                }
                            }
                        }
                    }
                    for (FieldNode f : cn.fields) {
                        List<AnnotationNode> anns = new ArrayList<>();
                        if (f.invisibleAnnotations != null) anns.addAll(f.invisibleAnnotations);
                        if (f.visibleAnnotations != null) anns.addAll(f.visibleAnnotations);
                        for (AnnotationNode a : anns) {
                            // @Shadow 字段统一补桥接：mixin 不允许字段别名（alias 目标必须 private，
                            // 真实 MCP 字段几乎都是非 private），补同名桥接字段让 findField 直接命中。
                            // 基本类型默认值安全（0/false 不会 NPE）；static 引用在 <clinit> 末尾用
                            // MCP 原字段初始化；实例引用字段默认 null——会读取的 mixin 需单独禁用。
                            if (a.desc.equals("Lorg/spongepowered/asm/mixin/Shadow;") && f.name.startsWith("f_")
                                    && srgToMcp.containsKey(f.name)) {
                                String kind = (f.access & Opcodes.ACC_STATIC) != 0 ? "FS" : "F";
                                missing.computeIfAbsent(mixinTarget, k -> new TreeSet<>(MISSING_COMPARATOR))
                                    .add(new String[]{kind, f.name, f.desc});
                            }
                        }
                    }
                } catch (Exception ex) {}
            }
        }
    }

    static Pattern SRG_PATTERN = Pattern.compile("(m_\\d+_|f_\\d+_)");
    static Map<String, String> mcpToSrg = new HashMap<>();
    static Map<String, String> mcpSigToSrg = new HashMap<>();   // mcpName+desc -> srg
    static Map<String, String> mcpDesc = new HashMap<>();
    // Names originating from MD rows. Some record accessors use an f_ SRG name
    // even though the bytecode member is a method (KeyDispatchDataCodec.f_216232_()).
    static Set<String> srgMethodNames = new HashSet<>();

    /** 从注入注解的 method/target 值提取成员名，反查 SRG 名（refmap 反查后 selector 保持 SRG，目标类需有对应成员） */
    // 字节码内写死的 SRG 引用（非 @Shadow，如 <clinit> 里 GETSTATIC Fluids.f_76191_、
    // INVOKEVIRTUAL Fluid.m_76145_、或普通 mod 类调 Util.m_137583_）不会被
    // refmap/RemapperChain 处理。方法引用 → owner 类补 SRG 桥接；字段引用 → 在
    // 引用处改写为 MCP 字段名（接口 static 字段无法补桥接——接口字段必须
    // public static final 且引用类型无常量值，ClassFormatError）。
    static void scanInsnRefs(MethodNode m, ClassNode cn) {
        for (AbstractInsnNode insn = m.instructions.getFirst(); insn != null; insn = insn.getNext()) {
            if (insn instanceof FieldInsnNode) {
                FieldInsnNode fin = (FieldInsnNode) insn;
                if (!fin.name.startsWith("f_")) continue;
                String mcp = srgToMcp.get(fin.name);
                if (mcp == null) continue;
                String mcpOwner = fin.owner;
                // owner 不是原版类（如 mixin extends Block 直接引用父类 f_49792_）：
                // 用全名映射找真实 owner（Block/stateDefinition），改写时同时改 owner
                if (!(fin.owner.startsWith("net/minecraft") || fin.owner.startsWith("com/mojang"))) {
                    String full = srgFieldFull.get(fin.owner + "/" + fin.name);
                    if (full == null) {
                        // mod 类引用继承的原版 static 字段（如 ModernUI TextRenderType 引
                        // RenderStateShard.TRANSLUCENT_TRANSPARENCY → GETSTATIC
                        // TextRenderType.f_110139_）：按 srg 字段名反查所属原版类
                        String realOwner = srgFieldOwner.get(fin.name);
                        if (realOwner == null) continue;
                        full = srgFieldFull.get(realOwner + "/" + fin.name);
                        if (full == null) continue;
                    }
                    mcpOwner = full.substring(0, full.lastIndexOf('/'));
                    mcp = full.substring(full.lastIndexOf('/') + 1);
                }
                if (mcp.equals(fin.name)) continue;
                fieldRefRewrites.computeIfAbsent(cn.name, k -> new TreeSet<>(
                    Comparator.comparing((String[] x) -> x[1])
                        .thenComparing(x -> x[3])
                        .thenComparing(x -> x[0])
                        .thenComparing(x -> x[4])
                        .thenComparing(x -> x[2])))
                    .add(new String[]{fin.owner, fin.name, mcp, fin.desc, mcpOwner});
            } else if (insn instanceof MethodInsnNode) {
                MethodInsnNode min = (MethodInsnNode) insn;
                if (srgMethodNames.contains(min.name)) {
                    // owner 可能是 mod 子类（SRG 域调用父类方法，如 AE2 调
                    // registerDefaultState → invokevirtual CertusQuartzClusterBlock.m_49959_）：
                    // 按 srg 名反查方法所属的原版类，桥接补到那个类
                    String bridgeOwner = min.owner;
                    if (!(min.owner.startsWith("net/minecraft") || min.owner.startsWith("com/mojang"))) {
                        String realOwner = srgMethodOwner.get(min.name);
                        if (realOwner == null
                                || !(realOwner.startsWith("net/minecraft") || realOwner.startsWith("com/mojang"))) {
                            continue;
                        }
                        bridgeOwner = realOwner;
                    }
                    if (min.getOpcode() == Opcodes.INVOKEINTERFACE) {
                        // 接口方法不能补 abstract 桥接（要求所有实现类实现 → AbstractMethodError），
                        // 但可补 default 方法（Java 8+，带方法体，实现类自动继承）——调用方
                        // 即使已加载也能解析（INVOKEINTERFACE 会沿父接口链查 default）。
                        // 同时记录调用改写（mref_rw）双保险，覆盖注册后加载的调用方。
                        missing.computeIfAbsent(bridgeOwner, k -> new TreeSet<>(MISSING_COMPARATOR))
                            .add(new String[]{"M", min.name, min.desc});
                        methodRefRewrites.computeIfAbsent(cn.name, k -> new TreeSet<>(
                            Comparator.comparing((String[] x) -> x[1])
                                .thenComparing(x -> x[3])
                                .thenComparing(x -> x[0])
                                .thenComparing(x -> x[2])))
                            .add(new String[]{min.owner, min.name, srgToMcp.get(min.name), min.desc});
                    } else {
                        missing.computeIfAbsent(bridgeOwner, k -> new TreeSet<>(MISSING_COMPARATOR))
                            .add(new String[]{min.getOpcode() == Opcodes.INVOKESTATIC ? "MS" : "M", min.name, min.desc});
                    }
                }
            } else if (insn instanceof InvokeDynamicInsnNode) {
                // 方法引用（如 Blocks::never）编译为 invokedynamic + MethodHandle——
                // MethodInsnNode 扫描不到，需要扫 bsmArgs 里的 Handle 引用
                InvokeDynamicInsnNode din = (InvokeDynamicInsnNode) insn;
                // lambda 实现的接口：invokedynamic 返回类型是接口，name 是接口方法
                // （SRG 域编译），samMethodType（bsmArgs[0]）是方法签名——
                // 收集后把接口抽象方法 default 化（空实现），兜底运行时生成的
                // lambda 合成类（SRG 方法名与 MCP 接口方法不匹配 → AbstractMethodError）
                try {
                    Type ret = Type.getReturnType(din.desc);
                    if (ret.getSort() == Type.OBJECT) {
                        String iface = ret.getClassName().replace('.', '/');
                        if (interfaceOwners.contains(iface) && din.bsmArgs.length >= 1
                                && din.bsmArgs[0] instanceof Type) {
                            String mcpName = srgToMcp.get(din.name);
                            if (mcpName != null) {
                                String samDesc = ((Type) din.bsmArgs[0]).getDescriptor();
                                // Keep the invokedynamic SRG name. Reconstructing it later from
                                // MCP name + descriptor is ambiguous across owners (IoSupplier.get
                                // is m_247737_, while LazyLoadedValue.get with the same descriptor
                                // is m_13971_).
                                interfaceDefaultify.computeIfAbsent(iface, k -> new TreeSet<>())
                                    .add(mcpName + "|" + samDesc + "|" + din.name);
                            }
                        }
                    }
                } catch (Exception ex) {}
                for (Object ba : din.bsmArgs) {
                    if (!(ba instanceof Handle)) continue;
                    Handle h = (Handle) ba;
                    if (!srgMethodNames.contains(h.getName())) continue;
                    String bridgeOwner = h.getOwner();
                    if (!(bridgeOwner.startsWith("net/minecraft") || bridgeOwner.startsWith("com/mojang"))) {
                        String realOwner = srgMethodOwner.get(h.getName());
                        if (realOwner == null
                                || !(realOwner.startsWith("net/minecraft") || realOwner.startsWith("com/mojang"))) {
                            continue;
                        }
                        bridgeOwner = realOwner;
                    }
                    if (h.getTag() == Opcodes.H_INVOKEINTERFACE) {
                        missing.computeIfAbsent(bridgeOwner, k -> new TreeSet<>(MISSING_COMPARATOR))
                            .add(new String[]{"M", h.getName(), h.getDesc()});
                        methodRefRewrites.computeIfAbsent(cn.name, k -> new TreeSet<>(
                            Comparator.comparing((String[] x) -> x[1])
                                .thenComparing(x -> x[3])
                                .thenComparing(x -> x[0])
                                .thenComparing(x -> x[2])))
                            .add(new String[]{h.getOwner(), h.getName(), srgToMcp.get(h.getName()), h.getDesc()});
                    } else {
                        // 方法引用 X::instanceMethod 的 Handle tag 也是 H_INVOKESTATIC——
                        // 以原方法 access 判定 static（如 modernfix @Shadow m_274588_）
                        boolean hStatic = h.getTag() == Opcodes.H_INVOKESTATIC;
                        Map<String, Integer> hacc = vanillaMethodAccess.get(bridgeOwner);
                        if (hacc != null) {
                            Integer ha = hacc.get(srgToMcp.get(h.getName()) + "|" + h.getDesc());
                            if (ha != null) hStatic = (ha & Opcodes.ACC_STATIC) != 0;
                        }
                        missing.computeIfAbsent(bridgeOwner, k -> new TreeSet<>(MISSING_COMPARATOR))
                            .add(new String[]{hStatic ? "MS" : "M", h.getName(), h.getDesc()});
                    }
                }
            }
        }
    }

    static void collectSrgFrom(String s, String mixinTarget) {
        String owner = mixinTarget;
        if (s.startsWith("L")) {
            int semi = s.indexOf(';');
            if (semi > 0) owner = s.substring(1, semi);
        }
        int paren = s.indexOf('(');
        String name = paren >= 0 ? s.substring(0, paren) : s;
        int semi2 = name.lastIndexOf(';');
        if (semi2 >= 0) name = name.substring(semi2 + 1);
        String desc = paren >= 0 ? s.substring(paren) : null;
        if (SRG_PATTERN.matcher(name).find()) {
            if (name.startsWith("m_")) {
                if (desc == null) desc = mcpDesc.get(srgToMcp.get(name));
                if (desc != null) {
                    missing.computeIfAbsent(owner, k -> new TreeSet<>(MISSING_COMPARATOR))
                        .add(new String[]{"M", name, desc});
                }
            }
        } else {
            // MCP 名 → 反查 SRG（refmap 反查后 selector 用 SRG 名匹配）
            if (desc != null) {
                // 精确签名匹配（同名重载 desc 不同）
                String srg = mcpSigToSrg.get(name + desc);
                if (srg != null && srg.startsWith("m_")) {
                    missing.computeIfAbsent(owner, k -> new TreeSet<>(MISSING_COMPARATOR))
                        .add(new String[]{"M", srg, desc});
                }
            } else {
                // 无 desc：只补该 owner 真实存在的方法重载。不能补同名方法的所有
                // 重载——跨类同名（如 SimpleReloadInstance.create 与
                // StateFactory.create/EntryFactory.create 等）会被全部塞进
                // mixinTarget（ModernUI @Inject create → SimpleReloadInstance 被
                // 添加 m_10863_ 等几十个错误桥接），方法体 INVOKEVIRTUAL
                // 不存在的方法签名 → 隐患。mixinTarget 都是原版类（见调用处过滤），
                // vanillaMethods 有完整方法表。
                Map<String, String> vm = vanillaMethods.get(owner);
                for (Map.Entry<String, String> e : mcpSigToSrg.entrySet()) {
                    if (e.getKey().startsWith(name + "(") && e.getValue().startsWith("m_")) {
                        String d = e.getKey().substring(name.length());
                        if (vm != null && !d.equals(vm.get(name))) continue;
                        missing.computeIfAbsent(owner, k -> new TreeSet<>(MISSING_COMPARATOR))
                            .add(new String[]{"M", e.getValue(), d});
                    }
                }
            }
        }
    }

    static void generate(String outPath) throws Exception {
        StringBuilder sb = new StringBuilder();
        sb.append("/**\n");
        sb.append(" * auto-generated dev 兼容补丁（GenerateCompatJs 生成）：\n");
        sb.append(" * dev 环境类为 MCP 域，mixin 的 @Shadow SRG 名成员（m_/f_）在类中不存在，\n");
        sb.append(" * 此处为每个目标类补 SRG 名成员（方法委托 MCP 原方法，字段不初始化）。\n");
        sb.append(" * 正式环境不受影响（该 jar 仅 dev 存在）。\n");
        sb.append(" */\n");
        sb.append("function initializeCoreMod() {\n");
        sb.append("    var Opcodes = Java.type('org.objectweb.asm.Opcodes');\n");
        sb.append("    var Type = Java.type('org.objectweb.asm.Type');\n");
        sb.append("    var MethodNode = Java.type('org.objectweb.asm.tree.MethodNode');\n");
        sb.append("    var FieldNode = Java.type('org.objectweb.asm.tree.FieldNode');\n");
        sb.append("    var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');\n");
        sb.append("    var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');\n");
        sb.append("    var FieldInsnNode = Java.type('org.objectweb.asm.tree.FieldInsnNode');\n");
        sb.append("    var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');\n\n");
        sb.append("    function hasMethod(methods, name, desc) {\n");
        sb.append("        for (var i = 0; i < methods.size(); i++) {\n");
        sb.append("            var m = methods.get(i);\n");
        sb.append("            if (m.name === name && m.desc === desc) { return true; }\n");
        sb.append("        }\n");
        sb.append("        return false;\n");
        sb.append("    }\n\n");
        sb.append("    function ensureMethodLocals(methods) {\n");
        sb.append("        for (var i = 0; i < methods.size(); i++) {\n");
        sb.append("            var m = methods.get(i);\n");
        sb.append("            var needed = (m.access & Opcodes.ACC_STATIC) !== 0 ? 0 : 1;\n");
        sb.append("            var args = Type.getArgumentTypes(m.desc);\n");
        sb.append("            for (var j = 0; j < args.length; j++) { needed += args[j].getSize(); }\n");
        sb.append("            if (m.maxLocals < needed) { m.maxLocals = needed; }\n");
        sb.append("        }\n");
        sb.append("    }\n\n");
        sb.append("    function hasField(fields, name, desc) {\n");
        sb.append("        for (var i = 0; i < fields.size(); i++) {\n");
        sb.append("            var f = fields.get(i);\n");
        sb.append("            if (f.name === name && f.desc === desc) { return true; }\n");
        sb.append("        }\n");
        sb.append("        return false;\n");
        sb.append("    }\n\n");
        sb.append("    var targets = {};\n");
        // 按目标类合并所有操作（补桥接 / 调用改写 / 字段改写 / 接口方法改写）到单一
        // transformer 块——CoreMod targets 是 Map，同一类的多个块会互相覆盖只执行一个
        Map<String, StringBuilder> blocks = new TreeMap<>();

        // 先改写原始方法里的调用，再追加桥接方法。这样桥接方法体不会被本轮
        // 改写再次命中（例如 Block.m_7926_ -> createBlockStateDefinition 的递归）。
        for (Map.Entry<String, Set<String[]>> e : callRewrites.entrySet()) {
            StringBuilder b = blocks.computeIfAbsent(e.getKey(), k -> new StringBuilder());
            Set<String> protectedMethods = injectionTargets.get(e.getKey());
            for (String[] c : e.getValue()) {
                String srg = c[0], desc = c[1], owner = c[2], mcp = c[3];
                if (mcp == null || mcp.equals(srg)) continue;
                b.append("            for (var ci = 0; ci < methods.size(); ci++) {\n");
                b.append("                var cm = methods.get(ci);\n");
                appendInjectionGuard(b, protectedMethods);
                b.append("                if (cm.name === '").append(srg).append("' && cm.desc === '").append(desc).append("') continue;\n");
                b.append("                for (var cj = 0; cj < cm.instructions.size(); cj++) {\n");
                b.append("                    var cin = cm.instructions.get(cj);\n");
                b.append("                    if ((cin.getOpcode() === Opcodes.INVOKEVIRTUAL || cin.getOpcode() === Opcodes.INVOKESTATIC)\n");
                b.append("                        && cin.owner === '").append(owner).append("' && cin.name === '").append(mcp).append("' && cin.desc === '").append(desc).append("') {\n");
                b.append("                        cin.name = '").append(srg).append("';\n");
                b.append("                    }\n");
                b.append("                }\n");
                b.append("            }\n");
            }
        }

        for (Map.Entry<String, Set<String[]>> e : missing.entrySet()) {
            String target = e.getKey();
            StringBuilder b = blocks.computeIfAbsent(target, k -> new StringBuilder());
            for (String[] m : e.getValue()) {
                if (m[0].equals("IM")) {
                    // 接口实现桥接：发布版 mod 类（SRG 域）实现 dev 原版接口（MCP 域）时
                    // 缺 MCP 名方法 → 补 MCP 名方法，方法体调类里已有的 SRG 方法
                    String mcpName = m[1], desc = m[2], srg = m[3];
                    // m[4] = bridgeOwner：
                    //   类自身        → INVOKESPECIAL 沿继承链解析（默认）
                    //   "super:父类名" → INVOKESPECIAL 父类.MCP 方法（gtceu GTHoeItem.asItem
                    //                    ← HoeItem.asItem；调接口会被父类链桥接劫持递归）
                    //   接口名        → INVOKEINTERFACE（AE2 GlassModel.getDependencies ←
                    //                    BasicUnbakedModel.m_7970_，类自身没有 SRG 实现）
                    boolean ifaceCall = m.length > 4 && !m[4].equals(target) && !m[4].startsWith("super:");
                    b.append("            if (!hasMethod(methods, '").append(mcpName).append("', '").append(desc).append("')) {\n");
                    b.append("                var m = new MethodNode(Opcodes.ACC_PUBLIC, '").append(mcpName).append("', '").append(desc).append("', null, null);\n");
                    b.append("                m.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));\n");
                    Type[] iargs = Type.getArgumentTypes(desc);
                    int islot = 1;
                    for (int i = 0; i < iargs.length; i++) {
                        b.append("                m.instructions.add(new VarInsnNode(").append(loadOpcode(iargs[i])).append(", ").append(islot).append("));\n");
                        islot += iargs[i].getSize();
                    }
                    if (ifaceCall) {
                        // 调接口的 SRG 方法（接口真实声明的 default/abstract——运行时沿接口
                        // 链解析到实现或 default 本体，不会分派回本桥接）
                        b.append("                m.instructions.add(new MethodInsnNode(Opcodes.INVOKEINTERFACE,\n");
                        b.append("                    '").append(m[4]).append("', '").append(srg).append("', '").append(desc).append("', true));\n");
                    } else if (m.length > 4 && m[4].startsWith("super:")) {
                        // 调父类的 MCP 方法（super 语义，不经过本类的桥接）
                        b.append("                m.instructions.add(new MethodInsnNode(Opcodes.INVOKESPECIAL,\n");
                        b.append("                    '").append(m[4].substring(6)).append("', '").append(srg).append("', '").append(desc).append("', false));\n");
                    } else {
                        // IM 桥接调类自己的 SRG 方法（类方法匹配或父类链，INVOKESPECIAL 沿
                        // 继承链解析）——不能调接口方法（INVOKEINTERFACE 会分派回本桥接
                        // 无限递归：KubeJSResourcePackFinder.loadPacks ↔ RepositorySource
                        // 的 SRG/MCP 桥接循环）
                        b.append("                m.instructions.add(new MethodInsnNode(Opcodes.INVOKESPECIAL,\n");
                        b.append("                    '").append(target).append("', '").append(srg).append("', '").append(desc).append("', false));\n");
                    }
                    b.append("                m.instructions.add(new InsnNode(").append(returnOpcode(Type.getReturnType(desc))).append("));\n");
                    b.append("                methods.add(m);\n");
                    b.append("            }\n");
                } else if (m[0].equals("M") || m[0].equals("MS") || m[0].equals("OM") || m[0].equals("OMS") || m[0].equals("OV")) {
                    String srg = m[1], desc = m[2];
                    String mcp = srgToMcp.get(srg);
                    if (mcp == null || mcp.equals(srg)) continue;   // 同名映射（如 m_255331_）桥接会无限递归
                    if ("createBlockStateDefinition".equals(mcp)
                            && !"net/minecraft/world/level/block/Block".equals(target)) continue;
                    boolean isStatic = m[0].equals("MS") || m[0].equals("OMS");
                    // 以原方法 access 为准修正 static（collectSrgFrom/@Shadow 的 M 条目
                    // 可能是 static 原方法——mixin 检查 "STATIC modifier does not match"）
                    if (!m[0].equals("IM")) {
                        Map<String, Integer> tacc = vanillaMethodAccess.get(target);
                        if (tacc != null) {
                            Integer ta = tacc.get(mcp + "|" + desc);
                            if (ta != null) isStatic = (ta & Opcodes.ACC_STATIC) != 0;
                        }
                    }
                    boolean isOverwriteBridge = m[0].equals("OM") || m[0].equals("OMS");
                    b.append("            if (!hasMethod(methods, '").append(srg).append("', '").append(desc).append("')) {\n");
                    // 接口实例方法补 default 方法（Java 8+ 带方法体，实现类自动继承）——
                    // 补 abstract 会要求所有实现类实现（AbstractMethodError）。
                    // 方法体调用指令取决于目标 owner 是否是接口（见下）。
                    if (isStatic) {
                        // 接口 static 方法合法（Java 8+，带方法体）
                        b.append("                var m = new MethodNode(Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC, '").append(srg).append("', '").append(desc).append("', null, null);\n");
                    } else {
                        // 桥接可见性跟随原方法（M/OM/OV 都适用）：mixin 的 @Overwrite 检查
                        // "cannot reduce visibility of X target method"——public 桥接 +
                        // protected/private handler 会崩（endinglib PlayerMixin m_36218_）；
                        // 正式环境目标 private/protected 不走可见性检查，保持一致。
                        // @Shadow 调用 private 目标时 mixin 会自行处理可见性（与正式环境一致）。
                        String accExpr = "Opcodes.ACC_PUBLIC";
                        // Ordinary M/MS bridges are called directly by published SRG-domain
                        // mods. Keep them public even when the MCP target is private; this
                        // mirrors the access-transformed production runtime and avoids
                        // IllegalAccessError in dev (for example FireBlock.setFlammable).
                        boolean followTargetVisibility = isOverwriteBridge || m[0].equals("OV");
                        if (isOverwriteBridge && m.length > 3) {
                            // @Overwrite 桥接跟随 mixin handler 本身的可见性：mixin 检查
                            // "cannot reduce visibility of X target method"（overwrite 的
                            // 可见性不能低于 target）——public 桥接 + protected handler
                            // 会崩（endinglib PlayerMixin m_36218_ protected @Overwrite
                            // 覆盖 public 目标）。正式环境 SRG 名跳过检查，dev 环境按
                            // 相等可见性最安全。
                            int ma = Integer.parseInt(m[3]);
                            if ((ma & Opcodes.ACC_PRIVATE) != 0) accExpr = "Opcodes.ACC_PRIVATE";
                            else if ((ma & Opcodes.ACC_PROTECTED) != 0) accExpr = "Opcodes.ACC_PROTECTED";
                        } else if (followTargetVisibility) {
                            Map<String, Integer> accMap = vanillaMethodAccess.get(target);
                            if (accMap != null) {
                                Integer acc = accMap.get(mcp + "|" + desc);
                                if (acc != null) {
                                    if ((acc & Opcodes.ACC_PRIVATE) != 0) accExpr = "Opcodes.ACC_PRIVATE";
                                    else if ((acc & Opcodes.ACC_PROTECTED) != 0) accExpr = "Opcodes.ACC_PROTECTED";
                                }
                            }
                        }
                        b.append("                var m = new MethodNode(").append(accExpr).append(", '").append(srg).append("', '").append(desc).append("', null, null);\n");
                    }
                    // 参数加载：static 无 this（参数从 slot 0 起）；long/double 占 2 slot
                    Type[] args = Type.getArgumentTypes(desc);
                    int slot = isStatic ? 0 : 1;
                    if (!isStatic) {
                        b.append("                m.instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));\n");
                    }
                    for (int i = 0; i < args.length; i++) {
                        b.append("                m.instructions.add(new VarInsnNode(").append(loadOpcode(args[i])).append(", ").append(slot).append("));\n");
                        slot += args[i].getSize();
                    }
                    if (isStatic) {
                        // 接口 static 方法调用（INVOKESTATIC）也必须用 InterfaceMethodref
                        // （itf=true）——itf=false 写 Methodref → IncompatibleClassChangeError:
                        // must be InterfaceMethodref constant
                        boolean ownerIsIface = interfaceOwners.contains(target);
                        b.append("                m.instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC,\n");
                        b.append("                    '").append(target).append("', '").append(mcp).append("', '").append(desc).append("', ").append(ownerIsIface ? "true" : "false").append("));\n");
                    } else {
                        // 调用指令统一按 owner 区分：
                        // - owner 接口 → INVOKEINTERFACE（itf=true）
                        // - 类方法 → INVOKEVIRTUAL（动态分派）：
                        //   · mod 子类（SRG 域）声明 m_XXX_ → 命中自己的 override ✅
                        //   · 原版子类（MCP 域）没有 m_XXX_ → 落到桥接 → INVOKEVIRTUAL
                        //     再分派回原版子类的 MCP override（如 GrassBlock/CropBlock 的
                        //     createBlockStateDefinition、TorchflowerCropBlock.getAgeProperty
                        //     ——INVOKESPECIAL 会绕过原版子类 override 导致属性注册丢失）
                        //   · 抽象方法（Property.getPossibleValues）→ 分派到实现类的 IM 桥接
                        // 递归安全：调用改写（callRewrites 与 OM 内嵌改写）都跳过桥接方法名
                        boolean ownerIsIface = interfaceOwners.contains(target);
                        if (ownerIsIface) {
                            b.append("                m.instructions.add(new MethodInsnNode(Opcodes.INVOKEINTERFACE,\n");
                            b.append("                    '").append(target).append("', '").append(mcp).append("', '").append(desc).append("', true));\n");
                        } else {
                            b.append("                m.instructions.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL,\n");
                            b.append("                    '").append(target).append("', '").append(mcp).append("', '").append(desc).append("', false));\n");
                        }
                    }
                    b.append("                m.instructions.add(new InsnNode(").append(returnOpcode(Type.getReturnType(desc))).append("));\n");
                    b.append("                methods.add(m);\n");
                    b.append("            }\n");
                    if (isOverwriteBridge) {
                        Set<String> protectedMethods = injectionTargets.get(target);
                        // 被 @At(INVOKE) target 引用的方法不做内嵌调用改写
                        // （sodium-extra MixinToastManager @At target=ToastComponent.add(I)V）
                        boolean atTargetRef = atTargetKeys.contains(target + "|" + mcp + "|" + desc);
                        if (!atTargetRef) {
                        // 把目标类内对 MCP 原方法的调用改写成 SRG 名：dev 原版字节码调用 MCP 名，
                        // 不改则 @Overwrite 覆盖的桥接永远不会被调用（如 ferritecore populateNeighbours）
                        b.append("            for (var ci = 0; ci < methods.size(); ci++) {\n");
                        b.append("                var cm = methods.get(ci);\n");
                        // 跳过本类补的所有桥接方法（M/OM/OV 的 srg 名、IM 的 MCP 名）——
                        // 否则改写会命中桥接方法体里的 INVOKEVIRTUAL mcp 调用，改回 srg 后
                        // 无限递归（如 Block.m_7926_ 桥接调 createBlockStateDefinition）
                        Set<String> bridgeSignatures = new TreeSet<>();
                        Set<String[]> tms = missing.get(target);
                        if (tms != null) {
                            for (String[] tm : tms) {
                                if (tm[0].equals("M") || tm[0].equals("MS") || tm[0].equals("OM")
                                        || tm[0].equals("OMS") || tm[0].equals("OV") || tm[0].equals("IM")) {
                                    bridgeSignatures.add(tm[1] + "|" + tm[2]);
                                }
                            }
                        }
                        boolean hasSkip = (protectedMethods != null && !protectedMethods.isEmpty()) || !bridgeSignatures.isEmpty();
                        if (hasSkip) {
                            b.append("                if (");
                            boolean firstSkip = true;
                            if (protectedMethods != null) {
                                for (String protectedMethod : protectedMethods) {
                                    int split = protectedMethod.indexOf('|');
                                    String protectedName = split >= 0 ? protectedMethod.substring(0, split) : protectedMethod;
                                    String protectedDesc = split >= 0 ? protectedMethod.substring(split + 1) : "*";
                                    if (!firstSkip) b.append(" || ");
                                    b.append("cm.name === '").append(protectedName).append("'");
                                    if (!"*".equals(protectedDesc)) {
                                        b.append(" && cm.desc === '").append(protectedDesc).append("'");
                                    }
                                    firstSkip = false;
                                }
                            }
                            for (String bridgeSignature : bridgeSignatures) {
                                int split = bridgeSignature.indexOf('|');
                                String bridgeName = bridgeSignature.substring(0, split);
                                String bridgeDesc = bridgeSignature.substring(split + 1);
                                if (!firstSkip) b.append(" || ");
                                b.append("cm.name === '").append(bridgeName).append("' && cm.desc === '").append(bridgeDesc).append("'");
                                firstSkip = false;
                            }
                            b.append(") continue;\n");
                        }
                        b.append("                for (var cj = 0; cj < cm.instructions.size(); cj++) {\n");
                        b.append("                    var cin2 = cm.instructions.get(cj);\n");
                        b.append("                    if (cin2.getOpcode() === ").append(isStatic ? "Opcodes.INVOKESTATIC" : "Opcodes.INVOKEVIRTUAL").append("\n");
                        b.append("                        && cin2.owner === '").append(target).append("' && cin2.name === '").append(mcp).append("' && cin2.desc === '").append(desc).append("') {\n");
                        b.append("                        cin2.name = '").append(srg).append("';\n");
                        b.append("                    }\n");
                        b.append("                }\n");
                        b.append("            }\n");
                        }
                    }
                } else {
                    String srg = m[1], desc = m[2];
                    String mcp = srgToMcp.get(srg);
                    b.append("            if (!hasField(fields, '").append(srg).append("', '").append(desc).append("')) {\n");
                    b.append("                fields.add(new FieldNode(").append(m[0].equals("FS") ? "Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC" : "Opcodes.ACC_PUBLIC")
                      .append(", '").append(srg).append("', '").append(desc).append("', null, null));\n");
                    if (m[0].equals("FS")) {
                        // static @Shadow 字段会被 mixin 实际读取（如 Bootstrap.LOGGER），
                        // 补的字段默认 null 会 NPE。在 <clinit> 末尾用 MCP 原字段值初始化：
                        //   f_XXX = mcpField;
                        if (mcp != null && !mcp.equals(srg)) {
                            b.append("                for (var ci = 0; ci < methods.size(); ci++) {\n");
                            b.append("                    var cm = methods.get(ci);\n");
                            b.append("                    if (cm.name === '<clinit>') {\n");
                            b.append("                        var cinsns = cm.instructions;\n");
                            b.append("                        for (var ci2 = 0; ci2 < cinsns.size(); ci2++) {\n");
                            b.append("                            var cin = cinsns.get(ci2);\n");
                            b.append("                            if (cin.getOpcode() === Opcodes.RETURN) {\n");
                            b.append("                                cinsns.insertBefore(cin, new FieldInsnNode(Opcodes.GETSTATIC, '").append(target).append("', '").append(mcp).append("', '").append(desc).append("'));\n");
                            b.append("                                cinsns.insertBefore(cin, new FieldInsnNode(Opcodes.PUTSTATIC, '").append(target).append("', '").append(srg).append("', '").append(desc).append("'));\n");
                            b.append("                                break;\n");
                            b.append("                            }\n");
                            b.append("                        }\n");
                            b.append("                        break;\n");
                            b.append("                    }\n");
                            b.append("                }\n");
                        }
                    }
                    // 清除 @Shadow 对应 MCP 字段的 ACC_FINAL（@Mutable 语义）：
                    // fix_injections 把 mixin 代码里的 PUTFIELD f_XXX 改写为真实 MCP 字段，
                    // 真实字段多为 final，不清除会 IllegalAccessError（如 MappedRegistry.lifecycles）
                    if (mcp != null && !mcp.equals(srg)) {
                        b.append("            for (var fi4 = 0; fi4 < fields.size(); fi4++) {\n");
                        b.append("                var ff = fields.get(fi4);\n");
                        b.append("                if (ff.name === '").append(mcp).append("' && ff.desc === '").append(desc).append("') {\n");
                        b.append("                    ff.access = ff.access & ~Opcodes.ACC_FINAL;\n");
                        b.append("                }\n");
                        b.append("            }\n");
                    }
                    b.append("            }\n");
                }
            }
        }
        // 字段引用改写：把调用者类里对 SRG 字段的 GETFIELD/GETSTATIC/PUTFIELD/PUTSTATIC
        // 改写为 MCP 字段名（接口 static 字段无法补桥接；普通类字段引用也走改写，
        // 避免桥接字段与真实字段不一致）
        for (Map.Entry<String, Set<String[]>> e : fieldRefRewrites.entrySet()) {
            StringBuilder b = blocks.computeIfAbsent(e.getKey(), k -> new StringBuilder());
            Set<String> protectedMethods = injectionTargets.get(e.getKey());
            for (String[] c : e.getValue()) {
                String owner = c[0], srg = c[1], mcp = c[2], desc = c[3], mcpOwner = c.length > 4 ? c[4] : owner;
                b.append("            for (var ci = 0; ci < methods.size(); ci++) {\n");
                b.append("                var cm = methods.get(ci);\n");
                appendInjectionGuard(b, protectedMethods);
                b.append("                for (var cj = 0; cj < cm.instructions.size(); cj++) {\n");
                b.append("                    var cin = cm.instructions.get(cj);\n");
                b.append("                    var op = cin.getOpcode();\n");
                b.append("                    if ((op === Opcodes.GETFIELD || op === Opcodes.PUTFIELD\n");
                b.append("                        || op === Opcodes.GETSTATIC || op === Opcodes.PUTSTATIC)\n");
                b.append("                        && cin.owner === '").append(owner).append("' && cin.name === '").append(srg).append("' && cin.desc === '").append(desc).append("') {\n");
                b.append("                        cin.name = '").append(mcp).append("';\n");
                b.append("                        cin.owner = '").append(mcpOwner).append("';\n");
                b.append("                    }\n");
                b.append("                }\n");
                b.append("            }\n");
            }
        }
        // 方法引用改写：把调用者类里对接口 SRG 方法（m_XXX_）的 INVOKEINTERFACE 改写为
        // MCP 名（接口无法补桥接——补 abstract 方法要求所有实现类实现会 AbstractMethodError；
        // dev 环境接口是 MCP 域，MCP 名方法天然存在）
        for (Map.Entry<String, Set<String[]>> e : methodRefRewrites.entrySet()) {
            StringBuilder b = blocks.computeIfAbsent(e.getKey(), k -> new StringBuilder());
            Set<String> protectedMethods = injectionTargets.get(e.getKey());
            for (String[] c : e.getValue()) {
                String owner = c[0], srg = c[1], mcp = c[2], desc = c[3];
                if (mcp == null || mcp.equals(srg)) continue;
                b.append("            for (var ci = 0; ci < methods.size(); ci++) {\n");
                b.append("                var cm = methods.get(ci);\n");
                appendInjectionGuard(b, protectedMethods);
                b.append("                for (var cj = 0; cj < cm.instructions.size(); cj++) {\n");
                b.append("                    var cin = cm.instructions.get(cj);\n");
                b.append("                    if (cin.getOpcode() === Opcodes.INVOKEINTERFACE\n");
                b.append("                        && cin.owner === '").append(owner).append("' && cin.name === '").append(srg).append("' && cin.desc === '").append(desc).append("') {\n");
                b.append("                        cin.name = '").append(mcp).append("';\n");
                b.append("                    }\n");
                b.append("                }\n");
                b.append("            }\n");
            }
        }
        // lambda 实现的接口方法 default 化（双向名称桥接）：
        // 发布版 mod 的 lambda 合成类（运行时生成）实现原版接口时方法名不匹配
        // （AbstractMethodError）——MCP default 调 SRG 实现，SRG default 调 MCP 实现，
        // 从而同时支持发布版 lambda（实现 SRG 名）和 dev lambda（实现 MCP 名）。
        // 必须并入 blocks：同一目标类拆成两个 CoreMod transformer 时，前面的 missing
        // 桥接会先补 SRG 方法，因此这里会复用并校正该方法体。
        for (Map.Entry<String, Set<String>> e : interfaceDefaultify.entrySet()) {
            StringBuilder b = blocks.computeIfAbsent(e.getKey(), k -> new StringBuilder());
            for (String m : e.getValue()) {
                int bar = m.indexOf('|');
                int bar2 = m.indexOf('|', bar + 1);
                if (bar < 0 || bar2 < 0) continue;
                String mcpName = m.substring(0, bar);
                String samDesc = m.substring(bar + 1, bar2);
                String srgName = m.substring(bar2 + 1);
                b.append("            for (var di = 0; di < methods.size(); di++) {\n");
                b.append("                var dm = methods.get(di);\n");
                b.append("                if (dm.name === '").append(mcpName).append("' && dm.desc === '").append(samDesc).append("' && (dm.access & Opcodes.ACC_ABSTRACT) !== 0) {\n");
                b.append("                    dm.access = dm.access & ~Opcodes.ACC_ABSTRACT;\n");
                b.append("                    dm.instructions.clear();\n");
                if (!srgName.equals(mcpName)) {
                    appendInterfaceBridgeReturn(b, e.getKey(), srgName, samDesc, "                    ", "dm");
                } else {
                    appendDefaultReturn(b, Type.getReturnType(samDesc), "                    ", "dm", false);
                }
                b.append("                }\n");
                b.append("            }\n");
                // 同时补 SRG 名 default 桥接：SRG 域调用（如 kubejs/gtceu 调
                // RepositorySource.m_7686_、ftblibrary 调 PreparableReloadListener.m_5540_）
                // 才能解析。反向调用 MCP 名可让 dev 实现继续执行真实逻辑；发布版实现类
                // 自己声明的 SRG 方法会优先于该 default，不会进入反向桥。
                if (!srgName.equals(mcpName)) {
                    // missing 可能已在同一个 block 前部生成 SRG -> MCP 桥接；必须找到并
                    // 覆盖它的实现，不能只在方法缺失时新增。
                    b.append("            var srgDefault = null;\n");
                    b.append("            for (var si = 0; si < methods.size(); si++) {\n");
                    b.append("                var candidate = methods.get(si);\n");
                    b.append("                if (candidate.name === '").append(srgName).append("' && candidate.desc === '").append(samDesc).append("') {\n");
                    b.append("                    srgDefault = candidate;\n");
                    b.append("                    break;\n");
                    b.append("                }\n");
                    b.append("            }\n");
                    b.append("            if (srgDefault === null) {\n");
                    b.append("                srgDefault = new MethodNode(Opcodes.ACC_PUBLIC, '").append(srgName).append("', '").append(samDesc).append("', null, null);\n");
                    b.append("                methods.add(srgDefault);\n");
                    b.append("            }\n");
                    b.append("            srgDefault.access = (srgDefault.access | Opcodes.ACC_PUBLIC) & ~Opcodes.ACC_ABSTRACT;\n");
                    b.append("            srgDefault.instructions.clear();\n");
                    appendInterfaceBridgeReturn(b, e.getKey(), mcpName, samDesc, "            ", "srgDefault");
                }
            }
        }
        // 统一输出：每个目标类一个 transformer 块（合并上面的所有操作）
        int idx = 0;
        for (Map.Entry<String, StringBuilder> e : blocks.entrySet()) {
            sb.append("    targets['gtgcore_merged_").append(idx++).append("'] = {\n");
            sb.append("        'target': { 'type': 'CLASS', 'name': '").append(e.getKey()).append("' },\n");
            sb.append("        'transformer': function (classNode) {\n");
            sb.append("            var methods = classNode.methods;\n");
            sb.append("            var fields = classNode.fields;\n");
            sb.append(e.getValue().toString());
            sb.append("            ensureMethodLocals(methods);\n");
            sb.append("            return classNode;\n");
            sb.append("        }\n");
            sb.append("    };\n");
        }
        sb.append("    return targets;\n");
        sb.append("}\n");
        Files.write(Paths.get(outPath), sb.toString().getBytes("UTF-8"));
        System.out.println("Generated: " + outPath + " (targets=" + missing.size() + ", total members=" + missing.values().stream().mapToInt(Set::size).sum() + ")");
        for (Map.Entry<String, Set<String[]>> e : missing.entrySet()) {
            System.out.println("  " + e.getKey() + ": " + e.getValue().size() + " members");
        }
    }

    /** Emit a guard that preserves MCP method bodies used by Mixin injection selectors. */
    static void appendInjectionGuard(StringBuilder b, Set<String> protectedMethods) {
        if (protectedMethods == null || protectedMethods.isEmpty()) return;
        b.append("                if (");
        boolean first = true;
        for (String protectedMethod : protectedMethods) {
            int split = protectedMethod.indexOf('|');
            String name = split >= 0 ? protectedMethod.substring(0, split) : protectedMethod;
            String desc = split >= 0 ? protectedMethod.substring(split + 1) : "*";
            if (!first) b.append(" || ");
            b.append("cm.name === '").append(name).append("'");
            if (!"*".equals(desc)) b.append(" && cm.desc === '").append(desc).append("'");
            first = false;
        }
        b.append(") continue;\n");
    }

    /**
     * Emit an interface default bridge from the dev/MCP SAM name to the
     * obfuscated/SRG name used by a published lambda implementation.
     *
     * LambdaMetafactory uses the invokedynamic name when it creates the
     * implementation method.  In the dev classpath the interface only has the
     * MCP method, so the MCP default must dispatch to that SRG method instead
     * of returning a placeholder value.
     */
    static void appendInterfaceBridgeReturn(StringBuilder b, String iface, String srgName,
                                             String desc, String indent, String nodeVar) {
        b.append(indent).append(nodeVar).append(".instructions.add(new VarInsnNode(Opcodes.ALOAD, 0));\n");
        Type[] args = Type.getArgumentTypes(desc);
        int slot = 1;
        for (Type arg : args) {
            b.append(indent).append(nodeVar).append(".instructions.add(new VarInsnNode(")
                .append(loadOpcode(arg)).append(", ").append(slot).append("));\n");
            slot += arg.getSize();
        }
        b.append(indent).append(nodeVar).append(".instructions.add(new MethodInsnNode(Opcodes.INVOKEINTERFACE,\n");
        b.append(indent).append("    '").append(iface).append("', '").append(srgName)
            .append("', '").append(desc).append("', true));\n");
        b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(")
            .append(returnOpcode(Type.getReturnType(desc))).append("));\n");
    }

    static String loadOpcode(Type t) {
        switch (t.getSort()) {
            case Type.BOOLEAN: case Type.BYTE: case Type.CHAR: case Type.SHORT: case Type.INT: return "Opcodes.ILOAD";
            case Type.FLOAT: return "Opcodes.FLOAD";
            case Type.DOUBLE: return "Opcodes.DLOAD";
            case Type.LONG: return "Opcodes.LLOAD";
            default: return "Opcodes.ALOAD";
        }
    }

    // Emit a non-null fallback for interface defaults. PreparationBarrier.wait(T)
    // must preserve T: SimpleReloadInstance uses the completed value downstream.
    static void appendDefaultReturn(StringBuilder b, Type rt, String indent,
                                    String nodeVar, boolean preserveFirstArg) {
        if (preserveFirstArg && (rt.getSort() == Type.OBJECT || rt.getSort() == Type.ARRAY)
                && ("java.util.concurrent.CompletableFuture".equals(rt.getClassName())
                    || "java.util.concurrent.CompletionStage".equals(rt.getClassName()))) {
            b.append(indent).append(nodeVar).append(".instructions.add(new VarInsnNode(Opcodes.ALOAD, 1));\n");
            b.append(indent).append(nodeVar).append(".instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC, 'java/util/concurrent/CompletableFuture', 'completedFuture', '(Ljava/lang/Object;)Ljava/util/concurrent/CompletableFuture;', false));\n");
            b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.ARETURN));\n");
            return;
        }
        if (rt.getSort() == Type.VOID) {
            b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.RETURN));\n");
        } else if (rt.getSort() == Type.OBJECT || rt.getSort() == Type.ARRAY) {
            if ("java.util.concurrent.CompletableFuture".equals(rt.getClassName())
                    || "java.util.concurrent.CompletionStage".equals(rt.getClassName())) {
                // A null future breaks callers such as SimpleReloadInstance.thenCombine.
                b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.ACONST_NULL));\n");
                b.append(indent).append(nodeVar).append(".instructions.add(new MethodInsnNode(Opcodes.INVOKESTATIC, 'java/util/concurrent/CompletableFuture', 'completedFuture', '(Ljava/lang/Object;)Ljava/util/concurrent/CompletableFuture;', false));\n");
                b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.ARETURN));\n");
            } else {
                b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.ACONST_NULL));\n");
                b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.ARETURN));\n");
            }
        } else if (rt.getSort() == Type.LONG) {
            b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.LCONST_0));\n");
            b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.LRETURN));\n");
        } else if (rt.getSort() == Type.FLOAT) {
            b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.FCONST_0));\n");
            b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.FRETURN));\n");
        } else if (rt.getSort() == Type.DOUBLE) {
            b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.DCONST_0));\n");
            b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.DRETURN));\n");
        } else {
            b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.ICONST_0));\n");
            b.append(indent).append(nodeVar).append(".instructions.add(new InsnNode(Opcodes.IRETURN));\n");
        }
    }

    static String returnOpcode(Type t) {
        switch (t.getSort()) {
            case Type.VOID: return "Opcodes.RETURN";
            case Type.BOOLEAN: case Type.BYTE: case Type.CHAR: case Type.SHORT: case Type.INT: return "Opcodes.IRETURN";
            case Type.FLOAT: return "Opcodes.FRETURN";
            case Type.DOUBLE: return "Opcodes.DRETURN";
            case Type.LONG: return "Opcodes.LRETURN";
            default: return "Opcodes.ARETURN";
        }
    }
}
