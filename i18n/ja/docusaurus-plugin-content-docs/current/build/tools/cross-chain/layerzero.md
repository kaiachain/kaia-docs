# Layerzero

## はじめに<a id="introduction"></a>

Web3におけるオムニチェーン相互運用性プロトコルとしての[LayerZero](https://docs.layerzero.network/v2)は、アプリケーションがブロックチェーン間でデータを移動することを可能にし、検閲に耐性のあるメッセージと、不変のスマートコントラクトによるパーミッションレス開発を独自にサポートする。 Layerzeroは、オムニチェーン・アプリケーションを開発するための豊富なツール群を提供します。そのため、開発者は、アプリケーションの完全な自律性と制御を維持しながら、簡単に[任意のデータを送信](https://docs.layerzero.network/v2/home/protocol/contract-standards#oapp)、[外部関数呼び出し](https://docs.layerzero.network/v2/developers/evm/oapp/message-design-patterns)、[トークン](https://docs.layerzero.network/v2/home/protocol/contract-standards#oft)することができます。 Layerzeroは、オムニチェーン・アプリケーションを開発するための豊富なツール群を提供します。そのため、開発者は、アプリケーションの完全な自律性と制御を維持しながら、簡単に[任意のデータを送信](https://docs.layerzero.network/v2/home/protocol/contract-standards#oapp)、[外部関数呼び出し](https://docs.layerzero.network/v2/developers/evm/oapp/message-design-patterns)、[トークン](https://docs.layerzero.network/v2/home/protocol/contract-standards#oft)することができます。

## 使用方法<a id="usage"></a>

### 対応ネットワーク

LayerzeroはKaia MainnetとKairos Testnetの両方をサポートしています。

|                         | メインネット                                     | カイロス                                       |
| ----------------------- | ------------------------------------------ | ------------------------------------------ |
| チェーンID                  | 8217                                       | 1001                                       |
| エンドポイントID               | 30150                                      | 40150                                      |
| `endpointV2`            | 0x1a44076050125825900e736c501f859c50fE728c | 0x6EDCE65403992e310A62460808c4b910D972f10f |
| `sendUln302`            | 0x9714Ccf1dedeF14BaB5013625DB92746C1358cb4 | 0x6bd925aA58325fba65Ea7d4412DDB2E5D2D9427d |
| `recvUln302`            | 0x937AbA873827BF883CeD83CA557697427eAA46Ee | 0xFc4eA96c3de3Ba60516976390fA4E945a0b8817B |
| `executor`              | 0xe149187a987F129FD3d397ED04a60b0b89D1669f | 0xddF3266fEAa899ACcf805F4379E5137144cb0A7D |
| `blockedMessageLib`     | 0x1ccbf0db9c192d969de57e25b3ff09a25bb1d862 | 0xAe0549FeF1B77d2D187C867Ad9a5432A9e8381C9 |
| DVNアドレス（Layerzero Labs） | 0xc80233ad8251e668becbc3b0415707fc7075501e | 0xe4fe9782b809b7d66f0dcd10157275d2c4e4898d |

サポートされているネットワークの全リストを見るには、[LayerZero documentation](https://docs.layerzero.network/v2/deployments/chains/klaytn)を参照してください。

### はじめに

カイアでLayerZeroを使い始めるには、以下のガイドを参照してください：

- [LayerZero V2 OApp Quickstart](https://docs.layerzero.network/v2/developers/evm/oapp/overview)
- [LayerZero V2 OFT クイックスタート](https://docs.layerzero.network/v2/developers/evm/oft/quickstart)
- [LayerZero V2 ONFT クイックスタート](https://docs.layerzero.network/v2/developers/evm/onft/quickstart)