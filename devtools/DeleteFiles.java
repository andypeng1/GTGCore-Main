import java.io.File;
public class DeleteFiles {
    public static void main(String[] args) {
        for (String p : args) {
            File f = new File(p);
            System.out.println((f.delete() ? "DELETED " : "FAILED  ") + p);
        }
    }
}
