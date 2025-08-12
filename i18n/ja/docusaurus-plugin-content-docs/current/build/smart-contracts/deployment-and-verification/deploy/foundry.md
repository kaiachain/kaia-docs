# Foundryを使用してスマートコントラクトをデプロイする

![](/img/banners/kaia-foundry.png)

## はじめに

FoundryはRustで書かれたスマートコントラクト開発フレームワークで、開発者はコマンドラインからsolidityスクリプトを使ってコントラクトの管理とコンパイル、テストの実行、コントラクトのデプロイ、ネットワークとのやり取りができる。

Foundryは、高速でモジュール化されたスマート・コントラクト開発を可能にする4つの主要CLIツールで構成されている：

- [Forge](https://github.com/foundry-rs/foundry/tree/master/forge)：  Forgeを使ってスマートコントラクトのデプロイ、テスト、コンパイルができる。
- [Cast](https://github.com/foundry-rs/foundry/tree/master/cast)：CastはEVMスマートコントラクトとのやり取りを簡単にするものであり、 チェーンデータの取得、トランザクションの送信などが含まれる。 これには、チェーンデータの取得、トランザクションの送信などが含まれる。
- [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil)：ローカルノードをスピンアップする必要がありますか？ AnvilはFoundryが提供するローカルノード環境である。 AnvilはFoundryが提供するローカルノード環境である。
- [Chisel](https://github.com/foundry-rs/foundry/blob/master/chisel)：高速で便利で冗長なsolidity REPL。

このガイドでは、次のことを説明する：

- 簡単な鋳造プロジェクトを立ち上げる。
- Foundryを使用してスマート・コントラクトのサンプルをコンパイルし、テストします。
- Foundryを使用してスマートコントラクトをKaia Kairosネットワークにデプロイします。
- キャストとアンビルでメインネットをフォークする。

## 前提条件

このチュートリアルに従うには、次のことが前提条件となる：

- コードエディタ: [VS Code](https://code.visualstudio.com/download)などのソースコードエディタ。
- [MetaMask](../../../tutorials/connecting-metamask.mdx#install-metamask)：コントラクトのデプロイ、トランザクションへの署名、コントラクトとの対話に使用される。
- RPCエンドポイント：サポートされている[エンドポイント・プロバイダー](../../../../references/public-en.md)の1つから取得できます。
- [Faucet](https://faucet.kaia.io)からKAIAをテスト: 口座に十分なKAIAを入金してください。
- [Rust](https://www.rust-lang.org/tools/install)と[Foundry](https://github.com/foundry-rs/foundry#installation)をインストールする。

## 開発環境のセットアップ

Foundryのインストールが成功したかどうかを確認するには、以下のコマンドを実行してください：

```bash
forge -V
```

**出力**

![](/img/build/get-started/forge-version.png)

foundryのインストールに成功すると、foundryで使用できるCLIツール（forge、cast、anvil、chisel）にアクセスできるようになります。 次のステップでfoundryプロジェクトをセットアップしてみよう：

\*\*ステップ1新しいプロジェクトを開始するには、以下のコマンドを実行します：

```bash
forge init foundry_example 
```

**ステップ 2**：プロジェクトフォルダに移動します。

```bash
cd foundry_example 
```

ファウンドリー・プロジェクトを初期化した後、ディレクトリーには以下が含まれます：

- **src**：スマートコントラクトのデフォルトディレクトリ。
- **tests**：テスト用のデフォルト・ディレクトリ。
- **foundry.toml**：デフォルトのプロジェクト設定ファイル。
- **lib**: プロジェクトの依存関係のデフォルト・ディレクトリ。
- **script**：solidityスクリプトファイルのデフォルトディレクトリです。

## foundry.tomlの設定

プロジェクトのセットアップができたので、次は`.env`ファイルを作成して変数を追加する。 Foundryはプロジェクトディレクトリにある.envファイルを自動的に読み込みます。

.envファイルはこのフォーマットに従っている必要がある：

```bash
kairos_rpc_url=paste_rpc_url
```

次に`foundry.toml`ファイルを編集する。 scaffoldの後、プロジェクトのルートにすでに1つあるはずだ。

ファイルの最後に以下の行を追加する：

```bash
[rpc_endpoints]
kairos = "${KAIROS_RPC_URL}"
```

これはKaia Kairos Testnetの[RPCエイリアス](https://book.getfoundry.sh/cheatcodes/rpc.html)を作成します。

## アカウントのインポート

このガイドでは、MetaMaskにすでに存在する開発者アカウントをインポートして、`forge script` や `cast send` などの秘密鍵を必要とするメソッドで `--account` オプションを使ってアクセスできるようにする。

既存のウォレットをインポートするには、以下のコマンドを実行します：

```bash
cast wallet import --interactive oxpampam-dev-i
```

```bash
秘密鍵を入力します：
パスワードを入力
```

![](/img/build/get-started/cast-wallet-import.png)

## Sample smart contract

In this section, we will be using the sample counter contract in the initialized foundry project. The `counter.sol` file in the `src/` folder should look like this:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
contract Counter {
    uint256 public number;
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }
    function increment() public {
        number++;
    }
}
```

**Code Walkthrough**

This is your smart contract. **Line 1** shows it uses the Solidity version 0.8.13 or greater. From **lines 4-12**, a smart contract `Counter` is created. This contract simply stores a new number using the **setNumber** function and increments it by calling the **increment** function.

## Testing smart contract

Foundry allows us to write tests in solidity as opposed to writing tests in javascript in other smart contract development frameworks. In our initialized foundry project, the `test/Counter.t.sol` is an example of a test written in solidity. The code looks like this:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/Counter.sol";
contract CounterTest is Test {
    Counter public counter;
    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }
    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }
    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
```

The code above shows you imported forge standard library and Counter.sol.

The tests above check the following:

- Is the number increasing?
- Is the number equal to the set number?

To check if your test works fine, run the following command:

```bash
forge test
```

**Output**

![](/img/build/get-started/forge-test.png)

To learn more about writing tests, advanced testing, and other features, refer to [Foundry's documentation](https://book.getfoundry.sh/forge/tests).

## Compiling your contracts

Compile your contract with this command:

```bash
forge build 
```

## Deploying your contracts

To deploy a contract using foundry, you must provide an RPC URL and a private key of the account that will deploy the contract. Kaiaの[rpc-providers](../../../../references/public-en.md)のリストを見て、あなたのrpc-urlを見つけ、[MetaMask](../../../tutorials/connecting-metamask.mdx#install-metamask)を使ってアカウントを作成してください。

このガイドでは、ファウンドリが提供する2つの契約展開方法を使用する：

### Forge Createの使用

**ステップ 1**：forge createを使用してカイアカイロスネットワークに契約をデプロイするには、以下のコマンドを実行します：

```bash
#
source .env

# 契約のデプロイ
forge create --rpc-url $KAIROS_RPC_URL src/Counter.sol:Counter --broadcast --account oxpampam-dev-i 
```

```bash
キーストアのパスワードを入力します：<KEYSTORE_PASSWORD>
```

:::note
開発環境での基本的なテストネット使用以上のデプロイメントには、セキュリティ強化のため、[ハードウェアウォレットまたはパスワードで保護されたキーストア](https://book.getfoundry.sh/guides/best-practices.html#private-key-management)を使用することを強くお勧めします。
:::

![](/img/build/get-started/forge-create-deploy.png)

**ステップ 2**：Kaiascanを開き、カウンター契約が正常に展開されたかどうかを確認します。

**Step 3**: Copy and paste the transaction hash in the search field and press Enter. You should see the recently deployed contract.

![](/img/build/get-started/kaiascan-deploy.png)

### 鍛造スクリプトの使用

forgeスクリプトを使ってカイア・カイロスのネットワークに契約をデプロイするには、以下のコマンドを実行します：

```bash
#
source .env

# 契約のデプロイ
forge script --chain 1001 script/Counter.s.sol:CounterScript --rpc-url $KAIROS_RPC_URL --broadcast -vvv --account oxpampam-dev-i
```

![](/img/build/get-started/forge-script-deploy.png)

## Interacting with the contract

スマート・コントラクトのデプロイに成功したら、次のステップは通常、その関数を呼び出して実行することでスマート・コントラクトと対話することだ。 さっそく[Cast](https://book.getfoundry.sh/reference/cast/cast-send.html)を使って、カイア・カイロス・ネットワークに配備されたコントラクトとやりとりしてみよう。

In this section, you will learn how to use the [cast call](https://book.getfoundry.sh/reference/cast/cast-call) to execute the `read-only` function and [cast send](https://book.getfoundry.sh/reference/cast/cast-send) to execute `write` functions.

\*\*A. キャストコール

契約書に格納されている番号を取得するには、`number`関数を呼び出すことになる。 Run the command below to see this in action.

```bash
cast call YOUR_CONTRACT_ADDRESS "number()" --rpc-url $KAIROS_RPC_URL
```

**Example**

```bash
キャストコール 0xb00760a445f47F79ea898bCe7F88cD4930060Ca5 "number()" --rpc-url $KAIROS_RPC_URL
```

**Output**

![](/img/build/get-started/cast-call-number.png)

You should get this data in hexadecimal format:

```bash
0x0000000000000000000000000000000000000000000000000000000000000000
```

しかし、望む結果を得るには、`cast` を使って上記の結果を変換する。 In this case, the data is a number, so you can convert it into base 10 to get the result 0:

```bash
cast --to-base 0x0000000000000000000000000000000000000000000000000000000000000000 10
```

**Output**

![](/img/build/get-started/cast-call-0.png)

**B. キャスト・センド**

To sign and publish a transaction such as executing a `setNumber` function in the counter contract, run the command below:

```bash
cast send --rpc-url=$KAIROS_RPC_URL <CONTRACT-ADDRESS> "setNumber(uint256)" arg --account<ACCOUNT NAME>
```

**Example**

```bash
cast send --rpc-url=$KAIROS_RPC_URL 0xb00760a445f47F79ea898bCe7F88cD4930060Ca5 "setNumber(uint256)"  10 --アカウント oxpampam-dev-i
```

\*\*出力

![](/img/build/get-started/cast-send-setNum.png)

**Crosscheck Number**

```bash
キャストコール 0xb00760a445f47F79ea898bCe7F88cD4930060Ca5 "number()" --rpc-url $KAIROS_RPC_URL
```

**Output**

![](/img/build/get-started/cast-call-10.png)

You should get this data in hexadecimal format:

```bash
0x000000000000000000000000000000000000000000000000000000000000000a
```

However to get your desired result, use cast to convert the above result. In this case, the data is a number, so you can convert it into base 10 to get the result 10:

```bash
cast --to-base 0x000000000000000000000000000000000000000000000000000000000000000a 10
```

**Output**

![](/img/build/get-started/cast-call-result-10.png)

## Forking Mainnet with Cast and Anvil

Foundry allows us to fork the mainnet to a local development network ([Anvil](https://book.getfoundry.sh/reference/anvil/)). Also, you can interact and test with contracts on a real network using [Cast](https://book.getfoundry.sh/reference/cast/).

### Getting Started

Now that you have your Foundry project up and running, you can fork the mainnet by running the command below:

```bash
anvil --fork-url rpc-url
```

**Example**

```bash
anvil --fork-url https://archive-en.node.kaia.io
```

**Output**

![](/img/build/get-started/anvil-localnode.png)

After successfully running this command, your terminal looks like the above image. You'll have 10 accounts created with their public and private keys as well 10,000 prefunded tokens. The forked chain's RPC server is listening at `127.0.0.1:8545`.

To verify you have forked the network, you can query the latest block number:

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

You can convert the result from the task above using [hex to decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html). You should get the latest block number from the time you forked the network. これを確認するには、[KaiaScan](https://kaiascan.io/block/118704896?tabId=txList)のブロック番号を照合する。

### Illustration

このセクションでは、USDTを保有している人からAnvilが作成したアカウント（0x70997970C51812dc3A010C7d01b50e0d17dc79C8 - Bob）にUSDTトークンを送金する方法について説明します。

**Transferring USDT**

Kaiascanにアクセスし、USDTトークンの保有者を検索する（[こちら](https://kaiascan.io/token/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=tokenHolder&page=1)）。 Let's pick a random account. この例では、`0xb3ff853a137bfe10f3d8965a29013455e1619303`を使用する。

Let's export our contracts and accounts as environment variables:

```bash
export BOB=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export USDT=0xd077a400968890eacc75cdc901f0356c943e4fdb
export USDTHolder=0xb3ff853a137bfe10f3d8965a29013455e1619303
```

キャストコールを使ってBobのUSDT残高を確認する：

```bash
cast call $USDT "balanceOf(アドレス)(uint256)" $BOB
```

**Output**

![](/img/build/get-started/call-usdt-bob.png)

同様に、キャストコールを使ってUSDTHolderのUSDT残高を確認することもできる：

```bash
cast call $USDT "balanceOf(アドレス)(uint256)" $USDTHolder
```

**Output**

![](/img/build/get-started/call-usdt-holder.png)

キャスト送信を使って、USDTHolderからBobにトークンを転送してみよう：

```bash
# impersonate USDTHolder
cast rpc anvil_impersonateAccount $USDTHolder    

# transfer USDT
cast send $USDT --unlocked --from $USDTHolder "transfer(address,uint256)(bool)" $BOB 1000000
```

**Output**

![](/img/build/get-started/cast-send-usdt.png)

Let's check that the transfer worked:

```bash
cast call $USDT "balanceOf(アドレス)(uint256)" $BOB
```

**Output**

![](/img/build/get-started/call-usdt-bob-after.png)

```bash
cast call $USDT "balanceOf(アドレス)(uint256)" $USDTHolder
```

**Output**

![](/img/build/get-started/call-usdtholder-after.png)

## トラブルシューティング

### ガス推定誤差

forgeスクリプトを使用してデプロイすると、このエラーに遭遇する可能性があります：

```bash
# Transaction Failure
❌ [Failed] Hash: 0xa0de3dac1dae4d86f2ba8344bc5f7d816714a6abdc4555ae46ca21d126f78caf
Error：Transaction Failure: 0xa0de3dac1dae4d86f2ba8344bc5f7d816714a6abdc4555ae46ca21d126f78caf

# Explorer上のトランザクションエラーコード
Error：ガス欠の契約作成コードストレージ
```

![](/img/build/get-started/gas-estimation-err.png)

これは通常、配備時のガスの見積もりが不正確だったために起こる。 Foundryのデフォルトのガス推定アルゴリズム（デフォルトの130％乗数）では、Kaiaネットワークで不足することがあり、配備が完了する前にガス欠になることがある。

実際に必要なガスが見積もり量を超えると、契約展開中にトランザクションのガスが不足し、_Contract creation code storage out of gas_エラーが発生する。

**クイックフィックス：手動でガス倍率を設定する**。

このように--gas-estimate-multiplierを200以上に増やしてスクリプトを実行する：

```bash
# command
forge script script/YourContract.s.sol:YourScript ୧
  --chain<chain-id> ୧
  --rpc-url $RPC_URL ୧
  --broadcast ୧
  --gas-estimate-multiplier 200 ୧
  --account your-account ୧
  -vvvv
```

```bash
# example 

forge script --chain 1001 script/NFT.s.sol:NFTScript --rpc-url $KAIROS_RPC_URL --broadcast --gas-estimate-multiplier 200 -vvvv --account oxpampam-dev-i
```

:::note
gas-estimate-multiplier\`フラグは、すべてのガス推定値に乗じる相対的なパーセンテージを設定する。 200に設定することで、ガスの見積もりが2倍になり、契約配備を成功させるのに十分な余裕ができる。
:::

![](/img/build/get-started/gas-estimation-fixed.png)

## 結論

このガイドを最後まで読まれた方、おめでとうございます。 ご質問は[カイアフォーラム](https://devforum.kaia.io/)をご覧ください。 しかし、以下は、カイアでFoundryをさらに構築する際に必要となるかもしれない有用なリソースのリストです。

- [Foundry Docs](https://book.getfoundry.sh/)
- [サイフリン・ファウンドリー・ファンダメンタルズ](https://updraft.cyfrin.io/courses/foundry)
- [サイフリン・アドバンスト・ファウンドリー](https://updraft.cyfrin.io/courses/advanced-foundry)

