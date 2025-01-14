import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ScanStatusTable } from "@/components/scan-status/ScanStatusTable";
import { ScanStatusFilters } from "@/components/scan-status/ScanStatusFilters";
import { ScanStatusHeader } from "@/components/scan-status/ScanStatusHeader";
import { fetchScanStatus } from "@/lib/api";
import { toast } from "sonner";

const ScanStatus = () => {
  const { data: scans, isLoading, error } = useQuery({
    queryKey: ["scan-status"],
    queryFn: fetchScanStatus,
  });

  if (error) {
    toast.error("Failed to fetch scan status");
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ScanStatusHeader />
        <ScanStatusFilters />
        <ScanStatusTable scans={scans || []} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
};

export default ScanStatus;