import { ScanLocation, DashboardStats, Location, AssetGroup } from '@/types/api';

const API_BASE_URL = '/api';

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard statistics');
  }
  return response.json();
}

export async function fetchScanLocations(): Promise<ScanLocation[]> {
  const response = await fetch(`${API_BASE_URL}/scans`);
  if (!response.ok) {
    throw new Error('Failed to fetch scan locations');
  }
  return response.json();
}

export async function fetchLocations(): Promise<Location[]> {
  // Mock data for now
  return [
    {
      id: "1",
      name: "North America HQ",
      region: "na",
      assetGroups: [
        { id: "ag1", name: "Server Farm A", totalAssets: 150 },
        { id: "ag2", name: "Desktop Fleet", totalAssets: 500 },
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "European Operations",
      region: "eu",
      assetGroups: [
        { id: "ag3", name: "Cloud Infrastructure", totalAssets: 300 },
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export async function reactivateScan(scanId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/scans/${scanId}/reactivate`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to reactivate scan');
  }
}

export async function createLocation(locationData: Partial<Location>): Promise<Location> {
  const response = await fetch(`${API_BASE_URL}/locations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(locationData),
  });
  if (!response.ok) {
    throw new Error('Failed to create location');
  }
  return response.json();
}