# Foundation Setup

Get a high-level overview of Kaia and the essentials to begin building.

## Quick Overview

Kaia is an EVM-compatible blockchain designed for speed, security, and scalability. It uses the Kaia Virtual Machine (KVM), which is fully compatible with Ethereum tools and supports Solidity smart contracts. If you're coming from Ethereum, you'll find the transition straightforward--most of your existing code and workflows will work with [minimal changes](../tutorials/migrating-ethereum-app-to-kaia.mdx).

For more details on Kaia's architecture, check out [Why Build on Kaia](../../learn/why-kaia.md) and [Consensus Mechanism](../../learn/consensus-mechanism.md).

## Kaia Networks

Kaia has two main networks:
- **Kairos Testnet**: For testing and development. Chain ID: 1001. Use it to experiment without real costs.
- **Mainnet**: For production. Chain ID: 8217.

Configure your wallet or tools with these RPC endpoints:
- Kairos: https://public-en-kairos.node.kaia.io
- Mainnet: https://public-en.node.kaia.io

Explore blocks and transactions on [Kaiascan](https://kaiascan.io/) (Mainnet) or [Kairos Kaiascan](https://kairos.kaiascan.io/).

## Development Tools

Kaia supports popular Ethereum tools with some extensions for its features. Key resources:
- **[SDKs](../../references/sdk/sdk.md)**: Use [ethers-ext](../../references/sdk/ethers-ext/getting-started.md) (extension of ethers.js), [web3js-ext](../../references/sdk/web3js-ext/getting-started.md), or others for interacting with the network.
- **[Public RPC Endpoints](../../references/public-en.md)**: Access via Public RPC Endpoints.
- **[Solidity](https://github.com/ethereum/solidity)**: Write contracts in Solidity--Kaia is fully compatible.
- **[Kaia Contracts Wizard](https://wizard.kaia.io/)**: An interactive generator to bootstrap your smart contract and learn about Kaia Contracts.
- Other tools: [Remix IDE with Kaia Plugin](https://ide.kaia.io/), [Hardhat](https://v2.hardhat.org/hardhat-runner/docs/getting-started), [Foundry](https://getfoundry.sh/), and [Thirdweb](https://portal.thirdweb.com/).