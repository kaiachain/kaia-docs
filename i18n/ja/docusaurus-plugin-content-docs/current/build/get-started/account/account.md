# アカウントの基本

\*\*警告　パスワードを忘れないでください。 アカウントのパスワードを紛失すると、そのアカウントにアクセスできなくなります。 \*\*パスワードを忘れました。 紛失しないようにしてください。

Kaiaは開発者がアカウントを管理するために、`ken`と`JavaScript console`という2つの便利なコマンドラインツールを提供している。 暗号化されていない形式で秘密鍵をエクスポートすることはサポートされていません。

## ken <a id="ken"></a>

Kaia エンドポイントノードのバイナリ `ken` は `account` コマンドでアカウント管理を行う。 `account`コマンドを使うと、新しいアカウントの作成、既存のアカウントの一覧表示、秘密鍵の新しいアカウントへのインポート、最新の鍵フォーマットへの移行、パスワードの変更ができます。

### 使用方法<a id="usage"></a>

```bash
$ ken account <command> [options...] [arguments...]
```

\*\*コマンド

```bash
$ ken account -help
...
COMMANDS:
     list    Print summary of existing accounts
     new     Create a new account
     update  Update an existing account
     import  Import a private key into a new account
...
```

`ken account<command> --help`でサブコマンドの情報を得ることができる。

```text
$ ken account list --help
list [command options] [arguments...]

Print a short summary of all accounts

KAIA OPTIONS:
  --dbtype value                        Blockchain storage database type ("leveldb", "badger") (default: "leveldb")
  --datadir "/Users/ethan/Library/KEN"  Data directory for the databases and keystore
  --keystore                            Directory for the keystore (default = inside the datadir)

DATABASE OPTIONS:
  --db.no-partitioning  Disable partitioned databases for persistent storage
```

### データディレクトリ<a id="data-directory"></a>

キーストア・ファイルは、`<DATADIR>/keystore`に保存される。 データ・ディレクトリは以下のように指定できます。 `ken account`コマンドに--datadir`オプションを付けることを強く推奨する。 Endpoint Node とシームレスにアカウントを共有するために、`kend.conf`で設定した`DATA_DIR\` をデータディレクトリの指すようにします。

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --datadir "~/kend_home"
```

データ・ディレクトリを指定しない場合、デフォルトの場所は以下のようになる。

- Mac: `~/Library/KEN`
- Linux: `~/.ken`

## JavaScriptコンソール<a id="javascript-console"></a>

JavaScriptコンソールに接続するには、ENが実行中でなければなりません。 詳細については、[EN の起動](../../../nodes/endpoint-node/install-endpoint-nodes.md#startup-the-en) を参照してください。 ENを起動し、以下のようにコンソールに接続する。

### 使用方法<a id="usage"></a>

```bash
$ kend start
Starting kend: OK

$ ken attach --datadir ~/kend_home
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

\*\*コマンド

`personal`または`kaia`と入力すると、利用可能な機能のリストが表示される。 このチュートリアルでは、以下の関数を訪ねます。

```bash
> personal.newAccount()
> personal.importRawKey()
> personal.unlockAccount()
> kaia.accounts
> kaia.getBalance()
```

### データディレクトリ<a id="data-directory"></a>

アカウントを作成すると、キーストア・ファイルは`<DATADIR>/keystore`に保存される。 `<DATADIR>` は `kend.conf` で設定した `DATA_DIR` である。 クイックスタートガイドの例に従えば、`~/kend_home`でなければならない。 `<DATADIR>` は `kend.conf` で設定した `DATA_DIR` である。 クイックスタートガイドの例に従えば、`~/kend_home`にする必要があります。
