export interface ScanLocation {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'failed';
  lastRun: string;
  nextRun: string;
  region?: string;
  assetGroups: AssetGroup[];
}

export interface AssetGroup {
  id: string;
  name: string;
  totalAssets: number;
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

export interface Location {
  id: string;
  name: string;
  region: string;
  assetGroups: AssetGroup[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}