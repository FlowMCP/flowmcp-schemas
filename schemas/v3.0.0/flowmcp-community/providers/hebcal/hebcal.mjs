export const main = {
    namespace: 'hebcal',
    name: 'Hebcal Jewish Calendar',
    description: 'Access the Hebcal Jewish Calendar API for holidays, Shabbat times, and date conversion. Get Jewish holidays and events by year, Shabbat candle lighting times by location, and convert between Gregorian and Hebrew dates. Covers major and minor holidays, fast days, and Torah readings. Free, no API key required.',
    version: '3.0.0',
    docs: ['https://www.hebcal.com/home/developer-apis'],
    tags: ['reference', 'calendar', 'religion', 'opendata', 'cacheTtlDaily'],
    root: 'https://www.hebcal.com',
    requiredServerParams: [],
    headers: {},
    tools: {
        getHolidays: {
            method: 'GET',
            path: '/hebcal',
            description: 'Get Jewish holidays and events for a given year and month. Set maj=on for major holidays, min=on for minor holidays, nx=on for Rosh Chodesh, ss=on for special Shabbatot.',
            parameters: [
                { position: { key: 'v', value: '1', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'cfg', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'year', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'month', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'maj', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(on,off)', options: ['optional()', 'default(on)'] } },
                { position: { key: 'min', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(on,off)', options: ['optional()', 'default(on)'] } }
            ],
            tests: [
                { _description: 'Jewish holidays 2024', v: '1', cfg: 'json', year: 2024, maj: 'on', min: 'on' },
                { _description: 'Major holidays March 2024', v: '1', cfg: 'json', year: 2024, month: 3, maj: 'on' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { title: { type: 'string' }, date: { type: 'string' }, items: { type: 'array', items: { type: 'object', properties: { title: { type: 'string' }, date: { type: 'string' }, hdate: { type: 'string' }, category: { type: 'string' }, subcat: { type: 'string' }, hebrew: { type: 'string' }, memo: { type: 'string' } } } } } }
            }
        },
        getShabbatTimes: {
            method: 'GET',
            path: '/shabbat',
            description: 'Get Shabbat candle lighting and Havdalah times for a location. Specify location by GeoNames ID. Returns candle lighting time, Havdalah time, and Torah reading.',
            parameters: [
                { position: { key: 'cfg', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'geo', value: 'geoname', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'geonameid', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: [] } }
            ],
            tests: [
                { _description: 'Shabbat times Jerusalem (281184)', cfg: 'json', geo: 'geoname', geonameid: 281184 },
                { _description: 'Shabbat times New York (5128581)', cfg: 'json', geo: 'geoname', geonameid: 5128581 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { title: { type: 'string' }, date: { type: 'string' }, location: { type: 'object', properties: { title: { type: 'string' }, city: { type: 'string' }, tzid: { type: 'string' }, latitude: { type: 'number' }, longitude: { type: 'number' }, cc: { type: 'string' }, country: { type: 'string' } } }, items: { type: 'array', items: { type: 'object', properties: { title: { type: 'string' }, date: { type: 'string' }, category: { type: 'string' }, hebrew: { type: 'string' } } } } } }
            }
        },
        convertDate: {
            method: 'GET',
            path: '/converter',
            description: 'Convert between Gregorian and Hebrew calendar dates. Use g2h=1 for Gregorian-to-Hebrew, h2g=1 for Hebrew-to-Gregorian.',
            parameters: [
                { position: { key: 'cfg', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'gy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'gm', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'gd', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'g2h', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Convert March 15 2024 to Hebrew', cfg: 'json', gy: 2024, gm: 3, gd: 15, g2h: 1 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { gy: { type: 'number' }, gm: { type: 'number' }, gd: { type: 'number' }, hy: { type: 'number' }, hm: { type: 'string' }, hd: { type: 'number' }, hebrew: { type: 'string' }, events: { type: 'array' } } }
            }
        }
    }
}
