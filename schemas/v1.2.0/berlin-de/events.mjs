export const schema = {
    namespace: "berlinevents",
    name: "Berlin Events API",
    description: "Access to Berlin city events data including markets, festivals, and public assemblies",
    docs: ["https://www.berlin.de/"],
    tags: ["berlin", "events", "opendata"],
    flowMCP: "1.2.0",
    root: "https://www.berlin.de",
    requiredServerParams: [],
    headers: {},
    routes: {
        markets_festivals: {
            requestMethod: "GET",
            description: "Weekly and flea markets in Berlin via Berlin.de. Returns structured JSON response data.",
            route: "/sen/web/service/maerkte-feste/wochen-troedelmaerkte/index.php/index/all.json",
            parameters: [],
            tests: [
                { _description: "Get all weekly and flea markets in Berlin" }
            ],
            modifiers: []
        },
        street_festivals: {
            requestMethod: "GET",
            description: "Street and folk festivals in Berlin via Berlin.de. Returns structured JSON response data.",
            route: "/sen/web/service/maerkte-feste/strassen-volksfeste/index.php/index/all.json",
            parameters: [],
            tests: [
                { _description: "Get all street and folk festivals in Berlin" }
            ],
            modifiers: []
        },
        christmas_markets: {
            requestMethod: "GET",
            description: "Christmas markets in Berlin via Berlin.de. Returns structured JSON response data.",
            route: "/sen/web/service/maerkte-feste/weihnachtsmaerkte/index.php/index/all.json",
            parameters: [],
            tests: [
                { _description: "Get all christmas markets in Berlin" }
            ],
            modifiers: []
        },
        police_assemblies: {
            requestMethod: "GET",
            description: "Police registered assemblies and demonstrations in Berlin via Berlin.de. Returns structured JSON response data.",
            route: "/polizei/service/versammlungsbehoerde/versammlungen-aufzuege/index.php/index/all.json",
            parameters: [],
            tests: [
                { _description: "Get all police registered assemblies and demonstrations" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}