const chainNames = {
    ARBITRUM_ONE: 42161,
    AVALANCHE: 43114,
    BASE: 8453,
    BERACHAIN_MAINNET: 80094,
    BINANCE_MAINNET: 56,
    BITCOIN_MAINNET: 0,
    BLAST_MAINNET: 81457,
    BOB_MAINNET: 60808,
    CHILIZ_MAINNET: 88888,
    CRONOS_MAINNET: 25,
    ETHEREUM_MAINNET: 1,
    FANTOM_MAINNET: 250,
    FRAXTAL_MAINNET: 252,
    GNOSIS_MAINNET: 100,
    IMMUTABLE_ZKEVM_MAINNET: 13371,
    INK_MAINNET: 57073,
    LENS_SEPOLIA_TESTNET: 37111,
    LINEA_MAINNET: 59144,
    LISK_MAINNET: 1135,
    MANTLE_MAINNET: 5000,
    METIS_MAINNET: 1088,
    MODE_TESTNET: 34443,
    MOONBEAM_MAINNET: 1284,
    OPBNB_MAINNET: 204,
    OPTIMISN_MAINNET: 10,
    PALM_MAINNET: 11297108109,
    POLYGON_MAINNET: 137,
    POLYGONZK_MAINNET: 1101,
    RONIN_MAINNET: 2020,
    RSK_MAINNET: 30,
    SCROLL_MAINNET: 534352,
    SEI_MAINNET: 1329,
    SNAXCHAIN_MAINNET: 2192,
    SONEIUM_MAINNET: 1868,
    STORY_MAINNET: 1514,
    TAIKO_MAINNET: 167000,
    UNICHAIN_MAINNET: 130,
    WORLDCHAIN_MAINNET: 480,
    ZETACHAIN_MAINNET: 7000,
    ZKSYNC_MAINNET: 324,
    ZORA_MAINNET: 7777777
}

const schema = {
    namespace: "blocknative",
    name: "Gas Price Estimator",
    description: "Accurate next-block gas price predictions for Ethereum, Bitcoin, and other supported chains.",
    docs: ["https://docs.blocknative.com"],
    tags: ["new"],
    flowMCP: "1.2.0",
    root: "https://api.blocknative.com",
    requiredServerParams: ["BLOCKNATIVE_API_KEY"],
    headers: { Authorization: "{{BLOCKNATIVE_API_KEY}}" },
    routes: {
        getGasPrices: {
            requestMethod: "GET",
            description: "Returns a range of gas price estimates for the next block across defined confidence levels.",
            route: "/gasprices/blockprices",
            parameters: [
                { position: { key: "chainName", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(ARBITRUM_ONE,AVALANCHE,BASE,BERACHAIN_MAINNET,BINANCE_MAINNET,BITCOIN_MAINNET,BLAST_MAINNET,BOB_MAINNET,CHILIZ_MAINNET,CRONOS_MAINNET,ETHEREUM_MAINNET,FANTOM_MAINNET,FRAXTAL_MAINNET,GNOSIS_MAINNET,IMMUTABLE_ZKEVM_MAINNET,INK_MAINNET,LENS_SEPOLIA_TESTNET,LINEA_MAINNET,LISK_MAINNET,MANTLE_MAINNET,METIS_MAINNET,MODE_TESTNET,MOONBEAM_MAINNET,OPBNB_MAINNET,OPTIMISN_MAINNET,PALM_MAINNET,POLYGON_MAINNET,POLYGONZK_MAINNET,RONIN_MAINNET,RSK_MAINNET,SCROLL_MAINNET,SEI_MAINNET,SNAXCHAIN_MAINNET,SONEIUM_MAINNET,STORY_MAINNET,TAIKO_MAINNET,UNICHAIN_MAINNET,WORLDCHAIN_MAINNET,ZETACHAIN_MAINNET,ZKSYNC_MAINNET,ZORA_MAINNET)", options: [] } },
                { position: { key: "system", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "network", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "confidenceLevels", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "array()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Ethereum default alias", chainName: "ETHEREUM_MAINNET" },
                { _description: "Zora alias + confidence levels", chainName: "ZORA_MAINNET", confidenceLevels: "70,90,99" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "modifyQuery" },
                { phase: "post", handlerName: "formatBlockPrices" }
            ]
        }
    },
    handlers: {
        modifyQuery: async ({ struct, payload, userParams }) => {
            const alias = userParams.alias?.toUpperCase()
            const chainId = chainIdOptions[ alias ]
            payload['url'] = payload['url']
                .replace( `chainName=${alias}`, `chainid=${chainId}` )
            return { struct, payload }
        },

        formatBlockPrices: async ({ struct, payload }) => {
            if (!struct.data || !struct.data.blockPrices) {
                struct.status = false;
                struct.messages.push("No blockPrices data in response");
                return { struct, payload };
            }

            struct.data = {
                network: struct.data.network,
                system: struct.data.system,
                blockNumber: struct.data.currentBlockNumber,
                estimates: struct.data.blockPrices.map(bp => ({
                    block: bp.blockNumber,
                    baseFee: bp.baseFeePerGas,
                    estimatedPrices: bp.estimatedPrices.map(p => ({
                        confidence: p.confidence,
                        price: p.price,
                        priorityFee: p.maxPriorityFeePerGas,
                        maxFee: p.maxFeePerGas
                    }))
                }))
            };

            return { struct, payload };
        }
    }
};


export { schema }