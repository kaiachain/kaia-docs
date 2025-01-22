# スマートコントラクトのテスト

このセクションでは、スマート・コントラクトのテスト方法を紹介する。 ブロックチェーン上の取引は元に戻せないため、スマート・コントラクトをデプロイする前にテストすることが重要だ。

## トリュフを使ったテスト<a href="#testing-with-truffle" id="testing-with-truffle"></a>

Truffleは自動テストのフレームワークを提供する。 このフレームワークを使うと、シンプルで管理しやすいテストを2種類の方法で書くことができる：

- `Javascript`と`TypeScript`では、アプリケーションと同じように、外界から契約を行使することができる。
- `Solidity`では、前進、ベアトゥザメタル・シナリオで契約を行使する。

### Getting started <a href="#1-getting-started" id="1-getting-started"></a>

ここでは、[Truffleを使用したデプロイメント・ガイド](./deploy/deploy.md#truffle)に従ってコントラクトを作成し、デプロイします。 しかし、デプロイする前に、テストのためにコントラクトにセッター関数 `setGreet` を追加する。 ソースコードを以下に示す。

\*\*注：\*\*テストのため、契約を一部変更しました。

以下は、KaiaGreetingの契約ソースコードです。

```
pragma solidity 0.5.6;

contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KaiaGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;

    /* This runs when the contract is executed */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }

    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }

    /* Newly added function for testing. */
    function setGreet(string memory _greeting) public {
        // only owner can change greeting message
        require(msg.sender == owner, "Only owner is allowed.");
        greeting = _greeting;
    }
}
```

1\)`greet()`関数が "Hello, Kaia "メッセージを正しく返すかどうか、2)`setGreet()`関数が新しい挨拶メッセージを正しく設定し、所有者でないアカウントが挨拶を更新しようとすると元に戻るかどうかをテストする。

最初に、一般的なアサーションのためにChaiアサーション・ライブラリ（またはあなたが使用する別のアサーション・ライブラリ）をインストールし、スマート・コントラクトのアサーションのためにtruffle-assertionsライブラリをインストールします。

```
npm install --save-dev chai truffle-assertions
```

### Writing test in Solidity <a href="#2-writing-test-in-solidity" id="2-writing-test-in-solidity"></a>

Solidity を使用したテストは、JavaScript を使用したテストよりも少し直感的です。 Solidity テスト契約は、JavaScript テストと一緒に .sol ファイルとして保存されます。

`test`フォルダに`TestKaiaGreeting.sol`というファイルを作成する。 Truffleスイートはテスト用のヘルパー・ライブラリを提供しているので、それらをインポートする必要がある。 Solidityテストの例を見てみよう：

```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HashMarket.sol";
```

- Assert ：Assert.equals()`や`Assert.greaterThan()\`など、様々なテスト関数にアクセスできる。
- DeployedAddresses : 契約を変更するたびに、新しいアドレスに再デプロイする必要があります。 このライブラリを通じて、デプロイされた契約アドレスを取得することができる。

では、テストコードを書いてみよう。

```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/KaiaGreeter.sol";

contract TestKaiaGreeter {

    function testGreetingMessage() public {
        // DeployedAddresses.KaiaGreeter() handles contract address.
        KaiaGreeter greeter = KaiaGreeter(DeployedAddresses.KaiaGreeter());

        string memory expectedGreet = "Hello Kaia";

        string memory greet = greeter.greet();

        Assert.equal(greet, expectedGreet, "greeting message should match");
    }
}
```

Solidity テストコードを実行します。

```
$ truffle test
# Output
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./test/TestKaiaGreeter.sol



  TestKaiaGreeter
    1) testGreetingMessage

    Events emitted during test:
    ---------------------------


    ---------------------------


  0 passing (5s)
  1 failing

  1) TestKaiaGreeter
       testGreetingMessage:
     Error: greeting message should match (Tested: Hello, Kaia, Against: Hello Kaia)
      at result.logs.forEach.log (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:71:1)
      at Array.forEach (<anonymous>)
      at processResult (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:69:1)
      at process._tickCallback (internal/process/next_tick.js:68:7)
