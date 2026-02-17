// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Module-level code: 3 lines

export const main = {
    namespace: 'defillama',
    name: 'DeFi Llama Token Prices',
    description: 'Fetch current token prices across multiple chains via DeFi Llama — batch query ERC20 and native token prices by contract address with USD values.',
    version: '2.0.0',
    docs: ['https://docs.llama.fi'],
    tags: ['defi', 'prices', 'tokens', 'cacheTtlFrequent'],
    root: 'https://coins.llama.fi',
    routes: {
        getTokenPrices: {
            method: 'GET',
            path: '/prices/current/_tokenName_',
            description: 'Get current price information for a specific token via defillama. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'source', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(coingecko)', options: [] } },
                { position: { key: 'token', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {

    const sources = [
        "coingecko", /*"cmc", "defillama"*/
    ]

    return {
        getTokenPrices: {
            preRequest: async ( { struct, payload } ) => {
                const { source, token } = payload
                const tokenName = `${source}:${token}`
                struct['url'] = struct['url']
                .replace( '_tokenName_', tokenName )
                return { struct }
            }
        }
    }
}
