import { ScanLocation, DashboardStats, Location, AssetGroup } from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
  async getScans(): Promise<ScanLocation[]> {
    const response = await fetch(`${API_BASE_URL}/scans`);
    if (!response.ok) {
      throw new Error('Failed to fetch scans');
    }
    return response.json();
  },

  async getLocations(): Promise<Location[]> {
    const response = await fetch(`${API_BASE_URL}/locations`);
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    return response.json();
  },

  async createLocation(location: Partial<Location>): Promise<Location> {
    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    });
    if (!response.ok) {
      throw new Error('Failed to create location');
    }
    return response.json();
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard statistics');
    }
    return response.json();
  },
};