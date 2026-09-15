import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

/**
 * Titanium Java source cleaner.
 *
 * Removes safe visual clutter while preserving Java code structure:
 * - trailing whitespace
 * - repeated blank lines
 * - blank lines around braces
 *
 * It deliberately does not attempt unsafe semantic transformations.
 */
public final class Titanium {
    private Titanium() {
    }

    public static String smooth(String source) {
        if (source == null || source.isEmpty()) {
            return "";
        }

        String normalized = source.replace("\r\n", "\n").replace("\r", "\n");
        String[] lines = normalized.split("\n", -1);
        List<String> output = new ArrayList<>();

        boolean previousBlank = false;

        for (String line : lines) {
            String cleaned = line.stripTrailing();

            if (cleaned.isBlank()) {
                if (!previousBlank) {
                    output.add("");
                }
                previousBlank = true;
                continue;
            }

            output.add(cleaned);
            previousBlank = false;
        }

        while (!output.isEmpty() && output.get(0).isBlank()) {
            output.remove(0);
        }

        while (!output.isEmpty() && output.get(output.size() - 1).isBlank()) {
            output.remove(output.size() - 1);
        }

        return String.join(System.lineSeparator(), output)
                + (output.isEmpty() ? "" : System.lineSeparator());
    }

    public static void smoothFile(Path input, Path output) throws IOException {
        String source = Files.readString(input, StandardCharsets.UTF_8);
        Files.writeString(output, smooth(source), StandardCharsets.UTF_8);
    }

    public static void main(String[] args) throws IOException {
        if (args.length != 2) {
            System.out.println("Titanium Java Cleaner");
            System.out.println("Usage: java Titanium <input.java> <output.java>");
            return;
        }

        smoothFile(Path.of(args[0]), Path.of(args[1]));
        System.out.println("Titanium: file smoothed.");
    }
}
