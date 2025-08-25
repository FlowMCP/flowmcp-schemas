import { ethers } from 'ethers'

const infuraSubDomain = {
    "ETHEREUM_MAINNET": "mainnet",
    "SEPOLIA_TESTNET": "sepolia",
    "ARBITRUM_MAINNET": "arbitrum-mainnet",
    "AVALANCHE_MAINNET": "avalanche-mainnet",
    "BASE_MAINNET": "base-mainnet",
    "BINANCE_MAINNET": "bsc-mainnet",
    "CELO_MAINNET": "celo-mainnet",
    "LINEA_MAINNET": "linea-mainnet",
    "MANTLE_MAINNET": "mantle-mainnet",
    "SCROLL_MAINNET": "scroll-mainnet",
    "OPTIMISM_MAINNET": "optimism-mainnet",
    "POLYGON_MAINNET": "polygon-mainnet",
    "ZKSYNC_MAINNET": "zksync-mainnet"
}

const ENS_SUPPORTED_NATIVE = ["ETHEREUM_MAINNET", "SEPOLIA_TESTNET"]
const SEI_SUPPORT = { supported: false, reason: "Sei is not natively supported by ENS via ethers.js; use a Cosmos/ICNS-style resolver instead." }

const schema = {
    namespace: "ens",
    name: "ENS & EVM Name Resolution",
    description: "Resolve ENS (and some EVM name services supported by ethers.js) to addresses and perform reverse lookups from addresses to ENS names.",
    docs: ["https://docs.ethers.org/v6/api/providers/#Provider-resolveName", "https://docs.ethers.org/v6/api/providers/#Provider-lookupAddress", "https://docs.ens.domains/"],
    tags: ["production", "ens.resolveName", "ens.lookupAddress", "ens.supportMatrix"],
    flowMCP: "1.2.0",
    root: "https://--infura-subdomain--.infura.io/v3/{{INFURA_API_KEY}}",
    requiredServerParams: ["INFURA_API_KEY"],
    headers: {},
    routes: {
        resolveName: {
            requestMethod: "GET",
            description: "Resolves a human-readable name (e.g., vitalik.eth) to a checksummed address on the selected chain.",
            route: "/",
            parameters: [
                { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,ARBITRUM_MAINNET,AVALANCHE_MAINNET,BASE_MAINNET,BINANCE_MAINNET,CELO_MAINNET,LINEA_MAINNET,MANTLE_MAINNET,SCROLL_MAINNET,OPTIMISM_MAINNET,POLYGON_MAINNET,ZKSYNC_MAINNET)", options: [] } },
                { position: { key: "name", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(3)"] } }
            ],
            tests: [
                { _description: "Resolve vitalik.eth on Ethereum mainnet", chainName: "ETHEREUM_MAINNET", name: "vitalik.eth" },
                { _description: "Resolve chainlink.eth on Ethereum mainnet", chainName: "ETHEREUM_MAINNET", name: "andr3a5.eth" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSubdomain" },
                { phase: "execute", handlerName: "resolveNameExecute" }
            ]
        },
        lookupAddress: {
            requestMethod: "GET",
            description: "Looks up the primary ENS name for a given address (reverse record) on the selected chain.",
            route: "/",
            parameters: [
                { position: { key: "chainName", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "enum(ETHEREUM_MAINNET,SEPOLIA_TESTNET,ARBITRUM_MAINNET,AVALANCHE_MAINNET,BASE_MAINNET,BINANCE_MAINNET,CELO_MAINNET,LINEA_MAINNET,MANTLE_MAINNET,SCROLL_MAINNET,OPTIMISM_MAINNET,POLYGON_MAINNET,ZKSYNC_MAINNET)", options: [] } },
                { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["length(42)", "regex(^0x[a-fA-F0-9]{40}$)"] } }
            ],
            tests: [
                { _description: "Reverse lookup a known address on mainnet", chainName: "ETHEREUM_MAINNET", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
            ],
            modifiers: [
                { phase: "pre", handlerName: "insertSubdomain" },
                { phase: "execute", handlerName: "lookupAddressExecute" }
            ]
        },
        supportMatrix: {
            requestMethod: "GET",
            description: "Returns the supported networks for ENS resolution and whether SEI is supported.",
            route: "/support",
            parameters: [
                { position: { key: "includeAll", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "boolean()", options: [] } }
            ],
            tests: [
                { _description: "List support matrix (default)", includeAll: false },
                { _description: "List support matrix (verbose)", includeAll: true }
            ],
            modifiers: [
                { phase: "execute", handlerName: "supportMatrixExecute" }
            ]
        }
    },
    handlers: {
        insertSubdomain: async ({ struct, payload, userParams }) => {
            const chain = infuraSubDomain[userParams.chainName]
            if (!chain) {
                struct.status = false
                struct.messages.push(`Unsupported or unknown chain: ${userParams.chainName}.`)
                return { struct, payload }
            }
            payload.url = payload.url.replace("--infura-subdomain--", chain)
            return { struct, payload }
        },
        resolveNameExecute: async ({ struct, payload, userParams }) => {
            const { name, chainName } = userParams
            // Quick guard for SEI explicitly
            if (String(chainName).toUpperCase() === "SEI" || String(chainName).toUpperCase() === "SEI_MAINNET") {
                struct.status = false
                struct.messages.push(SEI_SUPPORT.reason)
                return { struct, payload }
            }
            try {
                const provider = new ethers.JsonRpcProvider(payload.url)
                const address = await provider.resolveName(String(name).trim())
                if (!address) {
                    struct.status = false
                    struct.messages.push(`No address found for name "${name}" on ${chainName}. Note: many L2s do not natively support ENS.`)
                    return { struct, payload }
                }
                struct.data = { name, address, chainName, ensNative: ENS_SUPPORTED_NATIVE.includes(chainName) }
                struct.status = true
            } catch (e) {
                struct.status = false
                struct.messages.push(e?.message || `Resolution failed on ${chainName}. If this is an L2, ENS may not be supported natively.`)
            }
            return { struct, payload }
        },
        lookupAddressExecute: async ({ struct, payload, userParams }) => {
            const { address, chainName } = userParams
            if (String(chainName).toUpperCase() === "SEI" || String(chainName).toUpperCase() === "SEI_MAINNET") {
                struct.status = false
                struct.messages.push(SEI_SUPPORT.reason)
                return { struct, payload }
            }
            try {
                const provider = new ethers.JsonRpcProvider(payload.url)
                const ensName = await provider.lookupAddress(address)
                if (!ensName) {
                    struct.status = false
                    struct.messages.push(`No ENS name set for address "${address}" on ${chainName}.`)
                    return { struct, payload }
                }
                struct.data = { address: ethers.getAddress(address), name: ensName, chainName, ensNative: ENS_SUPPORTED_NATIVE.includes(chainName) }
                struct.status = true
            } catch (e) {
                struct.status = false
                struct.messages.push(e?.message || `Reverse lookup failed on ${chainName}. If this is an L2, ENS may not be supported natively.`)
            }
            return { struct, payload }
        },
        supportMatrixExecute: async ({ struct, payload, userParams }) => {
            const includeAll = Boolean(userParams.includeAll)
            const evmViaInfura = Object.keys(infuraSubDomain)
            const matrix = {
                ensNative: ENS_SUPPORTED_NATIVE,
                evmViaInfura,
                sei: SEI_SUPPORT,
                notes: [
                    "ENS is Ethereum-native. Some L2s may resolve via CCIP-read/gateways but are not guaranteed.",
                    "SEI is a Cosmos-based chain; use ICNS or a chain-specific naming service for name->address."
                ]
            }
            struct.data = includeAll ? matrix : { ensNative: matrix.ensNative, sei: matrix.sei }
            struct.status = true
            return { struct, payload }
        }
    }
}

export { schema }