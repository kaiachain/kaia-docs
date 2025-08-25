# 整合 Kaia 費用委託服務

本指南提供 Kaia 費用委託服務的概述、如何申請存取、先決條件、整合範例和 API 參考資料。 它旨在幫助開發人員將收費委託功能整合到 Kaia 網路上的分散式應用程式 (DApps) 中。

## 1. 概述

### 什麼是 Kaia 費用委託服務？

Kaia 網路的費用委託功能允許另一個帳戶代使用者支付交易瓦斯費。 Kaia Fee Delegation Service 利用這項功能，讓使用者可以與您的 DApp 互動，而無需持有 KAIA 代幣來支付瓦斯費。 您的應用程式不需要使用者自己支付瓦斯費，而是透過 kaia 管理費委託伺服器代為支付。

:::note

Kaia 的 Fee Delegation Service 作為一種管理服務，可加入 DApp 並提供更順暢的 Fee Delegation 體驗。 費用委託功能原生存在於 Kaia 區塊鏈中，開發人員可透過自行設定基礎架構，為其使用者實施費用委託。

:::

### 優點

- \*\* 更好的 UX\*\*：使用者不需要 KAIA 代幣即可使用您的 DApp
- **上線**：新使用者可立即開始使用您的 DApp
- **簡化的錢包**：使用者只需要他們想要交易/使用的代幣

### 如何運作

1. \*\* 使用者簽署交易\*\* - 使用者用他們的錢包建立並簽署費用授權交易
2. \*\* DApp 傳送至 Fee Delegation Service\*\* - 您的 DApp 後端將已簽署的交易傳送至 Fee Delegation Service API 端點
3. \*\* 伺服器驗證並付費\*\* - 費用委託服務驗證交易，若有效則代使用者支付瓦斯費

![費用委託服務工作流程](/img/build/tutorials/fee-delegation-workflow.png)

## 2. 申請存取

