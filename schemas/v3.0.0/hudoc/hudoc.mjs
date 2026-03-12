export const main = {
    namespace: 'hudoc',
    name: 'HUDOC ECHR',
    description: 'Search 90K+ European Court of Human Rights case law documents including judgments, decisions, and communications since 1959 via the HUDOC search API.',
    version: '3.0.0',
    docs: ['https://hudoc.echr.coe.int/', 'https://www.echr.coe.int/documents/d/echr/HUDOC_Manual_ENG'],
    tags: ['legal', 'humanrights', 'europe', 'courts', 'cacheTtlDaily'],
    root: 'https://hudoc.echr.coe.int',
    requiredServerParams: [],
    headers: {},
    tools: {
        searchCases: {
            method: 'GET',
            path: '/app/query/results',
            description: 'Search ECHR case law using HUDOC query syntax. Supports filtering by respondent state (respondent:DEU), article (article:6), document type (doctype:HEJUD for judgments, HEDEC for decisions, HECOM for communicated cases), language (languageisocode:"ENG"), and originating body (originatingbody:1 for Grand Chamber).',
            parameters: [
                { position: { key: 'query', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'select', value: 'itemid,docname,doctype,appno,conclusion,importance,originatingbody,typedescription,kpdate,respondent,ecli,article', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'sort', value: 'kpdate Descending', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(0)'] } },
                { position: { key: 'length', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(20)', 'max(500)'] } }
            ],
            tests: [
                { _description: 'Search all English ECHR case law (most recent)', query: 'contentsitename:ECHR AND (NOT (doctype:PR OR doctype:HFCOMOLD OR doctype:HECOMOLD)) AND ((languageisocode:"ENG"))', start: 0, length: 5 },
                { _description: 'Search cases against Germany', query: 'contentsitename:ECHR AND respondent:DEU', start: 0, length: 5 },
                { _description: 'Search cases citing Article 3 (prohibition of torture)', query: 'contentsitename:ECHR AND article:3', start: 0, length: 5 },
                { _description: 'Search Grand Chamber judgments', query: 'contentsitename:ECHR AND doctype:HEJUD AND originatingbody:1 AND ((languageisocode:"ENG"))', start: 0, length: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        resultcount: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { columns: { type: 'object' } } } }
                    }
                }
            },
        },
        searchJudgments: {
            method: 'GET',
            path: '/app/query/results',
            description: 'Search specifically for ECHR judgments in English (doctype:HEJUD). Returns only final court judgments with metadata including separate opinion indicators.',
            parameters: [
                { position: { key: 'query', value: 'contentsitename:ECHR AND doctype:HEJUD AND ((languageisocode:"ENG"))', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'select', value: 'itemid,docname,appno,conclusion,importance,originatingbody,kpdate,respondent,ecli,article,separateopinion', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'sort', value: 'kpdate Descending', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(0)'] } },
                { position: { key: 'length', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(20)', 'max(500)'] } }
            ],
            tests: [
                { _description: 'Get most recent English judgments', start: 0, length: 5 },
                { _description: 'Get judgments page 2', start: 20, length: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        resultcount: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { columns: { type: 'object' } } } }
                    }
                }
            },
        },
        searchDecisions: {
            method: 'GET',
            path: '/app/query/results',
            description: 'Search ECHR admissibility decisions in English (doctype:HEDEC). These determine whether cases are admissible before the Court.',
            parameters: [
                { position: { key: 'query', value: 'contentsitename:ECHR AND doctype:HEDEC AND ((languageisocode:"ENG"))', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'select', value: 'itemid,docname,appno,conclusion,importance,kpdate,respondent,ecli,article', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'sort', value: 'kpdate Descending', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(0)'] } },
                { position: { key: 'length', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(20)', 'max(500)'] } }
            ],
            tests: [
                { _description: 'Get most recent admissibility decisions', start: 0, length: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        resultcount: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { columns: { type: 'object' } } } }
                    }
                }
            },
        },
        searchCommunicatedCases: {
            method: 'GET',
            path: '/app/query/results',
            description: 'Search communicated cases in English (doctype:HECOM). These are pending cases where the Court has asked the respondent government to submit observations.',
            parameters: [
                { position: { key: 'query', value: 'contentsitename:ECHR AND doctype:HECOM AND ((languageisocode:"ENG"))', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'select', value: 'itemid,docname,appno,importance,kpdate,respondent,article', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'sort', value: 'kpdate Descending', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(0)'] } },
                { position: { key: 'length', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(20)', 'max(500)'] } }
            ],
            tests: [
                { _description: 'Get most recent communicated cases', start: 0, length: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        resultcount: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { columns: { type: 'object' } } } }
                    }
                }
            },
        },
        searchGrandChamber: {
            method: 'GET',
            path: '/app/query/results',
            description: 'Search Grand Chamber judgments in English - the highest importance ECHR decisions. These are landmark cases with major legal significance decided by the full court.',
            parameters: [
                { position: { key: 'query', value: 'contentsitename:ECHR AND doctype:HEJUD AND originatingbody:1 AND ((languageisocode:"ENG"))', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'select', value: 'itemid,docname,appno,conclusion,importance,kpdate,respondent,ecli,article', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'sort', value: 'kpdate Descending', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'start', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(0)'] } },
                { position: { key: 'length', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['default(20)', 'max(500)'] } }
            ],
            tests: [
                { _description: 'Get most recent Grand Chamber judgments', start: 0, length: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        resultcount: { type: 'number' },
                        results: { type: 'array', items: { type: 'object', properties: { columns: { type: 'object' } } } }
                    }
                }
            },
        }
    }
}
