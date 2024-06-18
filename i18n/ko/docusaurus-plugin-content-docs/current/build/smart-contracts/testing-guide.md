# 스마트 컨트랙트 테스트

이 섹션에서는 스마트 컨트랙트를 테스트하는 방법을 소개합니다. 블록체인의 모든 트랜잭션은 되돌릴 수 없으므로 스마트 컨트랙트를 배포하기 전에 테스트하는 것이 중요합니다.

## Truffle을 이용한 테스트 <a href="#testing-with-truffle" id="testing-with-truffle"></a>

Truffle은 자동화된 테스트 프레임워크를 제공합니다. 이 프레임워크를 사용하면 두 가지 방법으로 간단하고 관리하기 쉬운 테스트를 작성할 수 있습니다:

- `JavaScript`와 `TypeScript`에서는 애플리케이션과 마찬가지로 외부에서 컨트랙트를 행사할 수 있습니다.
- `Solidity`의 경우, 사전, 베어투메탈 시나리오에서 컨트랙트를 행사할 수 있습니다.

### 시작하기 <a href="#1-getting-started" id="1-getting-started"></a>

[Truffle을 이용한 배포 가이드](./deploy/deploy.md#truffle)에 따라 컨트랙트를 생성하고 배포하겠습니다. 하지만 배포하기 전에 테스트 목적으로 컨트랙트에 설정자 함수 `setGreet`을 추가하겠습니다. 소스 코드는 아래와 같습니다.

\*\*참고: 테스트를 위해 컨트랙트를 일부 수정했습니다.

아래는 KlaytnGreeting 컨트랙트 소스 코드입니다.

```
pragma solidity 0.5.6;

contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;

    /* This runs when the contract is executed */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }

    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }

    /* Newly added function for testing. */
    function setGreet(string memory _greeting) public {
        // only owner can change greeting message
        require(msg.sender == owner, "Only owner is allowed.");
        greeting = _greeting;
    }
}
```

1\)의 `greet()` 함수가 "안녕하세요, 클레이튼입니다" 메시지를 제대로 반환하는지, 2) `setGreet()` 함수가 새로운 인사말 메시지를 제대로 설정하고 소유자가 아닌 계정이 인사말 업데이트를 시도하면 되돌아가는지 테스트해 보겠습니다.

먼저 일반 Assertion에는 Chai Assertion 라이브러리(또는 여러분이 사용하는 다른 Assertion 라이브러리)를 설치하고, 스마트 컨트랙트 Assertion에는 Truffle Assertion 라이브러리를 설치합니다.

```
npm install --save-dev chai truffle-assertions
```

### Solidity에서 작성 테스트 <a href="#2-writing-test-in-solidity" id="2-writing-test-in-solidity"></a>

Solidity로 테스트하는 것은 JavaScript 테스트보다 조금 더 직관적일 수 있습니다. Solidity 테스트 컨트랙트는 JavaScript 테스트와 함께 .sol 파일로 저장됩니다.

test`폴더에`TestKlaytnGreeting.sol\\`이라는 파일을 생성합니다. Truffle 제품군은 테스트를 위한 헬퍼 라이브러리를 제공하므로 이를 임포트해야 합니다. Solidity 테스트 예제를 살펴보겠습니다:

```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HashMarket.sol";
```

- Assert : `Assert.equals()`, `Assert.greaterThan()` 등과 같은 다양한 테스트 함수에 액세스할 수 있습니다.
- DeployedAddresses : 컨트랙트를 변경할 때마다 새 주소로 다시 배포해야 합니다. 이 라이브러리를 통해 배포된 컨트랙트 주소를 얻을 수 있습니다.

이제 테스트 코드를 작성해 보겠습니다.

```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/KlaytnGreeter.sol";

contract TestKlaytnGreeter {

    function testGreetingMessage() public {
        // DeployedAddresses.KlaytnGreeter() handles contract address.
        KlaytnGreeter greeter = KlaytnGreeter(DeployedAddresses.KlaytnGreeter());

        string memory expectedGreet = "Hello Klaytn";

        string memory greet = greeter.greet();

        Assert.equal(greet, expectedGreet, "greeting message should match");
    }
}
```

Solidity 테스트 코드를 실행합니다.

```
$ truffle test
# Output
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./test/TestKlaytnGreeter.sol



  TestKlaytnGreeter
    1) testGreetingMessage

    Events emitted during test:
    ---------------------------


    ---------------------------


  0 passing (5s)
  1 failing

  1) TestKlaytnGreeter
       testGreetingMessage:
     Error: greeting message should match (Tested: Hello, Klaytn, Against: Hello Klaytn)
      at result.logs.forEach.log (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:71:1)
      at Array.forEach (<anonymous>)
      at processResult (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:69:1)
      at process._tickCallback (internal/process/next_tick.js:68:7)
