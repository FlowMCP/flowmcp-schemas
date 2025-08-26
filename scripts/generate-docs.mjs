import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SchemaImporter } from '../src/index.mjs'


const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )


class DocsGenerator {
    static async generateDocs() {
        console.log( '📚 Starting FlowMCP Documentation Generation...\n' )
        
        const schemasData = await this.#collectAllSchemas()
        const processedData = this.#processSchemas( { schemas: schemasData } )
        
        this.#saveDataToFile( { data: processedData } )
        this.#generateHTMLFile( { data: processedData } )
        
        console.log( '\n✅ Documentation generated successfully!' )
        console.log( `📁 Output: ${path.resolve( __dirname, '../docs/' )}` )
    }


    static async #collectAllSchemas() {
        console.log( '🔍 Collecting schemas from v1.2.0...' )
        
        const schemas = await SchemaImporter.loadFromFolder( {
            schemaRootFolder: '../schemas/v1.2.0/',
            excludeSchemasWithImports: false,
            excludeSchemasWithRequiredServerParams: false,
            addAdditionalMetaData: true,
            outputType: null
        } )
        
        console.log( `✓ Found ${schemas.length} schemas` )
        
        return schemas
    }


    static #processSchemas( { schemas } ) {
        console.log( '⚙️  Processing schema data...' )
        
        const processedSchemas = schemas.map( ( item ) => {
            const { schema, absolutePath, schemaFolder, fileName } = item
            const { 
                namespace, 
                name, 
                description, 
                tags = [], 
                docs = [], 
                flowMCP = '1.2.0',
                requiredServerParams = [],
                routes = {}
            } = schema
            
            // Build relative path for GitHub link
            const relativePath = `${schemaFolder}/${fileName}`
            const githubUrl = `https://github.com/FlowMCP/flowmcp-schemas/blob/main/schemas/v${flowMCP}/${relativePath}`
            
            // Process routes
            const processedRoutes = {}
            Object.entries( routes ).forEach( ( [ routeName, route ] ) => {
                processedRoutes[ routeName ] = {
                    requestMethod: route.requestMethod || 'GET',
                    description: route.description || '',
                    route: route.route || '',
                    hasTests: route.tests && route.tests.length > 0
                }
            } )
            
            return {
                namespace,
                name,
                description,
                tags,
                docs,
                flowMCP,
                requiredServerParams,
                hasApiKey: requiredServerParams.length > 0,
                path: relativePath,
                githubUrl,
                routes: processedRoutes,
                routeCount: Object.keys( processedRoutes ).length
            }
        } )
        
        // Sort by namespace
        processedSchemas.sort( ( a, b ) => a.namespace.localeCompare( b.namespace ) )
        
        console.log( `✓ Processed ${processedSchemas.length} schemas` )
        
        // Generate statistics
        const stats = {
            totalSchemas: processedSchemas.length,
            totalRoutes: processedSchemas.reduce( ( acc, s ) => acc + s.routeCount, 0 ),
            schemasWithApiKeys: processedSchemas.filter( s => s.hasApiKey ).length,
            namespaces: [ ...new Set( processedSchemas.map( s => s.namespace ) ) ].length,
            generatedAt: new Date().toISOString()
        }
        
        return { schemas: processedSchemas, stats }
    }


    static #saveDataToFile( { data } ) {
        console.log( '💾 Saving schema data to JSON...' )
        
        const outputPath = path.resolve( __dirname, '../docs/schemas-data.json' )
        
        // Ensure docs directory exists
        const docsDir = path.dirname( outputPath )
        if( !fs.existsSync( docsDir ) ) {
            fs.mkdirSync( docsDir, { recursive: true } )
        }
        
        fs.writeFileSync( outputPath, JSON.stringify( data, null, 2 ) )
        
        console.log( `✓ Saved to: ${outputPath}` )
    }


    static #generateHTMLFile( { data } ) {
        console.log( '🎨 Generating HTML documentation...' )
        
        const htmlContent = this.#createHTMLTemplate( { data } )
        const outputPath = path.resolve( __dirname, '../docs/index.html' )
        
        fs.writeFileSync( outputPath, htmlContent )
        
        console.log( `✓ Generated: ${outputPath}` )
    }


    static #createHTMLTemplate( { data } ) {
        const { schemas, stats } = data
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlowMCP Schema Documentation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --card-bg: white;
            --text-primary: #2d3748;
            --text-secondary: #718096;
            --border-color: #e2e8f0;
            --hover-shadow: 0 15px 40px rgba(0,0,0,0.15);
            --success-color: #48bb78;
            --warning-color: #ed8936;
            --info-color: #4299e1;
            --danger-color: #f56565;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: var(--primary-gradient);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1600px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            color: white;
            margin-bottom: 40px;
        }

        h1 {
            font-size: 3rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .subtitle {
            font-size: 1.2rem;
            opacity: 0.95;
            margin-bottom: 20px;
        }

        .stats-bar {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
            margin-bottom: 30px;
        }

        .stat-item {
            background: rgba(255,255,255,0.2);
            padding: 10px 20px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
        }

        .stat-number {
            font-size: 1.8rem;
            font-weight: bold;
        }

        .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }

        .search-container {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
        }

        .search-box {
            width: 100%;
            max-width: 500px;
            padding: 15px 25px;
            border: none;
            border-radius: 30px;
            font-size: 1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .search-box:focus {
            outline: none;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }

        .schemas-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
            gap: 25px;
        }

        .schema-card {
            background: var(--card-bg);
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
        }

        .schema-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--hover-shadow);
        }

        .schema-header {
            border-bottom: 2px solid var(--border-color);
            padding-bottom: 15px;
            margin-bottom: 20px;
        }

        .schema-namespace {
            display: inline-block;
            background: var(--primary-gradient);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .api-key-badge {
            display: inline-block;
            background: var(--warning-color);
            color: white;
            padding: 4px 10px;
            border-radius: 15px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-left: 10px;
        }

        .schema-name {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 10px;
        }

        .schema-description {
            color: var(--text-secondary);
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 15px;
        }

        .schema-meta {
            display: flex;
            gap: 8px;
            margin-bottom: 15px;
            flex-wrap: wrap;
        }

        .schema-tag {
            background: #f7fafc;
            color: #4a5568;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 500;
            border: 1px solid var(--border-color);
        }

        .schema-path {
            font-size: 0.85rem;
            color: #a0aec0;
            font-family: 'Monaco', 'Courier New', monospace;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .schema-path a {
            color: #667eea;
            text-decoration: none;
            word-break: break-all;
        }

        .schema-path a:hover {
            text-decoration: underline;
        }

        .routes-section {
            margin-top: 20px;
        }

        .routes-header {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .route-count {
            background: #667eea;
            color: white;
            padding: 3px 10px;
            border-radius: 15px;
            font-size: 0.8rem;
        }

        .route-item {
            background: #f8fafc;
            border-left: 3px solid #667eea;
            padding: 12px;
            margin-bottom: 10px;
            border-radius: 0 8px 8px 0;
            transition: all 0.2s ease;
        }

        .route-item:hover {
            background: #edf2f7;
            border-left-width: 5px;
        }

        .route-id {
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .route-method {
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
        }

        .method-get { background: var(--success-color); color: white; }
        .method-post { background: var(--info-color); color: white; }
        .method-put { background: var(--warning-color); color: white; }
        .method-delete { background: var(--danger-color); color: white; }
        .method-patch { background: #805ad5; color: white; }

        .route-description {
            font-size: 0.85rem;
            color: var(--text-secondary);
            line-height: 1.4;
            margin-bottom: 4px;
        }

        .route-path {
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.75rem;
            color: #a0aec0;
            word-break: break-all;
        }

        .no-routes {
            color: #a0aec0;
            font-style: italic;
            font-size: 0.9rem;
        }

        .docs-links {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid var(--border-color);
        }

        .docs-link {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            color: #667eea;
            text-decoration: none;
            font-size: 0.85rem;
            margin-right: 15px;
        }

        .docs-link:hover {
            text-decoration: underline;
        }

        footer {
            text-align: center;
            color: white;
            margin-top: 60px;
            padding: 20px;
            opacity: 0.9;
        }

        @media (max-width: 768px) {
            .schemas-grid {
                grid-template-columns: 1fr;
            }
            
            h1 {
                font-size: 2rem;
            }

            .stat-item {
                padding: 8px 15px;
            }

            .stat-number {
                font-size: 1.4rem;
            }
        }

        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px;
            background: white;
            border-radius: 16px;
            color: var(--text-secondary);
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🚀 FlowMCP Schema Documentation</h1>
            <p class="subtitle">Comprehensive API Schema Registry for FlowMCP</p>
            
            <div class="stats-bar">
                <div class="stat-item">
                    <div class="stat-number">${stats.totalSchemas}</div>
                    <div class="stat-label">Schemas</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.totalRoutes}</div>
                    <div class="stat-label">Routes</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.namespaces}</div>
                    <div class="stat-label">Namespaces</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.schemasWithApiKeys}</div>
                    <div class="stat-label">Require API Key</div>
                </div>
            </div>
        </header>

        <div class="search-container">
            <input 
                type="text" 
                class="search-box" 
                id="searchBox"
                placeholder="Search schemas, namespaces, routes, or descriptions..."
            />
        </div>

        <div class="schemas-grid" id="schemasContainer">
            <!-- Schemas will be inserted here -->
        </div>
    </div>

    <footer>
        <p>Generated on ${new Date( stats.generatedAt ).toLocaleString()}</p>
        <p>FlowMCP Schema Documentation © ${new Date().getFullYear()}</p>
    </footer>

    <script>
        // Embedded schema data
        const schemaData = ${JSON.stringify( data, null, 2 )};
        
        function renderSchemas( schemasToRender = schemaData.schemas ) {
            const container = document.getElementById( 'schemasContainer' );
            container.innerHTML = '';
            
            if( schemasToRender.length === 0 ) {
                container.innerHTML = '<div class="no-results"><h2>No schemas found</h2><p>Try adjusting your search terms</p></div>';
                return;
            }
            
            schemasToRender.forEach( schema => {
                const card = createSchemaCard( schema );
                container.appendChild( card );
            } );
        }

        function createSchemaCard( schema ) {
            const card = document.createElement( 'div' );
            card.className = 'schema-card';
            
            const routeEntries = Object.entries( schema.routes );
            
            let docsLinksHtml = '';
            if( schema.docs && schema.docs.length > 0 ) {
                docsLinksHtml = '<div class="docs-links">';
                schema.docs.forEach( doc => {
                    docsLinksHtml += \`<a href="\${doc}" target="_blank" class="docs-link">📖 Documentation</a>\`;
                } );
                docsLinksHtml += '</div>';
            }
            
            card.innerHTML = \`
                <div class="schema-header">
                    <div>
                        <span class="schema-namespace">\${schema.namespace}</span>
                        \${schema.hasApiKey ? '<span class="api-key-badge">🔐 API Key Required</span>' : ''}
                    </div>
                    <div class="schema-name">\${schema.name}</div>
                    <div class="schema-description">\${schema.description}</div>
                    \${schema.tags.length > 0 ? \`
                        <div class="schema-meta">
                            \${schema.tags.map( tag => \`<span class="schema-tag">\${tag}</span>\` ).join( '' )}
                        </div>
                    \` : ''}
                    <div class="schema-path">
                        📁 <a href="\${schema.githubUrl}" target="_blank" title="View on GitHub">\${schema.path}</a>
                    </div>
                </div>
                
                <div class="routes-section">
                    <div class="routes-header">
                        📍 Available Routes
                        <span class="route-count">\${schema.routeCount}</span>
                    </div>
                    \${routeEntries.length > 0 ? 
                        routeEntries.map( ( [ routeName, route ] ) => \`
                            <div class="route-item">
                                <div class="route-id">
                                    \${schema.namespace}.\${routeName}
                                    <span class="route-method method-\${route.requestMethod.toLowerCase()}">\${route.requestMethod}</span>
                                    \${route.hasTests ? '<span style="color: #48bb78; font-size: 0.8rem;">✓ Tested</span>' : ''}
                                </div>
                                <div class="route-description">\${route.description || 'No description available'}</div>
                                <div class="route-path">\${route.route}</div>
                            </div>
                        \` ).join( '' ) : 
                        '<div class="no-routes">No routes defined</div>'
                    }
                </div>
                
                \${docsLinksHtml}
            \`;
            
            return card;
        }
        
        // Search functionality
        document.getElementById( 'searchBox' ).addEventListener( 'input', function( e ) {
            const searchTerm = e.target.value.toLowerCase();
            
            if( searchTerm === '' ) {
                renderSchemas();
                return;
            }
            
            const filteredSchemas = schemaData.schemas.filter( schema => {
                // Search in namespace
                if( schema.namespace.toLowerCase().includes( searchTerm ) ) return true;
                
                // Search in name
                if( schema.name.toLowerCase().includes( searchTerm ) ) return true;
                
                // Search in description
                if( schema.description.toLowerCase().includes( searchTerm ) ) return true;
                
                // Search in tags
                if( schema.tags.some( tag => tag.toLowerCase().includes( searchTerm ) ) ) return true;
                
                // Search in route names
                const routeNames = Object.keys( schema.routes );
                if( routeNames.some( name => name.toLowerCase().includes( searchTerm ) ) ) return true;
                
                // Search in route descriptions
                const routeDescriptions = Object.values( schema.routes ).map( r => r.description );
                if( routeDescriptions.some( desc => desc.toLowerCase().includes( searchTerm ) ) ) return true;
                
                return false;
            } );
            
            renderSchemas( filteredSchemas );
        } );
        
        // Initial render
        document.addEventListener( 'DOMContentLoaded', () => renderSchemas() );
    </script>
</body>
</html>`
    }
}


// Run generator
DocsGenerator.generateDocs().catch( console.error )