# Foundry로 스마트 컨트랙트 배포하기

![](/img/banners/kaia-foundry.png)

## 소개

Foundry는 개발자가 Solidity 스크립트를 통해 명령줄에서 컨트랙트를 관리 및 컴파일하고, 테스트를 실행하고, 컨트랙트를 배포하고, 네트워크와 상호작용할 수 있도록 지원하는 Rust로 작성된 스마트 컨트랙트 개발 프레임워크입니다.

Foundry는 빠르고 모듈화된 스마트 컨트랙트 개발을 가능하게 하는 네 가지 주요 CLI 도구로 구성되어 있습니다:

- [Forge](https://github.com/foundry-rs/foundry/tree/master/forge):  Forge를 사용하여 스마트 컨트랙트를 배포, 테스트 및 컴파일할 수 있습니다.
- [Cast](https://github.com/foundry-rs/foundry/tree/master/cast): 캐스트는 EVM 스마트 컨트랙트와의 상호작용을 간단하게 만들어줍니다. 여기에는 체인 데이터 가져오기, 트랜잭션 전송 등이 포함됩니다.
- [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil): 로컬 노드를 스핀업해야 하나요? Anvil은 Foundry에서 제공하는 로컬 노드 환경입니다.
- [Chisel](https://github.com/foundry-rs/foundry/blob/master/chisel): 빠르고 유용하며 자세한 Solidity REPL.

이 가이드에서는 다음을 수행합니다:

- 간단한 Foundry 프로젝트를 생성합니다.
- Foundry를 사용하여 스마트 컨트랙트 샘플을 컴파일하고 테스트합니다.
- Foundry를 사용하여 스마트 컨트랙트를 카이아 Kairos 네트워크에 배포합니다.
- Cast와 Anvil로 메인넷 포크 살펴보기.

## 사전 요구 사항

이 튜토리얼을 따르기 위한 전제 조건은 다음과 같습니다:

- 코드 편집기: [VS-Code](https://code.visualstudio.com/download)와 같은 소스 코드 편집기.
- [MetaMask](../../tutorials/connecting-metamask#install-metamask): 컨트랙트를 배포하고, 트랜잭션에 서명하고, 컨트랙트와 상호 작용하는 데 사용됩니다.
- RPC 엔드포인트: 지원되는 [엔드포인트 공급자](../../../references/service-providers/public-en.md) 중 하나에서 얻을 수 있습니다.
- [Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 KAIA 테스트: 충분한 KAIA로 계정에 자금을 충전합니다.
- [Rust](https://www.rust-lang.org/tools/install) 및 [Foundry](https://github.com/foundry-rs/foundry#installation)를 설치합니다.

## 개발 환경 설정하기

Foundry 설치가 성공적으로 완료되었는지 확인하려면 아래 명령을 실행하세요:

```bash
forge -V
```

**출력**

![](/img/build/get-started/forge-version.png)

Foundry를 성공적으로 설치했으면 이제 Foundry에서 사용할 수 있는 CLI 도구(forge, cast, anvil, chisel)에 액세스할 수 있습니다. 다음 단계에 따라 Foundry 프로젝트를 설정해 보겠습니다:

**1단계**: 새 프로젝트를 시작하려면 아래 명령을 실행합니다:

```bash
forge init foundry_example 
```

**2단계**: 프로젝트 폴더로 이동합니다.

```bash
cd foundry_example
ls	 
```

Foundry 프로젝트를 초기화한 후, 현재 디렉터리에 다음이 포함되어야 합니다:

- **src**: 스마트 컨트랙트의 기본 디렉터리입니다.
- **tests**: 테스트를 위한 기본 디렉터리.
- **foundry.toml**: 기본 프로젝트 구성 파일.
- **lib**: 프로젝트 종속성을 위한 기본 디렉터리.
- **script**: Solidity 스크립팅 파일의 기본 디렉터리.

## 스마트 컨트랙트 샘플

이 섹션에서는 초기화된 Foundry 프로젝트에서 샘플 카운터 컨트랙트를 사용하겠습니다. `src/` 폴더의 `counter.sol` 파일은 다음과 같은 모습이어야 합니다:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
contract Counter {
    uint256 public number;
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }
    function increment() public {
        number++;
    }
}
```

**코드 연습**

이것이 여러분의 스마트 컨트랙트입니다. **1행**은 Solidity 버전 0.8.13 이상을 사용함을 보여줍니다. 4줄부터 12줄까지는 스마트 컨트랙트 `Counter`가 생성됩니다. 이 컨트랙트는 **setNumber** 함수를 사용하여 새로운 숫자를 저장하고 **increment** 함수를 호출하여 숫자를 증가시킵니다.

## 스마트 컨트랙트 테스트

Foundry를 사용하면 다른 스마트 컨트랙트 개발 프레임워크에서 JavaScript로 테스트를 작성하는 것과 달리 Solidity로 테스트를 작성할 수 있습니다. 초기화된 Foundry 프로젝트에서 `test/Counter.t.sol`은 Solidity로 작성된 테스트의 예시입니다. 코드는 다음과 같습니다:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/Counter.sol";
contract CounterTest is Test {
    Counter public counter;
    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }
    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }
    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
```

위 코드는 위조 표준 라이브러리와 Counter.sol을 가져온 것을 보여줍니다.

위의 테스트는 다음을 확인합니다:

- 숫자가 증가하고 있는가?
- 숫자가 설정된 숫자와 같은가?

테스트가 정상적으로 작동하는지 확인하려면 다음 명령을 실행하세요:

```bash
forge test
```

**출력**

![](/img/build/get-started/forge-test.png)

테스트 작성, 고급 테스트 및 기타 기능에 대해 자세히 알아보려면 [Foundry 문서](https://book.getfoundry.sh/forge/tests)를 참조하세요.

## 스마트 컨트랙트 컴파일하기

이 명령으로 컨트랙트를 컴파일합니다:

```bash
forge build 
```

## 컨트랙트 배포하기

Foundry를 사용하여 컨트랙트를 배포하려면, 컨트랙트를 배포할 계정의 RPC URL과 개인키를 제공해야 합니다. 카이아의 [rpc 제공자](../../../references/service-providers/public-en.md) 목록을 참고하여 rpc-url을 찾고, [MetaMask](../../tutorials/connecting-metamask#install-metamask)를 사용하여 계정을 생성합니다.

**1단계**: 컨트랙트를 Kaia Kairos 네트워크에 배포하려면, 아래 명령어를 실행합니다:

```bash
$ forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/Counter.sol:Counter
```

**예시**

```bash
forge create --rpc-url https://klaytn-baobab-rpc.allthatnode.com:8551/qtKkeUE8ZEPI2cs0OHloJ6seI4Wfy36N --private-key hhdhdhdhprivatekeyhdhdhdhud src/Counter.sol:Counter
```

**경고: 개인 키 인수를 MetaMask의 개인 키로 바꾸세요. 개인키가 노출되지 않도록 각별히 주의하세요.**

**출력**

![](/img/build/get-started/foundry-create.png)

**Step 2**: Open [Klaytnscope](https://baobab.klaytnscope.com/tx/0x669e39c9661fdab59aa34989b58b3f89376a93f846a0c71d2858918f58a307e2?tabId=internalTx) to check if the counter contract deployed successfully.

**3단계**: 검색 필드에 트랜잭션 해시를 복사하여 붙여넣고 Enter 키를 누릅니다. 최근에 배포된 계약이 표시됩니다.

![](/img/build/get-started/forge-scope.png)

## 컨트랙트와 상호작용하기

스마트 컨트랙트를 성공적으로 배포했다면, 이제 바로 함수를 호출하고 실행하고 싶을 것입니다. [Cast](https://book.getfoundry.sh/reference/cast/cast-send.html)를 사용하여 배포된 컨트랙트와 카이아 Kairos 네트워크에서 상호작용해 보겠습니다.  이번 장에서는 `read-only` 함수를 실행하기 위한 [cast call](https://book.getfoundry.sh/reference/cast/cast-call)과 `write` 함수를 실행하기 위한 [cast send](https://book.getfoundry.sh/reference/cast/cast-send)를 사용하는 방법을 배워보겠습니다.

**A. Cast 호출**: 컨트랙트에 저장된 번호를 가져오기 위해 `number` 함수를 호출하게 됩니다. 아래 명령어를 실행하여 실제로 작동하는지 확인해보세요.

```bash
cast call YOUR_CONTRACT_ADDRESS "number()" --rpc-url RPC-API-ENDPOINT-HERE
```

**예시**

```bash
cast call 0xe4d576c447733da7ca9197e88d34a74c3c865cff "number()" --rpc-url https://klaytn-baobab-rpc.allthatnode.com:8551/qtKkeUE8ZEPI2cs0OHloJ6seI4Wfy36N
```

**출력**

![](/img/build/get-started/cast-call-number.png)

이 데이터는 16진수 형식으로 가져와야 합니다:

```bash
0x0000000000000000000000000000000000000000000000000000000000000000
```

그러나 원하는 결과를 얻으려면 캐스팅을 사용하여 위의 결과를 변환합니다. 이 경우 데이터가 숫자이므로 기본 10으로 변환하여 결과 0을 얻을 수 있습니다:

```bash
cast --to-base 0x0000000000000000000000000000000000000000000000000000000000000000 10
```

**출력**

![](/img/build/get-started/cast-call-0.png)

**B. cast send**: 카운터 컨트랙트에서 `setNumber` 함수를 실행하는 것과 같은 트랜잭션에 서명하고 게시하려면 아래 명령을 실행합니다:

```bash
cast send --rpc-url=<RPC-URL> <CONTRACT-ADDRESS> “setNumber(uint256)” arg --private-key=<PRIVATE-KEY>
```

**예제**

```bash
cast send --rpc-url=https://klaytn-baobab-rpc.allthatnode.com:8551/qtKkeUE8ZEPI2cs0OHloJ6seI4Wfy36N  0xe4d576c447733da7ca9197e88d34a74c3c865cff "setNumber(uint256)"  10 --private-key=<private key>
```

**출력**

![](/img/build/get-started/cast-send-setNum.png)

**크로스체크 번호**

```bash
cast call 0xe4d576c447733da7ca9197e88d34a74c3c865cff "number()" --rpc-url https://klaytn-baobab-rpc.allthatnode.com:8551/qtKkeUE8ZEPI2cs0OHloJ6seI4Wfy36N
```

**출력**

![](/img/build/get-started/cast-call-10.png)

이 데이터는 16진수 형식으로 가져와야 합니다:

```bash
0x000000000000000000000000000000000000000000000000000000000000000a
```

그러나 원하는 결과를 얻으려면 캐스팅을 사용하여 위의 결과를 변환합니다. 이 경우 데이터가 숫자이므로 기본 10으로 변환하여 결과 10을 얻을 수 있습니다:

```bash
cast --to-base 0x000000000000000000000000000000000000000000000000000000000000000a 10
```

**출력**

![](/img/build/get-started/cast-call-result-10.png)

## Cast와 Anvil을 이용한 메인넷 포크

Foundry를 사용하면 메인넷을 로컬 개발 네트워크([Anvil](https://book.getfoundry.sh/reference/anvil/)로 포크할 수 있습니다.) 또한 [Cast](https://book.getfoundry.sh/reference/cast/)를 사용하여 실제 네트워크에서 컨트랙트와 상호 작용하고 테스트할 수 있습니다.

### 시작하기

이제 Foundry 프로젝트가 실행되었으므로 아래 명령을 실행하여 메인넷을 포크할 수 있습니다:

```bash
anvil --fork-url rpc-url
```

**예시**

```bash
anvil --fork-url https://archive-en.cypress.klaytn.net
```

**출력**

![](/img/build/get-started/anvil-localnode.png)

이 명령을 성공적으로 실행하면 터미널이 위 이미지와 같이 표시됩니다. 공개 키와 개인 키로 생성된 10개의 계정과 10,000개의 선지급 토큰이 있을 것입니다. 포크된 체인의 RPC 서버는 `127.0.0.1:8545`에서 수신 대기 중입니다.

네트워크를 포크했는지 확인하려면 최신 블록 번호를 조회하면 됩니다:

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

위 작업의 결과는 [16진수를 10진수로 변환](https://www.rapidtables.com/convert/number/hex-to-decimal.html)을 사용하여 변환할 수 있습니다. 네트워크를 포크한 시점의 최신 블록 번호를 얻어야 합니다. 이를 확인하려면 [Klaytnscope](https://klaytnscope.com/block/118704896?tabId=txList)에서 블록 번호를 상호 참조하세요.

### 실사례

이 섹션에서는 oUSDC 토큰을 보유한 사람으로부터 Anvil이 생성한 계정(0x70997970C51812dc3A010C7d01b50e0d17dc79C8 - Bob)으로 토큰을 전송하는 방법을 알아보겠습니다.

**oUSDC 전송하기**

Klaytnscope로 이동하여 oUSDC 토큰 보유자를 검색합니다(여기). 임의의 계정을 선택하겠습니다. 이 예제에서는 `0x8e61241e0525bd45cfc43dd7ba0229b422545bca`를 사용하겠습니다.

컨트랙트와 계정을 환경 변수로 내보내 보겠습니다:

```bash
export BOB=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export oUSDC=0x754288077d0ff82af7a5317c7cb8c444d421d103
export oUSDCHolder=0x8e61241e0525bd45cfc43dd7ba0229b422545bca
```

캐스팅 호출을 사용하여 밥의 잔액을 확인할 수 있습니다:

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```

**출력**

![](/img/build/get-started/oUsdcBob4.png)

마찬가지로 캐스트 콜을 사용하여 oUSDC 보유자의 잔액을 확인할 수도 있습니다:

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```

**출력**

![](/img/build/get-started/oUsdcHolder4.png)

캐스트 전송을 사용하여 행운의 사용자로부터 앨리스에게 토큰을 전송해 보겠습니다:

````bash
cast rpc anvil_impersonateAccount $oUSDCHolder    
cast send $oUSDC \
--unlocked \
--from $oUSDCHolder\
 "transfer(address,uint256)(bool)" \
 $BOB \
 1000000
```0000
````

**출력**

![](/img/build/get-started/cast-send.png)

전송이 제대로 되었는지 확인해 보겠습니다:

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```

**출력**

![](/img/build/get-started/oUsdcBobAfter.png)

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```

**출력**

![](/img/build/get-started/oUsdcHolderAfter.png)

Foundry에 대한 더 자세한 가이드는 [Foundry 문서](https://book.getfoundry.sh/)를 참조하세요. 또한 이 가이드의 전체 코드 구현은 [GitHub](https://github.com/klaytn/examples/tree/main/tools/foundry)에서 확인할 수 있습니다.
