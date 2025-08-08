---
sidebar_label: Sử dụng Foundry
---

# Cách xác minh hợp đồng thông minh bằng Foundry

Hướng dẫn này sẽ hướng dẫn bạn các bước để tự động xác minh mã nguồn hợp đồng thông minh của bạn trên Kaiascan trực tiếp từ CLI bằng Foundry. Hiện tại, Kaiascan chỉ hỗ trợ xác minh các tệp hợp đồng đã được làm phẳng khi sử dụng Foundry.

> Đảm bảo hợp đồng của bạn đã được hoàn thiện trước khi tiến hành quá trình xác minh.

## Bắt đầu

Hướng dẫn này kỳ vọng rằng bạn có ý tưởng phát triển hợp đồng thông minh với Foundry. Xem [Triển khai hợp đồng thông minh bằng Foundry](../deploy/foundry.md) để bắt đầu.   Chúng tôi sẽ triển khai và xác minh mẫu hợp đồng NFT bên dưới:

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

Để xác minh hợp đồng bằng Foundry verify, hãy xem các bước dưới đây:

## Làm phẳng hợp đồng

```bash
## flatten

forge flatten src/NFT.sol > FlattenedNFT.sol
```

## Triển khai hợp đồng

```bash
## deploy

forge create --rpc-url $KAIROS_RPC_URL private-key $PRIVATE_KEY src/NFT.sol:NFT  --broadcast --constructor-args "Kento" "KT" "https://ipfs.io/ipfs/QmdcURmN1kEEtKgnbkVJJ8hrmsSWHpZvLkRgsKKoiWvW9g?filename=simple_bull.json"
```

![](/img/build/smart-contracts/verify/foundry-verify-deploy.png)

## Xác minh hợp đồng

```bash
## verify an already deployed contract as seen above *//

forge verify-contract --verifier-url https://kairos-api.kaiascan.io/forge-verify-flatten --chain-id 1001 --constructor-args $(cast abi-encode "constructor(string,string,string)" "Kento" "KT" "https://ipfs.io/ipfs/QmdcURmN1kEEtKgnbkVJJ8hrmsSWHpZvLkRgsKKoiWvW9g?filename=simple_bull.json") --compiler-version v0.8.26+commit.8a97fa7a 0x06F09d3f77341B2f9bDC1E6fc2928761ba05f934 FlattenedNFT.sol:NFT --retries 1
```

![](/img/build/smart-contracts/verify/foundry-verify-bash.png)

Bạn có thể tra cứu hợp đồng đã xác minh [tại đây](https://kairos.kaiascan.io/address/0x06f09d3f77341b2f9bdc1e6fc2928761ba05f934?tabId=contract&page=1)

![](/img/build/smart-contracts/verify/foundry-verify-ks-page.png)

## Liên kết hữu ích

- [Cấu hình cho Foundry Verify trên Kaiascan](https://docs.kaiascan.io/smart-contract-verification/foundry-verify)