您可以檢視並完成此 [Google 表格](https://docs.google.com/forms/d/e/1FAIpQLScSMnI8fD1xbyeoAL3TI81YxT3V1UfoByca84M7TZzYII5Pmw/viewform) 來申請使用 Kaia 費用委託服務。

:::note

Kaia 團隊會將 Dapp 溝通和設定到 FeeDelegationServer，並在 Google 表單提交後通知 dApp 合作夥伴。

:::

## 3. 先決條件和支援的環境

### 服務端點

- \*\* 製作\*\*：`https://fee-delegation.kaia.io`
- **Testnet**：`https://fee-delegation-kairos.kaia.io`

如需 Swagger 文件，請造訪：

- \*\* 製作\*\*：`https://fee-delegation.kaia.io/api/docs`
- **Testnet**：`https://fee-delegation-kairos.kaia.io/api/docs`

### 錢包相容性 (前端整合)

:::info

從前端整合 Kaia 費用委託服務時，請確保您的錢包支援 Kaia 費用委託標準，以進行費用委託交易簽署。

:::

目前支援前端整合的錢包：

- Kaia 皮夾
- OKX 皮夾
- Bitget 電子錢包

如果您的使用者正在使用其他錢包，他們可能無法從前端正確簽署費用授權交易。

:::note

\*\* 後端整合\*\*與錢包無關。 您可以在伺服器端處理簽署和提交，以獲得完整的控制和更廣泛的相容性。

:::

## 4. 存取模式與安全性

本節說明 Kaia 費用委託服務的存取模式和安全功能。

### 白名單系統

該服務使用 API Key & Whitelisted Address 系統來處理 DApp 的費用委託。

#### 1. API 金鑰驗證

對於已設定 API 金鑰的 DApps，您必須使用有效的 API 金鑰來呼叫服務，而且合約或寄件者可以另外列入白名單。

#### 2. 白名單存取

對於未設定 API 金鑰的 DApp，合約或寄件者都必須是白名單上的位址類型：

- **合約地址**：您的使用者與之互動的智慧型契約
- **寄件者位址**：啟動交易的使用者錢包地址

### 交易驗證規則

\*\* 適用於 Testnet:\*\*\
允許所有交易，以便進行簡易測試 (未套用驗證)

\*\* 適用於 Mainnet:\*\*\
當符合這些條件時，您的交易將被核准：

1. **使用 API 金鑰**：您提供有效的 API 金鑰，而且您的合約或寄件者位址已列入白名單（若未設定白名單，則任何寄件者與合約位址均可使用有效的 API 金鑰）。
2. **沒有 API 金鑰**：您的合約或寄件者位址已列入沒有 API 金鑰的 DApp 白名單中

### 存取控制選項

\*\* 選項 1：開放存取 (無 API 金鑰 + 白名單地址)\*\*

- 任何人都可以使用您的白名單合約/地址，費用會從您的 DApp 結餘中扣除
- 適用於公用事業、開放遊戲、社群工具
- 可在前端或後端使用 API 呼叫

\*\* 選項 2：經驗證的存取（使用 API 金鑰 + 白名單地址）\*\*

- 只有您的 DApp 可以使用白名單上的合約/地址
- 適用於私人 DApp、企業應用程式、受控存取
- 建議使用後端的金鑰呼叫 API

\*\* 選項 3：無限制存取 (API 金鑰 + 無白名單地址)\*\*

- 您的 DApp 可以使用有效的 API 金鑰傳送任何交易
- 適用於錢包應用程式、多用途 DApps
- 建議使用後端的金鑰呼叫 API

## 5. 整合範例

本節提供在後端和前端應用程式中整合 Kaia 費用委託服務的程式碼範例。

### 後端（JavaScript/Node.js）範例

```javascript
const { Wallet, TxType, JsonRpcProvider, parseKaia } = require('@kaiachain/ethers-ext');

async function sendFeeDelegatedTransaction() {
  try {
    // 1. Setup wallet and provider
    const provider = new JsonRpcProvider('https://public-en-kairos.node.kaia.io');
    const wallet = new Wallet('your_private_key_here', provider);
    
    // 2. Create fee-delegated transaction
    const tx = {
      type: TxType.FeeDelegatedValueTransfer
      from: wallet.address,
      to: '0xAB', // replace your wallet address
      value: parseKaia('0.005'), // 0.005 KAIA
      gasLimit: 100000,
      gasPrice: await provider.getGasPrice(),
      nonce: await wallet.getTransactionCount(),
    };
    
    // 3. Sign transaction
    const signedTx = await wallet.signTransaction(tx);
    
    // 4. Send to fee delegation server
    const response = await fetch('https://fee-delegation-kairos.kaia.io/api/signAsFeePayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_api_key_here'
      },
      body: JSON.stringify({
        userSignedTx: { raw: signedTx }
      })
    });
    
    // 5. Handle response
    const result = await response.json();
    if (result.status) {
      console.log('Success! Transaction hash:', result.data.transactionHash);
    } else {
      console.log('Failed:', result.message);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}
sendFeeDelegatedTransaction();
```

### 前端 (React.js) 實例

```javascript
import { useState } from 'react';
import { Web3Provider, TxType, parseKaia } from '@kaiachain/ethers-ext/v6';

// Optional API key
const config = {
  serverUrl: 'https://fee-delegation-kairos.kaia.io',
  apiKey: 'kaia_your_api_key_here'
};

export default function FeeDelegationComponent() {
  const [wallet, setWallet] = useState({ address: null, connected: false });
  const [form, setForm] = useState({ toAddress: '', amount: '0.005' });
  const { Web3Provider, TxType, parseKaia } = await import('@kaiachain/ethers-ext/v6');

  // 1. Connect wallet
  const connectWallet = async () => {
    try {
      const accounts = await window.klaytn?.enable();
      setWallet({ address: accounts[0], connected: true });
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  // 2. Send fee-delegated transaction
  const sendTransaction = async () => {
    try {
      const provider = new Web3Provider(window.klaytn);
      const signer = await provider.getSigner(wallet.address);
      
      // 3. Create and sign transaction
      const tx = {
        type: TxType.FeeDelegatedValueTransfer,
        from: wallet.address,
        to: form.toAddress,
        value: parseKaia(form.amount)
      };
      
      const signedTx = await signer.signTransaction(tx);
      
      // 4. Send to fee delegation server
      const response = await fetch(`${config.serverUrl}/api/signAsFeePayer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          userSignedTx: { raw: signedTx }
        })
      });
      
      // 5. Handle response
      const result = await response.json();
      if (result.status) {
        console.log('Success! Transaction hash:', result.data.transactionHash);
      } else {
        console.log('Failed:', result.message);
      }
      
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {wallet.connected ? 'Connected' : 'Connect Kaia Wallet'}
      </button>
      
      <input 
        value={form.toAddress}
        onChange={(e) => setForm({...form, toAddress: e.target.value})}
        placeholder="Recipient address"
      />
      
      <input 
        value={form.amount}
        onChange={(e) => setForm({...form, amount: e.target.value})}
        placeholder="Amount"
      />
      
      <button onClick={sendTransaction} disabled={!wallet.connected}>
        Send Transaction
      </button>
    </div>
  );
}

