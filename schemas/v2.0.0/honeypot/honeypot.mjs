// Migrated from v1.2.0 -> v2.0.0
// Category: handlers-clean

export const main = {
    namespace: 'honeypot',
    name: 'Honeypot Detector',
    description: 'Detect honeypot token contracts using the honeypot.is API — checks buy/sell tax, liquidity locks, and contract risks for any EVM token address.',
    version: '2.0.0',
    docs: ['https://honeypot.is'],
    tags: ['production', 'security', 'token', 'validation', 'cacheTtlFrequent'],
    root: 'https://api.honeypot.is/v2',
    routes: {
        check: {
            method: 'GET',
            path: '/IsHoneypot',
            description: 'Checks if a token address is a honeypot on Ethereum, BSC, or Base. Required: address.',
            parameters: [
                { position: { key: 'address', value: '{{USER_PARAM}}', location: 'query' }, z: { primitive: 'string()', options: ['regex(^0x[a-fA-F0-9]{40}$)'] } }
            ],
            tests: [
                { _description: 'Valid ETH token address', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
                { _description: 'Another valid ETH token address', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        token: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, decimals: { type: 'number' }, address: { type: 'string' }, totalHolders: { type: 'number' } } },
                        withToken: { type: 'object', properties: { name: { type: 'string' }, symbol: { type: 'string' }, decimals: { type: 'number' }, address: { type: 'string' }, totalHolders: { type: 'number' } } },
                        summary: { type: 'object', properties: { risk: { type: 'string' }, riskLevel: { type: 'number' }, flags: { type: 'array', items: { type: 'string' } } } },
                        simulationSuccess: { type: 'boolean' },
                        honeypotResult: { type: 'object', properties: { isHoneypot: { type: 'boolean' } } },
                        simulationResult: { type: 'object', properties: { buyTax: { type: 'number' }, sellTax: { type: 'number' }, transferTax: { type: 'number' }, buyGas: { type: 'string' }, sellGas: { type: 'string' } } },
                        flags: { type: 'array', items: { type: 'string' } },
                        contractCode: { type: 'object', properties: { openSource: { type: 'boolean' }, rootOpenSource: { type: 'boolean' }, isProxy: { type: 'boolean' }, hasProxyCalls: { type: 'boolean' } } },
                        chain: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, shortName: { type: 'string' }, currency: { type: 'string' } } },
                        router: { type: 'string' },
                        pair: { type: 'object', properties: { pair: { type: 'object', properties: { name: { type: 'string' }, address: { type: 'string' }, token0: { type: 'string' }, token1: { type: 'string' }, type: { type: 'string' } } }, chainId: { type: 'string' }, reserves0: { type: 'string' }, reserves1: { type: 'string' }, liquidity: { type: 'number' }, router: { type: 'string' }, createdAtTimestamp: { type: 'string' }, creationTxHash: { type: 'string' } } },
                        pairAddress: { type: 'string' }
                    }
                }
            },
        }
    }
}


export const handlers = ( { sharedLists, libraries } ) => ( {
    check: {
        postRequest: async ( { response, struct, payload } ) => {
            const data = response || {};
            const isHoneypot = data?.honeypotResult?.isHoneypot ?? false;
            const tokenName = data?.token?.name || "Unknown";
            const risk = data?.summary?.risk || "unknown";
            const buyTax = data?.simulationResult?.buyTax ?? "N/A";
            const sellTax = data?.simulationResult?.sellTax ?? "N/A";
            const transferTax = data?.simulationResult?.transferTax ?? "N/A";
            const openSource = data?.contractCode?.openSource ?? "Unknown";

            response = {
            tokenName,
            isHoneypot,
            risk,
            buyTax,
            sellTax,
            transferTax,
            openSource
            };

            return { response }
        }
    }
} )
