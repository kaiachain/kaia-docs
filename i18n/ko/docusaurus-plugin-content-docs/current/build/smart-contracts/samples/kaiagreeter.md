# KaiaGreeter

`KaiaGreeter`는 인사말 메시지를 반환하는 간단한 컨트랙트입니다. 인사말 메시지는 컨트랙트가 배포될 때 설정됩니다.

## KaiaGreeter 작성하기 <a href="#writing-kaiagreeter" id="writing-kaiagreeter"></a>

```
pragma solidity 0.5.6;
contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public { if (msg.sender == owner) selfdestruct(owner); }
}

contract KaiaGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs once when the contract is created */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## Remix 온라인 IDE를 사용하여 KaiaGreeter 배포하기 <a href="#deploying-kaiagreeter-using-klaytn-ide" id="deploying-kaiagreeter-using-klaytn-ide"></a>

- Please visit [Kaia Plugin for Remix](https://ide.kaia.io) and create a `KaiaGreeter` contract. 전체 소스 코드는 위에 나와 있습니다.
- 컨트랙트 배포에 사용할 계정을 준비합니다.
  - If you do not have an account yet, create one at [https://toolkit.kaia.io/account/accountKeyLegacy](https://toolkit.kaia.io/account/accountKeyLegacy).
  - Get some test KAIA from the faucet - [https://kairos.wallet.kaia.io/faucet](https://kairos.wallet.kaia.io/faucet)
- 초기 파라미터인 인사말 메시지와 함께 컨트랙트를 배포합니다.
- 배포 후, IDE에서 `greet`를 호출할 수 있습니다.

## 참조 <a href="#references" id="references"></a>

컨트랙트 배포에 대한 자세한 내용과 Remix Online IDE 사용 가이드라인은 다음 문서를 참조하세요.

- [Remix 온라인 IDE](../../smart-contracts/ide-and-tools/ide-and-tools.md#klaytn-ide)
- [배포 가이드](../deploy/deploy.md)
