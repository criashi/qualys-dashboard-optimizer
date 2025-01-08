# QualysOps Dashboard

A React-based dashboard application for monitoring Qualys scans across Continental Tire locations. Built with Vite, TypeScript, React, shadcn-ui, and Tailwind CSS.

## Azure Infrastructure Setup

### 1. Azure Resources Required

- Azure Static Web Apps (Frontend hosting)
- Azure SQL Database (Operational data)
- Azure Key Vault (API credentials & secrets)
- Azure API Management (API gateway)
- Azure Application Insights (Monitoring)

### 2. Azure SQL Database Setup

1. Create Azure SQL Database:
```bash
az sql server create --name qualysops-sql-server \
    --resource-group your-resource-group \
    --location your-location \
    --admin-user your-admin-username \
    --admin-password your-admin-password

az sql db create --name qualysops-db \
    --resource-group your-resource-group \
    --server qualysops-sql-server \
    --service-objective S0
```

2. Execute the database schema:
```sql
-- Create Scans table
CREATE TABLE Scans (
    ScanId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    LocationId VARCHAR(50),
    Status VARCHAR(20),
    LastRunTime DATETIME,
    NextRunTime DATETIME,
    CreatedAt DATETIME DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME DEFAULT GETUTCDATE()
);

-- Create Locations table
CREATE TABLE Locations (
    LocationId VARCHAR(50) PRIMARY KEY,
    LocationName VARCHAR(100),
    Region VARCHAR(50),
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME DEFAULT GETUTCDATE()
);

-- Create ScanResults table
CREATE TABLE ScanResults (
    ResultId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ScanId UNIQUEIDENTIFIER,
    FindingType VARCHAR(50),
    Severity VARCHAR(20),
    Description TEXT,
    CreatedAt DATETIME DEFAULT GETUTCDATE(),
    FOREIGN KEY (ScanId) REFERENCES Scans(ScanId)
);
```

### 3. Azure Key Vault Setup

1. Create Key Vault:
```bash
az keyvault create --name qualysops-keyvault \
    --resource-group your-resource-group \
    --location your-location
```

2. Add secrets:
```bash
az keyvault secret set --vault-name qualysops-keyvault \
    --name "QualysApiKey" \
    --value "your-api-key"

az keyvault secret set --vault-name qualysops-keyvault \
    --name "SqlConnectionString" \
    --value "your-connection-string"
```

### 4. Azure API Management Setup

1. Create API Management instance:
```bash
az apim create --name qualysops-apim \
    --resource-group your-resource-group \
    --location your-location \
    --publisher-name "Continental" \
    --publisher-email "your-email@continental.com" \
    --sku-name "Developer"
```

2. Import Qualys API specifications and configure policies.

### 5. Application Configuration

1. Create configuration file for the frontend:
```bash
az staticwebapp settings set \
    --name qualysops-static-web \
    --resource-group your-resource-group \
    --setting-names \
    "AZURE_API_ENDPOINT=your-api-endpoint" \
    "AZURE_TENANT_ID=your-tenant-id" \
    "AZURE_CLIENT_ID=your-client-id"
```

### 6. Security Configuration

1. Enable Azure AD authentication:
```bash
az webapp auth update \
    --name qualysops-static-web \
    --resource-group your-resource-group \
    --enabled true \
    --action LoginWithAzureAD \
    --aad-client-id your-client-id \
    --aad-client-secret your-client-secret \
    --aad-tenant your-tenant-id
```

2. Configure CORS and network security rules.

### 7. Monitoring Setup

1. Create Application Insights:
```bash
az monitor app-insights component create \
    --app qualysops-insights \
    --location your-location \
    --resource-group your-resource-group
```

2. Enable monitoring:
```bash
az staticwebapp update \
    --name qualysops-static-web \
    --resource-group your-resource-group \
    --app-insights-key your-insights-key
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
    "AZURE_API_ENDPOINT": "https://your-api-endpoint",
    "AZURE_TENANT_ID": "your-tenant-id",
    "AZURE_CLIENT_ID": "your-client-id"
  }
}
```

3. Start development server:
```bash
npm run dev
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to Azure Static Web Apps:
```bash
az staticwebapp deploy \
    --name qualysops-static-web \
    --resource-group your-resource-group \
    --source dist
```

## Security Considerations

1. Network Security:
   - Configure Azure Private Link for SQL Database
   - Enable Azure AD authentication
   - Set up IP restrictions
   - Configure TLS/SSL certificates

2. Access Control:
   - Implement RBAC using Azure AD groups
   - Configure least-privilege access
   - Regular access reviews

3. Data Protection:
   - Enable TDE for SQL Database
   - Configure backup policies
   - Implement data retention policies

## Monitoring and Alerts

1. Set up alert rules:
```bash
az monitor metrics alert create \
    --name "HighErrorRate" \
    --resource-group your-resource-group \
    --scopes your-app-insights-resource-id \
    --condition "requests/failed gt 5"
```

2. Configure diagnostic settings:
```bash
az monitor diagnostic-settings create \
    --name "ApiDiagnostics" \
    --resource your-api-resource-id \
    --logs "[{\"category\": \"ApiManagementGateway\", \"enabled\": true}]" \
    --workspace your-log-analytics-workspace
```

## Troubleshooting

1. Common Issues:
   - Authentication failures: Check Azure AD configuration
   - API connectivity: Verify network security rules
   - Database connection: Check firewall rules
   - Performance issues: Review Application Insights metrics

2. Logs and Diagnostics:
   - Application Insights logs
   - Azure SQL Database Query Store
   - API Management traces
   - Static Web Apps logs

## Support and Maintenance

1. Regular Tasks:
   - Monitor resource usage
   - Review security logs
   - Update dependencies
   - Backup verification
   - Performance optimization

2. Contact Information:
   - Technical Support: your-support-email@continental.com
   - Emergency Contact: your-emergency-contact@continental.com

## License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.