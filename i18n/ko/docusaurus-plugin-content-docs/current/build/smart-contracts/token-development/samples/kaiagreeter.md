# KaiaGreeter

`KaiaGreeter`는 인사말 메시지를 반환하는 간단한 컨트랙트입니다. 인사말 메시지는 컨트랙트가 배포될 때 설정됩니다.

## KaiaGreeter 작성하기 <a href="#writing-kaiagreeter" id="writing-kaiagreeter"></a>

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract KaiaGreeter {
    /* 문자열 타입의 변수 인사말 정의 */
    string greeting;
    /* 컨트랙트가 생성될 때 한번 실행됩니다 */
    constructor (string memory _greeting) {
        greeting = _greeting;
    }
    /* 메인 함수 */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## Remix 온라인 IDE를 사용하여 KaiaGreeter 배포하기 <a href="#deploying-kaiagreeter-using-klaytn-ide" id="deploying-kaiagreeter-using-klaytn-ide"></a>

- 리믹스용 Kaia 플러그인](https://ide.kaia.io)을 방문하여 `KaiaGreeter.sol` 컨트랙트를 생성하세요.

- 위의 코드를 복사하여 새로 만든 파일에 붙여넣습니다: `KaiaGreeter.sol`.

    ![](/img/build/smart-contracts/kg-v2-create.png)

- 아직 테스트 KAIA가 없는 경우 [수도꼭지](https://faucet.kaia.io)에서 테스트 KAIA를 받으세요.

- 초기 파라미터인 인사말 메시지와 함께 컨트랙트를 배포합니다.

- 배포 후, IDE에서 `greet`를 호출할 수 있습니다.

    ![](/img/build/smart-contracts/kg-v2-deployed.png)

## 참조 <a href="#references" id="references"></a>

컨트랙트 배포에 대한 자세한 내용과 Remix Online IDE 사용 가이드라인은 다음 문서를 참조하세요.

- [리믹스 온라인 IDE](../../../smart-contracts/deployment-and-verification/deploy/deploy.md)