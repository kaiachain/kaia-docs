# Layerzero

## 소개 <a id="introduction"></a>

[LayerZero](https://docs.layerzero.network/v2) as an omnichain interoperability protocol in Web3 enables applications to move data across blockchains, uniquely supporting censorship-resistant messages and permissionless development through immutable smart contracts. Layerzero provides a rich suite of tools for developing omnichain  applications, hence developers can easily [send arbitrary data](https://docs.layerzero.network/v2/home/protocol/contract-standards#oapp), [external function calls](https://docs.layerzero.network/v2/developers/evm/oapp/message-design-patterns), and [tokens](https://docs.layerzero.network/v2/home/protocol/contract-standards#oft) while preserving full autonomy and control over their application.

## 사용법 <a id="usage"></a>

### 지원 네트워크

레이어제로는 카이아 메인넷과 카이로스 테스트넷을 모두 지원합니다.

|                                      | 메인넷                                        | 카이로스                                       |
| ------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| 체인 ID                                | 8217                                       | 1001                                       |
| 엔드포인트 ID                             | 30150                                      | 40150                                      |
| `endpointV2`                         | 0x1a44076050125825900e736c501f859c50fE728c | 0x6EDCE65403992e310A62460808c4b910D972f10f |
| `sendUln302`                         | 0x9714Ccf1dedeF14BaB5013625DB92746C1358cb4 | 0x6bd925aA58325fba65Ea7d4412DDB2E5D2D9427d |
| `recvUln302`                         | 0x937AbA873827BF883CeD83CA557697427eAA46Ee | 0xFc4eA96c3de3Ba60516976390fA4E945a0b8817B |
| `실행자`                                | 0xe149187a987F129FD3d397ED04a60b0b89D1669f | 0xddF3266fEAa899ACcf805F4379E5137144cb0A7D |
| 차단된 메시지 라이브러리\`                      | 0x1ccbf0db9c192d969de57e25b3ff09a25bb1d862 | 0xAe0549FeF1B77d2D187C867Ad9a5432A9e8381C9 |
| DVN 주소(레이어제로 연구소) | 0xc80233ad8251e668becbc3b0415707fc7075501e | 0xe4fe9782b809b7d66f0dcd10157275d2c4e4898d |

지원되는 네트워크의 전체 목록을 보려면 [LayerZero 문서](https://docs.layerzero.network/v2/deployments/chains/klaytn)를 참조하세요.

### 시작하기

To get started using LayerZero on Kaia, refer to the following guides:

- [LayerZero V2 OApp Quickstart](https://docs.layerzero.network/v2/developers/evm/oapp/overview)
- [LayerZero V2 OFT Quickstart](https://docs.layerzero.network/v2/developers/evm/oft/quickstart)
- [LayerZero V2 ONFT Quickstart](https://docs.layerzero.network/v2/developers/evm/onft/quickstart)