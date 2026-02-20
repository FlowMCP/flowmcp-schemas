# FlowMCP Schema Documentation

This directory contains the auto-generated documentation for all FlowMCP schemas.

## 🌐 Live Documentation

View the documentation at: https://flowmcp.github.io/flowmcp-schemas/

## 📋 Features

- **Visual Schema Browser**: Browse all available schemas with their routes
- **Search Functionality**: Search by namespace, name, routes, or descriptions  
- **API Key Indicators**: Clear visibility of which schemas require API keys
- **GitHub Integration**: Direct links to schema source files
- **Route Details**: Complete route information including HTTP methods and descriptions
- **Statistics Dashboard**: Overview of total schemas, routes, and namespaces

## 🔧 Generation

The documentation is automatically generated from the schemas in `/schemas/v2.0.0/`.

To regenerate the documentation:
```bash
npm run docs:generate
```

This will:
1. Scan all schemas in the v2.0.0 directory
2. Extract metadata and route information
3. Generate `schemas-data.json` with all data
4. Create `index.html` with embedded data and visualization

## 🤖 Automation

A GitHub Action automatically updates the documentation whenever:
- Schema files are modified in `/schemas/`
- The generation script is updated
- Manual trigger via GitHub Actions

## 📁 Files

- `index.html` - Main documentation page
- `schemas-data.json` - Generated schema data
- `_config.yml` - GitHub Pages configuration
- `README.md` - This file

## 🎨 Features Included

- **Responsive Design**: Works on desktop and mobile
- **Search Filter**: Real-time search across all schema properties
- **Statistics**: Live counters for schemas, routes, and API requirements
- **Route Visualization**: Color-coded HTTP methods
- **API Key Badge**: Visual indicator for schemas requiring authentication
- **Test Status**: Shows which routes have tests
- **Documentation Links**: Direct links to external API documentation

## 🚀 Deployment

The documentation is automatically deployed to GitHub Pages from the `/docs` folder.

To enable GitHub Pages:
1. Go to repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Choose `main` branch and `/docs` folder
4. Save and wait for deployment

## 🔄 Updates

The documentation updates automatically when schemas change. No manual intervention required!