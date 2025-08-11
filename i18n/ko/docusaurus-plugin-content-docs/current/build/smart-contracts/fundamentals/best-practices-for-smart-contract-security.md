# 스마트 컨트랙트 보안을 위한 모범 사례

이 가이드는 스마트 계약 보안을 위한 모범 사례에 대한 실용적이고 체계적인 안내를 제공합니다.
스마트 컨트랙트는 대부분의 온체인 애플리케이션에서 핵심적인 역할을 합니다. 탈중앙화 금융, 게임 플레이를 통한 수익 창출, 실제 자산 토큰화 등 다양한 사용 사례의 논리를 정의하고 적용합니다.

카이아 생태계 내에서, 특히 미니 디앱을 개발하는 개발자들 사이에서 이러한 앱의 채택과 사용량이 빠르게 증가하고 있습니다. 그러나 스마트 컨트랙트를 통해 더 많은 가치가 거래되거나 스마트 컨트랙트에 잠길수록 악의적인 행위자를 끌어들일 가능성이 높아집니다. 이러한 공격자들은 종종 시스템의 핵심인 스마트 컨트랙트에 집중합니다.

그렇기 때문에 스마트 컨트랙트 보안을 뒷전으로 미뤄서는 안 됩니다. 개발 초기 단계부터 배포 및 계약과의 지속적인 상호 작용에 이르기까지 우선순위를 두어야 합니다.

## 스마트 컨트랙트 보안이란 무엇인가요?

스마트 컨트랙트는 미리 정의된 조건이 충족되면 자동으로 실행되는 블록체인에 저장된 프로그램입니다. 일단 배포된 코드는 변경할 수 없는 불변의 코드가 됩니다. 이러한 불변성은 투명성을 보장하고 중개자의 필요성을 없애주지만 심각한 위험을 초래하기도 합니다. 컨트랙트에 취약점이 있는 경우 배포 후 패치할 수 없으므로 자금이 도난당하고 신뢰를 잃을 수 있습니다.

스마트 컨트랙트 보안은 악의적인 공격과 프로그래밍 결함으로부터 이러한 컨트랙트를 보호하는 데 사용되는 일련의 관행과 조치를 의미합니다. 보안이 잘 갖춰진 계약은 무단 액세스, 데이터 조작, 금전적 손실을 방지하여 프로토콜의 무결성을 보호하는 데 도움이 됩니다.

## 스마트 컨트랙트 보안이 중요한 이유는 무엇인가요?

스마트 컨트랙트는 배포 후 변경할 수 없으므로 버그나 취약점은 영구적으로 존재하게 됩니다. 악의적인 공격자는 이러한 약점을 악용하여 자금을 빼내거나 프로토콜의 동작을 조작할 수 있습니다. 많은 경우 코드에서 한 번의 실수로 수백만 달러의 손실이 발생할 수 있습니다.

디파이라마에 따르면, 2025년 6월 현재 탈중앙화 금융 공격으로 도난당한 금액은 총 66억 달러에 달합니다. 이 금액 중 스마트 컨트랙트 익스플로잇이 차지하는 비중은 약 33억 달러로 약 51%에 달합니다. 이 수치는 스마트 컨트랙트 보안이 모든 온체인 프로토콜에 얼마나 필수적인지 잘 보여줍니다.

## 안전한 스마트 컨트랙트 작성을 위한 모범 사례

### ‍1. 잘 테스트되고 안전한 라이브러리 또는 함수 사용

스마트 컨트랙트에서 외부 종속성을 사용하면 해당 종속성을 제대로 테스트하거나 검토하지 않으면 악성 코드가 발생할 수 있습니다. 이러한 위험을 줄이려면 항상 강력한 커뮤니티에서 유지 관리하고 정기적으로 감사를 받는 [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master)과 같이 테스트를 거치고 널리 신뢰받는 라이브러리를 사용하세요.

또한 타사 코드를 계약에 통합하기 전에 철저한 검토를 수행하세요. 외부 코드를 테스트하고 검토하면 숨겨진 취약점을 포함하거나 프로토콜에 예기치 않은 동작을 도입하지 않도록 할 수 있습니다.

### 2. 개발 보안 패턴 구현

