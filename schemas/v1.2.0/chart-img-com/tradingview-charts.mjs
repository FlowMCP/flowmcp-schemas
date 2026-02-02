export const schema = {
    namespace: "chartImg",
    name: "Chart Image API",
    description: "High-quality TradingView chart screenshots and financial chart image generation service",
    docs: ["https://doc.chart-img.com"],
    tags: ["charts", "visualization", "trading", "cacheTtlStatic"],
    flowMCP: "1.2.0",
    root: "https://api.chart-img.com",
    requiredServerParams: ["CHART_IMG_API_KEY"],
    headers: { "x-api-key": "{{CHART_IMG_API_KEY}}" },
    handlers: {
        rateLimitHandler: async ({ struct, payload, userParams, server }) => {
            const maxRetries = 3
            const baseDelay = 2000
            
            for( let attempt = 0; attempt <= maxRetries; attempt++ ) {
                try {
                    const response = await fetch( payload.url, {
                        method: payload.method,
                        headers: payload.headers,
                        body: JSON.stringify( payload.body )
                    } )
                    
                    if( response.status === 429 ) {
                        if( attempt < maxRetries ) {
                            const delay = baseDelay * Math.pow( 2, attempt )
                            struct.messages.push( `Rate limited, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})` )
                            await new Promise( resolve => setTimeout( resolve, delay ) )
                            continue
                        } else {
                            struct.status = false
                            struct.messages.push( `Rate limit exceeded after ${maxRetries + 1} attempts` )
                            return { struct, payload }
                        }
                    }
                    
                    struct.httpStatus = response.status
                    struct.responseHeaders = Object.fromEntries( response.headers.entries() )
                    struct.dataAsString = await response.text()
                    
                    if( response.ok ) {
                        try {
                            struct.data = JSON.parse( struct.dataAsString )
                        } catch {
                            struct.data = { rawResponse: struct.dataAsString }
                        }
                    } else {
                        struct.status = false
                        struct.messages.push( `HTTP ${response.status}: ${response.statusText}` )
                    }
                    
                    return { struct, payload }
                    
                } catch( error ) {
                    if( attempt < maxRetries ) {
                        const delay = baseDelay * Math.pow( 2, attempt )
                        struct.messages.push( `Request failed, retrying in ${delay}ms: ${error.message}` )
                        await new Promise( resolve => setTimeout( resolve, delay ) )
                        continue
                    } else {
                        struct.status = false
                        struct.messages.push( `Request failed after ${maxRetries + 1} attempts: ${error.message}` )
                        return { struct, payload }
                    }
                }
            }
        }
    },
    routes: {
        getAdvancedChart: {
            requestMethod: "POST",
            description: "Capture a high-quality screenshot of a TradingView advanced chart with specified symbol and settings",
            route: "/v2/tradingview/advanced-chart",
            parameters: [
                { position: { key: "symbol", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "interval", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "enum(1m,3m,5m,15m,30m,45m,1h,4h,1D,1W,1M)", options: ["default(15m)", "optional()"] } },
                { position: { key: "theme", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "enum(light,dark)", options: ["default(dark)", "optional()"] } },
                { position: { key: "width", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(400)", "max(2000)", "default(1200)", "optional()"] } },
                { position: { key: "height", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "number()", options: ["min(300)", "max(1500)", "default(800)", "optional()"] } },
                { position: { key: "session", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "enum(regular,extended)", options: ["default(extended)", "optional()"] } },
                { position: { key: "timezone", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "string()", options: ["default(America/New_York)", "optional()"] } }
            ],
            tests: [
                { _description: "Screenshot Tesla stock", symbol: "NASDAQ:TSLA", interval: "15m", theme: "dark", height: 600 }
            ],
            modifiers: [{ phase: "execute", handlerName: "rateLimitHandler" }]
        }
    }
}