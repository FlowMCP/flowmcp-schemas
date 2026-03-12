export const main = {
    namespace: 'datamuse',
    name: 'Datamuse Word API',
    description: 'Access the Datamuse API for finding words and phrases. Find words with similar meaning, words that rhyme, words that match a spelling pattern, and autocomplete suggestions. Powers word-finding tools for writers, crossword solvers, and language learners. Covers 100,000+ English words. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://www.datamuse.com/api/'],
    tags: ['language', 'reference', 'nlp', 'opendata', 'cacheTtlStatic'],
    root: 'https://api.datamuse.com',
    requiredServerParams: [],
    headers: {},
    tools: {
        findWords: {
            method: 'GET',
            path: '/words',
            description: 'Find words matching various constraints. Use ml (meaning like) for synonyms, rel_rhy for rhymes, sp for spelling pattern (? = single char, * = any), sl for sounds like. Combine multiple constraints for precise results.',
            parameters: [
                { position: { key: 'ml', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sl', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'sp', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'rel_rhy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'rel_trg', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(1000)'] } },
                { position: { key: 'md', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Words meaning like ocean', ml: 'ocean', max: 5 },
                { _description: 'Words rhyming with love', rel_rhy: 'love', max: 5 },
                { _description: 'Words matching t??', sp: 't??', max: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { word: { type: 'string' }, score: { type: 'number' }, tags: { type: 'array', items: { type: 'string' } } } } }
            }
        },
        autocomplete: {
            method: 'GET',
            path: '/sug',
            description: 'Get autocomplete suggestions for a word prefix. Returns up to 10 suggestions ranked by frequency. Useful for search-as-you-type interfaces.',
            parameters: [
                { position: { key: 's', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'max', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(25)'] } }
            ],
            tests: [
                { _description: 'Autocomplete hel', s: 'hel', max: 5 },
                { _description: 'Autocomplete comp', s: 'comp', max: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'array', items: { type: 'object', properties: { word: { type: 'string' }, score: { type: 'number' } } } }
            }
        }
    }
}
