// Curve Finance — Pool Data
// Free public API, no auth required

export const main = {
    namespace: 'curve',
    name: 'Curve Finance Pools',
    description: 'Query Curve Finance pool data across 21 EVM chains — pool details, TVL, coins, gauge info, token lists, and registry metadata.',
    version: '2.0.0',
    docs: ['https://api.curve.finance/v1/documentation'],
    tags: ['defi', 'dex', 'liquidity', 'pools', 'multichain', 'cacheTtlFrequent'],
    root: 'https://api.curve.finance/v1',
    requiredServerParams: [],
    routes: {
        getPoolsByChain: {
            method: 'GET',
            path: '/getPools/all/:blockchainId',
            description: 'Get all Curve pools on a specific chain with full details: TVL, coins, gauge rewards, virtual price, and pool metadata.',
            parameters: [
                { position: { key: 'blockchainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum()', options: ['values(ethereum,polygon,arbitrum,optimism,base,bsc,avalanche,fantom,celo,harmony,aurora,kava,moonbeam,fraxtal,mantle,xdai,zkevm,zksync,x-layer,sonic,hyperliquid)'] } }
            ],
            tests: [
                { _description: 'Get all pools on Ethereum', blockchainId: 'ethereum' },
                { _description: 'Get all pools on Arbitrum', blockchainId: 'arbitrum' }
            ]
        },
        getPoolsByRegistry: {
            method: 'GET',
            path: '/getPools/:blockchainId/:registryId',
            description: 'Get Curve pools from a specific registry on a chain. Registries: main, factory, crypto, factory-crypto, factory-crvusd, factory-twocrypto, factory-tricrypto, factory-stable-ng.',
            parameters: [
                { position: { key: 'blockchainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum()', options: ['values(ethereum,polygon,arbitrum,optimism,base,bsc,avalanche,fantom,celo,harmony,aurora,kava,moonbeam,fraxtal,mantle,xdai,zkevm,zksync,x-layer,sonic,hyperliquid)'] } },
                { position: { key: 'registryId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum()', options: ['values(main,factory,crypto,factory-crypto,factory-crvusd,factory-twocrypto,factory-tricrypto,factory-eywa,factory-stable-ng)'] } }
            ],
            tests: [
                { _description: 'Get main registry pools on Ethereum', blockchainId: 'ethereum', registryId: 'main' },
                { _description: 'Get factory pools on Polygon', blockchainId: 'polygon', registryId: 'factory' }
            ]
        },
        getBigPools: {
            method: 'GET',
            path: '/getPools/big/:blockchainId',
            description: 'Get Curve pools with TVL >= $10k on a specific chain.',
            parameters: [
                { position: { key: 'blockchainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum()', options: ['values(ethereum,polygon,arbitrum,optimism,base,bsc,avalanche,fantom,celo,harmony,aurora,kava,moonbeam,fraxtal,mantle,xdai,zkevm,zksync,x-layer,sonic,hyperliquid)'] } }
            ],
            tests: [
                { _description: 'Get big pools on Ethereum', blockchainId: 'ethereum' }
            ]
        },
        getPoolList: {
            method: 'GET',
            path: '/getPoolList/:blockchainId',
            description: 'Get a lightweight list of pool addresses grouped by type on a specific chain.',
            parameters: [
                { position: { key: 'blockchainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum()', options: ['values(ethereum,polygon,arbitrum,optimism,base,bsc,avalanche,fantom,celo,harmony,aurora,kava,moonbeam,fraxtal,mantle,xdai,zkevm,zksync,x-layer,sonic,hyperliquid)'] } }
            ],
            tests: [
                { _description: 'Get pool list on Ethereum', blockchainId: 'ethereum' }
            ]
        },
        getTokens: {
            method: 'GET',
            path: '/getTokens/all/:blockchainId',
            description: 'Get all tokens used in Curve pools (from pools with >= $10k TVL) with address, symbol, decimals, and USD price.',
            parameters: [
                { position: { key: 'blockchainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum()', options: ['values(ethereum,polygon,arbitrum,optimism,base,bsc,avalanche,fantom,celo,harmony,aurora,kava,moonbeam,fraxtal,mantle,xdai,zkevm,zksync,x-layer,sonic,hyperliquid)'] } }
            ],
            tests: [
                { _description: 'Get all tokens on Ethereum', blockchainId: 'ethereum' }
            ]
        },
        getPlatforms: {
            method: 'GET',
            path: '/getPlatforms',
            description: 'Get all supported chains and their available pool registries.',
            parameters: [],
            tests: [
                { _description: 'Get all supported platforms' }
            ]
        }
    }
}
