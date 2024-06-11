# Manage Accounts

## List Your Accounts <a id="list-your-accounts"></a>

This will return the list of all accounts created under the data directory.

### ken <a id="ken"></a>

From the command line, call the CLI with:

```bash
$ ken account list --datadir <DATADIR>
$ ken account list --datadir ~/kend_home
Account #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Account #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

**NOTE**: This order of returned account list can change if you copy keystore files from other nodes or remove the files. Therefore, make sure you either do not rely on the index or make sure if you copy or remove keystore files you check and update your account indexes in your scripts.

### JavaScript Console <a id="javascript-console"></a>

When using the console:

```javascript
> kaia.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

## Unlock Accounts <a id="unlock-accounts"></a>

If you want to use an account non-interactively, you need to unlock it.

### ken <a id="ken"></a>

You can unlock accounts and start the EN on the command line with the `--unlock "{address},{address}"` option which takes a comma-separated list of accounts \(in hex or index\) as an argument so you can unlock the accounts programmatically for one session. This is useful if you want to use your account from dApps via RPC. `--unlock` will unlock the first account in the list. This is useful when you created your account programmatically, you do not need to know the actual account to unlock it.

Create an account and start a node with the account unlocked:

```bash
$ ken account new --password <(echo this is not secret) --datadir <DATADIR>
$ ken --password <(echo "this is not secret") --unlock primary --datadir <DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

If you want to start a node with a specific account unlocked, you can use an address or an index which refers to the address position in the account list \(and corresponds to the order of creation\).

```bash
$ ken --unlock "0" --datadir <DATADIR>
$ ken --unlock "2" --datadir <DATADIR>
$ ken --unlock "bfc22a57999459b0c2ce6337deb9287e7a970e02" --datadir <DATADIR>
```

The command line allows you to unlock multiple accounts. In this case, the argument to unlock is a comma-separated list of account addresses or indexes.

```bash
$ ken --unlock "0x407d73d8a49eeb85d32cf465507dd71d507100c1,0,5,e470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32" --datadir <DATADIR>
```

If this construction is used non-interactively, your password file will need to contain the respective passwords for the accounts in question, one per line.

### JavaScript Console <a id="javascript-console"></a>

On the console you can also unlock accounts \(one at a time\) for a duration \(in seconds\).

```javascript
> personal.unlockAccount(address, "password", 300)
```

Note that we do NOT recommend using the password argument here, since the console history is logged, so you may compromise your account. You have been warned.

## Check Account Balance <a id="check-account-balance"></a>

### ken <a id="ken"></a>

n/a

### JavaScript Console <a id="javascript-console"></a>

To check your account balance:

```javascript
> kaia.fromPeb(kaia.getBalance("{account}"), "KAIA")
6.5
```

Print all balances with a JavaScript function:

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

That can then be executed with:

```javascript
> checkAllBalances();
kaia.accounts[0]: 0xd1ade25ccd3d550a7eb532ac759cac7be09c2719  balance: 63.11848 KAIA
kaia.accounts[1]: 0xda65665fc30803cb1fb7e6d86691e20b1826dee0  balance: 0 KAIA
kaia.accounts[2]: 0xe470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32  balance: 1 KAIA
kaia.accounts[3]: 0xf4dd5c3794f1fd0cdc0327a83aa472609c806e99  balance: 6 KAIA
```

Since this function will disappear after restarting `ken`, it can be helpful to store commonly used functions to be called later.

First, save the `checkAllBalances()` function definition to a file on your computer. For example, `/Users/username/klayload.js`. Then load the file from the interactive console:

```javascript
> loadScript("/Users/username/klayload.js")
true
```

The file will modify your JavaScript environment as if you have typed the commands manually. Feel free to experiment!

