# ERC-20

## 概要<a id="overview"></a>

カイアでのカンジタブルトークンの作成は、イーサリアムでの作成方法と同様のステップを踏み、[ERC20 standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20)を使用します。

標準に従うには、以下のイベントと関数を実装したコントラクトをデプロイする：

```solidity
function name() public view returns (string) //optional
function symbol() public view returns (string) //optional
function decimals() public view returns (uint8) //optional
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

- \*\*トークンの名前を返すメソッド：トークンの名前を返すメソッド。
- **symbol**：トークンのシンボルを返すメソッド。
- **decimals**：トークンが使用する小数の数を返すメソッド。 トークンの最小単位を定義するために使用される。 例えば、ERC-20トークンの小数点以下が18の場合、トークンは小数点以下18桁まで分割できることを意味する。
- **totalSupply**：この上限に達すると、スマートコントラクトは新しいトークンの生成を拒否します。
- **balanceOf**：ウォレットアドレスが持っているトークンの数を返すメソッド。
- **転送**：総供給量から一定量のトークンを取り出し、ユーザーに渡すメソッド。
- **transferFrom**：ユーザー間でトークンを転送するために使用される、別のタイプの転送メソッド。
- **approve**：このメソッドは、総供給量を考慮して、スマートコントラクトがユーザーに一定量のトークンを割り当てることが許可されているかどうかを検証する。
- **許可**：このメソッドはapprovedメソッドと全く同じであるが、あるユーザが他のユーザに一定量のトークンを送信するのに十分な残高があるかどうかをチェックする点が異なる。
- **転送イベント**：トークンが転送されたときに発行される。
- **承認イベント**：トークンの承認があったときに発行される。

## はじめに<a id="getting-started"></a>

このセクションでは、Remix Online IDEを使用してERC20トークンコントラクトを作成し、デプロイします。 異なるチームによって開発されたERC20準拠トークンの実装がいくつかあり、それぞれがいくつかの要素を考慮して開発されている。 簡単かつ安全にトークンを作成するために、[OpenZeppelin ERC-20](https://docs.openzeppelin.com/contracts/5.x/erc20)コントラクトを使用します。 OpenZeppelinを使えば、ERC-20のインターフェイスをすべて書く必要はない。 その代わりに、ライブラリーのコントラクトをインポートして、その関数を使うことができる。

### ステップ1：ERC20トークンコントラクトの作成<a id="create-erc20-token-contract"></a>

**OpenZeppelin契約ウィザード**」。

- OpenZeppelin契約ウィザード](https://wizard.openzeppelin.com)を開く
- ERC20\*\*を選択してください。
- トークンに **名前** と **シンボル** を指定します。 例えばそれぞれ_Greek_と_GK_。
- Premint\*\*フィールドで、10,000に設定する。 これにより、デプロイメントのためのトークンの初期量が作成される。
- Features\*\*セクションで、Mintableボックスをチェックし、特権アカウント（onlyOwner）がより多くのサプライを作成できるようにする。
- コピー\*\*アイコンをクリックして、次のセクションのRemixで使用するコードをコピーしてください。

![](/img/build/smart-contracts/oz-erc20-setup.png)

### ステップ2：ERC20トークンコントラクトの導入<a id="deploy-erc20-token-contract"></a>

**リミックス IDE**

- Remix](https://remix.ethereum.org)で、\*\*File Explorer\*\*に移動し、contractsフォルダに`Greek.sol`という名前の新しいファイルを作成します。
- Solidity Compiler\*\* タブに移動し、**Compile Greek.sol** をクリックしてトークン契約をコンパイルします。
- トランザクションのデプロイと実行\*\*タブに移動する。
- 環境\*\* > **注入プロバイダ** > **メタマスク** を選択します。
- 契約\*\*のドロップダウンで、契約を選択します。 例えば、_ギリシャ語_。
- Deploy\*\*フィールドに、recipientとinitialOwnerのコンストラクタ引数を指定する。
- Deploy/transact\*\*をクリックする。

![](/img/build/smart-contracts/remix-erc20-deploy.png)

デプロイ後、コントラクトのデプロイに使用したアカウントで **balanceOf** を呼び出すことができます。 以下のように、アカウントに10000000000000000トークンがあることがわかります。

上記のコントラクトをデプロイする際に10進数を18に設定したため、コンストラクタで10000トークンが固定数で鋳造され、1トークンは10進数で10^18の値を持つ。 TotalSupply メソッドは、鋳造されたトークンの総供給量を返します。

![](/img/build/smart-contracts/remix-erc20-bal-totalsupply.png)

### ステップ3：MetaMaskのERC-20トークンとのやりとり<a id="interact-with-erc20-token-from-MetaMask"></a>

MetaMaskを使って残高を確認し、配備したばかりのERC-20互換のギリシャ・トークンを送金することができる。 MetaMaskでトークン残高を確認するには、以下の手順に従ってください：

\*\*メタマスク

- メタマスクを開く
- 右端の**Ellipsis**アイコンをクリックし、**Import tokens**をクリックします。

![](/img/build/smart-contracts/mm-import-tokens-e20g.png)

- また、**Token contract address**欄に最近導入されたギリシャの契約アドレスを貼り付けてください。

![](/img/build/smart-contracts/mm-custom-tokens-e20g.png)

- 最後のステップとして、**インポート**をクリックします。

![](/img/build/smart-contracts/mm-custom-tokens-imported-e20g.png)

完了すると、次のようなメッセージのモーダルが表示されます：「トークンがインポートされました：というメッセージが表示され、インポートされたトークン (GK) が MetaMask ウォレットのトークン一覧に追加されます。

