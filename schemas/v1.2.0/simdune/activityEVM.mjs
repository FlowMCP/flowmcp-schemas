import { max } from "indicatorts"
import { EVM_CHAINS } from '../_shared/evmChains.mjs'

const routeAliases = [
    'ABSTRACT', 'ANCIENT8', 'APE_CHAIN', 'ARBITRUM_ONE', 'ARBITRUM_NOVA',
    'AVALANCHE_CCHAIN', 'AVALANCHE_FUJI', 'B3', 'BASE_MAINNET', 'BASE_SEPOLIA',
    'BERACHAIN', 'BLAST_MAINNET', 'BNB_CHAIN', 'BOB', 'BOBA_NETWORK',
    'CELO_MAINNET', 'CORN', 'CYBER', 'DEGEN_CHAIN', 'ETHEREUM_MAINNET',
    'FANTOM', 'FLARE', 'FORMA', 'FRAXTAL', 'FUNKICHAIN', 'GNOSIS_CHAIN',
    'HAM_CHAIN', 'HYCHAIN', 'HYPER_EVM', 'INK', 'KAIA', 'LINEA_MAINNET',
    'LISK', 'MANTLE', 'METIS', 'MINT_MAINNET', 'MODE', 'OMNI', 'OPBNB',
    'OPTIMISM_MAINNET', 'POLYGON_MAINNET', 'PROOF_OF_PLAY',
    'PROOF_OF_PLAY_BOSS', 'RARI', 'REDSTONE', 'RONIN', 'SCROLL', 'SEI',
    'ETHEREUM_SEPOLIA', 'SHAPE', 'SONEIUM', 'SONIC', 'SUPERPOSITION',
    'SUPERSEED', 'SWELLCHAIN', 'UNICHAIN', 'WEMIX', 'WORLD', 'XAI',
    'ZERO_NETWORK', 'ZKEVM', 'ZKSYNC_ERA', 'ZORA_NETWORK'
]

const SUPPORTED_CHAINS = EVM_CHAINS
    .filter( ( c ) => c.simduneAlias !== undefined && routeAliases.includes( c.simduneAlias ) )
    .map( ( c ) => ( { alias: c.simduneAlias, id: c.simduneChainId, name: c.simduneChainSlug } ) )

const supportedChainsStr = SUPPORTED_CHAINS.map( ( { alias } ) => alias ).join( ',' )


function getChainAlias( { chainId } ) {
    const chain = SUPPORTED_CHAINS.find( ( c ) => c.id === chainId )

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