import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import axios from "axios";

class QualysService {
  private static instance: QualysService;
  private credentials: { username: string; password: string } | null = null;

  private constructor() {}

  public static getInstance(): QualysService {
    if (!QualysService.instance) {
      QualysService.instance = new QualysService();
    }
    return QualysService.instance;
  }

  private async getCredentials(): Promise<{ username: string; password: string }> {
    if (this.credentials) return this.credentials;

    const credential = new DefaultAzureCredential();
    const keyVaultUrl = process.env.KEY_VAULT_URL;
    const secretClient = new SecretClient(keyVaultUrl!, credential);

    const username = await secretClient.getSecret("QualysAPIUsername");
    const password = await secretClient.getSecret("QualysAPIPassword");

    this.credentials = {
      username: username.value!,
      password: password.value!,
    };

    return this.credentials;
  }

  public async getHostDetections() {
    const credentials = await this.getCredentials();
    const auth = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');

    const response = await axios.get(process.env.QUALYS_API_URL!, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'X-Requested-With': 'QualysOps Dashboard',
      },
      proxy: process.env.HTTP_PROXY ? {
        host: process.env.HTTP_PROXY,
        port: 8080,
      } : undefined,
    });

    return response.data;
  }
}

export const qualysService = QualysService.getInstance();