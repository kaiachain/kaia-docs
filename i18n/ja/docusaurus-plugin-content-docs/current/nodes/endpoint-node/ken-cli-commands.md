# ken CLIコマンド

このドキュメントでは、Kaia エンドポイントノードを管理するための `ken` コマンドラインインターフェース (CLI) の概要を説明します。 ken\` CLIは、開発者がKaiaネットワークと対話し、アカウントを管理し、エンドポイントノードに関連する様々な操作を実行できる強力なツールです。

- [概要](#overview)
- [基本コマンド](#basic-commands)
- [アカウント管理](#account-management)
- [JavaScriptコンソール](#javascript-console)
- [モジュールAPI](#module-apis)

## 概要

**用途：**\*

```
ken [オプション] command [コマンドオプション] [引数...].
```

ken\`には以下のコマンドがある：

**COMMANDS:**

- アカウント\` - アカウントを管理する
- attach\` - インタラクティブなJavaScript環境を起動する（ノードに接続する）。
- console\` - 対話的な JavaScript 環境を起動する。
- dumpconfig\` - 設定値を表示する
- dumpgenesis\` - genesisブロックのJSON設定を標準出力にダンプする (このコマンドはKaia v1.7.0からサポートされています).
- `init` - 新しいジェネシスブロックをブートストラップして初期化する
- `snapshot` - スナップショットに基づくコマンドセット
- version\` - バージョン番号を表示する
- help, h\` - コマンドのリストを表示するか、一つのコマンドのヘルプを表示する。

各コマンドの詳細な使用ガイドラインを得るには、`-h`オプションを指定する。

```bash
$ ken account -h
アカウントの管理、既存の全アカウントの一覧表示、秘密鍵の新規
アカウントへのインポート、新規アカウントの作成、既存アカウントの更新。
...
鍵は<DATADIR>/keystore以下に保存される。
kaiaノード間で
、ディレクトリ全体または個々の鍵をコピーするだけで安全に転送できます。
鍵は定期的にバックアップしてください。

USAGE:
ken account command [command options] [arguments...]

COMMANDS:
list 既存アカウントの概要を印刷する
new 新規アカウントを作成する
update 既存アカウントを更新する
import 秘密鍵を新規アカウントにインポートする。
```

## 基本コマンド

### ネットワークの初期化

```bash
$ ken init -h
init [コマンドオプション] [引数...]

initコマンドは新しいgenesisブロックとネットワークの定義を初期化します。
これは破壊的な動作であり、
参加するネットワークを変更します。
...
```

## アカウント管理

:::warning

パスワードをお忘れなく アカウントのパスワードを紛失すると、そのアカウントにアクセスできなくなります。 ここには「パスワードを忘れた」オプションはない。 決して忘れてはならない。

:::

Kaiaは開発者がアカウントを管理するために、`ken`と`JavaScript console`という2つの便利なコマンドラインツールを提供している。 暗号化されていない形式で秘密鍵をエクスポートすることはサポートされていません。

### データディレクトリ

キーストア・ファイルは`<DATADIR>/keystore`に保存される。 データ・ディレクトリは以下のように指定できます。 ken account`コマンドに--datadir`オプションを付けることを強く推奨する。 Endpoint Node とシームレスにアカウントを共有するために、`kend.conf` で設定した `DATA_DIR` をデータディレクトリの指すようにします。

```bash
$ ken account new --datadir<DATADIR>
$ ken account new --datadir "~/kend_home"
```

データ・ディレクトリを指定しない場合、デフォルトの場所は以下のようになる：

- **Mac**：Library/KEN\`。
- **Linux**：`~/.ken`

### アカウントコマンド

Kaia エンドポイントノードのバイナリ `ken` は `account` コマンドでアカウント管理を行う。 account\`コマンドを使うと、新しいアカウントを作成したり、既存のアカウントを一覧表示したり、秘密鍵を新しいアカウントにインポートしたり、最新の鍵形式に移行したり、パスワードを変更したりすることができる。

\*\*使用法: \*\*

```bash
ken アカウント<command> [オプション...] [引数...]。
```

\*\*コマンド

```bash
$ ken account -help
...
COMMANDS:
list 既存のアカウントの概要を印刷する
new 新しいアカウントを作成する
update 既存のアカウントを更新する
import 秘密鍵を新しいアカウントにインポートする
...
```

`ken account<command> --help`でサブコマンドの情報を得ることができる。

```bash
$ ken account list --help
list [コマンドオプション] [引数...]。]

全アカウントの簡単な概要を表示

KAIA OPTIONS:
--dbtype value ブロックチェーンストレージデータベースのタイプ ("leveldb", "badger") (default: "leveldb")
--datadir "/Users/ethan/Library/KEN" データベースとキーストアのデータディレクトリ
--keystore キーストアのディレクトリ (default = datadir 内)

