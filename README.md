[![CircleCI](https://img.shields.io/circleci/build/github/a6b8/multiThreadz/main)]()  
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

# flowMCP Schemas

This repository contains reusable API schemas that can be imported and used with [a6b8/flowMCP](https://github.com/a6b8/flowMCP).

## Features:
- Plug & Play integration of REST APIs
- Schema-based validation and structure
- Supports env variables, test cases & post-process handlers
- Easy to extend and maintain

## Quickstart

Install via:

```bash
npm i a6b8/flowMCP-schema
```

Import a schema:

```js
import { schema } from 'flowMCP-schema/schemas/{{name}}/schema.mjs'
```

## Table of Contents
- [flowMCP Schemas](#flowmcp-schemas)
  - [Features:](#features)
  - [Quickstart](#quickstart)
  - [Table of Contents](#table-of-contents)
  - [Schema List](#schema-list)
  - [License](#license)

## Schema List

| Name      | # of Endpoints | Schema File                                  | README File                                  |
|-----------|----------------|-----------------------------------------------|----------------------------------------------|
| Etherscan | 2              | [schema.mjs](./schemas/etherscan/schema.mjs) | [README.md](./schemas/etherscan/README.md)   |

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
