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
            ],
            tests: [
                { _description: 'Search for energy datasets', q: 'energie', rows: 5 },
                { _description: 'Search for climate datasets', q: 'klima', rows: 3 },
                { _description: 'Search for transport datasets', q: 'verkehr', rows: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        help: { type: 'string' },
                        success: { type: 'boolean' },
                        result: { type: 'object', properties: { count: { type: 'number' }, facets: { type: 'object' }, results: { type: 'array', items: { type: 'object' } }, sort: { type: 'string' }, search_facets: { type: 'object' } } }
                    }
                }
            },
        },
        getDataset: {
            method: 'GET',
            path: '/package_show',
            description: 'Get full details for a specific dataset by its name or ID via govdata. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get energy production index dataset', id: 'produktionsindex-energie' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        help: { type: 'string' },
                        success: { type: 'boolean' },
                        result: { type: 'object', properties: { author: { type: 'string', nullable: true }, author_email: { type: 'string', nullable: true }, creator_user_id: { type: 'string' }, id: { type: 'string' }, isopen: { type: 'boolean' }, license_id: { type: 'string' }, license_title: { type: 'string' }, maintainer: { type: 'string', nullable: true }, maintainer_email: { type: 'string', nullable: true }, metadata_created: { type: 'string' }, metadata_modified: { type: 'string' }, name: { type: 'string' }, notes: { type: 'string' }, num_resources: { type: 'number' }, num_tags: { type: 'number' }, organization: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, title: { type: 'string' }, type: { type: 'string' }, description: { type: 'string' }, image_url: { type: 'string' }, created: { type: 'string' }, is_organization: { type: 'boolean' }, approval_status: { type: 'string' }, state: { type: 'string' } } }, owner_org: { type: 'string' }, private: { type: 'boolean' }, state: { type: 'string' }, title: { type: 'string' }, type: { type: 'string' }, url: { type: 'string', nullable: true }, version: { type: 'string', nullable: true }, extras: { type: 'array', items: { type: 'object' } }, groups: { type: 'array', items: { type: 'object' } }, resources: { type: 'array', items: { type: 'object' } }, tags: { type: 'array', items: { type: 'object' } }, relationships_as_subject: { type: 'array', items: { type: 'string' } }, relationships_as_object: { type: 'array', items: { type: 'string' } } } }
                    }
                }
            },
        },
        listGroups: {
            method: 'GET',
            path: '/group_list?all_fields=true',
            description: 'List all thematic groups (categories) with dataset counts via govdata. Supports limit, offset filters.',
            parameters: [
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(25)', 'optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } }
            ],
            tests: [
                { _description: 'List all groups with details', limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        help: { type: 'string' },
                        success: { type: 'boolean' },
                        result: { type: 'array', items: { type: 'object', properties: { approval_status: { type: 'string' }, created: { type: 'string' }, description: { type: 'string' }, display_name: { type: 'string' }, id: { type: 'string' }, image_display_url: { type: 'string' }, image_url: { type: 'string' }, is_organization: { type: 'boolean' }, name: { type: 'string' }, num_followers: { type: 'number' }, package_count: { type: 'number' }, state: { type: 'string' }, title: { type: 'string' }, type: { type: 'string' } } } }
                    }
                }
            },
        },
        listOrganizations: {
            method: 'GET',
            path: '/organization_list?all_fields=true',
            description: 'List all publishing organizations with dataset counts via govdata. Supports limit, offset filters.',
            parameters: [
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(25)', 'optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)', 'optional()'] } }
            ],
            tests: [
                { _description: 'List organizations', limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        help: { type: 'string' },
                        success: { type: 'boolean' },
                        result: { type: 'array', items: { type: 'object', properties: { approval_status: { type: 'string' }, created: { type: 'string' }, description: { type: 'string' }, display_name: { type: 'string' }, id: { type: 'string' }, image_display_url: { type: 'string' }, image_url: { type: 'string' }, is_organization: { type: 'boolean' }, name: { type: 'string' }, num_followers: { type: 'number' }, package_count: { type: 'number' }, state: { type: 'string' }, title: { type: 'string' }, type: { type: 'string' } } } }
                    }
                }
            },
        },
        searchTags: {
            method: 'GET',
            path: '/tag_list',
            description: 'Search for tags matching a query string via govdata. Supports limit filters. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'default(20)', 'optional()'] } }
            ],
            tests: [
                { _description: 'Search for climate tags', query: 'klima', limit: 10 },
                { _description: 'Search for energy tags', query: 'energie', limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        help: { type: 'string' },
                        success: { type: 'boolean' },
                        result: { type: 'array', items: { type: 'string' } }
                    }
                }
            },
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
