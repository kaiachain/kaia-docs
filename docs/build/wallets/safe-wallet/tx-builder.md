---
title: Use Transaction Builder
sidebar_label: Transaction Builder
---

# Use Transaction Builder

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 9, 2026**. Please use Safe Wallet for Kaia Network at [app.safe.global](https://app.safe.global) to manage your accounts going forward. Your existing Safe Accounts will be automatically compatible with Safe Wallet.

:::

**Transaction Builder** is a Safe App that batches several operations into one Safe transaction. Instead of confirming transfers or contract calls one by one, you build a batch, then confirm and execute once.

Availability of Safe Apps can vary by network and catalog. In Safe Wallet, open **Apps**, search for **Transaction Builder**, and launch it for your Kaia or Kairos Safe.

For product help that tracks the latest UI, see the [Safe Wallet Help Center](https://help.safe.global).

## KAIA token transfer <a id="token-transfer"></a>

**Step 1:** In Safe Wallet, open **Apps** and launch **Transaction Builder**.

**Step 2:** Enter the recipient address. For a simple KAIA transfer you can leave the ABI empty.

**Step 3:** Enter the KAIA value to send (for example `1` for 1 KAIA), then click **Add transaction**.

**Step 4:** Repeat for each recipient you want in the batch.

**Step 5:** When the batch is complete, click **Create batch**, review the operations, then **Send batch** and collect the required Safe signatures the same way as any other Safe transaction.

## Contract interactions <a id="contract-interactions"></a>

Use Transaction Builder when you need many similar contract calls—for example transferring the same token to several addresses—in a single Safe transaction.

**Step 1:** Open **Transaction Builder** from Safe Apps.

**Step 2:** Enter the **token (or contract) address** and **ABI**.

**Step 3:** Select a method (for example `transfer`) and fill in the parameters.

> Note: Integer amounts are typically in the token’s smallest unit (no decimals in the field). For an 18-decimal token, `10` tokens is often entered as `10000000000000000000`.

**Step 4:** Click **Add transaction**, repeat for each call, then **Create batch** → **Send batch** and complete Safe confirmations.

Batch contracts and transfers carefully: every owner who signs should review the full batch before execution.
