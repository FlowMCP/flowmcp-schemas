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
            parameters: [],
            tests: [
                { _description: 'Basic activation queue fetch' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        data: { type: 'object', properties: { beaconchain_entering: { type: 'number' }, beaconchain_exiting: { type: 'number' }, validatorscount: { type: 'number' }, beaconchain_entering_balance: { type: 'number' }, beaconchain_exiting_balance: { type: 'number' } } }
                    }
                }
            },
        },
        getExitQueue: {
            method: 'GET',
            path: '/validators/queue',
            description: 'Fetches current Ethereum validator exit queue statistics via beaconchain. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Basic exit queue fetch' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        data: { type: 'object', properties: { beaconchain_entering: { type: 'number' }, beaconchain_exiting: { type: 'number' }, validatorscount: { type: 'number' }, beaconchain_entering_balance: { type: 'number' }, beaconchain_exiting_balance: { type: 'number' } } }
                    }
                }
            },
        },
        getValidatorStatus: {
            method: 'GET',
            path: '/validator/:pubkey',
            description: 'Fetches validator status details by public key via beaconchain — query by pubkey.',
            parameters: [
                { position: { key: 'pubkey', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{96}$)'] } }
            ],
            tests: [
                {
                    _description: 'Fetch validator details for example public key',
                    pubkey: '0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        data: { type: 'object', properties: { activationeligibilityepoch: { type: 'number' }, activationepoch: { type: 'number' }, balance: { type: 'number' }, effectivebalance: { type: 'number' }, exitepoch: { type: 'number' }, lastattestationslot: { type: 'number' }, name: { type: 'string' }, pubkey: { type: 'string' }, slashed: { type: 'boolean' }, status: { type: 'string' }, validatorindex: { type: 'number' }, withdrawableepoch: { type: 'number' }, withdrawalcredentials: { type: 'string' }, total_withdrawals: { type: 'number' } } }
                    }
                }
            },
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
