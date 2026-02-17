// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'aave',
    name: 'AAVE Protocol API',
    description: 'Fetch and analyze liquidity and account data from AAVE v3 via The Graph subgraph',
    version: '2.0.0',
    docs: ['https://thegraph.com/explorer/subgraphs/aave/protocol-v3', 'https://docs.aave.com/developers/'],
    tags: ['defi', 'lending', 'protocol', 'cacheTtlDaily'],
    root: 'https://gateway.thegraph.com',
    requiredServerParams: ['THEGRAPH_API_KEY'],
    headers: {
        Authorization: 'Bearer {{THEGRAPH_API_KEY}}'
    },
    routes: {
        getReserves: {
            method: 'POST',
            path: '/api/{{THEGRAPH_API_KEY}}/subgraphs/id/Cd2gEDVeqnjBn1hSeqFMitw8Q1iiyV9FYUZkLNRcL87g',
            description: 'Returns AAVE reserves data including symbols, liquidity, rates, and timestamps from Ethereum mainnet.',
            parameters: [
                { position: { key: 'first', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(20)'] } }
            ],
            tests: [
                { _description: 'Fetch top 20 AAVE reserves', first: 20 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        errors: { type: 'array', items: { type: 'object', properties: { message: { type: 'string' } } } }
                    }
                }
            },
        },
        getUserData: {
            method: 'POST',
            path: '/api/{{THEGRAPH_API_KEY}}/subgraphs/id/Cd2gEDVeqnjBn1hSeqFMitw8Q1iiyV9FYUZkLNRcL87g',
            description: 'Fetches user-specific reserve data like debt and balances from AAVE subgraph. Required: userAddress, first.',
            parameters: [
                { position: { key: 'userAddress', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'first', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: ['min(1)', 'max(50)', 'default(10)'] } }
            ],
            tests: [
                { _description: 'Get user reserves data', userAddress: '0x1234567890abcdef1234567890abcdef12345678', first: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        errors: { type: 'array', items: { type: 'object', properties: { message: { type: 'string' } } } }
                    }
                }
            },
        },
        getProtocolData: {
            method: 'POST',
            path: '/api/{{THEGRAPH_API_KEY}}/subgraphs/id/Cd2gEDVeqnjBn1hSeqFMitw8Q1iiyV9FYUZkLNRcL87g',
            description: 'Get general AAVE protocol statistics and market overview. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Get protocol statistics' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        errors: { type: 'array', items: { type: 'object', properties: { message: { type: 'string' } } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getReserves: {
        preRequest: async ( { struct, payload } ) => {
            const { first } = payload;

            const query = `
            query GetReserves($first: Int!) {
            reserves(first: $first, orderBy: totalLiquidity, orderDirection: desc) {
            id
            underlyingAsset
            symbol
            name
            decimals
            totalLiquidity
            availableLiquidity
            liquidityRate
            variableBorrowRate
            stableBorrowRate
            lastUpdateTimestamp
            price {
            priceInEth
            }
            }
            }
            `;

            struct.body = {
            query,
            variables: { first }
            };

            return { struct }
        }
    },
    getUserData: {
        preRequest: async ( { struct, payload } ) => {
            const { userAddress, first } = payload;

            const query = `
            query GetUserData($userAddress: String!, $first: Int!) {
            userReserves(where: { user: $userAddress }, first: $first) {
            reserve {
            symbol
            underlyingAsset
            liquidityRate
            variableBorrowRate
            stableBorrowRate
            }
            currentATokenBalance
            currentTotalDebt
            scaledVariableDebt
            principalStableDebt
            lastUpdateTimestamp
            }
            user(id: $userAddress) {
            id
            borrowedReservesCount
            unclaimedRewards
            }
            }
            `;

            struct.body = {
            query,
            variables: { userAddress: userAddress.toLowerCase(), first }
            };

            return { struct }
        }
    },
    getProtocolData: {
        preRequest: async ( { struct, payload } ) => {
            const query = `
            query GetProtocolData {
            protocol(id: "1") {
            id
            pools
            }
            reserves(first: 5, orderBy: totalLiquidity, orderDirection: desc) {
            symbol
            totalLiquidity
            totalCurrentVariableDebt
            utilizationRate
            }
            }
            `;

            struct.body = { query };

            return { struct }
        }
    }
} )
