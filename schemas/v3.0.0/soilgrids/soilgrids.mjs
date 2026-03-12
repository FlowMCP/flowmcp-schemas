export const main = {
    namespace: 'soilgrids',
    name: 'SoilGrids',
    description: 'Query global soil properties at 250m resolution from ISRIC SoilGrids. Includes soil classification (WRB), physical and chemical properties at multiple depths, and available layer metadata.',
    docs: ['https://www.isric.org/explore/soilgrids', 'https://rest.isric.org/soilgrids/v2.0/docs'],
    tags: ['soil', 'geology', 'environment', 'geospatial', 'agriculture', 'cacheTtlStatic'],
    version: '3.0.0',
    root: 'https://rest.isric.org/soilgrids/v2.0',
    requiredServerParams: [],
    headers: {},
    tools: {
        getWrbClassification: {
            method: 'GET',
            path: '/classification/query',
            description: 'Get WRB (World Reference Base) soil classification for a geographic coordinate. Returns the most probable soil class and probability distribution across top classes.',
            parameters: [
                { position: { key: 'lon', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-180)', 'max(180)'] } },
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-90)', 'max(90)'] } },
                { position: { key: 'number_classes', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(5)'] } }
            ],
            tests: [
                { _description: 'Get soil classification for Berlin', lon: 13.405, lat: 52.52 },
                { _description: 'Get soil classification for Amazon rainforest', lon: -60.0, lat: -3.0, number_classes: 3 },
                { _description: 'Get soil classification for Sahara desert', lon: 2.0, lat: 24.0 }
            ],
        },
        getPropertyLayers: {
            method: 'GET',
            path: '/properties/layers',
            description: 'Get the available layer structure of SoilGrids soil properties. Returns all available properties, depth intervals, and statistical values that can be queried.',
            parameters: [],
            tests: [
                { _description: 'Get all available soil property layers' }
            ],
        },
        querySoilProperties: {
            method: 'GET',
            path: '/properties/query',
            description: 'Query soil property values for a single geographic coordinate. Returns values for selected properties at specified depth intervals with uncertainty quantiles. Properties include bulk density, CEC, clay/sand/silt content, pH, organic carbon, and more.',
            parameters: [
                { position: { key: 'lon', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-180)', 'max(180)'] } },
                { position: { key: 'lat', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(-90)', 'max(90)'] } },
                { position: { key: 'property', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: ['optional()'] } },
                { position: { key: 'depth', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: ['optional()'] } },
                { position: { key: 'value', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'array()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get all soil properties for Berlin', lon: 13.405, lat: 52.52 },
                { _description: 'Get clay and sand content for Iowa farmland', lon: -93.5, lat: 42.0, property: ['clay', 'sand'], depth: ['0-5cm', '5-15cm'], value: ['mean'] },
                { _description: 'Get soil pH for Brazilian cerrado', lon: -47.9, lat: -15.8, property: ['phh2o'], value: ['mean', 'Q0.05', 'Q0.95'] }
            ],
        }
    },
}
