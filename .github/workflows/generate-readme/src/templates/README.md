# FlowMCP Schema Library

This repository contains a comprehensive collection of schema modules designed for use with [FlowMCP](https://github.com/a6b8/FlowMCP), a framework for adapting and standardizing REST APIs for interaction with AI systems.

Each schema describes the structure, routes, parameters, and integration requirements of a specific API provider, allowing them to be seamlessly activated and queried via the MCP interface.

---

## 📦 Available Schemas

Below is a list of all available schemas in this library, grouped by provider and sorted alphabetically. Each schema includes one or more MCP-compatible routes.

{{INSERT_TABLE}}


---

## 🚀 Example: Start Server with All Schemas

This script loads and activates all available schemas into a local MCP-compatible server.

File: `2-start-server.mjs`

```js
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { FlowMCP, Server } from 'flowmcp'
import { fileURLToPath } from 'url'
import path from 'path'

const config = {
    name: 'Test',
    description: 'This is a development server for testing purposes.',
    version: '1.2.0'
}

Server
  .getArgvParameters({
      argv: process.argv,
      includeNamespaces: [],
      excludeNamespaces: [],
      activateTags: []
  })
  .prepare({
      scriptRootFolder: path.dirname(fileURLToPath(import.meta.url)),
      schemasRootFolder: './../schemas/v1.2.0/',
      localEnvPath: './../../.env'
  })
  .then(async (schemas) => {
      const server = new McpServer(config)

      schemas.forEach(({ schema, serverParams, activateTags }) => {
          FlowMCP.activateServerTools({
              server,
              schema,
              serverParams,
              activateTags,
              silent: false
          })
      })

      const transport = new StdioServerTransport()
      await server.connect(transport)
  }).catch((e) => {
      console.error('Error starting server:', e)
  })
```

---

## 🧠 Claude Configuration Example

This configuration snippet demonstrates how to start FlowMCP with a Claude-compatible MCP server:

```json
{{INSERT_COMMAND_STRING}}
```

---

## 🧹 Contributing

Want to add or improve a schema? Fork the repo, add your `.mjs` schema file under `schemas/<provider>/`, and submit a pull request.

Please follow the formatting and conventions described in the [FlowMCP README](../README.md), including:

* 4-space indentation
* One-line JSON objects for `tests`, `parameters`, and `modifiers`
* `const schema = { ... }` followed by `export { schema }` with two newlines between
