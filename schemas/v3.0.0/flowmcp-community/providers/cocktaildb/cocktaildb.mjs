export const main = {
    namespace: 'cocktaildb',
    name: 'TheCocktailDB',
    description: 'Access TheCocktailDB, an open crowd-sourced database of cocktail recipes. Search drinks by name or ingredient, browse categories, get detailed recipes with instructions and measurements. Covers 600+ cocktails with images, ingredients, and glass types. Free tier uses API key "1" for testing.',
    version: '3.0.0',
    docs: ['https://www.thecocktaildb.com/api.php'],
    tags: ['food', 'beverage', 'recipes', 'opendata', 'cacheTtlDaily'],
    root: 'https://www.thecocktaildb.com',
    requiredServerParams: [],
    headers: {},
    tools: {
        searchCocktails: {
            method: 'GET',
            path: '/api/json/v1/1/search.php',
            description: 'Search cocktails by name. Returns detailed drink information including ingredients, measurements, instructions, glass type, and image.',
            parameters: [
                { position: { key: 's', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search Margarita', s: 'margarita' },
                { _description: 'Search Mojito', s: 'mojito' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { drinks: { type: 'array', items: { type: 'object', properties: { idDrink: { type: 'string' }, strDrink: { type: 'string' }, strCategory: { type: 'string' }, strAlcoholic: { type: 'string' }, strGlass: { type: 'string' }, strInstructions: { type: 'string' }, strDrinkThumb: { type: 'string' }, strIngredient1: { type: 'string' }, strMeasure1: { type: 'string' } } } } } }
            }
        },
        getCocktail: {
            method: 'GET',
            path: '/api/json/v1/1/lookup.php',
            description: 'Get detailed cocktail recipe by ID. Returns full recipe with all ingredients, measurements, instructions, and image.',
            parameters: [
                { position: { key: 'i', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Margarita (11007)', i: '11007' },
                { _description: 'Get Old Fashioned (11001)', i: '11001' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { drinks: { type: 'array', items: { type: 'object', properties: { idDrink: { type: 'string' }, strDrink: { type: 'string' }, strCategory: { type: 'string' }, strAlcoholic: { type: 'string' }, strGlass: { type: 'string' }, strInstructions: { type: 'string' }, strDrinkThumb: { type: 'string' } } } } } }
            }
        },
        filterByIngredient: {
            method: 'GET',
            path: '/api/json/v1/1/filter.php',
            description: 'Filter cocktails by ingredient. Returns list of cocktails that contain the specified ingredient with name, thumbnail, and ID.',
            parameters: [
                { position: { key: 'i', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Filter by Gin', i: 'Gin' },
                { _description: 'Filter by Vodka', i: 'Vodka' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { drinks: { type: 'array', items: { type: 'object', properties: { strDrink: { type: 'string' }, strDrinkThumb: { type: 'string' }, idDrink: { type: 'string' } } } } } }
            }
        },
        listCategories: {
            method: 'GET',
            path: '/api/json/v1/1/list.php',
            description: 'List all cocktail categories. Returns available categories like Ordinary Drink, Cocktail, Beer, Coffee/Tea, etc.',
            parameters: [
                { position: { key: 'c', value: 'list', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'List all categories' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { drinks: { type: 'array', items: { type: 'object', properties: { strCategory: { type: 'string' } } } } } }
            }
        },
        getRandomCocktail: {
            method: 'GET',
            path: '/api/json/v1/1/random.php',
            description: 'Get a random cocktail recipe. Returns one random drink with full recipe details.',
            parameters: [],
            tests: [
                { _description: 'Get random cocktail' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { drinks: { type: 'array', items: { type: 'object', properties: { idDrink: { type: 'string' }, strDrink: { type: 'string' }, strCategory: { type: 'string' }, strGlass: { type: 'string' }, strInstructions: { type: 'string' }, strDrinkThumb: { type: 'string' } } } } } }
            }
        }
    }
}
