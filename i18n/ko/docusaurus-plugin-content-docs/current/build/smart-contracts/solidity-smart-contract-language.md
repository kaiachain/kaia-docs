# Solidity - 스마트 컨트랙트 언어

Solidity는 이미 공식 웹사이트에 잘 설명되어 있으므로 이 장에서는 Solidity로 작성된 높은 수준의 개념, 개발 프로세스 및 예제만 설명합니다. 언어 사양이나 구현에 대해서는 아래의 [참조](#references)를 참조하시기 바랍니다. 이 장의 내용은 [참조](#references)에 나열된 다양한 웹사이트를 기반으로 합니다.

## Solidity와 클레이튼 <a id="solidity-and-klaytn"></a>

[Solidity](https://github.com/ethereum/solidity)는 이더리움 플랫폼에서 스마트 컨트랙트를 구현하기 위한 높은 수준의 정적 타입의 컨트랙트 지향 언어입니다. Solidity는 원래 이더리움용으로 설계되었지만, 스마트 컨트랙트를 작성하기에 충분히 일반적이므로 클레이튼과 같은 다른 블록체인 플랫폼에서도 사용할 수 있습니다.

클레이튼은 **London** 이더리움 가상머신(EVM) 버전과 공식적으로 호환됩니다. 클레이튼의 다른 EVM 버전과의 하위 호환성은 보장되지 않습니다. 따라서 Istanbul 타겟 옵션으로 Solidity 코드를 컴파일할 것을 적극 권장합니다. [Solidity의 EVM 버전 설정 방법](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target)을 참고하시기 바랍니다.

:::note

v1.7.0 프로토콜 업그레이드 - **Istanbul** 하드포크 아이템과 클레이튼 자체 아이템을 포함한 호환되지 않는 변경 사항.
Baobab 네트워크의 경우 블록 번호 `#75,373,312`, Cypress 네트워크의 경우 `#86,816,005`부터 활성화되었습니다.

v1.7.3 프로토콜 업그레이드 - **London** 하드포크의 기본 수수료를 포함한 호환되지 않는 변경 사항.
Baobab 네트워크의 경우 블록 번호 '#80,295,291', Cypress 네트워크의 경우 '#86,816,005'부터 활성화되었습니다.

v1.8.0 프로토콜 업그레이드 - **London** 하드포크의 기본 수수료를 포함한 호환되지 않는 변경 사항.
Baobab 네트워크의 경우 블록 번호 '#86,513,895', Cypress 네트워크의 경우 '#86,816,005'부터 활성화되었습니다.

:::

클레이튼 스마트 컨트랙트를 개발할 때 [Remix](https://remix.ethereum.org/) (브라우저 기반 IDE) 및 [Truffle](https://github.com/trufflesuite/truffle) (개발 프레임워크)과 같은 개발 도구를 활용할 수 있습니다. 클레이튼 팀은 이더리움의 개발 도구와 클레이튼의 개발 도구 간의 호환성을 유지하기 위해 노력할 것이지만, 필요한 경우 클레이튼 스마트 컨트랙트 개발자에게 해당 도구의 향상된 버전 또는 업데이트된 버전을 제공할 수 있습니다.

스마트 컨트랙트를 개발할 때는 Remix나 Truffle을 사용하는 것이 편리하지만, Solidity 컴파일러는 아래 웹 페이지에 설명된 지침에 따라 빌드하거나 설치하여 로컬에서 사용할 수 있습니다:

- [Solidity 컴파일러 설치](https://docs.soliditylang.org/en/latest/installing-solidity.html)

두 가지 명령줄 Solidity 컴파일러가 있다는 점에 유의하세요:

- _solc_: 모든 기능을 갖춘 컴파일러
  - Solidity 문서에서 다루고 있습니다.
- _solcjs_: _solc_ 에 대한 JavaScript 바인딩
  - 별도의 프로젝트로 유지 관리 [solc-js](https://github.com/ethereum/solc-js)
  - _solcjs_ 의 명령줄 옵션은 _solc_ 의 옵션과 호환되지 않습니다.

Solidity를 시작하는 데 유용한 기타 자료는 다음과 같습니다:

- [대표적 Solidity 튜토리얼](https://medium.com/coinmonks/top-solidity-tutorials-4e7adcacced8)

## 스마트 컨트랙트 작성 방법 <a id="how-to-write-a-smart-contract"></a>

이 섹션에서는 스마트 콘트랙트의 모습과 콘트랙트 작성 방법에 대한 아이디어를 제공하기 위해 Solidity 소스 코드의 예를 제시합니다. 여기에 포함된 코드는 설명 목적으로만 제공되며, 제작 목적이 아닙니다. 코드에서 `(required)`는 해당 줄이 모든 Solidity 소스 파일에 필요함을 의미하며, `(optional)`은 해당 줄이 항상 필요하지 않음을 나타냅니다. 기호 `Ln:`는 Solidity 코드의 일부가 아니며, 여기에는 줄 번호를 표시하기 위해서만 포함됩니다. 실제 사용하려는 소스 코드에는 이 기호를 포함하지 마세요.

```text
L01: pragma solidity 0.5.12;   // (required) version pragma
L02:
L03: import "filename";        // (optional) importing other source files
L04:
L05: // (optional) smart contract definition
L06: contract UserStorage {
L07:    mapping(address => uint) userData;  // state variable
L08:
L09:    function set(uint x) public {
L10:       userData[msg.sender] = x;
L11:    }
L12:
L13:    function get() public view returns (uint) {
L14:       return userData[msg.sender];
L15:    }
L16:
L17:    function getUserData(address user) public view returns (uint) {
L18:       return userData[user];
L19:    }
L20: }
```

위의 코드는 자명하므로 다른 프로그래밍 언어에 익숙한 분들은 이 섹션의 설명을 건너뛰고 다음 섹션으로 넘어가셔도 됩니다. 그러나 코드가 무엇을 하는지 명확하게 이해하지 못하거나 Solidity가 처음 프로그래밍 언어인 분들을 위해 아래에 소스 코드에 대한 간단한 설명을 포함했습니다:

- 이중 슬래시 (`//`)로 시작하는 코드 부분은 코드가 아닌 주석이며, 주석은 코드에 주석을 달고 설명하는 데 사용됩니다.  컴파일러는 주석을 무시합니다.
- `L01`의 `pragma` 문은 최소 컴파일러 버전을 나타냅니다.
- `L03`의 `import` 문은 "`filename`"에서 모든 전역 심볼을 가져옵니다. `filename`은 실제 파일 이름이어야 합니다.
- `L05` - `L20`은 `UserStorage`라는 스마트 컨트랙트를 정의합니다.  키워드 `contract`는 컨트랙트 이름 앞에 위치하며 해당 코드가 스마트 컨트랙트를 나타내는 것을 선언합니다.  Solidity의 컨트랙트는 객체지향 언어의 클래스와 유사합니다.  각 컨트랙트에는 상태 변수, 함수, 함수 수정자, 이벤트, 구조체 유형, 열거형 유형에 대한 선언이 포함될 수 있습니다.  Furthermore, contracts can inherit from other contracts.  예제 코드에는 하나의 컨트랙트 정의가 포함되어 있지만, 하나의 Solidity 파일에는 두 개 이상의 컨트랙트 정의가 포함될 수 있습니다.
- `L07`에서 `userData`는 매핑 타입에 대한 상태 변수입니다.  상태 변수는 컨트랙트 스토리지에 영구적으로 저장됩니다.  상태 변수 `userData`는 `address`와 `uint` 값 사이의 매핑을 유지합니다.  `address` 유형은 20바이트 주소를 보유합니다(Klaytn은 이더리움과 유사한 20바이트 주소를 사용합니다).
- `L09`는 메시지 발신자에 대한 `userData`에 `x` 값을 저장하는 공용 함수 `set`을 정의합니다.  변수 `msg.sender`는 Solidity에 정의된 특수 변수로, 메시지 (즉, 현재 호출) 발신자의 주소를 나타냅니다.  키워드 `public`은 함수가 컨트랙트 인터페이스의 일부이며 외부 또는 내부에서 호출할 수 있음을 의미합니다.
- `L13`의 `get`과 `L17`의 `getUserData` 함수는 `view`로 선언되어 있는데, 이는 함수가 상태 변수를 수정하지 않겠다고 약속하는 것을 의미합니다.  이 함수의 선언에는 `returns (uint)`가 포함되어 있는데, 이는 `uint` 값을 반환한다는 것을 의미합니다.

Solidity 언어의 구문과 의미에 관한 자세한 내용은 [Solidity 문서](https://docs.soliditylang.org/)를 참조하시기 바랍니다.

## 컴파일, 배포 및 실행 방법 <a id="how-to-compile-deploy-and-execute"></a>

Solidity 코드를 컴파일하는 한 가지 방법은 명령줄 컴파일러 _solc_ 를 사용하는 것입니다. 이 컴파일러는 간단한 바이너리 및 어셈블리부터 추상 구문 트리 (파스 트리)에 이르기까지 다양한 출력을 생성할 수 있습니다. 위의 코드가 `UserStorage.sol`에 저장되어 있다고 가정하고(위에 표시된 소스 파일에서 `L03`은 제외됨), `UserStorage.sol` 파일을 컴파일하는 몇 가지 예는 다음과 같습니다.

```bash
$ solc --bin UserStorage.sol
```

- 이 명령은 컴파일 출력을 바이너리, 즉, 바이트코드로 인쇄합니다.

```bash
solc -o output --bin --ast --asm UserStorage.sol
```

- 컴파일러는 바이너리 (by `--bin`), 추상 구문 트리 (by `--ast`), 어셈블리 코드 (by `--asm`)를 `output` 디렉터리에 별도의 파일로 생성합니다.

```bash
solc --optimize --bin UserStorage.sol
```

- 성능 향상을 위해 컴파일 중에 `--optimize` 플래그를 사용하여 옵티마이저를 활성화할 수 있습니다.

스마트 컨트랙트를 컴파일, 배포, 실행하는 데 필요한 몇 가지 리소스는 다음과 같습니다.

- [Solidity 명령줄 컴파일러 사용](https://docs.soliditylang.org/en/latest/using-the-compiler.html)
- [Remix를 사용하여 컨트랙트 컴파일하기](https://remix-ide.readthedocs.io/en/stable/compile.html)
- [Remix로 트랜잭션 실행하기](https://remix-ide.readthedocs.io/en/stable/run.html)
- [Remix 학습 튜토리얼](https://remix-ide.readthedocs.io/en/latest/remix_tutorials_learneth.html)
- [Truffle을 사용하여 컨트랙트 컴파일하기](https://trufflesuite.com/docs/truffle/getting-started/compiling-contracts)
- [Truffle을 이용한 컨트랙트 배포](https://trufflesuite.com/docs/truffle/getting-started/running-migrations)

참고: 이 섹션은 향후 업데이트될 예정입니다.

## 스마트 컨트랙트 디버깅하기 <a id="debugging-smart-contracts"></a>

완성된 디버깅 도구가 부족하기 때문에 다른 프로그래밍 언어로 작성된 코드를 디버깅하는 것보다 Solidity 코드를 디버깅하는 것이 더 어렵습니다. 아래에는 Solidity 디버깅을 위한 몇 가지 리소스가 나열되어 있습니다.

- [Remix로 트랜잭션 디버깅하기](https://remix-ide.readthedocs.io/en/latest/debugger.html)
- [Remix로 트랜잭션 디버깅 튜토리얼](https://remix-ide.readthedocs.io/en/latest/tutorial_debug.html)
- [Truffle로 컨트랙트 디버깅하기](https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-debugger/)

참고: 이 섹션은 향후 업데이트될 예정입니다.

## 스마트 컨트랙트 모범 사례 <a id="smart-contract-best-practices"></a>

스마트 콘트랙트에서 보안 문제와 코드 품질 문제를 제거하려면 Solidity 프로그래밍의 모범 사례를 연구하고 따르는 것이 중요합니다. 여기에서는 Solidity 모범 사례에 대한 참조를 보여드리겠습니다.

- [스마트 컨트랙트 보안 모범 사례](https://github.com/ConsenSys/smart-contract-best-practices)

참고: 이 섹션은 향후 업데이트될 예정입니다.

## 참조 <a id="references"></a>

- [Solidity GitHub 페이지](https://github.com/ethereum/solidity)
- [Solidity 문서](https://solidity.readthedocs.io/en/latest/index.html)
- [Remix 문서](https://remix-ide.readthedocs.io/en/latest/)
- [Truffle 문서](https://trufflesuite.com/docs/truffle/)
