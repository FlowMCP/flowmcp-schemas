// ❌ MODERATE ERRORS EXAMPLE
// This schema has several validation errors but doesn't crash the validator

export const schema = {
    namespace: "moderateErrors123",  // ❌ ERROR: Contains numbers
    name: "Moderate Errors API",
    description: "A schema with moderate validation errors for testing",
    docs: ["https://example.com/docs"],
    tags: ["moderate", "moderateErrors123.getExample", "moderateErrors123.nonExistentRoute"],  // ❌ ERROR: nonExistentRoute doesn't exist
    flowMCP: "1.2.0.0",  // ❌ ERROR: Invalid version format
    root: "not-a-valid-url",  // ❌ ERROR: Invalid URL
    requiredServerParams: [],
    headers: {},
    routes: {
        getExample: {
            requestMethod: "PATCH",  // ❌ ERROR: Invalid method
            description: "Get example data",
            route: "/api/example",
            parameters: [
                { 
                    position: { 
                        key: "param1", 
                        value: "{{USER_PARAM}}", 
                        location: "invalid_location"  // ❌ ERROR: Invalid location
                    }, 
                    z: { 
                        primitive: "invalid_type()",  // ❌ ERROR: Invalid primitive
                        options: ["invalid_option()"]  // ❌ ERROR: Invalid option
                    } 
                }
            ],
            tests: [
                { _description: "Basic test", param1: "test" }
            ],
            modifiers: [
                { 
                    phase: "invalid_phase",  // ❌ ERROR: Invalid phase
                    handlerName: "nonExistentHandler"  // ❌ ERROR: Handler doesn't exist
                }
            ]
        }
    },
    handlers: {}
}