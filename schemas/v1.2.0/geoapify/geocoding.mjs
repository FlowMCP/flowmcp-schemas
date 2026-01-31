export const schema = {
    namespace: "geoapify",
    name: "Geoapify Geocoding",
    description: "Forward geocoding, reverse geocoding, and address autocomplete via geoapify.com",
    docs: ["https://apidocs.geoapify.com/docs/geocoding/"],
    tags: ["geocoding", "maps", "places"],
    flowMCP: "1.2.0",
    root: "https://api.geoapify.com",
    requiredServerParams: ["GEOAPIFY_API_KEY"],
    headers: {},
    routes: {
        forwardGeocode: {
            requestMethod: "GET",
            description: "Convert an address or place name into geographic coordinates",
            route: "/v1/geocode/search",
            parameters: [
                { position: { key: "text", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "apiKey", value: "{{GEOAPIFY_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "lang", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(50)", "optional()"] } }
            ],
            tests: [
                { _description: "Geocode Berlin address", text: "Brandenburger Tor, Berlin" },
                { _description: "Geocode with language", text: "Eiffel Tower, Paris", lang: "en", limit: 3 }
            ],
            modifiers: []
        },
        reverseGeocode: {
            requestMethod: "GET",
            description: "Convert geographic coordinates into an address",
            route: "/v1/geocode/reverse",
            parameters: [
                { position: { key: "lat", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(-90)", "max(90)"] } },
                { position: { key: "lon", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(-180)", "max(180)"] } },
                { position: { key: "apiKey", value: "{{GEOAPIFY_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } }
            ],
            tests: [
                { _description: "Reverse geocode Berlin coordinates", lat: 52.5163, lon: 13.3777 }
            ],
            modifiers: []
        },
        autocomplete: {
            requestMethod: "GET",
            description: "Get address suggestions as you type for autocomplete functionality",
            route: "/v1/geocode/autocomplete",
            parameters: [
                { position: { key: "text", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "apiKey", value: "{{GEOAPIFY_API_KEY}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "lang", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "limit", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(50)", "optional()"] } }
            ],
            tests: [
                { _description: "Autocomplete Berlin address", text: "Alexanderpl" },
                { _description: "Autocomplete with limit", text: "Münch", lang: "de", limit: 5 }
            ],
            modifiers: []
        }
    },
    handlers: {}
}
