# 如何估算 Kaia 钱包和 MetaMask 的气体限额和价格

本指南将逐步介绍如何估算 Kaia 上的燃气费/价格。

## 什么是气体？

Gas 表示在 Kaia 链上处理一笔交易（支付（价值转移）或调用（智能合约调用））所需计算量的单位。 在这里，它指的是在 Kaia 虚拟机（KVM）上进行的计算。

Kaia 网络需要气体来执行交易。 当您发送代币、与合约互动、发送 KAIA 或在区块链上做其他事情时，您必须为计算付费。 这笔钱是以煤气费计算的，而煤气费总是以 KAIA 支付。

## 什么是气体限值？

油量限制是指您愿意在一笔交易中消耗的最大油量。 与简单的支付相比，更复杂的交易，尤其是执行智能合约的交易，需要更多的计算资源和更高的气体限额。 标准的 KAIA 转运通常使用约 21,000 个气体。

如果您设置的气体限额过高，例如简单转账的限额为 50,000，那么交易将只使用它所需的部分（约 21,000），并返回其余部分。 但如果设置得太低，比如 20 000，交易就会立即失败，而且不会消耗任何气体。 如果交易在执行过程中耗尽汽油，比如调用智能合约时，它将恢复所有效果，但你仍需为耗尽的汽油付费。

## 燃气费总体结构

由于 Kaia 硬分叉后，交易创建者支付的总费用计算公式为

( **天然气价格** x **使用的天然气单位**)。

其中 **天然气价格** = **基本费** + **优先费**

### 什么是基本费用？

基本费是您在网络上处理交易时需要支付的每单位天然气的最低价格。 它由网络自己设定，并在每个区块后根据前一个区块是高于还是低于气体目标（网络在每个区块中要处理的交易量）进行上下调整。

如果一个区段很繁忙，使用量超过了目标值，基本费就会增加（5%），以帮助缓解拥堵；如果繁忙程度降低，基本费就会下降。  这种机制有助于保持区块大小的稳定，并使每个人的费用更可预测。 一旦交易完成，基本费用就会被烧掉，使其不再流通。

### 什么是优先权费？

优先费也称小费，是您自愿在基本费用之外支付的额外费用，以帮助您优先处理交易。 在 Kaia 上，小费并不直接给验证者，而是捐给网络奖励池，随后再分配给验证者和生态系统基金。 提供较高的小费，就表示您愿意支付更多的钱，以帮助您的交易得到更快的处理，并排在同一区块的其他交易之前。

## 估算燃气费

要清楚地了解您的交易通常会消耗多少天然气，最好采用以下方法：

### 在 ethers.js 中使用 eth_estimateGas API

你可以利用节点自身的执行上下文，准确地告诉你它预计你的事务在链上传播之前需要多少计算工作量，而不是猜测你的事务可能会消耗多少汽油。

这对开发人员和普通用户都很有用，前者需要通过编程控制燃气成本，避免因**燃气不足**错误而导致失败，后者则希望提前知道总费用，避免钱包里出现意外费用。

这是通过**eth_estimateGas** API 实现的，该 API 通过 ethers.js 公开。

**示例--估计铸币功能的气体**

比方说，您想估算智能合约铸币功能的气体。 下面是一个清晰、完整的脚本：

```js
const { ethers } = require('ethers');
require('dotenv').config();

const GOLD_CONTRACT_ADDRESS = '0xE13d6C18c52c1de9267aE6DF647fD4ADfAf82977';
const AMOUNT_TO_SEND = ethers.parseUnits('20', 18); // 20 tokens

// minimal ABI for the `mint` function
const MINT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Main script
async function estimateMintGas() {

 try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.ES_PRIVATE_KEY, provider);
    
    // prepare encoded transaction
    const iface = new ethers.Interface(MINT_ABI);
    const encodedData = iface.encodeFunctionData('mint', [wallet.address, AMOUNT_TO_SEND]);
    
    // estimate Gas
    const estimatedGas = await provider.estimateGas({ 
      to: GOLD_CONTRACT_ADDRESS, 
      from: wallet.address, 
      data: encodedData 
    });

    // gasPrice
    const gasPrice = await provider.getFeeData();

    console.log("Estimated Gas for mint:", estimatedGas.toString());
    console.log("Estimated GasPrice for mint:", gasPrice.gasPrice.toString());

    return estimatedGas;
    
  } catch (error) {
    console.error('Gas estimation failed!', error.reason || error.message);
    throw error;
  }
}

estimateMintGas().catch((err) => console.error('Error estimating gas!', err)); 
```

运行该脚本将产生类似的输出结果：

```bash
Estimated Gas for mint : 69002
Estimated GasPrice for mint: 27500000000
```

ethers.js 根据智能合约的 ABI 和参数构建交易的调用数据，通过 eth_estimateGas 发送给节点进行模拟运行，节点在不将其添加到区块的情况下执行该数据，以确定它将消耗多少天然气。

由此我们可以很容易地估算出汽油费：

_所用天然气_ x _天然气价格_

_69002 x 0.0000000275
\= 0.001897555 KAIA_

### 使用 MetaMask（KAIA 传输）

![](/img/build/wallets/estimate-gas-mm.png)
如图所示：

- 使用燃气21,000
- 基本费用：25 格瓦（或 0.000000025 卡亚）
- 优先权费：2.5 格瓦（或 0.0000000025 卡亚）。

要计算燃气费总额，只需用燃气使用量乘以基本费和优先费的总和即可

_21,000 \* (0.000000025 + 0.0000000025)
0.0005775 kaia._

这很好地显示了总计为 **0.0005775 KAIA**，与 MetaMask 在上面交易详情图片中显示的完全一致。

### 使用 Kaiascan（智能合约执行--SafeMint 功能）

![](/img/build/wallets/estimate-gas-kaiascan.png)

如图所示

- 使用燃气184,250
- 有效气价（基本费 + 优先权费） = 0.0000000275
  - 基本费用：25 格基（或 0.000000025 卡亚）
  - 优先权费：2.5 格基尼（或 0.0000000025 卡亚）。

要计算燃气费总额，只需用燃气使用量乘以基本费和优先费的总和：

_184,250 \* (0.000000025 + 0.0000000025)
0.005066875 kaia_

这很好地显示了总额为 0.005066875 KAIA 的情况，与上图中 Kaiascan 显示的交易详情完全一致。

### 使用前一个街区的基本费用

如果您想使用前一个区块的基本费用进行计算，请按照以下方法操作：

如果区块已满或气量超过目标值，则将上一个基本费乘以 1.05，即可得出下一个基本费。 这意味着，当一个区块的天然气用量超过网络目标值时，基本费用将增加 5%，以帮助缓解拥堵和抑制需求。 如果区块利用率低，基本费用可能会保持不变，甚至在随后的区块中减少。

| 街区 | 包括天然气      | 以前的基本费用                     | 下一个基本收费                                                                     |
| -- | ---------- | --------------------------- | --------------------------------------------------------------------------- |
| 1  | 15,000,000 | 100 克                       | 100 克                                                                       |
| 2  | 30,000,000 | 100 克                       | 100 克                                                                       |
| 3  | 30,000,000 | 100 克                       | 100 克朗 x 1.05 = 105 克朗                                      |
| 4  | 30,000,000 | 105 gkei                    | 105 克朗 x 1.05 = 110.25 克朗                   |
| 5  | 30,000,000 | 110.25 gkei | 110.25 x 1.05 = 115.76 gkei |




