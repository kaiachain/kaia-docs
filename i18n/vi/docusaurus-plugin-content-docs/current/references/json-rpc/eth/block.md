# Block

## Tham số khối mặc định <a id="the-default-block-parameter"></a>

Khi gửi một yêu cầu API chứa không gian tên `eth`, chiều cao khối do tham số `defaultBlock` xác định.

Tham số `defaultBlock` có thể có các tùy chọn như sau:

- `HEX String` - số khối là giá trị nguyên
- `String "earliest"` cho khối sớm nhất/khởi nguyên
- `String "latest"` - cho khối đã đào mới nhất
- `String "pending"` - cho trạng thái/giao dịch đang chờ xử lý

## eth_blockNumber <a id="eth_blocknumber"></a>

Trả về số của khối gần đây nhất.

**Tham số**

Không có

**Giá trị trả về**

| type     | Mô tả                                                              |
| -------- | ------------------------------------------------------------------ |
| SỐ LƯỢNG | Giá trị nguyên của số khối hiện tại mà máy khách đang kết nối đến. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":83,
  "result": "0xc94"
}
```

## eth_getHeaderByNumber <a id="eth_getheaderbynumber"></a>

Trả về thông tin tiêu đề theo số.

Vui lòng xem phần [Caution-Header](./caution.md#block_header) trước khi sử dụng API này.

**Tham số**

| Loại           | Mô tả                                                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG \| THẺ | Số khối số nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](#the-default-block-parameter) hoặc hàm băm khối. |

**Giá trị trả về**

Tham khảo [eth_getHeaderByHash](#eth_getheaderbyhash)

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHeaderByNumber","params":["0x1b4"],"id":1}' http://localhost:8551
// Result
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x5d21dba00",
        "difficulty": "0x1",
        "extraData": "0x",
        "gasLimit": "0xe8d4a50fff",
        "gasUsed": "0x28b484",
        "hash": "0x5de0dc71dec2e724be002dcad135b602810769ce26e16b3b06862405e08ca71b",
        "logsBloom": "0x02200022800002050000084080014015001001004b0002440401060a0830000200014041044010180010430018800119120098000800200241c2090a4020011040004400002201081800440a340020a4000820100848081020003000892050105a05000002100000200012c0800408982000085100000c4040a03814000800200812210100200010004018410d80004214800123210400082002214620100021028800120309200802008291c8e000904210080008110900010100081000101000501002010a0080311886000008000000240900400000100200a402005830200010300804020200000002310000008004004080a58000550000508000000000",
        "miner": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0x1b4",
        "parentHash": "0x99fcd33dddd763835ba8bdc842853d973496a7e64ea2f6cf826bc2c338e23b0c",
        "receiptsRoot": "0xd3d70ed54a9274ba3191bf2d4fd8738c5d782fe17c8bfb45c03a25dc04120c35",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x23a",
        "stateRoot": "0x1076e6726164bd6f74720a717242584109f37c55017d004eefccf9ec3be76c18",
        "timestamp": "0x61b0a6c6",
        "totalDifficulty": "0x12",
        "transactionsRoot": "0x6ec8daca98c1005d9bbd7716b5e94180e2bf0e6b77770174563a166337369344" }
}   
```

## eth_getHeaderByHash <a id="eth_getheaderbyhash"></a>

Trả về thông tin tiêu đề theo hàm băm.

