const schema = {
    namespace: "etherscan",
    name: "Etherscan",
    description: "Retrieve smart contract ABI and verified Solidity source code from Etherscan (Ethereum mainnet). Returns the contract interface definition and full source for any verified contract address on Ethereum.",
    docs: ["https://docs.etherscan.io"],
    tags: ["ethereum", "contracts", "explorer", "cacheTtlDaily"],
    flowMCP: "1.2.0",
    root: "https://api.etherscan.io/v2/api",
    requiredServerParams: [ "ETHERSCAN_API_KEY" ],
    headers: {},
    routes: {
      getContractABI: {
        requestMethod: "GET",
        description: "Returns the Contract ABI of a verified smart contract via Etherscan. Returns structured JSON response data.",
        route: "/",
        parameters: [
          { position: { key: "chainid", value: "1", location: "query" } },
          { position: { key: "module", value: "contract", location: "query" } },
          { position: { key: "action", value: "getabi", location: "query" } },
          { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(42)", "max(42)"] } },
          { position: { key: "apikey", value: "{{ETHERSCAN_API_KEY}}", location: "query" } }
        ],
        tests: [
          { _description: "Uniswap V2 Factory", address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f" },
          { _description: "Uniswap V2 Router02", address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" }
        ],
        modifiers: [
          { phase: "post", handlerName: "modifyResult" }
        ]
      },
      getContractSourceCode: {
        requestMethod: "GET",
        description: "Returns the Solidity source code of a verified smart contract. Required: address.",
        route: "/",
        parameters: [
          { position: { key: "chainid", value: "1", location: "query" } },
          { position: { key: "module", value: "contract", location: "query" } },
          { position: { key: "action", value: "getsourcecode", location: "query" } },
          { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(42)", "max(42)"] } },
          { position: { key: "apikey", value: "{{ETHERSCAN_API_KEY}}", location: "query" } }
        ],
        tests: [
          { _description: "Uniswap V2 Factory", address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f" },
          { _description: "Uniswap V2 Router02", address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" }
        ],
        modifiers: [
          { phase: "post", handlerName: "modifyResult" }
        ]
      }
    },
    handlers: {
      modifyResult: async ( { struct, payload } ) => {
        if( struct['data'].status !== "1" ) {
          struct['status'] = false
          struct['messages'].push(struct.data.message);
          return { struct, payload }
        }
        struct['data'] = struct['data'].result
        return { struct, payload }
      }
    }
}


export { schema };
