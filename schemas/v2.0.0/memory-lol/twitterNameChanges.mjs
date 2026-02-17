// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean
// Namespace: "memoryLol" -> "memorylol"

export const main = {
    namespace: 'memorylol',
    name: 'TwitterUsernameChanges',
    description: 'Retrieve the full history of Twitter/X username changes for any account via memory.lol — track handle renames and previous usernames.',
    version: '2.0.0',
    docs: ['https://github.com/travisbrown/memory.lol'],
    tags: ['social', 'twitter', 'history', 'cacheTtlDaily'],
    root: 'https://api.memory.lol',
    routes: {
        queryUsernameChanges: {
            method: 'GET',
            path: '/v1/tw/:screen_name',
            description: 'Fetch username change history for a Twitter user via memoryLol — query by screen name.',
            parameters: [
                { position: { key: 'screen_name', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^[A-Za-z0-9_]{1,15}$)'] } }
            ],
            tests: [
                { _description: 'Valid handle', screen_name: 'OSINT_Ukraine' },
                { _description: 'Non-existent handle', screen_name: 'no_user_123456' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        accounts: { type: 'array', items: { type: 'object', properties: { id: { type: 'number' }, id_str: { type: 'string' }, screen_names: { type: 'object' } } } }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    queryUsernameChanges: {
        postRequest: async ( { response, struct, payload } ) => {
            const { data } = struct
            if (!data.accounts?.length) {
            response = "No username change history found.";
            return { response }}
            response = data.accounts
            .map( acc =>
            `User ID ${acc.id_str}:\n` +
            Object
            .entries(acc.screen_names)
            .map(([name, dates]) => `- ${name} (${Array.isArray(dates) ? dates.join(" to ") : dates})` )
            .join("\n")
            )
            .join("\n\n");
            return { response }
        }
    }
} )
