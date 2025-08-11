# 4. Integrating Gas Abstraction in Your dApp or Wallet

In this page, you will learn how to integrate gas abstraction (GA) features into your wallet. For the purpose of this guide, you will use the [Kaia SDK](https://github.com/kaiachain/kaia-sdk) (ethers-ext) to implement GA features on Kaia chain. 

## Prerequisite 

* A Kaia Account. 

## Getting Started

This guide is designed for wallet developers who want to implement Gas Abstraction (GA) on Kaia. You will walk through a real world use case — executing an application level transaction where a user claims an airdrop of ERC20 tokens without holding any native KAIA to pay for gas. 

You will learn how to:

* Prepare accounts for GA  
* Fund accounts with GA supported tokens  
* Construct and execute both the approval and swap transactions using gas abstraction

The implementation works seamlessly on both **Kaia Mainnet** and the **Kairos Testnet**. To follow along, you’ll need some GA-supported ERC-20 tokens on either network:

* On Kaia Mainnet, we’ll use [USDT](https://kaiascan.io/address/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=txList&page=1)  
* On Kairos Testnet, we’ll use [TEST](https://kairos.kaiascan.io/address/0xcb00ba2cab67a3771f9ca1fa48fda8881b457750?tabId=txList&page=1) tokens

### Fund Your Account with Supported GA Tokens

**Kaia Mainnet**

To get USDT:

* You can purchase or transfer USDT from these [centralized exchanges (CEXes)](https://www.coingecko.com/en/coins/kaia#markets) that support Kaia-Compatible tokens.  
* Make sure the USDT you receive is the ERC-20 version supported by Kaia GA.

**Kairos Testnet**

To get TEST tokens:

1. Open [ERC20 Faucet](https://kairos.kaiascan.io/address/0x78a6cacfe5d34e0566e56710c8789d207411001a?tabId=contract&page=1) on Kaiascan  
2. Go to the **Contract** tab, then select **Write Contract**  
3. Locate the claim(token) function  
4. Paste in the address of a supported **GA token** on Kairos (for this guide, use the address for TEST)  
5. Click **Query** to submit the request

You should receive your TEST tokens shortly.

![](/img/build/tutorials/ga-integration-1.png)

## Step 1: Setup project and install ethers-ext and ethers.js

```bash
mkdir kaia-ga-example  
cd  kaia-ga-example  
npm init -y    
npm install --save @kaiachain/ethers-ext ethers@6 dotenv  
```

## Step 2: Set up Provider and Wallet instance

Kaia

Create a new file named kaia-ga.js and paste the code below into it: 

```javascript
const ethers = require("ethers"); // ethers v6  
const { Wallet, gasless } = require("@kaiachain/ethers-ext/v6");  
require('dotenv').config()  
// Replace with your wallet address and private key in your .env file  
const senderAddr = "PASTE SENDER ADDRESS";  
const senderPriv = process.env.SENDER_PK;  
const provider = new ethers.JsonRpcProvider(  
  "https://kaia.blockpi.network/v1/rpc/public"  
);  
const wallet = new Wallet(senderPriv, provider);  
```

Kairos 

Create a new file named kairos-ga.js and paste the code below into it:

```javascript
const ethers = require("ethers"); // ethers v6  
const { Wallet, gasless } = require("@kaiachain/ethers-ext/v6");  
require('dotenv').config()  
// Replace with your wallet address and private key in your .env file  
const senderAddr = "PASTE SENDER ADDRESS";  
const senderPriv = process.env.SENDER_PK;  
const provider = new ethers.JsonRpcProvider(  
  "https://responsive-green-emerald.kaia-kairos.quiknode.pro"  
);  
const wallet = new Wallet(senderPriv, provider);  
```

::: note  
Steps 2 to 6 together form a complete executable flow. Copy each block into the same file in order.  
:::

## Step 3: Configure Contracts to Estimate Claim Fees and Token Support

In this step, we estimate the cost of executing the claimAirdrop transaction so that it can be covered using a token swap. This estimated cost is referred to as the **AppTxFee** — the amount of KAIA (in wei) the sender needs to receive from the swap in order to fund a subsequent application-level transaction (in this case, the airdrop claim).  
We'll also prepare and configure all necessary contract instances to:

* Verify that the selected ERC20 token is supported by the **GaslessSwapRouter**.  
* Retrieve the current **commission rate** charged by the router.  
* Fetch the **router’s address** for use in swap and approval steps.

These parameters are essential for setting up a valid and executable gasless swap in the next steps.

Kaia  
```javascript
// Replace with ERC20 token address to be spent  
const tokenAddr = "0xd077A400968890Eacc75cdc901F0356c943e4fDb"; // USDT Token Contract Address  
const ERC20_ABI = [  
  "function decimals() view returns (uint8)",  
  "function symbol() view returns (string)",  
  "function allowance(address owner, address spender) view returns (uint256)",  
  "function balanceOf(address owner) view returns (uint256)",  
];  
const CLAIM_GOLD_CONTRACT_ADDRESS = "0x8ce5130B137FD4e84F43e3E7aD34918aF8F70F6b";  
// MINIMAL ABI CLAIM GOLD CONTRACT   
const CLAIM_AIRDROP_ABI = [  
  {  
    "inputs": [  
      {  
        "internalType": "address",  
        "name": "to",  
        "type": "address"  
      },  
      {  
        "internalType": "uint256",  
        "name": "amount",  
        "type": "uint256"  
      }  
    ],  
    "name": "mint",  
    "outputs": [],  
    "stateMutability": "nonpayable",  
    "type": "function"  
  },  
  {  
    "inputs": [  
      {  
        "internalType": "address",  
        "name": "account",  
        "type": "address"  
      }  
    ],  
    "name": "balanceOf",  
    "outputs": [  
      {  
        "internalType": "uint256",  
        "name": "",  
        "type": "uint256"  
      }  
    ],  
    "stateMutability": "view",  
    "type": "function"  
  }  
]  
const CLAIM_AMOUNT = ethers.parseUnits("10", 18); // 10 tokens  
async function main() {  
  // prepare encoded transaction  
  const iface = new ethers.Interface(CLAIM_AIRDROP_ABI);  
  const encodedData = iface.encodeFunctionData("mint", [  
    wallet.address,  
    CLAIM_AMOUNT,  
  ]);  
  // estimate Gas  
  const estimatedGas = await provider.estimateGas({  
    to: CLAIM_GOLD_CONTRACT_ADDRESS,  
    from: wallet.address,  
    data: encodedData,  
  });  
  // gasPrice  
  const claimGasPrice = await provider.getFeeData();  
  console.log("Estimated Gas for claim:", estimatedGas.toString());  
  console.log("Estimated GasPrice for claim:", claimGasPrice.gasPrice.toString());  
  const gasFees = Number(estimatedGas) * Number(claimGasPrice.gasPrice);  
  console.log(`Gas fee: ${gasFees}`);  
  const gasFeesInEther = ethers.formatEther(gasFees.toString());  
  const appTxFee = ethers.parseEther(gasFeesInEther.toString()).toString();  
  // Query the environment  
  console.log(`Using token at address: ${tokenAddr}`);  
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, provider);  
  const goldToken = new ethers.Contract(CLAIM_GOLD_CONTRACT_ADDRESS, CLAIM_AIRDROP_ABI, provider);  
  const tokenSymbol = await token.symbol();  
  const tokenDecimals = await token.decimals();  
  const tokenBalance = await token.balanceOf(senderAddr);  
  console.log(`\nInitial balance of the sender ${senderAddr}`);  
  console.log(  
    `- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`  
  );  
  console.log(  
    `- ${ethers.formatUnits(tokenBalance, tokenDecimals)} ${tokenSymbol}`  
  );  
  const router = await gasless.getGaslessSwapRouter(provider);  
  const routerAddr = await router.getAddress();  
  const isTokenSupported = await router.isTokenSupported(tokenAddr);  
  const commissionRate = Number(await router.commissionRate());  
  console.log(`\nGaslessSwapRouter address: ${routerAddr}`);  
  console.log(`- The token is supported: ${isTokenSupported}`);  
  console.log(`- Commission rate: ${commissionRate} bps`);  
  …….  
}  
```

Kairos  
```javascript
// Replace with ERC20 token address to be spent  
const tokenAddr = "0xcB00BA2cAb67A3771f9ca1Fa48FDa8881B457750"; // Kairos:TEST token  
const ERC20_ABI = [  
  "function decimals() view returns (uint8)",  
  "function symbol() view returns (string)",  
  "function allowance(address owner, address spender) view returns (uint256)",  
  "function balanceOf(address owner) view returns (uint256)",  
];  
const CLAIM_GOLD_CONTRACT_ADDRESS = "0x18DfDEd9bb342519549c1dBAd832c0FCfF5F6F70";  
// MINIMAL ABI CLAIM GOLD CONTRACT   
const CLAIM_AIRDROP_ABI = [  
  {  
    "inputs": [  
      {  
        "internalType": "address",  
        "name": "to",  
        "type": "address"  
      },  
      {  
        "internalType": "uint256",  
        "name": "amount",  
        "type": "uint256"  
      }  
    ],  
    "name": "mint",  
    "outputs": [],  
    "stateMutability": "nonpayable",  
    "type": "function"  
  },  
  {  
    "inputs": [  
      {  
        "internalType": "address",  
        "name": "account",  
        "type": "address"  
      }  
    ],  
    "name": "balanceOf",  
    "outputs": [  
      {  
        "internalType": "uint256",  
        "name": "",  
        "type": "uint256"  
      }  
    ],  
    "stateMutability": "view",  
    "type": "function"  
  }  
]  
const CLAIM_AMOUNT = ethers.parseUnits("10", 18); // 10 tokens  
async function main() {  
  // prepare encoded transaction  
  const iface = new ethers.Interface(CLAIM_AIRDROP_ABI);  
  const encodedData = iface.encodeFunctionData("mint", [  
    wallet.address,  
    CLAIM_AMOUNT,  
  ]);  
  // estimate Gas  
  const estimatedGas = await provider.estimateGas({  
    to: CLAIM_GOLD_CONTRACT_ADDRESS,  
    from: wallet.address,  
    data: encodedData,  
  });  
  // gasPrice  
  const claimGasPrice = await provider.getFeeData();  
  console.log("Estimated Gas for claim:", estimatedGas.toString());  
  console.log("Estimated GasPrice for claim:", claimGasPrice.gasPrice.toString());  
  const gasFees = Number(estimatedGas) * Number(claimGasPrice.gasPrice);  
  console.log(`Gas fee: ${gasFees}`);  
  const gasFeesInEther = ethers.formatEther(gasFees.toString());  
  const appTxFee = ethers.parseEther(gasFeesInEther.toString()).toString();  
  // Query the environment  
  console.log(`Using token at address: ${tokenAddr}`);  
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, provider);  
  const goldToken = new ethers.Contract(CLAIM_GOLD_CONTRACT_ADDRESS, CLAIM_AIRDROP_ABI, provider);  
  const tokenSymbol = await token.symbol();  
  const tokenDecimals = await token.decimals();  
  const tokenBalance = await token.balanceOf(senderAddr);  
  console.log(`\nInitial balance of the sender ${senderAddr}`);  
  console.log(  
    `- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`  
  );  
  console.log(  
    `- ${ethers.formatUnits(tokenBalance, tokenDecimals)} ${tokenSymbol}`  
  );  
  const router = await gasless.getGaslessSwapRouter(provider);  
  const routerAddr = await router.getAddress();  
  const isTokenSupported = await router.isTokenSupported(tokenAddr);  
  const commissionRate = Number(await router.commissionRate());  
  console.log(`\nGaslessSwapRouter address: ${routerAddr}`);  
  console.log(`- The token is supported: ${isTokenSupported}`);  
  console.log(`- Commission rate: ${commissionRate} bps`);  
  …….  
}  
```

## Step 4: Prepare ApproveTx and SwapTx Transactions

In this step, we prepare two essential transactions that enable gas abstraction through token conversion:

**ApproveTx**  
Before a smart contract can spend a user's ERC20 tokens, it must first be granted permission through an approval. Here, we check whether the sender has already approved the GaslessSwapRouter to spend their tokens.

* If the allowance is zero, we generate an ApproveTx.  
* If the allowance already exists and is sufficient, we skip this step to save gas.

**SwapTx**  
After handling approval, we prepare the SwapTx. This is the transaction that converts the ERC20 token into KAIA to cover gas fees for the final claim transaction.  
We calculate three key values:

* **amountRepay** is the exact amount of KAIA needed to cover all related transactions including the swap itself  
* **minAmountOut** is the minimum amount of KAIA expected from the swap after accounting for the app transaction fee and the router commission  
* **amountIn** is the amount of the ERC20 token required to receive minAmountOut, with slippage accounted for

If the sender's token balance is not enough to cover amountIn, execution will halt and prompt the user to fund their account. These two transactions, ApproveTx and SwapTx, are added to a list of transactions that will be submitted together as we would see in the next steps. 

Kaia  
```javascript
 ……..  
const gasPrice = Number((await provider.getFeeData()).gasPrice);  
  // If the sender hasn't approved, include ApproveTx first.  
  const allowance = await token.allowance(senderAddr, routerAddr);  
  const approveRequired = allowance == 0n;  
  const txs = [];  
  if (approveRequired) {  
    console.log("\nAdding ApproveTx because allowance is 0");  
    const approveTx = await gasless.getApproveTx(  
      provider,  
      senderAddr,  
      tokenAddr,  
      routerAddr,  
      gasPrice  
    );  
    txs.push(approveTx);  
  } else {  
    console.log("\nNo ApproveTx needed");  
  }  
  // - amountRepay (KAIA) is the cost of LendTx, ApproveTx, and SwapTx. The block miner shall fund it first,  
  //   then the sender has to repay from the swap output.  
  // - minAmountOut (KAIA) is the required amount of the swap output. It must be enough to cover the amountRepay  
  //   and pay the commission, still leaving appTxFee.  
  // - amountIn (token) is the amount of the token to be swapped to produce minAmountOut plus slippage.  
  console.log("\nCalculating the amount of the token to be swapped...");  
  console.log(`- gasPrice: ${ethers.formatUnits(gasPrice, "gwei")} gkei`);  
  const amountRepay = gasless.getAmountRepay(approveRequired, gasPrice);  
  console.log(`- amountRepay: ${ethers.formatEther(amountRepay)} KAIA`);  
  const minAmountOut = gasless.getMinAmountOut(  
    amountRepay,  
    appTxFee,  
    commissionRate  
  );  
  console.log(`- minAmountOut: ${ethers.formatEther(minAmountOut)} KAIA`);  
  const slippageBps = 50; // 0.5%  
  const amountIn = await gasless.getAmountIn(  
    router,  
    tokenAddr,  
    minAmountOut,  
    slippageBps  
  );  
  console.log(  
    `- amountIn: ${ethers.formatUnits(amountIn, tokenDecimals)} ${tokenSymbol}`  
  );  
  if (tokenBalance < amountIn) {  
    console.log(  
      `\nInsufficient balance of the token: ${ethers.formatUnits(  
        tokenBalance,  
        tokenDecimals  
      )} ${tokenSymbol}`  
    );  
    console.log(  
      `- Please transfer more ${tokenSymbol} to the sender ${senderAddr}`  
    );  
    return;  
  }  
  const swapTx = await gasless.getSwapTx(  
    provider,  
    senderAddr,  
    tokenAddr,  
    routerAddr,  
    amountIn,  
    minAmountOut,  
    amountRepay,  
    gasPrice,  
    approveRequired  
  );  
  txs.push(swapTx);  
 ………  
```

Kairos  
```javascript
….  
  const gasPrice = Number((await provider.getFeeData()).gasPrice);  
  // If the sender hasn't approved, include ApproveTx first.  
  const allowance = await token.allowance(senderAddr, routerAddr);  
  const approveRequired = allowance == 0n;  
  const txs = [];  
  if (approveRequired) {  
    console.log("\nAdding ApproveTx because allowance is 0");  
    const approveTx = await gasless.getApproveTx(  
      provider,  
      senderAddr,  
      tokenAddr,  
      routerAddr,  
      gasPrice  
    );  
    txs.push(approveTx);  
  } else {  
    console.log("\nNo ApproveTx needed");  
  }  
  // - amountRepay (KAIA) is the cost of LendTx, ApproveTx, and SwapTx. The block miner shall fund it first,  
  //   then the sender has to repay from the swap output.  
  // - minAmountOut (KAIA) is the required amount of the swap output. It must be enough to cover the amountRepay  
  //   and pay the commission, still leaving appTxFee.  
  // - amountIn (token) is the amount of the token to be swapped to produce minAmountOut plus slippage.  
  console.log("\nCalculating the amount of the token to be swapped...");  
  console.log(`- gasPrice: ${ethers.formatUnits(gasPrice, "gwei")} gkei`);  
  const amountRepay = gasless.getAmountRepay(approveRequired, gasPrice);  
  console.log(`- amountRepay: ${ethers.formatEther(amountRepay)} KAIA`);  
  const minAmountOut = gasless.getMinAmountOut(  
    amountRepay,  
    appTxFee,  
    commissionRate  
  );  
  console.log(`- minAmountOut: ${ethers.formatEther(minAmountOut)} KAIA`);  
  const slippageBps = 50; // 0.5%  
  const amountIn = await gasless.getAmountIn(  
    router,  
    tokenAddr,  
    minAmountOut,  
    slippageBps  
  );  
  console.log(  
    `- amountIn: ${ethers.formatUnits(amountIn, tokenDecimals)} ${tokenSymbol}`  
  );  
  if (tokenBalance < amountIn) {  
    console.log(  
      `\nInsufficient balance of the token: ${ethers.formatUnits(  
        tokenBalance,  
        tokenDecimals  
      )} ${tokenSymbol}`  
    );  
    console.log(  
      `- Please transfer more ${tokenSymbol} to the sender ${senderAddr}`  
    );  
    return;  
  }  
  const swapTx = await gasless.getSwapTx(  
    provider,  
    senderAddr,  
    tokenAddr,  
    routerAddr,  
    amountIn,  
    minAmountOut,  
    amountRepay,  
    gasPrice,  
    approveRequired  
  );  
  txs.push(swapTx);  
  ….  
```

## Step 5: Execute ApproveTx and SwapTx Transactions

Now that both the **ApproveTx** and **SwapTx** have been prepared and added to the transaction list, we can execute them together using Kaia’s gas abstraction feature.

The wallet.sendTransactions(txs) function handles this process by submitting the transactions as a batch. Under the hood, it leverages the **kaia_sendRawTransactions** RPC method, which accepts an array of signed, RLP-encoded transactions that conform to Ethereum transaction types.

This makes it well suited for submitting both the ApproveTx and SwapTx in a single atomic operation. 

Kaia  
```javascript
……..  
  console.log("\nSending gasless transactions...");  
  const sentTxs = await wallet.sendTransactions(txs);  
  for (const tx of sentTxs) {  
    console.log(`- Tx sent: (nonce: ${tx.nonce}) ${tx.hash}`);  
  }  
  console.log("\nWaiting for transactions to be mined...");  
  let blockNum = 0;  
  for (const sentTx of sentTxs) {  
    const receipt = await sentTx.wait();  
    console.log(`- Tx mined at block ${receipt.blockNumber}`);  
    blockNum = receipt.blockNumber;  
  }  
………  
```

Kairos   
```javascript
…….  
  console.log("\nSending gasless transactions...");  
  const sentTxs = await wallet.sendTransactions(txs);  
  for (const tx of sentTxs) {  
    console.log(`- Tx sent: (nonce: ${tx.nonce}) ${tx.hash}`);  
  }  
  console.log("\nWaiting for transactions to be mined...");  
  let blockNum = 0;  
  for (const sentTx of sentTxs) {  
    const receipt = await sentTx.wait();  
    console.log(`- Tx mined at block ${receipt.blockNumber}`);  
    blockNum = receipt.blockNumber;  
  }  
……  
```

## Step 6: Execute the Application Transaction (Claim Airdrop)

With the swap complete and the AppTxFee received, you can now trigger the main application transaction —  in this case, the claimAirdrop function.

Start by constructing the transaction object using the target contract address, encoded call data, estimated gas, and the current gas price:

Kaia  
```javascript
  const claimTxObject = {  
    to: CLAIM_GOLD_CONTRACT_ADDRESS,  
    data: encodedData,  
    gasLimit: estimatedGas,  
    gasPrice: claimGasPrice.gasPrice,  
  };  
```  

Kairos  
```javascript
…….  
  const claimTxObject = {  
    to: CLAIM_GOLD_CONTRACT_ADDRESS,  
    data: encodedData,  
    gasLimit: estimatedGas,  
    gasPrice: claimGasPrice.gasPrice,  
  };  
```

Send the transaction using the wallet:

Kaia   
```javascript
…….  
console.log("\nClaiming airdrop...");  
const claimAirdropTx = await wallet.sendTransaction(claimTxObject);  
const txx = await claimAirdropTx.wait()  
console.log("ClaimAirdrop Tx Hash: ", txx.hash);  
……  
``` 

Kairos  
```javascript

console.log("\nClaiming airdrop...");  
const claimAirdropTx = await wallet.sendTransaction(claimTxObject);  
const txx = await claimAirdropTx.wait()  
console.log("ClaimAirdrop Tx Hash: ", txx.hash);  
``` 
After the transaction is mined, you may want to check the updated balances of the sender to confirm that the airdrop was successfully claimed:

Kaia

```javascript
console.log(`\nFinal balance of the sender ${senderAddr}`);  
console.log(`${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`);  
console.log(`${ethers.formatUnits(await token.balanceOf(senderAddr), tokenDecimals)} ${tokenSymbol}`);  
console.log(`${ethers.formatUnits(await goldToken.balanceOf(senderAddr), 18)} GOLD tokens`);  
``` 

Kairos  
```javascript
console.log(`\nFinal balance of the sender ${senderAddr}`);  
console.log(`${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`);  
console.log(`${ethers.formatUnits(await token.balanceOf(senderAddr), tokenDecimals)} ${tokenSymbol}`);  
console.log(`${ethers.formatUnits(await goldToken.balanceOf(senderAddr), tokenDecimals)} GOLD tokens`);  
```

This balance check ensures the user received the expected GOLD tokens from the claimAirdrop call and confirms that the AppTxFee swap mechanism worked as intended.

Full Code:

Want to run the full example directly? Copy the full script below with all steps combined.

Kaia

```javascript
const ethers = require("ethers"); // ethers v6
const { Wallet, gasless } = require("@kaiachain/ethers-ext/v6");
require('dotenv').config()
// Replace with your wallet address and private key
const senderAddr = "PASTE SENDER ADDRESS";
const senderPriv = process.env.SENDER_PK;
const provider = new ethers.JsonRpcProvider(
  "https://kaia.blockpi.network/v1/rpc/public"
);
const wallet = new Wallet(senderPriv, provider);
// Replace with ERC20 token address to be spent
const tokenAddr = "0xd077A400968890Eacc75cdc901F0356c943e4fDb"; // USDT Token Contract Address
const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
];
const CLAIM_GOLD_CONTRACT_ADDRESS = "0x8ce5130B137FD4e84F43e3E7aD34918aF8F70F6b";
// MINIMAL CLAIM GOLD CONTRACT ABI 
const CLAIM_AIRDROP_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const CLAIM_AMOUNT = ethers.parseUnits("10", 18); // 10 tokens
async function main() {
  // prepare encoded transaction
  const iface = new ethers.Interface(CLAIM_AIRDROP_ABI);
  const encodedData = iface.encodeFunctionData("mint", [
    wallet.address,
    CLAIM_AMOUNT,
  ]);
  // estimate Gas
  const estimatedGas = await provider.estimateGas({
    to: CLAIM_GOLD_CONTRACT_ADDRESS,
    from: wallet.address,
    data: encodedData,
  });
  // gasPrice
  const claimGasPrice = await provider.getFeeData();
  console.log("Estimated Gas for claim:", estimatedGas.toString());
  console.log("Estimated GasPrice for claim:", claimGasPrice.gasPrice.toString());
  const gasFees = Number(estimatedGas) * Number(claimGasPrice.gasPrice);
  console.log(`Gas fee: ${gasFees}`);
  const gasFeesInEther = ethers.formatEther(gasFees.toString());
  const appTxFee = ethers.parseEther(gasFeesInEther.toString()).toString();
  // Query the environment
  console.log(`Using token at address: ${tokenAddr}`);
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, provider);
  const goldToken = new ethers.Contract(CLAIM_GOLD_CONTRACT_ADDRESS, CLAIM_AIRDROP_ABI, provider);
  const tokenSymbol = await token.symbol();
  const tokenDecimals = await token.decimals();
  const tokenBalance = await token.balanceOf(senderAddr);
  console.log(`\nInitial balance of the sender ${senderAddr}`);
  console.log(
    `- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`
  );
  console.log(
    `- ${ethers.formatUnits(tokenBalance, tokenDecimals)} ${tokenSymbol}`
  );
  const router = await gasless.getGaslessSwapRouter(provider);
  const routerAddr = await router.getAddress();
  const isTokenSupported = await router.isTokenSupported(tokenAddr);
  const commissionRate = Number(await router.commissionRate());
  console.log(`\nGaslessSwapRouter address: ${routerAddr}`);
  console.log(`- The token is supported: ${isTokenSupported}`);
  console.log(`- Commission rate: ${commissionRate} bps`);
  const gasPrice = Number((await provider.getFeeData()).gasPrice);
  // If sender hasn't approved, include ApproveTx first.
  const allowance = await token.allowance(senderAddr, routerAddr);
  const approveRequired = allowance == 0n;
  const txs = [];
  if (approveRequired) {
    console.log("\nAdding ApproveTx because allowance is 0");
    const approveTx = await gasless.getApproveTx(
      provider,
      senderAddr,
      tokenAddr,
      routerAddr,
      gasPrice
    );
    txs.push(approveTx);
  } else {
    console.log("\nNo ApproveTx needed");
  }
  // - amountRepay (KAIA) is the cost of LendTx, ApproveTx, and SwapTx. The block miner shall fund it first,
  //   then the sender has to repay from the swap output.
  // - minAmountOut (KAIA) is the required amount of the swap output. It must be enough to cover the amountRepay
  //   and pay the commission, still leaving appTxFee.
  // - amountIn (token) is the amount of the token to be swapped to produce minAmountOut plus slippage.
  console.log("\nCalculating the amount of the token to be swapped...");
  console.log(`- gasPrice: ${ethers.formatUnits(gasPrice, "gwei")} gkei`);
  const amountRepay = gasless.getAmountRepay(approveRequired, gasPrice);
  console.log(`- amountRepay: ${ethers.formatEther(amountRepay)} KAIA`);
  const minAmountOut = gasless.getMinAmountOut(
    amountRepay,
    appTxFee,
    commissionRate
  );
  console.log(`- minAmountOut: ${ethers.formatEther(minAmountOut)} KAIA`);
  const slippageBps = 50; // 0.5%
  const amountIn = await gasless.getAmountIn(
    router,
    tokenAddr,
    minAmountOut,
    slippageBps
  );
  console.log(
    `- amountIn: ${ethers.formatUnits(amountIn, tokenDecimals)} ${tokenSymbol}`
  );
  if (tokenBalance < amountIn) {
    console.log(
      `\nInsufficient balance of the token: ${ethers.formatUnits(
        tokenBalance,
        tokenDecimals
      )} ${tokenSymbol}`
    );
    console.log(
      `- Please transfer more ${tokenSymbol} to the sender ${senderAddr}`
    );
    return;
  }
  const swapTx = await gasless.getSwapTx(
    provider,
    senderAddr,
    tokenAddr,
    routerAddr,
    amountIn,
    minAmountOut,
    amountRepay,
    gasPrice,
    approveRequired
  );
  txs.push(swapTx);
  console.log("\nSending gasless transactions...");
  const sentTxs = await wallet.sendTransactions(txs);
  for (const tx of sentTxs) {
    console.log(`- Tx sent: (nonce: ${tx.nonce}) ${tx.hash}`);
  }
  console.log("\nWaiting for transactions to be mined...");
  let blockNum = 0;
  for (const sentTx of sentTxs) {
    const receipt = await sentTx.wait();
    console.log(`- Tx mined at block ${receipt.blockNumber}`);
    blockNum = receipt.blockNumber;
  }
  console.log("\nListing the block's transactions related to the sender...");
  const block = await provider.getBlock(blockNum, true);
  const names = {
    [senderAddr.toLowerCase()]: "sender",
    [tokenAddr.toLowerCase()]: "token",
    [routerAddr.toLowerCase()]: "router",
  };
  for (const txhash of block.transactions) {
    const tx = await provider.getTransaction(txhash);
    const fromName = names[tx.from.toLowerCase()] || tx.from;
    const toName = names[tx.to.toLowerCase()] || tx.to;
    if (fromName != tx.from || toName != tx.to) {
      console.log(`- Tx ${tx.hash}: ${fromName} => ${toName}`);
    }
  }
  // Construct transaction object
  const claimTxObject = {
    to: CLAIM_GOLD_CONTRACT_ADDRESS,
    data: encodedData,
    gasLimit: estimatedGas,
    gasPrice: claimGasPrice.gasPrice,
  };
  console.log("\nClaiming airdrop...");
  const claimAirdropTx = await wallet.sendTransaction(claimTxObject);
  const txx = await claimAirdropTx.wait()
  console.log("ClaimAirdrop Tx Hash: ", txx.hash);
  console.log(`\nFinal balance of the sender ${senderAddr}`);
  console.log(
    `- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`
  );
  console.log(
    `- ${ethers.formatUnits(
      await token.balanceOf(senderAddr),
      tokenDecimals
    )} ${tokenSymbol}`
  );
    console.log(
    `- ${ethers.formatUnits(
      await goldToken.balanceOf(senderAddr),
      18
    )} GOLD tokens`
  );
}
main().catch(console.error);

```

Kairos

```javascript
const ethers = require("ethers"); // ethers v6
const { Wallet, gasless } = require("@kaiachain/ethers-ext/v6");
require('dotenv').config()
// Replace with your wallet address and private key
const senderAddr = "PASTE SENDER ADDRESS";
const senderPriv = process.env.SENDER_PK;
const provider = new ethers.JsonRpcProvider(
  "https://responsive-green-emerald.kaia-kairos.quiknode.pro"
);
const wallet = new Wallet(senderPriv, provider);
// Replace with ERC20 token address to be spent
const tokenAddr = "0xcB00BA2cAb67A3771f9ca1Fa48FDa8881B457750"; // Kairos:TEST token
const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
];
const CLAIM_GOLD_CONTRACT_ADDRESS = "0x18DfDEd9bb342519549c1dBAd832c0FCfF5F6F70";
// MINIMAL CLAIM GOLD CONTRACT ABI 
const CLAIM_AIRDROP_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const CLAIM_AMOUNT = ethers.parseUnits("10", 18); // 10 tokens
async function main() {
  // prepare encoded transaction
  const iface = new ethers.Interface(CLAIM_AIRDROP_ABI);
  const encodedData = iface.encodeFunctionData("mint", [
    wallet.address,
    CLAIM_AMOUNT,
  ]);
  // estimate Gas
  const estimatedGas = await provider.estimateGas({
    to: CLAIM_GOLD_CONTRACT_ADDRESS,
    from: wallet.address,
    data: encodedData,
  });
  // gasPrice
  const claimGasPrice = await provider.getFeeData();
  console.log("Estimated Gas for claim:", estimatedGas.toString());
  console.log("Estimated GasPrice for claim:", claimGasPrice.gasPrice.toString());
  const gasFees = Number(estimatedGas) * Number(claimGasPrice.gasPrice);
  console.log(`Gas fee: ${gasFees}`);
  const gasFeesInEther = ethers.formatEther(gasFees.toString());
  const appTxFee = ethers.parseEther(gasFeesInEther.toString()).toString();
  // Query the environment
  console.log(`Using token at address: ${tokenAddr}`);
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, provider);
  const goldToken = new ethers.Contract(CLAIM_GOLD_CONTRACT_ADDRESS, CLAIM_AIRDROP_ABI, provider);
  const tokenSymbol = await token.symbol();
  const tokenDecimals = await token.decimals();
  const tokenBalance = await token.balanceOf(senderAddr);
  console.log(`\nInitial balance of the sender ${senderAddr}`);
  console.log(
    `- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`
  );
  console.log(
    `- ${ethers.formatUnits(tokenBalance, tokenDecimals)} ${tokenSymbol}`
  );
  const router = await gasless.getGaslessSwapRouter(provider);
  const routerAddr = await router.getAddress();
  const isTokenSupported = await router.isTokenSupported(tokenAddr);
  const commissionRate = Number(await router.commissionRate());
  console.log(`\nGaslessSwapRouter address: ${routerAddr}`);
  console.log(`- The token is supported: ${isTokenSupported}`);
  console.log(`- Commission rate: ${commissionRate} bps`);
  
  const gasPrice = Number((await provider.getFeeData()).gasPrice);
  // If sender hasn't approved, include ApproveTx first.
  const allowance = await token.allowance(senderAddr, routerAddr);
  const approveRequired = allowance == 0n;
  const txs = [];
  if (approveRequired) {
    console.log("\nAdding ApproveTx because allowance is 0");
    const approveTx = await gasless.getApproveTx(
      provider,
      senderAddr,
      tokenAddr,
      routerAddr,
      gasPrice
    );
    txs.push(approveTx);
  } else {
    console.log("\nNo ApproveTx needed");
  }
  // - amountRepay (KAIA) is the cost of LendTx, ApproveTx, and SwapTx. The block miner shall fund it first,
  //   then the sender has to repay from the swap output.
  // - minAmountOut (KAIA) is the required amount of the swap output. It must be enough to cover the amountRepay
  //   and pay the commission, still leaving appTxFee.
  // - amountIn (token) is the amount of the token to be swapped to produce minAmountOut plus slippage.
  console.log("\nCalculating the amount of the token to be swapped...");
  console.log(`- gasPrice: ${ethers.formatUnits(gasPrice, "gwei")} gkei`);
  const amountRepay = gasless.getAmountRepay(approveRequired, gasPrice);
  console.log(`- amountRepay: ${ethers.formatEther(amountRepay)} KAIA`);
  const minAmountOut = gasless.getMinAmountOut(
    amountRepay,
    appTxFee,
    commissionRate
  );
  console.log(`- minAmountOut: ${ethers.formatEther(minAmountOut)} KAIA`);
  const slippageBps = 50; // 0.5%
  const amountIn = await gasless.getAmountIn(
    router,
    tokenAddr,
    minAmountOut,
    slippageBps
  );
  console.log(
    `- amountIn: ${ethers.formatUnits(amountIn, tokenDecimals)} ${tokenSymbol}`
  );
  if (tokenBalance < amountIn) {
    console.log(
      `\nInsufficient balance of the token: ${ethers.formatUnits(
        tokenBalance,
        tokenDecimals
      )} ${tokenSymbol}`
    );
    console.log(
      `- Please transfer more ${tokenSymbol} to the sender ${senderAddr}`
    );
    return;
  }
  const swapTx = await gasless.getSwapTx(
    provider,
    senderAddr,
    tokenAddr,
    routerAddr,
    amountIn,
    minAmountOut,
    amountRepay,
    gasPrice,
    approveRequired
  );
  txs.push(swapTx);
  console.log("\nSending gasless transactions...");
  const sentTxs = await wallet.sendTransactions(txs);
  for (const tx of sentTxs) {
    console.log(`- Tx sent: (nonce: ${tx.nonce}) ${tx.hash}`);
  }
  console.log("\nWaiting for transactions to be mined...");
  let blockNum = 0;
  for (const sentTx of sentTxs) {
    const receipt = await sentTx.wait();
    console.log(`- Tx mined at block ${receipt.blockNumber}`);
    blockNum = receipt.blockNumber;
  }
  console.log("\nListing the block's transactions related to the sender...");
  const block = await provider.getBlock(blockNum, true);
  const names = {
    [senderAddr.toLowerCase()]: "sender",
    [tokenAddr.toLowerCase()]: "token",
    [routerAddr.toLowerCase()]: "router",
  };
  for (const txhash of block.transactions) {
    const tx = await provider.getTransaction(txhash);
    const fromName = names[tx.from.toLowerCase()] || tx.from;
    const toName = names[tx.to.toLowerCase()] || tx.to;
    if (fromName != tx.from || toName != tx.to) {
      console.log(`- Tx ${tx.hash}: ${fromName} => ${toName}`);
    }
  }
  // Construct transaction object
  const claimTxObject = {
    to: CLAIM_GOLD_CONTRACT_ADDRESS,
    data: encodedData,
    gasLimit: estimatedGas,
    gasPrice: claimGasPrice.gasPrice,
  };
  console.log("\nClaiming airdrop...");
 const claimAirdropTx = await wallet.sendTransaction(claimTxObject);
  const txx = await claimAirdropTx.wait()
  console.log("ClaimAirdrop Tx Hash: ", txx.hash);
  console.log(`\nFinal balance of the sender ${senderAddr}`);
  console.log(
    `- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`
  );
  console.log(
    `- ${ethers.formatUnits(
      await token.balanceOf(senderAddr),
      tokenDecimals
    )} ${tokenSymbol}`
  );
    console.log(
    `- ${ethers.formatUnits(
      await goldToken.balanceOf(senderAddr),
      tokenDecimals
    )} GOLD tokens`
  );
}
main().catch(console.error);

```

## Step 7: See Code in Action

Now that you’ve completed the setup and prepared your transactions, it’s time to run your code and observe the results.

**Kaia**

Run `node kaia-ga.js` in your terminal

Output:

![](/img/build/tutorials/ga-integration-2.png)

**Kairos**

Run `node kairos-ga.js` in your terminal  

Output:

![](/img/build/tutorials/ga-integration-3.png)


## Conclusion

You’ve just completed a full walkthrough of executing a gas-abstracted transaction on Kaia. From setting up your account and funding it with supported tokens to building and submitting transactions, everything was done without requiring users to hold native KAIA. You also saw a real-world flow where users could receive and claim an airdrop completely gas-free.

By using Kaia’s gas abstraction feature, you can now onboard users with zero native tokens — removing friction and creating a smoother experience for Web3 applications.