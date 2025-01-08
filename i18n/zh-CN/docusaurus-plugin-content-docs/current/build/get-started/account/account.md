# 账户基础知识

**警告**\*：记住您的密码。 如果您丢失了账户密码，您将无法访问该账户。 **这里没有** _**忘记密码**_ \*\*选项。 永远不要忘记。

Kaia 为开发人员提供了两个方便的命令行工具："ken "和 "JavaScript 控制台"，用于管理账户。 请注意，不支持以未加密格式导出私人密钥。

## ken <a id="ken"></a>

Kaia 端点节点二进制程序 `ken` 通过 `account` 命令提供账户管理。 通过命令 `account` 可以创建新账户、列出所有现有账户、将私钥导入新账户、迁移到最新的密钥格式以及更改密码。

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

你可以通过 `ken account<command> --help` 获取子命令的信息。

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

### 数据目录<a id="data-directory"></a>

密钥存储文件存储在`<DATADIR>/keystore`下。 您可以按如下方式指定数据目录。 强烈建议在执行 "ken account "命令时使用"--datadir "选项。 让数据目录指向在`kend.conf`中设置的`DATA_DIR`，以便与端点节点无缝共享账户。

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --datadir "~/kend_home"
```

如果未指定数据目录，默认位置如下。

- Mac: `~/Library/KEN`
- Linux: `~/.ken`

## JavaScript 控制台<a id="javascript-console"></a>

要连接 JavaScript 控制台，EN 必须处于运行状态。 更多信息，请参阅 [启动 EN](./../smart-contracts/deploy/ken.md)。 启动 EN 并连接到控制台，如下所示。

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

输入 `personal` 或 `kaia` 可获得可用功能列表。 在本教程中，我们将访问以下函数。

```bash
> personal.newAccount()
> personal.importRawKey()
> personal.unlockAccount()
> kaia.accounts
> kaia.getBalance()
```

### 数据目录<a id="data-directory"></a>

创建账户时，密钥存储文件存储在`<DATADIR>/keystore` 下。 `<DATADIR>`是在 "kend.conf "中设置的 "DATA_DIR"。 如果按照快速入门指南中的示例，则必须是 `~/kend_home`。
