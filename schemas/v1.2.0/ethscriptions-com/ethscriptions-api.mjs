export const schema = {
    namespace: "ethscriptions",
    name: "Ethscriptions API V2",
    description: "Access the Ethscriptions protocol - Ethereum-based digital artifacts and tokens",
    docs: ["https://api.ethscriptions.com/v2", "https://github.com/0xFacet/ethscriptions-indexer"],
    tags: ["nft", "ethereum", "inscriptions"],
    flowMCP: "1.2.0",
    root: "https://api.ethscriptions.com/v2",
    requiredServerParams: [],
    headers: {},
    routes: {
        listEthscriptions: {
            requestMethod: "GET",
            description: "Retrieve a list of ethscriptions with various filtering options",
            route: "/ethscriptions",
            parameters: [
                { position: { key: "current_owner", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)", "optional()"] } },
                { position: { key: "creator", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)", "optional()"] } },
                { position: { key: "initial_owner", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)", "optional()"] } },
                { position: { key: "mimetype", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "token_tick", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "token_protocol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "after_block", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "optional()"] } },
                { position: { key: "before_block", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "optional()"] } },
                { position: { key: "sort_by", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(newest_first,oldest_first)", options: ["default(newest_first)", "optional()"] } },
                { position: { key: "max_results", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(50)", "default(25)", "optional()"] } },
                { position: { key: "page_key", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get latest ethscriptions", max_results: 10 },
                { _description: "Get ethscriptions by owner", current_owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", max_results: 5 },
                { _description: "Get ethscriptions by token tick", token_tick: "eths", max_results: 15 },
                { _description: "Get recent ethscriptions after block", after_block: 19000000, max_results: 20 }
            ],
            modifiers: []
        },
        getEthscription: {
            requestMethod: "GET",
            description: "Get detailed information about a specific ethscription by transaction hash or number",
            route: "/ethscriptions/:id",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get ethscription by transaction hash", id: "0x0ef100873db4e3b7446e9a3be0432ab8bc92119d009aa200f70c210ac9dcd4a6" },
                { _description: "Get ethscription by number", id: "5853618" }
            ],
            modifiers: []
        },
        getEthscriptionData: {
            requestMethod: "GET",
            description: "Retrieve the raw content data of an ethscription",
            route: "/ethscriptions/:id/data",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get ethscription data by transaction hash", id: "0x0ef100873db4e3b7446e9a3be0432ab8bc92119d009aa200f70c210ac9dcd4a6" },
                { _description: "Get ethscription data by number", id: "0" }
            ],
            modifiers: []
        },
        getEthscriptionAttachment: {
            requestMethod: "GET",
            description: "Retrieve the raw attachment data of an ethscription",
            route: "/ethscriptions/:id/attachment",
            parameters: [
                { position: { key: "id", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get ethscription attachment", id: "0xcf23d640184114e9d870a95f0fdc3aa65e436c5457d5b6ee2e3c6e104420abd1" }
            ],
            modifiers: []
        },
        checkEthscriptionExists: {
            requestMethod: "GET",
            description: "Check if an ethscription exists by its content SHA hash",
            route: "/ethscriptions/exists/:sha",
            parameters: [
                { position: { key: "sha", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Check ethscription existence by SHA", sha: "0x2817fd9cf901e4435253881550731a5edc5e519c19de46b08e2b19a18e95143e" }
            ],
            modifiers: []
        },
        checkMultipleEthscriptionsExistence: {
            requestMethod: "POST",
            description: "Check existence of multiple ethscriptions by SHA hashes (max 100)",
            route: "/ethscriptions/exists_multi",
            parameters: [
                { position: { key: "shas", value: "{{USER_PARAM}}", location: "body" }, z: { primitive: "array()", options: ["min(1)", "max(100)"] } }
            ],
            tests: [
                { _description: "Check multiple ethscriptions existence", shas: ["0x2817fd9cf901e4435253881550731a5edc5e519c19de46b08e2b19a18e95143e", "0xdcb130d85be00f8fd735ddafcba1cc83f99ba8dab0fc79c833401827b615c92b"] }
            ],
            modifiers: []
        },
        listTransfers: {
            requestMethod: "GET",
            description: "List ethscription transfers with filtering options",
            route: "/ethscription_transfers",
            parameters: [
                { position: { key: "from_address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)", "optional()"] } },
                { position: { key: "to_address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)", "optional()"] } },
                { position: { key: "transaction_hash", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(1)", "optional()"] } },
                { position: { key: "ethscription_token_tick", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "ethscription_token_protocol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "sort_by", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(newest_first,oldest_first)", options: ["default(newest_first)", "optional()"] } },
                { position: { key: "max_results", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(50)", "default(25)", "optional()"] } },
                { position: { key: "page_key", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get recent transfers", max_results: 10 },
                { _description: "Get transfers from address", from_address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", max_results: 5 },
                { _description: "Get transfers for token tick", ethscription_token_tick: "eths", max_results: 15 }
            ],
            modifiers: []
        },
        listTokens: {
            requestMethod: "GET",
            description: "List ethscription tokens with filtering options",
            route: "/tokens",
            parameters: [
                { position: { key: "protocol", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "tick", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } },
                { position: { key: "sort_by", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "enum(newest_first,oldest_first)", options: ["default(newest_first)", "optional()"] } },
                { position: { key: "max_results", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)", "max(50)", "default(25)", "optional()"] } },
                { position: { key: "page_key", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["optional()"] } }
            ],
            tests: [
                { _description: "Get all tokens", max_results: 20 },
                { _description: "Get erc-20 protocol tokens", protocol: "erc-20", max_results: 10 },
                { _description: "Get specific token tick", tick: "nodes", max_results: 5 }
            ],
            modifiers: []
        },
        getTokenDetails: {
            requestMethod: "GET",
            description: "Get detailed information about a specific token including balances",
            route: "/tokens/:protocol/:tick",
            parameters: [
                { position: { key: "protocol", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "tick", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get erc-20 nodes token details", protocol: "erc-20", tick: "nodes" },
                { _description: "Get erc-20 eths token details", protocol: "erc-20", tick: "eths" }
            ],
            modifiers: []
        },
        getTokenHistoricalState: {
            requestMethod: "GET",
            description: "Get historical state of a token at a specific block number",
            route: "/tokens/:protocol/:tick/historical_state",
            parameters: [
                { position: { key: "protocol", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "tick", value: "{{USER_PARAM}}", location: "insert" }, z: { primitive: "string()", options: ["min(1)"] } },
                { position: { key: "as_of_block", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "number()", options: ["min(1)"] } }
            ],
            tests: [
                { _description: "Get token historical state", protocol: "erc-20", tick: "nodes", as_of_block: 19000000 }
            ],
            modifiers: []
        },
        getIndexerStatus: {
            requestMethod: "GET",
            description: "Get current status of the ethscriptions indexer",
            route: "/status",
            parameters: [],
            tests: [
                { _description: "Get indexer status" }
            ],
            modifiers: []
        }
    },
    handlers: {}
}