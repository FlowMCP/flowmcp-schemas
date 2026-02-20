// Curve Finance — Analytics & Gauges
// Free public API, no auth required

export const main = {
    namespace: 'curve',
    name: 'Curve Finance Analytics',
    description: 'Curve Finance analytics — 24h trading volumes, base APYs, gauge CRV rewards, lending vault rates, gas prices, and weekly protocol fees.',
    version: '2.0.0',
    docs: ['https://api.curve.finance/v1/documentation'],
    tags: ['defi', 'dex', 'analytics', 'volume', 'apy', 'lending', 'cacheTtlFrequent'],
    root: 'https://api.curve.finance/v1',
    requiredServerParams: [],
    routes: {
        getVolumes: {
            method: 'GET',
            path: '/getVolumes/:blockchainId',
            description: 'Get 24h trading volumes and base APYs per pool on a chain. Preferred endpoint for volume and APY data.',
            parameters: [
                { position: { key: 'blockchainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum()', options: ['values(ethereum,polygon,arbitrum,base,optimism,fantom)'] } }
            ],
            tests: [
                { _description: 'Get volumes on Ethereum', blockchainId: 'ethereum' },
                { _description: 'Get volumes on Arbitrum', blockchainId: 'arbitrum' }
            ]
        },
        getTotalVolume: {
            method: 'GET',
            path: '/getAllPoolsVolume/:blockchainId',
            description: 'Get the total 24h trading volume and crypto pool share percentage for a chain.',
            parameters: [
                { position: { key: 'blockchainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum()', options: ['values(ethereum,polygon,arbitrum,optimism,base,bsc,avalanche,fantom,celo,harmony,aurora,kava,moonbeam,fraxtal,mantle,xdai,zkevm,zksync,x-layer,sonic,hyperliquid)'] } }
            ],
            tests: [
                { _description: 'Get total volume on Ethereum', blockchainId: 'ethereum' }
            ]
        },
        getAllGauges: {
            method: 'GET',
            path: '/getAllGauges',
            description: 'Get all Curve gauges across all chains with CRV APY, gauge data, pool addresses, and reward info.',
            parameters: [],
            tests: [
                { _description: 'Get all gauges' }
            ]
        },
        getLendingVaults: {
            method: 'GET',
            path: '/getLendingVaults/all/:lendingBlockchainId',
            description: 'Get Curve lending vaults on a chain with borrow/lend APYs, utilization, collateral info, and TVL.',
            parameters: [
                { position: { key: 'lendingBlockchainId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum()', options: ['values(ethereum,arbitrum,optimism,fraxtal,sonic)'] } }
            ],
            tests: [
                { _description: 'Get lending vaults on Ethereum', lendingBlockchainId: 'ethereum' },
                { _description: 'Get lending vaults on Arbitrum', lendingBlockchainId: 'arbitrum' }
            ]
        },
        getWeeklyFees: {
            method: 'GET',
            path: '/getWeeklyFees',
            description: 'Get historical weekly protocol fee data for Curve Finance.',
            parameters: [],
            tests: [
                { _description: 'Get weekly fee history' }
            ]
        },
        getGas: {
            method: 'GET',
            path: '/getGas',
            description: 'Get current Ethereum gas prices via Blocknative — rapid, fast, standard, slow, and EIP-1559 estimates.',
            parameters: [],
            tests: [
                { _description: 'Get current gas prices' }
            ]
        }
    }
}
