export const main = {
    namespace: 'abgeordnetenwatch',
    name: 'Abgeordnetenwatch',
    description: 'Access German politician profiles, parliament data, voting records, polls, sidejobs, and party information via the Abgeordnetenwatch open data API v2. CC0 licensed, no authentication required.',
    version: '2.0.0',
    docs: ['https://www.abgeordnetenwatch.de/api'],
    tags: ['politics', 'germany', 'parliament', 'opendata', 'democracy', 'cacheTtlDaily'],
    root: 'https://www.abgeordnetenwatch.de/api/v2',
    requiredServerParams: [],
    headers: {},
    routes: {
        listPoliticians: {
            method: 'GET',
            path: '/politicians',
            description: 'List German politicians with optional name search. Returns profile data including party affiliation, birth year, occupation, and links to mandates. Supports pagination.',
            parameters: [
                { position: { key: 'label', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'range_start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'pager_limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Get first 10 politicians', pager_limit: 10 },
                { _description: 'Search for politicians named Mueller', label: 'Mueller', pager_limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object', properties: { result: { type: 'object', properties: { count: { type: 'number' }, total: { type: 'number' }, range_start: { type: 'number' }, range_end: { type: 'number' } } } } },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, entity_type: { type: 'string' }, label: { type: 'string' }, first_name: { type: 'string' }, last_name: { type: 'string' }, sex: { type: 'string' }, year_of_birth: { type: 'number' }, party: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' } } }, occupation: { type: 'string' } } } }
                    }
                }
            }
        },
        getPolitician: {
            method: 'GET',
            path: '/politicians/:id',
            description: 'Get detailed profile of a specific politician including party, sex, birth year, occupation, residence, question statistics, and links to mandates and candidacies.',
            parameters: [
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'related_data', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get politician profile for ID 79137', id: 79137 },
                { _description: 'Get politician with related data info', id: 79137, related_data: 'show_information' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' }, first_name: { type: 'string' }, last_name: { type: 'string' }, sex: { type: 'string' }, year_of_birth: { type: 'number' }, party: { type: 'object' }, occupation: { type: 'string' }, residence: { type: 'string' }, statistic_questions: { type: 'number' }, statistic_questions_answered: { type: 'number' } } }
                    }
                }
            }
        },
        listPolls: {
            method: 'GET',
            path: '/polls',
            description: 'List parliamentary polls (roll-call votes / namentliche Abstimmungen). Returns poll topic, acceptance status, committee references, and vote tally. Filter by parliament period.',
            parameters: [
                { position: { key: 'field_legislature', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'range_start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'pager_limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Get latest 10 polls', pager_limit: 10 },
                { _description: 'Get polls for Bundestag legislature 132', field_legislature: 132, pager_limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object', properties: { result: { type: 'object', properties: { count: { type: 'number' }, total: { type: 'number' } } } } },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, entity_type: { type: 'string' }, label: { type: 'string' }, field_accepted: { type: 'boolean' }, field_committees: { type: 'array' }, field_intro: { type: 'string' }, field_poll_date: { type: 'string' } } } }
                    }
                }
            }
        },
        listVotes: {
            method: 'GET',
            path: '/votes',
            description: 'List individual politician votes on parliamentary polls. Filter by poll ID or mandate ID to get voting records. Returns vote decision (yes/no/abstain/no_show) with mandate and poll references.',
            parameters: [
                { position: { key: 'poll', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'mandate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'vote', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(yes,no,abstain,no_show)', options: ['optional()'] } },
                { position: { key: 'range_start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'pager_limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Get votes for GEAS poll 6419', poll: 6419, pager_limit: 10 },
                { _description: 'Get votes for mandate 69002 (Armand Zorn)', mandate: 69002, pager_limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object', properties: { result: { type: 'object', properties: { count: { type: 'number' }, total: { type: 'number' } } } } },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, entity_type: { type: 'string' }, label: { type: 'string' }, vote: { type: 'string', description: 'Vote decision: yes, no, abstain, or no_show' }, reason_no_show: { type: 'string' }, mandate: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' } } }, poll: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' } } }, fraction: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' } } } } } }
                    }
                }
            }
        },
        listParliaments: {
            method: 'GET',
            path: '/parliaments',
            description: 'List all parliaments tracked by Abgeordnetenwatch including Bundestag, all 16 Landtage, and the European Parliament.',
            parameters: [
                { position: { key: 'range_start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'pager_limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'List all parliaments', pager_limit: 50 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object' },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, entity_type: { type: 'string' }, label: { type: 'string' }, abgeordnetenwatch_url: { type: 'string' } } } }
                    }
                }
            }
        },
        listCandidaciesMandates: {
            method: 'GET',
            path: '/candidacies-mandates',
            description: 'List candidacies and mandates. Filter by politician ID or parliament period to find who holds or held which mandate. Returns mandate type, fraction, and electoral data.',
            parameters: [
                { position: { key: 'politician', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'parliament_period', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'range_start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'pager_limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Get mandates for politician 79137', politician: 79137, pager_limit: 10 },
                { _description: 'Get mandates for Bundestag period 132', parliament_period: 132, pager_limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object' },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, entity_type: { type: 'string' }, label: { type: 'string' }, type: { type: 'string' }, politician: { type: 'object' }, parliament_period: { type: 'object' }, fraction: { type: 'object' }, electoral_data: { type: 'object' } } } }
                    }
                }
            }
        },
        listSidejobs: {
            method: 'GET',
            path: '/sidejobs',
            description: 'List sidejobs (Nebentaetigkeiten) of politicians. Returns job title, organization, income level, category, and associated mandates. Browse all reported sidejobs with pagination.',
            parameters: [
                { position: { key: 'range_start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'pager_limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'Get latest 10 sidejobs', pager_limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object', properties: { result: { type: 'object', properties: { count: { type: 'number' }, total: { type: 'number' } } } } },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, entity_type: { type: 'string' }, label: { type: 'string' }, income_level: { type: 'string' }, interval: { type: 'string' }, data_change_date: { type: 'string' }, sidejob_organization: { type: 'object', properties: { id: { type: 'number' }, label: { type: 'string' } } }, mandates: { type: 'array' }, category: { type: 'string' }, field_city: { type: 'object' }, field_topics: { type: 'array' } } } }
                    }
                }
            }
        },
        listParties: {
            method: 'GET',
            path: '/parties',
            description: 'List all political parties tracked by Abgeordnetenwatch. Returns party ID, full name, and short name. Use the party ID to cross-reference with politicians.',
            parameters: [
                { position: { key: 'range_start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'pager_limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(1000)'] } }
            ],
            tests: [
                { _description: 'List first 20 parties', pager_limit: 20 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        meta: { type: 'object' },
                        data: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, entity_type: { type: 'string' }, label: { type: 'string' }, full_name: { type: 'string' }, short_name: { type: 'string' } } } }
                    }
                }
            }
        }
    }
}
