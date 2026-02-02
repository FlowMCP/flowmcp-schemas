import { ethers } from 'ethers'


const schema = {
    namespace: "ethers",
    name: "Ethers Convert Utils",
    description: "Offline unit conversion and data transformation utilities powered by ethers.js. Convert between wei and human-readable units, format and parse ether values, hexlify numbers, and convert between hex and UTF-8. No RPC or API key required.",
    docs: ["https://docs.ethers.org/v6/api/utils/"],
    tags: ["blockchain", "evm", "conversion", "units", "encoding", "offline"],
    flowMCP: "1.2.0",
    root: "https://offline.ethers.local",
    requiredServerParams: [],
    headers: {},
    routes: {
        formatUnits: {
            requestMethod: "GET",
            description: "Format a wei value into a human-readable string with the specified number of decimals. Default is 18 (like ETH). Use 6 for USDC/USDT, 8 for WBTC.",
            route: "/",
            parameters: [
                { position: { key: "value", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "decimals", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "max(77)", "optional()", "default(18)"] } }
            ],
            tests: [
                { _description: "Format 1 ETH in wei", value: "1000000000000000000", decimals: 18 },
                { _description: "Format 1 USDC (6 decimals)", value: "1000000", decimals: 6 }
            ],
            modifiers: [
                { phase: "execute", handlerName: "formatUnitsExecute" }
            ]
        },
        parseUnits: {
            requestMethod: "GET",
            description: "Parse a human-readable value string into wei with the specified number of decimals. Default is 18. Use 6 for USDC/USDT, 8 for WBTC.",
            route: "/",
            parameters: [
                { position: { key: "value", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "decimals", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(0)", "max(77)", "optional()", "default(18)"] } }
            ],
            tests: [
                { _description: "Parse 1.5 ETH to wei", value: "1.5", decimals: 18 },
                { _description: "Parse 100 USDC to atomic units", value: "100", decimals: 6 }
            ],
            modifiers: [
                { phase: "execute", handlerName: "parseUnitsExecute" }
            ]
        },
        formatEther: {
            requestMethod: "GET",
            description: "Format a wei value to ether (18 decimals). Shorthand for formatUnits(value, 18).",
            route: "/",
            parameters: [
                { position: { key: "value", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Format 1 ETH", value: "1000000000000000000" },
                { _description: "Format 0.5 ETH", value: "500000000000000000" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "formatEtherExecute" }
            ]
        },
        parseEther: {
            requestMethod: "GET",
            description: "Parse an ether string to wei. Shorthand for parseUnits(value, 18).",
            route: "/",
            parameters: [
                { position: { key: "value", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Parse 1.0 ETH", value: "1.0" },
                { _description: "Parse 0.001 ETH", value: "0.001" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "parseEtherExecute" }
            ]
        },
        hexlify: {
            requestMethod: "GET",
            description: "Convert a number or numeric string to a 0x-prefixed hex string.",
            route: "/",
            parameters: [
                { position: { key: "value", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Hexlify 255", value: "255" },
                { _description: "Hexlify 1000000", value: "1000000" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "hexlifyExecute" }
            ]
        },
        toUtf8String: {
            requestMethod: "GET",
            description: "Decode a hex-encoded byte string to its UTF-8 text representation.",
            route: "/",
            parameters: [
                { position: { key: "data", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["regex(^0x[a-fA-F0-9]*$)"] } }
            ],
            tests: [
                { _description: "Decode Hello World hex", data: "0x48656c6c6f20576f726c64" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "toUtf8StringExecute" }
            ]
        },
        toUtf8Bytes: {
            requestMethod: "GET",
            description: "Encode a UTF-8 text string to its hex-encoded byte representation.",
            route: "/",
            parameters: [
                { position: { key: "text", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Encode Hello World to hex", text: "Hello World" }
            ],
            modifiers: [
                { phase: "execute", handlerName: "toUtf8BytesExecute" }
            ]
        }
    },
    handlers: {
        formatUnitsExecute: async ( { struct, payload, userParams } ) => {
            const { value } = userParams
            const decimals = userParams.decimals !== undefined ? Number( userParams.decimals ) : 18
            try {
                const formatted = ethers.formatUnits( value, decimals )
                struct.data = {
                    wei: value,
                    decimals,
                    formatted
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to format units' )
            }
            return { struct, payload }
        },
        parseUnitsExecute: async ( { struct, payload, userParams } ) => {
            const { value } = userParams
            const decimals = userParams.decimals !== undefined ? Number( userParams.decimals ) : 18
            try {
                const parsed = ethers.parseUnits( value, decimals )
                struct.data = {
                    input: value,
                    decimals,
                    wei: parsed.toString()
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to parse units' )
            }
            return { struct, payload }
        },
        formatEtherExecute: async ( { struct, payload, userParams } ) => {
            const { value } = userParams
            try {
                const formatted = ethers.formatEther( value )
                struct.data = {
                    wei: value,
                    ether: formatted
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to format ether' )
            }
            return { struct, payload }
        },
        parseEtherExecute: async ( { struct, payload, userParams } ) => {
            const { value } = userParams
            try {
                const parsed = ethers.parseEther( value )
                struct.data = {
                    ether: value,
                    wei: parsed.toString()
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to parse ether' )
            }
            return { struct, payload }
        },
        hexlifyExecute: async ( { struct, payload, userParams } ) => {
            const { value } = userParams
            try {
                const hex = ethers.toBeHex( BigInt( value ) )
                struct.data = {
                    input: value,
                    hex
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to hexlify value' )
            }
            return { struct, payload }
        },
        toUtf8StringExecute: async ( { struct, payload, userParams } ) => {
            const { data } = userParams
            try {
                const text = ethers.toUtf8String( data )
                struct.data = {
                    hex: data,
                    text
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to decode UTF-8 string' )
            }
            return { struct, payload }
        },
        toUtf8BytesExecute: async ( { struct, payload, userParams } ) => {
            const { text } = userParams
            try {
                const bytes = ethers.toUtf8Bytes( text )
                const hex = ethers.hexlify( bytes )
                struct.data = {
                    text,
                    hex,
                    byteLength: bytes.length
                }
                struct.status = true
            } catch( e ) {
                struct.status = false
                struct.messages.push( e?.message || 'Failed to encode UTF-8 bytes' )
            }
            return { struct, payload }
        }
    }
}


export { schema }
