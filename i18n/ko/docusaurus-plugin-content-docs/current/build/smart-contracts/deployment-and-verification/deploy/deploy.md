# 스마트 컨트랙트 배포

Kaia에 스마트 컨트랙트를 배포하는 방법에는 여러 가지가 있습니다. 이 문서는 Remix IDE를 사용하여 샘플 컨트랙트를 배포하는 단계별 가이드를 제공합니다.

이 가이드에서는 계정 생성을 위해 [Kaia 툴킷](https://toolkit.kaia.io/account/)을 사용하며, 생성된 계정은 리믹스 Kaia 플러그인을 통해 거래에 서명하는 데 사용됩니다.

## Remix 온라인 IDE <a id="remix-ide"></a>

Open your internet browser and go to [Kaia Plugin for Remix](https://ide.kaia.io).

1. 새 파일을 추가합니다.

![](/img/build/smart-contracts/d-remix-create.png)

2. 새 파일에 다음 샘플 코드(또는 배포하려는 코드)를 복사하여 붙여넣습니다. 아래 코드는 두 명의 플레이어가 게임에 참여하여 승자가 풀을 가져가는 코인플립 컨트랙트입니다.

```solidity
// SPDX-라이센스 식별자: MIT
프라그마 솔리디티 ^0.8.0;

contract CoinFlip {
    주소 공개 플레이어1;
    주소 공개 플레이어2;
    uint256 공개 풀;
    uint256 공개 승자;
    주소 공개 승자주소;
    
    event GameStarted(주소 색인 플레이어1, 주소 색인 플레이어2, uint256 풀);
    event GameFinished(주소 색인 winnerAddress, 문자열 winner, uint256 풀);
    
    function enter() public payable {
        require(msg.value == 0.01 ether, "입장하려면 0.01 Kaia를 보내야 합니다");
        if (player1 == address(0)) {
            player1 = msg.sender;
        } else {
            require(player2 == address(0), "두 플레이어가 이미 입장했습니다");
            player2 = msg.sender;
            emit GameStarted(player1, player2, pool);
        }
        pool += msg.value;
        winner = 0;
        winnerAddress = address(0);
    }
    
    function flipCoin() public {
        require(msg.sender == player1 || msg.sender == player2, "발신자는 플레이어가 아닙니다");
        uint256 result = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, block.coinbase))) % 2;
        winner = result == 0 ? 1 : 2;
        winnerAddress = winner == 1 ? player1 : player2;
        string memory winnerName = winner == 1 ? "player1" : "player2";
        emit GameFinished(winnerAddress, winnerName, pool);
        payable(winnerAddress).transfer(pool);
        pool = 0;
        player1 = address(0);
        player2 = address(0);
    }
}
```

3. 아이콘 패널에서 컴파일러를 선택합니다. 실제 배포 전에 샘플 코드를 컴파일하려면 **Compile.sol** 버튼을 클릭하세요.

![](/img/build/smart-contracts/d-remix-compile.png)

4. Kaia 플러그인 탭에서 원하는 EVM 환경을 선택합니다. 이 가이드에서는 Kairos(테스트넷)를 선택하겠습니다.

![](/img/build/smart-contracts/d-remix-env.png)

다음은 거래에 서명할 계정을 가져오는 것입니다. Kaia 호환 지갑에서 개인 키를 내보내거나 Kaia 툴킷을 사용하여 개발자 계정을 생성할 수 있습니다. 이 가이드에서는 [Kaia 툴킷](https://toolkit.kaia.io/account)을 사용하여 개발자 계정을 생성합니다.

5. 계정 옆의 더하기 버튼을 클릭하여 계정을 가져옵니다.

![](/img/build/smart-contracts/d-remix-import-account.png)

:::note
계정에 스마트 컨트랙트를 배포하는 거래에 대한 비용을 지불하기에 충분한 KAIA가 있는지 확인하세요. 아직 테스트 KAIA가 없는 경우 [수도꼭지](https://faucet.kaia.io/)에서 테스트 KAIA를 받으세요.
:::

6. 가스 한도 및 전송할 값을 설정합니다.

- 더 복잡한 컨트랙트를 배포하는 경우 가스 한도를 더 높게 설정해야 할 수도 있습니다. 이 예제에서는 그대로 두셔도 됩니다.
- 배포 시점에 컨트랙트에 `KLAY`를 보내지 않으려면 `Value`를 0으로 설정합니다.

7. 배포\*\* 버튼을 클릭합니다.

컨트랙트가 성공적으로 배포되면 터미널에 해당 트랜잭션 해시가 표시되며, [KaiaScan](https://kairos.kaiascan.io)에서 확인할 수 있습니다.

![](/img/build/smart-contracts/d-remix-deploy-btn.png)

![](/img/build/smart-contracts/d-remix-txhash.png)

8. 기능 버튼을 클릭하여 컨트랙트와 상호작용할 수 있습니다.

함수는 다른 색상으로 표시됩니다. 솔리디티의 `pure` 또는 `view` 함수는 파란색 버튼(예시에서는 `player1`, `player2`, `pool` 등)이 있으며 새 트랜잭션을 생성하지 않으므로 가스 비용이 들지 않습니다. 빨간색 버튼(예시에서는 '입력')은 블록체인의 상태를 변경하고 가스를 소비하며 가치를 받을 수 있는 '지불 가능' 기능을 나타냅니다. 주황색 버튼(예시에서는 `flipCoin`)은 컨트랙트 상태를 변경하지만 값을 받지 않는 `비지불` 기능을 위한 버튼입니다.

![](/img/build/smart-contracts/d-remix-deployed.png)

이 가이드의 끝까지 읽으셨다면 축하드립니다. 궁금한 점이 있으면 [Kaia 포럼](https://devforum.kaia.io/)을 방문하세요. 하지만 아래는 Kaia에서 Remix IDE로 빌드하는 동안 필요할 수 있는 유용한 리소스 목록입니다.

- [리믹스 문서](https://remix-ide.readthedocs.io/en/latest/)