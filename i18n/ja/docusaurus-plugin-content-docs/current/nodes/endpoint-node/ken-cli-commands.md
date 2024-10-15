# ken CLI Commands

```bash
USAGE:
   ken [options] command [command options] [arguments...]
```

## Commands

`ken`has the following commands.

```bash
COMMANDS:
   account     Manage accounts
   attach      Start an interactive JavaScript environment (connect to node)
   console     Start an interactive JavaScript environment
   dumpconfig  Show configuration values
   dumpgenesis Dump genesis block JSON configuration to stdout (This command is supoported from Klaytn v1.7.0.)
   init        Bootstrap and initialize a new genesis block
   snapshot    A set of commands based on the snapshot
   version     Show version number
   help, h     Shows a list of commands or help for one command
```

To get a detailed usage guideline for each command, give -h option.

```bash
$ ken account -h
Manage accounts, list all existing accounts, import a private key into a new
account, create a new account or update an existing account.
 ...
Keys are stored under <DATADIR>/keystore.
It is safe to transfer the entire directory or the individual keys therein
between klay nodes by simply copying.

Make sure you backup your keys regularly.

USAGE:
   ken account command [command options] [arguments...]

COMMANDS:
     list    Print summary of existing accounts
     new     Create a new account
     update  Update an existing account
     import  Import a private key into a new account
```

```bash
$ ken init -h
init [command options] [arguments...]

The init command initializes a new genesis block and definition for the network.
This is a destructive action and changes the network in which you will be
participating.
 ...
```

## JavaScript Console

Klaytn Endpoint Node comes with JavaScript console. From the console command line, you can initiate part of Klaytn API calls to your EN. To attach to the JavaScript console, execute the following command.

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console

!instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

 >
```

attach command connects to the running node, while console command launches a node and connects to it.

```bash
   attach      Start an interactive JavaScript environment (connect to node)
   console     Start an interactive JavaScript environment
```

### Module APIs

If you type the module name on the console prompt, you will see the available properties and functions of the module. For the details of functions, please see [Klaytn API](../../../references/json-rpc/klay/account-created).

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
["0x960dba2500ab529693ef8e299210768aa0d55ec8", "0x09a04dc9ac3cd92de5ff0d45ae50ff1b618305d9", "0x36662211c072dadbf5fc1e087ddebd36df986abd", "0xbf9683cf04520eeba6d936a3478de29437c5d048"]
> 
```
