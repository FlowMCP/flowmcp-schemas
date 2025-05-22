import { spawn } from 'child_process'


const { localServerPath } = {
    'localServerPath': './tests/2-start-server-local.mjs',
}

const child = spawn(
  'node', [ localServerPath ], { 'stdio': ['pipe', 'pipe', 'inherit'] }
)

const requests = [
  { jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} },
  { jsonrpc: '2.0', id: 2, method: 'resources/list', params: {} },
  { jsonrpc: '2.0', id: 3, method: 'prompts/list', params: {} }
]

for( const req of requests ) { 
    child.stdin.write( JSON.stringify( req ) + "\n") 
}

let buffer = ""
child
    .stdout.on( 
        'data', 
        ( data ) => {
            buffer += data.toString()
            let lines = buffer.split("\n")

            buffer = lines.pop() || ""

            for( const line of lines ) {
                if( !line.trim() ) continue
                try {
                    const res = JSON.parse( line )
                    console.log( "📨 JSON-RPC-Antwort:", res )
                    const tool = res['result']?.tools[ 50 ]
                    console.log( "📦 Tool:", JSON.stringify( tool, null, 4  ) )
                } catch (err) {
                    console.error("❌ Ungültiges JSON:", line)
                }
            }
    } )
