import { readdir } from 'fs/promises'
import { join } from 'path'

const batch6 = [
    'dip-bundestag', 'pvgis', 'sensor-community', 'entgeltatlas', 'opencellid',
    'scite-ai', 'lens-org', 'regionalatlas', 'regionalstatistik', 'patentsview',
    'openrouteservice', 'igdb', 'wto-timeseries', 'connected-papers',
    'uba-luftqualitaet', 'genesis-destatis'
]

let total = 0, errors = [], totalRoutes = 0

for( const dir of batch6 ) {
    const base = 'tests/new-schemas'
    const files = await readdir( join( base, dir ) ).catch( () => [] )
    const mjsFiles = files.filter( ( f ) => f.endsWith( '.mjs' ) )
    if( mjsFiles.length === 0 ) { errors.push( `${dir}: No .mjs files found` ); continue }

    for( const f of mjsFiles ) {
        total++
        const path = join( base, dir, f )
        try {
            const mod = await import( new URL( '../' + path, import.meta.url ).href )
            const s = mod.main || mod.schema
            if( !s ) { errors.push( path + ': No export main found' ); continue }
            if( s.version !== '2.0.0' ) { errors.push( path + ': version=' + (s.version || 'missing') ); continue }
            if( !/^[a-zA-Z]+$/.test( s.namespace ) ) { errors.push( path + ': invalid namespace "' + s.namespace + '"' ); continue }
            const routes = Object.keys( s.routes || {} )
            if( routes.length === 0 ) { errors.push( path + ': no routes' ); continue }
            if( routes.length > 10 ) { errors.push( path + ': too many routes (' + routes.length + ')' ); continue }

            // Check each route
            let routeOk = true
            for( const rName of routes ) {
                const r = s.routes[rName]
                if( !r.method ) { errors.push( path + '.' + rName + ': missing method' ); routeOk = false }
                if( !r.path ) { errors.push( path + '.' + rName + ': missing path' ); routeOk = false }
                if( !r.description ) { errors.push( path + '.' + rName + ': missing description' ); routeOk = false }
                if( !r.tests || r.tests.length === 0 ) { errors.push( path + '.' + rName + ': missing tests' ); routeOk = false }
                if( !r.output ) { errors.push( path + '.' + rName + ': missing output' ); routeOk = false }
            }
            if( !routeOk ) { continue }

            totalRoutes += routes.length
            const pad = s.namespace.padEnd( 30 )
            console.log( `  OK  ${pad} ${routes.length} routes  ${path}` )
        } catch( e ) {
            errors.push( path + ': ' + e.message.split('\n')[0] )
        }
    }
}

console.log( '\n--- SUMMARY ---' )
console.log( `Schemas: ${total}` )
console.log( `Total Routes: ${totalRoutes}` )
console.log( `Errors: ${errors.length}` )
if( errors.length > 0 ) {
    console.log( '\nERRORS:' )
    errors.forEach( ( e ) => console.log( '  ✗ ' + e ) )
    process.exit( 1 )
}
