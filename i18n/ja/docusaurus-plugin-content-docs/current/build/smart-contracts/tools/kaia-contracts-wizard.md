# Kaia Contracts Wizard

![](/img/banners/kaia-kcw.png)

## はじめに

カイアは、シームレスな開発者体験を提供することを優先しており、これがカイア・コントラクト・ウィザード（KCW）創設の原動力となっています。 In essence, it simplifies the process of developing smart contracts by leveraging the components of Kaia contracts. KCWは、スマートコントラクトを簡単にブートストラップし、[Kaia Contracts](https://github.com/kaiachain/kaia-contracts)で利用可能な安全でテスト済みのコンポーネントを利用するためのインタラクティブなツールとして機能します。 要するに、Kaiaコントラクトのコンポーネントを活用することで、スマートコントラクトの開発プロセスを簡素化します。 Kaiaコントラクト・ウィザードがOpenZeppelinウィザードの基礎の上に構築されており、スマート・コントラクト開発のセキュリティをさらに強化していることは注目に値する。

このガイドでは、次のことを学ぶ：

- カイヤコントラクトウィザードの基本機能を理解する。
- Kaiaコントラクトウィザードを使用してスマートコントラクトコードを生成し、カスタマイズします。
- Foundry Scripting Systemを使用して、KaiaコントラクトをKaia Network (Kairos)にデプロイする。

## カイアのコントラクトウィザードを探る

Kaiaコントラクトウィザードは、Kaiaコントラクトを使用してスマートコントラクトを記述する最も速く簡単な方法です。 このセクションでは、カイア・コントラクト・ウィザードの様々なコンポーネントとセグメントについて説明します。

現状では、カイアのコントラクトウィザードは以下のトークン標準をサポートしています：

- [KIP-7](https://kips.kaia.io/KIPs/kip-7) - カイアのFungibleトークン規格。 Fungibleとは、すべてのトークンが分割可能で交換可能、つまり同じ価値を持つことを意味する。 カジタブル・トークンの典型的な例のひとつがフィアット通過で、同額紙幣はそれぞれ同じ価値を持つ。
- [KIP-17](https://kips.kaia.io/KIPs/kip-17) - これはカイアのNon-fungibleトークン規格である。 Non-fungibleとは、各トークンが分割不可能であり、したがって一意であることを意味する。 KIP17トークンは、写真、ゲーム内のアイテム、不動産など、物理的な所有物であれ、仮想的な収集物であれ、ユニークなアイテムの所有権を表すことができる。 Non-fungibleとは、各トークンが分割不可能であり、したがって一意であることを意味する。 KIP17トークンは、写真、ゲーム内のアイテム、不動産など、物理的な所有物であれ、仮想的な収集物であれ、ユニークなアイテムの所有権を表すことができる。
- [KIP-37](https://kips.kaia.io/KIPs/kip-37) - これはKaiaのマルチ・トークン標準として知られている。なぜなら、1つのスマート・コントラクトでfungibleトークンとNon-fungibleトークンの両方を表現できるからだ。

[Ethereum Equivalence](https://medium.com/klaytn/toward-ethereum-equivalence-1-introducing-klaytn-v1-8-0-971911be7ff9)のサポートに伴い、Kaiaコントラクトウィザードは[ERC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)、[ERC721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)、[ERC1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)もサポートしています。

カイアコントラクトウィザードは以下のセクションで構成されています：

- **トークン標準セクション**：このタブは、カイアのコントラクトウィザードでサポートされているすべての異なるトークン標準から構成されています。

- **設定セクション**：このセクションでは、トークン名、シンボル、プレミント（コントラクトがデプロイされたときにトークンが供給される）、URI（Non-fungibleトークンの場合）など、各トークン標準の事前設定を提供します。

- **特徴セクション**：各トークン規格で利用可能なすべての特徴から構成されています。 各トークンで利用可能なさまざまなエクステンションの詳細については、以下のリンクを参照してください： 各トークンで利用可能なさまざまなエクステンションの詳細については、以下のリンクを参照してください：

  - [KIP7](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP7/extensions)
  - [KIP17](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP17/extensions)
  - [KIP37](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP37/extensions)

- **アクセス制御セクション**：各トークン規格で利用可能なすべてのアクセス制御メカニズムから構成される。

- **インタラクティブ・コード表示セクション**：ユーザーが設定したコンフィギュレーションで生成されたスマート・コントラクト・コードが表示されます。

![](/img/build/tools/kcw-image.png)

カイアのコントラクトウィザードの様々な部分を探索した後、ご希望のコントラクトの種類を選択し（現在サポートされているのは、**KIP7**、**KIP17**、**KIP37**、**ERC20**、**ERC721**、**ERC1155**、**Governor**、およびカスタムコントラクト）、パラメータとご希望の機能（トークン名、シンボル、プレミント量、アクセス制御など）を設定すると、コントラクトウィザードが必要なコードをすべて生成します。 こうして生成されたコードは、すぐにコンパイルしてデプロイすることもできるし、出発点として利用し、アプリケーション固有のロジックでさらにカスタマイズすることもできる。 こうして生成されたコードは、すぐにコンパイルしてデプロイすることもできるし、出発点として利用し、アプリケーション固有のロジックでさらにカスタマイズすることもできる。

## カイアネットワーク上でのカイアコントラクトのカスタマイズとデプロイ

このセクションでは、Kaiaコントラクトウィザードから生成されたコードを、Foundryを使用してKaia Testnet Kairosにデプロイします。 このセクションでは、Kaiaコントラクトウィザードから生成されたコードを、Foundryを使用してKaia Testnet Kairosにデプロイします。 生成されたコードは出発点となり、KIP7とKIP17トークンのエアドロップ契約に合わせてさらにカスタマイズされる。  もう一方では、KIP37用に生成されたコードがそのまま使われる。  もう一方では、KIP37用に生成されたコードがそのまま使われる。

始めよう！

### 前提条件

このチュートリアルに沿って進むために、前提条件を以下に示します：

- 必ず[foundry](https://book.getfoundry.sh/getting-started/installation)をインストールしてください。
- kaia-foundry-starterkit](https://github.com/ayo-klaytn/kaia-foundry-starterkit)のコードをクローンする。
- [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask)：コントラクトのデプロイ、トランザクションへの署名、コントラクトとの対話に使用される。
- RPCエンドポイント：サポートされている[エンドポイント・プロバイダー](../../../references/public-en.md)の1つから取得できます。
- [Faucet](https://faucet.kaia.io)からKAIAをテスト: 口座に十分なKAIAを入金してください。

### はじめに

このガイドでは、KIP7とKIP17トークン標準のエアドロップ契約の簡単な実装方法を説明します。 エアドロップ契約では、プロジェクトの作成者は、各トークンをウォレットの特定の選択に直接鋳造します。 次のセクションでは、それぞれのトークン・エアードロップ・コントラクトをカスタマイズし、デプロイする方法を見ていきます。 エアドロップ契約では、プロジェクトの作成者は、各トークンをウォレットの特定の選択に直接鋳造します。 次のセクションでは、それぞれのトークン・エアードロップ・コントラクトをカスタマイズし、デプロイする方法を見ていきます。

### トークンコントラクトのカスタマイズ

\*\*KIP7契約をKIP7 Airdrop契約にカスタマイズする。

エアドロップ契約に変更する前に、KIP7契約をカスタマイズする必要があります。 そのためには、以下の手順に従ってください： そのためには、以下の手順に従ってください：

1. wizard.kaia.io](https://wizard.kaia.io) に移動します。
2. **契約**タブで**KIP7**を選択する。
3. 次に、**SETTINGS**タブに名前(KIP7 Token Airdrop)とシンボル(KTA)を入力します。 プレミントの欄は空のまま プレミントの欄は空のまま
4. その後、**FEATURES**タブで**Mintable**機能にチェックを入れると、自動的に**ACCESS CONTROL**タブでOwnable機能が選択されます。

これらの設定を行った後のカイアの契約ウィザードはこのようになる：

![](/img/build/tools/kip7-kcw.png)

以下は生成されたコードである：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
import "@kaiachain/contracts/access/Ownable.sol";
contract KIP7TokenAirdrop is KIP7, Ownable {
    constructor() KIP7("KIP7 Token Airdrop", "KTA") {}
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

次にすることは、上記のコードをエアドロップの実装に合うように修正することだ：

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
import "@kaiachain/contracts/access/Ownable.sol";
contract KIP7TokenAirdrop is KIP7, Ownable {
    constructor() KIP7("KIP7 Token Airdrop", "KTA") {
    }
    // airdrop fungible token
    function airdropTokens(address[] calldata wAddresses, uint[] calldata tAmount) public onlyOwner {
        require(wAddresses.length == tAmount.length, "Must be same lenght");
        for (uint256 i = 0; i < wAddresses.length; i++) {
            _mintSingleTokens(wAddresses[i], tAmount[i]);
        }
    }
    function _mintSingleTokens(address wAddress, uint amount) private {
        _mint(wAddress, amount);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }
}
```

上で修正したコードから、`airdropTokens()`という新しい関数を追加したことがわかります。 この関数は特定の選択されたアドレスにトークンをミン トし、コントラクトの作成者である`onlyOwner`によってのみ呼び出される。 この関数は特定の選択されたアドレスにトークンをミン トし、コントラクトの作成者である`onlyOwner`によってのみ呼び出される。

その後、_public_ **mint()** _onlyOwner_ 関数を **_mintSingleTokens()** private に変更しました。

KIP7エアドロップ契約コードの準備ができたので、次のステップは、プロジェクトディレクトリのsrcフォルダにairdropKIP7.solという名前の新しいファイルを作成し、修正したコードをそのファイルに貼り付けることです。

\*\*KIP17契約をKIP17 Airdrop契約にカスタマイズする。

エアドロップ契約に変更する前に、KIP17契約をカスタマイズする必要があります。 そのためには、以下の手順に従ってください： そのためには、以下の手順に従ってください：

1. wizard.kaia.io](https://wizard.kaia.io/) に移動します。
2. **契約**タブで**KIP17**を選択する。
3. 次に、**SETTINGS**タブに名前（KIP7 NFT Airdrop）と記号（KNA）を記入する。  Base URIフィールドは空のままにしておく。
4. 続いて、**FEATURES** タブで、**Mintable**、**Auto-increment Ids**、**Enumerable** の各機能にチェックを入れます。 **ACCESS CONTROL**タブのOwnable機能が自動的に選択されていることがわかります。 **ACCESS CONTROL**タブのOwnable機能が自動的に選択されていることがわかります。

これらの設定を行った後のカイアの契約ウィザードはこのようになる：

![](/img/build/tools/kip17-kcw.png)

以下は生成されたコードである：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP17/KIP17.sol";
import "@kaiachain/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
import "@kaiachain/contracts/access/Ownable.sol";
import "@kaiachain/contracts/utils/Counters.sol";
contract KIP17NFTAirdrop is KIP17, KIP17Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    constructor() KIP17("KIP17 NFT Airdrop", "KNA") {}
    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(KIP17, KIP17Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(KIP17, KIP17Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

次にすることは、上記のコードをエアドロップの実装に合うように修正することだ：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP17/KIP17.sol";
import "@kaiachain/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
import "@kaiachain/contracts/access/Ownable.sol";
import "@kaiachain/contracts/utils/Counters.sol";
contract KIP17NftAirdrop is KIP17, KIP17Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    constructor() KIP17("KIP17 NFT Airdrop", "KNA") {}
    // Airdrop NFTs
    function airdropNfts(address[] calldata wAddresses) public onlyOwner {
        require(wAddresses.length != 0, "Must no be equal to zero");
        for (uint256 i = 0; i < wAddresses.length; i++) {
            _mintSingleNFT(wAddresses[i]);
        }
    }
    function _mintSingleNFT(address to) private {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(KIP17, KIP17Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(KIP17, KIP17Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

上で修正したコードから、\*\*airdropNfts()\*\*という新しい関数を追加したことがわかる。 この関数は、特定の選択されたアドレスにトークンを鋳造し、コントラクトの作成者であるonlyOwnerによってのみ呼び出される。 この関数は、特定の選択されたアドレスにトークンを鋳造し、コントラクトの作成者であるonlyOwnerによってのみ呼び出される。

その後、**safeMint()** _public onlyOwner_ 関数を **_mintSingleTokens()** **private** に変更しました。

KIP17のエアドロップ契約コードの準備ができたので、次のステップは、プロジェクト・ディレクトリのsrcフォルダにairdropKIP17.solという名前の新しいファイルを作成し、修正したコードをそのファイルに貼り付けることです。

\*\*KIP37契約のカスタマイズ

KIP37は一括鋳造に対応しているため、契約書だけをカスタマイズしてそのまま使用する。 KIP37は一括鋳造に対応しているため、契約書だけをカスタマイズしてそのまま使用する。 KIP37Contractをカスタマイズするには、以下の手順に従ってください：

1. [wizard.kaia.io]に移動する(https://wizard.kaia.io)
2. 契約**タブで**KIP37\*\*を選択する。
3. 次に、**SETTINGS**タブに名前（KIP7 NFT Airdrop）と記号（KNA）を記入する。  Base URIフィールドは空のままにしておく。
4. 続いて、**FEATURES** タブで、**Mintable**、**Auto-increment Ids**、**Enumerable** の各機能にチェックを入れます。 **ACCESS CONTROL**タブのOwnable機能が自動的に選択されていることがわかります。 **ACCESS CONTROL**タブのOwnable機能が自動的に選択されていることがわかります。

これらの設定を行った後のカイアの契約ウィザードはこのようになる：

![](/img/build/tools/kip37-kcw.png)

以下は生成されたコードである：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP37/KIP37.sol";
import "@kaiachain/contracts/access/Ownable.sol";
contract KIP37MultiToken is KIP37, Ownable {
    constructor() KIP37("") {}
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}
```

KIP37コントラクト・コードの準備ができたので、次のステップは、プロジェクト・ディレクトリのsrcフォルダにKIP37MultiToken.solという名前の新しいファイルを作成し、生成されたコードを貼り付けることだ。

すべてのKaiaコントラクトのコントラクトコードを生成した次のステップは、Foundry solidityスクリプトを使用してKaia Testnet Kairosにデプロイすることです。

## Foundryスクリプトを使用して生成されたスマートコントラクトコードをデプロイする

このセクションでは、生成したスマート・コントラクトのコードをFoundryを使ってデプロイする方法を説明します。

### はじめに

ファウンドリーを使い始めるにあたって、[forge create](https://book.getfoundry.sh/reference/forge/forge-create.html)を使って契約を遅らせるという予備的な方法に触れたはずだ。 最近、FoundryチームはSolidityを使用してコントラクトを宣言的にデプロイする、よりユーザーフレンドリーな方法として[Solidity Scripting](https://book.getfoundry.sh/tutorials/solidity-scripting#solidity-scripting)を開発しました。 最近、FoundryチームはSolidityを使用してコントラクトを宣言的にデプロイする、よりユーザーフレンドリーな方法として[Solidity Scripting](https://book.getfoundry.sh/tutorials/solidity-scripting#solidity-scripting)を開発しました。

このセクションでは、Foundryのsolidityスクリプトを使用してコントラクトをデプロイします。

### トークンコントラクトのカスタマイズ

生成したスマートコントラクトをKaia Kairosテストネットにデプロイするつもりですが、そのためにはKairos RPC URLやテストKAIAで資金調達しているアカウントの秘密鍵などを設定して、Foundryを少し設定する必要があります。

それができたら、.envファイルを作成し、変数を追加する。 それができたら、.envファイルを作成し、変数を追加する。 Foundryはプロジェクトディレクトリにある.envファイルを自動的に読み込みます。

.envファイルはこのフォーマットに従っている必要がある：

```code
KAIROS_RPC_URL=
// メインネットにデプロイする場合
MAINNET_RPC_URL=
PRIVATE_KEY=
```

次に`foundry.toml`ファイルを編集する必要がある。 プロジェクトのルートにすでに1つあるはずだ。 以下の行をファイルの最後に貼り付ける。

```code
[rpc_endpoints]
kairos = "${KAIROS_RPC_URL}"
// メインネットにデプロイする場合
mainnet = "${MAINNET_RPC_URL}"
```

### 脚本を書く

次に、フォルダを作成し、まだ存在していなければscriptという名前をつける。 次に、フォルダを作成し、まだ存在していなければscriptという名前をつける。
airdropKIP7.s.sol
airdropKIP17.s.sol
KIP37MultiToken.s.sol
ここにデプロイスクリプト自体を記述する。  各ファイルの内容は以下のようになるはずだ：  各ファイルの内容は以下のようになるはずだ：

1. airdropKIP7.s.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Script.sol";
import "../src/airdropKIP7.sol";

contract KIP7AirdropDeployScript is Script {

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        KIP7TokenAirdrop kip7TokenAirdrop = new KIP7TokenAirdrop();

        vm.stopBroadcast();
    }
}
```

2. airdropKIP17.s.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Script.sol";
import "../src/airdropKIP17.sol";

contract KIP17AirdropDeployScript is Script {

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        KIP17NftAirdrop kip17NftTokenAirdrop = new KIP17NftAirdrop();

        vm.stopBroadcast();
    }
}
```

3. KIP37MultiToken.s.sol

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Script.sol";
import "../src/KIP37MultiToken.sol";

contract KIP37MultiTokenDeployScript is Script {

    function setUp() public {}

    function run() public {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        KIP37MultiToken kip37MultiToken = new KIP37MultiToken();

        vm.stopBroadcast();
    }
}
```

各コード行が何をするのかを見ていこう。

まず、各スクリプト・ファイルのSPDXライセンスとプラグマ・バージョンを宣言した。 まず、各スクリプト・ファイルのSPDXライセンスとプラグマ・バージョンを宣言した。 各スクリプトファイルはsolidityプログラムであるため、SPDX-licenseとプラグマ・バージョンを宣言する必要があり、スマート・コントラクトのように動作するが、決してデプロイされないことに注意。

次に、コントラクトのデプロイに使用するスクリプト・ユーティリティを提供する[Forge Std/Script.sol](https://github.com/foundry-rs/forge-std/blob/master/src/Script.sol)をインポートしました。 その後、配備する契約をインポートした。 この場合、各スクリプトに対して、**airdropKIP7**、**airdropKIP17**、**KIP37MultiToken**を使用する。

次に、Forge Std ライブラリから Script を継承する各スクリプト ファイルに対して、**KIP7AirdropDeployScript**、**KIP17AirdropDeployScript**、**KIP37MultiTokenDeployScript** というコントラクトを作成しました。

次に、**run()**関数を宣言した。 run()関数は、スクリプトを実行するためのエントリー・ポイントである。
次に、.envファイルから秘密鍵をロードする**deployerPrivateKey**変数を宣言します。

その後、\*\*vm.startBroadcast(deployerPrivateKey)\*\*という特殊なチートコードを呼び出し、メインスクリプト・コントラクトが行った呼び出しとコントラクトの作成を記録する。このコードは、トランザクションに署名するためのdeployerPrivateKeyを渡している。

そして、それぞれのコントラクトを作成した。 そして、それぞれの契約書を作成した。 以前にvm.startBroadcast()というチートコードを呼び出したので、このコントラクト作成はforgeによって記録される。

各ラインの概要が分かったところで、コントラクトのデプロイに移ろう。  この[リンク](https://book.getfoundry.sh/tutorials/solidity-scripting#writing-the-script)をクリックして、スクリプトの書き方やその他の詳細をご覧ください。

プロジェクトのルートで

```bash
// To load the variables in the .env file
source .env
```

各コントラクトをデプロイするには、以下のコマンドを実行する：

1. airdropKIP7

```bash
スクリプトを作成する script/airdropKIP7.s.sol:KIP7AirdropDeployScript --rpc-url $KAIROS_RPC_URL --broadcast --skip-simulation -vvvv
```

2. airdropKIP17

```bash
forge script script/airdropKIP17.s.sol:KIP17AirdropDeployScript --rpc-url $KAIROS_RPC_URL --broadcast --skip-simulation -vvvv
```

3. KIP37MultiToken

```bash
forge script script/KIP37MultiToken.s.sol:KIP37MultiTokenDeployScript --rpc-url $KAIROS_RPC_URL --broadcast --skip-simulation -vvvv
```

各コマンドが成功すれば、ターミナルは次のようになるはずだ：

![](/img/build/tools/deploy-kcw-contracts.png)

スクリプトコマンドの詳細については、こちらの[ガイド](https://book.getfoundry.sh/reference/forge/forge-script)を参照してください。

## 結論

このチュートリアルでは、Kaiaコントラクトウィザードとその機能、KCWを使用したコントラクトのカスタマイズ方法について学びました。 このガイドでは、スマート・コントラクト・コードを生成する方法と、生成されたスマート・コントラクト・コードを出発点として、アプリケーション固有のロジックでさらにカスタマイズする方法も示した。

さらに、Foundry solidityスクリプトを使用して、生成されたコントラクトをKaia Kairos Testnetにデプロイしました。 Remix IDEやその他のスマートコントラクト開発環境を利用して、Kaiaコントラクトウィザードから派生またはカスタマイズしたスマートコントラクトをデプロイできます。 対応するチュートリアルは以下のリンクからご覧いただけます：

- [リミックスにつなげる](../../tutorials/connecting-remix.md#connecting-kaia-remix-using-metamask)
- [Hardhatを使用したスマートコントラクトのデプロイ](../../get-started/hardhat.md)