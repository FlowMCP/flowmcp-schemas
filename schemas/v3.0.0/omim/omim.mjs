export const main = {
    namespace: 'omim',
    name: 'OMIM',
    description: 'Access Online Mendelian Inheritance in Man (OMIM), a catalog of 16,000+ human genes and genetic disorders. Search entries, gene maps, clinical synopses, allelic variants, and references.',
    version: '3.0.0',
    docs: ['https://omim.org/help/api'],
    tags: ['science', 'genetics', 'medicine', 'health', 'genomics', 'cacheTtlDaily'],
    root: 'https://api.omim.org',
    requiredServerParams: ['OMIM_API_KEY'],
    headers: {},
    tools: {
        getEntry: {
            method: 'GET',
            path: '/api/entry',
            description: 'Retrieve one or more OMIM entries by MIM number. Optionally include text, gene map, clinical synopsis, allelic variants, references, and external links.',
            parameters: [
                { position: { key: 'mimNumber', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'include', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(text,existFlags,allelicVariantList,clinicalSynopsis,seeAlso,referenceList,geneMap,externalLinks,contributors,creationDate,editHistory,dates,all)', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'apiKey', value: '{{SERVER_PARAM:OMIM_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get OMIM entry for Sickle Cell Anemia with text', mimNumber: '603903', include: 'text' },
                { _description: 'Get OMIM entry for BRCA1 with gene map', mimNumber: '113705', include: 'geneMap' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        omim: { type: 'object', properties: { entryList: { type: 'array', items: { type: 'object', properties: { entry: { type: 'object', properties: { mimNumber: { type: 'number' }, status: { type: 'string' }, titles: { type: 'object' } } } } } } } }
                    }
                }
            },
        },
        searchEntries: {
            method: 'GET',
            path: '/api/entry/search',
            description: 'Search OMIM entries by keyword query. Returns matching entries with optional includes for gene map, clinical synopsis, and more. Supports pagination.',
            parameters: [
                { position: { key: 'search', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'include', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(text,existFlags,allelicVariantList,clinicalSynopsis,seeAlso,referenceList,geneMap,externalLinks,all)', options: ['optional()'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(20)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'apiKey', value: '{{SERVER_PARAM:OMIM_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search for Duchenne muscular dystrophy', search: 'duchenne', limit: 5 },
                { _description: 'Search for diabetes-related genes', search: 'diabetes', include: 'geneMap', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        omim: { type: 'object', properties: { searchResponse: { type: 'object', properties: { totalResults: { type: 'number' }, startIndex: { type: 'number' }, endIndex: { type: 'number' }, entryList: { type: 'array' } } } } }
                    }
                }
            },
        },
        searchGeneMap: {
            method: 'GET',
            path: '/api/geneMap/search',
            description: 'Search the OMIM gene map for genes and loci by keyword. Returns chromosomal location, gene symbols, inheritance patterns, and associated phenotypes.',
            parameters: [
                { position: { key: 'search', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'apiKey', value: '{{SERVER_PARAM:OMIM_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search gene map for kinase genes', search: 'kinase', limit: 5 },
                { _description: 'Search gene map for tumor suppressor', search: 'tumor suppressor', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        omim: { type: 'object', properties: { searchResponse: { type: 'object', properties: { totalResults: { type: 'number' }, geneMapList: { type: 'array' } } } } }
                    }
                }
            },
        },
        getGeneMapByChromosome: {
            method: 'GET',
            path: '/api/geneMap',
            description: 'Get gene map entries for a specific chromosome. Returns genes/loci with chromosomal positions, symbols, and phenotype associations. Chromosomes: 1-22, X, Y, M (mitochondrial).',
            parameters: [
                { position: { key: 'chromosome', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,X,Y,M)', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(100)'] } },
                { position: { key: 'phenotypeExists', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'boolean()', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'apiKey', value: '{{SERVER_PARAM:OMIM_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get gene map entries for chromosome 21', chromosome: '21', limit: 10 },
                { _description: 'Get X chromosome genes with phenotypes', chromosome: 'X', phenotypeExists: true, limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        omim: { type: 'object', properties: { geneMapList: { type: 'array', items: { type: 'object', properties: { geneMap: { type: 'object', properties: { chromosomeSymbol: { type: 'string' }, geneSymbols: { type: 'string' }, geneName: { type: 'string' }, mimNumber: { type: 'number' } } } } } } } }
                    }
                }
            },
        },
        getClinicalSynopsis: {
            method: 'GET',
            path: '/api/clinicalSynopsis',
            description: 'Get clinical synopsis for one or more OMIM entries by MIM number. Returns structured clinical features organized by body system.',
            parameters: [
                { position: { key: 'mimNumber', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'include', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(clinicalSynopsis,existFlags,externalLinks,contributors,creationDate,editHistory,dates,all)', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'apiKey', value: '{{SERVER_PARAM:OMIM_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get clinical synopsis for Marfan Syndrome', mimNumber: '154700', include: 'clinicalSynopsis' },
                { _description: 'Get clinical synopsis for Cystic Fibrosis', mimNumber: '219700', include: 'clinicalSynopsis' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        omim: { type: 'object', properties: { clinicalSynopsisList: { type: 'array', items: { type: 'object', properties: { clinicalSynopsis: { type: 'object', properties: { mimNumber: { type: 'number' }, preferredTitle: { type: 'string' } } } } } } } }
                    }
                }
            },
        },
        searchClinicalSynopsis: {
            method: 'GET',
            path: '/api/clinicalSynopsis/search',
            description: 'Search OMIM clinical synopses by keyword. Find disorders by clinical features, symptoms, or phenotypic descriptions.',
            parameters: [
                { position: { key: 'search', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'filter', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)', 'max(20)'] } },
                { position: { key: 'include', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(clinicalSynopsis,existFlags,externalLinks,all)', options: ['optional()'] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'apiKey', value: '{{SERVER_PARAM:OMIM_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Search clinical synopses for hearing loss', search: 'hearing loss', limit: 5 },
                { _description: 'Search clinical synopses for microcephaly', search: 'microcephaly', include: 'clinicalSynopsis', limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        omim: { type: 'object', properties: { searchResponse: { type: 'object', properties: { totalResults: { type: 'number' }, clinicalSynopsisList: { type: 'array' } } } } }
                    }
                }
            },
        },
        getAllelicVariants: {
            method: 'GET',
            path: '/api/entry/allelicVariantList',
            description: 'Get allelic variants (mutations) for one or more OMIM entries by MIM number. Returns variant descriptions, mutation details, and associated phenotypes.',
            parameters: [
                { position: { key: 'mimNumber', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'apiKey', value: '{{SERVER_PARAM:OMIM_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get allelic variants for CFTR gene (Cystic Fibrosis)', mimNumber: '602421' },
                { _description: 'Get allelic variants for BRCA1', mimNumber: '113705' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        omim: { type: 'object', properties: { entryList: { type: 'array', items: { type: 'object', properties: { entry: { type: 'object', properties: { mimNumber: { type: 'number' }, allelicVariantList: { type: 'array' } } } } } } } }
                    }
                }
            },
        },
        getReferences: {
            method: 'GET',
            path: '/api/entry/referenceList',
            description: 'Get the reference list for one or more OMIM entries by MIM number. Returns cited publications with authors, titles, journals, and PubMed IDs.',
            parameters: [
                { position: { key: 'mimNumber', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'format', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'apiKey', value: '{{SERVER_PARAM:OMIM_API_KEY}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get references for Huntington Disease', mimNumber: '143100' },
                { _description: 'Get references for Down Syndrome', mimNumber: '190685' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        omim: { type: 'object', properties: { entryList: { type: 'array', items: { type: 'object', properties: { entry: { type: 'object', properties: { mimNumber: { type: 'number' }, referenceList: { type: 'array' } } } } } } } }
                    }
                }
            },
        }
    }
}
