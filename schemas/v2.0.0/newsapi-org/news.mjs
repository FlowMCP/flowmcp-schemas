// Migrated from v1.2.0 -> v2.0.0
// Category: simple
// Import: import { ISO_COUNTRY_CODES } from '../_shared/isoCountryCodes.mjs'
// Import: import { ISO_LANGUAGE_CODES } from '../_shared/isoLanguageCodes.mjs'
// Module-level code: 2 lines

export const main = {
    namespace: 'newsapi',
    name: 'NewsAPI.org',
    description: 'Access breaking news headlines and search through articles from news sources and blogs across the web',
    version: '2.0.0',
    docs: ['https://newsapi.org/docs'],
    tags: ['news', 'media', 'content', 'cacheTtlFrequent'],
    root: 'https://newsapi.org/v2',
    requiredServerParams: ['NEWSAPI_API_KEY'],
    headers: {
        'X-API-Key': '{{NEWSAPI_API_KEY}}'
    },
    routes: {
        getTopHeadlines: {
            method: 'GET',
            path: '/top-headlines',
            description: 'Get breaking news headlines for a country or category via newsapi. Supports country, category, sources filters.',
            parameters: [
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ae,ar,at,au,be,bg,br,ca,ch,cn,co,cu,cz,de,eg,fr,gb,gr,hk,hu,id,ie,il,in,it,jp,kr,lt,lv,ma,mx,my,ng,nl,no,nz,ph,pl,pt,ro,rs,ru,sa,se,sg,si,sk,th,tr,tw,ua,us,ve,za)', options: ['optional()'] } },
                { position: { key: 'category', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(business,entertainment,general,health,science,sports,technology)', options: ['optional()'] } },
                { position: { key: 'sources', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'optional()'] } }
            ]
        },
        getEverything: {
            method: 'GET',
            path: '/everything',
            description: 'Search through millions of articles from over 80,000 large and small news sources and blogs',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'qInTitle', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sources', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'domains', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'excludeDomains', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'to', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ar,de,en,es,fr,he,it,nl,no,pt,ru,sv,ud,zh)', options: ['optional()'] } },
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(relevancy,popularity,publishedAt)', options: ['optional()'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'max(100)', 'optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)', 'optional()'] } }
            ]
        },
        getSources: {
            method: 'GET',
            path: '/top-headlines/sources',
            description: 'Get the subset of news publishers that top headlines and everything endpoints are available for',
            parameters: [
                { position: { key: 'category', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(business,entertainment,general,health,science,sports,technology)', options: ['optional()'] } },
                { position: { key: 'language', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ar,de,en,es,fr,he,it,nl,no,pt,ru,sv,ud,zh)', options: ['optional()'] } },
                { position: { key: 'country', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ae,ar,at,au,be,bg,br,ca,ch,cn,co,cu,cz,de,eg,fr,gb,gr,hk,hu,id,ie,il,in,it,jp,kr,lt,lv,ma,mx,my,ng,nl,no,nz,ph,pl,pt,ro,rs,ru,sa,se,sg,si,sk,th,tr,tw,ua,us,ve,za)', options: ['optional()'] } }
            ]
        }
    }
}
