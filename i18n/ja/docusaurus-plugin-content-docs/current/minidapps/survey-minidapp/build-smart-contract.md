# Hardhatを使用した調査スマート・コントラクトの構築

このセクションでは、Semaphoreを活用して、プライバシーと調査管理の正確性を確保するスマートコントラクトを構築します。

エクスプローラーペインでcontractsフォルダを選択し、この[repo](https://github.com/kjeom/ExampleMiniDapp/tree/main/contract/contracts)内のすべてのcontractsで見たようにフォルダを更新します。

契約書を作成したところで、依存する主な契約書を分解してみよう。

## 内訳調査V1 契約<a id="breakdown-surveyV1-contract"></a>

SurveyV1の主要な要素の内訳は以下の通りである。

### 輸入依存契約<a id="import-dependent-contracts"></a>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
// Import survey interface 
import "./ISurvey.sol";
// Import Semaphore contracts for privacy features
import "./semaphore/interfaces/ISemaphore.sol";
```

### ステート変数、構造体、イベント、モディファイアの追加<a id="state-variables"></a>

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

上のコードでは

- 契約の主要な構成要素を定義：
  - admin 状態変数：引き出し権限を持つ**owner**と、特別な管理権限を持つ**manager**である。
  - アンケートのメタデータ変数： **タイトル**、**説明**、**報酬** などの基本的なアンケートに関する情報。
  - データストレージアレイ：アンケートの**質問**と**選択肢**、提出された**回答**、および参加者の**アドレス**を格納します。
  - アンケートステータス変数：アンケートの完了ステータスを追跡、作成タイムスタンプを記録、アンケートの有効期限を設定 (**finished**、**timestamp**、**lockedUntil**)
  - セマフォによるプライバシー・インフラストラクチャ：セマフォプロトコルのインターフェイスとプライバシーグループの一意な識別子。
- アンケートの質問と回答をそれぞれ格納する **Question** 構造体と **Answer** 構造体を作成しました。
- アンケートの回答が送信されたときに発行されるイベント **AnswerSubmitted** を作成しました。
- アクセス制御モディファイアを作成しました：\*\*onlyMgr()\*\*を作成した。

### コンストラクタの実装<a id="implement-constructor"></a>

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

上記のコードでは、コンストラクタを実装し、質問/選択肢をオンチェーンに保存し、管理コントロールと時間枠を設定し、セマフォ・プロトコルを介してプライバシー機能を確立し、入金額の一部を燃やし、残額から回答ごとの報酬を計算する報酬システムを設定した。

次に、アンケートの回答を送信する機能から始めて、主な機能を実装していきます。

### SubmitAnswer関数の作成<a id="create-submitanswer-function"></a>

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

上のコード・スニペットでは、次のようにしている：

- 有効な回答要件（質問の長さが一致している、アンケートが満杯/期限切れでない、重複投稿がない）
- 答えをuint256に変換し、プライバシーのためにセマフォ・プロトコルを使ってゼロ知識証明を作成した。
- 各回答が設問の有効な選択肢の範囲内であることを確認
- 検証済みの回答を契約ストレージに保存
- 謝礼金を回答者に送金（msg.sender）
- アンケート参加記録の更新 (SurveyNumber のインクリメントと回答者の住所の追加)

### その他：状態変化機能、ビュー機能、レシーブ機能<a id="other-state-changing-functions"></a>

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

上のコード・スニペットでは、以下の機能を持つ包括的な調査契約を実装している：

\*\*機能を見る

- _getQuestions()_：アンケートの質問とオプションの配列を返す
- _getAnswers()_：送信されたアンケートの回答の配列を返します。
- _remainingSurveys()_：まだ必要な回答の数を返します
- _surveyInfo()_：すべての調査のメタデータ（タイトル、説明、所有者、番号、タイムスタンプ、ステータス）を返します。

**状態変更関数：**\*」。

- _finish()_：ロック期間終了後、調査が完了したことを示す
- _withdraw()_：オーナーが残金を引き出せるようにする
- _joinGroup()_：プライバシー・グループにメンバーを追加する (管理者のみ)

**ユーティリティ機能：**\*

- _uint8ArrayToUint256()_：プライバシー証明のために uint8 配列を uint256 に変換する。
- _receive()_：ETH支払いを受け取るためのフォールバック関数。

## SurveyFactoryV1 契約の内訳<a id="breakdown-surveyFactoryV1-contract"></a>

SurveyFactory コントラクトは、新しい調査コントラクトをデプロイするためのファクトリーパターンの実装として機能します。

その主な特徴は以下の通りだ：

- _initialize()_：セマフォとマネージャーのアドレスでファクトリーをセットアップする。
- _createSurvey()_：有効なパラメータを持つ新しい調査契約を展開します。
- _getSurveys()_：配置されているすべてのアンケートのアドレスを返します。
- _getSurveyCount()_：作成されたアンケートの総数を返します。
- _setBurnRate()_：オーナーが燃焼速度を変更できるようにします。

## ISemaphore.sol契約の内訳<a id="breakdown-isemaphore-contract"></a>

ISemaphoreインターフェイスでは、次のようになっている：

\*\*コア構造

- グループ：メルクルツリーの期間とマッピングを含むグループパラメータを保持する。
- SemaphoreProof：証明パラメータ（深さ、ルート、ヌリファイア、メッセージなど）を含む。

\*\*主な機能

1. \*\*グループ経営
   - _createGroup()_：新しいグループを作成します。
   - _updateGroupAdmin()_：グループ管理者を変更する
   - _acceptGroupAdmin()_：グループの管理者ロールを受け入れる
2. \*\*会員管理
   - _addMember()_：単一のメンバーをグループに追加する
   - _addMembers()_：複数のメンバーを一度に追加する
   - _updateMember()_：メンバーのIDコミットメントを更新する
   - _removeMember()_：グループからメンバーを削除する
3. \*\*プルーフ・バリデーション
   - validateProof()：ゼロ知識証明を検証し、二重シグナリングを防ぐ
   - verifyProof()：状態を変更せずに証明の有効性を検証する
4. \*\*コンフィギュレーション
   - _groupCounter()_：作成されたグループの総数を返す
   - _updateGroupMerkleTreeDuration()_：メルクルツリーの期間を更新
5. \*\*イベント
   - _GroupMerkleTreeDurationUpdated_：merkleツリーの期間の変更をログに記録
   - _ProofValidated_：有効な証明の詳細をログに記録
6. **エラー処理**：
   - 無効な証明、重複したヌリファイアー、空のグループなどに対するカスタム・エラー。

このインターフェイスは、調査システムにおいてプライバシーを保持したグループ管理とゼロ知識証明検証の基盤を提供する。

## スマートコントラクトの導入 <a id="deploying-contract"></a>

このセクションでは、[hardhat-deploy](https://github.com/wighawag/hardhat-deploy) を使って、コントラクトをlocalhostネットワークにデプロイします。hardhatプラグインは、複製可能なデプロイとテストを可能にします。

次に、contractフォルダの中に**deploy**という新しいフォルダを作成し、New Fileボタンをクリックして**deploy.ts**という新しいファイルを作成します。 次に、以下のコードをコピーしてファイル内に貼り付ける。

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

以下の手順に従って、localhostネットワークにデプロイすることができます：

1. ローカルノード](https://hardhat.org/hardhat-runner/docs/getting-started#connecting-a-wallet-or-dapp-to-hardhat-network)を開始する。

```
npx hardhat node
```

2. 新しいターミナルを開き、localhostネットワークに契約を展開する。

```
npx hardhat deploy --network localhost
```

SURVEY_FACTORY_V1_CONTRACT_ADDRESS\`のデプロイ済みアドレスを保存します。


