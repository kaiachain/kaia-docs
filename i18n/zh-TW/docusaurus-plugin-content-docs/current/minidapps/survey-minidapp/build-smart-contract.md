# 使用 Hardhat 建立調查智慧型契約

在本節中，您將建構一個利用 Semaphore 的智慧型契約，以確保調查管理的隱私性和準確性。

在資源總管窗格中選擇 contracts 資料夾，並更新資料夾，如圖所示，此 [repo](https://github.com/kjeom/ExampleMiniDapp/tree/main/contract/contracts) 中的所有合約。

現在您已建立合約，讓我們來分解主要的依賴合約。

## 細分調查V1 合約<a id="breakdown-surveyV1-contract"></a>

以下是其 SurveyV1 主要元素的細分

### 依賴進口的合約<a id="import-dependent-contracts"></a>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
// Import survey interface 
import "./ISurvey.sol";
// Import Semaphore contracts for privacy features
import "./semaphore/interfaces/ISemaphore.sol";
```

### 新增狀態變數、結構、事件和修改器<a id="state-variables"></a>

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

在上面的程式碼中，我們

- 定義了合同的主要組成部分：
  - admin 狀態變數：**owner** 具有提款權限，而 **manager** 則具有特殊管理權限。
  - 調查問卷元資料變數：基本調查問卷的相關資訊，例如 **標題**、**描述**、**獎勵**等。
  - 資料儲存陣列：儲存調查的 \*\* 問題\*\* 和 \*\* 選項\*\*、提交的 \*\* 答案\*\* 和參與者 \*\* 位址\*\*。
  - 調查問卷狀態變數：追蹤調查問卷完成狀態、記錄建立時間戳記、設定調查問卷到期時間 (**finished**, **timestamp**, **lockedUntil**)
  - 隱私權資訊與 Semaphore：Semaphore 通訊協定的介面以及隱私群組的唯一識別碼。
- 建立 **Question** 和 **Answer** 結構，分別儲存調查問卷問題和答案。
- 建立事件 **AnswerSubmitted**，在提交調查問卷答案時發送
- 建立存取控制修改器：**onlyMgr()**

### 實作構成器<a id="implement-constructor"></a>

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

在上述程式碼中，我們實作了構建器、在鏈上儲存問題/選項、設定管理控制和時間範圍、透過 Semaphore 通訊協定建立隱私功能，並透過燒掉部分存入金額和從剩餘金額中計算按回應獎勵來設定獎勵系統。

接下來，您將着手實作主要功能，首先是提交調查問卷答案的功能。

### 建立 SubmitAnswer 函式<a id="create-submitanswer-function"></a>

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

在上面的程式碼片段中，我們：

- 已驗證的回覆要求 (長度符合問題、調查問卷未滿/過期、無重複提交)
- 將答案轉換為 uint256，並使用 Semaphore 通訊協定建立零知識的隱私證明
- 確認每個答案都在問題的有效選項範圍內
- 將已驗證的答案儲存在合約儲存空間中
- 已將獎金轉帳給答辯人 (msg.sender)
- 更新調查問卷參與記錄 (增加 surveyNumber 並新增受訪者地址)

### 其他：狀態變更功能、檢視功能和接收功能<a id="other-state-changing-functions"></a>

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

在上面的程式碼片段中，我們以下列功能實作了全面的調查問卷合約：

**檢視功能：**

- _getQuestions()_：傳回調查問卷問題與選項的陣列
- _getAnswers()_：傳回已提交調查問卷答案的陣列
- _remainingSurveys()_：回傳仍需回應的計數
- _surveyInfo()_：傳回所有調查元資料 (標題、描述、所有者、編號、時間戳記、狀態)

**狀態修改功能：**

- _finish()_：在鎖定期間後標記調查完成
- _withdraw()_：允許所有者提取餘額
- _加入群組()_：將成員加入隱私群組（僅限管理員）

**實用功能：**

- _uint8ArrayToUint256()_：將 uint8 陣列轉換為 uint256，用於隱私證明
- _receive()_：接收 ETH 付款的後備函數。

## SurveyFactoryV1 合約明細<a id="breakdown-surveyFactoryV1-contract"></a>

SurveyFactory 契約是部署新調查問卷契約的工廠模式實作。

以下是其核心功能：

- _初始化()_：使用 Semaphore 和管理器位址設定工廠
- _createSurvey()_：使用已驗證的參數部署新的調查合約
- _getSurveys()_：傳回所有已部署調查的位址
- _getSurveyCount()_：回傳建立的調查問卷總數
- _setBurnRate()_：允許擁有者修改燃燒率。

## ISemaphore.sol 合約明細<a id="breakdown-isemaphore-contract"></a>

在 ISemaphore 介面中，我們有以下內容：

**核心結構：**

- 群組：持有群組參數，包括 merkle 樹的持續時間和對應
- SemaphoreProof：包含證明參數（深度、根、無效器、訊息等）

\*\* 主要功能：\*\*

1. **集團管理**
   - _createGroup()_：創建新群組，可選擇管理員和持續時間
   - _updateGroupAdmin()_：變更群組管理員
   - _acceptGroupAdmin()_：接受群組的管理角色
2. **會員管理**
   - _addMember()_：將單一成員加入群組
   - _addMembers()_：一次加入多個成員
   - _updateMember()_：更新成員的身份承諾
   - _removeMember()_：從群組移除成員
3. **證明驗證**
   - validateProof()：驗證零知識證明並防止雙重訊號
   - verifyProof()：在不改變狀態的情況下驗證證明的有效性
4. \*\* 設定\*\*
   - _groupCounter()_：回傳建立的群組總數
   - _updateGroupMerkleTreeDuration()_：更新 merkle 樹的持續時間
5. **活動**：
   - _GroupMerkleTreeDurationUpdated_：記錄 Merkle 樹持續時間的變更
   - _ProofValidated_：記錄已驗證的證明細節
6. \*\* 錯誤處理\*\*：
   - 針對無效證明、重複無效、空群組等自訂錯誤。

此介面為調查系統中的隱私保護群組管理和零知識證明驗證提供了基礎。

## 部署智慧型契約 <a id="deploying-contract"></a>

在本節中，我們要使用 [hardhat-deploy](https://github.com/wighawag/hardhat-deploy) 將我們的合約部署到 localhost 網路上；這是一個可複製部署和測試的 hardhat 外掛。

接下來是在 contract 資料夾中建立一個名為 **deploy** 的新資料夾，然後按一下 New File 按鈕，建立一個名為 **deploy.ts** 的新檔案。 然後將以下程式碼複製並貼在檔案內。

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

您可以按照以下步驟部署到 localhost 網路：

1. 啟動 [本機節點](https://hardhat.org/hardhat-runner/docs/getting-started#connecting-a-wallet-or-dapp-to-hardhat-network)

```
npx hardhat node
```

2. 開啟新終端，並在 localhost 網路中部署合約

```
npx hardhat deploy --network localhost
```

儲存 `SURVEY_FACTORY_V1_CONTRACT_ADDRESS` 部署的位址，因為前端整合時會需要它們。


