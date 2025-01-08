import React from "react";
import { Bell } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-primary">QualysOps Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-medium">
            AD
          </div>
        </div>
      </div>
    </nav>
  );
};