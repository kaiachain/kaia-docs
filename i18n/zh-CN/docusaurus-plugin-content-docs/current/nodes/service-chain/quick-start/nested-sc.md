# 创建嵌套服务链

本章介绍如何通过在上一章构建的 ServiceChain 网络中添加新的 ServiceChain 网络，以分层结构构建 ServiceChain 网络。 在本例中，要添加的 ServiceChain 网络也由 4 个 SCN 组成。 上一章中构建的服务链网络定义为 L2，新构建的服务链网络定义为 L3。 我们将在 L2 和 L3 之间连接一座桥，以创建一个分层结构。 本章将要构建的服务链网络的整体结构如下图所示。

![](/img/nodes/sc-nestedsc-arch.png)

## 先决条件<a id="prerequisites"></a>

- 假设您已进入 [Nested ServiceChain](nested-sc.md) 中描述的 ServiceChain 配置和 Kairos EN。 因此，我们将简要解释上一节中的内容。
- 假设和限制
  - 一个 EN 可以一对一地桥接到服务链 L2 的一个 SCN。 同样，服务链 L2 中的一个 SCN 可以一对一地桥接到 L3 中的一个 SCN。
  - SCN 节点可以同时拥有一个主桥和一个子桥。 不过，主桥和子桥的端口号必须设置不同。 (例如主桥：50505，副桥：50506）
  - 并不是所有 L2 的 SCN 都需要桥接到 EN，同样，也不是所有 L3 的 SCN 都需要桥接到 L2。 不过，为了实现高可用性，建议在链之间设置两个或更多的主桥和副桥对。 在本章中，L2 和 L3 之间只连接一对，L2 和 L3 之间的高可用性与 Kairos 和 L2 之间的 HA 相同。

## 步骤 1：创建和更新 L3 的霍米数据<a id="step-1-create-and-update-homi"></a>

与配置 ServiceChain L2 时一样，执行 `homi` 命令创建脚本和配置文件，用于构建 L3。 您可以在任何 Linux/Mac PC 上运行 `homi`。 Kairos 的 "chainID "是 "1001"，而 L2 的 "chainID "在上一个示例中被设置为 "1002"，因此为了方便起见，L3 的 "chainID "被设置为 "1003"。 为实际服务运行区块链时，必须在 https://chainlist.defillama.com/ 注册新的 `chainID` 值，以避免 `chainID` 与其他 ServiceChain 和 EVM 链冲突。

```console
$ ./homi setup --gen-type local --cn-num 4 --test-num 1 --servicechain --chainID 1003 --p2p-port 22323 -o homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/keys/passwd2
Created :  homi-output/keys/passwd3
Created :  homi-output/keys/passwd4
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/keys/nodekey2
Created :  homi-output/keys/validator2
Created :  homi-output/keys/nodekey3
Created :  homi-output/keys/validator3
Created :  homi-output/keys/nodekey4
Created :  homi-output/keys/validator4
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/keys_test/testkey1
Created :  homi-output/keys_test/keystore1/0xdC7218621513f71d609653d22C39d79d558d9CDC
Created :  homi-output/Kaia.json
Created :  homi-output/Kaia_txpool.json
```

![](/img/nodes/sc-nestedsc-ip.png)

更新 `homi-output/scripts/static-nodes.json` 中 ServiceChain L3 节点的`IP 地址`和`端口`信息。

```json
[
     "kni://358235ccbf97a1f...787f7@192.168.0.21:22323?discport=0&type=cn",
     "kni://14ac4e3d53de5c7...6c91d@192.168.0.22:22323?discport=0&type=cn",
     "kni://5f36a456d93da09...8e216@192.168.0.23:22323?discport=0&type=cn",
     "kni://d62fd0928b9b6e5...6badf@192.168.0.24:22323?discport=0&type=cn"
]
```

将 "homi-output "复制到服务链 L3 的所有 SCN 节点（SCN-L3-01、SCN-L3-02、SCN-L3-03、SCN-L3-04）。

```console
$ scp -r path/to/homi-output user@192.168.0.21:~/ 
$ scp -r path/to/homi-output user@192.168.0.22:~/ 
$ scp -r path/to/homi-output user@192.168.0.23:~/ 
$ scp -r path/to/homi-output user@192.168.0.24:~/ 
```

初始化所有节点。

```console
$ kscn --datadir ~/data init ~/homi-output/scripts/genesis.json
$ ls ~/data
keystore	klay		kscn
```

连接所有 SCN（SCN-L3-01、SCN-L3-02、SCN-L3-03 和 SCN-L3-04），将 `static-nodes.json` 复制到数据文件夹 `~/data` 中，并逐一复制 `nodekeys` 。

```console
$ cp   ~/homi-output/scripts/static-nodes.json   ~/data/
$ cp   ~/homi-output/keys/nodekey{1..4}   ~/data/klay/nodekey
```

## 步骤 2：L3 中的 SCN 配置<a id="step-2-scn-configuration"></a>

在 ServiceChain L3 的所有 SCN 上编辑 `conf/kscnd.conf`，如下所示：端口 "使用 ServiceChain 的默认端口 22323。 DATA_DIR`是`~/data\`。

```
...
PORT=22323
...
DATA_DIR=~/data
...
```

在 L3 的所有 SCN 节点上运行 ServiceChain，并检查其是否正常运行。

```console
$ kscnd start
Starting kscnd: OK
$ kscn attach --datadir ~/data
> kaia.blockNumber
10
```

## 步骤 3：设置 L2 主桥后重新启动<a id="step-3-restart-after-setting-L2-main-bridge"></a>

连接到 SCN-L2-03 节点的控制台（注意：这不是在 L3，而是在 L2），该节点将充当服务链 L2 中的主桥。

![](/img/nodes/sc-nestedsc-id.png)

编辑 SCN-L2-03 的 kscn 配置文件 `conf/kscnd.conf` 如下。

```console
SC_MAIN_BRIDGE=1
```

重启 SCN-L2-03 上的 kscnd。

```console
SCN-L2-03$ kscnd stop
SCN-L2-03$ kscnd start
```

## 步骤 4：检查主桥节点的 KNI<a id="step-4-check-kni-of-main-bridge-node"></a>

检查 SCN-L2-03 节点的 KNI 信息。 该值将用于创建 SCN-L2-03 节点的`main-bridges.json`文件，从而在服务链 L3 中设置子桥。

![](/img/nodes/sc-nestedsc-nodeinfo.png)

```console
SCN-L2-03$ kscn   attach   --datadir   ~/data
> mainbridge.nodeInfo.kni
"kni://87989a5a5dcc165...85b16b@[::]:50505?discport=0"
```

## 步骤 5：配置 L3 子桥<a id="step-5-configure-l3-sub-bridge"></a>

连接到 SCN-L3-01 节点，该节点将拥有服务链 L3 的子桥（注意：这不是 L2）。 在 `~/data` 文件夹下创建 `main-bridges.json` 文件。 将 @ 后面的 \[::\] 替换为您在步骤 4 中检查的节点的 IP 地址。

```console
SCN-L3-01$ echo '["kni://87989a5a5dcc165...85b16b@192.168.0.13:50505?discport=0"]' > ~/data/main-bridges.json
```

编辑 SCN-L3-01 节点（带子桥）的配置文件 `conf/kscnd.conf` 如下。 将 `SC_SUB_BRIDGE` 设为 1 以激活桥接连接，将 `SC_PARENT_CHAIN_ID` 设为 1002，将 `chainID` 设为 L2，将 `SC_ANCHORING` 设为 1 以在重启时自动锚定数据。 您也可以访问 SCN-L3-01 shell，使用 "subbridge.anchoring(true) "命令打开数据锚定，或使用 "subbridge.anchoring(false) "命令关闭数据锚定。 SC_ANCHORING_PERIOD "是一个参数，用于确定向父链发送锚定事务的频率。 通过指定 10 的值，将节点设置为每 10 个区块锚定一次。 默认为 1。

```console
SC_SUB_BRIDGE=1
…
SC_PARENT_CHAIN_ID=1002
…
SC_ANCHORING=1
SC_ANCHORING_PERIOD=10
```

完成设置后，重新启动 SCN-L3-01 上的 kscnd。

```console
SCN-L3-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L3-01$ kscnd start
Starting kscnd: OK
```

检查 `subbridge.peers.length` 查看 SCN-L3-01 是否连接到 SCN-L2-03，检查 `subbridge.latestAnchoredBlockNumber` 查看最新的锚定块编号，查看是否正在进行锚定。

```console
SCN-L3-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
> subbridge.latestAnchoredBlockNumber
5010
```
