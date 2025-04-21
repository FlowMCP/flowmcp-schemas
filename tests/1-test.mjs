import { FlowMCP } from 'flowmcp'



const { schema } = await import( '../schemas/cointelegraph.mjs/schema.mjs' )
const tests = FlowMCP.getAllTests( { schema } )
for( const test of tests ) {
    const { routeName, userParams } = test
    const result = await FlowMCP.fetch( { schema, userParams, serverParams: {}, routeName } )
    console.log( `Status ${result.status}` )
}


