const schema = {
    namespace: 'bonfida',
    name: 'Bonfida SNS API',
    description: 'Resolves Solana Name Service (.sol) domains to wallet addresses, retrieves favorite domains, and lists all domains owned by a wallet via the SNS SDK proxy.',
    docs: ['https://docs.sns.id', 'https://github.com/Bonfida/sns-sdk'],
    tags: ['solana', 'naming', 'identity', 'domains'],
    flowMCP: '1.2.0',
    root: 'https://sns-sdk-proxy.bonfida.workers.dev',
    requiredServerParams: [],
    headers: {},
    routes: {
        resolveDomain: {
            requestMethod: 'GET',
            description: 'Resolve a .sol domain name to its current owner wallet address. Returns the Solana public key that owns the given domain. via bonfida.',
            route: '/resolve/:domain',
            parameters: [
                { position: { key: 'domain', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(1)', 'max(64)'] } }
            ],
            tests: [
                { _description: 'Resolve bonfida.sol to owner address', domain: 'bonfida' },
                { _description: 'Resolve toly.sol to owner address', domain: 'toly' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatResolveResult' }
            ]
        },
        getFavoriteDomain: {
            requestMethod: 'GET',
            description: 'Get the favorite .sol domain for a given Solana wallet address. Returns the domain name and its account public key, or null if none is set. via bonfida.',
            route: '/favorite-domain/:owner',
            parameters: [
                { position: { key: 'owner', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)', 'max(44)'] } }
            ],
            tests: [
                { _description: 'Get favorite domain for Bonfida wallet', owner: 'HKKp49qGWXd639QsuH7JiLijfVW5UtCVY4s1n2HANwEA' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatFavoriteResult' }
            ]
        },
        getDomainsByOwner: {
            requestMethod: 'GET',
            description: 'List all .sol domain account public keys owned by a given Solana wallet address. Returns an array of domain account keys. via bonfida.',
            route: '/domains/:owner',
            parameters: [
                { position: { key: 'owner', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(32)', 'max(44)'] } }
            ],
            tests: [
                { _description: 'Get all domains owned by Bonfida wallet', owner: 'HKKp49qGWXd639QsuH7JiLijfVW5UtCVY4s1n2HANwEA' }
            ],
            modifiers: []
        }
    },
    handlers: {
        formatResolveResult: async ( { struct, payload } ) => {
            if( !struct.status || !struct.data ) {
                return { struct, payload }
            }

            const { s, result } = struct.data
            if( s !== 'ok' ) {
                struct.status = false
                struct.messages.push( `SNS resolve failed: ${result}` )

                return { struct, payload }
            }

            struct.data = { owner: result }

            return { struct, payload }
        },
        formatFavoriteResult: async ( { struct, payload } ) => {
            if( !struct.status || !struct.data ) {
                return { struct, payload }
            }

            const { s, result } = struct.data
            if( s !== 'ok' ) {
                struct.status = false
                struct.messages.push( `SNS favorite-domain failed: ${result}` )

                return { struct, payload }
            }

            if( result === null ) {
                struct.data = { domain: null, domainKey: null }

                return { struct, payload }
            }

            struct.data = {
                domain: result['reverse'] || null,
                domainKey: result['domain'] || null
            }

            return { struct, payload }
        }
    }
}


export { schema }
