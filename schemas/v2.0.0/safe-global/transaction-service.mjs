// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "safeGlobal" -> "safeglobal"

export const main = {
    namespace: 'safeglobal',
    name: 'Safe Transaction Service',
    description: 'Query Gnosis Safe multisig wallets including balances, transactions, owners and modules on Ethereum mainnet',
    version: '2.0.0',
    docs: ['https://docs.safe.global/core-api/transaction-service-overview', 'https://safe.global/'],
    tags: ['ethereum', 'multisig', 'defi', 'wallet', 'cacheTtlFrequent'],
    root: 'https://safe-transaction-mainnet.safe.global/api/v1',
    routes: {
        getSafeInfo: {
            method: 'GET',
            path: '/safes/:address/',
            description: 'Get Safe multisig wallet information including owners, threshold, nonce and modules',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['length(42)'] } }
            ]
        },
        getSafeBalances: {
            method: 'GET',
            path: '/safes/:address/balances/',
            description: 'Get token balances of a Safe multisig wallet including ETH and ERC-20 tokens. Required: address. Optional filters: trusted, exclude_spam.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'trusted', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['default(true)', 'optional()'] } },
                { position: { key: 'exclude_spam', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['default(true)', 'optional()'] } }
            ]
        },
        getMultisigTransactions: {
            method: 'GET',
            path: '/safes/:address/multisig-transactions/',
            description: 'Get multisig transactions of a Safe wallet with execution status and confirmations',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(20)', 'optional()'] } },
                { position: { key: 'executed', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'nonce__gte', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'optional()'] } }
            ]
        },
        getIncomingTransfers: {
            method: 'GET',
            path: '/safes/:address/incoming-transfers/',
            description: 'Get incoming token transfers to a Safe wallet via safeGlobal — query by address. Supports limit filters.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['length(42)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(20)', 'optional()'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getSafeBalances: {
        postRequest: async ( { response, struct, payload } ) => {
            try {
            const raw = response
            if( !Array.isArray( raw ) ) {
            return { response }}

            const balances = raw
            .filter( ( b ) => {
            const balance = BigInt( b.balance || '0' )

            return balance > 0n
            } )
            .map( ( b ) => {
            const token = b.token || {}
            const decimals = token.decimals || 18
            const rawBalance = b.balance || '0'

            const result = {
            tokenAddress: b.tokenAddress || 'native',
            name: token.name || 'Ether',
            symbol: token.symbol || 'ETH',
            decimals,
            rawBalance
            }

            return result
            } )

            response = {
            source: "Safe Transaction Service",
            tokenCount: balances.length,
            balances
            }
            } catch( error ) {
            struct.status = false
            struct.messages.push( `Error formatting balances: ${error.message}` )
            }

            return { response }
        }
    },
    getMultisigTransactions: {
        postRequest: async ( { response, struct, payload } ) => {
            try {
            const raw = response
            if( !raw || !raw.results ) {
            return { response }}

            const transactions = raw.results
            .map( ( tx ) => {
            const result = {
            safeTxHash: tx.safeTxHash,
            to: tx.to,
            value: tx.value,
            nonce: tx.nonce,
            isExecuted: tx.isExecuted,
            isSuccessful: tx.isSuccessful,
            executionDate: tx.executionDate,
            submissionDate: tx.submissionDate,
            confirmationsRequired: tx.confirmationsRequired,
            confirmations: tx.confirmations ? tx.confirmations.length : 0,
            transactionHash: tx.transactionHash,
            dataDecoded: tx.dataDecoded
            }

            return result
            } )

            response = {
            source: "Safe Transaction Service",
            totalCount: raw.count,
            transactionCount: transactions.length,
            transactions
            }
            } catch( error ) {
            struct.status = false
            struct.messages.push( `Error formatting transactions: ${error.message}` )
            }

            return { response }
        }
    }
} )
