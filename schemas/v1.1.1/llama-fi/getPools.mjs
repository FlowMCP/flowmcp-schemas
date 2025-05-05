export const schema = {
    name: "DeFiYieldsServer",
    description: "Fetch and analyze DeFi yield pools from yields.llama.fi",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://yields.llama.fi",
    requiredServerParams: [],
    headers: {},
    routes: {
      getProjectsByName: {
        requestMethod: "GET",
        description: "Fetch DeFi yield pools overview, optionally filtering by blockchain or project name",
        route: "/pools",
        parameters: [],
        tests: [ { _description: "Fetch all pools overview" } ],
        modifiers: [ { phase: "post", handlerName: "getProjectsByName" } ]
      },
      getPools: {
        requestMethod: "GET",
        description: "Fetch DeFi yield pools, optionally filtering by blockchain or project name",
        route: "/pools",
        parameters: [
          { position: { key: "chain", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
          { position: { key: "project", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
        ],
        tests: [
          { _description: "Fetch all pools" },
          { _description: "Fetch pools filtered by chain", chain: "Ethereum" },
          { _description: "Fetch pools filtered by project", project: "aave-v3" },
          { _description: "Fetch pools filtered by chain and project", chain: "Ethereum", project: "lido" }
        ],
        modifiers: [ { phase: "post", handlerName: "getPools" } ]
      }
    },
    handlers: {
        getProjectsByName: async ( { struct, payload } ) => {
            const { data } = struct
            if( data?.status !== 'success' ) {
                struct['status'] = false
                struct['messages'].push( data?.error || 'Unknown error' )
                return { struct, payload }
            }

            const d = data?.data || []
            const projects = d
                .reduce( ( acc, { chain, project } ) => {
                    if( !Object.hasOwn( acc, chain ) ) {
                        acc[ project ] = []
                    }
                    acc[ project ].push( chain )
                    return acc
                }, {} )

            struct['data'] = Object
                .entries( projects )
                .sort( ( [ a ], [ b ] ) => {
                    if( a < b ) return -1
                    if( a > b ) return 1
                    return 0
                } )
                .reduce( ( acc, [ key, value ] ) => {
                    acc[ key ] = value
                    return acc
                }, {} )

            return { struct, payload }
        },
        getPools: async ({ struct, payload, userParams }) => {
            const { data } = struct
            if( data?.status !== 'success' ) {
                struct['status'] = false
                struct['messages'].push( data?.error || 'Unknown error' )
                return { struct, payload }
            }

            struct['data'] = data?.data || []
            struct['data'] = [
                [ 'chain', userParams['chain'] ],
                [ 'project', userParams['project'] ],
            ]
                .reduce( ( acc, [ key, user] ) => {
                    if( !user ) return acc
                    if( key === 'chain' ) {
                        acc = acc.filter( ( { chain } ) => chain === user )
                    } else if( key === 'project' ) {
                        acc = acc.filter( ( { project } ) => project === user )
                    }

                    return acc
                }, struct['data'] )

            struct['data'] = {
                'totalResults': struct['data'].length,
                'results': struct['data']
            }

            return { struct, payload };
        }
    }
  };
  