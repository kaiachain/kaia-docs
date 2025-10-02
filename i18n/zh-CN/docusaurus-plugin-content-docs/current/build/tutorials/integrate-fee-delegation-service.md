# 整合 Kaia 费用委托服务

本指南概述了 Kaia 费用委托服务、如何申请访问、前提条件、集成示例和 API 参考。 它旨在帮助开发人员将费用委托功能集成到 Kaia 网络上的去中心化应用程序（DApps）中。

## 1. 概述

### 什么是 Kaia 费用委托服务？

Kaia 网络的费用委托功能允许另一个账户代用户支付交易气体费用。 Kaia 费用委托服务利用这一功能，使用户能够与您的 DApp 进行交互，而无需持有 KAIA 代币来支付天然气费用。 用户无需自己支付燃气费，而是由您的应用程序通过 kaia 托管费用委托服务器代为支付。

:::note

Kaia 的费用委托服务是一种托管服务，用于接入 DApp 并提供更顺畅的费用委托体验。 费用委托功能原生存在于 Kaia 区块链中，开发者可以通过自行设置基础设施为其用户实施费用委托。

:::

### 益处

- **更好的用户体验**：用户无需 KAIA 令牌即可使用您的 DApp
- **入职**：新用户可立即开始使用您的 DApp
- **简化钱包**：用户只需要想交易/使用的代币

### 如何使用

1. \*\* 用户签署交易\*\* - 用户用自己的钱包创建并签署收费委托交易
2. \*\* DApp 发送至费用委托服务\*\* - 您的 DApp 后端将已签名的交易发送至费用委托服务 API 端点
3. \*\* 服务器验证并支付费用\*\* - 费用委托服务验证交易，如果有效，则代表用户支付燃气费

收费委托服务工作流程](/img/build/tutorials/fee-delegation-workflow.png)

## 2. 申请访问

