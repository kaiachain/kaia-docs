---
id: integrate-gas-free-usdt-kaia-swap
title: ガスフリーUSDTをKAIAスワップに統合
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'；

# ガスフリーUSDTをKAIAスワップに統合

このガイドでは、その目的、前提条件、統合手順、APIリファレンスなど、Gas-Free USDT to KAIAスワップ機能の概要を説明します。 これは、開発者がカイアネットワーク上の分散型アプリケーション（DApps）にガスフリーのスワップ機能を統合できるように設計されている。

## はじめに

GasFreeSwapKaia\`APIが導入され、ユーザーはガス料金のためにKAIAトークンを保持する必要なく、あるいはユーザーの代わりに取引コストをカバーする場合でさえ、Kaiaネットワーク上でガスなしのERC20トークンスワップ（現在はUSDTに限定）を実行できるようになった。 APIは特に、完全にガスレスなユーザー体験のために、ERC20許可署名を使用してUSDTからKAIAへのスワップをサポートしています。

### メリット

- **100%ガス・レス体験**：ユーザーはスワップを行うためにKAIAトークンを必要としない。
- **ユーザーオンボーディングの強化**：新規ユーザーはKAIAを取得することなく、すぐにトークンの交換を開始できます。
- **ERC20許可証の統合**：標準的なERC20許可署名を使用し、安全でガスレスのトークン承認を実現

### 仕組み

- **ユーザーがスワップを開始**：ユーザーはKAIAとスワップするUSDT量を選択します。
- **フロントエンドが許可証を作成する**：DAppはユーザが署名するためのERC20許可署名を作成する。
- \*\*ユーザーが許可証に署名する：利用者が許可メッセージに署名（ガス不要）
- \*\*DAppはAPIを呼び出す：フロントエンドはスワップ・パラメータと許可署名をAPIに送信する。
- **バックエンドの実行**：APIが許可を検証し、スワップを実行し、すべてのガス料金を支払う。
- **ユーザーがKAIAを受け取る**：ネイティブKAIAトークンはユーザーのウォレットに直接送られます。

## 前提条件と対応環境

\*\*サービス・エンドポイント

<Tabs>
  <TabItem value="Mainnet" label="Kaia Mainnet">
    https://fee-delegation.kaia.io
  </TabItem>

 <TabItem value="Testnet" label="Kairos Testnet">
    https://fee-delegation-kairos.kaia.io
 </TabItem>
</Tabs>

**サポートされるトークン・ペア**。

APIは現在、単一の取引ペアのみをサポートしている：

<Tabs>
  <TabItem value="kaia-mainnet" label="Kaia Mainnet">
    トークン・イン：USDT (`0xd077a400968890eacc75cdc901f0356c943e4fdb`)

```
Token Out: WKAIA (`0x19aac5f612f524b754ca7e7c41cbfa2e981a4432`)
```

  </TabItem>

 <TabItem value="kairos-testnet" label="Kairos Testnet">
    トークン イン: TEST (`0xcb00ba2cab67a3771f9ca1fa48fda8881b457750`)

```
Token Out: WKAIA (`0x043c471bEe060e00A56CcD02c0Ca286808a5A436`)
```

 </TabItem>
</Tabs>

\*\*テスト・トークンの取得

カイロス・テストネットのTESTトークンを入手する：

- Kaiascanで[ERC20蛇口](https://kairos.kaiascan.io/address/0x78a6cacfe5d34e0566e56710c8789d207411001a?tabId=contract&page=1)を開く
- 契約タブに移動し、_契約を書く_を選択する。
- claim(token)関数を探す
- KairosでサポートされているGAトークンのアドレスを貼り付けてください（このガイドでは、TESTのアドレスを使用してください）。
- Query\*をクリックしてリクエストを送信します。 まもなくTESTトークンが届きます。

![](/img/build/tutorials/test-tokens-faucet.png)

\*\*スマートな契約要件

APIはGaslessERC20PermitSwapスマート・コントラクトと相互作用する：

- ERC20許可ベースの認可をサポート
- Uniswap V2互換DEXとの統合
- WKAIAをネイティブKAIAに自動変換
- セキュリティのためにスワップ上限を強制する

\*\*ユーザー要件

メインネットでは、このガスレス・スワップ・サービスを利用するには、KAIAの残高がゼロでなければならない。 この要件は、オンボーディングの目的でガスなし取引が本当に必要なユーザーのみがサービスを利用することを保証する。 テストネット上では、テスト目的でこの制限が緩和されます。

最大スワップ額は、メインネットとテストネットの両方で1USDTに制限されています。 この機能は、ユーザーがカイアチェーンでの経験を開始するのに十分なKAIAを受け取るために設計されています。

## 統合ステップ

### 完全な統合例

```javascript
const { JsonRpcProvider, Wallet } = require('@kaiachain/ethers-ext/v6');
const { Contract, parseUnits, formatUnits, Signature } = require('ethers');

