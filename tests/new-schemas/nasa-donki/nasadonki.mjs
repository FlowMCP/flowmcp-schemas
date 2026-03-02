export const main = {
    namespace: 'nasadonki',
    name: 'NasaDonki',
    description: 'Query NASA DONKI (Database of Notifications, Knowledge, Information) for space weather events — solar flares, coronal mass ejections, geomagnetic storms, energetic particles, and high-speed streams.',
    docs: ['https://api.nasa.gov/', 'https://ccmc.gsfc.nasa.gov/tools/DONKI/'],
    tags: ['nasa', 'spaceweather', 'solar', 'science', 'alerts', 'cacheTtlFrequent'],
    version: '2.0.0',
    root: 'https://api.nasa.gov',
    requiredServerParams: ['SERVER_PARAM:NASA_API_KEY'],
    headers: {},
    routes: {
        getSolarFlares: {
            method: 'GET',
            description: 'Get solar flare events within a date range. Returns flare class (X/M/C), begin/peak/end times, source location on solar disk, active region number, linked events, and observing instruments. via nasadonki.',
            path: '/DONKI/FLR',
            parameters: [
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'api_key', value: '{{SERVER_PARAM:NASA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get solar flares for the first week of January 2024', startDate: '2024-01-01', endDate: '2024-01-07' },
                { _description: 'Get solar flares for a month of high activity in 2024', startDate: '2024-05-01', endDate: '2024-05-31' }
            ],
        },
        getCoronalMassEjections: {
            method: 'GET',
            description: 'Get coronal mass ejection events with analysis data including CME speed, half-angle, type, impact predictions, and linked solar events. via nasadonki.',
            path: '/DONKI/CME',
            parameters: [
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'api_key', value: '{{SERVER_PARAM:NASA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get CME events for January 2024', startDate: '2024-01-01', endDate: '2024-01-31' },
                { _description: 'Get CME events for a week with major solar activity', startDate: '2024-03-01', endDate: '2024-03-07' }
            ],
        },
        getGeomagneticStorms: {
            method: 'GET',
            description: 'Get geomagnetic storm events with Kp index readings over time and linked CME or solar wind sources. via nasadonki.',
            path: '/DONKI/GST',
            parameters: [
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'api_key', value: '{{SERVER_PARAM:NASA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get geomagnetic storms in the first half of 2024', startDate: '2024-01-01', endDate: '2024-06-30' },
                { _description: 'Get geomagnetic storms during solar maximum week in May 2024', startDate: '2024-05-07', endDate: '2024-05-14' }
            ],
        },
        getHighSpeedStreams: {
            method: 'GET',
            description: 'Get high-speed solar wind stream events that can trigger geomagnetic disturbances. Returns event time, instruments, and linked geomagnetic storm records. via nasadonki.',
            path: '/DONKI/HSS',
            parameters: [
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'api_key', value: '{{SERVER_PARAM:NASA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get high-speed stream events for Q1 2024', startDate: '2024-01-01', endDate: '2024-03-31' },
                { _description: 'Get high-speed stream events for summer 2023', startDate: '2023-06-01', endDate: '2023-08-31' }
            ],
        },
        getNotifications: {
            method: 'GET',
            description: 'Get space weather notifications including alerts, warnings, and watches. Filterable by event type (GST, CME, FLR, SEP, etc.) with full notification text. via nasadonki.',
            path: '/DONKI/notifications',
            parameters: [
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(all,FLR,SEP,CME,IPS,MPC,GST,RBE,report)', options: ['optional()', 'default(all)'] } },
                { position: { key: 'api_key', value: '{{SERVER_PARAM:NASA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get all space weather notifications for a week', startDate: '2024-01-01', endDate: '2024-01-07', type: 'all' },
                { _description: 'Get geomagnetic storm notifications for May 2024', startDate: '2024-05-01', endDate: '2024-05-31', type: 'GST' }
            ],
        },
        getSolarEnergeticParticles: {
            method: 'GET',
            description: 'Get solar energetic particle events that can endanger spacecraft and astronauts, with linked flare and CME event references. via nasadonki.',
            path: '/DONKI/SEP',
            parameters: [
                { position: { key: 'startDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'endDate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'api_key', value: '{{SERVER_PARAM:NASA_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get solar energetic particle events for the first half of 2024', startDate: '2024-01-01', endDate: '2024-06-30' },
                { _description: 'Get SEP events during a month of high solar activity', startDate: '2024-05-01', endDate: '2024-05-31' }
            ],
        }
    },
}
