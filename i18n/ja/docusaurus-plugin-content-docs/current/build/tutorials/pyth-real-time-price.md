# Pythを使ってカイアのリアルタイム価格を取得する方法

## はじめに

Pythは分散型オラクルネットワークであり、プッシュ型オラクルが主流のエコシステムにおいて、独自のアプローチをとっている。 Pythは、一定間隔でデータを契約にプッシュする代わりに、オンデマンドで実世界のデータを引き出すことができます。 このモデルにより、開発者はよりコントロールしやすくなり、不必要なオンチェーン更新を避けることができる。 この統合により、開発者はリアルタイムのデータを取得し、更新が要求された場合にのみ料金が発生する従量課金モデルを使用することができる。

このガイドでは、Pythのリアルタイム価格フィードを使って、不換紙幣であるIDRの価値を読み取る方法を学びます。 Solidityスマートコントラクトは[pyth-sdk-solidity](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity)を使用してPythからUSD/IDR価格を取得し、[hermes-client](https://github.com/pyth-network/pyth-crosschain/tree/main/apps/hermes/client/js)を使用して最新の価格を更新して取得します。

手始めに、このチュートリアルの完全なコードを[GitHub](https://github.com/ayo-klaytn/pyth-kaia-hardhat-example)でご覧ください。 これは、すぐに使えるリファレンスを提供し、プロジェクトとインストールをより迅速にセットアップするのに役立ちます。

## 前提条件

作業を始める前に、以下のものが揃っていることを確認してください：

- [Node.js と npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

  依存関係のインストールと開発ツールの実行に必要。

- KAIA testnetトークンで資金調達されたウォレット。

  カイロス・テストネットの展開費用と取引ガス料金をKAIAに支払う必要があります。 KAIA蛇口](https://faucet.kaia.io/)から無料テストネットKAIAをリクエストすることができます。

## 開発環境の構築

このセクションでは、開発環境のセットアップ、オラクル・コントラクトのコンパイル、およびHardhatを使用したデプロイの準備を行います。

**1. ハードハット・プロジェクト**を作成する

プロジェクト用に新しいディレクトリを作成し、Hardhatを初期化する：

```bash
mkdir pyth-kaia-hardhat-example && cd pyth-kaia-hardhat-example
npm init -y
npx hardhat@next --init
```

プロンプトが表示されたら、デフォルトの応答を受け入れる。 このガイドでは、モカとイーサーのテンプレートを使用する。

Hardhatのバージョンを確認して、インストールを確認してください：

```bash
npx hardhat --version
```

**2. 暗号化された秘密を設定**する

これで、Hardhatの暗号化されたキーストアを使用して、RPC URLと秘密鍵が保存されます。

以下のコマンドを実行する：

```bash
npx hardhat keystore set KAIROS_RPC_URL
npx hardhat keystore set PRIVATE_KEY
```

暗号化された状態を保つため、各変数には必ずパスワードと値を入力してください。

**3. コンフィギュレーション・ファイル**における参照秘密

hardhat.config.ts\`を開き、暗号化された秘密を参照するようにnetworksセクションを更新する。 異なるシークレット名を使用した場合は、それに応じてキーを更新する。

```typescript
import { configVariable } from "hardhat/config";
module.exports = {
  networks: {
    kairos: {
      url: configVariable("KAIROS_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
};
```

## 契約の作成とPythオラクルからの価格の取得

このセクションでは、[Pyth Solidity SDK](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity)をインストールし、PriceConsumerコントラクトを作成し、Hardhatを使用してデプロイします。 このコントラクトはPythの価格フィードを読み込み、後でエルメスから取得した価格データを使って更新する。

### Pyth SDKをインストールする

PythはSolidity SDKを提供し、オンチェーンのPyth価格フィードコントラクトとやり取りすることができます。 SDKはIPythインターフェースと関連する構造体を公開しています。

SDKをnpmでインストールする：

```bash
npm install --save-dev @pythnetwork/pyth-sdk-solidity
```

### PriceConsumerコントラクトの作成

contracts/PriceConsumer.sol\`に新しいファイルを作成し、以下のコードを追加する：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
contract PriceConsumer {
    IPyth public pyth;
    constructor(address pythContract) {
        pyth = IPyth(pythContract);
    }
    function updatePrice(bytes[] calldata priceUpdateData)
        external
        payable
    {
        // Pay the Pyth fee for receiving price updates
        uint fee = pyth.getUpdateFee(priceUpdateData);
        require(msg.value >= fee, "Not enough fee sent");
        // Update the Pyth price state
        pyth.updatePriceFeeds{value: fee}(priceUpdateData);
        // Can fetch the price and use it as well
        //PythStructs.Price memory currentBasePrice = pyth.getPriceNoOlderThan(priceFeedId, 60);
    }
    function getLatestPrice(bytes32 priceFeedId) public view returns (int64, int32) {
        // Read the current price from a price feed if it is less than 60 seconds old.
        // Each price feed (e.g., USD/IDR) is identified by a price feed ID.
        // The complete list of feed IDs is available at https://docs.pyth.network/price-feeds/price-feeds
        PythStructs.Price memory currentBasePrice = pyth.getPriceNoOlderThan(priceFeedId, 60);
        
        // uint256 basePrice = PythUtils.convertToUint(
        //   currentBasePrice.price,
        //   currentBasePrice.expo,
        //   18
        // );
        
        return (currentBasePrice.price, currentBasePrice.expo);
    }
}
```

\*\*ウォークスルー

PriceConsumer契約：

- Pyth のインターフェースと構造体を `@pythnetwork/pyth-sdk-solidity` からインポートします。
- 店舗：
  - Pythコントラクトのインスタンス(pyth)。
  - USD / IDR の価格フィード ID (usdIdrPriceId)。
- updateAndGetUsdIdrPrice\` を公開する：
  - IPyth.getUpdateFeeを使用して更新料を計算する。
  - IPyth.updatePriceFeedsに必要な料金を入力する。
  - IPyth.getPriceNoOlderThanを呼び出し、新しいUSD/IDR価格を読み込む。
  - 生の価格、指数、発行時間を返します。

後で、あなたのオフチェーンHermesクライアントはpriceUpdateバイト配列を構築し、あなたが新鮮な価格を必要とするときにこの関数にそれを渡します。

### 契約書をまとめる

以下のコマンドを実行して、コントラクトをコンパイルする：

```
npx hardhat compile
```

## 契約の展開

PriceConsumerコントラクトをデプロイするには、Ignitionモジュールを作成し、デプロイコマンドを実行します。

\*\*イグニッションモジュールを作成する。

ignition/modules/PriceConsumer.ts\`に新しいファイルを作成する：

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const pythContractAddress = "0x2880ab155794e7179c9ee2e38200202908c17b43"; 
export default buildModule("PriceConsumerModule", (m) => {
  const priceConsumer = m.contract("PriceConsumer", [pythContractAddress]);
  return { priceConsumer };
});
```

\*\*契約の展開

Ignitionモジュールを使用して、PriceConsumerコントラクトをKairos testnetにデプロイします：

```bash
npx hardhat ignition deploy --network kairos ignition/modules/PriceConsumer.ts
```

プロンプトが表示されたら、暗号化された秘密のために先ほど設定したキーストアのパスワードを入力します。

これが完了すると、あなたの`PriceConsumer.sol`コントラクトはKairosテストネットにデプロイされ、PythからリアルタイムのUSD / IDR価格を消費する準備が整います。

## TypeScriptからの対話

この最後のステップでは、TypeScriptを使用して、デプロイしたPriceConsumerコントラクトと対話します。 このスクリプトは、Hermesクライアントを介してPyth価格更新データを要求し、それをオンチェインで送信することによって、最新のUSD/IDR価格を取得します。

\*\*依存関係のインストール

必要なパッケージをインストールする：

```bash
npm install --save-dev tsx @pythnetwork/hermes-client @dotenv
```

**.env**の設定

プロジェクトのルート・ディレクトリに.envファイルを作成し、秘密鍵を追加する：

```bash
PRIVATE_KEY="0xDEAD....." // REPLACE WITH YOUR PRIVATE KEY
```

\*\*インタラクション・スクリプトを作成する。

scripts/interact.ts\*\*に新しいファイルを作成し、以下を追加する：

```typescript
import { HermesClient } from "@pythnetwork/hermes-client";
import { ethers } from "ethers";
import 'dotenv/config'

// 1. Setup
const hermes = new HermesClient("https://hermes.pyth.network");
const provider = new ethers.JsonRpcProvider(
  "https://public-en-kairos.node.kaia.io"
);

const PK = process.env.PRIVATE_KEY; 
const wallet = new ethers.Wallet(PK, provider);


// 2. Your deployed contract
const priceConsumerAddress = "0x91e89aa32224dEd5dA483a83a4de45bF4bE57caA"; // REPLACE WITH DEPLOYED PRICE CONSUMER CONTRACT

const priceConsumerAbi = [
  "function updatePrice(bytes[] priceUpdateData) external payable",
  "function getLatestPrice(bytes32 priceId) public view returns(int64, int32)",
];

const priceConsumer = new ethers.Contract(
  priceConsumerAddress,
  priceConsumerAbi,
  wallet
);

// 3. Price feed IDs
const priceId =
  "0x6693afcd49878bbd622e46bd805e7177932cf6ab0b1c91b135d71151b9207433"; // FX.USD/IDR Beta Price Feed ID

async function run() {
  // Fetch Hermes price update binary
  const update = await hermes.getLatestPriceUpdates([priceId], {
    encoding: "hex",
  });
  console.log(update);

  const priceUpdateData = ["0x" + update.binary.data]; // must be array of bytes

  console.log(priceUpdateData);

  // Estimate fee required by Pyth contract
  // EVM Network Price Feed Contract Addresses: https://docs.pyth.network/price-feeds/core/contract-addresses/evm

  const pythContractAddress = "0x2880ab155794e7179c9ee2e38200202908c17b43";
  const pythAbi = [
    "function getUpdateFee(bytes[] calldata data) external view returns(uint)",
  ];
  console.log("Pyth contract address:", pythContractAddress);
  const pyth = new ethers.Contract(pythContractAddress, pythAbi, wallet);
  const fee = await pyth.getUpdateFee(priceUpdateData);
  console.log("Pyth fee:", fee.toString());

  // Call your contract
  const tx = await priceConsumer.updatePrice(priceUpdateData, {
    value: fee, // pay the pyth update fee
    gasLimit: 500000,
  });
  console.log("Tx sent:", tx.hash);
  const receipt = await tx.wait();
  console.log("Tx confirmed");
  console.log(receipt);

  // 4. Get latest price from contract
  try {
    console.log("=== Latest Price from Contract ===");
    const [price, expo] = await priceConsumer.getLatestPrice(priceId);
    console.log("Price Value : " + price.toString());
    console.log("Exponent Value : " + expo.toString());
  } catch (error) {
    console.log(error);
    // @ts-ignore
    console.error("\nError calling getLatestPrice:", error.message);
    console.log(
      "This usually means the price is older than 60 seconds or hasn't been updated yet."
    );
    console.log("Make sure updatePrice() was called successfully first.");
  }
}
run();

```

\*\*スクリプトの実行

でスクリプトを実行する：

```bash
npx tsx scripts/interact.ts
```

\*\*出力例

```bash
Tx sent: 0x79c5dcb7abd9605b070bf9062ba2e2382272d23d58f7b50446c3107b7784fc8e
Tx confirmed
=== Latest Price from Contract ===
Price Value : 1669784988
Exponent Value : -5
======== —— =========
```

Kairos explorerの検索バーに取引ハッシュをペーストすることで、取引を確認することができます。 これにより、更新と読み取り操作が成功したことが確認される。

## 結論

このチュートリアルでは、Pythからリアルタイムの価格を読み取るSolidityコントラクトを作成し、Kairosテストネットにデプロイし、Hermesクライアントを使用して対話しました。 また、Pythのプルベースの設計が、価格更新のタイミングや方法をどのようにコントロールできるかを学びました。

詳しくは、こちらをご覧いただきたい：

- [EVM契約リファレンス](https://api-reference.pyth.network/price-feeds/evm/getPriceNoOlderThan) for Pyth API
- [Pyth Oracle AMMの例](https://github.com/pyth-network/pyth-examples/tree/main/price_feeds/evm)完全なエンド・ツー・エンドの実装について



