import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )

const REPO_ROOT = path.resolve( __dirname, '..' )
const SCHEMA_DIR = path.resolve( REPO_ROOT, 'schemas', 'v1.2.0' )
const OUTPUT_DIR = path.resolve( REPO_ROOT, 'schemas', 'v1.2.0' )
const BASE_DIR = 'schemas/v1.2.0'

const PROJECT_PKG = JSON.parse(
    fs.readFileSync( path.resolve( REPO_ROOT, 'package.json' ), 'utf-8' )
)

const STARTER_FILES = new Set( [
    'context-7/getDocumentation.mjs',
    'cointelegraph/getLatestNews.mjs',
    'swaggerhub-com/api-registry.mjs',
    'epo-org/patent-search.mjs',
    'polymarket/marketInfo.mjs',
    'coingecko-com/simplePrice.mjs',
    'defilama/api.mjs',
    'medium-com/rss-feeds.mjs',
    'alternative-me/fearAndGreed.mjs',
    'honeypot/honeypot.mjs'
] )

const OSINT_FOLDERS = new Set( [
    'context-7',
    'cointelegraph',
    'epo-org',
    'medium-com',
    'memory-lol',
    'newsapi-org',
    'newsdata-io',
    'polymarket',
    'reddit',
    'swaggerhub-com',
    'twitter',
    'web3-career'
] )

const GERMAN_FOLDERS = new Set( [
    'berlin-de',
    'stolpersteine-berlin'
] )

const MODULE_LIST = {
    'ccxt/orderbook.mjs': [ 'ccxt' ],
    'chainlink/getLatestPrices.mjs': [ 'ethers' ],
    'chainlink/getLatestPricesMulticall.mjs': [ 'ethers' ],
    'ens/ens-resolution.mjs': [ 'ethers' ],
    'erc725/universalProfile.mjs': [ '@erc725/erc725.js' ],
    'indicators/indicatorts-schema.mjs': [ 'indicatorts' ],
    'ohlcv/olhcv-moralis-evm.mjs': [ 'axios', 'moment' ],
    'ohlcv/olhcv-moralis-solana.mjs': [ 'axios', 'moment' ],
    'ohlcv/olhcv-solana-tracker.mjs': [ 'moment' ],
    'passport-xyz/onchain-data.mjs': [ 'ethers' ],
    'pinata/write.mjs': [ 'pinata' ],
    'simdune/activityEVM.mjs': [ 'indicatorts' ],
    'uniswap-v3/price-discovery.mjs': [ 'ethers', '@thanpolas/univ3prices' ]
}


class RegistryGenerator {
    static #collectMjsFiles() {
        const results = []

        const topFolders = fs.readdirSync( SCHEMA_DIR )
            .filter( ( name ) => {
                const fullPath = path.join( SCHEMA_DIR, name )
                const isDir = fs.statSync( fullPath ).isDirectory()

                return isDir
            } )

        topFolders.forEach( ( folder ) => {
            const folderPath = path.join( SCHEMA_DIR, folder )
            const allFiles = RegistryGenerator.#getAllMjsFiles( { dirPath: folderPath } )

            allFiles
                .filter( ( f ) => !path.basename( f ).startsWith( '--' ) )
                .forEach( ( absolutePath ) => {
                    const relativePath = path.relative( SCHEMA_DIR, absolutePath )

                    results.push( { relativePath, absolutePath, folder } )
                } )
        } )