async function fetchJson(url, init) {
  if (typeof fetch !== 'undefined') {
    return fetch(url, init);
  }
  const { default: nodeFetch } = await import('node-fetch');
  return nodeFetch(url, init);
}

const GASLESS_SWAP_ABI = [
  'function usdtToken() view returns (address)',
  'function wkaiaToken() view returns (address)',
  'function maxUsdtAmount() view returns (uint256)',
  'function getExpectedOutput(address tokenIn, address tokenOut, uint256 amountIn) view returns (uint256)',
  'function executeSwapWithPermit(address user, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOutMin, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
];

const ERC20_METADATA_ABI = [
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'function nonces(address owner) view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
];

async function buildPermitSignature({ token, owner, spender, value, deadline, domainVersion = '1' }) {
  const [name, version, network, verifyingContract, nonce] = await Promise.all([
    token.name(),
    Promise.resolve(domainVersion),
    owner.provider.getNetwork(),
    token.getAddress(),
    token.nonces(owner.address),
  ]);

  const domain = {
    name,
    version,
    chainId: Number(network.chainId),
    verifyingContract,
  };

  const types = {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  const message = {
    owner: owner.address,
    spender,
    value,
    nonce,
    deadline,
  };

  return Signature.from(await owner.signTypedData(domain, types, message));
}

async function executeGaslessSwap({
  rpcUrl,
  serverUrl,
  userWallet,
  contractAddress,
  amountIn = '0.01', // Amount in USDT
  slippageBps = 50,   // 0.5% slippage
  permitDeadlineSeconds = 600 // 10 minutes
}) {
  console.log('🚀 Starting gasless swap');

  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = userWallet.connect(provider);
  const swap = new Contract(contractAddress, GASLESS_SWAP_ABI, provider);

  // Get token addresses from contract
  const [tokenInAddress, tokenOutAddress, maxUsdtAmount] = await Promise.all([
    swap.usdtToken(),
    swap.wkaiaToken(),
    swap.maxUsdtAmount(),
  ]);

  const tokenIn = new Contract(tokenInAddress, ERC20_METADATA_ABI, provider);
  const tokenOut = new Contract(tokenOutAddress, ERC20_METADATA_ABI, provider);

  const [tokenInDecimals, tokenOutDecimals, tokenInSymbol, tokenOutSymbol] = await Promise.all([
    tokenIn.decimals(),
    tokenOut.decimals(),
    tokenIn.symbol(),
    tokenOut.symbol(),
  ]);

  const amountInWei = parseUnits(amountIn, tokenInDecimals);
  
  // Check if amount exceeds contract maximum
  if (amountInWei > maxUsdtAmount) {
    throw new Error(`Amount (${amountIn} ${tokenInSymbol}) exceeds contract cap (${formatUnits(maxUsdtAmount, tokenInDecimals)} ${tokenInSymbol})`);
  }

  // Get expected output and calculate minimum with slippage
  const expectedOut = await swap.getExpectedOutput(tokenInAddress, tokenOutAddress, amountInWei);
  const amountOutMin = (expectedOut * BigInt(10_000 - slippageBps)) / 10_000n;

  // Create permit signature
  const deadline = BigInt(Math.floor(Date.now() / 1000) + permitDeadlineSeconds);
  const signature = await buildPermitSignature({
    token: tokenIn,
    owner: wallet,
    spender: contractAddress,
    value: amountInWei,
    deadline,
  });

  // Prepare API payload
  const payload = {
    swap: {
      user: wallet.address,
      tokenIn: tokenInAddress,
      tokenOut: tokenOutAddress,
      amountIn: amountInWei.toString(),
      amountOutMin: amountOutMin.toString(),
      deadline: deadline.toString(),
    },
permitSignature: signature.serialized,
  };

  console.log('From:', wallet.address);
  console.log('Swap amount:', formatUnits(amountInWei, tokenInDecimals), tokenInSymbol);
  console.log('Minimum out:', formatUnits(amountOutMin, tokenOutDecimals), tokenOutSymbol);

  // Check balance before swap
  const balanceBefore = await provider.getBalance(wallet.address);
  
  // Call the API
  const response = await fetchJson(`${serverUrl}/api/gasFreeSwapKaia`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  console.log('HTTP status:', response.status);
  console.log('Response:', JSON.stringify(result, null, 2));

  if (response.ok && result.status) {
    console.log('🎉 Gasless swap request succeeded');
    
    // Check balance after swap
    const balanceAfter = await provider.getBalance(wallet.address);
    console.log('Balance before:', formatUnits(balanceBefore, 18), 'KAIA');
    console.log('Balance after:', formatUnits(balanceAfter, 18), 'KAIA');
    console.log('Balance difference:', formatUnits(balanceAfter - balanceBefore, 18), 'KAIA');
    
    return result;
  } else {
    console.error('❌ Gasless swap request failed');
    throw new Error(`Swap failed: ${result.data || result.message || 'Unknown error'}`);
  }
}

// Usage example
async function main() {
  try {
    const userWallet = new Wallet('your_private_key');
    
    const result = await executeGaslessSwap({
      rpcUrl: 'https://public-en-kairos.node.kaia.io',
      serverUrl: 'https://fee-delegation-kairos.kaia.io',
      userWallet: userWallet,
      contractAddress: '0xaaFe47636ACe87E2B8CAaFADb03E87090277Ff7B',
      amountIn: '0.002',
      slippageBps: 50,
    });
    
    console.log('Transaction hash:', result.data.hash);
  } catch (error) {
    console.error('💥 Swap failed:', error.message);
  }
}

main();
```

## APIリファレンス・エンドポイント

- URL：/api/gasFreeSwapKaia\`。
- メソッドPOST
- コンテントタイプ：application/json

### リクエスト・ボディ

```javascript
{
  "swap": {
    "user": "0x742d35Cc6635C0532925a3b8D400e6D2A4b8E0bb",
    "tokenIn": "0xcb00ba2cab67a3771f9ca1fa48fda8881b457750",
    "tokenOut": "0x043c471bEe060e00A56CcD02c0Ca286808a5A436",
    "amountIn": "1000000",
    "amountOutMin": "950000000000000000",
    "deadline": "1699123456"
  },
  "permitSignature": "0x…65-byte signature string…"
}
```

### パラメータ

**swap**（オブジェクト、必須）：

- user (文字列)：許可証に署名したトークン所有者のアドレス
- tokenIn (文字列)：入力トークンのアドレス (設定されたUSDTアドレスと一致する必要があります)
- tokenOut (文字列)：出力トークンのアドレス(設定されたWKAIAアドレスと一致しなければならない)
- amountIn (string)：文字列としての入力トークンの量 (ウェイ/最小単位)
- amountOutMin (文字列)：予想される最小出力トークン (スリッページ保護)
- deadline (文字列)：許可期限とスワップ期限の Unix タイムスタンプ (秒)。

**permitSignature**（文字列、必須）：

- 65バイトの有効な16進文字列でなければならない。
- シリアル化されたERC20許可署名を含む

### 応答フォーマット

#### サクセス・レスポンス (200)

```javascript
{
  "message": "Request was successful",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "contractAddress": null,
    "cumulativeGasUsed": "215000",
    "from": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
    "gasPrice": "25000000000",
    "gasUsed": "215000",
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "status": 1,
    "to": "0x45bD04d5f14DD9AB908109cFEa816F758FaE6709",
    "type": 49,
    "feePayer": "0x1234567890abcdef1234567890abcdef12345678",
    "feePayerSignatures": ["0x..."],
    "logs": [
      {
        "address": "0x...",
        "topics": ["0x..."],
        "data": "0x..."
      }
    ]
  },
  "status": true,
  "requestId": "req_abc123def456"
}
```

#### エラー応答

**400 Bad Request - Validation Errors:**」。

```javascript
{
  "message": "Bad request",
  "data": "Permit deadline has expired",
  "error": "BAD_REQUEST",
  "status": false,
  "requestId": "req_error_123"
}
```

**400 Bad Request - Transaction Revert:**.

```javascript
{
  "message": "Bad request",
  "data": "execution reverted: Permit already used",
  "error": "BAD_REQUEST",
  "status": false,
  "requestId": "req_revert_456"
}
```

\*\*500内部サーバーエラー

```javascript
{
  "message": "Internal server error",
  "data": "Sending transaction was failed after 5 try, network is busy. Error message: Network timeout",
  "error": "INTERNAL_ERROR",
  "status": false,
  "requestId": "req_error_789"
}
```

## エラー処理

### よくあるエラーのシナリオ

| エラー            | HTTPステータス | 説明                                 | ソリューション                                            |
| -------------- | --------- | ---------------------------------- | -------------------------------------------------- |
| 必須フィールドの欠落     | 400       | _swap_または_permitSignature_が見つからない。 | 必要なパラメータをすべて含める                                    |
| KAIAの残高        | 400       | KAIAの残高がゼロであること                    | KAIAの残高がゼロの方のみご利用いただけます。                           |
| 無効な署名形式        | 400       | 許可署名が有効な16進文字列ではない                 | 有効な65バイトの16進数署名を提供する                               |
| 無効なアドレス        | 400       | 不正なイーサリアムアドレス                      | アドレスが有効かどうかを検証する                                   |
| サポートされていないトークン | 400       | トークンが許可リストにない                      | 設定されたトークンアドレスのみを使用する                               |
| 期限切れ           | 400       | 過去の許可期限                            | 未来のタイムスタンプを使う                                      |
| 金額が大きすぎる       | 400       | 契約の上限を超える                          | 契約書の\*maxUsdtAmount()\*をチェックする。 |
| 見積もり不足         | 400       | スリッページが厳しすぎる                       | スリップの許容範囲を広げるか、量を減らす                               |
| ガソリン価格が高すぎる    | 400       | ネットワークの混雑                          | ガソリン価格が下がるのを待つ                                     |
| ネットワーク・タイムアウト  | 500       | RPCプロバイダーの問題                       | 遅延後の再試行要求                                          |

## セキュリティへの配慮

### ガス料金保護

APIは過剰なコストを防ぐため、ガス価格が50gweiを超えると取引を拒否する。 ガス料金を監視し、混雑時には利用者に知らせる。

### 署名セキュリティ

- 許可証の署名を再利用しない
- 常に妥当な期限を守る（5～30分）
- 署名前にすべてのパラメータを検証する
- すべてのAPI通信にHTTPSを使用する

## スマート・コントラクトの詳細

### ガスレスERC20PermitSwap契約アドレス

<Tabs>
  <TabItem value="kaia-mainnet" label="Kaia Mainnet">
   ```
   0x45bD04d5f14DD9AB908109cFEa816F758FaE6709
   ```
  </TabItem>

 <TabItem value="kairos-testnet" label="Kairos Testnet">
    ```
    0xaaFe47636ACe87E2B8CAaFADb03E87090277Ff7B
    ```
 </TabItem>
</Tabs>

### 主な機能

**executeSwapWithPermit** - 許可署名を使用して、ガスなしスワップを実行する：

- パーミットとスワップ・パラメーターの検証
- 許可証を使用したトークンの移動
- DEXスワップ実行
- WKAIAをネイティブKAIAに変換
- ネイティブのKAIAをユーザーに送信

**getExpectedOutput** - 期待出力量を取得するビュー関数：

```javascript
function getExpectedOutput(
  address tokenIn,
  address tokenOut,
  uint256 amountIn
) external view returns (uint256)
```

### 契約限度額

- 1スワップあたりの最大USDT1,000,000（1USDTで小数点以下6桁まで）
- 対応ペアUSDT → WKAIA → ネイティブKAIA
- シグネチャ追跡によるリプレイ防止

## その他のリソース

- [ERC20 Permit Standard (EIP-2612)](https://eips.ethereum.org/EIPS/eip-2612)
- [カイア・イーサス・エクステンション](https://github.com/kaiachain/ethers-ext)


