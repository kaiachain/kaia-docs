# KaiaGreeter

`KaiaGreeter`は挨拶メッセージを返すシンプルなコントラクトである。 挨拶メッセージは契約展開時に設定されます。

## カイアグリーターの作成<a href="#writing-kaiagreeter" id="writing-kaiagreeter"></a>

```
pragma solidity 0.5.6;
contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public { if (msg.sender == owner) selfdestruct(owner); }
}

contract KaiaGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs once when the contract is created */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## RemixオンラインIDEを使ってKaiaGreeterをデプロイする<a href="#deploying-kaiagreeter-using-kaia-ide" id="deploying-kaiagreeter-using-kaia-ide"></a>

- [Kaia Plugin for Remix](https://ide.kaia.io)にアクセスし、`KaiaGreeter`契約を作成してください。 完全なソースコードは上記の通り。
- 契約を展開するために使用するアカウントを準備します。
  - まだアカウントをお持ちでない方は、[https://toolkit.kaia.io/account/accountKeyLegacy](https://toolkit.kaia.io/account/accountKeyLegacy)からアカウントを作成してください。
  - FaucetからKAIAを試す - [https://kairos.wallet.kaia.io/faucet](https://kairos.wallet.kaia.io/faucet)
- 初期パラメータである挨拶メッセージを持つコントラクトをデプロイする。
- デプロイ後、IDEから`greet`を呼び出すことができる。

## 参考文献<a href="#references" id="references"></a>

契約展開の詳細およびRemix Online IDE利用ガイドラインについては、以下のドキュメントをご参照ください。

- [Remix Online IDE](../../smart-contracts/ide-and-tools/ide-and-tools.md#kaia-ide)
- [デプロイガイド](../deploy/deploy.md)