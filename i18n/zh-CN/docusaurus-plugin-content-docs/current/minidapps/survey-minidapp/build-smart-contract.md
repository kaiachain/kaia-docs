# 使用 Hardhat 构建调查智能合约

在本节中，您将构建一个利用 Semaphore 的智能合约，以确保调查管理的隐私性和准确性。

在资源管理器窗格中选择合同文件夹，更新文件夹，如图所示，该文件夹中包含 [repo](https://github.com/kjeom/ExampleMiniDapp/tree/main/contract/contracts) 中的所有合同。

现在您已经创建了合同，让我们来分解主要的从属合同。

## 细目调查V1 合同<a id="breakdown-surveyV1-contract"></a>

以下是其 SurveyV1 关键要素的详细介绍

### 依赖进口的合同<a id="import-dependent-contracts"></a>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
// Import survey interface 
import "./ISurvey.sol";
// Import Semaphore contracts for privacy features
import "./semaphore/interfaces/ISemaphore.sol";
```

### 添加状态变量、结构体、事件和修改器<a id="state-variables"></a>

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

在上面的代码中，我们

- 确定合同的主要内容：
  - 管理状态变量：**owner** 具有撤出权限，**manager** 具有特殊管理权限。
  - 调查元数据变量：基本调查信息，如 **标题**、**描述**、**奖励**等。
  - 数据存储阵列：存储调查**问题**和**选项**、提交的**答案**和参与者**地址**。
  - 调查状态变量：跟踪调查完成状态、记录创建时间戳、设置调查过期时间（**已完成**、**时间戳**、**锁定至**）。
  - 带有 Semaphore 的隐私信息：Semaphore 协议接口和隐私组唯一标识符。
- 创建了 **Question** 和 **Answer** 结构，分别用于存储调查问题和答案。
- 创建了事件 **AnswerSubmitted**，在提交调查问卷答案时发出
- 创建了一个访问控制修改器：**onlyMgr()**

### 执行构造函数<a id="implement-constructor"></a>

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

在上述代码中，我们实现了构造函数，在链上存储了问题/选项，设置了管理控制和时间框架，通过 Semaphore 协议建立了隐私功能，并通过烧毁部分存入金额和从剩余金额中计算按回复奖励的方式配置了奖励系统。

接下来，您将着手实现主要功能，首先是提交调查问卷答案的功能。

### 创建提交答案函数<a id="create-submitanswer-function"></a>

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

在上面的代码片段中，我们

- 验证响应要求（长度与问题相符、调查问卷未满/过期、无重复提交）
- 将答案转换为 uint256，并使用 Semaphore 协议创建零知识证明以保护隐私
- 核实每个答案都在问题的有效选项范围内
- 将验证后的答案存储在合同存储区中
- 向答辩人（msg.发送人）转账奖励付款
- 更新调查参与记录（增加调查编号并添加受访者地址）

### 其他：状态更改功能、查看功能和接收功能<a id="other-state-changing-functions"></a>

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

在上面的代码片段中，我们实现了一个包含以下功能的综合调查合同：

**查看功能：**

- _getQuestions()_：返回调查问题和选项的数组
- _getAnswers()_：返回已提交调查问卷答案的数组
- _remainingSurveys()_：返回仍需响应的计数
- _surveyInfo()_：返回所有调查元数据（标题、描述、所有者、编号、时间戳、状态）

**修改国家职能：**

- _finish()_：在锁定期结束后标记调查完成
- _withdraw()_：使所有者能够提取余额
- _joinGroup()_：将成员添加到隐私组（仅限管理员）

**实用功能：**

- _uint8ArrayToUint256()_：将 uint8 数组转换为 uint256，用于隐私证明
- _接收()_：用于接收 ETH 付款的后备函数。

## SurveyFactoryV1 合同细目<a id="breakdown-surveyFactoryV1-contract"></a>

SurveyFactory 合约是用于部署新调查合约的工厂模式实现。

以下是其核心功能：

- _初始化()_：使用 Semaphore 和管理器地址设置工厂
- _createSurvey()_：使用已验证的参数部署新的测量合同
- _getSurveys()_：返回所有已部署调查的地址
- _getSurveyCount()_：返回创建的调查总数
- _setBurnRate()_：允许所有者修改燃烧率。

## ISemaphore.sol 合同细目<a id="breakdown-isemaphore-contract"></a>

在 ISemaphore 界面中，我们有以下内容：

**核心结构：**

- 组：保存组参数，包括梅克尔树持续时间和映射
- SemaphoreProof：包含证明参数（深度、根、无效器、消息等）

**主要功能：**

1. **集团管理**
   - _createGroup()_：创建新组，可选择管理员和持续时间
   - _更新组管理员()_：更改组管理员
   - _acceptGroupAdmin()_：接受组的管理员角色
2. **会员管理**
   - _addMember()_：向组中添加单个成员
   - _addMembers()_：一次添加多个成员
   - _updateMember()_：更新成员的身份承诺
   - _删除成员()_：从组中删除成员
3. **验证**
   - validateProof()：验证零知识证明，防止重复发信号
   - verifyProof()：在不改变状态的情况下验证证明的有效性
4. **配置**
   - _groupCounter()_：返回创建的组总数
   - _updateGroupMerkleTreeDuration()_：更新梅克尔树持续时间
5. **活动**：
   - _GroupMerkleTreeDurationUpdated_：记录梅克尔树持续时间的变化
   - _ProofValidated_：记录已验证的证明详细信息
6. **错误处理**：
   - 针对无效证明、重复无效证明、空组等自定义错误。

该接口为调查系统中的隐私保护组管理和零知识证明验证奠定了基础。

## 部署智能合约 <a id="deploying-contract"></a>

在本节中，我们将使用 [hardhat-deploy](https://github.com/wighawag/hardhat-deploy) 将我们的合同部署到 localhost 网络；这是一个用于可复制部署和测试的 hardhat 插件。

下一步是在合同文件夹中新建一个名为**deploy**的文件夹，然后单击 "新建文件 "按钮新建一个名为**deploy.ts**的文件。 然后将以下代码复制并粘贴到文件中。

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

您可以按照以下步骤部署到本地主机网络：

1. 启动 [本地节点](https://hardhat.org/hardhat-runner/docs/getting-started#connecting-a-wallet-or-dapp-to-hardhat-network)

```
npx hardhat node
```

2. 打开一个新终端，在 localhost 网络中部署合同

```
npx hardhat deploy --network localhost
```

保存 "SURVEY_FACTORY_V1_CONTRACT_ADDRESS "部署地址，因为前端集成时需要它们。