Vui lòng xem phần [Caution-Header](./caution.md#block_header) trước khi sử dụng API này.

**Tham số**

| type            | Mô tả                 |
| --------------- | --------------------- |
| DỮ LIỆU 32 byte | Hàm băm của một khối. |

**Giá trị trả về**

`Object` - Đối tượng tiêu đề hoặc `null` khi không tìm thấy tiêu đề. Nếu không, hàm sẽ trả về lỗi.

| Tên              | type             | Mô tả                                                                                                             |
| ---------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas    | SỐ LƯỢNG         | Phí cơ bản trên mỗi đơn vị gas.                                                                                   |
| difficulty       | SỐ LƯỢNG         | Giá trị nguyên chỉ độ khó của khối này.                                                                           |
| extraData        | DATA             | Trường "dữ liệu bổ sung" của khối này.                                                                            |
| gasLimit         | SỐ LƯỢNG         | Số đơn vị gas tối đa được phép trong khối này.                                                                    |
| gasUsed          | SỐ LƯỢNG         | Tổng số gas đã được sử dụng bởi tất cả các giao dịch trong khối này.                                              |
| hash             | DỮ LIỆU 32 byte  | Hàm băm của một khối. `null` nếu đó là khối đang chờ xử lý.                                                       |
| nhật kýBloom     | DỮ LIỆU 256 byte | Bộ lọc Bloom cho các bản ghi của khối.                                                                            |
| miner            | DỮ LIỆU 20 byte  | Địa chỉ của người nhận đã được trao phần thưởng khai thác.                                                        |
| mixHash          | DỮ LIỆU 32 byte  | Hàm băm, khi kết hợp với số dùng một lần, chứng minh rằng một lượng tính toán đủ đã được thực hiện trên khối này. |
| số dùng một lần  | DỮ LIỆU 8 byte   | Hàm băm của thuật toán bằng chứng xử lý (PoW) được tạo ra.                                     |
| number           | SỐ LƯỢNG         | Số khối. `null` khi đó là khối đang chờ xử lý.                                                                    |
| parentHash       | DỮ LIỆU 32 byte  | Hàm băm của khối cha mẹ.                                                                                          |
| receiptsRoot     | DỮ LIỆU 32 byte  | Gốc của trie biên lai giao dịch của khối.                                                                         |
| sha3Uncles       | DỮ LIỆU 32 byte  | SHA3 của dữ liệu chú trong khối.                                                                                  |
| size             | SỐ LƯỢNG         | Giá trị nguyên chỉ kích thước của khối này theo byte.                                                             |
| stateRoot        | DỮ LIỆU 32 byte  | Gốc của trie trạng thái cuối trong khối.                                                                          |
| dấu thời gian    | SỐ LƯỢNG         | Dấu thời gian Unix khi khối được đối chiếu.                                                                       |
| totalDifficulty  | SỐ LƯỢNG         | Tổng khối lượng tính toán trung bình của chuỗi cho đến khối này.                                                  |
| transactionsRoot | DỮ LIỆU 32 byte  | Gốc của trie giao dịch trong khối.                                                                                |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHeaderByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c"],"id":1}' http://localhost:8551
// Result
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x5d21dba00",
        "difficulty": "0x1",
        "extraData": "0x",
        "gasLimit": "0xe8d4a50fff",
        "gasUsed": "0x28b484",
        "hash": "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c",
        "logsBloom": "0x02200022800002050000084080014015001001004b0002440401060a0830000200014041044010180010430018800119120098000800200241c2090a4020011040004400002201081800440a340020a4000820100848081020003000892050105a05000002100000200012c0800408982000085100000c4040a03814000800200812210100200010004018410d80004214800123210400082002214620100021028800120309200802008291c8e000904210080008110900010100081000101000501002010a0080311886000008000000240900400000100200a402005830200010300804020200000002310000008004004080a58000550000508000000000",
        "miner": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0xd208de",
        "parentHash": "0x99fcd33dddd763835ba8bdc842853d973496a7e64ea2f6cf826bc2c338e23b0c",
        "receiptsRoot": "0xd3d70ed54a9274ba3191bf2d4fd8738c5d782fe17c8bfb45c03a25dc04120c35",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x23a",
        "stateRoot": "0x1076e6726164bd6f74720a717242584109f37c55017d004eefccf9ec3be76c18",
        "timestamp": "0x61b0a6c6",
        "totalDifficulty": "0xd208df",
        "transactionsRoot": "0x6ec8daca98c1005d9bbd7716b5e94180e2bf0e6b77770174563a166337369344"
    }
}   
```

## eth_getBlockByNumber <a id="eth_getblockbynumber"></a>

Trả về thông tin của một khối theo số khối.

Vui lòng xem phần [Caution-Block](./caution.md#block) trước khi sử dụng API này.

**Tham số**

| type            | Mô tả                                                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG \| THẺ | Số khối số nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](#the-default-block-parameter) hoặc hàm băm khối. |
| Boolean         | Nếu `true` thì sẽ trả về toàn bộ các đối tượng giao dịch, nếu `false` thì chỉ trả về hàm băm của các giao dịch.ịch.                                                          |

**Giá trị trả về**

Tham khảo [eth_getBlockByHash](#eth_getblockbyhash)

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0xd0054e", false],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "baseFeePerGas": "0x5d21dba00",
    "difficulty": "0x1",
    "extraData": "0x",
    "gasLimit": "0xe8d4a50fff",
    "gasUsed": "0x44437",
    "hash": "0x456a7cbb6fada11a0ca8cec24510d89da1c52898f1087528752ae6e13973fbc5",
    "logsBloom": "0x0000100000000094000000400000080000000040000000000000000000000002000000000000000000000000004001000000200000000000000008000220000000080400000800000000000a000000000000000000000000000010000000000000002000000408000000000000000010000080101002000000000010000000100000010000200800000400000080000000000000000000000002000000102000024000080200000000000082000000000000000000000000010000000000000000100012000000000000011000000000002000201000000008000000002000000010002800000000001400000000000000000000000100000000200000000000",
    "miner": "0x1ad91ee08f21be3de0ba2ba6918e714da6b45836",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000",
    "number": "0xd0054e",
    "parentHash": "0x2b88fdb3821669357a0b8367115e30145135c44bb8f62641d4e7765a7f555d17",
    "receiptsRoot": "0xc36bc44d0b52dee954be9bbd519bddc0bf6e991af2ed6f6ba506f89f10cdb9a7",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x64c",
    "stateRoot": "0x123a0da1c621236e64f9b486a9a9712ec6ce07d6690acab5a18b716d17cdc29f",
    "timestamp": "0x6194f184",
    "totalDifficulty": "0xd0054f",
    "transactions": [
      "0x5b3492f8199ee2a551d991b7d00bd48967ca5e5c1c15d6e1ee9fda97e3126e9a",
      "0x8e1870262f2ba0452458280ad6ad5d54e5288623e415692c822979b7608c7297",
      "0x98053d20b01c9e56964a57084fb91ccc01b242adfb09c23534162dcbbcc094c2",
    ],
    "transactionsRoot": "0x29b9880f57c0e79d0be5aa4fcc6b4cfcbed3e51478ad8f44533acce012df8cf1",
    "uncles": []
  }
}
```

