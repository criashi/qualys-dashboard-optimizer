import { ScanLocation, DashboardStats } from '@/types/api';

const QUALYS_API_BASE = process.env.QUALYS_API_URL || 'https://qualysguard.qualys.eu/api/2.0/fo/asset/host/vm/detection/';

interface QualysApiConfig {
  username: string;
  password: string;
}

class QualysApiService {
  private static instance: QualysApiService;
  private config: QualysApiConfig | null = null;

  private constructor() {}

  public static getInstance(): QualysApiService {
    if (!QualysApiService.instance) {
      QualysApiService.instance = new QualysApiService();
    }
    return QualysApiService.instance;
  }

  public async initialize(config: QualysApiConfig) {
    this.config = config;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    if (!this.config) {
      throw new Error('QualysApiService not initialized with credentials');
    }

    const headers = new Headers({
      'Authorization': 'Basic ' + btoa(`${this.config.username}:${this.config.password}`),
      'Content-Type': 'application/json',
    });

    const response = await fetch(`${QUALYS_API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  public async getHostDetections() {
    return this.makeRequest('');
  }

  public async getScanResults(scanId: string) {
    return this.makeRequest(`?action=list&show_results=1&scan_ref=${scanId}`);
  }

  public async getAssetGroups() {
    return this.makeRequest('/asset/group/?action=list');
  }
}

export const qualysApi = QualysApiService.getInstance();