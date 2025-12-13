import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./dropdown-menu";
import { useThemeStore, type Theme, type ColorTheme } from "~/store/themeStore";
import { cn } from "~/lib/utils";

const colorThemes: { value: ColorTheme; label: string; color: string }[] = [
  { value: "blue", label: "Blue", color: "bg-blue-500" },
  { value: "orange", label: "Orange", color: "bg-orange-500" },
  { value: "yellow", label: "Yellow", color: "bg-yellow-500" },
  { value: "green", label: "Green", color: "bg-green-500" },
  { value: "purple", label: "Purple", color: "bg-purple-500" },
  { value: "rose", label: "Rose", color: "bg-rose-500" },
];

export function ThemeToggle() {
  const { theme, colorTheme, setTheme, setColorTheme } = useThemeStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Mode
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(theme === "light" && "bg-accent")}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(theme === "dark" && "bg-accent")}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(theme === "system" && "bg-accent")}
        >
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Color
        </DropdownMenuLabel>
        <div className="grid grid-cols-6 gap-1 px-2 py-1.5">
          {colorThemes.map((ct) => (
            <button
              key={ct.value}
              onClick={() => setColorTheme(ct.value)}
              className={cn(
                "h-5 w-5 rounded-full transition-transform hover:scale-110",
                ct.color,
                colorTheme === ct.value && "ring-2 ring-offset-2 ring-offset-background ring-foreground"
              )}
              title={ct.label}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
