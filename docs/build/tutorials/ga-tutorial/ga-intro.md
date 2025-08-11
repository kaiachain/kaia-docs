# 1. Introduction to Gas Abstraction

## 1.1 What is Gas Abstraction?

Gas Abstraction (GA) is Kaia's native solution that lets users cover their gas fees by atomically swapping a small amount of a whitelisted ERC-20 into KAIA. This feature eliminates the barrier of requiring users to hold KAIA tokens before they can interact with the blockchain.

When a user only has ERC-20 tokens, GA enables them to swap a small amount of those tokens to KAIA without paying upfront gas fees. The gas spent for the swap is deducted from the KAIA output, creating a seamless ""gasless swap"" experience.

## 1.2 Why Gas Abstraction Matters

**User Onboarding Challenges**

Kaia newcomers often face difficulties when:

- They arrive on the Kaia network via a token bridge but didn't bridge KAIA
- They withdraw an ERC-20 token from a centralized exchange to the Kaia network
- They receive an airdrop but have no KAIA to pay gas fees

**Industry Context**

Similar solutions exist on other blockchains:

- [MetaMask Gas Station](https://metamask.io/ko/news/metamask-feature-update-gas-station): Allows paying network fees with different tokens on Ethereum and BNB Smart Chain
- [ERC-4337 Paymaster models](https://docs.erc4337.io/paymasters): dApps on Ethereum L2s often sponsor gas by running centralized paymaster servers that settle fees in stablecoins.

**Kaia's Unique Approach**

Unlike solutions that rely on centralized "paymaster" services, Kaia's GA is fully decentralized and trustless. The feature is handled automatically by block proposers at the network level, ensuring security and uninterrupted service.

## 1.3 Use Cases and Benefits

**Primary Use Cases:**

- **Cross-chain Users**: Seamless experience for users bridging from other blockchains
- **CEX Withdrawals**: Direct interaction capability after withdrawing tokens from exchanges
- **Airdrop Recipients**: Immediate utility for users receiving token airdrops
- **Stablecoin Payments**: Global payment experiences using stablecoins without gas token friction

**Benefits for Wallet Providers:**

- Improved user onboarding experience
- Reduced support tickets related to gas fee confusion
- Enhanced user retention and engagement
- Competitive advantage in the Web3 wallet space

## 1.4 Relationship with Consensus Liquidity (CL)

GA was originally designed to increase utility for [Consensus Liquidity tokens](https://medium.com/kaiachain/kaia-consensus-liquidity-a-new-paradigm-in-blockchain-liquidity-7c8a7393cd19), allowing users to pay gas with CL tokens (e.g., BORA, Swapscanner). However, the feature can support other ERC-20 tokens as well, including stablecoins.