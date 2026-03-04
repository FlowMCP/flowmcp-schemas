// Schema for #442 — USPTO Open Data Portal (Patent File Wrapper)

export const main = {
    namespace: 'usptopeds',
    name: 'USPTO Patent Data',
    description: 'U.S. Patent and Trademark Office Open Data Portal. Search patent applications, get filing details, continuity data, assignments, attorney info, and document metadata. Covers applications filed from 2001 onward. Requires free API key from data.uspto.gov.',
    version: '2.0.0',
    docs: ['https://data.uspto.gov/apis/getting-started', 'https://data.uspto.gov/swagger/index.html'],
    tags: ['patents', 'intellectual-property', 'government', 'legal', 'us', 'cacheTtlDaily'],
    root: 'https://api.uspto.gov/api/v1',
    requiredServerParams: ['USPTO_API_KEY'],
    headers: {
        'X-API-KEY': '{{USPTO_API_KEY}}'
    },
    routes: {
        searchApplications: {
            method: 'GET',
            path: '/patent/applications/search',
            description: 'Search patent applications by keyword, inventor, assignee, title, filing date, or status. Supports Boolean operators (AND, OR, NOT), wildcards (*), and field-specific queries like inventionTitle:drone.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'fields', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(applicationNumberText,inventionTitle,filingDate,patentNumber,firstInventorName,assigneeName,applicationStatusCode)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(filingDate desc)'] } },
                { position: { key: 'filters', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'rangeFilters', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Search drone patents', q: 'inventionTitle:drone', limit: 5 },
                { _description: 'Search Tesla patents by assignee', q: 'assigneeName:Tesla', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        totalCount: { type: 'number' },
                        response: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    applicationNumberText: { type: 'string' },
                                    inventionTitle: { type: 'string' },
                                    filingDate: { type: 'string' },
                                    patentNumber: { type: 'string' },
                                    firstInventorName: { type: 'string' },
                                    assigneeName: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getApplication: {
            method: 'GET',
            path: '/patent/applications/{{APPLICATION_NUMBER}}',
            description: 'Get full patent application data by application number (e.g. 16123456). Returns complete filing information, inventors, assignees, status, and classification data.',
            parameters: [
                { position: { key: 'APPLICATION_NUMBER', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get application details', APPLICATION_NUMBER: '16000001' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'number' },
                        patentFileWrapperDataBag: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    applicationNumberText: { type: 'string' },
                                    inventionTitle: { type: 'string' },
                                    filingDate: { type: 'string' },
                                    applicationType: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        getApplicationContinuity: {
            method: 'GET',
            path: '/patent/applications/{{APPLICATION_NUMBER}}/continuity',
            description: 'Get parent/child continuity relationships for a patent application. Shows continuation, divisional, and CIP chain.',
            parameters: [
                { position: { key: 'APPLICATION_NUMBER', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get continuity data', APPLICATION_NUMBER: '16000001' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'number' },
                        patentFileWrapperDataBag: { type: 'array' }
                    }
                }
            }
        },
        getApplicationAssignment: {
            method: 'GET',
            path: '/patent/applications/{{APPLICATION_NUMBER}}/assignment',
            description: 'Get assignment/ownership transfer data for a patent application. Shows assignors, assignees, conveyance type, and recording dates.',
            parameters: [
                { position: { key: 'APPLICATION_NUMBER', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get assignment data', APPLICATION_NUMBER: '16000001' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'number' },
                        patentFileWrapperDataBag: { type: 'array' }
                    }
                }
            }
        },
        getApplicationTransactions: {
            method: 'GET',
            path: '/patent/applications/{{APPLICATION_NUMBER}}/transactions',
            description: 'Get prosecution event/transaction history for a patent application. Shows office actions, responses, fees, and status changes.',
            parameters: [
                { position: { key: 'APPLICATION_NUMBER', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get transaction history', APPLICATION_NUMBER: '16000001' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'number' },
                        patentFileWrapperDataBag: { type: 'array' }
                    }
                }
            }
        },
        getApplicationDocuments: {
            method: 'GET',
            path: '/patent/applications/{{APPLICATION_NUMBER}}/documents',
            description: 'Get file wrapper document metadata for a patent application. Lists office actions, responses, and other prosecution documents with dates and sizes.',
            parameters: [
                { position: { key: 'APPLICATION_NUMBER', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get document list', APPLICATION_NUMBER: '16000001' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        count: { type: 'number' },
                        patentFileWrapperDataBag: { type: 'array' }
                    }
                }
            }
        },
        searchTrialProceedings: {
            method: 'GET',
            path: '/patent/trials/proceedings/search',
            description: 'Search PTAB trial proceedings (IPR, PGR, CBM, derivation). Filter by trial type, patent number, or party name.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Search IPR proceedings', q: 'trialMetaData.trialTypeCode:IPR', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        totalCount: { type: 'number' },
                        response: { type: 'array' }
                    }
                }
            }
        },
        getStatusCodes: {
            method: 'GET',
            path: '/patent/status-codes',
            description: 'Get patent application status code definitions. Useful for decoding applicationStatusCode values from search results.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)'] } }
            ],
            tests: [
                { _description: 'Get all status codes', limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        totalCount: { type: 'number' },
                        response: { type: 'array' }
                    }
                }
            }
        }
    }
}
