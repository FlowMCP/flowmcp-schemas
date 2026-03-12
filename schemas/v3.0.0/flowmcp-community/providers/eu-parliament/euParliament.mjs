export const main = {
    namespace: 'euparliament',
    name: 'EuParliament',
    description: 'Access European Parliament open data via the v2 JSON-LD API — MEP profiles, plenary meetings, corporate bodies (committees, political groups, delegations), and parliamentary documents.',
    version: '3.0.0',
    docs: ['https://data.europarl.europa.eu/en/developer-corner/opendata-api'],
    tags: ['politics', 'europe', 'government', 'parliament', 'cacheTtlDaily'],
    root: 'https://data.europarl.europa.eu/api/v2',
    requiredServerParams: [],
    headers: {},
    tools: {
        listMeps: {
            method: 'GET',
            path: '/meps',
            description: 'List Members of the European Parliament (MEPs) with basic profile data. Supports pagination and filtering by parliamentary term (current is 10).',
            parameters: [
                { position: { key: 'format', value: 'application/ld+json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } },
                { position: { key: 'parliamentary-term', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'List first 10 MEPs', limit: 10 },
                { _description: 'List MEPs of current parliamentary term 10', limit: 5, 'parliamentary-term': 10 }
            ],
            output: {
                mimeType: 'application/ld+json',
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            description: 'Array of MEP objects (mapped from @graph via JSON-LD context)',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'MEP identifier URI (e.g., person/124831)' },
                                    type: { type: 'string', description: 'Entity type (Person)' },
                                    identifier: { type: 'string', description: 'Numeric MEP identifier' },
                                    label: { type: 'string', description: 'Full name' },
                                    familyName: { type: 'string' },
                                    givenName: { type: 'string' },
                                    sortLabel: { type: 'string' }
                                }
                            }
                        },
                        '@context': { type: 'array', description: 'JSON-LD context for semantic interpretation' }
                    }
                }
            }
        },
        getMep: {
            method: 'GET',
            path: '/meps/:mepId',
            description: 'Get detailed information about a specific MEP including biography, committee memberships, political group history, delegations, citizenship, and profile photo URL.',
            parameters: [
                { position: { key: 'format', value: 'application/ld+json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'mepId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get MEP Isabella Adinolfi by ID', mepId: '124831' },
                { _description: 'Get MEP Bernd Lange by ID', mepId: '1909' }
            ],
            output: {
                mimeType: 'application/ld+json',
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
                                    identifier: { type: 'string' },
                                    label: { type: 'string' },
                                    familyName: { type: 'string' },
                                    givenName: { type: 'string' },
                                    citizenship: { type: 'string', description: 'Country URI from EU authority table' },
                                    hasGender: { type: 'string' },
                                    placeOfBirth: { type: 'string' },
                                    img: { type: 'string', description: 'MEP photo URL' },
                                    hasMembership: { type: 'array', description: 'Array of committee, delegation, and political group memberships' }
                                }
                            }
                        },
                        '@context': { type: 'array' }
                    }
                }
            }
        },
        listMeetings: {
            method: 'GET',
            path: '/meetings',
            description: 'List plenary session meetings of the European Parliament. Each meeting includes date, multilingual labels, participants, and references to voting records and documents.',
            parameters: [
                { position: { key: 'format', value: 'application/ld+json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'List plenary meetings from 2025', limit: 5, year: 2025 },
                { _description: 'List first 10 meetings', limit: 10 }
            ],
            output: {
                mimeType: 'application/ld+json',
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'ELI meeting identifier' },
                                    type: { type: 'string', description: 'Activity' },
                                    activity_id: { type: 'string' },
                                    activity_date: { type: 'string', description: 'Meeting date' },
                                    activity_label: { type: 'object', description: 'Multilingual meeting labels (en, de, fr, etc.)' },
                                    activity_start_date: { type: 'string' },
                                    activity_end_date: { type: 'string' },
                                    had_activity_type: { type: 'string' },
                                    parliamentary_term: { type: 'string' },
                                    consists_of: { type: 'array', description: 'Sub-activities (votes, agenda items)' }
                                }
                            }
                        },
                        '@context': { type: 'array' }
                    }
                }
            }
        },
        getMeeting: {
            method: 'GET',
            path: '/meetings/:meetingId',
            description: 'Get detailed information about a specific plenary meeting including full participant list, excused members, voting records, and associated documents. Meeting ID format: MTG-PL-YYYY-MM-DD.',
            parameters: [
                { position: { key: 'format', value: 'application/ld+json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'meetingId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get plenary meeting from January 20, 2025', meetingId: 'MTG-PL-2025-01-20' }
            ],
            output: {
                mimeType: 'application/ld+json',
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
                                    activity_id: { type: 'string' },
                                    activity_date: { type: 'string' },
                                    activity_label: { type: 'object' },
                                    number_of_attendees: { type: 'number' },
                                    had_participant_person: { type: 'array', description: 'List of MEP IDs who participated' },
                                    had_excused_person: { type: 'array', description: 'List of excused MEP IDs' },
                                    documented_by_a_realization_of: { type: 'array', description: 'Related document references (minutes, voting records)' },
                                    recorded_in_a_realization_of: { type: 'array', description: 'Record references (PV, CRE, RCV, ATT, VOT)' }
                                }
                            }
                        },
                        '@context': { type: 'array' }
                    }
                }
            }
        },
        listCorporateBodies: {
            method: 'GET',
            path: '/corporate-bodies',
            description: 'List corporate bodies of the European Parliament including committees, political groups, delegations, and other organizational structures.',
            parameters: [
                { position: { key: 'format', value: 'application/ld+json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'List first 20 corporate bodies', limit: 20 }
            ],
            output: {
                mimeType: 'application/ld+json',
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'Organization URI (e.g., org/1)' },
                                    type: { type: 'string', description: 'Organization' },
                                    identifier: { type: 'string' },
                                    label: { type: 'string', description: 'Short code (e.g., ECON, REGI)' },
                                    classification: { type: 'string', description: 'Body type (committee, delegation, political group)' }
                                }
                            }
                        },
                        '@context': { type: 'array' }
                    }
                }
            }
        },
        listDocuments: {
            method: 'GET',
            path: '/documents',
            description: 'List parliamentary documents including plenary reports, amendment lists, resolutions, opinions, and other legislative documents.',
            parameters: [
                { position: { key: 'format', value: 'application/ld+json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'List 2025 parliamentary documents', limit: 10, year: 2025 },
                { _description: 'List recent documents', limit: 5 }
            ],
            output: {
                mimeType: 'application/ld+json',
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'ELI document identifier' },
                                    type: { type: 'string', description: 'Work' },
                                    work_type: { type: 'string', description: 'Document type (report, amendment list, resolution, etc.)' },
                                    identifier: { type: 'string', description: 'Document reference number' },
                                    label: { type: 'string', description: 'Short document label' }
                                }
                            }
                        },
                        '@context': { type: 'array' }
                    }
                }
            }
        }
    }
}
