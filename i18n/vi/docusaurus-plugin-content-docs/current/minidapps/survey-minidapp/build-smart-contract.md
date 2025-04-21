# Xây dựng hợp đồng thông minh khảo sát bằng Hardhat

Trong phần này, bạn sẽ xây dựng hợp đồng thông minh tận dụng Semaphore để đảm bảo quyền riêng tư và tính chính xác trong quản lý khảo sát.

Chọn thư mục hợp đồng trong ngăn Explorer và cập nhật thư mục như được thấy với tất cả các hợp đồng trong [repo](https://github.com/kjeom/ExampleMiniDapp/tree/main/contract/contracts).

Bây giờ bạn đã tạo xong hợp đồng, chúng ta hãy phân tích các hợp đồng phụ thuộc chính.

## Khảo sát phân tíchV1 Hợp đồng <a id="breakdown-surveyV1-contract"></a>

Sau đây là phân tích các yếu tố chính của SurveyV1

### Hợp đồng phụ thuộc nhập khẩu <a id="import-dependent-contracts"></a>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
// Import survey interface 
import "./ISurvey.sol";
// Import Semaphore contracts for privacy features
import "./semaphore/interfaces/ISemaphore.sol";
```

### Thêm Biến trạng thái, Cấu trúc, Sự kiện và Trình sửa đổi <a id="state-variables"></a>

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

Trong đoạn mã trên, chúng tôi:

- Xác định các thành phần chính của hợp đồng:
  - biến trạng thái quản trị: **chủ sở hữu** có quyền rút tiền và **người quản lý** có quyền quản lý đặc biệt.
  - biến siêu dữ liệu khảo sát: thông tin về các cuộc khảo sát cơ bản như **tiêu đề**, **mô tả**, **phần thưởng**, v.v.
  - Mảng lưu trữ dữ liệu: lưu trữ **câu hỏi** và **tùy chọn** khảo sát, **câu trả lời** đã gửi và **địa chỉ** của người tham gia.
  - biến trạng thái khảo sát: Theo dõi trạng thái hoàn thành khảo sát, ghi lại dấu thời gian tạo, đặt thời gian hết hạn khảo sát (**hoàn thành**, **dấu thời gian**, **lockedUntil**)
  - cơ sở hạ tầng riêng tư với semaphore: Giao diện cho giao thức Semaphore và mã định danh duy nhất cho nhóm riêng tư.
- Tạo cấu trúc **Câu hỏi** và **Câu trả lời** để lưu trữ các câu hỏi và câu trả lời khảo sát tương ứng.
- Sự kiện đã tạo **AnswerSubmitted** được phát ra khi câu trả lời khảo sát được gửi
- Đã tạo một trình sửa đổi kiểm soát truy cập: **onlyMgr()**

### Triển khai Constructor <a id="implement-constructor"></a>

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

Trong đoạn mã trên, chúng tôi đã triển khai trình xây dựng, lưu trữ các câu hỏi/tùy chọn trên chuỗi, thiết lập kiểm soát quản trị và khung thời gian, thiết lập các tính năng bảo mật thông qua giao thức Semaphore và cấu hình hệ thống phần thưởng bằng cách đốt một phần số tiền đã gửi và tính phần thưởng cho mỗi phản hồi từ phần còn lại.

Tiếp theo, bạn sẽ tiến hành triển khai các chức năng chính, bắt đầu bằng chức năng gửi câu trả lời khảo sát.

### Tạo hàm SubmitAnswer <a id="create-submitanswer-function"></a>

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

Trong đoạn mã trên, chúng tôi:

- Yêu cầu phản hồi đã được xác thực (độ dài phù hợp với câu hỏi, khảo sát chưa đầy đủ/hết hạn, không có nội dung gửi trùng lặp)
- Chuyển đổi câu trả lời thành uint256 và tạo ra bằng chứng không kiến thức bằng giao thức Semaphore để bảo mật
- Đã xác minh mỗi câu trả lời nằm trong phạm vi tùy chọn hợp lệ cho các câu hỏi
- Đã lưu trữ câu trả lời đã xác thực trong kho lưu trữ hợp đồng
- Đã chuyển tiền thưởng cho người trả lời (người gửi tin nhắn)
- Cập nhật hồ sơ tham gia khảo sát (tăng surveyNumber và thêm địa chỉ người trả lời)

### Những cái khác: hàm thay đổi trạng thái, hàm xem và hàm nhận <a id="other-state-changing-functions"></a>

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

Trong đoạn mã trên, chúng tôi đã triển khai một hợp đồng khảo sát toàn diện với các chức năng sau:

**Xem chức năng:**

- _getQuestions()_: Trả về mảng các câu hỏi khảo sát và các tùy chọn
- _getAnswers()_: Trả về mảng các câu trả lời khảo sát đã gửi
- _remainingSurveys()_: Trả về số lượng phản hồi vẫn cần thiết
- _surveyInfo()_: Trả về tất cả siêu dữ liệu khảo sát (tiêu đề, mô tả, chủ sở hữu, số, dấu thời gian, trạng thái)

**Các hàm sửa đổi trạng thái:**

- _finish()_: Khảo sát đánh dấu hoàn tất sau thời gian khóa
- _withdraw()_: Cho phép chủ sở hữu rút số dư còn lại
- _joinGroup()_: Thêm thành viên vào nhóm riêng tư (chỉ dành cho người quản lý)

**Chức năng tiện ích:**

- _uint8ArrayToUint256()_: Chuyển đổi mảng uint8 thành uint256 để chứng minh quyền riêng tư
- _receive()_: Hàm dự phòng để nhận thanh toán ETH.

## Phân tích hợp đồng SurveyFactoryV1 <a id="breakdown-surveyFactoryV1-contract"></a>

Hợp đồng SurveyFactory đóng vai trò là phương pháp triển khai mẫu nhà máy để triển khai các hợp đồng khảo sát mới.

Sau đây là những tính năng cốt lõi của nó:

- _initialize()_: Thiết lập nhà máy với địa chỉ Semaphore và quản lý
- _createSurvey()_: Triển khai hợp đồng khảo sát mới với các tham số đã được xác thực
- _getSurveys()_: Trả về địa chỉ của tất cả các cuộc khảo sát đã triển khai
- _getSurveyCount()_: Trả về tổng số khảo sát đã tạo
- _setBurnRate()_: Cho phép chủ sở hữu thay đổi tốc độ ghi.

## Phân tích hợp đồng ISemaphore.sol <a id="breakdown-isemaphore-contract"></a>

Trong giao diện ISemaphore, chúng ta có những nội dung sau:

**Cấu trúc cốt lõi:**

- Nhóm: Giữ các tham số nhóm bao gồm thời lượng cây Merkle và ánh xạ
- SemaphoreProof: Chứa các tham số chứng minh (độ sâu, gốc, vô hiệu hóa, thông điệp, v.v.)

**Chức năng chính:**

1. **Quản lý nhóm**
  - _createGroup()_: Tạo nhóm mới với tùy chọn quản trị viên và thời hạn
  - _updateGroupAdmin()_: Thay đổi quản trị viên nhóm
  - _acceptGroupAdmin()_: Chấp nhận vai trò quản trị viên cho nhóm
2. **Quản lý thành viên**
  - _addMember()_: Thêm một thành viên vào nhóm
  - _addMembers()_: Thêm nhiều thành viên cùng một lúc
  - _updateMember()_: Cập nhật cam kết danh tính của thành viên
  - _removeMember()_: Xóa thành viên khỏi nhóm
3. **Xác thực bằng chứng**
  - validateProof(): Xác thực bằng chứng không kiến thức và ngăn chặn tín hiệu kép
  - verifyProof(): Xác minh tính hợp lệ của bằng chứng mà không thay đổi trạng thái
4. **Cấu hình**
  - _groupCounter()_: Trả về tổng số nhóm đã tạo
  - _updateGroupMerkleTreeDuration()_: Cập nhật thời lượng của cây Merkle
5. **Sự kiện**:
  - _GroupMerkleTreeDurationUpdated_: Ghi lại những thay đổi về thời lượng của cây Merkle
  - _ProofValidated_: Ghi lại chi tiết bằng chứng đã xác thực
6. **Xử lý lỗi**:
  - Lỗi tùy chỉnh cho các bản in thử không hợp lệ, các phần tử hủy trùng lặp, nhóm trống, v.v.

Giao diện này cung cấp nền tảng cho việc quản lý nhóm đảm bảo quyền riêng tư và xác minh không tiết lộ thông tin trong hệ thống khảo sát.

## Triển khai hợp đồng thông minh  <a id="deploying-contract"></a>

Trong phần này, chúng ta sẽ triển khai hợp đồng của mình lên mạng cục bộ bằng cách sử dụng [hardhat-deploy](https://github.com/wighawag/hardhat-deploy); một plugin hardhat để triển khai và thử nghiệm có thể sao chép.

Tiếp theo là tạo một thư mục mới có tên là **deploy** trong thư mục hợp đồng và nhấp vào nút Tệp mới để tạo một tệp mới có tên là **deploy.ts**. Sau đó sao chép và dán đoạn mã sau vào trong tệp.

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

Bạn có thể triển khai vào mạng cục bộ bằng cách làm theo các bước sau:

1. Bắt đầu một [nút cục bộ](https://hardhat.org/hardhat-runner/docs/getting-started#connecting-a-wallet-or-dapp-to-hardhat-network)

```
npx hardhat node
```

2. Mở một thiết bị đầu cuối mới và triển khai hợp đồng trong mạng cục bộ

```
npx hardhat deploy --network localhost
```

Lưu địa chỉ đã triển khai `SURVEY_FACTORY_V1_CONTRACT_ADDRESS` vì bạn sẽ cần chúng để tích hợp giao diện người dùng.


