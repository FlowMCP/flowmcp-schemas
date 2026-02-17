// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'defillama',
    name: 'DeFi Llama MCP',
    description: 'Access DeFi protocol analytics from DeFi Llama — list all tracked protocols, get per-protocol TVL history, and query chain-level TVL aggregates.',
    version: '2.0.0',
    docs: ['https://docs.llama.fi'],
    tags: ['defi', 'tvl', 'protocols', 'cacheTtlFrequent'],
    root: 'https://api.llama.fi',
    routes: {
        getProtocols: {
            method: 'GET',
            path: '/protocols',
            description: 'Retrieve a list of all DeFi protocols from DeFi Llama (first 20) Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Test fetching protocols' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            address: { type: 'string', nullable: true },
                            symbol: { type: 'string' },
                            url: { type: 'string' },
                            description: { type: 'string' },
                            chain: { type: 'string' },
                            logo: { type: 'string' },
                            audits: { type: 'string' },
                            gecko_id: { type: 'string', nullable: true },
                            cmcId: { type: 'string', nullable: true },
                            category: { type: 'string' },
                            chains: { type: 'array', items: { type: 'string' } },
                            module: { type: 'string' },
                            twitter: { type: 'string' },
                            listedAt: { type: 'number' },
                            methodology: { type: 'string' },
                            misrepresentedTokens: { type: 'boolean' },
                            slug: { type: 'string' },
                            tvl: { type: 'number' },
                            chainTvls: { type: 'object', properties: { Fantom: { type: 'number' }, Hedera: { type: 'number' }, Sui: { type: 'number' }, Algorand: { type: 'number' }, Base: { type: 'number' }, Starknet: { type: 'number' }, Chiliz: { type: 'number' }, Op_Bnb: { type: 'number' }, Stellar: { type: 'number' }, Near: { type: 'number' }, Sonic: { type: 'number' }, Optimism: { type: 'number' }, Plasma: { type: 'number' }, 'zkSync Era': { type: 'number' }, Celo: { type: 'number' }, Scroll: { type: 'number' }, Ethereum: { type: 'number' }, Manta: { type: 'number' }, Litecoin: { type: 'number' }, Binance: { type: 'number' }, Ronin: { type: 'number' }, Polkadot: { type: 'number' }, Polygon: { type: 'number' }, Avalanche: { type: 'number' }, Arbitrum: { type: 'number' }, Tron: { type: 'number' }, Aptos: { type: 'number' }, Solana: { type: 'number' }, Bitcoin: { type: 'number' }, TON: { type: 'number' }, Ripple: { type: 'number' }, Doge: { type: 'number' } } },
                            change_1h: { type: 'number' },
                            change_1d: { type: 'number' },
                            change_7d: { type: 'number' },
                            tokenBreakdowns: { type: 'object' },
                            mcap: { type: 'number', nullable: true }
                        }
                    }
                }
            },
        },
        getProtocolTvl: {
            method: 'GET',
            path: '/protocol/:protocol',
            description: 'Get TVL data for a specific DeFi protocol via defillama — query by protocol. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'protocol', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Test Aave protocol TVL', protocol: 'aave' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        url: { type: 'string' },
                        description: { type: 'string' },
                        logo: { type: 'string' },
                        chains: { type: 'array', items: { type: 'string' } },
                        gecko_id: { type: 'string' },
                        cmcId: { type: 'string' },
                        treasury: { type: 'string' },
                        twitter: { type: 'string' },
                        governanceID: { type: 'array', items: { type: 'string' } },
                        wrongLiquidity: { type: 'boolean' },
                        github: { type: 'array', items: { type: 'string' } },
                        stablecoins: { type: 'array', items: { type: 'string' } },
                        tokenRights: { type: 'object', properties: { rights: { type: 'array', items: { type: 'object' } }, governanceData: { type: 'object', properties: { rights: { type: 'string' }, details: { type: 'string' }, feeSwitchStatus: { type: 'string' }, feeSwitchDetails: { type: 'string' } } }, holdersRevenueAndValueAccrual: { type: 'object', properties: { buybacks: { type: 'string' }, dividends: { type: 'string' }, burns: { type: 'string' }, primaryValueAccrual: { type: 'string' } } }, tokenAlignment: { type: 'object', properties: { fundraising: { type: 'string' }, raiseDetailsLink: { type: 'object' }, associatedEntities: { type: 'array', items: { type: 'string' } }, equityRevenueCapture: { type: 'string' }, equityStatement: { type: 'string' } } } } },
                        symbol: { type: 'string' },
                        address: { type: 'string' },
                        currentChainTvls: { type: 'object', properties: { 'Ethereum-staking': { type: 'number' }, 'Ethereum-pool2': { type: 'number' }, Polygon: { type: 'number' }, Ethereum: { type: 'number' }, 'Ethereum-borrowed': { type: 'number' }, Avalanche: { type: 'number' }, 'Avalanche-borrowed': { type: 'number' }, 'Polygon-borrowed': { type: 'number' }, staking: { type: 'number' }, pool2: { type: 'number' }, borrowed: { type: 'number' }, 'Fantom-borrowed': { type: 'number' }, 'Base-borrowed': { type: 'number' }, 'Soneium-borrowed': { type: 'number' }, 'Metis-borrowed': { type: 'number' }, 'Sonic-borrowed': { type: 'number' }, 'MegaETH-borrowed': { type: 'number' }, Soneium: { type: 'number' }, Base: { type: 'number' }, 'ZKsync Era-borrowed': { type: 'number' }, Fantom: { type: 'number' }, 'BSC-borrowed': { type: 'number' }, Linea: { type: 'number' }, 'Scroll-borrowed': { type: 'number' }, 'Celo-borrowed': { type: 'number' }, Sonic: { type: 'number' }, 'Arbitrum-borrowed': { type: 'number' }, 'Linea-borrowed': { type: 'number' }, MegaETH: { type: 'number' }, Scroll: { type: 'number' }, 'OP Mainnet': { type: 'number' }, Plasma: { type: 'number' }, 'Plasma-borrowed': { type: 'number' }, Arbitrum: { type: 'number' }, 'Gnosis-borrowed': { type: 'number' }, Celo: { type: 'number' }, BSC: { type: 'number' }, Metis: { type: 'number' }, Gnosis: { type: 'number' }, 'OP Mainnet-borrowed': { type: 'number' }, 'ZKsync Era': { type: 'number' }, Harmony: { type: 'number' }, 'Harmony-borrowed': { type: 'number' }, Aptos: { type: 'number' }, 'Aptos-borrowed': { type: 'number' } } },
                        chainTvls: { type: 'object', properties: { 'Ethereum-staking': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Ethereum-pool2': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Polygon: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Ethereum: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Ethereum-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Avalanche: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Avalanche-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Polygon-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, staking: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, pool2: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, borrowed: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Fantom-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Base-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Soneium-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Metis-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Sonic-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'MegaETH-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Soneium: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Base: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'ZKsync Era-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Fantom: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'BSC-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Linea: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Scroll-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Celo-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Sonic: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Arbitrum-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Linea-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, MegaETH: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Scroll: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'OP Mainnet': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Plasma: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Plasma-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Arbitrum: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Gnosis-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Celo: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, BSC: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Metis: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Gnosis: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'OP Mainnet-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'ZKsync Era': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Harmony: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Harmony-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, Aptos: { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } }, 'Aptos-borrowed': { type: 'object', properties: { tvl: { type: 'array', items: { type: 'object' } }, tokensInUsd: { type: 'string', nullable: true }, tokens: { type: 'string', nullable: true } } } } },
                        tokens: { type: 'array', items: { type: 'object', properties: { date: { type: 'number' }, tokens: { type: 'object' } } } },
                        tokensInUsd: { type: 'array', items: { type: 'object', properties: { date: { type: 'number' }, tokens: { type: 'object' } } } },
                        tvl: { type: 'array', items: { type: 'object', properties: { date: { type: 'number' }, totalLiquidityUSD: { type: 'number' } } } },
                        isParentProtocol: { type: 'boolean' },
                        raises: { type: 'array', items: { type: 'object', properties: { date: { type: 'number' }, name: { type: 'string' }, round: { type: 'string' }, amount: { type: 'number' }, chains: { type: 'array', items: { type: 'string' } }, sector: { type: 'string' }, category: { type: 'string' }, categoryGroup: { type: 'string' }, source: { type: 'string' }, leadInvestors: { type: 'array', items: { type: 'string' } }, otherInvestors: { type: 'array', items: { type: 'string' } }, valuation: { type: 'string', nullable: true }, defillamaId: { type: 'string' } } } },
                        mcap: { type: 'number' },
                        otherProtocols: { type: 'array', items: { type: 'string' } },
                        hallmarks: { type: 'array', items: { type: 'array', items: { type: 'number' } } }
                    }
                }
            },
        },
        getChainTvl: {
            method: 'GET',
            path: '/v2/historicalChainTvl/:chain',
            description: 'Retrieve historical TVL data for a specific blockchain via defillama — query by chain.',
            parameters: [
                { position: { key: 'chain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Ethereum chain TVL', chain: 'ethereum' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            date: { type: 'number' },
                            tvl: { type: 'number' }
                        }
                    }
                }
            },
        }
    }
}
