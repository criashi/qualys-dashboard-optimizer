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
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ScanStatusTableProps {
  scans: ScanDetails[];
  isLoading: boolean;
}

export const ScanStatusTable: React.FC<ScanStatusTableProps> = ({
  scans,
  isLoading,
}) => {
  const { toast } = useToast();
  const [selectedScan, setSelectedScan] = React.useState<ScanDetails | null>(null);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const handlePauseScan = (scanId: string) => {
    toast({
      title: "Scan Paused",
      description: "The scan has been paused successfully.",
    });
    console.log("Pausing scan:", scanId);
  };

  const handleViewDetails = (scan: ScanDetails) => {
    setSelectedScan(scan);
  };

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
    <>
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(scan)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {scan.status === "running" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePauseScan(scan.id)}
                      >
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

      <Dialog open={!!selectedScan} onOpenChange={() => setSelectedScan(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Scan Details</DialogTitle>
          </DialogHeader>
          {selectedScan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Title:</span>
                <span className="col-span-3">{selectedScan.title}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Location:</span>
                <span className="col-span-3">{selectedScan.location}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Status:</span>
                <span className="col-span-3">
                  {getStatusBadge(selectedScan.status)}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Progress:</span>
                <span className="col-span-3">{selectedScan.progress}%</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Start Time:</span>
                <span className="col-span-3">{selectedScan.startTime}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Duration:</span>
                <span className="col-span-3">{selectedScan.duration}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
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