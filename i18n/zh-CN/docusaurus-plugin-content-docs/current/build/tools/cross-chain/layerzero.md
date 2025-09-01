# Layerzero

## 导言<a id="introduction"></a>

[LayerZero](https://docs.layerzero.network/v2)作为Web3中的全链互操作性协议，使应用程序能够跨区块链移动数据，通过不可变的智能合约独特地支持抗审查信息和无许可开发。 Layerzero 为开发全能链应用程序提供了一套丰富的工具，因此开发人员可以轻松地[发送任意数据](https://docs.layerzero.network/v2/home/protocol/contract-standards#oapp)、[外部函数调用](https://docs.layerzero.network/v2/developers/evm/oapp/message-design-patterns)和[令牌](https://docs.layerzero.network/v2/home/protocol/contract-standards#oft)，同时保持对其应用程序的完全自主和控制。

## 使用方法<a id="usage"></a>

### 支持的网络

Layerzero 同时支持 Kaia Mainnet 和 Kairos Testnet。

|                       | 主网                                         | 启示录                                        |
| --------------------- | ------------------------------------------ | ------------------------------------------ |
| 链条 ID                 | 8217                                       | 1001                                       |
| 端点 ID                 | 30150                                      | 40150                                      |
| 终点 V2                 | 0x1a44076050125825900e736c501f859c50fE728c | 0x6EDCE65403992e310A62460808c4b910D972f10f |
| 发送Uln302              | 0x9714Ccf1dedeF14BaB5013625DB92746C1358cb4 | 0x6bd925aA58325fba65Ea7d4412DDB2E5D2D9427d |
| recvUln302            | 0x937AbA873827BF883CeD83CA557697427eAA46Ee | 0xFc4eA96c3de3Ba60516976390fA4E945a0b8817B |
| 执行者                   | 0xe149187a987F129FD3d397ED04a60b0b89D1669f | 0xddF3266fEAa899ACcf805F4379E5137144cb0A7D |
| 屏蔽消息库                 | 0x1ccbf0db9c192d969de57e25b3ff09a25bb1d862 | 0xAe0549FeF1B77d2D187C867Ad9a5432A9e8381C9 |
| DVN 地址（Layerzero 实验室） | 0xc80233ad8251e668becbc3b0415707fc7075501e | 0xe4fe9782b809b7d66f0dcd10157275d2c4e4898d |

要查看支持网络的完整列表，请访问 [LayerZero documentation](https://docs.layerzero.network/v2/deployments/chains/klaytn)。

### 开始

要开始在 Kaia 上使用 LayerZero，请参阅以下指南：

- [LayerZero V2 OApp 快速入门](https://docs.layerzero.network/v2/developers/evm/oapp/overview)
- [LayerZero V2 OFT 快速入门](https://docs.layerzero.network/v2/developers/evm/oft/quickstart)
- [LayerZero V2 ONFT 快速入门](https://docs.layerzero.network/v2/developers/evm/onft/quickstart)