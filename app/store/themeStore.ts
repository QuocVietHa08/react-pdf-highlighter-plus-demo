import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        // resolve "system" against the OS, then flip to the opposite explicit theme
        const current = get().theme;
        const isDark =
          current === "dark" ||
          (current === "system" &&
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);
        set({ theme: isDark ? "light" : "dark" });
      },
    }),
    { name: "pdf-theme-v2" }
  )
);
