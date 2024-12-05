# Lưu ý khi sử dụng không gian tên

Klaytn hỗ trợ các API không gian tên `eth`, do đó giờ đây các nhà phát triển sử dụng SDK hoặc công cụ dựa trên Ethereum có thể dễ dàng di chuyển các dự án hiện tại của họ sang Klaytn.
existing projects to Klaytn.
(Ví dụ: Bạn có thể thay thế URL điểm cuối trong các công cụ Ethereum để trỏ đến nút Klaytn.)

Tuy nhiên, do Klaytn và Ethereum có những khác biệt cơ bản trong thiết kế, một số API không thể được hỗ trợ đầy đủ.
some APIs cannot be fully supported. (Ví dụ: một số trường luôn có giá trị bằng 0)

Tài liệu này mô tả những hạn chế của các API đó.

## Tiêu đề của khối <a id="block_header"></a>

API liên quan: [eth_getHeaderByNumber](./block.md#eth_getheaderbynumber), [eth_getHeaderByHash](./block.md#eth_getheaderbyhash).

- Vui lòng đọc kỹ phần mô tả :warning:.
- Biểu tượng :white_check_mark: trong phần mô tả biểu thị rằng trường được dùng như trong Ethereum.

| Trường tiêu đề Ethereum | Trường tiêu đề Klaytn                     | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas           | (đã thêm)              | :warning: Trường này luôn có giá trị là `0x0` vì Klaytn không có chế độ baseFeePerGas.                                                                                                                                                                                                                                                                                                                                                  |
| difficulty              | (đã thêm)              | :warning: Trường này tương ứng với `blockScore` trong tiêu đề của Klaytn và có giá trị cố định là `0x1`. Lý do là vì cơ chế đồng thuận của Klaytn không dựa trên PoW (bằng chứng xử lý) nhằm biểu thị khái niệm kỹ thuật về độ khó của khối không áp dụng cho nhân Klaytn.                                                                                                                                           |
| extraData               | extraData                                 | :warning: Trường này luôn có giá trị là `0x` nhằm biểu thị giá trị rỗng. Do `extraData` của Klaytn chứa dữ liệu đồng thuận như địa chỉ của người xác thực, chữ ký của người xác thực và chữ ký của người đề xuất nên dữ liệu này không thể áp dụng cho API không gian tên `eth`.                                                                                                                                                        |
| gasLimit                | (đã thêm)              | :warning: Trường này luôn có giá trị là `0xe8d4a50fff`(=`999999999999` ở dạng thập phân), đây là con số tùy ý vì Klaytn không có GasLimit. Tại thời điểm tạo bài viết này, con số này cao gấp 30 lần so với [giới hạn gas khối của Ethereum](https://ethereum.org/en/developers/docs/gas/#block-size). Vui lòng tham khảo [Chi phí tính toán](../../../learn/computation/computation-cost.md) để biết thêm chi tiết. |
| gasUsed                 | gasUsed                                   | :white_check_mark: Một giá trị vô hướng bằng tổng số đơn vị gas dùng khi giao dịch trong khối này.                                                                                                                                                                                                                                                                                            |
|                         | governanceData(bỏ qua) | :warning: Trường này bị bỏ qua vì không tồn tại trong Tiêu đề của khối Ethereum.                                                                                                                                                                                                                                                                                                                                                        |
| hash                    | hash                                      | :white_check_mark: Hàm băm của một khối.                                                                                                                                                                                                                                                                                                                                                      |
| nhật kýBloom            | nhật kýBloom                              | :white_check_mark: Bộ lọc Bloom cho các bản ghi của khối. `null` khi đó là khối đang chờ xử lý.                                                                                                                                                                                                                                                                                               |
| miner                   | (đã thêm)              | :warning: Trường này trả về địa chỉ của người đề xuất khối, vì [cơ chế đồng thuận](../../../learn/consensus-mechanism.md) của Klaytn là [PBFT](../../../learn/consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance), trong đó có một người đề xuất khối thay vì thợ đào.                                                                                                                                                     |
| mixHash                 | (đã thêm)              | :warning: Trường này luôn có giá trị là zeroHash (`0x00...`) do cơ chế đồng thuận của Klaytn không dựa trên PoW.                                                                                                                                                                                                                                                                                                     |
| nonce                   | (đã thêm)              | :warning: Trường này luôn có giá trị là zeroNonce (`0x00...`) do cơ chế đồng thuận của Klaytn không dựa trên PoW.                                                                                                                                                                                                                                                                                                    |
| number                  | number                                    | :white_check_mark: Số khối.                                                                                                                                                                                                                                                                                                                                                                   |
| parentHash              | parentHash                                | :white_check_mark: Hàm băm của khối cha mẹ.                                                                                                                                                                                                                                                                                                                                                   |
| receiptsRoot            | receiptsRoot                              | :white_check_mark: gốc của trie biên lai trong khối.                                                                                                                                                                                                                                                                                                                                          |
|                         | reward(bỏ qua)         | :warning: Trường này bị bỏ qua vì không tồn tại trong Tiêu đề của khối Ethereum.                                                                                                                                                                                                                                                                                                                                                        |
| sha3Uncles              | (đã thêm)              | :warning: Trường này luôn có giá trị `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347`, đây là giá trị băm Keccak256 của các byte được mã hóa RLP thuộc danh sách chứa tiêu đề khối trống vì không có khối chú trên Klaytn.                                                                                                                                                                                          |
| size                    | size                                      | :white_check_mark: Kích thước của khối này tính bằng đơn vị byte.                                                                                                                                                                                                                                                                                                                             |
| stateRoot               | stateRoot                                 | :white_check_mark: Gốc của trie trạng thái cuối trong khối.                                                                                                                                                                                                                                                                                                                                   |
| dấu thời gian           | dấu thời gian                             | :white_check_mark: Dấu thời gian unix khi khối được đối chiếu.                                                                                                                                                                                                                                                                                                                                |
|                         | timestampFoS(omitted)  | :warning: Trường này bị bỏ qua vì không tồn tại trong Tiêu đề của khối Ethereum.                                                                                                                                                                                                                                                                                                                                                        |
| totalDifficulty         | (đã thêm)              | :warning: Tổng độ khó của chuỗi cho đến khối truy vấn.                                                                                                                                                                                                                                                                                                                                                                                  |
| transactionsRoot        | transactionsRoot                          | :white_check_mark: Gốc của trie giao dịch trong khối.                                                                                                                                                                                                                                                                                                                                         |

## Khối <a id="block"></a>

API liên quan: [eth_getBlockByHash](./block.md#eth_getblockbyhash), [eth_getBlockByNumber](./block.md#eth_getblockbynumber), [eth_getUncleByBlockHashAndIndex](./block.md#eth_getunclebyblockhashandindex), [eth_getUncleByBlockNumberAndIndex](./block.md#eth_getunclebyblocknumberandindex).

Vì Khối chứa các trường Tiêu đề và tiêu đề đã được trình bày ở trên, phần này mô tả các trường còn lại của khối ngoại trừ tiêu đề.
this section describes the remaining fields of the block except for header.

- Vui lòng đọc kỹ phần mô tả :warning:.
- Biểu tượng :white_check_mark: trong phần mô tả biểu thị rằng trường được dùng như trong Ethereum.

| Trường tiêu đề Ethereum | Trường tiêu đề Klaytn                | Mô tả                                                                                                                                                               |
| ----------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                         | voteData(omitted) | :warning: Trường này bị bỏ qua vì không tồn tại trong Khối Ethereum.                                                                                                |
| uncles                  | (đã thêm)         | :warning: Trường này luôn có giá trị là `[]` vì không có khái niệm kỹ thuật về khối chú trong nhân Klaytn.                                                          |
| giao dịch               | giao dịch                            | :white_check_mark: Mảng các đối tượng giao dịch hay các hàm băm giao dịch 32 byte phụ thuộc vào tham số cuối cùng đã cho. |

## Giao dịch <a id="transaction"></a>

API liên quan: [eth_getTransactionByHash](./transaction.md#eth_gettransactionbyhash), [eth_getTransactionByBlockHashAndIndex](./transaction.md#eth_gettransactionbyblockhashandindex), [eth_getTransactionByBlockNumberAndIndex](./transaction.md#eth_gettransactionbyblocknumberandindex), [eth_pendingTransactions](./transaction.md#eth_pendingtransactions).

Có rất nhiều loại giao dịch trong Klaytn và các trường cấu trúc dữ liệu thay đổi tùy theo loại.

Do đó, bạn phải kiểm tra xem cách các loại giao dịch Klaytn khác nhau được chuyển thành giao dịch Ethereum, bởi vì trong quá trình chuyển đổi, một số trường bị bỏ qua hoặc thêm vào giá trị bằng 0 hoặc giá trị giả.
during converting process some fields are omitted or added with zero or dummy values. Điều này có nghĩa là Một số thông tin quan trọng (đối với Klaytn) sẽ bị mất trong quá trình chuyển đổi.
Some important information(in terms of Klaytn) will be lost during converting.

Xin lưu ý rằng trong tài liệu này, chúng tôi định nghĩa Giao dịch cũ của Ethereum (EthereumLegacyTransaction) là định dạng giao dịch Ethereum trước đây [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

Khi bạn cố gắng truy vấn các giao dịch Klaytn qua api JSON-RPC của không gian tên eth, các giao dịch Klaytn sẽ được trả về dưới dạng Giao dịch cũ Ethereum.
return as Ethereum Legacy Transaction type.

Tài liệu này mô tả chi tiết quá trình chuyển đổi (Giao dịch Klaytn -> Giao dịch cũ Ethereum).

- Vui lòng đọc kỹ phần mô tả :warning:.
- Biểu tượng :white_check_mark: trong phần mô tả biểu thị rằng trường được dùng như trong Ethereum.

### Trường chung

Mặc dù có nhiều loại, những loại giao dịch trên Klaytn đều có các trường chung.
Phần này mô tả cách các trường chung đó được trình bày dưới dạng Giao dịch cũ Ethereum.

| Trường giao dịch cũ Ethereum | Trường giao dịch Klaytn                                                                             | Mô tả                                                                                                                                                                                                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash                    | blockHash                                                                                           | :white_check_mark: Hàm băm của một khối.                                                                                                                                                                                                              |
| blockNumber                  | blockNumber                                                                                         | :white_check_mark: Số khối.                                                                                                                                                                                                                           |
| từ                           | từ                                                                                                  | :white_check_mark: Địa chỉ của người gửi.                                                                                                                                                                                                             |
| gas                          | gas                                                                                                 | :white_check_mark: Gas do người gửi cung cấp.                                                                                                                                                                                                         |
| giá gas                      | giá gas                                                                                             | :warning: The price the most you can pay (e.g. suggestGasPrice = 2\*latestBlock.baseFee ). For detailed information, see [here](../../../learn/transaction-fees/transaction-fees.md#gas-price-overview).                                                                     |
| hash                         | hash                                                                                                | :white_check_mark: Hàm băm của giao dịch.                                                                                                                                                                                                             |
| nhập                         | (được nêu trong các phần bên dưới)                                               | Mô tả của trường này được nêu trong các mục giao dịch chi tiết bên dưới.                                                                                                                                                                                                                        |
| nonce                        | nonce                                                                                               | :white_check_mark: Số lượng giao dịch do người gửi thực hiện trước giao dịch này.                                                                                                                                                                     |
|                              | [senderTxHash](../../../learn/transactions/transactions.md#sendertxhash)(bỏ qua) | :warning: Trường này bị bỏ qua vì không tồn tại trong Giao dịch cũ Ethereum.                                                                                                                                                                                                                    |
|                              | signatures(bỏ qua)                                                               | :warning: Trường này bị bỏ qua vì không tồn tại trong Giao dịch cũ Ethereum.                                                                                                                                                                                                                    |
| đến                          | (được nêu trong các phần bên dưới)                                               | Mô tả của trường này được nêu trong các mục giao dịch chi tiết bên dưới.                                                                                                                                                                                                                        |
| transactionIndex             | transactionIndex                                                                                    | :warning: Gần giống như Ethereum nhưng khác với Ethereum ở chỗ Klaytn trả về số nguyên như khi giao dịch đang chờ xử lý.                                                                                                                                                                        |
| giá trị                      | (được nêu trong các phần bên dưới)                                               | Mô tả của trường này được nêu trong các mục giao dịch chi tiết bên dưới.                                                                                                                                                                                                                        |
| type                         | type(chuyển đổi)                                                                 | :warning: Trong Klaytn, `type` trả về loại giao dịch theo chuỗi (ví dụ: `"LegacyTransaction"`), nhưng đã được chuyển đổi sang hệ thập lục phân (ví dụ: `0x0`) để khớp với Ethereum. Các loại giao dịch chỉ hợp lệ trong Klaytn luôn trả về giá trị `0x0`. |
|                              | typeInt(bỏ qua)                                                                  | :warning: Trường này bị bỏ qua vì không tồn tại trong Giao dịch cũ Ethereum.                                                                                                                                                                                                                    |
| v                            | (đã thêm)                                                                        | :warning: Klaytn hỗ trợ MultiSig nên giao dịch trong Klaytn có thể có nhiều hơn một chữ ký. `signatures[0].V` được sử dụng làm giá trị của trường `v`.                                                                                                                                          |
| r                            | (đã thêm)                                                                        | :warning: Klaytn hỗ trợ MultiSig nên giao dịch trong Klaytn có thể có nhiều hơn một chữ ký. `signatures[0].R` được sử dụng làm giá trị của trường `r`.                                                                                                                                          |
| s                            | (đã thêm)                                                                        | :warning: Klaytn hỗ trợ MultiSig nên giao dịch trong Klaytn có thể có nhiều hơn một chữ ký. `signatures[0].S` được sử dụng làm giá trị của trường `s`.                                                                                                                                          |

### Các trường chung cho [FeeDelegation](../../../learn/transactions/fee-delegation.md)

Mặc dù có nhiều loại, những loại giao dịch [FeeDelegation](../../../learn/transactions/fee-delegation.md) trên Klaytn đều có các trường chung.
Phần này mô tả cách các trường chung cho feeDelegation (ngoại trừ các trường chung được đề cập ở trên) được trình bày dưới dạng Giao dịch cũ Ethereum.
are served as Ethereum Legacy Transaction.

| Trường giao dịch cũ Ethereum | Trường giao dịch FeeDelegation của Klaytn     | Mô tả                                                                        |
| ---------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------- |
|                              | feePayer(bỏ qua)           | :warning: Trường này bị bỏ qua vì không tồn tại trong Giao dịch cũ Ethereum. |
|                              | feePayerSignatures(bỏ qua) | :warning: Trường này bị bỏ qua vì không tồn tại trong Giao dịch cũ Ethereum. |

### Các trường chung cho [PartialFeeDelegation](../../../learn/transactions/partial-fee-delegation.md)

Mặc dù có nhiều loại, những loại giao dịch [PartialFeeDelegation](../../../learn/transactions/partial-fee-delegation.md) trên Klaytn đều có các trường chung.
Phần này mô tả cách các trường chung cho partialFeeDelegation (ngoại trừ các trường chung được đề cập ở trên) được trình bày dưới dạng Giao dịch cũ trên Ethereum.
are served as Ethereum Legacy Transaction.

| Trường giao dịch cũ Ethereum | Trường giao dịch PartialFeeDelegation của Klaytn | Mô tả                                                                        |
| ---------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
|                              | feeRatio(bỏ qua)              | :warning: Trường này bị bỏ qua vì không tồn tại trong Giao dịch cũ Ethereum. |

### Các trường khác nhau đối với từng loại giao dịch

#### LegacyTransaction

| Trường giao dịch cũ Ethereum | Trường LegacyTransaction Klaytn | Mô tả                                                                                                                         |
| ---------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| nhập                         | nhập                            | :white_check_mark: Dữ liệu được gửi cùng với giao dịch.                             |
| đến                          | đến                             | :white_check_mark: Địa chỉ của người nhận. `null` nếu đó là giao dịch tạo hợp đồng. |
| giá trị                      | giá trị                         | :white_check_mark: Giá trị được chuyển bằng Peb.                                    |

**Giao dịch cũTransaction Klaytn** được trình bày dưới dạng Giao dịch cũ Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0xe2bbb1580...",
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 0, omitted */
    "value": "0x0"
  }
}
```

#### ValueTransfer

| Trường giao dịch cũ Ethereum | Trường giao dịch ValueTransfer Klaytn | Mô tả                                                                                                                                        |
| ---------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| nhập                         | (đã thêm)          | :warning: Trường này luôn có giá trị là `0x` có nghĩa là đầu vào trống vì trường này không tồn tại trong giao dịch ValueTransfer của Klaytn. |
| đến                          | đến                                   | :white_check_mark: Địa chỉ của người nhận.                                                         |
| giá trị                      | giá trị                               | :white_check_mark: Giá trị được chuyển bằng Peb.                                                   |

**Giao dịch ValueTransfer Klaytn** được trình bày dưới dạng Giao dịch cũ Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0x", /** added */
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 8, omitted */
    "value": "0x49249695"
  }
}
```

#### ValueTransferMemo

| Trường giao dịch cũ Ethereum | Trường giao dịch ValueTransferMemo của Klaytn | Mô tả                                                                                             |
| ---------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| nhập                         | nhập                                          | :white_check_mark: Dữ liệu được gửi cùng với giao dịch. |
| đến                          | đến                                           | :white_check_mark: Địa chỉ của người nhận.              |
| giá trị                      | giá trị                                       | :white_check_mark: Giá trị được chuyển bằng Peb.        |

**Giao dịch ValueTransferMemo của Klaytn** được trình bày dưới dạng Giao dịch cũ Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0x32104204104", 
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 16, omitted */
    "value": "0x49249695"
  }
}
```

#### SmartContractDeploy

| Trường giao dịch cũ Ethereum | Trường giao dịch SmartContractDeploy của Klaytn | Mô tả                                                                                                                                                                 |
| ---------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                              | codeFormat(bỏ qua)           | :warning: Trường này bị bỏ qua vì không tồn tại trong Giao dịch cũ Ethereum.                                                                                          |
|                              | humanReadable(bỏ qua)        | :warning: Trường này bị bỏ qua vì không tồn tại trong Giao dịch cũ Ethereum.                                                                                          |
| nhập                         | nhập                                            | :white_check_mark: Dữ liệu được gửi cùng với giao dịch.                                                                     |
| đến                          | đến                                             | :white_check_mark: Địa chỉ của người nhận. Trường này luôn có giá trị là `null` vì giao dịch này là giao dịch tạo hợp đồng. |
| giá trị                      | giá trị                                         | :white_check_mark: Giá trị được chuyển bằng Peb.                                                                            |

**Giao dịch SmartContractDeploy của Klaytn** được trình bày dưới dạng Giao dịch cũ Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    /** "codeFormat": "0x0", omitted */
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    /** "humanReadable": false, omitted */
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "null",
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 40, omitted */
    "value": "0x0"
  }
}
```

#### SmartContractExecution

| Trường giao dịch cũ Ethereum | Trường giao dịch SmartContractExecution của Klaytn | Mô tả                                                                                             |
| ---------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| nhập                         | nhập                                               | :white_check_mark: Dữ liệu được gửi cùng với giao dịch. |
| đến                          | đến                                                | :white_check_mark: Địa chỉ của hợp đồng thông minh.     |
| giá trị                      | giá trị                                            | :white_check_mark: Giá trị được chuyển bằng Peb.        |

**Giao dịch SmartContractExecution trên Klaytn** được trình bày dưới dạng Giao dịch cũ Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x6e71df210046227af62323ae35c0ea5e606a349c",
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 48, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

#### AccountUpdate

| Trường giao dịch cũ Ethereum | Trường giao dịch AccountUpdate trên Klaytn | Mô tả                                                                                                                                                                                                         |
| ---------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                              | key(bỏ qua)             | :warning: Trường này bị bỏ qua vì không tồn tại trong Giao dịch cũ Ethereum.                                                                                                                                  |
| nhập                         | (đã thêm)               | :warning: Trường này luôn có giá trị là `0x` có nghĩa là đầu vào trống vì trường này không tồn tại trong giao dịch AccountUpdate của Klaytn.                                                                  |
| đến                          | (đã thêm)               | :warning: Trường này luôn có cùng địa chỉ với `from` vì trường này không tồn tại trong giao dịch AccountUpdate trên Klaytn và việc đưa ra giá trị của trường này dưới dạng địa chỉ `from` là có ý nghĩa nhất. |
| giá trị                      | (đã thêm)               | :warning: Trường này luôn có giá trị là `0x0` vì trường này không tồn tại trong giao dịch AccountUpdate trên Klaytn.                                                                                          |

**Giao dịch AccountUpdate trên Klaytn** được trình bày dưới dạng Giao dịch cũ Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    /** "key": "0x02a103bf900d727fcbb4baa9f9ffc840ba947af7c7dae52ad6ef453ab5d50942e18b2f", omitted */
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 32, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

#### Cancel

| Trường giao dịch cũ Ethereum | Trường giao dịch Cancel trên Klaytn | Mô tả                                                                                                                                                                                                  |
| ---------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| nhập                         | (đã thêm)        | :warning: Trường này luôn có giá trị là `0x`, có nghĩa là đầu vào trống vì trường này không tồn tại trong giao dịch Cancel trên Klaytn.                                                                |
| đến                          | (đã thêm)        | :warning: Trường này luôn có cùng địa chỉ với `from` vì trường này không tồn tại trong giao dịch Cancel trên Klaytn và việc đưa ra giá trị của trường này dưới dạng địa chỉ `from` là có ý nghĩa nhất. |
| giá trị                      | (đã thêm)        | :warning: Trường này luôn có giá trị là `0x0` vì trường này không tồn tại trong giao dịch Cancel trên Klaytn.                                                                                          |

**Giao dịch Cancel trên Klaytn** được trình bày dưới dạng Giao dịch cũ Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    "input": "0x", /** added */
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 56, omitted */
    "value": "0x0" /** added */
  }
}
```

#### ChainDataAnchoring

| Trường giao dịch cũ Ethereum | Trường giao dịch ChainDataAnchoring Klaytn | Mô tả                                                                                                                                                                                                              |
| ---------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| nhập                         | nhập                                       | :white_check_mark: Dữ liệu được gửi cùng với giao dịch.                                                                                                                  |
|                              | inputJSON(bỏ qua)       | :warning: Trường này bị bỏ qua vì không tồn tại trong Giao dịch cũ Ethereum.                                                                                                                                       |
| đến                          | (đã thêm)               | :warning: Trường này luôn có cùng địa chỉ với `from` vì trường này không tồn tại trong giao dịch ChainDataAnchoring trên Klaytn và việc đưa ra giá trị của trường này dưới dạng địa chỉ `from` là có ý nghĩa nhất. |
| giá trị                      | (đã thêm)               | :warning: Trường này luôn có giá trị là `0x0` vì trường này không tồn tại trong giao dịch ChainDataAnchoring trên Klaytn.                                                                                          |

**Giao dịch ChainDataAnchoring trên Klaytn** được trình bày dưới dạng Giao dịch cũ Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xfec3dab64552e3148d8dbf8fba0bdcc4f170b458683065cf47e67c35e45ac395",
    "blockNumber": "0x3052bb2",
    "from": "0x89ecb00d2a52f2d4ead1578d60928a19ad3224bd",
    "gas": "0x186a0",
    "gasPrice": "0x5d21dba00",
    "hash": "0x9d64d2fb416cb4e4c2c9a4575b627d291c5139d477356af767f35dc5a887c138",
    "input": "0xf8129412941294129.",
    /** "inputJSON": {
      "blockHash": "0x2b69e9532eddd9a25dc48c53253d8bc93a29770362a8f778fe799e3493cad626",
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "parentHash": "0x094084ac3580231708c2a2dcbcf39f712a61dcc070b76a7eaaaf8b6f07a9549c",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "stateRoot": "0x768b8ae0874e4ac5e3ef9bccbeb417b4207d562b85dfb30ecf9cc8344209a5e6",
      "blockNumber": 43372800,
      "blockCount": 86400,
      "txCount": 53777
    }, omitted */
    "nonce": "0x278",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x89ecb00d2a52f2d4ead1578d60928a19ad3224bd", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 72, omitted */
    "value": "0x0" /** added */
  }
}
```

## Biên lai giao dịch <a id="transaction_receipt"></a>

API liên quan: [eth_getTransactionReceipt](./transaction.md#eth_gettransactionreceipt).

Theo mặc định, các trường trong Biên lai giao dịch trên Klaytn khác nhau tùy thuộc vào loại giao dịch.
Do có rất nhiều loại giao dịch trong Klaytn, các trường biên lai giao dịch thay đổi tùy theo loại giao dịch.

Khi bạn cố gắng truy vấn các biên lai giao dịch trên Klaytn qua api JSON-RPC của không gian tên eth, các TransactionReceipt trên Klaytn sẽ được trả về dưới dạng Biên lai giao dịch trên Ethereum.
Klaytn TransactionReceipt will be returned as Ethereum Transaction Receipt.

Tài liệu này mô tả chi tiết quá trình chuyển đổi (Biên lai giao dịch trên Klaytn -> Biên lai giao dịch trên Ethereum).

- Vui lòng đọc kỹ phần mô tả :warning:.
- Biểu tượng :white_check_mark: trong phần mô tả biểu thị rằng trường được dùng như trong Ethereum.

### Trường chung

Mặc dù có nhiều loại, những loại giao dịch trên Klaytn đều có các trường chung.
(Xin lưu ý rằng các trường Biên lai giao dịch trên Klaytn thay đổi tùy theo loại giao dịch.)

Phần này mô tả cách các trường chung đó được trình bày dưới dạng Biên lai giao dịch trên Ethereum.

| Trường Biên lai giao dịch trên Ethereum | Trường biên lai giao dịch Klaytn                                                                    | Mô tả                                                                                                                                                                                                                                                                                               |
| --------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash                               | blockHash                                                                                           | :white_check_mark: Hàm băm của một khối.                                                                                                                                                                                                                  |
| blockNumber                             | blockNumber                                                                                         | :white_check_mark: Số khối.                                                                                                                                                                                                                               |
| contractAddress                         | contractAddress                                                                                     | :white_check_mark: Địa chỉ hợp đồng được tạo nếu giao dịch là giao dịch tạo hợp đồng, nếu không, giá trị là - `null`.                                                                                                                                     |
| cumulativeGasUsed                       | (đã thêm)                                                                        | :warning: Tổng lượng gas đã dùng khi giao dịch này được thực hiện trong khối. Trường này có ý nghĩa tương tự như trường Ethereum.                                                                                                                                                                   |
| effectiveGasPrice                       | (đã thêm)                                                                        | :warning: Giá trị gasPrice được trả về do Klaytn áp dụng chính sách giá gas cố định. gasPrice(còn được gọi là [Đơn giá](../../../learn/transaction-fees.md#unit-price)) được cơ chế quản trị thiết lập trong hệ thống.                                                           |
| từ                                      | từ                                                                                                  | :white_check_mark: Địa chỉ của người gửi.                                                                                                                                                                                                                 |
|                                         | gas(bỏ qua)                                                                      | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                                                                                                                                                                                             |
| gasUsed                                 | gasUsed                                                                                             | :white_check_mark: lượng gas đã dùng trong riêng giao dịch cụ thể này.                                                                                                                                                                                    |
|                                         | gasPrice(bỏ qua)                                                                 | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                                                                                                                                                                                             |
| nhật ký                                 | nhật ký                                                                                             | :white_check_mark: Mảng bao gồm các đối tượng bản ghi do giao dịch tạo ra.                                                                                                                                                                                |
| nhật kýBloom                            | nhật kýBloom                                                                                        | :white_check_mark: Bộ lọc Bloom dành cho các ứng dụng khách nhẹ giúp truy xuất nhanh các nhật ký liên quan.                                                                                                                                               |
|                                         | nonce(bỏ qua)                                                                    | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                                                                                                                                                                                             |
|                                         | [senderTxHash](../../../learn/transactions/transactions.md#sendertxhash)(bỏ qua) | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                                                                                                                                                                                             |
|                                         | signatures(bỏ qua)                                                               | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                                                                                                                                                                                             |
| trạng thái                              | trạng thái                                                                                          | :white_check_mark: 1(thành công) hoặc 0(thất bại).                                                                                                                                                                  |
| đến                                     | (được nêu trong các phần bên dưới)                                               | Mô tả của trường này được nêu trong các mục giao dịch chi tiết bên dưới.                                                                                                                                                                                                                            |
| transactionHash                         | transactionHash                                                                                     | :white_check_mark: Hàm băm của giao dịch.                                                                                                                                                                                                                 |
| transactionIndex                        | transactionIndex                                                                                    | :warning: Gần giống như Ethereum nhưng khác với Ethereum ở chỗ Klaytn trả về số nguyên như khi giao dịch đang chờ xử lý.                                                                                                                                                                            |
| type                                    | type(chuyển đổi)                                                                 | :warning: Giá trị và loại dữ liệu của trường này được chuyển đổi. Loại trường này là một chuỗi(ví dụ: `"LegacyTransaction"`) trong Klaytn nhưng được chuyển đổi và trình bày dưới dạng thập lục phân(ví dụ: `0x`) giống như Biên lai giao dịch trên Ethereum. |
|                                         | typeInt(bỏ qua)                                                                  | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                                                                                                                                                                                             |

### Các trường chung cho [FeeDelegation](../../../learn/transactions/fee-delegation.md)

Mặc dù có nhiều loại, những loại giao dịch [FeeDelegation](../../../learn/transactions/fee-delegation.md) trên Klaytn đều có các trường chung.
(Xin lưu ý rằng các trường Biên lai giao dịch trên Klaytn thay đổi tùy theo loại giao dịch.)

Phần này mô tả cách các trường chung cho feeDelegation (ngoại trừ các trường chung được đề cập ở trên) được trình bày dưới dạng Biên lai giao dịch trên Ethereum.
are served as Ethereum Transaction Receipt.

| Trường Biên lai giao dịch trên Ethereum | Trường biên lai giao dịch FeeDelegation trên Klaytn | Mô tả                                                                                   |
| --------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------- |
|                                         | feePayer(bỏ qua)                 | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum. |
|                                         | feePayerSignatures(bỏ qua)       | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum. |

### Các trường chung cho [PartialFeeDelegation](../../../learn/transactions/partial-fee-delegation.md)

Mặc dù có nhiều loại, những loại giao dịch [PartialFeeDelegation](../../../learn/transactions/partial-fee-delegation.md) trên Klaytn đều có các trường chung.
(Xin lưu ý rằng các trường Biên lai giao dịch trên Klaytn thay đổi tùy theo loại giao dịch.)

Phần này mô tả cách các trường chung cho partialFeeDelegation (ngoại trừ các trường chung được đề cập ở trên) được trình bày dưới dạng Biên lai giao dịch trên Ethereum.

| Trường Biên lai giao dịch trên Ethereum | Trường biên lai giao dịch PartialFeeDelegation trên Klaytn | Mô tả                                                                                   |
| --------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------- |
|                                         | feeRatio(bỏ qua)                        | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum. |

### Các trường khác nhau đối với từng loại giao dịch

#### Biên lai LegacyTransaction

| Trường biên lai giao dịch trên Ethereum | Trường biên lai LegacyTransaction Klaytn | Mô tả                                                                                                                         |
| --------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
|                                         | input(bỏ qua)         | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                       |
| đến                                     | đến                                      | :white_check_mark: Địa chỉ của người nhận. `null` nếu đó là giao dịch tạo hợp đồng. |
|                                         | value(bỏ qua)         | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                       |

**Biên lai LegacyTransaction trên Klaytn** được trình bày dưới dạng Biên lai giao dịch trên Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    /** "gas": "0x204c8e", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x1c278",
    /** "input": "0xe2b...", omitted */
    "logs": [
      {
        "address": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
        "topics": [
          "0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15",
          "0x000000000000000000000000bd4fa032e6afe41cacde8e3292fb129b857bfca8",
          "0x0000000000000000000000000000000000000000000000000000000000000003"
        ],
        "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "blockNumber": "0x47ef00c",
        "transactionHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
        "transactionIndex": "0xe",
        "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
        "logIndex": "0xa",
        "removed": false
      }
    ],
    "logsBloom": "0x00...",
    /** "nonce": "0x22aa", omitted */
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "status": "0x1",
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 0, omitted */
    /** "value": "0x0" omitted */
  }
}
```

#### Biên lai giao dịch ValueTransfer

| Trường Biên lai giao dịch trên Ethereum | Trường biên lai giao dịch ValueTransfer Klaytn | Mô tả                                                                                   |
| --------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| đến                                     | đến                                            | :white_check_mark: Địa chỉ của người nhận.    |
|                                         | value(bỏ qua)               | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum. |

**Biên lai giao dịch ValueTransfer Klaytn** được trình bày dưới dạng Biên lai giao dịch Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 8, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### Biên lai giao dịch ValueTransferMemo

| Trường Biên lai giao dịch trên Ethereum | Trường biên lai giao dịch ValueTransferMemo của Klaytn | Mô tả                                                                                   |
| --------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------- |
|                                         | input(bỏ qua)                       | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum. |
| đến                                     | đến                                                    | :white_check_mark: Địa chỉ của người nhận.    |
|                                         | value(bỏ qua)                       | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum. |

**Giao dịch ValueTransferMemo trên Klaytn** được trình bày dưới dạng Biên lai giao dịch trên Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0x32142912492149122", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 16, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### Biên lai giao dịch SmartContractDeploy

| Trường Biên lai giao dịch trên Ethereum | Trường biên lai giao dịch SmartContractDeploy Klaytn | Mô tả                                                                                                                                                                 |
| --------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                         | codeFormat(bỏ qua)                | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                                                               |
|                                         | humanReadable(bỏ qua)             | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                                                               |
|                                         | nhập                                                 | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum                                                                                |
| đến                                     | đến                                                  | :white_check_mark: Địa chỉ của người nhận. Trường này luôn có giá trị là `null` vì giao dịch này là giao dịch tạo hợp đồng. |
|                                         | giá trị                                              | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum                                                                                |

**Biên lai giao dịch SmartContractDeploy trên Klaytn** được trình bày dưới dạng Biên lai giao dịch trên Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    /** "codeFormat": "0x0", omitted */
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "humanReadable": false, omitted */
    /** "input": "0x6080...", omitted */
    "logs": [
      {
        "address": "0xf1ac00f758a5baf71507e1d62e2c9dab6aaaf49f",
        "topics": [
          "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x000000000000000000000000760fcf5159263b7cf39b0751e7d2bb008d09147d"
        ],
        "data": "0x",
        "blockNumber": "0x4857712",
        "transactionHash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
        "transactionIndex": "0x6",
        "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
        "logIndex": "0x42",
        "removed": false
      }
    ],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": null,
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 40, omitted */
    /** "value": "0x0" omitted */
  }
}
```

#### Biên lai giao dịch SmartContractExecution

| Trường Biên lai giao dịch trên Ethereum | Trường biên lai giao dịch SmartContractExecution trên Klaytn | Mô tả                                                                                         |
| --------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
|                                         | nhập                                                         | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.       |
| đến                                     | đến                                                          | :white_check_mark: Địa chỉ của hợp đồng thông minh. |
|                                         | giá trị                                                      | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.       |

**Biên lai giao dịch SmartContractExecution trên Klaytn** được trình bày dưới dạng Biên lai giao dịch trên Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0x32142912492149122", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 48, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### Biên lai giao dịch AccountUpdate

| Trường Biên lai giao dịch trên Ethereum | Trường biên lai giao dịch AccountUpdate trên Klaytn | Mô tả                                                                                                                                                                                                                  |
| --------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                         | key(bỏ qua)                      | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                                                                                                                |
| đến                                     | (đã thêm)                        | :warning: Trường này luôn có cùng địa chỉ với `from` vì trường này không tồn tại trong biên lai giao dịch AccountUpdate trên Klaytn và việc đưa ra giá trị của trường này dưới dạng địa chỉ `from` là có ý nghĩa nhất. |

**Biên lai giao dịch AccountUpdate trên Klaytn** được trình bày dưới dạng Biên lai giao dịch trên Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "key": "0x02a102a288c3fb864a012dbe6ca84fcd2afcd9b390cf473b4d35a0126c3164ac3e7f73", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 32, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### Biên lai giao dịch Cancel

| Trường Biên lai giao dịch trên Ethereum | Trường biên lai giao dịch Cancel trên Klaytn | Mô tả                                                                                                                                                                                                           |
| --------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| đến                                     | (đã thêm)                 | :warning: Trường này luôn có cùng địa chỉ với `from` vì trường này không tồn tại trong biên lai giao dịch Cancel trên Klaytn và việc đưa ra giá trị của trường này dưới dạng địa chỉ `from` là có ý nghĩa nhất. |

**Biên lai giao dịch Cancel trên Klaytn** được trình bày dưới dạng Biên lai giao dịch trên Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 56, omitted */
  }
}
```

#### Biên lai giao dịch ChainDataAnchoring

| Trường Biên lai giao dịch trên Ethereum | Trường biên lai giao dịch ChainDataAnchoring Klaytn | Mô tả                                                                                                                                                                                                                       |
| --------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                         | input(bỏ qua)                    | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                                                                                                                     |
|                                         | inputJSON(bỏ qua)                | :warning: Trường này bị bỏ qua vì không tồn tại trong Biên lai giao dịch trên Ethereum.                                                                                                                                     |
| đến                                     | (đã thêm)                        | :warning: Trường này luôn có cùng địa chỉ với `from` vì trường này không tồn tại trong biên lai giao dịch ChainDataAnchoring trên Klaytn và việc đưa ra giá trị của trường này dưới dạng địa chỉ `from` là có ý nghĩa nhất. |

**Biên lai giao dịch ChainDataAnchoring trên Klaytn** được trình bày dưới dạng Biên lai giao dịch trên Ethereum như dưới đây.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0xf8...", omitted */
    /** "inputJSON": {
      "blockHash": "0x2b69e9532eddd9a25dc48c53253d8bc93a29770362a8f778fe799e3493cad626",
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "parentHash": "0x094084ac3580231708c2a2dcbcf39f712a61dcc070b76a7eaaaf8b6f07a9549c",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "stateRoot": "0x768b8ae0874e4ac5e3ef9bccbeb417b4207d562b85dfb30ecf9cc8344209a5e6",
      "blockNumber": 43372800,
      "blockCount": 86400,
      "txCount": 53777
    }, omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 72, omitted */
  }
}
```
