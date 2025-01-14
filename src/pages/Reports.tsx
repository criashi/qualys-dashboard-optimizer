import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportsList } from "@/components/reports/ReportsList";
import { ReportFilters } from "@/components/reports/ReportFilters";
import { toast } from "@/components/ui/use-toast";
import { QualysReport } from "@/types/api";

const Reports = () => {
  const { data: reports, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const response = await fetch("/api/reports");
      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }
      return response.json() as Promise<QualysReport[]>;
    },
  });

  const handleDownload = async (reportId: string) => {
    try {
      toast({
        title: "Starting download...",
        description: "Your report is being generated.",
      });
      const response = await fetch(`/api/reports/${reportId}/download`);
      if (!response.ok) {
        throw new Error("Failed to download report");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your report.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Scan Reports</h1>
        </div>
        <ReportFilters />
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <ReportsList
            reports={reports || []}
            onDownload={handleDownload}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reports;