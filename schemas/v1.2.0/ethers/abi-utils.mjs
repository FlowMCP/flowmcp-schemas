import { ethers } from 'ethers'


const schema = {
    namespace: "ethers",
    name: "Ethers ABI Utils",
    description: "Offline ABI encoding and decoding utilities powered by ethers.js. Decode calldata, encode function calls, decode event logs, compute function selectors, and ABI encode/decode arbitrary parameters. No RPC or API key required.",
    docs: ["https://docs.ethers.org/v6/api/abi/"],
    tags: ["blockchain", "evm", "abi", "encoding", "decoding", "offline"],
    flowMCP: "1.2.0",
    root: "https://offline.ethers.local",
    requiredServerParams: [],
    headers: {},
    routes: {
        decodeFunctionData: {
            requestMethod: "GET",
            description: "Decode calldata (transaction input) using a human-readable ABI fragment. Returns the function name and decoded arguments.",
            route: "/",
            parameters: [
                { position: { key: "functionSignature", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "data", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]+$)"] } }
            ],
            tests: [
                { _description: "Decode ERC-20 transfer calldata", functionSignature: "function transfer(address to, uint256 amount)", data: "0xa9059cbb000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000de0b6b3a7640000" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "decodeFunctionDataExecute" }
            ]
        },
        encodeFunctionData: {
            requestMethod: "GET",
            description: "Encode a function call into calldata using a human-readable ABI fragment and arguments as a JSON array string.",
            route: "/",
            parameters: [
                { position: { key: "functionSignature", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "args", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()", "default([])"] } }
            ],
            tests: [
                { _description: "Encode ERC-20 transfer call", functionSignature: "function transfer(address to, uint256 amount)", args: "[\"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045\", \"1000000000000000000\"]" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "encodeFunctionDataExecute" }
            ]
        },
        decodeEventLog: {
            requestMethod: "GET",
            description: "Decode an event log using a human-readable event ABI fragment, log data, and topics array (as JSON string).",
            route: "/",
            parameters: [
                { position: { key: "eventSignature", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(10)"] } },
                { position: { key: "data", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: [] } },
                { position: { key: "topics", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(4)"] } }
            ],
            tests: [
                { _description: "Decode ERC-20 Transfer event", eventSignature: "event Transfer(address indexed from, address indexed to, uint256 value)", data: "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000", topics: "[\"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef\",\"0x000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045\",\"0x000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7\"]" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "decodeEventLogExecute" }
            ]
        },
        computeSelector: {
            requestMethod: "GET",
            description: "Compute the 4-byte function selector from a function signature string (e.g. 'transfer(address,uint256)').",
            route: "/",
            parameters: [
                { position: { key: "signature", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)"] } }
            ],
            tests: [
                { _description: "Compute transfer selector", signature: "transfer(address,uint256)" },
                { _description: "Compute approve selector", signature: "approve(address,uint256)" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "computeSelectorExecute" }
            ]
        },
        encodeParameters: {
            requestMethod: "GET",
            description: "ABI encode parameters given types and values as JSON array strings. Types example: '[\"address\",\"uint256\"]', values example: '[\"0xabc...\",\"100\"]'.",
            route: "/",
            parameters: [
                { position: { key: "types", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(4)"] } },
                { position: { key: "values", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(2)"] } }
            ],
            tests: [
                { _description: "Encode address and uint256", types: "[\"address\",\"uint256\"]", values: "[\"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045\",\"1000000000000000000\"]" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "encodeParametersExecute" }
            ]
        },
        decodeParameters: {
            requestMethod: "GET",
            description: "ABI decode hex data back to values given types as a JSON array string. Types example: '[\"address\",\"uint256\"]'.",
            route: "/",
            parameters: [
                { position: { key: "types", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(4)"] } },
                { position: { key: "data", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]+$)"] } }
            ],
            tests: [
                { _description: "Decode address and uint256", types: "[\"address\",\"uint256\"]", data: "0x000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000de0b6b3a7640000" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "decodeParametersExecute" }
            ]
        }
    },
    handlers: {
        decodeFunctionDataExecute: async ( { struct, payload, userParams } ) => {
            const { functionSignature, data } = userParams
            try {
                const iface = new ethers.Interface( [ functionSignature ] )
                const decoded = iface.parseTransaction( { data } )
                if( !decoded ) {
                    struct.status = false
                    struct.messages.push( 'Failed to decode: selector mismatch or invalid data' )
                    return { struct, payload }
                }
                const args = {}
                decoded.fragment.inputs
                    .forEach( ( input, idx ) => {
                        const value = decoded.args[ idx ]
                        args[ input.name || `arg${idx}` ] = typeof value === 'bigint' ? value.toString() : value
                    } )
                struct.data = {
                    functionName: decoded.name,
                    selector: decoded.selector,
                    args,
                    signature: decoded.signature
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to decode function data' )
            }
            return { struct, payload }
        },
        encodeFunctionDataExecute: async ( { struct, payload, userParams } ) => {
            const { functionSignature } = userParams
            const args = userParams.args || '[]'
            try {
                const parsedArgs = JSON.parse( args )
                const iface = new ethers.Interface( [ functionSignature ] )
                const functionName = iface.fragments[ 0 ].name
                const encoded = iface.encodeFunctionData( functionName, parsedArgs )
                struct.data = {
                    functionName,
                    selector: encoded.slice( 0, 10 ),
                    encoded,
                    byteLength: ( encoded.length - 2 ) / 2
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to encode function data' )
            }
            return { struct, payload }
        },
        decodeEventLogExecute: async ( { struct, payload, userParams } ) => {
            const { eventSignature, data, topics } = userParams
            try {
                const parsedTopics = JSON.parse( topics )
                const iface = new ethers.Interface( [ eventSignature ] )
                const decoded = iface.parseLog( { data, topics: parsedTopics } )
                if( !decoded ) {
                    struct.status = false
                    struct.messages.push( 'Failed to decode: topic mismatch or invalid data' )
                    return { struct, payload }
                }
                const args = {}
                decoded.fragment.inputs
                    .forEach( ( input, idx ) => {
                        const value = decoded.args[ idx ]
                        args[ input.name || `arg${idx}` ] = typeof value === 'bigint' ? value.toString() : value
                    } )
                struct.data = {
                    eventName: decoded.name,
                    signature: decoded.signature,
                    topic: decoded.topic,
                    args
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to decode event log' )
            }
            return { struct, payload }
        },
        computeSelectorExecute: async ( { struct, payload, userParams } ) => {
            const { signature } = userParams
            try {
                const fullSig = signature.startsWith( 'function ' ) ? signature : `function ${signature}`
                const iface = new ethers.Interface( [ fullSig ] )
                const fragment = iface.fragments[ 0 ]
                struct.data = {
                    signature: fragment.format( 'sighash' ),
                    selector: iface.getFunction( fragment.name ).selector,
                    fullSignature: fragment.format( 'full' )
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to compute selector' )
            }
            return { struct, payload }
        },
        encodeParametersExecute: async ( { struct, payload, userParams } ) => {
            const { types, values } = userParams
            try {
                const parsedTypes = JSON.parse( types )
                const parsedValues = JSON.parse( values )
                const coder = ethers.AbiCoder.defaultAbiCoder()
                const encoded = coder.encode( parsedTypes, parsedValues )
                struct.data = {
                    types: parsedTypes,
                    encoded,
                    byteLength: ( encoded.length - 2 ) / 2
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to encode parameters' )
            }
            return { struct, payload }
        },
        decodeParametersExecute: async ( { struct, payload, userParams } ) => {
            const { types, data } = userParams
            try {
                const parsedTypes = JSON.parse( types )
                const coder = ethers.AbiCoder.defaultAbiCoder()
                const decoded = coder.decode( parsedTypes, data )
                const values = parsedTypes
                    .map( ( type, idx ) => {
                        const value = decoded[ idx ]
                        const formatted = typeof value === 'bigint' ? value.toString() : value

                        return { type, value: formatted }
                    } )
                struct.data = {
                    types: parsedTypes,
                    values
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to decode parameters' )
            }
            return { struct, payload }
        }
    }
}


export { schema }
