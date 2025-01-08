import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ScanTable } from "@/components/dashboard/ScanTable";
import { Activity, AlertCircle, CheckCircle2, Gauge } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDashboardStats, fetchScanLocations, reactivateScan } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  const { data: scans, isLoading: scansLoading } = useQuery({
    queryKey: ['scanLocations'],
    queryFn: fetchScanLocations,
  });

  const reactivateMutation = useMutation({
    mutationFn: reactivateScan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scanLocations'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      toast({
        title: "Scan Reactivated",
        description: "The scan has been successfully reactivated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to reactivate scan. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleReactivate = (id: string) => {
    reactivateMutation.mutate(id);
  };

  if (statsLoading || scansLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Scans"
            value={stats?.activeScans || 0}
            icon={<CheckCircle2 className="w-6 h-6" />}
            trend={{ value: stats?.trends.activeScans || 0, isPositive: true }}
          />
          <StatCard
            title="Failed Scans"
            value={stats?.failedScans || 0}
            icon={<AlertCircle className="w-6 h-6" />}
            trend={{ value: stats?.trends.failedScans || 0, isPositive: false }}
          />
          <StatCard
            title="Coverage"
            value={`${stats?.coverage || 0}%`}
            icon={<Gauge className="w-6 h-6" />}
            trend={{ value: stats?.trends.coverage || 0, isPositive: true }}
          />
          <StatCard
            title="Total Scans"
            value={stats?.totalScans || 0}
            icon={<Activity className="w-6 h-6" />}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recent Scans</h3>
          {scans && <ScanTable scans={scans} onReactivate={handleReactivate} />}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;