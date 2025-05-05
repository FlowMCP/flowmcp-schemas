const schema = {
    'name': 'Moralis entity API',
    'description': 'Moralis entity API',
    'version': '1.0.0',
    'flowMCP': '1.0.0',
    'root': 'https://deep-index.moralis.io/api/v2.2',
    'requiredServerParams': [
        'MORALIS_API_KEY'
    ],
    'headers': {
        "X-API-Key": "{{MORALIS_API_KEY}}"
    },
    'routes': {	
		"/entities/categories": 		{
		    "requestMethod": "GET",
		    "description": "Get Entity Categories",
		    "route": "/entities/categories",
		    "parameters": [
				{"position":{"key":"limit","value":"{{USER_PARAM}}","location":"query"},"z":{"primitive":"number()","options":["optional()"]}}
			],
		    "tests": [
		        {
		            "_description": "Get Entity Categories"
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