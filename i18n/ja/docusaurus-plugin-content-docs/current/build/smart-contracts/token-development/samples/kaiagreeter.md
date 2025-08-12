# KaiaGreeter

`KaiaGreeter`は挨拶メッセージを返すシンプルなコントラクトである。 挨拶メッセージは契約展開時に設定されます。

## カイアグリーターの作成<a href="#writing-kaiagreeter" id="writing-kaiagreeter"></a>

```solidity
// SPDX-License-Identifier：MIT

pragma solidity ^0.8.0;

contract KaiaGreeter {
    /* 文字列型の変数greetingを定義 */
    string greeting;
    /* 契約作成時に一度だけ実行 */
    constructor (string memory _greeting) {
        greeting = _greeting;
    }.
    /* メイン関数 */
    function greet() public view returns (string memory) {
        return greeting;
    }.
}
```

## RemixオンラインIDEを使ってKaiaGreeterをデプロイする<a href="#deploying-kaiagreeter-using-kaia-ide" id="deploying-kaiagreeter-using-kaia-ide"></a>

- Kaia Plugin for Remix](https://ide.kaia.io)にアクセスし、\`KaiaGreeter.sol\`コントラクトを作成してください。

- 上記のコードをコピーして、新しく作成したファイルに貼り付ける：KaiaGreeter.sol\`。

    ![](/img/build/smart-contracts/kg-v2-create.png)

- まだテストKAIAをお持ちでない方は、[蛇口](https://faucet.kaia.io)からテストKAIAを入手してください。

- 初期パラメータである挨拶メッセージを持つコントラクトをデプロイする。

- デプロイ後、IDEから`greet`を呼び出すことができる。

    ![](/img/build/smart-contracts/kg-v2-deployed.png)

## 参考文献<a href="#references" id="references"></a>

契約展開の詳細およびRemix Online IDE利用ガイドラインについては、以下のドキュメントをご参照ください。

- [Remix Online IDE](../../../smart-contracts/deployment-and-verification/deploy/deploy.md)