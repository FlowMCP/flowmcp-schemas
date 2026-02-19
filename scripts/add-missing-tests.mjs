/**
 * Add tests to v2.0.0 schemas that are missing them.
 * TST001 requires at least 1 test per route.
 *
 * Strategy:
 * 1. Dynamic import() each v2.0.0 schema
 * 2. Identify routes without tests
 * 3. Generate appropriate tests based on parameter patterns
 * 4. Text-inject into the file
 *
 * Usage:
 *   node scripts/add-missing-tests.mjs --dry-run
 *   node scripts/add-missing-tests.mjs --apply
 *   node scripts/add-missing-tests.mjs --namespace=alchemy --apply
 */

import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const args = process.argv.slice( 2 )
const dryRun = args.includes( '--dry-run' ) || !args.includes( '--apply' )
const verbose = args.includes( '--verbose' )
const nsFilter = args.find( ( a ) => a.startsWith( '--namespace=' ) )?.split( '=' )[1] || null

const V2_DIR = path.resolve( 'schemas/v2.0.0' )

// ──────────────────────────────────────────────
// Well-known PUBLIC addresses (no personal data)
// ──────────────────────────────────────────────

const USDC_ETH = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const BAYC_ETH = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'
const OPENSEA_SHARED = '0x495f947276749Ce646f68AC8c248420045cb7b5e'
const UNISWAP_ROUTER = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
const WETH_ETH = '0xC02aaA39b223FE8D0A0e5CC4764e055256e07c6f'
// Historic USDC approval tx (public, on-chain)
const KNOWN_TX_HASH = '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060'
// LUKSO Universal Profile (public contract)
const LUKSO_UP = '0x7609bF8e9DE5446dBbD1C11ef7aBe00a17B4C5bB'
// SOL wrapped token (public)
const SOL_TOKEN = 'So11111111111111111111111111111111111111112'
// BONK token (public, well-known meme coin)
const BONK_TOKEN = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'
// Raydium SOL-USDC pool (public)
const RAYDIUM_POOL = '58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2'

// Sample OHLCV data for indicators (20 periods, plausible price action)
const SAMPLE_CLOSINGS = '100,102,101,103,105,104,106,108,107,109,111,110,112,114,113,115,117,116,118,120'
const SAMPLE_HIGHS = '101,103,102,104,106,105,107,109,108,110,112,111,113,115,114,116,118,117,119,121'
const SAMPLE_LOWS = '99,101,100,102,104,103,105,107,106,108,110,109,111,113,112,114,116,115,117,119'
const SAMPLE_VOLUMES = '1000,1200,900,1100,1300,800,1000,1400,900,1200,1100,1000,1300,1500,800,1200,1000,1100,900,1400'
const SAMPLE_OPENINGS = '100,101,102,102,104,105,105,107,108,108,110,111,111,113,114,114,116,117,117,119'


// ──────────────────────────────────────────────
// Test definitions per namespace/file/route
// ──────────────────────────────────────────────

