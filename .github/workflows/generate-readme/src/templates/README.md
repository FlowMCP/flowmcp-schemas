# FlowMCP Schema Library

This repository contains a modular collection of schema definitions designed for use with [FlowMCP](https://github.com/a6b8/FlowMCP), a framework that adapts and standardizes REST and GraphQL APIs for interaction with AI systems.

Each schema defines the structure, routes, parameters, and integration logic of a specific API provider. The schemas are fully MCP-compatible and can be seamlessly activated in your local or remote FlowMCP server.

📚 **[Browse Interactive Documentation](https://flowmcp.github.io/flowmcp-schemas/)** - Visual schema browser with search and filtering

---

## 📦 Available Schemas

Below is a list of all available schemas in this library, grouped by provider and sorted alphabetically. Each schema includes one or more MCP-compatible routes.

{{INSERT_TABLE}}

---

## 🚀 Example: Start Local Server with All Schemas

This script dynamically loads and activates all available schemas using the FlowMCP schema importer and local server utilities.

File: `local-server-module.mjs`

```js
import fs from 'fs'
import { SchemaImporter } from 'schemaimporter'

import { FlowMCP } from '../../src/index.mjs'
import { LocalServer } from '../../src/index.mjs'

console.log('Starting Local Server...')
const schemaFilePaths = await SchemaImporter.get({
    onlyWithoutImports: true,
    withMetaData: true,
    withSchema: true
})
const arrayOfSchemas = schemaFilePaths.map(({ schema }) => schema)

const { includeNamespaces, excludeNamespaces, activateTags, source } = FlowMCP.getArgvParameters({
    argv: process.argv,
    includeNamespaces: [],
    excludeNamespaces: [],
    activateTags: [],
})

// Provide your environment variables here
const envObject = /* insert your own environment variable object here */

const { activationPayloads } = FlowMCP.prepareActivations({
    arrayOfSchemas,
    envObject,
    activateTags,
    includeNamespaces,
    excludeNamespaces
})

const localServer = new LocalServer({ silent: true })
localServer.addActivationPayloads({ activationPayloads })
await localServer.start()
console.log('Local Server started successfully.')
```

---

## 🧠 Claude Configuration Example

This configuration snippet demonstrates how to start FlowMCP with a Claude-compatible MCP server:

```json
{{INSERT_COMMAND_STRING}}
```

---

## 🧹 Contributing

Want to add or improve a schema? Fork the repo, place your `.mjs` schema file under `schemas/<provider>/`, and submit a pull request.

Please follow the formatting and conventions described in the [FlowMCP README](../README.md), including:

* 4-space indentation
* Single-line JSON objects for `tests`, `parameters`, and `modifiers`
* Use `const schema = { ... }` followed by `export { schema }` with two line breaks