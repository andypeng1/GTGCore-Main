import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.nio.file.Files;
import java.nio.file.Paths;

/** 直接读 refmap.json，模拟 mixin 的 refmap 查询结果 */
public class SimulateRefmap {
    public static void main(String[] args) throws Exception {
        String json = new String(Files.readAllBytes(Paths.get(args[0])), "UTF-8");
        JsonObject root = JsonParser.parseString(json).getAsJsonObject();
        JsonObject mappings = root.getAsJsonObject("mappings");
        String cls = "com/mega/endinglib/mixin/personal_rule/PlayerMixin";
        JsonObject pm = mappings.getAsJsonObject(cls);
        System.out.println("== " + cls + " refmap entries ==");
        for (String key : pm.keySet()) {
            System.out.println("  \"" + key + "\" -> \"" + pm.get(key).getAsString() + "\"");
        }
    }
}