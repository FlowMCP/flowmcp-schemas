// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'cryptorank',
    name: 'Cryptorank Funds',
    description: 'Access cryptocurrency investment fund data from Cryptorank — search, filter, and sort funds with detailed profiles including team members and portfolio analytics.',
    version: '2.0.0',
    docs: ['https://api.cryptorank.io'],
    tags: ['funds', 'investors', 'analytics', 'cacheTtlDaily'],
    root: 'https://api.cryptorank.io/v2',
    requiredServerParams: ['CRYPTORANK_API_KEY'],
    headers: {
        'X-Api-Key': '{{CRYPTORANK_API_KEY}}'
    },
    routes: {
        searchFunds: {
            method: 'GET',
            path: '/funds',
            description: 'Fetch a sortable and filterable list of funds and investors with key metrics. Required: sortBy, sortDirection, limit, skip. Optional filters: tier, type.',
            parameters: [
                { position: { key: 'sortBy', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(tier,fundingRounds,leadInvestments,portfolio,retailRoi)', options: ['default(tier)'] } },
                { position: { key: 'sortDirection', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(ASC,DESC)', options: ['default(ASC)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(100,200,300)', options: ['default(100)'] } },
                { position: { key: 'skip', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(0)', 'default(0)'] } },
                { position: { key: 'tier', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^[1-5](,[1-5])*$)', 'optional()'] } },
                { position: { key: 'type', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{data:{type:'array',items:{type:'object',properties:{id:{type:'number'},name:{type:'string'},slug:{type:'string'}}}}}}},
            tests: [
                { _description: 'Default sort, first 100', sortBy: 'tier', sortDirection: 'ASC', limit: '100', skip: 0 },
                {
                    _description: 'Filter by tiers 1,2 and Venture type',
                    sortBy: 'portfolio',
                    sortDirection: 'DESC',
                    limit: '100',
                    skip: 0,
                    tier: '1,2',
                    type: 'Venture'
                }
            ],
        },
        getAllFunds: {
            method: 'GET',
            path: '/funds/map',
            description: 'Fetch the complete map/list of investors and funds via Cryptorank. Returns structured JSON response data.',
            parameters: [],
            output: {mimeType:'application/json',schema:{type:'object',properties:{data:{type:'array',items:{type:'object',properties:{id:{type:'number'},name:{type:'string'},tier:{type:'string'},type:{type:'string'}}}},totalCount:{type:'number'}}}},
            tests: [
                { _description: 'Fetch all funds' }
            ],
        },
        getFundBasic: {
            method: 'GET',
            path: '/funds/:fund_id',
            description: 'Fetch basic metrics for a specific fund by ID via Cryptorank — query by fund id.',
            parameters: [
                { position: { key: 'fund_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{data:{type:'object',properties:{id:{type:'number'},name:{type:'string'},description:{type:'string'},website:{type:'string'}}}}}},
            tests: [
                { _description: 'Fetch fund basic data', fund_id: 1 }
            ],
        },
        getFundDetail: {
            method: 'GET',
            path: '/funds/:fund_id/full-metadata',
            description: 'Fetch comprehensive fund profile, investments, rounds, and metadata by ID. Required: fund_id.',
            parameters: [
                { position: { key: 'fund_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{data:{type:'object',properties:{id:{type:'number'},name:{type:'string'},portfolio:{type:'array',items:{type:'object'}}}}}}},
            tests: [
                { _description: 'Fetch comprehensive fund data', fund_id: 1 }
            ],
        },
        getFundTeam: {
            method: 'GET',
            path: '/funds/:fund_id/team',
            description: 'Fetch detailed team information for a specific fund by ID via Cryptorank — query by fund id.',
            parameters: [
                { position: { key: 'fund_id', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ],
            output: {mimeType:'application/json',schema:{type:'object',properties:{data:{type:'array',items:{type:'object',properties:{name:{type:'string'},role:{type:'string'}}}}}}},
            tests: [
                { _description: 'Fetch team for fund', fund_id: 1 }
            ],
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    searchFunds: {
        preRequest: async ( { struct, payload } ) => {
            const urlObj = new URL( struct.url )

            const tier = urlObj.searchParams.get( 'tier' )
            if( tier !== null ) {
            const normalized = Array.isArray( tier ) ? tier.join( ',' ) : tier
            urlObj.searchParams.set( 'tier', normalized )
            }

            const type = urlObj.searchParams.get( 'type' )
            if( type !== null ) {
            const normalized = Array.isArray( type ) ? type.join( ',' ) : type
            urlObj.searchParams.set( 'type', normalized )
            }

            struct.url = urlObj.toString()

            return { struct }
        }
    }
} )
