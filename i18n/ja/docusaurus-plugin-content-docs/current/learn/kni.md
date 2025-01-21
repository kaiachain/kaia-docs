# カイアネットワーク識別子

\*\*KNI (Kaia Network Identifier)\*\*はKaiaノードを識別するためのURLスキームです。 その構文を以下に示す：

```
kni://<nodeID>@<hostname>:<port>?subport=<subport>&discport=<discport>
```

![KNI scheme](/img/learn/kni_scheme.png)

**nodeID**はノードの秘密鍵に対応する512ビットの公開鍵である。 p2pネットワーク上のピアとの通信を検証するために使用される。

**hostname**はノードのアドレスを記述するもので、`@`と`:`の間に位置する。 アドレスの形式は以下のいずれか：

- IPv4 ドット付き10進数 (`192.0.2.1`)
- IPv6 (`[2001:db8::68]`)
- IPv4マップされたIPv6 (`[2001:db8:3c4d:15::abcd:ef12]`)
- ドメイン名 (`your.node.com`)

**ポート**は、TCPを介してピアノードと接続するために使用される。 Kaia では、デフォルトの `port` は `32323` で、デフォルトの `subport` は `32324` である。 デフォルトの `subport` は `kend.conf` で `port + 1` として設定されていることに注意すること。 TCPリスニングポートの数に応じて、カイアは2つの[接続タイプ](scaling-solutions.md#multi-channel-communication)を提供します。

**discport**は、既知の隣人が到達可能なカイア・ノードかどうかをチェックし、新しい接続のために隣人のアドレスを取得するために使用される。 これはUDPポートであることに注意。
デフォルトでは、UDPポート（`discport`）はTCPポートと同じポートを使用する。
ノードが `discport` に別のポートを使用する場合は、`discport` クエリパラメータで指定することができる。

次の2つのURLは、IPアドレス`10.0.0.1`とTCPリスニングポート`32323`と`32324`を持つノードのKNIの例を示している。
`discport`が省略された場合は、`port`の値と同じUDPポート`32323`が設定される。

```
kni://a979...163c@10.0.0.1:32323                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324   # multi-channel peer
```

次の2つは、`30301`の`discport`を持つノードのKNIの例である。

```
kni://a979...163c@10.0.0.1:32323?discport=30301                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324&discport=30301   # multi-channel peer
```

ノードのKNIを生成する方法については、[ノードキーとノードURIの作成](../nodes/core-cell/install/before-you-install.md#node-key--node-uri-creation)を参照してください。
KNIスキームは、ノード発見プロトコル、[`static-nodes.json`ファイルの設定](../nodes/core-cell/install/install-proxy-nodes.md#install-static-nodesjson)、[addPeer API](../references/json-rpc/admin/add-peer)、[bootnodesオプション](../misc/operation/configuration.md#properties)などで使用されています。
