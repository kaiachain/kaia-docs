---
title: 在 Kaia 上使用 Safe Wallet
sidebar_label: 建立與管理「保險箱」
---

# 在 Kaia 上使用 Safe Wallet

:::caution 日落通知

`safe.kaia.io` 將於 **2026 年 8 月 9 日** 停止服務。 今後請使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 專用 Safe Wallet 來管理您的帳戶。 您現有的「安全帳戶」將自動與「安全錢包」相容。

:::

## 創建安全

以下是在 Kaia 上使用 Safe Wallet 建立 Safe 智慧帳戶的方法。

**步驟 1：** 在瀏覽器中開啟 [Safe Wallet](https://app.safe.global/welcome)。

![](/img/build/wallets/ks-welcome-page-sw.png)

**步驟 2：** 連接您的錢包。 Safe Wallet 支援 [Kaia Wallet](https://docs.kaiawallet.io/) 和 [MetaMask](../../tutorials/connecting-metamask.mdx) 等錢包。 請確保您的錢包及 Safe Wallet 中已選取 **Kaia 主網** 或 **Kairos 測試網**。

![](/img/build/wallets/ks-connect-wallet-sw.png)

**步驟 3：** 點擊 **建立帳戶**（或類似選項），並為您的「保險箱」命名。

![](/img/build/wallets/ks-add-safe-name.png)

**步驟 4：** 輸入可提交及核准交易的地址，以新增所有者／簽署人。 您可以根據需要新增任意數量的所有者，並在日後進行變更。

**步驟 5：** 選擇一筆交易需要多少次所有者確認。 建議將閾值設為大於 1。 一種常見的做法是約 51% 的業主（例如 3 位中的 2 位，或 5 位中的 3 位）。

![](/img/build/wallets/ks-add-signers-sw.png)

**步驟 6：** 檢視參數，然後部署 Safe，並依照螢幕上的提示操作。

![](/img/build/wallets/ks-review-create-safe-sw.png)

**步驟 7：** 部署完成後，開始使用您的 Safe 並開啟帳戶使用者介面。

![](/img/build/wallets/ks-start-using-wallet-sw.png)

![](/img/build/wallets/ks-safe-ui-sw.png)

您的 Safe 帳戶已準備就緒。

## 增加資產

您可以透過將 KAIA、可互換代幣或 NFT 轉帳至帳戶儀表板中顯示的 Safe 地址，為 Safe 注資。

### KAIA 存款

1. 請從帳戶儀表板複製您的 Safe 地址。
2. 請從錢包（例如 MetaMask、硬體錢包或其他已存入資金的帳戶）將 KAIA 轉帳至該地址。
3. 當轉帳確認後，餘額便會顯示在 Safe Wallet 的 **資產** 欄位下。

您可以從任何能夠向 Kaia 帳戶轉帳的地址，向「Safe」充值。 有關 MetaMask 的網路設定，請參閱 [將 MetaMask 連接到 Kaia](../../tutorials/connecting-metamask.mdx)。

### 可互換代幣存款

1. 請複製您的 Safe 地址。
2. 在您的錢包的代幣清單中，選取該代幣並將其發送至 Safe 地址。
3. 請在 Safe Wallet 的 **資產** 選項下確認轉帳並核對餘額。

### NFT 存款

請從支援 Kaia（主網或 Kairos）的交易平台或錢包，將 NFT 轉帳至 Safe 地址。 例如，在 [OpenSea](https://opensea.io/) 上，開啟該 NFT，選擇「轉移」，並貼上 Safe 的地址。 確認後，該 NFT 會出現在 Safe Wallet 的 **資產** / NFT 下方。 請參閱 OpenSea 的 [轉讓指南](https://support.opensea.io/en/articles/8866959-how-can-i-transfer-an-nft-using-opensea)，了解針對特定產品的具體步驟。

## 發送資產

### 傳送 KAIA 及代幣

**步驟 1：** 點擊 **「新增交易」**，然後選擇 **「發送代幣」**。

![](/img/build/wallets/ks-new-tx-sw.gif)

**步驟 2：** 選擇資產，輸入收款人地址及金額。

![](/img/build/wallets/ks-send-details-sw.gif)

**步驟 3：** 檢視並提交。 請使用您的所有者錢包進行簽署；一旦達到確認門檻，交易即會執行。

![](/img/build/wallets/ks-review-send-tx-sw.gif)

### 傳送 NFT

1. 點擊 **新交易**，並選擇 **傳送 NFT**（或 Safe Wallet 中的同等 NFT 轉帳流程）。
2. 選擇 NFT 及收件人。
3. 審閱、收集所需簽名，並簽署。

有關隨時間變動的介面細節，請參閱 [Safe Wallet 說明中心](https://help.safe.global)。

## 補充說明

### 交易手續費

安全交易（資產轉移或合約互動）會產生一筆網路手續費，該費用由**執行**該交易的所有者（通常是最後一位達到閾值的簽署者）支付。

### 安全的非ce值

基於安全性考量，安全交易必須依序執行。 每筆交易都有一個 **nonce**。 只有非ce值設定為 _上次執行的非ce值 + 1_ 的交易才能被執行；非ce值較高的交易將保持在佇列中，直到較早的交易完成且收集到足夠的簽名為止。

### 鏈專屬的地址前綴

從儀表板複製 Safe 地址時，若您的目標錢包不接受鏈名稱前綴，請避免包含該前綴——請直接貼上純地址，以避免轉帳錯誤。

## 更多協助

- [Safe Wallet 幫助中心](https://help.safe.global)
- [安全文件](https://docs.safe.global)
