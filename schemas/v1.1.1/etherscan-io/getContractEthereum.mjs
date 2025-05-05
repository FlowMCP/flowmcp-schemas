const schema = {
    name: "Etherscan",
    description: "Etherscan API",
    version: "1.0.0",
    flowMCP: "1.0.0",
    root: "https://api.etherscan.io",
    requiredServerParams: [ "ETHERSCAN_API_KEY" ],
    headers: {},
    routes: {
      getContractABI: {
        requestMethod: "GET",
        description: "Returns the Contract ABI of a verified smart contract.",
        route: "/api",
        parameters: [
          { position: { key: "module", value: "contract", location: "body" } },
          { position: { key: "module", value: "contract", location: "query" } },
          { position: { key: "action", value: "getabi", location: "query" } },
          { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(42)", "max(42)"] } },
          { position: { key: "apikey", value: "{{ETHERSCAN_API_KEY}}", location: "query" } }
        ],
        tests: [
          { _description: "Basic test for getContractABI", address: "0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413"}
        ],
        modifiers: [
          { phase: "post", handlerName: "modifyResult" }
        ]
      },
      getContractSourceCode: {
        requestMethod: "GET",
        description: "Returns the Solidity source code of a verified smart contract.",
        route: "/api",
        parameters: [
          { position: { key: "module", value: "contract", location: "query" } },
          { position: { key: "action", value: "getsourcecode", location: "query" } },
          { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(42)", "max(42)"] } },
          { position: { key: "apikey", value: "{{ETHERSCAN_API_KEY}}", location: "query" } }
        ],
        tests: [
          { _description: "Basic test for getContractSourceCode", address: "0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413" }
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
  