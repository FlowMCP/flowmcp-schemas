import { max } from "indicatorts"

// Supported chains for activity endpoint (from API documentation)
const SUPPORTED_CHAINS = [
    { alias: "ABSTRACT", id: 2741, name: "abstract" },
    { alias: "ANCIENT8", id: 888888888, name: "ancient8" },
    { alias: "APE_CHAIN", id: 33139, name: "ape_chain" },
    { alias: "ARBITRUM_ONE", id: 42161, name: "arbitrum" },
    { alias: "ARBITRUM_NOVA", id: 42170, name: "arbitrum_nova" },
    { alias: "AVALANCHE_CCHAIN", id: 43114, name: "avalanche_c" },
    { alias: "AVALANCHE_FUJI", id: 43113, name: "avalanche_fuji" },
    { alias: "B3", id: 8333, name: "b3" },
    { alias: "BASE_MAINNET", id: 8453, name: "base" },
    { alias: "BASE_SEPOLIA", id: 84532, name: "base_sepolia" },
    { alias: "BERACHAIN", id: 80094, name: "berachain" },
    { alias: "BLAST_MAINNET", id: 81457, name: "blast" },
    { alias: "BNB_CHAIN", id: 56, name: "bnb" },
    { alias: "BOB", id: 60808, name: "bob" },
    { alias: "BOBA_NETWORK", id: 288, name: "boba" },
    { alias: "CELO_MAINNET", id: 42220, name: "celo" },
    { alias: "CORN", id: 21000000, name: "corn" },
    { alias: "CYBER", id: 7560, name: "cyber" },
    { alias: "DEGEN_CHAIN", id: 666666666, name: "degen" },
    { alias: "ETHEREUM_MAINNET", id: 1, name: "ethereum" },
    { alias: "FANTOM", id: 250, name: "fantom" },
    { alias: "FLARE", id: 14, name: "flare" },
    { alias: "FORMA", id: 984122, name: "forma" },
    { alias: "FRAXTAL", id: 252, name: "fraxtal" },
    { alias: "FUNKICHAIN", id: 33979, name: "funkichain" },
    { alias: "GNOSIS_CHAIN", id: 100, name: "gnosis" },
    { alias: "HAM_CHAIN", id: 5112, name: "ham" },
    { alias: "HYCHAIN", id: 2911, name: "hychain" },
    { alias: "HYPER_EVM", id: 999, name: "hyper_evm" },
    { alias: "INK", id: 57073, name: "ink" },
    { alias: "KAIA", id: 8217, name: "kaia" },
    { alias: "LINEA_MAINNET", id: 59144, name: "linea" },
    { alias: "LISK", id: 1135, name: "lisk" },
    { alias: "MANTLE", id: 5000, name: "mantle" },
    { alias: "METIS", id: 1088, name: "metis" },
    { alias: "MINT_MAINNET", id: 185, name: "mint" },
    { alias: "MODE", id: 34443, name: "mode" },
    { alias: "OMNI", id: 166, name: "omni" },
    { alias: "OPBNB", id: 204, name: "opbnb" },
    { alias: "OPTIMISM_MAINNET", id: 10, name: "optimism" },
    { alias: "POLYGON_MAINNET", id: 137, name: "polygon" },
    { alias: "PROOF_OF_PLAY", id: 70700, name: "proof_of_play" },
    { alias: "PROOF_OF_PLAY_BOSS", id: 70701, name: "proof_of_play_boss" },
    { alias: "RARI", id: 1380012617, name: "rari" },
    { alias: "REDSTONE", id: 690, name: "redstone" },
    { alias: "RONIN", id: 2020, name: "ronin" },
    { alias: "SCROLL", id: 534352, name: "scroll" },
    { alias: "SEI", id: 1329, name: "sei" },
    { alias: "ETHEREUM_SEPOLIA", id: 11155111, name: "sepolia" },
    { alias: "SHAPE", id: 360, name: "shape" },
    { alias: "SONEIUM", id: 1868, name: "soneium" },
    { alias: "SONIC", id: 146, name: "sonic" },
    { alias: "SUPERPOSITION", id: 55244, name: "superposition" },
    { alias: "SUPERSEED", id: 5330, name: "superseed" },
    { alias: "SWELLCHAIN", id: 1923, name: "swellchain" },
    { alias: "UNICHAIN", id: 130, name: "unichain" },
    { alias: "WEMIX", id: 1111, name: "wemix" },
    { alias: "WORLD", id: 480, name: "world" },
    { alias: "XAI", id: 660279, name: "xai" },
    { alias: "ZERO_NETWORK", id: 543210, name: "zero_network" },
    { alias: "ZKEVM", id: 1101, name: "zkevm" },
    { alias: "ZKSYNC_ERA", id: 324, name: "zksync" },
    { alias: "ZORA_NETWORK", id: 7777777, name: "zora" }
]

const supportedChainsStr = SUPPORTED_CHAINS.map( ( { alias } ) => alias ).join( ',' )


function getChainAlias( { chainId } ) {
    const chain = SUPPORTED_CHAINS.find( c => c.id === chainId )
    return chain ? chain.alias : `UNKNOWN_${chainId}`
}


