export const schema = {
  "name": "Moralis",
  "description": "Schema for Moralis Web3 Data API",
  "version": "1.0.0",
  "flowMCP": "v1.0.0",
  "root": "https://deep-index.moralis.io/api/v2.2",
  "requiredServerParams": [
    "MORALIS_API_KEY"
  ],
  "headers": {
    "X-API-Key": "Bearer {{MORALIS_API_KEY}}"
  },
  "routes": {
    "route_0": {
      "requestMethod": "GET",
      "description": "Get the contents of a block given the block hash.",
      "route": "/block/:block_number_or_hash",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "block_number_or_hash",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_0",
          "example": "exampleValue"
        }
      ]
    },
    "route_1": {
      "requestMethod": "GET",
      "description": "Get the closest block given the date.",
      "route": "/dateToBlock",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "date",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_1",
          "example": "exampleValue"
        }
      ]
    },
    "route_2": {
      "requestMethod": "GET",
      "description": "Get the contents of a transaction by the given transaction hash.",
      "route": "/transaction/:transaction_hash/verbose",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "transaction_hash",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_2",
          "example": "exampleValue"
        }
      ]
    },
    "route_3": {
      "requestMethod": "GET",
      "description": "Get native transactions and logs ordered by block number in descending order.",
      "route": "/:address/verbose",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_3",
          "example": "exampleValue"
        }
      ]
    },
    "route_4": {
      "requestMethod": "GET",
      "description": "Returns the latest block number for the given chain.",
      "route": "/latestBlockNumber/:chain",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "insert"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_4",
          "example": "exampleValue"
        }
      ]
    },
    "route_5": {
      "requestMethod": "GET",
      "description": "Get the contents of a transaction by the given transaction hash.",
      "route": "/transaction/:transaction_hash",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "transaction_hash",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_5",
          "example": "exampleValue"
        }
      ]
    },
    "route_6": {
      "requestMethod": "GET",
      "description": "Get native transactions ordered by block number in descending order.",
      "route": "/:address",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_6",
          "example": "exampleValue"
        }
      ]
    },
    "route_7": {
      "requestMethod": "GET",
      "description": "Get the detailed defi positions by protocol for a wallet address.",
      "route": "/wallets/:address/defi/:protocol/positions",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "addressprotocol",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "stringstring()",
            "options": [
              "enum(uniswap-v2,uniswap-v3,pancakeswap-v2,pancakeswap-v3,quickswap-v2,sushiswap-v2,aave-v2,aave-v3,fraxswap-v1,fraxswap-v2,lido,makerdao,eigenlayer)"
            ]
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_7",
          "example": "exampleValue"
        }
      ]
    },
    "route_8": {
      "requestMethod": "GET",
      "description": "Get the positions summary of a wallet address.",
      "route": "/wallets/:address/defi/positions",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_8",
          "example": "exampleValue"
        }
      ]
    },
    "route_9": {
      "requestMethod": "GET",
      "description": "Get the defi summary of a wallet address.",
      "route": "/wallets/:address/defi/summary",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_9",
          "example": "exampleValue"
        }
      ]
    },
    "route_10": {
      "requestMethod": "GET",
      "description": "Get Entities By Category",
      "route": "/entities/categories/:categoryId",
      "parameters": [
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "categoryId",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_10",
          "example": "exampleValue"
        }
      ]
    },
    "route_11": {
      "requestMethod": "GET",
      "description": "Retrieve detailed information about a specific entity by its ID",
      "route": "/entities/:entityId",
      "parameters": [
        {
          "position": {
            "key": "entityId",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_11",
          "example": "exampleValue"
        }
      ]
    },
    "route_12": {
      "requestMethod": "GET",
      "description": "Get Entity Categories",
      "route": "/entities/categories",
      "parameters": [
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_12",
          "example": "exampleValue"
        }
      ]
    },
    "route_13": {
      "requestMethod": "GET",
      "description": "Search for entities, addresses and categories",
      "route": "/entities/search",
      "parameters": [
        {
          "position": {
            "key": "query",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_13",
          "example": "exampleValue"
        }
      ]
    },
    "route_15": {
      "requestMethod": "GET",
      "description": "Get the top NFT collections by market cap",
      "route": "/market-data/nfts/top-collections",
      "parameters": [],
      "tests": [
        {
          "_description": "Test for route_15",
          "example": "exampleValue"
        }
      ]
    },
    "route_16": {
      "requestMethod": "GET",
      "description": "Get the top NFT collections by trading volume",
      "route": "/market-data/nfts/hottest-collections",
      "parameters": [],
      "tests": [
        {
          "_description": "Test for route_16",
          "example": "exampleValue"
        }
      ]
    },
    "route_18": {
      "requestMethod": "GET",
      "description": "Get NFTs for a given contract address, including metadata for all NFTs (where available).",
      "route": "/nft/:address",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "format",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "totalRanges",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "range",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "normalizeMetadata",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "media_items",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include_prices",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_18",
          "example": "exampleValue"
        }
      ]
    },
    "route_19": {
      "requestMethod": "POST",
      "description": "Returns an array of NFTs specified in the request.",
      "route": "/nft/getMultipleNFTs",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_19",
          "example": "exampleValue"
        }
      ]
    },
    "route_20": {
      "requestMethod": "GET",
      "description": "Get the stats for a nft collection address.",
      "route": "/nft/:address/stats",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_20",
          "example": "exampleValue"
        }
      ]
    },
    "route_21": {
      "requestMethod": "GET",
      "description": "Get the collection / contract level metadata for a given contract (name, symbol, base token URI).",
      "route": "/nft/:address/metadata",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include_prices",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_21",
          "example": "exampleValue"
        }
      ]
    },
    "route_22": {
      "requestMethod": "GET",
      "description": "Get the sold price for an NFT contract for the last x days (only trades paid in ETH).",
      "route": "/nft/:address/price",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "days",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_22",
          "example": "exampleValue"
        }
      ]
    },
    "route_23": {
      "requestMethod": "GET",
      "description": "Get transfers of NFTs for a given contract and other parameters.",
      "route": "/nft/:address/transfers",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "format",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include_prices",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_23",
          "example": "exampleValue"
        }
      ]
    },
    "route_24": {
      "requestMethod": "GET",
      "description": "Get floor price for a given contract.",
      "route": "/nft/:address/floor-price",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_24",
          "example": "exampleValue"
        }
      ]
    },
    "route_25": {
      "requestMethod": "GET",
      "description": "Get floor price for a given token.",
      "route": "/nft/:address/:token_id/floor-price",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "addresstoken_id",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "stringstring()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_25",
          "example": "exampleValue"
        }
      ]
    },
    "route_26": {
      "requestMethod": "GET",
      "description": "Get historical floor price for a given contract.",
      "route": "/nft/:address/floor-price/historical",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "interval",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()",
            "options": [
              "enum(1d,7d,30d,60d,90d,1y,all)"
            ]
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_26",
          "example": "exampleValue"
        }
      ]
    },
    "route_27": {
      "requestMethod": "GET",
      "description": "Get NFT data, including metadata (where available), for the given NFT token ID and contract address.",
      "route": "/nft/:address/:token_id",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "format",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "normalizeMetadata",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "media_items",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include_prices",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "addresstoken_id",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "stringstring()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_27",
          "example": "exampleValue"
        }
      ]
    },
    "route_28": {
      "requestMethod": "GET",
      "description": "Get owners of NFTs for a given contract.",
      "route": "/nft/:address/owners",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "format",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "normalizeMetadata",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "media_items",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_28",
          "example": "exampleValue"
        }
      ]
    },
    "route_29": {
      "requestMethod": "GET",
      "description": "Get the sold price for an NFT token for the last x days (only trades paid in ETH).",
      "route": "/nft/:address/:token_id/price",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "days",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "addresstoken_id",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "stringstring()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_29",
          "example": "exampleValue"
        }
      ]
    },
    "route_30": {
      "requestMethod": "GET",
      "description": "Get owners of a specific NFT given the contract address and token ID.",
      "route": "/nft/:address/:token_id/owners",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "format",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "normalizeMetadata",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "media_items",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "addresstoken_id",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "stringstring()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_30",
          "example": "exampleValue"
        }
      ]
    },
    "route_31": {
      "requestMethod": "GET",
      "description": "Get trades of NFTs for a given contract and token ID.",
      "route": "/nft/:address/:token_id/trades",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "nft_metadata",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "addresstoken_id",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "stringstring()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_31",
          "example": "exampleValue"
        }
      ]
    },
    "route_32": {
      "requestMethod": "GET",
      "description": "Get trades of NFTs for a given wallet.",
      "route": "/wallets/:address/nfts/trades",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "nft_metadata",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_32",
          "example": "exampleValue"
        }
      ]
    },
    "route_33": {
      "requestMethod": "GET",
      "description": "Get trades of NFTs for a given contract and marketplace.",
      "route": "/nft/:address/trades",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "marketplace",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "nft_metadata",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_33",
          "example": "exampleValue"
        }
      ]
    },
    "route_34": {
      "requestMethod": "GET",
      "description": "Get NFT traits for a given collection",
      "route": "/nft/:address/traits/paginate",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_34",
          "example": "exampleValue"
        }
      ]
    },
    "route_35": {
      "requestMethod": "GET",
      "description": "Get NFT traits for a given collection",
      "route": "/nft/:address/traits",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_35",
          "example": "exampleValue"
        }
      ]
    },
    "route_36": {
      "requestMethod": "GET",
      "description": "Get transfers of an NFT given a contract address and token ID.",
      "route": "/nft/:address/:token_id/transfers",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "format",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include_prices",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "addresstoken_id",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "stringstring()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_36",
          "example": "exampleValue"
        }
      ]
    },
    "route_37": {
      "requestMethod": "POST",
      "description": "Get NFTs by traits for a given contract.",
      "route": "/nft/:address/nfts-by-traits",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "format",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "normalizeMetadata",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "media_items",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_37",
          "example": "exampleValue"
        }
      ]
    },
    "route_38": {
      "requestMethod": "GET",
      "description": "Get NFT collections owned by a given wallet address.",
      "route": "/:address/nft/collections",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "token_counts",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_spam",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include_prices",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_38",
          "example": "exampleValue"
        }
      ]
    },
    "route_39": {
      "requestMethod": "GET",
      "description": "Get transfers of NFTs given the wallet and other parameters.",
      "route": "/:address/nft/transfers",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "contract_addresses",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "format",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include_prices",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_39",
          "example": "exampleValue"
        }
      ]
    },
    "route_40": {
      "requestMethod": "GET",
      "description": "Get NFTs owned by a given address.",
      "route": "/:address/nft",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "format",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_spam",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "token_addresses",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "normalizeMetadata",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "media_items",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include_prices",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_40",
          "example": "exampleValue"
        }
      ]
    },
    "route_41": {
      "requestMethod": "GET",
      "description": "Resync the metadata for an NFT",
      "route": "/nft/:address/:token_id/metadata/resync",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "flag",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "mode",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "addresstoken_id",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "stringstring()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_41",
          "example": "exampleValue"
        }
      ]
    },
    "route_42": {
      "requestMethod": "GET",
      "description": "Resync the NFT Trait for a given contract",
      "route": "/nft/:address/traits/resync",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_42",
          "example": "exampleValue"
        }
      ]
    },
    "route_43": {
      "requestMethod": "PUT",
      "description": "Initiates a sync of a previously non synced contract.",
      "route": "/nft/:address/sync",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_43",
          "example": "exampleValue"
        }
      ]
    },
    "route_44": {
      "requestMethod": "POST",
      "description": "Returns an array of token prices denominated in the blockchain's native token and USD for a given token contract address",
      "route": "/erc20/prices",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "max_token_inactivity",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "min_pair_side_liquidity_usd",
            "value": "optional",
            "location": "query"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_44",
          "example": "exampleValue"
        }
      ]
    },
    "route_45": {
      "requestMethod": "GET",
      "description": "Get the sold price for an NFT contract for the last x days (only trades paid in ETH).",
      "route": "/nft/:address/price",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "days",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_45",
          "example": "exampleValue"
        }
      ]
    },
    "route_46": {
      "requestMethod": "GET",
      "description": "Get floor price for a given contract.",
      "route": "/nft/:address/floor-price",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_46",
          "example": "exampleValue"
        }
      ]
    },
    "route_47": {
      "requestMethod": "GET",
      "description": "Get floor price for a given token.",
      "route": "/nft/:address/:token_id/floor-price",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "addresstoken_id",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "stringstring()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_47",
          "example": "exampleValue"
        }
      ]
    },
    "route_48": {
      "requestMethod": "GET",
      "description": "Get historical floor price for a given contract.",
      "route": "/nft/:address/floor-price/historical",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "interval",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()",
            "options": [
              "enum(1d,7d,30d,60d,90d,1y,all)"
            ]
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_48",
          "example": "exampleValue"
        }
      ]
    },
    "route_49": {
      "requestMethod": "GET",
      "description": "Get the sold price for an NFT token for the last x days (only trades paid in ETH).",
      "route": "/nft/:address/:token_id/price",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "days",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "addresstoken_id",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "stringstring()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_49",
          "example": "exampleValue"
        }
      ]
    },
    "route_50": {
      "requestMethod": "GET",
      "description": "Get the OHLCV candle stick by using pair address",
      "route": "/pairs/:address/ohlcv",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "timeframe",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()",
            "options": [
              "enum(1s,10s,30s,1min,5min,10min,30min,1h,4h,12h,1d,1w,1M)"
            ]
          }
        },
        {
          "position": {
            "key": "currency",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()",
            "options": [
              "enum(usd,native)"
            ]
          }
        },
        {
          "position": {
            "key": "fromDate",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()"
          }
        },
        {
          "position": {
            "key": "toDate",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_50",
          "example": "exampleValue"
        }
      ]
    },
    "route_51": {
      "requestMethod": "GET",
      "description": "Get the token price denominated in the blockchain's native token and USD. View supported exchanges here",
      "route": "/erc20/:address/price",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exchange",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "max_token_inactivity",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "min_pair_side_liquidity_usd",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_51",
          "example": "exampleValue"
        }
      ]
    },
    "route_52": {
      "requestMethod": "GET",
      "description": "Get aggregated statistics across supported pairs of a token.",
      "route": "/erc20/:token_address/pairs/stats",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "token_address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_52",
          "example": "exampleValue"
        }
      ]
    },
    "route_53": {
      "requestMethod": "POST",
      "description": "Returns filtered tokens based on specified metrics and criteria.",
      "route": "/discovery/tokens",
      "parameters": [],
      "tests": [
        {
          "_description": "Test for route_53",
          "example": "exampleValue"
        }
      ]
    },
    "route_54": {
      "requestMethod": "GET",
      "description": "Get historical holder statistics for a specific ERC20 token address over a date range",
      "route": "/erc20/:address/holders/historical",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "fromDate",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()"
          }
        },
        {
          "position": {
            "key": "toDate",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()"
          }
        },
        {
          "position": {
            "key": "timeFrame",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()",
            "options": [
              "enum(1min,5min,10min,30min,1h,4h,12h,1d,1w,1M)"
            ]
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_54",
          "example": "exampleValue"
        }
      ]
    },
    "route_55": {
      "requestMethod": "POST",
      "description": "Returns analytics data for multiple token addresses across different chains",
      "route": "/tokens/analytics",
      "parameters": [],
      "tests": [
        {
          "_description": "Test for route_55",
          "example": "exampleValue"
        }
      ]
    },
    "route_56": {
      "requestMethod": "POST",
      "description": "Returns an array of token prices denominated in the blockchain's native token and USD for a given token contract address",
      "route": "/erc20/prices",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "max_token_inactivity",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "min_pair_side_liquidity_usd",
            "value": "optional",
            "location": "query"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_56",
          "example": "exampleValue"
        }
      ]
    },
    "route_57": {
      "requestMethod": "GET",
      "description": "Get the OHLCV candle stick by using pair address",
      "route": "/pairs/:address/ohlcv",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "timeframe",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()",
            "options": [
              "enum(1s,10s,30s,1min,5min,10min,30min,1h,4h,12h,1d,1w,1M)"
            ]
          }
        },
        {
          "position": {
            "key": "currency",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()",
            "options": [
              "enum(usd,native)"
            ]
          }
        },
        {
          "position": {
            "key": "fromDate",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()"
          }
        },
        {
          "position": {
            "key": "toDate",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_57",
          "example": "exampleValue"
        }
      ]
    },
    "route_58": {
      "requestMethod": "GET",
      "description": "Fetch the pair data of the provided token0+token1 combination.\nThe token0 and token1 options are interchangable (ie. there is no different outcome in \"token0=WETH and token1=USDT\" or \"token0=USDT and token1=WETH\")",
      "route": "/:token0_address/:token1_address/pairAddress",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exchange",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()",
            "options": [
              "enum(uniswapv2,uniswapv3,sushiswapv2,pancakeswapv1,pancakeswapv2,quickswap,quickswapv2,traderjoe,pangolin,spookyswap,vvs,camelotv2)"
            ]
          }
        },
        {
          "position": {
            "key": "token0_addresstoken1_address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "stringstring()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_58",
          "example": "exampleValue"
        }
      ]
    },
    "route_59": {
      "requestMethod": "GET",
      "description": "Get the liquidity reserves for a given pair address. Only Uniswap V2 based exchanges supported at the moment.",
      "route": "/:pair_address/reserves",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "pair_address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_59",
          "example": "exampleValue"
        }
      ]
    },
    "route_60": {
      "requestMethod": "GET",
      "description": "Get all snipers (wallets that quickly buy and sell tokens) for a specific token pair address.",
      "route": "/pairs/:address/snipers",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "blocksAfterCreation",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_60",
          "example": "exampleValue"
        }
      ]
    },
    "route_61": {
      "requestMethod": "GET",
      "description": "Get all swap related transactions (buy, sell, add liquidity & remove liquidity)",
      "route": "/pairs/:address/swaps",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "fromBlock",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "toBlock",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "fromDate",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "toDate",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "transactionTypes",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_61",
          "example": "exampleValue"
        }
      ]
    },
    "route_62": {
      "requestMethod": "GET",
      "description": "Get all swap related transactions (buy, sell)",
      "route": "/erc20/:address/swaps",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "fromBlock",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "toBlock",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "fromDate",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "toDate",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "transactionTypes",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_62",
          "example": "exampleValue"
        }
      ]
    },
    "route_63": {
      "requestMethod": "GET",
      "description": "Get all swap related transactions (buy, sell)",
      "route": "/wallets/:address/swaps",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "fromBlock",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "toBlock",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "fromDate",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "toDate",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "transactionTypes",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_63",
          "example": "exampleValue"
        }
      ]
    },
    "route_64": {
      "requestMethod": "GET",
      "description": "Returns historical buy and sell volume data for a specific token category in time intervals",
      "route": "/volume/timeseries/:categoryId",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "timeframe",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()",
            "options": [
              "enum(1d,7d,30d)"
            ]
          }
        },
        {
          "position": {
            "key": "categoryId",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_64",
          "example": "exampleValue"
        }
      ]
    },
    "route_65": {
      "requestMethod": "GET",
      "description": "Returns historical volume data for chains in time intervals",
      "route": "/volume/timeseries",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "timeframe",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()",
            "options": [
              "enum(1d,7d,30d)"
            ]
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_65",
          "example": "exampleValue"
        }
      ]
    },
    "route_66": {
      "requestMethod": "POST",
      "description": "Retrieve timeseries volume data by token addresses",
      "route": "/tokens/analytics/timeseries",
      "parameters": [
        {
          "position": {
            "key": "timeframe",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()",
            "options": [
              "enum(1d,7d,30d)"
            ]
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_66",
          "example": "exampleValue"
        }
      ]
    },
    "route_67": {
      "requestMethod": "GET",
      "description": "Get analytics for a token by token address",
      "route": "/tokens/:address/analytics",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_67",
          "example": "exampleValue"
        }
      ]
    },
    "route_68": {
      "requestMethod": "GET",
      "description": "Get token details",
      "route": "/discovery/token",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()",
            "options": [
              "enum(eth,mainnet,0x1,matic,0x89,polygon,bsc,binance,0x38,fantom,ftm,0xfa,arbitrum,0xa4b1,optimism,0xa,pulsechain,0x171,base,0x2105)"
            ]
          }
        },
        {
          "position": {
            "key": "token_address",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_68",
          "example": "exampleValue"
        }
      ]
    },
    "route_69": {
      "requestMethod": "GET",
      "description": "Get token holder summary",
      "route": "/erc20/:address/holders",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_69",
          "example": "exampleValue"
        }
      ]
    },
    "route_70": {
      "requestMethod": "GET",
      "description": "Identify the major holders of an ERC20 token and understand their ownership percentages",
      "route": "/erc20/:token_address/owners",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "token_address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_70",
          "example": "exampleValue"
        }
      ]
    },
    "route_71": {
      "requestMethod": "GET",
      "description": "Get the metadata for a list of token symbols (name, symbol, decimals, logo).",
      "route": "/erc20/metadata/symbols",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "symbols",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "array()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_71",
          "example": "exampleValue"
        }
      ]
    },
    "route_72": {
      "requestMethod": "GET",
      "description": "Get the metadata for a given token contract address (name, symbol, decimals, logo).",
      "route": "/erc20/metadata",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "addresses",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "array()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_72",
          "example": "exampleValue"
        }
      ]
    },
    "route_73": {
      "requestMethod": "GET",
      "description": "Get the pair stats by using pair address",
      "route": "/pairs/:address/stats",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_73",
          "example": "exampleValue"
        }
      ]
    },
    "route_74": {
      "requestMethod": "GET",
      "description": "Get the supported pairs for a specific token address.",
      "route": "/erc20/:token_address/pairs",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "token_address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_74",
          "example": "exampleValue"
        }
      ]
    },
    "route_75": {
      "requestMethod": "GET",
      "description": "Get the token price denominated in the blockchain's native token and USD. View supported exchanges here",
      "route": "/erc20/:address/price",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exchange",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "max_token_inactivity",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "min_pair_side_liquidity_usd",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_75",
          "example": "exampleValue"
        }
      ]
    },
    "route_76": {
      "requestMethod": "GET",
      "description": "Get the stats for a erc20 token",
      "route": "/erc20/:address/stats",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_76",
          "example": "exampleValue"
        }
      ]
    },
    "route_77": {
      "requestMethod": "GET",
      "description": "Get ERC20 token transactions from a contract ordered by block number in descending order.",
      "route": "/erc20/:address/transfers",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_77",
          "example": "exampleValue"
        }
      ]
    },
    "route_78": {
      "requestMethod": "GET",
      "description": "Get tokens with top gainers",
      "route": "/discovery/tokens/top-gainers",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "min_market_cap",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "security_score",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "time_frame",
            "value": "optional",
            "location": "query"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_78",
          "example": "exampleValue"
        }
      ]
    },
    "route_79": {
      "requestMethod": "GET",
      "description": "Get tokens with top losers",
      "route": "/discovery/tokens/top-losers",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "min_market_cap",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "security_score",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "time_frame",
            "value": "optional",
            "location": "query"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_79",
          "example": "exampleValue"
        }
      ]
    },
    "route_80": {
      "requestMethod": "GET",
      "description": "Get the top ERC20 tokens by market cap",
      "route": "/market-data/erc20s/top-tokens",
      "parameters": [],
      "tests": [
        {
          "_description": "Test for route_80",
          "example": "exampleValue"
        }
      ]
    },
    "route_81": {
      "requestMethod": "GET",
      "description": "Retrieves a list of the top profitable wallets for a specific ERC20 token.",
      "route": "/erc20/:address/top-gainers",
      "parameters": [
        {
          "position": {
            "key": "days",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_81",
          "example": "exampleValue"
        }
      ]
    },
    "route_82": {
      "requestMethod": "GET",
      "description": "Get trending tokens",
      "route": "/tokens/trending",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_82",
          "example": "exampleValue"
        }
      ]
    },
    "route_83": {
      "requestMethod": "GET",
      "description": "Returns volume statistics, buyer/seller counts, and transaction counts for token categories on a specific chain",
      "route": "/volume/categories",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_83",
          "example": "exampleValue"
        }
      ]
    },
    "route_84": {
      "requestMethod": "GET",
      "description": "Returns volume statistics, active wallets, and total transactions for supported blockchain networks",
      "route": "/volume/chains",
      "parameters": [],
      "tests": [
        {
          "_description": "Test for route_84",
          "example": "exampleValue"
        }
      ]
    },
    "route_85": {
      "requestMethod": "GET",
      "description": "Retrieve active ERC20 token approvals for the specified wallet address",
      "route": "/wallets/:address/approvals",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_85",
          "example": "exampleValue"
        }
      ]
    },
    "route_86": {
      "requestMethod": "GET",
      "description": "Get token balances for a specific wallet address and their token prices in USD.",
      "route": "/wallets/:address/tokens",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "token_addresses",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_spam",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_unverified_contracts",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_native",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "max_token_inactivity",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "min_pair_side_liquidity_usd",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_86",
          "example": "exampleValue"
        }
      ]
    },
    "route_87": {
      "requestMethod": "GET",
      "description": "Get token balances for a specific wallet address.",
      "route": "/:address/erc20",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "token_addresses",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_spam",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_87",
          "example": "exampleValue"
        }
      ]
    },
    "route_88": {
      "requestMethod": "GET",
      "description": "Get ERC20 token transactions ordered by block number in descending order.",
      "route": "/:address/erc20/transfers",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "contract_addresses",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_88",
          "example": "exampleValue"
        }
      ]
    },
    "route_89": {
      "requestMethod": "GET",
      "description": "Search for tokens based on contract address, token name or token symbol. Premium endpoint available as an add-on. Please contact support for access details.",
      "route": "/tokens/search",
      "parameters": [
        {
          "position": {
            "key": "query",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "string()"
          }
        },
        {
          "position": {
            "key": "chains",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_89",
          "example": "exampleValue"
        }
      ]
    },
    "route_90": {
      "requestMethod": "POST",
      "description": "Review contracts as spam or not spam",
      "route": "/contracts-review",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_90",
          "example": "exampleValue"
        }
      ]
    },
    "route_91": {
      "requestMethod": "GET",
      "description": "Get the cost and rate limit for each API endpoint.",
      "route": "/info/endpointWeights",
      "parameters": [],
      "tests": [
        {
          "_description": "Test for route_91",
          "example": "exampleValue"
        }
      ]
    },
    "route_92": {
      "requestMethod": "GET",
      "description": "Get the current version of the Moralis Web3 API.",
      "route": "/web3/version",
      "parameters": [],
      "tests": [
        {
          "_description": "Test for route_92",
          "example": "exampleValue"
        }
      ]
    },
    "route_93": {
      "requestMethod": "GET",
      "description": "Get the active chains for a wallet address.",
      "route": "/wallets/:address/chains",
      "parameters": [
        {
          "position": {
            "key": "chains",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_93",
          "example": "exampleValue"
        }
      ]
    },
    "route_94": {
      "requestMethod": "GET",
      "description": "Get native transactions and logs ordered by block number in descending order.",
      "route": "/:address/verbose",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_94",
          "example": "exampleValue"
        }
      ]
    },
    "route_95": {
      "requestMethod": "GET",
      "description": "Get the detailed defi positions by protocol for a wallet address.",
      "route": "/wallets/:address/defi/:protocol/positions",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "addressprotocol",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "stringstring()",
            "options": [
              "enum(uniswap-v2,uniswap-v3,pancakeswap-v2,pancakeswap-v3,quickswap-v2,sushiswap-v2,aave-v2,aave-v3,fraxswap-v1,fraxswap-v2,lido,makerdao,eigenlayer)"
            ]
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_95",
          "example": "exampleValue"
        }
      ]
    },
    "route_96": {
      "requestMethod": "GET",
      "description": "Get the positions summary of a wallet address.",
      "route": "/wallets/:address/defi/positions",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_96",
          "example": "exampleValue"
        }
      ]
    },
    "route_97": {
      "requestMethod": "GET",
      "description": "Get the defi summary of a wallet address.",
      "route": "/wallets/:address/defi/summary",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_97",
          "example": "exampleValue"
        }
      ]
    },
    "route_98": {
      "requestMethod": "GET",
      "description": "Get the native balance for a specific wallet address.",
      "route": "/:address/balance",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_98",
          "example": "exampleValue"
        }
      ]
    },
    "route_99": {
      "requestMethod": "GET",
      "description": "Get the native balances for a set of specific addresses",
      "route": "/wallets/balances",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "wallet_addresses",
            "value": "{{USER_PARAM}}",
            "location": "query"
          },
          "z": {
            "primitive": "array()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_99",
          "example": "exampleValue"
        }
      ]
    },
    "route_100": {
      "requestMethod": "GET",
      "description": "Get NFT collections owned by a given wallet address.",
      "route": "/:address/nft/collections",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "token_counts",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_spam",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include_prices",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_100",
          "example": "exampleValue"
        }
      ]
    },
    "route_101": {
      "requestMethod": "GET",
      "description": "Get trades of NFTs for a given wallet.",
      "route": "/wallets/:address/nfts/trades",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "nft_metadata",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_101",
          "example": "exampleValue"
        }
      ]
    },
    "route_102": {
      "requestMethod": "GET",
      "description": "Get NFTs owned by a given address.",
      "route": "/:address/nft",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "format",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_spam",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "token_addresses",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "normalizeMetadata",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "media_items",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include_prices",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_102",
          "example": "exampleValue"
        }
      ]
    },
    "route_103": {
      "requestMethod": "GET",
      "description": "Get all swap related transactions (buy, sell)",
      "route": "/wallets/:address/swaps",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "fromBlock",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "toBlock",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "fromDate",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "toDate",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "transactionTypes",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_103",
          "example": "exampleValue"
        }
      ]
    },
    "route_104": {
      "requestMethod": "GET",
      "description": "Get token balances for a specific wallet address.",
      "route": "/:address/erc20",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "token_addresses",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_spam",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_104",
          "example": "exampleValue"
        }
      ]
    },
    "route_105": {
      "requestMethod": "GET",
      "description": "Get native transactions ordered by block number in descending order.",
      "route": "/:address",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_105",
          "example": "exampleValue"
        }
      ]
    },
    "route_106": {
      "requestMethod": "GET",
      "description": "Retrieve the full transaction history of a specified wallet address, including sends, receives, token and NFT transfers, and contract interactions.",
      "route": "/wallets/:address/history",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include_internal_transactions",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "nft_metadata",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_106",
          "example": "exampleValue"
        }
      ]
    },
    "route_107": {
      "requestMethod": "GET",
      "description": "Get the net worth of a wallet in USD. We recommend to filter out spam tokens and unverified contracts to get a more accurate result.",
      "route": "/wallets/:address/net-worth",
      "parameters": [
        {
          "position": {
            "key": "chains",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_spam",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_unverified_contracts",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "max_token_inactivity",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "min_pair_side_liquidity_usd",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_107",
          "example": "exampleValue"
        }
      ]
    },
    "route_108": {
      "requestMethod": "GET",
      "description": "Get transfers of NFTs given the wallet and other parameters.",
      "route": "/:address/nft/transfers",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "contract_addresses",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "format",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "include_prices",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_108",
          "example": "exampleValue"
        }
      ]
    },
    "route_109": {
      "requestMethod": "GET",
      "description": "Retrieves a summary of wallet profitability based on specified parameters including optional token addresses.",
      "route": "/wallets/:address/profitability/summary",
      "parameters": [
        {
          "position": {
            "key": "days",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_109",
          "example": "exampleValue"
        }
      ]
    },
    "route_110": {
      "requestMethod": "GET",
      "description": "Retrieves profitability information for a specific wallet address. Can be filtered by one or more tokens.",
      "route": "/wallets/:address/profitability",
      "parameters": [
        {
          "position": {
            "key": "days",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "token_addresses",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_110",
          "example": "exampleValue"
        }
      ]
    },
    "route_111": {
      "requestMethod": "GET",
      "description": "Get the stats for a wallet address.",
      "route": "/wallets/:address/stats",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_111",
          "example": "exampleValue"
        }
      ]
    },
    "route_112": {
      "requestMethod": "GET",
      "description": "Retrieve active ERC20 token approvals for the specified wallet address",
      "route": "/wallets/:address/approvals",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_112",
          "example": "exampleValue"
        }
      ]
    },
    "route_113": {
      "requestMethod": "GET",
      "description": "Get token balances for a specific wallet address and their token prices in USD.",
      "route": "/wallets/:address/tokens",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "token_addresses",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_spam",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_unverified_contracts",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "exclude_native",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "max_token_inactivity",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "min_pair_side_liquidity_usd",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_113",
          "example": "exampleValue"
        }
      ]
    },
    "route_114": {
      "requestMethod": "GET",
      "description": "Get ERC20 token transactions ordered by block number in descending order.",
      "route": "/:address/erc20/transfers",
      "parameters": [
        {
          "position": {
            "key": "chain",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "contract_addresses",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_block",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "from_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "to_date",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "limit",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "order",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "cursor",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_114",
          "example": "exampleValue"
        }
      ]
    },
    "route_115": {
      "requestMethod": "GET",
      "description": "Resolve a specific address to its Unstoppable domain",
      "route": "/resolve/:address/domain",
      "parameters": [
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_115",
          "example": "exampleValue"
        }
      ]
    },
    "route_116": {
      "requestMethod": "GET",
      "description": "Reverse resolve a given ETH address to its ENS domain.",
      "route": "/resolve/:address/reverse",
      "parameters": [
        {
          "position": {
            "key": "address",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_116",
          "example": "exampleValue"
        }
      ]
    },
    "route_117": {
      "requestMethod": "GET",
      "description": "Resolve a specific Unstoppable domain to its address.",
      "route": "/resolve/:domain",
      "parameters": [
        {
          "position": {
            "key": "currency",
            "value": "optional",
            "location": "query"
          }
        },
        {
          "position": {
            "key": "domain",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_117",
          "example": "exampleValue"
        }
      ]
    },
    "route_118": {
      "requestMethod": "GET",
      "description": "Resolve a specific ENS domain to its address.",
      "route": "/resolve/ens/:domain",
      "parameters": [
        {
          "position": {
            "key": "domain",
            "value": "{{USER_PARAM}}",
            "location": "insert"
          },
          "z": {
            "primitive": "string()"
          }
        }
      ],
      "tests": [
        {
          "_description": "Test for route_118",
          "example": "exampleValue"
        }
      ]
    }
  },
  "handlers": {}
}