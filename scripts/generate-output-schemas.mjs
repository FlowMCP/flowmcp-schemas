// generate-output-schemas.mjs
// Bulk output schema generator for v2.0.0 schemas
// Analyzes handler code via TEXT ANALYSIS (not dynamic import)
// and inserts output fields into route definitions.
//
// Usage:
//   node scripts/generate-output-schemas.mjs --dry-run              (default: preview)
//   node scripts/generate-output-schemas.mjs --apply                (write to files)
//   node scripts/generate-output-schemas.mjs --dry-run --namespace=chainlist
//   node scripts/generate-output-schemas.mjs --dry-run --verbose

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, basename } from 'node:path'
import { fileURLToPath } from 'node:url'


const __filename = fileURLToPath( import.meta.url )
const SCHEMAS_DIR = join( __filename, '..', '..', 'schemas', 'v2.0.0' )
const SKIP_DIRS = [ '_lists', '_shared' ]

const NUMBER_HINTS = [
    'Id', 'id', 'Count', 'count', 'Index', 'index', 'Number', 'num',
    'chainId', 'page', 'offset', 'limit', 'total', 'length', 'height',
    'amount', 'price', 'volume', 'balance', 'supply', 'decimals',
    'marketCap', 'tvl', 'apy', 'apr', 'rank', 'score', 'size',
    'timestamp', 'blockNumber', 'nonce', 'gasPrice', 'gasLimit',
    'gasUsed', 'weight', 'fee', 'reward', 'penalty', 'age',
    'depth', 'width', 'duration', 'interval', 'period',
    'timeInMs', 'totalTested', 'workingEndpoints', 'totalEndpoints',
    'totalResults'
]

const BOOLEAN_HINTS = [
    'is', 'has', 'verified', 'active', 'enabled', 'Complete',
    'complete', 'ensNative', 'supported', 'isOpenSource',
    'speedTestPerformed', 'success', 'valid', 'locked', 'paused',
    'deprecated'
]

const ARRAY_HINTS = [
    'endpoints', 'results', 'items', 'entries', 'records', 'rows',
    'chains', 'tokens', 'pools', 'pairs', 'markets', 'exchanges',
    'explorers', 'notes', 'messages', 'errors', 'warnings',
    'rpcEndpoints', 'websocketEndpoints', 'fastestEndpoints',
    'evmViaInfura', 'ensNative'
]


class OutputSchemaGenerator {


