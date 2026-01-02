import { useEffect, useState } from "react";
import { useThemeStore } from "~/store/themeStore";

export type EffectiveTheme = "light" | "dark";

export function useEffectiveTheme(): EffectiveTheme {
  const { theme } = useThemeStore();
  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>("light");

  useEffect(() => {
    const updateTheme = () => {
      if (theme === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setEffectiveTheme(isDark ? "dark" : "light");
      } else {
        setEffectiveTheme(theme);
      }
    };

    updateTheme();

    // Listen for system theme changes when in "system" mode
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateTheme);
      return () => mediaQuery.removeEventListener("change", updateTheme);
    }
  }, [theme]);

  return effectiveTheme;
}
