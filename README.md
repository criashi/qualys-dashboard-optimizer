# QualysOps Dashboard

A React-based dashboard application for monitoring Qualys scans across Continental Tire locations. Built with Vite, TypeScript, React, shadcn-ui, and Tailwind CSS.

## Features

- Real-time scan monitoring across multiple locations
- Dark/Light mode support
- Continental Tire brand-compliant UI
- Responsive design for all devices
- Interactive data visualization

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Azure subscription
- Azure CLI installed

## Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd qualysops-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Building for Production

```bash
npm run build
```

This will create a production build in the `dist` directory.

## Azure Deployment Instructions

### 1. Azure Static Web Apps Setup

1. In the Azure Portal, create a new Static Web App:
   - Go to "Create a Resource"
   - Search for "Static Web App"
   - Click "Create"

2. Fill in the basic details:
   - **Subscription**: Select your subscription
   - **Resource Group**: Create new or select existing
   - **Name**: qualysops-dashboard
   - **Hosting Plan**: Free
   - **Region**: Select nearest region
   - **Source**: GitHub (or your preferred source)

3. Configure the build details:
   - **Build Preset**: Vite
   - **App location**: /
   - **Output location**: dist
   - **API location**: Leave empty

4. Complete the creation process and wait for deployment

### 2. Environment Configuration

Create environment variables in Azure Static Web Apps:

1. Navigate to your Static Web App in Azure Portal
2. Go to Configuration → Application Settings
3. Add necessary environment variables:
   ```
   VITE_API_URL=your_api_url
   ```

### 3. Custom Domain Setup (Optional)

1. In Azure Portal, go to your Static Web App
2. Navigate to Custom Domains
3. Click "Add"
4. Follow the DNS configuration instructions

### 4. GitHub Actions Workflow

The deployment workflow will be automatically created in your repository. The workflow file will be located at `.github/workflows/azure-static-web-apps.yml`

## Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── ScanTable.tsx
│   │   └── StatCard.tsx
│   └── layout/
│       ├── DashboardLayout.tsx
│       ├── Navbar.tsx
│       └── Sidebar.tsx
├── pages/
│   └── Index.tsx
└── hooks/
    └── useTheme.tsx
```

## Security Considerations

- Enable Azure AD authentication if required
- Configure CORS policies appropriately
- Enable HTTPS-only access
- Implement rate limiting
- Regular security audits and updates

## Monitoring and Logging

1. Enable Application Insights:
   - Create Application Insights resource in Azure
   - Add the instrumentation key to your app
   - Monitor application performance and usage

2. Configure Logging:
   - Enable diagnostic logging in Azure Static Web Apps
   - Set up log retention policies
   - Configure alert rules for critical events

## Troubleshooting

Common issues and solutions:

1. Build Failures:
   - Verify Node.js version compatibility
   - Check for missing dependencies
   - Validate environment variables

2. Deployment Issues:
   - Review GitHub Actions logs
   - Verify Azure credentials
   - Check build output location

3. Runtime Errors:
   - Check browser console for errors
   - Verify API endpoints and connectivity
   - Review Application Insights logs

## Support and Maintenance

- Regular dependency updates
- Periodic security patches
- Performance optimization
- Bug fixes and feature updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.