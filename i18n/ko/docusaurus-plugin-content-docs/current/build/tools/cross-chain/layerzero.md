# LayerZero

## 소개 <a id="introduction"></a>

지난 몇 년간 블록체인 업계에서 독립적인 블록체인 시스템 간의 데이터와 토큰 전송은 큰 난제로 남아있었습니다. 하지만 LayerZero와 같은 크로스체인 메시징 프로토콜이 등장하면서 고립된 시스템을 안전하고 탈중앙화된 방식으로 연결하는 데 큰 진전이 있었습니다. 이제 여러 거래소에서 변환 과정을 거칠 필요 없이 한 번의 트랜잭션 호출로 토큰을 한 생태계에서 다른 생태계로 원활하게 전송할 수 있습니다.

이 가이드가 끝날 때쯤이면 LayerZero 옴니체인 OFTV1 컨트랙트를 사용하여 한 번의 트랜잭션 호출로 한 블록체인에서 다른 블록체인으로 토큰을 전송할 수 있을 것입니다.

![](/img/build/tools/crosschain-tokens-visuals.png)

## 전제조건 <a id="prerequisites"></a>

전체 프로젝트를 살펴보기 전에, 완성된 형태는 이 저장소에서 찾을 수 있다는 점을 알아두세요: [crosschain-oftv1-example](https://github.com/ayo-klaytn/crosschain-oftv1-example/tree/main). 이 튜토리얼은 Hardhat을 사용하므로 Hardhat에 대한 사전 지식이 있으면 리포지토리 작동 방식을 이해하는 데 도움이 됩니다. 이 튜토리얼은 Hardhat 사용법에 대한 정보는 포함하지 않으며, 대신 스마트 컨트랙트에만 집중할 것입니다. 이 튜토리얼을 따라하려면 다음과 같은 전제 조건이 필요합니다:

- 새로운 Hardhat 프로젝트와 [Hardhat 사용법에 대한 지식](../../get-started/hardhat.md)
- 종속성으로 [OpenZeppelin 스마트 컨트랙트 설치](https://github.com/OpenZeppelin/openzeppelin-contracts)가 필요합니다.
- [LayerZero 스마트 컨트랙트 설치](https://github.com/LayerZero-Labs/solidity-examples)를 종속성으로 사용합니다.

두 종속성을 모두 설치하려면 다음과 같이 실행하면 됩니다:

```bash
npm install @openzeppelin/contracts @layerzerolabs/solidity-examples
```

## LayerZero 옴니체인 컨트랙트 <a id="layerzero-omnichain-contract"></a>

LayerZero(L0)는 옴니체인과 상호 운용 가능한 애플리케이션을 구축하기 위한 오픈소스 프로토콜입니다. L0는 서로 다른 체인 간에 토큰을 원활하게 전송하기 위한 두 가지 표준 옴니체인 컨트랙트를 제공합니다.

1. **옴니체인 대체 가능한 토큰(OFT)**

   1.1. [옴니체인 대체 가능한 토큰(OFT) v1](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/oft/oft-v1#oft.sol): OFT 표준은 EVM 체인만 지원합니다. 이 표준에는 ProxyOFT.sol 확장자가 있습니다. 이미 배포된 ERC20을 OFT로 전환하려면 [ProxyOFT.sol](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/oft/oft-v1#proxyoft.sol) 확장자를 사용하시기 바랍니다.

   1.2. [옴니체인 대체 가능한 토큰(OFT) v2](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/oft/oftv2#oftv2.sol): OFT 표준은 EVM과 비 EVM 체인을 모두 지원합니다. 이 표준은 ProxyOFTV2.sol 확장자를 가집니다. 이미 배포된 ERC20을 OFTV2로 전환하려면 [ProxyOFTV2.sol](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/oft/oftv2#proxyoftv2.sol) 확장자를 사용하시기 바랍니다.

2. **옴니체인 대체 불가능한 토큰**

   2.1. [옴니체인 대체 불가능한 토큰(ONFT721)](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/onft/721#onft721.sol): 크로스 체인 NFT를 위한 ONFT721 표준. 이 표준의 확장자는 ProxyONFT721.sol입니다. 이미 배포된 ERC721을 ONFT721로 전환하려면 [ProxyONFT721.sol](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/onft/721#proxyonft721.sol) 확장자를 사용하시기 바랍니다.

   2.2. [옴니체인 대체 불가능한 토큰(ONFT1155)](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/onft/1155#onft1155.sol): 크로스 체인 멀티 토큰을 위한 ONFT1155 표준입니다. 이 표준의 확장자는 ProxyONFT1155.sol입니다. 이미 배포된 ERC1155를 ONFT1155로 전환하려면 [ProxyONFT1155.sol](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/onft/1155#proxyonft1155.sol) 확장자를 사용하시기 바랍니다.

## 시작하기 <a id="getting-started"></a>

이 가이드에서는 EVM 체인에서 토큰을 원활하게 전송할 수 있는 옴니체인 대체 가능한 토큰(OFT) v1에 초점을 맞출 것입니다. 따라서 Hardhat 스마트 컨트랙트 개발 환경을 사용하여 Kaia Kairos(소스 체인)과 Polygon Mumbai(목적지 체인) 모두에 OFTv1 컨트랙트를 배포할 것입니다.

## 개발 환경 구성하기 <a id="connfiguring-your-development-environment"></a>

### 1단계: 변수 구성 <a id="configure-variables"></a>

Hardhat 프로젝트는 사용자별 값이나 코드 저장소에 포함되지 않아야 하는 데이터에 대해 구성 변수를 사용할 수 있습니다.

예를 들어 PRIVATE_KEY를 구성하려면 `hardhat.config.js` 파일에서 이 작업을 수행합니다:

```js
const PRIVATE_KEY = vars.get("PRIVATE_KEY");
/** @type import('hardhat/config').HardhatUserConfig */
  networks: {
    kairos: {
      url: `https://klaytn-baobab-rpc.allthatnode.com:8551`,
      accounts: [PRIVATE_KEY]
    },
    mumbai: {
      url: `https://polygon-mumbai-pokt.nodies.app`,
      accounts: [PRIVATE_KEY]
    }
  }
};
```

그런 다음 터미널에서 아래 명령을 실행하여 PRIVATE_KEY를 설정합니다:

```js
npx hardhat vars set PRIVATE_KEY
```

다음으로 PRIVATE_KEY의 값을 입력합니다.

![](/img/build/tools/cc-config-var.png)

변수 구성에 대한 자세한 내용은 [Hardhat 구성 변수](https://hardhat.org/hardhat-runner/docs/guides/configuration-variables)를 참조하세요.

### 2단계: Hardhat 설정 설정 <a id="setup-hardhat-configs"></a>

이 구성을 `hardhat.config.js` 파일에 붙여넣습니다:

```js
require("@nomicfoundation/hardhat-toolbox");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.9",
      },
      {
        version: "0.8.20",
      },
    ],
  },
  networks: {
    kairos: {
      url: `https://klaytn-baobab-rpc.allthatnode.com:8551`,
      accounts: [PRIVATE_KEY]
    },
    mumbai: {
      url: `https://polygon-mumbai-pokt.nodies.app`,
      accounts: [PRIVATE_KEY]
    }
  }
};
```

이제 개발 환경이 모두 준비되었으니 크로스체인 토큰 스마트 컨트랙트를 작성해 보겠습니다.

## OFTV1 스마트 컨트랙트 생성하기 <a id="creating-oftv1-smart-contract"></a>

이 섹션에서는 LayerZero Solidity 예시 라이브러리를 사용하여 크로스체인 토큰 스마트 컨트랙트를 부트스트랩할 것입니다. 다음 단계에 따라 크로스체인 토큰 스마트 컨트랙트를 만들어 보겠습니다:

**1단계**: 탐색기 창에서 컨트랙트 폴더를 선택하고 새 파일 버튼을 클릭한 후 'crosschain-tokens.sol'이라는 이름의 새 파일을 생성합니다.

**2단계**: 파일을 열고 다음 코드를 추가합니다:

```js
// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;
/*
    // https://layerzero.gitbook.io/docs/technical-reference/testnet/testnet-addresses
    Klaytn Baobab   lzEndpointAddress = 0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab
    chainId: 10150  deploymentAddress =
 
    Mumbai lzEndpointAddress = 0xf69186dfBa60DdB133E91E9A4B5673624293d8F8
    chainId: 10109  deploymentAddress =
*/

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@layerzerolabs/solidity-examples/contracts/token/oft/v1/OFTCore.sol";
import "@layerzerolabs/solidity-examples/contracts/token/oft/v1/interfaces/IOFT.sol";
contract CrossChainToken is OFTCore, ERC20, IOFT {
    constructor(address _lzEndpointAddress) ERC20("CrossChainTokens", "CCT") OFTCore(_lzEndpointAddress) Ownable(msg.sender) {
        if (block.chainid == 1001) { // Only mint initial supply on Baobab
            _mint(msg.sender, 1_000_000 * 10 ** decimals());
        }
    }
    function supportsInterface(bytes4 interfaceId) public view virtual override(OFTCore, IERC165) returns (bool) {
        return interfaceId == type(IOFT).interfaceId || interfaceId == type(IERC20).interfaceId || super.supportsInterface(interfaceId);
    }
    function token() public view virtual override returns (address) {
        return address(this);
    }
    function circulatingSupply() public view virtual override returns (uint) {
        return totalSupply();
    }
    function _debitFrom(address _from, uint16, bytes memory, uint _amount) internal virtual override returns(uint) {
        address spender = _msgSender();
        if (_from != spender) _spendAllowance(_from, spender, _amount);
        _burn(_from, _amount);
        return _amount;
    }
    function _creditTo(uint16, address _toAddress, uint _amount) internal virtual override returns(uint) {
        _mint(_toAddress, _amount);
        return _amount;
    }
}
```

### 코드 살펴보기 <a id="code-walkthrough"></a>

이것이 여러분의 크로스체인 스마트 컨트랙트입니다. **Line 2**에서 Hardhat에 Solidity 버전 0.8.0 이상을 사용하도록 지시합니다. 그 외에 **ERC20.sol**, **Layerzero의 OFTV1** 컨트랙트를 가져왔습니다. 18\~22줄에서는 ERC20, OFTCore 컨트랙트를 상속하는 자신만의 스마트 컨트랙트를 생성합니다. 이를 위해 ERC20의 생성자를 호출하고 토큰 이름과 심볼을 전달합니다. 또한 각 체인의 LayerZero 엔드포인트 주소를 OFTCore 컨트랙트에 전달합니다.

위 코드에서 볼 수 있듯이 토큰 이름과 심볼은 각각 **CrosschainTokens**와 **CCT**로 설정되어 있습니다. 토큰 이름과 심볼은 원하는 대로 변경할 수 있습니다.

크로스체인 기능을 실행하는 주요 함수는 OFTCore.sol 컨트랙트에 있는 **sendFrom** 함수입니다. 하지만 이 튜토리얼에서는 함수를 실행하는 순서대로 코드 연습을 해보겠습니다:

1. **setTrustedRemoteAddress()**: 신뢰할 수 있는 리모트는 메시지를 수신할 또 다른 컨트랙트입니다. 하지만, 알려진 컨트랙트에서 메시지를 주고받기 위해서는 setTrustedRemoteAddress() 함수를 실행하여 서로의 체인 ID와 주소를 안전하게 페어링해야 합니다. 신뢰할 수 있는 리모트 설정에 대한 자세한 내용은 [신뢰할 수 있는 리모트 설정](https://layerzero.gitbook.io/docs/evm-guides/master/set-trusted-remotes)을 참조하세요.

2. **approve()**: 옴니체인 대체 가능한 토큰의 소유자는 approve() 함수를 호출하여 체인 간에 토큰을 전송하기 위해 소스 체인에서 crosschain-tokens.sol 컨트랙트를 승인해야 합니다. 이 튜토리얼에서는 100개의 CCT 토큰을 승인할 것입니다(100000000000000000000).

3. **setMinDstGas()**: 다음은 각 체인에 대한 최소 가스 한도를 설정하는 것입니다. 다른 체인의 체인아이디, 패킷 유형("0"은 전송을 의미), 가스 한도량(200,000)과 함께 setMinDstGas() 함수를 호출하면 됩니다.

4. **setUseCustomAdapterParams()**: 이 값을 true로 설정합니다.

5. **estimateFees()**: 이 함수는 토큰을 다른 체인으로 전송할 때 지불해야 하는 기본 가스 토큰의 양을 계산하는 데 도움이 됩니다. 이를 위해 LayerZero는 대상 chainId, _toAddress, _amount, _useZro, 어댑터 매개변수가 주어진 Oracle 및 Relayer 서비스를 사용합니다. 이 튜토리얼에서는 대상 chainId로 10109를 사용하고, _toAddress, 금액으로 CCT 토큰 10개를 입력하며, _useZro는 false, 어댑터 파라미터는 `0x0001000000000000000000000000000000000000000000030d40`을 입력합니다. 요금 산정 방법에 대한 자세한 내용은 [메시지 요금 산정하기](https://layerzero.gitbook.io/docs/evm-guides/code-examples/estimating-message-fees)를 참조하세요.

6. **sendFrom()**: 이 함수는 지정된 토큰 금액을 목적지 체인으로 보냅니다. 이 함수는 유료 함수이므로 트랜잭션과 함께 예상 수수료를 보내야 한다는 점에 유의하세요. 이 함수에는 다음 인수가 필요합니다:
   - _from: 토큰 소유자
   - _destChainId: 10109
   - _toAddress: 목적지 체인에 있는 수신자 주소 입력
   - _amount: 웨이로 전송할 토큰 수량
   - refundAddress: 가스 환불을 받을 주소
     0번 주소 지정(0x00000000000000000000000000000000)
   - _zroPaymentAddress: 0번 주소 지정(0x0000000000000000000000000000)
   - _adapterParams: 0x00010000000000000000000000000000000000000000000000000000000000030d40

다음 섹션에서는 토큰의 성공적인 체인 간 전송을 위해 적절한 순서로 함수를 실행하는 방법을 살펴보겠습니다.

## 스마트 컨트랙트 배포하기 <a id="deploying-the-smart-contract"></a>

이 섹션에서는 여기에 있는 [스크립트](https://github.com/ayo-klaytn/crosschain-oftv1-example/tree/main/scripts/deploy)를 사용하여 OFTV1 컨트랙트를 Kaia Kairos(소스 체인)과 Polygon Mumbai(목적지 체인)에 각각 배포합니다. 각 네트워크에 대한 faucet 토큰이 있는지 확인합니다. You can acquire faucet tokens for the Kaia Kairos [here](https://kairos.wallet.kaia.io/faucet) and  Polygon Mumbai testnet [here](https://faucet.polygon.technology/).

각 체인에 컨트랙트를 배포하려면 아래 명령을 실행하세요:

1. **Kairos(소스 체인)에 배포**

```bash
npx hardhat run scripts/deploy/src-contract.js --network kairos
```

2. **Mumbai(목적지 체인)에 배포**

```bash
npx hardhat run scripts/deploy/dest-contract.js --network mumbai
```

이제 Kairos와 Mumbai 모두에 OFTV1 컨트랙트가 배포되었어야 합니다. 각 체인의 컨트랙트 주소를 각각의 탐색기에 붙여넣어 배포를 확인할 수 있습니다: [Klaytnscope](https://baobab.klaytnscope.com/account/) 및 [Polygonscan](https://mumbai.polygonscan.com/address/).

## 신뢰할 수 있는 원격 설정하기 <a id="setting-trusted-remote"> </a>

이 섹션에서는 **setTrustedRemoteAddress()** 함수를 실행하여 배포된 컨트랙트를 서로의 체인 ID와 주소에 안전하게 페어링합니다. 이를 위해 이 [스크립트](https://github.com/ayo-klaytn/crosschain-oftv1-example/tree/main/scripts/set-remote-address)를 사용하여 각 체인의 컨트랙트를 신뢰할 수 있는 것으로 설정합니다.

1. **소스 체인에서 설정**
   소스 체인에서 컨트랙트를 신뢰할 수 있는 것으로 설정하려면 **setTrustedRemoteAddress()** 함수에 대상 체인 ID(10109)와 crosschain-token.sol의 대상 컨트랙트 주소를 전달해야 합니다.

실제로 작동하는지 확인하려면 아래 명령을 실행하세요:

```bash
npx hardhat run scripts/set-remote-address/src.js --network kairos
```

2. **대상 체인에서 설정**
   컨트랙트를 목적지 체인에서 신뢰할 수 있는 것으로 설정하려면, 설정된 원격 주소() 함수에 소스 체인 ID(10150)와 crosschain-token.sol의 소스 컨트랙트 주소를 전달해야 합니다.

실제로 작동하는지 확인하려면 아래 명령을 실행하세요:

```bash
npx hardhat run scripts/set-remote-address/dest.js --network mumbai
```

## 기타 명령 실행 <a id="running-misc-command"> </a>

이 섹션에서는 이 [스크립트](https://github.com/ayo-klaytn/crosschain-oftv1-example/blob/main/scripts/misc.js)를 사용하여 코드 살펴보기 섹션에서 설명한 **approve()**, **setMinDstGas()**, **setUseCustomAdapterParams()** 및 **estimateFee()** 함수를 집합적으로 실행할 것입니다.

이 스크립트를 실행하려면 아래 명령을 실행합니다:

```bash
npx hardhat run scripts/misc.js --network kairos
```

## sendFrom 기능 실행하기 <a id="executing-sendfrom-functionality"> </a>

LayerZero OFTV1을 사용하여 한 체인에서 다른 체인으로 토큰을 전송하려면 위의 코드 연습 섹션에서 설명한 대로 이 스크립트를 실행하고 적절한 파라미터를 전달해야 합니다.

실제로 작동하는지 확인하려면 아래 명령을 실행하세요:

```bash
npx hardhat run scripts/send-from.js --network kairos
```

[LayerZero 스캔](https://testnet.layerzeroscan.com/)에 트랜잭션 해시를 붙여넣어 크로스체인 트랜잭션을 확인할 수 있습니다.

![](/img/build/tools/cc-scan-oftv1.png)

또한 이 [스크립트](https://github.com/ayo-klaytn/crosschain-oftv1-example/blob/main/scripts/check-balance.js)를 실행하여 목적지 체인에 있는 수신자 주소의 잔액을 확인할 수 있습니다.

실제로 작동하는지 확인하려면 아래 명령을 실행하세요:

```bash
npx hardhat run scripts/check-balance.js --network mumbai
```

![](/img/build/tools/cc-token-balance.png)

## 결론

축하합니다! LayerZero 옴니체인 컨트랙트 OFTV1을 사용하여 한 번의 트랜잭션 호출로 카이아 Kairos에서 Polygon Mumbai로 토큰을 성공적으로 전송할 수 있었습니다. 여기서 한 걸음 더 나아가 사용자가 체인 간에 토큰을 쉽게 이동할 수 있도록 간단한 사용자 인터페이스를 설정할 수 있습니다. 토큰 컨트랙트가 설정되면, [web3klaytn](https://klaytn-foundation.stoplight.io/docs/web3klaytn/0d10ufjmg8ri2-overview) 또는 [ethers.js](https://docs.ethers.org/v5/)와 같은 웹3 라이브러리를 사용하여 **sendFrom()** 함수를 사용자 인터페이스에 연결할 수 있습니다.

크로스체인 탈중앙화 거래소, 크로스체인 대출 등과 같은 자체 프로젝트를 부트스트랩하기 위해 [crosschain-oftv1-example](https://github.com/ayo-klaytn/crosschain-oftv1-example/tree/main)로 빌드를 시작하세요. LayerZero에 대한 자세한 가이드는 [LayerZero 문서](https://layerzero.gitbook.io/docs/) 및 [LayerZero 깃허브 리포지토리](https://github.com/LayerZero-Labs/solidity-examples/tree/main)를 참조하시기 바랍니다.