const TEST_DEFS = {
    // ── ALCHEMY ──
    'alchemy/contract-read-part1.mjs': {
        readContract: [
            { _description: 'Read USDC name() on Ethereum', chain: 'ETHEREUM_MAINNET', address: USDC_ETH, functionSignature: 'function name() view returns (string)' },
            { _description: 'Read USDC decimals() on Polygon', chain: 'POLYGON_MAINNET', address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', functionSignature: 'function decimals() view returns (uint8)' }
        ],
        erc20TokenInfo: [
            { _description: 'Get USDC token info on Ethereum', chain: 'ETHEREUM_MAINNET', contractAddress: USDC_ETH },
            { _description: 'Get WETH token info on Arbitrum', chain: 'ARBITRUM_ONE_MAINNET', contractAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1' }
        ],
        erc20BalanceOf: [
            { _description: 'Get USDC balance of Uniswap Router on Ethereum', chain: 'ETHEREUM_MAINNET', contractAddress: USDC_ETH, walletAddress: UNISWAP_ROUTER }
        ],
        erc20Allowance: [
            { _description: 'Check USDC allowance from WETH to Uniswap Router', chain: 'ETHEREUM_MAINNET', contractAddress: USDC_ETH, owner: WETH_ETH, spender: UNISWAP_ROUTER }
        ],
        erc721TokenInfo: [
            { _description: 'Get BAYC NFT collection info on Ethereum', chain: 'ETHEREUM_MAINNET', contractAddress: BAYC_ETH }
        ],
        erc721OwnerOf: [
            { _description: 'Get owner of BAYC token #1 on Ethereum', chain: 'ETHEREUM_MAINNET', contractAddress: BAYC_ETH, tokenId: '1' }
        ],
        erc721TokenURI: [
            { _description: 'Get metadata URI of BAYC token #1', chain: 'ETHEREUM_MAINNET', contractAddress: BAYC_ETH, tokenId: '1' }
        ],
        erc721BalanceOf: [
            { _description: 'Get BAYC balance of Uniswap Router on Ethereum', chain: 'ETHEREUM_MAINNET', contractAddress: BAYC_ETH, walletAddress: UNISWAP_ROUTER }
        ]
    },
    'alchemy/contract-read-part2.mjs': {
        erc1155BalanceOf: [
            { _description: 'Get ERC-1155 balance on OpenSea Shared Storefront', chain: 'ETHEREUM_MAINNET', contractAddress: OPENSEA_SHARED, walletAddress: UNISWAP_ROUTER, tokenId: '1' }
        ],
        erc1155Uri: [
            { _description: 'Get ERC-1155 metadata URI on OpenSea Shared', chain: 'ETHEREUM_MAINNET', contractAddress: OPENSEA_SHARED, tokenId: '1' }
        ]
    },
    'alchemy/node-read-part1.mjs': {
        getBlockNumber: [
            { _description: 'Get latest block number on Ethereum', chain: 'ETHEREUM_MAINNET' },
            { _description: 'Get latest block number on Base', chain: 'BASE_MAINNET' }
        ],
        getBalance: [
            { _description: 'Get ETH balance of USDC contract', chain: 'ETHEREUM_MAINNET', address: USDC_ETH }
        ],
        getGasPrice: [
            { _description: 'Get current gas price on Ethereum', chain: 'ETHEREUM_MAINNET' },
            { _description: 'Get current gas price on Polygon', chain: 'POLYGON_MAINNET' }
        ],
        getBlock: [
            { _description: 'Get Ethereum block 17000000 details', chain: 'ETHEREUM_MAINNET', blockNumber: 17000000 }
        ],
        getCode: [
            { _description: 'Check if USDC address is a contract', chain: 'ETHEREUM_MAINNET', address: USDC_ETH }
        ],
        getTransactionCount: [
            { _description: 'Get nonce of USDC contract on Ethereum', chain: 'ETHEREUM_MAINNET', address: USDC_ETH }
        ],
        getTransactionByHash: [
            { _description: 'Get historic Ethereum transaction details', chain: 'ETHEREUM_MAINNET', txHash: KNOWN_TX_HASH }
        ],
        getTransactionReceipt: [
            { _description: 'Get receipt of historic Ethereum transaction', chain: 'ETHEREUM_MAINNET', txHash: KNOWN_TX_HASH }
        ]
    },
    'alchemy/node-read-part2.mjs': {
        getLogs: [
            { _description: 'Get USDC Transfer logs in 10-block range', chain: 'ETHEREUM_MAINNET', address: USDC_ETH, fromBlock: 17000000, toBlock: 17000010 }
        ]
    },

    // ── INFURA (same routes as Alchemy) ──
    'infura/contract-read-part1.mjs': {
        readContract: [
            { _description: 'Read USDC name() on Ethereum via Infura', chain: 'ETHEREUM_MAINNET', address: USDC_ETH, functionSignature: 'function name() view returns (string)' }
        ],
        erc20TokenInfo: [
            { _description: 'Get USDC token info on Ethereum via Infura', chain: 'ETHEREUM_MAINNET', contractAddress: USDC_ETH }
        ],
        erc20BalanceOf: [
            { _description: 'Get USDC balance of Uniswap Router via Infura', chain: 'ETHEREUM_MAINNET', contractAddress: USDC_ETH, walletAddress: UNISWAP_ROUTER }
        ],
        erc20Allowance: [
            { _description: 'Check USDC allowance via Infura', chain: 'ETHEREUM_MAINNET', contractAddress: USDC_ETH, owner: WETH_ETH, spender: UNISWAP_ROUTER }
        ],
        erc721TokenInfo: [
            { _description: 'Get BAYC collection info via Infura', chain: 'ETHEREUM_MAINNET', contractAddress: BAYC_ETH }
        ],
        erc721OwnerOf: [
            { _description: 'Get owner of BAYC #1 via Infura', chain: 'ETHEREUM_MAINNET', contractAddress: BAYC_ETH, tokenId: '1' }
        ],
        erc721TokenURI: [
            { _description: 'Get BAYC #1 metadata URI via Infura', chain: 'ETHEREUM_MAINNET', contractAddress: BAYC_ETH, tokenId: '1' }
        ],
        erc721BalanceOf: [
            { _description: 'Get BAYC balance via Infura', chain: 'ETHEREUM_MAINNET', contractAddress: BAYC_ETH, walletAddress: UNISWAP_ROUTER }
        ]
    },
    'infura/contract-read-part2.mjs': {
        erc1155BalanceOf: [
            { _description: 'Get ERC-1155 balance via Infura', chain: 'ETHEREUM_MAINNET', contractAddress: OPENSEA_SHARED, walletAddress: UNISWAP_ROUTER, tokenId: '1' }
        ],
        erc1155Uri: [
            { _description: 'Get ERC-1155 URI via Infura', chain: 'ETHEREUM_MAINNET', contractAddress: OPENSEA_SHARED, tokenId: '1' }
        ]
    },
    'infura/node-read-part1.mjs': {
        getBlockNumber: [
            { _description: 'Get latest block on Ethereum via Infura', chain: 'ETHEREUM_MAINNET' }
        ],
        getBalance: [
            { _description: 'Get ETH balance of USDC contract via Infura', chain: 'ETHEREUM_MAINNET', address: USDC_ETH }
        ],
        getGasPrice: [
            { _description: 'Get gas price on Ethereum via Infura', chain: 'ETHEREUM_MAINNET' }
        ],
        getBlock: [
            { _description: 'Get block 17000000 via Infura', chain: 'ETHEREUM_MAINNET', blockNumber: 17000000 }
        ],
        getCode: [
            { _description: 'Check USDC bytecode via Infura', chain: 'ETHEREUM_MAINNET', address: USDC_ETH }
        ],
        getTransactionCount: [
            { _description: 'Get USDC nonce via Infura', chain: 'ETHEREUM_MAINNET', address: USDC_ETH }
        ],
        getTransactionByHash: [
            { _description: 'Get transaction details via Infura', chain: 'ETHEREUM_MAINNET', txHash: KNOWN_TX_HASH }
        ],
        getTransactionReceipt: [
            { _description: 'Get transaction receipt via Infura', chain: 'ETHEREUM_MAINNET', txHash: KNOWN_TX_HASH }
        ]
    },
    'infura/node-read-part2.mjs': {
        getLogs: [
            { _description: 'Get USDC logs in 10-block range via Infura', chain: 'ETHEREUM_MAINNET', address: USDC_ETH, fromBlock: 17000000, toBlock: 17000010 }
        ]
    },

    // ── CHAINLINK ──
    'chainlink/getLatestPrices-part1.mjs': {
        getAvailableChains: [
            { _description: 'List all supported Chainlink chains' }
        ],
        getAvailableFeedsForChain: [
            { _description: 'List Chainlink feeds on Ethereum', chainName: 'ETHEREUM_MAINNET' },
            { _description: 'List Chainlink feeds on Polygon', chainName: 'POLYGON_MAINNET' }
        ],
        getLatestPriceEthereum: [
            { _description: 'Get ETH/USD price on Ethereum', feedName: 'ETH/USD' },
            { _description: 'Get BTC/USD price on Ethereum', feedName: 'BTC/USD' }
        ],
        getLatestPriceBinance: [
            { _description: 'Get BTC/USD price on BSC', feedName: 'BTC/USD' },
            { _description: 'Get ETH/USD price on BSC', feedName: 'ETH/USD' }
        ],
        getLatestPricePolygon: [
            { _description: 'Get ETH/USD price on Polygon', feedName: 'ETH/USD' }
        ],
        getLatestPriceAvalanche: [
            { _description: 'Get AVAX/USD price on Avalanche', feedName: 'AVAX/USD' }
        ],
        getLatestPriceAribitrum: [
            { _description: 'Get ETH/USD price on Arbitrum', feedName: 'ETH/USD' },
            { _description: 'Get ARB/USD price on Arbitrum', feedName: 'ARB/USD' }
        ],
        getLatestPriceOptimism: [
            { _description: 'Get ETH/USD price on Optimism', feedName: 'ETH/USD' }
        ]
    },
    'chainlink/getLatestPrices-part2.mjs': {
        getLatestPriceBase: [
            { _description: 'Get ETH/USD price on Base', feedName: 'ETH/USD' }
        ],
        getLatestPriceLinea: [
            { _description: 'Get ETH/USD price on Linea', feedName: 'ETH/USD' }
        ],
        getLatestPriceMantle: [
            { _description: 'Get ETH/USD price on Mantle', feedName: 'ETH/USD' }
        ],
        getLatestPriceScroll: [
            { _description: 'Get ETH/USD price on Scroll', feedName: 'ETH/USD' }
        ],
        getLatestPriceZksync: [
            { _description: 'Get ETH/USD price on zkSync', feedName: 'ETH/USD' }
        ],
        getLatestPriceCelo: [
            { _description: 'Get CELO/USD price on Celo', feedName: 'CELO/USD' }
        ]
    },
    'chainlink/getLatestPricesMulticall-part1.mjs': {
        getAvailableChains: [
            { _description: 'List all chains for multicall price feeds' }
        ],
        getAllLatestPricesEthereum: [
            { _description: 'Get all latest Chainlink prices on Ethereum' }
        ],
        getAllLatestPricesBinance: [
            { _description: 'Get all latest Chainlink prices on BSC' }
        ],
        getAllLatestPricesPolygon: [
            { _description: 'Get all latest Chainlink prices on Polygon' }
        ],
        getAllLatestPricesAvalanche: [
            { _description: 'Get all latest Chainlink prices on Avalanche' }
        ],
        getAllLatestPricesAribitrum: [
            { _description: 'Get all latest Chainlink prices on Arbitrum' }
        ],
        getAllLatestPricesOptimism: [
            { _description: 'Get all latest Chainlink prices on Optimism' }
        ],
        getAllLatestPricesBase: [
            { _description: 'Get all latest Chainlink prices on Base' }
        ]
    },
    'chainlink/getLatestPricesMulticall-part2.mjs': {
        getAllLatestPricesLinea: [
            { _description: 'Get all latest Chainlink prices on Linea' }
        ],
        getAllLatestPricesMantle: [
            { _description: 'Get all latest Chainlink prices on Mantle' }
        ],
        getAllLatestPricesScroll: [
            { _description: 'Get all latest Chainlink prices on Scroll' }
        ],
        getAllLatestPricesZksync: [
            { _description: 'Get all latest Chainlink prices on zkSync' }
        ],
        getAllLatestPricesCelo: [
            { _description: 'Get all latest Chainlink prices on Celo' }
        ]
    },

    // ── COINSTATS ──
    'coinstats/mixed-part1.mjs': {
        getCoins: [
            { _description: 'List top coins by default sorting', limit: 10 },
            { _description: 'Search coins by name', name: 'bitcoin', limit: 5 }
        ],
        getCoinById: [
            { _description: 'Get Bitcoin details', coinId: 'bitcoin' },
            { _description: 'Get Ethereum details in EUR', coinId: 'ethereum', currency: 'EUR' }
        ],
        getCoinChartById: [
            { _description: 'Get Bitcoin 24h chart', coinId: 'bitcoin', period: '24h' },
            { _description: 'Get Ethereum 1-week chart', coinId: 'ethereum', period: '1w' }
        ],
        getCoinAvgPrice: [
            { _description: 'Get Bitcoin avg price on Jan 1 2024', coinId: 'bitcoin', timestamp: 1704067200 }
        ],
        getCoinExchangePrice: [
            { _description: 'Get Bitcoin exchange price on Binance', coinId: 'bitcoin', exchange: 'binance' }
        ],
        getTickerExchanges: [
            { _description: 'Get exchanges listing Bitcoin', coinId: 'bitcoin' }
        ],
        getTickerMarkets: [
            { _description: 'Get BTC trading pairs on Binance', coinId: 'bitcoin', exchange: 'binance' }
        ],
        getBlockchains: [
            { _description: 'List all supported blockchains' }
        ]
    },
    'coinstats/mixed-part2.mjs': {
        getWalletBalance: [
            { _description: 'Get wallet balance on Ethereum', address: USDC_ETH, connectionId: 'ethereum' }
        ],
        getWalletBalances: [
            { _description: 'Get wallet balances on all networks', address: USDC_ETH }
        ],
        getExchanges: [
            { _description: 'List all supported exchange connections' }
        ],
        getFiatCurrencies: [
            { _description: 'List all supported fiat currencies' }
        ],
        getNewsSources: [
            { _description: 'List all crypto news sources' }
        ],
        getNews: [
            { _description: 'Get latest crypto news', limit: 5 }
        ],
        getNewsByType: [
            { _description: 'Get trending crypto news', type: 'trending', limit: 5 },
            { _description: 'Get bullish crypto news', type: 'bullish', limit: 5 }
        ],
        getNewsById: [
            { _description: 'Get news article by ID', id: '1' }
        ]
    },
    'coinstats/mixed-part3.mjs': {
        getMarketCap: [
            { _description: 'Get global crypto market data' }
        ],
        getCurrencies: [
            { _description: 'List all supported currencies' }
        ]
    },

    // ── ETHSCRIPTIONS ──
    'ethscriptions-com/ethscriptions-api-part1.mjs': {
        listEthscriptions: [
            { _description: 'List latest ethscriptions', max_results: 5 },
            { _description: 'Filter ethscriptions by mimetype', mimetype: 'text/plain', max_results: 5 }
        ],
        getEthscription: [
            { _description: 'Get ethscription #1 details', id: '1' }
        ],
        getEthscriptionData: [
            { _description: 'Get raw data of ethscription #1', id: '1' }
        ],
        getEthscriptionAttachment: [
            { _description: 'Get attachment of ethscription #1', id: '1' }
        ],
        checkEthscriptionExists: [
            { _description: 'Check ethscription existence by SHA', sha: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2' }
        ],
        checkMultipleEthscriptionsExistence: [
            { _description: 'Check multiple ethscription SHAs', shas: ['a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2'] }
        ],
        listTransfers: [
            { _description: 'List recent ethscription transfers', max_results: 5 }
        ],
        listTokens: [
            { _description: 'List ethscription tokens', max_results: 5 }
        ]
    },
    'ethscriptions-com/ethscriptions-api-part2.mjs': {
        getTokenDetails: [
            { _description: 'Get erc-20 ETHS token details', protocol: 'erc-20', tick: 'eths' }
        ],
        getTokenHistoricalState: [
            { _description: 'Get ETHS token state at block 18000000', protocol: 'erc-20', tick: 'eths', as_of_block: 18000000 }
        ],
        getIndexerStatus: [
            { _description: 'Get ethscriptions indexer status' }
        ]
    },

    // ── LUKSO ──
    'lukso-network/address-part1.mjs': {
        listAddresses: [
            { _description: 'List LUKSO mainnet coin holders', chainName: 'LUKSO_MAINNET' }
        ],
        getAddress: [
            { _description: 'Get LUKSO Universal Profile info', chainName: 'LUKSO_MAINNET', address_hash: LUKSO_UP }
        ],
        getAddressCounters: [
            { _description: 'Get address usage counters on LUKSO', chainName: 'LUKSO_MAINNET', address_hash: LUKSO_UP }
        ],
        getAddressTransactions: [
            { _description: 'Get transactions for LUKSO address', chainName: 'LUKSO_MAINNET', address_hash: LUKSO_UP }
        ],
        getAddressTokenTransfers: [
            { _description: 'Get token transfers for LUKSO address', chainName: 'LUKSO_MAINNET', address_hash: LUKSO_UP }
        ],
        getAddressInternalTxs: [
            { _description: 'Get internal txs for LUKSO address', chainName: 'LUKSO_MAINNET', address_hash: LUKSO_UP }
        ],
        getAddressLogs: [
            { _description: 'Get logs for LUKSO address', chainName: 'LUKSO_MAINNET', address_hash: LUKSO_UP }
        ],
        getBlocksValidated: [
            { _description: 'Get blocks validated by LUKSO address', chainName: 'LUKSO_MAINNET', address_hash: LUKSO_UP }
        ]
    },
    'lukso-network/address-part2.mjs': {
        getTokenBalances: [
            { _description: 'Get token balances on LUKSO mainnet', chainName: 'LUKSO_MAINNET', address_hash: LUKSO_UP }
        ],
        getFlatTokenBalances: [
            { _description: 'Get flat token balances on LUKSO', chainName: 'LUKSO_MAINNET', address_hash: LUKSO_UP }
        ],
        getCoinBalanceHistory: [
            { _description: 'Get LYX balance history on LUKSO', chainName: 'LUKSO_MAINNET', address_hash: LUKSO_UP }
        ],
        getCoinBalanceByDay: [
            { _description: 'Get daily LYX balance on LUKSO', chainName: 'LUKSO_MAINNET', address_hash: LUKSO_UP }
        ]
    },

    // ── SOLANA TRACKER ──
    'solanatracker-io/--tokenEndpoints-part1.mjs': {
        tokenInformation: [
            { _description: 'Get SOL wrapped token info', tokenAddress: SOL_TOKEN },
            { _description: 'Get BONK token info', tokenAddress: BONK_TOKEN }
        ],
        tokenHolders: [
            { _description: 'Get top 100 BONK holders', tokenAddress: BONK_TOKEN }
        ],
        topTokenHolders: [
            { _description: 'Get top 20 BONK holders', tokenAddress: BONK_TOKEN }
        ],
        allTimeHighPrice: [
            { _description: 'Get BONK all-time high price', tokenAddress: BONK_TOKEN }
        ],
        tokensByDeployer: [
            { _description: 'Get tokens deployed by Raydium', wallet: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8' }
        ],
        search: [
            { _description: 'Search for BONK token', query: 'bonk', limit: 5 },
            { _description: 'Search with liquidity filter', query: 'sol', minLiquidity: 10000, limit: 5 }
        ],
        latestTokens: [
            { _description: 'Get latest 100 Solana tokens' }
        ],
        multipleTokens: [
            { _description: 'Get info for SOL and BONK tokens', tokens: `${SOL_TOKEN},${BONK_TOKEN}` }
        ]
    },
    'solanatracker-io/--tokenEndpoints-part2.mjs': {
        trendingTokens: [
            { _description: 'Get top 100 trending Solana tokens' }
        ],
        tokensByVolume: [
            { _description: 'Get top 100 Solana tokens by volume' }
        ],
        tokenOverview: [
            { _description: 'Get overview of latest and graduated tokens' }
        ],
        graduatedTokens: [
            { _description: 'Get all graduated tokens' }
        ],
        tokenByPool: [
            { _description: 'Get token by Raydium SOL-USDC pool', poolAddress: RAYDIUM_POOL }
        ],
        trendingTokensByTimeframe: [
            { _description: 'Get trending tokens in last 24h', timeframe: '24h' },
            { _description: 'Get trending tokens in last 5 minutes', timeframe: '5m' }
        ],
        tokensByVolumeTimeframe: [
            { _description: 'Get tokens by volume in last 24h', timeframe: '24h' }
        ]
    },

    // ── TAAPI ──
    'taapi/indicators-part1.mjs': {
        getRSI: [
            { _description: 'Get BTC/USDT RSI on Binance (1h)', symbol: 'BTC/USDT' },
            { _description: 'Get ETH/USDT RSI on daily timeframe', symbol: 'ETH/USDT', interval: '1d' }
        ],
        getMACD: [
            { _description: 'Get BTC/USDT MACD on Binance', symbol: 'BTC/USDT' },
            { _description: 'Get ETH/USDT MACD on 4h timeframe', symbol: 'ETH/USDT', interval: '4h' }
        ],
        getBollingerBands: [
            { _description: 'Get BTC/USDT Bollinger Bands', symbol: 'BTC/USDT' }
        ],
        getEMA: [
            { _description: 'Get BTC/USDT 20-period EMA', symbol: 'BTC/USDT' },
            { _description: 'Get ETH/USDT 50-period EMA', symbol: 'ETH/USDT', optInTimePeriod: 50 }
        ],
        getSMA: [
            { _description: 'Get BTC/USDT 20-period SMA', symbol: 'BTC/USDT' },
            { _description: 'Get BTC/USDT 200-period SMA daily', symbol: 'BTC/USDT', optInTimePeriod: 200, interval: '1d' }
        ],
        getStochastic: [
            { _description: 'Get BTC/USDT Stochastic oscillator', symbol: 'BTC/USDT' }
        ],
        getATR: [
            { _description: 'Get BTC/USDT Average True Range', symbol: 'BTC/USDT' }
        ],
        getStochRSI: [
            { _description: 'Get BTC/USDT Stochastic RSI', symbol: 'BTC/USDT' }
        ]
    },
    'taapi/indicators-part2.mjs': {
        getVWAP: [
            { _description: 'Get BTC/USDT VWAP', symbol: 'BTC/USDT' }
        ],
        getIchimoku: [
            { _description: 'Get BTC/USDT Ichimoku Cloud', symbol: 'BTC/USDT' },
            { _description: 'Get ETH/USDT Ichimoku on daily', symbol: 'ETH/USDT', interval: '1d' }
        ]
    }
}


// ──────────────────────────────────────────────
// Indicator test generator (78 routes, 10 files)
// ──────────────────────────────────────────────

function generateIndicatorTests( { routeName, parameters } ) {
    const paramKeys = parameters.map( ( p ) => p.position.key )
    const test = { _description: `Compute ${routeName} with sample OHLCV data` }

    // Map parameter keys to sample data
    paramKeys
        .forEach( ( key ) => {
            if ( key === 'closings' || key === 'values' ) { test[key] = SAMPLE_CLOSINGS }
            else if ( key === 'highs' ) { test[key] = SAMPLE_HIGHS }
            else if ( key === 'lows' ) { test[key] = SAMPLE_LOWS }
            else if ( key === 'volumes' ) { test[key] = SAMPLE_VOLUMES }
            else if ( key === 'openings' ) { test[key] = SAMPLE_OPENINGS }
            else if ( key === 'asset' ) {
                test[key] = JSON.stringify( {
                    closings: SAMPLE_CLOSINGS.split( ',' ).map( Number ),
                    highs: SAMPLE_HIGHS.split( ',' ).map( Number ),
                    lows: SAMPLE_LOWS.split( ',' ).map( Number ),
                    openings: SAMPLE_OPENINGS.split( ',' ).map( Number ),
                    volumes: SAMPLE_VOLUMES.split( ',' ).map( Number )
                } )
            }
            // Skip params with defaults (period, fast, slow, multiplier, etc.)
        } )

    return [test]
}


// ──────────────────────────────────────────────
// Injection logic (reused from migrate-tests-to-v2.mjs)
// ──────────────────────────────────────────────

function serializeTest( { testObj, indent } ) {
    const entries = Object.entries( testObj )
        .map( ( [ key, value ] ) => {
            const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test( key ) ? key : `'${key}'`
            if ( typeof value === 'string' ) {
                return `${safeKey}: '${value.replace( /'/g, "\\'" )}'`
            }
            if ( Array.isArray( value ) ) {
                const items = value.map( ( v ) => typeof v === 'string' ? `'${v}'` : String( v ) )
                return `${safeKey}: [${items.join( ', ' )}]`
            }
            if ( typeof value === 'object' && value !== null ) {
                return `${safeKey}: ${JSON.stringify( value )}`
            }
            return `${safeKey}: ${value}`
        } )

    const singleLine = `{ ${entries.join( ', ' )} }`
    if ( singleLine.length <= 120 ) {
        return `${indent}${singleLine}`
    }

    const inner = entries
        .map( ( e ) => `${indent}    ${e}` )
        .join( ',\n' )
    return `${indent}{\n${inner}\n${indent}}`
}


function buildTestsBlock( { tests, routeIndent } ) {
    const testIndent = routeIndent + '    '
    const serialized = tests
        .map( ( testObj ) => serializeTest( { testObj, indent: testIndent } ) )
        .join( ',\n' )

    return `${routeIndent}tests: [\n${serialized}\n${routeIndent}],`
}


function findInjectionPoint( { content, routeName } ) {
    const routePattern = `${routeName}: {`
    const routeIdx = content.indexOf( routePattern )
    if ( routeIdx === -1 ) {
        return { idx: -1, reason: 'route not found' }
    }

    const afterRoute = routeIdx + routeName.length
    const nextRouteMatch = content.slice( afterRoute ).match( /\n {8}\w+: \{/ )
    const boundary = nextRouteMatch
        ? afterRoute + nextRouteMatch.index
        : content.length
    const routeSlice = content.slice( routeIdx, boundary )

    if ( routeSlice.includes( 'tests:' ) ) {
        return { idx: -1, reason: 'already has tests' }
    }

    // Find end of parameters block
    const paramsIdx = routeSlice.indexOf( 'parameters:' )
    if ( paramsIdx !== -1 ) {
        const absParamsIdx = routeIdx + paramsIdx
        const bracketStart = content.indexOf( '[', absParamsIdx )
        const bracketEnd = findMatchingBracket( { content, startIdx: bracketStart } )
        if ( bracketEnd !== -1 ) {
            return { idx: bracketEnd + 1 }
        }
    }

    // Find end of output block
    const outputIdx = routeSlice.indexOf( 'output:' )
    if ( outputIdx !== -1 ) {
        const absOutputIdx = routeIdx + outputIdx
        const braceStart = content.indexOf( '{', absOutputIdx )
        const braceEnd = findMatchingBrace( { content, startIdx: braceStart } )
        if ( braceEnd !== -1 ) {
            return { idx: braceEnd + 1 }
        }
    }

    return { idx: -1, reason: 'no injection point' }
}


function findMatchingBrace( { content, startIdx } ) {
    let depth = 0
    let idx = startIdx
    while ( idx < content.length ) {
        if ( content[idx] === '{' ) { depth++ }
        if ( content[idx] === '}' ) {
            depth--
            if ( depth === 0 ) { return idx }
        }
        if ( content[idx] === "'" ) {
            idx++
            while ( idx < content.length && content[idx] !== "'" ) {
                if ( content[idx] === '\\' ) { idx++ }
                idx++
            }
        }
        idx++
    }
    return -1
}


function findMatchingBracket( { content, startIdx } ) {
    let depth = 0
    let idx = startIdx
    while ( idx < content.length ) {
        if ( content[idx] === '[' ) { depth++ }
        if ( content[idx] === ']' ) {
            depth--
            if ( depth === 0 ) { return idx }
        }
        if ( content[idx] === "'" ) {
            idx++
            while ( idx < content.length && content[idx] !== "'" ) {
                if ( content[idx] === '\\' ) { idx++ }
                idx++
            }
        }
        idx++
    }
    return -1
}


// ──────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────

console.log( `\nFlowMCP Add Missing Tests` )
console.log( `Mode: ${dryRun ? 'DRY-RUN' : 'APPLY'}` )
if ( nsFilter ) { console.log( `Filter: ${nsFilter}` ) }
console.log( '' )

const stats = {
    filesScanned: 0,
    filesModified: 0,
    routesAdded: 0,
    routesSkipped: 0,
    testsTotal: 0,
    errors: []
}

const namespaces = fs.readdirSync( V2_DIR )
    .filter( ( d ) => !d.startsWith( '_' ) && !d.startsWith( '.' ) )
    .filter( ( d ) => fs.statSync( path.join( V2_DIR, d ) ).isDirectory() )
    .filter( ( d ) => !nsFilter || d === nsFilter )

const processFiles = async () => {
    await namespaces.reduce( ( chain, namespace ) => chain.then( async () => {
        const nsDir = path.join( V2_DIR, namespace )
        const files = fs.readdirSync( nsDir )
            .filter( ( f ) => f.endsWith( '.mjs' ) )

        await files.reduce( ( fileChain, fileName ) => fileChain.then( async () => {
            const relPath = `${namespace}/${fileName}`
            const filePath = path.join( nsDir, fileName )
            stats.filesScanned++

            // Dynamic import to get schema
            let schema
            try {
                const mod = await import( pathToFileURL( filePath ).href )
                schema = mod.main || mod.default
            } catch ( e ) {
                stats.errors.push( `${relPath}: import failed — ${e.message}` )
                return
            }

            if ( !schema || !schema.routes ) { return }

            // Find routes without tests
            const routesWithoutTests = Object.entries( schema.routes )
                .filter( ( [ , route ] ) => !route.tests || !Array.isArray( route.tests ) || route.tests.length === 0 )
                .map( ( [ routeName, route ] ) => ( { routeName, route } ) )

            if ( routesWithoutTests.length === 0 ) { return }

            // Check if we have test definitions
            const isIndicator = namespace === 'indicators'
            const fileDefs = TEST_DEFS[relPath] || {}

            let v2Content = fs.readFileSync( filePath, 'utf-8' )
            let injectedCount = 0

            routesWithoutTests
                .forEach( ( { routeName, route } ) => {
                    // Get tests from definitions or generate for indicators
                    let tests
                    if ( fileDefs[routeName] ) {
                        tests = fileDefs[routeName]
                    } else if ( isIndicator ) {
                        tests = generateIndicatorTests( { routeName, parameters: route.parameters || [] } )
                    } else {
                        if ( verbose ) { console.log( `    NO DEF: ${relPath} → ${routeName}` ) }
                        stats.routesSkipped++
                        return
                    }

                    const { idx, reason } = findInjectionPoint( { content: v2Content, routeName } )
                    if ( idx === -1 ) {
                        if ( verbose ) { console.log( `    ${reason}: ${routeName}` ) }
                        stats.routesSkipped++
                        return
                    }

                    const testsBlock = buildTestsBlock( { tests, routeIndent: '            ' } )
                    const before = v2Content.slice( 0, idx )
                    const trimmedBefore = before.trimEnd()
                    const needsComma = !trimmedBefore.endsWith( ',' )
                    const prefix = needsComma ? ',\n' : '\n'
                    v2Content = before + prefix + testsBlock + v2Content.slice( idx )

                    injectedCount++
                    stats.routesAdded++
                    stats.testsTotal += tests.length
                } )

            if ( injectedCount > 0 ) {
                if ( !dryRun ) {
                    fs.writeFileSync( filePath, v2Content )
                    stats.filesModified++
                }
                console.log( `  ${dryRun ? 'WOULD' : 'WROTE'} ${relPath} — ${injectedCount} routes` )
            }
        } ), Promise.resolve() )
    } ), Promise.resolve() )
}

await processFiles()

console.log( '' )
console.log( '--- Summary ---' )
console.log( `Files scanned:    ${stats.filesScanned}` )
console.log( `Files modified:   ${stats.filesModified}` )
console.log( `Routes added:     ${stats.routesAdded}` )
console.log( `Routes skipped:   ${stats.routesSkipped}` )
console.log( `Tests total:      ${stats.testsTotal}` )
if ( stats.errors.length > 0 ) {
    console.log( `\nErrors (${stats.errors.length}):` )
    stats.errors.forEach( ( e ) => console.log( `  ${e}` ) )
}
if ( dryRun ) {
    console.log( '\nDry-run complete. Use --apply to write changes.' )
}
