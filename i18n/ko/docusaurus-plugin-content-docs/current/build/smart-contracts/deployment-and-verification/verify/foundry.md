---
sidebar_label: 파운드리 사용
---

# 파운드리를 사용하여 스마트 컨트랙트를 검증하는 방법

이 가이드는 Foundry를 사용하여 CLI에서 직접 카이아스캔에서 스마트 컨트랙트의 소스 코드를 자동으로 검증하는 단계를 안내합니다. 현재 카이아스캔은 Foundry를 사용할 때 플랫화된 계약 파일의 검증만 지원합니다.

> 확인 절차를 진행하기 전에 계약서가 평평하게 작성되었는지 확인하세요.

## 시작하기

이 가이드는 파운드리로 스마트 컨트랙트를 개발하는 아이디어를 가지고 계신 분들을 대상으로 합니다. 시작하려면 [파운드리를 사용하여 스마트 컨트랙트 배포하기](../deploy/foundry.md)를 참조하세요.   아래에서 이 샘플 NFT 컨트랙트를 배포하고 검증해 보겠습니다:

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

Foundry 확인을 사용하여 계약을 확인하려면 아래 단계를 참조하세요:

## 계약서 평평하게 만들기

```bash
## flatten

forge flatten src/NFT.sol > FlattenedNFT.sol
```

## 컨트랙트 배포

```bash
## deploy

forge create --rpc-url $KAIROS_RPC_URL private-key $PRIVATE_KEY src/NFT.sol:NFT  --broadcast --constructor-args "Kento" "KT" "https://ipfs.io/ipfs/QmdcURmN1kEEtKgnbkVJJ8hrmsSWHpZvLkRgsKKoiWvW9g?filename=simple_bull.json"
```

![](/img/build/smart-contracts/verify/foundry-verify-deploy.png)

## 계약 확인

```bash
## verify an already deployed contract as seen above *//

forge verify-contract --verifier-url https://kairos-api.kaiascan.io/forge-verify-flatten --chain-id 1001 --constructor-args $(cast abi-encode "constructor(string,string,string)" "Kento" "KT" "https://ipfs.io/ipfs/QmdcURmN1kEEtKgnbkVJJ8hrmsSWHpZvLkRgsKKoiWvW9g?filename=simple_bull.json") --compiler-version v0.8.26+commit.8a97fa7a 0x06F09d3f77341B2f9bDC1E6fc2928761ba05f934 FlattenedNFT.sol:NFT --retries 1
```

![](/img/build/smart-contracts/verify/foundry-verify-bash.png)

여기에서 확인된 계약서를 조회할 수 있습니다(https://kairos.kaiascan.io/address/0x06f09d3f77341b2f9bdc1e6fc2928761ba05f934?tabId=contract&page=1).

![](/img/build/smart-contracts/verify/foundry-verify-ks-page.png)

## 유용한 링크

- [카이아스캔에서 파운드리 검증을 위한 구성](https://docs.kaiascan.io/smart-contract-verification/foundry-verify)





