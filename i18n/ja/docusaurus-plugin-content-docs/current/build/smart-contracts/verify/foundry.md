---
sidebar_label: ファウンドリーの利用
---

# Foundryを使用してスマートコントラクトを検証する方法

このガイドでは、Foundryを使用してCLIから直接Kaiascan上でスマートコントラクトのソースコードを自動的に検証する手順を説明します。 現時点では、KaiascanはFoundryを使用する場合にのみ、フラット化されたコントラクトファイルの検証をサポートしています。

> 検証作業を進める前に、契約書が平らになっていることを確認してください。

## スタート

このガイドでは、Foundryを使用したスマートコントラクトの開発について理解していることを想定しています。 Foundryを使用したスマートコントラクトのデプロイ](../deploy/foundry.md)をご覧ください。   以下に、このサンプルNFT契約の展開と検証を行う：

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

Foundry verifyを使用して契約を検証するには、以下の手順を参照してください：

## 契約を平らにする

```bash
## flatten

forge flatten src/NFT.sol > FlattenedNFT.sol
```

## 契約の展開

```bash
## deploy

forge create --rpc-url $KAIROS_RPC_URL private-key $PRIVATE_KEY src/NFT.sol:NFT  --broadcast --constructor-args "Kento" "KT" "https://ipfs.io/ipfs/QmdcURmN1kEEtKgnbkVJJ8hrmsSWHpZvLkRgsKKoiWvW9g?filename=simple_bull.json"
```

![](/img/build/smart-contracts/verify/foundry-verify-deploy.png)

## 契約の確認

```bash
## verify an already deployed contract as seen above *//

forge verify-contract --verifier-url https://kairos-api.kaiascan.io/forge-verify-flatten --chain-id 1001 --constructor-args $(cast abi-encode "constructor(string,string,string)" "Kento" "KT" "https://ipfs.io/ipfs/QmdcURmN1kEEtKgnbkVJJ8hrmsSWHpZvLkRgsKKoiWvW9g?filename=simple_bull.json") --compiler-version v0.8.26+commit.8a97fa7a 0x06F09d3f77341B2f9bDC1E6fc2928761ba05f934 FlattenedNFT.sol:NFT --retries 1
```

![](/img/build/smart-contracts/verify/foundry-verify-bash.png)

確認された契約書はこちらで調べることができる。

![](/img/build/smart-contracts/verify/foundry-verify-ks-page.png)

## お役立ちリンク

- [KaiascanにおけるFoundry Verifyの設定](https://docs.kaiascan.io/smart-contract-verification/foundry-verify)





