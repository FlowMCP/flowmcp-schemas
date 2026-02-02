import { EVM_CHAINS } from '../_shared/evmChains.mjs'


const etherscanChains = EVM_CHAINS
    .filter( ( c ) => c.etherscanAlias !== undefined )

const chainsByAlias = etherscanChains
    .reduce( ( acc, chain ) => {
        acc[ chain.etherscanAlias ] = { chainId: chain.etherscanChainId, name: chain.name }

        return acc
    }, {} )

const chainEnum = 'enum(' + etherscanChains
    .map( ( c ) => c.etherscanAlias )
    .join( ',' ) + ')'


export const schema = {
    namespace: "etherscan",
    name: "SmartContractExplorer",
    description: "Retrieve smart contract ABI and verified source code across 60+ EVM chains via Etherscan v2 API. Lists available chains and fetches contract data by address.",
    docs: ["https://docs.etherscan.io"],
    tags: ["evm", "contracts", "explorer", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.etherscan.io/v2/api",
    requiredServerParams: [ "ETHERSCAN_API_KEY" ],
    headers: {},
    routes: {
      getAvailableChains: {
        requestMethod: "GET",
        description: "List available blockchain aliases via Etherscan. Returns structured JSON response data.",
        route: "/chains",
        parameters: [],
        tests: [{ _description: "Fetch available chains" }],
        modifiers: [{ phase: "execute", handlerName: "getAvailableChains" }]
      },
      getSmartContractAbi: {
        requestMethod: "GET",
        description: "Fetch smart contract source code by alias via Etherscan. Returns structured JSON response data.",
        route: "/",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: chainEnum, options: [] } },
          { position: { key: "module", value: "contract", location: "query" } },
          { position: { key: "action", value: "getabi", location: "query" } },
          { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(42)", "max(42)"] } },
          { position: { key: "apikey", value: "{{ETHERSCAN_API_KEY}}", location: "query" } }
        ],
        tests: [
          { _description: "Uniswap V2 Factory on Ethereum", chainName: "ETHEREUM_MAINNET", address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f" },
          { _description: "Uniswap V3 Factory on Ethereum", chainName: "ETHEREUM_MAINNET", address: "0x1F98431c8aD98523631AE4a59f267346ea31F984" },
          { _description: "QuickSwap Factory on Polygon", chainName: "POLYGON_MAINNET", address: "0x5757371414417b8c6caad45baef941abc7d3ab32" },
          { _description: "PancakeSwap V2 Factory on BNB Chain", chainName: "BINANCE_MAINNET", address: "0xca143ce32fe78f1f7019d7d551a6402fc5350c73" },
          { _description: "Trader Joe V2.1 Factory on Avalanche", chainName: "AVALANCHE_CCHAIN", address: "0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10" }
        ],
        modifiers: [
          { phase: "pre", handlerName: "insertChainId" },
          { phase: "post", handlerName: "modifyAbi" }
        ]
      },
      getSourceCode: {
        requestMethod: "GET",
        description: "Fetch smart contract source code by alias via Etherscan. Returns structured JSON response data.",
        route: "/",
        parameters: [
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: chainEnum, options: [] } },
          { position: { key: "module", value: "contract", location: "query" } },
          { position: { key: "action", value: "getsourcecode", location: "query" } },
          { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(42)", "max(42)"] } },
          { position: { key: "apikey", value: "{{ETHERSCAN_API_KEY}}", location: "query" } }
        ],
        tests: [
          { _description: "Uniswap V2 Factory on Ethereum", chainName: "ETHEREUM_MAINNET", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
          { _description: "QuickSwap Factory on Polygon", chainName: "POLYGON_MAINNET", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
          { _description: "PancakeSwap V2 Factory on BNB Chain", chainName: "BINANCE_MAINNET", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
          { _description: "Trader Joe V2.1 Factory on Avalanche", chainName: "AVALANCHE_CCHAIN", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
        ],
        modifiers: [
          { phase: "pre", handlerName: "insertChainId" },
          { phase: "post", handlerName: "modifySourceCode" }
        ]
      }
    },
    handlers: {
      getAvailableChains: async ( { struct, payload } ) => {
        struct['data'] = Object.keys( chainsByAlias )

        return { struct, payload }
      },
      insertChainId: async ( { struct, payload, userParams } ) => {
        const { chainName } = userParams
        const { chainId } = chainsByAlias[ chainName ]
        payload['url'] = payload['url']
          .replace( `chainName=${chainName}`, `chainid=${chainId}` )

        return { struct, payload }
      },
      modifyAbi: async ( { struct, payload } ) => {
        if( !struct['data'] ) { return { struct, payload } }

        if( struct['data'].status !== "1" ) {
          struct['status'] = false
          struct['messages'].push( struct.data.message )

          return { struct, payload }
        }

        struct['data'] = JSON.parse( struct['data']?.result )

        return { struct, payload }
      },
      modifySourceCode: async ( { struct, payload } ) => {
        if( !struct['data'] ) { return { struct, payload } }

        if( struct['data'].status !== "1" ) {
          struct['status'] = false
          struct['messages'].push( struct.data.message )

          return { struct, payload }
        }

        struct['data'] = struct['data'].result

        return { struct, payload }
      }
    }
  }
