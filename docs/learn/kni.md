# Kaia Network Identifier

**KNI (Kaia Network Identifier)** is a URL scheme to identify a Kaia node. Its syntax is shown below:
```
kni://<nodeID>@<hostname>:<port>?subport=<subport>&discport=<discport>
```
![KNI scheme](/img/learn/kni_scheme.png)

**nodeID** is a 512-bit public key corresponding to the node's private key. It is used to verify communication with peers on p2p network.

**hostname** describes the address of a node, located between `@` and `:`. The address format can be one of the following:
* IPv4 dotted decimal (`192.0.2.1`)
* IPv6 (`[2001:db8::68]`)
* IPv4-mapped IPv6 (`[2001:db8:3c4d:15::abcd:ef12]`)
* Domain name (`your.node.com`)

**port** is used to make connections with peer nodes through TCP. In Kaia, the default `port` is `32323` and the default `subport` is `32324`. Note that the default `subport` is configured as `port + 1` in `kend.conf`. Depending on the number of TCP listening ports, Kaia offers two [types of connections](scaling-solutions.md#multi-channel-communication).

**discport** is used for checking if the known neighbors are reachable kaia nodes and fetching their neighbors' addresses for new connections. Note that this is a UDP port.
By default, the UDP port, or `discport`, uses the same port with the TCP port.
If the node uses a different port for `discport`, it can be specified by the `discport` query parameter.

The following two URLs shows a KNI example of a node having IP address `10.0.0.1` and TCP listening port `32323` and `32324`.
If `discport` is omitted, it is set to the UDP port of `32323`, same as the value of `port`.
```
kni://a979...163c@10.0.0.1:32323                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324   # multi-channel peer
```

The next two shows KNI examples of nodes having `discport` of `30301`.
```
kni://a979...163c@10.0.0.1:32323?discport=30301                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324&discport=30301   # multi-channel peer
```

If you want to know how to generate a KNI of a node, please refer to [Node Key & Node URI Creation](../nodes/core-cell/install/before-you-install.md#node-key--node-uri-creation).
The KNI scheme is used in node discovery protocol, [setting `static-nodes.json` file](../nodes/core-cell/install/install-proxy-nodes.md#install-static-nodesjson), [addPeer API](../references/json-rpc/admin/add-peer), [bootnodes option](../misc/operation/configuration.md#properties) and etc.
