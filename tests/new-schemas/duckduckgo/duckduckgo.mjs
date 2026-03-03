// Schema for #318 — DuckDuckGo Instant Answer API
// No API key required — fully public

export const main = {
    namespace: 'duckduckgo',
    name: 'DuckDuckGo Instant Answers',
    description: 'Get instant answers, article summaries, related topics, and definitions from DuckDuckGo. Returns structured knowledge data from hundreds of sources. No API key required.',
    version: '2.0.0',
    docs: ['https://github.com/duckduckgo/duckduckgo-publisher/blob/master/share/site/duckduckgo/api.tx'],
    tags: ['search', 'knowledge', 'reference', 'cacheTtlDaily'],
    root: 'https://api.duckduckgo.com',
    requiredServerParams: [],
    headers: {},
    routes: {
        instantAnswer: {
            method: 'GET',
            path: '/',
            description: 'Get an instant answer for a query. Returns article abstracts, related topics, definitions, and direct answers from hundreds of knowledge sources.',
            parameters: [
                {
                    position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' },
                    z: { primitive: 'string()', options: ['min(1)'] }
                },
                {
                    position: { key: 'format', value: 'json', location: 'query' },
                    z: { primitive: 'string()', options: [] }
                },
                {
                    position: { key: 'no_html', value: '{{USER_PARAM}}', location: 'query' },
                    z: { primitive: 'enum(0,1)', options: ['optional()', 'default(1)'] }
                },
                {
                    position: { key: 'skip_disambig', value: '{{USER_PARAM}}', location: 'query' },
                    z: { primitive: 'enum(0,1)', options: ['optional()', 'default(0)'] }
                },
                {
                    position: { key: 'no_redirect', value: '{{USER_PARAM}}', location: 'query' },
                    z: { primitive: 'enum(0,1)', options: ['optional()', 'default(1)'] }
                },
                {
                    position: { key: 't', value: 'flowmcp', location: 'query' },
                    z: { primitive: 'string()', options: [] }
                }
            ],
            tests: [
                { _description: 'Instant answer for Berlin', q: 'Berlin' },
                { _description: 'Instant answer for Bitcoin', q: 'Bitcoin' },
                { _description: 'Instant answer for Albert Einstein', q: 'Albert Einstein' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        Abstract: { type: 'string' },
                        AbstractText: { type: 'string' },
                        AbstractSource: { type: 'string' },
                        AbstractURL: { type: 'string' },
                        Image: { type: 'string' },
                        Heading: { type: 'string' },
                        Answer: { type: 'string' },
                        AnswerType: { type: 'string' },
                        Definition: { type: 'string' },
                        DefinitionSource: { type: 'string' },
                        DefinitionURL: { type: 'string' },
                        Type: { type: 'string' },
                        Redirect: { type: 'string' },
                        RelatedTopics: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    Result: { type: 'string' },
                                    FirstURL: { type: 'string' },
                                    Text: { type: 'string' },
                                    Icon: {
                                        type: 'object',
                                        properties: {
                                            URL: { type: 'string' },
                                            Height: { type: 'string' },
                                            Width: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        },
                        Results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    Result: { type: 'string' },
                                    FirstURL: { type: 'string' },
                                    Text: { type: 'string' },
                                    Icon: {
                                        type: 'object',
                                        properties: {
                                            URL: { type: 'string' },
                                            Height: { type: 'string' },
                                            Width: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
