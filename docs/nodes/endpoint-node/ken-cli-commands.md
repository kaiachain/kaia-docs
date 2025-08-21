# ken CLI Commands

This document provides an overview of the `ken` command-line interface (CLI) for managing Kaia Endpoint Nodes. The `ken` CLI is a powerful tool that allows developers to interact with the Kaia network, manage accounts, and perform various operations related to the Endpoint Node.

- [Overview](#overview)
- [Basic Commands](#basic-commands)
- [Account Management](#account-management)
- [JavaScript Console](#javascript-console)
- [Module APIs](#module-apis)

## Overview

**USAGE:**
```
ken [options] command [command options] [arguments...]
```

`ken` has the following commands:

**COMMANDS:**
- `account` - Manage accounts
- `attach` - Start an interactive JavaScript environment (connect to node)
- `console` - Start an interactive JavaScript environment
- `dumpconfig` - Show configuration values
- `dumpgenesis` - Dump genesis block JSON configuration to stdout (This command is supported from Kaia v1.7.0.)
- `init` - Bootstrap and initialize a new genesis block
- `snapshot` - A set of commands based on the snapshot
- `version` - Show version number
- `help, h` - Shows a list of commands or help for one command

To get a detailed usage guideline for each command, give `-h` option.

```bash
$ ken account -h
Manage accounts, list all existing accounts, import a private key into a new
account, create a new account or update an existing account.
...
Keys are stored under <DATADIR>/keystore.
It is safe to transfer the entire directory or the individual keys therein
between kaia nodes by simply copying.
Make sure you backup your keys regularly.

USAGE:
ken account command [command options] [arguments...]

COMMANDS:
list    Print summary of existing accounts
new     Create a new account
update  Update an existing account
import  Import a private key into a new account
```

## Basic Commands

### Initialize Network
```bash
$ ken init -h
init [command options] [arguments...]

The init command initializes a new genesis block and definition for the network.
This is a destructive action and changes the network in which you will be
participating.
...
```

## Account Management

:::warning

Remember your password. If you lose the password of your account, you will not be able to access that account. There is no "forgot my password" option here. Never forget it.

:::

Kaia provides two handy command-line tools, `ken` and `JavaScript console`, for developers to manage accounts. Note that exporting your private key in an unencrypted format is NOT supported.

### Data Directory

Keystore files are stored under `<DATADIR>/keystore`. You can specify the data directory as below. It is highly recommended to execute `ken account` command with `--datadir` option. Make the data directory point to the `DATA_DIR` set in the `kend.conf` to seamlessly share the accounts with your Endpoint Node.

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --datadir "~/kend_home"
```

If you do not specify the data directory, the default location is as follows:

- **Mac**: `~/Library/KEN`
- **Linux**: `~/.ken`

### Account Commands

The Kaia Endpoint Node binary `ken` provides account management via the `account` command. The command `account` lets you create new accounts, lists all existing accounts, imports a private key into a new account, migrates to the newest key format, and changes your password.

**Usage:**
```bash
$ ken account <command> [options...] [arguments...]
```

**Commands:**
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

You can get info about subcommands by `ken account <command> --help`.

```bash
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

### Creating a New Account

This will create a new account and print the address on the screen. A keystore file is created under the data directory.

#### Kaia Keystore File

When you create an account, a keystore file is created. The keystore file is an encrypted version of your unique Kaia private key that you will use to sign your transactions. The keystore file name has the following format:

```
UTC--<created_at UTC ISO8601>-<address hex>
```

It is safe to transfer the entire directory or the individual keystore file therein between Kaia nodes. Note that in case you are adding keys to your node from a different node, the order of accounts may change. So make sure you do not rely on the index in your scripts or code snippets.

#### ken CLI

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

:::warning

Note that using a password file is meant for testing only; it is a bad idea to save your password in a file or expose it in any other way. If you use the password flag with a password file, best to make sure the file is not readable or even listable for anyone but you. You achieve this with:

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
I type my pass here
^D
```

:::

### Importing an Account

You can import an account using a keyfile. The keyfile is assumed to contain an unencrypted private key as canonical EC raw bytes encoded into hex. In simpler terms, it is a private key in plain text without the leading `0x`.

This imports an unencrypted private key from the given keyfile, creates a new account, generates a keystore file under the data directory, and prints the address in the console. You must remember the passphrase to unlock your account in the future.

**NOTE**: If you can directly copy your keystore files to another Kaia instance, this import/export mechanism is not needed.

#### ken CLI

```bash
$ ken account import --datadir <datadir> <keyfile>
$ ken account import --password <passwordfile> --datadir <datadir> <keyfile>
```

### List Your Accounts

This will return the list of all accounts created under the data directory.

#### ken CLI

From the command line, call the CLI with:

```bash
$ ken account list --datadir <DATADIR>
$ ken account list --datadir ~/kend_home
Account #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Account #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

**NOTE**: This order of returned account list can change if you copy keystore files from other nodes or remove the files. Therefore, make sure you either do not rely on the index or make sure if you copy or remove keystore files you check and update your account indexes in your scripts.

### Unlock Accounts

If you want to use an account non-interactively, you need to unlock it.

#### ken CLI

You can unlock accounts and start the EN on the command line with the `--unlock "{address},{address}"` option which takes a comma-separated list of accounts (in hex or index) as an argument so you can unlock the accounts programmatically for one session. This is useful if you want to use your account from dApps via RPC.

`--unlock` will unlock the first account in the list. This is useful when you created your account programmatically, you do not need to know the actual account to unlock it.

Create an account and start a node with the account unlocked:

```bash
$ ken account new --password <(echo this is not secret) --datadir <DATADIR>
$ ken --password <(echo "this is not secret") --unlock primary --datadir <DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

If you want to start a node with a specific account unlocked, you can use an address or an index which refers to the address position in the account list (and corresponds to the order of creation).

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

## JavaScript Console

Kaia Endpoint Node comes with JavaScript console. From the console command line, you can initiate part of Kaia API calls to your EN. To attach to the JavaScript console, execute the following command.

To connect to the JavaScript console, an EN must be in running status. For more information, see [Launching an EN](https://docs.kaia.io/nodes/endpoint-node/install-endpoint-nodes/). Start an EN and attach to the console as follows.

### Usage

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

`attach` command connects to the running node, while `console` command launches a node and connects to it.

- `attach` - Start an interactive JavaScript environment (connect to node)
- `console` - Start an interactive JavaScript environment

### Data Directory

When you create an account, the keystore file is stored under `<DATADIR>/keystore`. The `<DATADIR>` is the `DATA_DIR` set in the `kend.conf`. If you follow the quick start guide with the given example, it must be `~/kend_home`.

### Console Commands

Type `personal` or `kaia` to get the list of available functions. In this tutorial, we are going to visit the following functions:

- `personal.newAccount()`
- `personal.importRawKey()`
- `personal.unlockAccount()`
- `kaia.accounts`
- `kaia.getBalance()`

### Creating Accounts via Console

On the console, you can call the following function to create an account:

```javascript
> personal.newAccount("passphrase")
```

The account is saved in an encrypted format. You **must** remember this passphrase to unlock your account in the future.

### Importing Accounts via Console

```javascript
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"

// Using a Kaia wallet key
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```

### List Accounts via Console

When using the console:

```javascript
> kaia.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

### Unlock Accounts via Console

On the console you can also unlock accounts (one at a time) for a duration (in seconds).

```javascript
> personal.unlockAccount(address, "password", 300)
```

Note that we do NOT recommend using the password argument here, since the console history is logged, so you may compromise your account. You have been warned.

### Check Account Balance

#### JavaScript Console

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

Since this function will disappear after restarting `ken`, it can be helpful to store commonly used functions to be called later. First, save the `checkAllBalances()` function definition to a file on your computer. For example, `/Users/username/klayload.js`. Then load the file from the interactive console:

```javascript
> loadScript("/Users/username/klayload.js")
true
```

The file will modify your JavaScript environment as if you have typed the commands manually. Feel free to experiment!

## Module APIs

If you type the module name on the console prompt, you will see the available properties and functions of the module. For the details of functions, please see [Kaia API](https://docs.kaia.io/references/json-rpc/kaia/account-created/).

```javascript
> personal
{
  listAccounts: [...],
  listWallets: [...],
  deriveAccount: function(),
  ecRecover: function(),
  getListAccounts: function(callback),
  getListWallets: function(callback),
  importRawKey: function(),
  lockAccount: function(),
  ...
}

> personal.listAccounts
["0x960dba2500ab529693ef8e299210768aa0d55ec8", "0x09a04dc9ac3cd92de5ff0d45ae50ff1b618305d9", "0x36662211c072dadbf5fc1e37087ddebd36df986abd", "0xbf9683cf04520eeba6d936a3478de29437c5d048"]
>
```