```

이런 실패했습니다. 오류 메시지인 `Error: greeting message should match (Tested: Hello, Klaytn, Against: Hello Klaytn)`를 확인해 보겠습니다. _string memory expectedGreet = "Hello Klaytn"_ 에서 `',(쉼표)'`가 누락된 것을 확인할 수 있습니다.

```
$ truffle test
# Output
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./test/TestKlaytnGreeter.sol



  TestKlaytnGreeter
    ✓ testGreetingMessage (58ms)


  1 passing (5s)
```

축하합니다! 테스트가 통과되었습니다.

### JavaScript 작성 테스트 <a href="#3-writing-test-in-javascript" id="3-writing-test-in-javascript"></a>

Truffle은 [Mocha](https://mochajs.org/) 테스트 프레임워크와 [Chai](https://www.chaijs.com/) Assertion 라이브러리를 사용하여 JavaScript 테스트를 위한 견고한 프레임워크를 제공합니다. JavaScript 테스트는 더 많은 유연성을 제공하고 더 복잡한 테스트를 작성할 수 있게 해줍니다.

`test` 디렉터리에 파일을 생성하고 이름을 `0_KlaytnGreeting.js`로 지정해 보겠습니다.

테스트 코드는 다음과 같습니다:

```javascript
// Interacting directly with KlaytnGreeter contract
const KlaytnGreeter = artifacts.require("./KlaytnGreeter.sol");
const truffleAssert = require('truffle-assertions');

contract("KlaytnGreeter", async(accounts) => {
    // store the contract instance at a higher level 
    // to enable access from all functions.
    var klaytnGreeterInstance;
    var owner = accounts[0];
    var greetMsg = "Hello, Klaytn";

    // This will run before each test proceed.
    before(async function() {
        // set contract instance into a variable
        klaytnGreeterInstance = await KlaytnGreeter.new(greetMsg, {from:owner});
    })

    it("#1 check Greeting message", async function() {
        // set the expected greeting message
        var expectedGreeting = greetMsg;
        var greet= await klaytnGreeterInstance.greet();
        assert.equal(expectedGreeting, greet, "greeting message should match");
        
    })

    it("#2 update greeting message.", async function() {
        var newGreeting = "Hi, Klaytn";
        
        await klaytnGreeterInstance.setGreet(newGreeting, { from:owner });
        var greet = await klaytnGreeterInstance.greet();
        assert.equal(newGreeting, greet, "greeting message should match");
    });

    it("#3 [Failure test] Only owner can change greeting.", async function() {
        var fakeOwner = accounts[1];        
        await truffleAssert.fails(klaytnGreeterInstance.setGreet(greetMsg, { from:fakeOwner }));
    });
});
```

`Mocha` 단위 테스트가 생소하신 분들은 [Mocha 문서](https://mochajs.org/#getting-started)를 확인하시기 바랍니다.

- `describe()` 대신 `contract()`를 사용하세요.

  구조적으로, Truffle 테스트 코드는 Mocha의 일반적인 테스트 코드와 크게 다르지 않아야 합니다. 테스트에는 Mocha가 자동화된 테스트로 인식할 수 있는 코드가 포함되어야 합니다. Mocha와 Truffle 테스트의 차이점은 `contract()` 함수입니다.

  **참고** `contract()` 함수와 사용 가능한 클레이튼 계정을 지정하기 위한 `accounts` 배열을 사용한다는 점에 유의하세요.
- Contract abstractions within your tests

  Truffle은 테스트 중에 어떤 컨트랙트와 상호작용해야 하는지 감지할 방법이 없으므로, 컨트랙트를 명시적으로 지정해야 합니다. 이를 위한 한 가지 방법은 `artifacts.require()` 메서드를 사용하는 것입니다.
- `it` 구문

  이것은 설명과 함께 각 테스트 케이스를 나타냅니다. 테스트 실행 시 콘솔에 설명이 인쇄됩니다.
- `Truffle-Assertion` 라이브러리

  이 라이브러리를 사용하면 `truffleAssert.reverts()` 및 `truffleAssert.fails()` 함수를 제공하여 리버트 또는 기타 실패를 쉽게 테스트할 수 있습니다.

출력은 다음과 같아야 합니다:

```
Using network 'development'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: KlaytnGreeter
    ✓ #1 check Greeting message
    ✓ #2 update greeting message. (46ms)
    ✓ #3 [Failure test] Only owner can change greeting.


  3 passing (158ms)
```

축하합니다! 테스트가 통과되었습니다.

### 테스트 지정하기 <a href="#4-specifying-test" id="4-specifying-test"></a>

실행할 테스트 파일을 선택할 수 있습니다.

```
truffle test ./test/0_KlaytnGreeting.js
```

자세한 내용은 [Truffle 테스트](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts) 및 [Truffle 명령어](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test)에서 확인하시기 바랍니다.
