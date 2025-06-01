class Print {

    static getConfig() {
        return {
            keyColWidth: 30,
            valColWidth: 10,
            labels: {
                namespaces: 'Unique namespaces',
                totalFiles: 'Total files',
                totalRoutes: 'Total routes',
                totalWithImport: 'Files with schema import',
                totalWithServerParams: 'Files with server params'
            }
        }
    }


    static pad( str, length ) {
        return String( str ).padEnd( length, ' ' )
    }


    static padRight( str, length ) {
        return String( str ).padStart( length, ' ' )
    }


    static headline( text ) {
        console.log( `\n📊 ${text}\n` )

        return this
    }

    static header() {
        const { keyColWidth, valColWidth } = Print.getConfig()
        console.log( Print.pad( 'Metric', keyColWidth ) + '|' + Print.padRight( 'Value', valColWidth ) )
        console.log('-'.repeat( keyColWidth ) + '+' + '-'.repeat( valColWidth ) )

        return this
    }


    static row( { key, value } ) {
        const { keyColWidth, valColWidth} = Print.getConfig()
        const label = Print.getConfig().labels[ key ] || key
        console.log(Print.pad( label, keyColWidth ) + '|' + Print.padRight(value, valColWidth ) )
    }
}


export { Print }