## eth_getBlockByHash <a id="eth_getblockbyhash"></a>

Trả về thông tin của một khối theo hàm băm.

Vui lòng xem phần [Caution-Block](./caution.md#block) trước khi sử dụng API này.

**Tham số**

| type            | Mô tả                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| DỮ LIỆU 32 byte | Hàm băm của một khối.                                                                                               |
| Boolean         | Nếu `true` thì sẽ trả về toàn bộ các đối tượng giao dịch, nếu `false` thì chỉ trả về hàm băm của các giao dịch.ịch. |

**Giá trị trả về**

`Object` - Đối tượng khối hoặc `null` khi không tìm thấy khối. Nếu không, hàm sẽ trả về lỗi.

| Tên              | Loại            | Mô tả                                                                                                             |
| ---------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas    | SỐ LƯỢNG         | Phí cơ bản trên mỗi đơn vị gas.                                                                                   |
| difficulty       | SỐ LƯỢNG         | Giá trị nguyên chỉ độ khó của khối này                                                                            |
| extraData        | DATA             | Trường "dữ liệu bổ sung" của khối này.                                                                            |
| gasLimit         | SỐ LƯỢNG         | Số đơn vị gas tối đa được phép trong khối này.                                                                    |
| gasUsed          | SỐ LƯỢNG         | Tổng số gas đã được sử dụng bởi tất cả các giao dịch trong khối này.                                              |
| hash             | DỮ LIỆU 32 byte  | Hàm băm của một khối. `null` khi đó là khối đang chờ xử lý.                                                       |
| nhật kýBloom     | DỮ LIỆU 256 byte | Bộ lọc Bloom cho các bản ghi của khối. `null` khi đó là khối đang chờ xử lý.                                      |
| miner            | DỮ LIỆU 20 byte  | Địa chỉ của người nhận đã được trao phần thưởng khai thác.                                                        |
| mixHash          | DỮ LIỆU 32 byte  | Hàm băm, khi kết hợp với số dùng một lần, chứng minh rằng một lượng tính toán đủ đã được thực hiện trên khối này. |
| nonce            | DỮ LIỆU 8 byte   | Hàm băm của thuật toán bằng chứng xử lý (PoW) được tạo ra.                                     |
| number           | SỐ LƯỢNG         | Số khối. `null` nếu đó là khối đang chờ xử lý.                                                                    |
| parentHash       | DỮ LIỆU 32 byte  | Hàm băm của khối cha mẹ.                                                                                          |
| receiptsRoot     | DỮ LIỆU 32 byte  | Gốc của trie biên lai giao dịch của khối.                                                                         |
| sha3Uncles       | DỮ LIỆU 32 byte  | SHA3 của dữ liệu chú trong khối.                                                                                  |
| size             | SỐ LƯỢNG         | Giá trị nguyên chỉ kích thước của khối này theo byte.                                                             |
| stateRoot        | DỮ LIỆU 32 byte  | Gốc của trie trạng thái cuối trong khối.                                                                          |
| dấu thời gian    | SỐ LƯỢNG         | Dấu thời gian Unix khi khối được đối chiếu.                                                                       |
| totalDifficulty  | SỐ LƯỢNG         | Tổng blockScore của chuỗi cho đến khối này                                                                        |
| transactionsRoot | DỮ LIỆU 32 byte  | Gốc của trie giao dịch trong khối.                                                                                |
| giao dịch        | Mảng             | Mảng đối tượng giao dịch hoặc hàm băm giao dịch 32 byte tùy thuộc vào tham số đã cho gần nhất.                    |
| uncles           | Mảng             | Mảng của các hàm băm chú.                                                                                         |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c", true],"id":1}' http://localhost:8551

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      baseFeePerGas: "0x5d21dba00",
      difficulty: "0x1",
      extraData: "0xd8820505846b6c617988676f312e31312e328664617277696e00000000000000f89ed594e733cb4d279da696f30d470f8c04decb54fcb0d2b841f1f600d136f93a5a2d9c12a7a9f6d7ba80a047c3910a2bbc01e38bcce25e48ed2004d21f134df5efaf1f8cbb9a26e1548e57628ab258c935490c11a7cd65324701f843b841444b3efc40071b6eec2c4d2630b483710b8fc7a601432431b0161f489102d1ca02f2ef93153d0be3843aa563d34cee1716163f58711843442aedd94a56303c0400",
      gasLimit: "0xe8d4a50fff",
      gasUsed: "0x0",
      governanceData: "0x",
      hash: "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c",
      logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      miner: "0x0000000000000000000000000000000000000000",
      mixHash: "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
      nonce: "0x0000000000000000",
      number: "0x1",
      parentHash: "0x73255a60e9491b5715f9bfcb7fa1143296810f629836d4cefbd1921d9173d63d",
      receiptsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      reward: "0x0000000000000000000000000000000000000000",
      size: "0x2d7",
      stateRoot: "0xedb87f4b0f905a655c80d1768eb22b1eff2405098c4748b8364c869611e02a2b",
      timestamp: "0x5c99cbd8",
      totalDifficulty: "0x2",
      transactions: [],
      transactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      uncles: [],
    }
}
```

## eth_getBlockReceipts <a id="eth_getblockreceipts"></a>

Returns receipts included in a block.

**Parameters**

| Type                          | Description                                                                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Number \| 32-byte DATA \| TAG | The block number or hash. Or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](#the-default-block-parameter). |

**Return Value**

Receipts included in a block.  If the target block contains no transaction, an empty array `[]` is returned.

**Example**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"eth_getBlockReceipts", "params":["0xb14e8716f732186f2c99bb7a215a7cb1ec40e91e8d83739bfb593ed4b9047aa1"],"id":1}' https://public-en-baobab.klaytn.net
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "blockHash": "0xb14e8716f732186f2c99bb7a215a7cb1ec40e91e8d83739bfb593ed4b9047aa1",
      "blockNumber": "0x85ef20d",
      "contractAddress": null,
      "cumulativeGasUsed": "0x23b6e",
      "effectiveGasPrice": "0x5d21dba00",
      "from": "0x60d690e4d5db4025f4781c6cf3bff8669500823c",
      "gasUsed": "0x23b6e",
      "logs": [
        ...
      ],
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000220000000400000000000000000000000000000000000002000000000010001000000000040000000000000000000000000000000000000000000000000000400000080000000100000000000000000000000000000000000000000000480000000000000000000000010000000001000000000000000000000000000000000000000000009000000000000000000000000000000000000000008000000000000000004000000000004000000000000000000000000000000000000000000000000000000000000000200",
      "status": "0x1",
      "to": "0x27e1255f2a0ea596992158a0bc838f43be34b99d",
      "transactionHash": "0xafd15213b06144a85dd02adf88c32efb3d395e784f153c213a40b7ea25de1942",
      "transactionIndex": "0x0",
      "type": "0x0"
    }
  ]
}
```

