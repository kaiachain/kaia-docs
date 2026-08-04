---
title: Interact with contracts
sidebar_label: Contract interaction
---

# Interact with contracts

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 31, 2026**. Please use Safe Wallet for Kaia Network at [app.safe.global](https://app.safe.global) to manage your accounts going forward. Your existing Safe Accounts will be automatically compatible with Safe Wallet.

:::

In this section you interact with a simple contract on Kairos using a Safe account managed in Safe Wallet.

**Prerequisites**

* [MetaMask](https://metamask.io/download/) configured for [Kaia / Kairos](../../tutorials/connecting-metamask.mdx)
* [Remix](https://remix.ethereum.org/) (with Kaia network support as needed)
* Test KAIA from the [Faucet](https://faucet.kaia.io)
* A Safe account on Kairos ([create one](./use-safe-wallet.md#create-a-safe))

**Step 1:** Open [Remix](https://remix.ethereum.org/).

**Step 2:** Compile and deploy a sample storage contract (or your own contract).

Deploy the contract before interacting with it from the Safe. A typical sample contract exposes a `uint` that you update with `store` and read with `retrieve`.

<video autoPlay loop muted playsInline controls aria-label="Compiling and deploying the storage contract in Remix" style={{maxWidth: '100%', borderRadius: '8px'}}>
  <source src="/img/build/wallets/sg-store-deploy.webm" type="video/webm" />
  <source src="/img/build/wallets/sg-store-deploy.mp4" type="video/mp4" />
</video>

**Step 3:** Initiate a new transaction in Safe Wallet.

Click **New transaction**. Enter the deployed contract address and ABI so you can select the method and parameters.

<video autoPlay loop muted playsInline controls aria-label="Entering the contract address and ABI, then choosing the method and parameters in Safe Wallet" style={{maxWidth: '100%', borderRadius: '8px'}}>
  <source src="/img/build/wallets/sg-store-init-tx.webm" type="video/webm" />
  <source src="/img/build/wallets/sg-store-init-tx.mp4" type="video/mp4" />
</video>

**Step 4:** Review and submit. Sign with an owner wallet; the transaction executes once the confirmation threshold is reached.

<video autoPlay loop muted playsInline controls aria-label="Reviewing and signing the contract interaction, which executes once the threshold is reached" style={{maxWidth: '100%', borderRadius: '8px'}}>
  <source src="/img/build/wallets/sg-store-review-tx.webm" type="video/webm" />
  <source src="/img/build/wallets/sg-store-review-tx.mp4" type="video/mp4" />
</video>

You can also batch contract calls with the [Transaction Builder](./tx-builder.md) or propose them programmatically with the [API Kit](./safe-wallet-api-kit.md).