        return results
    }


    static #getAllMjsFiles( { dirPath, collected = [] } ) {
        const entries = fs.readdirSync( dirPath )

        entries.forEach( ( entry ) => {
            const fullPath = path.join( dirPath, entry )
            const stat = fs.statSync( fullPath )

            if( stat.isDirectory() ) {
                RegistryGenerator.#getAllMjsFiles( { dirPath: fullPath, collected } )
            } else if( entry.endsWith( '.mjs' ) ) {
                collected.push( fullPath )
            }
        } )

        return collected
    }


    static #detectRequiredModules( { relativePath } ) {
        const moduleNames = MODULE_LIST[ relativePath ] || []
        const allDeps = { ...( PROJECT_PKG['dependencies'] || {} ), ...( PROJECT_PKG['devDependencies'] || {} ) }

        const requiredModules = moduleNames
            .map( ( name ) => {
                const version = allDeps[ name ] || '*'

                return { name, version }
            } )

        return requiredModules
    }


    static async #importSchema( { absolutePath } ) {
        try {
            const { schema } = await import( absolutePath )

            return schema
        } catch( _err ) {
            return null
        }
    }


    static #extractSchemaMetaFromSource( { absolutePath } ) {
        const source = fs.readFileSync( absolutePath, 'utf-8' )

        const namespaceMatch = source.match( /namespace\s*:\s*['"`]([^'"`]+)['"`]/ )
        const nameMatch = source.match( /(?:^|\n)\s*name\s*:\s*['"`]([^'"`]+)['"`]/ )
        const requiredServerParamsMatch = source.match( /requiredServerParams\s*:\s*\[([^\]]*)\]/ )

        const namespace = namespaceMatch ? namespaceMatch[1] : null
        const name = nameMatch ? nameMatch[1] : null

        let requiredServerParams = []
        if( requiredServerParamsMatch ) {
            const raw = requiredServerParamsMatch[1].trim()
            if( raw.length > 0 ) {
                requiredServerParams = raw
                    .split( ',' )
                    .map( ( s ) => s.trim().replace( /['"`]/g, '' ) )
                    .filter( ( s ) => s.length > 0 )
            }
        }

        return { namespace, name, requiredServerParams }
    }


    static #classifySchema( { folder } ) {
        if( GERMAN_FOLDERS.has( folder ) ) {
            return 'german'
        }

        if( OSINT_FOLDERS.has( folder ) ) {
            return 'osint'
        }

        return 'crypto'
    }


    static async #buildEntry( { relativePath, absolutePath, folder } ) {
        const requiredModules = RegistryGenerator.#detectRequiredModules( { relativePath } )
        const category = RegistryGenerator.#classifySchema( { folder } )

        const schema = await RegistryGenerator.#importSchema( { absolutePath } )

        let namespace, name, requiredServerParams

        if( schema ) {
            namespace = schema['namespace']
            name = schema['name']
            requiredServerParams = schema['requiredServerParams'] || []
        } else {
            const meta = RegistryGenerator.#extractSchemaMetaFromSource( { absolutePath } )
            namespace = meta['namespace']
            name = meta['name']
            requiredServerParams = meta['requiredServerParams']
        }

        if( !namespace || !name ) {
            console.log( `  SKIP: ${relativePath} (missing namespace or name)` )

            return null
        }

        const entry = {
            namespace,
            file: relativePath,
            name,
            requiredServerParams,
            requiredModules
        }

        return { entry, category }
    }


    static #buildRegistryJson( { registryType, description, entries } ) {
        const registry = {
            name: 'flowmcp-schemas',
            version: '1.0.0',
            description,
            schemaSpec: '1.2.0',
            baseDir: BASE_DIR,
            registryType,
            schemas: entries
        }

        return registry
    }


    static #writeJson( { filePath, data } ) {
        fs.writeFileSync( filePath, JSON.stringify( data, null, 4 ) + '\n' )
        console.log( `  Written: ${filePath}` )
    }


    static async generate() {
        console.log( 'Collecting schema files...' )
        const files = RegistryGenerator.#collectMjsFiles()
        console.log( `  Found ${files.length} .mjs files\n` )

        console.log( 'Processing schemas...' )
        const allEntries = []
        const starterEntries = []
        const cryptoEntries = []
        const osintEntries = []

        const processResults = await Promise.all(
            files.map( ( { relativePath, absolutePath, folder } ) => {
                return RegistryGenerator.#buildEntry( { relativePath, absolutePath, folder } )
            } )
        )

        processResults
            .filter( ( result ) => result !== null )
            .forEach( ( { entry, category } ) => {
                allEntries.push( entry )

                if( STARTER_FILES.has( entry['file'] ) ) {
                    starterEntries.push( entry )
                }

                if( category === 'crypto' ) {
                    cryptoEntries.push( entry )
                }

                if( category === 'osint' ) {
                    osintEntries.push( entry )
                }
            } )

        const sortByNamespace = ( a, b ) => a['namespace'].localeCompare( b['namespace'] )
        allEntries.sort( sortByNamespace )
        starterEntries.sort( sortByNamespace )
        cryptoEntries.sort( sortByNamespace )
        osintEntries.sort( sortByNamespace )

        console.log( `\n  All:     ${allEntries.length} schemas` )
        console.log( `  Starter: ${starterEntries.length} schemas` )
        console.log( `  Crypto:  ${cryptoEntries.length} schemas` )
        console.log( `  OSINT:   ${osintEntries.length} schemas` )

        const withModules = allEntries
            .filter( ( e ) => e['requiredModules'].length > 0 )
        console.log( `  With modules: ${withModules.length} schemas\n` )

        console.log( 'Writing registry files...' )

        const starterRegistry = RegistryGenerator.#buildRegistryJson( {
            registryType: 'starter',
            description: 'Official FlowMCP community schemas - Starter Pack (no API keys, no npm modules)',
            entries: starterEntries
        } )

        const cryptoRegistry = RegistryGenerator.#buildRegistryJson( {
            registryType: 'crypto',
            description: 'Official FlowMCP community schemas - Crypto & DeFi',
            entries: cryptoEntries
        } )

        const osintRegistry = RegistryGenerator.#buildRegistryJson( {
            registryType: 'osint',
            description: 'Official FlowMCP community schemas - Research, News & Social',
            entries: osintEntries
        } )

        const allRegistry = RegistryGenerator.#buildRegistryJson( {
            registryType: 'all',
            description: 'Official FlowMCP community schemas - Complete Collection',
            entries: allEntries
        } )

        RegistryGenerator.#writeJson( {
            filePath: path.join( OUTPUT_DIR, 'flowmcp-registry-starter.json' ),
            data: starterRegistry
        } )

        RegistryGenerator.#writeJson( {
            filePath: path.join( OUTPUT_DIR, 'flowmcp-registry-crypto.json' ),
            data: cryptoRegistry
        } )

        RegistryGenerator.#writeJson( {
            filePath: path.join( OUTPUT_DIR, 'flowmcp-registry-osint.json' ),
            data: osintRegistry
        } )

        RegistryGenerator.#writeJson( {
            filePath: path.join( OUTPUT_DIR, 'flowmcp-registry.json' ),
            data: allRegistry
        } )

        RegistryGenerator.#writeJson( {
            filePath: path.join( REPO_ROOT, 'flowmcp-registry.json' ),
            data: allRegistry
        } )

        console.log( '\nDone.' )
    }
}


RegistryGenerator.generate().catch( ( err ) => {
    console.error( 'Registry generation failed:', err )
    process.exit( 1 )
} )
