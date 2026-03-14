export const prompt = {
    name: 'contract-audit',
    version: 'flowmcp-prompt/1.0.0',
    provider: 'etherscan',
    description: 'Quick security audit of a smart contract using Etherscan data',
    testedWith: 'anthropic/claude-sonnet-4-5-20250929',
    dependsOn: [
        'etherscan.getContractABI',
        'etherscan.getContractSourceCode',
        'etherscan.getGasOracle'
    ],
    references: [],
    content: `Perform a quick security audit of the smart contract at {{input:contractAddress}} on Ethereum.

## Step 1: Contract Verification
Use etherscan.getContractSourceCode to check if the contract is verified on Etherscan.
Note the compiler version, optimization settings, and license type.

## Step 2: ABI Analysis
Use etherscan.getContractABI to retrieve the contract interface.
Identify:
- All external/public functions
- Any admin/owner-only functions (look for onlyOwner, onlyAdmin patterns)
- Presence of upgradability patterns (proxy, delegatecall)
- Token approval/transfer functions

## Step 3: Gas Context
Use etherscan.getGasOracle to get current gas prices.
Estimate interaction costs for key functions based on typical gas usage.

## Step 4: Audit Summary
Compile findings into a structured report:
- **Verification Status**: Verified/Unverified, compiler version
- **Function Inventory**: Count of read vs write functions
- **Access Control**: Admin functions and privilege levels
- **Risk Indicators**: Upgradability, unusual patterns, missing safety checks
- **Gas Estimate**: Current cost to interact with main functions

Flag any red flags or concerns prominently at the top of the report.`
}
