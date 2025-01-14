# QualysOps Dashboard

A React-based dashboard application for monitoring Qualys scans across Continental Tire locations.

## Architecture Overview

- Frontend: React SPA hosted on Azure Static Web Apps
- Backend: Azure Functions for Qualys API integration
- Storage: Azure CosmosDB for location and asset group mappings
- Security: Azure Key Vault for credential management

## Azure Infrastructure Setup

### 1. Required Azure Resources

- Azure Static Web Apps (Frontend hosting)
- Azure Functions (Backend API)
- Azure CosmosDB (Data storage)
- Azure Key Vault (API credentials)
- Azure Managed Identity (For secure credential access)

### 2. Azure Functions Setup

1. Create Function App:
```bash
az functionapp create --name qualysops-api \
    --resource-group your-resource-group \
    --storage-account your-storage-account \
    --runtime node \
    --functions-version 4
```

2. Configure Function App settings:
```bash
az functionapp config appsettings set --name qualysops-api \
    --resource-group your-resource-group \
    --settings \
    QUALYS_API_URL="https://qualysguard.qualys.eu/api/2.0/fo/asset/host/vm/detection/" \
    KEY_VAULT_URL="https://qualysapicreds.vault.azure.net/" \
    COSMOS_DB_CONNECTION="your-cosmos-connection-string"
```

### 3. CosmosDB Setup

1. Create CosmosDB account:
```bash
az cosmosdb create --name qualysops-db \
    --resource-group your-resource-group \
    --locations regionName=eastus
```

2. Create database and containers:
```bash
az cosmosdb sql database create \
    --account-name qualysops-db \
    --name QualysOps \
    --resource-group your-resource-group

az cosmosdb sql container create \
    --account-name qualysops-db \
    --database-name QualysOps \
    --name Locations \
    --partition-key-path "/id" \
    --resource-group your-resource-group
```

### 4. Azure Key Vault Setup

1. Create Key Vault:
```bash
az keyvault create --name qualysops-keyvault \
    --resource-group your-resource-group \
    --location your-location
```

2. Add Qualys API credentials:
```bash
az keyvault secret set --vault-name qualysops-keyvault \
    --name "QualysAPIUsername" \
    --value "your-username"

az keyvault secret set --vault-name qualysops-keyvault \
    --name "QualysAPIPassword" \
    --value "your-password"
```

3. Configure Managed Identity:
```bash
# Create system-assigned managed identity
az webapp identity assign --name qualysops-webapp \
    --resource-group your-resource-group

# Get the principal ID
principalId=$(az webapp identity show --name qualysops-webapp \
    --resource-group your-resource-group --query principalId --output tsv)

# Grant access to Key Vault
az keyvault set-policy --name qualysops-keyvault \
    --object-id $principalId \
    --secret-permissions get list
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up Azure Functions Core Tools:
```bash
npm install -g azure-functions-core-tools@4
```

3. Create local.settings.json in the api folder:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "QUALYS_API_URL": "https://qualysguard.qualys.eu/api/2.0/fo/asset/host/vm/detection/",
    "KEY_VAULT_URL": "https://qualysapicreds.vault.azure.net/",
    "COSMOS_DB_CONNECTION": "your-cosmos-connection-string"
  }
}
```

4. Start the development servers:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Azure Functions
cd api
func start
```

## Project Structure

```
qualysops/
├── src/               # Frontend React application
├── api/              # Azure Functions
│   ├── getScans/     # Scan retrieval function
│   ├── getLocations/ # Location management functions
│   └── shared/       # Shared utilities and services
├── types/            # Shared TypeScript types
└── infrastructure/   # Infrastructure as Code (optional)
```

## Security Considerations

1. Credential Management:
   - Use Azure Key Vault for storing Qualys API credentials
   - Implement Managed Identity for secure credential access
   - Regular credential rotation

2. Network Security:
   - Configure proxy settings if required
   - Enable HTTPS/TLS
   - Implement IP restrictions

## Troubleshooting

1. Common Issues:
   - Authentication failures: Check Azure Managed Identity configuration
   - API connectivity: Verify proxy settings
   - Rate limiting: Implement request throttling

2. Logs and Diagnostics:
   - Enable Application Insights
   - Monitor API response times
   - Track authentication failures

## Support

Technical Support: your-support-email@continental.com

## License

This project is proprietary and confidential.
