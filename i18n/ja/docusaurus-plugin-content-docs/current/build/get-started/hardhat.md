# Hardhatを使って最初のスマート・コントラクトをデプロイする

![](/img/banners/kaia-hardhat.png)

## はじめに

このセクションでは、[Hardhat](https://hardhat.org/)を使用してKaia KairosネットワークにSoulbound Tokenを配備する方法を説明します。

Hardhatは、スマート・コントラクト開発環境です：

- スマートコントラクトの開発とコンパイル
- スマートコントラクトとdAppsのデバッグ、テスト、デプロイ。

ソウル・バウンド・トークン（SBT）は譲渡不可能なNFTである。 つまり、一度取得した情報を他のユーザーに販売したり譲渡したりすることはできません。 SBTの詳細、仕組み、使用例については、Vitalik Buterinが発表したこちらの[参考記事](https://vitalik.eth.limo/general/2022/01/26/soulbound.html)をご覧いただきたい。

このガイドの終わりには、あなたは次のことができるようになる：

- KaiaでHardhatプロジェクトを立ち上げる。
- シンプルなソウル・バウンド・トークンを作る。
- Hardhatを使ってスマート・コントラクトをコンパイルする。
- Hardhatを使用して、スマート・コントラクトをテスト、デプロイ、対話します。
- ハードハットのフォーク機能を探る

## 前提条件

このチュートリアルに従うには、次のことが前提条件となる：

- Code editor: a source-code editor such [VS-Code](https://code.visualstudio.com/download).
- [メタマスク](../tutorials/connecting-metamask.mdx#install-metamask)：コントラクトのデプロイ、トランザクションへの署名、コントラクトとの対話に使用される。
- RPCエンドポイント：サポートされている[エンドポイント・プロバイダ](../../references/public-en.md)の1つから取得できます。
- [Faucet](https://faucet.kaia.io)からKAIAをテスト: 口座に十分なKAIAを入金してください。
- [NodeJSとNPM](https://nodejs.org/en/)

## 開発環境のセットアップ

ハードハットを利用するには、開発環境を整え、ハードハットをインストールする必要がある。 次のステップでやってみよう：

\*\*ステップ1プロジェクトディレクトリの作成

```bash
mkdir soulbound-tokens
cd soulbound-tokens
```

**ステップ 2**：npmプロジェクトを初期化する

以下のコマンドをターミナルに貼り付け、package.jsonファイルを作成する。

```bash
npm init -y
```

**ステップ 3**：ハードハットとその他の依存関係をインストールします：

- 以下のコードをターミナルに貼り付け、hardhatをインストールする。

```bash
npm install --save-dev hardhat
```

- 以下のコードを貼り付けて、他の依存関係をインストールする。

```bash
npm install dotenv @kaiachain/contracts
```

> 注: `hardhat`、`klaytn/contract`、`dotenv` など、このプロジェクトに必要な他の依存関係をインストールする。

**ステップ 4**：ハードハットプロジェクトを初期化する：

ハードハット・プロジェクトを開始するには、以下のコマンドを実行する。

```bash
npx hardhat
```

このガイドでは、以下のようにタイプスクリプト・プロジェクトを選択する：

![](/img/build/get-started/hardhat-init.png)

![](/img/build/get-started/hardhat-init-ii.png)

> 注意: プロジェクトを初期化する際に、`hardhat-toolbox`プラグインをインストールするようプロンプトが表示される。 このプラグインは、Hardhatでの開発を開始するために推奨される、一般的に使用されるパッケージとHardhatプラグインをすべてバンドルしています。

ハードハット・プロジェクトを初期化した後、カレント・ディレクトリーには以下のものが含まれているはずだ：

**contracts/**-このフォルダにはスマート・コントラクトのコードが含まれている。

**scripts/** – this folder contains code that deploys your contracts on the blockchain network.

**test/** - このフォルダには、スマート・コントラクトをテストするすべてのユニットテストが含まれています。

**hardhat.config.js** - このファイルには、Hardhatの動作とソウル・バウンド・トークンの配備に重要な設定が含まれています。

**ステップ5**：.envファイルを作成する

プロジェクト・フォルダーに.envファイルを作成する。 このファイルは、.envファイルからprocess.envに環境変数をロードするのに役立つ。

- 以下のコマンドをターミナルに貼り付け、.envファイルを作成する。

```bash
touch .env
```

- ファイルを作成したら、.envファイルを次のように設定しよう：

```js
 KAIROS_TESTNET_URL= "あなたのカイロスRPCリンク"
 PRIVATE_KEY= "MetaMaskウォレットからコピーしたあなたの秘密鍵"
```

> 注：コードリポジトリに含めるべきでない変数を設定するために、hardhatが提供する[設定変数](https://hardhat.org/hardhat-runner/docs/guides/configuration-variables)機能を使うこともできます。

**ステップ 6**：ハードハット設定のセットアップ

以下の設定で `hardhat.config.js` を修正する：

```js
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()


module.exports = {
  solidity: "0.8.17",
  networks: {
    kairos: {
      url: process.env.KAIROS_TESTNET_URL || "",
      gasPrice: 250000000000,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  }
};

```

さて、開発環境はすべて整ったので、ソウル・バウンド・トークン・スマート・コントラクトの作成に取りかかろう。

## SBTスマートコントラクトの作成

このセクションでは、[Kaia Contracts](https://github.com/kaiachain/kaia-contracts)を使用します。これは、コミュニティによって検証されたコードの強固な基盤の上に構築された、安全なスマート・コントラクト開発のためのライブラリです。 これはオープン・ツェッペリン契約のフォークである。

> 注：このライブラリは`開発環境の設定`セクションの**ステップ3**でインストール済みです。

**ステップ 1**: エクスプローラーペインで契約フォルダを選択し、「新規作成」ボタンをクリックして、`SBT.sol`という名前の新しいファイルを作成します。

\*\*ステップ2ファイルを開き、以下のコードを貼り付けます：

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@kaiachain/contracts/KIP/token/KIP17/KIP17.sol";
import "@kaiachain/contracts/utils/Counters.sol";
import "@kaiachain/contracts/access/Ownable.sol";

contract SoulBoundToken is KIP17, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() KIP17("SoulBoundToken", "SBT") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }


    function _beforeTokenTransfer(address from, address to, uint256) pure override internal {
        require(from == address(0) || to == address(0), "This a Soulbound token. It cannot be transferred.");
    }

    function _burn(uint256 tokenId) internal override(KIP17) {
        super._burn(tokenId);
    }
}
```

\*\*コード・チュートリアル

これがスマート・コントラクトだ。 **行目**は、HardhatがSolidityバージョン0.8.7以上を使用していることを示しています。 その他、KIP17.solやその他のサポート契約をインポートする。 6行目から12行目まで\*\*、KIP17を継承したスマートコントラクトが作成されている。 また、コンストラクタにはトークン名とシンボルが渡される。

上のコードでわかるように、トークン名とシンボルはそれぞれ**SoulBoundToken**と**SBT**に設定されている。 トークン名とシンボルは好きなものに変更できる。

この契約では、トークンの譲渡が禁止されており、発行されたトークンはソウルボンドとなる。

## SBTスマートコントラクトのテスト

このセクションでは、契約機能の一部をテストする。

**ステップ 1**：エクスプローラーペインでtestフォルダを選択し、New Fileボタンをクリックして`sbtTest.js`という名前の新規ファイルを作成します。

**ステップ 2**：以下のコードを `sbtTest.js` ファイルにコピーする。

```js
// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("Token contract", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call ethers.deployContract() and call the 
    // waitForDeployment() method, which happens onces its transaction has been
    // mined.

    const sbtContract = await ethers.deployContract("SoulBoundToken");

    await sbtContract.waitForDeployment();

    // Fixtures can return anything you consider useful for your tests
    return { sbtContract, owner, addr1, addr2 };
  }

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define each
    // of your tests. It receives the test name, and a callback function.
    //
    // If the callback function is async, Mocha will `await` it.
    it("Should mint SBT to owner", async function () {
      const { sbtContract, owner } = await loadFixture(deployTokenFixture);
      const safemint = await sbtContract.safeMint(owner.address);
      expect(await sbtContract.ownerOf(0)).to.equal(owner.address);
    });
  });

  describe("Transactions", function () {
    it("Should prohibit token transfer using transferFrom", async function () {
      const { sbtContract, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );

      const safemintTx = await sbtContract.safeMint(owner.address);

      // prohibit token transfer of token id (0) from owner to addr1
      await expect(
        sbtContract.transferFrom(owner.address, addr1.address, 0)
      ).to.be.reverted;
    });

    it("Should prohibit token transfer using safeTransferFrom", async function () {
      const { sbtContract, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );

      const safemintTx = await sbtContract.safeMint(owner.address);

      // prohibit token transfer of token id (0) from owner to addr1
      await expect(sbtContract['safeTransferFrom(address,address,uint256)'](
        owner.address,
        addr1.address,
        0 
      )).to.be.reverted;
    });
  });
})
```

あなたがコピーしたコードの7行目と12行目には、hardhat-network-helpersの[Chai](https://www.chaijs.com/api/bdd/)と[loadFixture](https://hardhat.org/tutorial/testing-contracts#reusing-common-test-setups-with-fixtures)からexpectをインポートしたことが示されています。

上記のテストは以下のことをチェックする：

- 特定のトークンのIDの所有者は、それが鋳造された人と同じですか？
- アカウント間でのトークンの移動は禁止されたのか？

**ステップ 3**：テストを実行するには、以下のコマンドを実行してください：

```bash
npxハードハットテスト test/sbtTest.js 
```

![](/img/build/get-started/sbtTest.png)

テストに関するより詳細なガイドについては、[ハードハットテスト](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)をご覧ください。

## スマートコントラクトの導入

スクリプトはJavaScript/Typescriptファイルで、コントラクトをブロックチェーン・ネットワークにデプロイするのに役立ちます。 このセクションでは、スマート・コントラクト用のスクリプトを作成する。

**ステップ 1**：エクスプローラーペインで "scripts "フォルダを選択し、"New File "ボタンをクリックして`sbtDeploy.js`という名前の新規ファイルを作成する。

\*\*ステップ2以下のコードをコピーし、ファイル内に貼り付けます。

> 注意: 変数 `deployerAddr` には MetaMask ウォレットのアドレスを入力してください。

```js
const { ethers } = require("hardhat");

async function main() {

  const deployerAddr = "Your Metamask wallet address";
  const deployer = await ethers.getSigner(deployerAddr);

  console.log(`Deploying contracts with the account: ${deployer.address}`);
  console.log(`Account balance: ${(await deployer.provider.getBalance(deployerAddr)).toString()}`);


  const sbtContract = await ethers.deployContract("SoulBoundToken");
  await sbtContract.waitForDeployment();

console.log(`Congratulations! You have just successfully deployed your soul bound tokens.`);
console.log(`SBT contract address is ${sbtContract.target}. You can verify on https://kairos.kaiascope.com/account/${sbtContract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**ステップ3**：ターミナルで、HardhatにSBTトークンをKaia Test Network (Kairos)にデプロイするように指示する以下のコマンドを実行します。

```bash
npx hardhat run scripts/sbtDeploy.js --network baobab
```

![](/img/build/get-started/sbtDeploy.png)

**ステップ4**：[Kaiascope](https://kairos.kaiascope.com/) を開き、SBTトークンが正常にデプロイされたかどうかを確認します。

\*\*ステップ5配備された契約書アドレスを検索フィールドにコピー＆ペーストし、Enterキーを押します。 最近配備された契約が表示されるはずだ。

![](/img/build/get-started/sbtKS.png)

## ハードハット・フォーク

Hardhatは、メインネット（任意のブロック）をローカル開発ネットワークにシミュレートする機能を開発者に提供します。 この機能の主な利点のひとつは、開発者がデプロイされたコントラクトとやりとりしたり、複雑なケースのテストを書いたりできるようになることだ。

この機能を有効に使うには、アーカイブ・ノードに接続する必要がある。 この機能の詳細については[こちら](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks#forking-other-networks)をご覧ください。

### フォーク・メインネット

Hardhatプロジェクトがセットアップできたので、Hardhatを使ってKaiaメインネットをフォークしてみよう。  ターミナルを開き、次のコマンドを実行する。

```bash
npx ハードハット・ノード --fork<YOUR ARCHIVE NODE URL>

npx ハードハット・ノード --fork https://archive-en.node.kaia.io
```

また、`hardhat.config.js` - Hardhat Networkが常にこれを行うように設定することもできます：

```
networks: {
  hardhat: {
    forking: {
      url: "<YOUR ARCHIVE NODE URL>",
    }
  }
}
```

**出力**

![](/img/build/get-started/hardhat-fork.png)

このコマンドをうまく実行すると、ターミナルは上の画像のようになる。  10,000テストトークンで事前に資金調達された20の開発アカウントを持つことになる。

フォークされたチェーンのRPCサーバーは `http://127.0.0.1:8545/` で待ち受けている。  最新のブロック番号を照会することで、フォークされたネットワークを確認することができる。 ブロック番号を取得するために、RPCにcURLを作成してみよう。  新しいターミナル・ウィンドウを開き、以下のコマンドを使う：

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

**出力**

![](/img/build/get-started/hardhat-fork-bn.png)

出力は上のように16進数である。 16進数からブロック番号を得るには、この[ツール](https://www.rapidtables.com/convert/number/hex-to-decimal.html)を使って16進数を10進数に変換する。 ネットワークをフォークした時点から最新のブロック番号を取得する必要がある。 ブロック番号は[kaiascope](https://kaiascope.com/)で確認できる。

### ブロックでのフォーク

ハードハットを使えば、特定のブロックでメインネットをフォークできる。  その場合、ブロック番号`105701850`でチェーンをフォークしよう。

```bash
npx hardhat node --fork<YOUR ARCHIVE NODE URL> --fork-block-number 105701850

npx hardhat node --fork https://archive-en.node.kaia.io --fork-block-number 105701850
```

指定されたブロックでフォークされたチェーンを確認するには、新しいターミナル・ウィンドウを開き、以下のコマンドを使用する：

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

![](/img/build/get-started/hardhat-fork-bnII.png)

出力は16進数を返し、この[ツール](https://www.rapidtables.com/convert/number/hex-to-decimal.html)を使って変換すると`105701850`に等しくなるはずである。

Hardhatの詳細については、[Hardhat Docs](https://hardhat.org/hardhat-runner/docs/getting-started)を参照してください。 また、このガイドのコードの完全な実装は、[GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/hardhat/soulbound-tokens) にあります。
