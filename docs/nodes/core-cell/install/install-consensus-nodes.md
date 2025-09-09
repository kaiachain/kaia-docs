# Install Consensus Nodes

## Download

You can download the latest version of the `kcn`  on [Download](../../downloads/downloads.md) page.

## Installation

### Linux Archive Distribution <a id="linux-archive-distribution"></a>

The archive file consists of the executable binary and the configuration file structured as follows.

**Note**: Do NOT alter the file structure or file name. If you change it, the node may not function correctly.

```text
- bin
  |- kcn
  |- kcnd
- conf
  |- kcnd.conf
```

| File Name | File Description |
| :--- | :--- |
| bin/kcn | CN executable file |
| bin/kcnd | CN start/termination script file |
| conf/kcnd.conf | CN configuration file |

The installation is the uncompression of the downloaded package where you want to install the package.

```bash
$ tar zxf kcn-vX.X.X-linux-amd64.tar.gz
```

Or,

```bash
$ tar zxf kcn-baobab-vX.X.X-linux-amd64.tar.gz
```

**Note**: it is recommended that the uncompressed directory `kcn-linux-amd64/bin` path should be added to the environment variable `$PATH` to run the `kcn` and `kcnd` globally. As an example,

```bash
$ export PATH=$PATH:~/downloaded/path/kcn-linux-amd64/bin
```

The other sections assume that the path is added to the variable.

### RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

You can install the downloaded RPM file with the following `yum` command.

```bash
$ yum install kcnd-vX.X.X.el7.x86_64.rpm
```

Or,

```bash
$ yum install kcnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Install from Kaia Yum Repo <a id="install-from-kaia-yum-repo"></a>

Alternatively, you can install `kcnd` from the Kaia Yum repo, run:

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kcnd
```
or
```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/9-stream/kaia.repo && sudo yum install kcnd
```

### Installed Location <a id="installed-location"></a>

The installed files are located as follows.

| File Name | Location |
| :--- | :--- |
| kcn | /usr/bin/kcn |
| kcnd.conf | /etc/kcnd/conf/kcnd.conf |


## Configuration <a id="configuration"></a>

The CN configuration is to create a data directory and set up several values in the configuration file `kcnd.conf`.

1. Create the CN data directory.
2. Install node key
3. Configure the CN with `kcnd.conf`.

### CN Data Directory Creation <a id="cn-data-directory-creation"></a>

Considering the fact that the size of Kaia blockchain data is always increased, it is recommended to use a big enough storage. You may need to create the directory on your desired path.

```bash
$ mkdir -p /var/kcnd/data
```

### Install Node Key <a id="install-node-key"></a>

In order to operate a CN, a `nodekey` is required. The KCN binary will create a new one for you if you do not have it. If you have one, you need to put your `nodekey` into the CN data directory. The way to create a `nodekey` is described in the '[Before You Install](./before-you-install.md)' section. The following command line copies the `nodekey` into the CN data directory.

```bash
$ cp nodekey /var/kcnd/data
```

### Update the Configuration File <a id="update-the-configuration-file"></a>

Configuration File Location:

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/kcn-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kcnd/conf/`.

#### Add Data Directory  <a id="add-data-directory"></a>

You should update the data directory environment variable `$DATA_DIR` on the configuration file `kcnd.conf`.

```text
...
DATA_DIR=/var/kcnd/data
...
```

#### Setup Rewardbase <a id="setup-rewardbase"></a>

As a reward of participating in the consensus of the Kaia network, CN operator will receive KAIA. For this reason, it is required to set an address on the configuration file `kcnd.conf`.

The ways to create a new account are various, but the `kcn` also provides the functionality. You can check the help message with the following command.

```bash
$ kcn account new --help
```

One of the example of doing this procedure is as follows. First of all, you need to create a new account which the reward KAIA will be sent to.

```bash
$ kcn account new --datadir ~/kcnd_home
INFO[03/15,09:04:43 +09] [17] Setting connection type                   nodetype=cn conntype=-0
INFO[03/15,09:04:43 +09] [17] Maximum peer count                        KAIA=25 LES=0 total=25
INFO[03/15,09:04:43 +09] [17] SBN is disabled.
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {d13f7da0032b1204f77029dc1ecbf4dae2f04241}
```

As a result of this, it will create the associated keystore on the path that you define. Next, you need to put the created address in the file `kcnd.conf` file as follows.

```text
...
REWARDBASE="d13f7da0032b1204f77029dc1ecbf4dae2f04241"
...
```

Keep in mind that the keystore and the password that you created is significantly important, so you must be careful to manage them. See more details about `kcnd.conf` on the [Configuration File](../../../misc/operation/configuration.md) section.

### (Optional) Download Chaindata Snapshot

Synching from the genesis block is time-consuming. You may use [Chaindata Snapshot](../../../misc/operation/chaindata-snapshot.md) to skip the [Full Sync](../../../learn/storage/block-sync.md#full-sync) process.

## Startup the CN <a id="startup-the-cn"></a>

### CN Start/Stop  <a id="cn-start-stop"></a>

You can start/stop the Kaia service with the following `systemctl` command.

**Note**: This requires root privileges.

**start**

```bash
$ systemctl start kcnd.service

