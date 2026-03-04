export const main = {
    namespace: 'gdelt',
    name: 'GDELT Global News Monitoring',
    description: 'Access the GDELT Project global news monitoring system. Search and analyze worldwide news coverage across 100+ languages, updated every 15 minutes. Query article lists, timeline volumes, tone analysis, and contextual sentence-level excerpts. Covers 300M+ news articles from 2015 to present. Free, no API key required. Rate limit: 1 request per 5 seconds.',
    version: '2.0.0',
    docs: ['https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/', 'https://blog.gdeltproject.org/announcing-the-gdelt-context-2-0-api/'],
    tags: ['news', 'media', 'global', 'opendata', 'cacheTtlFrequent'],
    root: 'https://api.gdeltproject.org',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/json'
    },
    routes: {
        searchArticles: {
            method: 'GET',
            path: '/api/v2/doc/doc',
            description: 'Full-text search across global news articles monitored by GDELT. Returns article URLs, titles, publication dates, source domains, languages, and countries. Supports boolean queries, domain/language/country filters, and tone analysis. Default timespan: last 3 months. Max 250 records. TIMESPAN is in minutes (1440=1day, 10080=1week).',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'mode', value: 'artlist', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'maxrecords', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(250)'] } },
                { position: { key: 'TIMESPAN', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'SORT', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(DateDesc,DateAsc,ToneDesc,ToneAsc,HybridRel)', options: ['optional()', 'default(DateDesc)'] } }
            ],
            tests: [
                { _description: 'Search for Germany news articles', query: 'germany', maxrecords: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { articles: { type: 'array', items: { type: 'object', properties: { url: { type: 'string' }, url_mobile: { type: 'string' }, title: { type: 'string' }, seendate: { type: 'string' }, socialimage: { type: 'string' }, domain: { type: 'string' }, language: { type: 'string' }, sourcecountry: { type: 'string' } } } } } }
            }
        },
        getTimelineVolume: {
            method: 'GET',
            path: '/api/v2/doc/doc',
            description: 'Get a timeline of article volume over time for a search query. Returns daily or hourly counts of matching articles, useful for tracking media attention on topics. TIMESPAN is in minutes (1440=1day, 10080=1week). Default: 3 months.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'mode', value: 'timelinevol', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'TIMESPAN', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'TIMELINESMOOTH', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'max(30)'] } }
            ],
            tests: [
                { _description: 'Climate news volume over 7 days', query: 'climate change' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { timeline: { type: 'array', items: { type: 'object', properties: { date: { type: 'string' }, value: { type: 'number' } } } } } }
            }
        },
        getTimelineTone: {
            method: 'GET',
            path: '/api/v2/doc/doc',
            description: 'Get a timeline of average media tone (sentiment) over time for a query. Positive values indicate positive sentiment, negative values indicate negative coverage. Useful for tracking public perception shifts.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'mode', value: 'timelinetone', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'TIMESPAN', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'TIMELINESMOOTH', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'max(30)'] } }
            ],
            tests: [
                { _description: 'Tone of AI coverage over 7 days', query: 'artificial intelligence' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { timeline: { type: 'array', items: { type: 'object', properties: { date: { type: 'string' }, value: { type: 'number' } } } } } }
            }
        },
        searchContext: {
            method: 'GET',
            path: '/api/v2/context/context',
            description: 'Search news with sentence-level context excerpts. Returns articles with the specific sentence containing the query plus surrounding context paragraph. Ideal for fact-finding and quote extraction. Less rate-limited than the DOC API.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'mode', value: 'artlist', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'maxrecords', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(250)'] } },
                { position: { key: 'TIMESPAN', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'SORT', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(DateDesc,DateAsc,ToneDesc,ToneAsc,HybridRel)', options: ['optional()', 'default(DateDesc)'] } }
            ],
            tests: [
                { _description: 'Search context for climate articles', query: 'climate', maxrecords: 3 },
                { _description: 'Search context for Germany news', query: 'germany', maxrecords: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { articles: { type: 'array', items: { type: 'object', properties: { url: { type: 'string' }, title: { type: 'string' }, seendate: { type: 'string' }, socialimage: { type: 'string' }, domain: { type: 'string' }, language: { type: 'string' }, isquote: { type: 'number' }, sentence: { type: 'string' }, context: { type: 'string' } } } } } }
            }
        },
        getToneChart: {
            method: 'GET',
            path: '/api/v2/doc/doc',
            description: 'Get a tone/sentiment distribution chart for a query. Shows how coverage is distributed across the tone spectrum from very negative to very positive.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'mode', value: 'tonechart', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'TIMESPAN', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Tone chart for EU news', query: 'european union' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { tonechart: { type: 'array', items: { type: 'object', properties: { bin: { type: 'number' }, count: { type: 'number' } } } } } }
            }
        }
    }
}
