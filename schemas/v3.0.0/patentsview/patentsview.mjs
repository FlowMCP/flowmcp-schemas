export const main = {
    namespace: 'patentsview',
    name: 'PatentsView',
    description: 'Search and analyze USPTO patent data — granted patents, pre-grant publications, inventors, assignees, citations, and classifications via the PatentsView API from the Office of the Chief Economist.',
    version: '3.0.0',
    docs: ['https://search.patentsview.org/docs/', 'https://patentsview.org/apis/api-endpoints'],
    tags: ['patents', 'intellectual-property', 'research', 'government', 'usa', 'cacheTtlDaily'],
    root: 'https://search.patentsview.org',
    requiredServerParams: ['PATENTSVIEW_API_KEY'],
    headers: {
        'X-Api-Key': '{{PATENTSVIEW_API_KEY}}',
        'Content-Type': 'application/json'
    },
    tools: {
        searchPatents: {
            method: 'POST',
            path: '/api/v1/patent/',
            description: 'Search granted US patents by query criteria. Supports filtering by patent ID, title, date, inventor name, assignee, and CPC classification. Returns patent metadata, inventors, and assignees.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'f', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 's', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'o', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search patents by patent ID', q: '{"patent_id":"11000000"}', f: '["patent_id","patent_title","patent_date","patent_abstract"]' },
                { _description: 'Search Apple patents from 2023', q: '{"_and":[{"assignees.assignee_organization":"Apple Inc."},{"_gte":{"patent_date":"2023-01-01"}}]}', f: '["patent_id","patent_title","patent_date"]', o: '{"size":10}' },
                { _description: 'Search AI-related patents', q: '{"_text_any":{"patent_title":"artificial intelligence machine learning"}}', f: '["patent_id","patent_title","patent_date","assignees.assignee_organization"]', o: '{"size":5}' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        patents: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    patent_id: { type: 'string', description: 'Patent number' },
                                    patent_title: { type: 'string', description: 'Patent title' },
                                    patent_date: { type: 'string', description: 'Grant date (YYYY-MM-DD)' },
                                    patent_abstract: { type: 'string', description: 'Patent abstract text' }
                                }
                            }
                        },
                        count: { type: 'integer', description: 'Number of results returned' },
                        total_hits: { type: 'integer', description: 'Total matching patents' }
                    }
                }
            }
        },
        searchInventors: {
            method: 'POST',
            path: '/api/v1/inventor/',
            description: 'Search patent inventors by name, location, or associated patent criteria. Returns inventor details including total patent counts and locations.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'f', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 's', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'o', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search inventors named Smith', q: '{"inventor_name_last":"Smith"}', f: '["inventor_id","inventor_name_first","inventor_name_last","inventor_num_patents"]', o: '{"size":10}' },
                { _description: 'Search prolific inventors with 100+ patents', q: '{"_gte":{"inventor_num_patents":100}}', f: '["inventor_id","inventor_name_first","inventor_name_last","inventor_num_patents"]', o: '{"size":10}' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        inventors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    inventor_id: { type: 'string', description: 'Unique inventor ID' },
                                    inventor_name_first: { type: 'string', description: 'First name' },
                                    inventor_name_last: { type: 'string', description: 'Last name' },
                                    inventor_num_patents: { type: 'integer', description: 'Total number of patents' }
                                }
                            }
                        },
                        count: { type: 'integer' },
                        total_hits: { type: 'integer' }
                    }
                }
            }
        },
        searchAssignees: {
            method: 'POST',
            path: '/api/v1/assignee/',
            description: 'Search patent assignees (companies, universities, organizations). Returns assignee details including organization name, location, and total patent count.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'f', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 's', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'o', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search Google as assignee', q: '{"assignee_organization":"Google LLC"}', f: '["assignee_id","assignee_organization","assignee_num_patents"]' },
                { _description: 'Search top assignees with 10000+ patents', q: '{"_gte":{"assignee_num_patents":10000}}', f: '["assignee_id","assignee_organization","assignee_num_patents"]', o: '{"size":10}' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        assignees: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    assignee_id: { type: 'string', description: 'Unique assignee ID' },
                                    assignee_organization: { type: 'string', description: 'Organization name' },
                                    assignee_num_patents: { type: 'integer', description: 'Total patents held' }
                                }
                            }
                        },
                        count: { type: 'integer' },
                        total_hits: { type: 'integer' }
                    }
                }
            }
        },
        getPatentCitations: {
            method: 'POST',
            path: '/api/v1/patent/us_patent_citation/',
            description: 'Get US patent citations for specific patents. Shows which patents cite or are cited by a given patent, useful for prior art and technology lineage analysis.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'f', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'o', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get citations for patent 11000000', q: '{"patent_id":"11000000"}', f: '["patent_id","citation_patent_id","citation_category","citation_date","citation_sequence"]' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        us_patent_citations: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    patent_id: { type: 'string', description: 'Citing patent ID' },
                                    citation_patent_id: { type: 'string', description: 'Cited patent ID' },
                                    citation_category: { type: 'string', description: 'Citation category (e.g. cited by examiner)' },
                                    citation_date: { type: 'string', description: 'Citation date' },
                                    citation_sequence: { type: 'integer', description: 'Sequence number in citation list' }
                                }
                            }
                        },
                        count: { type: 'integer' },
                        total_hits: { type: 'integer' }
                    }
                }
            }
        },
        searchPublications: {
            method: 'POST',
            path: '/api/v1/publication/',
            description: 'Search pre-grant patent publications (published applications). Returns publication details before patent grant, useful for tracking pending patents.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'f', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 's', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'o', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search recent AI publications', q: '{"_and":[{"_text_any":{"publication_title":"artificial intelligence"}},{"_gte":{"publication_date":"2024-01-01"}}]}', f: '["document_number","publication_title","publication_date","publication_abstract"]', o: '{"size":5}' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        publications: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    document_number: { type: 'string', description: 'Publication document number' },
                                    publication_title: { type: 'string', description: 'Publication title' },
                                    publication_date: { type: 'string', description: 'Publication date (YYYY-MM-DD)' },
                                    publication_abstract: { type: 'string', description: 'Abstract text' }
                                }
                            }
                        },
                        count: { type: 'integer' },
                        total_hits: { type: 'integer' }
                    }
                }
            }
        },
        searchLocations: {
            method: 'POST',
            path: '/api/v1/location/',
            description: 'Search patent-related locations (inventor or assignee locations). Returns geographic data including city, state, country, and coordinates.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'f', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'o', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search locations in California', q: '{"location_state":"CA"}', f: '["location_id","location_city","location_state","location_country","location_latitude","location_longitude"]', o: '{"size":10}' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        locations: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    location_id: { type: 'string', description: 'Unique location ID' },
                                    location_city: { type: 'string', description: 'City name' },
                                    location_state: { type: 'string', description: 'State/province code' },
                                    location_country: { type: 'string', description: 'Country code' },
                                    location_latitude: { type: 'number', description: 'Latitude' },
                                    location_longitude: { type: 'number', description: 'Longitude' }
                                }
                            }
                        },
                        count: { type: 'integer' },
                        total_hits: { type: 'integer' }
                    }
                }
            }
        },
        searchCpcGroups: {
            method: 'POST',
            path: '/api/v1/cpc_group/',
            description: 'Search CPC (Cooperative Patent Classification) groups. Useful for finding patents by technology area using the hierarchical CPC classification system.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'f', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'o', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search CPC groups under H04L (transmission of digital info)', q: '{"_begins":{"cpc_group_id":"H04L"}}', f: '["cpc_group_id","cpc_group_title"]', o: '{"size":10}' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        cpc_groups: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    cpc_group_id: { type: 'string', description: 'CPC group code e.g. H04L29/06' },
                                    cpc_group_title: { type: 'string', description: 'Group title/description' }
                                }
                            }
                        },
                        count: { type: 'integer' },
                        total_hits: { type: 'integer' }
                    }
                }
            }
        },
        getPatentClaims: {
            method: 'POST',
            path: '/api/v1/g_claim/',
            description: 'Retrieve the full claim text for granted patents. Claims define the legal scope of patent protection. Returns individual numbered claims.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'f', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'o', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get claims for patent 11000000', q: '{"patent_id":"11000000"}', f: '["patent_id","claim_number","claim_text"]' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        g_claims: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    patent_id: { type: 'string', description: 'Patent number' },
                                    claim_number: { type: 'string', description: 'Claim number (1, 2, 3...)' },
                                    claim_text: { type: 'string', description: 'Full claim text' }
                                }
                            }
                        },
                        count: { type: 'integer' },
                        total_hits: { type: 'integer' }
                    }
                }
            }
        }
    }
}
