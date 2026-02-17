// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Module-level code: 94 lines

export const main = {
    namespace: 'polymarket',
    name: 'Polymarket Predictions',
    description: 'FlowMCP schema for Polymarket\'s public Gamma API: search events, list events, and list markets with readable, table-like summaries.',
    version: '2.0.0',
    docs: ['https://gamma-api.polymarket.com'],
    tags: ['predictions', 'markets', 'events', 'cacheTtlFrequent'],
    root: 'https://gamma-api.polymarket.com',
    routes: {
        searchEvents: {
            method: 'GET',
            path: '/public-search',
            description: 'Search for events. Mirrors /public-search with rich post-formatting of results. via Polymarket.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } },
                { position: { key: 'cache', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()'] } },
                { position: { key: 'events_status', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit_per_type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(10)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'events_tag', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'regex(^[A-Za-z0-9_,-]+$)'] } },
                { position: { key: 'keep_closed_markets', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'ascending', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()'] } },
                { position: { key: 'search_tags', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()'] } },
                { position: { key: 'search_profiles', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()'] } },
                { position: { key: 'recurrence', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'exclude_tag_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'regex(^[0-9,]+$)'] } },
                { position: { key: 'optimized', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()'] } }
            ]
        },
        getEvents: {
            method: 'GET',
            path: '/events',
            description: 'List events with embedded markets. Mirrors /events and formats each event with a markets table.',
            parameters: [
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(10)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(0)'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(volume,markets.volume)'] } },
                { position: { key: 'ascending', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['default(false)'] } },
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'regex(^[0-9,]+$)'] } },
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'regex(^[A-Za-z0-9-_,]+$)'] } },
                { position: { key: 'tag_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'closed', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['default(false)'] } }
            ]
        },
        getMarkets: {
            method: 'GET',
            path: '/markets',
            description: 'List markets. Mirrors /markets and returns an ASCII table via Polymarket. Supports id, slug, condition_ids filters.',
            parameters: [
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(10)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(0)'] } },
                { position: { key: 'order', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(volume)'] } },
                { position: { key: 'ascending', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['default(false)'] } },
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'regex(^[0-9,]+$)'] } },
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'regex(^[A-Za-z0-9-_,]+$)'] } },
                { position: { key: 'condition_ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'regex(^[A-Za-z0-9,-]+$)'] } },
                { position: { key: 'closed', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['default(false)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {

    function truncate( s, n = 100 ) {
        const result = typeof s === 'string'
            ? ( s.length > n ? s.slice( 0, n ) + '...' : s )
            : ''
        return result
    }
    function safeJsonParse( x ) {
        try {
            const result = typeof x === 'string' ? JSON.parse( x ) : Array.isArray( x ) ? x : []
            return result
        } catch {
            return []
        }
    }
    function kvTable( rows, headers ) {
        if( !Array.isArray( rows ) || rows.length === 0 ) {
            return 'No data available'
        }
        const widths = headers
            .map( ( h, i ) => Math.max( h.length, ...rows.map( ( r ) => String( r[i] ?? '' ).length ) ) )
        const line = '+' + widths.map( ( w ) => '-'.repeat( w + 2 ) ).join( '+' ) + '+'
        const fmtRow = ( r ) => '| ' + r
            .map( ( c, i ) => String( c ).padEnd( widths[i], ' ' ) )
            .join( ' | ' ) + ' |'
        const head = fmtRow( headers )
        const body = rows.map( fmtRow ).join( '\n' )
        const result = [line, head, line, body, line].join( '\n' )
        return result
    }
    function formatSingleEvent( ev ) {
        const title = ev?.title ?? 'N/A'
        const closed = String( ev?.closed ?? 'N/A' )
        const endDate = ev?.endDate ?? 'N/A'
        const volume = ev?.volume ?? 'N/A'
        const desc = truncate( ev?.description ?? 'N/A', 160 )
        const markets = Array.isArray( ev?.markets ) ? ev.markets : []
        let marketsSection = 'No markets available for this event.'
        if( markets.length ) {
            const rows = markets
                .map( ( m ) => {
                    const outcomes = safeJsonParse( m?.outcomes ?? '[]' )
                    const outcomePrices = safeJsonParse( m?.outcomePrices ?? '[]' )
                    const options = Object.fromEntries( outcomes.map( ( o, i ) => [o, outcomePrices[i]] ) )
                    const row = [
                        ( m?.question ?? 'N/A' ).slice( 0, 50 ),
                        JSON.stringify( options ),
                        String( m?.closed ?? 'N/A' ),
                        m?.volume ?? 'N/A'
                    ]
                    return row
                } )
            marketsSection = 'Markets:\n' + kvTable( rows, ['Question', 'Options', 'Closed', 'Volume'] )
        }
        const result = [
            `## ${title}`,
            '',
            `Closed: ${closed} | End Date: ${endDate} | Volume: ${volume}`,
            '',
            desc,
            '',
            marketsSection
        ].join( '\n' )
        return result
    }
    function formatEventsArray( arr ) {
        if( !Array.isArray( arr ) || arr.length === 0 ) {
            return 'No events found.'
        }
        const result = arr
            .map( ( ev ) => formatSingleEvent( ev ) )
            .join( '\n\n' )
        return result
    }
    function formatMarketsArray( arr ) {
        if( !Array.isArray( arr ) || arr.length === 0 ) {
            return 'No data available'
        }
        const rows = arr
            .map( ( item ) => {
                const outcomes = safeJsonParse( item?.outcomes ?? '[]' )
                const outcomePrices = safeJsonParse( item?.outcomePrices ?? '[]' )
                const options = Object.fromEntries( outcomes.map( ( o, i ) => [o, outcomePrices[i]] ) )
                const row = [
                    ( item?.question ?? 'N/A' ).slice( 0, 50 ),
                    JSON.stringify( options ),
                    item?.endDate ?? 'N/A',
                    item?.volume ?? 'N/A',
                    String( item?.closed ?? 'N/A' )
                ]
                return row
            } )
        const result = kvTable( rows, ['Question', 'Options', 'End Date', 'Volume', 'Closed'] )
        return result
    }

    return {
        searchEvents: {
            postRequest: async ( { response, struct, payload } ) => {
                const events = struct?.data?.events ?? []
                response = { text: formatEventsArray( events ) }

                return { response }
            }
        },
        getEvents: {
            postRequest: async ( { response, struct, payload } ) => {
                const events = Array.isArray( struct?.data ) ? response : []
                response = { text: formatEventsArray( events ) }

                return { response }
            }
        },
        getMarkets: {
            postRequest: async ( { response, struct, payload } ) => {
                const markets = Array.isArray( struct?.data ) ? response : []
                response = { text: formatMarketsArray( markets ) }

                return { response }
            }
        }
    }
}
