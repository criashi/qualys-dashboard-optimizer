import React from "react";
import { Bell } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";

export const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-primary dark:text-white">QualysOps Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <button className="p-2 hover:bg-secondary dark:hover:bg-gray-700 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="w-8 h-8 bg-accent dark:bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
            AD
          </div>
        </div>
      </div>
    </nav>
  );
};