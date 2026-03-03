export const main = {
    namespace: 'datacite',
    name: 'DataCite',
    description: 'Search and retrieve DOI metadata for research data, software, and scholarly outputs from DataCite — 60M+ DOIs across 3000+ repositories.',
    version: '2.0.0',
    docs: ['https://support.datacite.org/docs/api'],
    tags: ['doi', 'research', 'metadata', 'science', 'opendata', 'cacheTtlDaily'],
    root: 'https://api.datacite.org',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchDois: {
            method: 'GET',
            path: '/dois',
            description: 'Search for DOIs across all DataCite repositories. Supports full-text query, resource type filtering, and pagination.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'resource-type-id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(dataset,software,text,collection,image,audiovisual,workflow,other)', options: ['optional()'] } },
                { position: { key: 'registered', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'page[size]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'page[number]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(relevance,-created,created,-published,published)', options: ['optional()', 'default(relevance)'] } }
            ],
            tests: [
                { _description: 'Search for climate change datasets', query: 'climate change', 'resource-type-id': 'dataset', 'page[size]': 5 },
                { _description: 'Search for machine learning software', query: 'machine learning', 'resource-type-id': 'software', 'page[size]': 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            description: 'Array of DOI records',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'DOI identifier' },
                                    type: { type: 'string' },
                                    attributes: {
                                        type: 'object',
                                        properties: {
                                            doi: { type: 'string' },
                                            titles: { type: 'array' },
                                            creators: { type: 'array' },
                                            publisher: { type: 'string' },
                                            publicationYear: { type: 'number' },
                                            descriptions: { type: 'array' },
                                            subjects: { type: 'array' },
                                            types: { type: 'object' },
                                            dates: { type: 'array' },
                                            rightsList: { type: 'array' },
                                            citationCount: { type: 'number' },
                                            viewCount: { type: 'number' },
                                            downloadCount: { type: 'number' }
                                        }
                                    }
                                }
                            }
                        },
                        meta: {
                            type: 'object',
                            properties: {
                                total: { type: 'number', description: 'Total matching records' },
                                totalPages: { type: 'number' },
                                page: { type: 'number' }
                            }
                        }
                    }
                }
            }
        },
        getDoiById: {
            method: 'GET',
            path: '/dois/:doiPrefix/:doiSuffix',
            description: 'Retrieve full metadata for a specific DOI. Returns creators, titles, descriptions, rights, citations, and usage statistics.',
            parameters: [
                { position: { key: 'doiPrefix', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'doiSuffix', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get metadata for a Zenodo DOI', doiPrefix: '10.5281', doiSuffix: 'zenodo.3357455' },
                { _description: 'Get metadata for a Dryad dataset DOI', doiPrefix: '10.5061', doiSuffix: 'dryad.234' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                type: { type: 'string' },
                                attributes: {
                                    type: 'object',
                                    properties: {
                                        doi: { type: 'string' },
                                        titles: { type: 'array' },
                                        creators: { type: 'array' },
                                        publisher: { type: 'string' },
                                        publicationYear: { type: 'number' },
                                        descriptions: { type: 'array' },
                                        subjects: { type: 'array' },
                                        types: { type: 'object' },
                                        dates: { type: 'array' },
                                        rightsList: { type: 'array' },
                                        relatedIdentifiers: { type: 'array' },
                                        fundingReferences: { type: 'array' },
                                        geoLocations: { type: 'array' },
                                        version: { type: 'string' },
                                        citationCount: { type: 'number' },
                                        viewCount: { type: 'number' },
                                        downloadCount: { type: 'number' },
                                        state: { type: 'string' },
                                        created: { type: 'string' },
                                        registered: { type: 'string' },
                                        updated: { type: 'string' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        listClients: {
            method: 'GET',
            path: '/clients',
            description: 'List DataCite repository clients (data centers). Returns client name, type, year of registration, and associated provider.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'provider-id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'client-type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(repository,periodical)', options: ['optional()'] } },
                { position: { key: 'page[size]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'page[number]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } }
            ],
            tests: [
                { _description: 'Search for Zenodo client', query: 'zenodo', 'page[size]': 5 },
                { _description: 'List repository clients', 'client-type': 'repository', 'page[size]': 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    type: { type: 'string' },
                                    attributes: {
                                        type: 'object',
                                        properties: {
                                            name: { type: 'string' },
                                            symbol: { type: 'string' },
                                            year: { type: 'number' },
                                            clientType: { type: 'string' },
                                            url: { type: 'string' },
                                            language: { type: 'array' },
                                            isActive: { type: 'boolean' },
                                            created: { type: 'string' },
                                            updated: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        },
                        meta: {
                            type: 'object',
                            properties: {
                                total: { type: 'number' },
                                totalPages: { type: 'number' },
                                page: { type: 'number' }
                            }
                        }
                    }
                }
            }
        },
        listProviders: {
            method: 'GET',
            path: '/providers',
            description: 'List DataCite member organizations (DOI registration agencies and allocators). Returns provider name, region, and membership type.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'region', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'member-type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(direct_member,consortium,consortium_organization)', options: ['optional()'] } },
                { position: { key: 'page[size]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'page[number]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)', 'min(1)'] } }
            ],
            tests: [
                { _description: 'Search for CERN as a provider', query: 'CERN', 'page[size]': 5 },
                { _description: 'List consortium providers in Europe', 'member-type': 'consortium', 'page[size]': 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    type: { type: 'string' },
                                    attributes: {
                                        type: 'object',
                                        properties: {
                                            name: { type: 'string' },
                                            symbol: { type: 'string' },
                                            region: { type: 'string' },
                                            memberType: { type: 'string' },
                                            website: { type: 'string' },
                                            isActive: { type: 'boolean' },
                                            joined: { type: 'string' },
                                            created: { type: 'string' },
                                            updated: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        },
                        meta: {
                            type: 'object',
                            properties: {
                                total: { type: 'number' },
                                totalPages: { type: 'number' },
                                page: { type: 'number' }
                            }
                        }
                    }
                }
            }
        },
        getProviderById: {
            method: 'GET',
            path: '/providers/:providerId',
            description: 'Retrieve details for a specific DataCite provider by its symbol. Returns name, region, DOI count, and membership information.',
            parameters: [
                { position: { key: 'providerId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get CERN provider details', providerId: 'cern' },
                { _description: 'Get TIB Hannover provider details', providerId: 'tib' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                type: { type: 'string' },
                                attributes: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        symbol: { type: 'string' },
                                        region: { type: 'string' },
                                        memberType: { type: 'string' },
                                        website: { type: 'string' },
                                        isActive: { type: 'boolean' },
                                        joined: { type: 'string' },
                                        created: { type: 'string' },
                                        updated: { type: 'string' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        getDoiActivities: {
            method: 'GET',
            path: '/dois/:doiPrefix/:doiSuffix/activities',
            description: 'Retrieve the activity log for a specific DOI. Shows registration, metadata updates, and state changes over time.',
            parameters: [
                { position: { key: 'doiPrefix', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'doiSuffix', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'page[size]', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Get activity log for a Zenodo DOI', doiPrefix: '10.5281', doiSuffix: 'zenodo.3357455', 'page[size]': 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    type: { type: 'string' },
                                    attributes: {
                                        type: 'object',
                                        properties: {
                                            action: { type: 'string' },
                                            wasGeneratedBy: { type: 'string' },
                                            created: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        },
                        meta: {
                            type: 'object',
                            properties: {
                                total: { type: 'number' }
                            }
                        }
                    }
                }
            }
        },
        heartbeat: {
            method: 'GET',
            path: '/heartbeat',
            description: 'Check DataCite API health status. Returns a simple status indicator for monitoring and connectivity verification.',
            parameters: [],
            tests: [
                { _description: 'Check DataCite API health' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', description: 'API health status' }
                    }
                }
            }
        }
    }
}
