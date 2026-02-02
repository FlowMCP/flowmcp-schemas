export const schema = {
    namespace: "govdata",
    name: "GovData.de Open Data Portal",
    description: "Search and explore German open government data (CKAN API) with 175k+ datasets from federal, state, and municipal authorities",
    docs: ["https://www.govdata.de/", "https://docs.ckan.org/en/latest/api/"],
    tags: ["government", "opendata", "germany", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://www.govdata.de/ckan/api/3/action",
    requiredServerParams: [],
    headers: {},
    routes: {
        searchDatasets: {
            requestMethod: "GET",
            description: "Search datasets by keyword, filter by organization or group via govdata. Supports q, fq, sort filters.",
            route: "/package_search",
            parameters: [
                { position: { key: "q", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "fq", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "sort", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["default(score desc, metadata_modified desc)", "optional()"] } },
                { position: { key: "rows", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(10)", "optional()"] } },
                { position: { key: "start", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "Search for energy datasets", q: "energie", rows: 5 },
                { _description: "Search for climate datasets", q: "klima", rows: 3 },
                { _description: "Search for transport datasets", q: "verkehr", rows: 5 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatDatasetSearch" }
            ]
        },
        getDataset: {
            requestMethod: "GET",
            description: "Get full details for a specific dataset by its name or ID via govdata. Returns structured JSON response data.",
            route: "/package_show",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Get energy production index dataset", id: "produktionsindex-energie" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatDatasetDetail" }
            ]
        },
        listGroups: {
            requestMethod: "GET",
            description: "List all thematic groups (categories) with dataset counts via govdata. Supports limit, offset filters.",
            route: "/group_list",
            parameters: [
                { position: { key: "all_fields", value: "true", location: "query" }, z: { primitive: "boolean()", options: ["default(true)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(25)", "optional()"] } },
                { position: { key: "offset", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "List all groups with details", limit: 10 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatGroupList" }
            ]
        },
        listOrganizations: {
            requestMethod: "GET",
            description: "List all publishing organizations with dataset counts via govdata. Supports limit, offset filters.",
            route: "/organization_list",
            parameters: [
                { position: { key: "all_fields", value: "true", location: "query" }, z: { primitive: "boolean()", options: ["default(true)"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(25)", "optional()"] } },
                { position: { key: "offset", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "default(0)", "optional()"] } }
            ],
            tests: [
                { _description: "List organizations", limit: 10 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatOrganizationList" }
            ]
        },
        searchTags: {
            requestMethod: "GET",
            description: "Search for tags matching a query string via govdata. Supports limit filters. Returns structured JSON response data.",
            route: "/tag_list",
            parameters: [
                { position: { key: "query", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "default(20)", "optional()"] } }
            ],
            tests: [
                { _description: "Search for climate tags", query: "klima", limit: 10 },
                { _description: "Search for energy tags", query: "energie", limit: 10 }
            ],
            modifiers: []
        }
    },
    handlers: {
        formatDatasetSearch: async ( { struct, payload } ) => {
            const raw = struct?.data?.result || struct?.data
            if( !raw?.results ) { return { struct, payload } }

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

            struct.data = {
                totalCount: raw.count,
                returnedCount: datasets.length,
                datasets
            }

            return { struct, payload }
        },
        formatDatasetDetail: async ( { struct, payload } ) => {
            const raw = struct?.data?.result || struct?.data
            if( !raw?.name ) { return { struct, payload } }

            const { name, title, notes, author, license_title, organization, groups, tags, resources, metadata_modified, extras } = raw

            const resourceList = ( resources || [] )
                .map( ( res ) => {
                    const { name: resName, format, url, description } = res

                    return { name: resName, format, url, description }
                } )

            const tagList = ( tags || [] ).map( ( t ) => t.name )
            const groupList = ( groups || [] ).map( ( g ) => g.title )

            struct.data = {
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

            return { struct, payload }
        },
        formatGroupList: async ( { struct, payload } ) => {
            const raw = struct?.data?.result || struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

            const groups = raw
                .map( ( group ) => {
                    const { name, title, description, package_count } = group

                    return { name, title, description, datasetCount: package_count }
                } )

            struct.data = {
                totalGroups: groups.length,
                groups
            }

            return { struct, payload }
        },
        formatOrganizationList: async ( { struct, payload } ) => {
            const raw = struct?.data?.result || struct?.data
            if( !Array.isArray( raw ) ) { return { struct, payload } }

            const organizations = raw
                .map( ( org ) => {
                    const { name, title, description, package_count } = org

                    return { name, title, description, datasetCount: package_count }
                } )

            struct.data = {
                totalOrganizations: organizations.length,
                organizations
            }

            return { struct, payload }
        }
    }
}
