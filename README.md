# QualysOps Dashboard

A React-based dashboard application for monitoring Qualys scans across Continental Tire locations.

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

For detailed setup instructions, see:
- [Azure Functions Backend Setup](./api/README.md)
- [Infrastructure Setup Guide](./infrastructure/README.md)

## Architecture Overview

- Frontend: React SPA hosted on Azure Static Web Apps
- Backend: Azure Functions for Qualys API integration
- Storage: Azure CosmosDB for location and asset group mappings
- Security: Azure Key Vault for credential management

## Development Workflow

1. Set up local development environment
2. Configure Azure resources following the infrastructure guide
3. Implement required features
4. Deploy to Azure

## Project Structure

```
qualysops/
├── src/               # Frontend React application
├── api/              # Azure Functions
│   ├── getScans/     # Scan retrieval function
│   ├── getLocations/ # Location management functions
│   └── shared/       # Shared utilities and services
├── infrastructure/   # Infrastructure as Code
└── types/            # Shared TypeScript types
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

## Support

Technical Support: your-support-email@continental.com

## License

This project is proprietary and confidential.