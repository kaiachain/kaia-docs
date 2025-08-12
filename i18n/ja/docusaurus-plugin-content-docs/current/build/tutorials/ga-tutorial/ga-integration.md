# 4. ガス抽象化をdAppやウォレットに組み込む

このページでは、ガスアブストラクション（GA）の機能を財布に統合する方法を学びます。 このガイドでは、[Kaia SDK](https://github.com/kaiachain/kaia-sdk) (ethers-ext) を使用してKaiaチェーンにGA機能を実装します。

## 前提条件

- カイアのアカウント

## はじめに

このガイドは、カイアにガス抽象化（GA）を実装したいウォレット開発者のために設計されています。 実際のユースケース（ユーザーがガス代を支払うためにネイティブのKAIAを持たずにERC20トークンのエアドロップを要求するアプリケーションレベルのトランザクションの実行）を見ていきます。

その方法を学ぶのだ：

- GA会計の準備
- GAがサポートするトークンでアカウントに資金を供給する
- ガス・アブストラクションを使用した承認取引とスワップ取引の構築と実行

実装は**Kaia Mainnet**と**Kairos Testnet**の両方でシームレスに動作します。 この作業を続けるには、GAがサポートするERC-20トークンが必要だ：

- カイア・メインネットでは、[USDT](https://kaiascan.io/address/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=txList&page=1) を使用する。
- Kairos Testnetでは、[TEST](https://kairos.kaiascan.io/address/0xcb00ba2cab67a3771f9ca1fa48fda8881b457750?tabId=txList&page=1) トークンを使用します。

### サポートされているGAトークンでアカウントに資金を供給する

\*\*カイア・メインネット

USDTを入手する：

- カイア互換トークンをサポートするこれらの[集中型取引所（CEX）](https://www.coingecko.com/en/coins/kaia#markets)からUSDTを購入または送金することができます。
- あなたが受け取るUSDTが、Kaia GAがサポートするERC-20バージョンであることを確認してください。

\*\*カイロス・テストネット

TESTトークンを獲得する：

1. Kaiascanで[ERC20蛇口](https://kairos.kaiascan.io/address/0x78a6cacfe5d34e0566e56710c8789d207411001a?tabId=contract&page=1)を開く
2. 契約書\*\*タブを開き、**契約書を書く**を選択する。
3. claim(token)関数を探す
4. カイロスでサポートされている**GAトークン**のアドレスを貼り付ける（このガイドでは、TESTのアドレスを使用する）。
5. リクエストを送信するには、**クエリー**をクリックします。

まもなくTESTトークンが届きます。

![](/img/build/tutorials/ga-integration-1.png)

## ステップ1: プロジェクトのセットアップとethers-extとethers.jsのインストール

```bash
mkdir kaia-ga-example  
cd  kaia-ga-example  
npm init -y    
npm install --save @kaiachain/ethers-ext ethers@6 dotenv  
```

## ステップ2：プロバイダーとウォレットのインスタンスをセットアップする

カイア

kaia-ga.jsという名前のファイルを新規作成し、以下のコードを貼り付ける：

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

カイロス

kairos-ga.jsという名前のファイルを新規作成し、以下のコードを貼り付けます：

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
ステップ2からステップ6を合わせて、完全な実行可能フローを形成する。 各ブロックを同じファイルに順番にコピーする。\
:::

## ステップ3：請求手数料とトークンのサポートを見積もる契約の設定

このステップでは、claimAirdrop取引の実行コストを見積もり、トークンのスワップでカバーできるようにする。 この見積もりコストは、**AppTxFee**と呼ばれる。これは、後続のアプリケーションレベルのトランザクション（この場合はエアドロップ請求）に資金を供給するために、送信者がスワップから受け取る必要のあるKAIAの金額（ウェイ）である。\
また、必要な契約インスタンスをすべて用意し、設定する：

- 選択したERC20トークンが**GaslessSwapRouter**でサポートされていることを確認します。
- ルーターが請求している現在の**手数料率**を取得します。
- スワップと承認ステップで使用する**ルーターのアドレス**を取得する。

これらのパラメーターは、次のステップで有効かつ実行可能なガスレススワップを設定するために不可欠である。

カイア

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

カイロス

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

## ステップ4：ApproveTx取引とSwapTx取引の準備

このステップでは、トークン変換によるガスの抽象化を可能にする2つの重要なトランザクションを準備する：

**ApproveTx**\
スマート・コントラクトがユーザーのERC20トークンを使用する前に、まず承認によって許可を得なければならない。 ここでは、送信者がGaslessSwapRouterにトークンを使うことを承認済みかどうかをチェックする。

- 引当金がゼロの場合、ApproveTxを生成する。
- 許容量がすでに存在し、十分な場合は、ガスを節約するためにこのステップをスキップする。

**SwapTx**\
取扱承認後、SwapTx を準備する。 これはERC20トークンをKAIAに変換し、最終的なクレーム取引のガス料金を賄う取引です。\
私たちは3つの重要な数値を算出する：

- **amountRepay**は、スワップそのものを含むすべての関連取引をカバーするために必要なKAIAの正確な金額です。
- **minAmountOut**は、アプリの取引手数料とルーターの手数料を考慮した後、スワップから期待されるKAIAの最低額です。
- **amountIn**は、minAmountOutを受け取るために必要なERC20トークンの量であり、スリッページは考慮されています。

送信者のトークン残高が金額Inをカバーするのに十分でない場合、実行は停止され、ユーザーにアカウントに資金を提供するよう促します。 これら2つのトランザクション、ApproveTxとSwapTxは、次のステップで説明するように、一緒に提出されるトランザクションのリストに追加される。

カイア

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

カイロス

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

## ステップ5：ApproveTx取引とSwapTx取引の実行

これで**ApproveTx**と**SwapTx**の両方が準備され、トランザクションリストに追加されたので、Kaiaのガス抽象化機能を使ってこれらを一緒に実行することができる。

wallet.sendTransactions(txs)関数は、バッチとしてトランザクションを送信することにより、このプロセスを処理する。 このRPCメソッドは、イーサリアムのトランザクションタイプに準拠した、署名されたRLPエンコードされたトランザクションの配列を受け取ります。

このため、ApproveTxとSwapTxの両方を単一のアトミック操作で送信するのに適している。

カイア

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

カイロス

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

## ステップ6：申請取引の実行（請求エアドロップ）

スワップが完了し、AppTxFeeを受け取ったら、今度はメインのアプリケーション・トランザクショ ン（この場合はclaimAirdrop関数）をトリガーすることができる。

ターゲット契約アドレス、エンコードされたコールデータ、推定ガス、および現在のガス価格を使用して、トランザクションオブジェクトを構築することから始める：

カイア

```javascript
  const claimTxObject = {  
    to: CLAIM_GOLD_CONTRACT_ADDRESS,  
    data: encodedData,  
    gasLimit: estimatedGas,  
    gasPrice: claimGasPrice.gasPrice,  
  };  
```

カイロス

```javascript
…….  
  const claimTxObject = {  
    to: CLAIM_GOLD_CONTRACT_ADDRESS,  
    data: encodedData,  
    gasLimit: estimatedGas,  
    gasPrice: claimGasPrice.gasPrice,  
  };  
```

ウォレットを使用してトランザクションを送信します：

カイア

```javascript
…….  
console.log("\nClaiming airdrop...");  
const claimAirdropTx = await wallet.sendTransaction(claimTxObject);  
const txx = await claimAirdropTx.wait()  
console.log("ClaimAirdrop Tx Hash: ", txx.hash);  
……  
```

カイロス

```javascript

console.log("\nClaiming airdrop...");  
const claimAirdropTx = await wallet.sendTransaction(claimTxObject);  
const txx = await claimAirdropTx.wait()  
console.log("ClaimAirdrop Tx Hash: ", txx.hash);  
```

取引が採掘された後、エアドロップが正常に請求されたことを確認するために、送金者の更新された残高をチェックするとよいでしょう：

カイア

```javascript
console.log(`\nFinal balance of the sender ${senderAddr}`);  
console.log(`${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`);  
console.log(`${ethers.formatUnits(await token.balanceOf(senderAddr), tokenDecimals)} ${tokenSymbol}`);  
console.log(`${ethers.formatUnits(await goldToken.balanceOf(senderAddr), 18)} GOLD tokens`);  
```

カイロス

```javascript
console.log(`\nFinal balance of the sender ${senderAddr}`);  
console.log(`${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`);  
console.log(`${ethers.formatUnits(await token.balanceOf(senderAddr), tokenDecimals)} ${tokenSymbol}`);  
console.log(`${ethers.formatUnits(await goldToken.balanceOf(senderAddr), tokenDecimals)} GOLD tokens`);  
```

このバランスチェックは、ユーザーがclaimAirdropコールから期待されたGOLDトークンを受け取ったことを確認し、AppTxFeeスワップメカニズムが意図したとおりに機能したことを確認する。

フルコード

完全なサンプルを直接実行したいですか？ 以下のスクリプトの全ステップをコピーしてください。

カイア

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

カイロス

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

## ステップ7：コードの動作を見る

セットアップが完了し、トランザクションの準備ができたので、コードを実行して結果を観察しよう。

\*\*カイア

ターミナルで `node kaia-ga.js` を実行する。

出力：

![](/img/build/tutorials/ga-integration-2.png)

\*\*カイロス

ターミナルで `node kairos-ga.js` を実行する。

出力：

![](/img/build/tutorials/ga-integration-3.png)

## 結論

あなたは今、カイアでガス抜き取引を実行するための完全なウォークスルーを完了しました。 アカウントの設定から、サポートされているトークンでの資金調達、トランザクションの構築と送信まで、すべてはユーザーがネイティブのKAIAを保有することなく行われた。 また、ユーザーがガスなしでエアドロップを受け取り、クレームできる実際の流れも見ただろう。

Kaiaのガス抽象化機能を使用することで、ネイティブトークンを使用せずにユーザーをオンボードすることができます。