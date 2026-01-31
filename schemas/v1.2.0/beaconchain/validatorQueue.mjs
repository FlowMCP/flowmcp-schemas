export const schema = {
    namespace: "beaconchain",
    name: "Ethereum Validator Queue API",
    description: "Exposes real-time queue stats and validator information from the Beaconcha.in Ethereum API.",
    docs: ["https://beaconcha.in/api/v1/docs"],
    tags: ["ethereum", "validators", "staking"],
    flowMCP: "1.2.0",
    root: "https://beaconcha.in/api/v1",
    requiredServerParams: [],
    headers: {},
    routes: {
        getActivationQueue: {
            requestMethod: "GET",
            description: "Fetches current Ethereum validator activation queue statistics.",
            route: "/validators/queue",
            parameters: [],
            tests: [
                { _description: "Basic activation queue fetch" }
            ],
            modifiers: [
                { phase: "post", handlerName: "extractActivationQueue" }
            ]
        },
        getExitQueue: {
            requestMethod: "GET",
            description: "Fetches current Ethereum validator exit queue statistics.",
            route: "/validators/queue",
            parameters: [],
            tests: [
                { _description: "Basic exit queue fetch" }
            ],
            modifiers: [
                { phase: "post", handlerName: "extractExitQueue" }
            ]
        },
        getValidatorStatus: {
            requestMethod: "GET",
            description: "Fetches validator status details by public key.",
            route: "/validator/:pubkey",
            parameters: [
                { position: { key: "pubkey", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{96}$)"] } }
            ],
            tests: [
                { _description: "Fetch validator details for example public key", pubkey: "0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c" }
            ],
            modifiers: [
                { phase: "post", handlerName: "extractValidatorStatus" }
            ]
        }
    },
    handlers: {
        extractActivationQueue: async ( { struct, payload } ) => {
            const data = struct?.data?.data ?? {}
            const entering = data.beaconchain_entering ?? 0
            const validatorsCount = data.validatorscount ?? 0
            const balance = ( data.beaconchain_entering_balance ?? 0 ) / 1e9
            const waitDays = ( entering / 900 ).toFixed( 1 )

            struct.data = {
                enteringValidators: entering,
                totalActiveValidators: validatorsCount,
                enteringBalanceETH: parseFloat( balance.toFixed( 2 ) ),
                estimatedWaitDays: parseFloat( waitDays )
            }

            return { struct, payload }
        },
        extractExitQueue: async ( { struct, payload } ) => {
            const data = struct?.data?.data ?? {}
            const exiting = data.beaconchain_exiting ?? 0
            const validatorsCount = data.validatorscount ?? 0
            const balance = ( data.beaconchain_exiting_balance ?? 0 ) / 1e9
            const waitDays = ( exiting / 900 ).toFixed( 1 )

            struct.data = {
                exitingValidators: exiting,
                totalActiveValidators: validatorsCount,
                exitingBalanceETH: parseFloat( balance.toFixed( 2 ) ),
                estimatedWaitDays: parseFloat( waitDays )
            }

            return { struct, payload }
        },
        extractValidatorStatus: async ( { struct, payload } ) => {
            const data = struct?.data?.data ?? {}

            struct.data = {
                pubkey: data.pubkey ?? data.publickey ?? 'N/A',
                status: data.status ?? 'unknown',
                effectiveBalanceETH: data.balance ? ( data.balance / 1e9 ).toFixed( 2 ) : '0.00',
                activationEpoch: data.activationepoch ?? 'N/A',
                exitEpoch: data.exitepoch ?? 'N/A'
            }

            return { struct, payload }
        }
    }
}
