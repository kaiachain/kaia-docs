# Install Proxy Nodes

## Download

You can download the latest version of the `kpn`  on [Download](../../downloads/downloads.md) page.

## Installation <a id="installation"></a>

### Linux Archive Distribution <a id="linux-archive-distribution"></a>

The archive file consists of the executable binary and the configuration file structured as follows.

**Note**: Do NOT alter the file structure or file name. If you change it, the node may not function correctly.

```text
- bin
  |- kpn
  |- kpnd
- conf
  |- kpnd.conf
```

| File Name | File Description |
| :--- | :--- |
| bin/kpn | PN executable file |
| bin/kpnd | PN start/termination script file |
| conf/kpnd.conf | PN configuration file |

The installation is the uncompression of the downloaded package where you want to install the package.

```bash
$ tar zxf kpn-vX.X.X-linux-amd64.tar.gz
```

Or,

```bash
$ tar zxf kpn-baobab-vX.X.X-linux-amd64.tar.gz
```

**Note**: it is recommended that the uncompressed directory `kpn-linux-amd64/bin` path should be added to the environment variable `$PATH` to run the `kpn` and `kpnd` globally. As an example,

```bash
$ export PATH=$PATH:~/downloaded/path/kpn-linux-amd64/bin
```

The other sections assume that the path is added to the variable.

### RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

You can install the downloaded RPM file with the following `yum` command.

```bash
$ yum install kpnd-vX.X.X.el7.x86_64.rpm
```

Or,

```bash
$ yum install kpnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Install from Kaia Yum Repo <a id="install-from-kaia-yum-repo"></a>

Alternatively, you can install `kpnd` from the Kaia Yum repo, run:

```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/kaia.repo && sudo yum install kpnd
```
or
```bash
$ sudo curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/9-stream/kaia.repo && sudo yum install kpnd
```

### Installed Location <a id="installed-location"></a>

The installed files are located as follows.

| File Name | Location |
| :--- | :--- |
| kpn | /usr/bin/kpn |
| kpnd.conf | /etc/kpnd/conf/kpnd.conf |

## Configuration <a id="configuration"></a>

The PN configuration is to create a data directory and set up several values in the configuration file `kpnd.conf`.

1. Create a PN Data Directory
2. Install node key
3. Install `static-node.json` 
4. Configure the PN with `kpnd.conf`.

### PN Data Directory Creation <a id="pn-data-directory-creation"></a>

Considering the fact that the size of Kaia blockchain data is always increased, it is recommended to use a big enough storage. You may need to create the directory on your desired path.

```bash
$ mkdir -p /var/kpnd/data
```

### Install Node Key <a id="install-node-key"></a>

In order to operate a PN, a `nodekey` is required. The KPN binary will create a new one for you if you do not have it. If you have one, you need to put your `nodekey` into the PN data directory. The way to create a `nodekey` is in the "[Before You Install](./before-you-install.md)" section. The following command line copies the `nodekey` into the PN data directory.

```bash
$ cp nodekey /var/kpnd/data
```

### Install `static-nodes.json` <a id="install-static-nodes-json"></a>

The `static-nodes.json` should be created from the PN operator. It contains the addresses that your PN is connected to. It is recommended to add the addresses including your CN and a PN from another Core Cell. Please contact to the Kaia official email for more details \(`bootstrap@klaytn.com` for Mainnet or `baobab@klaytn.com` for Kairos\).

**static-nodes.json**

```text
[
  "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@10.11.2.101:32323?discport=0&ntype=cn",
  "kni://8dee912aeda2ccfaa4fe421f015d4d75c2e3fd4aab75fa399b42767caad33531e57f3356b4a4af374593e33ec4320e1325aa2390a7be2489fa6b5724894680eb@10.11.2.102:32323?discport=0&ntype=pn"
]
```

The node URI of the PN is in the "[Before You Install](./before-you-install.md)" section. \(Note: This IP address is different from CN public IP.\) The following command line copies the `static-nodes.json` file into the PN data directory.

```bash
$ cp static-nodes.json /var/kpnd/data
```

### Update the Configuration File <a id="update-the-configuration-file"></a>

Configuration File Location:

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/kpn-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kpnd/conf/`.

#### Add Data Directory  <a id="add-data-directory"></a>

You should update the data directory environment variable `$DATA_DIR` on the configuration file `kpnd.conf`.

```text
...
DATA_DIR=/var/kpnd/data
...
```

### (Optional) Download Chaindata Snapshot

Synching from the genesis block is time-consuming. You may use [Chaindata Snapshot](../../../misc/operation/chaindata-snapshot.md) to skip the [Full Sync](../../../learn/storage/block-sync.md#full-sync) process.

## Startup the PN <a id="startup-the-pn"></a>

### PN Start/Stop  <a id="pn-start-stop"></a>

You can start/stop the Kaia service with the following `systemctl` command.

**Note**: This requires root privileges.

**start**

```bash
$ systemctl start kpnd.service

```

**stop**

```bash
$ systemctl stop kpnd.service

```

**status**

```bash
$ systemctl status kpnd.service

```

### Troubleshooting <a id="troubleshooting"></a>

If you meet the following error,

```bash
Failed to start kpnd.service: Unit not found.
```

reload the systemd manager configuration with the following command.

```bash
$ systemctl daemon-reload
```

## Testing the Core Cell <a id="testing-the-core-cell"></a>

It is time to check that Core Cell is successfully installed and it is working as expected after installation.

### Process Status <a id="process-status"></a>

It is possible to check the status of PN's process using the status commands `systemctl` and `kpnd`.

#### systemctl <a id="systemctl"></a>

`systemctl` is installed along with the RPM and the status of PN can be checked as follows.

```bash
$ systemctl status kpnd.service
● kpnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kpnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kpnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kpn)
   CGroup: /system.slice/kpnd.service
           └─29641 /usr/local/bin/kpn --networkid 1000 --datadir /kpnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kpnd[29636]: Starting kpnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

You can check the current status such as `Active: active (running)` in the above example.

#### kpnd <a id="kcnd-kpnd"></a>

`kpnd` is installed along with the package and the status of PN can be checked as follows.

```bash
$ kpnd status
kpnd is running
```

### Logs <a id="logs"></a>

The log is stored in `kpnd.out` file located in the path defined in the `LOG_DIR` field of the `kpnd.conf` file. When the node works properly, you can see that each block is created per second as follows.

Example:

```bash
$ tail kpnd.out
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

### kpn console <a id="kcn-console-kpn-console"></a>

Kaia provides a CLI client: `kpn console`. However, a PN may disable the RPC interface for the client due to the security reason. Another way of using the client is to connect to the process via IPC (inter-process communication).

The IPC file `klay.ipc` is located in the `DATA_DIR` path on a PN.

Please execute the following command and check out the result.

```bash
 $ kpn attach --datadir /var/kpnd/data
 Welcome to the Kaia JavaScript console!

 instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 coinbase: 0x67f68fdd9740fd7a1ac366294f05a3fd8df0ed40
 at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
  datadir: /var/kpnd/data
  modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
  >
```

You can check the usable commands on [API Document](../../../references/json-rpc/klay/account-created)

The useful APIs to check the status of a PN:

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