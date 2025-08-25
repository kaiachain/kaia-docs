# ken CLI 命令

本文件概述用於管理 Kaia Endpoint 節點的 `ken` 指令行介面 (CLI)。 `ken` CLI 是一個功能強大的工具，它允許開發人員與 Kaia 網路互動、管理帳號，以及執行各種與 Endpoint Node 相關的作業。

- [Overview](#overview)
- [基本指令](#basic-commands)
- [帳戶管理](#account-management)
- [JavaScript Console](#javascript-console)
- [Module APIs](#module-apis)

## 概述

**用途：**

```
ken [選項] 指令 [指令選項] [參數...]
```

`ken` 具有下列指令：

**合作夥伴：**

- `account` - 管理帳戶
- `attach` - 啟動互動式 JavaScript 環境 (連接到節點)
- `console` - 啟動互動式 JavaScript 環境
- `dumpconfig` - 顯示設定值
- `dumpgenesis` - Dump genesis 區塊 JSON 配置到 stdout (此指令從 Kaia v1.7.0 開始支援。)
- `init` - 啟動和初始化新的創世紀區塊
- `snapshot` - 基於快照的指令集
- `version` - 顯示版本號碼
- `help, h` - 顯示命令清單或單一命令的說明

若要取得每條指令的詳細使用指引，請給予 `-h` 選項。

```bash
$ ken account -h
管理帳號、列出所有現有帳號、將私密金鑰匯入新的
帳號、建立新帳號或更新現有帳號。
...
金鑰存放在<DATADIR>/keystore。
在 kaia 節點間傳輸整個目錄或其中的個別金鑰是安全的，只要複製
即可。
請務必定期備份您的金鑰。

使用方法：
ken account 命令 [命令選項] [參數...]

命令：
list 列印現有帳戶的摘要
new 建立新帳戶
update 更新現有帳戶
import 將私人密碼匙匯入新帳戶
```

## 基本指令

### 初始化網路

```bash
$ ken init -h
init [command options] [arguments...]

init 指令會為網路初始化新的 genesis 區塊和定義。
這是一個破壞性的動作，並會改變您將
參與的網路。
...
```

## 帳戶管理

:::warning

記住您的密碼。 如果您遺失帳戶密碼，將無法存取該帳戶。 這裡沒有「忘記密碼」選項。 永遠不要忘記

:::

Kaia 提供兩個方便的命令列工具，`ken` 和`JavaScript 控制台`，供開發人員管理帳號。 請注意，不支援以未加密的格式匯出您的私人密碼匙。

### 資料目錄

Keystore 檔案儲存在 `<DATADIR>/keystore`。 您可以如下指定資料目錄。 強烈建議使用 `--datadir` 選項執行 `ken account` 指令。 讓資料目錄指向在 `kend.conf` 中設定的 `DATA_DIR`，以便與您的 Endpoint 節點無縫共用帳號。

```bash
$ ken account new --datadir<DATADIR>
$ ken account new --datadir "~/kend_home"
```

如果未指定資料目錄，預設位置如下：

- **Mac**：`~/Library/KEN`
- **Linux**：`~/.ken`

### 帳戶指令

Kaia 端點節點二進位 `ken` 透過 `account` 指令提供帳號管理。 指令 `account` 可讓您建立新帳號、列出所有現有帳號、將私密金鑰匯入新帳號、轉移至最新的金鑰格式，以及變更密碼。

**用途：**

```bash
$ ken account<command> [選項...] [參數...]
```

**指令：**

```bash
$ ken account -help
...
命令：
list 列印現有帳號的摘要
new 建立新帳號
update 更新現有帳號
import 將私人密碼匙匯入新帳號
...
```

您可以透過 `ken account<command> --help` 取得子指令的相關資訊。

```bash
$ ken account list --help
list [command options] [arguments...]

列印所有帳號的簡短摘要

KAIA OPTIONS:
--dbtype value 區塊鏈儲存資料庫類型 ("leveldb"、"badger「) (預設：」leveldb")
--datadir "/Users/ethan/Library/KEN" 資料庫和 keystore 的資料目錄
--keystore keystore 的目錄 (預設 = 在 datadir 內)

DATABASE OPTIONS:
--db.no-partitioning 禁用持久化儲存的分區資料庫
```

### 建立新帳戶

這將會建立一個新帳戶，並將地址列印在螢幕上。 在資料目錄下會建立一個 keystore 檔案。

#### Kaia 密鑰庫檔案

建立帳戶時，會建立一個 keystore 檔案。 keystore 檔案是您唯一 Kaia 私密金鑰的加密版本，您將用它來簽署您的交易。 keystore 檔案名稱的格式如下：

```
UTC--<created_at UTC ISO8601>-<address hex>
```

在 Kaia 節點之間傳輸整個目錄或其中的個別 keystore 檔案是安全的。 請注意，如果您從其他節點新增金鑰到您的節點，帳號的順序可能會改變。 因此，請確保您的腳本或程式碼片段不依賴索引。

#### ken CLI

```bash
$ ken account new --datadir<DATADIR>
$ ken account new --password<passwordfile> --datadir<DATADIR>
$ ken account new --password <(echo $mypassword) --datadir<DATADIR>
```

:::warning

請注意，使用密碼檔案僅供測試之用；將密碼儲存在檔案中或以任何其他方式揭露密碼都不是好主意。 如果您在密碼檔案中使用密碼標誌，最好確保除了您之外，任何人都無法讀取或列出該檔案。 您可以通過以下方式實現這一目標：

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
我在這裡輸入我的通行證
^D
```

:::

### 匯入帳戶

您可以使用密鑰檔案匯入帳戶。 密碼匙檔案假設包含未加密的私人密碼匙，以典範 EC 原始位元組編碼為十六進位。 簡單來說，它是一個不含前導 `0x` 的純文字私人密碼匙。

這會從指定的 keyfile 匯入未加密的私人密碼匙，建立新帳戶，在資料目錄下產生 keystore 檔案，並在控制台列印地址。 您必須記住密碼，以後才能解鎖您的帳戶。

\*\* 注意\*\*：如果您可以直接複製您的 keystore 檔案到另一個 Kaia 範例，就不需要這個匯入/匯出機制。

#### ken CLI

```bash
$ ken account import --datadir<datadir> <keyfile>
$ ken account import --password<passwordfile> --datadir<datadir> <keyfile>
```

### 列出您的帳戶

這將會傳回在資料目錄下建立的所有帳號清單。

#### ken CLI

從命令列中，以下列方式呼叫 CLI：

```bash
$ ken account list --datadir<DATADIR>
$ ken account list --datadir ~/kend_home
Account #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Account #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

\*\* 注意\*\*：如果您從其他節點複製密鑰儲存檔案或移除檔案，傳回的帳戶清單順序可能會改變。 因此，請確保您不依賴索引，或確保如果您複製或移除 keystore 檔案，請檢查並在腳本中更新您的帳戶索引。

### 解鎖帳戶

如果您想要非互動地使用帳戶，您需要解除鎖定。

#### ken CLI

您可以使用 `--unlock "{address},{address}"`選項在命令列上解除鎖定帳號並啟動 EN，該選項使用逗號分隔的帳號清單（以十六進制或索引為單位）作為參數，因此您可以程式化地在一次會話中解除鎖定帳號。 如果您想透過 RPC 從 dApps 使用您的帳戶，這將非常有用。

`--unlock` 會解除鎖定清單中的第一個帳號。 當您以程式化方式建立帳號時，此功能非常有用，您不需要知道實際帳號就能解除鎖定。

建立帳號，並在帳號未鎖定的情況下啟動節點：

```bash
$ ken account new --password <(echo this is not secret) --datadir<DATADIR>
$ ken --password <(echo "this is not secret") --unlock primary --datadir<DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

如果要在特定帳戶未鎖定的情況下啟動節點，可以使用地址或索引，該索引指的是帳戶清單中的地址位置（並與建立的順序對應）。

```bash
$ ken --unlock "0" --datadir<DATADIR>
$ ken --unlock "2" --datadir<DATADIR>
$ ken --unlock "bfc22a57999459b0c2ce6337deb9287e7a970e02" --datadir<DATADIR>
```

命令列可讓您解除鎖定多個帳號。 在這種情況下，解鎖的參數是以逗號分隔的帳號位址或索引清單。

```bash
$ ken --unlock "0x407d73d8a49eeb85d32cf465507dd71d507100c1,0,5,e470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32" --datadir<DATADIR>
```

如果非互動地使用此結構，您的密碼檔將需要包含相關帳戶的各自密碼，每行一個。

## JavaScript 控制檯

Kaia Endpoint Node 附帶 JavaScript 控制檯。 通過控制檯命令行，您可以向您的 EN 發起部分 Kaia API 調用。 要附加到 JavaScript 控制檯，請執行以下命令。

要連線到 JavaScript 主控台，EN 必須處於執行狀態。 如需詳細資訊，請參閱 [啟動 EN](https://docs.kaia.io/nodes/endpoint-node/install-endpoint-nodes/)。 啟動 EN 並附加到控制台，如下所示。

### 使用方式

```bash
$ kend start
Starting kend：OK
$ ken attach --datadir ~/kend_home
歡迎來到 Kaia JavaScript 控制台！
instance：Kaia/vX.X.X/XXXX-XXXX/goX.X.X
datadir: ~/kend_home
modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

`attach` 指令會連線到執行中的節點，而 `console` 指令則會啟動節點並連線到它。

- `attach` - 啟動互動式 JavaScript 環境 (連接到節點)
- `console` - 啟動互動式 JavaScript 環境

### 資料目錄

建立帳戶時，keystore 檔案會儲存在 `<DATADIR>/keystore`。 <DATADIR>`是在`kend.conf`中設定的`DATA_DIR`。 如果您依照快速入門指南所給的範例，則必須是 `~/kend_home\`。

### 控制台指令

輸入 `personal` 或 `kaia` 取得可用功能清單。 在本教程中，我們將訪問以下函數：

- `personal.newAccount()`
- `personal.importRawKey()`
- `personal.unlockAccount()`
- `kaia.accounts`
- `kaia.getBalance()`

### 透過控制台建立帳號

在主控台上，您可以呼叫以下函式來建立帳戶：

```javascript
> personal.newAccount("passphrase")
```

帳戶以加密格式儲存。 您 \*\* 必須\*\*記住此密碼，以便日後解鎖您的帳戶。

### 透過控制台匯入帳號

```javascript
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"

// 使用 Kaia 金鑰
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```

### 透過控制台列出帳號

使用控制台時：

```javascript
> kaia.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

### 透過控制台解鎖帳戶

在主控台上，您也可以解除鎖定帳號（一次一個）的持續時間（以秒為單位）。

```javascript
> personal.unlockAccount(address, "password", 300)
```

請注意，我們不建議在此使用密碼參數，因為控制台的歷史記錄會被記錄下來，所以您可能會危及您的帳戶。 我已經警告過你了。

### 檢查帳戶餘額

#### JavaScript 控制台

檢查您的帳戶餘額：

```javascript
> kaia.fromPeb(kaia.getBalance("{account}"), "KAIA")
6.5
```

使用 JavaScript 函式列印所有餘額：

```javascript
function checkAllBalances() {
  var totalBal = 0;
  for (var acctNum in kaia.accounts) {
    var acct = kaia.accounts[acctNum];
    var acctBal = kaia.fromPeb(kaia.getBalance(acct), "KAIA");
    totalBal += parseFloat(acctBal);
    console.log("kaia.accounts[" + acctNum + "]： \t" + acct + " \t結餘：" + acctBal + "KAIA");
  }
  console.log("Total balance: " + totalBal + " KAIA");
}；
```

然後就可以用來執行：

```javascript
> checkAllBalances();
kaia.accounts[0]：0xd1ade25ccd3d550a7eb532ac759cac7be09c2719 結餘: 63.11848 KAIA
kaia.accounts[1]：0xda65665fc30803cb1fb7e6d86691e20b1826dee0 balance：0 KAIA
kaia.accounts[2]：0xe470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32 結餘: 1 KAIA
kaia.accounts[3]：0xf4dd5c3794f1fd0cdc0327a83aa472609c806e99 結餘: 6 KAIA
```

由於此函式會在重新啟動 `ken` 後消失，因此儲存常用的函式以便稍後呼叫，會很有幫助。 首先，將「checkAllBalances()」函式定義儲存到電腦上的檔案。 例如，`/Users/username/klayload.js`。 然後從互動式主控台載入檔案：

```javascript
> loadScript("/Users/username/klayload.js")
true
```

檔案會修改您的 JavaScript 環境，就像您手動輸入指令一樣。 請隨意嘗試！

## 模塊應用程序接口

如果在控制檯提示符下鍵入模塊名稱，就會看到模塊的可用屬性和功能。 詳細功能請參考 [Kaia API](https://docs.kaia.io/references/json-rpc/kaia/account-created/)。

```javascript
> 個人
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