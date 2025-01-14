import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { QualysReport } from "@/types/api";

interface ReportsListProps {
  reports: QualysReport[];
  onDownload: (reportId: string) => void;
}

export const ReportsList: React.FC<ReportsListProps> = ({ reports, onDownload }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead>Scan Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Findings</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.location}</TableCell>
              <TableCell>{report.scanDate}</TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.findings}</TableCell>
              <TableCell>{report.status}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDownload(report.id)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};