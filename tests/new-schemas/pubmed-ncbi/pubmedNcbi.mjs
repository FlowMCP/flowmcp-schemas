export const main = {
    namespace: 'pubmedncbi',
    name: 'PubMed NCBI',
    description: 'Search and retrieve biomedical literature from PubMed — 36M+ citations and abstracts via NCBI E-Utilities.',
    version: '2.0.0',
    docs: ['https://www.ncbi.nlm.nih.gov/books/NBK25500/'],
    tags: ['biomedical', 'science', 'literature', 'health', 'research', 'cacheTtlDaily'],
    root: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils',
    requiredServerParams: [],
    headers: {},
    routes: {
        searchArticles: {
            method: 'GET',
            path: '/esearch.fcgi',
            description: 'Search PubMed for articles matching a query. Returns a list of PubMed IDs (PMIDs) with hit count and pagination.',
            parameters: [
                { position: { key: 'db', value: 'pubmed', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'term', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'retmode', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'retmax', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(10000)'] } },
                { position: { key: 'retstart', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)', 'min(0)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(relevance,pub_date,Author,JournalName)', options: ['optional()', 'default(relevance)'] } },
                { position: { key: 'datetype', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(pdat,mdat,edat)', options: ['optional()'] } },
                { position: { key: 'mindate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'maxdate', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } }
            ],
            tests: [
                { _description: 'Search for CRISPR gene editing articles', term: 'CRISPR gene editing', retmax: 5 },
                { _description: 'Search for COVID-19 vaccine articles from 2023', term: 'COVID-19 vaccine', retmax: 5, datetype: 'pdat', mindate: '2023/01/01', maxdate: '2023/12/31' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        esearchresult: {
                            type: 'object',
                            properties: {
                                count: { type: 'string', description: 'Total number of matching articles' },
                                retmax: { type: 'string', description: 'Number of IDs returned' },
                                retstart: { type: 'string', description: 'Index of first returned ID' },
                                idlist: { type: 'array', items: { type: 'string' }, description: 'List of PubMed IDs' },
                                translationset: { type: 'array', description: 'Query translation details' },
                                querytranslation: { type: 'string', description: 'Translated search query' }
                            }
                        }
                    }
                }
            }
        },
        getArticleSummary: {
            method: 'GET',
            path: '/esummary.fcgi',
            description: 'Retrieve brief metadata (DocSums) for one or more PubMed articles by their PMIDs. Returns title, authors, journal, and publication date.',
            parameters: [
                { position: { key: 'db', value: 'pubmed', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'retmode', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'version', value: '2.0', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get summary for a single PMID (CRISPR paper)', id: '26553799' },
                { _description: 'Get summaries for multiple PMIDs', id: '26553799,29474920' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        result: {
                            type: 'object',
                            description: 'Object keyed by PMID containing article metadata',
                            properties: {
                                uids: { type: 'array', items: { type: 'string' }, description: 'List of returned UIDs' }
                            }
                        }
                    }
                }
            }
        },
        fetchAbstract: {
            method: 'GET',
            path: '/efetch.fcgi',
            description: 'Fetch full abstract text for one or more PubMed articles by their PMIDs. Returns formatted citation with abstract in XML.',
            parameters: [
                { position: { key: 'db', value: 'pubmed', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'rettype', value: 'abstract', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'retmode', value: 'xml', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Fetch abstract for a landmark CRISPR paper', id: '26553799' },
                { _description: 'Fetch abstracts for two articles', id: '26553799,29474920' }
            ],
            output: {
                mimeType: 'application/xml',
                schema: {
                    type: 'object',
                    description: 'PubmedArticleSet XML containing full citation and abstract text'
                }
            }
        },
        getDatabaseInfo: {
            method: 'GET',
            path: '/einfo.fcgi',
            description: 'Retrieve metadata about an NCBI Entrez database — field names, search terms, record count, and last update date.',
            parameters: [
                { position: { key: 'db', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'retmode', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'version', value: '2.0', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get PubMed database info and search fields', db: 'pubmed' },
                { _description: 'List all available Entrez databases' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        einforesult: {
                            type: 'object',
                            properties: {
                                dblist: { type: 'array', items: { type: 'string' }, description: 'List of all Entrez databases (when no db specified)' },
                                dbinfo: {
                                    type: 'object',
                                    description: 'Database details (when db specified)',
                                    properties: {
                                        dbname: { type: 'string' },
                                        count: { type: 'string', description: 'Total records in database' },
                                        lastupdate: { type: 'string' },
                                        fieldlist: { type: 'array', description: 'Available search fields' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        findRelatedArticles: {
            method: 'GET',
            path: '/elink.fcgi',
            description: 'Find related articles or cross-database links for given PubMed IDs. Discovers citations, similar articles, and links to other NCBI databases.',
            parameters: [
                { position: { key: 'dbfrom', value: 'pubmed', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'db', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()', 'default(pubmed)'] } },
                { position: { key: 'id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'cmd', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(neighbor,neighbor_score,prlinks,llinks,acheck)', options: ['optional()', 'default(neighbor)'] } },
                { position: { key: 'retmode', value: 'json', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Find articles related to a CRISPR paper', id: '26553799' },
                { _description: 'Find PubMed Central links for an article', id: '26553799', db: 'pmc', cmd: 'neighbor' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        linksets: {
                            type: 'array',
                            description: 'Array of link result sets',
                            items: {
                                type: 'object',
                                properties: {
                                    dbfrom: { type: 'string' },
                                    ids: { type: 'array', items: { type: 'string' } },
                                    linksetdbs: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                dbto: { type: 'string' },
                                                linkname: { type: 'string' },
                                                links: { type: 'array', items: { type: 'string' } }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        globalSearch: {
            method: 'GET',
            path: '/egquery.fcgi',
            description: 'Search across all NCBI Entrez databases simultaneously. Returns hit counts per database for a given query term.',
            parameters: [
                { position: { key: 'term', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'retmode', value: 'xml', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Global search for CRISPR across all databases', term: 'CRISPR' },
                { _description: 'Global search for Alzheimer across all databases', term: 'Alzheimer disease' }
            ],
            output: {
                mimeType: 'application/xml',
                schema: {
                    type: 'object',
                    description: 'eGQueryResult XML with hit counts per database',
                    properties: {
                        term: { type: 'string', description: 'The search term used' },
                        eGQueryResult: {
                            type: 'array',
                            description: 'Per-database hit counts',
                            items: {
                                type: 'object',
                                properties: {
                                    DbName: { type: 'string' },
                                    MenuName: { type: 'string' },
                                    Count: { type: 'string' },
                                    Status: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        spellCheck: {
            method: 'GET',
            path: '/espell.fcgi',
            description: 'Check spelling of a search query and get corrected suggestions from PubMed. Useful for improving search accuracy.',
            parameters: [
                { position: { key: 'db', value: 'pubmed', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'term', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'retmode', value: 'xml', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Check spelling for misspelled query', term: 'asthmaa bronchiale' },
                { _description: 'Check spelling for typo in disease name', term: 'diabettes mellitus' }
            ],
            output: {
                mimeType: 'application/xml',
                schema: {
                    type: 'object',
                    description: 'eSpellResult XML with original and corrected queries',
                    properties: {
                        Query: { type: 'string', description: 'Original query' },
                        CorrectedQuery: { type: 'string', description: 'Corrected query suggestion' }
                    }
                }
            }
        },
        citationMatch: {
            method: 'GET',
            path: '/ecitmatch.cgi',
            description: 'Find PubMed IDs from partial citation data (journal, year, volume, page, author). Returns matching PMIDs for bibliographic references.',
            parameters: [
                { position: { key: 'db', value: 'pubmed', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'rettype', value: 'xml', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'bdata', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Match a citation from PNAS 2004', bdata: 'proc+natl+acad+sci+u+s+a|2004|101|15|5506||' }
            ],
            output: {
                mimeType: 'application/xml',
                schema: {
                    type: 'object',
                    description: 'Pipe-delimited text with appended PMIDs for each matched citation'
                }
            }
        }
    }
}
