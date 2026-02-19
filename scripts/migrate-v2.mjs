import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )


class SchemaMigrator {
    static async run() {
        const args = SchemaMigrator.#parseArgs()
        const { file, migrate, verbose } = args

        console.log( '\n' + '='.repeat( 60 ) )
        console.log( '  FlowMCP Schema Migrator  v1.2.0 -> v2.0.0' )
        console.log( '='.repeat( 60 ) )

        const sourceDir = path.resolve( __dirname, '../schemas/v1.2.0' )
        const outputDir = path.resolve( __dirname, '../schemas/v2.0.0' )

        const files = file
            ? [ path.resolve( sourceDir, file ) ]
            : SchemaMigrator.#collectSchemaFiles( { sourceDir } )

        console.log( `\n  Source:  schemas/v1.2.0/` )
        console.log( `  Output:  schemas/v2.0.0/` )
        console.log( `  Files:   ${files.length}` )
        console.log( `  Mode:    ${migrate ? 'MIGRATE' : 'DRY RUN (analyze only)'}` )
        console.log( '' )

        const results = {
            total: 0, simple: 0, handlersClean: 0,
            handlersImports: 0, errors: 0, written: 0
        }
        const reports = []

        const filePromises = files
            .map( async ( filePath ) => {
                const report = await SchemaMigrator.#processFile( {
                    filePath, sourceDir, outputDir, migrate, verbose
                } )

                return report
            } )

        const allReports = await Promise.all( filePromises )

        allReports
            .forEach( ( report ) => {
                reports.push( report )
                results.total++

                if( report.error ) {
                    results.errors++
                } else if( report.category === 'simple' ) {
                    results.simple++
                } else if( report.category === 'handlers-clean' ) {
                    results.handlersClean++
                } else {
                    results.handlersImports++
                }

                if( report.written ) { results.written++ }
            } )

        SchemaMigrator.#printSummary( { results, reports, verbose } )
    }


    static #parseArgs() {
        const args = { file: null, migrate: false, verbose: false }

        process.argv.slice( 2 )
            .forEach( ( arg ) => {
                if( arg.startsWith( '--file=' ) ) {
                    args.file = arg.split( '=' ).slice( 1 ).join( '=' )
                } else if( arg === '--migrate' ) {
                    args.migrate = true
                } else if( arg === '--verbose' ) {
                    args.verbose = true
                } else if( arg === '--help' ) {
                    console.log( [
                        'Usage: node scripts/migrate-v2.mjs [options]',
                        '',
                        'Options:',
                        '  --file=<path>    Single file (relative to schemas/v1.2.0/)',
                        '  --migrate        Write output files (default: dry run)',
                        '  --verbose        Detailed output per schema',
                        '  --help           Show this help',
                        '',
                        'Examples:',
                        '  node scripts/migrate-v2.mjs                                    # Analyze all',
                        '  node scripts/migrate-v2.mjs --verbose                           # With details',
                        '  node scripts/migrate-v2.mjs --migrate                           # Migrate all',
                        '  node scripts/migrate-v2.mjs --file=coincap/assets.mjs           # Analyze one',
                        '  node scripts/migrate-v2.mjs --file=coincap/assets.mjs --migrate # Migrate one',
                    ].join( '\n' ) )
                    process.exit( 0 )
                }
            } )

        return args
    }


    static #collectSchemaFiles( { sourceDir } ) {
        const files = []

        const walk = ( dirPath ) => {
            const entries = fs.readdirSync( dirPath, { withFileTypes: true } )

            entries
                .forEach( ( entry ) => {
                    const fullPath = path.join( dirPath, entry.name )

                    if( entry.isDirectory() && entry.name !== '_shared' ) {
                        walk( fullPath )
                    } else if( entry.isFile() && entry.name.endsWith( '.mjs' ) ) {
                        files.push( fullPath )
                    }
                } )
        }

        walk( sourceDir )
        files.sort()

        return files
    }


    static async #processFile( { filePath, sourceDir, outputDir, migrate, verbose } ) {
        const relativePath = path.relative( sourceDir, filePath )
        const report = {
            file: relativePath,
            category: null,
            warnings: [],
            error: null,
            written: false
        }

        try {
            const sourceText = fs.readFileSync( filePath, 'utf8' )
            const analysis = SchemaMigrator.#analyzeSource( { sourceText } )

            const module = await import( filePath )
            const schema = module.schema || module.default

            if( !schema ) {
                report.error = 'No schema export found'
                return report
            }

            const hasRealHandlers = SchemaMigrator.#hasRealHandlers( { schema } )
            const handlersUseExternals = hasRealHandlers && (
                analysis.hasModuleCode || analysis.hasNpmImports
                || analysis.hasReplaceableImports || analysis.hasBuiltinImports
            )

            if( !hasRealHandlers ) {
                report.category = 'simple'
            } else if( !handlersUseExternals ) {
                report.category = 'handlers-clean'
            } else {
                report.category = 'handlers-imports'
            }

            const { main, warnings } = SchemaMigrator.#convertMain( { schema } )
            report.warnings.push( ...warnings )

            const allRequiredLibs = [
                ...analysis.npmPackages,
                ...analysis.builtinPackages
            ]

            if( allRequiredLibs.length > 0 ) {
                main.requiredLibraries = allRequiredLibs
                report.warnings.push( `requiredLibraries: ${allRequiredLibs.join( ', ' )}` )
            }

            analysis.replaceablePackages
                .forEach( ( pkg ) => {
                    const replacement = pkg === 'axios'
                        ? 'native fetch'
                        : pkg === 'moment'
                            ? 'native Date/Intl'
                            : 'native API'
                    report.warnings.push( `REPLACE: ${pkg} -> ${replacement} (not in requiredLibraries)` )
                } )

            analysis.builtinPackages
                .forEach( ( pkg ) => {
                    report.warnings.push( `Node.js built-in: ${pkg} (in requiredLibraries)` )
                } )

            analysis.imports
                .forEach( ( imp ) => {
                    report.warnings.push( `Import: ${imp.line}` )
                } )

            if( analysis.hasModuleCode ) {
                report.warnings.push( `Module-level code: ${analysis.moduleCode.length} lines` )
            }

            const handlerCode = SchemaMigrator.#buildHandlerCode( {
                schema, hasRealHandlers, analysis
            } )

            const outputContent = SchemaMigrator.#generateOutputFile( {
                main, handlerCode, category: report.category, warnings: report.warnings
            } )

            if( migrate ) {
                const outputPath = path.join( outputDir, relativePath )
                fs.mkdirSync( path.dirname( outputPath ), { recursive: true } )
                fs.writeFileSync( outputPath, outputContent, 'utf8' )
                report.written = true
            }

            if( verbose ) {
                const icons = { simple: '  OK', 'handlers-clean': '  HC', 'handlers-imports': '  HI' }
                const icon = icons[ report.category ] || '  ??'
                console.log( `${icon}  ${relativePath}` )
                report.warnings
                    .forEach( ( w ) => { console.log( `        ${w}` ) } )
            }
        } catch( error ) {
            report.error = error.message
            if( verbose ) {
                console.log( `  ERR ${relativePath}: ${error.message}` )
            }
        }

        return report
    }


    static #REPLACEABLE_PACKAGES = [ 'axios', 'moment' ]
    static #NODE_BUILTINS = [ 'zlib', 'crypto', 'buffer', 'path', 'url', 'util', 'stream', 'querystring' ]


    static #analyzeSource( { sourceText } ) {
        const lines = sourceText.split( '\n' )
        const imports = []
        const npmPackages = []
        const replaceablePackages = []
        const builtinPackages = []
        const sharedImports = []
        const moduleCodeLines = []

        let inSchemaBlock = false
        let braceDepth = 0
        let inBlockComment = false

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
                if( trimmed.startsWith( '//' ) ) { return }
                if( trimmed === '' ) { return }

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
                    imports.push( { line: trimmed, lineNumber: index + 1 } )
                    const fromMatch = trimmed.match( /from\s+['"]([^'"]+)['"]/ )
                    if( fromMatch ) {
                        const source = fromMatch[ 1 ]
                        if( source.startsWith( '.' ) || source.startsWith( '/' ) ) {
                            sharedImports.push( { source, line: trimmed } )
                        } else {
                            const pkg = source.startsWith( '@' )
                                ? source.split( '/' ).slice( 0, 2 ).join( '/' )
                                : source.split( '/' )[ 0 ]

                            if( SchemaMigrator.#REPLACEABLE_PACKAGES.includes( pkg ) ) {
                                if( !replaceablePackages.includes( pkg ) ) { replaceablePackages.push( pkg ) }
                            } else if( SchemaMigrator.#NODE_BUILTINS.includes( pkg ) ) {
                                if( !builtinPackages.includes( pkg ) ) { builtinPackages.push( pkg ) }
                            } else {
                                if( !npmPackages.includes( pkg ) ) { npmPackages.push( pkg ) }
                            }
                        }
                    }
                    return
                }

                if( !trimmed.startsWith( 'export' ) ) {
                    moduleCodeLines.push( { line: trimmed, lineNumber: index + 1 } )
                }
            } )

        return {
            imports, npmPackages, replaceablePackages, builtinPackages, sharedImports,
            moduleCode: moduleCodeLines,
            hasImports: imports.length > 0,
            hasNpmImports: npmPackages.length > 0,
            hasReplaceableImports: replaceablePackages.length > 0,
            hasBuiltinImports: builtinPackages.length > 0,
            hasSharedImports: sharedImports.length > 0,
            hasModuleCode: moduleCodeLines.length > 0
        }
    }


    static #hasRealHandlers( { schema } ) {
        const handlers = schema.handlers || {}
        const handlerFns = Object.values( handlers )

        if( handlerFns.length === 0 ) { return false }

        const passPattern = /=>\s*\{[\s\n]*return\s*\{\s*struct\s*,\s*payload\s*\}\s*;?[\s\n]*\}/

        return handlerFns
            .some( ( fn ) => {
                if( typeof fn !== 'function' ) { return false }
                const body = fn.toString()

                return !passPattern.test( body )
            } )
    }


    static #convertMain( { schema } ) {
        const warnings = []
        const {
            namespace, name, description, docs, tags,
            root, requiredServerParams, headers,
            routes: legacyRoutes
        } = schema

        const cleanNamespace = ( namespace || 'unknown' ).toLowerCase().replace( /[^a-z]/g, '' )
        if( cleanNamespace !== namespace ) {
            warnings.push( `Namespace: "${namespace}" -> "${cleanNamespace}"` )
        }

        if( root && !root.startsWith( 'https://' ) ) {
            warnings.push( `Root not https: "${root}"` )
        }

        const main = {
            namespace: cleanNamespace,
            name: name || 'Unknown',
            description: description || '',
            version: '2.0.0'
        }

        if( docs && docs.length > 0 ) { main.docs = docs }
        if( tags && tags.length > 0 ) { main.tags = tags }
        main.root = root || 'https://unknown'
        if( requiredServerParams && requiredServerParams.length > 0 ) {
            main.requiredServerParams = requiredServerParams
        }
        if( headers && Object.keys( headers ).length > 0 ) {
            main.headers = headers
        }

        main.routes = {}
        const routeNames = Object.keys( legacyRoutes || {} )
        if( routeNames.length > 8 ) {
            warnings.push( `${routeNames.length} routes (v2 max: 8) — needs splitting` )
        }

        routeNames
            .forEach( ( routeName ) => {
                const legacy = legacyRoutes[ routeName ]
                const { convertedRoute, routeWarnings } = SchemaMigrator
                    .#convertRoute( { routeName, legacyRoute: legacy } )

                main.routes[ routeName ] = convertedRoute
                warnings.push( ...routeWarnings )
            } )

        return { main, warnings }
    }


    static #convertRoute( { routeName, legacyRoute } ) {
        const routeWarnings = []
        const { requestMethod, route: routePath, description, parameters } = legacyRoute

        const userParams = []
        const fixedQueryParams = []
        const fixedInsertParams = []

        ;( parameters || [] )
            .forEach( ( param ) => {
                if( !param.position ) { return }
                const { key, value, location } = param.position

                if( value === '{{USER_PARAM}}' ) {
                    userParams.push( param )
                } else if( location === 'query' ) {
                    fixedQueryParams.push( { key, value } )
                } else if( location === 'insert' ) {
                    fixedInsertParams.push( { key, value } )
                }
            } )

        let finalPath = routePath || '/'

        fixedInsertParams
            .forEach( ( { key, value } ) => {
                finalPath = finalPath.replace( `:${key}`, value )
            } )

        if( fixedQueryParams.length > 0 ) {
            const separator = finalPath.includes( '?' ) ? '&' : '?'
            const queryString = fixedQueryParams
                .map( ( { key, value } ) => `${key}=${value}` )
                .join( '&' )
            finalPath = `${finalPath}${separator}${queryString}`
        }

        const convertedRoute = {
            method: requestMethod || 'GET',
            path: finalPath,
            description: description || '',
            parameters: userParams
        }

        return { convertedRoute, routeWarnings }
    }


    static #buildHandlerCode( { schema, hasRealHandlers, analysis } ) {
        if( !hasRealHandlers ) { return null }

        const routes = schema.routes || {}
        const handlers = schema.handlers || {}
        const passPattern = /=>\s*\{[\s\n]*return\s*\{\s*struct\s*,\s*payload\s*\}\s*;?[\s\n]*\}/
        const routeEntries = []

        Object.entries( routes )
            .forEach( ( [ routeName, route ] ) => {
                const modifiers = route.modifiers || []
                if( modifiers.length === 0 ) { return }

                const phases = {}

                modifiers
                    .forEach( ( mod ) => {
                        const { phase, handlerName, fn } = mod
                        const resolvedFn = fn || handlers[ handlerName ] || null
                        if( !resolvedFn || typeof resolvedFn !== 'function' ) { return }
                        if( passPattern.test( resolvedFn.toString() ) ) { return }

                        const v2Phase = phase === 'execute'
                            ? 'executeRequest'
                            : ( phase === 'pre' || ( phase && phase.includes( 'pre' ) ) )
                                ? 'preRequest'
                                : 'postRequest'

                        phases[ v2Phase ] = { handlerName: handlerName || 'inline' }
                    } )

                if( Object.keys( phases ).length > 0 ) {
                    routeEntries.push( { routeName, phases } )
                }
            } )

        if( routeEntries.length === 0 ) { return null }

        const useBlock = analysis.hasNpmImports || analysis.hasReplaceableImports
            || analysis.hasBuiltinImports || analysis.hasModuleCode
        const lines = []

        if( useBlock ) {
            lines.push( 'export const handlers = ( { sharedLists, libraries } ) => {' )
            analysis.npmPackages
                .forEach( ( pkg ) => {
                    const varName = pkg.replace( /[^a-zA-Z0-9]/g, '' )
                    lines.push( `    // const ${varName} = libraries['${pkg}']` )
                } )
            analysis.builtinPackages
                .forEach( ( pkg ) => {
                    lines.push( `    // const ${pkg} = libraries['${pkg}']  // Node.js built-in` )
                } )
            analysis.replaceablePackages
                .forEach( ( pkg ) => {
                    const hint = pkg === 'axios'
                        ? 'REPLACE with native fetch'
                        : pkg === 'moment'
                            ? 'REPLACE with native Date/Intl'
                            : `REPLACE ${pkg} with native API`
                    lines.push( `    // TODO: ${hint} (was: ${pkg})` )
                } )
            if( analysis.hasModuleCode ) {
                lines.push( '    // TODO: Move module-level code here' )
            }
            lines.push( '' )
            lines.push( '    return {' )
        } else {
            lines.push( 'export const handlers = ( { sharedLists, libraries } ) => ( {' )
        }

        const baseIndent = useBlock ? '        ' : '    '

        routeEntries
            .forEach( ( { routeName, phases }, index ) => {
                const safeRouteName = SchemaMigrator.#safeKey( { key: routeName } )
                lines.push( `${baseIndent}${safeRouteName}: {` )

                const phaseEntries = Object.entries( phases )

                phaseEntries
                    .forEach( ( [ v2Phase, info ], phaseIndex ) => {
                        const { handlerName } = info
                        const indent = baseIndent + '    '
                        const phaseComma = phaseIndex < phaseEntries.length - 1 ? ',' : ''

                        if( v2Phase === 'preRequest' ) {
                            lines.push( `${indent}preRequest: async ( { struct, payload } ) => {` )
                            lines.push( `${indent}    // TODO: Migrated from v1 "${handlerName}" (phase: pre)` )
                            lines.push( `${indent}    return { struct, payload }` )
                            lines.push( `${indent}}${phaseComma}` )
                        } else if( v2Phase === 'executeRequest' ) {
                            lines.push( `${indent}executeRequest: async ( { struct, payload } ) => {` )
                            lines.push( `${indent}    // TODO: Migrated from v1 "${handlerName}" (phase: execute)` )
                            lines.push( `${indent}    // payload: { url, method, headers, body, userParams, serverParams }` )
                            lines.push( `${indent}    return { struct, payload }` )
                            lines.push( `${indent}}${phaseComma}` )
                        } else {
                            lines.push( `${indent}postRequest: async ( { response, struct, payload } ) => {` )
                            lines.push( `${indent}    // TODO: Migrated from v1 "${handlerName}" (phase: post)` )
                            lines.push( `${indent}    // v2: "response" = HTTP response (was struct.data in v1)` )
                            lines.push( `${indent}    return { response }` )
                            lines.push( `${indent}}${phaseComma}` )
                        }
                    } )

                const comma = index < routeEntries.length - 1 ? ',' : ''
                lines.push( `${baseIndent}}${comma}` )
            } )

        if( useBlock ) {
            lines.push( '    }' )
            lines.push( '}' )
        } else {
            lines.push( '} )' )
        }

        return lines.join( '\n' )
    }


    static #generateOutputFile( { main, handlerCode, category, warnings } ) {
        const lines = []

        lines.push( '// Migrated from v1.2.0 -> v2.0.0' )
        lines.push( `// Category: ${category}` )
        if( warnings.length > 0 ) {
            warnings
                .forEach( ( w ) => { lines.push( `// ${w}` ) } )
        }
        lines.push( '' )

        const mainCode = SchemaMigrator.#serializeJS( { value: main, indent: 0 } )
        lines.push( `export const main = ${mainCode}` )

        if( handlerCode ) {
            lines.push( '' )
            lines.push( '' )
            lines.push( handlerCode )
        }

        lines.push( '' )

        return lines.join( '\n' )
    }


    static #serializeJS( { value, indent = 0, compact = false } ) {
        if( value === null || value === undefined ) { return 'null' }

        if( typeof value === 'string' ) {
            const escaped = value
                .replace( /\\/g, '\\\\' )
                .replace( /'/g, "\\'" )
                .replace( /\n/g, '\\n' )
                .replace( /\r/g, '' )
            return `'${escaped}'`
        }

        if( typeof value === 'number' || typeof value === 'boolean' ) {
            return String( value )
        }

        const pad = ' '.repeat( indent )
        const innerPad = ' '.repeat( indent + 4 )

        if( Array.isArray( value ) ) {
            if( value.length === 0 ) { return '[]' }

            const allPrimitive = value
                .every( ( v ) => typeof v !== 'object' || v === null )

            if( compact || allPrimitive ) {
                const items = value
                    .map( ( v ) => SchemaMigrator.#serializeJS( { value: v, compact: true } ) )
                return `[${items.join( ', ' )}]`
            }

            const isParamArray = typeof value[ 0 ] === 'object'
                && value[ 0 ] !== null
                && value[ 0 ].position !== undefined

            const items = value
                .map( ( v ) => {
                    const serialized = isParamArray
                        ? SchemaMigrator.#serializeJS( { value: v, compact: true } )
                        : SchemaMigrator.#serializeJS( { value: v, indent: indent + 4 } )
                    return `${innerPad}${serialized}`
                } )

            return `[\n${items.join( ',\n' )}\n${pad}]`
        }

        if( typeof value === 'object' ) {
            const entries = Object.entries( value )
            if( entries.length === 0 ) { return '{}' }

            if( compact ) {
                const items = entries
                    .map( ( [ k, v ] ) => {
                        const key = SchemaMigrator.#safeKey( { key: k } )
                        const val = SchemaMigrator.#serializeJS( { value: v, compact: true } )
                        return `${key}: ${val}`
                    } )
                return `{ ${items.join( ', ' )} }`
            }

            const items = entries
                .map( ( [ k, v ] ) => {
                    const key = SchemaMigrator.#safeKey( { key: k } )
                    const val = SchemaMigrator.#serializeJS( { value: v, indent: indent + 4 } )
                    return `${innerPad}${key}: ${val}`
                } )

            return `{\n${items.join( ',\n' )}\n${pad}}`
        }

        return String( value )
    }


    static #safeKey( { key } ) {
        const safePattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/

        if( safePattern.test( key ) ) { return key }

        return `'${key}'`
    }


    static #printSummary( { results, reports, verbose } ) {
        console.log( '\n' + '='.repeat( 60 ) )
        console.log( '  MIGRATION SUMMARY' )
        console.log( '='.repeat( 60 ) )
        console.log( '' )
        console.log( `  Total schemas:         ${results.total}` )
        console.log( `  OK  Simple (auto):     ${results.simple}` )
        console.log( `  HC  Handlers (semi):   ${results.handlersClean}` )
        console.log( `  HI  Imports (manual):  ${results.handlersImports}` )
        console.log( `  ERR Errors:            ${results.errors}` )

        if( results.written > 0 ) {
            console.log( `\n  Files written:         ${results.written}` )
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
            const manualReports = reports
                .filter( ( r ) => r.category === 'handlers-imports' )

            if( manualReports.length > 0 ) {
                console.log( '\n  NEEDS MANUAL REVIEW:' )
                manualReports
                    .forEach( ( r ) => {
                        console.log( `    ${r.file}` )
                    } )
            }
        }

        console.log( '\n' + '='.repeat( 60 ) + '\n' )
    }
}


SchemaMigrator.run().catch( ( error ) => {
    console.error( 'Fatal error:', error )
    process.exit( 1 )
} )
