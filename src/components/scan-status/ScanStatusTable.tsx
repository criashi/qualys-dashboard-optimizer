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
import { Eye, Pause, Play, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScanDetails } from "@/types/api";

interface ScanStatusTableProps {
  scans: ScanDetails[];
  isLoading: boolean;
}

export const ScanStatusTable: React.FC<ScanStatusTableProps> = ({
  scans,
  isLoading,
}) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; icon: React.ReactNode }> = {
      running: { color: "bg-blue-500", icon: <Play className="w-3 h-3" /> },
      completed: { color: "bg-green-500", icon: null },
      failed: {
        color: "bg-destructive",
        icon: <AlertTriangle className="w-3 h-3" />,
      },
      scheduled: { color: "bg-yellow-500", icon: null },
    };

    const variant = variants[status.toLowerCase()] || variants.scheduled;

    return (
      <Badge className={`${variant.color} flex items-center gap-1`}>
        {variant.icon}
        {status}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Scan Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scans.map((scan) => (
            <TableRow key={scan.id}>
              <TableCell className="font-medium">{scan.title}</TableCell>
              <TableCell>{scan.location}</TableCell>
              <TableCell>{getStatusBadge(scan.status)}</TableCell>
              <TableCell>{scan.progress}%</TableCell>
              <TableCell>{scan.startTime}</TableCell>
              <TableCell>{scan.duration}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {scan.status === "running" && (
                    <Button variant="ghost" size="sm">
                      <Pause className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex space-x-4">
        <Skeleton className="h-12 w-full" />
      </div>
    ))}
  </div>
);