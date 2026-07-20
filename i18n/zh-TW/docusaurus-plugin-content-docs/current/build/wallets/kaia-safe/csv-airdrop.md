---
title: 使用 CSV Airdrop
sidebar_label: CSV 空投
---

# 使用 CSV Airdrop

:::caution 日落通知

`safe.kaia.io` 將於 **2026 年 8 月 9 日** 停止服務。 今後請使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 專用 Safe Wallet 來管理您的帳戶。 您現有的「安全帳戶」將自動與「安全錢包」相容。

:::

**CSV 空投**（當列於「安全應用程式」下時）會將多筆 ERC-20、ERC-721、ERC-1155 及原生代幣的轉帳批次整合為單一筆「安全」交易。 您只需上傳或貼上轉帳的 CSV 檔案並提交一次——相較於逐筆發送轉帳，不僅需要較少的簽名， gas 費用也更低。

Safe App 的可用性取決於 Kaia / Kairos 的 Safe Wallet Apps 目錄。 若您的網路未列出 CSV Airdrop 功能，請使用 [交易建立工具](./tx-builder.md) 或查閱 [說明中心](https://help.safe.global)。

## 步驟 1：在 Safe Wallet 中開啟您的保險箱<a id="login-kaiasafe"></a>

請至 [app.safe.global](https://app.safe.global) 登入，並選擇您的 Kaia 或 Kairos Safe。 如果您還沒有帳號，請按照 [建立保險箱](./use-kaia-safe.md#create-a-safe) 及 [新增資產](./use-kaia-safe.md#add-assets) 的步驟操作。

## 步驟 2：開啟 CSV Airdrop<a id="search-CSV-airdrop"></a>

前往 **應用程式**，搜尋 **CSV**，並在您的網路支援的情況下開啟 **CSV Airdrop**。

## 步驟 3：準備轉移用 CSV 檔案<a id="prepare-CSV-airdrop"></a>

傳輸檔案應採用 CSV 格式，並包含以下欄位：

- _token_type_：`erc20`、`nft` 或 `native`。 NFT 代幣可能是 ERC-721 或 ERC-1155 規格。
- _token_address_：代幣合約地址。 若為原生（KAIA）轉帳，請留空。
- _收件人_：收件人地址。
- _金額_：欲轉帳的金額。 進行 ERC-721 轉帳時，此欄位可留空。
- _id_：收藏品識別碼（ERC-721 或 ERC-1155）。 對於原生代幣及 ERC-20 轉帳，此欄位可留空。

:::important
請使用 `,` 作為分隔符。 標題列必須是第一行，且必須包含所述的欄位名稱。
[範例傳輸檔案](https://ipfs.io/ipfs/bafybeiesr6b3cm76ofcm2joukgdtuyva3niftmbpbb4sgxsa3qwsenv3lu/sample.csv)
:::

### 原生代幣轉帳<a id="native-token-trnasfers"></a>

若為原生轉帳，請將 _token_address_ 留空。 請確保保險箱內存放有足夠的 KAIA。

### ERC-20 轉帳<a id="erc20-trnasfers"></a>

將 _token_type_ 設定為 `erc20`，並填寫其餘欄位。 請確保保險箱內存有足夠的該種代幣。

### ERC-721 轉帳<a id="erc721-transfers"></a>

請為 NFT 轉讓設定 _token_type_，並依照應用程式的規定包含收藏品的 _id_。 請確認「The Safe」確實擁有這些 NFT。

## 步驟 4：檢視並提交<a id="review-submit-transaction"></a>

請在應用程式中檢視已解碼的轉帳紀錄，然後提交。 請以與其他「Safe」交易相同的方式完成「Safe」確認程序。