```

### 其他實作範例 (連結)

如需更全面的實作範例，請參閱：

- [ethers-ext@V6 HTML範例](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/browser-html/main.js#L294)
- [ethers-ext@V6 ReactJS 實例](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/browser-react/src/components/KlaytnFeeDelServiceSC.tsx#L18)
- [web3js 示例](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/browser-html/main.js#L265)
- [viem-ext範例](https://github.com/kaiachain/kaia-sdk/blob/dev/viem-ext/examples/browser-react/src/components/KlaytnFeeDelServiceSC.tsx#L18)

## 6. API 參考資料

本節提供 Kaia 費用委託服務可用 API 端點的詳細資訊。

### POST /api/signAsFeePayer

**說明：** 處理費用委託交易

\*\* 標題：\*\*

```
Content-Type: application/json
Authorization: Bearer <API_KEY> (optional - required for DApps with API keys)
```

\*\* 請求正文：\*\*

```
{
  "userSignedTx": {
    "raw": "<RLP_encoded_signed_transaction>"
  }
}
```

**參數：**

- `userSignedTx.raw` (字串，必填)：使用者簽署的 RLP 編碼交易

**回應：**

```json
// Transaction Success
{
  "message": "Request was successful",
  "data": <TransactionReceipt>,
  "status": true
}
```

:::note

請參閱下列「SignAsFeePayer API 回應碼與範例」，以瞭解詳細的回應資訊

:::

### `GET /api/balance`

**說明：** 檢查餘額是否足夠（大於 0.1 KAIA）

附 API 金鑰：

```
GET /api/balance
Authorization: Bearer your_api_key_here
```

無 API 金鑰 (使用位址)：

```
GET /api/balance?address=0x742d35Cc6634C0532925a3b8D2A4DDDeAe0e4Cd3
```

\*\* 標題：\*\*

```
Content-Type: application/json
Authorization: Bearer <API_KEY> (optional - required for DApps with API keys)
```

\*\* 查詢參數：\*\*

- `地址`（字串，可選）：要檢查餘額的合約或寄件者地址 (未提供 API 金鑰時必須填寫)

**回應：**

```json
{
  "message": "Request was successful",
  "data": true,  // true if sufficient balance, false if insufficient
  "status": true
}
```

### SignAsFeePayer API 回應碼與範例

#### 200 個成功回應

```javascript
// Transaction Success
{
  "message": "Request was successful",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "contractAddress": null,
    "cumulativeGasUsed": "31000",
    "from": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
    "gasPrice": "27500000000",
    "gasUsed": "31000",
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "index": 0,
    "logs": [],
    "logsBloom": '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    "status": 1,
    "to": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
  },
  "status": true
}

// Transaction Reverted (200 but failed)
{
  "message": "Transaction reverted",
  "error": "REVERTED",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "status": 0,
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "index": 0,
    "logs": [],
    "logsBloom": '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  "status": false
}

