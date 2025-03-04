# 管理賬戶

## 列出您的賬戶<a id="list-your-accounts"></a>

這將返回在數據目錄下創建的所有賬戶列表。

### ken <a id="ken"></a>

從命令行調用 CLI：

```bash
$ ken account list --datadir <DATADIR>
$ ken account list --datadir ~/kend_home
Account #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Account #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

**注意**：如果從其他節點複製密鑰存儲文件或刪除文件，返回的賬戶列表順序可能會發生變化。 因此，請確保不依賴索引，或者確保在複製或刪除密鑰存儲文件時，檢查並更新腳本中的賬戶索引。

### JavaScript 控制檯<a id="javascript-console"></a>

使用控制檯時：

```javascript
> kaia.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

## 解鎖賬戶<a id="unlock-accounts"></a>

如果想非交互式地使用賬戶，則需要解鎖。

### ken <a id="ken"></a>

你可以使用`--unlock "{address},{address}"`選項在命令行上解鎖賬戶並啟動 EN，該選項以逗號分隔的賬戶（十六進制或索引）列表作為參數，因此你可以在一個會話中以編程方式解鎖賬戶。 如果您想通過 RPC 從 dApps 使用您的賬戶，這將非常有用。 `--unlock` 將解鎖列表中的第一個賬戶。 這在以編程方式創建賬戶時非常有用，不需要知道實際賬戶就能解鎖。

創建一個賬戶，並在賬戶未鎖定的情況下啟動一個節點：

```bash
$ ken account new --password <(echo this is not secret) --datadir <DATADIR>
$ ken --password <(echo "this is not secret") --unlock primary --datadir <DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

如果要啟動一個已解鎖特定賬戶的節點，可以使用一個地址或索引，該地址或索引指的是賬戶列表中的地址位置（並與創建順序相對應）。

```bash
$ ken --unlock "0" --datadir <DATADIR>
$ ken --unlock "2" --datadir <DATADIR>
$ ken --unlock "bfc22a57999459b0c2ce6337deb9287e7a970e02" --datadir <DATADIR>
```

通過命令行可以解鎖多個賬戶。 在這種情況下，解鎖參數是一個以逗號分隔的賬戶地址或索引列表。

```bash
$ ken --unlock "0x407d73d8a49eeb85d32cf465507dd71d507100c1,0,5,e470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32" --datadir <DATADIR>
```

如果非交互式地使用這種結構，密碼文件需要包含相關賬戶的密碼，每行一個。

### JavaScript 控制檯<a id="javascript-console"></a>

在控制檯上，你還可以解鎖賬戶（一次一個），解鎖時間（以秒為單位）。

```javascript
> personal.unlockAccount(address, "password", 300)
```

請注意，我們不建議在此處使用密碼參數，因為控制檯歷史記錄會被記錄下來，這樣可能會危及您的賬戶安全。 我已經警告過你了。

## 查詢賬戶餘額<a id="check-account-balance"></a>

### ken <a id="ken"></a>

不適用

### JavaScript 控制檯<a id="javascript-console"></a>

查看賬戶餘額：

```javascript
> kaia.fromPeb(kaia.getBalance("{account}"), "KAIA")
6.5
```

使用 JavaScript 函數打印所有餘額：

```javascript
function checkAllBalances() {
    var totalBal = 0;
    for (var acctNum in kaia.accounts) {
        var acct = kaia.accounts[acctNum];

        var acctBal = kaia.fromPeb(kaia.getBalance(acct), "KAIA");
        totalBal += parseFloat(acctBal);

        console.log("kaia.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + "KAIA");

    }

    console.log("Total balance: " + totalBal + " KAIA");
};
```

然後就可以用

```javascript
> checkAllBalances();
kaia.accounts[0]: 0xd1ade25ccd3d550a7eb532ac759cac7be09c2719  balance: 63.11848 KAIA
kaia.accounts[1]: 0xda65665fc30803cb1fb7e6d86691e20b1826dee0  balance: 0 KAIA
kaia.accounts[2]: 0xe470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32  balance: 1 KAIA
kaia.accounts[3]: 0xf4dd5c3794f1fd0cdc0327a83aa472609c806e99  balance: 6 KAIA
```

由於該函數會在重啟 `ken` 後消失，因此存儲常用函數以便以後調用會很有幫助。

首先，將 `checkAllBalances()`函數定義保存到計算機上的一個文件中。 例如，`/Users/username/klayload.js`。 然後從交互式控制檯加載文件：

```javascript
> loadScript("/Users/username/klayload.js")
true
```

該文件將修改 JavaScript 環境，就像手動輸入命令一樣。 請隨意嘗試！

