# スマート・コントラクト・セキュリティのベスト・プラクティス

このガイドは、スマート・コントラクトのセキュリティのベスト・プラクティスについて、実践的かつ構造的なウォークスルーを提供する。
スマート・コントラクトは、ほとんどのオンチェーン・アプリケーションの動力源となっている。 分散型金融、Play to Earゲーム、現実世界の資産トークン化など、幅広いユースケースの背後にあるロジックを定義し、実施する。

カイアのエコシステムの中で、特にMini dAppsを構築している開発者の間では、これらのアプリの採用と利用が急速に増加している。 しかし、スマートコントラクトを通じて価値が取引されたり、スマートコントラクトにロックされればされるほど、悪意のある行為者を惹きつける可能性が高くなる。 こうした攻撃者は、システムの中核であるスマートコントラクトに焦点を当てることが多い。

このため、スマート・コントラクトのセキュリティは後回しにされてはならない。 それは、開発の初期段階から配備、そして契約との継続的なやりとりに至るまで、優先されるべきものである。

## スマート・コントラクトのセキュリティとは何か？

スマートコントラクトとは、ブロックチェーン上に格納されたプログラムのことで、あらかじめ定義された条件が満たされたときに自動的に実行される。 一旦デプロイされると、そのコードはイミュータブル、つまり変更不可能になる。 この不変性は透明性を確保し、仲介者の必要性を取り除くが、同時に深刻なリスクももたらす。 契約書に脆弱性が含まれている場合、配備後にパッチを当てることができないため、資金が盗まれたり、信頼を失ったりする可能性がある。

スマート・コントラクトのセキュリティとは、これらのコントラクトを悪意のある攻撃やプログラミングの欠陥から保護するために使用される一連の慣行と対策を指す。 しっかりと保護された契約は、不正アクセス、データ操作、金銭的損失を防ぎ、プロトコルの完全性を保護します。

## なぜスマート・コントラクトのセキュリティが重要なのか？

スマート・コントラクトはデプロイ後、不変であるため、バグや脆弱性は永久的なものとなる。 悪意のある行為者は、こうした弱点を悪用して資金を流出させたり、プロトコルの動作を操作したりすることができる。 多くの場合、コードのたったひとつの間違いが、何百万ドルもの損失につながる。

DeFiLlamaによると、2025年6月現在、分散型金融攻撃で盗まれた総額は66億ドルにのぼるという。 このうち、スマート・コントラクトの悪用は約33億ドルで、約51％を占める。 これらの数字は、スマート・コントラクトのセキュリティがどのようなオンチェーン・プロトコルにとってもいかに不可欠であるかを浮き彫りにしている。

## 安全なスマート・コントラクトを書くためのベスト・プラクティス

### ‍1. 十分にテストされた安全なライブラリや関数を使用する。

‍
スマートコントラクトに外部依存性を使用することは、依存性が適切にテストまたはレビューされない場合、悪意のあるコードを引き起こす可能性があります。 このリスクを減らすには、常に[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master)のような、よくテストされ、広く信頼されているライブラリに頼ってください。

さらに、サードパーティのコードを契約に組み込む前に、徹底的なレビューを行うこと。 外部コードをテストしレビューすることで、そのコードに隠れた脆弱性が含まれていなかったり、あなたのプロトコルに予期せぬ動作を導入していなかったりすることを確実にすることができます。

### 2. 開発セキュリティパターンの実装

セキュリティ・パターンとは、リエントランシーのような既知の攻撃ベクトルから防御するための標準化された技術である。 これらは、脆弱性を未然に防ぐための、信頼性が高く、広く受け入れられているアプローチを提供する。 これらのパターンをコードに組み込むことで、コードの耐性を向上させ、悪用されるリスクを減らすことができる。
以下に、考慮すべき必須のセキュリティ・パターンをいくつか挙げる：

#### 2.1 CEIパターン（チェック-効果-相互作用）

