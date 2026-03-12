export const main = {
    namespace: 'openmeteoweather',
    name: 'Open-Meteo Weather',
    description: 'Access global weather forecasts from 50+ weather models (GFS, ECMWF, DWD ICON, JMA, etc.) without API key. Get current conditions, hourly and daily forecasts up to 16 days, and recent weather history for any location worldwide at 1km resolution.',
    version: '3.0.0',
    docs: ['https://open-meteo.com/en/docs'],
    tags: ['weather', 'forecast', 'climate', 'geolocation', 'opendata', 'cacheTtlFrequent'],
    root: 'https://api.open-meteo.com',
    requiredServerParams: [],
    headers: {},
    tools: {
        getCurrentWeather: {
            method: 'GET',
            path: '/v1/forecast',
            description: 'Get current weather conditions for a location including temperature, wind speed and direction, and WMO weather code.',
            parameters: [
                { position: { key: 'latitude', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'longitude', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'current_weather', value: 'true', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'timezone', value: '{{TIMEZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(auto)'] } }
            ],
            tests: [
                { _description: 'Get current weather in Berlin', latitude: 52.52, longitude: 13.41 },
                { _description: 'Get current weather in New York', latitude: 40.71, longitude: -74.01 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { latitude: { type: 'number' }, longitude: { type: 'number' }, elevation: { type: 'number' }, timezone: { type: 'string' }, current_weather: { type: 'object', properties: { temperature: { type: 'number' }, windspeed: { type: 'number' }, winddirection: { type: 'number' }, weathercode: { type: 'number' }, is_day: { type: 'number' }, time: { type: 'string' } } }, current_weather_units: { type: 'object' } } }
            }
        },
        getHourlyForecast: {
            method: 'GET',
            path: '/v1/forecast',
            description: 'Get hourly weather forecast for up to 16 days. Select variables like temperature, humidity, precipitation, wind speed, cloud cover, pressure, UV index, and more as comma-separated list.',
            parameters: [
                { position: { key: 'latitude', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'longitude', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'hourly', value: '{{HOURLY_VARIABLES}}', location: 'query' }, z: { primitive: 'string()', options: ['default(temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m)'] } },
                { position: { key: 'timezone', value: '{{TIMEZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(auto)'] } },
                { position: { key: 'forecast_days', value: '{{FORECAST_DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(7)', 'min(1)', 'max(16)'] } }
            ],
            tests: [
                { _description: 'Get 3-day hourly forecast for Berlin', latitude: 52.52, longitude: 13.41, forecast_days: 3 },
                { _description: 'Get hourly temperature and rain for London', latitude: 51.51, longitude: -0.13, hourly: 'temperature_2m,precipitation' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { latitude: { type: 'number' }, longitude: { type: 'number' }, hourly: { type: 'object', properties: { time: { type: 'array' }, temperature_2m: { type: 'array' }, relative_humidity_2m: { type: 'array' }, precipitation: { type: 'array' }, wind_speed_10m: { type: 'array' } } }, hourly_units: { type: 'object' } } }
            }
        },
        getDailyForecast: {
            method: 'GET',
            path: '/v1/forecast',
            description: 'Get daily weather forecast summary including min/max temperature, total precipitation, sunrise/sunset times, and dominant wind direction for up to 16 days.',
            parameters: [
                { position: { key: 'latitude', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'longitude', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'daily', value: '{{DAILY_VARIABLES}}', location: 'query' }, z: { primitive: 'string()', options: ['default(temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset)'] } },
                { position: { key: 'timezone', value: '{{TIMEZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(auto)'] } },
                { position: { key: 'forecast_days', value: '{{FORECAST_DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(7)', 'min(1)', 'max(16)'] } }
            ],
            tests: [
                { _description: 'Get 7-day daily forecast for Tokyo', latitude: 35.68, longitude: 139.69 },
                { _description: 'Get daily forecast with wind for Paris', latitude: 48.86, longitude: 2.35, daily: 'temperature_2m_max,temperature_2m_min,wind_speed_10m_max' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { latitude: { type: 'number' }, longitude: { type: 'number' }, daily: { type: 'object', properties: { time: { type: 'array' }, temperature_2m_max: { type: 'array' }, temperature_2m_min: { type: 'array' }, precipitation_sum: { type: 'array' }, sunrise: { type: 'array' }, sunset: { type: 'array' } } }, daily_units: { type: 'object' } } }
            }
        },
        getWeatherHistory: {
            method: 'GET',
            path: '/v1/forecast',
            description: 'Get recent weather history by specifying past_days. Combines historical data with forecast seamlessly. Useful for analyzing recent weather patterns up to 92 days back.',
            parameters: [
                { position: { key: 'latitude', value: '{{LATITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'longitude', value: '{{LONGITUDE}}', location: 'query' }, z: { primitive: 'number()', options: [] } },
                { position: { key: 'hourly', value: '{{HOURLY_VARIABLES}}', location: 'query' }, z: { primitive: 'string()', options: ['default(temperature_2m,precipitation)'] } },
                { position: { key: 'past_days', value: '{{PAST_DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['default(7)', 'min(1)', 'max(92)'] } },
                { position: { key: 'forecast_days', value: '{{FORECAST_DAYS}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'timezone', value: '{{TIMEZONE}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(auto)'] } }
            ],
            tests: [
                { _description: 'Get last 7 days of weather in Berlin', latitude: 52.52, longitude: 13.41, past_days: 7, forecast_days: 0 },
                { _description: 'Get last 14 days plus 3-day forecast for Sydney', latitude: -33.87, longitude: 151.21, past_days: 14, forecast_days: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { latitude: { type: 'number' }, longitude: { type: 'number' }, hourly: { type: 'object', properties: { time: { type: 'array' }, temperature_2m: { type: 'array' }, precipitation: { type: 'array' } } }, hourly_units: { type: 'object' } } }
            }
        }
    }
}
