// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Module-level code: 3 lines

export const main = {
    namespace: 'polymarket',
    name: 'Fed Rate Cuts 2025',
    description: 'Access Polymarket prediction market data for Fed rate cut events via the Gamma API. Returns market outcomes, probabilities, and trading volume.',
    version: '2.0.0',
    docs: ['https://polymarket.com'],
    tags: ['prediction', 'markets', 'events', 'cacheTtlFrequent'],
    root: 'https://gamma-api.polymarket.com',
    routes: {
        searchBySlug: {
            method: 'GET',
            path: '/events/slug/:slug',
            description: 'Get market data for Fed rate cuts in 2025 by slug via Polymarket — query by slug.',
            parameters: [
                { position: { key: 'slug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(fedRateCuts2025)', options: [] } }
            ],
            tests: [
                { _description: 'Test Fed Cut Market 2025', slug: 'fedRateCuts2025' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        ticker: { type: 'string' },
                        slug: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        resolutionSource: { type: 'string' },
                        startDate: { type: 'string' },
                        creationDate: { type: 'string' },
                        endDate: { type: 'string' },
                        image: { type: 'string' },
                        icon: { type: 'string' },
                        active: { type: 'boolean' },
                        closed: { type: 'boolean' },
                        archived: { type: 'boolean' },
                        new: { type: 'boolean' },
                        featured: { type: 'boolean' },
                        restricted: { type: 'boolean' },
                        volume: { type: 'number' },
                        openInterest: { type: 'number' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                        volume1wk: { type: 'number' },
                        volume1mo: { type: 'number' },
                        volume1yr: { type: 'number' },
                        enableOrderBook: { type: 'boolean' },
                        negRisk: { type: 'boolean' },
                        negRiskMarketID: { type: 'string' },
                        commentCount: { type: 'number' },
                        markets: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, question: { type: 'string' }, conditionId: { type: 'string' }, slug: { type: 'string' }, resolutionSource: { type: 'string' }, endDate: { type: 'string' }, startDate: { type: 'string' }, image: { type: 'string' }, icon: { type: 'string' }, description: { type: 'string' }, outcomes: { type: 'string' }, outcomePrices: { type: 'string' }, volume: { type: 'string' }, active: { type: 'boolean' }, closed: { type: 'boolean' }, marketMakerAddress: { type: 'string' }, createdAt: { type: 'string' }, updatedAt: { type: 'string' }, closedTime: { type: 'string' }, new: { type: 'boolean' }, featured: { type: 'boolean' }, submitted_by: { type: 'string' }, archived: { type: 'boolean' }, resolvedBy: { type: 'string' }, restricted: { type: 'boolean' }, groupItemTitle: { type: 'string' }, groupItemThreshold: { type: 'string' }, questionID: { type: 'string' }, umaEndDate: { type: 'string' }, enableOrderBook: { type: 'boolean' }, orderPriceMinTickSize: { type: 'number' }, orderMinSize: { type: 'number' }, umaResolutionStatus: { type: 'string' }, volumeNum: { type: 'number' }, endDateIso: { type: 'string' }, startDateIso: { type: 'string' }, hasReviewedDates: { type: 'boolean' }, volume1wk: { type: 'number' }, volume1mo: { type: 'number' }, volume1yr: { type: 'number' }, clobTokenIds: { type: 'string' }, umaBond: { type: 'string' }, umaReward: { type: 'string' }, volume1wkClob: { type: 'number' }, volume1moClob: { type: 'number' }, volume1yrClob: { type: 'number' }, volumeClob: { type: 'number' }, acceptingOrders: { type: 'boolean' }, negRisk: { type: 'boolean' }, negRiskMarketID: { type: 'string' }, negRiskRequestID: { type: 'string' }, ready: { type: 'boolean' }, funded: { type: 'boolean' }, acceptingOrdersTimestamp: { type: 'string' }, cyom: { type: 'boolean' }, pagerDutyNotificationEnabled: { type: 'boolean' }, approved: { type: 'boolean' }, clobRewards: { type: 'array', items: { type: 'object' } }, rewardsMinSize: { type: 'number' }, rewardsMaxSpread: { type: 'number' }, spread: { type: 'number' }, automaticallyResolved: { type: 'boolean' }, oneDayPriceChange: { type: 'number' }, oneWeekPriceChange: { type: 'number' }, oneMonthPriceChange: { type: 'number' }, lastTradePrice: { type: 'number' }, bestAsk: { type: 'number' }, automaticallyActive: { type: 'boolean' }, clearBookOnStart: { type: 'boolean' }, seriesColor: { type: 'string' }, manualActivation: { type: 'boolean' }, negRiskOther: { type: 'boolean' }, umaResolutionStatuses: { type: 'string' }, pendingDeployment: { type: 'boolean' }, deploying: { type: 'boolean' }, rfqEnabled: { type: 'boolean' }, holdingRewardsEnabled: { type: 'boolean' }, feesEnabled: { type: 'boolean' }, requiresTranslation: { type: 'boolean' }, feeType: { type: 'number', nullable: true } } } },
                        tags: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, label: { type: 'string' }, slug: { type: 'string' }, forceShow: { type: 'boolean' }, updatedAt: { type: 'string' }, requiresTranslation: { type: 'boolean' } } } },
                        cyom: { type: 'boolean' },
                        closedTime: { type: 'string' },
                        showAllOutcomes: { type: 'boolean' },
                        showMarketImages: { type: 'boolean' },
                        automaticallyResolved: { type: 'boolean' },
                        enableNegRisk: { type: 'boolean' },
                        automaticallyActive: { type: 'boolean' },
                        gmpChartMode: { type: 'string' },
                        negRiskAugmented: { type: 'boolean' },
                        pendingDeployment: { type: 'boolean' },
                        deploying: { type: 'boolean' },
                        requiresTranslation: { type: 'boolean' }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => {

    const selection = {
        fedRateCuts2025: 'how-many-fed-rate-cuts-in-2025'
    }

    return {
        searchBySlug: {
            preRequest: async ( { struct, payload } ) => {
                const key = payload.slug;
                if( selection[ key ] ) {
                struct['url'] = struct.url.replace( key, selection[ key ] )
                } else {
                throw new Error( `Selection not found.` )
                }
                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                if( !response || !response.markets ) {
                struct.status = false
                struct.messages.push( `Error` )
                return { response }}

                response = response?.markets
                .map( ( market ) => {
                const prices = JSON.parse(market.outcomePrices || "[]")
                return {
                question: market.question,
                outcomes: JSON.parse(market.outcomes || "[]"),
                prices: prices.map(p => Math.round(parseFloat(p) * 100)),
                lastTrade: Math.round(parseFloat(market.lastTradePrice || "0") * 100)
                }
                } )

                return { response }
            }
        }
    }
}
