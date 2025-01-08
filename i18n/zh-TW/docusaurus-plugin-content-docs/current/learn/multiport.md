# 多渠道

Kaia 節點可以使用**多通道**運行。

如果節點採用多通道配置，則會設置 2 個端口進行通信。 反之，如果節點採用單通道配置，則會設置 1 個端口。
如果 2 個多通道節點嘗試連接，則使用 2 個端口建立連接。 否則，它們將使用 1 個端口進行通信。

多通道節點可通過標誌"--多通道 "啟用。 如果使用 [`kend`](../nodes/endpoint-node/install-endpoint-nodes.md)，由於 [`kend.conf`](../nodes/endpoint-node/install-endpoint-nodes.md)中的語句 `MULTICHANNEL=1`，默認情況下會啟用多通道。 要禁用多通道，請將語句替換為 `MULTICHANNEL=0`。
如果要使用特定端口運行節點，可以使用標誌 `port` 和 `subport`。 如果要指定連接對等體的端口值，請查閱 [KNI](./kni.md)。

## 建築學<a id="architecture"></a>

![Multi-Channel Server](/img/learn/multichannel.png)

上圖顯示了兩個多通道節點之間的連接。
主端口（A）和副端口（B）這兩個端口傳輸不同的信息。

- **主端口**（A）用於傳輸與區塊和共識協議有關的信息。
  - 區塊信息包括區塊的哈希值、標題、正文和接收的請求和響應。
  - 共識信息包括請求（Request）、準備（Prepare）、準備（Prepare）、承諾（Commit）和回合變更（RoundChange）。 信息的含義可參見 [PBFT](./consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance)。
- **子端口**（B）用於傳輸交易信息。

![Single Channel Server](/img/learn/singlechannel.png)

圖中顯示的是兩個單通道節點之間或一個單通道節點與一個多通道節點之間的連接。
在這種情況下，所有與區塊、交易和共識協議相關的消息都通過同一個端口傳輸。

## 港口 <a id="multichannel-port"></a>

要在 KNI 中設置端口號，請參閱[KNI 方案](./kni.md)。

- 單通道：單通道節點使用一個端口（默認為 32323）。
- 多通道：多通道節點使用兩個端口。 端口可以用 `port` 和 `subport` 指定。 在 Kaia 中，"port"（端口）和 "subport"（子端口）的默認值分別為 32323 和 32324。
  - 連接多通道節點時可能沒有設置 `subport`。 在這種情況下，Kaia 節點首先會嘗試使用單通道連接。 在握手過程中，會顯示實際的對等端口號。 如果對等節點是多通道節點，則將取消正在進行的連接，並使用更新的端口重新連接。
