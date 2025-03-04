# 管理账户

## 列出您的账户<a id="list-your-accounts"></a>

这将返回在数据目录下创建的所有账户列表。

### ken <a id="ken"></a>

从命令行调用 CLI：

```bash
$ ken account list --datadir <DATADIR>
$ ken account list --datadir ~/kend_home
Account #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Account #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

**注意**：如果从其他节点复制密钥存储文件或删除文件，返回的账户列表顺序可能会发生变化。 因此，请确保不依赖索引，或者确保在复制或删除密钥存储文件时，检查并更新脚本中的账户索引。

### JavaScript 控制台<a id="javascript-console"></a>

使用控制台时：

```javascript
> kaia.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

## 解锁账户<a id="unlock-accounts"></a>

如果想非交互式地使用账户，则需要解锁。

### ken <a id="ken"></a>

你可以使用`--unlock "{address},{address}"`选项在命令行上解锁账户并启动 EN，该选项以逗号分隔的账户（十六进制或索引）列表作为参数，因此你可以在一个会话中以编程方式解锁账户。 如果您想通过 RPC 从 dApps 使用您的账户，这将非常有用。 `--unlock` 将解锁列表中的第一个账户。 这在以编程方式创建账户时非常有用，不需要知道实际账户就能解锁。

创建一个账户，并在账户未锁定的情况下启动一个节点：

```bash
$ ken account new --password <(echo this is not secret) --datadir <DATADIR>
$ ken --password <(echo "this is not secret") --unlock primary --datadir <DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

如果要启动一个已解锁特定账户的节点，可以使用一个地址或索引，该地址或索引指的是账户列表中的地址位置（并与创建顺序相对应）。

```bash
$ ken --unlock "0" --datadir <DATADIR>
$ ken --unlock "2" --datadir <DATADIR>
$ ken --unlock "bfc22a57999459b0c2ce6337deb9287e7a970e02" --datadir <DATADIR>
```

通过命令行可以解锁多个账户。 在这种情况下，解锁参数是一个以逗号分隔的账户地址或索引列表。

```bash
$ ken --unlock "0x407d73d8a49eeb85d32cf465507dd71d507100c1,0,5,e470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32" --datadir <DATADIR>
```

如果非交互式地使用这种结构，密码文件需要包含相关账户的密码，每行一个。

### JavaScript 控制台<a id="javascript-console"></a>

在控制台上，你还可以解锁账户（一次一个），解锁时间（以秒为单位）。

```javascript
> personal.unlockAccount(address, "password", 300)
```

请注意，我们不建议在此处使用密码参数，因为控制台历史记录会被记录下来，这样可能会危及您的账户安全。 我已经警告过你了。

## 查询账户余额<a id="check-account-balance"></a>

### ken <a id="ken"></a>

不适用

### JavaScript 控制台<a id="javascript-console"></a>

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

        console.log("kaia.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + "KAIA");

    }

    console.log("Total balance: " + totalBal + " KAIA");
};
```

然后就可以用

```javascript
> checkAllBalances();
kaia.accounts[0]: 0xd1ade25ccd3d550a7eb532ac759cac7be09c2719  balance: 63.11848 KAIA
kaia.accounts[1]: 0xda65665fc30803cb1fb7e6d86691e20b1826dee0  balance: 0 KAIA
kaia.accounts[2]: 0xe470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32  balance: 1 KAIA
kaia.accounts[3]: 0xf4dd5c3794f1fd0cdc0327a83aa472609c806e99  balance: 6 KAIA
```

由于该函数会在重启 `ken` 后消失，因此存储常用函数以便以后调用会很有帮助。

首先，将 `checkAllBalances()`函数定义保存到计算机上的一个文件中。 例如，`/Users/username/klayload.js`。 然后从交互式控制台加载文件：

```javascript
> loadScript("/Users/username/klayload.js")
true
```

该文件将修改 JavaScript 环境，就像手动输入命令一样。 请随意尝试！

