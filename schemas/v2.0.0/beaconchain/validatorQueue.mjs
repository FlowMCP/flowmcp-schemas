// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'beaconchain',
    name: 'Ethereum Validator Queue API',
    description: 'Exposes real-time queue stats and validator information from the Beaconcha.in Ethereum API.',
    version: '2.0.0',
    docs: ['https://beaconcha.in/api/v1/docs'],
    tags: ['ethereum', 'validators', 'staking', 'cacheTtlDaily'],
    root: 'https://beaconcha.in/api/v1',
    routes: {
        getActivationQueue: {
            method: 'GET',
            path: '/validators/queue',
            description: 'Fetches current Ethereum validator activation queue statistics. via beaconchain.',
            parameters: []
        },
        getExitQueue: {
            method: 'GET',
            path: '/validators/queue',
            description: 'Fetches current Ethereum validator exit queue statistics via beaconchain. Returns structured JSON response data.',
            parameters: []
        },
        getValidatorStatus: {
            method: 'GET',
            path: '/validator/:pubkey',
            description: 'Fetches validator status details by public key via beaconchain — query by pubkey.',
            parameters: [
                { position: { key: 'pubkey', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{96}$)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getActivationQueue: {
        postRequest: async ( { response, struct, payload } ) => {
            const data = struct?.data?.data ?? {}
            const entering = data.beaconchain_entering ?? 0
            const validatorsCount = data.validatorscount ?? 0
            const balance = ( data.beaconchain_entering_balance ?? 0 ) / 1e9
            const waitDays = ( entering / 900 ).toFixed( 1 )

            response = {
            enteringValidators: entering,
            totalActiveValidators: validatorsCount,
            enteringBalanceETH: parseFloat( balance.toFixed( 2 ) ),
            estimatedWaitDays: parseFloat( waitDays )
            }

            return { response }
        }
    },
    getExitQueue: {
        postRequest: async ( { response, struct, payload } ) => {
            const data = struct?.data?.data ?? {}
            const exiting = data.beaconchain_exiting ?? 0
            const validatorsCount = data.validatorscount ?? 0
            const balance = ( data.beaconchain_exiting_balance ?? 0 ) / 1e9
            const waitDays = ( exiting / 900 ).toFixed( 1 )

            response = {
            exitingValidators: exiting,
            totalActiveValidators: validatorsCount,
            exitingBalanceETH: parseFloat( balance.toFixed( 2 ) ),
            estimatedWaitDays: parseFloat( waitDays )
            }

            return { response }
        }
    },
    getValidatorStatus: {
        postRequest: async ( { response, struct, payload } ) => {
            const data = struct?.data?.data ?? {}

            response = {
            pubkey: data.pubkey ?? data.publickey ?? 'N/A',
            status: data.status ?? 'unknown',
            effectiveBalanceETH: data.balance ? ( data.balance / 1e9 ).toFixed( 2 ) : '0.00',
            activationEpoch: data.activationepoch ?? 'N/A',
            exitEpoch: data.exitepoch ?? 'N/A'
            }

            return { response }
        }
    }
} )
