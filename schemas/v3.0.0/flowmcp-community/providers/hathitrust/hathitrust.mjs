export const main = {
    namespace: 'hathitrust',
    name: 'HathiTrust',
    description: 'Look up digitized volumes and bibliographic records from HathiTrust Digital Library — 17M+ volumes from major research libraries, searchable by ISBN, OCLC, LCCN, and other identifiers.',
    version: '3.0.0',
    docs: ['https://www.hathitrust.org/member-libraries/resources-for-librarians/data-resources/bibliographic-api/'],
    tags: ['library', 'books', 'archives', 'bibliography', 'cacheTtlDaily'],
    root: 'https://catalog.hathitrust.org/api',
    requiredServerParams: [],
    headers: {},
    tools: {
        briefLookupByOclc: {
            method: 'GET',
            path: '/volumes/brief/oclc/:oclcNumber.json',
            description: 'Look up brief bibliographic and volume information by OCLC number. Returns matching records with titles, ISBNs, ISSNs, and digitized volume items.',
            parameters: [
                { position: { key: 'oclcNumber', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Look up Infinite Series by OCLC', oclcNumber: '424023' },
                { _description: 'Look up The Great Gatsby by OCLC', oclcNumber: '884409' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        records: {
                            type: 'object',
                            description: 'Hash keyed by 9-digit HathiTrust record number',
                            properties: {}
                        },
                        items: {
                            type: 'array',
                            description: 'Individual HathiTrust volume items',
                            items: {
                                type: 'object',
                                properties: {
                                    orig: { type: 'string', description: 'Contributing library name' },
                                    fromRecord: { type: 'string', description: '9-digit record number' },
                                    htid: { type: 'string', description: 'HathiTrust volume identifier' },
                                    itemURL: { type: 'string', description: 'URL to view volume in HathiTrust' },
                                    rightsCode: { type: 'string', description: 'Rights code (pd=public domain, ic=in copyright)' },
                                    lastUpdate: { type: 'string', description: 'Last update date YYYYMMDD' },
                                    enumcron: { type: 'string', description: 'Enumeration/chronology info or false' },
                                    usRightsString: { type: 'string', description: 'Human-readable US rights status' }
                                }
                            }
                        }
                    }
                }
            }
        },
        briefLookupByIsbn: {
            method: 'GET',
            path: '/volumes/brief/isbn/:isbn.json',
            description: 'Look up brief bibliographic and volume information by ISBN. Normalized automatically to digits only. Supports ISBN-10 and ISBN-13.',
            parameters: [
                { position: { key: 'isbn', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Look up Infinite Series by ISBN', isbn: '0030110408' },
                { _description: 'Look up a book by ISBN-13', isbn: '9780030110405' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        records: { type: 'object', description: 'Hash keyed by record number' },
                        items: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        briefLookupByLccn: {
            method: 'GET',
            path: '/volumes/brief/lccn/:lccn.json',
            description: 'Look up brief bibliographic and volume information by Library of Congress Control Number (LCCN). Normalized automatically per LCCN standards.',
            parameters: [
                { position: { key: 'lccn', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Look up Infinite Series by LCCN', lccn: '62009520' },
                { _description: 'Look up a book by LCCN', lccn: '72081721' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        records: { type: 'object', description: 'Hash keyed by record number' },
                        items: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        fullLookupByOclc: {
            method: 'GET',
            path: '/volumes/full/oclc/:oclcNumber.json',
            description: 'Look up full bibliographic data including MARC-XML by OCLC number. Returns complete catalog records with all metadata fields.',
            parameters: [
                { position: { key: 'oclcNumber', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Full record for Infinite Series by OCLC', oclcNumber: '424023' },
                { _description: 'Full record for The Great Gatsby', oclcNumber: '884409' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        records: {
                            type: 'object',
                            description: 'Hash keyed by record number, includes marc-xml field with complete MARC-XML',
                            properties: {}
                        },
                        items: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        fullLookupByIsbn: {
            method: 'GET',
            path: '/volumes/full/isbn/:isbn.json',
            description: 'Look up full bibliographic data including MARC-XML by ISBN. Returns complete catalog records for the matching edition.',
            parameters: [
                { position: { key: 'isbn', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Full record by ISBN', isbn: '0030110408' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        records: { type: 'object', description: 'Hash with marc-xml field included' },
                        items: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        fullLookupByLccn: {
            method: 'GET',
            path: '/volumes/full/lccn/:lccn.json',
            description: 'Look up full bibliographic data including MARC-XML by LCCN. Returns complete catalog records with MARC metadata.',
            parameters: [
                { position: { key: 'lccn', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Full record by LCCN', lccn: '62009520' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        records: { type: 'object', description: 'Hash with marc-xml field included' },
                        items: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        briefLookupByHtid: {
            method: 'GET',
            path: '/volumes/brief/htid/:htid.json',
            description: 'Look up brief bibliographic info by HathiTrust volume identifier. Useful for resolving a specific digitized volume back to its catalog record.',
            parameters: [
                { position: { key: 'htid', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Look up volume by HathiTrust ID', htid: 'mdp.39015025315527' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        records: { type: 'object', description: 'Hash keyed by record number' },
                        items: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        },
        briefLookupByRecordNumber: {
            method: 'GET',
            path: '/volumes/brief/recordnumber/:recordNumber.json',
            description: 'Look up brief bibliographic info by HathiTrust 9-digit record number. Returns the catalog record and all associated volume items.',
            parameters: [
                { position: { key: 'recordNumber', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Look up by record number', recordNumber: '000578050' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        records: { type: 'object', description: 'Hash keyed by record number' },
                        items: { type: 'array', items: { type: 'object' } }
                    }
                }
            }
        }
    }
}
