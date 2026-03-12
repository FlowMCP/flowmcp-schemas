import { v2 } from 'flowmcp'

const { MainValidator } = v2

const schemas = [
    'bfs-odl/bfsodl',
    'catalogue-of-life/catalogueoflife',
    'gutendex/gutendex',
    'met-museum/metMuseum',
    'musicbrainz/musicBrainz',
    'nasa-apod/nasaapod',
    'nasa-neows/nasaneows',
    'nhtsa-recalls/nhtsaRecalls',
    'nhtsa-vpic/nhtsaVpic',
    'nina-warn-app/ninaWarnApp',
    'nvd-cve/nvdCve',
    'open-food-facts/openFoodFacts',
    'open-library/openLibrary',
    'pegelonline/pegelonline',
    'shodan-internetdb/shodaninternetdb',
    'spacex-api/spacexApi',
    'usgs-earthquake/usgsEarthquake',
    'vanda-museum/vanda',
    'world-bank/worldBank'
]

const base = new URL( '../tests/new-schemas/', import.meta.url ).href

let passCount = 0
let failCount = 0

for( const s of schemas ) {
    try {
        const mod = await import( base + s + '.mjs' )
        const main = mod.main || mod.schema
        const result = MainValidator.validate( { main } )
        const label = s.split( '/' )[1]

        if( result.status ) {
            console.log( 'PASS ' + label )
            passCount++
        } else {
            console.log( 'FAIL ' + label )
            result.messages.forEach( ( msg ) => console.log( '  ERROR: ' + msg ) )
            failCount++
        }
    } catch( e ) {
        console.log( 'LOAD_ERROR ' + s + ': ' + e.message )
        failCount++
    }
}

console.log( '' )
console.log( 'Results: ' + passCount + ' passed, ' + failCount + ' failed' )
