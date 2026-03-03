import { readdir } from 'fs/promises'
import { join } from 'path'

const base = 'tests/new-schemas'
const newDirs = ['open-notify','tmdb','discogs','openalex','semantic-scholar','orcid','unpaywall','opencitations','europe-pmc','nih-reporter','altmetric','core','iucn-red-list','openaire','omim','deutsche-digitale-bibliothek','kegg','retraction-watch','chembl']

const errors = []
let total = 0
let totalRoutes = 0
const cacheTags = ['cacheTtlRealtime','cacheTtlFrequent','cacheTtlDaily','cacheTtlStatic']

for( const dir of newDirs ) {
    const files = await readdir( join( base, dir ) ).catch( () => [] )
    for( const f of files ) {
        if( f.indexOf('.mjs') === -1 ) { continue }
        total++
        const path = join( base, dir, f )
        try {
            const mod = await import( new URL( '../' + path, import.meta.url ).href )
            const s = mod.main || mod.schema
            if( !s ) { errors.push( path + ': No export main found' ); continue }
            if( s.version !== '2.0.0' ) { errors.push( path + ': version=' + (s.version || s.flowMCP || 'missing') ) }
            if( !/^[a-zA-Z]+$/.test(s.namespace) ) { errors.push( path + ': invalid namespace: ' + s.namespace ) }
            if( !s.root ) { errors.push( path + ': missing root' ) }
            if( !Array.isArray(s.requiredServerParams) ) { errors.push( path + ': requiredServerParams not array' ) }
            const hasCacheTag = (s.tags || []).some( ( t ) => cacheTags.includes(t) )
            if( !hasCacheTag ) { errors.push( path + ': missing cache tag' ) }
            const routes = Object.entries(s.routes || {})
            if( routes.length === 0 ) { errors.push( path + ': no routes' ) }
            if( routes.length > 10 ) { errors.push( path + ': too many routes (' + routes.length + ')' ) }
            totalRoutes += routes.length
            routes.forEach( ( [name, r] ) => {
                if( !r.method ) { errors.push( path + '.' + name + ': missing method' ) }
                if( !r.path ) { errors.push( path + '.' + name + ': missing path' ) }
                if( r.route ) { errors.push( path + '.' + name + ': v1.2.0 route key' ) }
                if( r.requestMethod ) { errors.push( path + '.' + name + ': v1.2.0 requestMethod' ) }
                if( !r.description ) { errors.push( path + '.' + name + ': missing description' ) }
                if( !Array.isArray(r.parameters) ) { errors.push( path + '.' + name + ': parameters not array' ) }
                if( !Array.isArray(r.tests) || r.tests.length === 0 ) { errors.push( path + '.' + name + ': missing tests' ) }
                if( !r.output ) { errors.push( path + '.' + name + ': missing output block' ) }
                if( r.modifiers ) { errors.push( path + '.' + name + ': v1.2.0 modifiers' ) }
            } )
            console.log( '  OK  ' + s.namespace.padEnd(30) + routes.length + ' routes  ' + path )
        } catch(e) {
            errors.push( path + ': import error: ' + e.message )
        }
    }
}

console.log( '' )
console.log( '--- SUMMARY ---' )
console.log( 'Schemas: ' + total )
console.log( 'Total Routes: ' + totalRoutes )
console.log( 'Errors: ' + errors.length )
if( errors.length > 0 ) {
    console.log( '' )
    console.log( 'ERRORS:' )
    errors.forEach( ( e ) => { console.log( '  X  ' + e ) } )
}
