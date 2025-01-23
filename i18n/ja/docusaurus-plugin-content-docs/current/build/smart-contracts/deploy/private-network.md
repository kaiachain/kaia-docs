# プライベートネットワークを使用したスマートコントラクトの展開

<!-- ![](/img/banners/kaia-ken.png) -->

## はじめに<a id="introduction"></a>

このガイドでは、[Kaia Hardhat Utils](https://github.com/ayo-klaytn/hardhat-utils) を使用して、プライベート Kaia ネットワーク上に Greeter 契約をデプロイする手順を説明します。 このガイドに従うことで、その方法を学ぶことができる：

- ハードハット・プロジェクトを立ち上げる。
- Kairos Testnetをシミュレートしたプライベートネットワークを立ち上げる。
- Hardhatユーティリティを利用して、このプライベート・ネットワーク上にスマート・コントラクトをデプロイする。

## 前提条件<a id="prerequisites"></a>

このチュートリアルに従うには、次のことが前提条件となる：

- コードエディタ：[VS Code](https://code.visualstudio.com/download)などのソースコードエディタ。
- Docker: dockerがインストールされていない場合は、こちらの[リンク](https://docs.docker.com/desktop/)からインストールしてください。
- [Node.jsとnpm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)：Node バージョン 18 以上。

## 開発環境のセットアップ<a id="setting-up-dev-environment"></a>

このセクションでは、hardhat、Kaia hardhat utils、その他プロジェクトのブートストラップに必要な依存関係をインストールする。

**ステップ1：プロジェクト・ディレクトリを作成する**。

```js
mkdir $HOME/kaia-greeter
cd kaia-greeter 
```

**ステップ2: npmプロジェクトの初期化**.

```js
npm init -y
```

**ステップ3: hardhat、hardhat-utils、その他の依存関係をインストールする**。

- 以下のコードをターミナルにコピー＆ペーストして、hardhatとhardhat-utilsをインストールする。

```js
npm i hardhat @klaytn/hardhat-utils
```

- 他の依存関係をインストールするには、以下のコードをコピー＆ペーストしてください。

```js
npm install @nomiclabs/hardhat-ethers hardhat-deploy dotenv
```

:::note

hardhat-utils プラグインは [hardhat-ethers](https://www.npmjs.com/package/@nomiclabs/hardhat-ethers) と [hardhat-deploy](https://www.npmjs.com/package/hardhat-deploy) プラグインに依存しています。  `hardhat.config.js`または`hardhat.config.ts`で、これらをrequireまたはimportしてください。

:::

:::info

(推奨）ハードハットの速記をインストールする。 しかし、npxのハードハットでもタスクは可能だ。

```js
npm install hardhat-shorthand --save
```

:::

**ステップ4：ハードハット・プロジェクトを初期化する**。

以下のコマンドを実行して、ハードハット・プロジェクトを開始する：

```js
npxハードハット 
```

このガイドでは、以下のように「空のhardhat.config.jsを作成する」プロジェクトを選択する：

```js
888 888 888
888 888 888
88888888 8888b.  888d888 .d88888 88888b.   8888b.  888888
888 888 "88b 888P" d88" 888 888 "88b "88b 888
888 888 .d888888 888 888 .d888888 888
888 888 888 888 Y88b 888 888 Y88b.
888 888 "Y88888 888 888 "Y88888
👷 ようこそHardhat v2.22.9 👷‍
?何をしたいのですか？ … 
  JavaScriptプロジェクトを作成する
  TypeScriptプロジェクトを作成する
  TypeScriptプロジェクトを作成する(Viemを使用)
❯ 空のhardhat.config.jsを作成する
  終了する
```

**ステップ5：.envファイルを作成する**。

プロジェクトフォルダーに `.env` ファイルを作成する。 このファイルは、`.env`ファイルからprocess.envに環境変数をロードするのに役立つ。

以下のコマンドをターミナルにコピー＆ペーストして、`.env` ファイルを作成する。

```js
タッチ.env
```

.envファイルを次のように設定する：

```
private_key="ローカル・プライベート・ネットワークから提供された秘密鍵のコピー＆ペースト"
```

:::note

次のセクションでプライベート・ネットワークを起動すると、ローカル・ネットワークが提供する秘密鍵にアクセスできるようになる。

:::

**ステップ6: ハードハット設定の設定**」。

以下の設定で `hardhat.config.js` を修正する：

```js
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("@klaytn/hardhat-utils");
require('dotenv').config()

const accounts = [
  process.env.PRIVATE_KEY
];

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: process.env.RPC_URL || "http://localhost:8545",
      accounts: accounts,
    },
    kairos: {
      url: process.env.RPC_URL || "https://public-en-kairos.node.kaia.io",
      accounts: accounts,
    },
    kaia: {
      url: process.env.RPC_URL || "https://public-en.node.kaia.io",
      accounts: accounts,
    }
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
};
```

## プライベートネットワークの立ち上げ<a id="launching-private-network"></a>

プライベート・ネットワークを立ち上げるために、hardhat utilsプラグインは簡単に立ち上げるタスクを提供してくれる：

```js
hh klaytn-node
```

![](/img/build/smart-contracts/pn-run-node.png)

## コンソールの取り付け<a id="attaching-console"></a>

プライベート・ネットワークにはJavaScriptのコンソールが付属している。 コンソールのコマンドラインから、ネットワークへのKaia APIコールの一部を開始することができます。 JavaScriptコンソールに接続するには、以下のコマンドを実行する：

```js
hh klaytn-node --attach
```

```jsx title="Result Result "
Welcome to the Kaia JavaScript console!
 instance: Klaytn/v0.9.2/linux-amd64/go1.22.1
  datadir: /klaytn
  modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 kaia:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0
```

:::note

**kaia**または**personal**と入力すると、利用可能な機能のリストが表示されます。

:::

## 口座残高の確認<a id="checking-balance-in-account"></a>

プライベート・ネットワークを立ち上げると、アカウントのリスト、秘密鍵、各アカウントの事前入金額が提供された。

口座の残高を見るには、以下のコマンドを実行する。

```js
kaia.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
```

![](/img/build/smart-contracts/pn-check-balance.png)

## ハードハット・ネットワーク環境の設定<a id="configuring-hardhat-network-environment"></a>

外部クライアント（ウォレットやdApp）が接続できるスタンドアローン・ローカル・ネットワークが稼働しているので、このコマンドを実行して、ハードハットがこのネットワークを使用するように設定する必要がある：

```js
export HARDHAT_NETWORK=localhost
hh accounts
```

```js
hh --network localhost accounts
```

![](/img/build/smart-contracts/pn-lh-accounts.png)

## KaiaGreeterスマートコントラクトの作成<a id="creating-kaiagreeter-smart-contract"></a>

このセクションでは、KaiaGreeterスマート・コントラクトを作成する。

**ステップ1：** エクスプローラーペインに**contracts**フォルダという新しいフォルダを作成し、新規ファイルボタンをクリックし、`KaiaGreeter.sol`という名前の新規ファイルを作成します。

\*\*ステップ2：\*\*ファイルを開き、以下のコードを貼り付ける：

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract KaiaGreeter {
    uint256 totalGreetings;
    constructor() {
        console.log("Yo yo, Welcome to Kaia");
    }
    function greet() public {
        totalGreetings += 1;
        console.log(msg.sender, "says hello kaia!");
    }
    function getTotalGreetings() public view returns (uint256) {
        console.log("We have %d total waves!", totalGreetings);
        return totalGreetings;
    }
}
```

## KaiaGreeterを展開する<a id="deploying-kaiagreeter"></a>

このセクションでは、hardhat-deployプラグインを使ってコントラクトをデプロイする。

**ステップ1:** エクスプローラーペインで、**deploy** という新しいフォルダーを作成し、新規ファイルボタンをクリックして `deploy.js` という名前の新規ファイルを作成します。

\*\*ステップ2：\*\*以下のコードをコピーし、ファイル内に貼り付ける。

```js
module.exports = async ({getNamedAccounts, deployments}) => {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  await deploy('KaiaGreeter', {
    from: deployer,
    args: [],
    log: true,
  });
};
module.exports.tags = ['KaiaGreeter'];
```

\*\*ターミナルで、以下のコマンドを実行し、Hardhatにプライベートネットワーク上にKaiaGreeter契約を展開するように指示します。

```js
hh 配備 
```

![](/img/build/smart-contracts/pn-deployed-tx.png)

## ブロックエクスプローラを使用したトランザクションの検証<a id="verifying-transaction-using-block-explorer"></a>

\*\*ステップ1：ローカルのblockscoutエクスプローラーを使用してトランザクションを検証するには、新しいターミナルで以下のコマンドを実行します：

```js
hhエクスプローラ --ネットワーク localhost
```

```js
[+] env: {
  DOCKER_RPC_HTTP_URL：'http://host.docker.internal:8545/',
  DOCKER_LISTEN: '0.0.0.0:4000',
  DOCKER_DISABLE_TRACER: 'false',
  DOCKER_DEBUG: '0'
}.
[+] ブラウザで開く: http://localhost：4000
 Network blockscout_default 作成
 Network blockscout_default 作成
 Container blockscout-db-1 作成
 Container blockscout-frontend-1 作成
 Container blockscout-smart-contract-verifier-1 作成
 Container blockscout-redis_db-1 作成
 blockscout-smart-contract-verifier-1 作成
 コンテナ blockscout-db-1 作成
 コンテナ blockscout-frontend-1 作成
 コンテナ blockscout-redis_db-1 作成
 コンテナ blockscout-backend-1 作成
 コンテナ blockscout-backend-1 作成
 コンテナ blockscout-frontend-1 開始
 コンテナ blockscout-redis_db-1 開始
 コンテナ blockscout-smart-contract-verifier-1 開始
 コンテナ blockscout-db-1 開始
 コンテナ blockscout-db-1 の開始
 コンテナ blockscout-redis_db-1 の開始
 コンテナ blockscout-smart-contract-verifier-1 の開始
 コンテナ blockscout-backend-1 の開始
 コンテナ blockscout-frontend-1 の開始
 コンテナ blockscout-backend-1 の開始
```

**ステップ2：** このブロック・エクスプローラーにアクセスするには、ブラウザで [http://localhost:4000](http://localhost:4000) を開いてください。

ステップ 3: 配備された契約書アドレスを検索フィールドにコピー＆ペーストし、Enterキーを押します。 最近配備された契約が表示されるはずだ。

![](/img/build/smart-contracts/pn-verify-tx-block-explorer.png)

## 配備された契約とのやり取り<a id="interacting-with-deployed-contract"></a>

### ハードハットユーティル契約タスクの使用

1. デプロイされたコントラクトの読み取り専用関数を呼び出すには、以下のコマンドを実行する：

```js
hh call カイアグリーター getTotalGreetings
```

![](/img/build/smart-contracts/pn-read-function.png)

2. 関数を呼び出すトランザクションをデプロイされたコントラクトに送信するには、以下のコマンドを実行する：

```js
カイアグリーターに挨拶を送る
```

```jsx title="Result Result "
KaiaGreeter#greetを送信 (tx: 0xc0bd25ffb594c13d5ae1f77f7eb02f2978013c69f9f6e22694b76fa26c329e85)...OK (ブロック 2837、使用ガス数: 47457)
```

### カイアSDKを使用

**ステップ1:** [Kaia SDK](https://github.com/kaiachain/kaia-sdk)を使用してデプロイされたコントラクトと対話するには、以下のコマンドを実行してKaia SDKをインストールする必要があります：

```js
npm install --save @kaiachain/ethers-ext
```

**ステップ2:** エクスプローラーペインで、"utils "という新しいフォルダを作成し、"New File "ボタンをクリックして、utilsフォルダ内に`kaia-sdk.js`という新しいファイルを作成する。

ステップ3：以下のコードをコピーしてファイル内に貼り付ける。

```js
const { JsonRpcProvider, Wallet } = require("@kaiachain/ethers-ext");
const { ethers } = require("ethers");
require('dotenv').config()

const provider = new JsonRpcProvider("http://127.0.0.1:8545/")

const privKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privKey, provider);
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // PASTE DEPLOYED CONTRACT ADDRESS;

const KaiaGreeterABI = require("../artifacts/contracts/KaiaGreeter.sol/KaiaGreeter.json").abi;

async function getCode(ca) {
    const tx = await provider.getCode(ca);
    console.log(tx);
}

async function greet(ca) {
    const klaytnGreeter = new ethers.Contract(ca, KaiaGreeterABI, signer);
    const tx = await klaytnGreeter.greet();
    console.log( tx);
}

async function getTotalGreetings(ca) {
    const klaytnGreeter = new ethers.Contract(ca, KaiaGreeterABI, provider);
    const value = await klaytnGreeter.getTotalGreetings();
    console.log(value.toString());
}

// getCode(contractAddress);
getTotalGreetings(contractAddress);
// greet(contractAddress);
```

**ステップ4：** このファイルで宣言されている関数を実行するには、getTotalGreetings()関数で行ったように、必ずコメントを解除してから、ターミナルで以下のコマンドを実行してください。

```js
ノードユーティリティ/kaia-sdk.js 
```

![](/img/build/smart-contracts/pn-run-kaia-sdk.png)

hardhat-utilsのより詳細なガイドについては、[hardhat-utils github](https://github.com/ayo-klaytn/hardhat-utils)を参照してください。 また、このガイドのコードの完全な実装は、[GitHub](https://github.com/ayo-klaytn/kaia-hardhat-utils-example) にあります。
