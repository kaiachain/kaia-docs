# 6. 고급 주제 및 FAQ

이 섹션에서는 가스 추상화(GA) 통합을 최적화하고 문제를 해결하기 위한 고급 주제와 FAQ를 다룹니다.  GA의 복잡한 측면을 이해하고, 모범 사례를 적용하며, 일반적인 문제를 해결하는 데 도움이 되는 정보를 제공합니다.

## 6.1 모범 사례

| 주제                  | 권장사항                                                                                                                                                                                                                                                                      | 비고                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **슬리피지**            | 토큰의 변동성이 매우 크지 않다면 `getAmountIn()`에 \*\*0.5 % (50 bps)\*\*로 시작하세요.                                                                                                                                                     | SDK는 값을 하드코딩하지 않으며 0.5%는 Kaia 참조 코드에서 보여준 사실상의 기본값입니다.                                     |
| **허용량**             | ERC-20 허용량을 캐시하고 `allowance > 0`일 때 **`ApproveTx`를 건너뛰어** 추가 서명과 가스를 절약하세요.                                                                                                                                                                               | KIP-247은 승인이 이미 존재할 때 2-tx 번들(Lend + Swap)을 허용하므로 허용량 재사용이 완전히 안전합니다.                   |
| **배치 제출**           | `kaia_sendRawTransactions` (배열 페이로드)를 사용하여 **ApproveTx + SwapTx**를 함께 푸시함으로써 풀 경쟁 상태를 방지하세요.                                                                                                                                           | 단일 tx 호출(`eth_sendRawTransaction`)도 작동하지만, 두 번째 tx가 먼저 노드에 도달하면 nonce/정적 규칙 검사에서 실패합니다. |
| **보안**              | a) Kaia 문서에서 정식 GaslessSwapRouter(GSR) 주소를 **하드코딩**하세요. <br/>b) 스왑을 구성하기 전에 **지원 여부를 확인**하세요. 예: try/catch 내에서 `await router.dexAddress(token)` 또는 `getSupportedTokens()`에서 반환된 목록 확인. | 피싱 컨트랙트나 지원되지 않는 토큰이 GA 플로우를 하이재킹하는 것을 방지합니다.                                                              |
| **KAIA 없이 가스 예상하기** | **state override**를 사용하여 `eth_estimateGas`로 호출에서 송신자에게 임시 잔액을 부여하세요. 예: `eth_estimateGas(txObj, 'latest', { [from]: { balance: '0x…' } })`.                                                                               | 실제로 계정에 KAIA가 전혀 없을 때 _"insufficient balance"_ 오류를 우회합니다.                                                  |

## 6.2 문제 해결

| 증상                                                     | 가능한 원인                                                                                                                                               | 권장 해결책                                                                                                                                                                                                                                                     |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **번들이 채굴되지 않음**                                        | a) `token`이 **화이트리스트에 없음**. <br/>b) `minAmountOut`이 너무 타이트하여 전체 번들이 되돌려짐.                                            | • **먼저 지원 여부 확인**: **서명하기 전에** `await router.dexAddress(token)` (지원되지 않으면 되돌림) **또는** `getSupportedTokens().includes(token)`.<br/>• `slippageBps`를 늘리거나 `amountIn`을 실시간으로 견적을 다시 산정하세요. |
| **`INSUFFICIENT_OUTPUT_AMOUNT` 되돌림**                   | 견적과 실행 사이에 가격이 변경되어 GSR 검사 `amountReceived >= minAmountOut`이 실패.                                                                     | 현재 풀 보유량으로 `getAmountIn()`을 다시 실행한 후, 더 높은 `minAmountOut` 또는 더 넓은 슬리피지로 `SwapTx`를 재구성하세요.                                                                                                                                                  |
| **노드가 tx 거부("insufficient funds")** | **GaslessApproveTx**만 전송됨. 잔액 확인이 건너뛰어지고 쌍을 이루는 **SwapTx**가 없기 때문에 제안자가 **LendTx**를 인젝션하지 않아 트랜잭션이 가지지 않은 KAIA를 소비함. | 항상 `kaia_sendRawTransactions`를 통해 **ApproveTx & SwapTx를 같은 배치에서 제출**하거나, `approveRequired == false`인지 확인하여 2-tx 번들을 보낼 수 있도록 하세요.                                                                                      |
| **번들 내 논스 불일치**                                        | 외부 dApp이 GA 번들이 채굴되기 전에 다음 nonce를 소비하는 일반 tx를 전송.                                                                                    | 서명 직전에 `getTransactionCount()`를 조회하여 nonce가 이동했다면 두 tx 객체를 모두 재구성하세요.                                                                                                                                                                      |
| `klay_sendRawTransactions → "undefined tx type"`       | 이더리움 타입만 지원하는 **kaia_…** 엔드포인트를 통해 Kaia 특정 tx 타입(예: 0x30)을 배치 전송하려고 시도.      | `kaia_sendRawTransactions`로 GA 번들을 전송한 후, `klay_sendRawTransaction`으로 0x30 AppTx를 브로드캐스트하세요.                                                                                                                                               |

