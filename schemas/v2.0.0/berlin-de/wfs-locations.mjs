// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'berlinwfs',
    name: 'Berlin WFS Locations API',
    description: 'Access to Berlin geographic data including dog parks and BBQ areas via WFS services',
    version: '2.0.0',
    docs: ['https://gdi.berlin.de/'],
    tags: ['berlin', 'geodata', 'opendata', 'cacheTtlDaily'],
    root: 'https://gdi.berlin.de',
    routes: {
        dog_parks: {
            method: 'GET',
            path: '/services/wfs/hundefreilauf?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=hundefreilauf%3Ahundefreilauf&OUTPUTFORMAT=application/json',
            description: 'All dog parks (Hundefreiläufe) in Berlin as GeoJSON FeatureCollection via Berlin.de.',
            parameters: []
        },
        bbq_areas: {
            method: 'GET',
            path: '/services/wfs/grillflaechen?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=grillflaechen%3Agrillflaechen&OUTPUTFORMAT=application/json',
            description: 'All BBQ areas (Grillflächen) in Berlin as GeoJSON FeatureCollection via Berlin.de.',
            parameters: []
        }
    }
}
