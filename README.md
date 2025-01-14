# QualysOps Dashboard

A React-based dashboard application for monitoring Qualys scans across Continental Tire locations.

## Azure Infrastructure Setup

### 1. Azure Resources Required

- Azure Static Web Apps (Frontend hosting)
- Azure Key Vault (API credentials)
- Azure Managed Identity (For secure credential access)

### 2. Azure Key Vault Setup

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

### 3. Qualys API Configuration

1. Environment Variables:
```bash
az webapp config appsettings set --name qualysops-webapp \
    --resource-group your-resource-group \
    --settings \
    QUALYS_API_URL="https://qualysguard.qualys.eu/api/2.0/fo/asset/host/vm/detection/" \
    KEY_VAULT_URL="https://qualysapicreds.vault.azure.net/"
```

2. Proxy Configuration (if required):
```bash
az webapp config appsettings set --name qualysops-webapp \
    --resource-group your-resource-group \
    --settings \
    HTTP_PROXY="http://your-proxy:port" \
    HTTPS_PROXY="http://your-proxy:port"
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up local configuration:
Create a `local.settings.json` file:
```json
{
  "IsEncrypted": false,
  "Values": {
    "QUALYS_API_URL": "https://qualysguard.qualys.eu/api/2.0/fo/asset/host/vm/detection/",
    "KEY_VAULT_URL": "https://qualysapicreds.vault.azure.net/"
  }
}
```

3. Start development server:
```bash
npm run dev
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