## eth_getUncleByBlockHashAndIndex <a id="eth_getunclebyblockhashandindex"></a>

Trả về thông tin của một mảng chú của khối theo hàm băm và vị trí chỉ mục của mảng chú.
Do Klaytn không có mảng chú, nên giá trị trả về luôn là `null`.

**Tham số**

| Loại           | Mô tả                        |
| --------------- | ---------------------------- |
| DỮ LIỆU 32 byte | Hàm băm của một khối.        |
| SỐ LƯỢNG        | Vị trí chỉ mục của mảng chú. |

**Giá trị trả về** `null`
`null`

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c", "0x1"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": null
}
```

## eth_getUncleByBlockNumberAndIndex <a id="eth_getunclebyblocknumberandindex"></a>

Trả về thông tin về một khối chú theo số và vị trí chỉ mục của khối chú.
Vì Klaytn không có mảng chú, nên giá trị trả về luôn là `null`.

**Tham số**

| Loại           | Mô tả                                                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG \| THẺ | Số khối số nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](#the-default-block-parameter) hoặc hàm băm khối. |
| SỐ LƯỢNG        | Vị trí chỉ mục của mảng chú.                                                                                                                                                 |

**Giá trị trả về** `null`
`null`

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0xe8", "0x1"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": null
}
```

