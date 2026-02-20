// Curve Finance — crvUSD & CRV Supply
// Free public API, no auth required

export const main = {
    namespace: 'curve',
    name: 'Curve crvUSD & CRV Supply',
    description: 'Curve stablecoin (crvUSD) and CRV token supply data — circulating supply, total supply, and crvUSD AMM trading volumes.',
    version: '2.0.0',
    docs: ['https://api.curve.finance/v1/documentation'],
    tags: ['defi', 'stablecoin', 'crvusd', 'supply', 'cacheTtlFrequent'],
    root: 'https://api.curve.finance/v1',
    requiredServerParams: [],
    routes: {
        getCrvCircSupply: {
            method: 'GET',
            path: '/getCrvCircSupply',
            description: 'Get the CRV token circulating supply.',
            parameters: [],
            tests: [
                { _description: 'Get CRV circulating supply' }
            ]
        },
        getCrvusdTotalSupply: {
            method: 'GET',
            path: '/getCrvusdTotalSupply',
            description: 'Get the crvUSD stablecoin total supply.',
            parameters: [],
            tests: [
                { _description: 'Get crvUSD total supply' }
            ]
        },
        getCrvusdAmmVolumes: {
            method: 'GET',
            path: '/getVolumes/ethereum/crvusd-amms',
            description: 'Get daily trading volumes for crvUSD AMMs on Ethereum.',
            parameters: [],
            tests: [
                { _description: 'Get crvUSD AMM volumes' }
            ]
        }
    }
}
