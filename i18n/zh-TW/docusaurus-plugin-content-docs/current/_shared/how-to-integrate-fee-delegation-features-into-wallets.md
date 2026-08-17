# 如何將費用委託功能整合到錢包中

多虧了 Kaia 的 [原生手續費委派](/build/transactions/fee-delegation) 功能，使用者得以在去中心化應用程式（dApps）上享受免手續費的交易。 要啟用此功能，**錢包** 必須支援「手續費委派」類型的交易，並執行 **發送者簽名**。

:::info 本指南的適用對象

本指南適用於 **錢包供應商**。 您的錢包僅實作發送方功能：

- 使用使用者的金鑰簽署費用委派交易
- 將 `senderTxHashRLP` 傳回 dApp

費用支付者的簽名與廣播操作，**並非**錢包的職責。 這些功能由 dApp 後端或託管服務（例如 [Kaia 手續費委託服務](/build/tutorials/integrate-fee-delegation-service)）負責處理。

:::

## 端到端流程（角色）

費用授權總是涉及相同的參與者。 下圖顯示了完整的路徑；後續章節將重複使用此路徑，並標示出正在討論的參與者。

<FeeDelegationFlow></FeeDelegationFlow>

| 步驟 | 誰         | 責任                                            |
| -- | --------- | --------------------------------------------- |
| 1  | **錢包（您）** | 簽署這筆費用委派交易，並回傳 `senderTxHashRLP`。 **請勿**進行廣播。 |
| 2  | **dApp**  | 將 `senderTxHashRLP` 轉發給手續費支付方。                |
| 3  | **費用繳納人** | 再次簽署，並將已完整簽署的交易提交給 Kaia。                      |

本頁詳細說明了 **步驟 1**。 步驟 2 至 3 的摘要收錄於文末，並附有完整指南的連結。

## 錢包必須實現的功能

這是流程中的 **步驟 1** —— 這是您的錢包必須實作的唯一部分。

<FeeDelegationFlow highlight="wallet"></FeeDelegationFlow>

為支援手續費委派功能，請在您的錢包中實作以下內容：

1. 將 [Kaia SDK](https://github.com/kaiachain/kaia-sdk)（例如 `@kaiachain/ethers-ext`）加入錢包的程式碼庫中。
2. 當錢包收到一項手續費委派交易請求（通常透過 `kaia_signTransaction` 傳遞）時，請使用 Kaia SDK 並以使用者的金鑰對其進行簽署。
3. 將 `senderTxHashRLP` 傳回 dApp。 請**切勿**從錢包將交易發送至 Kaia 節點。

:::tip 錢包供應商檢查清單

- 支援需支付手續費的交易類型（資金轉帳、合約執行，以及其他必要類型）
- 使用由錢包管理的 **發送者（使用者）** 金鑰進行簽名
- 將 `senderTxHashRLP` 傳回 dApp
- **請勿**廣播僅由發送者簽署的交易

:::

### 範例：簽署一筆費用委任式價值轉移

請在您的錢包簽署路徑中使用此模式（例如，在 `kaia_signTransaction` 處理程序內）。 在生產環境中，請使用由錢包管理的用戶金鑰——而非硬編碼的私鑰——並將 `senderTxHashRLP` 傳回給呼叫方。

```javascript
const ethers = require("ethers6");
const { Wallet, TxType, parseKaia } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const receiverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";
const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

const senderWallet = new Wallet(senderPriv, provider);

async function main() {
  const tx = {
    type: TxType.FeeDelegatedValueTransfer,
    from: senderAddr,
    to: receiverAddr,
    value: parseKaia("0.01"),
  };

  // Wallet: populate and sign as sender, then return RLP to the dApp
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);
  // return senderTxHashRLP;  // ← wallet returns this to the dApp (do not broadcast)
}
```

### 範例：簽署一項費用委任合約互動

```javascript
const ethers = require("ethers6");
const { Wallet, TxType } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

const senderWallet = new Wallet(senderPriv, provider);

const contractAddr = "0x95Be48607498109030592C08aDC9577c7C2dD505";
const abi = ["function setNumber(uint256 newNumber)"];

async function main() {
  const contract = new ethers.Contract(contractAddr, abi, provider);
  const data = contract.interface.encodeFunctionData("setNumber", ["0x123"]);

  const tx = {
    type: TxType.FeeDelegatedSmartContractExecution,
    from: senderAddr,
    to: contractAddr,
    value: 0,
    data: data,
  };

  // Wallet: populate and sign as sender, then return RLP to the dApp
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);
  // return senderTxHashRLP;  // ← wallet returns this to the dApp (do not broadcast)
}
```

:::note

具體的接線方式取決於您的錢包架構。 這份重要合約的要點是：**將授權類型作為發送者簽署，傳回 `senderTxHashRLP`，且不要廣播。**

:::

## 錢包之外：費用支付者的簽名

當錢包傳回 `senderTxHashRLP` 後，dApp 會將其轉發（**步驟 2**），接著手續費支付者進行簽署並提交（**步驟 3**）。 以下標示的是手續費支付者——這**並非**錢包代碼。

<FeeDelegationFlow highlight="feepayer"></FeeDelegationFlow>

```javascript
// Fee payer / backend only — not wallet code
const sentTx = await feePayerWallet.sendTransactionAsFeePayer(senderTxHashRLP);
console.log("sentTx", sentTx);

const rc = await sentTx.wait();
console.log("receipt", rc);
```

若要了解手續費支付方如何接收 `senderTxHashRLP` 並提交交易（這是一個簡單的客戶端／伺服器示範——並非錢包整合），請參閱 [手續費委託範例](/build/tutorials/fee-delegation-example)。 關於受託費用支付方，請參閱 [整合 Kaia 費用委託服務](/build/tutorials/integrate-fee-delegation-service)。

## 下一步

| 目標                         | 指南                                                                                              |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| 了解手續費委派交易類型                | [費用授權](/build/transactions/fee-delegation)、[部分費用授權](/build/transactions/partial-fee-delegation) |
| 觀看客戶端／伺服器端費用支付者的示範（非錢包程式碼） | [建置費授權範例](/build/tutorials/fee-delegation-example)                                              |
| 在 dApp 中使用 Kaia 的託管式費用支付服務 | [整合 Kaia 手續費委託服務](/build/tutorials/integrate-fee-delegation-service)                            |
| 費用委託交易的 SDK 參考指南           | [ethers-ext 委託手續費的價值轉移](/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer) |
