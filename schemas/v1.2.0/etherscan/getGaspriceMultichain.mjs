const chainsByAlias = {
  ETHEREUM_MAINNET: { 'chainId': 1, 'name': "Ethereum Mainnet" },
  SEPOLIA_TESTNET: { 'chainId': 11155111, 'name': "Sepolia Testnet" },
  HOLESKY_TESTNET: { 'chainId': 17000, 'name': "Holesky Testnet" },
  ABSTRACT_MAINNET: { 'chainId': 2741, 'name': "Abstract Mainnet" },
  ABSTRACT_SEPOLIA_TESTNET: { 'chainId': 11124, 'name': "Abstract Sepolia Testnet" },
  APECHAIN_CURTIS_TESTNET: { 'chainId': 33111, 'name': "ApeChain Curtis Testnet" },
  APECHAIN_MAINNET: { 'chainId': 33139, 'name': "ApeChain Mainnet" },
  ARBITRUM_NOVA_MAINNET: { 'chainId': 42170, 'name': "Arbitrum Nova Mainnet" },
  ARBITRUM_ONE_MAINNET: { 'chainId': 42161, 'name': "Arbitrum One Mainnet" },
  ARBITRUM_SEPOLIA_TESTNET: { 'chainId': 421614, 'name': "Arbitrum Sepolia Testnet" },
  AVALANCHE_CCHAIN: { 'chainId': 43114, 'name': "Avalanche C-Chain" },
  AVALANCHE_FUJI_TESTNET: { 'chainId': 43113, 'name': "Avalanche Fuji Testnet" },
  BASE_MAINNET: { 'chainId': 8453, 'name': "Base Mainnet" },
  BASE_SEPOLIA_TESTNET: { 'chainId': 84532, 'name': "Base Sepolia Testnet" },
  BERACHAIN_MAINNET: { 'chainId': 80094, 'name': "Berachain Mainnet" },
  BERACHAIN_BEPOLIA_TESTNET: { 'chainId': 80069, 'name': "Berachain Bepolia Testnet" },
  BITTORRENT_MAINNET: { 'chainId': 199, 'name': "BitTorrent Chain Mainnet" },
  BITTORRENT_TESTNET: { 'chainId': 1028, 'name': "BitTorrent Chain Testnet" },
  BLAST_MAINNET: { 'chainId': 81457, 'name': "Blast Mainnet" },
  BLAST_SEPOLIA_TESTNET: { 'chainId': 168587773, 'name': "Blast Sepolia Testnet" },
  BINANCE_MAINNET: { 'chainId': 56, 'name': "BNB Smart Chain Mainnet" },
  BINANCE_TESTNET: { 'chainId': 97, 'name': "BNB Smart Chain Testnet" },
  CELO_ALFAJORES_TESTNET: { 'chainId': 44787, 'name': "Celo Alfajores Testnet" },
  CELO_MAINNET: { 'chainId': 42220, 'name': "Celo Mainnet" },
  CRONOS_MAINNET: { 'chainId': 25, 'name': "Cronos Mainnet" },
  FRAXTAL_MAINNET: { 'chainId': 252, 'name': "Fraxtal Mainnet" },
  FRAXTAL_TESTNET: { 'chainId': 2522, 'name': "Fraxtal Testnet" },
  GNOSIS_MAINNET: { 'chainId': 100, 'name': "Gnosis" },
  LINEA_MAINNET: { 'chainId': 59144, 'name': "Linea Mainnet" },
  LINEA_SEPOLIA_TESTNET: { 'chainId': 59141, 'name': "Linea Sepolia Testnet" },
  MANTLE_MAINNET: { 'chainId': 5000, 'name': "Mantle Mainnet" },
  MANTLE_SEPOLIA_TESTNET: { 'chainId': 5003, 'name': "Mantle Sepolia Testnet" },
  MEMECORE_MAINNET: { 'chainId': 4352, 'name': "Memecore Mainnet" },
  MEMECORE_TESTNET: { 'chainId': 43521, 'name': "Memecore Testnet" },
  MOONBASE_ALPHA_TESTNET: { 'chainId': 1287, 'name': "Moonbase Alpha Testnet" },
  MOONBEAM_MAINNET: { 'chainId': 1284, 'name': "Moonbeam Mainnet" },
  MOONRIVER_MAINNET: { 'chainId': 1285, 'name': "Moonriver Mainnet" },
  OPTIMISN_MAINNET: { 'chainId': 10, 'name': "OP Mainnet" },
  OPTIMISN_SEPOLIA_TESTNET: { 'chainId': 11155420, 'name': "OP Sepolia Testnet" },
  POLYGON_AMOY_TESTNET: { 'chainId': 80002, 'name': "Polygon Amoy Testnet" },
  POLYGON_MAINNET: { 'chainId': 137, 'name': "Polygon Mainnet" },
  POLYGONZK_CARDONA_TESTNET: { 'chainId': 2442, 'name': "Polygon zkEVM Cardona Testnet" },
  POLYGONZK_MAINNET: { 'chainId': 1101, 'name': "Polygon zkEVM Mainnet" },
  SCROLL_MAINNET: { 'chainId': 534352, 'name': "Scroll Mainnet" },
  SCROLL_SEPOLIA_TESTNET: { 'chainId': 534351, 'name': "Scroll Sepolia Testnet" },
  SONIC_BLAZE_TESTNET: { 'chainId': 57054, 'name': "Sonic Blaze Testnet" },
  SONIC_MAINNET: { 'chainId': 146, 'name': "Sonic Mainnet" },
  SOPHON_MAINNET: { 'chainId': 50104, 'name': "Sophon Mainnet" },
  SOPHON_SEPOLIA_TESTNET: { 'chainId': 531050104, 'name': "Sophon Sepolia Testnet" },
  SWELLCHAIN_MAINNET: { 'chainId': 1923, 'name': "Swellchain Mainnet" },
  SWELLCHAIN_TESTNET: { 'chainId': 1924, 'name': "Swellchain Testnet" },
  TAIKO_HEKLA_L2_TESTNET: { 'chainId': 167009, 'name': "Taiko Hekla L2 Testnet" },
  TAIKO_MAINNET: { 'chainId': 167000, 'name': "Taiko Mainnet" },
  UNICHAIN_MAINNET: { 'chainId': 130, 'name': "Unichain Mainnet" },
  UNICHAIN_SEPOLIA_TESTNET: { 'chainId': 1301, 'name': "Unichain Sepolia Testnet" },
  WEMIX3_MAINNET: { 'chainId': 1111, 'name': "WEMIX3.0 Mainnet" },
  WEMIX3_TESTNET: { 'chainId': 1112, 'name': "WEMIX3.0 Testnet" },
  WORLD_MAINNET: { 'chainId': 480, 'name': "World Mainnet" },
  WORLD_SEPOLIA_TESTNET: { 'chainId': 4801, 'name': "World Sepolia Testnet" },
  XAI_MAINNET: { 'chainId': 660279, 'name': "Xai Mainnet" },
  XAI_SEPOLIA_TESTNET: { 'chainId': 37714555429, 'name': "Xai Sepolia Testnet" },
  XINFIN_TESTNET: { 'chainId': 51, 'name': "XDC Apothem Testnet" },
  XINFIN_MAINNET: { 'chainId': 50, 'name': "XDC Mainnet" },
  ZKSYNC_MAINNET: { 'chainId': 324, 'name': "zkSync Mainnet" },
  ZKSYNC_SEPOLIA_TESTNET: { 'chainId': 300, 'name': "zkSync Sepolia Testnet" }
}


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
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,ARBITRUM_ONE_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,AVALANCHE_CCHAIN)", options: [] } },
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
          { position: { key: "chainName", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,ARBITRUM_ONE_MAINNET,POLYGON_MAINNET,BINANCE_MAINNET,AVALANCHE_CCHAIN)", options: [] } },
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
  