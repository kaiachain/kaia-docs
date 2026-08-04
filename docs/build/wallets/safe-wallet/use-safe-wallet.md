---
title: Use Safe Wallet on Kaia
sidebar_label: Create and manage Safes
---

# Use Safe Wallet on Kaia

:::caution Sunset notice

`safe.kaia.io` will sunset on **August 31, 2026**. Please use Safe Wallet for Kaia Network at [app.safe.global](https://app.safe.global) to manage your accounts going forward. Your existing Safe Accounts will be automatically compatible with Safe Wallet.

:::

## Create a Safe

Here is how to create a Safe smart account on Kaia with Safe Wallet.

**Step 1:** Open [Safe Wallet](https://app.safe.global/welcome) in your browser. The landing page has two tabs: **Workspaces**, for teams that manage several accounts together, and **My accounts**, for the Safes your connected wallet signs on. To create a single Safe, stay on **My accounts**.

:::tip

Managing a treasury with several Safes and a team of reviewers? [Workspace](./overview.md#workspace) adds a shared dashboard, a shared address book, and email login for members who need visibility but should not hold a signing key. You can create Safes first and organise them into a workspace later.

:::

![Safe Wallet welcome page with the My accounts tab selected, showing Connect wallet and Watch any account](/img/build/wallets/sg-welcome-page.png)

**Step 2:** Click **Connect wallet** and pick [MetaMask](../../tutorials/connecting-metamask.mdx). The dialog only lists wallets it detects, so install the extension first if you do not see the one you want—[Kaia Wallet](https://docs.kaiawallet.io/) appears here once its extension is installed. Ensure **Kaia Mainnet** or **Kairos Testnet** is selected in your wallet and in Safe Wallet.

![Connect your wallet dialog with MetaMask highlighted among the available wallets](/img/build/wallets/sg-connect-wallet.png)

**Step 3:** Click **Create account**, name your Safe, then choose the networks to deploy it on—**Kaia** for Mainnet or **Kairos** for testnet. You can add more networks later. Click **Next**.

![Set up the basics step with a Safe name entered and Kairos selected under Select Networks](/img/build/wallets/sg-add-safe-name.png)

**Step 4:** On **Signers and confirmations**, add the addresses allowed to propose and approve transactions. Your connected wallet is **Signer 1**; click **Add new signer** for each additional one. Names are optional labels stored for your own reference. You can change signers later.

**Step 5:** Set the **Threshold**—how many signers must confirm before a transaction executes. Prefer more than 1. A common practice is about 51% of signers (for example 2 of 3, or 3 of 5). Click **Next**.

![Signers and confirmations step with three signers added and a threshold of 2 out of 3](/img/build/wallets/sg-add-signers.png)

**Step 6:** Check the network, name, signers, and threshold. Deploying a Safe is an on-chain transaction, so it costs a one-time activation fee in KAIA—make sure your connected wallet holds enough. Click **Create account**, then confirm the transaction in your wallet.

![Review step showing the network, name, three signers, a 2 of 3 threshold, and the estimated activation fee in KAIA](/img/build/wallets/sg-review-create-safe.png)

**Step 7:** Once the transaction confirms, your Safe is live. The dialog shows its address—this is the address you share to receive funds, and it is different from your signer wallet address. Click **Let's go** to open the account.

![Your account is all set dialog showing the new Safe name and address on Kairos](/img/build/wallets/sg-start-using-wallet.png)

The account opens on **Overview**, with the sidebar for **Assets**, **Transactions**, **Address book**, **Apps**, and **Settings**. The Safe starts empty—use **Copy address** to fund it from another wallet.

![Safe account overview with zero balance, an Add funds prompt, and the sidebar navigation](/img/build/wallets/sg-safe-ui.png)

Your Safe account is ready.

## Add assets

You can fund a Safe by sending KAIA, fungible tokens, or NFTs to the Safe address shown in the account dashboard.

### KAIA deposits

1. Copy your Safe address from the account dashboard.
2. From a wallet (for example MetaMask, a hardware wallet, or another funded account), send KAIA to that address.
3. When the transfer confirms, the balance appears under **Assets** in Safe Wallet.

You can fund the Safe from any address that can transfer to Kaia accounts. For network setup in MetaMask, see [Connect MetaMask to Kaia](../../tutorials/connecting-metamask.mdx).

### Fungible token deposits

1. Copy your Safe address.
2. In your wallet’s token list, select the token and send it to the Safe address.
3. Confirm the transfer and verify the balance under **Assets** in Safe Wallet.

### NFT deposits

1. Copy your Safe address.
2. In the wallet that holds the NFT, open it and choose transfer.
3. Paste the Safe address, confirm, and verify it under **Assets** → **NFTs** in Safe Wallet.

On Mainnet you can also transfer from a marketplace that supports Kaia, such as the [OKX NFT Marketplace](https://web3.okx.com/nft). On Kairos, use the wallet transfer above.

## Send assets

### Send KAIA and tokens

**Step 1:** Click **New transaction** and select **Send tokens**.

<video autoPlay loop muted playsInline controls aria-label="Opening New transaction and choosing Send tokens" style={{maxWidth: '100%', borderRadius: '8px'}}>
  <source src="/img/build/wallets/sg-new-tx.webm" type="video/webm" />
  <source src="/img/build/wallets/sg-new-tx.mp4" type="video/mp4" />
</video>

**Step 2:** Enter the recipient address, then pick the token and amount—**MAX** fills in the full balance. You can add up to five recipients to one transaction. Click **Next**.

<video autoPlay loop muted playsInline controls aria-label="Send tokens form with the recipient address, token selector, and amount fields" style={{maxWidth: '100%', borderRadius: '8px'}}>
  <source src="/img/build/wallets/sg-send-details.webm" type="video/webm" />
  <source src="/img/build/wallets/sg-send-details.mp4" type="video/mp4" />
</video>

**Step 3:** Review the details and click **Sign**, then confirm in your wallet. Signing does not send the transaction—it stays in the queue under **Transactions** until the threshold is met, then any signer can execute it.

<video autoPlay loop muted playsInline controls aria-label="Reviewing and signing a send transaction, which then waits in the queue for the remaining confirmations" style={{maxWidth: '100%', borderRadius: '8px'}}>
  <source src="/img/build/wallets/sg-review-send-tx.webm" type="video/webm" />
  <source src="/img/build/wallets/sg-review-send-tx.mp4" type="video/mp4" />
</video>

### Send NFTs

1. Click **New transaction** and select **Send NFTs** (or the equivalent NFT transfer flow in Safe Wallet).
2. Choose the NFT and recipient.
3. Review, collect the required signatures, and execute.

For UI details that change over time, see the [Safe Wallet Help Center](https://help.safe.global).

## Further notes

### Transaction fees

Safe transactions (asset transfers or contract interactions) incur a network fee paid by the owner that **executes** the transaction (typically the last signer to reach the threshold).

### Safe nonce

For security, Safe transactions must be executed in order. Each transaction has a **nonce**. Only the transaction with nonce *last executed + 1* can be executed; higher nonces remain queued until earlier ones complete and enough signatures are collected.

### Chain-specific address prefixes

When copying a Safe address from the dashboard, avoid including a chain name prefix if your destination wallet does not accept it—paste the bare address to prevent transfer errors.

## More help

* [Safe Wallet Help Center](https://help.safe.global)
* [Safe documentation](https://docs.safe.global)
