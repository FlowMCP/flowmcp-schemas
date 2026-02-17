// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-imports
// Namespace: "luksoNetwork" -> "luksonetwork"
// requiredLibraries: @erc725/erc725.js
// Import: import { ERC725 } from '@erc725/erc725.js'
// Module-level code: 6 lines

export const main = {
    namespace: 'luksonetwork',
    name: 'ERC725UniversalProfile',
    description: 'Read LUKSO Universal Profile data on-chain via ERC725 — call getData for raw key-value storage and fetchData for resolved metadata with IPFS content.',
    version: '2.0.0',
    docs: ['https://github.com/ERC725Alliance/erc725.js', 'https://docs.lukso.tech/learn/overview'],
    tags: ['lukso', 'identity', 'profiles', 'cacheTtlDaily'],
    root: 'https://rpc.--chain--.lukso.network',
    routes: {
        readProfileData: {
            method: 'GET',
            path: '/',
            description: 'Calls getData() to retrieve full profile data via LUKSO BlockScout. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ]
        },
        fetchProfileMetadata: {
            method: 'GET',
            path: '/',
            description: 'Calls fetchData() to retrieve LSP3Profile metadata via LUKSO BlockScout. Returns structured JSON response data.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ]
        },
        getUniversalReceiverAddress: {
            method: 'GET',
            path: '/',
            description: 'Calls getData() to retrieve LSP1UniversalReceiverDelegate address. Required: chainName, address.',
            parameters: [
                { position: { key: 'chainName', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'enum(LUKSO_MAINNET,LUKSO_TESTNET)', options: [] } },
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'insert' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ]
        }
    },
    requiredLibraries: ['@erc725/erc725.js']
}


export const handlers = ( { sharedLists, libraries } ) => {
    const ERC725 = libraries['@erc725/erc725.js']

    const erc725_schema = [
      { name: 'SupportedStandards:LSP3Profile', key: '0xeafec4d89fa9619884b600005ef83ad9559033e6e941db7d7c495acdce616347', keyType: 'Mapping', valueContent: '0x5ef83ad9', valueType: 'bytes' },
      { name: 'LSP3Profile', key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5', keyType: 'Singleton', valueContent: 'VerifiableURI', valueType: 'bytes' },
      { name: 'LSP1UniversalReceiverDelegate', key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47', keyType: 'Singleton', valueContent: 'Address', valueType: 'address' },
      { name: 'LSP3IssuedAssets[]', key: '0x3a47ab5bd3a594c3a8995f8fa58d0876c96819ca4516bd76100c92462f2f9dc0', keyType: 'Array', valueContent: 'Address', valueType: 'address' },
    ]

    return {
        readProfileData: {
            preRequest: async ( { struct, payload } ) => {
                const alias = { 'LUKSO_MAINNET': 'mainnet', 'LUKSO_TESTNET': 'testnet' }
                struct.url = struct.url.replace('--chain--', alias[payload.chainName])
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const myERC725 = new ERC725(erc725_schema, userParams.address, payload.url)
                try { struct.data = await myERC725.getData() }
                catch (e) { struct.messages.push(e?.message) }
                struct.status = struct.messages.length === 0
                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                if (struct.status) {
                // response = Object.entries(response).reverse().reduce((acc, [k, v]) => { acc[k] = v; return acc }, {})
                }
                return { response }
            }
        },
        fetchProfileMetadata: {
            preRequest: async ( { struct, payload } ) => {
                const alias = { 'LUKSO_MAINNET': 'mainnet', 'LUKSO_TESTNET': 'testnet' }
                struct.url = struct.url.replace('--chain--', alias[payload.chainName])
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const myERC725 = new ERC725(erc725_schema, userParams.address, payload.url)
                try { struct.data = await myERC725.fetchData('LSP3Profile') }
                catch (e) { struct.messages.push(e?.message) }
                struct.status = struct.messages.length === 0
                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                if (struct.status) {
                // response = Object.entries(response).reverse().reduce((acc, [k, v]) => { acc[k] = v; return acc }, {})
                }
                return { response }
            }
        },
        getUniversalReceiverAddress: {
            preRequest: async ( { struct, payload } ) => {
                const alias = { 'LUKSO_MAINNET': 'mainnet', 'LUKSO_TESTNET': 'testnet' }
                struct.url = struct.url.replace('--chain--', alias[payload.chainName])
                return { struct }
            },
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const myERC725 = new ERC725(erc725_schema, userParams.address, payload.url)
                try { struct.data = await myERC725.getData('LSP1UniversalReceiverDelegate') }
                catch (e) { struct.messages.push(e?.message) }
                struct.status = struct.messages.length === 0
                return { struct }
            },
            postRequest: async ( { response, struct, payload } ) => {
                if (struct.status) {
                // response = Object.entries(response).reverse().reduce((acc, [k, v]) => { acc[k] = v; return acc }, {})
                }
                return { response }
            }
        }
    }
}
