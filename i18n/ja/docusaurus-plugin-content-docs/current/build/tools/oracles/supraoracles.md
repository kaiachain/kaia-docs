# SupraOracles

![](/img/banners/kaia-supra.png)

## はじめに

[SupraOracles](https://supraoracles.com/)は、新しい、高スループットのオラクル＆イントラレイヤー：パブリック（L1とL2）またはプライベート（企業）のすべてのブロックチェーンを相互リンクするクロスチェーンソリューション（データオラクル、アセットブリッジ、オートメーションネットワークなど）の垂直統合ツールキットです。 スマートコントラクトに、データ精度、スピード、スケーラビリティ、セキュリティに優れた次世代クロスチェーン・オラクル・ソリューションを提供する。スマートコントラクトに、データ精度、スピード、スケーラビリティ、セキュリティに優れた次世代クロスチェーン・オラクル・ソリューションを提供する。

このチュートリアルでは、SupraOracle 価格フィードソリューションを使用して ETH/USD 価格を要求する方法を学びました。 SupraOracleを使えば、スマートコントラクト内で乱数を生成することもできる。 このプロセスに興味がある方は、カイアにSupraVRFを統合するための[ガイド](https://metaverse-knowledge-kit.klaytn.foundation/docs/decentralized-oracle/oracle-providers/supraOracles-tutorial)をご覧ください。 SupraOraclesに関するより詳細なガイドについては、[SupraOracles Docs](https://supraoracles.com/docs/development-guides) を参照してください。このチュートリアルでは、Remix IDEを使ってKaiaブロックチェーンの価格フィードを簡単に取得するためにSupraOraclesを使用します。

## 前提条件

- [カイア・ウォレット](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi)
- [Remix IDE](https://remix.ethereum.org/)
- [KaiaプラグインをRemixで](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- [Faucet](https://faucet.kaia.io)からKAIAをテストする。

## はじめに

以下のステップでは、SupraOraclesを使用してスマートコントラクトにETH/USD価格フィードを要求します。 始めよう！始めよう！

### ステップ1：S値インタフェースの作成

これは、SupraOraclesから価格を取得するために使用されるインターフェイスを作成します。  S-Valueを取得したいsolidityスマートコントラクトに以下のコードを追加する。

```solidity
interface ISupraSValueFeed {
function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}
```

### ステップ2：S値フィードアドレスの設定

SupraOraclesスマートコントラクトからS-Valueを取得するには、まず選択したチェーンのS-Valueフィードアドレスを見つけます。適切なアドレスが得られたら、先に定義したインターフェイスを使用してS-Value Feedのインスタンスを作成する：

```solidity
contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;
    constructor() {
        sValueFeed = ISupraSValueFeed(0x7f003178060af3904b8b70fEa066AEE28e85043E);
    }
}
```

この例では、Kaia Kairos TestNetにS-Value Feedを実装しています。カイア・カイロスS-Valueのフィードアドレスは[こちら](https://supraoracles.com/docs/get-started/networks/)で確認できます。

### ステップ3: S-Value暗号価格を取得する

S-Valueの暗号化通貨ペアに簡単にアクセスできるようになりました。このステップでは、スマートコントラクトに以下のコードを適用することで、ETH/USDT（eth_usdt）の価格を取得します。

```solidity
function getEthUsdtPrice() external view returns (int) {
(
int price,
/* uint timestamp */
) = sValueFeed.checkPrice("eth_usdt");
return price;
}
```

## 実践

以下の例では、S-Value Price Feed Contract をデプロイし、getEthUsdtPrice() 関数を実行して ETH/USDT ペアの価格を取得します。

### サンプルコードの作成とデプロイ

**Remix IDE**

- Remix IDE](https://remix.ethereum.org/) に移動する。
- ファイルエクスプローラタブをクリックし、contractsフォルダに`demoSupraPriceFeed.sol`という新しいファイルを作成する。
- 新しく作成したファイルに以下のコードを貼り付けます。
- Remixで、**Compile contract**をクリックします。
- プラグインをインストールしたら、左側のKaiaタブをクリックします。
- **Environment** > **Injected Provider** - **Kaia Wallet** を選択します。
- **Contract**で、契約を選択します。例えば、ISupraSValueFeedExample。
- **Deploy**をクリックします。

**サンプルコード**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
interface ISupraSValueFeed {
    function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}
contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;
    constructor() {
        sValueFeed = ISupraSValueFeed(0x7f003178060af3904b8b70fEa066AEE28e85043E);
    }
    function getEthUsdtPrice() external view returns (int) {
        (
            int price,
            /* uint timestamp */
        ) = sValueFeed.checkPrice("eth_usdt");
        return price;
    }
}
```

### スマートコントラクトとの対話

選択した通貨ペアの価格フィードを取得するには、`getEthUsdtPrice()`関数を実行する必要があります。

![](/img/build/tools/sPriceFeed.png)

多田🎉！スマートコントラクトに通貨価格のフィード（ETH/USDT）を要求しました。

本執筆時点では、getEthUsdtPrice()は "185795966200 "という8ポイント精度の数値を返している。多田🎉！ スマートコントラクトに通貨価格のフィード（ETH/USDT）を要求しました。

## SupraOraclesの暗号通貨価格フィードを利用するその他の方法

### Web3.jsによるS-Valueフィード

```javascript
// example assumes that the web3 library has been imported and is accessible within your scope
const getEthUsdtPrice = async () => {
const abi = [{ "inputs": [ { "internalType": "string", "name": "marketPair", "type": "string" } ], "name": "checkPrice", "outputs": [ { "internalType": "int256", "name": "price", "type": "int256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
const address = '0x7f003178060af3904b8b70fEa066AEE28e85043E'
const web3 = new Web3('https://public-en-kairos.node.kaia.io')
const sValueFeed = new web3.eth.Contract(abi, address)
const price = (await sValueFeed.methods.checkPrice('eth_usdt').call()).price
console.log(`The price is: ${price}`)
}
getEthUsdtPrice()
```

### ethers.jsによるS-Valueフィード

```javascript
// example assumes that the ethers library has been imported and is accessible within your scope
const getEthUsdtPrice = async () => {
////for ethers version 6.0
const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io")
////for ethers version <= 5.7.2
//const provider = new ethers.providers.JsonRpcProvider('https://public-en-kairos.node.kaia.io')
const abi = [{ "inputs": [ { "internalType": "string", "name": "marketPair", "type": "string" } ], "name": "checkPrice", "outputs": [ { "internalType": "int256", "name": "price", "type": "int256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
const address = '0x7f003178060af3904b8b70fEa066AEE28e85043E'
const sValueFeed = new ethers.Contract(address, abi, provider)
const price = (await sValueFeed.checkPrice('eth_usdt')).price
console.log(`The price is: ${price.toString()}`)
}
getEthUsdtPrice()
```

## 結論

このチュートリアルでは、SupraOracle 価格フィードソリューションを使用して ETH/USD 価格を要求する方法を学びました。 SupraOracleを使えば、スマートコントラクト内で乱数を生成することもできる。このプロセスに興味がある方は、カイアにSupraVRFを統合するための[ガイド](https://metaverse-knowledge-kit.klaytn.foundation/docs/decentralized-oracle/oracle-providers/supraOracles-tutorial)をご覧ください。 SupraOraclesに関するより詳細なガイドについては、[SupraOracles Docs](https://supraoracles.com/docs/development-guides) を参照してください。