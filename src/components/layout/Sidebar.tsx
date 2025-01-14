import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Activity, AlertCircle, FileText, Settings, MapPin } from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Activity, label: "Scan Status", path: "/scan-status" },
  { icon: AlertCircle, label: "Failed Scans", path: "/failed-scans" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: MapPin, label: "Locations", path: "/locations" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-background border-r border-border min-h-[calc(100vh-4rem)]">
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
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-secondary"
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