보안 패턴은 재침입과 같은 알려진 공격 벡터를 방어하기 위한 표준화된 기술입니다. 취약점이 발생하기 전에 이를 예방하기 위한 신뢰할 수 있고 널리 인정받는 접근 방식을 제공합니다. 이러한 패턴을 코드에 통합하면 코드의 복원력이 향상되고 익스플로잇의 위험이 줄어듭니다.
다음은 고려해야 할 몇 가지 필수 보안 패턴입니다:

#### 2.1 CEI 패턴(확인-효과-상호 작용)

CEI 패턴은 외부 상호 작용이 발생하기 전에 필요한 모든 유효성 검사를 완료하는 데 도움이 됩니다. 이러한 구조는 스마트 컨트랙트 실행 중 예기치 않은 또는 악의적인 행동이 발생할 가능성을 줄여줍니다.

올바르게 구현된 경우 CEI 패턴은 이 순서를 따릅니다:

- 확인합니다: 필요한 모든 조건이 충족되었는지 확인합니다(예: 사용자의 잔액이 충분한지 확인).
- 효과: 효과: 컨트랙트의 내부 상태를 업데이트합니다(예: 사용자의 잔액 감소).
- 상호 작용: 자금을 이체하거나 외부 계약자에게 전화를 걸 수 있습니다.

이 구조를 따르면 재진입 공격의 위험을 크게 줄일 수 있습니다.

예를 들어, 아래 예시는 잔액을 업데이트하기 전에 사용자에게 이더를 전송하기 때문에 취약한 예시입니다.

```solidity
contract InSecureBank {

    mapping(address => uint256) public balances;

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        // Checks: if user have enough balance
        require(balances[msg.sender] >= amount, "Insufficient balance");
        // observe that this is an this external interaction.
        // should be made after deducting the `amount` from the user's balance
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
        // Effects: Update the user's balance
        balances[msg.sender] -= amount;
    }
}
```

위의 코드는 재진입 공격에 취약하여 악의적인 공격자가 잔액이 업데이트되기 전에 인출 함수를 반복적으로 호출할 수 있습니다. CEI 패턴은 외부 호출이 이루어지기 전에 컨트랙트의 상태가 업데이트되도록 하여 이를 방지합니다.

다음은 CEI 패턴을 따르는 위 코드의 업데이트 버전입니다:

```solidity
contract SecureBank {

    mapping(address => uint256) public balances;

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        // Checks: Ensure that the user has enough balance to withdraw the requested amount
        require(balances[msg.sender] >= amount, "Insufficient balance");
        // Effects: Update the user's balance
        balances[msg.sender] -= amount;
        // Interactions: Transfer the requested amount to the user
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
    }
}
```

CEI 패턴을 따르는 업데이트 버전에서는 토큰이 전송되기 전에 잔액이 조정됩니다. 이렇게 하면 사용자가 함수를 다시 입력하려고 해도 잔액이 이미 줄어들었기 때문에 호출이 실패합니다.

#### 2.2. 비상 정지 패턴

비상 정지 패턴은 흔히 회로 차단기라고도 하며, 비상 시 스마트 컨트랙트에서 선택한 기능을 일시 중지할 수 있습니다. 취약점이나 예기치 않은 동작이 감지되면 중요한 작업을 신속하게 비활성화할 수 있는 방법을 제공합니다.

이러한 문제를 사전에 모니터링하려면 이러한 목적에 맞게 사용자 지정한 모니터링 도구 또는 봇을 사용할 수 있습니다. 이러한 봇은 특정 거래 패턴이나 계약 상태의 비정상적인 변화를 스캔하여 잠재적인 위협을 표시합니다.

아래는 계약에서 회로 차단기 메커니즘을 구현하는 방법을 보여주는 예시입니다:

```solidity
contract CircuitBreaker {

    address public owner;
    bool public contractStopped = false;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Not the owner");
        _;
    }

    // Only works when contract is running
    modifier haltInEmergency() {
        require(!contractStopped, "Contract is stopped");
        _;
    }

    // Only works when contract is paused
    modifier enableInEmergency() {
        require(contractStopped, "Contract is running");
        _;
    }

    // Owner can pause/unpause contract
    function toggleContractStopped() public onlyOwner {
        contractStopped = !contractStopped;
    }

    // Normal operations (when running)
    function deposit() public payable haltInEmergency {
        // Deposit logic here
    }

    // Emergency functions (when paused)
    function emergencyWithdrawal() public onlyOwner enableInEmergency {
        // Emergency withdrawal logic here
    }
}
```

