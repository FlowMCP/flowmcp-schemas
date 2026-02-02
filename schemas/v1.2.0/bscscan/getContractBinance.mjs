const schema = {
    namespace: "bscscan",
    name: "BSC Scan",
    description: "Retrieve smart contract ABI and verified Solidity source code from BSCScan (Binance Smart Chain explorer). Returns the contract interface definition and full source for any verified contract address on BSC.",
    docs: ["https://docs.bscscan.com/"],
    tags: [ 'test'],
    flowMCP: "1.2.0",
    root: "https://api.bscscan.com/",
    requiredServerParams: [ "BSCSCAN_API_KEY" ],
    headers: {},
    routes: {
      getContractABI: {
        requestMethod: "GET",
        description: "Returns the Contract ABI of a verified smart contract via BSCScan. Returns structured JSON response data.",
        route: "/api",
        parameters: [
          { position: { key: "module", value: "contract", location: "body" } },
          { position: { key: "module", value: "contract", location: "query" } },
          { position: { key: "action", value: "getabi", location: "query" } },
          { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(42)", "max(42)"] } },
          { position: { key: "apikey", value: "{{BSCSCAN_API_KEY}}", location: "query" } }
        ],
        tests: [
          { _description: "Basic test for getContractABI", address: "0xca143ce32fe78f1f7019d7d551a6402fc5350c73"}
        ],
        modifiers: [
          { phase: "post", handlerName: "modifyResult" }
        ]
      },
      getContractSourceCode: {
        requestMethod: "GET",
        description: "Returns the Solidity source code of a verified smart contract. Required: address.",
        route: "/api",
        parameters: [
          { position: { key: "module", value: "contract", location: "query" } },
          { position: { key: "action", value: "getsourcecode", location: "query" } },
          { position: { key: "address", value: "{{USER_PARAM}}", location: "query" }, z: { primitive: "string()", options: ["min(42)", "max(42)"] } },
          { position: { key: "apikey", value: "{{BSCSCAN_API_KEY}}", location: "query" } }
        ],
        tests: [
          { _description: "Basic test for getContractSourceCode", address: "0xca143ce32fe78f1f7019d7d551a6402fc5350c73" }
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
  