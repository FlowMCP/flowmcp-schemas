// Schema for #233 — ICE Portal (Deutsche Bahn on-board train API)
// NOTE: API only accessible when connected to ICE on-board WiFi. Cannot be tested from outside.

export const main = {
    namespace: 'iceportal',
    name: 'ICE Portal Train API',
    description: 'Live train data from Deutsche Bahn ICE on-board WiFi. Get real-time train position, speed, GPS coordinates, trip details with stops, delays, and track information. Only accessible when connected to ICE train WiFi.',
    version: '2.0.0',
    docs: ['https://github.com/derhuerst/wifi-on-ice'],
    tags: ['transport', 'train', 'germany', 'realtime', 'geospatial', 'cacheTtlRealtime'],
    root: 'https://iceportal.de/api1/rs',
    routes: {
        getTrainStatus: {
            method: 'GET',
            path: '/status',
            description: 'Get the current train status including GPS position, speed, connection status, and service level. Updated every few seconds while on board.',
            parameters: [],
            tests: [
                { _description: 'Get current train status (only works on ICE WiFi)' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        connection: { type: 'boolean' },
                        serviceLevel: { type: 'string' },
                        gpsStatus: { type: 'string' },
                        internet: { type: 'string' },
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        tileY: { type: 'number' },
                        tileX: { type: 'number' },
                        series: { type: 'string' },
                        speed: { type: 'number' },
                        trainType: { type: 'string' },
                        tzn: { type: 'string' },
                        wagonClass: { type: 'string' },
                        serverTime: { type: 'number' }
                    }
                }
            }
        },
        getTripInfo: {
            method: 'GET',
            path: '/tripInfo/trip',
            description: 'Get full trip details for the current journey. Includes train number, all scheduled stops with planned and actual arrival/departure times, delays, track numbers, and distance information.',
            parameters: [],
            tests: [
                { _description: 'Get current trip information (only works on ICE WiFi)' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        trip: {
                            type: 'object',
                            properties: {
                                tripDate: { type: 'string' },
                                trainType: { type: 'string' },
                                vzn: { type: 'string' },
                                actualPosition: { type: 'number' },
                                distanceFromLastStop: { type: 'number' },
                                totalDistance: { type: 'number' },
                                stopInfo: { type: 'object' },
                                stops: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            station: { type: 'object' },
                                            timetable: { type: 'object' },
                                            track: { type: 'object' },
                                            info: { type: 'object' },
                                            delayReasons: { type: 'array' }
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
