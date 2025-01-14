import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchScanStatus } from "@/lib/api";
import { ScanStatusTable } from "@/components/scan-status/ScanStatusTable";

const FailedScans = () => {
  const { data: scans, isLoading } = useQuery({
    queryKey: ["scanStatus"],
    queryFn: fetchScanStatus,
    select: (data) => data.filter((scan) => scan.status === "failed"),
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">Failed Scans</h1>
        </div>
        <ScanStatusTable scans={scans || []} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
};

export default FailedScans;