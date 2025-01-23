# Kaia 網絡標識符

**KNI（Kaia 網絡標識符）** 是用於標識 Kaia 節點的 URL 方案。 其語法如下所示：

```
kni://<nodeID>@<hostname>:<port>?subport=<subport>&discport=<discport>
```

![KNI scheme](/img/learn/kni_scheme.png)

**nodeID** 是與節點私鑰相對應的 512 位公鑰。 它用於驗證 p2p 網絡中與對等網絡的通信。

**hostname** 描述節點的地址，位於`@`和`:`之間。 地址格式可以是以下格式之一：

- IPv4 點分十進制（192.0.2.1）
- IPv6 (`[2001:db8::68]`)
- IPv4 映射 IPv6 (`[2001:db8:3c4d:15::abcd:ef12]`)。
- 域名 (`your.node.com`)

**端口**\*用於通過 TCP 與對等節點建立連接。 在 Kaia 中，默認 "端口 "為 "32323"，默認 "子端口 "為 "32324"。 請注意，默認的 `subport` 在 `kend.conf` 中配置為 `port + 1`。 Depending on the number of TCP listening ports, Kaia offers two [types of connections](scaling-solutions.md#multi-channel-communication).

**discport** 用於檢查已知鄰居是否是可到達的 kaia 節點，並獲取其鄰居地址以建立新連接。 請注意，這是一個 UDP 端口。
默認情況下，UDP 端口或 "discport "與 TCP 端口使用相同的端口。
如果節點使用不同的 `discport` 端口，可通過 `discport` 查詢參數指定。

以下兩個 URL 顯示了一個節點的 KNI 示例，該節點的 IP 地址為 "10.0.0.1"，TCP 監聽端口為 "32323 "和 "32324"。
如果省略了 `discport`，它將被設置為 UDP 端口 `32323`，與 `port` 的值相同。

```
kni://a979...163c@10.0.0.1:32323                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324   # multi-channel peer
```

接下來的兩個 KNI 示例顯示了 "discport "為 "30301 "的節點。

```
kni://a979...163c@10.0.0.1:32323?discport=30301                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324&discport=30301   # multi-channel peer
```

If you want to know how to generate a KNI of a node, please refer to [Node Key & Node URI Creation](../nodes/core-cell/install/before-you-install.md#node-key--node-uri-creation).
The KNI scheme is used in node discovery protocol, [setting `static-nodes.json` file](../nodes/core-cell/install/install-proxy-nodes.md#install-static-nodesjson), [addPeer API](../references/json-rpc/admin/add-peer), [bootnodes option](../misc/operation/configuration.md#properties) and etc.
