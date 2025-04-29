---
sidebar_label: 使用代工廠
---

# 如何使用 Foundry 驗證智慧型契約

本指南將教您如何使用 Foundry 直接從 CLI 在 Kaiascan 上自動驗證智慧契約的原始碼。 目前，Kaiascan 僅支援在使用 Foundry 時驗證扁平化的合約檔案。

> 在進行驗證程序之前，請確保您的合約已壓平。

## 快速開始

本指南希望您對使用 Foundry 開發智能合約有所瞭解。 請參閱  [Deploy smart contract using Foundry](../deploy/foundry.md) 開始使用。   我們將在下面部署並驗證這個 NFT 合約範例：

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

若要使用 Foundry verify 驗證合約，請參閱下列步驟：

## 使合約扁平化

```bash
## flatten

forge flatten src/NFT.sol > FlattenedNFT.sol
```

## 部署合約

```bash
## deploy

forge create --rpc-url $KAIROS_RPC_URL private-key $PRIVATE_KEY src/NFT.sol:NFT  --broadcast --constructor-args "Kento" "KT" "https://ipfs.io/ipfs/QmdcURmN1kEEtKgnbkVJJ8hrmsSWHpZvLkRgsKKoiWvW9g?filename=simple_bull.json"
```

![](/img/build/smart-contracts/verify/foundry-verify-deploy.png)

## 驗證合約

```bash
## verify an already deployed contract as seen above *//

forge verify-contract --verifier-url https://kairos-api.kaiascan.io/forge-verify-flatten --chain-id 1001 --constructor-args $(cast abi-encode "constructor(string,string,string)" "Kento" "KT" "https://ipfs.io/ipfs/QmdcURmN1kEEtKgnbkVJJ8hrmsSWHpZvLkRgsKKoiWvW9g?filename=simple_bull.json") --compiler-version v0.8.26+commit.8a97fa7a 0x06F09d3f77341B2f9bDC1E6fc2928761ba05f934 FlattenedNFT.sol:NFT --retries 1
```

![](/img/build/smart-contracts/verify/foundry-verify-bash.png)

您可以在 這裡 查詢已驗證的合約。

![](/img/build/smart-contracts/verify/foundry-verify-ks-page.png)

## 有用連結

- [在 Kaiascan 上設定 Foundry Verify](https://docs.kaiascan.io/smart-contract-verification/foundry-verify)





