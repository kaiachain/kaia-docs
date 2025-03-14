# 하드햇을 사용하여 설문조사 스마트 계약 구축하기

이 섹션에서는 설문조사 관리에서 개인정보 보호와 정확성을 보장하기 위해 Semaphore를 활용하는 스마트 컨트랙트를 구축합니다.

탐색기 창에서 계약 폴더를 선택하고 이 [저장소](https://github.com/kjeom/ExampleMiniDapp/tree/main/contract/contracts)의 모든 계약과 함께 표시된 대로 폴더를 업데이트합니다.

이제 계약이 생성되었으므로 주요 종속 계약을 분석해 보겠습니다.

## 고장 조사V1 계약 <a id="breakdown-surveyV1-contract"></a>

다음은 SurveyV1의 주요 요소에 대한 분석입니다.

### 종속 계약 가져오기 <a id="import-dependent-contracts"></a>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
// Import survey interface 
import "./ISurvey.sol";
// Import Semaphore contracts for privacy features
import "./semaphore/interfaces/ISemaphore.sol";
```

### 상태 변수, 구조체, 이벤트 및 수정자 추가하기 <a id="state-variables"></a>

```solidity
event AnswerSubmitted(address indexed respondent, uint8[] answers);
contract SurveyV1 is ISurvey {
    address public immutable SURVEY_FACTORY;
    uint256 public constant VERSION = 1;
    uint256 public constant TYPE = 1; // 1 for survey, 2 for poll
    address public owner;
    address public manager;
    string public title;
    string public description;
    uint256 public targetNumber;
    uint256 public reward;
    uint256 public surveyNumber;
    uint256 public burnRate;
    Question[] public questions;
    Answer[] public answers;
    address[] public respondents;
    bool public finished = false;
    uint256 public timestamp;
    uint256 public lockedUntil;
    ISemaphore public semaphore;
    uint256 public groupId;
    // The number of questions are limited to 32
    // because of the limitation of the semaphore contract
    struct Question {
        string question;
        string[] options;
    }
    struct Answer {
        address respondent;
        uint8[] answers;
        uint256 merkleTreeDepth;
        uint256 merkleTreeRoot;
        uint256 nullifier;
        uint256[8] points;
    }
    modifier onlyMgr() {
        require(msg.sender == manager, "Access denied: Not the manager");
        _;
    }
}
```

위의 코드에서 우리는

- 정의된 주요 계약 구성 요소:
  - 관리자 상태 변수: 출금 권한이 있는 **소유자** 및 특별 관리 권한이 있는 **관리자**.
  - 설문조사 메타데이터 변수: **제목**, **설명**, **보상** 등과 같은 기본 설문조사에 대한 정보입니다.
  - 데이터 저장 배열: 설문조사 **질문** 및 **옵션**, 제출된 **답변** 및 참가자 **주소**를 저장합니다.
  - 설문조사 상태 변수: 설문조사 완료 상태 추적, 생성 타임스탬프 기록, 설문조사 만료 시간 설정(**완료**, **타임스탬프**, **잠금유지**)
  - 세마포어를 사용한 프라이버시 인프라: 세마포어 프로토콜을 위한 인터페이스 및 개인정보 보호 그룹의 고유 식별자.
- 설문조사 질문과 답변을 각각 저장하기 위해 **질문** 및 **답변** 구조체를 생성했습니다.
- 설문조사 답변이 제출될 때 발생하는 **AnswerSubmitted** 이벤트 생성
- 접근 제어 수정자를 생성했습니다: **onlyMgr()**

### 생성자 구현 <a id="implement-constructor"></a>

```solidity
//…
contract SurveyV1 is ISurvey {
//…
    // Constructor accepts raw byte data for the questions
    constructor(string memory _title, string memory _description, Question[] memory _questions, uint256 _targetNumber, uint256 _lockedUntil, uint256 _burnRate, ISemaphore _semaphore, address _manager) payable {
        SURVEY_FACTORY = msg.sender;
        surveyNumber = 0;
        // // Manually push each decoded question into storage
        for (uint i = 0; i < _questions.length; i++) {
            // Create a memory array to hold the options for this question
            string[] memory optionsMemory = new string[](_questions[i].options.length);
            // Loop through the decoded question's options and store them in memory
            for (uint j = 0; j < _questions[i].options.length; j++) {
                optionsMemory[j] = _questions[i].options[j];
            }
            // Add the full question struct to the questions array
            questions.push(Question({
                question: _questions[i].question,
                options: optionsMemory
            }));
        }
        // Create the survey with the passed data
        title = _title;
        description = _description;
        burnRate = _burnRate;
        targetNumber = _targetNumber;
        timestamp = block.timestamp;
        lockedUntil = timestamp + _lockedUntil * 1 days;
        owner = msg.sender;
        semaphore = ISemaphore(_semaphore);
        groupId = semaphore.createGroup();
        manager = _manager;
        
        payable(0x000000000000000000000000000000000000dEaD).transfer(msg.value * burnRate / 10000);
        reward = (msg.value - msg.value * burnRate / 10000) / targetNumber; // 5% burn
    }
}
```

위의 코드에서는 생성자를 구현하고, 질문/옵션을 온체인에 저장하고, 관리 제어 및 기간을 설정하고, Semaphore 프로토콜을 통해 프라이버시 기능을 설정하고, 예치된 금액의 일부를 소각하고 나머지 금액에서 응답당 보상을 계산하는 방식으로 보상 시스템을 구성했습니다.

다음으로 설문조사 답변 제출 기능부터 시작하여 주요 기능을 구현해 보겠습니다.

### 제출 답변 함수 만들기 <a id="create-submitanswer-function"></a>

```solidity
//…
contract SurveyV1 is ISurvey {
//…
    function submitAnswer(Answer memory _answer) public {
        require(_answer.answers.length == questions.length, "Answer length must match question length");
        require(surveyNumber < targetNumber, "Survey is already full");
        require(block.timestamp < lockedUntil, "Survey is finished");
        for (uint i=0; i<respondents.length; i++) {
            require(respondents[i] != msg.sender, "Already answered");
        }
        uint256 message = this.uint8ArrayToUint256(_answer.answers);
        ISemaphore.SemaphoreProof memory proof = ISemaphore.SemaphoreProof(
            _answer.merkleTreeDepth,
            _answer.merkleTreeRoot,
            _answer.nullifier,
            message,
            groupId,
            _answer.points
        );
        semaphore.validateProof(groupId, proof);
        for (uint i=0; i<questions.length; i++) {
            require(_answer.answers[i] < questions[i].options.length, "Answer out of bounds");
        }
        // Add the answer to the answers array
        answers.push(_answer);
        // Increment the survey number
        payable(msg.sender).transfer(reward);
        surveyNumber++;
        respondents.push(msg.sender);
    }
}
```

위의 코드 스니펫에서 우리는

- 검증된 응답 요건(길이가 질문과 일치하고, 설문조사가 가득 찼거나 만료되지 않았으며, 중복 제출이 없음)
- 개인 정보 보호를 위해 세마포어 프로토콜을 사용하여 답을 uint256으로 변환하고 영지식 증명을 생성했습니다.
- 각 답변이 질문에 대한 유효한 옵션 범위 내에 있는지 확인했습니다.
- 컨트랙트 저장소에 유효성 검사된 답변 저장
- 응답자에게 보상 지급을 전송했습니다(메시지 발신자).
- 설문조사 참여 기록 업데이트(설문조사 번호 증가 및 응답자 주소 추가)

### 기타: 상태 변경 기능, 보기 기능 및 수신 기능 <a id="other-state-changing-functions"></a>

```solidity
//…
contract SurveyV1 is ISurvey {
//…state changing functions
    function finish() public {
        require(block.timestamp >= lockedUntil, "Survey is not finished yet");
        finished = true;
    }
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        require(address(this).balance > 0, "No balance to withdraw");
        this.finished();
        payable(owner).transfer(address(this).balance);
    }
    // Function to return the number of remaining surveys
    function remainingSurveys() public view returns (uint256) {
        return targetNumber - surveyNumber;
    }
    function joinGroup(uint256 identityCommitment) external onlyMgr {
        require(finished == false, "Survey is finished");
        semaphore.addMember(groupId, identityCommitment);
    }
//… view functions
    function getQuestions() public view returns (Question[] memory) {
        return questions;
    }
    function getAnswers() public view returns (Answer[] memory) {
        return answers;
    }
    function remainingSurveys() public view returns (uint256) {
        return targetNumber - surveyNumber;
    }
    function surveyInfo() public view returns (string memory, string memory, address, uint256, uint256, uint256, uint256, uint256, uint256, uint256, bool) {
        return (title, description, owner, reward, targetNumber, surveyNumber, timestamp, lockedUntil, TYPE, VERSION, finished);
    }
//.. helper function
    function uint8ArrayToUint256(uint8[] memory data) public pure returns (uint256) {
        require(data.length <= 32, "uint8[] exceeds 32 bytes");
        uint256 result = 0;
        for (uint256 i = 0; i < data.length; i++) {
            result |= uint256(data[i]) << (8 * (data.length - 1 - i));
        }
        return result;
    }
//.. receive function 
    // Fallback function to receive kaia
    receive() external payable {
    }
}
```

위의 코드 스니펫에서는 다음과 같은 기능을 갖춘 포괄적인 설문조사 계약을 구현했습니다:

**기능 보기:**

- _getQuestions()_: 설문조사 질문 및 옵션의 배열을 반환합니다.
- _getAnswers()_: 제출된 설문조사 답변의 배열을 반환합니다.
- _남은 설문조사()_: 아직 필요한 응답 수를 반환합니다.
- _surveyInfo()_: 모든 설문조사 메타데이터(제목, 설명, 소유자, 숫자, 타임스탬프, 상태)를 반환합니다.

**상태 수정 기능:**

- _finish()_: 잠금 기간 후 설문조사 완료를 표시합니다.
- _withdraw()_: 소유자가 남은 잔액을 출금할 수 있도록 합니다.
- _joinGroup()_: 개인정보 보호 그룹에 멤버를 추가합니다(관리자만 해당).

**유틸리티 기능:**

- _uint8ArrayToUint256()_: 프라이버시 증명을 위해 uint8 배열을 uint256으로 변환합니다.
- _받기()_: ETH 결제를 받기 위한 폴백 함수.

## SurveyFactoryV1 계약 내역 <a id="breakdown-surveyFactoryV1-contract"></a>

SurveyFactory 계약은 새 설문조사 계약을 배포하기 위한 팩토리 패턴 구현 역할을 합니다.

핵심 기능은 다음과 같습니다:

- _initialize()_: 세마포어와 매니저 주소로 팩토리를 설정합니다.
- _createSurvey()_: 검증된 파라미터로 새 설문조사 컨트랙트를 배포합니다.
- _getSurveys()_: 배포된 모든 설문조사의 주소를 반환합니다.
- _getSurveyCount()_: 생성된 설문조사의 총 개수를 반환합니다.
- _setBurnRate()_: 소유자가 번율을 수정할 수 있도록 합니다.

## ISemaphore.sol 계약 분석 <a id="breakdown-isemaphore-contract"></a>

ISemaphore 인터페이스에는 다음이 있습니다:

**핵심 구조:**

- 그룹: 머클 트리 기간 및 매핑을 포함한 그룹 매개변수를 보유합니다.
- 세마포어 증명: 증명 매개변수(깊이, 루트, 무효화기, 메시지 등)를 포함합니다.

**주요 기능:**

1. **그룹 관리**
  - _createGroup()_: 관리자 및 기간 옵션을 사용하여 새 그룹을 생성합니다.
  - _updateGroupAdmin()_: 그룹 관리자를 변경합니다.
  - _acceptGroupAdmin()_: 그룹에 대한 관리자 역할을 수락합니다.
2. **회원 관리**
  - _addMember()_: 그룹에 단일 멤버를 추가합니다.
  - _addMembers()_: 한 번에 여러 멤버를 추가합니다.
  - _updateMember()_: 회원의 신원 약정을 업데이트합니다.
  - _removeMember()_: 그룹에서 멤버를 제거합니다.
3. **증빙 검증**
  - validateProof(): 영지식 증명의 유효성을 검사하고 이중 시그널링을 방지합니다.
  - verifyProof(): 상태 변경 없이 증명의 유효성을 검증합니다.
4. **구성**
  - _groupCounter()_: 생성된 총 그룹을 반환합니다.
  - _업데이트 그룹 머클 트리 기간()_: 머클 트리 기간을 업데이트합니다.
5. **이벤트**:
  - _그룹 머클 트리 기간 업데이트_: 머클 트리 기간에 대한 변경 사항을 기록합니다.
  - _ProofValidated_: 검증된 증명 세부 정보를 기록합니다.
6. **오류 처리**:
  - 잘못된 증명, 중복된 무효화자, 빈 그룹 등에 대한 사용자 지정 오류.

이 인터페이스는 설문조사 시스템에서 개인정보를 보호하는 그룹 관리 및 영지식 증명 검증을 위한 기반을 제공합니다.

## 스마트 컨트랙트 배포 <a id="deploying-contract"></a>

이 섹션에서는 복제 가능한 배포 및 테스트를 위한 하드햇 플러그인인 [hardhat-deploy](https://github.com/wighawag/hardhat-deploy)를 사용하여 로컬 호스트 네트워크에 컨트랙트를 배포하겠습니다.

다음으로 계약 폴더에 **deploy**라는 새 폴더를 생성하고 새 파일 버튼을 클릭하여 **deploy.ts**라는 새 파일을 생성합니다. 그런 다음 파일 안에 다음 코드를 복사하여 붙여넣습니다.

```solidity
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "hardhat";

