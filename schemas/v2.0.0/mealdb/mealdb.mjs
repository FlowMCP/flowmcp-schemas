export const main = {
    namespace: 'mealdb',
    name: 'TheMealDB',
    description: 'Access TheMealDB, an open crowd-sourced database of recipes from around the world. Search meals by name, browse by category or cuisine, get detailed recipes with ingredients and instructions. Covers 300+ meals with images, video tutorials, and step-by-step guides. Free tier uses API key "1" for testing.',
    version: '2.0.0',
    docs: ['https://www.themealdb.com/api.php'],
    tags: ['food', 'recipes', 'cooking', 'opendata', 'cacheTtlDaily'],
    root: 'https://www.themealdb.com',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchMeals: {
            method: 'GET',
            path: '/api/json/v1/1/search.php',
            description: 'Search meals by name. Returns detailed meal information including ingredients, measurements, instructions, category, cuisine, and image.',
            parameters: [
                { position: { key: 's', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search Arrabiata', s: 'Arrabiata' },
                { _description: 'Search Chicken', s: 'chicken' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { meals: { type: 'array', items: { type: 'object', properties: { idMeal: { type: 'string' }, strMeal: { type: 'string' }, strCategory: { type: 'string' }, strArea: { type: 'string' }, strInstructions: { type: 'string' }, strMealThumb: { type: 'string' }, strYoutube: { type: 'string' }, strIngredient1: { type: 'string' }, strMeasure1: { type: 'string' } } } } } }
            }
        },
        getMeal: {
            method: 'GET',
            path: '/api/json/v1/1/lookup.php',
            description: 'Get detailed meal recipe by ID. Returns full recipe with all ingredients, measurements, instructions, and video link.',
            parameters: [
                { position: { key: 'i', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Arrabiata (52771)', i: '52771' },
                { _description: 'Get Pad Thai (52773)', i: '52773' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { meals: { type: 'array', items: { type: 'object', properties: { idMeal: { type: 'string' }, strMeal: { type: 'string' }, strCategory: { type: 'string' }, strArea: { type: 'string' }, strInstructions: { type: 'string' }, strMealThumb: { type: 'string' }, strYoutube: { type: 'string' } } } } } }
            }
        },
        listCategories: {
            method: 'GET',
            path: '/api/json/v1/1/categories.php',
            description: 'List all meal categories with descriptions. Returns categories like Beef, Chicken, Dessert, Pasta, Seafood, etc. with thumbnail images and descriptions.',
            parameters: [],
            tests: [
                { _description: 'List all categories' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { categories: { type: 'array', items: { type: 'object', properties: { idCategory: { type: 'string' }, strCategory: { type: 'string' }, strCategoryThumb: { type: 'string' }, strCategoryDescription: { type: 'string' } } } } } }
            }
        },
        filterByArea: {
            method: 'GET',
            path: '/api/json/v1/1/filter.php',
            description: 'Filter meals by cuisine/area. Returns meals from a specific country or region (e.g., Italian, Japanese, Mexican, British, American).',
            parameters: [
                { position: { key: 'a', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Italian meals', a: 'Italian' },
                { _description: 'Japanese meals', a: 'Japanese' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { meals: { type: 'array', items: { type: 'object', properties: { strMeal: { type: 'string' }, strMealThumb: { type: 'string' }, idMeal: { type: 'string' } } } } } }
            }
        },
        getRandomMeal: {
            method: 'GET',
            path: '/api/json/v1/1/random.php',
            description: 'Get a random meal recipe. Returns one random meal with full recipe details including ingredients and instructions.',
            parameters: [],
            tests: [
                { _description: 'Get random meal' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { meals: { type: 'array', items: { type: 'object', properties: { idMeal: { type: 'string' }, strMeal: { type: 'string' }, strCategory: { type: 'string' }, strArea: { type: 'string' }, strInstructions: { type: 'string' }, strMealThumb: { type: 'string' } } } } } }
            }
        }
    }
}
