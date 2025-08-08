# How to estimate gas limits and prices on Kaia Wallet and MetaMask

This guide provides a step by step walk through on how to estimate gas fee / price on Kaia.

## What is gas?

Gas represents the unit of measure for how much computational effort is required to process a transaction either payment (value transfer) or invocation (smart contract call) on Kaia chain. In this context, it refers to the computation undertaken on the Kaia Virtual Machine (KVM).

The Kaia network requires gas to execute transactions. When you send tokens, interact with a contract, send KAIA, or do anything else on the blockchain, you must pay for that computation. That payment is calculated in gas, and gas is always paid in KAIA.

## What is gas limit?

Gas limit refers to the maximum amount of gas you are willing to consume for a transaction. More complex transactions, especially those that execute smart contracts, require more computational resources and a higher gas limit than simple payments. A standard KAIA transfer typically uses about 21,000 gas.

If you set the gas limit too high, for example 50,000 for a simple transfer, the transaction will use only what it needs (about 21,000) and return the rest. But if you set it too low, like 20,000, the transaction will fail immediately and consume no gas. And if a transaction runs out of gas during execution, such as when a smart contract is called, it will revert all its effects, but you will still pay for the gas it used up.

## Overall gas fee structure

Since after the Kaia hard fork, the overall fee a transaction creator pays is calculated as:

( **gasPrice**  x **units of gas used**).

Where **gasPrice** = **base fee** + **priority fee**

### What is base fee?

The base fee is the minimum price per unit of gas you need to pay for your transaction to be processed on the network. It’s set by the network itself and adjusts up or down after each block, depending on whether the previous block was above or below the gas target — the amount of transactions the network aims to handle in each block.

If a block is busy and uses more than the target, the base fee increases ( 5%) to help ease congestion; if it becomes less busy, the base fee drops.  This mechanism helps keep block sizes stable and makes fees more predictable for everyone. The base fee is burned once a transaction is processed, removing it from circulation.

### What is priority fee?

The priority fee, also called a tip, is an additional amount you voluntarily pay on top of the base fee to help prioritize your transaction. On Kaia, this tip doesn’t go directly to a validator; instead, it contributes to the network’s reward pool, which is later distributed to both validators and ecosystem funds. By offering a higher tip, you’re signaling that you’re willing to pay more to help your transaction get processed faster and placed ahead of others in the same block.

## Estimating Gas Fee

To get a clear view of how much gas your transactions typically consume, it's a good practice to use the following approach:

### Using eth_estimateGas API in ethers.js

Instead of guessing how much gas your transaction might consume, you can leverage the node's own execution context to tell you exactly how much computational effort it expects your transaction will require before propagating it on chain.

This is useful for developers, who need to programmatically control their gas costs and avoid failures due to **out of gas** errors, and for everyday users, who want to know their total fee in advance and avoid surprise charges in their wallets.

This is done with the **eth_estimateGas** API, exposed through ethers.js.

**Example – Estimating Gas for mint Function**

Let's say you want to estimate the gas for a smart contract's mint function. Here’s a clear, complete script to do it:

```js
const { ethers } = require('ethers');
require('dotenv').config();

const GOLD_CONTRACT_ADDRESS = '0xE13d6C18c52c1de9267aE6DF647fD4ADfAf82977';
const AMOUNT_TO_SEND = ethers.parseUnits('20', 18); // 20 tokens

// minimal ABI for the `mint` function
const MINT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Main script
async function estimateMintGas() {

 try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.ES_PRIVATE_KEY, provider);
    
    // prepare encoded transaction
    const iface = new ethers.Interface(MINT_ABI);
    const encodedData = iface.encodeFunctionData('mint', [wallet.address, AMOUNT_TO_SEND]);
    
    // estimate Gas
    const estimatedGas = await provider.estimateGas({ 
      to: GOLD_CONTRACT_ADDRESS, 
      from: wallet.address, 
      data: encodedData 
    });

    // gasPrice
    const gasPrice = await provider.getFeeData();

    console.log("Estimated Gas for mint:", estimatedGas.toString());
    console.log("Estimated GasPrice for mint:", gasPrice.gasPrice.toString());

    return estimatedGas;
    
  } catch (error) {
    console.error('Gas estimation failed!', error.reason || error.message);
    throw error;
  }
}

estimateMintGas().catch((err) => console.error('Error estimating gas!', err)); 
```

Running this script will produce an output like:

```bash
Estimated Gas for mint : 69002
Estimated GasPrice for mint: 27500000000
```

ethers.js constructs the transaction's call data from your smart contract's ABI and parameters, performs a dry run by sending it to the node with eth_estimateGas, and the node executes it without adding it to a block to determine exactly how much gas it would consume.

From the above we can easily estimate our gas fee :

_Gas used_ x _Gas Price_

_69002 x 0.0000000275
\= 0.001897555 KAIA_

### Using MetaMask (KAIA Transfer)

![](/img/build/wallets/estimate-gas-mm.png)
As you can see from the image:

- Gas Used: 21,000
- Base Fee: 25 Gwei (or 0.000000025 KAIA)
- Priority Fee: 2.5 Gwei (or 0.0000000025 KAIA)

To find the total gas fee, we simply multiply the Gas Used by the sum of the Base Fee and Priority Fee

_21,000 \* (0.000000025 + 0.0000000025)
0.0005775 KAIA._

This nicely shows how the total came to **0.0005775 KAIA**, matching exactly with what MetaMask displays in the transaction details image above.

### Using Kaiascan (Smart contract execution - SafeMint function)

![](/img/build/wallets/estimate-gas-kaiascan.png)

As you can see from the image:

- Gas Used: 184,250
- Effective gasPrice (Base Fee + Priority Fee) = 0.0000000275
  - Base Fee: 25 Gkei (or 0.000000025 KAIA)
  - Priority Fee: 2.5 Gkei (or 0.0000000025 KAIA)

To find the total gas fee, we simply multiply the Gas Used by the sum of the Base Fee and Priority Fee:

_184,250 \* (0.000000025 + 0.0000000025)
0.005066875 KAIA_

This nicely shows how the total came to 0.005066875 KAIA, matching exactly with what Kaiascan displays in the transaction details image above.

### Using previous block’s base fee

If you want to calculate using the base fee of the previous block, follow this approach:

To find the next base fee, you multiply the previous base fee by 1.05 if the block is full or exceeds its gas target. This means when a block's gas usage is above the network's target, the base fee increases by 5% to help ease congestion and dampen demand. If the block is under-utilized, the base fee may stay the same or even diminish in subsequent blocks.

| Block | Included Gas | Previous Base Fee           | Next Base Fee                                                               |
| ----- | ------------ | --------------------------- | --------------------------------------------------------------------------- |
| 1     | 15,000,000   | 100 gkei                    | 100 gkei                                                                    |
| 2     | 30,000,000   | 100 gkei                    | 100 gkei                                                                    |
| 3     | 30,000,000   | 100 gkei                    | 100 gkei x 1.05 = 105 gkei                                  |
| 4     | 30,000,000   | 105 gkei                    | 105 gkei x 1.05 = 110.25 gkei               |
| 5     | 30,000,000   | 110.25 gkei | 110.25 x 1.05 = 115.76 gkei |




