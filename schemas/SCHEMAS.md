# SCHEMAS.md

This document provides comprehensive guidelines for managing and developing FlowMCP schemas in this repository.

## Repository Structure

### Version Organization

- **`v1.2.0/`** - Current stable schemas following FlowMCP v1.2.0+ specification
- **`v1.1.1/`** - Legacy schemas for FlowMCP v1.1.1
- **`not_supported/`** - Special cases and experimental schemas not yet supported

### Folder Organization

Each version folder contains provider-specific subdirectories organized by company/project name:
- `chainlink/` - Chainlink price feed schemas
- `coingecko-com/` - CoinGecko API schemas split by functionality
- `moralis-com/eth/` - Moralis Ethereum API schemas
- `solanatracker-io/` - SolanaTracker schemas split by route categories

## FlowMCP Specification Compliance

All schemas must follow the [FlowMCP v1.2.2 specification](https://github.com/FlowMCP/flowmcp-core/blob/main/spec/v.1.2.2-spec.md).

### Required Schema Fields

```javascript
export const schema = {
    namespace: "providername",        // Letters only, unique identifier
    name: "SchemaName",              // Descriptive name
    description: "Clear description", // Purpose and functionality
    docs: ["https://api-docs-url"],  // Documentation links
    tags: ["module.route"],          // Format: module.route
    flowMCP: "1.2.0",               // Version compatibility
    root: "https://api.example.com", // Base URL with optional placeholders
    requiredServerParams: ["API_KEY"], // Environment variables needed
    headers: {},                     // Optional headers
    routes: {                        // API endpoints definition
        routeName: {
            requestMethod: "GET",
            description: "Route description",
            route: "/endpoint",
            parameters: [],
            tests: [{ _description: "Test description" }],
            modifiers: []
        }
    }
}
```

### Schema Size Guidelines

- **Maximum 10 routes per schema** - Keeps complexity manageable for AI processing
- **Split large APIs by category** - Example: Moralis split into blockchain, defi, nft, etc.
- **Alternative splitting strategies** - If categories don't apply, use other logical divisions

## Development Guidelines

### Namespace Conventions

- Use **letters only** (no numbers, hyphens, underscores)
- Should match the provider/project name
- Enables searching for all methods from a specific provider
- Examples: `chainlink`, `coingecko`, `moralis`

### Route Descriptions

- **Critical for discoverability** - These descriptions appear in MCP clients
- Be specific about functionality and use cases
- Include parameter requirements and return data types
- Example: "Fetches historical market chart data for a coin over specified time period"

### Tags System

- Follow `module.route` format
- Enable cross-schema functionality grouping
- Examples: `price.latest`, `data.historical`, `auth.login`

### Parameter Validation

Every parameter with `{{USER_PARAM}}` requires a `z` validation object:

```javascript
parameters: [
    { 
        position: { key: "vs_currency", value: "{{USER_PARAM}}", location: "query" }, 
        z: { primitive: "string()", options: [] } 
    },
    { 
        position: { key: "days", value: "{{USER_PARAM}}", location: "query" }, 
        z: { primitive: "enum(1,7,14,30,90,180,365)", options: [] } 
    }
]
```

### Test Requirements

- **Minimum one test per route** - No exceptions
- Tests must demonstrate route functionality clearly
- Include parameter variations for complex routes
- Use real, working parameter values
- Descriptive test names explaining the scenario

```javascript
tests: [
    { _description: "Test getCoinMarketChart - should return BTC 7d chart", id: "bitcoin", vs_currency: "usd", days: "7" },
    { _description: "Test getCoinMarketChart - should return ETH 30d chart", id: "ethereum", vs_currency: "usd", days: "30" }
]
```

## Quality Assurance

### Pre-Release Validation

Before any repository release:
1. **All schemas must be valid** according to FlowMCP specification
2. **Functional testing required** with real API keys where needed
3. **Test responses must be meaningful** for internal processing
4. **No broken or non-functional routes** allowed

### API Key Management

- Required server parameters must be documented in `requiredServerParams`
- Test with actual API keys during development
- Ensure API rate limits are respected during testing
- Document any special authentication requirements

## Contribution Process

### New Schema Requests

1. **Create GitHub issue** at https://github.com/FlowMCP/flowmcp-schemas/issues
2. **Title format**: "Support for [Provider Name] - [Brief Description]"
3. **Include documentation links** and API specification
4. **Specify required authentication** (API keys, tokens, etc.)

### Schema Development Process

1. **Research API documentation** thoroughly
2. **Create schema following guidelines** above
3. **Implement comprehensive tests** covering main functionality
4. **Test with real API credentials** if required
5. **Validate against FlowMCP specification**
6. **Submit pull request** with detailed description

### Large API Handling

For providers with extensive APIs (100+ endpoints):
- **Split by logical categories** (e.g., trading, market data, user management)
- **Create separate schema files** for each category
- **Use consistent naming conventions** across related schemas
- **Document relationships** between schema files

## Best Practices

### Schema Design

- **Prioritize commonly used endpoints** in initial schema versions
- **Group related functionality** together
- **Use clear, descriptive route names** that match API documentation
- **Include relevant modifiers** for request/response processing

### Documentation

- **Link to official API docs** in the `docs` field
- **Explain complex parameters** in route descriptions
- **Document expected response formats** where helpful
- **Include usage examples** in test descriptions

### Testing Strategy

- **Test edge cases** for parameters with multiple options
- **Verify different response formats** where applicable
- **Include both simple and complex scenarios**
- **Ensure tests demonstrate real-world usage**

## Maintenance

### Version Updates

- **Maintain backward compatibility** when possible
- **Document breaking changes** in schema descriptions
- **Update tests** to reflect API changes
- **Migrate schemas** to newer FlowMCP versions as needed

### Error Handling

- **Document known API limitations** in schema descriptions
- **Include error scenarios** in tests where relevant
- **Implement appropriate modifiers** for error handling
- **Test failure cases** during development

## Debugging & Troubleshooting

### Using Modifiers for Debugging

When schemas don't work as expected, debugging modifiers can help diagnose issues by intercepting and logging the API flow at different phases.

#### Debug Modifier for Request Analysis (`pre` phase)

Use the `pre` phase to inspect what is being sent to the API:

```javascript
routes: {
    yourRoute: {
        // ... route configuration
        modifiers: [
            { phase: "pre", handlerName: "debugRequest" }
        ]
    }
},
handlers: {
    debugRequest: async ({ struct, payload }) => {
        console.log("🔍 DEBUG REQUEST:")
        console.log("URL:", payload.url)
        console.log("Method:", payload.method)
        console.log("Headers:", payload.headers)
        console.log("Body:", payload.body)
        console.log("Query params:", payload.query)
        
        return { struct, payload }
    }
}
```

#### Debug Modifier for Response Analysis (`post` phase)

Use the `post` phase to examine raw API responses:

```javascript
routes: {
    yourRoute: {
        // ... route configuration
        modifiers: [
            { phase: "post", handlerName: "debugResponse" }
        ]
    }
},
handlers: {
    debugResponse: async ({ struct, payload }) => {
        console.log("🔍 DEBUG RESPONSE:")
        console.log("Status:", struct.status)
        console.log("HTTP Status:", struct.httpStatus)
        console.log("Raw Data:", struct.dataAsString)
        console.log("Headers:", struct.responseHeaders)
        console.log("Messages:", struct.messages)
        
        return { struct, payload }
    }
}
```

#### Combined Request/Response Debugging

For comprehensive debugging, use both phases together:

```javascript
modifiers: [
    { phase: "pre", handlerName: "debugRequest" },
    { phase: "post", handlerName: "debugResponse" }
]
```

### Common Debugging Scenarios

#### Issue: API returns "null" string
- **Symptom**: Response shows string "null" instead of actual data
- **Debug**: Use `post` modifier to examine `struct.dataAsString`
- **Common causes**: Wrong endpoint, missing required parameters, API rate limiting

#### Issue: 404 Not Found errors
- **Symptom**: HTTP 404 responses from API
- **Debug**: Use `pre` modifier to verify the constructed URL
- **Common causes**: Incorrect route paths, missing path parameters, API changes

#### Issue: Authentication failures
- **Symptom**: 401/403 errors or "unauthorized" responses
- **Debug**: Use `pre` modifier to check headers and API key placement
- **Common causes**: Missing API keys, wrong header names, expired credentials

#### Issue: Unexpected response format
- **Symptom**: Schema works but data structure is different than expected
- **Debug**: Use `post` modifier to examine raw response structure
- **Common causes**: API version changes, different response formats for different parameters

### Best Practices for Debugging

- **Remove debug modifiers** before committing schemas to production
- **Use descriptive console.log messages** to identify different debug points
- **Test with minimal parameters first** to isolate issues
- **Compare working vs. non-working requests** when troubleshooting
- **Check API documentation** for recent changes or rate limiting information

This documentation ensures consistent, high-quality schema development that maximizes discoverability and usability within the FlowMCP ecosystem.