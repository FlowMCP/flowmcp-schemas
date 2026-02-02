import { EVM_CHAINS } from '../_shared/evmChains.mjs'

const blocknativeChains = EVM_CHAINS
    .filter( ( c ) => c.blocknativeAlias !== undefined )

const chainNames = blocknativeChains
    .reduce( ( acc, chain ) => {
        acc[ chain.blocknativeAlias ] = chain.blocknativeChainId

        return acc
    }, {} )

const chainEnum = 'enum(' + Object.keys( chainNames ).join( ',' ) + ')'

const schema = {
    namespace: "blocknative",
    name: "Gas Price Estimator",
    description: "Accurate next-block gas price predictions for Ethereum, Bitcoin, and other supported chains.",
    docs: ["https://docs.blocknative.com"],
    tags: ["new", "cacheTtlRealtime"],
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
                { position: { key: "chainName", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: chainEnum, options: [] } },
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