## eth_getBlockTransactionCountByNumber <a id="eth_getblocktransactioncountbynumber"></a>

Trả về số lượng giao dịch trong một khối khớp với số khối đã cho.

**Tham số**

| Loại           | Mô tả                                                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG \| THẺ | Số khối số nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](#the-default-block-parameter) hoặc hàm băm khối. |

**Giá trị trả về**

| Loại    | Mô tả                                                 |
| -------- | ----------------------------------------------------- |
| SỐ LƯỢNG | Giá trị nguyên chỉ số lượng giao dịch trong khối này. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa" // 10
}
```

## eth_getBlockTransactionCountByHash <a id="eth_getblocktransactioncountbyhash"></a>

Trả về số lượng giao dịch trong một khối từ một khối khớp với hàm băm đã cho.

**Tham số**

| type            | Mô tả                |
| --------------- | -------------------- |
| DỮ LIỆU 32 byte | Hàm băm của một khối |

**Giá trị trả về**

| Loại    | Mô tả                                                 |
| -------- | ----------------------------------------------------- |
| SỐ LƯỢNG | Giá trị nguyên chỉ số lượng giao dịch trong khối này. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3ccdc2621"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```

## eth_getUncleCountByBlockNumber <a id="eth_getunclecountbyblocknumber"></a>

Trả về số lượng mảng chú trong một khối từ một khối khớp với số khối đã cho.
Do Klaytn không có mảng chú, nên giá trị trả về là `0x0`. Giá trị trả về là `null` nếu không có khối khớp.

**Tham số**

| Loại           | Mô tả                                                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG \| THẺ | Số khối số nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](#the-default-block-parameter) hoặc hàm băm khối. |

**Giá trị trả về**

| Loại    | Mô tả                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------ |
| SỐ LƯỢNG | Giá trị nguyên chỉ số lượng giao dịch trong khối này. Giá trị trả về là `null` nếu không có khối khớp. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0" // 0
}
```

## eth_getUncleCountByBlockHash <a id="eth_getunclecountbyblockhash"></a>

Trả về số lượng mảng chú trong một khối từ một khối khớp với hàm băm của khối đã cho.
Do Klaytn không có mảng chú, nên giá trị trả về là `0x0`. Giá trị trả về là `null` nếu không có khối khớp.

**Tham số**

| Loại           | Mô tả                |
| --------------- | -------------------- |
| DỮ LIỆU 32 byte | Hàm băm của một khối |

**Giá trị trả về**

| Loại    | Mô tả                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------ |
| SỐ LƯỢNG | Giá trị nguyên chỉ số lượng giao dịch trong khối này. Giá trị trả về là `null` nếu không có khối khớp. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3ccdc2621"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```