export default async function deploySurveyFactory(
  hre: HardhatRuntimeEnvironment
) {
  const [deployer] = await ethers.getSigners();
  const { deploy } = hre.deployments;

  // const semaphoreAddress = result.address;
  const semaphoreAddress = "0x6be257C10E36350EBC6610204bE4e5Acf2c3A325";

  console.log("Deploying SurveyFactoryV1 as an upgradeable contract...");
  const deployment = await deploy("SurveyFactoryV1", {
    contract: "SurveyFactoryV1",
    from: deployer.address,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      owner: deployer.address,
      execute: {
        methodName: "initialize",
        args: [semaphoreAddress, deployer.address],
      },
    },
    log: true,
  });

  if (!deployment.newlyDeployed) {
    console.log("SurveyFactoryV1 already deployed at:", deployment.address);
  }
}

deploySurveyFactory.tags = [
  "SemaphoreVerifier",
  "PoseidonT3",
  "Semaphore",
  "SurveyFactoryV1",
];
```

다음 단계에 따라 로컬 호스트 네트워크에 배포할 수 있습니다:

1. 로컬 노드] 시작(https://hardhat.org/hardhat-runner/docs/getting-started#connecting-a-wallet-or-dapp-to-hardhat-network)

```
npx hardhat node
```

2. 새 터미널을 열고 로컬 호스트 네트워크에 컨트랙트를 배포합니다.

```
npx hardhat deploy --network localhost
```

프론트엔드 통합에 필요하므로 `SURVEY_FACTORY_V1_CONTRACT_ADDRESS` 배포된 주소를 저장합니다.


