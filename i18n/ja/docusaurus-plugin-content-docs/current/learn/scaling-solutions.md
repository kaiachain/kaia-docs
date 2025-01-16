# スケーリング・ソリューション

Kaia offers robust scaling solutions to ensure high throughput and responsiveness even under heavy network load. These solutions include Service Chains and a novel Multi-Channel communication architecture

## サービスチェーン<a id="service-chain"></a>

Service chains in Klaytn are auxiliary blockchains independent from the Klaytn main chain,
tailored for individual dApp requiring special node configurations, customized security levels,
or exceptionally high throughput that makes deploying the dApp on the main chain inconvenient or economically infeasible.

While there are fully-decentralized scaling solutions, due to their difficult interfaces such as challenge or exit and non-immediate finality,
we take a different approach in Klaytn’s Service Chain by sacrificing the full decentralization for better usability,
instant finality, high performance, and high availability.

Klaytn service chains may be used for various service-specific goals,
and can connect to the main chain for multiple reasons including data anchoring (periodic storing of block hashes
from the service chain onto the main chain to compensate for the decreased security of the service chain due to the smaller number of nodes) or
value transfer (interchain transfer of KLAY, Klaytn’s native unit of value, and the tokens
issued by dApps).

## ネットワーク<a id="network"></a>

Service chains connected to Klaytn main chain are collectively called Service Chain Network.
Note that the method of connection between service chains and the main chain may change in Klaytn’s future iterations.

図1. Klaytn Main Chain and Service Chain](/img/learn/mainchain_servicechain.png)

Figure 1 shows the network topology of service chains being used to meet various business needs, connected
with Klaytn main chain to expand the Klaytn network.

図2. Main Chain and Service Chain Connection using Main/Sub-Bridge Model](/img/learn/sc_connection.png)

Figure 2 shows an example of SCN (Service Chain Consensus Node) connected directly with Klaytn main chain’s EN (Endpoint Node)
using a main/sub-bridge model in using the service chain’s features.

## 特徴<a id="features"></a>

Service Chain expands and augments Klaytn by providing a data integrity mechanism and supporting token transfers between different chains.

### データ・アンカー<a id="data-anchoring"></a>

データの整合性を保つために、サービスチェーンはすべてのサービスチェーンのブロックハッシュをメインチェーンへの特別なトランザクションとして自動的にアンカーすることができる。
このデータ・アンカリングによって、サービス・チェーンのデータは一度作成されると変更できないことをサービス利用者に保証することができる。

### 価値移転<a id="value-transfer"></a>

To help the service providers (SPs) to easily migrate service users and values across chains,
transferring tokens, such as KLAY (Klaytn's native unit of value) and Klaytn tokens issued by dApps, between different chains can be enabled.
ユーザーは、ブリッジコントラクトと呼ばれる特別なコントラクトにトランザクションを送信することで、他のチェーンへのトークン転送を簡単にリクエストできる。

## Multi-Channel Communication

Kaia employs a multi-channel communication architecture to enhance network performance and resilience, particularly during periods of high transaction volume. By separating different message types onto dedicated communication channels, Kaia can maintain efficient block propagation and consensus even under heavy network congestion.

### Architecture

![Multi-Channel Server](/img/learn/multichannel.png)

_Multi-Channel Connection_

![Single Channel Server](/img/learn/singlechannel.png)

_Single-Channel Connection_

### Configuration Modes

- **Multi-Channel:** Uses two ports. Enabled by default in `kend` due to `MULTICHANNEL=1` in `kend.conf`. Disable by setting `MULTICHANNEL=0`. Customize ports using `--port` and `--subport` flags.
- **Single-Channel:** Uses one port (default 32323). Active when `MULTICHANNEL` is not set or set to `0`.

### How Multi-Channel Works

Multi-channel separates different message types onto dedicated ports:

- **Main Port:** Handles block-related messages (requests/responses for hash, header, body, receipt) and consensus messages (Request, Preprepare, Prepare, Commit, RoundChange). The meaning of the messages can be found in [PBFT](./consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance).
- **Subport:** Handles transaction messages.

This separation enhances network stability: if one port fails, the other continues operating. For example, if the subport (typically congested during high traffic) fails, the main port maintains essential block and consensus operations.

### Connection Establishment

- **Multi-Channel to Multi-Channel:** Both ports are used.
- **Other Cases (Multi-Channel to Single-Channel or Single-Channel to Single-Channel):** A single port is used.

If a node attempts to connect without specifying a subport, it initially connects using a single port. During the handshake, if the peer is multi-channel, the connection is re-established using both ports.

### Port Configuration (KNI)

See [the KNI scheme](./kni.md) for details. Default ports are 32323 (main) and 32324 (sub).

### Integration with KNI

Multi-channel integrates with KNI for node discovery and connection. KNI URLs allow specifying both main and subports.

### Implementation Note

Kaia's multi-channel implementation deviates slightly from the original specification. While the details of this deviation are beyond the scope of this document, the core principles of enhanced network communication and robustness remain central to Kaia's operation. This information is primarily relevant for node operators and developers.

In summary, multi-channel enhances Kaia's network by segregating message traffic, improving efficiency and resilience. While providing advanced configuration options for node operators, the system remains transparent to general users.
