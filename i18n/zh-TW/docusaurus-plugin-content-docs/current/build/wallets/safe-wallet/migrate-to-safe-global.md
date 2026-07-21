---
title: 遷移至 Safe Global
sidebar_label: 遷移至 Safe Global
---

# 遷移至 Safe Global

:::caution 日落通知

`safe.kaia.io` 將於 **2026 年 8 月 9 日** 停止服務。 請使用 [app.safe.global](https://app.safe.global) 上的 **Safe Wallet** for Kaia 來管理您未來的帳戶。

:::

## 有什麼變化？

Kaia 先前曾提供 **Kaia Safe**（`safe.kaia.io`），這是 Gnosis Safe 的託管分支版本。

**Kaia 主網** 和 **Kairos 測試網** 現已獲得 [Safe Global](https://app.safe.global) 的原生支援。 請透過 [app.safe.global](https://app.safe.global) 上的「Safe Wallet」在 Kaia 上建立及管理「Safes」——請勿使用 Kaia 託管的用戶介面。

## 這會影響我現有的 Safe 帳戶嗎？

**不。** 您的 Safe 帳戶是 Kaia 上的智慧合約。 遷移至 Safe Global 僅會變更 **網頁介面**，不會影響您的鏈上 Safe。

**未變更**

- 安全地址
- 所有者與確認門檻
- 資產（KAIA、代幣、NFT）
- 鏈上交易紀錄

**您應更新的內容**

- 請使用 [app.safe.global](https://app.safe.global) 取代 `safe.kaia.io`
- 在 Safe Wallet 中選擇 **Kaia 主網** 或 **Kairos 測試網**
- 更新仍指向 `safe.kaia.io` 的書籤
- 若希望在新介面中顯示這些標籤，可選擇性地匯出／匯入本機 UI 資料（通訊錄、暱稱）

此功能已確認無誤：當您連接所有者錢包並選擇正確的網路（**Kaia** 或 **Kairos**）時，透過 Kaia Safe 建立的現有保險箱會顯示在 Safe Global 上。 您**無需**重新部署、重新建立，或將資金移轉至新的「安全庫」。

## 如何在 Safe Global 上開啟您現有的保險箱

1. 開啟 [app.safe.global](https://app.safe.global)。
2. 請連接一個身為您「保險箱」**擁有者**的錢包（例如 Kaia Wallet 或 MetaMask）。
3. 請選擇 **Kaia 主網** 或 **Kairos 測試網**。
4. 您的現有「保險箱」應會顯示出來。 如果無法成功，請使用 **新增現有安全區** / **載入**，貼上安全區的地址，並確認網路。

可選步驟：在 `safe.kaia.io` 停止服務之前，若您希望保留暱稱及相關瀏覽器資料，請從舊版使用者介面匯出本機資料（通訊錄和設定），並將其匯入 Safe Wallet 的 **設定 → 資料** 中。 此為可選項目，不會影響鏈上的所有權或餘額。

## 快速解答

- **我需要建立一個新的「保險箱」嗎？** 不需要。
- **我的基金或持有人會有所變更嗎？** 不會。
- **我還能繼續使用 `safe.kaia.io` 嗎？** 僅限至 **2026 年 8 月 9 日** 為止。 請立即切換至 [app.safe.global](https://app.safe.global)。
- **哪裡可以獲得更多協助？** [Safe Wallet 協助中心](https://help.safe.global) 以及 [常見問題](./faqs.md)。

## 下一步

- [在 Kaia 上使用 Safe Wallet](./use-safe-wallet.md) — 建立 Safe、新增資產並發送交易
- [Safe Wallet 概覽](./overview.md) — 網路與 Safe Global 資源
- [常見問題](./faqs.md) — 更多關於帳戶管理的問題
