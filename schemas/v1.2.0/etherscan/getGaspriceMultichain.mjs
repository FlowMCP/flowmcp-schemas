import { EVM_CHAINS } from '../_shared/evmChains.mjs'


const etherscanChains = EVM_CHAINS
    .filter( ( c ) => c.etherscanAlias !== undefined )

const chainsByAlias = etherscanChains
    .reduce( ( acc, chain ) => {
        acc[ chain.etherscanAlias ] = { chainId: chain.etherscanChainId, name: chain.name }

        return acc
    }, {} )

const gasOracleAliases = [
    'ETHEREUM_MAINNET', 'SEPOLIA_TESTNET', 'ARBITRUM_ONE_MAINNET',
    'POLYGON_MAINNET', 'BINANCE_MAINNET', 'AVALANCHE_CCHAIN'
]

const gasOracleEnum = 'enum(' + gasOracleAliases.join( ',' ) + ')'


export const schema = {
    namespace: "etherscan",
    name: "SmartContractExplorer",
    description: "Fetch current gas oracle data (safe, proposed, fast gas prices) across multiple EVM chains via the Etherscan v2 API. Supports Ethereum, Arbitrum, Polygon, Binance, Avalanche and more.",
    docs: ["https://docs.etherscan.io"],
    tags: ["evm", "gas", "fees", "cacheTtlRealtime"],
    flowMCP: "1.2.0",
    root: "https://api.etherscan.io/v2/api",
    requiredServerParams: ["ETHERSCAN_API_KEY"],
    headers: {},
    routes: {
      getGasOracle: {
        requestMethod: "GET",
        description: "Fetch current gas oracle data for a given chain via Etherscan. Returns structured JSON response data.",
        route: "/",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: gasOracleEnum, options: [] } },
          { position: { key: "module", value: "gastracker", location: "query" } },
          { position: { key: "action", value: "gasoracle", location: "query" } },
          { position: { key: "apikey", value: "{{ETHERSCAN_API_KEY}}", location: "query" } }
        ],
        tests: [
          { _description: "Gas oracle on Ethereum Mainnet", chainName: "ETHEREUM_MAINNET" },
          { _description: "Gas oracle on Arbitrum One", chainName: "CELO_MAINNET" },
          { _description: "Gas oracle on Polygon", chainName: "POLYGON_MAINNET" },
          { _description: "Gas oracle on Binance Smart Chain", chainName: "BINANCE_MAINNET" }
        ],
        modifiers: [
          { phase: "pre", handlerName: "insertChainId" },
          { phase: "post", handlerName: "modifyResult" }
        ]
      },
      estimateGasCost: {
        requestMethod: "GET",
        description: "Estimate gas cost using a specific gas price for a given chain. Required: chainName, gasprice.",
        route: "/",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: gasOracleEnum, options: [] } },
          { position: { key: "module", value: "gastracker", location: "query" } },
          { position: { key: "action", value: "gasestimate", location: "query" } },
          { position: { key: "gasprice", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
          { position: { key: "apikey", value: "{{ETHERSCAN_API_KEY}}", location: "query" } }
        ],
        tests: [
          { _description: "Estimate gas cost on Ethereum with 2 Gwei", chainName: "ETHEREUM_MAINNET", gasprice: "2000000000" }
        ],
        modifiers: [
          { phase: "pre", handlerName: "insertChainId" },
          { phase: "post", handlerName: "modifyResult" }
        ]
      }
    },
    handlers: {
      insertChainId: async ({ struct, payload, userParams }) => {
        const { chainName } = userParams
        const { chainId } = chainsByAlias[chainName]
        payload['url'] = payload['url'].replace(`chainName=${chainName}`, `chainid=${chainId}`)
        return { struct, payload }
      },
      modifyResult: async ( { struct, payload } ) => {
        if( !struct['data'] ) { return { struct, payload } }

        if( struct['data'].status !== "1" ) {
          struct['status'] = false
          struct['messages'].push(struct.data.message);
          return { struct, payload }
        }
        struct['data'] = struct['data'].result
        return { struct, payload }
      }
    }
  }
  