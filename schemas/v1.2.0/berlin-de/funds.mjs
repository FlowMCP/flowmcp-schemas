export const schema = {
    namespace: "berlinfunds",
    name: "Berlin Funds API",
    description: "Access to Berlin funding opportunities and educational programs",
    docs: ["https://www.berlin.de/"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://www.berlin.de",
    requiredServerParams: [],
    headers: {},
    routes: {
        funding_opportunities: {
            requestMethod: "GET",
            description: "Funding opportunities from Berlin-Treptow-Köpenick district",
            route: "/ba-treptow-koepenick/politik-und-verwaltung/beauftragte/integration/foerderungen-finanzen/simplesearch/index.php/index/all.json",
            parameters: [],
            tests: [
                { _description: "Get all funding opportunities from Treptow-Köpenick district" }
            ],
            modifiers: []
        },
        continuing_education: {
            requestMethod: "GET",
            description: "Continuing education and professional development courses (Bildungszeit)",
            route: "/sen/arbeit/weiterbildung/bildungszeit/suche/index.php/index/all.json",
            parameters: [],
            tests: [
                { _description: "Get all continuing education courses in Berlin" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}