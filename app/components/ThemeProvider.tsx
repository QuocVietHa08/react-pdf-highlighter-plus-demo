import { useEffect } from "react";
import { useThemeStore } from "~/store/themeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, colorTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove("light", "dark");
    root.classList.remove("theme-blue", "theme-orange", "theme-yellow", "theme-green", "theme-purple", "theme-rose");

    // Apply color theme
    root.classList.add(`theme-${colorTheme}`);

    // Apply light/dark theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, colorTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return <>{children}</>;
}
