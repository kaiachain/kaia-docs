---
title: Use Transaction Builder
sidebar_label: Transaction Builder
---

# Use Transaction Builder

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 31, 2026**. Please use Safe Wallet for Kaia Network at [app.safe.global](https://app.safe.global) to manage your accounts going forward. Your existing Safe Accounts will be automatically compatible with Safe Wallet.

:::

**Transaction Builder** groups several operations—token transfers, approvals, and contract calls—into one Safe transaction. Instead of confirming each action separately, you build a batch, then confirm and execute it once. The batch is atomic: if one action reverts, the whole batch reverts.

For product help that tracks the latest UI, see the [Safe Wallet Help Center](https://help.safe.global).

## KAIA token transfer <a id="token-transfer"></a>

**Step 1:** In Safe Wallet, click **New transaction** and choose **Transaction Builder**.

**Step 2:** Enter the recipient address. For a simple KAIA transfer you can leave the ABI empty.

**Step 3:** Enter the KAIA value to send (for example `1` for 1 KAIA), then click **Add transaction**.

**Step 4:** Repeat for each recipient you want in the batch. You can reorder or remove entries in the list, and download it as JSON to reuse later or pass to another signer to import.

**Step 5:** When the batch is complete, click **Create batch**, review the operations, then **Send batch** and collect the required Safe signatures the same way as any other Safe transaction.

## Contract interactions <a id="contract-interactions"></a>

Use Transaction Builder when you need many similar contract calls—for example transferring the same token to several addresses—in a single Safe transaction.

**Step 1:** In Safe Wallet, click **New transaction** and choose **Transaction Builder**.

**Step 2:** Enter the **token (or contract) address** and **ABI**.

**Step 3:** Select a method (for example `transfer`) and fill in the parameters.

> Note: Integer amounts are typically in the token’s smallest unit (no decimals in the field). For an 18-decimal token, `10` tokens is often entered as `10000000000000000000`.

**Step 4:** Click **Add transaction**, repeat for each call, then **Create batch** → **Send batch** and complete Safe confirmations.

Transaction Builder crafts raw transactions and can call any contract on Kaia, so mistakes are not recoverable. Every owner who signs should review the full batch—each recipient, method, and amount—before execution.
