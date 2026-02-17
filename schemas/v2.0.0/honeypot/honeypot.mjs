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
            ]
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
