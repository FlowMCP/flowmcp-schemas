import { readdir } from 'fs/promises'
import { join } from 'path'

const batch5 = ['open-notify','tmdb','discogs','openalex','semantic-scholar','orcid','unpaywall','opencitations','europe-pmc','nih-reporter','altmetric','core','iucn-red-list','openaire','omim','deutsche-digitale-bibliothek','kegg','retraction-watch','chembl']

const b5ns = []
for( const dir of batch5 ) {
    const files = await readdir( join( 'tests/new-schemas', dir ) )
    for( const f of files ) {
        if( f.indexOf( '.mjs' ) === -1 ) { continue }
        const mod = await import( new URL( join( 'tests/new-schemas', dir, f ), 'file://' + process.cwd() + '/' ).href )
        if( mod.main ) { b5ns.push( { ns: mod.main.namespace, dir, file: f } ) }
    }
}

const prodDirs = await readdir( 'schemas/v3.0.0' )
const prodNs = []
for( const dir of prodDirs ) {
    if( dir.startsWith( '_' ) || dir.startsWith( '.' ) || dir.endsWith( '.md' ) ) { continue }
    const files = await readdir( join( 'schemas/v3.0.0', dir ) ).catch( () => [] )
    for( const f of files ) {
        if( f.indexOf( '.mjs' ) === -1 ) { continue }
        try {
            const mod = await import( new URL( join( 'schemas/v3.0.0', dir, f ), 'file://' + process.cwd() + '/' ).href )
            if( mod.main ) { prodNs.push( mod.main.namespace ) }
        } catch( e ) { /* skip */ }
    }
}

const collisions = b5ns.filter( ( b ) => prodNs.includes( b.ns ) )
console.log( 'Batch 5 namespaces:', b5ns.map( ( b ) => b.ns ).join( ', ' ) )
console.log( '' )
console.log( 'Collisions with production:', collisions.length )
collisions.forEach( ( c ) => { console.log( '  COLLISION:', c.ns, '(' + c.dir + ')' ) } )
