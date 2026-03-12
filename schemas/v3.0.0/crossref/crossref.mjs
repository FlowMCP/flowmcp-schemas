export const main = {
    namespace: 'crossref',
    name: 'Crossref',
    description: 'Access 150M+ DOI metadata records, citations, funders, journals, and members from the Crossref scholarly registry. Free, no key required. Add mailto for polite pool access.',
    version: '3.0.0',
    docs: ['https://www.crossref.org/documentation/retrieve-metadata/rest-api/', 'https://api.crossref.org/swagger-ui/index.html'],
    tags: ['science', 'research', 'publications', 'citations', 'doi', 'cacheTtlDaily'],
    root: 'https://api.crossref.org',
    requiredServerParams: [],
    headers: {},
    tools: {
        searchWorks: {
            method: 'GET',
            path: '/works',
            description: 'Search scholarly works across 150M+ DOI records. Filter by date, type, funder, ORCID, license, and more. Supports pagination with rows/offset or cursor.',
            parameters: [
                { position: { key: 'query', value: '{{QUERY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filter', value: '{{FILTER}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sort', value: '{{SORT}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'order', value: '{{ORDER}}', location: 'query' }, z: { primitive: 'enum(asc,desc)', options: ['optional()'] } },
                { position: { key: 'rows', value: '{{ROWS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(1000)'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'select', value: '{{SELECT}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'mailto', value: '{{MAILTO}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search works about CRISPR', query: 'CRISPR', rows: 3 },
                { _description: 'Filter works by type journal-article from 2024', filter: 'type:journal-article,from-pub-date:2024-01-01', rows: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        'message-type': { type: 'string' },
                        message: {
                            type: 'object',
                            properties: {
                                'total-results': { type: 'number' },
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            DOI: { type: 'string' },
                                            title: { type: 'array' },
                                            author: { type: 'array' },
                                            type: { type: 'string' },
                                            publisher: { type: 'string' },
                                            'is-referenced-by-count': { type: 'number' },
                                            'published-print': { type: 'object' },
                                            'published-online': { type: 'object' }
                                        }
                                    }
                                },
                                'items-per-page': { type: 'number' },
                                query: { type: 'object' }
                            }
                        }
                    }
                }
            }
        },
        getWork: {
            method: 'GET',
            path: '/works/:doi',
            description: 'Get full metadata for a single work by DOI. Returns title, authors, abstract, references, funding info, license, and citation counts.',
            parameters: [
                { position: { key: 'doi', value: '{{DOI}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'mailto', value: '{{MAILTO}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get metadata for a Nature paper', doi: '10.1038/nature12373' },
                { _description: 'Get metadata for a PLOS ONE paper', doi: '10.1371/journal.pone.0000000' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        'message-type': { type: 'string' },
                        message: {
                            type: 'object',
                            properties: {
                                DOI: { type: 'string' },
                                title: { type: 'array' },
                                author: { type: 'array' },
                                abstract: { type: 'string' },
                                type: { type: 'string' },
                                publisher: { type: 'string' },
                                'is-referenced-by-count': { type: 'number' },
                                'references-count': { type: 'number' },
                                reference: { type: 'array' },
                                funder: { type: 'array' },
                                license: { type: 'array' }
                            }
                        }
                    }
                }
            }
        },
        searchFunders: {
            method: 'GET',
            path: '/funders',
            description: 'Search the Open Funder Registry. Find funding organizations by name with metadata about associated works and DOI counts.',
            parameters: [
                { position: { key: 'query', value: '{{QUERY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'rows', value: '{{ROWS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'mailto', value: '{{MAILTO}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for NIH funders', query: 'National Institutes of Health', rows: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        'message-type': { type: 'string' },
                        message: {
                            type: 'object',
                            properties: {
                                'total-results': { type: 'number' },
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            name: { type: 'string' },
                                            location: { type: 'string' },
                                            'alt-names': { type: 'array' },
                                            uri: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        getFunder: {
            method: 'GET',
            path: '/funders/:funderId',
            description: 'Get metadata for a specific funder by Funder Registry ID. Returns name, location, alternate names, and work counts.',
            parameters: [
                { position: { key: 'funderId', value: '{{FUNDER_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'mailto', value: '{{MAILTO}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get NIH funder details', funderId: '100000002' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        'message-type': { type: 'string' },
                        message: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                location: { type: 'string' },
                                'alt-names': { type: 'array' },
                                uri: { type: 'string' },
                                tokens: { type: 'array' }
                            }
                        }
                    }
                }
            }
        },
        searchMembers: {
            method: 'GET',
            path: '/members',
            description: 'List Crossref member organizations (publishers). Filter by name, location, or prefix. Returns publisher metadata with DOI counts and coverage info.',
            parameters: [
                { position: { key: 'query', value: '{{QUERY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'rows', value: '{{ROWS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'mailto', value: '{{MAILTO}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for Elsevier member', query: 'Elsevier', rows: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        'message-type': { type: 'string' },
                        message: {
                            type: 'object',
                            properties: {
                                'total-results': { type: 'number' },
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'number' },
                                            'primary-name': { type: 'string' },
                                            location: { type: 'string' },
                                            prefixes: { type: 'array' },
                                            counts: { type: 'object' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        searchJournals: {
            method: 'GET',
            path: '/journals',
            description: 'Search journals registered with Crossref. Find by title keyword. Returns journal metadata with ISSN, publisher, subject, and DOI coverage statistics.',
            parameters: [
                { position: { key: 'query', value: '{{QUERY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'rows', value: '{{ROWS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'mailto', value: '{{MAILTO}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for journals about physics', query: 'physics', rows: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        'message-type': { type: 'string' },
                        message: {
                            type: 'object',
                            properties: {
                                'total-results': { type: 'number' },
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            ISSN: { type: 'array' },
                                            title: { type: 'string' },
                                            publisher: { type: 'string' },
                                            subjects: { type: 'array' },
                                            counts: { type: 'object' },
                                            coverage: { type: 'object' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        getJournal: {
            method: 'GET',
            path: '/journals/:issn',
            description: 'Get metadata for a specific journal by ISSN. Returns full journal info including publisher, subjects, DOI coverage, and breakdowns by type and year.',
            parameters: [
                { position: { key: 'issn', value: '{{ISSN}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'mailto', value: '{{MAILTO}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get Nature journal metadata', issn: '0028-0836' },
                { _description: 'Get Science journal metadata', issn: '0036-8075' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        'message-type': { type: 'string' },
                        message: {
                            type: 'object',
                            properties: {
                                ISSN: { type: 'array' },
                                title: { type: 'string' },
                                publisher: { type: 'string' },
                                subjects: { type: 'array' },
                                counts: { type: 'object' },
                                coverage: { type: 'object' },
                                breakdowns: { type: 'object' }
                            }
                        }
                    }
                }
            }
        },
        listTypes: {
            method: 'GET',
            path: '/types',
            description: 'List all work types used in Crossref metadata (journal-article, book-chapter, dataset, etc.). Returns type identifiers and labels.',
            parameters: [
                { position: { key: 'mailto', value: '{{MAILTO}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'List all Crossref work types' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        'message-type': { type: 'string' },
                        message: {
                            type: 'object',
                            properties: {
                                'total-results': { type: 'number' },
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            label: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
