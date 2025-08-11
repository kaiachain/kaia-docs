# 1. Giới thiệu về quá trình chiết xuất khí

## 1.1 Khái niệm về việc khai thác khí đốt là gì?

Gas Abstraction (GA) là giải pháp gốc của Kaia cho phép người dùng thanh toán phí gas bằng cách hoán đổi nguyên tử một lượng nhỏ ERC-20 được phép vào KAIA. Tính năng này loại bỏ rào cản yêu cầu người dùng phải sở hữu token KAIA trước khi có thể tương tác với blockchain.

Khi người dùng chỉ sở hữu token ERC-20, GA cho phép họ đổi một lượng nhỏ các token đó sang KAIA mà không cần thanh toán phí gas trước. Lượng gas tiêu thụ cho quá trình hoán đổi được trừ trực tiếp vào đầu ra của KAIA, tạo ra trải nghiệm hoán đổi không cần gas một cách liền mạch.

## 1.2 Tại sao việc khai thác khí đốt lại quan trọng?

**Thách thức trong quá trình onboarding người dùng**

Người mới đến Kaia thường gặp khó khăn khi:

- Họ truy cập vào mạng Kaia thông qua một cầu nối token nhưng không chuyển đổi KAIA.
- Họ rút một token ERC-20 từ sàn giao dịch tập trung sang mạng Kaia.
- Họ nhận được một airdrop nhưng không có KAIA để thanh toán phí gas.

**Bối cảnh ngành**

Các giải pháp tương tự cũng tồn tại trên các blockchain khác:

- [Trạm nạp gas MetaMask](https://metamask.io/ko/news/metamask-feature-update-gas-station): Cho phép thanh toán phí mạng bằng các loại token khác nhau trên Ethereum và BNB Smart Chain.
- [ERC-4337 Paymaster models](https://docs.erc4337.io/paymasters): Các ứng dụng phi tập trung (dApps) trên các mạng Ethereum L2 thường tài trợ phí gas bằng cách vận hành các máy chủ paymaster tập trung, thanh toán phí bằng stablecoin.

**Phương pháp độc đáo của Kaia**

Khác với các giải pháp dựa vào dịch vụ "người thanh toán trung gian" tập trung, GA của Kaia hoàn toàn phi tập trung và không cần tin cậy. Tính năng này được xử lý tự động bởi các nhà đề xuất khối ở cấp độ mạng, đảm bảo tính bảo mật và dịch vụ không bị gián đoạn.

## 1.3 Các trường hợp sử dụng và lợi ích

**Các trường hợp sử dụng chính:**

- **Người dùng đa chuỗi**: Trải nghiệm liền mạch cho người dùng chuyển đổi từ các chuỗi khối khác.
- **Rút tiền từ sàn giao dịch (CEX)**: Khả năng tương tác trực tiếp sau khi rút token từ sàn giao dịch.
- **Người nhận airdrop**: Tính hữu ích ngay lập tức cho người dùng nhận token airdrop.
- **Thanh toán bằng stablecoin**: Trải nghiệm thanh toán toàn cầu bằng stablecoin mà không gặp rào cản từ token gas.

**Lợi ích cho nhà cung cấp ví:**

- Cải thiện trải nghiệm đăng ký và hướng dẫn sử dụng cho người dùng
- Số lượng phiếu hỗ trợ liên quan đến sự nhầm lẫn về phí gas đã giảm.
- Tăng cường khả năng giữ chân và tương tác của người dùng
- Lợi thế cạnh tranh trong lĩnh vực ví điện tử Web3

## 1.4 Mối quan hệ với Thanh khoản đồng thuận (CL)

GA ban đầu được thiết kế để tăng tính tiện ích cho [Consensus Liquidity tokens](https://medium.com/kaiachain/kaia-consensus-liquidity-a-new-paradigm-in-blockchain-liquidity-7c8a7393cd19), cho phép người dùng thanh toán phí gas bằng CL tokens (ví dụ: BORA, Swapscanner). Tuy nhiên, tính năng này cũng hỗ trợ các token ERC-20 khác, bao gồm cả stablecoin.