export const main = {
    namespace: 'connectedpapers',
    name: 'Connected Papers',
    description: 'Explore academic paper citation graphs — retrieve visual co-citation and co-reference graphs, check API usage quota, and list free-access papers via the Connected Papers API.',
    version: '2.0.0',
    docs: ['https://github.com/ConnectedPapers/connectedpapers-py', 'https://github.com/ConnectedPapers/connectedpapers-js'],
    tags: ['academic', 'research', 'papers', 'citations', 'graphs', 'cacheTtlDaily'],
    root: 'https://rest.prod.connectedpapers.com',
    requiredServerParams: ['CONNECTED_PAPERS_API_KEY'],
    headers: {
        'X-Api-Key': '{{SERVER_PARAM:CONNECTED_PAPERS_API_KEY}}'
    },
    routes: {
        getGraph: {
            method: 'GET',
            path: '/papers-api/graph/:freshOnly/:paperId',
            description: 'Retrieve the citation graph for a paper by its Semantic Scholar SHA ID. Set freshOnly to "true" for a fresh build or "false" to allow cached graphs up to 1 month old. Graph builds can take up to 60 seconds.',
            parameters: [
                { position: { key: 'paperId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'freshOnly', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(true,false)', options: ['default(false)'] } }
            ],
            tests: [
                { _description: 'Get citation graph for test paper (cached allowed)', paperId: '9397e7acd062245d37350f5c05faf56e9cfae0d6', freshOnly: 'false' },
                { _description: 'Get fresh citation graph for test paper', paperId: '9397e7acd062245d37350f5c05faf56e9cfae0d6', freshOnly: 'true' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', description: 'Graph status: COMPLETED, IN_PROGRESS, BAD_ID, OVERLOADED, OLD_GRAPH, ERROR' },
                        graph_json: {
                            type: 'object',
                            description: 'The citation graph data (present when status is COMPLETED or OLD_GRAPH)',
                            properties: {
                                start_id: { type: 'string', description: 'Semantic Scholar ID of the origin paper' },
                                nodes: {
                                    type: 'object',
                                    description: 'Map of paper IDs to paper metadata objects'
                                },
                                edges: {
                                    type: 'array',
                                    description: 'Array of edge objects representing co-citation relationships'
                                }
                            }
                        }
                    }
                }
            }
        },
        getRemainingUsages: {
            method: 'GET',
            path: '/papers-api/remaining-usages',
            description: 'Check your remaining API usage quota. Returns the number of graph builds remaining in your current billing period.',
            parameters: [],
            tests: [
                { _description: 'Check remaining API usages' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        remaining_usages: { type: 'number', description: 'Number of remaining graph builds allowed' }
                    }
                }
            }
        },
        getFreeAccessPapers: {
            method: 'GET',
            path: '/papers-api/free-access-papers',
            description: 'List papers that have been previously fetched and are available for free access (no usage count deduction) for up to one month after first access.',
            parameters: [],
            tests: [
                { _description: 'List free access papers' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        free_access_papers: {
                            type: 'array',
                            description: 'Array of Semantic Scholar paper IDs available for free access',
                            items: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
}
