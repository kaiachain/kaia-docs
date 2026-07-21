---
title: 與合約進行互動
sidebar_label: 合約互動
---

# 與合約進行互動

:::caution 日落通知

`safe.kaia.io` 將於 **2026 年 8 月 9 日** 停止服務。 今後請使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 專用 Safe Wallet 來管理您的帳戶。 您現有的「安全帳戶」將自動與「安全錢包」相容。

:::

在本節中，您將使用由 Safe Wallet 管理的 Safe 帳戶，與 Kairos 上的簡單合約進行互動。

**先決條件**

- 已為 [Kaia / Kairos](../../tutorials/connecting-metamask.mdx) 設定 [MetaMask](https://metamask.io/download/)
- [混音版](https://remix.ethereum.org/) （視需要由 Kaia 網路提供支援）
- 從 [Faucet](https://faucet.kaia.io) 測試 KAIA
- Kairos 上的 Safe 帳戶（[建立一個](./use-safe-wallet.md#create-a-safe)）

**步驟 1：** 開啟 [Remix](https://remix.ethereum.org/)。

**步驟 2：** 編譯並部署一個範例儲存合約（或您自己的合約）。

在從 Safe 進行互動之前，請先部署該合約。 一個典型的範例合約會公開一個 `uint` 變數，您可以透過 `store` 來更新它，並透過 `retrieve` 來讀取它。

![](/img/build/wallets/ks-succor-deploy.gif)

**步驟 3：** 在 Safe Wallet 中啟動一筆新交易。

點擊 **新交易**。 請輸入已部署的合約地址和 ABI，以便您能選擇方法和參數。

![](/img/build/wallets/ks-succor-init-tx.gif)

**第 4 步：** 檢視並提交。 使用持有者錢包進行簽署；一旦達到確認門檻，交易即會執行。

![](/img/build/wallets/ks-succor-review-tx.gif)

您也可以使用 [交易建構器](./tx-builder.md) 批次執行合約呼叫，或透過 [API 套件](./safe-wallet-api-kit.md) 以程式化方式提出合約呼叫。
