# Buy-Me-A-Coffee DAppの構築

## 目次<a href="#table-of-contents" id="table-of-contents"></a>

- [1. プロジェクト・セットアップ](#1-project-setup)
- [2. コーヒーを買うスマートコントラクトの作成](#2-creating-a-buy-me-a-coffee-smart-contract)
- [3. スクリプトを使ったコントラクトの機能テスト](#3-testing-the-contracts-functionalities-using-scripts)
- [4. カイア・テストネットへのBMCスマート・コントラクトの導入 ](#4-deploying-bmc-smart-contract)
- [5. ReactとWeb3OnboardによるBMCフロントエンドの構築](#5-building-the-bmc-frontend-with-react-and-web3onboard)
- [6. Fleekを使ってフロントエンドのコードをIPFSにデプロイする](#6-deploying-frontend-code-on-ipfs-using-fleek)
- [7. 結論](#7-conclusion)

## はじめに<a href="#1-introduction" id="1-introduction"></a>

Buy Me a Coffee（BMC）は、クリエイターがファンや視聴者から金銭的な支援や寄付を得るプラットフォームである。 このプラットフォームの助けを借りて、ファンはクリエイターのサクセスストーリーに重要な役割を果たすことができ、観客はクリエイターが成し遂げた仕事に対して感謝の意を表すことができ、クリエイターは自分の作品を収益化することができる。 このプラットフォームの助けを借りて、ファンはクリエイターのサクセスストーリーに重要な役割を果たすことができ、観客はクリエイターが成し遂げた仕事に対して感謝の意を表すことができ、クリエイターは自分の作品を収益化することができる。

高いレベルでは、Buy-me-a-Coffeeは、クリエイターの支払いを受け入れるプロセスを簡素化し、クリエイターとオーディエンスの間の相互作用を強化する。 この他にも、BMCプラットフォームにはエキサイティングな機能がある。 明るい面としては、このプラットフォームをブロックチェーン上で想像してみてほしい。 クリエイターは、より多くの特典を利用できるようになった：

- 従来のBMCが、クリエイターが受けたサポートに対して5％を請求するのとは対照的に、完全な支払い。
- すべての取引がブロックチェーンに記録されるため、透明性が高い。
- ファンからの支援金を仲介なしに直接受け取ることができる。
- 分散化、つまり、プラットフォームをコントロールする中央当局が存在しない。

このチュートリアルでは Buy Me a Coffee (BMC)プラットフォームの分散型バージョン（フロントエンド＋スマートコントラクト）を構築します。 このプラットフォームは、従来のBMCプラットフォームの最小限の実装となり、支援者はあなたにチップを渡すことができ、あなたは契約の所有者としてBMCスマートコントラクトに届けられたチップを引き出すことができる。 Supporters will be able to send test KLAY and lovely messages together in a coffee transaction using this site.

このガイドが終わるまでに、このdAppを作成するために以下を使用することになる：

- Solidity：BMCスマートコントラクトを記述する
- NextJsとTailwind：BMC dAppのフロントエンドウェブサイト構築用
- Web3Onboard: Kaia Testnet Kairosへの複数のウォレット接続を可能にする。
- Fleek：Fleekを使えば、IPFS上でBMC dAppをホストできる。

## 前提条件<a href="#2-prerequisites" id="2-prerequisites"></a>

このチュートリアルを完了するには、以下のものが必要です：

- [Node.js](https://nodejs.org/en/download/package-manager)
- フックなど、JavascriptとReactの基本に精通していること
- Coinbase Wallet](https://www.coinbase.com/wallet/downloads)、【Metamask Wallet](https://metamask.io/download/)など、必要なウォレットのインストール。
- [Faucet](https://faucet.kaia.io)からKAIAをテストする。
- RPCエンドポイント：サポートされている[エンドポイント・プロバイダー](../../references/public-en.md)のいずれかから取得できます。
- [Fleek](https://app.fleek.co/)にアカウント作成。

## 1. プロジェクト設定<a id="1-project-setup"></a>

このセクションでは、プロジェクト・フォルダーを初期化します。 このセクションでは、プロジェクト・フォルダーを初期化します。 このフォルダには2つの別々のフォルダが含まれる：

1. frontendフォルダ - 私たちのdAppのフロントエンド実装のコードが含まれています。
2. smart-contractフォルダ - BMC dAppのスマートコントラクトコードが格納されています。

プロジェクトフォルダを作成するには、次のコードをターミナルに貼り付けます。

```bash
mkdir BuyMeACoffee
cd BuyMeACoffee
```

### 1.1. フロントエンドフォルダ

このフォルダには、プロジェクトのフロントエンドウェブサイトを構築するためのツールが含まれています。 [Coinbase Wallet](https://www.coinbase.com/wallet/downloads)、【Metamask Wallet](https://metamask.io/download/)など、必要なウォレットのインストール。 以下の手順に従って、必要な依存関係をインストールし、フロントエンドフォルダを作成します：

#### ステップ1 - フロントエンドフォルダの作成

以下のコードをBuyMeACoffeeフォルダに貼り付け、create-next-appユーティリティを使ってフロントエンドフォルダを作成します：

```bash
npx create-next-app frontend
cd frontend
```

#### ステップ2 - Tailwindの依存関係のダウンロードと設定

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### ステップ3 - `tailwind.config.js` を修正する

`tailwind.config.js`ファイルに移動し、以下のコードに置き換える：

```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### ステップ4 - styles/global.cssのコードを置き換える

styles/global.cssファイルに移動し、以下のコードに置き換える：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

フロントエンドのプロジェクトフォルダのセットアップが完了しました。 詳しくは後述する。 次のステップは、スマート・コントラクト・フォルダーを設定することだ。

### 1.2. スマートコントラクトフォルダ

このフォルダには、BuyMeACoffee機能のスマートコントラクトが含まれています。 このフォルダには、BuyMeACoffee機能のスマートコントラクトが含まれています。 以下の手順に従って、必要な依存関係をインストールし、スマート・コントラクト・フォルダーを作成する：

#### ステップ1 - スマート・コントラクト・フォルダーの作成

このフォルダを作成するには、プロジェクト・ディレクトリに移動します：BuyMeACoffeeに移動し、以下のコマンドを実行してsmart-contractフォルダを作成します：

```bash
cd ..
mkdir smart-contract
cd smart-contract
```

#### ステップ2 - ハードハット・プロジェクト・テンプレートの作成

このテンプレートは、スマート・コントラクトの記述、テスト、デプロイに適している。 まず、ターミナルで以下のコードを実行して、新しいnpmプロジェクトを開始する：

```bash
npm init -y
```

これで、次のようなpackage.jsonファイルが作成されるはずだ：

```json
{
  "name": "buymeacoffee",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

次に、hardhatと、hardhat-toolboxやdotenvなどの依存関係をインストールする。 次に、hardhatと、hardhat-toolboxやdotenvなどの依存関係をインストールする。 そのためには、package.jsonファイルを以下のコードで置き換えてください：

```json
{
  "name": "buymeacoffee",
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^2.0.2",
    "hardhat": "^2.14.0"
  },
  "dependencies": {
    "dotenv": "^16.0.3"
  }
}
```

最後に、ターミナルで `npm install` を実行する。

すべての依存関係（hardhat、hardhat-toolbox、dotenv）のインストールに成功したら、以下の方法でhardhatのインストールを確認できる：

a. 現在のバージョンをチェックする：

```bash
 npx hardhat --version 
```

コンソールには、インストールされている現在のバージョンが印刷されるはずです。私たちの場合は**2.14.0**です。

b. プロジェクトディレクトリの表示 プロジェクトディレクトリの表示 あなたのカレント・ディレクトリは、以下を含むべきである：

- **contracts/**-これはスマート・コントラクトを含むフォルダである。
- **スクリプト/** - このフォルダには、あなたのコントラクトをブロックチェーン・ネットワーク上にデプロイするコードが含まれています。
- **test/** - このフォルダには、スマートコントラクトをテストするすべてのユニットテストが含まれています。
- **hardhat.config.ts** - このファイルには、Hardhatの作業に重要な設定が含まれており、
  、スマート・コントラクトのデプロイが行われます。

## 2. コーヒーを買うスマートコントラクトの作成<a id="creating-a-buy-me-a-coffee-contract"></a>

このセクションでは、BMC機能を格納するスマート・コントラクトを作成する。 `BuyMeACoffee.sol`という名前の新しいファイルを作成し、以下のコードを貼り付けてください：

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
contract BuyMeACoffee {
    // event to emit when a message is sent with tip
    event NewCoffee(address indexed _sender, string name, string _message, uint256 _timestamp);

    // address of contract deployer
    address payable owner;
    constructor() {
        // stores deployer as owner
        owner = payable(msg.sender);
    }

    // struct of BuyMeACoffe Tx
    struct BuyCoffee {
        address sender;
        string name;
        uint timestamp;
        string message;
    }

    // maps id to BuyCoffee struct
    mapping (uint => BuyCoffee) idToBuyCoffee;

    // id 
    uint public coffeeId;

    // buy coffee function
    function buyCoffee(string memory name, string memory message) public payable {
	  // Must accept more than 0 KAIA for a coffee.
        require(msg.value > 0, "Tip must be greater than zero");
        coffeeId++;
	
	// Add the coffee tx to storage
        BuyCoffee storage coffee = idToBuyCoffee[coffeeId];
        coffee.message = message;
        coffee.name = name;
        coffee.sender = msg.sender;
        coffee.timestamp = block.timestamp;
         // Emit a NewCoffee event with details about the coffee tx.
        emit NewCoffee(msg.sender, name, message, block.timestamp);
    }

    // withdraw coffee tips to the contract owner
    function withdrawCoffeTips() public {
        require(owner == msg.sender, "Not owner");
        require(owner.send(address(this).balance) );
    }

     // get all coffee
    function getAllCoffee(uint _id) public view returns(BuyCoffee[] memory c){
        require(_id <= coffeeId, "Non-existent id");
        c = new BuyCoffee[](_id);
        for(uint i = 0; i < _id; i++) {
            c[i] = idToBuyCoffee[i + 1];
        }
    }
}
```

各コードが何をするのか、手短に説明しよう：

BuyCoffee関数が実行されると、**NewCoffee**イベントが発生します。 送信者のアドレス、送信者の名前、送信されたメッセージ、タイムスタンプがログアウトされる。 送信者のアドレス、送信者の名前、送信されたメッセージ、タイムスタンプがログアウトされる。

次に**owner**変数であるが、これはコントラクトのデプロイ先を表す。 次に**owner**変数であるが、これはコントラクトのデプロイ先を表す。 次に、コンストラクタで**msg.sender**をコントラクトのオーナーに設定する。

**coffeeId**は、作成されたコーヒーのトランザクションを追跡するために作成された。

buyMeACoffee構造体\*\*を宣言し、コーヒー取引に関連するすべてのデータ（送信者アドレス、文字列名、uintタイムスタンプ、文字列メッセージ）を格納する。 buyMeACoffee構造体\*\*を宣言し、コーヒー取引に関連するすべてのデータ（送信者アドレス、文字列名、uintタイムスタンプ、文字列メッセージ）を格納する。 次に、**idToBuyCoffee**変数を使用して、この構造体をidにマッピングしました。

buyCoffee機能は、BMCスマートコントラクトのコア実装である。 これは支払い可能な関数で、送信者の名前と住所の2つのパラメータを受け取る。 It checks if the KLAY amount sent in is greater than zero. 次に coffeeId をインクリメントし、コーヒーの Tx や情報をブロックチェーンに追加する。 最後に、NewCoffeeイベントを発行し、コーヒーtxの詳細を伝える。 最後に、NewCoffeeイベントを発行し、コーヒーtxの詳細を伝える。

契約残高の合計（`address(this).balance`）をオーナーに引き出すために、\*\*withdraw()\*\*関数を作りました。

最後に、\*\*getAllCoffee()\*\*関数が作られた。 これは、時間外に作成されたすべてのコーヒー・トランザクションを返す。

BMCスマートコントラクトの記述が完了したので、次のステップはスマートコントラクトの機能をテストし、**Kaia Testnet Kairos**にデプロイしてスマートコントラクトとやり取りすることです。

## 3. スクリプトを使った契約書の機能テスト<a id="testing-bmc-contract-using-scripts"></a>

このセクションでは、スマート・コントラクトの機能をテストするためのスクリプトを書く。 このセクションでは、スマート・コントラクトの機能をテストするためのスクリプトを書く。 まず、scriptsフォルダに移動し、`bmc-sample.js`という名前のファイルを新規作成し、以下のコードを貼り付けます：

```js
const hre = require("hardhat");
// Logs the KAIA balances of a specific address.
async function getBalance(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt)
}

// Logs the KAIA balances for a list of addresses.
async function getBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
      console.log(`address ${idx} balances`, await getBalance(address));
      idx++;
  }
}

// Logs all the coffee info stored on-chain from coffee tx.
async function getAllCoffee(memos) {
  for (const memo of memos) {
      const timestamp = memo.timestamp;
      const sender = memo.sender;
      const name = memo.name;
      const message = memo.message
      console.log(`At ${timestamp}, ${name}, with ${sender}, said: "${message}"`);
  }
}

async function main() {
  const [owner, tipper1, tipper2, tipper3 ] = await hre.ethers.getSigners();
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffe = await BuyMeACoffee.deploy();
  await buyMeACoffe.deployed();
  console.log(`BuyMeACoffee Contract Address`, buyMeACoffe.address);
  // (========Check Balance==========)
  const addressses = [owner.address, tipper1.address, buyMeACoffe.address];
  console.log("======GET BALANCE=======");
  await getBalances(addressses);
  // Buy Coffee for owner
  const tip = {value: hre.ethers.utils.parseEther("1")}
  await buyMeACoffe.connect(tipper1).buyCoffee("Alice", "Hi Jude", tip);
  await buyMeACoffe.connect(tipper2).buyCoffee("Bob", "Hi Alice", tip);
  await buyMeACoffe.connect(tipper3).buyCoffee("Japhet", "Hi Ox", tip);
  // check balance after tipping 
  console.log("======GET BALANCE AFTER TIPPING=======");
  await getBalances(addressses);
  // withdraw coffee tips
  await buyMeACoffe.connect(owner).withdrawCoffeTips();
  // check balance after withdrawing tip 
  console.log("======GET BALANCE AFTER WITHDRAWING TIP=======");
  await getBalances(addressses);
  // get the current coffee tx id.
  const coffeeId = await buyMeACoffe.coffeeId()
  const id = coffeeId.toString();
  console.log(coffeeId.toString());
  // get all existing coffee tx
  const allCoffee = await buyMeACoffe.getAllCoffee(id);
  
  await getAllCoffee(allCoffee);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

いつものように、各コード行が何をするのかを説明しよう：

コードの先頭には、単一アドレスと複数アドレスの残高を取得するためのヘルパー関数がいくつか用意されていることにお気づきだろう。 このコードには、スマート・コントラクトをテストする機能を持つメイン関数も含まれている。 このコードには、スマート・コントラクトをテストする機能を持つメイン関数も含まれている。

では、\*\*main()\*\*関数のコードを一通り見てみよう。

まず、`await hre.ethers.getSigners()`を呼び出して、テスト用のアカウントリスト(owner, tipper1, tipper2, tipper3)を設定します。

次にコントラクト・インスタンスを作成し、デプロイした。 この場合はBuyMeACoffee.solの契約である。

次に、宛先のリストを設定し、**getBalances()**関数を使って残高をチェックする。 次に、3つの異なるインスタンスで**buyCoffee**関数を呼び出した。 次に、コーヒー取引後に各住所の残高をチェックした。

つまり、次に**withdraw**関数を呼び出し、すべての資金をオーナーのアドレスに引き出した。 次に、出金後のアドレスの残高を確認した。 次に、出金後のアドレスの残高を確認した。

最後に、\*\*getAllCoffee()\*\*関数が作られた。 これは、時間外に作成されたすべてのコーヒー・トランザクションを返す。 スクリプトの動作を見るには、以下のコマンドを実行する：

```bash
npx hardhat run scripts/bmc-coffee.js
```

ターミナルに次のような出力が出るはずだ：

```bash
Ayomitans-MacBook-Pro:smart-contract oxpampam$ npx hardhat run scripts/bmc-sample.js
BuyMeACoffee Contract Address 0x5FbDB2315678afecb367f032d93F642f64180aa3
======GET BALANCE=======
address 0 balances 9999.998295071875
address 1 balances 10000.0
address 2 balances 0.0
======GET BALANCE AFTER TIPPING=======
address 0 balances 9999.998295071875
address 1 balances 9998.999752128832448226
address 2 balances 3.0
======GET BALANCE AFTER WITHDRAWING TIP=======
address 0 balances 10002.998249102355276178
address 1 balances 9998.999752128832448226
address 2 balances 0.0
3
At 1686307885, Alice, with 0x70997970C51812dc3A010C7d01b50e0d17dc79C8, said: "Hi Jude"
At 1686307886, Bob, with 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, said: "Hi Alice"
At 1686307887, Japhet, with 0x90F79bf6EB2c4f870365E785982E1f101E93b906, said: "Hi Ox"
```

## 4. BMCスマートコントラクトの導入

### 4.1 BMCスマートコントラクトをKaia Testnetにデプロイする <a id="deploying-bmc-contract"></a>

BMCスマートコントラクトの機能テストに成功したら、次のステップでKaia Testnet Kairosにデプロイしましょう：

#### ステップ1 - .envファイルの作成

プロジェクト・フォルダーに.envファイルを作成する。 プロジェクト・フォルダーに.envファイルを作成する。 このファイルは、.envファイルからprocess.envに環境変数をロードするのに役立つ。

以下のコマンドをターミナルに貼り付け、.envファイルを作成する。

```bash
touch .env
```

ファイルを作成したら、.envファイルを次のように設定しよう：

```bash
KAIROS_TESTNET_URL= "あなたのRPC URL"
PRIVATE_KEY= "メタマスク・ウォレットからコピーしたあなたの秘密鍵"
```

#### ステップ2 - ハードハットの設定

この設定をhardhat.config.jsファイルに貼り付けます。

```
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const KAIROS_TESTNET_URL = process.env.KAIROS_TESTNET_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    kairos: {
      url: KAIROS_TESTNET_URL,
      accounts: [PRIVATE_KEY],
    }
  }
};
```

#### ステップ3 - デプロイメントスクリプトの作成

このスマート・コントラクトを指定したネットワークにデプロイする新しいデプロイ・スクリプトを作成するには、新しいファイルscripts/deploy.jsを作成し、以下のコードを貼り付ける：

```js
const hre = require("hardhat");
async function main() {
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffe = await BuyMeACoffee.deploy();
  await buyMeACoffe.deployed();
  console.log(`BuyMeACoffee Contract Address`, buyMeACoffe.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

これで設定がすべて整ったので、以下のコマンドを実行してKaia Testnet Kairosにデプロイしてみよう：

```bash
npx hardhat run scripts/deploy.js --network baobab
```

コントラクトが正常にデプロイされると、ターミナルは次のようになるはずだ：

```bash
BuyMeACoffee Contract Address 0x0bEd1ed7B205d8c18e38A20b5BaB6e265A96d1AC
```

BMCスマートコントラクトのKaia Kairos Networkへのデプロイおめでとうございます！ 検索フィールドにあなたのアドレスを貼り付けると、Kaiascopeでこの取引を確認することができます。

### 4.2 BMCスマートコントラクトとの対話 <a id="interacting-with-bmc-contract"></a>

このセクションでは、スマートコントラクトに送られたコーヒーチップを引き出すために、ハードハットスクリプトを使用する方法を学びます。 まず、scriptsフォルダに新規ファイル`withdraw.js`を作成し、以下のコードを貼り付けます：

```js
const hre = require("hardhat");

// contract address of BMC Contract
const buyMeACoffeAddress = "Paste BMC contract address";

// address of the contract deployer
// useful when calling the withdrawCoffeTips() function
// ensure that this address is the SAME address as the original contract deployer
const deployerAddress = "Paste deployer address";
// get the balance of a specified address
async function getBalance(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt)
}

async function main() {
  
  // initialize the deployerAddress to a signer object
  // this will be useful when calling the withdrawCoffeTips() to the owner address
  const signer = await hre.ethers.getSigner(deployerAddress);

  // instantiate the BMC contract
  const BuyMeACoffee = await hre.ethers.getContractAt("BuyMeACoffee", buyMeACoffeAddress, signer);

  const balanceBefore = await getBalance(signer.address);
  const contractBalance = await getBalance(BuyMeACoffee.address);
  console.log(`Owner balance before withdrawing tips: ${balanceBefore} KAIA`);
  console.log(`Contract balance before withdrawing tips:  ${contractBalance} KAIA`);

    // Withdraw funds if there are funds to withdraw.
    if (contractBalance !== "0.0") {
        console.log("withdrawing funds..")
        const withdrawCoffeTxn = await BuyMeACoffee.withdrawCoffeTips();
        await withdrawCoffeTxn.wait();
        // check owner's balance after withdrawing coffee tips
        const balanceAfter = await getBalance(signer.address);
        console.log(`Owner balance after withdrawing tips ${balanceAfter} KAIA`);
      } else {
        console.log("no funds to withdraw!");
      }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

上のコードからわかるように、BMC 契約をインスタンス化すると、スクリプトは契約残高がゼロより大きいときだけ withdrawCoffeTips 関数を実行します。  理にかなっているだろう？  理にかなっているだろう？

そうですね！ コントラクトに資金がない場合、「引き出す資金がありません」と表示されるため、コントラクトを起動する手間が省ける。

これを実際に見てみるために、以下のスクリプトを実行してみよう：

```bash
npx hardhat run scripts/withdraw.js --network baobab
```

スクリプトの実行に成功すると、ターミナルは次のようになるはずだ：

```bash
Ayomitans-MacBook-Pro:smart-contract oxpampam$ npx hardhat run scripts/withdraw.js --network baobab
Owner balance before withdrawing tips: 155.8337532 KLAY
Contract balance before withdrawing tips:  2.0 KLAY
withdrawing funds..
Owner balance after withdrawing tips 157.83298835 KLAY
```

You can see from the output that the owner balance increased by 2 KLAY after withdrawing the coffee tips.

契約がデプロイされ、すべての機能がテストされたので、次はフロントエンドを構築する番だ。

つまり、BMCスマートコントラクトとどのようにやりとりするかを可視化できるようになる。

## 5. ReactとWeb3OnboardでBMCフロントエンドを構築する<a id="builidng-bmc-frontend-with-react-and-web3onboard"></a>

このセクションでは、Next.jsとWeb3Onbaordを使ってdAppのフロントエンドウェブサイトを構築します。 開始するには、以前に作成したフロントエンドフォルダに移動する必要があります。 開始するには、以前に作成したフロントエンドフォルダに移動する必要があります。

```bash
cd ..
cd frontend 
```

次のステップは、BMCフロントエンドのウェブサイトを立ち上げて実行するために必要な依存関係をインストールすることだ。  インストールするパッケージは以下の通り：  インストールするパッケージは以下の通り：

1. Web3Onboardパッケージ：Web3-Onboardはチェーンに依存しないウォレットライブラリで、Kaia BlockchainのようなEVM互換ネットワーク上に構築されたdAppでマルチウォレットの互換性をサポートします。
2. ethers.jsを使用しています：Web3-Onboardプロバイダは、[ethers.js](https://docs.ethers.org/v6/)や[web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html)のようなライブラリで使用することができます。 このガイドでは、ethers.jsを使用して、ユーザーのアカウントの取得、残高の取得、トランザクションの署名、トランザクションの送信、スマートコントラクトからの読み取り、スマートコントラクトへの書き込みなどのKaiaブロックチェーンの呼び出しを行います。

重要：frontend/pagesフォルダ内の2つのファイルを編集する必要があります。

- **_app.js**
- **index.js**

### 5.1 Web3Onboardプロバイダとウォレットモジュールのセットアップ<a id="setting-up-web3onboard-provider-and-wallet-modules"></a>

#### ステップ1 - @web3-onboard/reactをインストールする

```bash
npm install @web3-onboard/react
```

`_app.js`ファイルで、web3OnboardProviderとinit関数をインポートする。 詳細は後述する。

```js
import { Web3OnboardProvider, init } from '@web3-onboard/react'
```

#### ステップ2 - ウォレットモジュールのインストールとインスタンス化

このステップでは、ウォレットモジュールを使ってdAppでサポートするウォレットをいくつでも追加できます。 しかし、このガイドでは、Coinbase Wallet、WalletConnect、Injected Walletsをweb3-Onboardの実装に追加します。 しかし、このガイドでは、Coinbase Wallet、WalletConnect、Injected Walletsをweb3-Onboardの実装に追加します。

```bash
npm install @web3-onboard/coinbase // Coinbase Wallet
npm install @web3-onboard/walletconnect // WalletConnect
npm install @web3-onboard/injected-wallets  // Used to connect to Metamask
```

`_app.js`ファイルで、dAppと統合するためのウォレットモジュールをインポートし、インスタンス化します。 各モジュールには、フォールバックJSON RPC URLやデフォルト・チェーンIDなど、渡すべき独自のオプション・パラメータがあることに注意してください。

```js
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();
const modules = [coinbaseWalletSdk, walletConnect, injected];
```

#### ステップ3 - エーテルの取り付け

```bash
npm install --save ethers
```

#### ステップ4 - Web3OnboardProviderを使用してWeb3Onboardをインスタンス化する

Web3OnboardProviderは、グローバルな状態を管理するためのより良い方法を提供します。 これは、プロバイダオブジェクトをアプリにラップすることを簡素化し、初期化されたWeb3Onboardインスタンスは、すべての子コンポーネントで利用できるようになります。 これは、プロバイダオブジェクトをアプリにラップすることを簡素化し、初期化されたWeb3Onboardインスタンスは、すべての子コンポーネントで利用できるようになります。

Init関数はweb3-Onboardを初期化し、すべてのフックが使用できるようにします。

これを実際に見るには、`_app.js `ファイルに、前のコードの下にあるコードを貼り付ける：

```js
const ETH_MAINNET_RPC_URL = `https://eth-mainnet.g.alchemy.com/v2/demo`;
const KAIA_MAINNET_URL = `https://public-en.node.kaia.io`;
const KAIROS_TESTNET_URL = `https://public-en-kairos.node.kaia.io`;
  const web3Onboard =  init({
    wallets: modules,
    chains: [
      {
        id: "0x1", // chain ID must be in hexadecimal
        token: "ETH",
        namespace: "evm",
        label: "Ethereum Mainnet",
        rpcUrl: ETH_MAINNET_RPC_URL
      },
      {
        id: "0x2019", // chain ID must be in hexadecimal
        token: "KAIA",
        namespace: "evm",
        label: "Kaia Mainnet",
        rpcUrl: KAIA_MAINNET_URL
      },
      {
        id: "0x3e9", // chain ID must be in hexadecimel
        token: "KAIA",
        namespace: "evm",
        label: "Kairos Testnet",
        rpcUrl: KAIROS_TESTNET_URL
      },
     // you can add as much supported chains as possible
    ],
    appMetadata: {
      name: "Kaia-web3-onboard-App", // change to your dApp name
      icon: "paste your icon url"
      logo: "paste your logo url"
      description: "Web3Onboard-Kaia",
      recommendedInjectedWallets: [
        { name: "Coinbase", url: "https://wallet.coinbase.com/" },
        { name: "MetaMask", url: "https://metamask.io" }
      ]
    }
  })
export default function App({ Component, pageProps }) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <Component {...pageProps} />
    </Web3OnboardProvider>
 )
}
```

アプリにプロバイダオブジェクトと、すべての子コンポーネントで利用可能な web3Onboard インスタンスを付与する _app.js ファイルをセットアップしたら、次は `index.js` ファイルでフロントエンドのロジックを構築します。

- Index.js

このページは、BMCスマートコントラクトへのウォレット接続とコーヒーの送信を処理します。

```js
import React, { useEffect, useState } from 'react';
import { useConnectWallet } from '@web3-onboard/react'
import abi from "../utils/BuyMeACoffee.json"
import { ethers } from "ethers";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [coffee, setGetCoffee] = useState([]);
  const [coffeeContract, setCoffeeContract] = useState();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const contractAddress = "Paste BMC contract address";
  const contractABI = abi.abi;
  const getCoffee = async () => {
    try {
       console.log("getting coffee Id")
       const coffeeId = await coffeeContract.coffeeId();
       console.log(coffeeId.toString());
       const getCoffee = await coffeeContract.getAllCoffee(coffeeId.toString());
       setGetCoffee(getCoffee);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let ethersProvider
    if (wallet) {
       ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    }
  
    
    if (ethersProvider) {
      try {
        const getCoffeContract = async () => {
          const signer =  await ethersProvider.getSigner();
    
          const buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);
    
          setCoffeeContract(buyMeACoffee)
        }
        getCoffeContract();
      } catch (error) {
        console.log(error);
      }
    }
  }, [wallet])
  useEffect(() => {
    const onNewCoffee = (from, timestamp, name, message) => {
      console.log("Coffee received: ", from, timestamp, name, message);
      setGetCoffee((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name
        }
      ]);
    };
      if (wallet && coffeeContract) {
        getCoffee()
        coffeeContract.on("NewCoffee", onNewCoffee);    
      } else {
        console.log("provider not initialized yet");
      }
  }, [wallet, coffeeContract])
  const onNameChange = (event) => {
    setName(event.target.value);
  }
  const onMessageChange = (event) => {
    setMessage(event.target.value);
  }
  const buyCoffee = async (e) => {
    e.preventDefault();
    try {
      if (!wallet && !coffeeContract) {
        console.log("provider not initialized yet");
        return;
      }
        console.log("buying coffee..")
        const coffeeTxn = await coffeeContract.buyCoffee(name, message, {value: ethers.parseEther("1.0")});
        const coffeTx =  await coffeeTxn.wait();
        console.log("mined ", coffeTx.hash);
        console.log("coffee sent!");
        // clear target value fields
        e.target.inputName.value = "";
        e.target.inputAmount.value = "";
        // Clear the form fields.
        setName("");
        setMessage("");
        // set all coffees
        await getCoffee();
    } catch (error) {
      console.log(error);
    }
  };

  return (
     <main className='coffeeMain max-w-8xl min-h-[100vh] p-10 bg-black mt-0 shadow-2xl m-auto flex flex-col justify-center items-center bg-[url("https://static.vecteezy.com/system/resources/previews/001/330/185/original/coffee-cup-on-hand-drawn-doodle-background-free-vector.jpg")]'>
        <div className='coffeContent'>
          <div className='compOne flex flex-col justify-center items-center'>
            <h1 className='text-white text-center text-2xl'>Buy me a coffee</h1>
            { wallet ?
            ( <div>
                <form onSubmit={buyCoffee} className="flex flex-col justify-center items-center mt-4">
                  <input type="text" name='inputName' placeholder="Enter your name" className="p-5 rounded-md bg-black text-white border-solid border-2 border-white outline-0" onChange={onNameChange} />
                  <input type="text" name='inputAmount' placeholder="Send your message" className="p-5 rounded-md bg-black text-white border-solid border-2 border-white mt-3 outline-0" onChange={onMessageChange}/>
                  <input type="submit" value="Send Coffee" className="p-3 mt-4 rounded-2xl bg-white text-black cursor-pointer"/>
                </form>
            </div> ) : (    <button className='text-black bg-white p-3 rounded-lg mt-3 cursor-pointer' disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
        {connecting ? 'Connecting' : wallet ? 'Disconnect' : 'Connect'}
      </button>)
        
            }
          </div>
          <div className="comp2 flex flex-col justify-normal items-center py-3 px-10">
            {wallet && ( 
              <div className="flex mt-5 mb-3">
                  <h1 className="text-white text-2xl">Coffee Transaction</h1>
              </div>
              ) }
              <div className="coffeeTransaction w-[1300px] flex flex-row gap-5 overflow-x-scroll">
              {/* grid gap-4 grid-cols-2 */}
                {wallet && (coffee.map((coff, id) => {
                      return (
                        <div key={id} className=" border-solid border-2 border-white p-5 w-auto rounded-2xl mb-3">
                          <p className=" text-white font-bold">"{coff.message}"</p>
                          <p className=" text-white">From: {coff.name} at {`${new Date(coff.timestamp.toString() * 1000)}`}</p>
                        </div>
                      )
                }))}
              </div>
            </div>
        </div>
    </main>
  )
}
```

### 上記のコードからの重要な注意事項

1. コントラクトABIを取得する：  コントラクトABIは、スマートコントラクト上でどのような関数を呼び出せるかをフロントエンドのコードに指定する。 契約アビを取得するには、スマート契約フォルダに移動し、以下のパスにしたがってこのファイルのテキストをコピーしてください。  次に、**frontend/src**フォルダにutilsフォルダを作成した。 そして、新しく作成したBuyMeACoffee.jsonファイルという名前のファイルに貼り付けた。

2. BMC契約の住所を、BMCで展開されている契約の住所に変更します。

アプリがまだ起動していなければ、シェルで `npm run dev` を使ってローカルサーバーを起動し、変更をテストすることができる。 ウェブサイトは数秒でロードされ、UIはこのようになるはずです： ウェブサイトは数秒でロードされ、UIはこのようになるはずです：

コネクトウォレットのページ

![](/img/build/tutorials/bmc-cw.png)

コーヒーを送るフロントエンドのウェブサイト：

![](/img/build/tutorials/bmc-frontend.png)

では、ウェブサイトとコードを見てみよう。

上のスクリーンショットを見れば、dAppに初めてアクセスしたときに、ウォレットを接続するよう求められることがもうお分かりだろう。  次に、Web3Onboardインスタンスで初期化された利用可能なウォレットのリストがポップアップ表示されます。  次に、Web3Onboardインスタンスで初期化された利用可能なウォレットのリストがポップアップ表示されます。

上の画像ではMetaMaskを選択しています。 ウォレットを接続すると、ウェブサイトの右上に接続されたウォレットの詳細を含むUIコンポーネントが表示されます。 また、このページにはコーヒー取引フォームが表示され、送信者の名前とメッセージ、他の訪問者がスマートコントラクトに支払った以前のコーヒーが表示されます。

## 6. Fleekを使ってフロントエンドのコードをIPFSにデプロイする<a id="deploying-bmc-frontend-to-ipfs-using-fleek"></a>

Fleekは、IPFS上にモダンなサイトやアプリを構築するためのインフラです。 fleekを使えば、あなたのサイトやアプリはパーミッションレス、トラストレス、検閲耐性、そして中央集権的なゲートキーパーから解放される。 このチュートリアルでは、Vercelのような従来のプラットフォームではなく、FleekにNext jsアプリをデプロイします。
ああ、そうだね！ 私たちは分散型アプリケーションを分散型ホスティング・プラットフォームにデプロイしています！

以下は、BMC dAppをFleekにデプロイする手順です：

1. フロントエンドのコードでこれらの設定を確認してください：

  a. package.jsonを開き、以下のスクリプトを追加する：

  ```js
  	"scripts": {
  	 "dev": "next",
  	 "build": "next build",
  	  "start": "next start",
  		  "export": "next export"  
  	}
  ```

  b. ルート・ディレクトリにあるnext.config.jsファイルに、以下のコードを貼り付けます：

  ```js
  	module.exports = {
  		exportTrailingSlash: true,
  	};
  ```

詳しくはこちらの[ガイド](https://blog.fleek.co/posts/fleek-nextJS)をご覧ください。

2. 上のスクリーンショットを見れば、dAppに初めてアクセスしたときに、ウォレットを接続するよう求められることがもうお分かりだろう。

![](/img/build/tutorials/fleek-addsite.png)

3. GitHubアカウントに接続してリポジトリにアクセスします。

![](/img/build/tutorials/fleek-cg.png)

4. デプロイするリポジトリを選択します。

5. 次のページで、**基本ビルド設定**タブで**Next Js**フレームワークを選択すると、Fleekが自動的に他のフィールドに入力します。

6. サイトをクリック

7. 以下の画像のように、**npm WARN EBADENGINE Unsupported engine**が発生した場合：

![](/img/build/tutorials/fleek-err.png)

**Deploy**タブの**Deploy setting**に移動し、以下の画像のように**Docker image Name**を**node:latest**に変更します：

![](/img/build/tutorials/fleek-err-fix.png)

8. これで、あなたのサイトは簡単にビルドされ、IPFSにデプロイされるはずだ。
9. 生成されたリンクをクリックすると、ウェブサイトが表示されます。

![](/img/build/tutorials/fleek-site-url.png)

どうだ！ どうだ！ 私たちはBMC dAppをIPFS上にデプロイし、ホストしています。

## 7. 結論<a id="conclusion"></a>

ここまで来たなら、おめでとう！ このチュートリアルでは、Solidity、NextJs、Web3Onboard、Fleek を使用してフルスタックの Buy Me A Coffee dApp を作成する方法を学びました。 これは、分散型プラットフォーム上でホストされる分散型アプリケーションを作成するための最初のステップである。 これは、分散型プラットフォーム上でホストされる分散型アプリケーションを作成するための最初のステップである。

ここから、1 KAIAを静的に送信する以外に、送信するコーヒーの量のための新しい入力フィールドを追加するなど、フロントエンドで他のオプションを検討することもできます。 [github](https://github.com/ayo-klaytn/buy-me-a-coffee)にあるコードベース全体にアクセスすることができ、この[リンク](https://spring-fog-0605.on.fleek.co/)を使ってウェブサイトをテストすることもできる。

より詳細な情報をお知りになりたい方は、[Kaia Docs](https://docs.klaytn.foundation/)、[Web3Onboard Docs](https://onboard.blocknative.com/docs/modules/react)、[Fleek Docs](https://docs.fleek.co/tutorials/hosting/)をご覧ください。 ここから、1 KAIAを静的に送信する以外に、送信するコーヒーの量のための新しい入力フィールドを追加するなど、フロントエンドで他のオプションを検討することもできます。
