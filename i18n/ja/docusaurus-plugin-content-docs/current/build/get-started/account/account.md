# Account Basics

**`WARNING`**: Remember your password. If you lose the password of your account, you will not be able to access that account. **There is no** _**forgot my password**_ **option here. Never forget it.**

Klaytn provides two handy command-line tools, `ken` and `JavaScript console`, for developers to manage accounts. Note that exporting your private key in an unencrypted format is NOT supported.

## ken <a id="ken"></a>

The Klaytn Endpoint Node binary `ken` provides account management via the `account` command. The command `account` lets you create new accounts, lists all existing accounts, imports a private key into a new account, migrates to the newest key format, and changes your password.

### Usage <a id="usage"></a>

```bash
$ ken account <command> [options...] [arguments...]
```

**Commands**

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

```text
$ ken account list --help
list [command options] [arguments...]

Print a short summary of all accounts

KLAY OPTIONS:
  --dbtype value                        Blockchain storage database type ("leveldb", "badger") (default: "leveldb")
  --datadir "/Users/ethan/Library/KEN"  Data directory for the databases and keystore
  --keystore                            Directory for the keystore (default = inside the datadir)

DATABASE OPTIONS:
  --db.no-partitioning  Disable partitioned databases for persistent storage
```

### Data Directory <a id="data-directory"></a>

Keystore files are stored under `<DATADIR>/keystore`. You can specify the data directory as below. It is highly recommended to execute `ken account` command with `--datadir` option. Make the data directory point to the `DATA_DIR` set in the `kend.conf` to seamlessly share the accounts with your Endpoint Node.

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --datadir "~/kend_home"
```

If you do not specify the data directory, the default location is as follows.

- Mac: `~/Library/KEN`
- Linux: `~/.ken`

## JavaScript Console <a id="javascript-console"></a>

To connect to the JavaScript console, an EN must be in running status. For more information, see [Launching an EN](../../smart-contracts/deploy/ken.md). Start an EN and attach to the console as follows.

### Usage <a id="usage"></a>

```bash
$ kend start
Starting kend: OK

$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

**Commands**

Type `personal` or `klay` to get the list of available functions. In this tutorial, we are going to visit the following functions.

```bash
> personal.newAccount()
> personal.importRawKey()
> personal.unlockAccount()
> klay.accounts
> klay.getBalance()
```

### Data Directory <a id="data-directory"></a>

When you create an account, the keystore file is stored under `<DATADIR>/keystore`. The `<DATADIR>` is the `DATA_DIR` set in the `kend.conf`. If you follow the quick start guide with the given example, it must be `~/kend_home`.
