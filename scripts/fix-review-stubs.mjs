import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )
const v2Dir = path.resolve( __dirname, '../schemas/v2.0.0' )

const MIGRATE = process.argv.includes( '--migrate' )

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
                if( content.includes( '/* REVIEW: v1_struct */' ) ) {
                    files.push( fullPath )
                }
            }
        } )
}
walk( v2Dir )

console.log( `\nFound ${files.length} files with REVIEW stubs\n` )

let totalFixes = 0

files
    .forEach( ( filePath ) => {
        const relPath = path.relative( v2Dir, filePath )
        let content = fs.readFileSync( filePath, 'utf8' )
        let fixes = 0

        // Pattern A: error block with status=false + messages.push + return
        // Handles: alchemy, infura, moralis, ens
        const patternA = /(\s*)\/\* REVIEW: v1_struct \*\/\.status\s*=\s*false\s*\n\s*\/\* REVIEW: v1_struct \*\/\.messages\.push\(\s*(.+?)\s*\)\s*\n\s*return\s*\{\s*struct\s*\}\s*\}/g
        const countA = ( content.match( patternA ) || [] ).length
        content = content.replace( patternA, ( _, indent, msg ) => {
            fixes += 2
            return `${indent}throw new Error( ${msg} )\n${indent}}`
        } )

        // Pattern B: in catch block — status=false + messages.push (no return after)
        // Handles: talent-protocol
        const patternB = /(\s*)\/\* REVIEW: v1_struct \*\/\.status\s*=\s*false\s*\n\s*\/\* REVIEW: v1_struct \*\/\.messages\.push\(\s*(.+?)\s*\)\s*\n(\s*\})/g
        const countB = ( content.match( patternB ) || [] ).length
        content = content.replace( patternB, ( _, indent, msg, closing ) => {
            fixes += 2
            return `${indent}throw new Error( ${msg} )\n${closing}`
        } )

        // Pattern C: return with v1_struct in object
        // return { /* REVIEW: v1_struct */, struct, payload }
        // → return { struct }
        const patternC = /return\s*\{\s*\/\* REVIEW: v1_struct \*\/\s*,\s*struct\s*,\s*payload\s*\}/g
        const countC = ( content.match( patternC ) || [] ).length
        content = content.replace( patternC, () => {
            fixes++
            return 'return { struct }'
        } )

        // Pattern D: destructuring — const { /* REVIEW: v1_struct */, payload } = a
        // This is a preRequest that destructured v1's { struct, payload }
        // In v2, preRequest already has struct/payload as params, so remove the destructuring
        const patternD = /const\s*\{\s*\/\* REVIEW: v1_struct \*\/\s*,\s*(\w+)\s*\}\s*=\s*(\w+)\s*\n/g
        const countD = ( content.match( patternD ) || [] ).length
        content = content.replace( patternD, () => {
            fixes++
            return ''
        } )

        // Pattern E: v1_struct.data = { ... } → struct.data = { ... }
        // This is for execute-like handlers where struct.data is valid
        const patternE = /\/\* REVIEW: v1_struct \*\/\.data\b/g
        const countE = ( content.match( patternE ) || [] ).length
        content = content.replace( patternE, () => {
            fixes++
            return 'struct.data'
        } )

        // Pattern F: remaining v1_struct.status (standalone, not in error block)
        const patternF = /\/\* REVIEW: v1_struct \*\/\.status\s*=\s*true/g
        const countF = ( content.match( patternF ) || [] ).length
        content = content.replace( patternF, () => {
            fixes++
            return 'struct.status = true'
        } )

        // Catch any remaining REVIEW markers
        const remaining = ( content.match( /\/\* REVIEW: v1_struct \*\//g ) || [] ).length

        console.log( `  ${relPath}:  A=${countA} B=${countB} C=${countC} D=${countD} E=${countE} F=${countF}  remaining=${remaining}` )

        if( MIGRATE && fixes > 0 ) {
            fs.writeFileSync( filePath, content, 'utf8' )
            console.log( `    → written (${fixes} fixes)` )
        }

        totalFixes += fixes
    } )

console.log( `\nTotal fixes: ${totalFixes}` )
console.log( `Mode: ${MIGRATE ? 'WRITTEN' : 'DRY RUN'}` )
