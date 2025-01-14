# Azure Functions Backend

This directory contains the Azure Functions implementation for the QualysOps Dashboard API.

## Function Overview

### getScans
- **Purpose**: Retrieves scan data from Qualys API
- **Authentication**: Uses Azure Managed Identity to access Key Vault credentials
- **Rate Limiting**: Implements request throttling to comply with Qualys API limits
- **Error Handling**: Provides detailed error messages while masking sensitive information

## Local Development Setup

1. Install Azure Functions Core Tools:
```bash
npm install -g azure-functions-core-tools@4
```

2. Create local.settings.json:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "QUALYS_API_URL": "your-qualys-api-url",
    "KEY_VAULT_URL": "your-keyvault-url",
    "COSMOS_DB_CONNECTION": "your-cosmos-connection-string"
  }
}
```

3. Start the function app:
```bash
func start
```

## Deployment

1. Create Azure Function App:
```bash
az functionapp create \
  --name qualysops-api \
  --resource-group your-rg \
  --consumption-plan-location eastus \
  --runtime node \
  --functions-version 4 \
  --storage-account your-storage
```

2. Deploy the function:
```bash
func azure functionapp publish qualysops-api
```

## Error Handling

Common error scenarios and solutions:

1. Authentication Failures
   - Check Managed Identity configuration
   - Verify Key Vault access policies
   - Ensure Qualys API credentials are valid

2. Rate Limiting
   - Implement exponential backoff
   - Use Azure Cache for Redis if needed
   - Monitor API usage metrics

3. Network Issues
   - Configure proper VNET integration if required
   - Set up Azure Application Gateway if needed
   - Verify proxy settings