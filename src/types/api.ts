export interface ScanLocation {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'failed';
  lastRun: string;
  nextRun: string;
  vulnerabilities?: number;
  coverage?: number;
}

export interface DashboardStats {
  activeScans: number;
  failedScans: number;
  totalScans: number;
  coverage: number;
  trends: {
    activeScans: number;
    failedScans: number;
    coverage: number;
  };
}