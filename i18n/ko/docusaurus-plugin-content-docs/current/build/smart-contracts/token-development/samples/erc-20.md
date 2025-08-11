# ERC-20

## 개요 <a id="overview"></a>

카이아에서 대체 가능한 토큰을 생성하는 방법은 이더리움에서와 비슷한 단계를 따르며, [ERC20 표준](https://ethereum.org/en/developers/docs/standards/tokens/erc-20)을 사용합니다.

표준을 따르기 위해 다음 이벤트와 기능을 구현하는 컨트랙트를 배포합니다:

```solidity
function name() public view returns (string) //optional
function symbol() public view returns (string) //optional
function decimals() public view returns (uint8) //optional
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

- **이름**: 토큰의 이름을 반환하는 메서드입니다.
- **심볼**: 토큰의 심볼을 반환하는 메서드입니다.
- **소수점**: 토큰이 사용하는 소수점 수를 반환하는 메서드입니다. 토큰의 가장 작은 단위를 정의하는 데 사용됩니다. 예를 들어 ERC-20 토큰의 소수점 값이 18인 경우, 이는 토큰을 소수점 이하 18자리까지 나눌 수 있다는 뜻입니다.
- **총공급량**: 토큰의 총 공급량을 정의하는 방법으로, 이 한도에 도달하면 스마트 컨트랙트는 새로운 토큰 생성을 거부합니다.
- **balanceOf**: 지갑 주소가 보유한 토큰 수를 반환하는 메서드입니다.
- **전송**: 총 공급량에서 일정량의 토큰을 가져와 사용자에게 지급하는 방식입니다.
- **송금인**: 사용자 간에 토큰을 전송하는 데 사용되는 또 다른 유형의 전송 방법입니다.
- **승인**: 이 방법은 총 공급량을 고려하여 스마트 컨트랙트가 사용자에게 일정량의 토큰을 할당할 수 있는지 여부를 확인합니다.
- **허용**: 이 방법은 한 사용자가 다른 사용자에게 일정량의 토큰을 보낼 수 있는 충분한 잔액이 있는지 확인한다는 점을 제외하면 승인된 방법과 완전히 동일합니다.
- **토큰 전송 이벤트**: 토큰 전송 시 발생합니다.
- **승인 이벤트**: 토큰 승인이 있을 때 발생하는 이벤트입니다.

## 시작하기 <a id="getting-started"></a>

이 섹션에서는 Remix Online IDE를 사용하여 ERC20 토큰 컨트랙트를 생성하고 배포하는 방법을 설명합니다. 여러 팀에서 여러 가지 요소를 염두에 두고 개발한 ERC20 호환 토큰이 여러 가지 구현되어 있습니다. 편의성과 보안을 위해 [OpenZeppelin ERC-20](https://docs.openzeppelin.com/contracts/5.x/erc20) 컨트랙트를 사용하여 토큰을 생성합니다. 오픈제플린을 사용하면 전체 ERC-20 인터페이스를 작성할 필요가 없습니다. 대신 라이브러리 컨트랙트를 가져와서 그 기능을 사용할 수 있습니다.

### 1단계: ERC20 토큰 컨트랙트 만들기 <a id="create-erc20-token-contract"></a>

**오픈제플린 계약 마법사**

- 오픈제플린 계약 마법사] 열기(https://wizard.openzeppelin.com)
- ERC20\*\*을 선택합니다.
- 토큰의 **이름**과 **심볼**을 입력합니다. 예를 들어: 예: 각각 _Greek_ 및 _GK_.
- 인쇄수량\*\* 필드에서 10,000으로 설정합니다. 이렇게 하면 배포자를 위한 초기 토큰이 생성됩니다.
- 기능\*\* 섹션에서 주조 가능 확인란을 선택하여 권한이 있는 계정(onlyOwner)이 더 많은 공급량을 만들 수 있도록 허용합니다.
- 복사\*\* 아이콘을 클릭하여 다음 섹션의 Remix에서 사용할 코드를 복사합니다.

![](/img/build/smart-contracts/oz-erc20-setup.png)

### 2단계: ERC20 토큰 컨트랙트 배포 <a id="deploy-erc20-token-contract"></a>

**리믹스 IDE**

- Remix](https://remix.ethereum.org)에서 **파일 탐색기**로 이동하여 계약 폴더에 'Greek.sol'이라는 새 파일을 생성합니다.
- 솔리디티 컴파일러\*\* 탭으로 이동하여 **그리스어.sol 컴파일**을 클릭하여 토큰 컨트랙트를 컴파일합니다.
- 트랜잭션 배포 및 실행\*\* 탭으로 이동합니다.
- 환경\*\* > **주입된 공급자** > **메타마스크**를 선택합니다.
- 계약\*\* 드롭다운에서 계약을 선택합니다. 예를 들어, _그리스어_.
- 배포\*\* 필드에 수신자 및 초기 소유자에 대한 생성자 인수를 입력합니다.
- 배포/거래\*\*를 클릭합니다.

![](/img/build/smart-contracts/remix-erc20-deploy.png)

배포 후 컨트랙트를 배포할 때 사용한 계정으로 **balanceOf**를 호출할 수 있습니다. 계정에는 아래와 같이 10000000000000000000000 토큰이 있습니다.

위 컨트랙트를 배포할 때 소수를 18로 설정했기 때문에 생성자에서 고정된 수의 10000 토큰을 발행했으며, 토큰 하나는 10^18의 소수점 값을 가졌습니다. 총공급 메서드는 발행된 토큰의 총 공급량을 반환하며, 이 값은 10000000000000000000000.

![](/img/build/smart-contracts/remix-erc20-bal-totalsupply.png)

### 3단계: 메타마스크에서 ERC-20 토큰과 상호 작용하기 <a id="interact-with-erc20-token-from-MetaMask"></a>

메타마스크를 사용하여 잔액을 확인하고 방금 배포한 ERC-20 호환 그리스 토큰을 전송할 수 있습니다. 메타마스크에서 토큰 잔액을 확인하려면 아래 단계를 따르세요:

**메타마스크**

- 메타마스크 열기
- 맨 오른쪽의 **줄임표** 아이콘을 클릭한 다음 **토큰 가져오기**를 클릭합니다.

![](/img/build/smart-contracts/mm-import-tokens-e20g.png)

- 네트워크 선택\*\* 필드에서 카이아 카이로스 네트워크를 선택하고 **토큰 컨트랙트 주소** 필드에 최근에 배포한 그리스 컨트랙트 주소를 붙여넣어야 합니다.

![](/img/build/smart-contracts/mm-custom-tokens-e20g.png)

- 마지막 단계로 **가져오기**를 클릭합니다.

![](/img/build/smart-contracts/mm-custom-tokens-imported-e20g.png)

완료되면 다음과 같은 메시지가 표시되는 모달이 나타납니다: "_토큰을 가져왔습니다: GK_를 성공적으로 가져왔습니다."라는 메시지와 가져온 토큰(GK)이 메타마스크 지갑의 토큰 목록에 표시됩니다.