```

#### 400 不良請求回應

```javascript
// Invalid API Key
{
  "message": "Bad request",
  "data": "Invalid API key",
  "error": "BAD_REQUEST",
  "status": false
}

// Missing userSignedTx
{
  "message": "Bad request",
  "data": "userSignedTx is required, [format] -- { userSignedTx: { raw: user signed rlp encoded transaction } }",
  "error": "BAD_REQUEST",
  "status": false
}

// Not Whitelisted
{
  "message": "Bad request",
  "data": "Contract or sender address are not whitelisted",
  "error": "BAD_REQUEST",
  "status": false
}

// DApp Inactive
{
  "message": "Bad request",
  "data": "DApp is inactive. Please contact the administrator to activate the DApp.",
  "error": "BAD_REQUEST",
  "status": false
}

// Insufficient Balance
{
  "message": "Bad request",
  "data": "Insufficient balance in fee delegation server, please contact the administrator.",
  "error": "BAD_REQUEST",
  "status": false
}

// DApp Terminated
{
  "message": "Bad request",
  "data": "DApp is terminated. Please contact the administrator to activate the DApp.",
  "error": "BAD_REQUEST",
  "status": false
}

```

#### 500 內部伺服器錯誤回應

```javascript
// Transaction failed
{
  "message": "Internal server error",
  "data": "Sending transaction was failed after 5 try, network is busy. Error message: <ERROR MESSAGE>",
  "error": "INTERNAL_ERROR",
  "status": false
}

