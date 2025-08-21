# Kaia Contracts Wizard

![](/img/banners/kaia-kcw.png)

## 導言

Kaia 優先考慮提供無縫的開發人員體驗，這也是創建 Kaia 合同嚮導（KCW）的驅動力。 KCW 是一種交互式工具，可讓您毫不費力地啟動智能合約，並利用 [Kaia Contracts](https://github.com/kaiachain/kaia-contracts) 中經過測試的安全組件。 從本質上講，它通過利用 Kaia 合約的組件簡化了智能合約的開發過程。 值得注意的是，Kaia 合約嚮導建立在 OpenZeppelin 嚮導的基礎之上，進一步加強了智能合約開發的安全性。

在本指南中，您將

 - 瞭解 Kaia 合同嚮導的基本功能。
 - 使用 Kaia Contracts Wizard 生成和定製智能合約代碼。
 - 使用 Foundry 腳本系統將 Kaia 合同部署到 Kaia 網絡 (Kairos)。

## 探索 Kaia 合同嚮導

Kaia Contracts Wizard 將自己定位為使用 Kaia Contracts 編寫智能合約的最快、最簡單的方法。 在本節中，我們將深入瞭解 Kaia 合同嚮導的各個組件和部分。

目前，Kaia 合約嚮導支持以下令牌標準：

 - [KIP-7](https://kips.kaia.io/KIPs/kip-7) - 這是 Kaia 的可替代令牌標準。 可互換是指所有代幣都可分割和互換，即具有相同的價值。 可替代代幣的一個典型例子就是法定貨幣，每張等面值的鈔票都具有相同的價值。
 - [KIP-17](https://kips.kaia.io/KIPs/kip-17) - 這是 Kaia 的不可篡改令牌標準。 不可竄改是指每個標記都是不可分割的，因此也是獨一無二的。 KIP17 代幣可以代表一個獨特物品的所有權，無論是實物財產還是虛擬收藏品，如圖片、遊戲中的物品、不動產等。
 - [KIP-37](https://kips.kaia.io/KIPs/kip-37) - 這被稱為 Kaia 的多令牌標準，因為它可以在單個智能合約中同時表示可替換令牌和不可替換令牌。

與我們的 [Ethereum Equivalence](https://medium.com/klaytn/toward-ethereum-equivalence-1-introducing-klaytn-v1-8-0-971911be7ff9) 支持一致，Kaia 合約嚮導也支持 [ERC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)、[ERC721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)、[ERC1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)。

Kaia 合同嚮導由以下部分組成：

 - **令牌標準部分**：該選項卡包含 Kaia 合約嚮導支持的所有不同令牌標準。

 - **設置部分**：該部分提供每個代幣標準的初步設置，如代幣名稱、符號、預鑄幣（合約部署時的代幣供應）和 URI（針對不可兌換代幣）。

 - **功能部分**：包括每個令牌標準的所有功能。 您可以在以下鏈接中找到更多關於每種令牌可用的不同擴展名的信息：

     - [KIP7](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP7/extensions)
     - [KIP17](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP17/extensions)
     - [KIP37](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP37/extensions)

 - **訪問控制部分**：包括每個令牌標準的所有可用訪問控制機制。

 - **交互式代碼顯示部分**：顯示根據用戶設置的配置生成的智能合約代碼。

![](/img/build/tools/kcw-image.png)

在瞭解了 Kaia 合約嚮導的各個部分後，您現在可以選擇想要的合約類型（目前支持 **KIP7**、**KIP17**、**KIP37**、**ERC20**、**ERC721**、**ERC1155**、**Governor** 和自定義合約），設置參數和所需功能（令牌名稱、符號、預鑄幣量、訪問控制等），然後合約嚮導將生成所有必要的代碼。 因此，生成的代碼可以隨時進行編譯和部署，也可以作為起點，通過特定的應用邏輯進行進一步定製。

## 在 Kaia 網絡上定製和部署 Kaia 合約

在本節中，您將使用 Foundry 將 kaia 合約嚮導生成的代碼部署到 Kaia Testnet Kairos。 生成的代碼將作為起點，並進一步定製，以適應 KIP7 和 KIP17 代幣的空投合約。  而在另一端，生成的 KIP37 代碼將按原樣使用。

讓我們開始吧！

### 先決條件

要跟上本教程，先決條件如下：

 - 確保安裝了 [foundry](https://book.getfoundry.sh/getting-started/installation)。
 - 克隆 [kaia-foundry-starterkit](https://github.com/ayo-klaytn/kaia-foundry-starterkit) 程式碼。
 - [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask): 用來部署契約、簽署交易以及與契約互動。
 - RPC 端點：您可以從其中一個支援的 [端點提供者](../../../references/public-en.md) 取得。
 - 從 [水龍頭](https://faucet.kaia.io)測試 KAIA：為賬戶注入足夠的 KAIA。

### 開始

本指南將指導您簡單實現 KIP7 和 KIP17 令牌標準的空投合約。 在空投合約中，項目的創建者會直接向特定的錢包鑄造各自的代幣。 在接下來的章節中，我們將分別介紹如何定製和部署每種令牌空投合約。

### 定製令牌合約

**將 KIP7 合同定製為 KIP7 空投合同。**

在將 KIP7 合同修改為空投合同之前，您需要對其進行定製。 為此，請按照以下步驟操作：

1. 導覽到 [wizard.kaia.io](https://wizard.kaia.io)。
2. 在**合同**選項卡上選擇**KIP7**
3. 下一步是在**設置**選項卡中填寫名稱（KIP7 代幣空投）和符號（KTA）。 鑄幣前區域為空
4. 隨後，在**功能**選項卡上，勾選**可薄荷**功能框，它就會自動選擇**訪問控制**選項卡上的可擁有功能。

進行這些配置後，Kaia 合同嚮導就會變成這樣：

![](/img/build/tools/kip7-kcw.png)

以下是生成的代碼：

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

接下來要做的就是修改上面的代碼，以適應我們的空投執行，看起來就像這樣：

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

從上面修改的代碼中可以看到，我們添加了一個名為 `airdropTokens()` 的新函數。 該函數向某些選定的地址鑄造代幣，且只能由合約的創建者--"onlyOwner"--調用。

隨後，我們將_公共_ **mint()** _onlyOwner_函數修改為**_mintSingleTokens()** 私有。

現在我們已經準備好 KIP7 空投合同代碼，下一步是在項目目錄的 src 文件夾中新建一個名為 airdropKIP7.sol 的文件，並將修改後的代碼粘貼到該文件中。

**將 KIP17 合同定製為 KIP17 空投合同。**

在將 KIP17 合同修改為空投合同之前，您需要對其進行定製。 為此，請按照以下步驟操作：

1. 導覽到 [wizard.kaia.io](https://wizard.kaia.io/)。
2. 在**合同**選項卡上選擇**KIP17**
3. 下一步是在**設置**選項卡中填寫名稱（KIP7 NFT Airdrop）和符號（KNA）。  基礎 URI 字段應為空。
4. 隨後，在**特性**選項卡上，勾選**可編輯**、**自動遞增索引**和**可數**特性框。 您會發現**訪問控制**選項卡中的 "可擁有 "功能已被自動選中。

進行這些配置後，Kaia 合同嚮導就會變成這樣：

![](/img/build/tools/kip17-kcw.png)

以下是生成的代碼：

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

接下來要做的就是修改上面的代碼，以適應我們的空投執行，看起來就像這樣：

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

從上面修改的代碼中可以看到，我們添加了一個名為 **airdropNfts()** 的新函數。 該函數向某些選定的地址鑄造代幣，並且只能由合約的創建者（onlyOwner）調用。

隨後，我們將 **safeMint()** _public onlyOwner_ 函數修改為 **_mintSingleTokens()** **private**。

現在我們已經準備好 KIP17 空投合同代碼，下一步是在項目目錄的 src 文件夾中新建一個名為 airdropKIP17.sol 的文件，並將修改後的代碼粘貼到該文件中。

**定製 KIP37 合同。**

由於 KIP37 支持批量鑄幣，我們將只對合同進行定製並按原樣使用。 要定製我們的 KIP37Contract，請按以下步驟操作：

1. 導覽到 [wizard.kaia.io](https://wizard.kaia.io)
2. 在**合同**選項卡上選擇**KIP37**
3. 下一步是在**設置**選項卡中填寫名稱（KIP7 NFT Airdrop）和符號（KNA）。  基礎 URI 字段應為空。
4. 隨後，在**特性**選項卡上，勾選**可編輯**、**自動遞增索引**和**可數**特性框。 您會發現**訪問控制**選項卡中的 "可擁有 "功能已被自動選中。

進行這些配置後，Kaia 合同嚮導就會變成這樣：

![](/img/build/tools/kip37-kcw.png)

以下是生成的代碼：

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

現在我們已經準備好 KIP37 合約代碼，下一步是在項目目錄的 src 文件夾中新建一個名為 KIP37MultiToken.sol 的文件，並將生成的代碼粘貼到其中。

為所有 Kaia 合同生成合同代碼後，下一步就是使用 Foundry solidity 腳本部署到 Kaia 測試網 Kairos。

## 使用 Foundry 腳本部署生成的智能合約代碼

在本節中，我們將使用 Foundry 部署生成的智能合約代碼，特別是在鏈上部署的 Foundry 腳本。

### 開始

在開始使用鑄造時，您一定初步接觸過使用 [forge create](https://book.getfoundry.sh/reference/forge/forge-create.html)來延遲合同的方法。 最近，Foundry 團隊提出了一種使用 Solidity 聲明式部署合約的更友好方法，稱為 [Solidity Scripting](https://book.getfoundry.sh/tutorials/solidity-scripting#solidity-scripting)，即用 solidity 而不是 JavaScript 編寫部署腳本。

在本節中，我們將在 Foundry 中使用 solidity 腳本部署我們的合約。

### 環境配置

我們將把生成的智能合約部署到 Kaia Kairos 測試網絡，但為此我們需要對 Foundry 進行一些配置，比如設置 Kairos RPC URL、使用 KAIA 測試資金的賬戶私鑰等。

完成所有步驟後，創建一個 .env 文件並添加變量。 Foundry 會自動加載項目目錄中的 .env 文件。

.env 文件應遵循以下格式：

```code
KAIROS_RPC_URL=
// 如果要部署到主網
MAINNET_RPC_URL=
PRIVATE_KEY=
```

現在我們需要編輯 `foundry.toml` 文件。 項目根目錄中應該已經有一個。 將以下幾行粘貼到文件末尾

```code
[rpc_endpoints]
kairos = "${KAIROS_RPC_URL}"
// 如果要部署到主網
mainnet = "${MAINNET_RPC_URL}"
```

### 編寫劇本

接下來，我們必須創建一個文件夾，並將其命名為腳本（如果還不存在的話）。 然後，我們需要為合同創建一個腳本文件，即：
airdropKIP7.s.sol
airdropKIP17.s.sol
KIP37MultiToken.s.sol
這就是我們要編寫的部署腳本。  每個文件的內容應如下所示：

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

讓我們來看看每行代碼的作用。

首先，我們為每個腳本文件聲明瞭 SPDX 許可證和 pragma 版本。 請注意，由於每個腳本文件都是一個 solidity 程序，我們仍需聲明 SPDX 許可證和 pragma 版本，使其像智能合約一樣工作，但永遠不會部署。

接下來，我們導入 [Forge Std/Script.sol](https://github.com/foundry-rs/forge-std/blob/master/src/Script.sol)，它提供了一些用於部署合同的腳本工具。 隨後，我們導入要部署的合同。 在這種情況下，每個腳本都需要 **airdropKIP7**、**airdropKIP17**、**KIP37MultiToken**。

然後，我們為每個腳本文件創建了名為 **KIP7AirdropDeployScript**、**KIP17AirdropDeployScript**、**KIP37MultiTokenDeployScript** 的合約，這些腳本文件繼承了 Forge Std 庫中的腳本。

接下來，我們聲明瞭 **run()** 函數。 函數 run() 是執行腳本的入口點。 然後，我們在
中聲明瞭一個 **deployerPrivateKey** 變量，用於從 .env 文件中加載私鑰。

隨後，我們調用了**vm.startBroadcast(deployerPrivateKey)** 特殊作弊代碼，該代碼記錄了主腳本合約的調用和合約創建，並傳遞了用於簽署事務的 deployerPrivateKey。

然後，我們創建了相應的合同。 由於我們之前調用了 vm.startBroadcast() 作弊代碼，因此 forge 將記錄此合約創建過程。

現在，我們已經對每一行的內容有了大致的瞭解，您可以繼續部署合同了。  點擊此 [鏈接](https://book.getfoundry.sh/tutorials/solidity-scripting#writing-the-script)，瞭解更多關於編寫腳本和其他細節的信息。

在項目根部運行

```bash
// To load the variables in the .env file
source .env
```

要部署每份合同，請運行以下命令：

1. airdropKIP7

```bash
forge script script/airdropKIP7.s.sol:KIP7AirdropDeployScript --rpc-url $KAIROS_RPC_URL --broadcast --skip-simulation -vvvv
```

2. airdropKIP17

```bash
forge script script/airdropKIP17.s.sol:KIP17AirdropDeployScript --rpc-url $KAIROS_RPC_URL --broadcast --skip-simulation -vvvv
```

3. KIP37MultiToken

```bash
forge script script/KIP37MultiToken.s.sol:KIP37MultiTokenDeployScript --rpc-url $KAIROS_RPC_URL --broadcast -skip-simulation -vvvv
```

如果每條命令都執行成功，終端應該如下所示：

![](/img/build/tools/deploy-kcw-contracts.png)

請參閱本 [指南](https://book.getfoundry.sh/reference/forge/forge-script)，瞭解有關腳本命令的更多信息。

## 結論

在本教程中，您將瞭解 Kaia 合同嚮導、其功能以及如何使用 KCW 自定義合同。 本指南還演示瞭如何生成智能合約代碼，以及如何將生成的智能合約代碼作為起點，並通過特定應用邏輯進一步定製。

此外，我們還使用 Foundry solidity 腳本將生成的合同部署到 Kaia Kairos Testnet。 您可以使用 Remix IDE 或任何智能合約開發環境來部署從 Kaia Contracts Wizard 派生或定製的智能合約。 您可以在以下鏈接中找到相應的教程：

 - [Connecting to Remix](../../tutorials/connecting-remix.md#connecting-kaia-remix-using-metamask)
 - [使用 Hardhat 部署智慧契約](../../get-started/hardhat.md)