# FlowMCP Schema Library

This repository contains a comprehensive collection of schema modules designed for use with [FlowMCP](https://github.com/a6b8/FlowMCP), a framework for adapting and standardizing REST APIs for interaction with AI systems.

Each schema describes the structure, routes, parameters, and integration requirements of a specific API provider, allowing them to be seamlessly activated and queried via the MCP interface.

---

## 📦 Available Schemas

Below is a list of all available schemas in this library, grouped by provider and sorted alphabetically. Each schema includes one or more MCP-compatible routes.

| Provider        | # Routes | Route Names (Examples)                                                                                                                                                                                                                                |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alternative`   | 3        | `getCurrentFng`, `getHistoricalFng`, `analyzeFngTrend`                                                                                                                                                                                                |
| `bscscan`       | 2        | `getContractABI`, `getContractSourceCode`                                                                                                                                                                                                             |
| `chainlink`     | 14       | `getAvailableChains`, `getAvailableFeedsForChain`, ...                                                                                                                                                                                                |
| `coincap`       | 9        | `listAssets`, `singleAsset`, `assetMarkets`, `listExchanges`, `getExchangeById`, `listMarkets`, `listRates`, `getRateBySlug`                                                                                                                          |
| `coingecko`     | 22       | `getCoinsList`, `getCoinsMarkets`, `getCoinById`, `getDerivativeExchangeIds`, `getExchangesList`, `getExchangeById`, `getExchangeTickers`, `getAvailableCoinCategoryIds`, `getGlobalData`, `getSimplePrice`, `getTokenPrice`, `getTrendingCoins`, ... |
| `coinmarketcap` | 10       | `getCategories`, `getCategory`, `getIdMap`, `getMetadata`, `getHistorical`, `getLatest`, `getFearAndGreedHistorical`, `getFearAndGreedLatest`, `listingsLatest`                                                                                       |
| `cointelegraph` | 1        | `getLatestNews`                                                                                                                                                                                                                                       |
| `cryptopanic`   | 1        | `getCryptoCryptopanicNews`                                                                                                                                                                                                                            |
| `dexscreener`   | 8        | `getLatestBoostedTokens`, `getMostActiveBoostedTokens`, `getPairByChainAndAddress`, `checkTokenOrders`, `getLatestTokenProfiles`, `searchPairs`, ...                                                                                                  |
| `duneAnalytics` | 7        | `farcasterGetTrendingMemecoins`, `getLatestResult`, `getDexPairStats`, `getTrendingContracts`, ...                                                                                                                                                    |
| `etherscan`     | 7        | `getContractABI`, `getContractSourceCode`, `getAvailableChains`, `getSmartContractAbi`, `getSourceCode`, `getGasOracle`, `estimateGasCost`                                                                                                            |
| `llama`         | 2        | `getProjectsByName`, `getPools`                                                                                                                                                                                                                       |
| `luksoNetwork`  | 50       | `readProfileData`, `fetchProfileMetadata`, `getUniverse`, `listAddresses`, `getBlocks`, `search`, `getNFTsByAddress`, `getTransactions`, ...                                                                                                          |
| `memoryLol`     | 1        | `queryUsernameChanges`                                                                                                                                                                                                                                |
| `moralis`       | 67       | `/block/:block_number_or_hash`, `/dateToBlock`, `/wallets/:address/defi/:protocol/positions`, `/market-data/nfts/top-collections`, `/nft/:address/price`, `/pairs/:address/sniper`, `/info/endpointWeights`, `/wallets/:address/chains`, ...          |
| `newsdata`      | 2        | `getLatestNewsdata`, `getCryptoNewsdata`                                                                                                                                                                                                              |
| `santiment`     | 5        | `get_sentiment_balance`, `get_social_volume`, ...                                                                                                                                                                                                     |
| `solanatracker` | 39       | `tokenStats`, `chartData`, `profitAndLossData`, `priceInformation`, `tokenInformation`, `topTradersAll`, `tokenTrades`, `walletInformation`, ...                                                                                                      |
| `solscan`       | 1        | `chainInfo`                                                                                                                                                                                                                                           |
| `solsniffer`    | 1        | `analysisToken`                                                                                                                                                                                                                                       |
| `thegraph`      | 3        | `getNewPools`, `getSubgraphSchema`, `querySubgraph`                                                                                                                                                                                                   |

---

## 🚀 Example: Start Server with All Schemas

This script loads and activates all available schemas into a local MCP-compatible server.

File: `2-start-server.mjs`

```js
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { FlowMCP, Server } from 'flowmcp'
import { fileURLToPath } from 'url'
import path from 'path'

const config = {
    name: 'Test',
    description: 'This is a development server for testing purposes.',
    version: '1.2.0'
}

Server
  .getArgvParameters({
      argv: process.argv,
      includeNamespaces: [],
      excludeNamespaces: [],
      activateTags: []
  })
  .prepare({
      scriptRootFolder: path.dirname(fileURLToPath(import.meta.url)),
      schemasRootFolder: './../schemas/v1.2.0/',
      localEnvPath: './../../.env'
  })
  .then(async (schemas) => {
      const server = new McpServer(config)

      schemas.forEach(({ schema, serverParams, activateTags }) => {
          FlowMCP.activateServerTools({
              server,
              schema,
              serverParams,
              activateTags,
              silent: false
          })
      })

      const transport = new StdioServerTransport()
      await server.connect(transport)
  }).catch((e) => {
      console.error('Error starting server:', e)
  })
```

---

## 🧠 Claude Configuration Example

This configuration snippet demonstrates how to start FlowMCP with a Claude-compatible MCP server:

```json
{
  "globalShortcut": "",
  "mcpServers": {
    "FlowMCP": {
      "command": "node",
      "args": [
        "./path/to/your/file.mjs",
        "--launched-by=claude",
        "--includeNamespaces=",
        "--excludeNamespaces=",
        "--activateTags="
      ],
      "env": {
        "SOLANA_TRACKER_API_KEY":"",
        "MORALIS_API_KEY":"",
        "ETHERSCAN_API_KEY":"",
        "CRYPTOPANIC_API_KEY":"",
        "DUNE_API_KEY":"",
        "NEWSDATA_API_KEY":"",
        "SANTIMENT_API_KEY":"",
        "SOLSNIFFER_API_KEY":"",
        "THEGRAPH_API_KEY":"",
        "CMC_API_KEY":"",
        "BITQUERY_ID":"",
        "BITQUERY_API_KEY":"",
        "ALCHEMY_API_KEY":"",
        "INFURA_API_KEY":"",
        "SOLSCAN_API_KEY":"",
        "BSCSCAN_API_KEY":"",
        "COINCAP_API_KEY":""
      }
    }
  }
}
```

---

## 🧹 Contributing

Want to add or improve a schema? Fork the repo, add your `.mjs` schema file under `schemas/<provider>/`, and submit a pull request.

Please follow the formatting and conventions described in the [FlowMCP README](../README.md), including:

* 4-space indentation
* One-line JSON objects for `tests`, `parameters`, and `modifiers`
* `const schema = { ... }` followed by `export { schema }` with two newlines between
