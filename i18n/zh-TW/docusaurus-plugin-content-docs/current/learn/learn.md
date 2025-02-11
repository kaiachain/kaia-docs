# 卡婭概述

Kaia 是高度優化的、<LinkWithTooltip to="../misc/glossary#bft-based-public-blockchain" tooltip="A blockchain that ensures consensus even if up to 1/3 of nodes act maliciously,<br /> using Byzantine Fault Tolerance (BFT) algorithms to maintain network integrity."> 基於 BFT 的公共區塊鏈 </LinkWithTooltip>，旨在滿足企業級可靠性和性能標準。 本概述詳細介紹了 Kaia 的架構、功能和生態系統。

## 主要設計目標

Kaia 區塊鏈旨在

- 實現交易的即時終結。
- 為實際應用案例提供高交易處理速度。
- 降低區塊鏈應用的運行成本。
- 降低終端用戶的准入門檻。
- 為各行各業輕鬆採用技術提供便利。

## 核心規格

Kaia 區塊鏈提供

- 區塊生成和確認時間為 1 秒。
- 處理能力達每秒 4000 筆交易。
- Gas 價格低廉，約為以太坊的 1/10。
- 兼容 EVM（以太坊虛擬機），支持 Solidity 合約。
- 全球知名企業組成<LinkWithTooltip to="../misc/glossary#kaia-governance-council-kgc" tooltip="A consortium governing Kaia blockchain development and operations.">Kaia 治理委員會</LinkWithTooltip>進行治理。

## 網絡架構

Kaia 的網絡結構分為三個邏輯子網絡：

![Kaia Ecosystem and its Logical Subnetworks (CCN, ENN, SCN)](/img/learn/klaytn_network_overview.png)

1. **核心單元網絡（CCN)**：由[核心單元（CC)](../nodes/core-cell)組成，負責交易驗證、執行和區塊創建。

2. **端點節點網絡 (ENN)**：由[端點節點 (ENs)](../nodes/endpoint-node)組成，用於處理 RPC API 請求和服務鏈數據。

3. **[服務鏈](../nodes/service-chain)網絡（SCN)**：由 dApps 獨立運行的輔助區塊鏈，通過 EN 與主鏈連接。

### 節點類型

![Kaia Main Chain Physical Topology and Tiered Architecture (CNN, PNN, and ENN)](/img/learn/klaytn_network_node.png)

1. **核心單元（CC）**：由一個共識節點 (CN) 和兩個代理節點 (PN) 組成。

   - **共識節點（CN）**：參與區塊生成。
   - **代理節點（PN）**：提供網絡接口、傳輸交易請求和傳播區塊。

2. **端點節點 (EN)**：充當網絡端點，處理 API 請求和數據處理。

3. **啟動節點**：由 Kaia 運營的特殊節點，用於幫助新節點加入網絡。

## 共識算法

Kaia 使用伊斯坦布爾 BFT 的優化版本，通過區塊鏈特定的修改實現了實用拜占庭容錯（PBFT）。 達成共識的過程包括

1. 使用可驗證隨機函數 (VRF) 選舉委員會<LinkWithTooltip to="../misc/glossary#proposer" tooltip="A randomly chosen consensus node for block creation.">（提案人</LinkWithTooltip>和<LinkWithTooltip to="../misc/glossary#validator" tooltip="A node verifying data, ensuring efficient block processing.">驗證人</LinkWithTooltip>）。
2. 由當選的提案人生成塊。
3. 委員會核實並簽署區塊。

這種[共識機制](consensus-mechanism.md)使 Kaia 能夠實現高性能，每秒可處理 4,000 筆交易，且交易即時完成。

## 區塊生成和傳播

- 區塊以 1 秒間隔為目標，一輪一輪地生成。
- 提案人和委員會的遴選是隨機的，但也是確定的。
- 區塊鏈需要三分之二以上的委員會成員簽名。
- 區塊和事務的傳播通道相互獨立（多通道方法），可有效控制網絡擁塞。

## Kaia 虛擬機（KVM）

Kaia 虛擬機（KVM）為智能合約的執行提供了一個強大的環境：

- 基於以太坊虛擬機（EVM）。
- 支持所有 EVM 操作碼和額外的 Kaia 專用預編譯合同。
- 與 Solidity 和以太坊開發工具（如 Remix、Hardhat、Foundry）兼容。
- 允許開發人員將以太坊智能合約移植到 Kaia 上，只需做極少的修改。

## 安全措施

Kaia 實施了多項安全措施：

- VRF 用於隨機選擇區塊提議者，增加了過程的不可預測性。
- 將驗證器密鑰和獎勵密鑰分開，以防止驗證器密鑰被盜。
- 透明的區塊驗證過程，所有委員會成員都要驗證提議區塊上的簽名。

## 互操作性

Kaia 設計用於與其他區塊鏈網絡無縫互動：

- <LinkWithTooltip tooltip="A blockchain that can run smart contracts and <br/> interact with the Ethereum Virtual Machine(EVM)">與 EVM 兼容</LinkWithTooltip>，可輕鬆部署以太坊智能合約。
- 設計用於與其他基於 EVM-SDK 的鏈進行互操作。
- 支持跨平臺交易和智能合約執行。

## 代幣經濟

Kaia's native token, [KAIA](./token-economics/kaia-native-token.md), plays a central role in the blockchain's economy:

- 每個新區塊都會自動發行 KAIA 代幣。
- 初始年通貨膨脹率：5.2%.
- 區塊獎勵分配如下
  - CCO 和社區：50%（20% 區塊創建者獎勵，80% 押注獎勵）
  - KEF（凱亞生態系統基金）：25%
  - KIF（凱亞基礎設施基金）：25%

這種分銷模式既能激勵網絡參與，又能支持 Kaia 生態系統的成長和發展。

## 管理

Kaia 實施了一套旨在實現公平和包容性的鏈上管理制度：

- 投票權與投入的 KAIA 代幣數量成正比。
- 投票權上限可防止壓制少數人的意見。
- 允許下放表決權。
- 所有治理建議都在鏈上記錄，確保透明度。

## 可審計性和透明度

Kaia 將透明度和可審計性放在首位：

- 所有事務都提供了不可更改和可驗證的狀態變化歷史。
- 區塊鏈探索的兩個主要工具：
  - [Kaiascope](https://kaiascope.com/)：全面的區塊鏈瀏覽器。
  - [Kaiascan](http://kaiascan.io/)：快速查找區塊鏈數據的用戶友好界面。
- Square "投票平臺披露所有費用和季度已知交易。

## 網絡監控

為確保最佳性能和可靠性，Kaia 實施了以下措施：

- 管理網絡擁塞的多通道方法。
- 對所有驗證器進行專門的網絡監控。
