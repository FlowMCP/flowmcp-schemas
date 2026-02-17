import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )


class HandlerTransfer {
    static async run() {
        const args = HandlerTransfer.#parseArgs()
        const { migrate, verbose, file } = args

        console.log( '\n' + '='.repeat( 60 ) )
        console.log( '  FlowMCP Handler Transfer  v1.2.0 -> v2.0.0' )
        console.log( '='.repeat( 60 ) )

        const v2Dir = path.resolve( __dirname, '../schemas/v2.0.0' )
        const v1Dir = path.resolve( __dirname, '../schemas/v1.2.0' )

        const v2Files = file
            ? [ path.resolve( v2Dir, file ) ]
            : HandlerTransfer.#findStubFiles( { v2Dir } )

        console.log( `\n  V2 Dir:   schemas/v2.0.0/` )
        console.log( `  V1 Dir:   schemas/v1.2.0/` )
        console.log( `  Files:    ${v2Files.length}` )
        console.log( `  Mode:     ${migrate ? 'TRANSFER' : 'DRY RUN'}` )
        console.log( '' )

        const results = { total: 0, transferred: 0, errors: 0, skipped: 0, written: 0 }
        const reports = []

        const fileResults = []
        for( const v2FilePath of v2Files ) {
            const report = await HandlerTransfer.#processFile( {
                v2FilePath, v2Dir, v1Dir, migrate, verbose
            } )
            fileResults.push( report )
        }

        fileResults
            .forEach( ( report ) => {
                reports.push( report )
                results.total++
                if( report.error ) { results.errors++ }
                else if( report.skipped ) { results.skipped++ }
                else {
                    results.transferred++
                    if( report.written ) { results.written++ }
                }
            } )

        HandlerTransfer.#printSummary( { results, reports, verbose } )
    }


    static #parseArgs() {
        const args = { migrate: false, verbose: false, file: null }

        process.argv.slice( 2 )
            .forEach( ( arg ) => {
                if( arg === '--migrate' ) { args.migrate = true }
                else if( arg === '--verbose' ) { args.verbose = true }
                else if( arg.startsWith( '--file=' ) ) {
                    args.file = arg.split( '=' ).slice( 1 ).join( '=' )
                } else if( arg === '--help' ) {
                    console.log( [
                        'Usage: node scripts/transfer-handlers.mjs [options]',
                        '',
                        '  --migrate   Write changes (default: dry run)',
                        '  --verbose   Detailed output',
                        '  --file=X    Single file (relative to schemas/v2.0.0/)',
                        '  --help      Show this help',
                    ].join( '\n' ) )
                    process.exit( 0 )
                }
            } )

        return args
    }


    static #findStubFiles( { v2Dir } ) {
        const files = []

        const walk = ( dirPath ) => {
            const entries = fs.readdirSync( dirPath, { withFileTypes: true } )
            entries
                .forEach( ( entry ) => {
                    const fullPath = path.join( dirPath, entry.name )
                    if( entry.isDirectory() && !entry.name.startsWith( '_' ) ) {
                        walk( fullPath )
                    } else if( entry.isFile() && entry.name.endsWith( '.mjs' ) ) {
                        const content = fs.readFileSync( fullPath, 'utf8' )
                        if( content.includes( '// TODO: Migrated from v1' ) ) {
                            files.push( fullPath )
                        }
                    }
                } )
        }

        walk( v2Dir )
        files.sort()

        return files
    }


    static async #processFile( { v2FilePath, v2Dir, v1Dir, migrate, verbose } ) {
        const relPath = path.relative( v2Dir, v2FilePath )
        const report = { file: relPath, error: null, skipped: false, written: false, handlers: 0, warnings: [] }

        try {
            const v2Content = fs.readFileSync( v2FilePath, 'utf8' )
            const category = v2Content.includes( 'Category: handlers-imports' )
                ? 'handlers-imports'
                : 'handlers-clean'

            const stubs = HandlerTransfer.#parseStubs( { v2Content } )
            if( stubs.length === 0 ) {
                report.skipped = true
                return report
            }

            const v1Path = HandlerTransfer.#findV1Source( { relPath, v1Dir } )
            if( !v1Path ) {
                report.error = `V1 source not found`
                return report
            }

            const v1Module = await import( v1Path )
            const v1Schema = v1Module.schema || v1Module.default
            if( !v1Schema || !v1Schema.handlers ) {
                report.error = `No handlers in v1 schema`
                return report
            }

            const v1SourceText = fs.readFileSync( v1Path, 'utf8' )
            const { moduleLevelCode, npmImports, sharedImports } =
                HandlerTransfer.#extractModuleCode( { sourceText: v1SourceText } )

            const transformedHandlers = []

            stubs
                .forEach( ( stub ) => {
                    const v1Fn = v1Schema.handlers[ stub.v1HandlerName ]
                    if( !v1Fn || typeof v1Fn !== 'function' ) {
                        report.warnings.push( `Handler "${stub.v1HandlerName}" not found in v1` )
                        transformedHandlers.push( { ...stub, body: null } )
                        return
                    }

                    const fnStr = v1Fn.toString()
                    const { params, body } = HandlerTransfer.#extractFunctionParts( { fnStr } )
                    const { transformedBody, warnings } = HandlerTransfer.#transformBody( {
                        body, params, v2Phase: stub.v2Phase, routeName: stub.routeName
                    } )

                    report.warnings.push( ...warnings )
                    transformedHandlers.push( { ...stub, body: transformedBody } )
                    report.handlers++
                } )

            const handlersBlock = HandlerTransfer.#buildHandlersBlock( {
                transformedHandlers, category, moduleLevelCode, npmImports, sharedImports
            } )

            const newV2Content = HandlerTransfer.#replaceHandlers( { v2Content, handlersBlock } )

            if( migrate ) {
                fs.writeFileSync( v2FilePath, newV2Content, 'utf8' )
                report.written = true
            }

            if( verbose ) {
                const icon = category === 'handlers-imports' ? 'HI' : 'HC'
                console.log( `  ${icon}  ${relPath} (${report.handlers} handlers)` )
                report.warnings
                    .forEach( ( w ) => { console.log( `        ${w}` ) } )
            }
        } catch( err ) {
            report.error = err.message
            if( verbose ) {
                console.log( `  ERR ${relPath}: ${err.message}` )
            }
        }

        return report
    }


    static #findV1Source( { relPath, v1Dir } ) {
        const direct = path.join( v1Dir, relPath )
        if( fs.existsSync( direct ) ) { return direct }

        const partMatch = relPath.match( /^(.+)-part\d+\.mjs$/ )
        if( partMatch ) {
            const basePath = path.join( v1Dir, partMatch[ 1 ] + '.mjs' )
            if( fs.existsSync( basePath ) ) { return basePath }
        }

        return null
    }


    static #parseStubs( { v2Content } ) {
        const stubs = []
        const lines = v2Content.split( '\n' )

        let inHandlers = false
        let currentRoute = null
        let currentPhase = null

        lines
            .forEach( ( line ) => {
                const trimmed = line.trim()

                if( trimmed.startsWith( 'export const handlers' ) ) {
                    inHandlers = true
                }
                if( !inHandlers ) { return }

                const phaseMatch = trimmed.match( /^(preRequest|executeRequest|postRequest)\s*:/ )
                if( phaseMatch ) {
                    currentPhase = phaseMatch[ 1 ]
                    return
                }

                const routeMatch = trimmed.match( /^('([^']+)'|"([^"]+)"|([a-zA-Z_$][a-zA-Z0-9_$]*))\s*:\s*\{\s*$/ )
                if( routeMatch ) {
                    const name = routeMatch[ 2 ] || routeMatch[ 3 ] || routeMatch[ 4 ]
                    const reserved = [ 'preRequest', 'executeRequest', 'postRequest', 'return' ]
                    if( !reserved.includes( name ) ) {
                        currentRoute = name
                    }
                }

                const todoMatch = trimmed.match( /\/\/ TODO: Migrated from v1 "([^"]+)" \(phase: (\w+)\)/ )
                if( todoMatch && currentRoute && currentPhase ) {
                    stubs.push( {
                        routeName: currentRoute,
                        v2Phase: currentPhase,
                        v1HandlerName: todoMatch[ 1 ],
                        v1Phase: todoMatch[ 2 ]
                    } )
                }
            } )

        return stubs
    }


    static #extractFunctionParts( { fnStr } ) {
        const paramMatch = fnStr.match( /\(\s*\{([^}]*)\}\s*\)/ )
        const params = paramMatch
            ? paramMatch[ 1 ].split( ',' ).map( ( p ) => p.trim() ).filter( Boolean )
            : []

        const arrowIndex = fnStr.indexOf( '=>' )
        const funcIndex = fnStr.indexOf( '{', arrowIndex > -1 ? arrowIndex : 0 )
        if( funcIndex === -1 ) { return { params, body: '' } }

        let depth = 0
        let end = fnStr.length

        Array.from( fnStr )
            .forEach( ( ch, i ) => {
                if( i < funcIndex ) { return }
                if( ch === '{' ) { depth++ }
                if( ch === '}' ) {
                    depth--
                    if( depth === 0 && end === fnStr.length ) { end = i }
                }
            } )

        const body = fnStr.substring( funcIndex + 1, end )

        return { params, body }
    }


    static #extractModuleCode( { sourceText } ) {
        const lines = sourceText.split( '\n' )
        const npmImports = []
        const sharedImports = []
        const moduleLines = []

        let inSchemaBlock = false
        let braceDepth = 0
        let inBlockComment = false

        const REPLACEABLE = [ 'axios', 'moment' ]
        const BUILTINS = [ 'zlib', 'crypto', 'buffer', 'path', 'url', 'util', 'stream', 'querystring' ]

        lines
            .forEach( ( line, index ) => {
                const trimmed = line.trim()

                if( trimmed.includes( '/*' ) && !trimmed.includes( '*/' ) ) {
                    inBlockComment = true
                    return
                }
                if( inBlockComment ) {
                    if( trimmed.includes( '*/' ) ) { inBlockComment = false }
                    return
                }
                if( trimmed.startsWith( '//' ) || trimmed === '' ) { return }

                if( trimmed.match( /^(export\s+)?(const\s+)?schema\s*=/ ) ) {
                    inSchemaBlock = true
                }

                if( inSchemaBlock ) {
                    const opens = ( line.match( /[{[]/g ) || [] ).length
                    const closes = ( line.match( /[}\]]/g ) || [] ).length
                    braceDepth += opens - closes
                    if( braceDepth <= 0 && index > 0 ) { inSchemaBlock = false }
                    return
                }

                if( trimmed.startsWith( 'import ' ) ) {
                    const fromMatch = trimmed.match( /from\s+['"]([^'"]+)['"]/ )
                    if( fromMatch ) {
                        const source = fromMatch[ 1 ]
                        if( source.startsWith( '.' ) || source.startsWith( '/' ) ) {
                            sharedImports.push( { line: trimmed, source } )
                        } else {
                            const pkg = source.startsWith( '@' )
                                ? source.split( '/' ).slice( 0, 2 ).join( '/' )
                                : source.split( '/' )[ 0 ]
                            if( !REPLACEABLE.includes( pkg ) && !BUILTINS.includes( pkg ) ) {
                                npmImports.push( { line: trimmed, source, pkg } )
                            }
                        }
                    }
                    return
                }

                if( trimmed.startsWith( 'export' ) ) { return }

                moduleLines.push( line )
            } )

        return {
            moduleLevelCode: moduleLines.join( '\n' ).trim(),
            npmImports,
            sharedImports
        }
    }


    static #transformBody( { body, params, v2Phase, routeName } ) {
        let transformed = HandlerTransfer.#normalizeIndent( { text: body } )
        const warnings = []

        transformed = transformed.replace( /\s*console\.log\([^)]*\)\s*;?/g, '' )

        const hasUserParams = params.includes( 'userParams' )
        const hasRouteName = params.includes( 'routeName' )

        if( v2Phase === 'preRequest' ) {
            transformed = transformed.replace( /\bpayload\b/g, '__V1_PAYLOAD__' )
            transformed = transformed.replace( /\buserParams\b/g, '__V1_USERPARAMS__' )
            transformed = transformed.replace( /\bstruct\b/g, '__V1_STRUCT__' )

            transformed = transformed.replace( /__V1_PAYLOAD__/g, 'struct' )
            transformed = transformed.replace( /__V1_USERPARAMS__/g, 'payload' )

            transformed = transformed.replace(
                /return\s*\{\s*__V1_STRUCT__\s*,\s*struct\s*\}\s*;?/g, 'return { struct }'
            )
            transformed = transformed.replace(
                /return\s*\{\s*struct\s*,\s*__V1_STRUCT__\s*\}\s*;?/g, 'return { struct }'
            )
            transformed = transformed.replace(
                /return\s*\{\s*__V1_STRUCT__\s*\}\s*;?/g, 'return { struct }'
            )

            if( transformed.includes( '__V1_STRUCT__' ) ) {
                warnings.push( `PRE: v1 struct used in body for "${routeName}" - review needed` )
                transformed = transformed.replace( /__V1_STRUCT__/g, '/* REVIEW: v1_struct */' )
            }
        } else if( v2Phase === 'executeRequest' ) {
            if( hasUserParams ) {
                transformed = 'const { userParams } = payload\n' + transformed
            }

            transformed = transformed.replace(
                /return\s*\{\s*struct\s*,\s*payload\s*\}\s*;?/g, 'return { struct }'
            )
        } else if( v2Phase === 'postRequest' ) {
            transformed = transformed.replace( /struct\['data'\]/g, 'response' )
            transformed = transformed.replace( /struct\.data\b/g, 'response' )

            const hasStatusRef = transformed.match( /struct\.status|struct\['status'\]/ )
            const hasMsgRef = transformed.match( /struct\.messages|struct\['messages'\]/ )

            if( hasStatusRef || hasMsgRef ) {
                transformed = HandlerTransfer.#convertPostErrors( { body: transformed } )
                warnings.push( `POST: error pattern converted for "${routeName}"` )
            }

            if( hasUserParams ) {
                transformed = transformed.replace( /\buserParams\b/g, 'payload' )
            }

            transformed = transformed.replace(
                /return\s*\{\s*struct\s*,\s*payload\s*\}\s*;?/g, 'return { response }'
            )
        }

        if( hasRouteName ) {
            transformed = `const __routeName = '${routeName}'\n` + transformed
            transformed = transformed.replace( /\brouteName\b/g, '__routeName' )
            warnings.push( `Handler uses routeName param for "${routeName}"` )
        }

        return { transformedBody: transformed.trim(), warnings }
    }


    static #convertPostErrors( { body } ) {
        const lines = body.split( '\n' )
        const result = []
        let i = 0

        while( i < lines.length ) {
            const trimmed = lines[ i ].trim()
            const indent = lines[ i ].match( /^(\s*)/ )[ 1 ]

            if( trimmed.match( /struct\[?'?status'?\]?\s*=\s*false/ ) ) {
                let msgArg = "'API error'"
                let j = i + 1

                while( j < lines.length && lines[ j ].trim() === '' ) { j++ }

                if( j < lines.length ) {
                    const msgMatch = lines[ j ].trim().match(
                        /struct\[?'?messages'?\]?\.push\(\s*(.+?)\s*\)\s*;?\s*$/
                    )
                    if( msgMatch ) {
                        msgArg = msgMatch[ 1 ]
                        j++

                        while( j < lines.length && lines[ j ].trim() === '' ) { j++ }

                        if( j < lines.length && lines[ j ].trim().match( /^return\s/ ) ) {
                            result.push( `${indent}throw new Error( ${msgArg} )` )
                            i = j + 1
                            continue
                        }

                        result.push( `${indent}throw new Error( ${msgArg} )` )
                        i = j
                        continue
                    }
                }

                result.push( `${indent}// REVIEW: ${trimmed}` )
                i++
                continue
            }

            if( trimmed.match( /struct\[?'?messages'?\]?\.push/ ) ) {
                result.push( `${indent}// REVIEW: ${trimmed}` )
                i++
                continue
            }

            if( trimmed.match( /struct\[?'?status'?\]?\s*=\s*true/ ) ) {
                i++
                continue
            }

            result.push( lines[ i ] )
            i++
        }

        return result.join( '\n' )
    }


    static #buildHandlersBlock( { transformedHandlers, category, moduleLevelCode, npmImports, sharedImports } ) {
        const lines = []
        const hasFactory = category === 'handlers-imports'
        const routeBase = hasFactory ? '        ' : '    '
        const phaseBase = hasFactory ? '            ' : '        '
        const bodyBase = hasFactory ? '                ' : '            '

        if( hasFactory ) {
            lines.push( 'export const handlers = ( { sharedLists, libraries } ) => {' )

            npmImports
                .forEach( ( imp ) => {
                    const varMatch = imp.line.match( /import\s+\{?\s*(\w+)/ )
                    const varName = varMatch ? varMatch[ 1 ] : imp.pkg.replace( /[^a-zA-Z0-9]/g, '' )
                    lines.push( `    const ${varName} = libraries['${imp.pkg}']` )
                } )

            sharedImports
                .forEach( ( imp ) => {
                    const varMatch = imp.line.match( /import\s+\{\s*(\w+)\s*\}/ )
                    if( varMatch ) {
                        const varName = varMatch[ 1 ]
                        const fileMatch = imp.source.match( /\/([^/.]+)\.mjs$/ )
                        const listName = fileMatch ? fileMatch[ 1 ] : 'unknown'
                        const camelName = listName.replace( /[-_](\w)/g, ( _, c ) => c.toUpperCase() )
                        lines.push( `    const ${varName} = sharedLists['${camelName}']` )
                    }
                } )

            if( moduleLevelCode ) {
                lines.push( '' )
                moduleLevelCode.split( '\n' )
                    .forEach( ( codeLine ) => {
                        lines.push( codeLine.trim() ? `    ${codeLine}` : '' )
                    } )
            }

            lines.push( '' )
            lines.push( '    return {' )
        } else {
            lines.push( 'export const handlers = ( { sharedLists, libraries } ) => ( {' )
        }

        const routeMap = new Map()
        transformedHandlers
            .forEach( ( h ) => {
                if( !routeMap.has( h.routeName ) ) {
                    routeMap.set( h.routeName, [] )
                }
                routeMap.get( h.routeName ).push( h )
            } )

        const routeEntries = [ ...routeMap.entries() ]

        routeEntries
            .forEach( ( [ routeName, handlers ], routeIndex ) => {
                const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test( routeName )
                    ? routeName
                    : `'${routeName}'`

                lines.push( `${routeBase}${safeKey}: {` )

                handlers
                    .forEach( ( h, hIndex ) => {
                        const isLastPhase = hIndex === handlers.length - 1
                        const phaseComma = isLastPhase ? '' : ','
                        const sig = h.v2Phase === 'postRequest'
                            ? '{ response, struct, payload }'
                            : '{ struct, payload }'

                        if( h.body === null ) {
                            lines.push( `${phaseBase}${h.v2Phase}: async ( ${sig} ) => {` )
                            lines.push( `${bodyBase}// TODO: Handler "${h.v1HandlerName}" not found` )
                            lines.push( `${bodyBase}return { ${h.v2Phase === 'postRequest' ? 'response' : 'struct'} }` )
                            lines.push( `${phaseBase}}${phaseComma}` )
                        } else {
                            lines.push( `${phaseBase}${h.v2Phase}: async ( ${sig} ) => {` )

                            h.body.split( '\n' )
                                .forEach( ( bodyLine ) => {
                                    if( bodyLine.trim() ) {
                                        lines.push( `${bodyBase}${bodyLine.trim()}` )
                                    } else {
                                        lines.push( '' )
                                    }
                                } )

                            lines.push( `${phaseBase}}${phaseComma}` )
                        }
                    } )

                const routeComma = routeIndex < routeEntries.length - 1 ? ',' : ''
                lines.push( `${routeBase}}${routeComma}` )
            } )

        if( hasFactory ) {
            lines.push( '    }' )
            lines.push( '}' )
        } else {
            lines.push( '} )' )
        }

        return lines.join( '\n' )
    }


    static #replaceHandlers( { v2Content, handlersBlock } ) {
        const handlerStart = v2Content.indexOf( 'export const handlers' )
        if( handlerStart === -1 ) { return v2Content }

        const mainPart = v2Content.substring( 0, handlerStart ).trimEnd()

        return mainPart + '\n\n\n' + handlersBlock + '\n'
    }


    static #normalizeIndent( { text } ) {
        const lines = text.split( '\n' )
        const nonEmptyLines = lines
            .filter( ( l ) => l.trim().length > 0 )

        if( nonEmptyLines.length === 0 ) { return '' }

        const indents = nonEmptyLines
            .map( ( l ) => {
                const match = l.match( /^(\s*)/ )

                return match[ 1 ].length
            } )

        const minIndent = Math.min( ...indents )

        const normalized = lines
            .map( ( l ) => {
                if( l.trim().length === 0 ) { return '' }

                return l.substring( minIndent )
            } )

        return normalized.join( '\n' ).trim()
    }


    static #printSummary( { results, reports, verbose } ) {
        console.log( '\n' + '='.repeat( 60 ) )
        console.log( '  TRANSFER SUMMARY' )
        console.log( '='.repeat( 60 ) )
        console.log( '' )
        console.log( `  Total files:       ${results.total}` )
        console.log( `  Transferred:       ${results.transferred}` )
        console.log( `  Skipped:           ${results.skipped}` )
        console.log( `  Errors:            ${results.errors}` )

        if( results.written > 0 ) {
            console.log( `\n  Files written:     ${results.written}` )
        }

        const errorReports = reports
            .filter( ( r ) => r.error )

        if( errorReports.length > 0 ) {
            console.log( '\n  ERRORS:' )
            errorReports
                .forEach( ( r ) => {
                    console.log( `    ${r.file}: ${r.error}` )
                } )
        }

        if( !verbose ) {
            const withWarnings = reports
                .filter( ( r ) => r.warnings.length > 0 && !r.error )

            if( withWarnings.length > 0 ) {
                console.log( `\n  Files with warnings: ${withWarnings.length}` )
            }
        }

        console.log( '\n' + '='.repeat( 60 ) + '\n' )
    }
}


HandlerTransfer.run().catch( ( error ) => {
    console.error( 'Fatal error:', error )
    process.exit( 1 )
} )
