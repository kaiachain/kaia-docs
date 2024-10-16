# Install Endpoint Nodes

## Download <a id="download"></a>

You can download the latest version of the EN on [Download](../downloads/downloads.md) page.

## Installation

### Linux Archive Distribution <a id="linux-archive-distribution"></a>

The archive file consists of the executable binary and the configuration file structured as follows.

**Note**: Do NOT alter the file structure or file name. If you change it, the node may not function correctly.

```text
- bin
  |- ken
  |- kend
- conf
  |- kend.conf
```

| File Name | File Description |
| :--- | :--- |
| bin/ken | EN executable file |
| bin/kend | EN start/termination script file |
| conf/kend.conf | EN configuration file |

The installation is the uncompression of the downloaded package where you want to install the package.

```text
$ tar zxf ken-vX.X.X-linux-amd64.tar.gz
```

Or,

```text
$ tar zxf ken-baobab-vX.X.X-linux-amd64.tar.gz
```

**Note**: it is recommended that the uncompressed directory `ken-linux-amd64/bin` path should be added to the environment variable `$PATH` to run the `ken` and `kend` globally. As an example,

```text
$ export PATH=$PATH:~/downloaded/path/ken-linux-amd64/bin
```

The other sections assume that the path is added to the variable.

### RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

You can install the downloaded RPM file with the following `yum` command.

```text
$ yum install kend-vX.X.X.el7.x86_64.rpm
```

Or,

```text
$ yum install kend-baobab-vX.X.X.el7.x86_64.rpm
```

### Install from Kaia Yum Repo <a id="install-from-kaia-yum-repo"></a>

Alternatively, you can install `kend` from the Kaia Yum repo, run:

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kend
```

### Installed Location <a id="installed-location"></a>

The installed files are located as follows.

| File Name | Location |
| :--- | :--- |
| ken | /usr/bin/ken |
| kend.conf | /etc/kend/conf/kend.conf |

## Configuration <a id="configuration"></a>

The EN configuration is to create a data directory and to set up the environment variables on the configuration file `kend.conf`.

1. Create the EN data directory.
2. Configure the EN with `kend.conf`.

### EN Data Directory Creation <a id="en-data-directory-creation"></a>

Considering the fact that the size of Kaia blockchain data keeps increasing, it is recommended to use a big enough storage. You need to create the directory on your desired path.

```text
$ sudo mkdir -p /var/kend/data
```

### Update the Configuration File <a id="update-the-configuration-file"></a>

Configuration File Location:

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/ken-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kend/conf/`.

#### Add Data Directory  <a id="add-data-directory"></a>

You should update the the data directory environment variable `$DATA_DIR` on the configuration file `kend.conf`.

```text
DATA_DIR=/var/kend/data
```

### (Optional) Download Chaindata Snapshot

Synching from the genesis block is time-consuming. You may use [Chaindata Snapshot](../../misc/operation/chaindata-snapshot.md) to skip the [Full Sync](../../learn/storage/block-sync.md#full-sync) process.

## Startup the EN <a id="startup-the-en"></a>

You can start or stop the Endpoint Node using the following commands.

**start**

```bash
$ kend start
Starting kend: OK
```

**stop**

```bash
$ kend stop
Shutting down kend: Killed
```

**status**

```bash
$ kend status
kend is running
```

## Testing the Installation <a id="testing-the-installation"></a>

It is time to check that Endpoint Node is successfully installed and it is working as expected after installation.

### Process Status <a id="process-status"></a>

It is possible to check the status of EN's process using the status commands `systemctl` and `kend`.

#### systemctl <a id="systemctl"></a>

`systemctl` is installed along with the RPM, and the status of EN can be checked as follows.

```bash
$ systemctl status kend.service
● kend.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kend; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kend start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (ken)
   CGroup: /system.slice/kend.service
           └─29641 /usr/local/bin/ken --networkid 1000 --datadir /kend_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kend[29636]: Starting kend: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

You can check the current status such as `Active: active (running)` in the example above.

#### kend <a id="kend"></a>

`kend` is installed along with the package, and the status of EN can be checked as follows.

```bash
$ kend status
kend is running
```

### Logs <a id="logs"></a>

The log is stored in `kend.out` file located in the path defined in the `LOG_DIR` field of the `kend.conf` file. When the node works properly, you can see that each block is imported per second as follows.

Example:

```bash
$ tail kend.out
INFO[02/13,07:02:24 Z] [35] Commit new mining work                    number=11572924 txs=0 elapsed=488.336µs
INFO[02/13,07:02:25 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.800ms   mgasps=0.000       number=11572924 hash=f46d09…ffb2dc cache=1.59mB
INFO[02/13,07:02:25 Z] [35] Commit new mining work                    number=11572925 txs=0 elapsed=460.485µs
INFO[02/13,07:02:25 Z] [35] 🔗 block reached canonical chain           number=11572919 hash=01e889…524f02
INFO[02/13,07:02:26 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=1fabd3…af66fe number=11572925
INFO[02/13,07:02:26 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.777ms   mgasps=0.000       number=11572925 hash=1fabd3…af66fe cache=1.59mB
INFO[02/13,07:02:26 Z] [35] Commit new mining work                    number=11572926 txs=0 elapsed=458.665µs
INFO[02/13,07:02:27 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=60b9aa…94f648 number=11572926
INFO[02/13,07:02:27 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.783ms   mgasps=0.000       number=11572926 hash=60b9aa…94f648 cache=1.59mB
INFO[02/13,07:02:27 Z] [35] Commit new mining work      
```

### Queries <a id="queries"></a>

#### ken console <a id="ken-console"></a>

Kaia provides a CLI client: `ken console`. Another way of using the client is to connect to the process via IPC (inter-process communication). The IPC file `klay.ipc` is located in the `DATA_DIR` path on an EN.

Please execute the following command and check out the result.

```text
$ ken attach --datadir /var/kend/data
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: /var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

You can check the usable commands on [API Document](../../../references/json-rpc/klay/account-created)

The useful APIs to check the status of EN:

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
14
```

The above command line returns the number of nodes that the EN connects to.

