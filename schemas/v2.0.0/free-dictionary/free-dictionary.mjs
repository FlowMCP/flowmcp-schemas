export const main = {
    namespace: 'freedictionary',
    name: 'Free Dictionary',
    description: 'Look up English word definitions, phonetics, synonyms, antonyms, and usage examples using the Free Dictionary API.',
    docs: ['https://dictionaryapi.dev/'],
    tags: ['dictionary', 'language', 'english', 'definitions', 'cacheTtlDaily'],
    version: '2.0.0',
    root: 'https://api.dictionaryapi.dev',
    requiredServerParams: [],
    headers: {},
    routes: {
        getWordDefinition: {
            method: 'GET',
            path: '/api/v2/entries/en/:word',
            description: 'Get complete dictionary entry for an English word including definitions, phonetics, synonyms, antonyms, and example sentences.',
            parameters: [
                { position: { key: 'word', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Look up the word hello', word: 'hello' },
                { _description: 'Look up the word ephemeral', word: 'ephemeral' },
                { _description: 'Look up the word serendipity', word: 'serendipity' }
            ],
        }
    },
}