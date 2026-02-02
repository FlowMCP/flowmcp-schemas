const schema = {
    namespace: "bitget",
    name: "Bitget Crypto Tools",
    description: "Provides crypto data utilities like token prices, announcements, and coin info via Bitget API.",
    docs: ["https://www.bitget.com/api-doc"],
    tags: ["production", "exchange", "trading", "price", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.bitget.com",
    requiredServerParams: [],
    headers: {},
    routes: {
        getTokenPrice: {
            requestMethod: "GET",
            description: "Get the current price of a specific token in USDT pair via bitget. Returns structured JSON response data.",
            route: "/api/v2/spot/market/tickers",
            parameters: [
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get latest price for BTC", symbol: "BTC" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "getTokenPrice" }
            ]
        },
        getAnnoucements: {
            requestMethod: "GET",
            description: "Search for cryptocurrency announcements within the last month by type. Required: annType.",
            route: "/api/v2/public/annoucements",
            parameters: [
                { position: { key: "annType", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(latest_news,coin_listings,trading_competitions_promotions,maintenance_system_updates,symbol_delisting,)", options: [] } },
                { position: { key: "language", value: "zh_CN", location: "query" }, z: { primitive: "string()", options: ["default(zh_CN)"] } }
            ],
            tests: [
                { _description: "Get all announcements", annType: "" },
                { _description: "Get latest news", annType: "latest_news" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "getAnnoucements" }
            ]
        },
        getCoinInfo: {
            requestMethod: "GET",
            description: "Get full metadata and chain support info for a spot coin via bitget. Returns structured JSON response data.",
            route: "/api/v2/spot/public/coins",
            parameters: [
                { position: { key: "coin", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get coin info for ETH", coin: "ETH" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "getCoinInfo" }
            ]
        }
    },
    handlers: {
        getTokenPrice: async ({ struct, payload, userParams }) => {
            const { symbol } = userParams;
            const symbolWithUsdt = symbol.endsWith('USDT') ? symbol : `${symbol}USDT`;
            payload.url = payload.url.replace(/\?symbol=.*$/, `?symbol=${symbolWithUsdt}`);
            return { struct, payload };
        },
        getAnnoucements: async ({ struct, payload, userParams }) => {
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
            return { struct, payload };
        },
        getCoinInfo: async ({ struct, payload, userParams }) => {
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
            return { struct, payload };
        }
    }
};


export { schema };