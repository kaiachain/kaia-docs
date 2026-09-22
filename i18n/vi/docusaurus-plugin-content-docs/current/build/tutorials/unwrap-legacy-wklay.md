---
title: Chuyển đổi WKLAY cũ sang KAIA
sidebar_label: Gỡ bỏ phiên bản cũ của WKLAY
description: Sử dụng Kaiascan để khôi phục KAIA từ hợp đồng bọc WKLAY cũ và giải bọc WKAIA chuẩn.
---

# Chuyển đổi WKLAY cũ sang KAIA

Hợp đồng WKAIA (trước đây là WKLAY) chính thức và chuẩn mực trên mạng chính Kaia là [`0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432`](https://kaiascan.io/address/0x19aac5f612f524b754ca7e7c41cbfa2e981a4432), tiêu chuẩn được công nhận rộng rãi trong toàn bộ hệ sinh thái Kaia. Xem [Canonical WKAIA](../smart-contracts/token-development/canonical-wkaia.md) để biết thêm thông tin cơ bản.

Nếu bạn từng tương tác với các ứng dụng phi tập trung (dapps) hoặc sàn giao dịch cũ sử dụng các gói token thế hệ đầu, có thể bạn vẫn còn số dư trong **hợp đồng WKLAY cũ** [`0xfd844c2fca5e595004b17615f891620d1cb9bbb2`](https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2). Không có giao diện người dùng dapp nào giải nén hợp đồng đó giúp bạn, vì vậy bạn phải gọi trực tiếp hợp đồng đó thông qua trình khám phá blockchain.

Hướng dẫn này sẽ hướng dẫn bạn thực hiện việc đó trên [Kaiascan](https://kaiascan.io).

:::info Bạn đang có hợp đồng nào?

Hai hợp đồng này là hai đợt triển khai không liên quan đến nhau. Trước khi bắt đầu, hãy kiểm tra địa chỉ hợp đồng token trong ví của bạn hoặc trong giao dịch đã cung cấp số dư cho bạn — các bước dưới đây chỉ phục hồi tiền từ hợp đồng cũ. Để giải nén WKAIA chuẩn, hãy xem [Giải nén WKAIA chuẩn](#unwrap-canonical-wkaia).

:::

## Bước 1: Mở hợp đồng cũ

Truy cập trang hợp đồng cũ trên Kaiascan:

[`https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2`](https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2)

![Trang hợp đồng WKLAY phiên bản cũ trên Kaiascan](/img/build/tutorials/unwrap-legacy-wklay/01-legacy-contract-page.png)

## Bước 2: Kiểm tra số dư chính xác của bạn

1. Chọn tab **Hợp đồng**, sau đó chọn **Đọc hợp đồng**.
2. Mở rộng hàm `balanceOf(address)` và nhập địa chỉ ví của bạn.
3. Nhấp vào **Query** (hoặc **Requery**) để tra cứu số dư của bạn.
4. Hãy sao chép giá trị trả về chính xác như đã hiển thị.

![Xem giá trị balanceOf trên tab Read Contract](/img/build/tutorials/unwrap-legacy-wklay/02-read-contract-balanceof.png)

:::caution Sao chép giá trị thô, không chuyển đổi nó

Hàm `balanceOf` trả về số dư tính bằng **kei**, đơn vị nhỏ nhất, chứ không phải bằng KAIA. 1 KAIA tương đương<sup>1018</sup> kei, do đó số dư `100000000000000000` tương đương 0,1 KAIA.

Bước 3 yêu cầu nhập chính con số thô đó. Hãy dán nguyên văn — không được làm tròn số, cắt bớt chữ số hay chuyển đổi sang định dạng KAIA, nếu không bạn sẽ rút nhầm số tiền hoặc giao dịch sẽ bị hủy.

:::

## Bước 3: Rút token của bạn

1. Chuyển sang tab **Viết hợp đồng**.
2. Nhấp vào **Kết nối với Web3** và kết nối ví chứa số dư.
3. Mở rộng hàm `withdraw(wad: uint256)` và dán chính xác giá trị mà bạn đã sao chép ở Bước 2.
4. Hãy gửi, sau đó xác nhận giao dịch trong ví của bạn.

![Tab “Viết hợp đồng” hiển thị chức năng rút tiền](/img/build/tutorials/unwrap-legacy-wklay/03-write-contract-withdraw.png)

Bạn cần có một lượng nhỏ KAIA trong cùng một ví để thanh toán phí gas cho giao dịch này.

## Bước 4: Xác minh

Sau khi giao dịch được xác nhận, hãy kiểm tra số dư ví của bạn — số KAIA đã được giải mã sẽ được ghi có vào chính địa chỉ đã thực hiện giao dịch đó.

Bạn có thể xác nhận giao dịch chuyển khoản tại tab **Giao dịch nội bộ** của giao dịch đó trong Kaiascan, vì hợp đồng ghi nhận KAIA dưới dạng giao dịch nội bộ chứ không phải giao dịch chuyển token. Dưới đây là [một ví dụ về giao dịch gỡ bỏ bảo mật thành công](https://kaiascan.io/tx/0x05117dc2ac21d2373fce1b6afa260ab8f9c1f747f7c9894fa302c67b2c96631d?tabId=internalTx&page=1).

![Xác minh giao dịch unwrap trên Kaiascan](/img/build/tutorials/unwrap-legacy-wklay/04-verify-transaction.png)

## Mở gói WKAIA chuẩn

Nếu số dư của bạn lại nằm trong hợp đồng WKAIA chuẩn [`0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432`](https://kaiascan.io/address/0x19aac5f612f524b754ca7e7c41cbfa2e981a4432), bạn có hai lựa chọn.

**Sử dụng một ứng dụng phi tập trung (dapp) (được khuyến nghị).** Các dịch vụ hoán đổi trong hệ sinh thái Kaia cho phép giải nén WKAIA chuẩn chỉ với một cú nhấp chuột — ví dụ như [DragonSwap](https://dgswap.io/swap/?outputCurrency=KAIA&inputCurrency=0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432).

**Thực hiện thủ công.** Thực hiện theo các bước của Kaiascan như trên, nhưng hãy sử dụng trang địa chỉ của hợp đồng chuẩn thay vì địa chỉ cũ.

## Liên quan

- [Canonical WKAIA](../smart-contracts/token-development/canonical-wkaia.md) — bản triển khai KAIA được đóng gói theo tiêu chuẩn
- [Địa chỉ hợp đồng](../../references/contract-addresses.md) — các địa chỉ hợp đồng của hệ thống đã được triển khai trên Mainnet và Kairos
