import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export const ScanStatusHeader = () => {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["scan-status"] });
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Scan Status</h1>
        <p className="text-muted-foreground">
          Monitor and manage all Qualys scans across locations
        </p>
      </div>
      <Button onClick={handleRefresh} variant="outline" size="sm">
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh
      </Button>
    </div>
  );
};