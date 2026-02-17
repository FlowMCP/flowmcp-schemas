// Migrated from v1.2.0 -> v2.0.0
// Category: simple

export const main = {
    namespace: 'berlinfunds',
    name: 'Berlin Funds API',
    description: 'Access Berlin city funding data — search available funding opportunities and continuing education programs from the Berlin.de portal (German language).',
    version: '2.0.0',
    docs: ['https://www.berlin.de/'],
    tags: ['berlin', 'funding', 'opendata', 'cacheTtlDaily'],
    root: 'https://www.berlin.de',
    routes: {
        funding_opportunities: {
            method: 'GET',
            path: '/ba-treptow-koepenick/politik-und-verwaltung/beauftragte/integration/foerderungen-finanzen/simplesearch/index.php/index/all.json',
            description: 'Funding opportunities from Berlin-Treptow-Köpenick district via Berlin.de. Returns structured JSON response data.',
            parameters: [],
            tests: [
                { _description: 'Get all funding opportunities from Treptow-Köpenick district' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        messages: { type: 'object', properties: { messages: { type: 'array', items: { type: 'string' } }, success: { type: 'boolean' } } },
                        results: { type: 'object', properties: { count: { type: 'number' }, items_per_page: { type: 'number' } } },
                        index: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, projekt: { type: 'string' }, art: { type: 'string' }, interessengruppe: { type: 'string' }, beschreibung: { type: 'string' }, antragsberechtigt: { type: 'string' }, antragsfrist: { type: 'string' }, summe: { type: 'string' }, link: { type: 'string' }, link2: { type: 'string' }, stelle: { type: 'string' } } } },
                        item: { type: 'array', items: { type: 'string' } }
                    }
                }
            },
        },
        continuing_education: {
            method: 'GET',
            path: '/sen/arbeit/weiterbildung/bildungszeit/suche/index.php/index/all.json',
            description: 'Continuing education and professional development courses (Bildungszeit) via Berlin.de.',
            parameters: [],
            tests: [
                { _description: 'Get all continuing education courses in Berlin' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        messages: { type: 'object', properties: { messages: { type: 'array', items: { type: 'string' } }, success: { type: 'boolean' } } },
                        results: { type: 'object', properties: { count: { type: 'number' }, items_per_page: { type: 'number' } } },
                        index: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, kurztitel: { type: 'string' }, kategorie: { type: 'string' }, unterkategorie: { type: 'string' }, datum_beginn: { type: 'string' }, datum_ende: { type: 'string' }, terminliste: { type: 'string' }, landname: { type: 'string' }, ort: { type: 'string' }, va_name: { type: 'string' }, va_adresse: { type: 'string' }, va_telefon: { type: 'string' }, va_fax: { type: 'string' }, va_email: { type: 'string' }, va_internet: { type: 'string' }, teilnehmerkreis: { type: 'string' }, externer_link: { type: 'string' } } } },
                        item: { type: 'array', items: { type: 'string' } }
                    }
                }
            },
        }
    }
}
