const schema = {
    namespace: 'covalenthq',
    name: 'Covalent GoldRush API',
    description: 'Covalent GoldRush API for multichain balances, transactions, token holders, and pricing data',
    docs: [ 'https://goldrush.dev/docs/api-reference/' ],
    tags: [ 'blockchain', 'balances', 'transactions', 'multichain' ],
    flowMCP: '1.2.0',
    root: 'https://api.covalenthq.com/v1',
    requiredServerParams: [ 'COVALENT_API_KEY' ],
    headers: {
        'Authorization': 'Bearer {{COVALENT_API_KEY}}'
    },
    routes: {
        getTokenBalances: {
            requestMethod: 'GET',
            description: 'Get native, ERC-20, ERC-721, and ERC-1155 token balances for a wallet address with spot prices.',
            route: '/:chainName/address/:walletAddress/balances_v2/',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("eth-mainnet")' ] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'quote-currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("USD")', 'optional()' ] } },
                { position: { key: 'no-spam', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("true")', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get Vitalik balances on Ethereum', chainName: 'eth-mainnet', walletAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
            modifiers: []
        },
        getNativeBalance: {
            requestMethod: 'GET',
            description: 'Get the native token balance for an address. Lightweight alternative to full balances endpoint.',
            route: '/:chainName/address/:walletAddress/balances_native/',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("eth-mainnet")' ] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'quote-currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("USD")', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get Vitalik native balance', chainName: 'eth-mainnet', walletAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
            modifiers: []
        },
        getTransactions: {
            requestMethod: 'GET',
            description: 'Get all transactions for a wallet address including decoded log events.',
            route: '/:chainName/address/:walletAddress/transactions_v3/page/:pageNumber/',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("eth-mainnet")' ] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'pageNumber', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("0")' ] } },
                { position: { key: 'quote-currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("USD")', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get transactions page 0', chainName: 'eth-mainnet', walletAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', pageNumber: '0' }
            ],
            modifiers: []
        },
        getErc20Transfers: {
            requestMethod: 'GET',
            description: 'Get ERC-20 token transfers for a wallet address with historical prices.',
            route: '/:chainName/address/:walletAddress/transfers_v2/',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("eth-mainnet")' ] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'contract-address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'quote-currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("USD")', 'optional()' ] } },
                { position: { key: 'page-size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [ 'min(1)', 'max(100)', 'default(100)', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get ERC-20 transfers', chainName: 'eth-mainnet', walletAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
            modifiers: []
        },
        getHistoricalPrices: {
            requestMethod: 'GET',
            description: 'Get historical token prices by contract address. Returns daily price data.',
            route: '/pricing/historical_by_addresses_v2/:chainName/USD/:contractAddress/',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("eth-mainnet")' ] } },
                { position: { key: 'contractAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } },
                { position: { key: 'to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get USDC historical prices', chainName: 'eth-mainnet', contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' }
            ],
            modifiers: []
        },
        getPortfolio: {
            requestMethod: 'GET',
            description: 'Get daily portfolio balance breakdown by token for a wallet address.',
            route: '/:chainName/address/:walletAddress/portfolio_v2/',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'default("eth-mainnet")' ] } },
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'quote-currency', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [ 'default("USD")', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Get portfolio breakdown', chainName: 'eth-mainnet', walletAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
            modifiers: []
        }
    },
    handlers: {}
}


export { schema }
