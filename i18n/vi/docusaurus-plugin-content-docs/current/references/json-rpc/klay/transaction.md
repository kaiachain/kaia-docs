# Giao dịch

## klay_call <a id="klay_call"></a>

Thực thi lệnh gọi thông báo ngay mà không tạo giao dịch trên chuỗi khối. Trả về dữ liệu hoặc đối tượng lỗi của JSON RPC nếu xảy ra lỗi.

**Tham số**

| Tên               | type                       | Mô tả                                                                                                                                                                               |
| ----------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callObject        | Đối tượng                  | Đối tượng lệnh gọi giao dịch.  Xem bảng tiếp theo để biết thuộc tính của đối tượng.                                                                                                 |
| blockNumberOrHash | SỐ LƯỢNG \| THẺ \| HÀM BĂM | Số khối nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](./block.md#the-default-block-parameter) hoặc hàm băm khối. |

:::note

LƯU Ý: Trong các phiên bản trước phiên bản Klaytn v1.7.0, chỉ có số khối số nguyên, chuỗi `"earliest"` và `"latest"` khả dụng.

:::

`callObject` có các thuộc tính như sau:

| Tên     | Loại           | Mô tả                                                                                                                                                                             |
| ------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ      | DỮ LIỆU 20 byte | (tùy chọn) Địa chỉ nơi giao dịch được gửi đi.                                                                                                                  |
| đến     | DỮ LIỆU 20 byte | (tùy chọn khi thử nghiệm triển khai hợp đồng mới) Địa chỉ mà giao dịch được chuyển đến.                                                                        |
| gas     | SỐ LƯỢNG        | (tùy chọn) Giá trị nguyên của gas được cung cấp để thực hiện giao dịch. `klay_call` không sử dụng gas, nhưng một số lần thực thi có thể cần tham số này.       |
| giá gas | SỐ LƯỢNG        | (tùy chọn) Giá trị nguyên của gasPrice được sử dụng cho mỗi loại gas đã thanh toán.                                                                            |
| giá trị | SỐ LƯỢNG        | (tùy chọn) Giá trị nguyên được gửi cùng với giao dịch.                                                                                                         |
| nhập    | DATA            | (tùy chọn) Hàm băm của chữ ký phương pháp và tham số mã hóa. Dùng để thay thế trường `data`, nhưng trường 'data' vẫn được hỗ trợ để đảm bảo tương thích ngược. |

**Giá trị trả về**

| Loại | Mô tả                                     |
| ----- | ----------------------------------------- |
| DATA  | Giá trị trả về của hợp đồng đã thực hiện. |

Nếu bạn đã triển khai hợp đồng, hãy sử dụng [klay_getTransactionReceipt](#klay_gettransactionreceipt) để lấy địa chỉ hợp đồng.

**Lỗi**

Thao tác này sẽ trả về một đối tượng lỗi JSON RPC nếu xảy ra sự cố.
Ví dụ, một đối tượng lỗi có thông báo "evm: đã hoàn nguyên việc thực hiện" sẽ được tạo nếu lệnh gọi thông báo bị chấm dứt bằng mã tác vụ `REVERT`.

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_call", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x8ada066e"}, "latest"], "id": 1}' https://public-en-baobab.klaytn.net

// Result
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000000a"}
```

## klay_estimateGas <a id="klay_estimategas"></a>

Tạo và trả về giá trị ước tính về lượng gas cần thiết để cho phép hoàn tất giao dịch. Giao dịch sẽ không được thêm vào chuỗi khối. Lưu ý rằng giá trị ước tính có thể lớn hơn nhiều so với lượng gas mà giao dịch sử dụng thực tế vì một số lý do bao gồm cơ chế Klaytn Virtual Machine và hiệu suất của nút.

**Tham số**

| Tên        | Loại     | Mô tả                                                                               |
| ---------- | --------- | ----------------------------------------------------------------------------------- |
| callObject | Đối tượng | Đối tượng lệnh gọi giao dịch.  Xem bảng tiếp theo để biết thuộc tính của đối tượng. |

`callObject` có các thuộc tính như sau:

| Tên     | Loại           | Mô tả                                                                                                                                                                                                                  |
| ------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ      | DỮ LIỆU 20 byte | (tùy chọn) Địa chỉ nơi giao dịch được gửi đi.                                                                                                                                                       |
| đến     | DỮ LIỆU 20 byte | (tùy chọn khi thử nghiệm triển khai hợp đồng mới) Địa chỉ mà giao dịch được chuyển đến.                                                                                                             |
| gas     | SỐ LƯỢNG        | (tùy chọn) Giá trị nguyên chỉ giới hạn trên của gas được cung cấp để ước tính gas. Nếu không có giới hạn gas nào được chỉ định, nút Klaytn sẽ sử dụng giới hạn gas được chỉ định làm giới hạn trên. |
| giá gas | SỐ LƯỢNG        | (tùy chọn) Giá trị nguyên của gasPrice được sử dụng cho mỗi loại gas đã thanh toán.                                                                                                                 |
| giá trị | SỐ LƯỢNG        | (tùy chọn) Giá trị nguyên được gửi cùng với giao dịch.                                                                                                                                              |
| nhập    | DATA            | (tùy chọn) Hàm băm của chữ ký phương pháp và tham số mã hóa. Dùng để thay thế trường `data`, nhưng trường 'data' vẫn được hỗ trợ để đảm bảo tương thích ngược.                                      |

**Giá trị trả về**

| Loại    | Mô tả                   |
| -------- | ----------------------- |
| SỐ LƯỢNG | Lượng gas được sử dụng. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_estimateGas", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x8ada066e"}], "id": 1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x5208" // 21000
}
```

## klay_estimateComputationCost <a id="klay_estimatecomputationcost"></a>

