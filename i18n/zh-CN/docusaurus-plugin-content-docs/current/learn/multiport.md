# 多渠道

Kaia 节点可以使用**多通道**运行。

如果节点采用多通道配置，则会设置 2 个端口进行通信。 反之，如果节点采用单通道配置，则会设置 1 个端口。
如果 2 个多通道节点尝试连接，则使用 2 个端口建立连接。 否则，它们将使用 1 个端口进行通信。

多通道节点可通过标志"--多通道 "启用。 如果使用 [`kend`]（.../nodes/endpoint-node/install-endpoint-nodes.md），由于 [`kend.conf`]（.../nodes/endpoint-node/install-endpoint-nodes.md）中的语句 `MULTICHANNEL=1`，默认情况下会启用多通道。 要禁用多通道，请将语句替换为 `MULTICHANNEL=0`。
如果要使用特定端口运行节点，可以使用标志 `port` 和 `subport`。 如果要指定连接对等体的端口值，请查阅 [KNI](./kni.md)。

## 建筑学<a id="architecture"></a>

![Multi-Channel Server](/img/learn/multichannel.png)

上图显示了两个多通道节点之间的连接。
主端口（A）和副端口（B）这两个端口传输不同的信息。

- **主端口**（A）用于传输与区块和共识协议有关的信息。
  - 区块信息包括区块的哈希值、标题、正文和接收的请求和响应。
  - 共识信息包括请求（Request）、准备（Prepare）、准备（Prepare）、承诺（Commit）和回合变更（RoundChange）。 信息的含义可参见 [PBFT]（./consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance）。
- **子端口**（B）用于传输交易信息。

![Single Channel Server](/img/learn/singlechannel.png)

图中显示的是两个单通道节点之间或一个单通道节点与一个多通道节点之间的连接。
在这种情况下，所有与区块、交易和共识协议相关的消息都通过同一个端口传输。

## 港口 <a id="multichannel-port"></a>

要在 KNI 中设置端口号，请参阅[KNI 方案](./kni.md)。

- 单通道：单通道节点使用一个端口（默认为 32323）。
- 多通道：多通道节点使用两个端口。 端口可以用 `port` 和 `subport` 指定。 在 Kaia 中，"port"（端口）和 "subport"（子端口）的默认值分别为 32323 和 32324。
  - 连接多通道节点时可能没有设置 `subport`。 在这种情况下，Kaia 节点首先会尝试使用单通道连接。 在握手过程中，会显示实际的对等端口号。 如果对等节点是多通道节点，则将取消正在进行的连接，并使用更新的端口重新连接。