您可以通过查看和填写此 [Google 表格](https://docs.google.com/forms/d/e/1FAIpQLScSMnI8fD1xbyeoAL3TI81YxT3V1UfoByca84M7TZzYII5Pmw/viewform) 申请使用 Kaia 费用委托服务。

:::note

Kaia 团队将 Dapp 与 FeeDelegationServer 进行通信和配置，并在谷歌表单提交后通知 dApp 合作伙伴。

:::

## 3. 先决条件和支持的环境

### 服务端点

- **制作**：https://fee-delegation.kaia.io
- **测试网**：https://fee-delegation-kairos.kaia.io

有关 Swagger 文档，请访问

- **制作**：https://fee-delegation.kaia.io/api/docs
- **测试网**：https://fee-delegation-kairos.kaia.io/api/docs

### 钱包兼容性（前台集成）

:::info

从前端集成 Kaia 费用委托服务时，请确保您的钱包支持 Kaia 费用委托标准，以进行费用委托交易签名。

:::

目前支持用于前端集成的钱包：

- Kaia 钱包
- OKX 钱包
- Bitget 钱包

如果您的用户使用其他钱包，他们可能无法从前台正确签署费用委托交易。

:::note

**后台集成**与钱包无关。 您可以在服务器端处理签名和提交，以实现全面控制和更广泛的兼容性。

:::

## 4. 访问模式和安全性

本节介绍 Kaia 费用委托服务的访问模式和安全功能。

### 白名单系统

该服务使用 API Key 和白名单地址系统处理 DApp 的费用委托。

#### 1. API 密钥验证

对于已配置 API 密钥的 DApp，您必须使用有效的 API 密钥调用服务，而且合同或发送方必须另外列入白名单。

#### 2. 白名单访问

对于未配置 API 密钥的 DApp，合约或发送方必须是白名单地址类型：

- **合约地址**：用户与之交互的智能合约
- **发件人地址**：发起交易的用户钱包地址

### 交易验证规则

\*\* 用于 Testnet:\*\*  
允许进行所有交易，以方便测试（未应用验证）。

\*\* 适用于主网：\*\*  
当满足这些条件时，您的交易将获得批准：

1. **带 API 密钥**：您提供一个有效的 API 密钥，并且您的合同或发件人地址已被列入白名单（如果未配置白名单，则任何发件人和合同地址均可通过有效的 API 密钥使用）。
2. **无 API 密钥**：您的合同或发件人地址已被列入没有 API 密钥的 DApp 白名单

### 门禁控制选项

**选项 1：开放访问（无 API 密钥 + 白名单地址）**

- 任何人都可以使用您的白名单合约/地址，费用将从您的 DApp 余额中扣除
- 适合公共事业、开放游戏、社区工具
- 可在前台或后台使用 API 调用

**选项 2：验证访问（使用 API 密钥+白名单地址）**

- 只有您的 DApp 才能使用白名单合约/地址
- 适用于私人 DApp、企业应用、受控访问
- 建议使用后台密钥调用 API

**选项 3：无限制访问（API 密钥 + 无白名单地址）**

- 您的 DApp 可以使用有效的 API 密钥发送任何交易
- 适用于钱包应用、多功能 DApps
- 建议使用后台的密钥调用 API

## 5. 集成实例

本节提供了在后台和前台应用程序中集成 Kaia 费用委托服务的代码示例。

### 后台（JavaScript/Node.js）示例

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

### 前端（React.js）示例

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

### 其他实施示例（链接）

有关更全面的实施示例，请参阅

- [ether-ext@V6 HTML 示例](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/browser-html/main.js#L294)
- [ethers-ext@V6 ReactJS 示例](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/browser-react/src/components/KlaytnFeeDelServiceSC.tsx#L18)
- [web3js 示例](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/browser-html/main.js#L265)
- [viem-ext 示例]（https://github.com/kaiachain/kaia-sdk/blob/dev/viem-ext/examples/browser-react/src/components/KlaytnFeeDelServiceSC.tsx#L18)

## 6. 应用程序接口参考

本节详细介绍了 Kaia 费用委托服务可用的 API 端点。

### POST /api/signAsFeePayer

**描述：** 处理费用委托交易

**标题：**

```
Content-Type: application/json
Authorization: Bearer <API_KEY> (optional - required for DApps with API keys)
```

**请求正文：**

```
{
  "userSignedTx": {
    "raw": "<RLP_encoded_signed_transaction>"
  }
}
```

**参数：**

- userSignedTx.raw\`（字符串，必填）：用户签名的 RLP 编码交易

**答复：**

```json
// Transaction Success
{
  "message": "Request was successful",
  "data": <TransactionReceipt>,
  "status": true
}
```

:::note

有关详细响应信息，请参阅下面的 "SignAsFeePayer API 响应代码和示例"。

:::

### `GET /api/balance`

**说明：** 检查余额是否足够（大于 0.1 KAIA）

带 API 密钥：

```
GET /api/balance
Authorization: Bearer your_api_key_here
```

无 API 密钥（使用地址）：

```
GET /api/balance?address=0x742d35Cc6634C0532925a3b8D2A4DDDeAe0e4Cd3
```

**标题：**

```
Content-Type: application/json
Authorization: Bearer <API_KEY> (optional - required for DApps with API keys)
```

**查询参数：**

- 地址（字符串，可选）：要检查余额的合同或发件人地址（未提供 API 密钥时为必填项）

**答复：**

```json
{
  "message": "Request was successful",
  "data": true,  // true if sufficient balance, false if insufficient
  "status": true
}
```

### SignAsFeePayer API 响应代码和示例

#### 200 个成功回复

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

#### 400 坏请求响应

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

#### 500 内部服务器错误响应

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

## 7. 错误处理和最佳做法

### 常见错误处理

| 错误信息                                       | 该怎么做                                                                                                                                                                                                                                                |
| :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 发送事务尝试 5 次后失败，网络繁忙。 错误信息：`<ERROR MESSAGE>` | 1. 验证 `userSignedTx.raw` 有效载荷的格式和签名是否正确<br/>2. 对于 \*\* 低 Nonce 问题\*\*，请确保您的钱包中没有待处理交易。 (对于 Kaia 钱包，请取消任何待处理的交易并清除历史记录后再重试）。  <br/>3. 对于**未知交易问题**，请重新检查当前交易是否已完成，然后转到其他交易 |
| 无效的 API 密钥                                 | 确保使用的是有效的 API 密钥。 如果没有，或者无效，请联系 Kaia 团队获取一个新的。                                                                                                                                                                                                      |
| userSignedTx 为必填项                          | 确保您的请求正文正确包含了 `userSignedTx` 对象，其中的 `raw` 字段包含了 RLP 编码的签名事务。 仔细检查 JSON 结构，确保事务数据已正确编码。                                                                                                                                                              |
| 合同或发件人地址未列入白名单                             | 验证您的用户正在交互的智能合约地址或发起交易的用户钱包地址是否已被您的 DApp 列入白名单。                                                                                                                                                                                                     |
| DApp 不活动。 请联系管理员激活 DApp。                   | 您的 DApp 目前在收费委托服务中处于非激活状态。 请联系 Kaia 团队或指定管理员，咨询有关激活 DApp 的事宜。                                                                                                                                                                                       |
| 收费授权服务器余额不足，请联系管理员。                        | 您的 DApp 的收费委托服务器余额太低，不足以支付交易费用。 请联系管理员或 Kaia 团队为您的 DApp 余额充值。 您还可能在发生这种情况之前收到电子邮件提醒。                                                                                                                                                                |
| DApp 终止。 请联系管理员激活 DApp。                    | 您的 DApp 访问收费委托服务的权限已被终止。 联系 Kaia 团队或管理员，了解终止原因并讨论重新激活的可能性。                                                                                                                                                                                          |

### 最佳做法

#### 事务管理

从同一发件人地址发送多个事务（批量或连续事务）时，应谨慎管理事务顺序，以避免出现与非证书相关的故障：

1. **等待确认**：确保每笔交易都已确认（即您已收到交易收据），然后再发送下一笔交易。
2. **确保正确管理 nonces：** 确保使用正确的 nonce 提交交易，并在新交易开始前正确处理任何失败或旧的 nonces。 有关批量交易场景中 nonce 管理的详细策略，请参阅 [如何管理 Nonces 以实现可靠交易](../cookbooks/how-to-manage-nonce.md)。
3. **实施重试逻辑**：建立重试机制，以处理临时故障、丢弃的事务或延迟的确认。
4. **前端钱包用户：** 如果从前端使用基于浏览器的钱包（如 Kaia 钱包、OKX 钱包或 Bitget），建议用户使用钱包的 "清除历史记录 "功能清除任何待处理或卡住的交易，以防止发生 nonce 冲突。

#### API 调用

调用应用程序接口时，如果需要 **API KEY**，我们建议从 DApp 后台使用。 如果不需要 **API KEY**，DApp 可以从前台或后台调用 API。

## 8. 支持与资源

### 支持与资源

- [Kaia 费用委托示例](https://docs.kaia.io/build/tutorials/fee-delegation-example/)
- [DApp 门户网站费用委托](https://docs.dappportal.io/extra-packages/gas-fee-delegation)
- [Kaia SDK 文档]（https://docs.kaia.io/references/sdk/)

### 自定义集成

对于标准白名单系统之外的高级或自定义交易白名单集成（如专门的令牌验证、复杂的路由逻辑或自定义 DeFi 协议），请联系 Kaia 团队以获得量身定制的解决方案。

## 9. 常见问题

**问：使用或不使用 Kaia 费用委托服务，费用委托有何不同？**  
**答：** Kaia 的费用委托服务作为一项托管服务，可让 DApps 加入并提供更顺畅的费用委托体验。 请注意，Kaia 连锁中本身就有费用委托功能，用户可以通过自行设置基础设施为其用户委托费用。

**问：合约白名单和发送方白名单有什么区别？**  
**答：** 合约白名单允许任何用户通过您的 DApp 与特定智能合约进行交互。 发件人白名单允许特定钱包地址进行任何交易。 两者可同时使用。

**问：如果我的余额用完了怎么办？**  
**答：** 交易将被拒绝，并显示 "余额不足 "错误。 如果进行了配置，我们会在余额过低前发送电子邮件提醒您。

**问：我能否为一个 DApp 将多个合约列入白名单？**  
**答：** 可以，您可以为一个 DApp 将多个合约和发件人地址列入白名单。

**问：余额用完后怎么办？**  
**答：** 要继续使用服务，您需要联系 Kaia 团队存入或申请更多余额。 不过，您也可以确保调用\*\*`/api/balance?address=${address}`\*\* API 来检查是否有足够的余额，也可以从仪表板上进行检查 [**https://fee-delegation.kaia.io/rank**](https://fee-delegation.kaia.io/rank)

**问：一旦白名单或 API 密钥到位，是否需要更改 DApp 或 DApp 后台的代码？**  
**答：** 对于 API 密钥，您需要在调用\*\*`/api/signAsFeePayer`\*\* API 时，在 "授权 "头中添加 "Bearer your_api_key"。 不过，如果只是地址白名单，不需要 API 密钥，则无需修改代码。

**问：我应该在哪里使用此 API 调用？**  
**答：** 无需 API 密钥的 API 调用**可在**前端和后端**使用，因为它们受**更严格的验证规则\*\*（例如，要求白名单地址）的限制。  
不过，在使用**应用程序接口密钥**时，我们**强烈建议**从**后台**进行这些调用，以确保安全，因为使用应用程序接口密钥通常涉及**较少的验证检查**，并会暴露更多权限。

**问：我老是收到 nonce 错误或卡住的事务。 如何解决 Kaia 上的 nonce 问题？**
**答：** Nonce 缺口或重复会阻止您的交易。 首先，确认账户的链上交易次数，然后将下一个 nonce 与之对齐。 对于批量或收费授权流量，可使用带按账户锁定功能的链外 nonce 存储器，并用更高的费用替换使用相同 nonce 的卡死交易，而不是发送新的交易。 有关一整套模式和恢复步骤，请参阅 [如何管理 Nonces 以实现可靠交易](../cookbooks/how-to-manage-nonce.md) 。