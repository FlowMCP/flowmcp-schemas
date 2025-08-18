export const schema = {
    namespace: "medium",
    name: "Medium RSS Feeds",
    description: "Access Medium articles and posts via RSS feeds by tag, user, or publication",
    docs: ["https://help.medium.com/hc/en-us/articles/214874118-RSS-feeds"],
    tags: ["medium.getTagFeed", "medium.getUserFeed", "medium.getPublicationFeed", "medium.getTopicFeed"],
    flowMCP: "1.2.0",
    root: "https://medium.com/feed",
    requiredServerParams: [],
    headers: {},
    routes: {
        getTagFeed: {
            requestMethod: "GET",
            description: "Get RSS feed for articles with a specific tag",
            route: "/tag/:tag",
            parameters: [
                { position: { key: "tag", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get articles tagged with bitcoin", tag: "bitcoin" },
                { _description: "Get articles tagged with artificial-intelligence", tag: "artificial-intelligence" },
                { _description: "Get articles tagged with programming", tag: "programming" }
            ],
            modifiers: [{ phase: "execute", handlerName: "parseRSSFeed" }]
        },
        getUserFeed: {
            requestMethod: "GET",
            description: "Get RSS feed for a specific Medium user's articles",
            route: "/@:username",
            parameters: [
                { position: { key: "username", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get articles from a specific user", username: "medium" },
                { _description: "Get articles from another user", username: "towardsdatascience" }
            ],
            modifiers: [{ phase: "execute", handlerName: "parseRSSFeed" }]
        },
        getPublicationFeed: {
            requestMethod: "GET",
            description: "Get RSS feed for a specific Medium publication",
            route: "/:publication",
            parameters: [
                { position: { key: "publication", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get articles from Towards Data Science", publication: "towards-data-science" },
                { _description: "Get articles from The Startup", publication: "swlh" },
                { _description: "Get articles from Better Programming", publication: "better-programming" }
            ],
            modifiers: [{ phase: "execute", handlerName: "parseRSSFeed" }]
        },
        getTopicFeed: {
            requestMethod: "GET",
            description: "Get RSS feed for a specific Medium topic",
            route: "/topic/:topic",
            parameters: [
                { position: { key: "topic", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(technology,programming,data-science,artificial-intelligence,machine-learning,blockchain,cryptocurrency,startup,business,design,ux,ui,marketing,science,health,politics,culture,sports,entertainment,travel,food,lifestyle)", options: [] } }
            ],
            tests: [
                { _description: "Get technology topic feed", topic: "technology" },
                { _description: "Get programming topic feed", topic: "programming" },
                { _description: "Get blockchain topic feed", topic: "blockchain" }
            ],
            modifiers: [{ phase: "execute", handlerName: "parseRSSFeed" }]
        }
    },
    handlers: {
        parseRSSFeed: async ({ struct, payload, userParams }) => {
            try {
                const response = await fetch(payload.url)
                if (!response.ok) {
                    struct.status = false
                    struct.messages.push(`HTTP ${response.status}: ${response.statusText}`)
                    return { struct, payload }
                }

                const xmlText = await response.text()
                
                // Simple XML parsing for RSS items
                const itemRegex = /<item>(.*?)<\/item>/gs
                const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/s
                const linkRegex = /<link>(.*?)<\/link>/s
                const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/s
                const descriptionRegex = /<description><!\[CDATA\[(.*?)\]\]><\/description>/s
                const creatorRegex = /<dc:creator><!\[CDATA\[(.*?)\]\]><\/dc:creator>/s
                const categoryRegex = /<category><!\[CDATA\[(.*?)\]\]><\/category>/gs

                const items = []
                let match
                while ((match = itemRegex.exec(xmlText)) !== null) {
                    const itemXml = match[1]
                    
                    const titleMatch = titleRegex.exec(itemXml)
                    const linkMatch = linkRegex.exec(itemXml)
                    const pubDateMatch = pubDateRegex.exec(itemXml)
                    const descriptionMatch = descriptionRegex.exec(itemXml)
                    const creatorMatch = creatorRegex.exec(itemXml)
                    
                    // Extract categories/tags
                    const categories = []
                    let categoryMatch
                    while ((categoryMatch = categoryRegex.exec(itemXml)) !== null) {
                        categories.push(categoryMatch[1])
                    }

                    const item = {
                        title: titleMatch ? titleMatch[1] : null,
                        link: linkMatch ? linkMatch[1] : null,
                        pubDate: pubDateMatch ? pubDateMatch[1] : null,
                        description: descriptionMatch ? descriptionMatch[1].replace(/<[^>]*>/g, '').substring(0, 200) + '...' : null,
                        author: creatorMatch ? creatorMatch[1] : null,
                        categories: categories
                    }
                    
                    items.push(item)
                }

                struct.data = {
                    source: "Medium",
                    feedUrl: payload.url,
                    itemCount: items.length,
                    items: items
                }

            } catch (error) {
                struct.status = false
                struct.messages.push(`Error parsing RSS feed: ${error.message}`)
            }

            return { struct, payload }
        }
    }
}