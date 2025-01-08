import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Activity, AlertCircle, FileText, Settings } from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Activity, label: "Scan Status", path: "/scan-status" },
  { icon: AlertCircle, label: "Failed Scans", path: "/failed-scans" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : "text-gray-600 hover:bg-secondary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};