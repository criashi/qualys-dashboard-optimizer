import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ScanTable } from "@/components/dashboard/ScanTable";
import { Activity, AlertCircle, CheckCircle2, Gauge } from "lucide-react";

// Mock data - replace with actual API calls
const mockScans = [
  {
    id: "1",
    location: "US East",
    status: "active" as const,
    lastRun: "2024-02-20 14:30",
    nextRun: "2024-02-21 14:30",
  },
  {
    id: "2",
    location: "EU West",
    status: "inactive" as const,
    lastRun: "2024-02-19 10:15",
    nextRun: "2024-02-20 10:15",
  },
  {
    id: "3",
    location: "APAC",
    status: "failed" as const,
    lastRun: "2024-02-20 03:45",
    nextRun: "2024-02-21 03:45",
  },
];

const Index = () => {
  const handleReactivate = (id: string) => {
    console.log("Reactivating scan:", id);
    // Implement actual reactivation logic
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Scans"
            value="24"
            icon={<CheckCircle2 className="w-6 h-6" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Failed Scans"
            value="3"
            icon={<AlertCircle className="w-6 h-6" />}
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Coverage"
            value="92%"
            icon={<Gauge className="w-6 h-6" />}
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Total Scans"
            value="156"
            icon={<Activity className="w-6 h-6" />}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recent Scans</h3>
          <ScanTable scans={mockScans} onReactivate={handleReactivate} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;