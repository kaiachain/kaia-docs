# Building a survey smart contract using Hardhat

In this section, you will build a smart contract that leverages Semaphore to ensure privacy and accuracy in survey management.

Select the contracts folder in the Explorer pane and update the folder as seen with all the contracts in this [repo](https://github.com/kjeom/ExampleMiniDapp/tree/main/contract/contracts).

Now that you have your contracts created, let’s break down the major dependent contracts. 

## Breakdown SurveyV1 Contract <a id="breakdown-surveyV1-contract"></a> 

Here is a breakdown of its SurveyV1 key elements

### Import dependent contracts <a id="import-dependent-contracts"></a> 

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
// Import survey interface 
import "./ISurvey.sol";
// Import Semaphore contracts for privacy features
import "./semaphore/interfaces/ISemaphore.sol";
```

### Add State Variables, Structs, Events, and Modifier <a id="state-variables"></a>

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

In the code above, we:

- Defined key contract components: 
    - admin state variable: **owner** with withdrawal rights and **manager** with special management permissions. 
    - survey metadata variables: information about basic surveys like **title**, **description**, **reward** etc. 
    - data storage arrays: stores survey **questions** and **options**, submitted **answers** and participant **addresses**. 
    - survey status variable: Tracks survey completion status, records creation timestamp, sets survey expiration time (**finished**, **timestamp**, **lockedUntil**)
    - privacy infra with semaphore: Interface for Semaphore protocol and unique identifier for privacy group. 
- Created **Question** and **Answer** struct to store survey questions and answers respectively. 
- Created events **AnswerSubmitted** which is emitted when a survey answer is submitted 
- Created an access control modifier: **onlyMgr()**

### Implement the Constructor <a id="implement-constructor"></a>

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

In the code above, we implemented the constructor, stored questions/options on-chain, set up administrative control and timeframes, established privacy features through Semaphore protocol, and configured the reward system by burning a portion of the deposited amount and calculating per-response rewards from the remainder.

Next, you will proceed to implement the main functions, starting with a function to submit survey answers. 

### Create SubmitAnswer Function <a id="create-submitanswer-function"></a>

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

In the code snippet above, we:

- Validated response requirements (length matches questions, survey isn't full/expired, no duplicate submissions)
- Converted answers to uint256 and created a zero-knowledge proof using Semaphore protocol for privacy
- Verified each answer is within valid option ranges for questions
- Stored the validated answer in the contract storage
- Transferred reward payment to respondent (msg.sender)
- Updated survey participation records (increment surveyNumber and add respondent address)


### Others: state changing functions, view function and receive function <a id="other-state-changing-functions"></a>

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

In the code snippet above, we implemented a comprehensive survey contract with the following functions:

**View Functions:**
- *getQuestions()*: Returns array of survey questions and options
- *getAnswers()*: Returns array of submitted survey answers
- *remainingSurveys()*: Returns count of responses still needed
- *surveyInfo()*: Returns all survey metadata (title, description, owner, numbers, timestamps, status)

**State-Modifying Functions:**
- *finish()*: Marks survey complete after lock period
- *withdraw()*: Enables owner to withdraw remaining balance
- *joinGroup()*: Adds member to privacy group (manager only)

**Utility Functions:**
- *uint8ArrayToUint256()*: Converts uint8 array to uint256 for privacy proofs
- *receive()*: Fallback function for receiving ETH payments.

## Breakdown of SurveyFactoryV1 Contract <a id="breakdown-surveyFactoryV1-contract"></a>

The SurveyFactory contract serves as a factory pattern implementation for deploying new survey contracts. 

Here's are its core features:

- *initialize()*: Sets up factory with Semaphore and manager addresses
- *createSurvey()*: Deploys new survey contract with validated parameters
- *getSurveys()*: Returns addresses of all deployed surveys
- *getSurveyCount()*: Returns total number of surveys created
- *setBurnRate()*: Allows the owner to modify burn rate.

## Breakdown of ISemaphore.sol Contract <a id="breakdown-isemaphore-contract"></a>

In the ISemaphore interface, we have the following:

**Core Structures:**
- Group: Holds group parameters including merkle tree duration and mappings
- SemaphoreProof: Contains proof parameters (depth, root, nullifier, message, etc.)

**Key Functions:**

1. **Group Management**
    - *createGroup()*: Creates new groups with optional admin and duration
    - *updateGroupAdmin()*: Changes group administrator
    - *acceptGroupAdmin()*: Accepts admin role for group
2. **Member Management**
    - *addMember()*: Adds single member to group
    - *addMembers()*: Adds multiple members at once
    - *updateMember()*: Updates member's identity commitment
    - *removeMember()*: Removes member from group
3. **Proof Validation**
    - validateProof(): Validates zero-knowledge proof and prevents double signaling
    - verifyProof(): Verifies proof validity without state changes
4. **Configuration**
    - *groupCounter()*: Returns total groups created
    - *updateGroupMerkleTreeDuration()*: Updates merkle tree duration
5. **Events**:
    - *GroupMerkleTreeDurationUpdated*: Logs changes to merkle tree duration
    - *ProofValidated*: Logs validated proof details
6. **Error Handling**:
    - Custom errors for invalid proofs, duplicate nullifiers, empty groups, etc.

This interface provides the foundation for privacy-preserving group management and zero-knowledge proof verification in the survey system.

## Deploying the smart contract  <a id="deploying-contract"></a>

In this section we are going to deploy our contracts to a localhost network using [hardhat-deploy](https://github.com/wighawag/hardhat-deploy); a hardhat plugin for replicable deployment and testing. 

Next is to create a new folder called **deploy** in the contract folder and click the New File button to create a new file named **deploy.ts**. Then copy and paste the following code inside the file.

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

You can deploy to localhost network following these steps:

1. Start a [local node](https://hardhat.org/hardhat-runner/docs/getting-started#connecting-a-wallet-or-dapp-to-hardhat-network)

```
npx hardhat node
```

2. Open a new terminal and deploy the contract in the localhost network

```
npx hardhat deploy --network localhost
```

Save the `SURVEY_FACTORY_V1_CONTRACT_ADDRESS` deployed address, as you will need them for frontend integration.


