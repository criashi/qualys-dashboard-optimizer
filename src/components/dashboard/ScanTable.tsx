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

interface Scan {
  id: string;
  location: string;
  status: "active" | "inactive" | "failed";
  lastRun: string;
  nextRun: string;
}

interface ScanTableProps {
  scans: Scan[];
  onReactivate: (id: string) => void;
}

export const ScanTable: React.FC<ScanTableProps> = ({ scans, onReactivate }) => {
  const getStatusColor = (status: Scan["status"]) => {
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
    <div className="bg-white rounded-xl border border-gray-200 animate-slideIn">
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
              <TableCell className="font-medium">{scan.location}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(scan.status)}>
                  {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{scan.lastRun}</TableCell>
              <TableCell>{scan.nextRun}</TableCell>
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