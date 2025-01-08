import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ScanTable } from "@/components/dashboard/ScanTable";
import { Activity, AlertCircle, CheckCircle2, Gauge } from "lucide-react";

// Mock data with real locations
const mockScans = [
  {
    id: "1",
    location: "Allentown",
    status: "active" as const,
    lastRun: "2024-02-20 14:30",
    nextRun: "2024-02-21 14:30",
  },
  {
    id: "2",
    location: "Auburn Hills North",
    status: "active" as const,
    lastRun: "2024-02-20 15:00",
    nextRun: "2024-02-21 15:00",
  },
  {
    id: "3",
    location: "Las Colinas",
    status: "inactive" as const,
    lastRun: "2024-02-19 10:15",
    nextRun: "2024-02-20 10:15",
  },
  {
    id: "4",
    location: "Silao Finance Center",
    status: "failed" as const,
    lastRun: "2024-02-20 03:45",
    nextRun: "2024-02-21 03:45",
  },
  {
    id: "5",
    location: "Santa Barbara",
    status: "active" as const,
    lastRun: "2024-02-20 09:30",
    nextRun: "2024-02-21 09:30",
  },
  {
    id: "6",
    location: "Guadalajara and Puebla",
    status: "active" as const,
    lastRun: "2024-02-20 11:45",
    nextRun: "2024-02-21 11:45",
  },
];

const Index = () => {
  const handleReactivate = (id: string) => {
    console.log("Reactivating scan:", id);
    // Implement actual reactivation logic here
  };

  // Calculate statistics
  const totalScans = mockScans.length;
  const activeScans = mockScans.filter((scan) => scan.status === "active").length;
  const failedScans = mockScans.filter((scan) => scan.status === "failed").length;
  const coverage = Math.round((activeScans / totalScans) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Scans"
            value={activeScans}
            icon={<CheckCircle2 className="w-6 h-6" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Failed Scans"
            value={failedScans}
            icon={<AlertCircle className="w-6 h-6" />}
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Coverage"
            value={`${coverage}%`}
            icon={<Gauge className="w-6 h-6" />}
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Total Scans"
            value={totalScans}
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