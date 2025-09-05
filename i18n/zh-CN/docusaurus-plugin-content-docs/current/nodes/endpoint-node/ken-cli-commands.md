# ken CLI 命令

本文档概述了用于管理 Kaia 端点节点的 `ken` 命令行界面 (CLI)。 `ken` CLI 是一个功能强大的工具，允许开发人员与 Kaia 网络交互、管理账户并执行与端点节点相关的各种操作。

- [Overview](#overview)
- [基本命令](#basic-commands)
- [账户管理](#account-management)
- [JavaScript控制台](#javascript-console)
- [模块应用程序接口](#module-apis)

## 概述

**用途：**

```
ken [选项] 命令 [命令选项] [参数...］
```

`ken`有以下命令：

**合作伙伴：**

- `account` - 管理账户
- attach\` - 启动交互式 JavaScript 环境（连接到节点）
- `console` - 启动交互式 JavaScript 环境
- `dumpconfig` - 显示配置值
- dumpgenesis\` - 将 genesis 块的 JSON 配置转存到 stdout（Kaia v1.7.0 支持此命令）。
- `init` - 引导和初始化一个新的创世区块
- `快照`-基于快照的一组命令
- `version` - 显示版本号
- `help, h` - 显示命令列表或一条命令的帮助信息

要获得每条命令的详细使用指南，请使用 `-h` 选项。

```bash
$ ken account -h
管理账户、列出所有现有账户、将私钥导入新的
账户、创建新账户或更新现有账户。
...
密钥存储在<DATADIR>/keystore。
在 kaia 节点间传输整个目录或其中的单个密钥
时，只需复制即可。
请确保定期备份密钥。

使用方法：
ken account 命令 [命令选项] [参数...]

命令：
list 打印现有账户摘要
new 创建新账户
update 更新现有账户
import 将私钥导入新账户
```

## 基本命令

### 初始化网络

```bash
$ ken init -h
init [command options] [arguments...]

init 命令为网络初始化一个新的创世块和定义。
这是一个破坏性操作，会更改您将
参与的网络。
...
```

## 账户管理

:::warning

记住密码 如果您丢失了账户密码，您将无法访问该账户。 这里没有 "忘记密码 "选项。 永远不要忘记。

:::

Kaia 为开发人员提供了两个方便的命令行工具："ken "和 "JavaScript 控制台"，用于管理账户。 请注意，不支持以未加密格式导出私人密钥。

### 数据目录

密钥存储文件存储在`<DATADIR>/keystore`下。 您可以按如下方式指定数据目录。 强烈建议在执行 "ken account "命令时使用"--datadir "选项。 让数据目录指向在`kend.conf`中设置的`DATA_DIR`，以便与端点节点无缝共享账户。

```bash
$ ken account new --datadir<DATADIR>
$ ken account new --datadir "~/kend_home"
```

如果未指定数据目录，默认位置如下：

- **Mac**：`~/Library/KEN`.
- **Linux**：`~/.ken`

### 账户命令

Kaia 端点节点二进制程序 `ken` 通过 `account` 命令提供账户管理。 通过命令 `account` 可以创建新账户、列出所有现有账户、将私钥导入新账户、迁移到最新的密钥格式以及更改密码。

**用途：**

```bash
$ ken account<command> [选项...] [参数...]
```

**命令：**

```bash
$ ken account -help
...
命令：
list 打印现有账户摘要
new 创建新账户
update 更新现有账户
import 将私钥导入新账户
...
```

你可以通过 `ken account<command> --help` 获取子命令的信息。

```bash
$ ken account list --help
list [command options] [arguments...]

打印所有账户的简短摘要

KAIA OPTIONS:
--dbtype value 区块链存储数据库类型（"leveldb"、"badger"）（默认："leveldb"）
--datadir "/Users/ethan/Library/KEN" 数据库和密钥库的数据目录
--keystore 密钥库的目录（默认 = datadir 内）

DATABASE OPTIONS:
--db.no-partitioning 禁用持久化存储的分区数据库
```

### 创建新账户

这将创建一个新账户，并在屏幕上打印地址。 在数据目录下创建密钥存储文件。

#### Kaia 密钥存储文件

创建账户时，会创建一个密钥存储文件。 密钥存储文件是您唯一的 Kaia 私钥的加密版本，您将用它来签署您的交易。 密钥存储文件名的格式如下：

```
UTC--<created_at UTC ISO8601>-<address hex>
```

在 Kaia 节点之间传输整个目录或其中的单个密钥存储文件是安全的。 请注意，如果您从其他节点向您的节点添加密钥，账户的顺序可能会改变。 因此，请确保不要在脚本或代码片段中依赖索引。

#### ken CLI

```bash
$ ken account new --datadir<DATADIR>
$ ken account new --password<passwordfile> --datadir<DATADIR>
$ ken account new --password <(echo $mypassword) --datadir<DATADIR>
```

:::warning

请注意，使用密码文件仅供测试之用；将密码保存在文件中或以任何其他方式暴露密码都不是好主意。 如果在密码文件中使用密码标志，最好确保该文件除了你之外，任何人都无法读取，甚至无法列出。 您可以通过以下方式实现这一目标

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
我在这里输入我的通行证
^D
```

:::

### 导入账户

您可以使用密钥文件导入账户。 密钥文件假定包含未加密的私人密钥，以十六进制编码的 EC 原始字节形式表示。 简单地说，它是一个不带前缀 "0x "的纯文本私人密钥。

从给定的密钥文件中导入未加密的私钥，创建新账户，在数据目录下生成密钥存储文件，并在控制台中打印地址。 您必须记住密码，以便将来解锁账户。

**注意**：如果可以直接将密钥存储文件复制到另一个 Kaia 实例，则不需要此导入/导出机制。

#### ken CLI

```bash
$ ken account import --datadir<datadir> <keyfile>
$ ken account import --password<passwordfile> --datadir<datadir> <keyfile>
```

### 列出您的账户

这将返回在数据目录下创建的所有账户列表。

#### ken CLI

从命令行调用 CLI：

```bash
$ ken account list --datadir<DATADIR>
$ ken account list --datadir ~/kend_home
Account #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Account #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

**注意**：如果从其他节点复制密钥存储文件或删除文件，返回的账户列表顺序可能会发生变化。 因此，请确保不依赖索引，或者确保在复制或删除密钥存储文件时，检查并更新脚本中的账户索引。

### 解锁账户

如果想非交互式使用账户，则需要解锁。

#### ken CLI

你可以使用 `--unlock "{address},{address}"`选项在命令行上解锁账户并启动 EN，该选项以逗号分隔的账户列表（以十六进制或索引为单位）作为参数，因此你可以在一个会话中以编程方式解锁账户。 如果您想通过 RPC 从 dApps 使用您的账户，这将非常有用。

`--unlock` 将解锁列表中的第一个账户。 这在以编程方式创建账户时非常有用，不需要知道实际账户就能解锁。

创建账户，并在账户未锁定的情况下启动节点：

```bash
$ ken account new --password <(echo this is not secret) --datadir<DATADIR>
$ ken --password <(echo "this is not secret") --unlock primary --datadir<DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

如果要在特定账户未锁定的情况下启动节点，可以使用一个地址或索引，该地址或索引指的是账户列表中的地址位置（与创建顺序相对应）。

```bash
$ ken --unlock "0" --datadir<DATADIR>
$ ken --unlock "2" --datadir<DATADIR>
$ ken --unlock "bfc22a57999459b0c2ce6337deb9287e7a970e02" --datadir<DATADIR>
```

通过命令行可以解锁多个账户。 在这种情况下，解锁参数是一个以逗号分隔的账户地址或索引列表。

```bash
$ ken --unlock "0x407d73d8a49eeb85d32cf465507dd71d507100c1,0,5,e470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32" --datadir<DATADIR>
```

如果非交互式地使用这种结构，密码文件需要包含相关账户的密码，每行一个。

## JavaScript 控制台

Kaia Endpoint Node 附带 JavaScript 控制台。 通过控制台命令行，您可以向您的 EN 发起部分 Kaia API 调用。 要附加到 JavaScript 控制台，请执行以下命令。

要连接 JavaScript 控制台，EN 必须处于运行状态。 更多信息，请参阅 [启动 EN](https://docs.kaia.io/nodes/endpoint-node/install-endpoint-nodes/)。 启动 EN 并连接到控制台，如下所示。

### 使用方法

```bash
$ kend start
启动 kend：OK
$ ken attach --datadir ~/kend_home
欢迎访问 Kaia JavaScript 控制台！
instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
datadir: ~/kend_home
modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

attach "命令连接运行中的节点，而 "console "命令启动节点并连接它。

- attach\` - 启动交互式 JavaScript 环境（连接到节点）
- `console` - 启动交互式 JavaScript 环境

### 数据目录

创建账户时，密钥存储文件存储在`<DATADIR>/keystore` 下。 <DATADIR>"是在 "kend.conf "中设置的 "DATA_DIR"。 如果按照快速入门指南中的示例，则必须是 `~/kend_home`。

### 控制台命令

输入 `personal` 或 `kaia` 可获得可用功能列表。 在本教程中，我们将访问以下函数：

- `personal.newAccount()`
- 个人.importRawKey()\`。
- 个人解锁账户
- `kaia.accounts`
- `kaia.getBalance()`

### 通过控制台创建账户

在控制台中，您可以调用以下函数来创建账户：

```javascript
> personal.newAccount("passphrase")
```

账户以加密格式保存。 您必须\*\*\*记住这个密码，以便将来解锁您的账户。

### 通过控制台导入账户

```javascript
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"

// 使用 Kaia 钱包密钥
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```

### 通过控制台列出账户

使用控制台时：

```javascript
> kaia.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

### 通过控制台解锁账户

您还可以在控制台中解锁账户（一次一个），解锁时间（以秒为单位）。

```javascript
> personal.unlockAccount(address, "password", 300)
```

请注意，我们不建议在此处使用密码参数，因为控制台历史记录会被记录下来，这样可能会危及您的账户安全。 我已经警告过你了。

### 查询账户余额

#### JavaScript 控制台

查看账户余额：

```javascript
> kaia.fromPeb(kaia.getBalance("{account}"), "KAIA")
6.5
```

使用 JavaScript 函数打印所有余额：

```javascript
function checkAllBalances() {
  var totalBal = 0;
  for (var acctNum in kaia.accounts) {
    var acct = kaia.accounts[acctNum];
    var acctBal = kaia.fromPeb(kaia.getBalance(acct), "KAIA");
    totalBal += parseFloat(acctBal);
    console.log("kaia.accounts[" + acctNum + "]： \t" + acct + " \tbalance：" + acctBal + "KAIA");
  }
  console.log("Total balance: " + totalBal + " KAIA");
}；
```

然后就可以用

```javascript
> checkAllBalances();
kaia.accounts[0]：0xd1ade25ccd3d550a7eb532ac759cac7be09c2719 balance: 63.11848 KAIA
kaia.accounts[1]：0xda65665fc30803cb1fb7e6d86691e20b1826dee0 balance：0 KAIA
kaia.accounts[2]：0xe470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32 balance: 1 KAIA
kaia.accounts[3]：0xf4dd5c3794f1fd0cdc0327a83aa472609c806e99 balance: 6 KAIA
```

由于该函数会在重启 `ken` 后消失，因此存储常用函数以便以后调用会很有帮助。 首先，将 "checkAllBalances() "函数定义保存到计算机上的一个文件中。 例如，`/Users/username/klayload.js`。 然后从交互式控制台加载文件：

```javascript
> loadScript("/Users/username/klayload.js")
true
```

该文件将修改 JavaScript 环境，就像手动输入命令一样。 请随意尝试！

## 模块应用程序接口

如果在控制台提示符下键入模块名称，就会看到模块的可用属性和功能。 有关功能的详细信息，请参阅 [Kaia API](https://docs.kaia.io/references/json-rpc/kaia/account-created/)。

```javascript
> personal
{
  listAccounts：[...],
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