#### 2.3. 과속 방지턱 패턴

스피드 범프 패턴은 출금이나 거버넌스 결정과 같은 중요한 온체인 작업을 실행하기 전에 지연 기간을 도입합니다. 이러한 지연은 사용자 또는 관리자가 의심스러운 활동을 감지하고 대응할 수 있는 시간을 제공하는 보호 조치 역할을 합니다.

예를 들어 고정 대기 기간이나 최대 인출 금액을 설정하여 인출을 제한할 수 있습니다. 이를 통해 악의적인 행동으로 인한 무단 액세스 또는 빠른 자금 고갈을 방지할 수 있습니다.

아래 샘플은 사용자가 자금을 인출하기 전에 5일을 기다리도록 하여 이 패턴이 어떻게 작동하는지 보여줍니다.

```solidity
contract BankWithSpeedBump { 
    
    struct Withdrawal { 
        uint amount; 
        uint requestedAt; 
    } 

    mapping (address => uint) public balances; 
    mapping (address => Withdrawal) public withdrawals; 

    uint constant WAIT_PERIOD = 5 days;
  
    function deposit() public payable { 
        balances[msg.sender] += msg.value;
    }

    function requestWithdrawal() public { 
        if (balances[msg.sender] > 0) { 
        uint amountToWithdraw = balances[msg.sender]; 
        balances[msg.sender] = 0; 
        withdrawals[msg.sender] = Withdrawal({ amount: amountToWithdraw, requestedAt: block.timestamp}); 
        } 
    }

    function withdraw() public {
        require(withdrawals[msg.sender].amount > 0, "No pending withdrawal");
        require(
            block.timestamp > withdrawals[msg.sender].requestedAt + WAIT_PERIOD,
            "Wait period not completed"
        );
        
        uint amount = withdrawals[msg.sender].amount; 
        withdrawals[msg.sender].amount = 0; 
        
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Withdraw failed");
    }
}
```

### 3. 최신 버전의 솔리디티 컴파일러 사용

항상 최신 버전의 솔리디티 컴파일러를 사용하세요. 최신 버전에는 종종 중요한 보안 수정 사항과 언어 개선 사항이 포함되어 있습니다. 예를 들어, 솔리디티 버전 0.8.x 이상에서는 이전에 스마트 컨트랙트의 일반적인 취약점이었던 산술 오버플로우와 언더플로우에 대한 보호 기능이 내장되어 있습니다.

최신 상태를 유지하면 코드가 최신 보안 기능과 컴파일러 검사의 이점을 누릴 수 있습니다.

### 4. 스마트 컨트랙트를 단순하게 유지

단순성은 안전한 스마트 컨트랙트를 작성할 때 핵심 원칙입니다. 복잡한 논리로 인해 불필요한 위험과 숨겨진 취약점이 발생하는 경우가 많습니다. 계약 코드와 구조를 최대한 간단하고 명확하게 유지하는 것이 가장 좋습니다. 복잡성을 피할 수 없는 경우에는 로직을 각각 특정 목적을 가진 작은 함수로 세분화하세요.

### 5. 시뮬레이션 환경에서 스마트 컨트랙트 테스트

스마트 컨트랙트를 라이브 네트워크에 배포하기 전에 항상 카이로스 테스트넷과 같은 시뮬레이션 환경에서 실행하세요. 이 통제된 환경에서 테스트하면 다양한 조건과 에지 케이스에서 계약이 어떻게 작동하는지 엄격하게 평가할 수 있습니다.
이 프로세스는 취약점을 발견하고 예상되는 동작을 확인하며 전반적인 안정성을 개선하는 데 도움이 됩니다. 또한 자금 손실이나 시스템 장애를 초래할 수 있는 결함이 있는 로직을 배포할 위험을 줄여줍니다.

다음은 스마트 컨트랙트의 유효성을 검사하는 데 권장되는 몇 가지 테스트 방법입니다:

#### 5.1 단위 테스트

단위 테스트는 스마트 컨트랙트 내의 개별 기능을 평가하는 데 중점을 둡니다. 단위 테스트를 효과적으로 수행하려면 컨트랙트를 독립적으로 테스트할 수 있는 작은 단일 목적의 함수로 구성해야 합니다.

