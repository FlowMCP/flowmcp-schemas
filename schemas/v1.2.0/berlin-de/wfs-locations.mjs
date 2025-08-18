export const schema = {
    namespace: "berlinwfs",
    name: "Berlin WFS Locations API",
    description: "Access to Berlin geographic data including dog parks and BBQ areas via WFS services",
    docs: ["https://gdi.berlin.de/"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://gdi.berlin.de",
    requiredServerParams: [],
    headers: {},
    routes: {
        dog_parks: {
            requestMethod: "GET",
            description: "All dog parks (Hundefreiläufe) in Berlin as GeoJSON FeatureCollection",
            route: "/services/wfs/hundefreilauf?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=hundefreilauf%3Ahundefreilauf&OUTPUTFORMAT=application/json",
            parameters: [],
            tests: [
                { _description: "Get all dog parks in Berlin as GeoJSON" }
            ],
            modifiers: []
        },
        bbq_areas: {
            requestMethod: "GET",
            description: "All BBQ areas (Grillflächen) in Berlin as GeoJSON FeatureCollection",
            route: "/services/wfs/grillflaechen?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=grillflaechen%3Agrillflaechen&OUTPUTFORMAT=application/json",
            parameters: [],
            tests: [
                { _description: "Get all BBQ areas in Berlin as GeoJSON" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}