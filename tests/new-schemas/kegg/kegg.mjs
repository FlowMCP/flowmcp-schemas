export const main = {
    namespace: 'kegg',
    name: 'KEGG',
    description: 'Access the Kyoto Encyclopedia of Genes and Genomes (KEGG) for biological pathways, genes, compounds, reactions, diseases, and drugs. Returns tab-separated plain text.',
    version: '2.0.0',
    docs: ['https://www.kegg.jp/kegg/rest/keggapi.html'],
    tags: ['biology', 'genomics', 'pathways', 'compounds', 'science', 'cacheTtlDaily'],
    root: 'https://rest.kegg.jp',
    requiredServerParams: [],
    headers: {},
    routes: {
        getInfo: {
            method: 'GET',
            path: '/info/:database',
            description: 'Get database release information and statistics for a KEGG database. Returns database name, release version, entry counts, and organization info.',
            parameters: [
                { position: { key: 'database', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(kegg,pathway,brite,module,ko,genome,compound,glycan,reaction,rclass,enzyme,network,variant,disease,drug,dgroup)', options: [] } }
            ],
            tests: [
                { _description: 'Get KEGG database info', database: 'kegg' }
            ],
            output: {
                mimeType: 'text/plain',
                schema: { type: 'string' }
            },
        },
        listEntries: {
            method: 'GET',
            path: '/list/:database',
            description: 'List all entries in a KEGG database. Returns tab-separated lines with entry identifiers and descriptions. For pathway and brite, use organism code to filter by species.',
            parameters: [
                { position: { key: 'database', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(pathway,brite,module,ko,genome,compound,glycan,reaction,rclass,enzyme,network,variant,disease,drug,dgroup,organism)', options: [] } }
            ],
            tests: [
                { _description: 'List all KEGG pathways', database: 'pathway' },
                { _description: 'List all organisms', database: 'organism' }
            ],
            output: {
                mimeType: 'text/plain',
                schema: { type: 'string' }
            },
        },
        listByOrganism: {
            method: 'GET',
            path: '/list/:database/:organism',
            description: 'List entries in a KEGG database filtered by organism code (e.g., hsa for human, mmu for mouse, eco for E. coli).',
            parameters: [
                { position: { key: 'database', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(pathway,brite,module)', options: [] } },
                { position: { key: 'organism', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'List human pathways', database: 'pathway', organism: 'hsa' }
            ],
            output: {
                mimeType: 'text/plain',
                schema: { type: 'string' }
            },
        },
        findEntries: {
            method: 'GET',
            path: '/find/:database/:query',
            description: 'Search for entries in a KEGG database by keyword. Returns tab-separated results with matching entry IDs and descriptions.',
            parameters: [
                { position: { key: 'database', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(pathway,brite,module,ko,genome,genes,compound,glycan,reaction,rclass,enzyme,network,variant,disease,drug,dgroup)', options: [] } },
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Find compounds matching glucose', database: 'compound', query: 'glucose' },
                { _description: 'Find pathways related to cancer', database: 'pathway', query: 'cancer' }
            ],
            output: {
                mimeType: 'text/plain',
                schema: { type: 'string' }
            },
        },
        getEntry: {
            method: 'GET',
            path: '/get/:dbentries',
            description: 'Retrieve full KEGG flat-file entries by their identifiers. Accepts up to 10 entries separated by + (e.g., C00031+C00032). Returns detailed record with all fields.',
            parameters: [
                { position: { key: 'dbentries', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get D-Glucose compound entry', dbentries: 'C00031' },
                { _description: 'Get glycolysis pathway entry', dbentries: 'map00010' }
            ],
            output: {
                mimeType: 'text/plain',
                schema: { type: 'string' }
            },
        },
        linkEntries: {
            method: 'GET',
            path: '/link/:targetDb/:sourceDb',
            description: 'Find cross-references between two KEGG databases. Returns tab-separated pairs of linked entry identifiers. Example: link enzymes to a pathway.',
            parameters: [
                { position: { key: 'targetDb', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(pathway,brite,module,ko,genome,compound,glycan,reaction,rclass,enzyme,network,variant,disease,drug,dgroup)', options: [] } },
                { position: { key: 'sourceDb', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Link enzymes to glycolysis pathway', targetDb: 'enzyme', sourceDb: 'pathway:map00010' }
            ],
            output: {
                mimeType: 'text/plain',
                schema: { type: 'string' }
            },
        },
        convertIds: {
            method: 'GET',
            path: '/conv/:targetDb/:sourceDb',
            description: 'Convert between KEGG identifiers and external database IDs. Supports conversions to/from ncbi-geneid, ncbi-proteinid, uniprot, pubchem, and chebi.',
            parameters: [
                { position: { key: 'targetDb', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'sourceDb', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Convert a human gene to NCBI gene ID', targetDb: 'ncbi-geneid', sourceDb: 'hsa:10458' }
            ],
            output: {
                mimeType: 'text/plain',
                schema: { type: 'string' }
            },
        },
        getDrugInteractions: {
            method: 'GET',
            path: '/ddi/:dbentry',
            description: 'Get drug-drug interaction information for a specific drug. Returns tab-separated interaction pairs with interaction type (CI=contraindicated, P=precaution) and target information.',
            parameters: [
                { position: { key: 'dbentry', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get drug interactions for Aspirin', dbentry: 'D00316' }
            ],
            output: {
                mimeType: 'text/plain',
                schema: { type: 'string' }
            },
        }
    }
}
