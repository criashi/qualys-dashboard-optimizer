import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportsList } from "@/components/reports/ReportsList";
import { ReportFilters } from "@/components/reports/ReportFilters";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const Reports = () => {
  const { toast } = useToast();
  const { data: reports, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      // This will be replaced with actual API call
      return [];
    },
  });

  const handleDownload = async (reportId: string) => {
    try {
      toast({
        title: "Starting download...",
        description: "Your report is being generated.",
      });
      // Will be implemented with Qualys API
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error generating your report.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Scan Reports</h1>
          <Button disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Download Latest
          </Button>
        </div>
        <ReportFilters />
        <ReportsList reports={reports || []} onDownload={handleDownload} />
      </div>
    </DashboardLayout>
  );
};

export default Reports;