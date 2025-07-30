# Kaia Wallet DApp Integration

## Table of Contents

1. [UI Libraries](#1-ui-libraries)
2. [Utility Libraries](#2-utility-libraries)
3. [Providers](#3-providers)

## Introduction
[Kaia Wallet](https://docs.kaiawallet.io) is a non-custodial wallet, similar to [Metamask](https://metamask.io), with additional support for Kaia-specific [Transactions](https://docs.kaia.io/learn/transactions) & [Accounts](https://docs.kaia.io/learn/accounts). This article will guide you through integrating [Kaia Wallet](https://docs.kaiawallet.io) with a decentralized application (dApp), from High-level (abstract) to Low-level (fine-grained) implementations.

For the sake of this guide, we will be dividing Kaia Wallet dApp integration into three main categories:

* UI Libraries
* Utility libraries
* Providers

:::note

The aforementioned libraries use `Providers` under the hood.

:::  

## 1. UI Libraries

Many dApps utilize frontend frameworks for state management & delivering reactive services. The recommended way to integrate Kaia Wallet with such dApps is to use a UI Library built on the same framework.

UI Libraries provide components for user interactions, like `ConnectWallet` component. They also save you the hassle of managing low-level states, like Multiple Accounts & Multiple Networks. You can look at the underlying [Utility Library](#2-utility-libraries) or [Provider](#3-providers) for complex or low-level interactions.

While most UI libraries have built-in support for Metamask, integrating Kaia Wallet is also easy since its [API](https://docs.kaia.io/references/json-rpc/kaia/account-created/) is built on [Metamask's](https://docs.metamask.io/wallet/reference/json-rpc-api). Even if a library doesn't natively support Kaia Wallet, extending it for Kaia Wallet integration is straightforward. For example, these are 2 popular libraries for [React](https://react.dev) or [Next.js](https://nextjs.org):

* [Appkit](#1.1-appkit-example)
* [Web3-Onboard](#1.2-web3-onboard-example)

### 1.1. Appkit example

![Appkit Hero Banner](/img/build/tutorials/appkit-reown.png)


By [Reown](https://reown.com/), [Appkit](https://docs.reown.com/appkit/overview) offers the following **Features:**

* Buttons + Modals for Connect Wallet, Account information, & Network information
* Support for [Email Wallets](https://docs.reown.com/appkit/authentication/socials), [Coinbase](https://www.coinbase.com) accounts, & [EIP-4361](https://docs.reown.com/appkit/authentication/one-click-auth)

**Considerations:**

* Using [@reown/appkit](https://www.npmjs.com/package/@reown/appkit), you have an option to commit to either the frontend stack of [Wagmi](https://wagmi.sh) & [Tanstack Query](https://tanstack.com/query) or simply [Ethers](https://docs.ethers.org/v6/)
* Requires a `projectId` [signup w/ Reown](https://cloud.walletconnect.com/sign-in)

:::note

Example Code: [kaikas-web3modal](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/kaikas.md)

:::  

### 1.2. Web3-Onboard example

![Web3-Onboard Graphic](https://onboard.blocknative.com/_app/immutable/assets/connect-modal.b7439c5e.svg)

By [Blocknative](https://www.blocknative.com), [Web3-Onboard](https://onboard.blocknative.com) offers the following **Features:**

* Configurable Onboard text
* Modals for Connect Wallet, Switch Account, & Switch Network
* [Notification Components](https://onboard.blocknative.com/docs/modules/core#customnotification)
* (Optional) Register API Key(s) to fetch & render real-time data

**Considerations:**

* You'll have to write your Buttons

:::note

Example Code: [kaikas-web3onboard-react](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/web3Onboard.md)

:::

## 2. Utility Libraries

Libraries like [kaia-sdk](#21-kaia-sdk) & [ethers.js](#22-ethersjs-example) abstract just enough to streamline blockchain interactions while still being able to call [Provider](#3-providers) APIs directly.

Using Utility Libraries to connect an account or send native tokens (e.g., KAIA/ETH) will be no different, *in terms of syntax & lines of code*, from calling Providers directly. Where libraries mainly improve are in the following areas:

* Smart Contract interactions
  * These involve ABIs, encoding inputs, & decoding outputs. Without a library, the code for these can be verbose & error-prone.
* Error-handling
  * string error codes/messages are mapped to error Classes with custom properties & methods.
* Documentation & Type-safety

### 2.1. kaia-sdk

[kaia-sdk](https://github.com/kaiachain/kaia-sdk) is a set of drop-in extensions for other Utility Libraries, like [ethers.js](https://docs.ethers.io/v6) & [web3.js](https://web3js.org). It allows you to use your preferred library while exposing first-party support for [Kaia-specific methods](https://docs.kaia.io/references/json-rpc/kaia/account-created/):

* Transaction, Account, & Account Key types
* Fee Delegation

:::note

Example Code: [kaikas-web3klaytn](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/kaikas.md)

:::

### 2.2. ethers.js example

[ethers.js](https://docs.ethers.io/v6) is the [most popular](https://npmtrends.com/web3klaytn-vs-ethers-vs-viem-vs-web3) JavaScript Utility Library for interacting with the blockchain. It aims to be:

* Extensive: support for multiple wallet formats, languages, & functions
* Robust: comprehensive tests, documentation, & typing

:::note

Example Code: [kaikas-ethersjs](https://github.com/kaiachain/kaia-dapp-mono/blob/main/examples/3rd-integration-examples/ethers-js.md)

:::

## 3. Providers

At the lowest level is the Provider, [`window.klaytn`](https://docs.kaiawallet.io/02_api_reference/01_klaytn_provider) (Kaia Wallet itself). You might prefer [Utility Libraries](#2-utility-libraries), but knowledge of Provider APIs helps debug & understand how dependent libraries work. Referring to [Kaia's JSON-RPC API][Kaia-API] is necessary for using Kaia-specific methods like [`kaia_getAccount`](https://docs.kaia.io/references/json-rpc/kaia/get-account/), [`kaia_sendTransactionAsFeePayer`](https://docs.kaia.io/references/json-rpc/kaia/send-transaction-as-fee-payer/), & more.