```

**stop**

```bash
$ systemctl stop kcnd.service

```

**status**

```bash
$ systemctl status kcnd.service

```

### Troubleshooting <a id="troubleshooting"></a>

If you meet the following error,

```bash
Failed to start kcnd.service: Unit not found.
```

reload the systemd manager configuration with the following command.

```bash
$ systemctl daemon-reload
```

### Export BLS public key info <a id="export-bls-public-key-info"></a>

If the network has activated or will activate the Randao hardfork, each CN maintainer must submit its BLS public key info to the [KIP-113 smart contract](https://kips.kaia.io/KIPs/kip-113).

The BLS public key info can be calculated from the nodekey. To extract it, first start the node. Then use the command:

```
$ kcn account bls-info --datadir /var/kcnd/data
```

As a result, `bls-publicinfo-NODEID.json` file will be created.

## Testing the Core Cell <a id="testing-the-core-cell"></a>

It is time to check that Core Cell is successfully installed and it is working as expected after installation.

### Process Status <a id="process-status"></a>

It is possible to check the status of CN's process using the status commands `systemctl` and `kcnd`.

#### systemctl <a id="systemctl"></a>

`systemctl` is installed along with the RPM and the status of CN can be checked as follows.

```bash
$ systemctl status kcnd.service
● kcnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kcnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kcnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kcn)
   CGroup: /system.slice/kcnd.service
           └─29641 /usr/local/bin/kcn --networkid 1000 --datadir /kcnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kcnd[29636]: Starting kcnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

You can check the current status such as `Active: active (running)` in the above example.

#### kcnd <a id="kcnd-kpnd"></a>

`kcnd` is installed along with the package and the status of CN can be checked as follows.

```bash
$ kcnd status
kcnd is running
```

### Logs <a id="logs"></a>

The log is stored in `kcnd.out` file located in the path defined in the `LOG_DIR` field of the `kcnd.conf` file. When the node works properly, you can see that each block is created per second as follows.

Example:

```bash
$ tail kcnd.out
INFO[02/13,07:02:24 Z] [35] Commit new mining work                    number=11572924 txs=0 elapsed=488.336µs
INFO[02/13,07:02:25 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.800ms   mgasps=0.000       number=11572924 hash=f46d09…ffb2dc cache=1.59mB
INFO[02/13,07:02:25 Z] [35] Commit new mining work                    number=11572925 txs=0 elapsed=460.485µs
INFO[02/13,07:02:25 Z] [35] 🔗 block reached canonical chain           number=11572919 hash=01e889…524f02
INFO[02/13,07:02:26 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=1fabd3…af66fe number=11572925
INFO[02/13,07:02:26 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.777ms   mgasps=0.000       number=11572925 hash=1fabd3…af66fe cache=1.59mB
INFO[02/13,07:02:26 Z] [35] Commit new mining work                    number=11572926 txs=0 elapsed=458.665µs
INFO[02/13,07:02:27 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=60b9aa…94f648 number=11572926
INFO[02/13,07:02:27 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.783ms   mgasps=0.000       number=11572926 hash=60b9aa…94f648 cache=1.59mB
INFO[02/13,07:02:27 Z] [35] Commit new mining work                    number=11572927 txs=0 elapsed=483.436µs
```

### kcn console <a id="kcn-console-kpn-console"></a>

Kaia provides a CLI client: `kcn console`. However, a CN may disable the RPC interface for the client due to the security reason. Another way of using the client is to connect to the process via IPC (inter-process communication).

The IPC file `klay.ipc` is located in the `DATA_DIR` path on a CN.

Please execute the following command and check out the result.

```bash
$ ken attach --datadir /var/kend/data
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: /var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

You can check the usable commands on [API Document](../../../../references/json-rpc/klay/account-created)

The useful APIs to check the status of a CN:

* `kaia.blockNumber` (to get the latest block number)
* `net.peerCount` (to get the number of the connected Kaia nodes currently)

#### kaia.blockNumber  <a id="kaia-blocknumber"></a>

You can get the latest block number to see if blocks are created (for CNs) or propagated (for CNs and PNs) properly based on your node type.

```javascript
> kaia.blockNumber
11573819
```

#### net.peerCount  <a id="net-peercount"></a>

```javascript
> net.peerCount
14
```

The above command line returns a different value based on the node type.

* CN: the number of connected CNs + the number of connected PNs.
* PN: the number of connected CNs + the number of connected PNs + the number of connected ENs.