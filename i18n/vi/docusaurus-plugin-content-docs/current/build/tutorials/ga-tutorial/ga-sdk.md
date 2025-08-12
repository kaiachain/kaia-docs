# 5. Tham khảo API & SDK

## 5.1. Bộ công cụ phát triển phần mềm (SDKs)

Chức năng GA được đóng gói trong các SDK `-ext`, các SDK này mở rộng chức năng của ethers.js và web3.js. Để xem tài liệu tham khảo chi tiết về API, vui lòng tham khảo các kho lưu trữ.

### Kaia Ethers-ext SDK

- Kho lưu trữ: [GitHub](https://github.com/kaiachain/kaia-sdk/tree/dev/ethers-ext)
- Ví dụ mã nguồn: [gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/gasless/gasless.js)
- [Ví dụ mã nguồn kèm hướng dẫn](https://docs.kaia.io/references/sdk/ethers-ext/v6/gas-abstraction/gasless/)
- Phương pháp chính: `gasless.getGaslessSwapRouter`, `gasless.getAmountRepay`, `gasless.getMinAmountOut`, `gasless.getAmountIn`, `gasless.getApproveTx`, `gasless.getSwapTx`.

### Kaia Web3js-ext SDK

- Kho lưu trữ: [GitHub](https://github.com/kaiachain/kaia-sdk/tree/dev/web3js-ext)
- Ví dụ mã nguồn: [gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/gasless/gasless.js)
- [Ví dụ mã nguồn kèm hướng dẫn](https://docs.kaia.io/references/sdk/web3js-ext/gas-abstraction/gasless/)
- Phương pháp chính: `web3.gasless.getGaslessSwapRouter`, `web3.gasless.getAmountRepay`, `web3.gasless.getMinAmountOut`, `web3.gasless.getAmountIn`, `web3.gasless.getApproveTx`, `web3.gasless.getSwapTx`.

## 5.2. Giao diện lập trình ứng dụng JSON-RPC

`kaia_sendRawTransactions` nhận một **mảng** các giao dịch thô đã ký và mã hóa RLP, trong đó _byte loại_ là một trong các loại giao dịch Ethereum (0x00 Legacy, 0x01 EIP-2930, 0x02 EIP-1559, 0x04 Blob).  Sử dụng nó cho cặp GA **ApproveTx + SwapTx**, đây là các loại giao dịch thông thường của EVM.

Các loại giao dịch cụ thể của Kaia như **0x30** (Thực thi hợp đồng thông minh) vẫn phải được phát sóng bằng phương pháp cũ `klay_sendRawTransaction`.

Quy trình tiêu biểu:

1. Xây dựng và ký `ApproveTx` + `SwapTx` → gửi bằng **kaia_sendRawTransactions**
2. Xây dựng và ký ứng dụng AppTx của người dùng → gửi bằng **eth_sendRawTransaction** hoặc **klay_sendRawTransaction** tùy thuộc vào loại giao dịch.

Vì các giao dịch được sắp xếp theo nonce, AppTx sẽ được thực thi ngay sau khi gói giao dịch được xử lý, ngay cả khi nó được gửi qua một điểm cuối riêng biệt.

Nếu bạn chỉ có một giao dịch cần gửi (ví dụ: Nếu bạn gặp sự cố với `SwapTx`, bạn luôn có thể quay lại sử dụng `eth_sendRawTransaction`.