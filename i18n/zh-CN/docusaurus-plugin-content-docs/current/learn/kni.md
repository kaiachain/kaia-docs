# Kaia 网络标识符

**KNI（Kaia 网络标识符）** 是用于标识 Kaia 节点的 URL 方案。 其语法如下所示：

```
kni://<nodeID>@<hostname>:<port>?subport=<subport>&discport=<discport>
```

![KNI scheme](/img/learn/kni_scheme.png)

**nodeID** 是与节点私钥相对应的 512 位公钥。 它用于验证 p2p 网络中与对等网络的通信。

**hostname** 描述节点的地址，位于`@`和`:`之间。 地址格式可以是以下格式之一：

- IPv4 点分十进制（192.0.2.1）
- IPv6 (`[2001:db8::68]`)
- IPv4 映射 IPv6 (`[2001:db8:3c4d:15::abcd:ef12]`)。
- 域名 (`your.node.com`)

**端口**\*用于通过 TCP 与对等节点建立连接。 在 Kaia 中，默认 "端口 "为 "32323"，默认 "子端口 "为 "32324"。 请注意，默认的 `subport` 在 `kend.conf` 中配置为 `port + 1`。 根据 TCP 监听端口的数量，Kaia 提供两种[连接类型](scaling-solutions.md#multi-channel-communication)。

**discport** 用于检查已知邻居是否是可到达的 kaia 节点，并获取其邻居地址以建立新连接。 请注意，这是一个 UDP 端口。
默认情况下，UDP 端口或 "discport "与 TCP 端口使用相同的端口。
如果节点使用不同的 `discport` 端口，可通过 `discport` 查询参数指定。

以下两个 URL 显示了一个节点的 KNI 示例，该节点的 IP 地址为 "10.0.0.1"，TCP 监听端口为 "32323 "和 "32324"。
如果省略了 `discport`，它将被设置为 UDP 端口 `32323`，与 `port` 的值相同。

```
kni://a979...163c@10.0.0.1:32323                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324   # multi-channel peer
```

接下来的两个 KNI 示例显示了 "discport "为 "30301 "的节点。

```
kni://a979...163c@10.0.0.1:32323?discport=30301                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324&discport=30301   # multi-channel peer
```

如果您想知道如何生成节点的 KNI，请参阅 [Node Key & Node URI Creation](../nodes/core-cell/install/before-you-install.md#node-key--node-uri-creation) 。
KNI 方案用于节点发现协议、[设置 `static-nodes.json` 文件](../nodes/core-cell/install/install-proxy-nodes.md#install-static-nodesjson)、[addPeer API](../references/json-rpc/admin/add-peer)、[bootnodes 选项](../misc/operation/configuration.md#properties)等。
