export const main = {
    namespace: 'reisewarnung',
    name: 'Reisewarnung Auswaertiges Amt',
    description: 'Access travel and security warnings from the German Federal Foreign Office (Auswaertiges Amt). Covers travel advisories, country-specific security information, and diplomatic mission contacts.',
    version: '3.0.0',
    docs: ['https://travelwarning.api.bund.dev/'],
    tags: ['germany', 'travel', 'safety', 'warnings', 'opendata'],
    root: 'https://www.auswaertiges-amt.de/opendata',
    requiredServerParams: [],
    headers: {},
    tools: {
        getAllWarnings: {
            method: 'GET',
            path: '/travelwarning',
            description: 'Get all current travel and security warnings from the Auswaertiges Amt. Returns country-specific advisories with safety levels, text descriptions, and last update dates.',
            parameters: [],
            tests: [
                { _description: 'Get all travel warnings' }
            ],
        },
        getWarningById: {
            method: 'GET',
            path: '/travelwarning/:contentId',
            description: 'Get a specific travel warning by its content ID. Returns detailed advisory text, safety level, and related information.',
            parameters: [
                { position: { key: 'contentId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get warning for a specific country', contentId: '199124' }
            ],
        },
        getStateNames: {
            method: 'GET',
            path: '/stateNames',
            description: 'Get the directory of all country/state names with their ISO codes and content IDs for use with other endpoints.',
            parameters: [],
            tests: [
                { _description: 'Get all state/country names' }
            ],
        },
        getHealthcare: {
            method: 'GET',
            path: '/healthcare',
            description: 'Get health service information sheets for countries. Covers vaccination requirements, health risks, and medical care availability.',
            parameters: [],
            tests: [
                { _description: 'Get healthcare information' }
            ],
        }
    }
}
