# 2. GA 如何工作：技术深挖

本节从技术角度详细介绍了气体抽取在 Kaia 网络中的运行方式，包括事务捆绑、原子性和关键组件的作用。

## 2.1 结构概述

GA 基于去中心化架构，利用智能合约和交易捆绑来确保无缝的用户体验。

### 主要组成部分

- **[KIP-247（无气交易）](https://kips.kaia.io/KIPs/kip-247):** 定义了网络可识别为符合气体抽象条件的特定交易格式（"GaslessApproveTx"、"GaslessSwapTx"）。
- **[KIP-245（交易捆绑）](https://kips.kaia.io/KIPs/kip-245)：** 保证必要的交易序列（借贷、审批、交换）在\*\*上得到执行--它们要么全部成功，要么全部失败。
- **[GaslessSwapRouter（GSR）](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol):** 一个核心智能合约，执行代币与 KAIA 的交换，并向区块提议者偿还初始天然气贷款，所有这些都在同一个区块内完成。

### 主要演员

下图说明了大会进程中的主要参与者及其互动关系：

![](/img/build/tutorials/ga1.png)

- **钱包**：启动无煤气交易的用户钱包或 dApp 界面。
- **用户账户**：发起无煤气交易的钱包或 dApp 用户。
- **区块提议者**：提出区块的节点，临时借出 KAIA 以收取燃气费。
- **GaslessSwapRouter (GSR)**：处理交换和偿还逻辑的智能合约。
- **DEX 路由器**：执行实际代币交换的底层去中心化交易所。

## 2.2 交易包组件

GA 通过**交易捆绑**进行操作，即区块链客户端将_只_ **LendTx +（可选）ApproveTx + SwapTx**组合成一个原子捆绑。 这三者要么全部成功，要么全部失败。 紧随捆绑后发送的任何 **AppTx** 都在捆绑之外，可以独立恢复。

![](/img/build/tutorials/ga2.png)

### LendTx（借贷交易）

- **签署人**：整块提案人
- **目的**：临时将 KAIA 借给用户以支付天然气费
- **创建**：在区块构建过程中[动态生成](https://github.com/kaiachain/kaia/blob/v2.0.3/kaiax/gasless/impl/getter.go#L267)
- **金额**：计算用于支付 ApproveTx + SwapTx 的气体费用

### ApproveTx（审批交易）- 可选

- **签署人**：用户
- **目的**：批准 GaslessSwapRouter 的 ERC-20 代币支出
- **需要时**：如果用户之前未批准令牌
- **格式**：必须遵循 [KIP-247 规格](https://kips.kaia.io/KIPs/kip-247)

### SwapTx（掉期交易）

- **签署人**：用户
- **目的**：将用户令牌交换为 KAIA 并偿还提议者
- **合同**：调用 [GaslessSwapRouter.sol](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol)
- **验证**：确保 `amountReceived >= minAmountOut >= amountRepay` 金额接收 >= minAmountOut >= amountRepay

## 2.3 原子性和故障处理

**KIP-245软件包属性：**

- **全有或全无执行**：如果任何事务失败，整个捆绑包将还原
- **超时豁免**：捆绑包不受每块 250 毫秒执行限制的约束
- **状态回滚**：失败的捆绑触发完全状态回滚

**常见故障情况：**

- 代币余额不足 → 恢复捆绑，无气体损失
- 超出价格滑点 → SwapTx 失败，捆绑恢复
- 缺少令牌批准 → 验证失败，交易仍在池中

## 2.4 网络级处理

**交易池验证**

无气交易可绕过交易池中的正常余额检查。 验证逻辑可检测无煤气交易，并跳过煤气费账户余额检查。

**推广和捆绑逻辑**

- 如果没有相应的 GaslessSwapTx，则无法推广 GaslessApproveTx
- 如果令牌已获批准，GaslessSwapTx 可独立推广
- 当两个交易都存在时，两个交易同时进行

**阻止提案人注入和执行**

区块提议者在检测到无气交易时会自动注入 LendTx。 LendTx 在区块生成过程中即时创建，并置于用户的无气交易之前。

## 2.5 改变平衡的工作流程示例

让我们来看看用户拥有 `1.00 BORA` 和 `0 KAIA` 的情况。

| 步骤                                        | 行动                                                          | 提案人余额                        | 用户余额                                                    | 说明                                                        |
| :---------------------------------------- | :---------------------------------------------------------- | :--------------------------- | :------------------------------------------------------ | :-------------------------------------------------------- |
| 1. 初始              | -                                                           | 10.00 KAIA   | 0.00 Kaia, 1.00 Bora    | 用户希望支付 Tx 费用。                                             |
| 2. \*\*借给我         | 投标人出借 0.02 KAIA。                            | 9.97 KAIA    | 0.02 kaia, 1.00 bora    | 投标人自付燃气费。                                                 |
| 3. **`ApproveTx`** | 用户为 GSR 批准 BORA。                                            | 9.97 KAIA    | 0.01 kaia, 1.00 bora    | 天然气 (0.01 KAIA) 由贷款支付。 |
| 4. **`SwapTx`**    | 用户用 0.06 BORA 交换 0.04 KAIA。 | **10.00 卡亚** | **0.01 kaia**，0.94 bora | 向投标人偿还 0.03 KAIA。                         |
| 5. **`AppTx`**     | 用户执行主 tx。                                                   | 10.00 KAIA   | 0.00 kaia, 0.94 bora    | 汽油费由换来的 KAIA 支付。                                          |