CEIパターンは、外部とのやりとりが行われる前に、必要な検証がすべて完了していることを保証するのに役立つ。 この構造により、スマート・コントラクトの実行中に予期せぬ動作や悪意のある動作が発生する可能性が低くなる。

CEIパターンが正しく実装されている場合、この順序に従う：

 - チェック：必要な条件がすべて満たされていることを確認する（たとえば、利用者の残高が十分であることを確認する）。
 - 効果コントラクトの内部状態を更新する（ユーザーの残高を減らすなど）。
 - 対話：資金を送金したり、外部契約を呼び出したりする。

この構造に従うことで、リエントランシー攻撃のリスクを大幅に減らすことができる。

例えば、以下の例は残高を更新する前にユーザーにイーサを送信しているため、脆弱である。

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

上記のコードはリエントランシー攻撃に対して脆弱であり、悪意のある行為者は残高が更新される前に引き出し関数を繰り返し呼び出すことができる。 CEIパターンは、外部呼び出しが行われる前にコントラクトの状態が更新されるようにすることで、これを防ぐのに役立つ。

以下は、CEIパターンに従った上記のコードの更新版である：

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

CEIのパターンを踏襲した更新版では、トークンが譲渡される前に残高が調整される。 こうすれば、ユーザーが再入力を試みても、すでに残高が減っているため、呼び出しは失敗する。

#### 2.2. 緊急停止パターン

‍
緊急停止パターンは、しばしばサーキットブレーカーと呼ばれ、緊急時にスマートコントラクトの選択した機能を一時停止できるようにする。 脆弱性や予期せぬ動作が検出された場合、重要なオペレーションを迅速に無効にする方法を提供する。

このような問題が発生しないように契約を積極的に監視するには、このような目的のためにカスタマイズされた監視ツールやボットを使用することができます。 これらのボットは、特定の取引パターンや契約状態の異常な変化をスキャンし、潜在的な脅威にフラグを立てる。

以下は、サーキット・ブレーカーの仕組みを契約に導入する方法を示す例である：

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

#### 2.3. スピード・バンプ・パターン

Speed Bumpパターンは、引き出しやガバナンスの決定など、重要なオンチェーン・アクションを実行する前に遅延時間を導入する。 この遅延は保護措置として機能し、ユーザーまたは管理者が不審な活動を検知して対応する時間を与える。

例えば、一定の待機期間や最大引き出し額を設定することで、引き出しを制限することができる。 これにより、不正アクセスや悪意ある行為による急激な資金枯渇を防ぐことができる。

以下のサンプルは、ユーザーが資金を引き出す前に5日間の待機を強制することで、このパターンがどのように機能するかを示している。

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

### 3. Solidityコンパイラの最新バージョンを使用する

‍
常に最新バージョンの Solidity コンパイラを使用してください。 新しいバージョンには、重要なセキュリティ修正や言語の改良が含まれていることが多い。 例えば、Solidityバージョン0.8.x以上では、以前はスマートコントラクトで一般的な脆弱性であった算術オーバーフローとアンダーフローに対する組み込みの保護が導入されました。

常に最新の状態に保つことで、あなたのコードが最新のセキュリティ機能やコンパイラ・チェックの恩恵を受けられるようになる。

### 4. スマートコントラクトをシンプルに

‍
安全なスマート・コントラクトを書く上で、シンプルであることは重要な原則である。 複雑なロジックは、しばしば不必要なリスクや隠れた脆弱性をもたらす。 契約コードや契約構成は、できるだけシンプルで明確なものにするのがベストだ。 複雑さが避けられない場合は、ロジックをより小さな関数に分解し、それぞれに特定の目的を持たせる。

### 5. 模擬環境でスマートコントラクトをテストする

‍
スマートコントラクトをライブネットワークにデプロイする前に、必ずKairos Testnetのようなシミュレート環境で実行してください。 このように管理された環境でテストを行うことで、さまざまな条件やエッジケースのもとで契約がどのように動作するかを厳密に評価することができる。
このプロセスは、脆弱性を発見し、期待される動作を確認し、全体的な信頼性を向上させるのに役立つ。 また、資金損失やシステム障害につながるような欠陥のあるロジックを展開するリスクも軽減される。

