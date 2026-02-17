// Migrated from v1.2.0 -> v2.0.0
// Category: simple
// Module-level code: 48 lines

export const main = {
    namespace: 'solanatracker',
    name: 'TokenStatsAPI',
    description: 'Provides detailed statistics for tokens and token-pool pairs over multiple time intervals.',
    version: '2.0.0',
    docs: ['https://docs.solanatracker.io'],
    tags: ['solana', 'analytics', 'tokens', 'cacheTtlFrequent'],
    root: 'https://data.solanatracker.io',
    requiredServerParams: ['SOLANA_TRACKER_API_KEY'],
    headers: {
        'x-api-key': '{{SOLANA_TRACKER_API_KEY}}',
        'Content-Type': 'application/json'
    },
    routes: {
        tokenStats: {
            method: 'GET',
            path: '/stats/:token',
            description: 'Get detailed stats for a token over various time intervals.',
            parameters: [
                { position: { key: 'token', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Test tokenStats', token: 'CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        '1m': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '5m': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '15m': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '30m': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '1h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '2h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '3h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '4h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '5h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '6h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '12h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '24h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } }
                    }
                }
            },
        },
        tokenStatsByPool: {
            method: 'GET',
            path: '/stats/:token/:pool',
            description: 'Get detailed stats for a token-pool pair over various time intervals.',
            parameters: [
                { position: { key: 'token', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'pool', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                {
                    _description: 'Test tokenStatsByPool',
                    token: 'CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump',
                    pool: '9Tb2ohu5P16BpBarqd3N27WnkF51Ukfs8Z1GzzLDxVZW'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        '5m': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '15m': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '30m': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '1h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '2h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '3h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '4h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '5h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '6h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '12h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } },
                        '24h': { type: 'object', properties: { buyers: { type: 'number' }, sellers: { type: 'number' }, volume: { type: 'object', properties: { buys: { type: 'number' }, sells: { type: 'number' }, total: { type: 'number' } } }, transactions: { type: 'number' }, buys: { type: 'number' }, sells: { type: 'number' }, wallets: { type: 'number' }, price: { type: 'number' }, priceChangePercentage: { type: 'number' } } }
                    }
                }
            },
        }
    }
}
