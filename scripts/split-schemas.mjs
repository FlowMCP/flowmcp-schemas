import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )

const MAX_ROUTES = 8


class SchemaSplitter {
    static async run() {
        const args = SchemaSplitter.#parseArgs()
        const { migrate } = args

        console.log( '\n' + '='.repeat( 60 ) )
        console.log( '  Schema Splitter  (max 8 routes per file)' )
        console.log( '='.repeat( 60 ) )

        const schemaDir = path.resolve( __dirname, '../schemas/v2.0.0' )
        const oversized = await SchemaSplitter.#findOversizedSchemas( { schemaDir } )

        console.log( `\n  Directory:  schemas/v2.0.0/` )
        console.log( `  Oversized:  ${oversized.length} schemas` )
        console.log( `  Mode:       ${migrate ? 'WRITE' : 'DRY RUN'}` )
        console.log( '' )

        const results = { total: 0, filesCreated: 0, filesRemoved: 0, errors: 0 }

        const splitPromises = oversized
            .map( async ( info ) => {
                results.total++

                try {
                    const { splits, warnings } = SchemaSplitter.#splitSchema( { info } )
                    const routeTotal = Object.keys( info.main.routes ).length

                    console.log( `  ${info.relativePath}  (${routeTotal} routes -> ${splits.length} files)` )
                    warnings
                        .forEach( ( w ) => { console.log( `    ${w}` ) } )
                    splits
                        .forEach( ( s ) => {
                            const routeCount = Object.keys( s.main.routes ).length
                            console.log( `    -> ${s.filename}  (${routeCount} routes)` )
                        } )

                    if( migrate ) {
                        splits
                            .forEach( ( split ) => {
                                const outputPath = path.join( schemaDir, split.relativePath )
                                fs.mkdirSync( path.dirname( outputPath ), { recursive: true } )
                                fs.writeFileSync( outputPath, split.content, 'utf8' )
                                results.filesCreated++
                            } )

                        fs.unlinkSync( path.join( schemaDir, info.relativePath ) )
                        results.filesRemoved++
                    }
                } catch( error ) {
                    console.log( `  ERR  ${info.relativePath}: ${error.message}` )
                    results.errors++
                }
            } )

        await Promise.all( splitPromises )

        console.log( '\n' + '='.repeat( 60 ) )
        console.log( `  Schemas split: ${results.total}  Files created: ${results.filesCreated}  Removed: ${results.filesRemoved}  Errors: ${results.errors}` )
        console.log( '='.repeat( 60 ) + '\n' )
    }


    static #parseArgs() {
        const args = { migrate: false }

        process.argv.slice( 2 )
            .forEach( ( arg ) => {
                if( arg === '--migrate' ) { args.migrate = true }
                if( arg === '--help' ) {
                    console.log( 'Usage: node scripts/split-schemas.mjs [--migrate]' )
                    process.exit( 0 )
                }
            } )