DATABASE OPTIONS:
--db.no-partitioning 永続ストレージのためにパーティション分割されたデータベースを無効にする。
```

### 新規アカウントの作成

これで新しいアカウントが作成され、住所が画面に印刷される。 データ・ディレクトリの下にキーストア・ファイルが作成される。

#### カイア・キーストア・ファイル

アカウントを作成すると、キーストア・ファイルが作成される。 キーストアファイルは、トランザクションの署名に使用する、お客様固有のカイア秘密鍵の暗号化バージョンです。 キーストア・ファイル名は以下のフォーマットである：

```
UTC--<created_at UTC ISO8601>-<address hex>
```

Kaiaノード間で、ディレクトリ全体または個々のキーストア・ファイルを転送することは安全です。 別のノードから自分のノードにキーを追加する場合、アカウントの順序が変わる可能性があることに注意してください。 そのため、スクリプトやコード・スニペットでインデックスに依存しないように注意してください。

#### ken CLI

```bash
ken account new --datadir<DATADIR>
$ ken account new --password<passwordfile> --datadir<DATADIR>
$ ken account new --password <(echo $mypassword) --datadir<DATADIR>
```

:::warning

パスワードをファイルに保存したり、その他の方法で公開したりするのは良くない考えです。 パスワードファイルでパスワードフラグを使う場合は、そのファイルが自分以外には読めないように、あるいはリストアップできないようにするのが一番だ。 これを達成するには

```bash
touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
ここにパスを入力する
^D
```

:::

### アカウントのインポート

キーファイルを使用してアカウントをインポートできます。 keyfileには、暗号化されていない秘密鍵が、16進数にエンコードされた正規のEC rawバイトとして格納されているものとする。 簡単に言えば、先頭の `0x` を除いたプレーンテキストの秘密鍵である。

これは、与えられたキーファイルから暗号化されていない秘密鍵をインポートし、新しいアカウントを作成し、データ・ディレクトリの下にキーストア・ファイルを生成し、コンソールにアドレスを表示する。 今後アカウントのロックを解除するには、パスフレーズを覚えておく必要があります。

**注**\*：キーストアファイルを別のKaiaインスタンスに直接コピーできる場合、このインポート/エクスポート機構は必要ありません。

#### ken CLI

```bash
ken account import --datadir<datadir> <keyfile>
$ ken account import --password<passwordfile> --datadir<datadir> <keyfile>
```

### 口座リスト

これは、データ・ディレクトリの下に作成されたすべてのアカウントのリストを返す。

#### ken CLI

コマンドラインから、次のようにCLIを呼び出す：

```bash
$ ken account list --datadir<DATADIR>
$ ken account list --datadir ~/kend_home
Account #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Account #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

**注**\*：他のノードからキーストア・ファイルをコピーしたり、ファイルを削除したりすると、返されるアカウント・リストの順序が変わることがあります。 したがって、インデックスに依存しないようにするか、キーストア・ファイルをコピーまたは削除した場合は、スクリプトでアカウント・インデックスをチェックして更新するようにしてください。

### アカウントのロック解除

アカウントをインタラクティブに使用しない場合は、ロックを解除する必要があります。

#### ken CLI

コマンドラインで、`--unlock "{address},{address}"` オプションを使用することで、アカウントのロックを解除し、ENを起動することができます。このオプションは、カンマで区切られたアカウントのリスト（16進数またはインデックス）を引数として取るので、1つのセッションに対してプログラムでアカウントのロックを解除することができます。 これは、RPC経由でdAppsからアカウントを使用したい場合に便利です。

unlock\`はリストの最初のアカウントのロックを解除する。 これは、プログラムでアカウントを作成した場合に便利で、実際のアカウントを知らなくてもロックを解除できる。

アカウントを作成し、ロックを解除した状態でノードを開始する：

```bash
$ ken account new --password <(echo this is not secret) --datadir<DATADIR>
$ ken --password <(echo "this is not secret") --unlock primary --datadir<DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

特定のアカウントがアンロックされた状態でノードを開始したい場合は、アカウントリスト内のアドレス位置を参照するアドレスまたはインデックスを使用できます（作成順序に対応します）。

```bash
ken --unlock "0" --datadir<DATADIR>
$ ken --unlock "2" --datadir<DATADIR>
$ ken --unlock "bfc22a57999459b0c2ce6337deb9287e7a970e02" --datadir<DATADIR>
```

コマンドラインを使えば、複数のアカウントのロックを解除できる。 この場合、unlockの引数は、アカウント・アドレスまたはインデックスをカンマで区切ったリストである。

```bash
$ ken --unlock "0x407d73d8a49eeb85d32cf465507dd71d507100c1,0,5,e470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32" --datadir<DATADIR>
```

この構文を非対話的に使用する場合、パスワードファイルには、該当するアカウントのパスワードを1行に1つずつ記述する必要がある。

## JavaScriptコンソール

カイア・エンドポイント・ノードにはJavaScriptコンソールが付属しています。 コンソールのコマンドラインから、Kaia APIの一部をENに呼び出すことができます。 JavaScriptコンソールに接続するには、以下のコマンドを実行する。

