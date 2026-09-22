---
title: Unwrap legacy WKLAY to KAIA
sidebar_label: Unwrap legacy WKLAY
description: Recover KAIA from the legacy WKLAY wrapper contract using Kaiascan, and unwrap canonical WKAIA.
---

# Unwrap legacy WKLAY to KAIA

The official, canonical WKAIA (formerly WKLAY) contract on Kaia Mainnet is [`0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432`](https://kaiascan.io/address/0x19aac5f612f524b754ca7e7c41cbfa2e981a4432), the established standard across the Kaia ecosystem. See [Canonical WKAIA](../smart-contracts/token-development/canonical-wkaia.md) for background.

If you interacted with older dapps or marketplaces that used early token wrappers, you may still hold a balance in the **legacy WKLAY contract** [`0xfd844c2fca5e595004b17615f891620d1cb9bbb2`](https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2). No dapp front end unwraps that contract for you, so you have to call it directly through the block explorer.

This guide walks through doing that on [Kaiascan](https://kaiascan.io).

:::info Which contract do you hold?

The two contracts are unrelated deployments. Check the token contract address in your wallet or in the transaction that gave you the balance before you start — the steps below only recover funds from the legacy contract. To unwrap canonical WKAIA, see [Unwrap canonical WKAIA](#unwrap-canonical-wkaia).

:::

## Step 1: Open the legacy contract

Go to the legacy contract's page on Kaiascan:

[`https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2`](https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2)

![Legacy WKLAY contract page on Kaiascan](/img/build/tutorials/unwrap-legacy-wklay/01-legacy-contract-page.png)

## Step 2: Read your exact balance

1. Select the **Contract** tab, then **Read Contract**.
2. Expand the `balanceOf(address)` function and enter your wallet address.
3. Click **Query** (or **Requery**) to fetch your balance.
4. Copy the returned value exactly as shown.

![Reading balanceOf on the Read Contract tab](/img/build/tutorials/unwrap-legacy-wklay/02-read-contract-balanceof.png)

:::caution Copy the raw value, do not convert it

`balanceOf` returns the balance in **kei**, the smallest unit, not in KAIA. 1 KAIA is 10<sup>18</sup> kei, so a balance of `100000000000000000` is 0.1 KAIA.

Step 3 expects that same raw number. Paste it unchanged — do not round it, strip digits, or convert it to KAIA, or you will withdraw the wrong amount or the transaction will revert.

:::

## Step 3: Withdraw your tokens

1. Switch to the **Write Contract** tab.
2. Click **Connect to Web3** and connect the wallet that holds the balance.
3. Expand the `withdraw(wad: uint256)` function and paste the exact value you copied in Step 2.
4. Submit, then confirm the transaction in your wallet.

![Write Contract tab showing the withdraw function](/img/build/tutorials/unwrap-legacy-wklay/03-write-contract-withdraw.png)

You need a small amount of KAIA in the same wallet to pay the gas fee for this transaction.

## Step 4: Verify

Once the transaction confirms, check your wallet balance — the unwrapped KAIA is credited to the same address that sent the transaction.

You can confirm the transfer on the transaction's **Internal Transactions** tab in Kaiascan, since the contract returns KAIA as an internal transfer rather than a token transfer. Here is [an example of a successful unwrapping transaction](https://kaiascan.io/tx/0x05117dc2ac21d2373fce1b6afa260ab8f9c1f747f7c9894fa302c67b2c96631d?tabId=internalTx&page=1).

![Verifying the unwrap transaction on Kaiascan](/img/build/tutorials/unwrap-legacy-wklay/04-verify-transaction.png)

## Unwrap canonical WKAIA

If your balance is in the canonical WKAIA contract [`0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432`](https://kaiascan.io/address/0x19aac5f612f524b754ca7e7c41cbfa2e981a4432) instead, you have two options.

**Use a dapp (recommended).** Kaia ecosystem swap services unwrap canonical WKAIA in one click — for example [DragonSwap](https://dgswap.io/swap/?outputCurrency=KAIA&inputCurrency=0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432).

**Do it manually.** Follow the same Kaiascan steps above, using the canonical contract's address page instead of the legacy one.

## Related

* [Canonical WKAIA](../smart-contracts/token-development/canonical-wkaia.md) — the standard wrapped KAIA implementation
* [Contract addresses](../../references/contract-addresses.md) — deployed system contract addresses on Mainnet and Kairos