以下は、スマート・コントラクトを検証するために推奨されるテスト方法です：

#### 5.1 単体テスト

‍
ユニットテストは、スマートコントラクト内の個々の関数を評価することに重点を置く。 ユニットテストを効果的に行うには、コントラクトを、単体でテストできる小さな単一目的の関数に構造化する必要がある。

一般的なアプローチは、アサーション（関数の期待される動作を記述する明確な文）を使用することである。 そして、その主張が異なる条件下でも正しいかどうかを検証する。 ユニットテストは、開発プロセスの早い段階で問題を特定し、修正するのに役立つため、統合テストの前に必ず実施すべきである。

#### 5.2. 統合テスト

‍
統合テストは、契約のさまざまなコンポーネントがどのように連動するかを評価します。 これには、関数、外部コントラクト、APIなどのシステム間の相互作用のチェックが含まれる。
この種のテストは、契約間の呼び出し、依存関係、継承された機能に関する問題を特定するために不可欠である。 個々の部品が組み合わされたときに正しく機能し、契約がより広いシステム・コンテキストの中で期待通りに機能することを保証する。

#### 5.3. ファズテスト

‍
ファズテストでは、契約書にランダムまたは極端な入力値を渡して、その動作を観察します。 この手法は、単体テストや統合テストでは明らかにならない脆弱性を発見するのに役立つ。

契約書に数学的操作や入力検証ロジックが含まれている場合、ファジングは特に価値がある。 これにより、コードをストレステストし、一般的でない条件下での予期せぬ動作を特定することができる。

### 6. スマート・コントラクト監査の実施

‍
監査とは、脆弱性、バグ、設計上の欠陥を特定するために、独立した チームが契約書のコードを構造的にレビューすることである。 このプロセスにより、デプロイ前のスマート・コントラクトの安全性と信頼性がさらに高まります。

典型的な監査には以下が含まれる：

 - 徹底的な手作業によるコードの見直し
 - 既知の脆弱性の自動スキャン
 - 契約の動作を検証するテスト
 - 特定された問題点と改善案をまとめた詳細な報告書

監査は、エクスプロイトのリスクを減らし、スマート・コントラクトが本稼働前にセキュリティ基準を満たしていることを確認するのに役立つ。

### 7. フェイルセーフ機構の搭載

セキュリティー上、特に新規契約を扱う場合は、信頼性の高いフェイルセーフ・アプローチを含めることが重要である。 これにより、何か問題が発生した場合に迅速に対応することができる。 以下は、検討すべきいくつかの戦略である：

 - **アップグレード可能性**：契約が将来のアップグレードに対応していることを確認してください。 これにより、契約全体を交換することなく、バグを修正したり、新機能を導入したりすることが可能になる。
 - **Decentralized Control**：コントロールを一箇所に集中させない。 マルチシグネチャウォレットを使用し、重要なアクションには複数の当事者からの確認が必要になるようにする。
 - **タイムロック**：重要なアクションを実行する前に遅延を追加します。 これにより、チームまたはより広範なコミュニティが取引を確認し、必要に応じて対応する時間が与えられる。

## 結論

セキュリティは決して後回しにされるべきではない。 開発から生産に至るまで、ソフトウェア開発プロセスのあらゆる段階で不可欠なものでなければならない。 開発者はスマート・コントラクトを扱う際、セキュリティ第一の考え方を採用する必要がある。

常に起こりうる失敗に備え、変更を慎重に展開し、エコシステムのアップデートについて常に情報を入手し、EVMの特殊性を理解し、契約をできるだけシンプルに保つ。 上記のベストプラクティスに従うことで、リスクを大幅に減らし、スマートコントラクトの信頼性を向上させることができる。

