import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-xl border border-gray-200 animate-slideIn",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="text-gray-600">{icon}</div>
        {trend && (
          <div
            className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-success" : "text-error"
            )}
          >
            {trend.isPositive ? "+" : "-"}{trend.value}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
    </div>
  );
};