import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )


class SharedListConverter {
    static #LIST_DEFINITIONS = [
        {
            sourceFile: 'evmChains.mjs',
            exportName: 'EVM_CHAINS',
            listName: 'evmChains',
            outputFile: 'evm-chains.mjs',
            description: 'Unified EVM chain registry — superset of all chains across all providers with provider-specific keys.',
            version: '2.0.0'
        },
        {
            sourceFile: 'tradingTimeframes.mjs',
            exportName: 'TRADING_TIMEFRAMES',
            listName: 'tradingTimeframes',
            outputFile: 'trading-timeframes.mjs',
            description: 'Trading timeframes with provider-specific slug mappings.',
            version: '2.0.0'
        },
        {
            sourceFile: 'tradingExchanges.mjs',
            exportName: 'TRADING_EXCHANGES',
            listName: 'tradingExchanges',
            outputFile: 'trading-exchanges.mjs',
            description: 'Cryptocurrency exchanges with provider-specific slug mappings.',
            version: '2.0.0'
        },
        {
            sourceFile: 'germanBundeslaender.mjs',
            exportName: 'GERMAN_BUNDESLAENDER',
            listName: 'germanBundeslaender',
            outputFile: 'german-bundeslaender.mjs',
            description: 'German federal states (Bundeslaender) with official two-letter codes.',
            version: '2.0.0'
        },
        {
            sourceFile: 'isoCountryCodes.mjs',
            exportName: 'ISO_COUNTRY_CODES',
            listName: 'isoCountryCodes',
            outputFile: 'iso-country-codes.mjs',
            description: 'ISO 3166-1 alpha-2 country codes.',
            version: '2.0.0'
        },
        {
            sourceFile: 'isoLanguageCodes.mjs',
            exportName: 'ISO_LANGUAGE_CODES',
            listName: 'isoLanguageCodes',
            outputFile: 'iso-language-codes.mjs',
            description: 'ISO 639-1 language codes.',
            version: '2.0.0'
        }
    ]


    static async run() {
        const args = SharedListConverter.#parseArgs()
        const { migrate } = args

        console.log( '\n' + '='.repeat( 60 ) )
        console.log( '  SharedList Converter  _shared/ -> _lists/' )
        console.log( '='.repeat( 60 ) )

        const sourceDir = path.resolve( __dirname, '../schemas/v1.2.0/_shared' )
        const outputDir = path.resolve( __dirname, '../schemas/v2.0.0/_lists' )

        console.log( `\n  Source:  schemas/v1.2.0/_shared/` )
        console.log( `  Output:  schemas/v2.0.0/_lists/` )
        console.log( `  Mode:    ${migrate ? 'WRITE' : 'DRY RUN'}` )
        console.log( '' )

        const results = { total: 0, written: 0, errors: 0 }

        const listPromises = SharedListConverter.#LIST_DEFINITIONS
            .map( async ( def ) => {
                results.total++

                try {
                    const sourcePath = path.join( sourceDir, def.sourceFile )
                    const module = await import( sourcePath )
                    const entries = module[ def.exportName ]

                    if( !entries || !Array.isArray( entries ) ) {
                        console.log( `  ERR  ${def.sourceFile}: Export "${def.exportName}" not found or not array` )
                        results.errors++
                        return
                    }

                    const fields = SharedListConverter.#extractFields( { entries } )
                    const content = SharedListConverter.#generateListFile( {
                        listName: def.listName,
                        version: def.version,
                        description: def.description,
                        fields,
                        entries
                    } )

                    console.log( `  OK   ${def.outputFile}  (${entries.length} entries, ${fields.length} fields)` )

                    if( migrate ) {
                        const outputPath = path.join( outputDir, def.outputFile )
                        fs.mkdirSync( path.dirname( outputPath ), { recursive: true } )
                        fs.writeFileSync( outputPath, content, 'utf8' )
                        results.written++
                    }
                } catch( error ) {
                    console.log( `  ERR  ${def.sourceFile}: ${error.message}` )
                    results.errors++
                }
            } )

        await Promise.all( listPromises )

        SharedListConverter.#printSkipped()

        console.log( '\n' + '='.repeat( 60 ) )
        console.log( `  Total: ${results.total}  Written: ${results.written}  Errors: ${results.errors}` )
        console.log( '='.repeat( 60 ) + '\n' )
    }


    static #parseArgs() {
        const args = { migrate: false }

        process.argv.slice( 2 )
            .forEach( ( arg ) => {
                if( arg === '--migrate' ) { args.migrate = true }
                if( arg === '--help' ) {
                    console.log( 'Usage: node scripts/convert-shared-lists.mjs [--migrate]' )
                    process.exit( 0 )
                }
            } )

        return args
    }


    static #extractFields( { entries } ) {
        const fieldMap = {}

        entries
            .forEach( ( entry ) => {
                Object.entries( entry )
                    .forEach( ( [ key, value ] ) => {
                        if( !fieldMap[ key ] ) {
                            fieldMap[ key ] = {
                                key,
                                type: typeof value === 'number' ? 'number'
                                    : typeof value === 'boolean' ? 'boolean'
                                    : 'string',
                                optional: false,
                                presentCount: 0
                            }
                        }
                        fieldMap[ key ].presentCount++
                    } )
            } )

        const totalEntries = entries.length
        const fields = Object.values( fieldMap )
            .map( ( field ) => {
                const { key, type, presentCount } = field
                const optional = presentCount < totalEntries

                return { key, type, optional }
            } )

        return fields
    }


    static #generateListFile( { listName, version, description, fields, entries } ) {
        const lines = []

        lines.push( 'export const list = {' )
        lines.push( '    meta: {' )
        lines.push( `        name: '${listName}',` )
        lines.push( `        version: '${version}',` )
        lines.push( `        description: '${description.replace( /'/g, "\\'" )}',` )
        lines.push( '        fields: [' )

        fields
            .forEach( ( field, index ) => {
                const comma = index < fields.length - 1 ? ',' : ''
                lines.push( `            { key: '${field.key}', type: '${field.type}', optional: ${field.optional} }${comma}` )
            } )

        lines.push( '        ]' )
        lines.push( '    },' )
        lines.push( '    entries: [' )

        entries
            .forEach( ( entry, index ) => {
                const comma = index < entries.length - 1 ? ',' : ''
                const serialized = SharedListConverter.#serializeEntry( { entry } )
                lines.push( `        ${serialized}${comma}` )
            } )

        lines.push( '    ]' )
        lines.push( '}' )
        lines.push( '' )

        return lines.join( '\n' )
    }


    static #serializeEntry( { entry } ) {
        const parts = Object.entries( entry )
            .map( ( [ key, value ] ) => {
                const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test( key ) ? key : `'${key}'`

                if( value === null || value === undefined ) {
                    return `${safeKey}: null`
                }
                if( typeof value === 'string' ) {
                    return `${safeKey}: '${value.replace( /'/g, "\\'" )}'`
                }
                if( typeof value === 'number' || typeof value === 'boolean' ) {
                    return `${safeKey}: ${value}`
                }

                return `${safeKey}: ${JSON.stringify( value )}`
            } )

        return `{ ${parts.join( ', ' )} }`
    }


    static #printSkipped() {
        console.log( '' )
        console.log( '  SKIPPED (contain functions, not pure data):' )
        console.log( '    alchemyRpcUrls.mjs  -> handler logic (getAlchemyUrl)' )
        console.log( '    infuraRpcUrls.mjs   -> handler logic (getInfuraUrl)' )
    }
}


SharedListConverter.run().catch( ( error ) => {
    console.error( 'Fatal error:', error )
    process.exit( 1 )
} )
