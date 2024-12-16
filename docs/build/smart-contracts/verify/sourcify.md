---
sidebar_label: Using Sourcify
---


# How to Verify Smart Contracts Using Sourcify

[Sourcify](sourcify.dev) is a Solidity (smart contracts) source code verification service for Ethereum and EVM-compatible chains like Kaia. One of its unique features is that it leverages the [Solidity metadata](https://docs.sourcify.dev/docs/metadata/) file to ["fully verify"](https://docs.sourcify.dev/docs/full-vs-partial-match/) the contracts. 

In this guide, we'll take a look at how to verify a smart contract on Foundry using Sourcify. 


## Getting started

This guide expects that you have an idea of developing smart contracts with Foundry. See [Deploy smart contract using Foundry](../deploy/foundry.md) to get started. Foundry provides native support for Sourcify verification—all you need to do is add a few flags to your forge command. To verify contracts with Sourcify using Foundry, see the steps below:

## Deploy and verify a contract:

```bash 
/* deploy */

forge create --rpc-url $KAIROS_RPC_URL --private-key $PRIVATE_KEY src/Counter.sol:Counter --broadcast 
```

![](/img/build/smart-contracts/verify/sourcify-deploy.png)

```bash
//* verify an already deployed contract as seen above *//

forge verify-contract 0x2a31C3f597d8FD0Fbc5Ff02439ce6c6aEFb680a2 src/Counter.sol:Counter --chain-id 1001 --verifier sourcify  --verifier-url https://sourcify.dev/server/ 
```

![](/img/build/smart-contracts/verify/sourcify-verify.png)

You can look up the verified contract [here](https://sourcify.dev/#/lookup/0x2a31C3f597d8FD0Fbc5Ff02439ce6c6aEFb680a2)

![](/img/build/smart-contracts/verify/sourcify-lookup-verify.png)

## Check if a contract is verified

```bash
forge verify-check 0x2a31C3f597d8FD0Fbc5Ff02439ce6c6aEFb680a2 --chain-id 1001 --verifier sourcify
```

![](/img/build/smart-contracts/verify/sourcify-verify.png)

## Useful links

* [Sourcify Verifier](https://sourcify.dev/#/verifier)
* [Using Sourcify UI Verification](https://docs.sourcify.dev/docs/how-to-verify/#using-the-ui-legacy)
* [Verifying on Hardhat with Sourcify](https://docs.sourcify.dev/docs/how-to-verify/#hardhat)
* [Verifying on Remix using Sourcify](https://docs.sourcify.dev/docs/how-to-verify/#remix-plugin)
* [Sourcify Playground](https://playground.sourcify.dev/)




