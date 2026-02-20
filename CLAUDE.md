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

# Run Jest unit tests with coverage
npm run test:coverage:src
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

## Unit Testing & Coverage

### Jest Unit Tests
The project includes Jest-based unit tests for the core `SchemaImporter` class:

```bash
# Run unit tests with coverage
npm run test:coverage:src

# Coverage files are generated in ./coverage/
# - coverage/lcov-report/index.html (HTML report)
# - coverage/lcov.info (for CI/CD)
```

### Coverage Thresholds
- **Statements**: 70%
- **Branches**: 60% 
- **Functions**: 85%
- **Lines**: 70%

### Test Structure
- **Unit Tests**: Located in `tests/unit/` with `.test.mjs` extension
- **Integration Tests**: Existing API-based tests in `tests/manual/` (unchanged)
- **Coverage Scope**: Only `src/**/*.mjs` files are included in coverage analysis

## Architecture

### Core Components

1. **SchemaImporter Class** (`src/index.mjs`): Main class for loading and processing schemas
   - Loads schemas from folder structure
   - Filters schemas based on imports and server params
   - Adds metadata to schemas
   - Key methods: `loadFromFolder()`, private helper methods for processing

2. **Schema Structure** (`schemas/v2.0.0/`): Organized API schemas by provider
   - Each provider has its own folder
   - Schemas define API endpoints with `export const main` (v2 format)
   - Optional `export const handlers` for pre/post/execute request hooks

3. **Test Utilities** (`tests/`):
   - `test-by-namespace.mjs`: Tests schemas filtered by namespace
   - `schema-importer.mjs`: Tests schema import functionality
   - `helpers/Print.mjs`: Logging utilities
   - `helpers/Overview.mjs`: Schema overview utilities

### Schema Format (v2.0.0)

Each schema file exports `main` (required) and optionally `handlers`:
- `namespace`: Unique identifier for the API provider
- `name`: Schema name
- `description`: Purpose description
- `version`: Schema version (`'2.0.0'`)
- `docs`: Array of documentation URLs
- `tags`: Semantic tags for categorization
- `root`: Base API URL (may include `{{PLACEHOLDER}}`)
- `requiredServerParams`: Environment variables needed (e.g., API keys)
- `routes`: Object defining endpoints with `method`, `path`, `parameters`

### Important Patterns

1. **Environment Variables**: Required API keys and credentials are loaded from `.env` files using the `requiredServerParams` field

2. **Schema Loading Options**:
   - `excludeSchemasWithImports`: Filter out schemas with external dependencies
   - `excludeSchemasWithRequiredServerParams`: Filter schemas needing API keys
   - `addAdditionalMetaData`: Include extra metadata like namespace, tags
   - `outputType`: Control output format ('onlyPath', 'onlySchema', or full)

3. **File Organization**:
   - Current schemas: `schemas/v2.0.0/`
   - Legacy schemas: `schemas/v1.2.0/` and `schemas/v1.1.1/`
   - Test files: `tests/`
   - Source code: `src/`

## Development Guidelines

1. **ES Modules**: Use `.mjs` extension and ES6 import/export syntax
2. **Node.js Version**: Requires Node.js 18+ (engines field in package.json)
3. **Schema Testing**: Use FlowMCP's `getAllTests()` method to run schema tests
4. **Error Handling**: Check for missing required params and validate schema structure
5. **File System Operations**: Use Node.js built-in `fs` and `path` modules for file operations

## Schema Creation (FlowMCP v2.0.0 Spec)

### Top-Level Structure

```javascript
export const main = {
    namespace: 'providerName',             // letters only, /^[a-zA-Z]+$/
    name: 'Provider API',                  // human-readable name
    description: 'What this API does',     // brief explanation
    version: '2.0.0',                      // schema version
    docs: [ 'https://provider.com/docs' ], // array of documentation URLs
    tags: [ 'crypto', 'defi' ],            // semantic tags
    root: 'https://api.provider.com',      // base URL, {{PLACEHOLDER}} allowed
    requiredServerParams: [ 'API_KEY' ],   // env vars for {{PLACEHOLDER}} in headers
    headers: {                             // request headers (optional)
        'Authorization': 'Bearer {{API_KEY}}'
    },
    routes: { /* ... */ }
}

// Optional: handler factory for pre/post/execute hooks
export const handlers = ( { sharedLists, libraries } ) => ( {
    getResource: {
        postRequest: async ( { response, struct, payload } ) => {
            return { response: response['result'] }
        }
    }
} )
```

### Route Structure

```javascript
routes: {
    getResource: {
        method: 'GET',                              // GET, POST, PUT, DELETE
        path: '/resource/:id',                      // path with :param placeholders
        description: 'What this route does',        // brief explanation
        parameters: {
            id: { type: 'string', required: true, description: 'Resource ID' },
            limit: { type: 'number', required: false, default: 10, description: 'Max results' }
        }
    }
}
```

### Parameter Types

| Type | Example |
|------|---------|
| `string` | `{ type: 'string', required: true }` |
| `number` | `{ type: 'number', required: false, default: 10 }` |
| `boolean` | `{ type: 'boolean', required: false, default: false }` |
| `enum` | `{ type: 'enum', values: [ 'asc', 'desc' ], required: true }` |
| `array` | `{ type: 'array', required: false }` |

### Handler Phases (v2)

```javascript
export const handlers = ( { sharedLists, libraries } ) => ( {
    routeName: {
        preRequest: async ( { struct, payload } ) => {
            // Modify request before sending
            return { struct, payload }
        },
        executeRequest: async ( { struct, payload } ) => {
            // Replace standard HTTP fetch entirely
            return { response: customData }
        },
        postRequest: async ( { response, struct, payload } ) => {
            // Transform response after receiving
            return { response: transformedData }
        }
    }
} )
```

### Namespace Rules
- Only letters allowed: `/^[a-zA-Z]+$/`
- No numbers, hyphens, or underscores

### Tags Rules
- Use **semantic tags** describing the API domain: `["crypto", "defi", "blockchain"]`
- Do NOT hardcode route references like `["provider.getRoute1", "provider.getRoute2"]`

### Schema Size
- Maximum **10 routes** per schema file
- Split large APIs into multiple schema files by domain

### Validation & Test Commands

```bash
npm run validate:all        # Validate ALL schemas for structure & duplicates
npm run validate:ai         # AI-optimized report for new schemas
npm run validate:tags       # Detect hardcoded tags
npm run validate:flowmcp    # FlowMCP schema-loading test
```

### Schema Lifecycle

1. **Develop** in `tests/new-schemas/PROVIDER/`
2. **Validate** with `npm run validate:ai`
3. **Live-test** with `node tests/manual/test-schemas.mjs --namespace=NAME`
4. **After approval**: Move to `schemas/v2.0.0/PROVIDER/`

### Reference Files

- **Official Spec**: [FlowMCP Specification v2.0.0](https://github.com/FlowMCP/flowmcp-specification)
- **Schema Guidelines**: `schemas/SCHEMAS.md`