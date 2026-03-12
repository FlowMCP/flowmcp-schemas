export const main = {
    namespace: 'energycharts',
    name: 'Energy-Charts',
    description: 'Access European electricity data from Fraunhofer ISE including public power generation, installed capacity, day-ahead prices, cross-border flows, and renewable energy shares for 42+ countries.',
    docs: ['https://api.energy-charts.info', 'https://energy-charts.info/'],
    tags: ['energy', 'electricity', 'renewables', 'europe', 'power', 'cacheTtlFrequent'],
    version: '3.0.0',
    root: 'https://api.energy-charts.info',
    requiredServerParams: [],
    headers: {},
    tools: {
        getPublicPower: {
            method: 'GET',
            path: '/public_power',
            description: 'Retrieve public net electricity generation by production type for a given country and time range. Returns 15-minute resolution time series data.',
            parameters: [
                { position: { key: 'country', value: '{{COUNTRY}}', location: 'query' }, z: { primitive: 'enum(de,at,be,bg,ch,cz,dk,ee,es,fi,fr,gr,hr,hu,ie,it,lt,lu,lv,nl,no,pl,pt,ro,rs,se,si,sk,uk,al,am,az,ba,by,cy,ge,md,me,mk,mt,ru,tr,ua,xk,eu,all)', options: [] } },
                { position: { key: 'start', value: '{{START_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'end', value: '{{END_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get German public power generation for one day', country: 'de', start: '2024-06-01', end: '2024-06-02' },
                { _description: 'Get French public power generation', country: 'fr', start: '2024-06-01', end: '2024-06-02' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        unix_seconds: { type: 'array', description: 'Array of Unix timestamps (15-min intervals)' },
                        production_types: { type: 'array', description: 'Array of objects with name and data array per energy source' },
                        deprecated: { type: 'boolean' }
                    }
                }
            }
        },
        getInstalledPower: {
            method: 'GET',
            path: '/installed_power',
            description: 'Retrieve installed power capacity in GW by generation type for a country. Supports yearly and monthly time steps.',
            parameters: [
                { position: { key: 'country', value: '{{COUNTRY}}', location: 'query' }, z: { primitive: 'enum(de,at,be,bg,ch,cz,dk,ee,es,fi,fr,gr,hr,hu,ie,it,lt,lu,lv,nl,no,pl,pt,ro,rs,se,si,sk,uk,eu,all)', options: [] } },
                { position: { key: 'time_step', value: '{{TIME_STEP}}', location: 'query' }, z: { primitive: 'enum(yearly,monthly)', options: ['optional()', 'default(yearly)'] } },
                { position: { key: 'installation_decommission', value: '{{INSTALLATION_DECOMMISSION}}', location: 'query' }, z: { primitive: 'enum(true,false)', options: ['optional()', 'default(false)'] } }
            ],
            tests: [
                { _description: 'Get German installed power capacity yearly', country: 'de', time_step: 'yearly' },
                { _description: 'Get German installed power monthly', country: 'de', time_step: 'monthly' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        time: { type: 'array', description: 'Array of year strings or month timestamps' },
                        production_types: { type: 'array', description: 'Array of objects with name and data array per energy source in GW' },
                        last_update: { type: 'number', description: 'Unix timestamp of last data update' },
                        deprecated: { type: 'boolean' }
                    }
                }
            }
        },
        getPrice: {
            method: 'GET',
            path: '/price',
            description: 'Retrieve day-ahead spot market electricity price in EUR/MWh for a specified bidding zone and time range.',
            parameters: [
                { position: { key: 'bzn', value: '{{BIDDING_ZONE}}', location: 'query' }, z: { primitive: 'enum(AT,BE,BG,CH,CZ,DE-LU,DE-AT-LU,DK1,DK2,EE,ES,FI,FR,GR,HR,HU,IT-North,IT-Centre-North,IT-Centre-South,IT-South,IT-Calabria,IT-Sicily,IT-Sardinia,IT-SACOAC,IT-SACODC,LT,LV,ME,NL,NO1,NO2,NO2NSL,NO3,NO4,NO5,PL,PT,RO,RS,SE1,SE2,SE3,SE4,SI,SK)', options: [] } },
                { position: { key: 'start', value: '{{START_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'end', value: '{{END_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get German electricity price for one day', bzn: 'DE-LU', start: '2024-06-01', end: '2024-06-02' },
                { _description: 'Get French electricity price', bzn: 'FR', start: '2024-06-01', end: '2024-06-02' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        license_info: { type: 'string', description: 'Data license and attribution' },
                        unix_seconds: { type: 'array', description: 'Array of Unix timestamps (hourly)' },
                        price: { type: 'array', description: 'Array of price values in EUR/MWh' },
                        unit: { type: 'string', description: 'Price unit (EUR / MWh)' },
                        deprecated: { type: 'boolean' }
                    }
                }
            }
        },
        getRenewableShareForecast: {
            method: 'GET',
            path: '/ren_share_forecast',
            description: 'Retrieve the forecasted renewable energy share as percentage of total load, including breakdowns by solar, wind onshore, and wind offshore.',
            parameters: [
                { position: { key: 'country', value: '{{COUNTRY}}', location: 'query' }, z: { primitive: 'enum(de,at,be,bg,ch,cz,dk,ee,es,fi,fr,gr,hr,hu,ie,it,lt,lu,lv,nl,no,pl,pt,ro,rs,se,si,sk,uk)', options: [] } }
            ],
            tests: [
                { _description: 'Get renewable share forecast for Germany', country: 'de' },
                { _description: 'Get renewable share forecast for France', country: 'fr' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        unix_seconds: { type: 'array', description: 'Array of Unix timestamps' },
                        share: { type: 'array', description: 'Renewable share percentages of load' },
                        deprecated: { type: 'boolean' }
                    }
                }
            }
        },
        getSignal: {
            method: 'GET',
            path: '/signal',
            description: 'Get the traffic light indicator for current renewable energy penetration. Returns red (0), yellow (1), or green (2) based on the share of renewables in the grid.',
            parameters: [
                { position: { key: 'country', value: '{{COUNTRY}}', location: 'query' }, z: { primitive: 'enum(de,at,be,bg,ch,cz,dk,ee,es,fi,fr,gr,hr,hu,ie,it,lt,lu,lv,nl,no,pl,pt,ro,rs,se,si,sk,uk)', options: [] } },
                { position: { key: 'postal_code', value: '{{POSTAL_CODE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get renewable signal for Germany', country: 'de' },
                { _description: 'Get renewable signal for German postal code', country: 'de', postal_code: '10115' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        unix_seconds: { type: 'array', description: 'Array of Unix timestamps (15-min intervals)' },
                        share: { type: 'array', description: 'Renewable share percentage values' },
                        signal: { type: 'array', description: 'Traffic light values: 0=red, 1=yellow, 2=green' },
                        substitute: { type: 'boolean', description: 'Whether data is a substitute/forecast' },
                        deprecated: { type: 'boolean' }
                    }
                }
            }
        },
        getCrossBorderElectricityTrading: {
            method: 'GET',
            path: '/cbet',
            description: 'Retrieve cross-border electricity trading flows for a country. Positive values indicate imports, negative values indicate exports.',
            parameters: [
                { position: { key: 'country', value: '{{COUNTRY}}', location: 'query' }, z: { primitive: 'enum(de,at,be,bg,ch,cz,dk,ee,es,fi,fr,gr,hr,hu,ie,it,lt,lu,lv,nl,no,pl,pt,ro,rs,se,si,sk,uk)', options: [] } },
                { position: { key: 'start', value: '{{START_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'end', value: '{{END_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get German cross-border electricity trading', country: 'de', start: '2024-06-01', end: '2024-06-02' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        unix_seconds: { type: 'array', description: 'Array of Unix timestamps' },
                        countries: { type: 'array', description: 'Array of objects with country name and data array of flow values in MW' },
                        deprecated: { type: 'boolean' }
                    }
                }
            }
        },
        getTotalPower: {
            method: 'GET',
            path: '/total_power',
            description: 'Retrieve total electricity generation including industrial self-supply for Germany. Includes all production types.',
            parameters: [
                { position: { key: 'country', value: '{{COUNTRY}}', location: 'query' }, z: { primitive: 'enum(de)', options: [] } },
                { position: { key: 'start', value: '{{START_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'end', value: '{{END_DATE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Get German total power generation', country: 'de', start: '2024-06-01', end: '2024-06-02' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        unix_seconds: { type: 'array', description: 'Array of Unix timestamps' },
                        production_types: { type: 'array', description: 'Array of objects with name and data array per energy source' },
                        deprecated: { type: 'boolean' }
                    }
                }
            }
        }
    }
}
