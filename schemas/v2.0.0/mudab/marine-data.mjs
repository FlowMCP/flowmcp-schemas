// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'mudab',
    name: 'MUDAB Marine Environment Database API',
    description: 'German Federal Institute of Hydrology (BfG) marine environment database providing monitoring data from coastal states and research institutions',
    version: '2.0.0',
    docs: ['https://mudab.api.bund.dev/'],
    tags: ['marine', 'germany', 'environment', 'monitoring', 'cacheTtlFrequent'],
    root: 'https://geoportal.bafg.de/mudab/rest/BaseController/FilterElements',
    headers: {
        'Content-Type': 'application/json'
    },
    routes: {
        getStations: {
            method: 'POST',
            path: '/STATION_SMALL',
            description: 'Get all marine monitoring stations. Returns station name, type, and compartment.',
            parameters: []
        },
        getParameters: {
            method: 'POST',
            path: '/MV_PARAMETER',
            description: 'Get all measured parameters including pollutants, nutrients, and biological indicators with their parameter groups.',
            parameters: []
        },
        getProjectStations: {
            method: 'POST',
            path: '/PROJECTSTATION_SMALL',
            description: 'Get monitoring stations associated with specific research projects. Returns structured JSON response data.',
            parameters: []
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getStations: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw ) { return { response }}

            const key = Object.keys( raw )[ 0 ]
            const stations = raw[ key ] || []

            const formatted = stations
            .slice( 0, 200 )
            .map( ( s ) => {
            const result = {
            id: s.metadataid,
            name: s.STATNAME_ST || s.NAME_PS,
            type: s.STATIONTYPE_ST || null,
            compartment: s.COMPT_DS || null
            }

            return result
            } )

            response = {
            totalStations: stations.length,
            stationCount: formatted.length,
            stations: formatted
            }

            return { response }
        }
    },
    getParameters: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw ) { return { response }}

            const key = Object.keys( raw )[ 0 ]
            const params = raw[ key ] || []

            const formatted = params
            .slice( 0, 200 )
            .map( ( p ) => {
            const result = {
            id: p.metadataid,
            parameter: p.PARAMETER,
            name: p.PARAM_NAME,
            group: p.PARAMGROUP_NAME || p.PARGROUP,
            compartment: p.COMPT_DS || null
            }

            return result
            } )

            response = {
            totalParameters: params.length,
            parameterCount: formatted.length,
            parameters: formatted
            }

            return { response }
        }
    },
    getProjectStations: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data
            if( !raw ) { return { response }}

            const key = Object.keys( raw )[ 0 ]
            const items = raw[ key ] || []

            response = {
            key,
            totalItems: items.length,
            items: items.slice( 0, 100 )
            }

            return { response }
        }
    }
} )
