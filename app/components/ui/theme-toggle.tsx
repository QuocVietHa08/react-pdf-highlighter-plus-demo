import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "~/store/themeStore";

/**
 * Simple dark/light toggle matching Library.dc.html.
 * "system" is treated as its resolved value, then flipped to an explicit theme.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-lg border border-line2 bg-bg2 text-foreground transition-colors hover:bg-secondary"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-3.75 w-3.75" />}
    </button>
  );
}
