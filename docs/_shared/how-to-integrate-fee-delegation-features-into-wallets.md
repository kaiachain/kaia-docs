# How to integrate Fee Delegation features into wallets

Thanks to Kaia’s [native fee delegation](/build/transactions/fee-delegation) feature, users can enjoy gas-less transactions on dApps. To enable this, **wallets** must support fee-delegated transaction types and perform **sender signing**.

:::info Who this guide is for

This guide is for **wallet providers**. Your wallet implements the sender side only:

- Sign fee-delegated transactions with the user’s key
- Return `senderTxHashRLP` to the dApp

Fee payer signing and broadcasting are **not** wallet responsibilities. Those are handled by a dApp backend or a managed service such as the [Kaia Fee Delegation Service](/build/tutorials/integrate-fee-delegation-service).

:::

## End-to-end flow (roles)

Fee delegation always involves the same actors. The diagram below shows the full path; later sections reuse it and highlight the actor being discussed.

<FeeDelegationFlow></FeeDelegationFlow>

| Step | Who | Responsibility |
| --- | --- | --- |
| 1 | **Wallet (you)** | Sign the fee-delegated transaction and return `senderTxHashRLP`. Do **not** broadcast. |
| 2 | **dApp** | Forward `senderTxHashRLP` to a fee payer. |
| 3 | **Fee payer** | Sign again and submit the fully signed transaction to Kaia. |

This page documents **step 1** in detail. Steps 2–3 are summarized at the end with links to full guides.

## What the wallet must implement

This is **step 1** in the flow — the only part your wallet must implement.

<FeeDelegationFlow highlight="wallet"></FeeDelegationFlow>

To support fee delegation, implement the following inside your wallet:

1. Add the [Kaia SDK](https://github.com/kaiachain/kaia-sdk) (for example, `@kaiachain/ethers-ext`) to the wallet codebase.
2. When the wallet receives a fee-delegated transaction request (typically via `kaia_signTransaction`), sign it with the Kaia SDK using the user’s key.
3. Return `senderTxHashRLP` to the dApp. Do **not** send the transaction to a Kaia node from the wallet.

:::tip Checklist for wallet providers

- Support fee-delegated transaction types (value transfer, contract execution, and others as needed)
- Sign with the **sender (user)** key managed by the wallet
- Return `senderTxHashRLP` to the dApp
- Do **not** broadcast the sender-only signed transaction

:::

### Example: sign a fee-delegated value transfer

Use this pattern in your wallet’s signing path (for example, inside the `kaia_signTransaction` handler). In production, use the user’s key managed by the wallet—not a hardcoded private key—and return `senderTxHashRLP` to the caller.

```javascript
const ethers = require("ethers6");
const { Wallet, TxType, parseKaia } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const receiverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";
const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

const senderWallet = new Wallet(senderPriv, provider);

async function main() {
  const tx = {
    type: TxType.FeeDelegatedValueTransfer,
    from: senderAddr,
    to: receiverAddr,
    value: parseKaia("0.01"),
  };

  // Wallet: populate and sign as sender, then return RLP to the dApp
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);
  // return senderTxHashRLP;  // ← wallet returns this to the dApp (do not broadcast)
}
```

### Example: sign a fee-delegated contract interaction

```javascript
const ethers = require("ethers6");
const { Wallet, TxType } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

const senderWallet = new Wallet(senderPriv, provider);

const contractAddr = "0x95Be48607498109030592C08aDC9577c7C2dD505";
const abi = ["function setNumber(uint256 newNumber)"];

async function main() {
  const contract = new ethers.Contract(contractAddr, abi, provider);
  const data = contract.interface.encodeFunctionData("setNumber", ["0x123"]);

  const tx = {
    type: TxType.FeeDelegatedSmartContractExecution,
    from: senderAddr,
    to: contractAddr,
    value: 0,
    data: data,
  };

  // Wallet: populate and sign as sender, then return RLP to the dApp
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);
  // return senderTxHashRLP;  // ← wallet returns this to the dApp (do not broadcast)
}
```

:::note

Exact wiring depends on your wallet architecture. The important contract is: **sign fee-delegated types as the sender, return `senderTxHashRLP`, and do not broadcast.**

:::

## Outside the wallet: fee payer signing

After the wallet returns `senderTxHashRLP`, the dApp forwards it (**step 2**), then the fee payer signs and submits (**step 3**). Highlighted below is the fee payer — this is **not** wallet code.

<FeeDelegationFlow highlight="feepayer"></FeeDelegationFlow>

```javascript
// Fee payer / backend only — not wallet code
const sentTx = await feePayerWallet.sendTransactionAsFeePayer(senderTxHashRLP);
console.log("sentTx", sentTx);

const rc = await sentTx.wait();
console.log("receipt", rc);
```

To see how a fee payer receives `senderTxHashRLP` and submits the transaction (a simple client/server demo—not wallet integration), see [Build Fee Delegation Example](/build/tutorials/fee-delegation-example). For a managed fee payer, see [Integrate Kaia Fee Delegation Service](/build/tutorials/integrate-fee-delegation-service).

## Next steps

| Goal | Guide |
| --- | --- |
| Understand fee-delegated transaction types | [Fee Delegation](/build/transactions/fee-delegation), [Partial Fee Delegation](/build/transactions/partial-fee-delegation) |
| See a client/server fee payer demo (not wallet code) | [Build Fee Delegation Example](/build/tutorials/fee-delegation-example) |
| Use Kaia’s managed fee payer for dApps | [Integrate Kaia Fee Delegation Service](/build/tutorials/integrate-fee-delegation-service) |
| SDK reference for fee-delegated transactions | [ethers-ext fee-delegated value transfer](/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer) |
