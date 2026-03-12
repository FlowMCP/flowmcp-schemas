export const main = {
    namespace: 'neuris',
    name: 'NeuRIS Federal Legal Information',
    description: 'German federal legal information system (Rechtsinformationsportal des Bundes) providing access to legislation, case law, and legal documents via JSON REST API. Operated by the Federal Ministry of Justice.',
    version: '3.0.0',
    docs: ['https://docs.rechtsinformationen.bund.de/'],
    tags: ['law', 'germany', 'legislation', 'courtdecisions', 'opendata', 'cacheTtlDaily'],
    root: 'https://testphase.rechtsinformationen.bund.de/v1',
    requiredServerParams: [],
    headers: {},
    tools: {
        searchDocuments: {
            method: 'GET',
            path: '/document',
            description: 'Global full-text search across all document types (legislation, case law, literature, administrative directives). Returns paginated Hydra Collection with text match highlights.',
            parameters: [
                { position: { key: 'searchTerm', value: '{{SEARCH_TERM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'documentKind', value: '{{DOCUMENT_KIND}}', location: 'query' }, z: { primitive: 'enum(legislation,case-law,literature,administrative-directive)', options: ['optional()'] } },
                { position: { key: 'dateFrom', value: '{{DATE_FROM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'dateTo', value: '{{DATE_TO}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'size', value: '{{SIZE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)'] } },
                { position: { key: 'pageIndex', value: '{{PAGE_INDEX}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search all documents for Datenschutz', SEARCH_TERM: 'Datenschutz', SIZE: '5' },
                { _description: 'Search legislation only', SEARCH_TERM: 'Grundgesetz', DOCUMENT_KIND: 'legislation', SIZE: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        member: { type: 'array', items: { type: 'object' } },
                        totalMembers: { type: 'number' }
                    }
                }
            }
        },
        searchLegislation: {
            method: 'GET',
            path: '/legislation',
            description: 'Search German federal legislation (Gesetze und Verordnungen). Filter by ELI identifier, temporal coverage, date range, or full-text search term.',
            parameters: [
                { position: { key: 'searchTerm', value: '{{SEARCH_TERM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'eli', value: '{{ELI}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'dateFrom', value: '{{DATE_FROM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'dateTo', value: '{{DATE_TO}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'size', value: '{{SIZE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)'] } },
                { position: { key: 'pageIndex', value: '{{PAGE_INDEX}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search legislation for Grundgesetz', SEARCH_TERM: 'Grundgesetz', SIZE: '3' },
                { _description: 'Search legislation by date range', DATE_FROM: '2024-01-01', DATE_TO: '2024-12-31', SIZE: '3' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        member: { type: 'array', items: { type: 'object' } },
                        totalMembers: { type: 'number' }
                    }
                }
            }
        },
        searchCaseLaw: {
            method: 'GET',
            path: '/case-law',
            description: 'Search German federal court decisions (Rechtsprechung). Filter by file number, ECLI, court, legal effect, decision type, or full-text search.',
            parameters: [
                { position: { key: 'searchTerm', value: '{{SEARCH_TERM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'court', value: '{{COURT}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'fileNumber', value: '{{FILE_NUMBER}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'ecli', value: '{{ECLI}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'dateFrom', value: '{{DATE_FROM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'dateTo', value: '{{DATE_TO}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'size', value: '{{SIZE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)'] } },
                { position: { key: 'pageIndex', value: '{{PAGE_INDEX}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search case law for Datenschutz', SEARCH_TERM: 'Datenschutz', SIZE: '3' },
                { _description: 'Search BGH decisions', COURT: 'BGH', SIZE: '3' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        member: { type: 'array', items: { type: 'object' } },
                        totalMembers: { type: 'number' }
                    }
                }
            }
        },
        getCaseLawDecision: {
            method: 'GET',
            path: '/case-law/:documentNumber',
            description: 'Get full metadata and text of a single court decision by document number. Returns case facts, decision grounds, guiding principle, and tenor.',
            parameters: [
                { position: { key: 'documentNumber', value: '{{DOCUMENT_NUMBER}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get BAG decision on data protection', DOCUMENT_NUMBER: 'KARE600069049' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        documentNumber: { type: 'string' },
                        court: { type: 'string' },
                        decisionDate: { type: 'string' },
                        fileNumber: { type: 'string' },
                        ecli: { type: 'string' }
                    }
                }
            }
        },
        listCourts: {
            method: 'GET',
            path: '/case-law/courts',
            description: 'List all available German federal courts with case counts. Optionally filter by court type prefix (e.g. BV for BVerfG and BVerwG).',
            parameters: [
                { position: { key: 'prefix', value: '{{PREFIX}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'List all courts' },
                { _description: 'List courts starting with BV', PREFIX: 'BV' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            court: { type: 'string' },
                            count: { type: 'number' }
                        }
                    }
                }
            }
        },
        luceneSearch: {
            method: 'GET',
            path: '/document/lucene-search',
            description: 'Advanced Lucene query search across all document types. Supports AND, OR, NOT operators for complex search expressions.',
            parameters: [
                { position: { key: 'query', value: '{{QUERY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'size', value: '{{SIZE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(100)'] } },
                { position: { key: 'pageIndex', value: '{{PAGE_INDEX}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Lucene search for Grundgesetz', QUERY: 'Grundgesetz', SIZE: '3' },
                { _description: 'Lucene search for DSGVO and Schadenersatz', QUERY: 'DSGVO AND Schadenersatz', SIZE: '3' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        member: { type: 'array', items: { type: 'object' } },
                        totalMembers: { type: 'number' }
                    }
                }
            }
        },
        getStatistics: {
            method: 'GET',
            path: '/statistics',
            description: 'Get statistics about the total number of documents available, broken down by type (legislation, case-law, literature, administrative-directive).',
            parameters: [],
            tests: [
                { _description: 'Get document statistics' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        totalDocuments: { type: 'number' },
                        byType: { type: 'object' }
                    }
                }
            }
        }
    }
}