일반적인 접근 방식은 함수의 예상 동작을 설명하는 명확한 진술인 어설션을 사용하는 것입니다. 그런 다음 다양한 조건에서 이러한 주장이 참인지 검증합니다. 단위 테스트는 개발 프로세스 초기에 문제를 식별하고 수정하는 데 도움이 되므로 통합 테스트 전에 항상 수행해야 합니다.

#### 5.2. 통합 테스트

통합 테스트는 계약의 다양한 구성 요소가 함께 작동하는 방식을 평가합니다. 여기에는 함수, 외부 계약 및 API와 같은 시스템 간의 상호 작용 확인이 포함됩니다.
이러한 유형의 테스트는 교차 계약 호출, 종속성 및 상속된 기능과 관련된 문제를 식별하는 데 필수적입니다. 이는 개별 부품이 결합될 때 올바르게 작동하고 계약이 더 넓은 시스템 맥락에서 예상대로 작동하도록 보장합니다.

#### 5.3. 퍼즈 테스트

퍼즈 테스트는 무작위 또는 극단적인 입력값을 컨트랙트에 전달하여 그 동작을 관찰하는 것입니다. 이 기법은 단위 또는 통합 테스트 중에 드러나지 않을 수 있는 취약점을 발견하는 데 도움이 됩니다.

퍼징은 계약에 수학적 연산이나 입력 유효성 검사 로직이 포함된 경우 특히 유용합니다. 이를 통해 코드를 스트레스 테스트하고 일반적인 조건에서 예기치 않은 동작을 식별할 수 있습니다.

### 6. 스마트 컨트랙트 감사 수행

감사는 독립적인 팀이 계약의 코드를 구조적으로 검토하여 취약성, 버그 또는 설계 결함을 식별하는 것입니다. 이 프로세스는 배포 전에 스마트 컨트랙트의 안전성과 신뢰성에 대한 확신을 한층 더 높여줍니다.

일반적인 감사에는 다음이 포함됩니다:

- 코드에 대한 철저한 수동 검토
- 알려진 취약점에 대한 자동화된 스캔
- 계약의 동작을 검증하기 위한 테스트
- 식별된 문제와 개선 제안을 요약한 상세 보고서

감사를 통해 익스플로잇의 위험을 줄이고 스마트 컨트랙트를 출시하기 전에 보안 표준을 충족하는지 확인할 수 있습니다.

### 7. 페일 세이프 메커니즘 포함

보안을 위해, 특히 새 계약으로 작업할 때는 신뢰할 수 있는 페일 세이프 접근 방식을 포함하는 것이 중요합니다. 이를 통해 문제가 발생할 경우 신속하게 대응할 수 있습니다. 다음은 고려해야 할 몇 가지 전략입니다:

- **업그레이드 가능성**: 계약이 향후 업그레이드를 허용하는지 확인하세요. 이렇게 하면 전체 계약을 교체하지 않고도 버그를 수정하고 새로운 기능을 도입할 수 있습니다.
- **분산 제어**: 한 곳에 제어 권한이 집중되지 않도록 합니다. 다중 서명 지갑을 사용하여 중요한 작업에는 여러 당사자의 확인이 필요합니다.
- **시간 잠금**: 중요한 작업을 실행하기 전에 지연 시간을 추가합니다. 이를 통해 팀이나 더 넓은 커뮤니티에서 거래를 검토하고 필요한 경우 대응할 시간을 확보할 수 있습니다.

## 결론

보안은 결코 뒷전으로 미뤄서는 안 됩니다. 개발에서 생산에 이르는 소프트웨어 개발 프로세스의 모든 단계에서 필수적인 부분이어야 합니다. 개발자는 스마트 컨트랙트로 작업할 때 보안을 우선시하는 사고방식을 채택해야 합니다.

항상 실패 가능성에 대비하고, 신중하게 변경 사항을 적용하고, 에코시스템의 업데이트에 대한 정보를 얻고, EVM의 특성을 이해하고, 계약을 가능한 한 간단하게 유지하세요. 위에서 설명한 모범 사례를 따르면 위험을 크게 줄이고 스마트 컨트랙트의 신뢰성을 향상시킬 수 있습니다.

