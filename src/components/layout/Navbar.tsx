import React from "react";
import { Bell } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";

export const Navbar = () => {
  return (
    <nav className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-primary">QualysOps Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <button className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
          </button>
          <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-medium">
            AD
          </div>
        </div>
      </div>
    </nav>
  );
};