// Morpho Blue — Vault Data via GraphQL
// Free public API, no auth required
// Rate limit: 5,000 requests per 5 minutes

export const main = {
    namespace: 'morpho',
    name: 'Morpho Blue Vaults',
    description: 'Query Morpho Blue MetaMorpho vaults via GraphQL — vault listings with APYs and TVL, detailed vault info, and vault factory data.',
    version: '2.0.0',
    docs: ['https://docs.morpho.org/tools/offchain/api/morpho-vaults/', 'https://docs.morpho.org/tools/offchain/api/get-started/'],
    tags: ['defi', 'lending', 'morpho', 'vaults', 'multichain', 'cacheTtlFrequent'],
    root: 'https://api.morpho.org',
    requiredServerParams: [],
    routes: {
        getVaults: {
            method: 'POST',
            path: '/graphql',
            description: 'List Morpho Blue MetaMorpho vaults sorted by total assets USD. Filter by chainId. Returns APY, TVL, curator, and asset info.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum()', options: ['values(1,8453,137,10,42161)', 'default(1)'] } },
                { position: { key: 'first', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(20)'] } }
            ],
            tests: [
                { _description: 'Get top 20 vaults on Ethereum', chainId: '1', first: 20 },
                { _description: 'Get top 10 vaults on Base', chainId: '8453', first: 10 }
            ]
        },
        getVaultByAddress: {
            method: 'POST',
            path: '/graphql',
            description: 'Get detailed data for a single MetaMorpho vault by address and chain. Returns full vault state, allocations, curator info, and performance.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } },
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum()', options: ['values(1,8453,137,10,42161)', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Get Steakhouse USDC vault on Ethereum', address: '0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB', chainId: '1' }
            ]
        },
        getVaultFactories: {
            method: 'POST',
            path: '/graphql',
            description: 'List MetaMorpho vault factory contracts with their addresses and deployed vault counts.',
            parameters: [
                { position: { key: 'chainId', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'enum()', options: ['values(1,8453,137,10,42161)', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Get vault factories on Ethereum', chainId: '1' }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getVaults: {
        preRequest: async ( { struct, payload } ) => {
            const { chainId, first } = payload

            const query = `
            query GetVaults($chainId: Int!, $first: Int!) {
                vaults(
                    first: $first
                    orderBy: TotalAssetsUsd
                    orderDirection: Desc
                    where: { chainId_in: [$chainId] }
                ) {
                    items {
                        address
                        name
                        symbol
                        asset { address symbol decimals }
                        state {
                            totalAssetsUsd
                            totalAssets
                            apy
                            netApy
                            fee
                            curator { address }
                            allocation {
                                market {
                                    uniqueKey
                                    loanAsset { symbol }
                                    collateralAsset { symbol }
                                }
                                supplyAssetsUsd
                            }
                        }
                    }
                }
            }
            `

            struct.body = {
                query,
                variables: { chainId: Number( chainId ), first: Number( first ) }
            }

            return { struct }
        }
    },
    getVaultByAddress: {
        preRequest: async ( { struct, payload } ) => {
            const { address, chainId } = payload

            const query = `
            query GetVault($address: String!, $chainId: Int!) {
                vaultByAddress(address: $address, chainId: $chainId) {
                    address
                    name
                    symbol
                    asset { address symbol decimals }
                    state {
                        totalAssetsUsd
                        totalAssets
                        apy
                        netApy
                        fee
                        curator { address }
                        allocation {
                            market {
                                uniqueKey
                                loanAsset { symbol }
                                collateralAsset { symbol }
                                lltv
                                state {
                                    supplyApy
                                    borrowApy
                                    utilization
                                }
                            }
                            supplyAssets
                            supplyAssetsUsd
                            supplyCap
                        }
                    }
                    creatorAddress
                    whitelisted
                }
            }
            `

            struct.body = {
                query,
                variables: { address: address.toLowerCase(), chainId: Number( chainId ) }
            }

            return { struct }
        }
    },
    getVaultFactories: {
        preRequest: async ( { struct, payload } ) => {
            const { chainId } = payload

            const query = `
            query GetVaultFactories($chainId: Int!) {
                vaultFactories(
                    where: { chainId_in: [$chainId] }
                ) {
                    items {
                        address
                        chainId
                    }
                }
            }
            `

            struct.body = {
                query,
                variables: { chainId: Number( chainId ) }
            }

            return { struct }
        }
    }
} )
