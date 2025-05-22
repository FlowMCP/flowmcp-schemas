class Print {
    static getTable( { preparedParams } ) {
        const { header, separator } = Print.#generateHeader()
        const { rows } = Print.#generateRows( { preparedParams } )
        const table = [ header, separator, ...rows ].join('\n')

        return { table }
    }


    static getCommand( { preparedParams } ) {
        const { env } = Print.#getEnv( { preparedParams } )
        const command = 'node'
        const args = [
            "./path/to/your/file.mjs",
            "--launched-by=claude",
            "--includeNamespaces=",
            "--excludeNamespaces=",
            "--activateTags="
        ]

        const commandStruct = {
            globalShortcut: "",
            mcpServers: {
                FlowMCP: { command, args, env }
            }
        }

        const commandStr = JSON.stringify( commandStruct, null, 4 )

        return { commandStr }
    }




    static #generateHeader() {
        const header = '| Namespace | Schema Name | Route Names Count | Route Names (shortened) | Required Server Params | Tags |';
        const separator = '|-----------|--------------|-------------------|--------------------------|-------------------------|------|';

        return { header, separator }
    }


    static #generateRows( { preparedParams } ) {
        const MAX_ROUTE_LENGTH = 30
        const rows = preparedParams
            .map( ( schema ) => {
                const { namespace, fileName, routeNames, requiredServerParams, tags } = schema

                const routeNamesStr = schema.routeNames.join(', ')
                const shortRoutes = routeNamesStr

                const n = [
                    namespace,
                    fileName,
                    routeNames.length,
                    shortRoutes,
                    schema.requiredServerParams.join(', '),
                    schema.tags.join(', ')
                ]
                    .join( ' | ' )

                const row = `| ${n} |`

// `| ${schema.namespace} | ${schema.name} | ${schema.routeNames.length} | ${shortRoutes} | ${schema.requiredServerParams.join(', ')} | ${schema.tags.join(', ')} |`;


/*
                const shortRoutes = routeNamesStr.length > MAX_ROUTE_LENGTH
                    ? routeNamesStr.slice(0, MAX_ROUTE_LENGTH) + '...'
                    : routeNamesStr;
*/

                return row
            } ) 

        return { rows }
    }


    static #getEnv( { preparedParams } ) {
        const env = Array
            .from( 
                preparedParams
                    .reduce( ( acc, { requiredServerParams } ) => {
                        acc.add( ...requiredServerParams)
                        return acc
                    }, new Set() )
            )
            .sort( ( a, b ) => a.localeCompare( b ) )
            .filter( ( a ) => a !== undefined )
            .reduce( ( acc, key ) => {
                acc[ key ] = ""
                return acc
            }, {})

        return { env }
    }
}


export { Print }