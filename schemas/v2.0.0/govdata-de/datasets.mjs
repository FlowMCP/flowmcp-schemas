// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'govdata',
    name: 'GovData.de Open Data Portal',
    description: 'Search and explore German open government data (CKAN API) with 175k+ datasets from federal, state, and municipal authorities',
    version: '2.0.0',
    docs: ['https://www.govdata.de/', 'https://docs.ckan.org/en/latest/api/'],
    tags: ['government', 'opendata', 'germany', 'cacheTtlDaily'],
    root: 'https://www.govdata.de/ckan/api/3/action',
    routes: {
        searchDatasets: {
            method: 'GET',
            path: '/package_search',
            description: 'Search datasets by keyword, filter by organization or group via govdata. Supports q, fq, sort filters.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'fq', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['default(score desc, metadata_modified desc)', 'optional()'] } },
                { position: { key: 'rows', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(10)', 'optional()'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } }
            ]
        },
        getDataset: {
            method: 'GET',
            path: '/package_show',
            description: 'Get full details for a specific dataset by its name or ID via govdata. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ]
        },
        listGroups: {
            method: 'GET',
            path: '/group_list?all_fields=true',
            description: 'List all thematic groups (categories) with dataset counts via govdata. Supports limit, offset filters.',
            parameters: [
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(25)', 'optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } }
            ]
        },
        listOrganizations: {
            method: 'GET',
            path: '/organization_list?all_fields=true',
            description: 'List all publishing organizations with dataset counts via govdata. Supports limit, offset filters.',
            parameters: [
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(25)', 'optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } }
            ]
        },
        searchTags: {
            method: 'GET',
            path: '/tag_list',
            description: 'Search for tags matching a query string via govdata. Supports limit filters. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(20)', 'optional()'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    searchDatasets: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data?.result || struct?.data
            if( !raw?.results ) { return { response }}

            const datasets = raw.results
            .map( ( dataset ) => {
            const { name, title, notes, organization, groups, resources, metadata_modified } = dataset
            const resourceSummary = ( resources || [] )
            .map( ( res ) => {
            const { format, url } = res

            return { format, url }
            } )

            return {
            name,
            title,
            description: notes ? notes.substring( 0, 200 ) : null,
            organization: organization?.title || null,
            groups: ( groups || [] ).map( ( g ) => g.title ),
            resourceCount: ( resources || [] ).length,
            resources: resourceSummary,
            lastModified: metadata_modified
            }
            } )

            response = {
            totalCount: raw.count,
            returnedCount: datasets.length,
            datasets
            }

            return { response }
        }
    },
    getDataset: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data?.result || struct?.data
            if( !raw?.name ) { return { response }}

            const { name, title, notes, author, license_title, organization, groups, tags, resources, metadata_modified, extras } = raw

            const resourceList = ( resources || [] )
            .map( ( res ) => {
            const { name: resName, format, url, description } = res

            return { name: resName, format, url, description }
            } )

            const tagList = ( tags || [] ).map( ( t ) => t.name )
            const groupList = ( groups || [] ).map( ( g ) => g.title )

            response = {
            name,
            title,
            description: notes,
            author,
            license: license_title,
            organization: organization?.title || null,
            groups: groupList,
            tags: tagList,
            resourceCount: resourceList.length,
            resources: resourceList,
            lastModified: metadata_modified
            }

            return { response }
        }
    },
    listGroups: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data?.result || struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

            const groups = raw
            .map( ( group ) => {
            const { name, title, description, package_count } = group

            return { name, title, description, datasetCount: package_count }
            } )

            response = {
            totalGroups: groups.length,
            groups
            }

            return { response }
        }
    },
    listOrganizations: {
        postRequest: async ( { response, struct, payload } ) => {
            const raw = struct?.data?.result || struct?.data
            if( !Array.isArray( raw ) ) { return { response }}

            const organizations = raw
            .map( ( org ) => {
            const { name, title, description, package_count } = org

            return { name, title, description, datasetCount: package_count }
            } )

            response = {
            totalOrganizations: organizations.length,
            organizations
            }

            return { response }
        }
    }
} )
