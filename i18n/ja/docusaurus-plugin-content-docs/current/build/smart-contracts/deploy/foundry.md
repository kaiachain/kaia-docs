# Foundryを使用してスマートコントラクトをデプロイする

![](/img/banners/kaia-foundry.png)

## はじめに

FoundryはRustで書かれたスマートコントラクト開発フレームワークで、開発者はコマンドラインからsolidityスクリプトを使ってコントラクトの管理とコンパイル、テストの実行、コントラクトのデプロイ、ネットワークとのやり取りができる。

Foundryは、高速でモジュール化されたスマート・コントラクト開発を可能にする4つの主要CLIツールで構成されている：

- [Forge](https://github.com/foundry-rs/foundry/tree/master/forge)：  Forgeを使ってスマートコントラクトのデプロイ、テスト、コンパイルができる。
- [Cast](https://github.com/foundry-rs/foundry/tree/master/cast)：CastはEVMスマートコントラクトとのやり取りを簡単にした。 これには、チェーンデータの取得、トランザクションの送信などが含まれる。
- [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil)：ローカルノードをスピンアップする必要がありますか？ AnvilはFoundryが提供するローカルノード環境である。
- [Chisel](https://github.com/foundry-rs/foundry/blob/master/chisel)：高速で便利で冗長なsolidity REPL。

このガイドでは、次のことを説明する：

- 簡単な鋳造プロジェクトを立ち上げる。
- Foundryを使用してスマート・コントラクトのサンプルをコンパイルし、テストします。
- Foundryを使用してスマートコントラクトをKaia Kairosネットワークにデプロイします。
- キャストとアンビルでメインネットをフォークする。

## 前提条件

このチュートリアルに従うには、次のことが前提条件となる：

- Code editor: a source-code editor such [VS-Code](https://code.visualstudio.com/download).
- [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask)：コントラクトのデプロイ、トランザクションへの署名、コントラクトとの対話に使用される。
- RPCエンドポイント：サポートされている[エンドポイント・プロバイダー](../../../references/public-en.md)の1つから取得できます。
- [Faucet](https://faucet.kaia.io)からKAIAをテスト: 口座に十分なKAIAを入金してください。
- [Rust](https://www.rust-lang.org/tools/install)と[Foundry](https://github.com/foundry-rs/foundry#installation)をインストールする。

## 開発環境のセットアップ

ファウンドリのインストールが成功したかどうかを確認するには、以下のコマンドを実行してください：

```bash
forge -V
```

**出力**

![](/img/build/get-started/forge-version.png)

foundryのインストールに成功すると、foundryで使用できるCLIツール（forge、cast、anvil、chisel）にアクセスできるようになります。 次のステップでファウンドリー・プロジェクトをセットアップしてみよう：

\*\*ステップ1新しいプロジェクトを開始するには、以下のコマンドを実行します：

```bash
forge init foundry_example 
```

**ステップ 2**：プロジェクトフォルダに移動します。

```bash
cd foundry_example
ls	 
```

ファウンドリー・プロジェクトを初期化した後、カレント・ディレクトリーには以下が含まれているはずだ：

- **src**：スマートコントラクトのデフォルトディレクトリ。
- **tests**：テスト用のデフォルト・ディレクトリ。
- **foundry.toml**：デフォルトのプロジェクト設定ファイル。
- **lib**: プロジェクトの依存関係のデフォルト・ディレクトリ。
- **script**：solidityスクリプトファイルのデフォルトディレクトリです。

## スマート・コントラクトのサンプル

このセクションでは、初期化されたファウンドリー・プロジェクトのサンプル・カウンター契約を使用する。 `src/`フォルダにある`counter.sol`ファイルは以下のようになるはずだ：

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

\*\*コード・チュートリアル

これがスマート・コントラクトだ。 **行1**は、Solidityバージョン0.8.13以上を使用していることを示しています。 4-12行目から\*\*、スマート・コントラクト `Counter` が作成される。 このコントラクトは、単純に**setNumber**関数を使用して新しい数値を格納し、**increment**関数を呼び出してその数値をインクリメントする。

## スマートコントラクトのテスト

Foundry allows us to write tests in solidity as opposed to writing tests in javascript in other smart contract development frameworks. 初期化されたfoundryプロジェクトでは、`test/Counter.t.sol`がsolidityで書かれたテストの例です。 コードは次のようになる：

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

上のコードでは、forge標準ライブラリとCounter.solをインポートしています。

上記のテストは以下のことをチェックする：

- その数は増えているのか？
- 数字は設定された数字と等しいか？

テストがうまくいくかどうかを確認するには、以下のコマンドを実行する：

```bash
forge test
```

**出力**

![](/img/build/get-started/forge-test.png)

テストの書き方や高度なテスト、その他の機能については、[Foundryのドキュメント](https://book.getfoundry.sh/forge/tests)を参照してください。

## 契約書の作成

このコマンドで契約書をコンパイルする：

```bash
forge build 
```

## 契約の展開

ファウンドリを使用してコントラクトをデプロイするには、RPC URLと、コントラクトをデプロイするアカウントの秘密鍵を提供する必要があります。 Kaiaの[rpc-providers](../../../references/public-en.md)のリストを見て、あなたのrpc-urlを見つけ、[MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask)を使ってアカウントを作成してください。

**ステップ1**: 契約をカイア・カイロス・ネットワークに展開するには、以下のコマンドを実行します。

```bash
$ forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/Counter.sol:Counter
```

**例**

```bash
forge create --rpc-url https://public-en-kairos.node.kaia.io --private-key hhdhdhprivatekey hhdhdhud src/Counter.sol:Counter
```

**警告**：引数の秘密鍵は、MetaMaskの秘密鍵に置き換えてください。 秘密鍵を公開しないよう、十分注意してください。

**出力**

![](/img/build/get-started/foundry-create.png)

**ステップ2**:[Kaiascope](https://kairos.kaiascope.com/tx/0x83c8b55f3fd90110f9b83cd20df2b2bed76cfeb42447725af2d60b2885f479d3?tabId=internalTx) を開き、カウンター契約が正常にデプロイされたかチェックする。

**ステップ 3**：取引ハッシュをコピーして検索フィールドに貼り付け、Enterキーを押します。 最近配備された契約が表示されるはずだ。

![](/img/build/get-started/forge-scope.png)

## 契約とのやり取り

スマート・コントラクトのデプロイに成功したら、関数を正しく呼び出して実行したいだろう。 [Cast](https://book.getfoundry.sh/reference/cast/cast-send.html) を使って、Kaia Kairos Networkに配備されたコントラクトとやりとりしてみましょう。  このセクションでは、[cast call](https://book.getfoundry.sh/reference/cast/cast-call) を使って `read-only` 関数を実行し、[cast send](https://book.getfoundry.sh/reference/cast/cast-send) を使って `write` 関数を実行する方法を学びます。

**A. cast call**：コントラクトに格納されている数字を取得するには、`number`関数を呼び出します。 以下のコマンドを実行し、その動きを見てみよう。

```bash
cast call YOUR_CONTRACT_ADDRESS "number()" --rpc-url RPC-API-ENDPOINT-HERE
```

**例**

```bash
cast call 0xe4d576c447733da7ca9197e88d34a74c3c865cff "number()" --rpc-url https://public-en-kairos.node.kaia.io
```

**出力**

![](/img/build/get-started/cast-call-number.png)

このデータを16進数で取得してください：

```bash
0x0000000000000000000000000000000000000000000000000000000000000000
```

しかし、希望する結果を得るには、上記の結果をキャストで変換する。 この場合、データは数字なので、10進数に変換すれば結果は0になる：

```bash
cast --to-base 0x0000000000000000000000000000000000000000000000000000000000000000 10
```

**出力**

![](/img/build/get-started/cast-call-0.png)

**B. cast send**：カウンターのコントラクトで `setNumber` 関数を実行するようなトランザクションに署名して発行するには、以下のコマンドを実行する：

```bash
cast send --rpc-url=<RPC-URL> <CONTRACT-ADDRESS> “setNumber(uint256)” arg --private-key=<PRIVATE-KEY>
```

**例**

```bash
cast send --rpc-url=https://public-en-kairos.node.kaia.io 0xe4d576c447733da7ca9197e88d34a74c3c865cff "setNumber(uint256)"  10 --private-key=<private key>
```

**出力**

![](/img/build/get-started/cast-send-setNum.png)

**クロスチェック番号**

```bash
cast call 0xe4d576c447733da7ca9197e88d34a74c3c865cff "number()" --rpc-url https://public-en-kairos.node.kaia.io
```

**出力**

![](/img/build/get-started/cast-call-10.png)

このデータを16進数で取得してください：

```bash
0x000000000000000000000000000000000000000000000000000000000000000a
```

しかし、希望する結果を得るには、上記の結果をキャストで変換する。 この場合、データは数字なので、それを基数10に変換して、結果10を得ることができる：

```bash
cast --to-base 0x000000000000000000000000000000000000000000000000000000000000000a 10
```

**出力**

![](/img/build/get-started/cast-call-result-10.png)

## キャストとアンヴィルによるメインネットのフォーク

Foundryでは、メインネットをローカル開発ネットワーク（[Anvil](https://book.getfoundry.sh/reference/anvil/)）にフォークすることができる。 また、[Cast](https://book.getfoundry.sh/reference/cast/)を使って、実際のネットワーク上でコントラクトと対話し、テストすることができます。

### はじめに

Now that you have your Foundry project up and running, you can fork the mainnet (cypress) by running the command below:

```bash
anvil --fork-url rpc-url
```

**例**

```bash
anvil --fork-url https://archive-en.node.kaia.io
```

**出力**

![](/img/build/get-started/anvil-localnode.png)

このコマンドをうまく実行すると、ターミナルは上の画像のようになる。 10,000トークンと公開鍵、秘密鍵で10アカウントが作成されます。 フォークされたチェーンの RPC サーバーは `127.0.0.1:8545` で待ち受けている。

ネットワークをフォークしたことを確認するには、最新のブロック番号を照会することができる：

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

上記のタスクの結果は、[16進数から10進数](https://www.rapidtables.com/convert/number/hex-to-decimal.html)を使って変換できる。 ネットワークをフォークした時点から最新のブロック番号を取得する必要がある。 これを確認するには、[Kaiascope](https://kaiascope.com/block/118704896?tabId=txList)のブロック番号をクロスリファレンスする。

### イラスト

このセクションでは、oUSDC を保持している誰かから Anvil が作成したアカウントに oUSDC トークンを転送する方法について説明します (0x70997970C51812dc3A010C7d01b50e0d17dc79C8 - Bob)

**OUSDC**を譲渡する。

Kaiascopeに行き、oUSDCトークンの保有者を検索する（ここ）。 ランダムにアカウントを選んでみよう。 この例では、`0x8e61241e0525bd45cfc43dd7ba0229b422545bca`を使用する。

契約とアカウントを環境変数としてエクスポートしよう：

```bash
export BOB=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export oUSDC=0x754288077d0ff82af7a5317c7cb8c444d421d103
export oUSDCHolder=0x8e61241e0525bd45cfc43dd7ba0229b422545bca
```

キャストコールを使ってボブの残高をチェックできる：

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```

**出力**

![](/img/build/get-started/oUsdcBob4.png)

同様に、キャスト・コールを使ってoUSDCホルダーの残高をチェックすることもできる：

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```

**出力**

![](/img/build/get-started/oUsdcHolder4.png)

幸運なユーザーからアリスへ、キャスト送信を使ってトークンを転送してみましょう：

````bash
cast rpc anvil_impersonateAccount $oUSDCHolder    
cast send $oUSDC \
--unlocked \
--from $oUSDCHolder\
 "transfer(address,uint256)(bool)" \
 $BOB \
 1000000
```0000
````

**出力**

![](/img/build/get-started/cast-send.png)

転送がうまくいったか確認してみよう：

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```

**出力**

![](/img/build/get-started/oUsdcBobAfter.png)

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```

**出力**

![](/img/build/get-started/oUsdcHolderAfter.png)

ファウンドリーに関するより詳細なガイドについては、[ファウンドリードキュメント](https://book.getfoundry.sh/)を参照してください。 また、このガイドのコードの完全な実装は[GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/foundry)にあります。
