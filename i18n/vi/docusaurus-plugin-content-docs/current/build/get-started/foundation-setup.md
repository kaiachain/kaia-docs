# Thiết lập nền tảng

Nhận cái nhìn tổng quan về Kaia và những kiến thức cơ bản để bắt đầu xây dựng.

## Tổng quan nhanh

Kaia là một blockchain tương thích với EVM, được thiết kế để đạt được tốc độ, bảo mật và khả năng mở rộng. Nó sử dụng Máy ảo Kaia (KVM), hoàn toàn tương thích với các công cụ Ethereum và hỗ trợ hợp đồng thông minh Solidity. Nếu bạn đang chuyển từ Ethereum, quá trình chuyển đổi sẽ rất đơn giản--hầu hết mã nguồn và quy trình làm việc hiện tại của bạn sẽ hoạt động mà chỉ cần điều chỉnh nhỏ.

Để biết thêm chi tiết về kiến trúc của Kaia, vui lòng tham khảo [Tại sao nên xây dựng trên Kaia](../../learn/why-kaia.md) và [Cơ chế đồng thuận](../../learn/consensus-mechanism.md).

## Kaia Mạng lưới

Kaia có hai mạng lưới chính:

- **Kairos Testnet**: Dành cho thử nghiệm và phát triển. ID chuỗi: 1001. Sử dụng nó để thử nghiệm mà không tốn chi phí thực tế.
- **Mainnet**: Dành cho sản xuất. ID chuỗi: 8217.

Cấu hình ví hoặc công cụ của bạn với các điểm cuối RPC sau:

- Kairos: https://public-en-kairos.node.kaia.io
- Mainnet: https://public-en.node.kaia.io

Khám phá các khối và giao dịch trên [Kaiascan](https://kaiascan.io/) (Mainnet) hoặc [Kairos Kaiascan](https://kairos.kaiascan.io/).

## Công cụ phát triển

Kaia hỗ trợ các công cụ phổ biến trên Ethereum cùng với một số tiện ích mở rộng để nâng cao tính năng của chúng. Nguồn lực chính:

- **[SDKs](../../references/sdk/sdk.md)**: Sử dụng [ethers-ext](../../references/sdk/ethers-ext/getting-started.md) (phiên bản mở rộng của ethers.js), [web3js-ext](../../references/sdk/web3js-ext/getting-started.md), hoặc các công cụ khác để tương tác với mạng.
- **[Điểm cuối RPC công khai](../../references/public-en.md)**: Truy cập qua các điểm cuối RPC công khai.
- **[Solidity](https://github.com/ethereum/solidity)**: Viết hợp đồng thông minh bằng Solidity -- Kaia hoàn toàn tương thích.
- **[Kaia Contracts Wizard](https://wizard.kaia.io/)**: Trình tạo hợp đồng thông minh tương tác giúp bạn bắt đầu phát triển hợp đồng thông minh và tìm hiểu về Kaia Contracts.
- Các công cụ khác: [Remix IDE với plugin Kaia](https://ide.kaia.io/), [Hardhat](https://v2.hardhat.org/hardhat-runner/docs/getting-started), [Foundry](https://getfoundry.sh/), và [Thirdweb](https://portal.thirdweb.com/).