import { ScanLocation, DashboardStats } from '@/types/api';

const API_BASE_URL = '/api'; // This will be configured based on your Azure setup

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

export async function reactivateScan(scanId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/scans/${scanId}/reactivate`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to reactivate scan');
  }
}