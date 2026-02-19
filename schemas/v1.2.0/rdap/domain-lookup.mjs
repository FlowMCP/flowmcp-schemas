export const schema = {
    namespace: 'rdap',
    name: 'RDAP Domain Lookup',
    description: 'Registration Data Access Protocol (RDAP) — the modern JSON-based WHOIS replacement. Look up domain registration data, nameserver information, and check domain availability via public RDAP servers. No authentication required.',
    docs: ['https://about.rdap.org/', 'https://www.rfc-editor.org/rfc/rfc9083'],
    tags: ['domain', 'whois', 'dns', 'internet', 'registration', 'cacheTtlDaily'],
    flowMCP: '1.2.0',
    root: 'https://rdap.org',
    requiredServerParams: [],
    headers: {},
    routes: {
        domainLookup: {
            requestMethod: 'GET',
            description: 'Get WHOIS-style registration data for a domain via RDAP. Returns registrar, registration and expiration dates, nameservers, DNSSEC status, and domain status codes. Works best with .com and .net domains.',
            route: '/domain/:domainName',
            parameters: [
                { position: { key: 'domainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(3)', 'regex(^[a-zA-Z0-9][a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$)'] } }
            ],
            tests: [
                { _description: 'Look up registration data for google.com', domainName: 'google.com' },
                { _description: 'Look up registration data for example.com', domainName: 'example.com' },
                { _description: 'Look up registration data for github.com', domainName: 'github.com' }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'fetchAndFormatDomain' }
            ]
        },
        nameserverLookup: {
            requestMethod: 'GET',
            description: 'Get nameserver information via RDAP including IPv4 and IPv6 addresses. Provide the fully qualified nameserver hostname (e.g. ns1.google.com). Works best with .com and .net nameservers.',
            route: '/nameserver/:nameserverName',
            parameters: [
                { position: { key: 'nameserverName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(3)', 'regex(^[a-zA-Z0-9][a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$)'] } }
            ],
            tests: [
                { _description: 'Look up nameserver ns1.google.com', nameserverName: 'ns1.google.com' },
                { _description: 'Look up nameserver ns1.cloudflare.com', nameserverName: 'ns1.cloudflare.com' }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'fetchAndFormatNameserver' }
            ]
        },
        domainAvailability: {
            requestMethod: 'GET',
            description: 'Check if a domain is registered by querying RDAP. Returns availability status based on whether RDAP returns domain data (registered) or HTTP 404 (likely available). Works best with .com and .net domains.',
            route: '/domain/:domainName',
            parameters: [
                { position: { key: 'domainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['min(3)', 'regex(^[a-zA-Z0-9][a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$)'] } }
            ],
            tests: [
                { _description: 'Check availability for google.com (registered)', domainName: 'google.com' },
                { _description: 'Check availability for xyznonexistent98765.com (likely available)', domainName: 'xyznonexistent98765.com' }
            ],
            modifiers: [
                { phase: 'execute', handlerName: 'checkDomainAvailability' }
            ]
        }
    },
    handlers: {
        fetchAndFormatDomain: async ( { struct, payload } ) => {
            try {
                const response = await fetch( payload.url, { redirect: 'follow' } )

                if( !response.ok ) {
                    struct.status = false
                    struct.messages.push( `HTTP ${response.status}: Domain not found or RDAP server unavailable` )

                    return { struct, payload }
                }

                const data = await response.json()

                const registrar = ( data.entities || [] )
                    .filter( ( entity ) => {
                        const roles = entity.roles || []

                        return roles.includes( 'registrar' )
                    } )
                    .map( ( entity ) => {
                        const vcardArray = entity.vcardArray || []
                        const vcardEntries = vcardArray[ 1 ] || []
                        const fnEntry = vcardEntries
                            .find( ( entry ) => entry[ 0 ] === 'fn' )
                        const name = fnEntry ? fnEntry[ 3 ] : null
                        const ianaId = ( entity.publicIds || [] )
                            .find( ( pid ) => pid.type === 'IANA Registrar ID' )

                        return {
                            name,
                            ianaId: ianaId ? ianaId.identifier : null
                        }
                    } )

                const events = ( data.events || [] )
                    .reduce( ( acc, event ) => {
                        acc[ event.eventAction ] = event.eventDate

                        return acc
                    }, {} )

                const nameservers = ( data.nameservers || [] )
                    .map( ( ns ) => {
                        const result = ns.ldhName

                        return result
                    } )

                const dnssec = data.secureDNS || {}

                const formatted = {
                    domain: data.ldhName || null,
                    handle: data.handle || null,
                    status: data.status || [],
                    registrar: registrar[ 0 ] || null,
                    registrationDate: events[ 'registration' ] || null,
                    expirationDate: events[ 'expiration' ] || null,
                    lastChanged: events[ 'last changed' ] || null,
                    lastRdapUpdate: events[ 'last update of RDAP database' ] || null,
                    nameservers,
                    dnssecSigned: dnssec.delegationSigned || false,
                    source: response.url
                }

                struct.data = formatted
                struct.status = true

            } catch( error ) {
                struct.status = false
                struct.messages.push( `RDAP lookup failed: ${error.message}` )
            }

            return { struct, payload }
        },
        fetchAndFormatNameserver: async ( { struct, payload } ) => {
            try {
                const response = await fetch( payload.url, { redirect: 'follow' } )

                if( !response.ok ) {
                    struct.status = false
                    struct.messages.push( `HTTP ${response.status}: Nameserver not found or RDAP server unavailable` )

                    return { struct, payload }
                }

                const data = await response.json()
                const ipAddresses = data.ipAddresses || {}

                const formatted = {
                    nameserver: data.ldhName || null,
                    handle: data.handle || null,
                    ipv4: ipAddresses.v4 || [],
                    ipv6: ipAddresses.v6 || [],
                    status: data.status || [],
                    source: response.url
                }

                struct.data = formatted
                struct.status = true

            } catch( error ) {
                struct.status = false
                struct.messages.push( `RDAP nameserver lookup failed: ${error.message}` )
            }

            return { struct, payload }
        },
        checkDomainAvailability: async ( { struct, payload } ) => {
            try {
                const domainName = payload.url.split( '/domain/' )[ 1 ]
                const response = await fetch( payload.url, { redirect: 'follow' } )

                if( response.status === 404 ) {
                    struct.data = {
                        domain: domainName,
                        registered: false,
                        available: true,
                        note: 'Domain not found in RDAP — likely available for registration. Verify with a domain registrar before purchasing.'
                    }
                    struct.status = true

                    return { struct, payload }
                }

                if( !response.ok ) {
                    struct.status = false
                    struct.messages.push( `HTTP ${response.status}: RDAP server returned unexpected status` )

                    return { struct, payload }
                }

                const data = await response.json()

                const events = ( data.events || [] )
                    .reduce( ( acc, event ) => {
                        acc[ event.eventAction ] = event.eventDate

                        return acc
                    }, {} )

                struct.data = {
                    domain: data.ldhName || domainName,
                    registered: true,
                    available: false,
                    registrationDate: events[ 'registration' ] || null,
                    expirationDate: events[ 'expiration' ] || null,
                    status: data.status || [],
                    note: 'Domain is registered. Check expiration date for potential future availability.'
                }
                struct.status = true

            } catch( error ) {
                struct.status = false
                struct.messages.push( `RDAP availability check failed: ${error.message}` )
            }

            return { struct, payload }
        }
    }
}
