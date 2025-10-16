# 4. 在您的 dApp 或錢包中整合瓦斯抽象

在本頁中，您將學習如何將氣體抽象 (GA) 功能整合到您的錢包中。 在本指南中，您將使用 [Kaia SDK](https://github.com/kaiachain/kaia-sdk) (ethers-ext) 在 Kaia 鏈上實作 GA 功能。

## 先決條件

- Kaia 帳戶。

## 開始使用

本指南專為想要在 Kaia 上實作 Gas Abstraction (GA) 的錢包開發人員所設計。 您將參考真實世界的使用案例 - 執行應用程式層級的交易，使用者在不持有任何原生 KAIA 的情況下，要求空投 ERC20 代幣以支付汽油費用。

您將學習如何

- 為 GA 準備帳目
- 使用 GA 支援的代幣為帳戶提供資金
- 使用瓦斯抽取建構並執行核准與交換交易

此實作可在 **Kaia Mainnet** 和 **Kairos Testnet** 上無縫運作。 若要跟隨，您需要在任一網路中取得一些 GA 支援的 ERC-20 代幣：

- 在 Kaia 主網路上，我們會使用 [USDT](https://kaiascan.io/address/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=txList&page=1)
- 在 Kairos Testnet 上，我們會使用 [TEST](https://kairos.kaiascan.io/address/0xcb00ba2cab67a3771f9ca1fa48fda8881b457750?tabId=txList&page=1) 代幣

### 使用支援的 GA 代幣為您的帳戶注資

\*\* Kaia Mainnet\*\*

要取得 USDT：

- 您可以從這些支援 Kaia-Compatible 代幣的 [集中式交易所 (CEXes)](https://www.coingecko.com/en/coins/kaia#markets) 購買或轉移 USDT。
- 請確定您收到的 USDT 是 Kaia GA 支援的 ERC-20 版本。

**Kairos Testnet**

要取得 TEST 代幣：

1. 在 Kaiascan 上開啟 [ERC20 Faucet](https://kairos.kaiascan.io/address/0x78a6cacfe5d34e0566e56710c8789d207411001a?tabId=contract&page=1)
2. 移至**合約**索引標籤，然後選擇**撰寫合約**
3. 找到 claim(token) 函式
4. 貼入 Kairos 上受支援的 **GA token** 位址 (本指南使用 TEST 的位址)
5. 按一下 \*\* 查詢\*\* 以提交請求

您應該很快就會收到您的 TEST 代幣。

![](/img/build/tutorials/ga-integration-1.png)

## 步驟 1：設定專案並安裝 ethers-ext 和 ethers.js

```bash
mkdir kaia-ga-example  
cd  kaia-ga-example  
npm init -y    
npm install --save @kaiachain/ethers-ext ethers@6 dotenv  
```

## 步驟 2：設定供應商和錢包實例

Kaia

建立一個名為 kaia-ga.js 的新檔案，並將下列程式碼貼入其中：

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

啟動

建立一個名為 kairos-ga.js 的新檔案，並將下列程式碼貼到其中：

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

:::note
步驟 2 至 6 共同組成一個完整的可執行流程。 依序將每個區塊複製到相同的檔案中。  
:::

## 步驟 3：配置合約以估算索賠費用和代幣支援

在這個步驟中，我們會估算執行 claimAirdrop 交易的成本，以便使用代幣交換來彌補。 此估算成本稱為 **AppTxFee**--寄件者需要從交換中收到的 KAIA（Wei）金額，以便為後續的應用程式層級交易（在本例中為空投索賠）提供資金。  
我們也會準備和設定所有必要的合約實體，以便：

- 確認 **GaslessSwapRouter** 支援所選的 ERC20 令牌。
- 擷取路由器目前收取的 \*\* 佣金費率\*\*。
- 擷取**路由器的位址**，以用於交換和核准步驟。

這些參數對於在接下來的步驟中設定有效且可執行的無氣體交換非常重要。

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

啟動

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

## 步驟 4：準備 ApproveTx 和 SwapTx 交易

在這個步驟中，我們準備了兩個重要的交易，透過代幣轉換實現瓦斯抽象：

**ApproveTx**  
在智慧契約花費使用者的 ERC20 代幣之前，必須先透過核准來授予其權限。 在此，我們會檢查寄件者是否已經批准 GaslessSwapRouter 使用他們的代幣。

- 如果允許額度為零，我們會產生一個 ApproveTx。
- 如果備用金已存在且足夠，我們會跳過此步驟，以節省汽油。

**SwapTx**  
處理核准後，我們會準備 SwapTx。 這是將 ERC20 代幣轉換成 KAIA 的交易，以支付最終索賠交易的瓦斯費用。  
我們計算出三個關鍵值：

- **amountRepay** 是支付所有相關交易（包括掉期本身）所需的 KAIA 準確金額
- **minAmountOut** 是在計入應用程式交易費用和路由器佣金後，預期從掉期中獲得的最低 KAIA 金額。
- **amountIn** 是接收 minAmountOut 所需的 ERC20 代幣金額，其中已計入滑點。

如果寄件者的代幣餘額不足以支付 amountIn，執行將會停止，並提示使用者為其帳戶注資。 這兩個交易，即 ApproveTx 和 SwapTx，會加入到交易清單中，我們會在接下來的步驟中看到這些交易會一起提交。

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

啟示錄

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

## 步驟 5：執行 ApproveTx 和 SwapTx 交易

現在 **ApproveTx** 和 **SwapTx** 都已經準備好並加到交易清單中，我們可以使用 Kaia 的 gas abstraction 功能一起執行它們。

wallet.sendTransactions(txs) 函式會透過批次提交交易來處理此程序。 在引擎蓋下，它利用 **kaia_sendRawTransactions** RPC 方法，接受符合 Ethereum 交易類型的已簽署、RLP 編碼交易陣列。

這使得它非常適合在單一原子作業中同時提交 ApproveTx 和 SwapTx。

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

啟示錄

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

## 步驟 6：執行申請交易（索賠空投）

交換完成並收到 AppTxFee 後，您就可以啟動主要的應用程式交易 - 在本例中為 claimAirdrop 函式。

首先使用目標合約位址、編碼呼叫資料、估計瓦斯和目前瓦斯價格建立交易物件：

Kaia

```javascript
  const claimTxObject = {  
    to: CLAIM_GOLD_CONTRACT_ADDRESS,  
    data: encodedData,  
    gasLimit: estimatedGas,  
    gasPrice: claimGasPrice.gasPrice,  
  };  
```

啟示錄

```javascript
…….  
  const claimTxObject = {  
    to: CLAIM_GOLD_CONTRACT_ADDRESS,  
    data: encodedData,  
    gasLimit: estimatedGas,  
    gasPrice: claimGasPrice.gasPrice,  
  };  
```

使用錢包傳送交易：

Kaia

```javascript
…….  
console.log("\nClaiming airdrop...");  
const claimAirdropTx = await wallet.sendTransaction(claimTxObject);  
const txx = await claimAirdropTx.wait()  
console.log("ClaimAirdrop Tx Hash: ", txx.hash);  
……  
```

啟示錄

```javascript

console.log("\nClaiming airdrop...");  
const claimAirdropTx = await wallet.sendTransaction(claimTxObject);  
const txx = await claimAirdropTx.wait()  
console.log("ClaimAirdrop Tx Hash: ", txx.hash);  
```

交易完成後，您可能需要檢查寄件者的最新餘額，以確認是否已成功領取空投：

Kaia

```javascript
console.log(`\nFinal balance of the sender ${senderAddr}`);  
console.log(`${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`);  
console.log(`${ethers.formatUnits(await token.balanceOf(senderAddr), tokenDecimals)} ${tokenSymbol}`);  
console.log(`${ethers.formatUnits(await goldToken.balanceOf(senderAddr), 18)} GOLD tokens`);  
```

啟示錄

```javascript
console.log(`\nFinal balance of the sender ${senderAddr}`);  
console.log(`${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`);  
console.log(`${ethers.formatUnits(await token.balanceOf(senderAddr), tokenDecimals)} ${tokenSymbol}`);  
console.log(`${ethers.formatUnits(await goldToken.balanceOf(senderAddr), tokenDecimals)} GOLD tokens`);  
```

此平衡檢查可確保使用者從 claimAirdrop 呼叫中收到預期的 GOLD 代幣，並確認 AppTxFee 交換機制如預期般運作。

完整代碼：

想要直接執行完整範例嗎？ 複製以下結合所有步驟的完整腳本。

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

啟動

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

## 步驟 7：檢視執行中的程式碼

現在您已完成設定並準備好您的交易，是時候執行您的程式碼並觀察結果了。

**凱亞**

在您的終端執行 \`node kaia-ga.js

輸出：

![](/img/build/tutorials/ga-integration-2.png)

\*\* 開始\*\*

在您的終端執行 \`node kairos-ga.js

輸出：

![](/img/build/tutorials/ga-integration-3.png)

## 總結

您剛剛完成了在 Kaia 上執行瓦斯抽取交易的完整演練。 從建立帳戶、使用支援的代幣提供資金，到建立和提交交易，一切都不需要使用者持有原生的 KAIA。 您也看到一個真實的流程，使用者可以完全無氣地接收並領取空投。

透過使用 Kaia 的氣體抽象功能，您現在可以使用零本機代碼登入使用者 - 消除摩擦並為 Web3 應用程式創造更順暢的體驗。