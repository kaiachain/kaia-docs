# Layerzero

## 導言<a id="introduction"></a>

[LayerZero](https://docs.layerzero.network/v2)作為Web3中的全鏈互操作性協議，使應用程序能夠跨區塊鏈移動數據，通過不可變的智能合約獨特地支持抗審查信息和無許可開發。 Layerzero 為開發全能鏈應用程序提供了一套豐富的工具，因此開發人員可以輕鬆地[發送任意數據](https://docs.layerzero.network/v2/home/protocol/contract-standards#oapp)、[外部函數調用](https://docs.layerzero.network/v2/developers/evm/oapp/message-design-patterns)和[令牌](https://docs.layerzero.network/v2/home/protocol/contract-standards#oft)，同時保持對其應用程序的完全自主和控制。

## 使用方法<a id="usage"></a>

### 支援的網路

Layerzero 支援 Kaia Mainnet 和 Kairos Testnet。

|                                                | 主網路                                        | 啟示錄                                        |
| ---------------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| 鏈 ID                                           | 8217                                       | 1001                                       |
| 端點 ID                                          | 30150                                      | 40150                                      |
| `endpointV2`                                   | 0x1a44076050125825900e736c501f859c50fE728c | 0x6EDCE65403992e310A62460808c4b910D972f10f |
| 傳送Uln302                                       | 0x9714Ccf1dedeF14BaB5013625DB92746C1358cb4 | 0x6bd925aA58325fba65Ea7d4412DDB2E5D2D9427d |
| `recvUln302`                                   | 0x937AbA873827BF883CeD83CA557697427eAA46Ee | 0xFc4eA96c3de3Ba60516976390fA4E945a0b8817B |
| 執行器                                            | 0xe149187a987F129FD3d397ED04a60b0b89D1669f | 0xddF3266fEAa899ACcf805F4379E5137144cb0A7D |
| 「封鎖訊息函式」(blockedMessageLib) | 0x1ccbf0db9c192d969de57e25b3ff09a25bb1d862 | 0xAe0549FeF1B77d2D187C867Ad9a5432A9e8381C9 |
| DVN 位址 (Layerzero Labs)     | 0xc80233ad8251e668becbc3b0415707fc7075501e | 0xe4fe9782b809b7d66f0dcd10157275d2c4e4898d |

要查看完整的支援網路清單，請造訪 [LayerZero documentation](https://docs.layerzero.network/v2/deployments/chains/klaytn)。

### 開始

要開始在 Kaia 上使用 LayerZero，請參閱以下指南：

- [LayerZero V2 OApp 快速入門](https://docs.layerzero.network/v2/developers/evm/oapp/overview)
- [LayerZero V2 OFT 快速入門](https://docs.layerzero.network/v2/developers/evm/oft/quickstart)
- [LayerZero V2 ONFT 快速入門](https://docs.layerzero.network/v2/developers/evm/onft/quickstart)