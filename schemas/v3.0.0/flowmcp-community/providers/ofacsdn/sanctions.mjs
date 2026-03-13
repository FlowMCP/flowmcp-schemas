export const main = {
    namespace: 'ofacsdn',
    name: 'OFAC SDN Sanctions List',
    description: 'Search the US Treasury OFAC Specially Designated Nationals (SDN) sanctions list locally. 18K+ sanctioned entities with addresses, aliases, and remarks. Requires local SQLite database at ~/.flowmcp/data/ofac-sdn.db',
    version: '3.0.0',
    docs: ['https://ofac.treasury.gov/sanctions-list-service'],
    tags: ['sanctions', 'compliance', 'kyc', 'opendata'],
    root: 'local://ofacsdn',
    requiredServerParams: [],
    headers: {},
    tools: {},
    resources: {
        sanctionsDb: {
            source: 'sqlite',
            lifecycle: 'persistent',
            description: 'US Treasury OFAC SDN sanctions list with 18K+ entities. Supports full-text search by name and lookup by entry number.',
            database: '~/.flowmcp/data/ofac-sdn.db',
            queries: {
                getSchema: {
                    sql: "SELECT name, sql FROM sqlite_master WHERE type='table' ORDER BY name",
                    description: 'Returns the database schema (table names and CREATE statements).',
                    parameters: [],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string', description: 'Table name' },
                                    sql: { type: 'string', description: 'CREATE TABLE statement' }
                                }
                            }
                        }
                    },
                    tests: [
                        { _description: 'Get all table definitions' }
                    ]
                },
                searchSanctions: {
                    sql: "SELECT s.ent_num, s.sdn_name, s.sdn_type, s.program, s.remarks FROM sdn_fts fts JOIN sdn s ON s.ent_num = fts.rowid WHERE sdn_fts MATCH ? LIMIT ?",
                    description: 'Full-text search across 18K+ sanctioned entities by name. Returns entity name, type, program, and remarks. Uses FTS5 index for fast matching.',
                    parameters: [
                        { position: { key: 'query', value: '{{USER_PARAM}}' }, z: { primitive: 'string()', options: ['min(2)'] } },
                        { position: { key: 'limit', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'max(100)'] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Search for sanctioned entities matching Iran', query: 'Iran' },
                        { _description: 'Search for CUBA entries', query: 'CUBA', limit: 5 }
                    ]
                },
                getEntity: {
                    sql: "SELECT s.*, GROUP_CONCAT(DISTINCT a.address || ', ' || COALESCE(a.city_state_province, '') || ', ' || COALESCE(a.country, '')) AS addresses, GROUP_CONCAT(DISTINCT an.alt_type || ': ' || an.alt_name) AS aliases, GROUP_CONCAT(DISTINCT sc.remarks) AS comments FROM sdn s LEFT JOIN address a ON a.ent_num = s.ent_num LEFT JOIN alt_name an ON an.ent_num = s.ent_num LEFT JOIN sdn_comments sc ON sc.ent_num = s.ent_num WHERE s.ent_num = ? GROUP BY s.ent_num",
                    description: 'Get full details of a sanctioned entity by its SDN entry number (ent_num). Returns entity info with aggregated addresses, alternate names, and comments.',
                    parameters: [
                        { position: { key: 'ent_num', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: [] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Get entity details for AEROCARIBBEAN AIRLINES', ent_num: 36 }
                    ]
                },
                checkName: {
                    sql: "WITH search AS (SELECT ? AS term) SELECT s.ent_num, s.sdn_name, s.sdn_type, s.program, 'primary' AS match_type FROM sdn s, search WHERE s.sdn_name LIKE '%' || search.term || '%' UNION ALL SELECT a.ent_num, s.sdn_name, s.sdn_type, s.program, 'alias' AS match_type FROM alt_name a JOIN sdn s ON s.ent_num = a.ent_num, search WHERE a.alt_name LIKE '%' || search.term || '%' LIMIT ?",
                    description: 'Check if a name appears on the sanctions list. Searches both primary names and aliases. Returns matching entities with match type (primary/alias).',
                    parameters: [
                        { position: { key: 'name', value: '{{USER_PARAM}}' }, z: { primitive: 'string()', options: ['min(2)'] } },
                        { position: { key: 'limit', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(50)'] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Check if name appears on sanctions list', name: 'Banco Nacional' }
                    ]
                },
                freeQuery: {
                    sql: '{{DYNAMIC_SQL}}',
                    description: 'Execute a custom read-only SQL query against the OFAC SDN database. Only SELECT statements are allowed.',
                    parameters: [
                        { position: { key: 'sql', value: '{{USER_PARAM}}' }, z: { primitive: 'string()', options: ['min(6)'] } },
                        { position: { key: 'limit', value: '{{USER_PARAM}}' }, z: { primitive: 'number()', options: ['optional()', 'default(100)', 'max(1000)'] } }
                    ],
                    output: {
                        mimeType: 'application/json',
                        schema: {
                            type: 'array',
                            items: { type: 'object' }
                        }
                    },
                    tests: [
                        { _description: 'Count all sanctioned entities', sql: 'SELECT COUNT(*) as count FROM sdn', limit: 1 }
                    ]
                }
            }
        }
    }
}
