---
title: Use CSV Airdrop
sidebar_label: CSV Airdrop
---

# Use CSV Airdrop

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 9, 2026**. Please use Safe Wallet for Kaia Network at [app.safe.global](https://app.safe.global) to manage your accounts going forward. Your existing Safe Accounts will be automatically compatible with Safe Wallet.

:::

**CSV Airdrop** (when listed under Safe Apps) batches multiple transfers of ERC-20, ERC-721, ERC-1155, and native tokens into a single Safe transaction. You upload or paste a CSV of transfers and submit once—fewer signatures and lower gas than sending each transfer separately.

Safe App availability depends on the Safe Wallet Apps catalog for Kaia / Kairos. If CSV Airdrop is not listed for your network, use [Transaction Builder](./tx-builder.md) or check the [Help Center](https://help.safe.global).

## Step 1: Open your Safe in Safe Wallet <a id="login-kaiasafe"></a>

Sign in at [app.safe.global](https://app.safe.global) and select your Kaia or Kairos Safe. If you do not have an account yet, follow [Create a Safe](./use-kaia-safe.md#create-a-safe) and [Add assets](./use-kaia-safe.md#add-assets).

## Step 2: Open CSV Airdrop <a id="search-CSV-airdrop"></a>

Go to **Apps**, search for **CSV**, and open **CSV Airdrop** if it is available for your network.

## Step 3: Prepare a transfer CSV <a id="prepare-CSV-airdrop"></a>

Transfer files are expected in CSV format with columns such as:

* *token_type*: `erc20`, `nft`, or `native`. NFT tokens may be ERC-721 or ERC-1155.
* *token_address*: Token contract address. Leave blank for native (KAIA) transfers.
* *receiver*: Recipient address.
* *amount*: Amount to transfer. Can be blank for ERC-721 transfers.
* *id*: Collectible id (ERC-721 or ERC-1155). Can be blank for native and ERC-20 transfers.

:::important
Use `,` as the separator. The header row must be the first row and must include the described column names.
[Sample transfer file](https://ipfs.io/ipfs/bafybeiesr6b3cm76ofcm2joukgdtuyva3niftmbpbb4sgxsa3qwsenv3lu/sample.csv)
:::

### Native token transfers <a id="native-token-trnasfers"></a>

Leave *token_address* blank for native transfers. Ensure the Safe holds enough KAIA.

### ERC-20 transfers <a id="erc20-trnasfers"></a>

Set *token_type* to `erc20` and fill the other fields. Ensure the Safe holds enough of that token.

### ERC-721 transfers <a id="erc721-transfers"></a>

Set *token_type* for NFT transfers and include the collectible *id* as required by the app. Ensure the Safe owns those NFTs.

## Step 4: Review and submit <a id="review-submit-transaction"></a>

Review the decoded transfers in the app, then submit. Complete Safe confirmations the same way as any other Safe transaction.
