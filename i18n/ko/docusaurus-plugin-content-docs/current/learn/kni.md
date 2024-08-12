# 카이아 네트워크 식별자

**KNI(Kaia 네트워크 식별자)** 는 카이아 노드를 식별하기 위한 URL 체계입니다. 그 구문은 아래와 같습니다.

```
kni://<nodeID>@<hostname>:<port>?subport=<subport>&discport=<discport>
```

![KNI 스키마](/img/learn/kni_scheme.png)

**nodeID**는 노드의 개인키에 해당하는 512비트 공개키입니다. P2P 네트워크에서 피어와의 통신을 확인하는 데 사용됩니다.

**hostname**은 `@`와 `:` 사이에 위치한 노드의 주소를 설명합니다. 주소 형식은 다음 중 하나일 수 있습니다:

- IPv4 점 소수점(`192.0.2.1`)
- IPv6(`[2001:db8::68]`)
- IPv4 매핑된 IPv6(`[2001:db8:3c4d:15::abcd:ef12]`)
- 도메인 이름(`your.node.com`)

**port**는 TCP를 통해 피어 노드와 연결할 때 사용됩니다. 카이아에서 기본 `port`는 `32323`, 기본 `subport`는 `32324`입니다. 기본 `subport`는 `kend.conf`에서 `port + 1`로 설정되어 있음을 참고하세요. 카이아는 TCP 수신 포트의 수에 따라 두 가지 [연결 유형](./multiport.md)을 제공합니다.

**discport** is used for checking if the known neighbors are reachable kaia nodes and fetching their neighbors' addresses for new connections. 이 포트는 UDP 포트입니다.
기본적으로 UDP 포트, 즉 `discport`는 TCP 포트와 동일한 포트를 사용합니다.
노드가 `discport`에 다른 포트를 사용하는 경우 `discport` 쿼리 파라미터로 지정할 수 있습니다.

다음 두 URL은 IP 주소 `10.0.0.1`, TCP 수신 포트 `32323`과 `32324`를 가진 노드의 KNI 예시입니다.
`discport`가 생략된 경우 `port`의 값과 동일한 `32323`의 UDP 포트로 설정됩니다.

```
kni://a979...163c@10.0.0.1:32323                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324   # multi-channel peer
```

다음 두 개는 `discport`가 `30301`인 노드의 KNI 예제입니다.

```
kni://a979...163c@10.0.0.1:32323?discport=30301                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324&discport=30301   # multi-channel peer
```

노드의 KNI를 생성하는 방법은 [노드 키 및 노드 URI 생성](../nodes/core-cell/install/before-you-install.md#node-key-node-uri-creation)을 참고하시기 바랍니다.
The KNI scheme is used in node discovery protocol, [setting `static-nodes.json` file](../nodes/core-cell/install/install-proxy-nodes.md#install-static-nodes-json), [addPeer API](../references/json-rpc/admin/add-peer), [bootnodes option](../misc/operation/configuration.md#properties) and etc.
