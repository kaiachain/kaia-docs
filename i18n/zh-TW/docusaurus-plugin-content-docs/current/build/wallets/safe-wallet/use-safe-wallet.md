---
title: 在 Kaia 上使用 Safe Wallet
sidebar_label: 建立與管理「保險箱」
---

# 在 Kaia 上使用 Safe Wallet

:::caution 日落通知

`safe.kaia.io` 將於 **2026 年 8 月 31 日** 停止服務。 今後請使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 專用 Safe Wallet 來管理您的帳戶。 您現有的「安全帳戶」將自動與「安全錢包」相容。

:::

## 創建安全

以下是在 Kaia 上使用 Safe Wallet 建立 Safe 智慧帳戶的方法。

**步驟 1：** 在瀏覽器中開啟 [Safe Wallet](https://app.safe.global/welcome)。 登陸頁面上有兩個分頁：**工作區**，供共同管理多個帳戶的團隊使用；以及 **我的帳戶**，顯示您已連線的錢包所登入的「保險庫」。 若要建立一個「保險箱」，請留在 **我的帳戶** 頁面。

:::tip

管理一個擁有數個「保險箱」及一支審核團隊的財務部門？ [Workspace](./overview.md#workspace) 為那些需要查看資訊但無需持有簽署金鑰的成員，新增了共享儀表板、共享通訊錄以及電子郵件登入功能。 您可以先建立「保險箱」，稍後再將它們整理到工作區中。

:::

![Safe Wallet 歡迎頁面，已選取「我的帳戶」分頁，顯示「連接錢包」與「查看任何帳戶」](/img/build/wallets/sg-welcome-page.png)

**步驟 2：** 點擊 **「連接錢包」**，並選擇 [MetaMask](../../tutorials/connecting-metamask.mdx)。 此對話方塊僅會列出其偵測到的錢包，因此若您未看到所需的錢包，請先安裝該擴充功能——安裝 [Kaia Wallet](https://docs.kaiawallet.io/) 的擴充功能後，它便會出現在此處。 請確保您的錢包及 Safe Wallet 中已選取 **Kaia 主網** 或 **Kairos 測試網**。

![「連接您的錢包」對話方塊中，MetaMask 在可用錢包清單中被標示出來](/img/build/wallets/sg-connect-wallet.png)

**步驟 3：** 點擊 **建立帳戶**，為您的「保險箱」命名，然後選擇要部署的網路——主網請選擇 **Kaia**，測試網請選擇 **Kairos**。 您稍後可以新增更多網路。 點擊 **下一步**。

![設定基本步驟，輸入「Safe」作為名稱，並在「選擇網路」下選取「Kairos」](/img/build/wallets/sg-add-safe-name.png)

**步驟 4：** 在 **簽署者與確認** 部分，新增可提出及批准交易的地址。 您的已連線錢包是 **簽署者 1**；若要新增其他簽署者，請點擊 **新增簽署者**。 名稱是可選的標籤，用以供您日後參考。 您稍後可以變更簽署人。

**第 5 步：** 設定 **閾值**——交易執行前必須有多少位簽署者確認。 請選擇大於 1 的數值。 常見的做法是約 51% 的簽署人（例如 3 人中有 2 人，或 5 人中有 3 人）。 點擊 **下一步**。

![「簽署者與確認」步驟，新增三位簽署者，且閾值設定為 3 人中 2 人同意](/img/build/wallets/sg-add-signers.png)

**步驟 6：** 檢查網路、名稱、簽署者及門檻。 部署「保險箱」是一項鏈上交易，因此需支付一次性的 KAIA 啟動費——請確保您已連接的錢包內有足夠的 KAIA。 點擊 **建立帳戶**，然後在您的錢包中確認這筆交易。

![審核步驟圖，顯示網路、名稱、三位簽署人、2/3 的閾值，以及以 KAIA 計價的預估啟用費](/img/build/wallets/sg-review-create-safe.png)

**步驟 7：** 交易確認後，您的「保險箱」即已啟用。 對話方塊會顯示該地址——這是您用來接收款項的地址，與您的簽署者錢包地址不同。 點擊 **開始吧** 來開立帳戶。

![「您的帳戶已設定完成」對話方塊，顯示 Kairos 上的新「安全名稱」與地址](/img/build/wallets/sg-start-using-wallet.png)

帳戶開啟時會顯示 **概覽** 頁面，側邊欄則包含 **資產**、**交易**、**通訊錄**、**應用程式** 及 **設定** 等選項。 保險箱初始為空——請使用 **複製地址** 從另一個錢包轉入資金。

![安全帳戶概覽畫面，顯示餘額為零、出現「加值」提示，以及側邊欄導覽列](/img/build/wallets/sg-safe-ui.png)

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

1. 請複製您的 Safe 地址。
2. 在存放該 NFT 的錢包中，開啟該 NFT 並選擇「轉帳」。
3. 將 Safe 地址貼上，確認後，請在 Safe Wallet 的 **資產** → **NFT** 選項下進行驗證。

在主網中，您也可以從支援 Kaia 的交易平台進行轉帳，例如 [OKX NFT 交易平台](https://web3.okx.com/nft)。 在 Kairos 上，請使用上方的錢包轉帳功能。

## 發送資產

### 傳送 KAIA 及代幣

**步驟 1：** 點擊 **「新增交易」**，然後選擇 **「發送代幣」**。

<video autoPlay loop muted playsInline controls aria-label="Opening New transaction and choosing Send tokens" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-new-tx.webm" type="video/webm" /> <source src="/img/build/wallets/sg-new-tx.mp4" type="video/mp4" /> </video>

**步驟 2：** 輸入收款人地址，然後選擇代幣種類和金額——選擇 **MAX** 將自動填入全部餘額。 每筆交易最多可新增五位收款人。 點擊 **下一步**。

<video autoPlay loop muted playsInline controls aria-label="Send tokens form with the recipient address, token selector, and amount fields" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-send-details.webm" type="video/webm" /> <source src="/img/build/wallets/sg-send-details.mp4" type="video/mp4" /> </video>

**步驟 3：** 檢視詳細資訊並點擊 **簽署**，然後在您的錢包中確認。 簽署並不會立即發送該交易——該交易會保留在 **交易** 下的佇列中，直到達到閾值為止，屆時任何簽署者皆可執行該交易。

<video autoPlay loop muted playsInline controls aria-label="Reviewing and signing a send transaction, which then waits in the queue for the remaining confirmations" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-review-send-tx.webm" type="video/webm" /> <source src="/img/build/wallets/sg-review-send-tx.mp4" type="video/mp4" /> </video>

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
