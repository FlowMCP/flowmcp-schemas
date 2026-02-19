export const schema = {
    namespace: 'nansen',
    name: 'Nansen Smart Money API',
    description: 'Smart money analytics with whale tracking, token netflows, DEX trades, holdings, and wallet labels via Nansen on-chain intelligence.',
    docs: ['https://docs.nansen.ai/'],
    tags: ['crypto', 'analytics', 'smartmoney', 'whale', 'onchain'],
    flowMCP: '1.2.0',
    root: 'https://api.nansen.ai/api/v1',
    requiredServerParams: ['NANSEN_API_KEY'],
    headers: {
        'apikey': '{{NANSEN_API_KEY}}',
        'Content-Type': 'application/json'
    },
    routes: {
        getSmartMoneyNetflow: {
            requestMethod: 'POST',
            description: 'Get aggregated net capital flows (inflows vs outflows) for tokens tracked by smart money wallets across chains.',
            route: '/smart-money/netflow',
            parameters: [
                { position: { key: 'chains', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: [] } },
                { position: { key: 'filters.include_smart_money_labels', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: ['optional()'] } },
                { position: { key: 'filters.include_stablecoins', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'filters.include_native_tokens', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'pagination.page', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'pagination.per_page', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get smart money netflows on Solana', chains: ['solana'] },
                { _description: 'Get fund netflows on Ethereum', chains: ['ethereum'], 'filters.include_smart_money_labels': ['Fund'] },
                { _description: 'Get smart money netflows across all chains', chains: ['all'] }
            ],
            modifiers: []
        },
        getSmartMoneyHoldings: {
            requestMethod: 'POST',
            description: 'Get aggregated smart money token holdings with 24h balance changes across chains.',
            route: '/smart-money/holdings',
            parameters: [
                { position: { key: 'chains', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: [] } },
                { position: { key: 'filters.include_smart_money_labels', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: ['optional()'] } },
                { position: { key: 'filters.include_stablecoins', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'filters.include_native_tokens', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } },
                { position: { key: 'pagination.page', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'pagination.per_page', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get smart money holdings on Ethereum', chains: ['ethereum'] },
                { _description: 'Get fund holdings across all chains', chains: ['all'], 'filters.include_smart_money_labels': ['Fund'] }
            ],
            modifiers: []
        },
        getSmartMoneyDexTrades: {
            requestMethod: 'POST',
            description: 'Get real-time DEX trading activity from smart money wallets including trade values, tokens, and trader labels.',
            route: '/smart-money/dex-trades',
            parameters: [
                { position: { key: 'chains', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: [] } },
                { position: { key: 'filters.include_smart_money_labels', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: ['optional()'] } },
                { position: { key: 'filters.token_bought_symbol', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filters.token_sold_symbol', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pagination.page', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'pagination.per_page', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'order_by', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get recent smart money DEX trades on Solana', chains: ['solana'] },
                { _description: 'Get fund DEX trades on Ethereum', chains: ['ethereum'], 'filters.include_smart_money_labels': ['Fund'] }
            ],
            modifiers: []
        },
        getAddressLabels: {
            requestMethod: 'POST',
            description: 'Get Nansen labels and tags for a specific wallet address on a given chain.',
            route: '/profiler/address/labels',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum(all,arbitrum,avalanche,base,bnb,ethereum,hyperevm,hyperliquid,iotaevm,linea,mantle,monad,optimism,plasma,polygon,ronin,scroll,sei,solana,sonic)', options: [] } },
                { position: { key: 'pagination.page', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'pagination.per_page', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Get labels for a known Ethereum wallet', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', chain: 'ethereum' },
                { _description: 'Get labels for a wallet across all chains', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', chain: 'all' }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
