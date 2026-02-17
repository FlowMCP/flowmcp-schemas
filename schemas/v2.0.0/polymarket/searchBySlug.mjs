// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Module-level code: 3 lines

export const main = {
    namespace: 'polymarket',
    name: 'Fed Rate Cuts 2025',
    description: 'Access Polymarket prediction market data for Fed rate cut events via the Gamma API. Returns market outcomes, probabilities, and trading volume.',
    version: '2.0.0',
    docs: ['https://polymarket.com'],
    tags: ['prediction', 'markets', 'events', 'cacheTtlFrequent'],
    root: 'https://gamma-api.polymarket.com',
    routes: {
        searchBySlug: {
            method: 'GET',
            path: '/events/slug/:slug',
            description: 'Get market data for Fed rate cuts in 2025 by slug via Polymarket — query by slug.',
            parameters: [
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(fedRateCuts2025)', options: [] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {

    const selection = {
        fedRateCuts2025: 'how-many-fed-rate-cuts-in-2025'
    }

    return {
        searchBySlug: {
            preRequest: async ( { struct, payload } ) => {
                const key = payload.slug;
                if( selection[ key ] ) {
                struct['url'] = struct.url.replace( key, selection[ key ] )
                } else {
                throw new Error( `Selection not found.` )
                }
                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                if( !response || !response.markets ) {
                struct.status = false
                struct.messages.push( `Error` )
                return { response }}

                response = response?.markets
                .map( ( market ) => {
                const prices = JSON.parse(market.outcomePrices || "[]")
                return {
                question: market.question,
                outcomes: JSON.parse(market.outcomes || "[]"),
                prices: prices.map(p => Math.round(parseFloat(p) * 100)),
                lastTrade: Math.round(parseFloat(market.lastTradePrice || "0") * 100)
                }
                } )

                return { response }
            }
        }
    }
}
