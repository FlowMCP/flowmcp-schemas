# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a FlowMCP Schema Importer project that manages and imports various API schemas for cryptocurrency and financial data providers. The project uses Node.js v22+ with ES modules (.mjs files) and integrates with multiple external APIs including Chainlink, CoinGecko, Moralis, Solana Tracker, and many others.

## Key Commands

### Development & Testing
```bash
# Run MCP inspector for testing
npm run inspector

# Test schemas by namespace (example)
node tests/test-by-namespace.mjs

# Import schemas
node tests/schema-importer.mjs

# Check required server params
node tests/required-server-params.mjs
```

## Schema Testing & Debugging

### Quick Test Commands (USE THESE FIRST!)
```bash
# Test all new schemas (works out of the box!)
node tests/manual/test-schemas.mjs

# Test specific namespace
node tests/manual/test-schemas.mjs --namespace=aave

# Test specific file
node tests/manual/test-schemas.mjs --file=honeypot.mjs

# Verbose output for debugging
node tests/manual/test-schemas.mjs --verbose

# Show help
node tests/manual/test-schemas.mjs --help
```

**IMPORTANT**: When debugging schema errors, ALWAYS use `tests/manual/test-schemas.mjs` first as it provides:
- Detailed error messages
- Individual test isolation  
- Request/response inspection
- Better filtering options
- Default paths configured correctly (../../.env and ./../tests/new-schemas)

The defaults are configured so the command works immediately without parameters:
- `.env` is automatically found in project root (../../.env)
- Schemas are loaded from `tests/new-schemas/`

## Architecture

### Core Components

1. **SchemaImporter Class** (`src/index.mjs`): Main class for loading and processing schemas
   - Loads schemas from folder structure
   - Filters schemas based on imports and server params
   - Adds metadata to schemas
   - Key methods: `loadFromFolder()`, private helper methods for processing

2. **Schema Structure** (`schemas/v1.2.0/`): Organized API schemas by provider
   - Each provider has its own folder
   - Schemas define API endpoints, parameters, and tests
   - Follow FlowMCP schema format with namespace, routes, and modifiers

3. **Test Utilities** (`tests/`):
   - `test-by-namespace.mjs`: Tests schemas filtered by namespace
   - `schema-importer.mjs`: Tests schema import functionality
   - `helpers/Print.mjs`: Logging utilities
   - `helpers/Overview.mjs`: Schema overview utilities

### Schema Format

Each schema file exports an object with:
- `namespace`: Unique identifier for the API provider
- `name`: Schema name
- `description`: Purpose description
- `flowMCP`: Version compatibility
- `root`: Base API URL (may include placeholders)
- `requiredServerParams`: Required environment variables (e.g., API keys)
- `routes`: Object defining available endpoints with parameters and tests
- `modifiers`: Processing hooks for request/response handling

### Important Patterns

1. **Environment Variables**: Required API keys and credentials are loaded from `.env` files using the `requiredServerParams` field

2. **Schema Loading Options**:
   - `excludeSchemasWithImports`: Filter out schemas with external dependencies
   - `excludeSchemasWithRequiredServerParams`: Filter schemas needing API keys
   - `addAdditionalMetaData`: Include extra metadata like namespace, tags
   - `outputType`: Control output format ('onlyPath', 'onlySchema', or full)

3. **File Organization**:
   - Current schemas: `schemas/v1.2.0/`
   - Legacy/old schemas: `old/` and `schemas/v1.1.1/`
   - Test files: `tests/`
   - Source code: `src/`

## Development Guidelines

1. **ES Modules**: Use `.mjs` extension and ES6 import/export syntax
2. **Node.js Version**: Requires Node.js 18+ (engines field in package.json)
3. **Schema Testing**: Use FlowMCP's `getAllTests()` method to run schema tests
4. **Error Handling**: Check for missing required params and validate schema structure
5. **File System Operations**: Use Node.js built-in `fs` and `path` modules for file operations