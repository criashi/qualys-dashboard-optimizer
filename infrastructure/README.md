# Azure Infrastructure Setup Guide

This guide details the infrastructure setup required for the QualysOps Dashboard.

## Architecture Components

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  Static Web App │────▶│ Azure Function│────▶│  Key Vault  │
└─────────────────┘     └──────────────┘     └─────────────┘
                              │
                              ▼
                        ┌──────────────┐
                        │  Cosmos DB   │
                        └──────────────┘
```

## Resource Provisioning

### 1. Resource Group

```bash
az group create \
  --name qualysops-rg \
  --location eastus
```

### 2. Key Vault Setup

```bash
# Create Key Vault
az keyvault create \
  --name qualysops-kv \
  --resource-group qualysops-rg \
  --location eastus

# Add Qualys credentials
az keyvault secret set \
  --vault-name qualysops-kv \
  --name QualysUsername \
  --value your-username

az keyvault secret set \
  --vault-name qualysops-kv \
  --name QualysPassword \
  --value your-password
```

### 3. Cosmos DB Setup

```bash
# Create Cosmos DB account
az cosmosdb create \
  --name qualysops-db \
  --resource-group qualysops-rg \
  --locations regionName=eastus

# Create database
az cosmosdb sql database create \
  --account-name qualysops-db \
  --resource-group qualysops-rg \
  --name QualysOps

# Create containers
az cosmosdb sql container create \
  --account-name qualysops-db \
  --database-name QualysOps \
  --name Locations \
  --partition-key-path "/id" \
  --resource-group qualysops-rg
```

### 4. Static Web App

```bash
az staticwebapp create \
  --name qualysops-web \
  --resource-group qualysops-rg \
  --location eastus \
  --sku Free
```

## Security Configuration

### 1. Managed Identity Setup

```bash
# Create system-assigned managed identity
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

### 2. Network Security

1. Configure VNET integration if required:
```bash
az functionapp vnet-integration add \
  --name qualysops-api \
  --resource-group qualysops-rg \
  --vnet your-vnet-name \
  --subnet your-subnet-name
```

2. Set up private endpoints if needed:
```bash
az network private-endpoint create \
  --name qualysops-pe \
  --resource-group qualysops-rg \
  --vnet-name your-vnet \
  --subnet your-subnet \
  --private-connection-resource-id $functionAppId \
  --group-id sites \
  --connection-name qualysops-connection
```

## Monitoring Setup

1. Enable Application Insights:
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

2. Set up alerts:
```bash
az monitor metrics alert create \
  --name "HighErrorRate" \
  --resource-group qualysops-rg \
  --scopes $functionAppId \
  --condition "count requests/failed > 10" \
  --window-size 5m \
  --evaluation-frequency 1m
```

## Cost Optimization

1. Use consumption plan for Functions:
```bash
az functionapp plan create \
  --name qualysops-plan \
  --resource-group qualysops-rg \
  --sku Y1 \
  --is-linux false
```

2. Configure auto-scaling:
```bash
az functionapp update \
  --name qualysops-api \
  --resource-group qualysops-rg \
  --set maxCount=10
```