const schema = {
    namespace: "simdune",
    name: "Sim by Dune - Activity Feed",
    description: "Access decoded activity feed with realtime onchain activity including transfers, swaps, mints, burns, and approvals across EVM chains.",
    docs: ["https://docs.sim.dune.com/evm/activity"],
    tags: ["production", "activity", "analytics", "feed", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.sim.dune.com/v1",
    requiredServerParams: ["DUNE_SIM_API_KEY"],
    headers: { "X-Sim-Api-Key": "{{DUNE_SIM_API_KEY}}" },
    routes: {
        getActivityEVM: {
            requestMethod: "GET",
            description: `Get decoded activity feed for a wallet address including transfers, swaps, mints, burns, approvals, and contract interactions. Supported chains: ${supportedChainsStr}`,
            route: "/evm/activity/{{walletAddress}}",
            parameters: [
                {
                    position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "insert" },
                    z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] }
                },
                {
                    position: { key: "limit", value: "100", location: "query" },
                    z: { primitive: "number()", options: ["min(1)", "max(100)"] }
                },
                {
                    position: { key: "maxPages", value: "10", location: "query" },
                    z: { primitive: "number()", options: ["min(1)", "max(100)"] }
                },
                {
                    position: { key: "requestDelay", value: "500", location: "query" },
                    z: { primitive: "number()", options: ["min(1)", "max(100)"] }
                }
            ],
            tests: [
                {
                    _description: "Get Vitalik's activity feed on all supported chains",
                    walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
                    // limit defaults to 100 in parameters
                }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'simplifyActivityFeed' },
                // { phase: 'post', handlerName: 'debug' }
            ]
        },
        getActivityDetailedEVM: {
            requestMethod: "GET",
            description: `Get decoded activity feed for a wallet address including transfers, swaps, mints, burns, approvals, and contract interactions. Supported chains: ${supportedChainsStr}`,
            route: "/evm/activity/{{walletAddress}}",
            parameters: [
                {
                    position: { key: "walletAddress", value: "{{USER_PARAM}}", location: "insert" },
                    z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{40}$)"] }
                },
                {
                    position: { key: "limit", value: "{{USER_PARAM}}", location: "query" },
                    z: { primitive: "number()", options: ["min(1)", "max(100)"] }
                }
            ],
            tests: [
                {
                    _description: "Get Vitalik's activity feed on all supported chains",
                    walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                    limit: "10"
                },
                {
                    _description: "Get test wallet activity",
                    walletAddress: "0x1234567890123456789012345678901234567890",
                    limit: "5"
                }
            ],
            modifiers: []
        }
    },
    handlers: {
        simplifyActivityFeed: async ( { struct, payload, userParams } ) => {
            try {
                const allActivities = []
                let nextOffset = null
                let pageCount = 0
                const maxPages = parseInt( userParams._allParams.maxPages )
                const limit = parseInt( userParams._allParams.limit )
                const requestDelay = parseInt( userParams._allParams.requestDelay )
                const { url } = payload

                const initialUrl = new URL( url )
                initialUrl.searchParams.set( 'limit', limit )
                const firstResponse = await fetch( 
                    initialUrl.toString(), 
                    { method: 'GET', headers: payload.headers } 
                )
                
                if( !firstResponse.ok ) {
                    struct['status'] = false
                    struct['messages'].push( `Initial API call failed: ${firstResponse.status} ${firstResponse.statusText}` )
                    return { struct, payload }
                }
                
                const firstData = await firstResponse.json()
                
                if( firstData.activity && Array.isArray( firstData.activity ) ) {
                    allActivities.push( ...firstData.activity )
                }
                nextOffset = firstData.next_offset || null

                while( nextOffset && pageCount < maxPages - 1 ) {
                    await new Promise( resolve => setTimeout( resolve, requestDelay ) )

                    const nextUrl = new URL( url )
                    nextUrl.searchParams.set( 'offset', nextOffset )
                    nextUrl.searchParams.set( 'limit', limit )

                    const response = await fetch( 
                        nextUrl.toString(), 
                        { method: 'GET', headers: payload.headers } 
                    )
                    
                    if( !response.ok ) {
                        struct['status'] = false
                        struct['messages'].push( `API call failed: ${response.status} ${response.statusText}` )
                        return { struct, payload }

/*
                        console.error( `API call failed: ${response.status} ${response.statusText}` )
                        // Bei Rate Limit länger warten und nochmal versuchen
                        if( response.status === 429 ) {
                            await new Promise( resolve => setTimeout( resolve, 2000 ) )
                            continue  // Nochmal versuchen
                        }
                        break
*/

                    }
                    
                    const data = await response.json()
                    
                    if( data.activity && Array.isArray( data.activity ) ) {
                        allActivities.push( ...data.activity )
                    }
                    
                    nextOffset = data.next_offset || null
                    pageCount++
                    
                    // Wenn keine weiteren Activities, beende die Schleife
                    if( !data.activity || data.activity.length === 0 ) {
                        break
                    }
                }

                const isComplete = !nextOffset
                const chains = allActivities
                    .reduce( ( acc, activity ) => {
                        const chainId = activity.chain_id
                        const chainAlias = getChainAlias( { chainId } )
                        if( !acc[ chainAlias ] ) { acc[ chainAlias ] = {} }
                        const key = `summary_${activity.asset_type}_${activity.type}`
                        acc[ chainAlias ][ key ] = ( acc[ chainAlias ][ key ] || 0 ) + 1
                        return acc
                    }, {} )
                
                const metadata = {
                    totalActivities: allActivities.length,
                    pagesLoaded: pageCount + 1,
                    maxPagesReached: pageCount >= maxPages - 1,
                    uniqueChains: Object.keys( chains ).length
                }

                struct['data'] = { isComplete, chains, metadata }
                struct['status'] = true

                return { struct, payload }
                
            } catch( error ) {
                struct['status'] = false
                struct['messages'].push( `Handler error: ${error.message}` )
                struct.data = {}
                return { struct, payload }
            }
        },
        debug: ( { struct, payload } ) => {
            return { struct, payload }
        }
    }
}

export { schema }