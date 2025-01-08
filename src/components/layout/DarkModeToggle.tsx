import React from "react";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/hooks/useTheme";

export const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle
      pressed={theme === "dark"}
      onPressedChange={toggleTheme}
      aria-label="Toggle dark mode"
      className="p-2 hover:bg-secondary rounded-full transition-colors"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Toggle>
  );
};