import java.io.*;
import java.nio.file.*;
import java.util.*;
import javax.script.*;
import org.openjdk.nashorn.api.scripting.NashornScriptEngineFactory;
import org.objectweb.asm.ClassReader;
import org.objectweb.asm.tree.*;

public class DebugFix {
  public static void main(String[] args) throws Exception {
    ScriptEngine e = new NashornScriptEngineFactory().getScriptEngine("--language=es6");
    try (Reader r = Files.newBufferedReader(Path.of(args[0]))) { e.eval(r); }
    Object root = ((Invocable)e).invokeFunction("initializeCoreMod");
    Map<?,?> map = (Map<?,?>) root;
    Object binding = map.get("gtgcore_fix_inj_2079");
    if (!(binding instanceof Map)) {
      for (Map.Entry<?,?> x : map.entrySet()) {
        if (String.valueOf(x.getKey()).contains("2079")) { binding = x.getValue(); break; }
      }
    }
    Map<?,?> b = (Map<?,?>) binding;
    Object fn = b.get("transformer");
    ClassNode cn = new ClassNode();
    try (InputStream in = Files.newInputStream(Path.of(args[1]))) { new ClassReader(in).accept(cn, 0); }
    System.out.println("before=" + cn.name);
    for (MethodNode m : cn.methods) {
      if (m.visibleAnnotations != null) for (AnnotationNode a : m.visibleAnnotations) System.out.println("before ann=" + a.desc + " values=" + a.values);
      if (m.invisibleAnnotations != null) for (AnnotationNode a : m.invisibleAnnotations) System.out.println("before iann=" + a.desc + " values=" + a.values);
    }
    Object out = ((org.openjdk.nashorn.api.scripting.ScriptObjectMirror)fn).call(null, cn);
    System.out.println("out=" + out);
    for (MethodNode m : cn.methods) {
      if (m.visibleAnnotations != null) for (AnnotationNode a : m.visibleAnnotations) System.out.println("after ann=" + a.desc + " values=" + a.values);
      if (m.invisibleAnnotations != null) for (AnnotationNode a : m.invisibleAnnotations) System.out.println("after iann=" + a.desc + " values=" + a.values);
    }
  }
}