JavaScriptコンソールに接続するには、ENが実行中でなければなりません。 詳しくは、[ENを起動する](https://docs.kaia.io/nodes/endpoint-node/install-endpoint-nodes/)を参照してください。 ENを起動し、以下のようにコンソールに接続する。

### 使用方法

```bash
$ kend start
kendを起動します：OK
$ ken attach --datadir ~/kend_home
Kaia JavaScript コンソールへようこそ！
インスタンス：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
datadir: ~/kend_home
modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

attach`コマンドは実行中のノードに接続し、`console\`コマンドはノードを起動してそのノードに接続する。

- attach\` - インタラクティブなJavaScript環境を起動する（ノードに接続する）。
- console\` - 対話的な JavaScript 環境を起動する。

### データディレクトリ

アカウントを作成すると、キーストア・ファイルは`<DATADIR>/keystore`に保存される。 `<DATADIR>` は `kend.conf` で設定した `DATA_DIR` である。 クイックスタートガイドの例に従えば、`~/kend_home`でなければならない。

### コンソールコマンド

personal`または`kaia\`と入力すると、利用可能な機能のリストが表示される。 このチュートリアルでは、以下の関数を訪ねます：

- `personal.newAccount()`
- personal.importRawKey()\`。
- `personal.unlockAccount()`
- `kaia.accounts`
- kaia.getBalance()\`。

### コンソールによるアカウントの作成

コンソールでは、以下の関数を呼び出してアカウントを作成することができる：

```javascript
> パーソナル.newAccount("パスフレーズ")
```

アカウントは暗号化された形式で保存されます。 このパスフレーズは、今後アカウントのロックを解除するために覚えておく必要があります。

### コンソール経由でのアカウントのインポート

```javascript
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"

// Kaiaウォレットキーを使用
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```

### コンソール経由のアカウント一覧

コンソールを使用する場合：

```javascript
> kaia.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

### コンソールからアカウントのロックを解除する

コンソールでは、時間（秒）を指定してアカウントを（1つずつ）アンロックすることもできる。

```javascript
> personal.unlockAccount(address, "password", 300)
```

コンソールの履歴が記録されるため、アカウントが危険にさらされる可能性があります。 あなたは警告されている。

### 口座残高の確認

#### JavaScriptコンソール

口座残高の確認

```javascript
> kaia.fromPeb(kaia.getBalance("{account}", "KAIA")
6.5
```

JavaScript関数ですべての残高を表示する：

```javascript
function checkAllBalances() {
  var totalBal = 0;
  for (var acctNum in kaia.accounts) {
    var acct = kaia.accounts[acctNum];
    var acctBal = kaia.fromPeb(kaia.getBalance(acct), "KAIA");
    totalBal += parseFloat(acctBal);
    console.log("kaia.accounts[" + acctNum + "]： \t" + acct + " \t残高：" + acctBal + "KAIA");
  }
  console.log("Total balance: " + totalBal + " KAIA");
}；
```

と実行することができる：

```javascript
> checkAllBalances();
kaia.accounts[0]：0xd1ade25ccd3d550a7eb532ac759cac7be09c2719 balance: 63.11848 KAIA
kaia.accounts[1]：0xda65665fc30803cb1fb7e6d86691e20b1826dee0 残高：0 KAIA
kaia.accounts[2]：0xe470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32 balance: 1 KAIA
kaia.accounts[3]：0xf4dd5c3794f1fd0cdc0327a83aa472609c806e99 残高: 6 KAIA
```

この関数は `ken` を再起動すると消えてしまうので、よく使う関数を保存しておくと後で呼び出すときに便利である。 まず、`checkAllBalances()`関数の定義をコンピューター上のファイルに保存する。 例えば、`/Users/username/klayload.js`である。 その後、対話型コンソールからファイルをロードする：

```javascript
> loadScript("/Users/username/klayload.js")
true
```

このファイルは、あたかも手動でコマンドを入力したかのように、あなたのJavaScript環境を変更する。 自由に実験してほしい！

## モジュールAPI

コンソールのプロンプトにモジュール名を入力すると、モジュールの利用可能なプロパティと機能が表示されます。 機能の詳細については、[Kaia API](https://docs.kaia.io/references/json-rpc/kaia/account-created/) をご参照ください。

```javascript
> personal
{
  listAccounts：listAccount: [...],
  listWallets：[...],
  deriveAccount: function(),
  ecRecover: function(),
  getListAccounts: function(callback),
  getListWallets: function(callback),
  importRawKey: function(),
  lockAccount: function(),
  ...
}

> personal.listAccounts
["0x960dba2500ab529693ef8e299210768aa0d55ec8", "0x09a04dc9ac3cd92de5ff0d45ae50ff1b618305d9","0x36662211c072dadbf5fc1e37087ddebd36df986abd", "0xbf9683cf04520eeba6d936a3478de29437c5d048"]
>
```