// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'bitget',
    name: 'Bitget Crypto Tools',
    description: 'Provides crypto data utilities like token prices, announcements, and coin info via Bitget API.',
    version: '2.0.0',
    docs: ['https://www.bitget.com/api-doc'],
    tags: ['production', 'exchange', 'trading', 'price', 'cacheTtlDaily'],
    root: 'https://api.bitget.com',
    routes: {
        getTokenPrice: {
            method: 'GET',
            path: '/api/v2/spot/market/tickers',
            description: 'Get the current price of a specific token in USDT pair via bitget. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'symbol', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        },
        getAnnoucements: {
            method: 'GET',
            path: '/api/v2/public/annoucements?language=zh_CN',
            description: 'Search for cryptocurrency announcements within the last month by type. Required: annType.',
            parameters: [
                { position: { key: 'annType', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(latest_news,coin_listings,trading_competitions_promotions,maintenance_system_updates,symbol_delisting,)', options: [] } }
            ]
        },
        getCoinInfo: {
            method: 'GET',
            path: '/api/v2/spot/public/coins',
            description: 'Get full metadata and chain support info for a spot coin via bitget. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'coin', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(1)'] } }
            ]
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    getTokenPrice: {
        preRequest: async ( { struct, payload } ) => {
            const { symbol } = payload;
            const symbolWithUsdt = symbol.endsWith('USDT') ? symbol : `${symbol}USDT`;
            struct.url = struct.url.replace(/\?symbol=.*$/, `?symbol=${symbolWithUsdt}`);
            return { struct }
        }
    },
    getAnnoucements: {
        executeRequest: async ( { struct, payload } ) => {
            const { userParams } = payload
            try {
            const annType = userParams.annType;
            const url = `https://api.bitget.com/api/v2/public/annoucements?language=zh_CN&annType=${annType}`;
            const res = await fetch(url);
            const data = await res.json();
            struct.data = data;
            } catch (e) {
            struct.status = false;
            struct.messages.push(e.message);
            }
            return { struct }
        }
    },
    getCoinInfo: {
        executeRequest: async ( { struct, payload } ) => {
            const { userParams } = payload
            try {
            const coin = userParams.coin;
            const url = `https://api.bitget.com/api/v2/spot/public/coins?coin=${coin}`;
            const res = await fetch(url);
            const data = await res.json();
            struct.data = data;
            } catch (e) {
            struct.status = false;
            struct.messages.push(e.message);
            }
            return { struct }
        }
    }
} )
