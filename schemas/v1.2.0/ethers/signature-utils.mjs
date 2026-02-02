import { ethers } from 'ethers'


const schema = {
    namespace: "ethers",
    name: "Ethers Signature Utils",
    description: "Offline signature verification and recovery utilities powered by ethers.js. Verify personal signatures, verify EIP-712 typed data, hash messages with Ethereum prefix, and recover signer addresses. No RPC or API key required.",
    docs: ["https://docs.ethers.org/v6/api/crypto/#signing-key", "https://eips.ethereum.org/EIPS/eip-712"],
    tags: ["blockchain", "evm", "signature", "verification", "offline"],
    flowMCP: "1.2.0",
    root: "https://offline.ethers.local",
    requiredServerParams: [],
    headers: {},
    routes: {
        verifyMessage: {
            requestMethod: "GET",
            description: "Recover the signer address from a personal_sign signature. Verifies that a message was signed by a specific address.",
            route: "/",
            parameters: [
                { position: { key: "message", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "signature", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]+$)"] } }
            ],
            tests: [
                { _description: "Verify a signed message", message: "Hello World", signature: "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ff" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "verifyMessageExecute" }
            ]
        },
        verifyTypedData: {
            requestMethod: "GET",
            description: "Recover the signer address from an EIP-712 typed data signature. Provide domain, types, value as JSON strings, and the signature hex.",
            route: "/",
            parameters: [
                { position: { key: "domain", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(2)"] } },
                { position: { key: "types", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(2)"] } },
                { position: { key: "value", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(2)"] } },
                { position: { key: "signature", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]+$)"] } }
            ],
            tests: [
                { _description: "Verify EIP-712 typed data", domain: "{\"name\":\"Test\",\"version\":\"1\",\"chainId\":1}", types: "{\"Message\":[{\"name\":\"content\",\"type\":\"string\"}]}", value: "{\"content\":\"Hello\"}", signature: "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ff" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "verifyTypedDataExecute" }
            ]
        },
        hashMessage: {
            requestMethod: "GET",
            description: "Hash a message with the Ethereum signed message prefix: '\\x19Ethereum Signed Message:\\n' + length + message. Returns the digest used for signature verification.",
            route: "/",
            parameters: [
                { position: { key: "message", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Hash a simple message", message: "Hello World" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "hashMessageExecute" }
            ]
        },
        recoverAddress: {
            requestMethod: "GET",
            description: "Recover the signer address from a message digest (hash) and signature. Use hashMessage first to get the digest from a text message.",
            route: "/",
            parameters: [
                { position: { key: "digest", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]{64}$)"] } },
                { position: { key: "signature", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]+$)"] } }
            ],
            tests: [
                { _description: "Recover address from digest and signature", digest: "0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2", signature: "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ff" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "recoverAddressExecute" }
            ]
        }
    },
    handlers: {
        verifyMessageExecute: async ( { struct, payload, userParams } ) => {
            const { message, signature } = userParams
            try {
                const recoveredAddress = ethers.verifyMessage( message, signature )
                struct.data = {
                    message,
                    recoveredAddress,
                    signature
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to verify message signature' )
            }
            return { struct, payload }
        },
        verifyTypedDataExecute: async ( { struct, payload, userParams } ) => {
            const { domain, types, value, signature } = userParams
            try {
                const parsedDomain = JSON.parse( domain )
                const parsedTypes = JSON.parse( types )
                const parsedValue = JSON.parse( value )
                const recoveredAddress = ethers.verifyTypedData( parsedDomain, parsedTypes, parsedValue, signature )
                struct.data = {
                    domain: parsedDomain,
                    recoveredAddress,
                    signature
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to verify typed data signature' )
            }
            return { struct, payload }
        },
        hashMessageExecute: async ( { struct, payload, userParams } ) => {
            const { message } = userParams
            try {
                const hash = ethers.hashMessage( message )
                struct.data = {
                    message,
                    hash,
                    prefix: '\\x19Ethereum Signed Message:\\n' + message.length
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to hash message' )
            }
            return { struct, payload }
        },
        recoverAddressExecute: async ( { struct, payload, userParams } ) => {
            const { digest, signature } = userParams
            try {
                const recoveredAddress = ethers.recoverAddress( digest, signature )
                struct.data = {
                    digest,
                    recoveredAddress,
                    signature
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to recover address' )
            }
            return { struct, payload }
        }
    }
}


export { schema }
