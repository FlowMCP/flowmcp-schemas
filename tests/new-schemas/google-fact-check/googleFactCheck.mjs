export const main = {
    namespace: 'googlefactcheck',
    name: 'Google Fact Check Tools',
    description: 'Search fact-checked claims from professional fact-checkers worldwide. Query by text or image to find claim reviews with ratings and sources.',
    version: '2.0.0',
    docs: ['https://developers.google.com/fact-check/tools/api'],
    tags: ['factcheck', 'claims', 'misinformation', 'verification', 'news', 'cacheTtlDaily'],
    root: 'https://factchecktools.googleapis.com',
    requiredServerParams: ['GOOGLE_API_KEY'],
    headers: {},
    routes: {
        searchClaims: {
            method: 'GET',
            path: '/v1alpha1/claims:search',
            description: 'Search through fact-checked claims by text query. Returns matching claims with review ratings, publishers, and source URLs.',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'languageCode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'reviewPublisherSiteFilter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'maxAgeDays', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'pageToken', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'key', value: '{{SERVER_PARAM:GOOGLE_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search for climate change claims', query: 'climate change', pageSize: 5 },
                { _description: 'Search for COVID vaccine claims in English', query: 'covid vaccine', languageCode: 'en', pageSize: 3 },
                { _description: 'Search claims reviewed by specific publisher', query: 'election', reviewPublisherSiteFilter: 'politifact.com', pageSize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        claims: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    text: { type: 'string' },
                                    claimant: { type: 'string' },
                                    claimDate: { type: 'string' },
                                    claimReview: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                publisher: {
                                                    type: 'object',
                                                    properties: {
                                                        name: { type: 'string' },
                                                        site: { type: 'string' }
                                                    }
                                                },
                                                url: { type: 'string' },
                                                title: { type: 'string' },
                                                reviewDate: { type: 'string' },
                                                textualRating: { type: 'string' },
                                                languageCode: { type: 'string' }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        nextPageToken: { type: 'string' }
                    }
                }
            }
        },
        searchClaimsByImage: {
            method: 'GET',
            path: '/v1alpha1/claims:imageSearch',
            description: 'Search through fact-checked claims using a publicly accessible image URL as the query.',
            parameters: [
                { position: { key: 'imageUri', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'languageCode', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'pageToken', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'key', value: '{{SERVER_PARAM:GOOGLE_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search claims by image URL', imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png', pageSize: 3 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        results: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    claim: {
                                        type: 'object',
                                        properties: {
                                            text: { type: 'string' },
                                            claimant: { type: 'string' },
                                            claimDate: { type: 'string' },
                                            claimReview: { type: 'array' }
                                        }
                                    }
                                }
                            }
                        },
                        nextPageToken: { type: 'string' }
                    }
                }
            }
        },
        listClaimReviewMarkup: {
            method: 'GET',
            path: '/v1alpha1/pages',
            description: 'List ClaimReview markup pages for a specific URL or organization. Requires OAuth authentication.',
            parameters: [
                { position: { key: 'url', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'organization', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'pageSize', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'pageToken', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()'] } },
                { position: { key: 'key', value: '{{SERVER_PARAM:GOOGLE_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'List ClaimReview markup pages', pageSize: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        claimReviewMarkupPages: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    pageUrl: { type: 'string' },
                                    publishDate: { type: 'string' },
                                    claimReviewMarkups: { type: 'array' },
                                    versionId: { type: 'string' }
                                }
                            }
                        },
                        nextPageToken: { type: 'string' }
                    }
                }
            }
        }
    }
}