// If transaction receipt not found
{
  "message": "Internal server error",
  "data": "Transaction was failed",
  "error": "INTERNAL_ERROR",
  "status": false
}
```

## 7. 錯誤處理與最佳實務

### 常見錯誤處理

| 錯誤訊息                                      | 該怎麼做                                                                                                                                                                                                                                                        |
| :---------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 發送交易嘗試 5 次失敗，網路繁忙。 錯誤訊息：<ERROR MESSAGE>\` | 1. 驗證 `userSignedTx.raw` 有效負載的格式和簽章是否正確<br/>2. 針對 \*\* 低 Nonce 問題\*\*，請確保您的錢包中沒有任何待處理的交易。 (對於 Kaia 皮夾，請在重試前取消任何待處理交易並清除歷史記錄）。  <br/>3. 針對 **NOWN 交易問題**，請重新檢查您目前的交易是否已完成，並移至其他交易。 |
| 無效的 API 金鑰                                | 確保您使用的是有效的 API 金鑰。 如果您沒有或已失效，請聯絡 Kaia 團隊取得新的。                                                                                                                                                                                                               |
| userSignedTx 為必填項目                        | 請確定您的請求體正確包含了 `userSignedTx` 物件，其中的 `raw` 欄位包含了 RLP 編碼的簽章交易。 仔細檢查 JSON 結構，確保交易資料已正確編碼。                                                                                                                                                                      |
| 合約或寄件者地址未列入白名單                            | 確認與您的使用者互動的智慧型契約位址，或啟動交易的使用者錢包位址，已被列入您的 DApp 白名單。                                                                                                                                                                                                           |
| DApp 無效。 請聯絡管理員以啟動 DApp。                  | 您的 DApp 目前在收費委託服務上的狀態是不活躍。 請聯絡 Kaia 團隊或指定管理員查詢啟動您的 DApp 事宜。                                                                                                                                                                                                 |
| 費用授權伺服器中的餘額不足，請聯絡管理員。                     | 您 DApp 的收費委託伺服器餘額太低，不足以支付交易費用。 請聯絡管理員或 Kaia 團隊來充值您 DApp 的餘額。 您也可能在此情況發生前收到電子郵件警示。                                                                                                                                                                           |
| DApp 終止。 請聯絡管理員以啟動 DApp。                  | 您的 DApp 對收費委託服務的存取已被終止。 聯絡 Kaia 團隊或管理員瞭解終止的原因，並討論重新啟動的可能性。                                                                                                                                                                                                  |

### 最佳實務

#### 交易管理

從同一寄件者位址傳送多個交易 (大量或連續交易) 時，請小心管理交易順序，以避免發生與 nonce 相關的故障：

1. \*\* 等待確認\*\*：在傳送下一個交易之前，請確認已確認每個交易（即您已收到交易收據）。
2. \*\* 確保正確管理 nonces：\*\* 確保交易以正確的 nonce 提交，並在進行新的交易之前，妥善處理任何失敗或較舊的 nonces。
3. \*\* 實作重試邏輯\*\*：建立重試機制，以處理暫時失敗、丟失的交易或延遲的確認。
4. **前端錢包用戶：** 如果從前端使用基於瀏覽器的錢包（如 Kaia Wallet、OKX Wallet 或 Bitget），建議用戶使用錢包的 「清除歷史 」功能清除任何未完成或卡住的交易，以防止 nonce 衝突。

#### API 呼叫

呼叫 API 時，如果需要 **API KEY**，我們建議從 DApp 後端使用。 如果不需要 **API KEY**，DApp 可以從前端或後端呼叫 API。

## 8. 支援與資源

### 支援與資源

- [Kaia 費用委託範例](https://docs.kaia.io/build/tutorials/fee-delegation-example/)
- [DApp入口收費委託](https://docs.dappportal.io/extra-packages/gas-fee-delegation)
- [Kaia SDK 文件](https://docs.kaia.io/references/sdk/)

### 自訂整合

如需標準白名單系統以外的進階或客製化交易白名單整合（例如專門的代幣驗證、複雜的路由邏輯或客製化 DeFi 通訊協定），請聯絡 Kaia 團隊以取得量身打造的解決方案。

## 9. 常見問題

**問：使用或不使用 Kaia 費用委託服務，費用委託有何差異？**\
**答：** Kaia 的費用委託服務作為一種管理服務，可讓 DApp 上線，並提供更順暢的費用委託體驗。 請注意，費用委託功能原生存在於 Kaia 鏈中，使用者可以透過自行設定基礎架構，為其使用者委託費用。

**問：契約與寄件者白名單有何差異？**\
\*\*答：\*\*契約白名單允許任何使用者透過您的 DApp 與特定智慧契約互動。 寄件者白名單允許特定的錢包地址進行任何交易。 您可以同時使用兩者。

**問：如果我的餘額用罄，會發生什麼情況？**\
**答：** 交易將被拒絕，並顯示「餘額不足」錯誤。 如果已設定，我們會在您的餘額過低之前發送電子郵件提醒您。

**問：我可以為一個 DApp 將多個合約列入白名單嗎？**\
**答：** 是的，您可以為一個 DApp 將多個合約和寄件者位址列入白名單。

**問：餘額用完了怎麼辦？**\
\*\*答：\*\*要繼續使用服務，您需要聯絡 Kaia 團隊存入或申請更多餘額。 但是，您也可以確保呼叫 **`/api/balance?address=${address}`** API 來檢查您是否有足夠的餘額，也可以從儀表板檢查 [**https://fee-delegation.kaia.io/rank**](https://fee-delegation.kaia.io/rank)

**問：一旦白名單或 API 金鑰就位，是否需要在 DApp 或 DApp 後端修改程式碼？**\
\*\*答：\*\*對於 API 金鑰，您需要在呼叫 **`/api/signAsFeePayer`** API 時，在「授權」標題中加入「Bearer your_api_key」。 但是，如果只是地址白名單，而不需要 API 金鑰，則不需要變更程式碼。

**問：我應該在何處使用此 API 呼叫？**\
**答：**無 API 金鑰的 API 呼叫**可在**前端和後端**使用，因為它們受制於**更嚴格的驗證規則\*\*（例如，要求白名單地址）。\
然而，當使用 **API 金鑰** 時，我們**強烈建議**從 **後端進行這些呼叫，以確保安全性，因為 API 金鑰的使用通常涉及**較少的驗證檢查\*\*，而且會暴露更多的權限。