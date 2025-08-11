# 3. サポートされるトークン

開発者はガスレス取引を試みる前に、現在サポートされているトークンのリストを照会すべきである。

## 3.1. トークンの資格基準

- \*\*トークンは ERC-20 に完全に準拠していなければならない。
- \*\*フィー・オン・トランスファー（FoT）トークンは、スワップ金額の不一致を引き起こし、トランザクショ ンの失敗につながる可能性があるため、サポートされていません。
- **ガバナンス・ホワイトリスト:** `GaslessSwapRouter` はサポートされるトークンのリストを保持しており、Kaia Foundation によって管理されている。

## 3.2 現在サポートされているトークン

ガスレス取引は現在、以下のトークンをサポートしている。 今後、CLトークンやステーブルコインが追加される可能性もある。

- **USDT**。
- **BORA**

## 3.3 サポートされているトークン・リストの確認方法

KIP-247 GaslessSwapRouterの契約アドレス](https://docs.kaia.io/references/contract-addresses/)は、Kaia Docsにあります。

**GaslessSwapRouter契約アドレス:**。

- \*\*メインネット`0xCf658F786bf4AC62D66d70Dd26B5c1395dA22c63`
- \*\*カイロス・テストネット`0x4b41783732810b731569E4d944F59372F411BEa2`

最新の住所については、常に公式文書を参照すること。

### ブロックエクスプローラー（カイアスキャン）の使用

KaiaScanのようなブロックエクスプローラーを使ってサポートされているトークンを確認する：

![](/img/build/tutorials/ga3.png)

1. KaiaScan](https://kaiascan.io/)（テストネットの場合は[kairos.kaiascan.io](https://kairos.kaiascan.io/)）にアクセスしてください。
2. GaslessSwapRouter\`のアドレスを検索する。
3. Contract\*\*タブに移動し、**Read Contract**を選択します。
4. getSupportedTokens()\`関数を見つけ、**Query**をクリックする。 これはサポートされているERC20トークンアドレスの配列を返します。

### プログラム・クエリー

サポートされているトークンをプログラムで確認するには、GaslessSwapRouter のコントラクトメソッドを使用します。

\*\*GSRメソッドを使用する。

```solidity
function getSupportedTokens() external view returns (address[] memory);
function dexAddress(address token) external view returns (address dex); // reverts if token unsupported
```

**SDKを使用する（例）**\*。

```javascript
// Ethers-ext.js
const ethers = require("ethers6");
const { gasless } = require('@kaiachain/ethers-ext');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const router    = await gasless.getGaslessSwapRouter(provider);
const supported = await router.getSupportedTokens();

// Web3-ext.js
const { Web3 } = require("@kaiachain/web3js-ext");

const provider = new Web3.providers.HttpProvider(RPC_URL);
const web3 = new Web3(provider);

const router    = await gasless.getGaslessSwapRouter(web3);
const supported = await router.methods.getSupportedTokens().call();
```