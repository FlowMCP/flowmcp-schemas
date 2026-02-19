// Enhancement for #155 — Etherscan Account, Transaction & Event Log Routes

export const main = {
    namespace: 'etherscan',
    name: 'Etherscan Account & Transactions',
    description: 'Query Ethereum account balances, transaction history, internal transactions, ERC20 transfers, and event logs via Etherscan V2 API',
    version: '2.0.0',
    docs: ['https://docs.etherscan.io/v2/api-endpoints/accounts', 'https://docs.etherscan.io/v2/api-endpoints/logs'],
    tags: ['ethereum', 'explorer', 'transactions', 'cacheTtlFrequent'],
    root: 'https://api.etherscan.io/v2/api',
    requiredServerParams: ['ETHERSCAN_API_KEY'],
    routes: {
        getAccountBalance: {
            method: 'GET',
            path: '/?chainid=1&module=account&action=balance&tag=latest&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Get the ETH balance of a single address in wei. Returns the current balance at the latest block.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } }
            ],
            tests: [
                { _description: 'Vitalik ETH balance', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { status: { type: 'string' }, message: { type: 'string' }, result: { type: 'string' } } } },
        },
        getTransactionList: {
            method: 'GET',
            path: '/?chainid=1&module=account&action=txlist&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Get a list of normal transactions for an address, sorted by block number. Supports pagination and block range filtering.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } },
                { position: { key: 'startblock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'endblock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(99999999)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(asc,desc)', options: ['optional()', 'default(desc)'] } }
            ],
            tests: [
                { _description: 'Latest 3 transactions for Vitalik', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', page: 1, offset: 3, sort: 'desc' }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { status: { type: 'string' }, message: { type: 'string' }, result: { type: 'array', items: { type: 'object', properties: { blockNumber: { type: 'string' }, timeStamp: { type: 'string' }, hash: { type: 'string' }, from: { type: 'string' }, to: { type: 'string' }, value: { type: 'string' }, gas: { type: 'string' }, gasPrice: { type: 'string' }, isError: { type: 'string' }, input: { type: 'string' }, contractAddress: { type: 'string' }, functionName: { type: 'string' } } } } } } },
        },
        getInternalTransactions: {
            method: 'GET',
            path: '/?chainid=1&module=account&action=txlistinternal&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Get internal transactions (message calls) for an address. Useful for tracking ETH transfers made by smart contracts.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } },
                { position: { key: 'startblock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(0)'] } },
                { position: { key: 'endblock', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(99999999)'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(asc,desc)', options: ['optional()', 'default(desc)'] } }
            ],
            tests: [
                { _description: 'Internal txs for Vitalik', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', page: 1, offset: 3, sort: 'desc' }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { status: { type: 'string' }, message: { type: 'string' }, result: { type: 'array', items: { type: 'object', properties: { blockNumber: { type: 'string' }, timeStamp: { type: 'string' }, hash: { type: 'string' }, from: { type: 'string' }, to: { type: 'string' }, value: { type: 'string' }, contractAddress: { type: 'string' }, type: { type: 'string' }, gas: { type: 'string' }, gasUsed: { type: 'string' }, isError: { type: 'string' } } } } } } },
        },
        getTokenTransfers: {
            method: 'GET',
            path: '/?chainid=1&module=account&action=tokentx&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Get ERC20 token transfer events for an address. Optionally filter by contract address to track a specific token.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } },
                { position: { key: 'contractaddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(asc,desc)', options: ['optional()', 'default(desc)'] } }
            ],
            tests: [
                { _description: 'ERC20 transfers for Vitalik', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', page: 1, offset: 3, sort: 'desc' }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { status: { type: 'string' }, message: { type: 'string' }, result: { type: 'array', items: { type: 'object', properties: { blockNumber: { type: 'string' }, timeStamp: { type: 'string' }, hash: { type: 'string' }, from: { type: 'string' }, to: { type: 'string' }, value: { type: 'string' }, tokenName: { type: 'string' }, tokenSymbol: { type: 'string' }, tokenDecimal: { type: 'string' }, contractAddress: { type: 'string' } } } } } } },
        },
        getNftTransfers: {
            method: 'GET',
            path: '/?chainid=1&module=account&action=tokennfttx&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Get ERC721 NFT transfer events for an address. Optionally filter by NFT contract address.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['min(42)', 'max(42)'] } },
                { position: { key: 'contractaddress', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['optional()'] } },
                { position: { key: 'page', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(1)'] } },
                { position: { key: 'offset', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'number()', options: ['optional()', 'default(10)'] } },
                { position: { key: 'sort', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'enum(asc,desc)', options: ['optional()', 'default(desc)'] } }
            ],
            tests: [
                { _description: 'NFT transfers for Vitalik', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', page: 1, offset: 3, sort: 'desc' }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { status: { type: 'string' }, message: { type: 'string' }, result: { type: 'array', items: { type: 'object', properties: { blockNumber: { type: 'string' }, timeStamp: { type: 'string' }, hash: { type: 'string' }, from: { type: 'string' }, to: { type: 'string' }, tokenID: { type: 'string' }, tokenName: { type: 'string' }, tokenSymbol: { type: 'string' }, contractAddress: { type: 'string' } } } } } } },
        },
        getTxStatus: {
            method: 'GET',
            path: '/?chainid=1&module=transaction&action=getstatus&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Check the execution status of a transaction. Returns isError=0 for success, isError=1 for failure with error description.',
            parameters: [
                { position: { key: 'txhash', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(66)'] } }
            ],
            tests: [
                { _description: 'Check tx execution status', txhash: '0x15f8e5ea1079d9a0bb04a4c58ae5fe7654b5b2b4463375ff7ffb490aa0032f3a' }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { status: { type: 'string' }, message: { type: 'string' }, result: { type: 'object', properties: { isError: { type: 'string' }, errDescription: { type: 'string' } } } } } },
        },
        getTxReceiptStatus: {
            method: 'GET',
            path: '/?chainid=1&module=transaction&action=gettxreceiptstatus&apikey={{ETHERSCAN_API_KEY}}',
            description: 'Check the receipt status of a transaction. Returns status=1 for success, status=0 for failure.',
            parameters: [
                { position: { key: 'txhash', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['length(66)'] } }
            ],
            tests: [
                { _description: 'Check tx receipt status', txhash: '0x15f8e5ea1079d9a0bb04a4c58ae5fe7654b5b2b4463375ff7ffb490aa0032f3a' }
            ],
            output: { mimeType: 'application/json', schema: { type: 'object', properties: { status: { type: 'string' }, message: { type: 'string' }, result: { type: 'object', properties: { status: { type: 'string' } } } } } },
        }
    }
}
