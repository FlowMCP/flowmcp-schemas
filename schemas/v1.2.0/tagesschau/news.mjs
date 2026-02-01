export const schema = {
    namespace: "tagesschau",
    name: "Tagesschau API",
    description: "Access German public broadcasting news from ARD tagesschau including headlines, search, and live channels",
    docs: ["https://www.tagesschau.de/"],
    tags: ["news", "germany", "media"],
    flowMCP: "1.2.0",
    root: "https://www.tagesschau.de/api2u",
    requiredServerParams: [],
    headers: {},
    routes: {
        getHomepage: {
            requestMethod: "GET",
            description: "Get current homepage news with top stories and regional coverage",
            route: "/homepage",
            parameters: [],
            tests: [
                { _description: "Get homepage news" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatNewsList" }
            ]
        },
        getNews: {
            requestMethod: "GET",
            description: "Get news articles filtered by region or editorial section (ressort)",
            route: "/news",
            parameters: [
                { position: { key: "regions", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(16)", "optional()"] } },
                { position: { key: "ressort", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(inland,ausland,wirtschaft,sport,video,investigativ,wissen)", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get domestic news", ressort: "inland" },
                { _description: "Get international news", ressort: "ausland" },
                { _description: "Get business news", ressort: "wirtschaft" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatNewsList" }
            ]
        },
        searchArticles: {
            requestMethod: "GET",
            description: "Search tagesschau articles by keyword",
            route: "/search",
            parameters: [
                { position: { key: "searchText", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "pageSize", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(30)", "default(10)", "optional()"] } },
                { position: { key: "resultPage", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "default(1)", "optional()"] } }
            ],
            tests: [
                { _description: "Search for Ukraine news", searchText: "ukraine", pageSize: 5 },
                { _description: "Search for climate news", searchText: "klima", pageSize: 5 },
                { _description: "Search for economy news", searchText: "wirtschaft", pageSize: 3 }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatSearchResults" }
            ]
        },
        getChannels: {
            requestMethod: "GET",
            description: "Get available live streaming channels (tagesschau24, tagesschau, tagesthemen)",
            route: "/channels",
            parameters: [],
            tests: [
                { _description: "List all channels" }
            ],
            modifiers: [
                { phase: "post", handlerName: "formatChannels" }
            ]
        }
    },
    handlers: {
        formatNewsList: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.news ) { return { struct, payload } }

            const articles = raw.news
                .map( ( article ) => {
                    const { sophoraId, title, topline, firstSentence, date, ressort, tags, detailsweb, breakingNews } = article

                    return {
                        id: sophoraId,
                        title,
                        topline: topline || null,
                        summary: firstSentence || null,
                        date,
                        section: ressort || null,
                        isBreaking: breakingNews || false,
                        tags: ( tags || [] ).map( ( t ) => t.tag ),
                        webUrl: detailsweb || null
                    }
                } )

            struct.data = {
                articleCount: articles.length,
                articles
            }

            return { struct, payload }
        },
        formatSearchResults: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.searchResults ) { return { struct, payload } }

            const results = raw.searchResults
                .map( ( item ) => {
                    const { title, date, detailsweb, firstSentence, topline } = item

                    return {
                        title,
                        topline: topline || null,
                        summary: firstSentence || null,
                        date,
                        webUrl: detailsweb || null
                    }
                } )

            struct.data = {
                searchText: raw.searchText,
                totalResults: raw.totalItemCount,
                pageSize: raw.pageSize,
                currentPage: raw.resultPage,
                resultCount: results.length,
                results
            }

            return { struct, payload }
        },
        formatChannels: async ( { struct, payload } ) => {
            const raw = struct?.data
            if( !raw?.channels ) { return { struct, payload } }

            const channels = raw.channels
                .map( ( channel ) => {
                    const { title, date, streamUrl } = channel

                    return {
                        title,
                        lastUpdate: date || null,
                        streamUrl: streamUrl || null
                    }
                } )

            struct.data = {
                channelCount: channels.length,
                channels
            }

            return { struct, payload }
        }
    }
}
