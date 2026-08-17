---
title: Safe Wallet 概覽
sidebar_label: Safe Wallet 概覽
---

# Safe Wallet 概覽

:::caution 日落通知

`safe.kaia.io` 將於 **2026 年 8 月 31 日** 停止服務。 請使用 [app.safe.global](https://app.safe.global) 上的 **Safe Wallet** for Kaia 來管理您未來的帳戶。 如果您已經擁有 Safe，請參閱 [遷移至 Safe Global](./migrate-to-safe-global.md)。

:::

[Safe Wallet](https://app.safe.global) 是 Safe Global 針對 [Safe Smart Accounts](https://docs.safe.global/home/what-is-safe) 所推出的官方介面。 「安全智慧帳戶」（Safe Smart Account）是一種智慧合約錢包：與其由單一私鑰控制資金，而是必須由一組簽署人根據確認門檻，對每筆交易進行批准。 Kaia 主網和 Kairos 測試網均已上線——請連接您的所有者錢包，選擇網路，然後建立或開啟一個「保險箱」。

## 關鍵概念

| 概念                                                                | 這代表什麼意思                                                          |
| ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| **簽署人（所有者）**                                                      | 可提出及確認交易的地址。 您可隨時在 **設定** 中新增、移除或替換這些項目。                         |
| **閾值**                                                            | 一筆交易在執行前需要多少個簽署人的確認（例如 3 個中的 2 個）。 請保持在 1 以上。                    |
| **[模組](https://docs.safe.global/advanced/smart-account-modules)** | 可選的合約，能擴展帳戶的功能——資料復原、支出額度、自動化。 模組可在無需簽署人批准的情況下轉移資金，因此請僅啟用您信任的模組。 |
| **[守衛](https://docs.safe.global/advanced/smart-account-guards)**  | 可選的合約，會在每筆交易執行前後進行檢查，讓您能夠強制執行自訂規則。                               |
| **安全應用程式**                                                        | 嵌入介面中的第三方應用程式，例如以下指南中使用的「交易建構器」和「CSV 空投」。                        |

若要全面了解該帳戶在區塊鏈上的運作方式，請閱讀 [「安全智慧帳戶」如何運作？](https://docs.safe.global/advanced/smart-account-overview)。

## 工作區

[工作區](https://safe.global/blog/introducing-workspace-the-onchain-operating-environment-for-treasury-teams) 是 Safe Global 為同時運行多個 Safe 的團隊所提供的環境。 它建立在相同的智慧帳戶之上——它改變的是團隊的協調方式，而非交易如何執行或誰持有金鑰。

- **統一儀表板** — 將該領域內所有帳戶的餘額與待處理交易，整合於單一畫面中。
- **[安全中心](https://safe.global/blog/workspace-security-hub)** — 包含各帳戶的簽署者、門檻、模組、保護機制、恢復選項及 Safe 版本，並會針對其鏈上配置進行自動檢查。
- **共用通訊錄** — 為整個團隊提供一套標有標籤的通訊錄，而非每個瀏覽器各自的本地清單。
- **電子郵件登入** — 團隊成員可透過電子郵件一次性驗證碼或 Google 帳號登入，無需持有實體鑰匙即可查看餘額、追蹤待處理交易，並管理聯絡人。 簽署仍需使用所有者錢包。

這最後一點對於 Kaia 平台上的財務、合規及營運審核人員非常有用，他們需要能查看財務「保險箱」的內容，但絕不應成為該「保險箱」的簽署人。

## Safe Global 文件

Safe Wallet、Safe Smart Account 合約、Safe Core SDK 以及後端服務，均由 Safe Global 開發與維護，相關文件請參閱 [docs.safe.global](https://docs.safe.global)。

Kaia 文件涵蓋了 Kaia 的特定內容：支援的網路、鏈 ID，以及常見任務的操作指南。 關於 Safe 本身的運作方式——包括合約版本、模組與守護機制、API 架構及 SDK 參考資料——請參閱 Safe Global 的文件，該文件由 Safe 團隊持續更新。

### 該往哪裡找

| 若您想…                               | 前往                                                                                                                                |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 了解何謂「安全智慧帳戶」                       | [什麼是「安全」？](https://docs.safe.global/home/what-is-safe)                                                                            |
| 了解帳戶架構、模組及保護機制                     | [「安全智慧帳戶」是如何運作的？](https://docs.safe.global/advanced/smart-account-overview)                                                       |
| 查詢合約函式、事件及版本                       | [智慧帳戶參考資料](https://docs.safe.global/reference-smart-account/overview)                                                             |
| 使用 Safe SDK 進行開發（入門套件、協定、API、中繼套件） | [SDK 概覽](https://docs.safe.global/sdk/overview)                                                                                   |
| 透過 HTTP 進行查詢安全機制、交易及簽名             | [安全基礎設施](https://docs.safe.global/core-api/api-overview) · [交易服務](https://docs.safe.global/core-api/transaction-service-overview) |
| 檢查 Safe 服務支援哪些區塊鏈                  | [支援的網路](https://docs.safe.global/advanced/smart-account-supported-networks)                                                       |
| 關於「Safe Wallet」應用程式本身的協助           | [Safe 協助中心](https://help.safe.global)                                                                                             |
| 釐清「安全」相關術語                         | [術語表](https://docs.safe.global/home/glossary)                                                                                     |

若本站的頁面內容與 Safe Global 的文件不一致，請參照 Safe Global 的說明並 [提交問題](https://github.com/kaiachain/kaia-docs/issues)，以便我們更新 Kaia 的頁面。

## Kaia 網路

| 網路         | 鏈 ID |
| ---------- | ---- |
| Kaia 主網    | 8217 |
| Kairos 測試網 | 1001 |

在建立或開啟帳戶之前，請先從 Safe Wallet 的鏈切換器中選擇網路——當選取主網時，部署在 Kairos 上的 Safe 將無法顯示。 使用 [API Kit](./safe-wallet-api-kit.md) 或其他 Safe SDK 工具時，請從 [Safe Global 支援的網路](https://docs.safe.global/advanced/smart-account-supported-networks) 中取得相應的鏈 ID 及交易服務端點，而非直接硬編碼。

## Kaia 專用指南

- [遷移至 Safe Global](./migrate-to-safe-global.md) — 將現有的 Safe 移至 Safe Wallet
- [建立與管理安全庫](./use-safe-wallet.md) — 在 Kaia 上建立安全庫、新增資產、發送交易
- [合約互動](./contract-interaction.md) — 從 Kaia 上的 Safe 呼叫合約
- [交易建構器](./tx-builder.md) 與 [CSV 空投](./csv-airdrop.md) — 在 Kaia 上進行批次處理
- [API 套件](./safe-wallet-api-kit.md) — 採用 Kaia 鏈 ID 的安全交易服務
- [常見問題](./faqs.md)
