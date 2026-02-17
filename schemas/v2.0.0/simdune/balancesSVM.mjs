// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Module-level code: 8 lines

export const main = {
    namespace: 'simdune',
    name: 'Sim by Dune - SVM Token Balances',
    description: 'Access realtime token balances for native, SPL, and SPL-2022 tokens with USD valuations across SVM chains.',
    version: '2.0.0',
    docs: ['https://docs.sim.dune.com/svm/balances'],
    tags: ['production', 'balances', 'analytics', 'portfolio', 'svm', 'solana', 'cacheTtlDaily'],
    root: 'https://api.sim.dune.com/beta',
    requiredServerParams: ['DUNE_SIM_API_KEY'],
    headers: {
        'X-Sim-Api-Key': '{{DUNE_SIM_API_KEY}}'
    },
    routes: {
        getBalancesSVM: {
            method: 'GET',
            path: '/svm/balances/{{walletAddress}}',
            description: 'Get realtime token balances with USD valuations for native, SPL, and SPL-2022 tokens across supported SVM chains.',
            parameters: [
                { position: { key: 'walletAddress', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^[1-9A-HJ-NP-Za-km-z]{32,44}$)'] } },
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(SOLANA,ECLIPSE)', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(1000)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {

    const SUPPORTED_CHAINS = [
        { alias: "SOLANA", id: "solana", name: "solana" },
        { alias: "ECLIPSE", id: "eclipse", name: "eclipse" }
    ]
    let chainAliasEnum
    chainAliasEnum = 'enum('
    chainAliasEnum += SUPPORTED_CHAINS.map( ( { alias } ) => alias ).join( ',' )
    chainAliasEnum += ')'

    return {
        getBalancesSVM: {
            preRequest: async ( { struct, payload } ) => {
                const { chainName } = payload
                const chainValue = SUPPORTED_CHAINS.find( ( { alias } ) => alias === chainName )?.id
                const separator = struct['url'].includes('?') ? '&' : '?'
                struct['url'] += `${separator}chains=${chainValue}`

                return { struct }
            }
        }
    }
}
