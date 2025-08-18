// ✅ PERFECT SCHEMA EXAMPLE
// This schema demonstrates correct FlowMCP v1.2.0 format without any validation errors

export const schema = {
    namespace: "perfectExample",
    name: "Perfect Example API",
    description: "A perfectly valid schema demonstrating correct FlowMCP format",
    docs: ["https://api.example.com/docs"],
    tags: ["production", "perfectExample.getUser", "perfectExample.createUser"],
    flowMCP: "1.2.0",
    root: "https://api.example.com",
    requiredServerParams: ["API_KEY"],
    headers: {
        "content-type": "application/json",
        "authorization": "Bearer {{API_KEY}}"
    },
    routes: {
        getUser: {
            requestMethod: "GET",
            description: "Get user information by ID",
            route: "/users/:userId",
            parameters: [
                { 
                    position: { 
                        key: "userId", 
                        value: "{{USER_PARAM}}", 
                        location: "insert" 
                    }, 
                    z: { 
                        primitive: "string()", 
                        options: ["min(1)"] 
                    } 
                },
                { 
                    position: { 
                        key: "include_profile", 
                        value: "{{USER_PARAM}}", 
                        location: "query" 
                    }, 
                    z: { 
                        primitive: "boolean()", 
                        options: ["optional()"] 
                    } 
                }
            ],
            tests: [
                { 
                    _description: "Get user with basic info", 
                    userId: "12345" 
                },
                { 
                    _description: "Get user with profile", 
                    userId: "12345", 
                    include_profile: true 
                }
            ],
            modifiers: [
                { phase: "pre", handlerName: "validateUserAccess" },
                { phase: "execute", handlerName: "formatUserResponse" }
            ]
        },
        createUser: {
            requestMethod: "POST",
            description: "Create a new user",
            route: "/users",
            parameters: [
                { 
                    position: { 
                        key: "name", 
                        value: "{{USER_PARAM}}", 
                        location: "body" 
                    }, 
                    z: { 
                        primitive: "string()", 
                        options: ["min(2)", "max(50)"] 
                    } 
                },
                { 
                    position: { 
                        key: "email", 
                        value: "{{USER_PARAM}}", 
                        location: "body" 
                    }, 
                    z: { 
                        primitive: "string()", 
                        options: ["regex(^[^@]+@[^@]+\\.[^@]+$)"] 
                    } 
                },
                { 
                    position: { 
                        key: "age", 
                        value: "{{USER_PARAM}}", 
                        location: "body" 
                    }, 
                    z: { 
                        primitive: "number()", 
                        options: ["min(18)", "max(120)", "optional()"] 
                    } 
                }
            ],
            tests: [
                { 
                    _description: "Create user with minimal data", 
                    name: "John Doe", 
                    email: "john@example.com" 
                },
                { 
                    _description: "Create user with all data", 
                    name: "Jane Smith", 
                    email: "jane@example.com", 
                    age: 25 
                }
            ],
            modifiers: [
                { phase: "pre", handlerName: "validateUserData" },
                { phase: "execute", handlerName: "createUserInDatabase" },
                { phase: "post", handlerName: "sendWelcomeEmail" }
            ]
        }
    },
    handlers: {
        validateUserAccess: async ({ struct, payload, userParams }) => {
            // Validate user has access to requested user data
            const { userId } = userParams
            
            if( !userId || userId.length < 1 ) {
                struct.status = false
                struct.messages.push( 'Invalid user ID provided' )
                return { struct, payload }
            }
            
            return { struct, payload }
        },

        formatUserResponse: async ({ struct, payload }) => {
            try {
                const response = await fetch(payload.url, payload.options)
                if( !response.ok ) {
                    struct.status = false
                    struct.messages.push( `HTTP ${response.status}: ${response.statusText}` )
                    return { struct, payload }
                }

                const userData = await response.json()
                
                // Format the user data
                const formattedUser = {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    profile: userData.profile || {},
                    lastActive: userData.last_active,
                    joinedDate: userData.created_at
                }

                struct.data = formattedUser

            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error fetching user: ${error.message}` )
            }

            return { struct, payload }
        },

        validateUserData: async ({ struct, payload, userParams }) => {
            const { name, email, age } = userParams
            
            // Additional validation beyond z-objects
            if( email && email.includes('+') ) {
                struct.status = false
                struct.messages.push( 'Email addresses with + are not supported' )
                return { struct, payload }
            }
            
            if( age && age < 13 ) {
                struct.status = false
                struct.messages.push( 'Users must be at least 13 years old' )
                return { struct, payload }
            }
            
            return { struct, payload }
        },

        createUserInDatabase: async ({ struct, payload }) => {
            try {
                const response = await fetch(payload.url, payload.options)
                if( !response.ok ) {
                    struct.status = false
                    struct.messages.push( `HTTP ${response.status}: ${response.statusText}` )
                    return { struct, payload }
                }

                const newUser = await response.json()
                struct.data = {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    created_at: newUser.created_at,
                    status: 'created'
                }

            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error creating user: ${error.message}` )
            }

            return { struct, payload }
        },

        sendWelcomeEmail: async ({ struct, payload }) => {
            if( struct.status && struct.data ) {
                // In a real implementation, this would send a welcome email
                console.log( `Welcome email would be sent to: ${struct.data.email}` )
                
                // Add email info to response
                struct.data.welcome_email_sent = true
            }
            
            return { struct, payload }
        }
    }
}