Tạo và trả về ước tính chi phí tính toán sẽ được sử dụng để thực hiện giao dịch.
Klaytn giới hạn chi phí tính toán của một giao dịch ở mức `100000000`, hiện không mất quá nhiều thời gian cho một giao dịch.
Giao dịch sẽ không được thêm vào chuỗi khối như [klay_estimateGas](#klay_estimategas).

**Tham số**

Xem các thông số [klay_call](#klay_call), ngoại trừ việc tất cả các thuộc tính đều là tùy chọn.
Nếu không chỉ định giới hạn gas, nút Klaytn sẽ sử dụng giới hạn gas mặc định (uint64/2) làm giới hạn trên.

**Giá trị trả về**

| type     | Mô tả                                 |
| -------- | ------------------------------------- |
| SỐ LƯỢNG | Lượng chi phí tính toán được sử dụng. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_estimateComputationCost","params":[{"from":"0x73718c4980728857f3aa5148e9d1b471efa3a7dd", "to":"0x069942a3ca0dabf495dba872533134205764bc9c", "value":"0x0", "input":"0x2a31efc7000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000003039"}, "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x1e8b0ad"
}
```

## klay_getTransactionByBlockHashAndIndex <a id="klay_gettransactionbyblockhashandindex"></a>

Trả về thông tin về giao dịch của khối theo hàm băm và vị trí chỉ mục của giao dịch.
API này chỉ hoạt động trên lệnh gọi RPC, không hoạt động trên bảng điều khiển JavaScript.

**Tham số**

| Loại           | Mô tả                                                 |
| --------------- | ----------------------------------------------------- |
| DỮ LIỆU 32 byte | Hàm băm của một khối.                                 |
| SỐ LƯỢNG        | Giá trị nguyên biểu thị vị trí chỉ mục của giao dịch. |

**Giá trị trả về**

Xem [klay_getTransactionByHash](#klay_gettransactionbyhash)

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByBlockHashAndIndex","params":["0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68", "0x0"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x0591ceb74102fc4ed54b66d27e869224d481e9f44170b25ed4a5654675043198",
    "blockNumber":"0x27",
    "from":"0xe02837b9d671e0848e599c374416f383f8910e45",
    "gas":"0xf4240",
    "gasPrice":"0x5d21dba00",
    "hash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "input":"0x",
    "nonce":"0x1",
    "senderTxHash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "signatures":[
      {
        "V":"0xfea",
        "R":"0x1924d0f36e05d368a37b8130b85067f21f0ea1d35b87bf137216cdc3c844c762",
        "S":"0x31d61be4d5cf677e60ad0fa0214e75c3167509c8d8905d7c6f85979b5f32eead"
      }
    ],
    "to":"0x44d827f98430784c8e3401748d8ba92c43df4546",
    "transactionIndex":"0x0",
    "type":"TxTypeLegacyTransaction",
    "typeInt":0,
    "value":"0xde0b6b3a7640000"
  }
}
```

## klay_getTransactionByBlockNumberAndIndex <a id="klay_gettransactionbyblocknumberandindex"></a>

Trả về thông tin về giao dịch theo số khối và vị trí chỉ mục của giao dịch.
API này chỉ hoạt động trên lệnh gọi RPC, không hoạt động trên bảng điều khiển JavaScript.

**Tham số**

| Loại           | Mô tả                                                                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG \| THẺ | Số khối nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](./block.md#the-default-block-parameter). |
| SỐ LƯỢNG        | Vị trí chỉ mục của giao dịch.                                                                                                                                     |

:::note

LƯU Ý: Trong các phiên bản trước phiên bản Klaytn v1.7.0, chỉ có số khối số nguyên, chuỗi `"earliest"` và `"latest"` khả dụng.

:::

**Giá trị trả về**

Xem [klay_getTransactionByHash](#klay_gettransactionbyhash)

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByBlockNumberAndIndex","params":["0x27", "0x0"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x0591ceb74102fc4ed54b66d27e869224d481e9f44170b25ed4a5654675043198",
    "blockNumber":"0x27",
    "from":"0xe02837b9d671e0848e599c374416f383f8910e45",
    "gas":"0xf4240",
    "gasPrice":"0x5d21dba00",
    "hash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "input":"0x",
    "nonce":"0x1",
    "senderTxHash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "signatures":[
      {
        "V":"0xfea",
        "R":"0x1924d0f36e05d368a37b8130b85067f21f0ea1d35b87bf137216cdc3c844c762",
        "S":"0x31d61be4d5cf677e60ad0fa0214e75c3167509c8d8905d7c6f85979b5f32eead"
      }
    ],
    "to":"0x44d827f98430784c8e3401748d8ba92c43df4546",
    "transactionIndex":"0x0",
    "type":"TxTypeLegacyTransaction",
    "typeInt":0,
    "value":"0xde0b6b3a7640000"
  }
}
```

## klay_getTransactionByHash <a id="klay_gettransactionbyhash"></a>

Trả về thông tin về một giao dịch được yêu cầu theo hàm băm giao dịch.
API này chỉ hoạt động trên lệnh gọi RPC, không hoạt động trên bảng điều khiển JavaScript.

**Tham số**

| Loại           | Mô tả                      |
| --------------- | -------------------------- |
| DỮ LIỆU 32 byte | Hàm băm của một giao dịch. |

**Giá trị trả về**

`Object` - Đối tượng giao dịch, hoặc `null` khi không tìm thấy giao dịch:

| Tên                | Loại           | Mô tả                                                                                                                                                                                                                            |
| ------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | DỮ LIỆU 32 byte | Hàm băm của khối chứa giao dịch này. `null` nếu đó là giao dịch đang chờ xử lý.                                                                                                                                                  |
| blockNumber        | SỐ LƯỢNG        | Số khối chứa giao dịch này. `null` nếu đó là giao dịch đang chờ xử lý.                                                                                                                                                           |
| codeFormat         | Chuỗi           | (tùy chọn) Định dạng mã của mã hợp đồng thông minh.                                                                                                                                                           |
| feePayer           | DỮ LIỆU 20 byte | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                         |
| feePayerSignatures | Mảng            | (tùy chọn) Mảng các đối tượng chữ ký của người trả phí. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s. |
| feeRatio           | SỐ LƯỢNG        | (tùy chọn) Tỷ lệ phí của người trả phí. Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí. 70% còn lại sẽ được trả bởi người gửi.                                                                            |
| từ                 | DỮ LIỆU 20 byte | Địa chỉ của người gửi.                                                                                                                                                                                                           |
| gas                | SỐ LƯỢNG        | Gas được người gửi cung cấp.                                                                                                                                                                                                     |
| giá gas            | SỐ LƯỢNG        | Giá gas được người gửi cung cấp theo đơn vị peb.                                                                                                                                                                                 |
| hash               | DỮ LIỆU 32 byte | Hàm băm của giao dịch.                                                                                                                                                                                                           |
| humanReadable      | Boolean         | (tùy chọn) `true` nếu địa chỉ con người có thể đọc được, ngược lại sẽ là `false`.                                                                                                                             |
| khóa               | Chuỗi           | (tùy chọn) Mã khóa của tài khoản mới tạo.                                                                                                                                                                     |
| nhập               | DATA            | (tùy chọn) Dữ liệu được gửi cùng với giao dịch.                                                                                                                                                               |
| số dùng một lần    | SỐ LƯỢNG        | Số lượng giao dịch được người gửi thực hiện trước giao dịch này.                                                                                                                                                                 |
| senderTxHash       | DỮ LIỆU 32 byte | Hàm băm của một giao dịch chỉ được người gửi ký. Xem [SenderTxHash](../../../learn/transactions/transactions.md#sendertxhash). Giá trị này luôn giống với `hàm băm` đối với các giao dịch không phải trả phí.                    |
| chữ ký             | Mảng            | Một mảng các đối tượng chữ ký. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                                             |
| đến                | DỮ LIỆU 20 byte | Địa chỉ của người nhận. `null` nếu đó là giao dịch tạo hợp đồng.                                                                                                                                                                 |
| transactionIndex   | SỐ LƯỢNG        | Giá trị nguyên biểu thị vị trí chỉ mục của giao dịch trong khối. `null` nếu đó là giao dịch đang chờ xử lý.                                                                                                                      |
| loại              | Chuỗi           | Chuỗi biểu thị loại giao dịch.                                                                                                                                                                                                   |
| typeInt            | SỐ LƯỢNG        | Giá trị nguyên biểu thị loại giao dịch.                                                                                                                                                                                          |
| giá trị            | SỐ LƯỢNG        | Giá trị được chuyển tính bằng đơn vị peb.                                                                                                                                                                                        |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByHash","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "hash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```

