// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "dashboardDeutschland" -> "dashboarddeutschland"

export const main = {
    namespace: 'dashboarddeutschland',
    name: 'Dashboard Deutschland API',
    description: 'DESTATIS Dashboard Deutschland providing German economic indicators, labour market data, energy statistics, trade figures, and financial market data',
    version: '2.0.0',
    docs: ['https://bundesapi.github.io/dashboard-deutschland-api/'],
    tags: ['statistics', 'germany', 'economy', 'destatis', 'cacheTtlDaily'],
    root: 'https://www.dashboard-deutschland.de',
    routes: {
        getDashboards: {
            method: 'GET',
            path: '/api/dashboard/get',
            description: 'Get all available dashboards with their categories and tile layouts. Returns dashboard name, description, and tile IDs for use with getIndicator.',
            parameters: []
        },
        getIndicator: {
            method: 'GET',
            path: '/api/tile/indicators',
            description: 'Get statistical indicator data by tile ID. Use tile IDs from getDashboards or known IDs like tile_1667811574092 (GDP), tile_1667460685909 (retail), tile_1666960424161 (Baltic Dry Index).',
            parameters: [
                { position: { key: 'ids', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getGeoData: {
            method: 'GET',
            path: '/geojson/de-all.geo.json',
            description: 'Get GeoJSON data of all German federal states for mapping via dashboardDeutschland.',
            parameters: []
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getDashboards: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

            const dashboards = raw
            .map( ( d ) => {
            const tiles = ( d.layoutTiles || [] )
            .map( ( t ) => {
            const result = { id: t.id }

            return result
            } )

            return {
            id: d.id,
            name: d.name,
            nameEn: d.nameEn || null,
            description: d.description || null,
            tileCount: tiles.length,
            tileIds: tiles
            }
            } )

            response = {
            dashboardCount: dashboards.length,
            dashboards
            }

            return { response }
        }
    },
    getIndicator: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

            const indicators = raw
            .map( ( item ) => {
            const result = {
            id: item.id,
            title: item.title || null,
            date: item.date || null
            }

            return result
            } )

            response = {
            indicatorCount: indicators.length,
            indicators
            }

            return { response }
        }
    },
    getGeoData: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.features ) { return { response }}

            const states = raw.features
            .map( ( f ) => {
            const result = {
            name: f.properties?.name || null,
            id: f.properties?.id || null
            }

            return result
            } )

            response = {
            type: raw.type,
            stateCount: states.length,
            states
            }

            return { response }
        }
    }
} )
