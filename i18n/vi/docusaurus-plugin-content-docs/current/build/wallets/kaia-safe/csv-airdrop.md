---
title: Sử dụng CSV Airdrop
sidebar_label: Chương trình Airdrop CSV
---

# Sử dụng CSV Airdrop

:::caution Thông báo về hoàng hôn

`safe.kaia.io` sẽ ngừng hoạt động vào ngày **9 tháng 8 năm 2026**. Vui lòng sử dụng Safe Wallet dành cho Kaia Network tại [app.safe.global](https://app.safe.global) để quản lý các tài khoản của bạn trong thời gian tới. Các Tài khoản Safe hiện có của bạn sẽ tự động tương thích với Safe Wallet.

:::

**CSV Airdrop** (khi được liệt kê trong mục “Ứng dụng an toàn”) gộp nhiều giao dịch chuyển token ERC-20, ERC-721, ERC-1155 và token gốc thành một giao dịch an toàn duy nhất. Bạn chỉ cần tải lên hoặc dán tệp CSV chứa các giao dịch chuyển tiền và gửi một lần — như vậy sẽ cần ít chữ ký hơn và phí gas cũng thấp hơn so với việc gửi từng giao dịch riêng lẻ.

Tính khả dụng của ứng dụng Safe phụ thuộc vào danh mục ứng dụng Safe Wallet dành cho Kaia / Kairos. Nếu CSV Airdrop không được liệt kê cho mạng của bạn, hãy sử dụng [Trình tạo giao dịch](./tx-builder.md) hoặc tham khảo [Trung tâm trợ giúp](https://help.safe.global).

## Bước 1: Mở Safe trong ứng dụng Safe Wallet <a id="login-kaiasafe"></a>

Đăng nhập tại [app.safe.global](https://app.safe.global) và chọn két sắt Kaia hoặc Kairos của bạn. Nếu bạn chưa có tài khoản, hãy làm theo hướng dẫn [Tạo két sắt](./use-kaia-safe.md#create-a-safe) và [Thêm tài sản](./use-kaia-safe.md#add-assets).

## Bước 2: Mở tệp CSV Airdrop <a id="search-CSV-airdrop"></a>

Vào mục **Ứng dụng**, tìm kiếm **CSV** và mở **CSV Airdrop** nếu ứng dụng này có sẵn trên mạng của bạn.

## Bước 3: Chuẩn bị tệp CSV để chuyển dữ liệu <a id="prepare-CSV-airdrop"></a>

Các tệp chuyển dữ liệu cần được cung cấp dưới định dạng CSV với các cột như sau:

- _token_type_: `erc20`, `nft` hoặc `native`. Các token NFT có thể tuân theo tiêu chuẩn ERC-721 hoặc ERC-1155.
- _token_address_: Địa chỉ hợp đồng token. Để trống đối với các giao dịch chuyển khoản nội bộ (KAIA).
- _người nhận_: Địa chỉ người nhận.
- _số tiền_: Số tiền cần chuyển. Có thể để trống đối với các giao dịch chuyển nhượng theo tiêu chuẩn ERC-721.
- _id_: Mã định danh vật phẩm sưu tầm (ERC-721 hoặc ERC-1155). Có thể để trống đối với các giao dịch nội bộ và giao dịch ERC-20.

:::important
Sử dụng `,` làm dấu phân cách. Hàng tiêu đề phải là hàng đầu tiên và phải chứa các tên cột đã được mô tả.
[Tệp chuyển dữ liệu mẫu](https://ipfs.io/ipfs/bafybeiesr6b3cm76ofcm2joukgdtuyva3niftmbpbb4sgxsa3qwsenv3lu/sample.csv)
:::

### Chuyển nhượng token gốc <a id="native-token-trnasfers"></a>

Để trống _token_address_ đối với các giao dịch nội bộ. Đảm bảo rằng ngăn chứa an toàn có đủ KAIA.

### Giao dịch ERC-20 <a id="erc20-trnasfers"></a>

Đặt _token_type_ thành `erc20` và điền thông tin vào các trường còn lại. Đảm bảo rằng Safe có đủ số lượng token đó.

### Giao dịch ERC-721 <a id="erc721-transfers"></a>

Đặt _token_type_ cho các giao dịch chuyển nhượng NFT và bao gồm _id_ của vật phẩm sưu tầm theo yêu cầu của ứng dụng. Đảm bảo rằng Safe là chủ sở hữu của các NFT đó.

## Bước 4: Kiểm tra và gửi <a id="review-submit-transaction"></a>

Kiểm tra lại các giao dịch đã được giải mã trong ứng dụng, sau đó gửi đi. Hoàn tất việc xác nhận giao dịch Safe theo cách tương tự như bất kỳ giao dịch Safe nào khác.