## klay_getTransactionBySenderTxHash <a id="klay_gettransactionbysendertxhash"></a>

Trả về thông tin về một giao dịch được yêu cầu theo hàm băm giao dịch của người gửi.
API này chỉ hoạt động trên lệnh gọi RPC, không hoạt động trên bảng điều khiển JavaScript.
Xin lưu ý rằng API này chỉ trả về kết quả chính xác nếu tính năng lập chỉ mục được bật bởi `--sendertxhashindexing`.
Điều này có thể được kiểm tra bằng lệnh gọi [klay_isSenderTxHashIndexingEnabled](config.md#klay_issendertxhashindexingenabled).

**Tham số**

| Loại           | Mô tả                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| DỮ LIỆU 32 byte | Hàm băm của một giao dịch chỉ được người gửi ký. Xem [SenderTxHash](../../../learn/transactions/transactions.md#sendertxhash). |

**Giá trị trả về**

`Object` - Đối tượng giao dịch, hoặc `null` khi không tìm thấy giao dịch:

| Tên                | Loại           | Mô tả                                                                                                                                                                                                         |
| ------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | DỮ LIỆU 32 byte | Hàm băm của khối chứa giao dịch này. `null` nếu đó là giao dịch đang chờ xử lý.                                                                                                                               |
| blockNumber        | SỐ LƯỢNG        | Số khối chứa giao dịch này. `null` nếu đó là giao dịch đang chờ xử lý.                                                                                                                                        |
| codeFormat         | Chuỗi           | (tùy chọn) Định dạng mã của mã hợp đồng thông minh.                                                                                                                                        |
| feePayer           | DỮ LIỆU 20 byte | Địa chỉ của người trả phí.                                                                                                                                                                                    |
| feePayerSignatures | Mảng            | Mảng các đối tượng chữ ký của người trả phí. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.            |
| feeRatio           | SỐ LƯỢNG        | (tùy chọn) Tỷ lệ phí của người trả phí. Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí. 70% còn lại sẽ được trả bởi người gửi.                                                         |
| từ                 | DỮ LIỆU 20 byte | Địa chỉ của người gửi.                                                                                                                                                                                        |
| gas                | SỐ LƯỢNG        | Gas được người gửi cung cấp.                                                                                                                                                                                  |
| giá gas            | SỐ LƯỢNG        | Giá gas được người gửi cung cấp theo đơn vị peb.                                                                                                                                                              |
| hash               | DỮ LIỆU 32 byte | Hàm băm của giao dịch.                                                                                                                                                                                        |
| humanReadable      | Boolean         | (tùy chọn) `true` nếu địa chỉ con người có thể đọc được, ngược lại sẽ là `false`.                                                                                                          |
| khóa               | Chuỗi           | (tùy chọn) Mã khóa của tài khoản mới tạo.                                                                                                                                                  |
| nhập               | DATA            | (tùy chọn) Dữ liệu được gửi cùng với giao dịch.                                                                                                                                            |
| số dùng một lần    | SỐ LƯỢNG        | Số lượng giao dịch được người gửi thực hiện trước giao dịch này.                                                                                                                                              |
| senderTxHash       | DỮ LIỆU 32 byte | Hàm băm của một giao dịch chỉ được người gửi ký. Xem [SenderTxHash](../../../learn/transactions/transactions.md#sendertxhash). Giá trị này luôn giống với `hàm băm` đối với các giao dịch không phải trả phí. |
| chữ ký             | Mảng            | Một mảng các đối tượng chữ ký. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                          |
| đến                | DỮ LIỆU 20 byte | Địa chỉ của người nhận. `null` nếu đó là giao dịch tạo hợp đồng.                                                                                                                                              |
| transactionIndex   | SỐ LƯỢNG        | Giá trị nguyên biểu thị vị trí chỉ mục của giao dịch trong khối. `null` nếu đó là giao dịch đang chờ xử lý.                                                                                                   |
| loại              | Chuỗi           | Chuỗi biểu thị loại giao dịch.                                                                                                                                                                                |
| typeInt            | SỐ LƯỢNG        | Giá trị nguyên biểu thị loại giao dịch.                                                                                                                                                                       |
| giá trị            | SỐ LƯỢNG        | Giá trị được chuyển tính bằng đơn vị peb.                                                                                                                                                                     |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionBySenderTxHash","params":["0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "hash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```

## klay_getTransactionReceipt <a id="klay_gettransactionreceipt"></a>

Trả về biên lai của một giao dịch theo hàm băm giao dịch.

**LƯU Ý**: Biên lai không khả dụng với giao dịch đang chờ xử lý.

**Tham số**

| Tên  | type            | Mô tả                      |
| ---- | --------------- | -------------------------- |
| Hash | DỮ LIỆU 32 byte | Hàm băm của một giao dịch. |

**Giá trị trả về**

`Object` - Đối tượng biên lai giao dịch, hoặc `null` khi không tìm thấy biên lai

| Tên                | Loại                                         | Mô tả                                                                                                                                                                                                                            |
| ------------------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | DỮ LIỆU 32 byte                               | Hàm băm của khối chứa giao dịch này.                                                                                                                                                                                             |
| blockNumber        | SỐ LƯỢNG                                      | Số khối chứa giao dịch này.                                                                                                                                                                                                      |
| codeFormat         | Chuỗi                                         | (tùy chọn) Định dạng mã của mã hợp đồng thông minh.                                                                                                                                                           |
| contractAddress    | DATA                                          | Địa chỉ hợp đồng được tạo nếu giao dịch là giao dịch tạo hợp đồng, nếu không, giá trị sẽ là `null`.                                                                                                                              |
| feePayer           | DỮ LIỆU 20 byte                               | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                         |
| feePayerSignatures | Mảng                                          | (tùy chọn) Mảng các đối tượng chữ ký của người trả phí. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s. |
| feeRatio           | SỐ LƯỢNG                                      | (tùy chọn) Tỷ lệ phí của người trả phí. Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí. 70% còn lại sẽ được trả bởi người gửi.                                                                            |
| từ                 | DỮ LIỆU 20 byte                               | Địa chỉ của người gửi.                                                                                                                                                                                                           |
| gas                | SỐ LƯỢNG                                      | Gas được người gửi cung cấp.                                                                                                                                                                                                     |
| effectiveGasPrice  | SỐ LƯỢNG                                      | Giá trị thực tế trên mỗi gas được khấu trừ từ tài khoản của người gửi.                                                                                                                                                           |
| giá gas            | SỐ LƯỢNG                                      | Giá gas được người gửi cung cấp theo đơn vị peb.                                                                                                                                                                                 |
| gasUsed            | SỐ LƯỢNG                                      | Lượng gas được sử dụng bởi riêng giao dịch cụ thể này.                                                                                                                                                                           |
| humanReadable      | Boolean                                       | (tùy chọn) `true` nếu địa chỉ con người có thể đọc được, ngược lại sẽ là `false`.                                                                                                                             |
| khóa               | Chuỗi                                         | (tùy chọn) Mã khóa của tài khoản mới tạo.                                                                                                                                                                     |
| nhập               | DATA                                          | (tùy chọn) Dữ liệu được gửi cùng với giao dịch.                                                                                                                                                               |
| bản ghi            | Mảng                                          | Mảng đối tượng bản ghi mà giao dịch này tạo ra.                                                                                                                                                                                  |
| nhật kýBloom       | DỮ LIỆU 256 byte                              | Bộ lọc Bloom dành cho các ứng dụng khách nhẹ giúp truy xuất nhanh các bản ghi liên quan.                                                                                                                                         |
| số dùng một lần    | SỐ LƯỢNG                                      | Số lượng giao dịch được người gửi thực hiện trước giao dịch này.                                                                                                                                                                 |
| senderTxHash       | (tùy chọn) DỮ LIỆU 32 byte | Hàm băm của tx mà không có địa chỉ và chữ ký của người trả phí. Giá trị này luôn giống với giá trị transactionHash đối với các giao dịch không có phí ủy thác.                                                                   |
| chữ ký             | Mảng                                          | Một mảng các đối tượng chữ ký. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                                             |
| trạng thái         | SỐ LƯỢNG                                      | `1` (thành công) hoặc `0` (thất bại).                                                                                                                                                      |
| txError            | SỐ LƯỢNG                                      | (tùy chọn) mã lỗi chi tiết nếu `trạng thái` bằng 0.                                                                                                                                                           |
| đến                | DỮ LIỆU 20 byte                               | Địa chỉ của người nhận. `null` nếu đó là giao dịch tạo hợp đồng.                                                                                                                                                                 |
| transactionHash    | DỮ LIỆU 32 byte                               | Hàm băm của giao dịch.                                                                                                                                                                                                           |
| transactionIndex   | SỐ LƯỢNG                                      | Giá trị nguyên biểu thị vị trí chỉ mục của giao dịch trong khối.                                                                                                                                                                 |
| loại              | Chuỗi                                         | Chuỗi biểu thị loại giao dịch.                                                                                                                                                                                                   |
| typeInt            | SỐ LƯỢNG                                      | Giá trị nguyên biểu thị loại giao dịch.                                                                                                                                                                                          |
| giá trị            | SỐ LƯỢNG                                      | Giá trị được chuyển tính bằng đơn vị peb.                                                                                                                                                                                        |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionReceipt","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "contractAddress":null,
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "effectiveGasPrice":"0x5d21dba00",
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "gasUsed":"0x7918",
    "logs":[],
    "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "status":"0x1",
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionHash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```

## klay_getTransactionReceiptBySenderTxHash <a id="klay_gettransactionreceiptbysendertxhash"></a>

Trả về biên lai của một giao dịch theo hàm băm giao dịch của người gửi.

**LƯU Ý**: Biên lai không khả dụng với giao dịch đang chờ xử lý.
Xin lưu ý rằng API này chỉ trả về kết quả chính xác nếu tính năng lập chỉ mục được bật bởi `--sendertxhashindexing`.
Điều này có thể được kiểm tra bằng lệnh gọi [klay_isSenderTxHashIndexingEnabled](config.md#klay_issendertxhashindexingenabled).

**Tham số**

| Tên  | Loại           | Mô tả                                                                                      |
| ---- | --------------- | ------------------------------------------------------------------------------------------ |
| Hash | DỮ LIỆU 32 byte | Hàm băm của một giao dịch trước khi ký feePayer(senderTransactionHash). |

**Giá trị trả về**

`Object` - Đối tượng biên lai giao dịch, hoặc `null` khi không tìm thấy biên lai

| Tên                | type                                          | Mô tả                                                                                                                                                                                              |
| ------------------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | DỮ LIỆU 32 byte                               | Hàm băm của khối chứa giao dịch này.                                                                                                                                                               |
| blockNumber        | SỐ LƯỢNG                                      | Số khối chứa giao dịch này.                                                                                                                                                                        |
| codeFormat         | Chuỗi                                         | (tùy chọn) Định dạng mã của mã hợp đồng thông minh.                                                                                                                             |
| contractAddress    | DATA                                          | Địa chỉ hợp đồng được tạo nếu giao dịch là giao dịch tạo hợp đồng, nếu không, giá trị sẽ là `null`.                                                                                                |
| feePayer           | DỮ LIỆU 20 byte                               | Địa chỉ của người trả phí.                                                                                                                                                                         |
| feePayerSignatures | Mảng                                          | Mảng các đối tượng chữ ký của người trả phí. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s. |
| feeRatio           | SỐ LƯỢNG                                      | (tùy chọn) Tỷ lệ phí của người trả phí. Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí. 70% còn lại sẽ được trả bởi người gửi.                                              |
| từ                 | DỮ LIỆU 20 byte                               | Địa chỉ của người gửi.                                                                                                                                                                             |
| gas                | SỐ LƯỢNG                                      | Gas được người gửi cung cấp.                                                                                                                                                                       |
| giá gas            | SỐ LƯỢNG                                      | Giá gas được người gửi cung cấp theo đơn vị peb.                                                                                                                                                   |
| gasUsed            | SỐ LƯỢNG                                      | Lượng gas được sử dụng bởi riêng giao dịch cụ thể này.                                                                                                                                             |
| humanReadable      | Boolean                                       | (tùy chọn) `true` nếu địa chỉ con người có thể đọc được, ngược lại sẽ là `false`.                                                                                               |
| khóa               | Chuỗi                                         | (tùy chọn) Mã khóa của tài khoản mới tạo.                                                                                                                                       |
| nhập               | DATA                                          | (tùy chọn) Dữ liệu được gửi cùng với giao dịch.                                                                                                                                 |
| bản ghi            | Mảng                                          | Mảng đối tượng bản ghi mà giao dịch này tạo ra.                                                                                                                                                    |
| nhật kýBloom       | DỮ LIỆU 256 byte                              | Bộ lọc Bloom dành cho các ứng dụng khách nhẹ giúp truy xuất nhanh các bản ghi liên quan.                                                                                                           |
| số dùng một lần    | SỐ LƯỢNG                                      | Số lượng giao dịch được người gửi thực hiện trước giao dịch này.                                                                                                                                   |
| senderTxHash       | (tùy chọn) DỮ LIỆU 32 byte | Hàm băm của tx mà không có địa chỉ và chữ ký của người trả phí. Giá trị này luôn giống với giá trị transactionHash đối với các giao dịch không có phí ủy thác.                                     |
| chữ ký             | Mảng                                          | Một mảng các đối tượng chữ ký. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.               |
| trạng thái         | SỐ LƯỢNG                                      | `1` (thành công) hoặc `0` (thất bại).                                                                                                                        |
| txError            | SỐ LƯỢNG                                      | (tùy chọn) mã lỗi chi tiết nếu `trạng thái` bằng 0.                                                                                                                             |
| đến                | DỮ LIỆU 20 byte                               | Địa chỉ của người nhận. `null` nếu đó là giao dịch tạo hợp đồng.                                                                                                                                   |
| transactionHash    | DỮ LIỆU 32 byte                               | Hàm băm của giao dịch.                                                                                                                                                                             |
| transactionIndex   | SỐ LƯỢNG                                      | Giá trị nguyên biểu thị vị trí chỉ mục của giao dịch trong khối.                                                                                                                                   |
| loại              | Chuỗi                                         | Chuỗi biểu thị loại giao dịch.                                                                                                                                                                     |
| typeInt            | SỐ LƯỢNG                                      | Giá trị nguyên biểu thị loại giao dịch.                                                                                                                                                            |
| giá trị            | SỐ LƯỢNG                                      | Giá trị được chuyển tính bằng đơn vị peb.                                                                                                                                                          |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionReceiptBySenderTxHash","params":["0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "contractAddress":null,
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "gasUsed":"0x7918",
    "logs":[],
    "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "status":"0x1",
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionHash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```

## klay_sendRawTransaction <a id="klay_sendrawtransaction"></a>

Tạo giao dịch gọi ra thông báo mới hoặc tạo hợp đồng cho giao dịch đã ký.

**Tham số**

| Loại | Mô tả                        |
| ----- | ---------------------------- |
| DATA  | Dữ liệu của giao dịch đã ký. |

**Giá trị trả về**

| Loại           | Mô tả                                                                |
| --------------- | -------------------------------------------------------------------- |
| DỮ LIỆU 32 byte | Hàm băm của giao dịch hoặc giá trị băm bằng 0 nếu chưa có giao dịch. |

Nếu bạn đã triển khai hợp đồng, hãy sử dụng [klay_getTransactionReceipt](#klay_gettransactionreceipt) để lấy địa chỉ hợp đồng.

**Ví dụ**

```shell
params: ["0x08f888820228850ba43b740082f61894a2a8854b1802d8cd5de631e690817c253d6a9153888ac7230489e8000094a2a8854b1802d8cd5de631e690817c253d6a9153f847f8458207f6a0abaaeef1ccaead65c63885b1ad35410442e4e070aff67a0c00ac73576dd958cda06b49e555f2ac5c7cff9e70b59a564214db8fafb92b131afcd5fc5aebbe257681"]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendRawTransaction","params":[{see above}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## klay_sendTransaction <a id="klay_sendtransaction"></a>

Tạo giao dịch với các tham số cho trước, ký giao dịch bằng khóa riêng tư của người gửi và truyền giao dịch đến mạng lưới Klaytn.

**LƯU Ý**: Địa chỉ để ký phải ở trạng thái mở khóa.

**Tham số**

Các tham số bắt buộc phụ thuộc vào loại giao dịch.
Kiểm tra các tham số phù hợp trong phần [Làm việc với các loại giao dịch Klaytn](./transaction-type-support.md).

**Giá trị trả về**

| Loại           | Mô tả                 |
| --------------- | --------------------- |
| DỮ LIỆU 32 byte | Hàm băm của giao dịch |

Nếu bạn đã triển khai hợp đồng, hãy sử dụng [klay_getTransactionReceipt](#klay_gettransactionreceipt) để lấy địa chỉ hợp đồng.

**Ví dụ**

```shell
params: [{
  "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
  "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  "gas": "0x76c0",
  "gasPrice": "0x5d21dba00",
  "value": "0x9184e72a",
  "input": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendTransaction","params":[{see above}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## klay_sendTransactionAsFeePayer <a id="klay_sendtransactionasfeepayer"></a>

Tạo giao dịch với các tham số cho trước, ký giao dịch bằng khóa riêng tư của người trả phí và truyền giao dịch đến mạng lưới Klaytn.
API này chỉ hỗ trợ các giao dịch thuộc loại được ủy thác phí (bao gồm cả loại được ủy thác một phần phí).

**LƯU Ý**: Địa chỉ để ký phải ở trạng thái mở khóa.

**Tham số**

Các tham số bắt buộc phụ thuộc vào loại giao dịch.
Kiểm tra các tham số phù hợp trong phần [Làm việc với các loại giao dịch Klaytn](./transaction-type-support.md).

**Giá trị trả về**

| Loại           | Mô tả                 |
| --------------- | --------------------- |
| DỮ LIỆU 32 byte | Hàm băm của giao dịch |

Nếu bạn đã triển khai hợp đồng, hãy sử dụng [klay_getTransactionReceipt](#klay_gettransactionreceipt) để lấy địa chỉ hợp đồng.

**Ví dụ**

```shell
params: [{
  "typeInt": 18,
  "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
  "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075",
  "gas": "0x4a380",
  "gasPrice": "0x5d21dba00",
  "nonce": "0x2c",
  "value": "0xf4",
  "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
  "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
  "feeRatio": 30,
  "signatures": [{
    "V": "0x4e43", 
    "R": "0xd3ff5ca7bdd0120d79e8aa875593d05022fe74ce2b7a0594218d53c0fdca7fa9", 
    "S": "0x2c100e69d2455afc9393e017514063da18b18db6f7e811d0aeaf6002515b58ef"
  }]
}]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendTransactionAsFeePayer","params":[{see above}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x77ec2d910d0b96585373e2d6508f2b2d8c2af7d0060d2012e1cb2f0ee9d74830"
}
```

## klay_signTransaction <a id="klay_signtransaction"></a>

Tạo giao dịch với các tham số đã cho và ký giao dịch bằng khóa riêng của người gửi.
Phương thức này có thể được sử dụng để tạo chữ ký của người gửi hoặc để thực hiện giao dịch thô cuối cùng sẵn sàng gửi đến mạng lưới Klaytn.

**LƯU Ý**: Địa chỉ để ký phải ở trạng thái mở khóa.

**Tham số**

Các tham số bắt buộc phụ thuộc vào loại giao dịch.
Kiểm tra các tham số phù hợp trong phần [Làm việc với các loại giao dịch Klaytn](./transaction-type-support.md).

**Giá trị trả về**

| type | Mô tả                                               |
| ---- | --------------------------------------------------- |
| raw  | Giao dịch thô đã ký                                 |
| tx   | Đối tượng giao dịch bao gồm cả chữ ký của người gửi |

**Ví dụ**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_signTransaction", "params":[{"from":"0x77982323172e5b6182539d3522d5a33a944206d4", "to":"0xcd6bfdb523a4d030890d28bf1eb6ef36307c9aaa", "value":"0x10000", "gas":"0x1000000", "nonce":"0x2", "gasprice":"0x25000000000"}],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":{
    "raw":"0xf86c0286025000000000840100000094cd6bfdb523a4d030890d28bf1eb6ef36307c9aaa8301000080820fe8a056d2ddd231c3c111687ab351d339240db18cd721e5aa33c601dd4fc3927fb4d1a03443443392517aa7da082aa0a00b9ee5e3e1ee007d22e57cd9ff55b5ddbf4a64",
    "tx":{
      "nonce":"0x2",
      "gasPrice":"0x5d21dba00",
      "gas":"0x1000000",
      "to":"0xcd6bfdb523a4d030890d28bf1eb6ef36307c9aaa",
      "value":"0x10000",
      "input":"0x",
      "v":"0xfe8",
      "r":"0x56d2ddd231c3c111687ab351d339240db18cd721e5aa33c601dd4fc3927fb4d1",
      "s":"0x3443443392517aa7da082aa0a00b9ee5e3e1ee007d22e57cd9ff55b5ddbf4a64",
      "hash":"0xb53cc9128a19c3916c0de1914725b7337bba84666c2556d8682c72ca34c6874c"
    }
  }
}
```

## klay_signTransactionAsFeePayer <a id="klay_signtransactionasfeepayer"></a>

Tạo giao dịch với các tham số đã cho và ký giao dịch bằng khóa riêng của người trả phí.
Phương thức này có thể được sử dụng để tạo chữ ký của người trả phí hoặc để thực hiện giao dịch thô cuối cùng sẵn sàng gửi đến mạng lưới Klaytn.
Trong trường hợp bạn chỉ muốn trích xuất chữ ký của người trả phí, chỉ cần lấy `feePayerSignatures` từ kết quả.
Lưu ý rằng giao dịch `thô` không phải là giao dịch cuối cùng nếu chữ ký của người gửi không được đính kèm (nghĩa là `chữ ký` trong `tx` trống).

**LƯU Ý**: Địa chỉ để ký phải ở trạng thái mở khóa.

**Tham số**

Các tham số bắt buộc phụ thuộc vào loại giao dịch.
Kiểm tra các tham số phù hợp trong phần [Làm việc với các loại giao dịch Klaytn](./transaction-type-support.md).

**Giá trị trả về**

| type | Mô tả                                                   |
| ---- | ------------------------------------------------------- |
| raw  | Giao dịch thô đã ký                                     |
| tx   | Đối tượng giao dịch bao gồm cả chữ ký của người trả phí |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransactionAsFeePayer", "params": [{"typeInt": 17, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x76c0", "gasPrice": "0x5d21dba00", "value": "0xf4", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d"}], "id": 83}' http://127.0.0.1:8551

// Result
{
    "id": 83,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x11f8ba358505d21dba008276c09444711e89b0c23845b5b2ed9d3716ba42b8a3e07581f494cd01b2b44584fb143824c1ea0231bebaea826b9da4b3f98adc0000000000000000000000000000000000000000000000000000000000000001c094cd01b2b44584fb143824c1ea0231bebaea826b9df847f845824e43a0b34470d1bb588a6afe8f170333ca147e805727aa1911353ed544c31ad4863beca020322c2727091ff79458a87a424b53a4b08cc3d7d485e002e8bf0add13974507",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [
                {
                    "R": "0xb34470d1bb588a6afe8f170333ca147e805727aa1911353ed544c31ad4863bec",
                    "S": "0x20322c2727091ff79458a87a424b53a4b08cc3d7d485e002e8bf0add13974507",
                    "V": "0x4e43"
                }
            ],
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x76c0",
            "gasPrice": "0x5d21dba00",
            "hash": "0x9e76f754b884d7853814a39c0e51fcefcef6f55b872f00ddad9724c9638128b3",
            "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
            "nonce": "0x35",
            "signatures": [],
            "to": "0x44711e89b0c23845b5b2ed9d3716ba42b8a3e075",
            "type": "TxTypeFeeDelegatedValueTransferMemo",
            "typeInt": 17,
            "value": "0xf4"
        }
    }
}
```

## txError: Thông tin chi tiết về lỗi giao dịch <a id="txerror-detailed-information-of-transaction-failures"></a>

Klaytn cung cấp trường `txError` trong biên lai giao dịch để cung cấp cho các nhà phát triển thêm thông tin về lý do thực hiện giao dịch không thành công.
to give developers more information about the reason for the failed transaction execution.
Trường này chỉ tồn tại nếu việc thực hiện giao dịch không thành công.
Để tiết kiệm bộ nhớ và băng thông mạng, `txError` chứa một giá trị số nguyên.
Bảng dưới đây cho biết ý nghĩa của giá trị trong `txError`.

| Mã lỗi | Mô tả                                                                                      |
| ------ | ------------------------------------------------------------------------------------------ |
| 0x02   | Xảy ra lỗi VM khi chạy hợp đồng thông minh                                                 |
| 0x03   | vượt quá độ sâu lệnh gọi tối đa                                                            |
| 0x04   | xung đột địa chỉ hợp đồng                                                                  |
| 0x05   | lưu trữ mã tạo hợp đồng hết gas                                                            |
| 0x06   | evm: đã vượt quá kích thước mã tối đa                                                      |
| 0x07   | hết gas                                                                                    |
| 0x08   | evm: chống ghi                                                                             |
| 0x09   | evm: đã hoàn nguyên việc thực hiện                                                         |
| 0x0a   | đã đạt đến giới hạn chi phí tính toán mã vận hành (100000000) cho tx    |
| 0x0b   | tài khoản đã tồn tại                                                                       |
| 0x0c   | không phải là tài khoản chương trình (ví dụ: tài khoản có mã và bộ nhớ) |
| 0x0d   | Địa chỉ mà con người đọc được hiện không được hỗ trợ                                       |
| 0x0e   | tỷ lệ phí nằm ngoài phạm vi [1, 99]    |
| 0x0f   | Không thể cập nhật AccountKeyFail                                                          |
| 0x10   | loại khóa tài khoản khác                                                                   |
| 0x11   | Không thể khởi tạo AccountKeyNil cho một tài khoản                                         |
| 0x12   | khóa công khai không nằm trên đường cong                                                   |
| 0x13   | trọng số khóa bằng không                                                                   |
| 0x14   | khóa không thể tuần tự hóa                                                                 |
| 0x15   | khóa trùng lặp                                                                             |
| 0x16   | tràn tổng trọng số                                                                         |
| 0x17   | ngưỡng không thỏa mãn. Tổng trọng số của các khóa nhỏ hơn ngưỡng.                          |
| 0x18   | chiều dài bằng không                                                                       |
| 0x19   | chiều dài quá dài                                                                          |
| 0x1a   | loại tổ hợp lồng nhau                                                                      |
| 0x1b   | giao dịch cũ phải có khóa tài khoản cũ                                                     |
| 0x1c   | tính năng không dùng được nữa                                                              |
| 0x1d   | không được hỗ trợ                                                                          |
| 0x1e   | định dạng mã hợp đồng thông minh không hợp lệ                                              |

## klay_getDecodedAnchoringTransactionByHash <a id="klay_getDecodedAnchoringTransactionByHash"></a>

Trả về dữ liệu neo đã được giải mã trong giao dịch cho hàm băm giao dịch đã cho.

**Tham số**

| Loại           | Mô tả                      |
| --------------- | -------------------------- |
| DỮ LIỆU 32 byte | Hàm băm của một giao dịch. |

**Giá trị trả về**

| Tên           | Loại           | Mô tả                                                                                                                                                                                               |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BlockHash     | DỮ LIỆU 32 byte | Hàm băm của khối chuỗi con mà giao dịch neo này đã được thực hiện.                                                                                                                                  |
| BlockNumber   | SỐ LƯỢNG        | Số khối chuỗi con mà giao dịch neo này đã được thực hiện.                                                                                                                                           |
| ParentHash    | DỮ LIỆU 32 byte | Hàm băm của khối cha mẹ.                                                                                                                                                                            |
| TxHash        | DỮ LIỆU 32 byte | Gốc của trie giao dịch trong khối.                                                                                                                                                                  |
| StateRootHash | DỮ LIỆU 32 byte | Gốc của trie trạng thái cuối của khối.                                                                                                                                                              |
| ReceiptHash   | DỮ LIỆU 32 byte | Gốc của trie biên lai giao dịch của khối.                                                                                                                                                           |
| BlockCount    | SỐ LƯỢNG        | Số khối được tạo trong khoảng thời gian neo này. Trong hầu hết các trường hợp, số này bằng với `SC_TX_PERIOD` của chuỗi con, ngoại trừ trường hợp giao dịch này là tx neo đầu tiên sau khi bật neo. |
| TxCount       | SỐ LƯỢNG        | Số lượng giao dịch được tạo trong chuỗi con trong khoảng thời gian neo này.                                                                                                                         |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getDecodedAnchoringTransactionByHash","params":["0x499350bc5e2f6fee1ba78b4d40a7a1db0a64f3c091112e6798a02ed9a4140084"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "BlockCount":1,
      "BlockHash":"0xcf5f591836d70a1da8e6bb8e5b2c5739329ca0e535b91e239b332af2e1b7f1f4",
      "BlockNumber":1055,
      "ParentHash":"0x70f6115a5b597f29791d3b5e3f129df54778f69ae669842cc81ec8c432fee37c",
      "ReceiptHash":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "StateRootHash":"0x654773348f77a6788c76c93946340323c9b39399d0aa173f6b23fe082848d056",
      "TxCount":0,
      "TxHash":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
   }
}
```

```javascript
> klay.getDecodedAnchoringTransactionByHash("0x499350bc5e2f6fee1ba78b4d40a7a1db0a64f3c091112e6798a02ed9a4140084")
{
  BlockCount: 1,
  BlockHash: "0xcf5f591836d70a1da8e6bb8e5b2c5739329ca0e535b91e239b332af2e1b7f1f4",
  BlockNumber: 1055,
  ParentHash: "0x70f6115a5b597f29791d3b5e3f129df54778f69ae669842cc81ec8c432fee37c",
  ReceiptHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  StateRootHash: "0x654773348f77a6788c76c93946340323c9b39399d0aa173f6b23fe082848d056",
  TxCount: 0,
  TxHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
}
```

## klay_resend <a id="klay_resend"></a>

Resends a transaction.

It will remove the given transaction from the pool and reinsert it with the new gas price and limit.

**NOTE**: The address to sign with must be unlocked.

**Parameters**:

| Name            | Type     | Description                                                                          |
| --------------- | -------- | ------------------------------------------------------------------------------------ |
| transactionArgs | Object   | An object of transaction arguments. See the table below for the object's properties. |
| gas price       | QUANTITY | Integer of the gasPrice to change                                                    |
| gas             | QUANTITY | (optional) Integer of the gas to change                           |

The required parameters for transactionArgs depend on the transaction type.
Check the proper parameters in [Working with Klaytn Transaction Types](./transaction-type-support.md).

**Return Value**

| Type         | Description          |
| ------------ | -------------------- |
| 32-byte DATA | The transaction hash |

**Example**

```shell
> var tx = klay.pendingTransactions()[0]
> klay.resend(tx, 750000000000, 300000)
```
