export const main = {
    namespace: 'openmeteomarine',
    name: 'Open-Meteo Marine Weather',
    description: 'Get ocean wave forecasts, swell data, sea surface temperature, ocean currents, and sea level height for any coastal or ocean location worldwide. Free, no API key required.',
    version: '2.0.0',
    docs: ['https://open-meteo.com/en/docs/marine-weather-api'],
    tags: ['weather', 'ocean', 'marine', 'forecast', 'cacheTtlFrequent'],
    root: 'https://marine-api.open-meteo.com',
    requiredServerParams: [],
    headers: {},
    routes: {
        getMarineForecast: {
            method: 'GET',
            path: '/v1/marine',
            description: 'Get hourly marine weather forecast including wave height, wave direction, wave period, swell, wind waves, and ocean currents for a geographic location. Supports up to 8 forecast days.',
            parameters: [
                { position: { key: 'latitude', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'longitude', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'hourly', value: '{{HOURLY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period)'] } },
                { position: { key: 'forecast_days', value: '{{FORECAST_DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(5)', 'min(0)', 'max(8)'] } },
                { position: { key: 'past_days', value: '{{PAST_DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)', 'max(92)'] } },
                { position: { key: 'timezone', value: '{{TIMEZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(GMT)'] } },
                { position: { key: 'length_unit', value: '{{LENGTH_UNIT}}', location: 'query' }, z: { primitive: 'enum(metric,imperial)', options: ['optional()', 'default(metric)'] } }
            ],
            tests: [
                { _description: 'Get wave forecast for North Sea (Sylt)', LATITUDE: '54.9', LONGITUDE: '8.3', HOURLY: 'wave_height,wave_direction,wave_period,swell_wave_height', FORECAST_DAYS: '3' },
                { _description: 'Get marine forecast for Hawaii', LATITUDE: '21.3', LONGITUDE: '-157.8', HOURLY: 'wave_height,wave_period,swell_wave_height,swell_wave_period,ocean_current_velocity', FORECAST_DAYS: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        generationtime_ms: { type: 'number' },
                        utc_offset_seconds: { type: 'number' },
                        hourly: { type: 'object' },
                        hourly_units: { type: 'object' }
                    }
                }
            }
        },
        getCurrentMarineConditions: {
            method: 'GET',
            path: '/v1/marine',
            description: 'Get current marine conditions including real-time wave height, wave direction, wave period, sea surface temperature, and ocean currents for a location.',
            parameters: [
                { position: { key: 'latitude', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'longitude', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'current', value: '{{CURRENT}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(wave_height,wave_direction,wave_period,sea_surface_temperature,ocean_current_velocity,ocean_current_direction)'] } },
                { position: { key: 'timezone', value: '{{TIMEZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(GMT)'] } },
                { position: { key: 'length_unit', value: '{{LENGTH_UNIT}}', location: 'query' }, z: { primitive: 'enum(metric,imperial)', options: ['optional()', 'default(metric)'] } }
            ],
            tests: [
                { _description: 'Get current conditions for Lisbon coast', LATITUDE: '38.72', LONGITUDE: '-9.14', CURRENT: 'wave_height,wave_direction,wave_period,sea_surface_temperature' },
                { _description: 'Get current ocean conditions for Miami', LATITUDE: '25.76', LONGITUDE: '-80.19', CURRENT: 'wave_height,wave_period,ocean_current_velocity,ocean_current_direction,sea_surface_temperature' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        current: { type: 'object' },
                        current_units: { type: 'object' }
                    }
                }
            }
        },
        getDailyMarineAggregates: {
            method: 'GET',
            path: '/v1/marine',
            description: 'Get daily aggregated marine data including maximum wave height, dominant wave direction, and maximum wave period for multi-day planning of ocean activities.',
            parameters: [
                { position: { key: 'latitude', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'longitude', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'daily', value: '{{DAILY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(wave_height_max,wave_direction_dominant,wave_period_max,swell_wave_height_max,swell_wave_direction_dominant,swell_wave_period_max)'] } },
                { position: { key: 'forecast_days', value: '{{FORECAST_DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(5)', 'min(0)', 'max(8)'] } },
                { position: { key: 'past_days', value: '{{PAST_DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)', 'max(92)'] } },
                { position: { key: 'timezone', value: '{{TIMEZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(GMT)'] } },
                { position: { key: 'length_unit', value: '{{LENGTH_UNIT}}', location: 'query' }, z: { primitive: 'enum(metric,imperial)', options: ['optional()', 'default(metric)'] } }
            ],
            tests: [
                { _description: 'Get daily wave summary for Bali', LATITUDE: '-8.72', LONGITUDE: '115.17', DAILY: 'wave_height_max,wave_direction_dominant,wave_period_max', FORECAST_DAYS: '7' },
                { _description: 'Get daily swell data for Portugal coast', LATITUDE: '39.36', LONGITUDE: '-9.38', DAILY: 'wave_height_max,swell_wave_height_max,swell_wave_direction_dominant,swell_wave_period_max', FORECAST_DAYS: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        daily: { type: 'object' },
                        daily_units: { type: 'object' }
                    }
                }
            }
        },
        getSwellDetails: {
            method: 'GET',
            path: '/v1/marine',
            description: 'Get detailed swell information including primary, secondary, and tertiary swell components with height, direction, period, and peak period for surf forecasting.',
            parameters: [
                { position: { key: 'latitude', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'longitude', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'hourly', value: '{{HOURLY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(swell_wave_height,swell_wave_direction,swell_wave_period,swell_wave_peak_period,secondary_swell_wave_height,secondary_swell_wave_direction,secondary_swell_wave_period)'] } },
                { position: { key: 'forecast_days', value: '{{FORECAST_DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(5)', 'min(0)', 'max(8)'] } },
                { position: { key: 'timezone', value: '{{TIMEZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(GMT)'] } }
            ],
            tests: [
                { _description: 'Get detailed swell for Pipeline, Oahu', LATITUDE: '21.67', LONGITUDE: '-158.05', HOURLY: 'swell_wave_height,swell_wave_direction,swell_wave_period,swell_wave_peak_period,secondary_swell_wave_height', FORECAST_DAYS: '3' },
                { _description: 'Get swell components for Nazare, Portugal', LATITUDE: '39.6', LONGITUDE: '-9.07', HOURLY: 'swell_wave_height,swell_wave_direction,swell_wave_period,secondary_swell_wave_height,secondary_swell_wave_direction', FORECAST_DAYS: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        hourly: { type: 'object' },
                        hourly_units: { type: 'object' }
                    }
                }
            }
        },
        getOceanCurrentsAndTemperature: {
            method: 'GET',
            path: '/v1/marine',
            description: 'Get ocean current velocity, current direction, sea surface temperature, and sea level height for a location. Useful for navigation, fishing, and oceanographic analysis.',
            parameters: [
                { position: { key: 'latitude', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'longitude', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'hourly', value: '{{HOURLY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(ocean_current_velocity,ocean_current_direction,sea_surface_temperature,sea_level_height_msl)'] } },
                { position: { key: 'forecast_days', value: '{{FORECAST_DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(5)', 'min(0)', 'max(8)'] } },
                { position: { key: 'past_days', value: '{{PAST_DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)', 'max(92)'] } },
                { position: { key: 'timezone', value: '{{TIMEZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(GMT)'] } }
            ],
            tests: [
                { _description: 'Get Gulf Stream data near Florida', LATITUDE: '26.1', LONGITUDE: '-79.8', HOURLY: 'ocean_current_velocity,ocean_current_direction,sea_surface_temperature', FORECAST_DAYS: '3' },
                { _description: 'Get ocean data for Great Barrier Reef', LATITUDE: '-18.29', LONGITUDE: '147.7', HOURLY: 'sea_surface_temperature,ocean_current_velocity,ocean_current_direction,sea_level_height_msl', FORECAST_DAYS: '5' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        hourly: { type: 'object' },
                        hourly_units: { type: 'object' }
                    }
                }
            }
        },
        getHistoricalMarineData: {
            method: 'GET',
            path: '/v1/marine',
            description: 'Get historical marine weather data for a specific date range. Returns hourly wave, swell, and ocean data for past dates up to 92 days back.',
            parameters: [
                { position: { key: 'latitude', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'longitude', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'hourly', value: '{{HOURLY}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(wave_height,wave_direction,wave_period,sea_surface_temperature)'] } },
                { position: { key: 'start_date', value: '{{START_DATE}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'end_date', value: '{{END_DATE}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'timezone', value: '{{TIMEZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(GMT)'] } },
                { position: { key: 'length_unit', value: '{{LENGTH_UNIT}}', location: 'query' }, z: { primitive: 'enum(metric,imperial)', options: ['optional()', 'default(metric)'] } }
            ],
            tests: [
                { _description: 'Get historical wave data for North Sea', LATITUDE: '54.9', LONGITUDE: '8.3', HOURLY: 'wave_height,wave_direction,wave_period', START_DATE: '2026-02-01', END_DATE: '2026-02-03' },
                { _description: 'Get historical sea temperature for Canary Islands', LATITUDE: '28.1', LONGITUDE: '-15.4', HOURLY: 'sea_surface_temperature,wave_height', START_DATE: '2026-02-10', END_DATE: '2026-02-12' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                        hourly: { type: 'object' },
                        hourly_units: { type: 'object' }
                    }
                }
            }
        }
    }
}