## 6.3 자주 묻는 질문

### GA는 메인넷에서 사용 가능한가요?

네, GA는 현재 **Kairos 테스트넷**과 **메인넷** 모두에서 라이브 상태입니다.

### 사용자가 스왑을 위한 토큰이 충분하지 않으면 어떻게 되나요?

SwapTx가 온체인에서 실패하지만, **KIP-245의 원자적 번들링** 때문에 전체 번들이 되돌려지고 블록에서 제외됩니다. 사용자는 자금을 잃지 않으며, 온체인 상태는 변경되지 않고 유지됩니다. 실패한 시도에 대해 가스비를 지불하지 않습니다.

### 가스로 스왑된 토큰과 금액을 어떻게 확인할 수 있나요?

성공한 모든 `swapForGas` 호출은 `GaslessSwapRouter`에서 **SwappedForGas** 이벤트를 발생시킵니다.  
다음과 같이 할 수 있습니다:

1. KaiaScan에서 라우터 주소(contract-addresses 문서 참조)를 조회하고 **Events** 탭을 엽니다.
2. 이벤트 로그에 표시된 `token`, `amountIn`, `amountOut`, `amountRepay` 필드를 디코딩합니다.

온체인에서 데이터가 필요한 경우, 인덱서나 dApp 백엔드에서 `SwappedForGas`를 수신 대기하세요.

### 노드에서 GA를 비활성화할 수 있나요?

개별 노드는 GA를 비활성화할 수 있지만, **기본적으로 활성화**되어 있습니다. 한 노드에서 비활성화되어도 GA를 지원하는 다른 노드에서 결국 트랜잭션이 처리됩니다.

### 가스 추상화가 블록을 느리게 만드나요?

아니요. KIP-245는 번들을 블록당 250ms _execution-timeout_ 검사에서 면제하므로, EVM이 번들 처리를 시작하면 전체 번들을 완료할 수 있습니다. GA 트랜잭션은 잘 알려진 ERC20 승인 및 GSR 스왑 작업으로 제한되므로 합리적인 시간 내에 실행됩니다. 따라서 GA 번들은 체인의 블록 시간 예산을 위태롭게 하지 않습니다.

### 가스리스 트랜잭션이 실행되는 것을 어디서 볼 수 있나요?

Kairos 테스트넷 익스플로러에서 볼 수 있습니다. 다음 블록들은 전체 번들이 순차적으로 실행되는 것을 보여줍니다:

- **3-tx 번들 예시 (Lend + Approve + Swap):** [Kairos KaiaScan의 블록 189826352](https://kairos.kaiascan.io/block/189826352?tabId=blockTransactions&page=1)
- **2-tx 번들 예시 (Lend + Swap):** [Kairos KaiaScan의 블록 189826547](https://kairos.kaiascan.io/block/189826547?tabId=blockTransactions)

## 6.4 추가 리소스

**기술 명세:**

- [KIP-247: Gasless Transaction](https://kips.kaia.io/KIPs/kip-247) - 핵심 GA 명세
- [KIP-245: Transaction Bundle](https://kips.kaia.io/KIPs/kip-245) - 번들링 메커니즘
- [GaslessSwapRouter Contract](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol)

**개발자 리소스:**

- [Kaia SDK Repository](https://github.com/kaiachain/kaia-sdk)
- [공식 컨트랙트 주소](https://docs.kaia.io/references/contract-addresses/)
- [Kaia 개발자 문서](https://docs.kaia.io/)

**커뮤니티 및 지원:**

- [KIP-247 토론 포럼](https://devforum.kaia.io/t/discussion-on-kip-247/8089)
- [Kaia 디스코드](https://discord.gg/kaiachain)
- [SDK 지원을 위한 GitHub Issues](https://github.com/kaiachain/kaia-sdk/issues)

**교육 콘텐츠:**

- [스테이블코인으로 가스비 지불이 가능하다면?](https://medium.com/kaiachain/pay-for-gas-fees-with-any-token-a-deep-dive-into-kaias-trustless-gas-abstraction-d670355a096b)
- [Kaia Consensus Liquidity 발표](https://medium.com/kaiachain/%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8-%EC%9C%A0%EB%8F%99%EC%84%B1-%EA%B3%B5%EA%B8%89%EC%9D%98-%EC%83%88%EB%A1%9C%EC%9A%B4-%ED%8C%A8%EB%9F%AC%EB%8B%A4%EC%9E%84%EC%9D%84-%EC%A0%9C%EC%8B%9C%ED%95%A9%EB%8B%88%EB%8B%A4-kaia-consensus-liquidity-ff6ed20a155f)