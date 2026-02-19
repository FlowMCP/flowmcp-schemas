export const schema = {
    namespace: "patentsview",
    name: "PatentsView USPTO Patents",
    description: "Search and retrieve US patent data from the USPTO PatentsView API — patents, inventors, assignees, and CPC classifications with flexible query filters.",
    docs: ["https://search.patentsview.org/docs/docs/Search%20API/SearchAPIReference/"],
    tags: ["patents", "research", "government", "search", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://search.patentsview.org/api/v1",
    requiredServerParams: ["PATENTSVIEW_API_KEY"],
    headers: {
        "X-Api-Key": "{{PATENTSVIEW_API_KEY}}"
    },
    routes: {
        searchPatents: {
            requestMethod: "GET",
            description: "Search US patents by keyword, date range, patent type, or assignee. Returns patent ID, title, date, abstract, and inventor/assignee details. Max 25 results per request.",
            route: "/patent/",
            parameters: [
                { position: { key: "keyword", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "patent_date_from", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "patent_date_to", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "assignee_organization", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "patent_type", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(utility,design,plant,reissue,defensive publication,statutory invention registration)", options: ["optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(25)", "default(10)", "optional()"] } }
            ],
            tests: [
                { _description: "Search for recent AI patents", keyword: "artificial intelligence", patent_date_from: "2024-01-01", size: 5 },
                { _description: "Search for Apple patents in 2024", assignee_organization: "Apple Inc.", patent_date_from: "2024-01-01", patent_date_to: "2024-12-31", size: 5 },
                { _description: "Search for utility patents about blockchain", keyword: "blockchain", patent_type: "utility", size: 5 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildPatentSearchQuery" },
                { phase: "post", handlerName: "formatPatentResults" }
            ]
        },
        getPatent: {
            requestMethod: "GET",
            description: "Get detailed information for a single US patent by patent ID. Returns title, abstract, date, type, inventors, assignees, CPC classifications, and citation counts.",
            route: "/patent/",
            parameters: [
                { position: { key: "patent_id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get patent by ID", patent_id: "11734097" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildSinglePatentQuery" },
                { phase: "post", handlerName: "formatSinglePatent" }
            ]
        },
        searchInventors: {
            requestMethod: "GET",
            description: "Search patent inventors by name or location. Returns inventor ID, name, last known location, patent count, and years active.",
            route: "/inventor/",
            parameters: [
                { position: { key: "inventor_name_last", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "inventor_name_first", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "inventor_country", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(25)", "default(10)", "optional()"] } }
            ],
            tests: [
                { _description: "Search inventors by last name", inventor_name_last: "Musk", size: 5 },
                { _description: "Search inventors by full name", inventor_name_first: "Elon", inventor_name_last: "Musk", size: 5 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildInventorSearchQuery" },
                { phase: "post", handlerName: "formatInventorResults" }
            ]
        },
        searchAssignees: {
            requestMethod: "GET",
            description: "Search patent assignees (companies/organizations) by name or location. Returns assignee ID, organization name, patent count, inventor count, and years active.",
            route: "/assignee/",
            parameters: [
                { position: { key: "assignee_organization", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "assignee_country", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(25)", "default(10)", "optional()"] } }
            ],
            tests: [
                { _description: "Search for Google as assignee", assignee_organization: "Google", size: 5 },
                { _description: "Search US-based assignees", assignee_country: "US", size: 5 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildAssigneeSearchQuery" },
                { phase: "post", handlerName: "formatAssigneeResults" }
            ]
        },
        searchCpcGroups: {
            requestMethod: "GET",
            description: "Search CPC (Cooperative Patent Classification) groups by class or subclass. Returns group ID, title, and hierarchical classification path.",
            route: "/cpc_group/",
            parameters: [
                { position: { key: "cpc_subclass_id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "cpc_group_title", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "size", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(25)", "default(10)", "optional()"] } }
            ],
            tests: [
                { _description: "Search CPC groups in subclass G06N (computing arrangements based on specific computational models)", cpc_subclass_id: "G06N", size: 5 },
                { _description: "Search CPC groups by keyword in title", cpc_group_title: "neural", size: 5 }
            ],
            modifiers: [
                { phase: "pre", handlerName: "buildCpcSearchQuery" },
                { phase: "post", handlerName: "formatCpcResults" }
            ]
        }
    },
    handlers: {
        buildPatentSearchQuery: async ( { struct, payload, userParams } ) => {
            const { keyword, patent_date_from, patent_date_to, assignee_organization, patent_type, size = 10 } = userParams

            const conditions = []

            if( keyword ) {
                conditions.push( { '_text_any': { 'patent_title': keyword } } )
            }
            if( patent_date_from ) {
                conditions.push( { '_gte': { 'patent_date': patent_date_from } } )
            }
            if( patent_date_to ) {
                conditions.push( { '_lte': { 'patent_date': patent_date_to } } )
            }
            if( assignee_organization ) {
                conditions.push( { '_contains': { 'assignees.assignee_organization': assignee_organization } } )
            }
            if( patent_type ) {
                conditions.push( { '_eq': { 'patent_type': patent_type } } )
            }

            if( conditions.length === 0 ) {
                conditions.push( { '_gte': { 'patent_date': '2024-01-01' } } )
            }

            const q = conditions.length === 1
                ? conditions[0]
                : { '_and': conditions }

            const f = [
                'patent_id', 'patent_title', 'patent_date', 'patent_abstract', 'patent_type',
                'patent_num_times_cited_by_us_patents',
                'inventors.inventor_name_first', 'inventors.inventor_name_last',
                'assignees.assignee_organization'
            ]

            const s = [ { 'patent_date': 'desc' } ]
            const o = { size: Math.min( size, 25 ) }

            const params = new URLSearchParams()
            params.set( 'q', JSON.stringify( q ) )
            params.set( 'f', JSON.stringify( f ) )
            params.set( 's', JSON.stringify( s ) )
            params.set( 'o', JSON.stringify( o ) )

            const baseUrl = payload.url.split( '?' )[0]
            payload.url = `${baseUrl}?${params.toString()}`

            return { struct, payload }
        },
        buildSinglePatentQuery: async ( { struct, payload, userParams } ) => {
            const { patent_id } = userParams

            const q = { '_eq': { 'patent_id': patent_id } }
            const f = [
                'patent_id', 'patent_title', 'patent_date', 'patent_abstract', 'patent_type',
                'patent_num_claims', 'patent_num_times_cited_by_us_patents',
                'patent_num_us_patents_cited', 'patent_num_foreign_documents_cited',
                'patent_processing_days',
                'inventors.inventor_name_first', 'inventors.inventor_name_last',
                'inventors.inventor_city', 'inventors.inventor_country',
                'assignees.assignee_organization', 'assignees.assignee_country',
                'cpcs_current.cpc_group_id', 'cpcs_current.cpc_group',
                'application.filing_date'
            ]

            const o = { size: 1 }

            const params = new URLSearchParams()
            params.set( 'q', JSON.stringify( q ) )
            params.set( 'f', JSON.stringify( f ) )
            params.set( 'o', JSON.stringify( o ) )

            const baseUrl = payload.url.split( '?' )[0]
            payload.url = `${baseUrl}?${params.toString()}`

            return { struct, payload }
        },
        buildInventorSearchQuery: async ( { struct, payload, userParams } ) => {
            const { inventor_name_last, inventor_name_first, inventor_country, size = 10 } = userParams

            const conditions = []

            if( inventor_name_last ) {
                conditions.push( { '_contains': { 'inventor_name_last': inventor_name_last } } )
            }
            if( inventor_name_first ) {
                conditions.push( { '_contains': { 'inventor_name_first': inventor_name_first } } )
            }
            if( inventor_country ) {
                conditions.push( { '_eq': { 'inventor_lastknown_country': inventor_country } } )
            }

            if( conditions.length === 0 ) {
                struct.status = false
                struct.messages.push( 'At least one search parameter is required: inventor_name_last, inventor_name_first, or inventor_country' )

                return { struct, payload }
            }

            const q = conditions.length === 1
                ? conditions[0]
                : { '_and': conditions }

            const f = [
                'inventor_id', 'inventor_name_first', 'inventor_name_last',
                'inventor_lastknown_city', 'inventor_lastknown_state', 'inventor_lastknown_country',
                'inventor_num_patents', 'inventor_num_assignees', 'inventor_years_active'
            ]

            const s = [ { 'inventor_num_patents': 'desc' } ]
            const o = { size: Math.min( size, 25 ) }

            const params = new URLSearchParams()
            params.set( 'q', JSON.stringify( q ) )
            params.set( 'f', JSON.stringify( f ) )
            params.set( 's', JSON.stringify( s ) )
            params.set( 'o', JSON.stringify( o ) )

            const baseUrl = payload.url.split( '?' )[0]
            payload.url = `${baseUrl}?${params.toString()}`

            return { struct, payload }
        },
        buildAssigneeSearchQuery: async ( { struct, payload, userParams } ) => {
            const { assignee_organization, assignee_country, size = 10 } = userParams

            const conditions = []

            if( assignee_organization ) {
                conditions.push( { '_contains': { 'assignee_organization': assignee_organization } } )
            }
            if( assignee_country ) {
                conditions.push( { '_eq': { 'assignee_lastknown_country': assignee_country } } )
            }

            if( conditions.length === 0 ) {
                struct.status = false
                struct.messages.push( 'At least one search parameter is required: assignee_organization or assignee_country' )

                return { struct, payload }
            }

            const q = conditions.length === 1
                ? conditions[0]
                : { '_and': conditions }

            const f = [
                'assignee_id', 'assignee_organization', 'assignee_type',
                'assignee_lastknown_city', 'assignee_lastknown_state', 'assignee_lastknown_country',
                'assignee_num_patents', 'assignee_num_inventors', 'assignee_years_active'
            ]

            const s = [ { 'assignee_num_patents': 'desc' } ]
            const o = { size: Math.min( size, 25 ) }

            const params = new URLSearchParams()
            params.set( 'q', JSON.stringify( q ) )
            params.set( 'f', JSON.stringify( f ) )
            params.set( 's', JSON.stringify( s ) )
            params.set( 'o', JSON.stringify( o ) )

            const baseUrl = payload.url.split( '?' )[0]
            payload.url = `${baseUrl}?${params.toString()}`

            return { struct, payload }
        },
        buildCpcSearchQuery: async ( { struct, payload, userParams } ) => {
            const { cpc_subclass_id, cpc_group_title, size = 10 } = userParams

            const conditions = []

            if( cpc_subclass_id ) {
                conditions.push( { '_eq': { 'cpc_subclass_id': cpc_subclass_id } } )
            }
            if( cpc_group_title ) {
                conditions.push( { '_contains': { 'cpc_group_title': cpc_group_title } } )
            }

            if( conditions.length === 0 ) {
                struct.status = false
                struct.messages.push( 'At least one search parameter is required: cpc_subclass_id or cpc_group_title' )

                return { struct, payload }
            }

            const q = conditions.length === 1
                ? conditions[0]
                : { '_and': conditions }

            const f = [
                'cpc_group_id', 'cpc_group_title',
                'cpc_subclass_id', 'cpc_subclass',
                'cpc_class_id', 'cpc_class'
            ]

            const o = { size: Math.min( size, 25 ) }

            const params = new URLSearchParams()
            params.set( 'q', JSON.stringify( q ) )
            params.set( 'f', JSON.stringify( f ) )
            params.set( 'o', JSON.stringify( o ) )

            const baseUrl = payload.url.split( '?' )[0]
            payload.url = `${baseUrl}?${params.toString()}`

            return { struct, payload }
        },
        formatPatentResults: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || raw.error ) { return { struct, payload } }

            const patents = ( raw.patents || [] )
                .map( ( patent ) => {
                    const inventors = ( patent.inventors || [] )
                        .map( ( inv ) => {
                            const name = `${inv.inventor_name_first || ''} ${inv.inventor_name_last || ''}`.trim()

                            return name
                        } )

                    const assignees = ( patent.assignees || [] )
                        .map( ( a ) => {
                            const name = a.assignee_organization || 'Individual'

                            return name
                        } )

                    const result = {
                        patentId: patent.patent_id,
                        title: patent.patent_title,
                        date: patent.patent_date,
                        type: patent.patent_type,
                        abstract: patent.patent_abstract
                            ? patent.patent_abstract.substring( 0, 300 ) + ( patent.patent_abstract.length > 300 ? '...' : '' )
                            : null,
                        timesCited: patent.patent_num_times_cited_by_us_patents || 0,
                        inventors,
                        assignees
                    }

                    return result
                } )

            struct.data = {
                source: 'USPTO PatentsView',
                totalHits: raw.total_hits || 0,
                patentCount: patents.length,
                patents
            }

            return { struct, payload }
        },
        formatSinglePatent: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || raw.error ) { return { struct, payload } }

            const patents = raw.patents || []
            if( patents.length === 0 ) {
                struct.data = { source: 'USPTO PatentsView', found: false, patent: null }

                return { struct, payload }
            }

            const patent = patents[0]

            const inventors = ( patent.inventors || [] )
                .map( ( inv ) => {
                    const result = {
                        name: `${inv.inventor_name_first || ''} ${inv.inventor_name_last || ''}`.trim(),
                        city: inv.inventor_city || null,
                        country: inv.inventor_country || null
                    }

                    return result
                } )

            const assignees = ( patent.assignees || [] )
                .map( ( a ) => {
                    const result = {
                        organization: a.assignee_organization || 'Individual',
                        country: a.assignee_country || null
                    }

                    return result
                } )

            const cpcClasses = ( patent.cpcs_current || [] )
                .map( ( cpc ) => {
                    const result = {
                        groupId: cpc.cpc_group_id,
                        group: cpc.cpc_group
                    }

                    return result
                } )

            struct.data = {
                source: 'USPTO PatentsView',
                found: true,
                patent: {
                    patentId: patent.patent_id,
                    title: patent.patent_title,
                    date: patent.patent_date,
                    type: patent.patent_type,
                    abstract: patent.patent_abstract || null,
                    processingDays: patent.patent_processing_days || null,
                    filingDate: patent.application?.filing_date || null,
                    citations: {
                        timesCited: patent.patent_num_times_cited_by_us_patents || 0,
                        usPatentsCited: patent.patent_num_us_patents_cited || 0,
                        foreignDocsCited: patent.patent_num_foreign_documents_cited || 0
                    },
                    inventors,
                    assignees,
                    cpcClasses
                }
            }

            return { struct, payload }
        },
        formatInventorResults: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || raw.error ) { return { struct, payload } }

            const inventors = ( raw.inventors || [] )
                .map( ( inv ) => {
                    const result = {
                        inventorId: inv.inventor_id,
                        firstName: inv.inventor_name_first,
                        lastName: inv.inventor_name_last,
                        city: inv.inventor_lastknown_city || null,
                        state: inv.inventor_lastknown_state || null,
                        country: inv.inventor_lastknown_country || null,
                        numPatents: inv.inventor_num_patents || 0,
                        numAssignees: inv.inventor_num_assignees || 0,
                        yearsActive: inv.inventor_years_active || 0
                    }

                    return result
                } )

            struct.data = {
                source: 'USPTO PatentsView',
                totalHits: raw.total_hits || 0,
                inventorCount: inventors.length,
                inventors
            }

            return { struct, payload }
        },
        formatAssigneeResults: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || raw.error ) { return { struct, payload } }

            const assignees = ( raw.assignees || [] )
                .map( ( a ) => {
                    const result = {
                        assigneeId: a.assignee_id,
                        organization: a.assignee_organization || null,
                        type: a.assignee_type || null,
                        city: a.assignee_lastknown_city || null,
                        state: a.assignee_lastknown_state || null,
                        country: a.assignee_lastknown_country || null,
                        numPatents: a.assignee_num_patents || 0,
                        numInventors: a.assignee_num_inventors || 0,
                        yearsActive: a.assignee_years_active || 0
                    }

                    return result
                } )

            struct.data = {
                source: 'USPTO PatentsView',
                totalHits: raw.total_hits || 0,
                assigneeCount: assignees.length,
                assignees
            }

            return { struct, payload }
        },
        formatCpcResults: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw || raw.error ) { return { struct, payload } }

            const cpcGroups = ( raw.cpc_groups || [] )
                .map( ( group ) => {
                    const result = {
                        groupId: group.cpc_group_id,
                        groupTitle: group.cpc_group_title,
                        subclassId: group.cpc_subclass_id,
                        subclass: group.cpc_subclass,
                        classId: group.cpc_class_id,
                        className: group.cpc_class
                    }

                    return result
                } )

            struct.data = {
                source: 'USPTO PatentsView',
                totalHits: raw.total_hits || 0,
                groupCount: cpcGroups.length,
                cpcGroups
            }

            return { struct, payload }
        }
    }
}
