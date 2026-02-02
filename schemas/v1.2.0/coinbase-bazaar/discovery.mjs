export const schema = {
    namespace: "coinbaseBazaar",
    name: "Coinbase Bazaar x402 Discovery",
    description: "Discover x402-compatible paid resources and services available on the Coinbase Bazaar marketplace",
    docs: ["https://docs.cdp.coinbase.com/x402/bazaar", "https://www.x402.org/"],
    tags: ["payments", "marketplace", "crypto", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.cdp.coinbase.com/platform/v2/x402/discovery",
    requiredServerParams: [],
    headers: {},
    routes: {
        listResources: {
            requestMethod: "GET",
            description: "List all x402-compatible paid resources registered on Coinbase Bazaar. Optional filters: limit, offset.",
            route: "/resources",
            parameters: [
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(20)", "optional()"] } },
                { position: { key: "offset", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "List first 5 resources", limit: 5 }
            ],
            modifiers: [{ phase: "post", handlerName: "formatResourceList" }]
        }
    },
    handlers: {
        formatResourceList: async ( { struct, payload } ) => {
            try {
                const raw = struct.data
                if( !raw || !raw.items ) {
                    return { struct, payload }
                }

                const { items, pagination, x402Version } = raw

                const resources = items
                    .map( ( item ) => {
                        const accepts = ( item.accepts || [] )
                            .map( ( a ) => {
                                const result = {
                                    resource: a.resource,
                                    description: a.description,
                                    network: a.network,
                                    scheme: a.scheme,
                                    asset: a.asset,
                                    assetName: a.extra && a.extra.name,
                                    maxAmount: a.maxAmountRequired,
                                    payTo: a.payTo,
                                    mimeType: a.mimeType,
                                    maxTimeoutSeconds: a.maxTimeoutSeconds
                                }

                                return result
                            } )

                        const result = {
                            resource: item.resource,
                            type: item.type,
                            x402Version: item.x402Version,
                            lastUpdated: item.lastUpdated,
                            paymentOptions: accepts
                        }

                        return result
                    } )

                struct.data = {
                    source: "Coinbase Bazaar",
                    x402Version,
                    total: pagination && pagination.total,
                    limit: pagination && pagination.limit,
                    offset: pagination && pagination.offset,
                    resourceCount: resources.length,
                    resources
                }
            } catch( error ) {
                struct.status = false
                struct.messages.push( `Error formatting resource list: ${error.message}` )
            }

            return { struct, payload }
        }
    }
}
