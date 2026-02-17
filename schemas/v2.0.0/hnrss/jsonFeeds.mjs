// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'hnrss',
    name: 'Hacker News JSON Feeds',
    description: 'Access Hacker News content via realtime JSON feeds: new posts, comments, jobs, replies, favorites, and more.',
    version: '2.0.0',
    docs: ['https://hnrss.org'],
    tags: ['news', 'hackernews', 'feeds', 'cacheTtlDaily'],
    root: 'https://hnrss.org',
    routes: {
        getFeed: {
            method: 'GET',
            path: '/:feedPath',
            description: 'Retrieves a Hacker News JSON Feed based on feed type and optional filters like query, points, or comment count.',
            parameters: [
                { position: { key: 'feedPath', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(newest.jsonfeed,newcomments.jsonfeed,frontpage.jsonfeed,replies.jsonfeed,bestcomments.jsonfeed,item.jsonfeed,ask.jsonfeed,show.jsonfeed,polls.jsonfeed,classic.jsonfeed,best.jsonfeed,invited.jsonfeed,pool.jsonfeed,active.jsonfeed,launches.jsonfeed,jobs.jsonfeed,whoishiring/jobs.jsonfeed,whoishiring/hired.jsonfeed,whoishiring/freelance.jsonfeed,whoishiring.jsonfeed,submitted.jsonfeed,threads.jsonfeed,user.jsonfeed,favorites.jsonfeed)', options: [] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'points', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'optional()'] } },
                { position: { key: 'comments', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'optional()'] } },
                { position: { key: 'count', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'optional()'] } },
                { position: { key: 'search_attrs', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'link', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'description', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'max(1)', 'optional()'] } },
                { position: { key: 'author', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ]
        }
    }
}
