// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'cryptopanic',
    name: 'CryptoPanic',
    description: 'Fetches cryptocurrency news headlines from CryptoPanic across different content types.',
    version: '2.0.0',
    docs: ['https://cryptopanic.com/developers/api/'],
    tags: ['crypto', 'news', 'aggregator', 'cacheTtlFrequent'],
    root: 'https://cryptopanic.com/api/v1/posts',
    requiredServerParams: ['CRYPTOPANIC_API_KEY'],
    routes: {
        getCryptoCryptopanicNews: {
            method: 'GET',
            path: '/?auth_token={{CRYPTOPANIC_API_KEY}}&regions=en',
            description: 'Get a list of crypto news headlines from CryptoPanic. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'kind', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(news,media,analysis)', options: ['default(news)'] } },
                { position: { key: 'num_pages', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(10)', 'default(1)'] } }
            ],
            tests: [
                { _description: 'Get general crypto news headlines from 2 pages', kind: 'news', num_pages: 2 }
            ],
        }
    }
}
