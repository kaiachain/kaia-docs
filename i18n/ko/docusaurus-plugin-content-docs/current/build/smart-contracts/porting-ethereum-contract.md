# Import Ethereum Contracts

In most cases, you can use Ethereum contracts on Kaia without any modification.
하지만 다음 두 가지 문제에 유의하세요.

## Solidity 지원 <a id="solidity-support"></a>

- Cypress 네트워크는 현재 **London** 이더리움 가상 머신(EVM)과 호환됩니다.
- Baobab 네트워크는 현재 **London** 이더리움 가상머신(EVM)과 호환됩니다.

:::note

v1.7.0 프로토콜 업그레이드 - **Istanbul** 하드포크 아이템과 클레이튼 자체 아이템을 포함한 호환되지 않는 변경 사항.
Baobab 네트워크의 경우 블록 번호 `#75,373,312`, Cypress 네트워크의 경우 `#86,816,005`부터 활성화되었습니다.

v1.7.3 프로토콜 업그레이드 - **London** 하드포크의 기본 수수료를 포함한 호환되지 않는 변경 사항.
Baobab 네트워크의 경우 블록 번호 '#80,295,291', Cypress 네트워크의 경우 '#86,816,005'부터 활성화되었습니다.

v1.8.0 프로토콜 업그레이드 - **London** 하드포크의 기본 수수료를 포함한 호환되지 않는 변경 사항.
Baobab 네트워크의 경우 블록 번호 '#86,513,895', Cypress 네트워크의 경우 '#86,816,005'부터 활성화되었습니다.

:::

클레이튼의 다른 EVM 버전과의 하위 호환성은 보장되지 않습니다.
따라서 프로토콜 업그레이드 상태에 따라 올바른 타겟 옵션으로 Solidity 코드를 컴파일할 것을 권장합니다.

- Cypress: --evm-version london
- Baobab: --evm-version london
- 기타(프라이빗/서비스체인): 프로토콜 업그레이드 상태에 따라 결정됨

[solc의 EVM 버전 설정 방법](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target)을 참조하세요.

명령의 예는 아래와 같습니다:

```
$ solc --evm-version london contract.sol
```

## 분리된 키 쌍(Key Pairs) <a id="decoupled-key-pairs"></a>

클레이튼 [주소에서 키 쌍 분리](../../learn/accounts.md#decoupling-key-pairs-from-addresses). 사용자가 [계정을 업데이트](../../learn/transactions/basic.md#txtypeaccountupdate)하는 경우 특정 계정의 개인 키가 다른 키로 대체됩니다. 대부분의 경우 비즈니스 로직에는 영향을 미치지 않습니다. 그러나 비즈니스 로직에 ecrecover가 포함된 경우에는 validateSender 사용을 고려해야 합니다. 자세한 내용은 [여기](../../learn/computation/precompiled-contracts.md)를 참조하세요.
