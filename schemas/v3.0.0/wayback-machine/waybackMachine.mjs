export const main = {
    namespace: 'waybackmachine',
    name: 'Wayback Machine',
    description: 'Query the Wayback Machine CDX index for archived web page captures. Search capture history, filter by date range and status code, collapse duplicates, paginate through results, and find the latest snapshot of any URL.',
    version: '3.0.0',
    docs: ['https://github.com/internetarchive/wayback/tree/master/wayback-cdx-server', 'https://archive.org/help/wayback_api.php'],
    tags: ['archive', 'web', 'history', 'snapshots', 'crawl', 'cacheTtlDaily'],
    root: 'https://web.archive.org',
    requiredServerParams: [],
    headers: {},
    tools: {
        searchCaptures: {
            method: 'GET',
            path: '/cdx/search/cdx',
            description: 'Query the CDX index for all captures of a URL. Returns capture timestamp, MIME type, HTTP status, digest, and length. Supports date range filtering, result limiting, and multiple URL match types (exact, prefix, host, domain).',
            parameters: [
                { position: { key: 'url', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'output', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(10000)'] } },
                { position: { key: 'matchType', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(exact,prefix,host,domain)', options: ['optional()'] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'fl', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get latest 5 captures of example.com', url: 'example.com', limit: 5 },
                { _description: 'Get captures from 2020 only', url: 'example.com', limit: 3, from: '2020', to: '2021' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'array',
                        items: { type: 'string' }
                    }
                }
            },
        },
        searchCapturesFiltered: {
            method: 'GET',
            path: '/cdx/search/cdx',
            description: 'Query the CDX index with status code filtering to find only successful (HTTP 200) captures. Supports collapsing adjacent duplicates by timestamp prefix to get one capture per year, month, or day.',
            parameters: [
                { position: { key: 'url', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'output', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(10000)'] } },
                { position: { key: 'filter', value: 'statuscode:200', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'collapse', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get one successful capture per year for example.com', url: 'example.com', limit: 5, collapse: 'timestamp:4' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'array',
                        items: { type: 'string' }
                    }
                }
            },
        },
        latestCapture: {
            method: 'GET',
            path: '/cdx/search/cdx',
            description: 'Get the most recent capture of a URL from the CDX index. Uses negative limit to efficiently retrieve the latest entry without scanning the full history. Returns urlkey, timestamp, original URL, MIME type, and status code.',
            parameters: [
                { position: { key: 'url', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'output', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '-1', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'fl', value: 'urlkey,timestamp,original,mimetype,statuscode', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get most recent capture of example.com', url: 'example.com' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'array',
                        items: { type: 'string' }
                    }
                }
            },
        },
        countPages: {
            method: 'GET',
            path: '/cdx/search/cdx',
            description: 'Count the total number of index pages available for a URL query. Returns a single number representing the page count. Use before paginated CDX queries to determine the total scope of results.',
            parameters: [
                { position: { key: 'url', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'output', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'showNumPages', value: 'true', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'matchType', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(exact,prefix,host,domain)', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Count capture pages for example.com', url: 'example.com' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'number'
                }
            },
        },
        searchByDomain: {
            method: 'GET',
            path: '/cdx/search/cdx',
            description: 'Search the CDX index for all captures across an entire domain including subdomains. Uses domain match type to find captures of any page under the given domain. Useful for site-wide archival analysis.',
            parameters: [
                { position: { key: 'url', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'output', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'matchType', value: 'domain', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'min(1)', 'max(10000)'] } },
                { position: { key: 'fl', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(urlkey,timestamp,original,mimetype,statuscode)'] } },
                { position: { key: 'collapse', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search all captures under example.com domain', url: 'example.com', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'array',
                    items: {
                        type: 'array',
                        items: { type: 'string' }
                    }
                }
            },
        }
    }
}
