export const main = {
    namespace: 'cernopendata',
    name: 'CERN Open Data Portal',
    description: 'Access the CERN Open Data Portal for particle physics datasets, software, and documentation. Search 50,000+ records from LHC experiments (ATLAS, CMS, LHCb, ALICE), including collision data, simulated data, analysis tools, and educational resources. Data covers the Higgs boson discovery and beyond. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://opendata.cern.ch/docs/about'],
    tags: ['science', 'physics', 'opendata', 'research', 'cacheTtlDaily'],
    root: 'https://opendata.cern.ch',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/json'
    },
    tools: {
        searchRecords: {
            method: 'GET',
            path: '/api/records/',
            description: 'Search CERN Open Data records. Query particle physics datasets, software, documentation, and educational materials. Filter by experiment (CMS, ATLAS, LHCb, ALICE, OPERA), type (Dataset, Software, Documentation, Environment), and keywords. Returns metadata including title, abstract, authors, experiment, date, and file information.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default()'] } },
                { position: { key: 'size', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(Dataset,Software,Documentation,Environment)', options: ['optional()'] } },
                { position: { key: 'experiment', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(CMS,ATLAS,LHCb,ALICE,OPERA,PHENIX)', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for Higgs datasets', q: 'Higgs', size: 3 },
                { _description: 'CMS datasets', experiment: 'CMS', type: 'Dataset', size: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { hits: { type: 'object', properties: { total: { type: 'number' }, hits: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, created: { type: 'string' }, updated: { type: 'string' }, metadata: { type: 'object', properties: { title: { type: 'string' }, abstract: { type: 'object' }, experiment: { type: 'array' }, type: { type: 'object' }, date_published: { type: 'string' }, keywords: { type: 'array' }, recid: { type: 'number' } } } } } } } }, links: { type: 'object' } } }
            }
        },
        getRecord: {
            method: 'GET',
            path: '/api/records/:recid',
            description: 'Get a specific CERN Open Data record by its record ID. Returns full metadata including title, abstract, authors, experiment, files, methodology, and usage instructions.',
            parameters: [
                { position: { key: 'recid', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Get Higgs to four leptons example', recid: 5500 },
                { _description: 'Get CMS primary dataset', recid: 6021 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { id: { type: 'number' }, created: { type: 'string' }, updated: { type: 'string' }, metadata: { type: 'object', properties: { title: { type: 'string' }, abstract: { type: 'object' }, experiment: { type: 'array' }, type: { type: 'object' }, date_published: { type: 'string' }, authors: { type: 'array' }, files: { type: 'array' }, methodology: { type: 'object' }, usage: { type: 'object' }, license: { type: 'object' } } } } }
            }
        }
    }
}
