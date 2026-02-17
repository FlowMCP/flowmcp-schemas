// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "x402" -> "xpayment"

export const main = {
    namespace: 'xpayment',
    name: 'x402 Experimental MCP Interface',
    description: 'Test schema for verifying free and paid route behavior under FlowMCP v1.2.0 — includes a free ping endpoint and a paid ping requiring x402 payment headers.',
    version: '2.0.0',
    docs: ['https://example.com/x402/docs'],
    tags: ['payments', 'protocol', 'micropayments', 'cacheTtlStatic'],
    root: 'https://api.x402.test/v1',
    routes: {
        free_ping: {
            method: 'GET',
            path: '/ping',
            description: 'Simple free route to verify server responsiveness via x402. Returns structured JSON response data.',
            parameters: []
        },
        paid_ping: {
            method: 'GET',
            path: '/vault/item',
            description: 'Simulated paid route to test vault access via x402. Returns structured JSON response data.',
            parameters: []
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    free_ping: {
        executeRequest: async ( { struct, payload } ) => {
            struct.data = {
            method: "free_ping",
            status: "alive",
            version: "x402-experiment",
            time: new Date().toISOString()
            };
            struct.status = true;
            return { struct }
        }
    },
    paid_ping: {
        executeRequest: async ( { struct, payload } ) => {
            struct.data = {
            method: "paid_ping",
            itemId: "XYZ00001",
            content: "Encrypted payload or structured data here",
            access_level: "licensed",
            metadata: {
            retrieved_at: new Date().toISOString(),
            source: "x402-vault-test"
            }
            };
            struct.status = true;
            return { struct }
        }
    }
} )
