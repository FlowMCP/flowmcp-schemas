const schema = {
    namespace: 'allora',
    name: 'Allora Network API',
    description: 'Fetches decentralized AI-powered crypto price predictions with confidence intervals from the Allora Network, a decentralized machine learning protocol where multiple AI models compete to produce the most accurate forecasts for assets like BTC and ETH',
    docs: ['https://docs.allora.network/devs/consumers/allora-api-endpoint', 'https://docs.allora.network/devs/sdk/allora-sdk-ts'],
    tags: ['crypto', 'ai', 'prediction', 'machinelearning', 'cacheTtlRealtime'],
    flowMCP: '1.2.0',
    root: 'https://api.allora.network/v2/allora',
    requiredServerParams: ['ALLORA_API_KEY'],
    headers: {
        'accept': 'application/json',
        'x-api-key': '{{ALLORA_API_KEY}}'
    },
    routes: {
        getInferenceByTopic: {
            requestMethod: 'GET',
            description: 'Get the latest network inference for a specific Allora topic by its numeric ID. Returns the combined prediction value, individual worker inferences, forecaster values, confidence intervals, and worker weights. Topics cover different asset-timeframe combinations (e.g. ETH 5m, BTC 8h). via allora.',
            route: '/consumer/:chainSlug',
            parameters: [
                { position: { key: 'chainSlug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(mainnet,testnet)', options: ['default(mainnet)'] } },
                { position: { key: 'allora_topic_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['min(1)'] } }
            ],
            tests: [
                { _description: 'Get inference for topic 1 on mainnet', chainSlug: 'mainnet', allora_topic_id: 1 },
                { _description: 'Get inference for topic 7 on mainnet', chainSlug: 'mainnet', allora_topic_id: 7 }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatInference' }
            ]
        },
        getPricePrediction: {
            requestMethod: 'GET',
            description: 'Get an AI-powered price prediction for BTC or ETH at a specific timeframe (5 minutes or 8 hours). Returns the network consensus prediction, confidence interval bounds, normalized values, and the originating topic ID. Uses the Allora decentralized ML network where multiple competing models produce forecasts. via allora.',
            route: '/consumer/:chainSlug/price',
            parameters: [
                { position: { key: 'chainSlug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(mainnet,testnet)', options: ['default(mainnet)'] } },
                { position: { key: 'asset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(BTC,ETH)', options: [] } },
                { position: { key: 'timeframe', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(5m,8h)', options: ['default(8h)'] } }
            ],
            tests: [
                { _description: 'Get ETH price prediction for 5 minutes ahead', chainSlug: 'mainnet', asset: 'ETH', timeframe: '5m' },
                { _description: 'Get BTC price prediction for 8 hours ahead', chainSlug: 'mainnet', asset: 'BTC', timeframe: '8h' },
                { _description: 'Get ETH price prediction for 8 hours ahead', chainSlug: 'mainnet', asset: 'ETH', timeframe: '8h' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatPricePrediction' }
            ]
        },
        getTopics: {
            requestMethod: 'GET',
            description: 'List all available Allora network topics with their metadata including topic ID, name, description, epoch length, ground truth lag, worker and reputer counts, staked ALLO amount, and active status. Use this to discover which topic IDs are available before querying specific inferences. via allora.',
            route: '/consumer/:chainSlug/topics',
            parameters: [
                { position: { key: 'chainSlug', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(mainnet,testnet)', options: ['default(mainnet)'] } }
            ],
            tests: [
                { _description: 'List all topics on mainnet', chainSlug: 'mainnet' }
            ],
            modifiers: [
                { phase: 'post', handlerName: 'formatTopics' }
            ]
        }
    },
    handlers: {
        formatInference: async ( { struct, payload } ) => {
            if( !struct.status || !struct.data ) {
                return { struct, payload }
            }

            const raw = struct.data
            const inferenceData = raw['inference_data'] || raw

            const result = {
                topicId: inferenceData['topic_id'] || null,
                combinedValue: inferenceData['network_inference'] || inferenceData['combined_value'] || null,
                naiveValue: inferenceData['naive_value'] || null,
                confidenceIntervals: inferenceData['confidence_interval_values'] || [],
                normalizedInference: inferenceData['network_inference_normalized'] || null,
                normalizedConfidenceIntervals: inferenceData['confidence_interval_values_normalized'] || [],
                timestamp: inferenceData['timestamp'] || null,
                blockHeight: inferenceData['inference_block_height'] || null
            }

            struct.data = result

            return { struct, payload }
        },
        formatPricePrediction: async ( { struct, payload } ) => {
            if( !struct.status || !struct.data ) {
                return { struct, payload }
            }

            const raw = struct.data
            const inferenceData = raw['inference_data'] || raw

            const result = {
                topicId: inferenceData['topic_id'] || null,
                predictedPrice: inferenceData['network_inference'] || inferenceData['combined_value'] || null,
                normalizedPrice: inferenceData['network_inference_normalized'] || null,
                confidenceIntervals: inferenceData['confidence_interval_values'] || [],
                normalizedConfidenceIntervals: inferenceData['confidence_interval_values_normalized'] || [],
                timestamp: inferenceData['timestamp'] || null,
                extraData: inferenceData['extra_data'] || null
            }

            struct.data = result

            return { struct, payload }
        },
        formatTopics: async ( { struct, payload } ) => {
            if( !struct.status || !struct.data ) {
                return { struct, payload }
            }

            const raw = struct.data
            const topicsList = Array.isArray( raw ) ? raw : ( raw['topics'] || [] )

            if( !Array.isArray( topicsList ) ) {
                return { struct, payload }
            }

            const topics = topicsList
                .map( ( topic ) => {
                    const result = {
                        topicId: topic['topic_id'] || topic['id'] || null,
                        name: topic['name'] || null,
                        description: topic['description'] || null,
                        epochLength: topic['epoch_length'] || null,
                        groundTruthLag: topic['ground_truth_lag'] || null,
                        workerCount: topic['worker_count'] || null,
                        reputerCount: topic['reputer_count'] || null,
                        stakedAllo: topic['staked_allo'] || null,
                        isActive: topic['is_active'] || null
                    }

                    return result
                } )

            struct.data = { topics }

            return { struct, payload }
        }
    }
}


export { schema }
