# Config

## klay_chainID <a id="klay_chainid"></a>

Trả về mã chuỗi của chuỗi.

**Tham số**

Không có

**Giá trị trả về**

| Loại    | Mô tả                              |
| -------- | ---------------------------------- |
| SỐ LƯỢNG | Giá trị nguyên ID chuỗi của chuỗi. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_chainID","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x7e2"
}
```

## klay_clientVersion <a id="klay_clientversion"></a>

Trả về phiên bản máy khách hiện tại của nút Klaytn.

**Tham số**

Không có

**Giá trị trả về**

| type  | Mô tả                                        |
| ----- | -------------------------------------------- |
| Chuỗi | Phiên bản máy khách hiện tại của nút Klaytn. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_clientVersion","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"Klaytn/v0.9.1+3518232250/linux-amd64/go1.11.2"
}
```

## klay_gasPrice <a id="klay_gasprice"></a>

Trả về gợi ý cho giá gas tính bằng peb.

**Tham số**

Không có

**Giá trị trả về**

| Loại    | Mô tả                                              |
| -------- | -------------------------------------------------- |
| SỐ LƯỢNG | Giá trị nguyên chỉ giá gas hiện tại tính bằng peb. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_gasPrice","params":[],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston
}
```

## klay_gasPriceAt <a id="klay_gaspriceat"></a>

Trả về các giá trị khác nhau dựa trên điều kiện được mô tả bên dưới. Đơn vị của giá trị trả về là peb.

- Nếu `baseFee` không được xác định trong tiêu đề, nó sẽ trả về đơn giá từ tham số quản trị
- Nếu khối là một khối đang chờ xử lý, nó sẽ trả về giá gas của txpool.
- Nếu không, nó trả về phí cơ bản của khối đã cho.

**Tham số**

| type | Mô tả                                                        |
| ---- | ------------------------------------------------------------ |
| SỐ   | Số khối. Nếu bị bỏ qua, hệ thống sẽ trả về đơn giá mới nhất. |

**Giá trị trả về**

| Loại    | Mô tả                                              |
| -------- | -------------------------------------------------- |
| SỐ LƯỢNG | Giá trị nguyên chỉ giá gas hiện tại tính bằng peb. |

**Ví dụ**

```javascript
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_gasPriceAt","params":["0x64"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston
}
```

## klay_isParallelDBWrite <a id="klay_isparalleldbwrite"></a>

Trả về `true` nếu nút đang ghi dữ liệu chuỗi khối theo cách song song. Nút được kích hoạt theo mặc định.

**Tham số**

Không có

**Giá trị trả về**

| Loại   | Mô tả                                                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Boolean | `true` có nghĩa là nút đang ghi dữ liệu chuỗi khối theo cách song song. Giá trị sẽ là `false` nếu nút đang ghi dữ liệu theo cách nối tiếp. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_isParallelDBWrite","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```

## klay_isSenderTxHashIndexingEnabled <a id="klay_issendertxhashindexingenabled"></a>

Trả về giá trị `true` nếu nút đang lập chỉ mục hàm băm giao dịch của người gửi thành thông tin ánh xạ hàm băm giao dịch.
Tính năng này bị tắt theo mặc định và có thể được bật bằng cách `--sendertxhashindexing`.

**Tham số**

Không có

**Giá trị trả về**

| type    | Mô tả                                                                                                             |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| Boolean | `true` có nghĩa là nút đang lập chỉ mục hàm băm giao dịch của người gửi thành thông tin ánh xạ hàm băm giao dịch. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_isSenderTxHashIndexingEnabled","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```

## klay_protocolVersion <a id="klay_protocolversion"></a>

Trả về phiên bản giao thức Klaytn của nút.
Phiên bản hiện tại (kể từ v1.9.0) của Cypress/Baobab là `istanbul/65`.

**Tham số**

Không có

**Giá trị trả về**

| Loại | Mô tả                               |
| ----- | ----------------------------------- |
| Chuỗi | Phiên bản giao thức Klaytn của nút. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_protocolVersion","params":[],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x40"
}
```

## klay_rewardbase <a id="klay_rewardbase"></a>

Trả về địa chỉ ví rewardbase của nút hiện tại. Rewardbase là địa chỉ của tài khoản nơi phần thưởng khối được chuyển đến. Chỉ yêu cầu đối với CN.

**Tham số**

Không có

**Giá trị trả về**

| Loại           | Mô tả    |
| --------------- | -------- |
| DỮ LIỆU 20 byte | Địa chỉ. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_rewardbase","id":1}' https://public-en-baobab.klaytn.net

// Result - If requested from non-CN nodes
{
    "jsonrpc":"2.0",
    "id":1,
    "error":{
        "code":-32000,
        "message":"rewardbase must be explicitly specified"
        }
}

// Result - If requested from CN nodes
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x96Fd91f34Cc8da9f6338C106Ba37aA8B48FB4Fa5"
}
```
