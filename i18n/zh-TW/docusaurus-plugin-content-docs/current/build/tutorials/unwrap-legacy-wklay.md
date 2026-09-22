---
title: 將舊版 WKLAY 轉換為 KAIA
sidebar_label: 解封傳統的 WKLAY
description: 使用 Kaiascan 從舊版 WKLAY 封裝合約中提取 KAIA，並解封裝為標準的 WKAIA。
---

# 將舊版 WKLAY 轉換為 KAIA

Kaia 主網上的官方、標準 WKAIA（前身為 WKLAY）合約為 [`0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432`](https://kaiascan.io/address/0x19aac5f612f524b754ca7e7c41cbfa2e981a4432)， 這是 Kaia 生態系統中公認的標準。有關背景資訊，請參閱 [Canonical WKAIA](../smart-contracts/token-development/canonical-wkaia.md)。

如果您曾與使用早期代幣封裝器的舊版去中心化應用程式（dapps）或交易平台進行過互動，您可能仍在 **舊版 WKLAY 合約** 中持有餘額 [`0xfd844c2fca5e595004b17615f891620d1cb9bbb2`](https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2) 中。沒有任何 DApp 前端會幫您解包該合約，因此您必須透過區塊鏈瀏覽器直接呼叫該合約。

本指南將逐步說明如何在 [Kaiascan](https://kaiascan.io) 上執行此操作。

:::info 您持有哪份合約？

這兩份合約涉及的部署互不相關。開始之前，請先在您的錢包中或於提供該餘額的交易紀錄中確認代幣合約地址——以下步驟僅能從舊版合約中取回資金。若要展開標準 WKAIA，請參閱 [展開標準 WKAIA](#unwrap-canonical-wkaia)。

:::

## 步驟 1：開啟舊版合約

前往 Kaiascan 上的舊版合約頁面：

[`https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2`](https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2)

![Kaiascan 上的舊版 WKLAY 合約頁面](/img/build/tutorials/unwrap-legacy-wklay/01-legacy-contract-page.png)

## 步驟 2：查閱您的確切餘額

1. 選取 **合約** 索引標籤，然後點選 **閱讀合約**。
2. 展開 `balanceOf(address)` 函式，並輸入您的錢包地址。
3. 點擊 **查詢**（或 **重新查詢**）以查詢您的餘額。
4. 請完全按照所示內容複製回傳的值。

![在「讀取合約」分頁中讀取 balanceOf](/img/build/tutorials/unwrap-legacy-wklay/02-read-contract-balanceof.png)

:::caution 複製原始值，請勿進行轉換

`balanceOf` 會以 **kei**（最小單位）為單位回傳餘額，而非以 KAIA 為單位。 1 KAIA 等於<sup>1018</sup>kei，因此餘額 `100000000000000000` 即為 0.1 KAIA。

步驟 3 預期會收到相同的原始數值。請直接複製貼上，切勿進行任何修改——請勿四捨五入、刪除位數或轉換為 KAIA 格式，否則可能會提領錯誤的金額，或導致交易被撤銷。

:::

## 步驟 3：提領您的代幣

1. 切換至 **撰寫合約** 索引標籤。
2. 點擊 **「連線至 Web3」**，並連線至存放該餘額的錢包。
3. 展開 `withdraw(wad: uint256)` 函式，並貼上您在步驟 2 中複製的 exact 值。
4. 提交後，請在您的錢包中確認這筆交易。

![顯示「提領」功能的「撰寫合約」分頁](/img/build/tutorials/unwrap-legacy-wklay/03-write-contract-withdraw.png)

您需要在同一錢包中持有少量 KAIA，以支付此筆交易的手續費。

## 步驟 4：驗證

交易確認後，請檢查您的錢包餘額——解封的 KAIA 將存入與發起交易相同的地址。

您可以在 Kaiascan 的交易 **內部交易** 標籤頁中確認這筆轉帳，因為合約會將 KAIA 視為內部轉帳而非代幣轉帳。以下是 [一則成功的解封交易範例](https://kaiascan.io/tx/0x05117dc2ac21d2373fce1b6afa260ab8f9c1f747f7c9894fa302c67b2c96631d?tabId=internalTx&page=1)。

![在 Kaiascan 上驗證解封交易](/img/build/tutorials/unwrap-legacy-wklay/04-verify-transaction.png)

## 解封標準版 WKAIA

如果您的餘額位於標準的 WKAIA 合約 [`0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432`](https://kaiascan.io/address/0x19aac5f612f524b754ca7e7c41cbfa2e981a4432) 中，您有兩種選擇。

**使用 dapp（建議）。** Kaia 生態系統的兌換服務可一鍵將標準 WKAIA 解封 — 例如 [DragonSwap](https://dgswap.io/swap/?outputCurrency=KAIA&inputCurrency=0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432)。

**請手動操作。** 請依照上述 Kaiascan 的步驟操作，但請使用標準合約的地址頁面，而非舊版地址頁面。

## 相關

- [Canonical WKAIA](../smart-contracts/token-development/canonical-wkaia.md) —— 標準的封裝式 KAIA 實作
- [合約地址](../../references/contract-addresses.md) — 部署於主網和 Kairos 上的系統合約地址
