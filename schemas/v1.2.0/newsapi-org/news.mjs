export const schema = {
    namespace: "newsapi",
    name: "NewsAPI.org",
    description: "Access breaking news headlines and search through articles from news sources and blogs across the web",
    docs: ["https://newsapi.org/docs"],
    tags: ["news", "media", "content", "cacheTtlFrequent"],
    flowMCP: "1.2.0",
    root: "https://newsapi.org/v2",
    requiredServerParams: ["NEWSAPI_API_KEY"],
    headers: { "X-API-Key": "{{NEWSAPI_API_KEY}}" },
    routes: {
        getTopHeadlines: {
            requestMethod: "GET",
            description: "Get breaking news headlines for a country or category via newsapi. Supports country, category, sources filters.",
            route: "/top-headlines",
            parameters: [
                { position: { key: "country", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(ae,ar,at,au,be,bg,br,ca,ch,cn,co,cu,cz,de,eg,fr,gb,gr,hk,hu,id,ie,il,in,it,jp,kr,lt,lv,ma,mx,my,ng,nl,no,nz,ph,pl,pt,ro,rs,ru,sa,se,sg,si,sk,th,tr,tw,ua,us,ve,za)", options: ["optional()"] } },
                { position: { key: "category", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(business,entertainment,general,health,science,sports,technology)", options: ["optional()"] } },
                { position: { key: "sources", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "q", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "pageSize", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "optional()"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "optional()"] } }
            ],
            tests: [
                { _description: "Get US top headlines", country: "us" },
                { _description: "Get technology headlines", category: "technology" },
                { _description: "Search for Bitcoin news", q: "bitcoin", pageSize: 10 }
            ],
            modifiers: []
        },
        getEverything: {
            requestMethod: "GET",
            description: "Search through millions of articles from over 80,000 large and small news sources and blogs",
            route: "/everything",
            parameters: [
                { position: { key: "q", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "qInTitle", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "sources", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "domains", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "excludeDomains", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "from", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "to", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "language", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(ar,de,en,es,fr,he,it,nl,no,pt,ru,sv,ud,zh)", options: ["optional()"] } },
                { position: { key: "sortBy", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(relevancy,popularity,publishedAt)", options: ["optional()"] } },
                { position: { key: "pageSize", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "optional()"] } },
                { position: { key: "page", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "optional()"] } }
            ],
            tests: [
                { _description: "Search for cryptocurrency articles", q: "cryptocurrency", sortBy: "publishedAt", pageSize: 20 },
                { _description: "Search for AI in titles", qInTitle: "artificial intelligence", language: "en" },
                { _description: "Get articles from specific domains", domains: "techcrunch.com,wired.com", language: "en" }
            ],
            modifiers: []
        },
        getSources: {
            requestMethod: "GET",
            description: "Get the subset of news publishers that top headlines and everything endpoints are available for",
            route: "/top-headlines/sources",
            parameters: [
                { position: { key: "category", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(business,entertainment,general,health,science,sports,technology)", options: ["optional()"] } },
                { position: { key: "language", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(ar,de,en,es,fr,he,it,nl,no,pt,ru,sv,ud,zh)", options: ["optional()"] } },
                { position: { key: "country", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(ae,ar,at,au,be,bg,br,ca,ch,cn,co,cu,cz,de,eg,fr,gb,gr,hk,hu,id,ie,il,in,it,jp,kr,lt,lv,ma,mx,my,ng,nl,no,nz,ph,pl,pt,ro,rs,ru,sa,se,sg,si,sk,th,tr,tw,ua,us,ve,za)", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get all sources" },
                { _description: "Get technology sources", category: "technology" },
                { _description: "Get US English sources", country: "us", language: "en" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}