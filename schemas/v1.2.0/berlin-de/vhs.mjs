export const schema = {
    namespace: "berlinvhs",
    name: "Berlin VHS API",
    description: "Access to Berlin Volkshochschule (VHS) course catalog with detailed course information",
    docs: ["https://www.vhsit.berlin.de/"],
    tags: ["berlin", "education", "opendata"],
    flowMCP: "1.2.0",
    root: "https://www.vhsit.berlin.de",
    requiredServerParams: [],
    headers: {},
    routes: {
        all_courses: {
            requestMethod: "GET",
            description: "Complete catalog of VHS courses across all Berlin districts via Berlin.de. Returns structured JSON response data.",
            route: "/VHSKURSE/OpenData/Kurse.json",
            parameters: [],
            tests: [
                { _description: "Get all VHS courses from Berlin" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}