import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { ScanLocation } from "@/types/api";

interface ScanTableProps {
  scans: ScanLocation[];
  onReactivate: (id: string) => void;
}

export const ScanTable: React.FC<ScanTableProps> = ({ scans, onReactivate }) => {
  const getStatusColor = (status: ScanLocation["status"]) => {
    switch (status) {
      case "active":
        return "bg-success";
      case "inactive":
        return "bg-warning";
      case "failed":
        return "bg-error";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 animate-slideIn">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Run</TableHead>
            <TableHead>Next Run</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scans.map((scan) => (
            <TableRow key={scan.id}>
              <TableCell className="font-medium dark:text-gray-300">{scan.name}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(scan.status)}>
                  {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="dark:text-gray-300">{scan.lastRun}</TableCell>
              <TableCell className="dark:text-gray-300">{scan.nextRun}</TableCell>
              <TableCell>
                {scan.status !== "active" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReactivate(scan.id)}
                    className="space-x-2"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Reactivate</span>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};