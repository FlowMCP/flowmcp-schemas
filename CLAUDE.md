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

## Schema Creation (FlowMCP v1.2.2 Spec)

### Top-Level Structure (all 11 fields required)

```javascript
export const schema = {
    namespace: "providerName",           // letters only, /^[a-zA-Z]+$/
    name: "Provider API",                // human-readable name
    description: "What this API does",   // brief explanation
    docs: ["https://provider.com/docs"], // array of documentation URLs
    tags: ["crypto", "defi"],            // semantic tags, NO hardcoded route refs
    flowMCP: "1.2.0",                    // version string "x.x.x"
    root: "https://api.provider.com",    // base URL, {{PLACEHOLDER}} allowed
    requiredServerParams: ["API_KEY"],   // all placeholders except {{USER_PARAM}}
    headers: {                           // request headers
        "Authorization": "Bearer {{API_KEY}}"
    },
    routes: { /* ... */ },               // route definitions
    handlers: { /* ... */ }              // handler functions
}
```

### Route Structure (all 6 keys required per route)

```javascript
routes: {
    getResource: {
        requestMethod: "GET",                    // GET, POST, PUT, DELETE
        description: "What this route does",     // brief explanation
        route: "/resource/:id",                  // path, :param for inserts
        parameters: [ /* ... */ ],               // array of parameter objects
        tests: [ /* ... */ ],                    // array of test cases
        modifiers: [ /* ... */ ]                 // array or empty []
    }
}
```

### Parameter Format (SINGLE LINE! Strict Convention)

```javascript
parameters: [
    { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["length(24)"] } },
    { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)"] } },
    { position: { key: "name", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["min(2)", "max(50)"] } }
]
```

- **`location`** values: `query`, `insert`, `body`
- **`primitive`** values: `string()`, `number()`, `boolean()`, `enum()`, `array()`
- **`options`**: `length(n)`, `min(n)`, `max(n)`, `regex(x)`, `optional()`, `default(x)`
- Every parameter with `{{USER_PARAM}}` MUST have a valid `z` object with `primitive` and `options`

### Modifier Format

```javascript
modifiers: [
    { phase: "pre", handlerName: "validateInput" },
    { phase: "execute", handlerName: "customFetch" },
    { phase: "post", handlerName: "formatOutput" }
]
```

- Valid phases: `pre`, `execute`, `post`
- Each `handlerName` must match a function in the `handlers` block

### Handler Format

```javascript
handlers: {
    formatOutput: async ({ struct, payload, userParams, routeName, phaseType }) => {
        // struct.data = processed result
        // struct.status = false for errors
        // struct.messages.push('error message') for error details
        return { struct, payload }
    }
}
```

### Test Format

```javascript
tests: [
    { _description: "Describe what this test does", id: "abc123", limit: 10 },
    { _description: "Another test case", id: "xyz789" }
]
```

- `_description` is **required** in every test
- Only keys defined in `parameters` are allowed (no unknown fields)

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
npm run validate:all        # Validate ALL v1.2.0 schemas for structure & duplicates
npm run validate:ai         # AI-optimized report for new schemas
npm run validate:tags       # Detect hardcoded tags
npm run validate:flowmcp    # FlowMCP schema-loading test
```

### Schema Lifecycle

1. **Develop** in `tests/new-schemas/PROVIDER/`
2. **Validate** with `npm run validate:ai`
3. **Live-test** with `node tests/manual/test-schemas.mjs --namespace=NAME`
4. **After approval**: Move to `schemas/v1.2.0/`

### Reference Files

- **Official Spec**: `node_modules/flowmcp/spec/v.1.2.2-spec.md`
- **Perfect Example**: `tests/schema-validation/examples/perfect-schema-example.mjs`
- **Broken Example**: `tests/schema-validation/examples/broken-schema-example.mjs`
- **Schema Guidelines**: `schemas/SCHEMAS.md`