```

おっと、失敗した。 エラーメッセージ`Error: greeting message should match (Tested: Hello, Kaia, Againstst: Hello Kaia)`を確認してみよう。 文字列メモリ expectedGreet = "Hello Kaia"_.∕
コードを修正して、もう一度テストを実行してください。

```
$ truffle test
# Output
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./test/TestKaiaGreeter.sol



  TestKaiaGreeter
    ✓ testGreetingMessage (58ms)


  1 passing (5s)
```

おめでとう！ テストは合格だ。

### Writing test in JavaScript <a href="#3-writing-test-in-javascript" id="3-writing-test-in-javascript"></a>

Truffle は、[Mocha](https://mochajs.org/) テストフレームワークと [Chai](https://www.chaijs.com/) アサーションライブラリを使用し、JavaScript テストのための強固なフレームワークを提供します。 JavaScriptテストは、より柔軟性があり、より複雑なテストを書くことができる。

それでは、`test`ディレクトリの下に`0_KaiaGreeting.js`という名前のファイルを作ってみよう。

テストコードはこうだ：

```javascript
// Interacting directly with KaiaGreeter contract
const KaiaGreeter = artifacts.require("./KaiaGreeter.sol");
const truffleAssert = require('truffle-assertions');

contract("KaiaGreeter", async(accounts) => {
    // store the contract instance at a higher level 
    // to enable access from all functions.
    var klaytnGreeterInstance;
    var owner = accounts[0];
    var greetMsg = "Hello, Kaia";

    // This will run before each test proceed.
    before(async function() {
        // set contract instance into a variable
        klaytnGreeterInstance = await KaiaGreeter.new(greetMsg, {from:owner});
    })

    it("#1 check Greeting message", async function() {
        // set the expected greeting message
        var expectedGreeting = greetMsg;
        var greet= await klaytnGreeterInstance.greet();
        assert.equal(expectedGreeting, greet, "greeting message should match");
        
    })

    it("#2 update greeting message.", async function() {
        var newGreeting = "Hi, Kaia";
        
        await klaytnGreeterInstance.setGreet(newGreeting, { from:owner });
        var greet = await klaytnGreeterInstance.greet();
        assert.equal(newGreeting, greet, "greeting message should match");
    });

    it("#3 [Failure test] Only owner can change greeting.", async function() {
        var fakeOwner = accounts[1];        
        await truffleAssert.fails(klaytnGreeterInstance.setGreet(greetMsg, { from:fakeOwner }));
    });
});
```

もし `Mocha` ユニットテストに馴染みがなければ、[Mocha ドキュメント](https://mochajs.org/#getting-started) を参照してください。

- describe()`の代わりに `contract()\` を使う。

  構造的には、Truffleのテストコードは通常のMochaのテストコードとあまり変わらないはずです。 テストには、Mocha が自動テストとして認識するコードを含める必要があります。 MochaとTruffleのテストの違いは、contract()関数です。

  **注**：`contract()` 関数と、利用可能な Kaia アカウントを指定するための `accounts` 配列の使用に注意してください。
- テスト内で抽象化を契約する

  Truffle には、テスト中にどのコントラクトとやり取りする必要があるかを検出する手段がないため、コントラクトを明示的に指定する必要があります。 これを行う一つの方法は、`artifacts.require()`メソッドを使うことである。
- `it`構文

  これは各テストケースを説明とともに表している。 説明文はテスト実行時にコンソールに表示される。
- `truffle-assertion`ライブラリ

  このライブラリは `truffleAssert.reverts()` と `truffleAssert.fails()` 関数を提供し、差し戻しやその他の失敗を簡単にテストできるようにします。

出力は以下のようになるはずだ：

```
Using network 'development'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: KaiaGreeter
    ✓ #1 check Greeting message
    ✓ #2 update greeting message. (46ms)
    ✓ #3 [Failure test] Only owner can change greeting.


  3 passing (158ms)
```

おめでとう！ テストは合格だ。

### Specifying test <a href="#4-specifying-test" id="4-specifying-test"></a>

実行するテストファイルを選択できる。

```
truffle test ./test/0_KaiaGreeting.js
```

詳しくは、[Truffle testing](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts)、[Truffle commands](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test)をご覧ください。
