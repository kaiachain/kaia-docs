# eth

Không gian tên `eth` cung cấp các hàm liên quan đến tài khoản, khối, giao dịch, cấu hình của mạng hoặc nút, bộ lọc, v.v.
configurations of networks or nodes, filters, and so on.

Klaytn hiện hỗ trợ không gian tên `eth` của [API JSON-RPC của Ethereum](https://eth.wiki/json-rpc/API). Xin lưu ý rằng một số giá trị trả về đã được điều chỉnh để phù hợp với nội dung phản hồi API của Ethereum.
some return values have been adjusted to match the Ethereum's API response body.

Và do sự khác biệt cơ bản về thiết kế giữa Klaytn và Ethereum, nên Cấu trúc dữ liệu của Klaytn (Giao dịch, Chặn và Biên lai giao dịch) sẽ không được hỗ trợ hoàn chỉnh thông qua API không gian tên `eth`.
Klaytn's data structure (Transaction, Block, and TransactionReceipt) cannot be fully supported via `eth` namespace APIs.

Vui lòng kiểm tra [Tổng quan về sự khác biệt với Ethereum](#differences_overview_from_ethereum) trong tài liệu này.

**LƯU Ý**: API không gian tên `eth` được hỗ trợ từ Klaytn v1.8.0.

Danh sách dưới đây liệt kê các hàm API. Tất cả các API không gian tên `eth` được hỗ trợ trên Klaytn.

### [Tài khoản](./account.md) <a id="account"></a>

- [eth_tài khoảns](./account.md#eth_accounts)
- [eth_getBalance](./account.md#eth_getbalance)
- [eth_getCode](./account.md#eth_getcode)
- [eth_getTransactionCount](./account.md#eth_gettransactioncount)
- [eth_sign](./account.md#eth_sign)

### [Khối](./block.md) <a id="block"></a>

- [eth_blockNumber](./block.md#eth_blocknumber)
- [eth_getHeaderByNumber](./block.md#eth_getheaderbynumber)
- [eth_getHeaderByHash](./block.md#eth_getheaderbyhash)
- [eth_getBlockByNumber](./block.md#eth_getblockbynumber)
- [eth_getBlockByHash](./block.md#eth_getblockbyhash)
- [eth_getUncleByBlockHashAndIndex](./block.md#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](./block.md#eth_getunclebyblocknumberandindex)
- [eth_getBlockTransactionCountByNumber](./block.md#eth_getblocktransactioncountbynumber)
- [eth_getBlockTransactionCountByHash](./block.md#eth_getblocktransactioncountbyhash)
- [eth_getUncleCountByBlockNumber](./block.md#eth_getunclecountbyblocknumber)
- [eth_getUncleCountByBlockHash](./block.md#eth_getunclecountbyblockhash)
- [eth_getStorageAt](./block.md#eth_getstorageat)
- [eth_mining](./block.md#eth_mining)
- [eth_syncing](./block.md#eth_syncing)

### [Giao dịch](./transaction.md) <a id="transaction"></a>

- [eth_call](./transaction.md#eth_call)
- [eth_estimateGas](./transaction.md#eth_estimategas)
- [eth_getTransactionByBlockHashAndIndex](./transaction.md#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](./transaction.md#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionByHash](./transaction.md#eth_gettransactionbyhash)
- [eth_getTransactionReceipt](./transaction.md#eth_gettransactionreceipt)
- [eth_sendRawTransaction](./transaction.md#eth_sendrawtransaction)
- [eth_sendTransaction](./transaction.md#eth_sendtransaction)
- [eth_signTransaction](./transaction.md#eth_signtransaction)
- [eth_fillTransaction](./transaction.md#eth_filltransaction)
- [eth_pendingTransactions](./transaction.md#eth_pendingtransactions)
- [eth_resend](./transaction.md#eth_resend)

### [Cấu hình](./config.md) <a id="configuration"></a>

- [eth_coinbase](./config.md#eth_coinbase)
- [eth_etherbase](./config.md#eth_etherbase)
- [eth_chainId](./config.md#eth_chainid)
- [eth_gasPrice](./config.md#eth_gasprice)

### [Bộ lọc](./filter.md) <a id="filter"></a>

- [eth_getFilterChanges](./filter.md#eth_getfilterchanges)
- [eth_getFilterLogs](./filter.md#eth_getfilterlogs)
- [eth_getLogs](./filter.md#eth_getlogs)
- [eth_newBlockFilter](./filter.md#eth_newblockfilter)
- [eth_newFilter](./filter.md#eth_newfilter)
- [eth_newPendingTransactionFilter](./filter.md#eth_newpendingtransactionfilter)
- [eth_subscribe](./filter.md#eth_subscribe)
- [eth_uninstallFilter](./filter.md#eth_uninstallfilter)
- [eth_unsubscribe](./filter.md#eth_unsubscribe)

### [Gas](./gas.md) <a id="gas"></a>

- [eth_feeHistory](./gas.md#eth_feehistory)
- [eth_maxPriorityFeePerGas](./gas.md#eth_maxpriorityfeepergas)

### [Khác](./misc.md) <a id="miscellaneous"></a>

- [eth_hashrate](./misc.md#eth_hashrate)
- [eth_getWork](./misc.md#eth_getwork)
- [eth_submitWork](./misc.md#eth_submitwork)
- [eth_submitHashrate](./misc.md#eth_submithashrate)

## Tổng quan về sự khác biệt so với Ethereum <a id="differences_overview_from_ethereum"></a>

> Vui lòng xem phần [Cảnh báo](./caution.md) mô tả chi tiết về sự khác biệt giữa Klaytn và Ethereum khi thực thi API không gian tên eth.

### Khối <a id="block"></a>

API liên quan: [eth_getHeaderByNumber](./block.md#eth_getHeaderByNumber), [eth_getHeaderByHash](./block.md#eth_getHeaderByHash), [eth_getBlockByHash](./block.md#eth_getBlockByHash), [eth_getBlockByNumber](./block.md#eth_getBlockByNumber), [eth_getUncleByBlockHashAndIndex](./block.md#eth_getUncleByBlockHashAndIndex), [eth_getUncleByBlockNumberAndIndex](./block.md#eth_getUncleByBlockNumberAndIndex).

| Trường          | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas   | Trường này luôn có giá trị `0x0` vì Klaytn không có chế độ baseFeePerGas.                                                                                                                                                                                                                                                                                                                                                          |
| độ khó          | Trường này tương ứng với `blockScore` trong tiêu đề Klaytn, được cố định thành `0x1`. Lý do là vì cơ chế đồng thuận của Klaytn không dựa trên PoW (bằng chứng xử lý) nhằm biểu thị khái niệm kỹ thuật về độ khó của khối không áp dụng cho nhân Klaytn.                                                                                                                                                         |
| extraData       | Trường này luôn có giá trị là `0x` biểu thị giá trị rỗng. Do `extraData` của Klaytn chứa dữ liệu đồng thuận như địa chỉ của người xác thực, chữ ký của người xác thực và chữ ký của người đề xuất nên dữ liệu này không thể áp dụng cho API không gian tên `eth`.                                                                                                                                                                  |
| gasLimit        | Trường này luôn có giá trị là `0xe8d4a50fff`(=`999999999999` ở dạng thập phân), đây là một con số bất kỳ vì Klaytn không có GasLimit. Tại thời điểm tạo bài viết này, con số này cao gấp 30 lần so với [giới hạn gas khối của Ethereum](https://ethereum.org/en/developers/docs/gas/#block-size). Vui lòng tham khảo [Chi phí tính toán](../../../learn/computation/computation-cost.md) để biết thêm chi tiết. |
| miner           | Trường này trả về địa chỉ của người đề xuất khối, vì [cơ chế đồng thuận](../../../learn/consensus-mechanism.md) của Klaytn là [PBFT](../../../learn/consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance), trong đó có một người đề xuất khối thay vì thợ đào.                                                                                                                                                          |
| mixHash         | Trường này luôn có giá trị là zeroHash (`0x00...`) vì cơ chế đồng thuận của Klaytn không dựa trên PoW.                                                                                                                                                                                                                                                                                                          |
| số dùng một lần | Trường này luôn có giá trị là zeroNonce (`0x00...`) do cơ chế đồng thuận của Klaytn không dựa trên PoW.                                                                                                                                                                                                                                                                                                         |
| sha3Uncles      | Trường này luôn có giá trị `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347`, là mã băm Keccak256 của các byte được mã hóa RLP của danh sách chứa tiêu đề khối trống vì không có khối chú trên Klaytn.                                                                                                                                                                                                          |
| totalDifficulty | Tổng độ khó của chuỗi cho đến khối truy vấn.                                                                                                                                                                                                                                                                                                                                                                                       |
| uncles          | Trường này luôn có giá trị `[]` vì không có khái niệm kỹ thuật về khối chú trong Klaytn core.                                                                                                                                                                                                                                                                                                                                      |

Các trường không được đề cập ở đây sẽ gán vào các trường khối của Ethereum.

### Giao dịch <a id="transaction"></a>

API liên quan: [eth_getTransactionByHash](./transaction.md#eth_getTransactionByHash), [eth_getTransactionByBlockHashAndIndex](./transaction.md#eth_getTransactionByBlockHashAndIndex), [eth_getTransactionByBlockNumberAndIndex](./transaction.md#eth_getTransactionByBlockNumberAndIndex), [eth_pendingTransactions](./transaction.md#eth_pendingTransactions).

> Do sự khác biệt cơ bản về thiết kế giữa Klaytn và Ethereum, Các giao dịch Klaytn không thể được hỗ trợ đầy đủ thông qua các API không gian tên `eth`.
> Klaytn transactions cannot be fully supported via `eth` namespace APIs.

| Trường  | Mô tả                                                                                                                                                                                                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| giá gas | Còn được gọi là [Đơn giá](../../../learn/transaction-fees.md#unit-price) trong bối cảnh của Klaytn, giá trị này được xác định trong hệ thống thông qua các quy trình quản trị.                                                                                                        |
| loại   | Trong Klaytn, `loại` trả về loại giao dịch theo chuỗi (ví dụ: `"LegacyTransaction"`), nhưng đã được chuyển đổi sang hệ thập lục phân (ví dụ: `0x0`) để khớp với Ethereum. Các loại giao dịch chỉ hợp lệ trong Klaytn luôn trả về giá trị `0x0`. |

Các giao dịch Klaytn có thể có nhiều hơn một chữ ký vì Klaytn hỗ trợ MultiSig (các giao dịch Ethereum chỉ có một trường chữ ký (= v, r, s)) ngay cả ở cấp độ giao thức.
Trong ngữ cảnh đó, các trường liên quan đến chữ ký (v, r, s) sẽ khớp với `tx.signatures[0].V`, `tx.signatures[0].R` và `tx.signatures[0].S`.

Các trường không được đề cập ở đây sẽ gán vào các trường giao dịch của Ethereum.

### Biên lai giao dịch <a id="transaction_receipt"></a>

API liên quan: [eth_getTransactionReceipt](./transaction.md#eth_getTransactionReceipt).

> Do sự khác biệt thiết kế cơ bản tồn tại giữa Klaytn và Ethereum, Biên lai giao dịch Klaytn không thể được hỗ trợ đầy đủ khi được cung cấp qua API không gian tên Ethereum.
> Klaytn transaction receipt cannot be fully supported when served via Ethereum namespace APIs.

| Trường            | Mô tả                                                                                                                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| effectiveGasPrice | Giá trị gasPrice được trả về do Klaytn áp dụng chính sách giá gas cố định. gasPrice (còn được gọi là [Đơn giá](../../../learn/transaction-fees.md#unit-price)) được cơ chế quản trị thiết lập trong hệ thống. |
| transactionIndex  | Gần giống như Ethereum nhưng khác với Ethereum ở chỗ Klaytn trả về số nguyên như khi giao dịch đang chờ xử lý.                                                                                                                   |

Các trường không được đề cập ở đây sẽ gán vào các trường giao dịch_receipt được đề xuất của Ethereum.
