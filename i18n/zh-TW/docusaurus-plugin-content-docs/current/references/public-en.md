# 公共 JSON RPC 端點

公開暴露的 JSON-RPC 端點允許您測試和運行您的區塊鏈產品，提供與 Kaia 網絡的交互，而無需運行自己的節點。

運行自己的 Kaia 端點節點 (EN) 並不簡單，它需要專業技術、監控和計算資源。 它需要維護存儲、網絡帶寬，還需要佔用工程時間和資源；節點必須保持更新，並定期進行健康檢查。

因此，使用現有公共 EN 的主要好處是，它可以讓您只專注於構建和測試您的區塊鏈產品，而無需分心維護與 Kaia 網絡連接和交互的基礎設施。

## 注意事項

- 節點提供商不對因流量或與節點的交互而造成的任何損害或損失負責。
- 如果流量集中在某些節點上，您可能會遇到服務延遲。
- 為防止請求過多，可能會對每個節點實行費率限制，費率限制如有變更，恕不另行通知。

## 公共 JSON-RPC 端點

以下是 Kaia 公共節點提供商提供的網絡域列表。

:::info[Outdated 終端停止工作]

請注意，以下網址已於 2024 年 9 月底停止使用。 我們建議您相應更新配置，以確保服務不中斷：

**主網**

- `https://public-en-cypress.klaytn.net` (由 `https://public-en.node.kaia.io` 代替)
- `https://archive-en.cypress.klaytn.net` (由 `https://archive-en.node.kaia.io` 代替)

**測試網**

- `https://public-en-baobab.klaytn.net` (由 `https://public-en-kairos.node.kaia.io` 代替)
- `https://archive-en.baobab.klaytn.net` (由 `https://archive-en-kairos.node.kaia.io` 代替)

:::

### 主網公共 JSON-RPC 端點

請記住，這些端點是提供給社區用於測試和開發目的的。
由於我們無法保證端點的正常運行時間和穩定性，因此請勿將其用於商業目的。

**HTTPS**

