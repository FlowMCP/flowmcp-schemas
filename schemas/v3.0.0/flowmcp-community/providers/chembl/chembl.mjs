export const main = {
    namespace: 'chembl',
    name: 'ChEMBL',
    description: 'Access the ChEMBL database of bioactive drug-like small molecules. Search 2.4M+ molecules, targets, activities, assays, and mechanisms of action from the European Bioinformatics Institute.',
    version: '3.0.0',
    docs: ['https://chembl.gitbook.io/chembl-interface-documentation/web-services/chembl-data-web-services'],
    tags: ['science', 'chemistry', 'drugs', 'pharmacology', 'bioactivity', 'cacheTtlDaily'],
    root: 'https://www.ebi.ac.uk/chembl/api/data',
    requiredServerParams: [],
    headers: {
        'Accept': 'application/json'
    },
    tools: {
        getMolecule: {
            method: 'GET',
            path: '/molecule/:chemblId.json',
            description: 'Get detailed molecule information by ChEMBL ID. Returns molecular properties, structures (SMILES, InChI), synonyms, ATC classifications, approval status, and cross-references.',
            parameters: [
                { position: { key: 'chemblId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Aspirin molecule data', chemblId: 'CHEMBL25' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        molecule_chembl_id: { type: 'string' },
                        max_phase: { type: 'string' },
                        molecule_properties: { type: 'object', properties: { full_mwt: { type: 'string' }, alogp: { type: 'string' }, psa: { type: 'string' }, num_ro5_violations: { type: 'number' }, full_molformula: { type: 'string' } } },
                        molecule_structures: { type: 'object', properties: { canonical_smiles: { type: 'string' }, standard_inchi_key: { type: 'string' } } },
                        molecule_synonyms: { type: 'array' },
                        atc_classifications: { type: 'array' },
                        first_approval: { type: 'number' }
                    }
                }
            },
        },
        searchMolecules: {
            method: 'GET',
            path: '/molecule/search.json',
            description: 'Free-text search across molecules by name, synonym, or description. Returns matching molecules with properties and structures. Paginated results.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search for aspirin molecules', q: 'aspirin', limit: 5, offset: 0 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        page_meta: { type: 'object', properties: { total_count: { type: 'number' }, limit: { type: 'number' }, offset: { type: 'number' } } },
                        molecules: { type: 'array', items: { type: 'object', properties: { molecule_chembl_id: { type: 'string' }, max_phase: { type: 'string' }, molecule_properties: { type: 'object' }, molecule_structures: { type: 'object' } } } }
                    }
                }
            },
        },
        getTarget: {
            method: 'GET',
            path: '/target/:chemblId.json',
            description: 'Get detailed target information by ChEMBL ID. Returns target name, organism, target type, components with UniProt accessions, and cross-references.',
            parameters: [
                { position: { key: 'chemblId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get Cyclooxygenase-2 target', chemblId: 'CHEMBL230' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        target_chembl_id: { type: 'string' },
                        pref_name: { type: 'string' },
                        organism: { type: 'string' },
                        target_type: { type: 'string' },
                        target_components: { type: 'array', items: { type: 'object', properties: { accession: { type: 'string' }, component_description: { type: 'string' }, component_type: { type: 'string' } } } }
                    }
                }
            },
        },
        searchTargets: {
            method: 'GET',
            path: '/target/search.json',
            description: 'Free-text search across drug targets by name, gene symbol, or description. Returns matching targets with organism and component information.',
            parameters: [
                { position: { key: 'q', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Search for kinase targets', q: 'kinase', limit: 5, offset: 0 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        page_meta: { type: 'object', properties: { total_count: { type: 'number' }, limit: { type: 'number' }, offset: { type: 'number' } } },
                        targets: { type: 'array', items: { type: 'object', properties: { target_chembl_id: { type: 'string' }, pref_name: { type: 'string' }, organism: { type: 'string' }, target_type: { type: 'string' } } } }
                    }
                }
            },
        },
        getActivities: {
            method: 'GET',
            path: '/activity.json',
            description: 'Get bioactivity data for a molecule. Returns assay results including activity type, standard values, target information, and publication references.',
            parameters: [
                { position: { key: 'molecule_chembl_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } }
            ],
            tests: [
                { _description: 'Get activities for Aspirin', molecule_chembl_id: 'CHEMBL25', limit: 5, offset: 0 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        page_meta: { type: 'object', properties: { total_count: { type: 'number' }, limit: { type: 'number' }, offset: { type: 'number' } } },
                        activities: { type: 'array', items: { type: 'object', properties: { activity_id: { type: 'number' }, molecule_chembl_id: { type: 'string' }, molecule_pref_name: { type: 'string' }, target_chembl_id: { type: 'string' }, target_pref_name: { type: 'string' }, standard_type: { type: 'string' }, standard_value: { type: 'string' }, standard_units: { type: 'string' }, pchembl_value: { type: 'number' } } } }
                    }
                }
            },
        },
        getAssay: {
            method: 'GET',
            path: '/assay/:chemblId.json',
            description: 'Get assay details by ChEMBL assay ID. Returns assay description, type, organism, target assignment, confidence score, and BAO classification.',
            parameters: [
                { position: { key: 'chemblId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } }
            ],
            tests: [
                { _description: 'Get hERG binding assay details', chemblId: 'CHEMBL1217643' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        assay_chembl_id: { type: 'string' },
                        description: { type: 'string' },
                        assay_type: { type: 'string' },
                        assay_type_description: { type: 'string' },
                        assay_organism: { type: 'string' },
                        target_chembl_id: { type: 'string' },
                        confidence_score: { type: 'number' },
                        confidence_description: { type: 'string' },
                        bao_format: { type: 'string' },
                        bao_label: { type: 'string' }
                    }
                }
            },
        },
        getMechanism: {
            method: 'GET',
            path: '/mechanism.json',
            description: 'Get mechanism of action data for a molecule. Returns action type, target, molecular mechanism details, and literature references.',
            parameters: [
                { position: { key: 'molecule_chembl_id', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Get mechanism of action for Aspirin', molecule_chembl_id: 'CHEMBL25', limit: 10 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        page_meta: { type: 'object', properties: { total_count: { type: 'number' }, limit: { type: 'number' }, offset: { type: 'number' } } },
                        mechanisms: { type: 'array', items: { type: 'object', properties: { action_type: { type: 'string' }, mechanism_of_action: { type: 'string' }, molecule_chembl_id: { type: 'string' }, target_chembl_id: { type: 'string' }, max_phase: { type: 'number' }, mechanism_refs: { type: 'array' } } } }
                    }
                }
            },
        },
        getSimilarMolecules: {
            method: 'GET',
            path: '/similarity/:chemblId/:similarity.json',
            description: 'Find molecules structurally similar to a given molecule. Uses fingerprint-based Tanimoto similarity with a configurable cutoff percentage (0-100).',
            parameters: [
                { position: { key: 'chemblId', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: [] } },
                { position: { key: 'similarity', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'number()', options: ['min(40)', 'max(100)'] } },
                { position: { key: 'limit', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(20)', 'min(1)', 'max(100)'] } }
            ],
            tests: [
                { _description: 'Find molecules 70% similar to Aspirin', chemblId: 'CHEMBL25', similarity: 70, limit: 5 }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        page_meta: { type: 'object', properties: { total_count: { type: 'number' }, limit: { type: 'number' }, offset: { type: 'number' } } },
                        molecules: { type: 'array', items: { type: 'object', properties: { molecule_chembl_id: { type: 'string' }, similarity: { type: 'number' }, molecule_properties: { type: 'object' }, molecule_structures: { type: 'object' } } } }
                    }
                }
            },
        }
    }
}
