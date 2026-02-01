export const schema = {
    namespace: "hnrss",
    name: "Hacker News JSON Feeds",
    description: "Access Hacker News content via realtime JSON feeds: new posts, comments, jobs, replies, favorites, and more.",
    docs: ["https://hnrss.org"],
    tags: ["news", "hackernews", "feeds"],
    flowMCP: "1.2.0",
    root: "https://hnrss.org",
    requiredServerParams: [],
    headers: {},
    routes: {
        getFeed: {
            requestMethod: "GET",
            description: "Retrieves a Hacker News JSON Feed based on feed type and optional filters like query, points, or comment count.",
            route: "/:feedPath",
            parameters: [
                { position: { key: "feedPath", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(newest.jsonfeed,newcomments.jsonfeed,frontpage.jsonfeed,replies.jsonfeed,bestcomments.jsonfeed,item.jsonfeed,ask.jsonfeed,show.jsonfeed,polls.jsonfeed,classic.jsonfeed,best.jsonfeed,invited.jsonfeed,pool.jsonfeed,active.jsonfeed,launches.jsonfeed,jobs.jsonfeed,whoishiring/jobs.jsonfeed,whoishiring/hired.jsonfeed,whoishiring/freelance.jsonfeed,whoishiring.jsonfeed,submitted.jsonfeed,threads.jsonfeed,user.jsonfeed,favorites.jsonfeed)", options: [] } },
                { position: { key: "q", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "points", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
                { position: { key: "comments", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "optional()"] } },
                { position: { key: "count", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(100)", "optional()"] } },
                { position: { key: "search_attrs", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "link", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "description", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "max(1)", "optional()"] } },
                { position: { key: "author", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "id", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Front page posts", feedPath: "frontpage.jsonfeed" },
                { _description: "Ask HN with 10+ comments", feedPath: "ask.jsonfeed", comments: 10 },
                { _description: "Search for React Native", feedPath: "newest.jsonfeed", q: "React Native" },
                { _description: "Favorites from user edavis", feedPath: "favorites.jsonfeed", id: "edavis" },
                { _description: "Replies to user jerf", feedPath: "replies.jsonfeed", id: "jerf" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
