export const main = {
    namespace: 'ckandatagov',
    name: 'CKAN (data.gov)',
    description: 'Search and explore US government open datasets via the CKAN API at data.gov (250K+ datasets). Retrieve dataset metadata, tags, groups, organizations, and resources. The same API works with any CKAN-powered portal (e.g. data.gov.uk, data.europa.eu) by changing the root URL.',
    version: '2.0.0',
    docs: ['https://docs.ckan.org/en/latest/api/index.html', 'https://catalog.data.gov/api/3'],
    tags: ['opendata', 'government', 'datasets', 'catalog', 'cacheTtlDaily'],
    root: 'https://catalog.data.gov/api/3',
    requiredServerParams: [],
    headers: {},
    routes: {
        packageSearch: {
            method: 'GET',
            path: '/action/package_search',
            description: 'Search for datasets by keywords, filters, and facets. Returns matching datasets with metadata including title, description, resources, tags, and organization. Supports Solr query syntax.',
            parameters: [
                { position: { key: 'q', value: '{{QUERY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(*)'] } },
                { position: { key: 'fq', value: '{{FILTER_QUERY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sort', value: '{{SORT}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(score desc, metadata_modified desc)'] } },
                { position: { key: 'rows', value: '{{ROWS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(1000)'] } },
                { position: { key: 'start', value: '{{START}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search for climate datasets', q: 'climate change' },
                { _description: 'Search for health datasets limited to 5', q: 'public health', rows: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { success: { type: 'boolean' }, result: { type: 'object', properties: { count: { type: 'number' }, results: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, title: { type: 'string' }, notes: { type: 'string' }, metadata_modified: { type: 'string' }, organization: { type: 'object' }, resources: { type: 'array' }, tags: { type: 'array' } } } } } } } }
            }
        },
        packageShow: {
            method: 'GET',
            path: '/action/package_show',
            description: 'Get full metadata for a single dataset by its ID or name. Returns title, description, resources (downloadable files), tags, organization, license, and update timestamps.',
            parameters: [
                { position: { key: 'id', value: '{{DATASET_ID}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get details of a known dataset', id: 'food-access-research-atlas' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { success: { type: 'boolean' }, result: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, title: { type: 'string' }, notes: { type: 'string' }, license_title: { type: 'string' }, organization: { type: 'object' }, resources: { type: 'array' }, tags: { type: 'array' }, metadata_modified: { type: 'string' } } } } }
            }
        },
        tagList: {
            method: 'GET',
            path: '/action/tag_list',
            description: 'List available tags, optionally filtered by a search string. Tags are used to categorize datasets across the catalog.',
            parameters: [
                { position: { key: 'query', value: '{{TAG_QUERY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'all_fields', value: '{{ALL_FIELDS}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Search for climate-related tags', query: 'climate' },
                { _description: 'List tags with full details', query: 'health', all_fields: true }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { success: { type: 'boolean' }, result: { type: 'array', items: { type: 'string' } } } }
            }
        },
        groupList: {
            method: 'GET',
            path: '/action/group_list',
            description: 'List available dataset groups (thematic collections). Groups organize datasets into browseable categories.',
            parameters: [
                { position: { key: 'sort', value: '{{SORT}}', location: 'query' }, z: { primitive: 'enum(name,package_count,title)', options: ['optional()', 'default(name)'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'all_fields', value: '{{ALL_FIELDS}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'List all groups sorted by name', sort: 'name' },
                { _description: 'List groups with full details', all_fields: true, limit: 20 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { success: { type: 'boolean' }, result: { type: 'array', items: { type: 'string' } } } }
            }
        },
        organizationList: {
            method: 'GET',
            path: '/action/organization_list',
            description: 'List organizations that publish datasets. Organizations represent government agencies and departments that own datasets in the catalog.',
            parameters: [
                { position: { key: 'sort', value: '{{SORT}}', location: 'query' }, z: { primitive: 'enum(name,package_count,title)', options: ['optional()', 'default(name)'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'all_fields', value: '{{ALL_FIELDS}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'List first 20 organizations', limit: 20 },
                { _description: 'List organizations with full details sorted by dataset count', all_fields: true, sort: 'package_count', limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { success: { type: 'boolean' }, result: { type: 'array', items: { type: 'string' } } } }
            }
        },
        resourceSearch: {
            method: 'GET',
            path: '/action/resource_search',
            description: 'Search for individual resources (downloadable files) across all datasets. Query by resource fields like name, description, or format using field:term syntax.',
            parameters: [
                { position: { key: 'query', value: '{{RESOURCE_QUERY}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'order_by', value: '{{ORDER_BY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'limit', value: '{{LIMIT}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'offset', value: '{{OFFSET}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search for CSV resources', query: 'format:csv', limit: 10 },
                { _description: 'Search for resources by name', query: 'name:population' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { success: { type: 'boolean' }, result: { type: 'object', properties: { count: { type: 'number' }, results: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, format: { type: 'string' }, url: { type: 'string' }, description: { type: 'string' } } } } } } } }
            }
        }
    }
}
