# 賬戶基礎知識

**警告**\*：記住您的密碼。 如果您丟失了賬戶密碼，您將無法訪問該賬戶。 **這裡沒有** _**忘記密碼**_ \*\*選項。 永遠不要忘記。

Kaia 為開發人員提供了兩個方便的命令行工具："ken "和 "JavaScript 控制檯"，用於管理賬戶。 請注意，不支持以未加密格式導出私人密鑰。

## ken <a id="ken"></a>

Kaia 端點節點二進製程序 `ken` 通過 `account` 命令提供賬戶管理。 通過命令 `account` 可以創建新賬戶、列出所有現有賬戶、將私鑰導入新賬戶、遷移到最新的密鑰格式以及更改密碼。

### 使用方法<a id="usage"></a>

```bash
$ ken account <command> [options...] [arguments...]
```

**命令**

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

你可以通過 `ken account<command> --help` 獲取子命令的信息。

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

### 數據目錄<a id="data-directory"></a>

密鑰存儲文件存儲在`<DATADIR>/keystore`下。 您可以按如下方式指定數據目錄。 強烈建議在執行 "ken account "命令時使用"--datadir "選項。 讓數據目錄指向在`kend.conf`中設置的`DATA_DIR`，以便與端點節點無縫共享賬戶。

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --datadir "~/kend_home"
```

如果未指定數據目錄，默認位置如下。

- Mac: `~/Library/KEN`
- Linux: `~/.ken`

## JavaScript 控制檯<a id="javascript-console"></a>

要連接 JavaScript 控制檯，EN 必須處於運行狀態。 For more information, see [Launching an EN](../../../nodes/endpoint-node/install-endpoint-nodes.md#startup-the-en). 啟動 EN 並連接到控制檯，如下所示。

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

**命令**

輸入 `personal` 或 `kaia` 可獲得可用功能列表。 在本教程中，我們將訪問以下函數。

```bash
> personal.newAccount()
> personal.importRawKey()
> personal.unlockAccount()
> kaia.accounts
> kaia.getBalance()
```

### 數據目錄<a id="data-directory"></a>

創建賬戶時，密鑰存儲文件存儲在`<DATADIR>/keystore` 下。 `<DATADIR>`是在 "kend.conf "中設置的 "DATA_DIR"。 如果按照快速入門指南中的示例，則必須是 `~/kend_home`。
