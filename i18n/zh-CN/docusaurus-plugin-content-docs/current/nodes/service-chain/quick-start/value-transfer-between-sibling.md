# 兄弟服务链之间的价值转移

本节将介绍如何在 ServiceChain 网络之间实现价值转移。
ServiceChain 提供的主要功能，即数据锚定和价值转移，可以单独使用。 也就是说，你可以只使用数据锚定或只使用价值转移，而不考虑是否使用其他功能。

如下图所示，如果有两个服务链（链 ID 1002 和 1004）连接到 Kairos，由于每个服务链都与 Kairos 执行数据锚定，因此彼此间不需要数据锚定，只需要进行值传输。

要在两个服务链之间没有桥接时传输数值，首先要从服务链（chainID 1002）向 kairos（chainID 1001）传输数值，然后再从 kairos（chainID 1001）向服务链（chainID 1004）传输数值。 这比直接从服务链（chainID 1002）到服务链（chainID 1004）的价值转移效率低。 因此，通过在 ServiceChain 之间直接建立桥梁，我们可以高效地转移价值。

![](/img/nodes/sc-vt-between-sibling-arch.png)

## 先决条件<a id="prerequisites"></a>

- 我们假设您安装了两个服务链，每个服务链都与 kairos EN 相连。 请参阅[连接到 Kairos](en-scn-connection.md)。
- 我们还假定，您已经通过[跨链价值转移](value-transfer.md)经历了价值转移。

如上图所示，重复[连接到 Kairos](en-scn-connection.md)以额外安装 ServiceChain（chianID 1004）。

一个节点只能有一个主桥和一个子桥。 在本例中，为方便说明，我们将在 SCN-L2-03 和 SCN-L2-07 节点上连接一座桥，这两个节点还没有主桥和子桥。

![](/img/nodes/sc-vt-between-sibling-bridge.png)

## 步骤 1：检查 SCN-L2-03 节点的 KNI<a id="step-1-check-kni-of-scn-node"></a>

请注意 SCN-L2-03 的 KNI，这是用于从 SCN 节点连接的信息。 该值将在下一步生成 `main-bridges.json` 时使用

```
SCN-L2-03$ kscn attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://...39047242eb86278689...@[::]:50505?discport=0"
```

## 步骤 2：创建 main-bridges.json<a id="step-2-create-main-bridges-json"></a>

登录 SCN-L2-07（注：chianID 1004）并在`~/data`上创建`main-bridges.json`。 用 EN 节点的 IP 地址替换位于`@`字母之后的`[::]`。

```
$ echo '["kni://...39047242eb86278689...@192.168.0.3:50505?discport=0"]' > ~/data/main-bridges.json
```

## 步骤 3：配置 SCN 然后重启<a id="step-3-configure-scn-then-restart"></a>

从 SCN-L2-07 节点的 shell 编辑 `kscn-XXXXX-amd64/conf/kscnd.conf`。 由于每个服务链都已与 Kairos EN 锚定，因此不需要在同级服务链之间进行数据锚定。 因此，我们将 `SC_ANCHORING` 设置为 0。

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1002
...
SC_ANCHORING=0
...
```

在 SCN-L2-07 节点上重启 kscnd

```
SCN-L2-07$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-07$ kscnd start
Starting kscnd: OK
```

通过检查 `subbridge.peers.length` 检查 SCN-L2-07 是否与 SCN-L2-03 连接

```
SCN-L2-07$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

在价值转移的情况下，如果链 ID 1002 对应的信息被用作主桥信息，而链 ID 1004 对应的信息被设置为子桥，则可在同级之间进行价值转移，如[跨链价值转移](value-transfer.md)中所述。