        return args
    }


    static async #findOversizedSchemas( { schemaDir } ) {
        const results = []

        const walk = ( dirPath ) => {
            const entries = fs.readdirSync( dirPath, { withFileTypes: true } )

            entries
                .forEach( ( entry ) => {
                    const fullPath = path.join( dirPath, entry.name )

                    if( entry.isDirectory() && !entry.name.startsWith( '_' ) ) {
                        walk( fullPath )
                    } else if( entry.isFile() && entry.name.endsWith( '.mjs' ) ) {
                        results.push( fullPath )
                    }
                } )
        }

        walk( schemaDir )

        const oversized = []

        const importPromises = results
            .map( async ( filePath ) => {
                try {
                    const module = await import( filePath )
                    const main = module.main

                    if( !main || !main.routes ) { return }

                    const routeCount = Object.keys( main.routes ).length

                    if( routeCount > MAX_ROUTES ) {
                        const sourceText = fs.readFileSync( filePath, 'utf8' )
                        const hasHandlers = module.handlers !== undefined
                        const relativePath = path.relative( schemaDir, filePath )

                        oversized.push( {
                            filePath, relativePath, main,
                            handlersFn: module.handlers,
                            hasHandlers, sourceText, routeCount
                        } )
                    }
                } catch( error ) {
                    // Skip files that can't be imported
                }
            } )

        await Promise.all( importPromises )
        oversized.sort( ( a, b ) => a.relativePath.localeCompare( b.relativePath ) )

        return oversized
    }


    static #splitSchema( { info } ) {
        const { main, hasHandlers, sourceText, relativePath } = info
        const routeNames = Object.keys( main.routes )
        const warnings = []
        const splits = []

        const chunks = []
        const chunkSize = MAX_ROUTES
        const totalChunks = Math.ceil( routeNames.length / chunkSize )

        routeNames
            .forEach( ( name, index ) => {
                const chunkIndex = Math.floor( index / chunkSize )

                if( !chunks[ chunkIndex ] ) { chunks[ chunkIndex ] = [] }
                chunks[ chunkIndex ].push( name )
            } )

        const baseName = path.basename( relativePath, '.mjs' )
        const dirName = path.dirname( relativePath )
        const handlerRouteMap = SchemaSplitter.#extractHandlerRoutes( { sourceText } )

        chunks
            .forEach( ( chunkRouteNames, chunkIndex ) => {
                const partNumber = chunkIndex + 1
                const filename = totalChunks <= 1
                    ? `${baseName}.mjs`
                    : `${baseName}-part${partNumber}.mjs`

                const splitMain = { ...main }
                splitMain.routes = {}

                chunkRouteNames
                    .forEach( ( routeName ) => {
                        splitMain.routes[ routeName ] = main.routes[ routeName ]
                    } )

                splitMain.name = totalChunks <= 1
                    ? main.name
                    : `${main.name} (Part ${partNumber})`

                const splitContent = SchemaSplitter.#generateSplitFile( {
                    main: splitMain,
                    routeNames: chunkRouteNames,
                    handlerRouteMap,
                    hasHandlers,
                    sourceText,
                    partNumber,
                    totalParts: totalChunks,
                    originalFile: relativePath
                } )

                splits.push( {
                    filename,
                    relativePath: path.join( dirName, filename ),
                    main: splitMain,
                    content: splitContent
                } )
            } )

        if( totalChunks > 1 ) {
            warnings.push( `Split into ${totalChunks} parts of max ${MAX_ROUTES} routes` )
        }

        return { splits, warnings }
    }


    static #extractHandlerRoutes( { sourceText } ) {
        const map = {}
        const handlerBlockMatch = sourceText.match( /export const handlers[\s\S]*$/ )

        if( !handlerBlockMatch ) { return map }

        const handlerBlock = handlerBlockMatch[ 0 ]
        const routePattern = /(\w+)\s*:\s*\{[\s\S]*?(?=\n\s{4,8}\w+\s*:\s*\{|\n\s{0,4}\}[^}])/g
        let match = routePattern.exec( handlerBlock )

        // Simple approach: find route names mentioned in handler block
        const lines = handlerBlock.split( '\n' )
        let currentRoute = null

        lines
            .forEach( ( line ) => {
                const routeMatch = line.match( /^\s{4,8}(\w+)\s*:\s*\{/ )
                if( routeMatch ) {
                    currentRoute = routeMatch[ 1 ]
                    map[ currentRoute ] = []
                }
            } )

        return map
    }


    static #generateSplitFile( { main, routeNames, handlerRouteMap, hasHandlers, sourceText, partNumber, totalParts, originalFile } ) {
        const lines = []

        lines.push( `// Split from ${originalFile}` )
        if( totalParts > 1 ) {
            lines.push( `// Part ${partNumber} of ${totalParts}` )
        }

        // Copy comment headers from original
        const sourceLines = sourceText.split( '\n' )
        sourceLines
            .forEach( ( line ) => {
                if( line.startsWith( '//' ) && !line.startsWith( '// Split' ) && !line.startsWith( '// Part' ) ) {
                    lines.push( line )
                }
            } )

        lines.push( '' )

        const mainCode = SchemaSplitter.#serializeJS( { value: main, indent: 0 } )
        lines.push( `export const main = ${mainCode}` )

        if( hasHandlers ) {
            const handlerCode = SchemaSplitter.#extractHandlersForRoutes( {
                sourceText, routeNames
            } )

            if( handlerCode ) {
                lines.push( '' )
                lines.push( '' )
                lines.push( handlerCode )
            }
        }

        lines.push( '' )

        return lines.join( '\n' )
    }


    static #extractHandlersForRoutes( { sourceText, routeNames } ) {
        const handlerMatch = sourceText.match( /export const handlers[\s\S]*$/ )

        if( !handlerMatch ) { return null }

        const fullHandler = handlerMatch[ 0 ].trim()

        // Detect if it's block style (return {) or expression style (=> ({)
        const isBlockStyle = fullHandler.includes( 'return {' )

        // Extract individual route handler blocks
        const routeBlocks = []

        routeNames
            .forEach( ( routeName ) => {
                const block = SchemaSplitter.#extractRouteHandler( {
                    handlerText: fullHandler, routeName
                } )

                if( block ) {
                    routeBlocks.push( { routeName, block } )
                }
            } )

        if( routeBlocks.length === 0 ) { return null }

        // Extract the preamble (library comments, TODO lines before return)
        const preamble = SchemaSplitter.#extractHandlerPreamble( { handlerText: fullHandler } )

        const lines = []

        if( isBlockStyle ) {
            lines.push( 'export const handlers = ( { sharedLists, libraries } ) => {' )
            if( preamble ) { lines.push( preamble ) }
            lines.push( '' )
            lines.push( '    return {' )

            routeBlocks
                .forEach( ( { block }, index ) => {
                    lines.push( block )
                    if( index < routeBlocks.length - 1 ) {
                        // Add comma after block
                    }
                } )

            lines.push( '    }' )
            lines.push( '}' )
        } else {
            lines.push( 'export const handlers = ( { sharedLists, libraries } ) => ( {' )

            routeBlocks
                .forEach( ( { block } ) => {
                    lines.push( block )
                } )

            lines.push( '} )' )
        }

        return lines.join( '\n' )
    }


    static #extractRouteHandler( { handlerText, routeName } ) {
        // Find the route handler block in the handler text
        const pattern = new RegExp(
            `(\\s+${routeName}\\s*:\\s*\\{[\\s\\S]*?\\n\\s{4,8}\\})`,
            'm'
        )

        const match = handlerText.match( pattern )

        if( match ) {
            return match[ 1 ].replace( /,\s*$/, '' )
        }

        return null
    }


    static #extractHandlerPreamble( { handlerText } ) {
        const lines = handlerText.split( '\n' )
        const preambleLines = []
        let foundOpener = false

        lines
            .forEach( ( line ) => {
                if( !foundOpener && line.includes( '=> {' ) ) {
                    foundOpener = true
                    return
                }

                if( foundOpener && !line.includes( 'return {' ) && line.trim() !== '' ) {
                    if( line.trim().startsWith( '//' ) || line.trim().startsWith( 'const' ) ) {
                        preambleLines.push( line )
                    }
                }

                if( line.includes( 'return {' ) || line.includes( '=> ( {' ) ) {
                    foundOpener = false
                }
            } )

        return preambleLines.length > 0 ? preambleLines.join( '\n' ) : null
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
                    .map( ( v ) => SchemaSplitter.#serializeJS( { value: v, compact: true } ) )
                return `[${items.join( ', ' )}]`
            }

            const isParamArray = typeof value[ 0 ] === 'object'
                && value[ 0 ] !== null
                && value[ 0 ].position !== undefined

            const items = value
                .map( ( v ) => {
                    const serialized = isParamArray
                        ? SchemaSplitter.#serializeJS( { value: v, compact: true } )
                        : SchemaSplitter.#serializeJS( { value: v, indent: indent + 4 } )
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
                        const key = SchemaSplitter.#safeKey( { key: k } )
                        const val = SchemaSplitter.#serializeJS( { value: v, compact: true } )
                        return `${key}: ${val}`
                    } )
                return `{ ${items.join( ', ' )} }`
            }

            const items = entries
                .map( ( [ k, v ] ) => {
                    const key = SchemaSplitter.#safeKey( { key: k } )
                    const val = SchemaSplitter.#serializeJS( { value: v, indent: indent + 4 } )
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
}


SchemaSplitter.run().catch( ( error ) => {
    console.error( 'Fatal error:', error )
    process.exit( 1 )
} )
