import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export const ReportFilters = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {/* Will be populated from API */}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Report type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="technical">Technical Report</SelectItem>
          <SelectItem value="executive">Executive Summary</SelectItem>
          <SelectItem value="compliance">Compliance Report</SelectItem>
        </SelectContent>
      </Select>
      <DatePickerWithRange className="w-full" />
    </div>
  );
};