| 服務提供商                                  | 終點                                                         | 命名空間              | 類型 |
| -------------------------------------- | ---------------------------------------------------------- | ----------------- | -- |
| [凱亞基金會](https://www.kaia.io)           | `https://public-en.node.kaia.io`                           | kaia,klay,eth,net | 全部 |
|                                        | `https://archive-en.node.kaia.io`                          | kaia,klay,eth,net | 檔案 |
| [QuickNode](https://quicknode.com/)    | `https://alpha-hardworking-orb.kaia-mainnet.quiknode.pro/` | kaia,klay,eth,net | 全部 |
| [BlockPI Network](https://blockpi.io/) | `https://kaia.blockpi.network/v1/rpc/public`               | kaia,klay,eth,net | 全部 |
| [BlockJoy](https://blockjoy.com/)      | `http://freely-inspired-ram.n0des.xyz`                     | kaia,klay,eth,net | 檔案 |
| [OnFinality](https://onfinality.io/)   | `https://klaytn.api.onfinality.io/public`                  | kaia,klay,eth,net | 全部 |
| [Pokt Network](https://pokt.network/)  | `https://kaia-mainnet.rpc.grove.city/v1/803ceedf`          | kaia,klay,eth,net | 全部 |
| [GetBlock](https://getblock.io/)       | `https://go.getblock.io/d7094dbd80ab474ba7042603fe912332`  | kaia,klay,eth,net | 全部 |
| [dRPC](https://drpc.org/)              | `https://klaytn.drpc.org`                                  | kaia,klay,eth,net | 全部 |

**WebSocket**

| 服務提供商                                | 終點                                                                                                                         | 命名空間              | 類型 |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ----------------- | -- |
| [Kaia基金會](https://www.kaia.io)       | wss://public-en.node.kaia.io/ws                            | kaia,klay,eth,net | 全部 |
|                                      | wss://archive-en.node.kaia.io/ws                           | kaia,klay,eth,net | 檔案 |
| [QuickNode](https://quicknode.com/)  | wss://alpha-hardworking-orb.kaia-mainnet.quiknode.pro/\`\` | kaia,klay,eth,net | 全部 |
| [OnFinality](https://onfinality.io/) | wss://klaytn.api.onfinality.io/public-ws                   | kaia,klay,eth,net | 全部 |
| [dRPC](https://drpc.org/)            | `wss://klaytn.drpc.org`                                                                                                    | kaia,klay,eth,net | 全部 |

### Testnet（Kairos）公共 JSON-RPC 端點

**HTTPS**

| 服務提供商                                  | 終點                                                           | 命名空間              | 類型 |
| -------------------------------------- | ------------------------------------------------------------ | ----------------- | -- |
| [Kaia基金會](https://www.kaia.io)         | `https://public-en-kairos.node.kaia.io`                      | kaia,klay,eth,net | 全部 |
|                                        | `https://archive-en-kairos.node.kaia.io/`                    | kaia,klay,eth,net | 檔案 |
| [QuickNode](https://quicknode.com/)    | `https://responsive-green-emerald.kaia-kairos.quiknode.pro/` | kaia,klay,eth,net | 全部 |
| [BlockPI Network](https://blockpi.io/) | `https://kaia-kairos.blockpi.network/v1/rpc/public`          | kaia,klay,eth,net | 全部 |

**WebSocket**

| 服務提供商                               | 終點                                                                                                                           | 命名空間              | 類型 |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------- | -- |
| [Kaia基金會](https://www.kaia.io)      | wss://public-en-kairos.node.kaia.io/ws                       | kaia,klay,eth,net | 全部 |
|                                     | `wss://archive-en-kairos.node.kaia.io/ws`.                                                                   | kaia,klay,eth,net | 檔案 |
| [QuickNode](https://quicknode.com/) | wss://responsive-green-emerald.kaia-kairos.quiknode.pro/\`\` | kaia,klay,eth,net | 全部 |

## RPC 服務提供商

以下是 Kaia 的公共節點提供商列表。

### Kaia API 服務 (KAS)

KAS 提供各種應用程序接口，以支持更簡單、更快速的區塊鏈應用程序開發。 您可以大大縮短開發時間，運行穩定的服務，並節約成本。

#### 特點

- 免費計劃每天 10,000 次請求（每秒 100 次請求
- 為免費計劃提供社區支持，為付費計劃（Starter、Pro 和 Pro Plus）提供票務支持
- Kaia 節點應用程序接口、令牌歷史應用程序接口、錢包應用程序接口、錨應用程序接口、KIP-7、17、37 應用程序接口和元數據應用程序接口

#### 參考資料

- [文件](https://www.klaytnapi.com/en/resource/docs/readme)
- [訂閱](https://www.klaytnapi.com/en/landing/pricings)
- [Website](https://www.klaytnapi.com/en/landing/main)

### All That Node

All That Node 的目標是成為 Web3 基礎設施的可靠網關，讓構建者不再為區塊鏈網絡問題所困擾。 All That Node 保證以最低的延遲性能快速、穩健地連接 RPC 節點。

#### 特點

- 生態系統的公共節點和水龍頭
- 如果您需要更多，可支持 "即用即付 "計劃
- 專用節點
- 支持 24+ 種區塊鏈
- 現有檔案數據
- 可用的 Websocket API
- 提供跟蹤/調試 API
- 正常運行時間 99.9%+
- 實施負載平衡
- 無限可擴展性
- Discord 社區提供全天候支持

#### 參考資料

- [文件](https://docs.allthatnode.com/)
- [訂閱](https://www.allthatnode.com/pricing.dsrv)
- [Website](https://www.allthatnode.com/main.dsrv)

### Tatum

Tatum 是構建、測試和運行區塊鏈應用程序的最快方式。 我們為開發人員提供最靈活的平臺，讓他們快速將區塊鏈創意變為現實。

#### 特點

- 免費計劃每秒 5 個請求，付費計劃（開始、基本）每秒 200 個請求
- 社區支持

#### 參考資料

- [Docs](https://apidoc.tatum.io/tag/Kaia?_gl=1*1dhfv8u*_ga*MzY5NDMyNzg5LjE2NDQ1NTk1MzA.*_ga_BH6F6RKJW6*MTY2MjAxNDQ0OS4xNy4xLjE2NjIwMTQ2MTQuMjQuMC4w)
- [定價](https://tatum.io/pricing)
- [Website](https://tatum.io/)

### BlockPI

BlockPI Network旨在提供優質、穩健和高效的RPC服務。 為了避免單點故障和可擴展性的限制，網絡被設計成分佈式結構，具有可擴展的 RPC 節點。

BlockPI 為 Kaia 社區提供免費的公共端點，併為付費用戶提供高級功能。  BlockPI 設計了兩種付費套餐，並支持 "即用即付"，以滿足用戶的靈活需求。 您可以查看每個套餐的定價詳情 (https://docs.blockpi.io/documentations/pricing) 以及 Kaia 的單項方法費用 (https://docs.blockpi.io/documentations/request-unit-ru)

#### 特點

- 免費服務每秒 20 個請求，付費套餐無限制。
- 選擇 Kaia 存檔節點和終端節點
- 端點節點可列入白名單
- WSS 可用，即將訂閱
- 支持跟蹤

#### 參考資料

- [文件](https://docs.blockpi.io/)
- [訂閱](https://dashboard.blockpi.io/wallet/overview)
- [Website](https://blockpi.io/)

### Pocket Network

Pocket Network 是 Web3 節點基礎設施的 TCP/IP - 一種多鏈中繼協議，可激勵 RPC 節點為 DApp 及其用戶提供勢不可擋的 Web3 訪問。

Pocket 支持數十種區塊鏈，而且還在不斷增加。

#### 特點

- 去中心化 RPC 協議和市場
- 每天 250,000 次請求 免費級別（最多兩個應用程序，端點數量不限）
- 公共端點
- 付費計劃（如果您每天需要超過 250,000 個請求）
- 支持 30 多種區塊鏈
- 25,000 + 個節點為應用程序提供 POKT 服務
- 支持存檔節點、帶跟蹤功能的存檔節點和測試網絡節點
- 無單點故障
- 零停機時間
- 低成本高效益的近零代幣經濟（用一次 POKT 換取網絡帶寬）
- 無需每月支付沉沒成本，將基礎設施轉化為資產
- 協議內置負載平衡功能
- 無限擴展每天的請求數和每小時的節點數
- 最私密、抗審查的選擇
- 開發人員實踐支持

#### 參考資料

- [文件](https://docs.pokt.network/api-docs/klaytn-evm/#/)
- [Website](https://docs.pokt.network/)
- [掌上門戶](https://bit.ly/ETHorg_POKTportal) 儀表板和分析

### ANKR

Ankr 的分佈式節點網絡產生了強大的協同效應，使開發人員能夠輕鬆、安全地連接到公共端點。 通過優化資源使用的微調緩存，Ankr 保證了快速 RPC 請求和低延遲性能，從而在構建去中心化應用程序時實現卓越的效率。

#### 特點

- 免費計劃每秒 500 個請求，高級計劃每秒 1 500 個請求。 可根據要求進行升級。
- 免費計劃有 Discord 和支持門戶，高級計劃有專門的支持。
- 高級計劃可使用 WebSocket。

#### 參考資料

- [文件](https://www.ankr.com/docs/build-blockchain/overview)
- [訂閱](https://www.ankr.com/rpc/pricing/)
- [Website](https://www.ankr.com/rpc/)

### NodeReal

NodeReal 是一家區塊鏈基礎設施和服務提供商。 NodeReal 以最可靠的解決方案幫助開發人員和投資者探索區塊鏈。

#### 特點

- 免費層級，3 個 API 密鑰，每月 3.5 億計算單位（CU），每月 300 計算單位/秒（CUPS），存檔數據
- 增長級、15 個 API 密鑰、每月 5 億計算單位（CU）、每月 700 計算單位/秒（CUPS）、歸檔數據、調試和跟蹤 API
- 企業層級、自定義 API 密鑰數量、自定義每月使用量、專用支持、服務級別協議（SLA）和其他要求
- 每秒 50 次查詢 (QPS)/方法

#### 參考資料

- [文件](https://docs.nodereal.io/docs/getting-started)
- [訂閱](https://nodereal.io/api-marketplace/klaytn-rpc)
- [Website](https://nodereal.io)

### Nodit

Nodit 旨在提供企業級 Web3 基礎設施，供所有人使用。 通過以合理的價格提供正常運行時間達 99.9% 的強大節點基礎設施和可靠的可隨時查詢的區塊鏈數據，我們為開發人員進入 Web3 世界提供了便利。

#### 特點

- Kaia Testnet 的官方龍頭 [https://kaiafaucet.com](https://kaiafaucet.com)
- 99.9%+ 正常運行時間
- 免費訪問 Datasquare 中的索引存檔數據 - 支持儀表板和 SQL
- 數據管道集成支持
- 高級開發人員層支持自動縮放
- 100+ 個用於 NFT、令牌、統計等的 Web3 數據應用程序接口
- 提供 Webhook 和流（WebSocket）
- 專用節點
- 每月 350,000,000 個計算單元 (CU)（免費級別
- 日誌監控儀表板

#### 參考資料

- [Website](https://nodit.io)
- [Datasquare網站](https://datasquare.nodit.io)
- [文件](https://developer.nodit.io)
- [博客](https://blog.nodit.io)

### GetBlock

GetBlock 為包括 Kaia 在內的 50 多個主要區塊鏈網絡的完整 RPC 節點提供快速、可靠的 API 訪問。 通過處理節點維護，GetBlock 使開發人員和企業能夠專注於構建 dApp 和區塊鏈解決方案，而無需為基礎設施頭疼。

#### 特點

- 每天有 40k 個免費試用請求，RPS 高達 60。 它還提供入門計劃和無限計劃，以獲得更好的性能和支持。
- 99.9%+ 正常運行時間
- 免費訪問 50 多個帶有 RPC 節點的區塊鏈協議
- 高級監控和統計
- 專用節點

#### 參考資料

- [Website](https://getblock.io/)
- [文件](https://getblock.io/docs/getblock-explorer/get-started/)

### BlockJoy

BlockJoy 可在任何裸金屬基礎設施上提供專用的非計量區塊鏈節點。 它為節點、定樁、API、索引器、區塊鏈開發人員等各種服務提供節點基礎設施。

#### 特點

- 在裸機服務器上以最高性能運行節點。
- 削減高達 80% 的運營成本。
- 享受平臺專為 Web3 基礎架構打造的精簡用戶界面和雲體驗。

#### 參考資料

- [Website](https://blockjoy.com/)
- [博客](https://blockjoy.com/blog)

### QuickNode

Quicknode 提供區塊鏈基礎設施，為安全的去中心化創新提供動力。 他們提供構建者創建令人難以置信的產品所需的所有工具和資源，所有這些都有無與倫比的全球平衡基礎設施、有保障的可靠性和安全性、用戶友好的界面以及端到端的客戶支持作為後盾。

#### 特點

- 免費計劃的請求次數為 15 次/秒，API 點數為 1000 萬。
- 提供商啟動計劃、成長計劃和業務計劃，可獲得更多積分和 IPFS 存儲空間。
- 經過實戰檢驗的 RPC 和 API 基礎設施可提供大規模的性能和可靠性。
- 擁有數十種附加組件，讓構建超級強大的 dApps 變得前所未有的簡單。
- 提供流，最強大的即時數據管道。
- 活動警報。

#### 參考資料

- [Website](https://www.quicknode.com/)
- [文件](https://www.quicknode.com/docs/welcome)

### dRPC

為 Kaia、Ethereum、Polygon、Arbitrum 等提供去中心化 RPC 節點。 您值得信賴的 Web3 基礎設施合作伙伴。

#### 特點

- 一般支持的公共節點無申請限制。
- 高性能節點還可選擇增長計劃和企業計劃。
- 90+ blockchains across 100+ networks
- 人工智能驅動的負載平衡器
- 富有洞察力的分析。

#### 參考資料

- [網站](https://drpc.org/)
- [文檔](https://drpc.org/docs)

## 實用資源

- 錢包[Kaia Wallet](../build/tools/wallets/kaia-wallet.md)是 Kaia 網絡的瀏覽器擴展錢包。

- Faucet：您可以從 [KAIA Faucet](https://faucet.kaia.io)獲取用於 Kairos 測試網絡的測試 KAIA。

- 資源管理器：[Kaiascope](../build/tools/block-explorers/kaiascope.md)是 Kaia 網絡的區塊資源管理器。

- ChainID : Kairos: 1001 (0x3E9), Mainnet：8217 (0x2019)

- Gas價格：在 [25, 750] 範圍內動態調整。 該範圍可通過鏈上管理進行更改。 更多信息，請參閱 [治理](https://docs.kaia.io/references/json-rpc/governance/chain-config/) 和
  [交易費用](../learn/transaction-fees/transaction-fees.md)
