export const main = {
    namespace: 'europepmc',
    name: 'Europe PMC',
    description: 'Search and access 47M+ life science publications from Europe PMC. Query articles, retrieve citations and references, and access full-text content with grant linkage and text-mined annotations.',
    version: '2.0.0',
    docs: ['https://europepmc.org/RestfulWebService'],
    tags: ['science', 'publications', 'biomedical', 'openaccess', 'research', 'cacheTtlDaily'],
    root: 'https://www.ebi.ac.uk/europepmc/webservices/rest',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchArticles: {
            method: 'GET',
            path: '/search',
            description: 'Search across 47M+ articles and preprints. Supports field-specific queries (e.g. AUTH:smith, TITLE:malaria, DOI:10.xxx). Result types: idlist (IDs only), lite (default, basic metadata), core (full metadata with abstracts).',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'resultType', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(idlist,lite,core)', options: ['optional()', 'default(lite)'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'cursorMark', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search for p53 articles', query: 'p53', resultType: 'lite', pageSize: 5 },
                { _description: 'Search for articles by DOI', query: 'DOI:10.1038/nature12373', resultType: 'core', pageSize: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        hitCount: { type: 'number' },
                        nextCursorMark: { type: 'string' },
                        resultList: { type: 'object', properties: { result: { type: 'array' } } }
                    }
                }
            },
        },
        getCitations: {
            method: 'GET',
            path: '/:source/:articleId/citations',
            description: 'Get articles that cite a specific publication. Source is the database (MED for PubMed, PMC for PubMed Central, PPR for preprints). Returns citing articles with basic metadata.',
            parameters: [
                { position: { key: 'source', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(MED,PMC,PPR,PAT,AGR,CBA,CTX,ETH,HIR,NBK)', options: [] } },
                { position: { key: 'articleId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get citations for a PubMed article', source: 'MED', articleId: '33483692', pageSize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        hitCount: { type: 'number' },
                        citationList: { type: 'object', properties: { citation: { type: 'array' } } }
                    }
                }
            },
        },
        getReferences: {
            method: 'GET',
            path: '/:source/:articleId/references',
            description: 'Get the reference list of a specific publication. Returns articles cited by the specified article with basic metadata.',
            parameters: [
                { position: { key: 'source', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(MED,PMC,PPR,PAT,AGR,CBA,CTX,ETH,HIR,NBK)', options: [] } },
                { position: { key: 'articleId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get references for a PubMed article', source: 'MED', articleId: '33483692', pageSize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        hitCount: { type: 'number' },
                        referenceList: { type: 'object', properties: { reference: { type: 'array' } } }
                    }
                }
            },
        },
        getDatabaseLinks: {
            method: 'GET',
            path: '/:source/:articleId/databaseLinks',
            description: 'Get cross-references from a publication to external databases like UniProt, PDB, OMIM, and others.',
            parameters: [
                { position: { key: 'source', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(MED,PMC,PPR,PAT,AGR,CBA,CTX,ETH,HIR,NBK)', options: [] } },
                { position: { key: 'articleId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get database links for a PubMed article', source: 'MED', articleId: '33483692', pageSize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        dbCrossReferenceList: { type: 'object', properties: { dbCrossReference: { type: 'array' } } }
                    }
                }
            },
        },
        getLabsLinks: {
            method: 'GET',
            path: '/:source/:articleId/labsLinks',
            description: 'Get related links from third-party providers (e.g. Altmetric, Europe PMC Plus) for a publication. Returns external resource links with provider metadata.',
            parameters: [
                { position: { key: 'source', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(MED,PMC,PPR,PAT,AGR,CBA,CTX,ETH,HIR,NBK)', options: [] } },
                { position: { key: 'articleId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(1000)'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get labs links for a PubMed article', source: 'MED', articleId: '33483692', pageSize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        labsLinks: { type: 'array' }
                    }
                }
            },
        },
        getSearchFields: {
            method: 'GET',
            path: '/fields',
            description: 'List all available search fields that can be used in Europe PMC queries. Returns field names, types, and descriptions for constructing advanced searches.',
            parameters: [
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'List all available search fields' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        fields: { type: 'array' }
                    }
                }
            },
        }
    }
}
