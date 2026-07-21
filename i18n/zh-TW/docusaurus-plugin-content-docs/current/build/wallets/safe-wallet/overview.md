---
title: Safe Wallet 概覽
sidebar_label: Safe Wallet 概覽
---

# Safe Wallet 概覽

:::caution 日落通知

`safe.kaia.io` 將於 **2026 年 8 月 9 日** 停止服務。 請使用 [app.safe.global](https://app.safe.global) 上的 **Safe Wallet** for Kaia 來管理您未來的帳戶。

:::

Safe Wallet 是 [Safe](https://safe.global)（Safe Global）為 Kaia 平台上的 [Safe 智慧帳戶](https://docs.safe.global/home/what-is-safe) 所提供的網頁介面。 您可以透過 [app.safe.global](https://app.safe.global) 管理所有者、閾值、資產及交易；在使用者介面中選擇網路時，可使用 Kaia 主網和 Kairos。

對於來自原先由 Kaia 託管的 Safe（`safe.kaia.io`）的使用者，請參閱 **[遷移至 Safe Global](./migrate-to-safe-global.md)**：現有的 Safe 仍有效；僅有使用者介面有所變更，此為建議的變更。

## 產品與文件

關於架構、智慧帳戶行為以及後端服務（交易服務、客戶端閘道及相關 API），請參閱官方的 Safe Global 資源：

- [什麼是「安全」？](https://docs.safe.global/home/what-is-safe)
- [Safe Wallet 幫助中心](https://help.safe.global)
- [安全文件](https://docs.safe.global)
- [安全交易服務概覽](https://docs.safe.global/core-api/transaction-service-overview)

## Kaia 網路

| 網路         | 鏈 ID |
| ---------- | ---- |
| Kaia 主網    | 8217 |
| Kairos 測試網 | 1001 |

使用 [API Kit](./safe-wallet-api-kit.md) 或其他 Safe SDK 工具時，請傳入正確的 Kaia 鏈 ID。 隨著 `safe.kaia.io` 逐步停用，服務端點可能會有所變更；有關受支援的區塊鏈及設定，請參閱 Safe Global Transaction Service 的文件。

## 歷史註記

Kaia 先前曾營運一個由 Kaia 託管的 Safe 堆疊（包含使用者介面與基礎架構）。 該套件將被淘汰，取而代之的是 [app.safe.global](https://app.safe.global) 上的 Safe Wallet。 諸如 [kaia-safe-infrastructure](https://github.com/kaiachain/kaia-safe-infrastructure) 等舊版儲存庫參考資料，描述的是較舊的部署模式，並非新整合的主要途徑。
