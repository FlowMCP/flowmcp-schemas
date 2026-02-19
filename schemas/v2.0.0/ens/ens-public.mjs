// Enhancement for #162 — ENS Public RPC (No API Key Required)
// Uses public Ethereum RPC endpoints — zero configuration needed
// requiredLibraries: ethers
// Import: import { ethers } from 'ethers'

export const main = {
    namespace: 'ens',
    name: 'ENS Public Resolution',
    description: 'Resolve ENS names, reverse lookups, text records, avatars and content hashes via public Ethereum RPC — no API key required.',
    version: '2.0.0',
    docs: ['https://docs.ens.domains/', 'https://docs.ethers.org/v6/api/providers/#Provider-resolveName'],
    tags: ['ethereum', 'domain', 'identity', 'ens', 'cacheTtlDaily'],
    root: 'https://ethereum-rpc.publicnode.com',
    routes: {
        resolveName: {
            method: 'GET',
            path: '/',
            description: 'Resolve an ENS name (e.g. vitalik.eth) to its Ethereum address via public RPC. No API key needed.',
            parameters: [
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { name: { type: 'string' }, address: { type: 'string' } } } },
            tests: [
                { _description: 'Resolve vitalik.eth', name: 'vitalik.eth' },
                { _description: 'Resolve andr3a5.eth', name: 'andr3a5.eth' }
            ],
        },
        lookupAddress: {
            method: 'GET',
            path: '/',
            description: 'Reverse-resolve an Ethereum address to its primary ENS name via public RPC. No API key needed.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(42)', 'regex(^0x[a-fA-F0-9]{40}$)'] } }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { address: { type: 'string' }, name: { type: 'string' } } } },
            tests: [
                { _description: 'Reverse lookup Vitalik address', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
        },
        getTextRecords: {
            method: 'GET',
            path: '/',
            description: 'Get all common ENS text records for a name — twitter, github, url, email, avatar, description. Returns null for unset fields.',
            parameters: [
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { name: { type: 'string' }, records: { type: 'object', properties: { twitter: { type: 'string', nullable: true }, github: { type: 'string', nullable: true }, url: { type: 'string', nullable: true }, email: { type: 'string', nullable: true }, avatar: { type: 'string', nullable: true }, description: { type: 'string', nullable: true } } } } } },
            tests: [
                { _description: 'Text records for vitalik.eth', name: 'vitalik.eth' },
                { _description: 'Text records for andr3a5.eth', name: 'andr3a5.eth' }
            ],
        },
        getAvatar: {
            method: 'GET',
            path: '/',
            description: 'Get the avatar URL for an ENS name. Returns the avatar text record if set, null otherwise.',
            parameters: [
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { name: { type: 'string' }, avatar: { type: 'string', nullable: true } } } },
            tests: [
                { _description: 'Avatar for vitalik.eth', name: 'vitalik.eth' }
            ],
        },
        getContentHash: {
            method: 'GET',
            path: '/',
            description: 'Get the content hash (IPFS or Swarm) stored for an ENS name. Returns null if no content hash is set.',
            parameters: [
                { position: { key: 'name', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(3)'] } }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { name: { type: 'string' }, contentHash: { type: 'string', nullable: true } } } },
            tests: [
                { _description: 'Content hash for vitalik.eth', name: 'vitalik.eth' }
            ],
        }
    },
    requiredLibraries: ['ethers']
}


export const handlers = ( { sharedLists, libraries } ) => {
    const ethers = libraries['ethers']
    const PUBLIC_RPC = 'https://ethereum-rpc.publicnode.com'

    return {
        resolveName: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { name } = userParams
                try {
                    const provider = new ethers.JsonRpcProvider( PUBLIC_RPC )
                    const address = await provider.resolveName( String( name ).trim() )
                    if( !address ) {
                        struct.status = false
                        struct.messages.push( `No address found for "${name}". Name may not exist or has no ETH address set.` )
                        return { struct }
                    }
                    struct.data = { name, address }
                    struct.status = true
                } catch( e ) {
                    struct.status = false
                    struct.messages.push( e?.message || `Resolution failed for "${name}".` )
                }
                return { struct }
            }
        },
        lookupAddress: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { address } = userParams
                try {
                    const provider = new ethers.JsonRpcProvider( PUBLIC_RPC )
                    const name = await provider.lookupAddress( address )
                    if( !name ) {
                        struct.status = false
                        struct.messages.push( `No ENS name set for address "${address}".` )
                        return { struct }
                    }
                    struct.data = { address: ethers.getAddress( address ), name }
                    struct.status = true
                } catch( e ) {
                    struct.status = false
                    struct.messages.push( e?.message || `Reverse lookup failed for "${address}".` )
                }
                return { struct }
            }
        },
        getTextRecords: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { name } = userParams
                try {
                    const provider = new ethers.JsonRpcProvider( PUBLIC_RPC )
                    const resolver = await provider.getResolver( String( name ).trim() )
                    if( !resolver ) {
                        struct.status = false
                        struct.messages.push( `No resolver found for "${name}". Name may not exist.` )
                        return { struct }
                    }
                    const keys = ['com.twitter', 'com.github', 'url', 'email', 'avatar', 'description']
                    const entries = await Promise.all(
                        keys.map( async ( key ) => {
                            const value = await resolver.getText( key )
                            return [key.replace( 'com.', '' ), value || null]
                        } )
                    )
                    const records = Object.fromEntries( entries )
                    struct.data = { name, records }
                    struct.status = true
                } catch( e ) {
                    struct.status = false
                    struct.messages.push( e?.message || `Failed to fetch text records for "${name}".` )
                }
                return { struct }
            }
        },
        getAvatar: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { name } = userParams
                try {
                    const provider = new ethers.JsonRpcProvider( PUBLIC_RPC )
                    const resolver = await provider.getResolver( String( name ).trim() )
                    if( !resolver ) {
                        struct.status = false
                        struct.messages.push( `No resolver found for "${name}". Name may not exist.` )
                        return { struct }
                    }
                    const avatar = await resolver.getText( 'avatar' )
                    struct.data = { name, avatar: avatar || null }
                    struct.status = true
                } catch( e ) {
                    struct.status = false
                    struct.messages.push( e?.message || `Failed to fetch avatar for "${name}".` )
                }
                return { struct }
            }
        },
        getContentHash: {
            executeRequest: async ( { struct, payload } ) => {
                const { userParams } = payload
                const { name } = userParams
                try {
                    const provider = new ethers.JsonRpcProvider( PUBLIC_RPC )
                    const resolver = await provider.getResolver( String( name ).trim() )
                    if( !resolver ) {
                        struct.status = false
                        struct.messages.push( `No resolver found for "${name}". Name may not exist.` )
                        return { struct }
                    }
                    const contentHash = await resolver.getContentHash()
                    struct.data = { name, contentHash: contentHash || null }
                    struct.status = true
                } catch( e ) {
                    struct.status = false
                    struct.messages.push( e?.message || `Failed to fetch content hash for "${name}".` )
                }
                return { struct }
            }
        }
    }
}
