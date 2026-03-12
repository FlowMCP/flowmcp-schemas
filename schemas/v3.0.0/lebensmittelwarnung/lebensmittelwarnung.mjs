export const main = {
    namespace: 'lebensmittelwarnung',
    name: 'Lebensmittelwarnung',
    description: 'Access German food and product safety warnings from the Federal Office of Consumer Protection and Food Safety (BVL).',
    version: '3.0.0',
    docs: ['https://lebensmittelwarnung.api.bund.dev/', 'https://github.com/bundesAPI/lebensmittelwarnung-api'],
    tags: ['food', 'safety', 'germany', 'consumer', 'warnings', 'cacheTtlFrequent'],
    root: 'https://megov.bayern.de/verbraucherschutz/baystmuv-verbraucherinfo/rest/api',
    requiredServerParams: [],
    headers: {
        'Authorization': 'baystmuv-vi-1.0 os=ios, key=9d9e8972-ff15-4943-8fea-117b5a973c61',
        'Content-Type': 'application/json'
    },
    tools: {
        getWarnings: {
            method: 'POST',
            path: '/warnings/merged',
            description: 'Retrieve current food and product safety warnings. Returns a merged list of food warnings and product warnings sorted by publish date.',
            parameters: [
                { position: { key: 'food', value: '{"rows": {{USER_PARAM}}, "sort": "publishedDate desc, title asc", "start": 0}', location: 'body' }, z: { primitive: 'number()', options: ['optional()', 'default(50)'] } }
            ],
            tests: [
                { _description: 'Get latest 10 food and product warnings', food: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { response: { type: 'object', properties: { docs: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, title: { type: 'string' }, publishedDate: { type: 'number' }, product: { type: 'object' }, warning: { type: 'string' } } } } } } } }
            },
        }
    }
}
