export const main = {
    namespace: 'dndapi',
    name: 'D&D 5th Edition API',
    description: 'Access the D&D 5th Edition SRD API with complete game reference data. Look up classes, spells, monsters, races, equipment, and more from the System Reference Document. Covers all SRD content including 320+ spells, 300+ monsters, 12 classes, and 9 races. Free, no API key required.',
    version: '2.0.0',
    docs: ['https://5e-bits.github.io/docs/'],
    tags: ['entertainment', 'gaming', 'reference', 'opendata', 'cacheTtlStatic'],
    root: 'https://www.dnd5eapi.co',
    requiredServerParams: [],
    headers: {},
    routes: {
        listClasses: {
            method: 'GET',
            path: '/api/2014/classes',
            description: 'List all D&D character classes. Returns class names and API URLs for detailed information. Includes Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard.',
            parameters: [],
            tests: [
                { _description: 'List all classes' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { count: { type: 'number' }, results: { type: 'array', items: { type: 'object', properties: { index: { type: 'string' }, name: { type: 'string' }, url: { type: 'string' } } } } } }
            }
        },
        getSpell: {
            method: 'GET',
            path: '/api/2014/spells/:index',
            description: 'Get detailed spell information by index name. Returns spell level, school, casting time, range, components, duration, description, damage, and which classes can use it.',
            parameters: [
                { position: { key: 'index', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Fireball', index: 'fireball' },
                { _description: 'Get Magic Missile', index: 'magic-missile' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { index: { type: 'string' }, name: { type: 'string' }, level: { type: 'number' }, school: { type: 'object', properties: { name: { type: 'string' } } }, casting_time: { type: 'string' }, range: { type: 'string' }, components: { type: 'array' }, duration: { type: 'string' }, desc: { type: 'array', items: { type: 'string' } }, damage: { type: 'object' }, classes: { type: 'array' } } }
            }
        },
        getMonster: {
            method: 'GET',
            path: '/api/2014/monsters/:index',
            description: 'Get detailed monster stats by index name. Returns hit points, armor class, abilities, actions, legendary actions, challenge rating, and more.',
            parameters: [
                { position: { key: 'index', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Aboleth', index: 'aboleth' },
                { _description: 'Get Adult Red Dragon', index: 'adult-red-dragon' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { index: { type: 'string' }, name: { type: 'string' }, size: { type: 'string' }, type: { type: 'string' }, alignment: { type: 'string' }, armor_class: { type: 'array' }, hit_points: { type: 'number' }, hit_dice: { type: 'string' }, speed: { type: 'object' }, strength: { type: 'number' }, dexterity: { type: 'number' }, constitution: { type: 'number' }, intelligence: { type: 'number' }, wisdom: { type: 'number' }, charisma: { type: 'number' }, actions: { type: 'array' }, challenge_rating: { type: 'number' }, xp: { type: 'number' } } }
            }
        },
        searchSpells: {
            method: 'GET',
            path: '/api/2014/spells',
            description: 'Search and filter spells. Filter by name to find matching spells. Returns spell names and URLs for all matching spells.',
            parameters: [
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search fire spells', name: 'fire' },
                { _description: 'List all spells' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { count: { type: 'number' }, results: { type: 'array', items: { type: 'object', properties: { index: { type: 'string' }, name: { type: 'string' }, level: { type: 'number' }, url: { type: 'string' } } } } } }
            }
        },
        getClass: {
            method: 'GET',
            path: '/api/2014/classes/:index',
            description: 'Get detailed class information by index name. Returns hit die, proficiencies, saving throws, starting equipment, class features by level, and spellcasting info.',
            parameters: [
                { position: { key: 'index', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Wizard class', index: 'wizard' },
                { _description: 'Get Fighter class', index: 'fighter' }
            ],
            output: {
                mimeType: 'application/json',
                schema: { type: 'object', properties: { index: { type: 'string' }, name: { type: 'string' }, hit_die: { type: 'number' }, proficiency_choices: { type: 'array' }, proficiencies: { type: 'array' }, saving_throws: { type: 'array' }, starting_equipment: { type: 'array' }, class_levels: { type: 'string' }, spellcasting: { type: 'object' } } }
            }
        }
    }
}
