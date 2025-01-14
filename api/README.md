# Azure Functions Backend

This directory contains the Azure Functions implementation for the QualysOps Dashboard API.

## Function Overview

### getScans
- **Purpose**: Retrieves scan data from Qualys API
- **Authentication**: Uses Azure Managed Identity to access Key Vault credentials
- **Rate Limiting**: Implements request throttling to comply with Qualys API limits
- **Error Handling**: Provides detailed error messages while masking sensitive information

### getReports
- **Purpose**: Retrieves and generates reports from Qualys API
- **Authentication**: Uses same credentials as getScans
- **Features**: 
  - List available reports
  - Generate new reports
  - Download report in various formats

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

## Production Setup Requirements

1. **Azure Resources**:
   - Azure Function App (Node.js runtime)
   - Azure Key Vault for credentials
   - Azure Storage Account
   - Application Insights for monitoring

2. **Qualys API Configuration**:
   - API credentials stored in Key Vault
   - Proper API access permissions
   - Report template IDs configured
   - API rate limiting considerations

3. **Network Configuration**:
   - VNET integration if required
   - Proxy settings if needed
   - IP restrictions
   - SSL/TLS requirements

4. **Monitoring Setup**:
   - Application Insights integration
   - Alert rules for errors
   - Usage metrics tracking
   - Performance monitoring

5. **Security Configuration**:
   - Managed Identity setup
   - RBAC permissions
   - Network security groups
   - API Management (optional)

## Deployment Steps

1. Create Azure Resources:
```bash
az group create --name qualysops-rg --location eastus

az functionapp create \
  --name qualysops-api \
  --resource-group qualysops-rg \
  --consumption-plan-location eastus \
  --runtime node \
  --functions-version 4
```

2. Configure Application Settings:
```bash
az functionapp config appsettings set \
  --name qualysops-api \
  --resource-group qualysops-rg \
  --settings \
    QUALYS_API_URL="your-api-url" \
    KEY_VAULT_URL="your-keyvault-url"
```

3. Deploy Functions:
```bash
func azure functionapp publish qualysops-api
```

4. Set up Managed Identity:
```bash
# Enable system-assigned managed identity
az functionapp identity assign \
  --name qualysops-api \
  --resource-group qualysops-rg

# Get the principal ID
principalId=$(az functionapp identity show \
  --name qualysops-api \
  --resource-group qualysops-rg \
  --query principalId \
  --output tsv)

# Grant Key Vault access
az keyvault set-policy \
  --name qualysops-kv \
  --object-id $principalId \
  --secret-permissions get list
```

## Troubleshooting

Common issues and solutions:

1. **API Authentication Failures**
   - Verify Key Vault access
   - Check Managed Identity configuration
   - Validate Qualys credentials

2. **Report Generation Issues**
   - Verify template IDs
   - Check API permissions
   - Monitor rate limits

3. **Network Connectivity**
   - Verify VNET integration
   - Check proxy settings
   - Validate IP restrictions

## Monitoring

1. Set up basic monitoring:
```bash
az monitor app-insights component create \
  --app qualysops-insights \
  --location eastus \
  --resource-group qualysops-rg

# Link to Function App
az functionapp config appsettings set \
  --name qualysops-api \
  --resource-group qualysops-rg \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=your-key
```

2. Configure alerts:
```bash
az monitor metrics alert create \
  --name "HighErrorRate" \
  --resource-group qualysops-rg \
  --condition "count requests/failed > 10" \
  --window-size 5m \
  --evaluation-frequency 1m
```

## Security Considerations

1. **Data Protection**:
   - Enable encryption at rest
   - Use HTTPS/TLS for all communications
   - Implement proper CORS policies

2. **Access Control**:
   - Use Managed Identities
   - Implement least privilege access
   - Regular credential rotation

3. **Monitoring**:
   - Enable diagnostic logging
   - Set up security alerts
   - Regular security scans

## Performance Optimization

1. **Function Configuration**:
   - Adjust timeout settings
   - Configure auto-scaling
   - Optimize memory allocation

2. **API Integration**:
   - Implement caching where appropriate
   - Use batch operations when possible
   - Handle rate limiting properly