    static run() {
        const args = process.argv.slice( 2 )
        const apply = args.includes( '--apply' )
        const verbose = args.includes( '--verbose' )
        const namespaceArg = args.find( ( a ) => a.startsWith( '--namespace=' ) )
        const filterNamespace = namespaceArg ? namespaceArg.split( '=' )[ 1 ] : null

        const { files } = this.#collectFiles( { filterNamespace } )

        const stats = { total: 0, modified: 0, skipped: 0, routes: 0, routesWithOutput: 0 }

        files.forEach( ( filePath ) => {
            stats.total++
            const { content } = this.#readFile( { filePath } )
            const { hasOutput } = this.#checkExistingOutput( { content } )

            if( hasOutput ) {
                stats.skipped++
                if( verbose ) {
                    console.log( `  SKIP  ${relative( SCHEMAS_DIR, filePath )} (already has output)` )
                }
                return
            }

            const { routeNames, handlers, handlerType } = this.#parseFile( { content, filePath, verbose } )
            const { updatedContent, routeCount, outputCount } = this.#insertOutputSchemas( {
                content, routeNames, handlers, handlerType, filePath, verbose
            } )

            stats.routes += routeCount
            stats.routesWithOutput += outputCount

            if( updatedContent !== content ) {
                stats.modified++
                if( apply ) {
                    writeFileSync( filePath, updatedContent, 'utf-8' )
                    console.log( `  WRITE ${relative( SCHEMAS_DIR, filePath )} (${outputCount} routes)` )
                } else {
                    console.log( `  WOULD ${relative( SCHEMAS_DIR, filePath )} (${outputCount} routes)` )
                }
            } else {
                if( verbose ) {
                    console.log( `  NOOP  ${relative( SCHEMAS_DIR, filePath )} (no changes needed)` )
                }
            }
        } )

        console.log( '' )
        console.log( `--- Summary ---` )
        console.log( `Files scanned:  ${stats.total}` )
        console.log( `Files modified: ${stats.modified}` )
        console.log( `Files skipped:  ${stats.skipped}` )
        console.log( `Routes found:   ${stats.routes}` )
        console.log( `Outputs added:  ${stats.routesWithOutput}` )
        console.log( `Mode:           ${apply ? 'APPLY (files written)' : 'DRY-RUN (no files changed)'}` )
    }


    static #collectFiles( { filterNamespace } ) {
        const files = []
        const namespaceDirs = readdirSync( SCHEMAS_DIR )

        namespaceDirs
            .filter( ( dir ) => !SKIP_DIRS.includes( dir ) )
            .filter( ( dir ) => {
                const fullPath = join( SCHEMAS_DIR, dir )
                return statSync( fullPath ).isDirectory()
            } )
            .filter( ( dir ) => {
                if( !filterNamespace ) { return true }
                return dir === filterNamespace
            } )
            .forEach( ( dir ) => {
                const dirPath = join( SCHEMAS_DIR, dir )
                const entries = readdirSync( dirPath )

                entries
                    .filter( ( f ) => f.endsWith( '.mjs' ) )
                    .forEach( ( f ) => {
                        files.push( join( dirPath, f ) )
                    } )
            } )

        return { files }
    }


    static #readFile( { filePath } ) {
        const content = readFileSync( filePath, 'utf-8' )

        return { content }
    }


    static #checkExistingOutput( { content } ) {
        const hasOutput = /output:\s*\{/.test( content )

        return { hasOutput }
    }


    static #parseFile( { content, filePath, verbose } ) {
        const routeNames = this.#extractRouteNames( { content } )
        const { handlers, handlerType } = this.#extractHandlers( { content, routeNames } )

        if( verbose ) {
            console.log( `  PARSE ${relative( SCHEMAS_DIR, filePath )}` )
            console.log( `        Routes: ${routeNames.join( ', ' )}` )
            routeNames.forEach( ( routeName ) => {
                const handler = handlers[ routeName ]
                if( handler ) {
                    console.log( `        ${routeName}: ${handler.type} -> keys: [${handler.keys.join( ', ' )}]` )
                } else {
                    console.log( `        ${routeName}: no handler` )
                }
            } )
        }

        return { routeNames, handlers, handlerType }
    }


    static #extractRouteNames( { content } ) {
        const routeNames = []
        const routesBlockMatch = content.match( /routes:\s*\{([\s\S]*?)\n    \}/ )

        if( !routesBlockMatch ) {
            return routeNames
        }

        const routesBlock = routesBlockMatch[ 1 ]
        const routePattern = /^\s{8}(\w+):\s*\{/gm
        let match

        while( ( match = routePattern.exec( routesBlock ) ) !== null ) {
            routeNames.push( match[ 1 ] )
        }

        return routeNames
    }


    static #extractHandlers( { content, routeNames } ) {
        const handlers = {}
        let handlerType = 'none'

        const hasHandlersExport = /export const handlers/.test( content )

        if( !hasHandlersExport ) {
            return { handlers, handlerType }
        }

        const handlersStart = content.indexOf( 'export const handlers' )
        const handlersBlock = content.slice( handlersStart )

        routeNames.forEach( ( routeName ) => {
            const { handler } = this.#extractSingleHandler( { handlersBlock, routeName } )

            if( handler ) {
                handlers[ routeName ] = handler
                if( handler.type === 'executeRequest' ) {
                    handlerType = 'executeRequest'
                } else if( handler.type === 'postRequest' && handlerType !== 'executeRequest' ) {
                    handlerType = 'postRequest'
                }
            }
        } )

        return { handlers, handlerType }
    }


    static #extractSingleHandler( { handlersBlock, routeName } ) {
        const nameIndex = handlersBlock.indexOf( `${routeName}:` )

        if( nameIndex === -1 ) {
            return { handler: null }
        }

        const openBraceIndex = handlersBlock.indexOf( '{', nameIndex + routeName.length )

        if( openBraceIndex === -1 ) {
            return { handler: null }
        }

        const { closingIndex } = this.#findMatchingBrace( {
            content: handlersBlock,
            openIndex: openBraceIndex
        } )

        if( closingIndex === -1 ) {
            return { handler: null }
        }

        const handlerText = handlersBlock.slice( nameIndex, closingIndex + 1 )

        if( handlerText.includes( 'executeRequest' ) ) {
            const { keys } = this.#extractExecuteRequestKeys( { handlerText } )

            return { handler: { type: 'executeRequest', keys, raw: handlerText } }
        }

        if( handlerText.includes( 'postRequest' ) ) {
            const { keys } = this.#extractPostRequestKeys( { handlerText } )

            return { handler: { type: 'postRequest', keys, raw: handlerText } }
        }

        return { handler: null }
    }


    static #extractExecuteRequestKeys( { handlerText } ) {
        const allKeys = []
        const structDataPatterns = [
            /struct\.data\s*=\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/g,
            /struct\['data'\]\s*=\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/g
        ]

        structDataPatterns.forEach( ( pattern ) => {
            let match

            while( ( match = pattern.exec( handlerText ) ) !== null ) {
                const objectBody = match[ 1 ]
                const { keys } = this.#extractObjectKeys( { objectBody } )
                keys.forEach( ( key ) => {
                    if( !allKeys.includes( key ) ) {
                        allKeys.push( key )
                    }
                } )
            }
        } )

        return { keys: allKeys }
    }


    static #extractPostRequestKeys( { handlerText } ) {
        const returnPattern = /return\s*\{\s*response:\s*\{([^}]+)\}\s*\}/
        const returnMatch = handlerText.match( returnPattern )

        if( returnMatch ) {
            const { keys } = this.#extractObjectKeys( { objectBody: returnMatch[ 1 ] } )

            return { keys }
        }

        const rebuildPattern = /response\s*=\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}\s*\n\s*return\s*\{\s*response\s*\}/
        const rebuildMatch = handlerText.match( rebuildPattern )

        if( rebuildMatch ) {
            const { keys } = this.#extractObjectKeys( { objectBody: rebuildMatch[ 1 ] } )

            return { keys }
        }

        return { keys: [] }
    }


    static #extractObjectKeys( { objectBody } ) {
        const keys = []
        const parts = objectBody.split( ',' )

        parts.forEach( ( part ) => {
            const trimmed = part.trim()

            if( !trimmed || trimmed.startsWith( '//' ) ) { return }

            const colonMatch = trimmed.match( /['"]?(\w+)['"]?\s*:/ )

            if( colonMatch ) {
                keys.push( colonMatch[ 1 ] )
                return
            }

            const shorthandMatch = trimmed.match( /^(\w+)\s*$/ )

            if( shorthandMatch && !trimmed.includes( '(' ) && !trimmed.includes( '=' ) ) {
                keys.push( shorthandMatch[ 1 ] )
            }
        } )

        return { keys }
    }


    static #inferType( { key } ) {
        if( BOOLEAN_HINTS.some( ( hint ) => {
            if( hint === key ) { return true }
            if( key.startsWith( hint ) && key[ hint.length ] === key[ hint.length ]?.toUpperCase() ) { return true }
            return false
        } ) ) {
            return 'boolean'
        }

        if( ARRAY_HINTS.some( ( hint ) => key === hint ) ) {
            return 'array'
        }

        if( key.endsWith( 's' ) && !key.endsWith( 'ss' ) && !key.endsWith( 'us' ) && !key.endsWith( 'ress' ) ) {
            const singularCheck = ARRAY_HINTS.some( ( hint ) => key === hint )
            if( singularCheck ) {
                return 'array'
            }
        }

        if( NUMBER_HINTS.some( ( hint ) => {
            if( hint === key ) { return true }
            if( key.endsWith( hint ) ) { return true }
            return false
        } ) ) {
            return 'number'
        }

        return 'string'
    }


    static #buildOutputBlock( { keys, indent } ) {
        const pad = ' '.repeat( indent )
        const pad1 = ' '.repeat( indent + 4 )
        const pad2 = ' '.repeat( indent + 8 )
        const pad3 = ' '.repeat( indent + 12 )

        if( keys.length === 0 ) {
            const lines = [
                `${pad}output: {`,
                `${pad1}mimeType: 'application/json',`,
                `${pad1}schema: {`,
                `${pad2}type: 'object',`,
                `${pad2}properties: {}`,
                `${pad1}}`,
                `${pad}}`
            ]

            return { outputText: lines.join( '\n' ) }
        }

        const propLines = keys.map( ( key ) => {
            const { type } = { type: this.#inferType( { key } ) }

            return `${pad3}${key}: { type: '${type}', description: '' }`
        } )

        const lines = [
            `${pad}output: {`,
            `${pad1}mimeType: 'application/json',`,
            `${pad1}schema: {`,
            `${pad2}type: 'object',`,
            `${pad2}properties: {`,
            propLines.join( ',\n' ),
            `${pad2}}`,
            `${pad1}}`,
            `${pad}}`
        ]

        return { outputText: lines.join( '\n' ) }
    }


    static #insertOutputSchemas( { content, routeNames, handlers, handlerType, filePath, verbose } ) {
        let updatedContent = content
        let routeCount = routeNames.length
        let outputCount = 0

        const reversedRoutes = [ ...routeNames ].reverse()

        reversedRoutes.forEach( ( routeName ) => {
            const handler = handlers[ routeName ] || null
            const keys = handler ? handler.keys : []

            const { outputText } = this.#buildOutputBlock( { keys, indent: 12 } )

            const { result, inserted } = this.#insertOutputIntoRoute( {
                content: updatedContent,
                routeName,
                outputText,
                verbose
            } )

            if( inserted ) {
                updatedContent = result
                outputCount++
            }
        } )

        return { updatedContent, routeCount, outputCount }
    }


    static #insertOutputIntoRoute( { content, routeName, outputText, verbose } ) {
        const routeStartPattern = new RegExp(
            `(\\n)(\\s{8}${routeName}:\\s*\\{)`
        )
        const routeStartMatch = content.match( routeStartPattern )

        if( !routeStartMatch ) {
            if( verbose ) {
                console.log( `        WARNING: Could not find route block for '${routeName}'` )
            }

            return { result: content, inserted: false }
        }

        const matchPos = content.indexOf( routeStartMatch[ 0 ] )

        if( matchPos === -1 ) {
            return { result: content, inserted: false }
        }

        const openBracePos = content.indexOf( '{', matchPos + routeStartMatch[ 1 ].length )
        const { closingIndex } = this.#findMatchingBrace( { content, openIndex: openBracePos } )

        if( closingIndex === -1 ) {
            if( verbose ) {
                console.log( `        WARNING: Could not find closing brace for '${routeName}'` )
            }

            return { result: content, inserted: false }
        }

        const lastNonWsIndex = this.#findLastNonWhitespace( { content, before: closingIndex } )

        if( lastNonWsIndex === -1 ) {
            return { result: content, inserted: false }
        }

        let before = content.slice( 0, lastNonWsIndex + 1 )

        if( content[ lastNonWsIndex ] !== ',' ) {
            before = before + ','
        }

        const result = before + '\n' + outputText + '\n' + ' '.repeat( 8 ) + content.slice( closingIndex )

        return { result, inserted: true }
    }


    static #findMatchingBrace( { content, openIndex } ) {
        let depth = 0
        let i = openIndex
        let inString = false
        let stringChar = null

        while( i < content.length ) {
            const char = content[ i ]
            const prev = i > 0 ? content[ i - 1 ] : ''

            if( inString ) {
                if( char === stringChar && prev !== '\\' ) {
                    inString = false
                }
                i++
                continue
            }

            if( char === "'" || char === '"' || char === '`' ) {
                inString = true
                stringChar = char
                i++
                continue
            }

            if( char === '{' ) { depth++ }
            if( char === '}' ) { depth-- }

            if( depth === 0 ) {
                return { closingIndex: i }
            }

            i++
        }

        return { closingIndex: -1 }
    }


    static #findLastNonWhitespace( { content, before } ) {
        let i = before - 1

        while( i >= 0 ) {
            const char = content[ i ]

            if( char !== ' ' && char !== '\t' && char !== '\n' && char !== '\r' ) {
                return i
            }

            i--
        }

        return -1
    }
}


OutputSchemaGenerator.run()
