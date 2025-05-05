export const schema = {
  namespace: "solscan",
  name: "SolscanChainInfo",
  description: "Fetches general blockchain information from Solana via Solscan public API.",
  docs: ["https://docs.solscan.io/api-access/pro-api-endpoints"],
  tags: [],
  flowMCP: "1.2.0",
  root: "https://public-api.solscan.io",
  requiredServerParams: ["SOLSCAN_API_KEY"],
  headers: {
    token: "{{SOLSCAN_API_KEY}}"
  },
  routes: {
    chainInfo: {
      requestMethod: "GET",
      description: "Returns Solana blockchain information such as block height and transaction count.",
      route: "/chaininfo",
      parameters: [],
      tests: [
        {
          _description: "Basic test to fetch chain information"
        }
      ],
      modifiers: [
        {
          phase: "post",
          handlerName: "defaultHandler"
        }
      ]
    }
  },
  handlers: {
    defaultHandler: async ({ struct, payload }) => {
      if( !struct['data']['success'] ) {
        struct['status'] = false
        return { struct, payload }
      }
      struct['data'] = struct['data']['data']

      return { struct, payload }
    }
  }
}
