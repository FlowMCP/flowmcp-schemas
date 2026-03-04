export const main = {
    namespace: 'dataeuropaeu',
    name: 'data.europa.eu',
    description: 'Search and explore the official European Union open data portal with 1.6M+ datasets from 36 countries and 200+ catalogues. Find datasets by keyword, country, and catalogue. Access metadata including descriptions, keywords, distributions, and publisher information.',
    version: '2.0.0',
    docs: ['https://data.europa.eu/en', 'https://data.europa.eu/api/hub/search/'],
    tags: ['opendata', 'government', 'europe', 'datasets', 'catalog', 'cacheTtlDaily'],
    root: 'https://data.europa.eu/api/hub/search',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchDatasets: {
            method: 'GET',
            path: '/search',
            description: 'Search for datasets across all European open data portals by keyword. Returns matching datasets with metadata including title, description, keywords, country, catalogue, publisher, and distributions (download links).',
            parameters: [
                { position: { key: 'q', value: '{{QUERY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(100)'] } },
                { position: { key: 'page', value: '{{PAGE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'filter', value: '{{FILTER}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sort', value: '{{SORT}}', location: 'query' }, z: { primitive: 'enum(relevance+desc,modified+desc,issued+desc,title+asc)', options: ['optional()', 'default(relevance+desc)'] } }
            ],
            tests: [
                { _description: 'Search for climate datasets', q: 'climate change', limit: 5 },
                { _description: 'Search for transport datasets', q: 'transport', limit: 3 },
                { _description: 'Search for health data', q: 'public health', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { result: { type: 'object', properties: { count: { type: 'number' }, results: { type: 'array', items: { type: 'object', properties: { identifier: { type: 'array' }, resource: { type: 'string' }, country: { type: 'object', properties: { id: { type: 'string' }, label: { type: 'string' } } }, keywords: { type: 'array', items: { type: 'object', properties: { language: { type: 'string' }, label: { type: 'string' } } } }, catalog: { type: 'object', properties: { id: { type: 'string' }, homepage: { type: 'string' } } } } } } } } } }
            }
        },
        getDataset: {
            method: 'GET',
            path: '/datasets/:datasetId',
            description: 'Get detailed metadata for a specific dataset by its ID. Returns full information including title, description, keywords, distributions (download URLs and formats), publisher, license, temporal and spatial coverage.',
            parameters: [
                { position: { key: 'datasetId', value: '{{DATASET_ID}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Basel air quality dataset', datasetId: '100081-kanton-basel-stadt' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { result: { type: 'object', properties: { identifier: { type: 'array' }, resource: { type: 'string' }, country: { type: 'object' }, keywords: { type: 'array' }, catalog: { type: 'object' }, title: { type: 'object' }, description: { type: 'object' }, distributions: { type: 'array', items: { type: 'object', properties: { format: { type: 'object' }, accessUrl: { type: 'string' }, downloadUrl: { type: 'string' } } } }, publisher: { type: 'object' }, license: { type: 'object' }, issued: { type: 'string' }, modified: { type: 'string' } } } } }
            }
        },
        listCatalogues: {
            method: 'GET',
            path: '/catalogues',
            description: 'List all available data catalogues (data portals) aggregated by data.europa.eu. Returns catalogue identifiers from 200+ national and regional open data portals across Europe.',
            parameters: [
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'List first 20 catalogues', limit: 20 },
                { _description: 'List all catalogues' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'string' } }
            }
        }
    }
}
