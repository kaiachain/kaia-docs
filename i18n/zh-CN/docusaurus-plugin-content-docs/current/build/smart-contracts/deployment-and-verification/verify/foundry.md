---
sidebar_label: 使用代工厂
---

# 如何使用 Foundry 验证智能合约

本指南将教您如何使用 Foundry 直接从 CLI 在 Kaiascan 上自动验证智能合约源代码。 目前，Kaiascan 只支持在使用 Foundry 时验证扁平化合同文件。

> 确保您的合同已平整，然后再进行验证过程。

## 快速开始

本指南希望您对使用 Foundry 开发智能合约有所了解。 请参阅  [Deploy smart contract using Foundry](../deploy/foundry.md) 开始使用。   我们将在下面部署和验证这个 NFT 合同样本：

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10;

import { ERC721 } from "solmate/tokens/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";

error MintPriceNotPaid();
error MaxSupply();
error NonExistentTokenURI();
error WithdrawTransfer();

contract NFT is ERC721, Ownable {
    using Strings for uint256;

    string public baseURI;
    uint256 public currentTokenId;
    uint256 public constant TOTAL_SUPPLY = 10_000;
    uint256 public constant MINT_PRICE = 0.08 ether;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        baseURI = _baseURI;
    }

    function mintTo(address recipient) public payable returns (uint256) {
        if (msg.value != MINT_PRICE) {
            revert MintPriceNotPaid();
        }
        uint256 newTokenId = ++currentTokenId;
        if (newTokenId > TOTAL_SUPPLY) {
            revert MaxSupply();
        }
        _safeMint(recipient, newTokenId);
        return newTokenId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (ownerOf(tokenId) == address(0)) {
            revert NonExistentTokenURI();
        }
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    function withdrawPayments(address payable payee) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool transferTx, ) = payee.call{value: balance}("");
        if (!transferTx) {
            revert WithdrawTransfer();
        }
    }
}
```

要使用 Foundry verify 验证合同，请参阅以下步骤：

## 使合同扁平化

```bash
## flatten

forge flatten src/NFT.sol > FlattenedNFT.sol
```

## 部署合同

```bash
## deploy

forge create --rpc-url $KAIROS_RPC_URL private-key $PRIVATE_KEY src/NFT.sol:NFT  --broadcast --constructor-args "Kento" "KT" "https://ipfs.io/ipfs/QmdcURmN1kEEtKgnbkVJJ8hrmsSWHpZvLkRgsKKoiWvW9g?filename=simple_bull.json"
```

![](/img/build/smart-contracts/verify/foundry-verify-deploy.png)

## 核实合同

```bash
## verify an already deployed contract as seen above *//

forge verify-contract --verifier-url https://kairos-api.kaiascan.io/forge-verify-flatten --chain-id 1001 --constructor-args $(cast abi-encode "constructor(string,string,string)" "Kento" "KT" "https://ipfs.io/ipfs/QmdcURmN1kEEtKgnbkVJJ8hrmsSWHpZvLkRgsKKoiWvW9g?filename=simple_bull.json") --compiler-version v0.8.26+commit.8a97fa7a 0x06F09d3f77341B2f9bDC1E6fc2928761ba05f934 FlattenedNFT.sol:NFT --retries 1
```

![](/img/build/smart-contracts/verify/foundry-verify-bash.png)

您可以在 [这里]（https://kairos.kaiascan.io/address/0x06f09d3f77341b2f9bdc1e6fc2928761ba05f934?tabId=contract&page=1）查阅经核实的合同。

![](/img/build/smart-contracts/verify/foundry-verify-ks-page.png)

## 实用链接

 - [Kaiascan上的Foundry Verify配置](https://docs.kaiascan.io/smart-contract-verification/foundry-verify)