## eth_getStorageAt <a id="eth_getstorageat"></a>

Trả về giá trị từ vị trí lưu trữ tại một địa chỉ đã cho.

**Tham số**

| Loại                      | Mô tả                                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DỮ LIỆU 20 byte            | Địa chỉ kho lưu trữ.                                                                                                                                                         |
| SỐ LƯỢNG                   | Giá trị nguyên chỉ vị trí lưu trữ.                                                                                                                                           |
| SỐ LƯỢNG \| THẺ \| HÀM BĂM | Số khối số nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](#the-default-block-parameter) hoặc hàm băm khối. |

**Giá trị trả về**

| Loại | Mô tả                           |
| ----- | ------------------------------- |
| DATA  | Giá trị tại vị trí lưu trữ này. |

**Ví dụ**

Việc tính toán vị trí chính xác sẽ tùy thuộc vào kho lưu trữ cần truy xuất. Xem xét hợp đồng sau được triển khai tại `0x295a70b2de5e3953354a6a8344e616ed314d7251` theo địa chỉ `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;

    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Truy xuất giá trị của `pos0` rất đơn giản:

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Việc truy xuất thành phần của bản đồ thì khó hơn. Vị trí của một thành phần trên bản đồ được tính bằng:

```javascript
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Điều này có nghĩa là để truy xuất kho lưu trữ trên `pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]`, chúng ta cần tính toán vị trí bằng:

```javascript
keccak(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Bạn có thể sử dụng bảng điều khiển Klaytn đi kèm với thư viện `klay` để tính toán

```javascript
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> klay.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Bây giờ sẽ lấy kho lưu trữ:

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

## eth_mining <a id="eth_mining"></a>

Giá trị trả về là `true` nếu máy khách đang tích cực khai thác các khối mới.

**LƯU Ý**: Hiện tại, mọi nút đều ở chế độ khai thác mặc định để gửi lại giao dịch. Xin lưu ý rằng việc "khai thác" thực tế chỉ do các Nút đồng thuận (CN) thực hiện.

**Tham số**

Không có

**Giá trị trả về**

| Loại   | Mô tả                                                    |
| ------- | -------------------------------------------------------- |
| Boolean | `true` nếu máy khách đang đào, nếu không thì là `false`. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":true
}
```

## eth_syncing <a id="eth_syncing"></a>

Trả về đối tượng với dữ liệu về trạng thái đồng bộ hóa hoặc `false`.

**Tham số**

Không có

**Giá trị trả về**

`Object|Boolean`, đối tượng có dữ liệu trạng thái đồng bộ hóa hoặc `false` khi không đồng bộ hóa:

| Tên           | Loại    | Mô tả                                                                                                                                 |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| startingBlock | SỐ LƯỢNG | Khối nơi bắt đầu quá trình nhập (sẽ chỉ được đặt lại sau khi quá trình đồng bộ hóa đạt đỉnh).                      |
| currentBlock  | SỐ LƯỢNG | Khối hiện tại, giống với `eth_blockNumber`.                                                                                           |
| highestBlock  | SỐ LƯỢNG | Khối dự đoán cao nhất.                                                                                                                |
| pulledStates  | SỐ LƯỢNG | Số lượng mục nhập trạng thái được xử lý cho đến hiện tại.  Nếu chế độ đồng bộ hóa không ở chế độ "nhanh", giá trị trả về sẽ bằng 0.   |
| knownStates   | SỐ LƯỢNG | Số lượng các mục trạng thái đã biết vẫn cần được truy xuất.  Nếu chế độ đồng bộ hóa không ở chế độ "nhanh", giá trị trả về sẽ bằng 0. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    "currentBlock":"0x3e31e",
    "highestBlock":"0x827eef",
    "knownStates":"0x0",
    "pulledStates":"0x0",
    "startingBlock":"0x0"
  }
}
// Or when not syncing
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```
