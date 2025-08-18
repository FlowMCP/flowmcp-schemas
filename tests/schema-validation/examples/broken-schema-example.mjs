// ❌ BROKEN SCHEMA EXAMPLE
// This schema contains multiple intentional errors for testing the AI validator

export const schema = {
    namespace: "broken123",  // ❌ ERROR: Contains numbers (should be letters only)
    name: "Broken Example API",
    description: "An intentionally broken schema for testing validation",
    docs: ["https://example.com/docs"],
    tags: ["broken", "broken.nonExistentRoute", "broken.!getExample"],  // ❌ ERROR: nonExistentRoute doesn't exist
    flowMCP: "1.2.0.0",  // ❌ ERROR: Invalid version format (should be x.x.x)
    root: "not-a-valid-url",  // ❌ ERROR: Invalid URL format
    requiredServerParams: ["nonExistentParam"],  // ❌ ERROR: Parameter not used anywhere
    headers: {
        "content-type": "application/json"
    },
    routes: {
        getExample: {
            requestMethod: "PATCH",  // ❌ ERROR: Invalid method (should be GET or POST)
            description: "Get example data",
            route: "/api/example/:missingParam",  // ❌ ERROR: missingParam not defined in parameters
            parameters: [
                { 
                    position: { 
                        key: "validParam", 
                        value: "{{USER_PARAM}}", 
                        location: "invalid_location"  // ❌ ERROR: Invalid location (should be body, query, or insert)
                    }, 
                    z: { 
                        primitive: "invalid_primitive()",  // ❌ ERROR: Invalid primitive
                        options: ["invalid_option()"]  // ❌ ERROR: Invalid option
                    } 
                },
                {
                    position: {
                        key: "noZObject",
                        value: "{{USER_PARAM}}",
                        location: "query"
                    }
                    // ❌ ERROR: Missing z object for USER_PARAM
                }
            ],
            tests: [
                { _description: "Test with missing required param" },
                { 
                    _description: "Test with unknown param", 
                    unknownParam: "value",  // ❌ ERROR: Parameter not defined in route
                    validParam: null  // ❌ ERROR: Null value for parameter
                }
            ],
            modifiers: [
                { 
                    phase: "invalid_phase",  // ❌ ERROR: Invalid phase (should be pre, execute, or post)
                    handlerName: "nonExistentHandler"  // ❌ ERROR: Handler doesn't exist
                }
            ]
        },
        invalidRoute: {
            requestMethod: "GET",
            description: "Route missing required fields"
            // ❌ ERROR: Missing route field
            // ❌ ERROR: Missing parameters field
            // ❌ ERROR: Missing tests field
            // ❌ ERROR: Missing modifiers field
        }
        // ❌ ERROR: Missing comma after object
    },
    handlers: {
        // ❌ ERROR: Empty handlers object, but modifiers reference handlers
    }
    // ❌ ERROR: Missing comma before closing brace
}