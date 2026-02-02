const schema = {
	'namespace': 'moralis',
    'name': 'Moralis utils API',
    'description': 'Moralis platform utility endpoints for API introspection. Check endpoint costs, rate limits, and the current Moralis Web3 API version.',
    'docs': ["https://docs.moralis.com"],
    tags: ["evm", "utilities", "conversion", "cacheTtlDaily"],
    'flowMCP': '1.2.0',
    'root': 'https://deep-index.moralis.io/api/v2.2',
    'requiredServerParams': [
        'MORALIS_API_KEY'
    ],
    'headers': {
        "X-API-Key": "{{MORALIS_API_KEY}}"
    },
    'routes': {	
		"/info/endpointWeights": 		{
		    "requestMethod": "GET",
		    "description": "Get the cost and rate limit for each API endpoint via Moralis. Returns structured JSON response data.",
		    "route": "/info/endpointWeights",
		    "parameters": [
		
			],
		    "tests": [
		        {
		            "_description": "Get the cost and rate limit for each API endpoint."
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		},
	
		"/web3/version": 		{
		    "requestMethod": "GET",
		    "description": "Get the current version of the Moralis Web3 API. Returns structured JSON response data.",
		    "route": "/web3/version",
		    "parameters": [
		
			],
		    "tests": [
		        {
		            "_description": "Get the current version of the Moralis Web3 API."
		        }
		    ],
		    "modifiers": [
		        {
		            "phase": "post",
		            "handlerName": "modifyResult"
		        }
		    ]
		}
	},
    'handlers': {
        'modifyResult': async( { struct, payload } ) => {
            return { struct, payload }
        }
    }
}
   

export { schema }