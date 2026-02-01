const schema = {
    namespace: 'tenderly',
    name: 'Tenderly Simulation API',
    description: 'Tenderly API for simulating EVM transactions, viewing gas usage, state changes, and call traces',
    docs: [ 'https://docs.tenderly.co/simulations' ],
    tags: [ 'simulation', 'evm', 'debugging', 'transactions' ],
    flowMCP: '1.2.0',
    root: 'https://api.tenderly.co/api/v1',
    requiredServerParams: [ 'TENDERLY_ACCESS_KEY', 'TENDERLY_ACCOUNT_SLUG', 'TENDERLY_PROJECT_SLUG' ],
    headers: {
        'X-Access-Key': '{{TENDERLY_ACCESS_KEY}}'
    },
    routes: {
        simulateTransaction: {
            requestMethod: 'POST',
            description: 'Simulate a single EVM transaction and get execution results including gas, state changes, and call traces.',
            route: '/account/:accountSlug/project/:projectSlug/simulate',
            parameters: [
                { position: { key: 'accountSlug', value: '{{TENDERLY_ACCOUNT_SLUG}}', location: 'insert' } },
                { position: { key: 'projectSlug', value: '{{TENDERLY_PROJECT_SLUG}}', location: 'insert' } },
                { position: { key: 'network_id', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [ 'default("1")' ] } },
                { position: { key: 'from', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'to', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [ 'min(42)', 'max(42)' ] } },
                { position: { key: 'input', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [ 'default("0x")' ] } },
                { position: { key: 'value', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [ 'default("0")', 'optional()' ] } },
                { position: { key: 'gas', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'number()', options: [ 'default(8000000)', 'optional()' ] } },
                { position: { key: 'save', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'boolean()', options: [ 'default(false)', 'optional()' ] } },
                { position: { key: 'simulation_type', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'string()', options: [ 'default("full")', 'optional()' ] } }
            ],
            tests: [
                { _description: 'Simulate ETH transfer', network_id: '1', from: '0x0000000000000000000000000000000000000000', to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', input: '0x', value: '1000000000000000000' }
            ],
            modifiers: []
        },
        simulateBundle: {
            requestMethod: 'POST',
            description: 'Simulate multiple transactions sequentially within the same block. Useful for multi-step interactions like approvals + swaps.',
            route: '/account/:accountSlug/project/:projectSlug/simulate-bundle',
            parameters: [
                { position: { key: 'accountSlug', value: '{{TENDERLY_ACCOUNT_SLUG}}', location: 'insert' } },
                { position: { key: 'projectSlug', value: '{{TENDERLY_PROJECT_SLUG}}', location: 'insert' } },
                { position: { key: 'simulations', value: '{{USER_PARAM}}', location: 'body' }, z: { primitive: 'array()', options: [ 'min(1)' ] } }
            ],
            tests: [
                { _description: 'Simulate bundle', simulations: [ { network_id: '1', from: '0x0000000000000000000000000000000000000000', to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', input: '0x', value: '0' } ] }
            ],
            modifiers: []
        }
    },
    handlers: {}
}


export { schema }
