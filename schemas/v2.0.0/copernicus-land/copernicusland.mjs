export const main = {
    namespace: 'copernicusland',
    name: 'Copernicus Land Monitoring Service',
    description: 'Search the Copernicus Land Monitoring Service (CLMS) dataset catalog. Access datasets covering Urban Atlas, imperviousness, tree cover density, CORINE land cover, vegetation, water bodies, and more across Europe. Free catalog search, no API key required.',
    version: '2.0.0',
    docs: ['https://land.copernicus.eu/en', 'https://eea.github.io/clms-api-docs/download.html'],
    tags: ['geospatial', 'environment', 'europe', 'opendata', 'cacheTtlDaily'],
    root: 'https://land.copernicus.eu',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/json'
    },
    routes: {
        searchDatasets: {
            method: 'GET',
            path: '/api/@search',
            description: 'Search the CLMS dataset catalog by keyword. Returns datasets with UID, title, description, and review state. Results are paginated.',
            parameters: [
                { position: { key: 'portal_type', value: 'DataSet', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'SearchableText', value: '{{SEARCH_TEXT}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'metadata_fields', value: 'UID', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'b_size', value: '{{PAGE_SIZE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(100)'] } },
                { position: { key: 'b_start', value: '{{START}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search for Urban Atlas datasets', SearchableText: 'urban atlas', b_size: 5 },
                { _description: 'Search for imperviousness datasets', SearchableText: 'imperviousness', b_size: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { items_total: { type: 'number' }, items: { type: 'array', items: { type: 'object', properties: { UID: { type: 'string' }, title: { type: 'string' }, description: { type: 'string' } } } } } }
            }
        },
        listProducts: {
            method: 'GET',
            path: '/api/@search',
            description: 'List all CLMS product categories such as Urban Atlas, CORINE Land Cover, Imperviousness, Tree Cover, Vegetation, Water Bodies, and more.',
            parameters: [
                { position: { key: 'portal_type', value: 'Product', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'b_size', value: '{{PAGE_SIZE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(50)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'List all CLMS product categories', b_size: 50 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { items_total: { type: 'number' }, items: { type: 'array', items: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' } } } } } }
            }
        },
        datasetsByProduct: {
            method: 'GET',
            path: '/api/@search',
            description: 'List datasets within a specific product category. Product paths: urban-atlas, high-resolution-layer-imperviousness, high-resolution-layer-forests-and-tree-cover, corine-land-cover, vegetation, water-bodies.',
            parameters: [
                { position: { key: 'portal_type', value: 'DataSet', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'path.query', value: '{{PRODUCT_PATH}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'metadata_fields', value: 'UID', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'b_size', value: '{{PAGE_SIZE}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(25)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'List Urban Atlas datasets', 'path.query': '/en/products/urban-atlas', b_size: 10 },
                { _description: 'List imperviousness datasets', 'path.query': '/en/products/high-resolution-layer-imperviousness', b_size: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { items_total: { type: 'number' }, items: { type: 'array', items: { type: 'object', properties: { UID: { type: 'string' }, title: { type: 'string' }, description: { type: 'string' } } } } } }
            }
        },
        getDatasetDetail: {
            method: 'GET',
            path: '/api/en/products/:productSlug/:datasetSlug',
            description: 'Get full metadata for a specific dataset including spatial coverage, temporal extent, coordinate reference systems, resolution, and download information.',
            parameters: [
                { position: { key: 'productSlug', value: '{{PRODUCT_SLUG}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'datasetSlug', value: '{{DATASET_SLUG}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Urban Atlas 2021 detail', productSlug: 'urban-atlas', datasetSlug: 'urban-atlas-2021' },
                { _description: 'Get Imperviousness Density 2018 detail', productSlug: 'high-resolution-layer-imperviousness', datasetSlug: 'imperviousness-density-2018' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { UID: { type: 'string' }, title: { type: 'string' }, description: { type: 'string' }, characteristics_spatial_resolution: { type: 'string' }, characteristics_spatial_coverage: { type: 'string' }, characteristics_temporal_extent: { type: 'string' }, characteristics_update_frequency: { type: 'string' }, coordinateReferenceSystemList: { type: 'array', items: { type: 'string' } } } }
            }
        }
    }
}
