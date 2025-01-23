# Finschia檔案

本頁面為現有 Finschia 用戶（包括 FNSA 令牌持有者、DApp 構建者和節點操作員）提供信息存檔。 由於 Finschia 與 Klaytn 整合形成了 Kaia，本資源現在作為有關 Finschia 的關鍵信息摘要和更廣泛的 Kaia 文檔的子集而存在。

## 關於Finschia

Finschia 是一個基於 Cosmos-SDK 的鏈，它遷移了前 LINE 區塊鏈主網的狀態，於 2022 年 12 月 22 日推出。

在 Klaytn [KGP-25](https://govforum.klaytn.foundation/t/kgp-25-klaytn-finschia-mainnet-merge/719) 和 Finschia [FGP-23](https://www.mintscan.io/finschia/proposals/23) 的鏈上提案獲得批准之後，這兩條鏈正在進行分階段的技術整合。

FNSA 代幣是 Finschia 主網的原生（基礎）代幣，在 Kaia 主網啟動後，可通過 Kaia 門戶網站將其轉換（交換和橋接）為 KAIA 代幣。 KAIA 是 Kaia 主網的原生幣。

## Finschia規格

Finschia 同時運行 Mainnet 和 Testnet 環境，每個環境的規格如下：

| **類別** | **Finschia主網**                                                                                                                                                                                                                                                                                                                                         | **Ebony測試網**                                                                                                                                                                                                                                          |
| :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 目的和用途  | FNSA 可間接或直接用於服務和 Finschia 治理的真實環境                                                                                                                                                                                                                                                                                                                      | 與 Finschia 主網規格相同的開發和測試環境                                                                                                                                                                                                                             |
| 共識算法   | Ostracon（PBFT + DPoS + VRF）                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                       |
| 鏈條 ID  | finschia-2                                                                                                                                                                                                                                                                                                                                             | ebony-2                                                                                                                                                                                                                                               |
| 地址前綴   | 鏈接                                                                                                                                                                                                                                                                                                                                                     | 鏈接                                                                                                                                                                                                                                                    |
| 基礎代幣   | **FNSA (FINSCHIA)**<br/>- 面值: cony<br/>- 小數位: 6 (1 FNSA = 10^6 cony)<br/>**KAIA**<br/>- 面值: kei<br/>- 小數位: 18 (1 KAIA = 10^18 kei)<br/>**交換率**<br/>- FNSA:KAIA = 1:148.079656 | **TFNSA**<br/>- 面值：tcony<br/>- 小數位：6（1 TFNSA = 10^6 tcony）<br/>**KAIA**<br/>- 面值：kei<br/>- 小數位：18（1 KAIA = 10^18 kei）<br/>**交換率**<br/>- TFNSA:KAIA = 1:148.079656<br/>- ebony測試網的 KAIA 是一種測試幣，沒有實際價值。 |
| 主要特點   | - 智能合約<br/>- 收集 (NFT)<br/>- 授權<br/>- 鏈上治理                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                       |
| 性能     | - 區塊確認時間：約 3.3+ 秒<br/>- TPS（每秒交易次數）：1200                                                                                                                                                                                                                                                                                               |                                                                                                                                                                                                                                                       |

## Finschia 開發人員資源

有關Finschia的技術信息，請參閱以下鏈接。 該清單可根據需要進行更新。

如果您無法在這些鏈接中找到所需的信息，或需要更詳細的信息，請聯繫 contact@kaia.io。

| **資料庫**       | **鏈接**                                                                                                                     | **說明**                                 |
| :------------ | :------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| 官方 Github 存儲庫 | https://github.com/Finschia/finschia                                                       | 介紹、安裝、連接到主網/服務器網、與 Finschia 節點交互、端點信息  |
| 二進制版本         | https://github.com/Finschia/finschia/releases                                              | 最新或舊版本的 Finschia 二進制文件及發佈說明            |
| Finschia-sdk  | https://github.com/Finschia/finschia-sdk                                                   | 基於 Finschia 的區塊鏈構建框架，從 cosmos-sdk 分支而來 |
| 原型文件          | https://github.com/Finschia/finschia-sdk/blob/main/docs/core/proto-docs.md | Finschia 各模塊的信息、查詢、結構和參數               |
| Finschia-kt   | https://github.com/Finschia/finschia-kt                                                    | 用於 Finschia 的 Kotlin SDK               |
| Finschia-js   | https://github.com/Finschia/finschia-js                                                    | Finschia 的 Javascript SDK              |
| Ostracon      | https://github.com/Finschia/ostracon                                                       | Finschia 共識算法                          |
