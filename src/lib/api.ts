import { ScanLocation, DashboardStats, Location, AssetGroup } from '@/types/api';
import { qualysApi } from '@/services/qualysApi';

const API_BASE_URL = process.env.QUALYS_API_URL || 'https://qualysguard.qualys.eu/api/2.0/fo/asset/host/vm/detection/';

export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const detections = await qualysApi.getHostDetections();
    // Transform Qualys API response to DashboardStats format
    // This is a placeholder transformation - adjust based on actual API response
    return {
      activeScans: 0,
      failedScans: 0,
      totalScans: 0,
      coverage: 0,
      trends: {
        activeScans: 0,
        failedScans: 0,
        coverage: 0
      }
    };
  } catch (error) {
    console.error('Failed to fetch dashboard statistics:', error);
    throw new Error('Failed to fetch dashboard statistics');
  }
}

export async function fetchScanLocations(): Promise<ScanLocation[]> {
  try {
    const assetGroups = await qualysApi.getAssetGroups();
    // Transform Qualys API response to ScanLocation format
    // This is a placeholder transformation - adjust based on actual API response
    return [];
  } catch (error) {
    console.error('Failed to fetch scan locations:', error);
    throw new Error('Failed to fetch scan locations');
  }
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