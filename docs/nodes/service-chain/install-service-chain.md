# Install Service Chain

## Intended Audience <a id="intended-audience"></a>

- Companies that want to build blockchains for Metaverse, GameFi, and NFTs
- dApp developers who need high TPS, minimal transaction fees, and data privacy.  
- Anyone who wants to build a local private network or a ledger database for testing.

## ServiceChain Overview <a id="service-chain-overview"></a>

ServiceChain is an enterprise-level blockchain to meet companies' requirements such as value transfer, security, high performance, and customization. Kaia ServiceChain provides the following features:

- Immediate finality
- Token transfer between Kaia chains
- Data anchoring to the main chain for data integrity
- Multi-sig bridge contract to meet enterprise-level security requirements

![](/img/nodes/sc-overview.png)


Read the [Kaia Scaling Solution](../../learn/scaling-solutions.md) for more details about the ServiceChain. And the following videos will help you understand Kaia ServiceChain.

- [Horizontal Scaling through Service Chain in Kaia | TXGX 2019](https://www.youtube.com/watch?v=8yQc5FQysJc)
- [High Availability Architecture of Kaia Service Chain | TXGX 2019](https://www.youtube.com/watch?v=HcdhWtXPuR0)


## Download <a id="download"></a>

You can get packages for SCN, SPN, and SEN in the [download page](../downloads/downloads.md).

## Installation <a id="installation-guide"></a>

This chapter explains the **Service Chain Consensus Node \(SCN\)** installation.

### Linux Archive Distribution <a id="linux-archive-distribution"></a>

The archive file for Service Chain Consensus Node has the following directory layout.

| File Name | File Description |
| :--- | :--- |
| bin/kscn | SCN executable file |
| bin/kscnd | SCN start/termination script file |
| conf/kscnd.conf | SCN configuration file |

The archive file for homi binary has the following directory layout.

| File Name | File Description |
| :--- | :--- |
| bin/homi | HOMI executable file |

The installation is the uncompression of the downloaded package.

```text
$ tar zxf kscn-vX.X.X-XXXXX-amd64.tar.gz
$ tar zxf homi-vX.X.X-XXXXX-amd64.tar.gz
```

### RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

You can install the downloaded RPM file with the following `yum` command.

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
$ yum install homi-vX.X.X.el7.x86_64.rpm
```

### Installed Location <a id="scn-configuration"></a>

The Kaia Linux package consists of the executable binary and the configuration file structured as follows.

| File Name | Location |
| :--- | :--- |
| kscn | /usr/bin/kscn |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |
| homi | /usr/bin/homi |

## Configuration <a id="configuration"></a>

This page explains the configuration of SCNs to form a consensus network.

If you installed archive distribution, you can find the binaries and the config file in the directories you extracted the archives. Below is an example of command execution.
```bash
$ homi-darwin-amd64/bin/homi setup ...
$ kscn-darwin-amd64/bin/kscnd start
$ vi kscn-darwin-amd64/conf/kscnd.conf
```

In this tutorial, we will not always specify the full path to the command.
 
### Creation of a Genesis File <a id="creation-of-a-genesis-file"></a>

First, you should create a genesis file and a nodekey file for your own service chain. You can create them using homi like below.
```bash
$ homi setup --gen-type local --cn-num 1 --servicechain -o ./homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/Kaia.json
Created :  homi-output/Kaia_txpool.json
```
 
Below are examples of genesis file and nodekey file.
```bash
$ cat homi-output/scripts/genesis.json
{
    "config": {
        "chainId": 1000,
        "istanbul": {
            "epoch": 3600,
            "policy": 0,
            "sub": 22
        },
        "unitPrice": 0,
        "deriveShaImpl": 2,
        "governance": null
    },
    "timestamp": "0x5dca0732",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f85ad594f8690562c0839c44b17af421f7aaaa9f12dcc62bb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "governanceData": null,
    "blockScore": "0x1",
    "alloc": {
        "f8690562c0839c44b17af421f7aaaa9f12dcc62b": {
            "balance": "0x2540be400"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}   
```

```bash      
$ cat homi-output/keys/nodekey1                                                                                                                                 
0c28c77ce5c2ca9e495b860f190ed7dfe7bd5c1a2e5f816587eb4d3d9566df44
```

Please change the chainID in the genesis file. Use your own number to prevent a replay attack.
(Do not use the same chainID with Kaia Mainnet (8217) and Kairos (1001))

If you want, you can change the pre-funded addresses by editing `"alloc"` in the genesis file.
(You can find more details in [Genesis JSON](../service-chain/configure/genesis.md).)

### SCN Data Directory Creation <a id="scn-data-directory-creation"></a>

Considering the fact that the size of Kaia blockchain data keeps increasing, it is recommended to use a big enough storage. 
You can create the data directory on your desired path.
In this document, we create `~/kscnd_home` as a data directory. 

```bash
$ mkdir -p ~/kscnd_home
```

#### Initialization of a Genesis Block <a id="initialization-of-a-genesis-block"></a>
After that, you can initialize the data directory with the genesis file.
Before starting a service chain node, it is necessary to initialize the genesis block of the service chain network using `kscn` and `genesis.json`.

```bash
$ kscn init --datadir ~/kscnd_home homi-output/scripts/genesis.json
  WARN[11/12,10:13:58 +09] [19] Some input value of genesis.json have been set to default or changed
  INFO[11/12,10:13:58 +09] [18] Setting connection type                   nodetype=cn conntype=0
    ...
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [5] Writing custom genesis block
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [47] Persisted trie from memory database       updated nodes=1 updated nodes size=80.00B time=304.931µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
  INFO[11/12,10:13:59 +09] [19] Successfully wrote genesis state          database=lightchaindata hash=0xc269669079fc8c06ac37435a563b8ed8ef273c1c835f3d823d2e586315319aa8
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/header
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/body
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/receipts
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/0
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/1
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/2
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/3
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/txlookup
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/misc
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/bridgeservice
```

#### Install nodekey <a id="install_nodekey"></a>
Copy `homi-output/keys/nodekey1` to the `kaia` directory in the SCN's data directory like below. 

```bash
$ cp homi-output/keys/nodekey1  ~/kscnd_home/klay/nodekey
```

### Configuration of the SCN <a id="configuration-of-the-scn"></a>

`kscnd.conf` is the configuration file for the SCN.

Assume that the SCN uses the default port and mounts a large-scale partition onto `~/kscnd_home`.
In the default `kscnd.conf` file, `SC_SUB_BRIDGE` option is disabled and `DATA_DIR` is empty.
```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=0
...
DATA_DIR=
...
```
  
You can enable `SC_SUB_BRIDGE` to use the Anchoring/Value transfer feature.
Also you should set the DATA_DIR like below. 

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=1
...
DATA_DIR=~/kscnd_home
...
```

If you want, you can further modify other options to customize your Service Chain.
Otherwise, now you can finish the configuration and you are ready to run the service chain using the default configuration.

## Starting/Stopping SCN <a id="starting-stopping-scn"></a>

Depending on your installation type, you can start/stop the Kaia service with the following `systemctl`  or `kscnd` command.

**start**

```bash
## when installed from rpm distribution 
$ systemctl start kscnd.service

## when installed using linux archive
$ kscnd start

```

**stop**

```bash
## when installed from rpm distribution 
$ systemctl stop kscnd.service

## when installed using linux archive
$ kscnd stop

```

**status**

```bash
## when installed from rpm distribution 
$ systemctl status kscnd.service

## when installed using linux archive
$ kscnd status

```

## Checking Node Status <a id="checking-node-status"></a>

### Process Status <a id="process-status"></a>

It is possible to check the status of SCN's process using the status commands `systemctl` and `kscnd`.

#### systemctl <a id="systemctl"></a>

`systemctl` is installed along with the RPM, and the status of SCN can be checked as follows.

```bash
$ systemctl status kscnd.service
● kscnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kscnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kscnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kscn)
   CGroup: /system.slice/kscnd.service
           └─29641 /usr/local/bin/kscn --networkid 1000 --datadir ~/kscnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kscnd[29636]: Starting kscnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

You can check the current status such as `Active: active (running)` in the example above.

#### kscnd <a id="kscnd"></a>

`kscnd` is installed along with the package, and the status of SCN can be checked as follows.

```bash
$ kscnd status
kscnd is running
```

### Logs <a id="logs"></a>

The log is stored in `kscnd.out` file located in the path defined in the `LOG_DIR` field of the `kscnd.conf` file. When the node works properly, you can see that each block is imported per second as follows.

Example:

```bash
$ tail -F ~/kscnd_home/logs/kscnd.out
  INFO[11/12,10:19:09 +09] [49] Successfully wrote mined block            num=11 hash=03da06…f194b0 txs=0
  INFO[11/12,10:19:09 +09] [49] Commit new mining work                    number=12 txs=0 elapsed=236.972µs
  INFO[11/12,10:19:10 +09] [24] Committed                                 number=12 hash=470aca…be4fdf address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:10 +09] [49] Successfully sealed new block             number=12 hash=470aca…be4fdf
  INFO[11/12,10:19:10 +09] [49] Successfully wrote mined block            num=12 hash=470aca…be4fdf txs=0
  INFO[11/12,10:19:10 +09] [49] Commit new mining work                    number=13 txs=0 elapsed=198.221µs
  INFO[11/12,10:19:11 +09] [24] Committed                                 number=13 hash=95e4a3…14e50f address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:11 +09] [49] Successfully sealed new block             number=13 hash=95e4a3…14e50f
  INFO[11/12,10:19:11 +09] [49] Successfully wrote mined block            num=13 hash=95e4a3…14e50f txs=0
  INFO[11/12,10:19:11 +09] [49] Commit new mining work                    number=14 txs=0 elapsed=220.004µs
  INFO[11/12,10:19:12 +09] [24] Committed                                 number=14 hash=dcd2bc…b2aec0 address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
```

### Queries <a id="queries"></a>

#### kscn console <a id="kscn-console"></a>

Kaia provides a CLI client: `kscn console`. Another way of using the client is to connect to the process via IPC (inter-process communication). The IPC file `klay.ipc` is located in the `DATA_DIR` path on an SCN.

Please execute the following command and check out the result.

```text
$ kscn attach --datadir ~/kscnd_home
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

You can check the usable commands on [API Document](../../../references/json-rpc/klay/account-created)

The useful APIs to check the status of SCN:

* `kaia.blockNumber` (to get the latest block number)
* `net.peerCount` (to get the number of the connected Kaia nodes currently)

#### kaia.blockNumber <a id="kaia-blocknumber"></a>

You can get the latest block number to see if blocks are propagated properly.

```text
> kaia.blockNumber
11573819
```

#### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
4
```

The above command line returns the number of nodes that the SCN connects to except the EN in the main chain.


