// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'cointelegraph',
    name: 'CointelegraphRSS',
    description: 'Fetch the latest cryptocurrency news from Cointelegraph via RSS — filter articles by category (Bitcoin, Ethereum, Altcoin, DeFi, etc.) and time range.',
    version: '2.0.0',
    docs: ['https://cointelegraph.com/rss-feeds'],
    tags: ['crypto', 'news', 'media', 'cacheTtlFrequent'],
    root: 'https://cointelegraph.com',
    routes: {
        getLatestNews: {
            method: 'GET',
            path: '/rss',
            description: 'Get the latest news articles from Cointelegraph RSS feeds by category and time range.',
            parameters: [
                { position: { key: 'category', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(all,editors_pick,altcoin,bitcoin,blockchain,ethereum,litecoin,monero,regulation,features,analysis,follow_up,in_depth,quiz,market_analysis,top_10_cryptocurrencies,weekly_overview)', options: [] } },
                { position: { key: 'range', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1h,2h,4h,12h,24h,48h)', options: [] } },
                { position: { key: 'maxSummaryLength', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'max(1000)', 'default(150)'] } }
            ],
            output: {
                mimeType: 'application/rss+xml',
                schema: { type: 'string', description: 'RSS/XML feed with news articles (title, link, description, pubDate)' }
            },
            tests: [
                {
                    _description: 'Test Cointelegraph latest articles with default settings',
                    category: 'all',
                    range: '24h',
                    maxSummaryLength: 150
                }
            ],
        }
    }
}
