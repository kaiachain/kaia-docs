# Account

## klay_tài khoảnCreated <a id="klay_accountcreated"></a>

Trả về `true` nếu tài khoản được liên kết với địa chỉ được tạo. Nếu không sẽ trả về `false`.

**Tham số**

| Tên                  | Loại                      | Mô tả                                                                                                                                                                               |
| -------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản            | DỮ LIỆU 20 byte            | Địa chỉ                                                                                                                                                                             |
| số khối hoặc hàm băm | SỐ LƯỢNG \| THẺ \| HÀM BĂM | Số khối nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](./block.md#the-default-block-parameter) hoặc hàm băm khối. |

:::note

LƯU Ý: Trong các phiên bản trước phiên bản Klaytn v1.7.0, chỉ có số khối số nguyên, chuỗi `"earliest"` và `"latest"` khả dụng.

:::

**Giá trị trả về**

| Loại   | Mô tả              |
| ------- | ------------------ |
| Boolean | Có địa chỉ đầu vào |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_accountCreated","params":["0xa4f42d4d2a3a13874406435500950c9bf2d783db","latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":true
}
```

## klay_tài khoảns <a id="klay_accounts"></a>

Trả về danh sách địa chỉ thuộc sở hữu của máy khách.

**Tham số**

Không có

**Giá trị trả về**

| Loại                | Mô tả                                   |
| -------------------- | --------------------------------------- |
| Mảng DỮ LIỆU 20 byte | Các địa chỉ thuộc sở hữu của máy khách. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_accounts","params":[],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f"]
}
```

## klay_encodeAccountKey <a id="klay_encodeaccountkey"></a>

Mã hóa khóa tài khoản bằng sơ đồ mã hóa Tiền tố độ dài đệ quy (RLP).

**Tham số**

| Tên     | Loại        | Mô tả                                                                                                                                                                |
| ------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keytype | SỐ LƯỢNG     | Giá trị số nguyên cho biết loại khóa tài khoản. Để biết giá trị của từng loại khóa tài khoản, hãy xem phần [Khóa tài khoản](../../../learn/accounts.md#account-key). |
| khóa    | DỮ LIỆU JSON | Đối tượng khóa tài khoản                                                                                                                                             |

**Giá trị trả về**

| Loại | Mô tả                          |
| ----- | ------------------------------ |
| DATA  | Khóa tài khoản được mã hóa RLP |

**Ví dụ**

```shell
// Request to encode AccountKeyNil
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_encodeAccountKey", "params": [{"keyType": 0, "key": {}}], "id": 66}' http://127.0.0.1:8551

// Result
{
    "id": 66,
    "jsonrpc": "2.0",
    "result": "0x80"
}
```

```shell
// Request to encode AccountKeyLegacy
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_encodeAccountKey", "params": [{"keyType": 1, "key": {}}], "id": 30}' http://127.0.0.1:8551

// Result
{
    "id": 30,
    "jsonrpc": "2.0",
    "result": "0x01c0"
}
```

```shell
// Request to encode AccountKeyPublic
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_encodeAccountKey", "params": [{"keyType": 2, "key": {"x": "0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8", "y": "0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e"}}], "id": 59}' http://127.0.0.1:8551

// Result
{
    "id": 59,
    "jsonrpc": "2.0",
    "result": "0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"
}
```

```shell
// Request to encode AccountKeyFail
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_encodeAccountKey", "params": [{"keyType": 3, "key": {}}], "id": 79}' http://127.0.0.1:8551

// Result
{
    "id": 79,
    "jsonrpc": "2.0",
    "result": "0x03c0"
}
```

```shell
// Request to encode AccountKeyWeightedMultiSig
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_encodeAccountKey", "params": [{"keyType": 4, "key": {"threshold": 3, "keys": [{"weight": 1, "key": {"x": "0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e", "y": "0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712"}}, {"weight": 1, "key": {"x": "0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb", "y": "0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842"}}, {"weight": 1, "key": {"x": "0xea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cd", "y": "0xb95ebb02d9397b4a8faceb58d485d612f0379a923ec0ddcf083378460a56acca"}}, {"weight": 1, "key": {"x": "0x8551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6", "y": "0x4206aa84bc8955fcbfcc396854228aa63ebacd81b7311a31ab9d71d90b7ec3d7"}}]}}], "id": 18}' http://127.0.0.1:8551

// Result
{
    "id": 18,
    "jsonrpc": "2.0",
    "result": "0x04f89303f890e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfbe301a102ea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cde301a1038551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6"
}
```

```shell
// Request to encode AccountKeyRoleBased
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_encodeAccountKey", "params": [{"keyType": 5, "key": [{"keyType": 2, "key": {"x": "0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d", "y": "0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919"}}, {"keyType": 4, "key": {"threshold": 2, "keys": [{"weight": 1, "key": {"x": "0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d", "y": "0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919"}}, {"weight": 1, "key": {"x": "0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06", "y": "0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d"}}]}}, {"keyType": 2, "key": {"x": "0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447", "y": "0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2"}}]}], "id": 49}' http://127.0.0.1:8551

// Result
{
    "id": 49,
    "jsonrpc": "2.0",
    "result": "0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06a302a102c8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447"
}
```

## klay_decodeAccountKey <a id="klay_decodeaccountkey"></a>

Giải mã khóa tài khoản được mã hóa RLP.

**Tham số**

| Loại | Mô tả                          |
| ----- | ------------------------------ |
| DATA  | Khóa tài khoản được mã hóa RLP |

**Giá trị trả về**

| Tên     | Loại        | Mô tả                                           |
| ------- | ------------ | ----------------------------------------------- |
| keytype | SỐ LƯỢNG     | Giá trị số nguyên cho biết loại khóa tài khoản. |
| khóa    | DỮ LIỆU JSON | Đối tượng khóa tài khoản                        |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_decodeAccountKey", "params": ["0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06a302a102c8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447"], "id": 47}' http://127.0.0.1:8551

// Result
{
    "id": 47,
    "jsonrpc": "2.0",
    "result": {
        "key": [
            {
                "key": {
                    "x": "0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d",
                    "y": "0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919"
                },
                "keyType": 2
            },
            {
                "key": {
                    "keys": [
                        {
                            "key": {
                                "x": "0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d",
                                "y": "0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919"
                            },
                            "weight": 1
                        },
                        {
                            "key": {
                                "x": "0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06",
                                "y": "0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d"
                            },
                            "weight": 1
                        }
                    ],
                    "threshold": 2
                },
                "keyType": 4
            },
            {
                "key": {
                    "x": "0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447",
                    "y": "0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2"
                },
                "keyType": 2
            }
        ],
        "keyType": 5
    }
}
```

## klay_getAccount <a id="klay_getaccount"></a>

Trả về thông tin tài khoản của một địa chỉ nhất định. Có hai loại tài khoản trong Klaytn: Tài khoản được sở hữu bên ngoài (EOA) và Tài khoản hợp đồng thông minh. Xem phần [Tài khoản Klaytn](../../../learn/accounts.md#klaytn-accounts).

**Tham số**

| Tên                  | Loại                      | Mô tả                                                                                                                                                                               |
| -------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address              | DỮ LIỆU 20 byte            | Địa chỉ                                                                                                                                                                             |
| số khối hoặc hàm băm | SỐ LƯỢNG \| THẺ \| HÀM BĂM | Số khối nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](./block.md#the-default-block-parameter) hoặc hàm băm khối. |

:::note

LƯU Ý: Trong các phiên bản trước phiên bản Klaytn v1.7.0, chỉ có số khối số nguyên, chuỗi `"earliest"` và `"latest"` khả dụng.

:::

**Giá trị trả về**

| Loại     | Mô tả                                              |
| --------- | -------------------------------------------------- |
| Tài khoản | Mỗi loại tài khoản sẽ có các thuộc tính khác nhau. |

**Ví dụ**

```shell
// Request (Account type: Externally Owned Account)
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getAccount","params":["0x3111a0577f322e8fb54f78d9982a26ae7ca0f722", "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    accType: 1,
    account: {
      balance: 4985316100000000000,
      humanReadable: false,
      key: {
        key: {
          x: "0x230037a99462acd829f317d0ce5c8e2321ac2951de1c1b1a18f9af5cff66f0d7",
          y: "0x18a7fb1b9012d2ac87bc291cbf1b3b2339356f1ce7669ae68405389be7f8b3b6"
        },
        keyType: 2
      },
      nonce: 11
    }
  }
}
```

```shell
// Request (Account type: Smart Contract Account)
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getAccount","params":["0x3111a0577f322e8fb54f78d9982a26ae7ca0f722", "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "accType": 2,
    "account": {
      "balance": "0x0",
      "codeFormat": 0,
      "codeHash": "80NXvdOay02rYC/JgQ7RfF7yoxY1N7W8P7BiPvkIeF8=",
      "humanReadable": false,
      "key": {
        "key": {},
        "keyType": 3
      },
      "nonce": 1,
      "storageRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
    }
  }
}
```

## klay_getAccountKey <a id="klay_getaccountkey"></a>

Trả về khóa tài khoản của Tài khoản sở hữu bên ngoài (EOA) của một địa chỉ nhất định. Nếu tài khoản có AccountKeyLegacy hoặc tài khoản của địa chỉ đã cho là Tài khoản hợp đồng thông minh, nó sẽ trả về một giá trị khóa trống. Xem phần [Khóa tài khoản](../../../learn/accounts.md#account-key).

**Tham số**

| Loại                      | Mô tả                                                                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DỮ LIỆU 20 byte            | Địa chỉ                                                                                                                                                                             |
| SỐ LƯỢNG \| THẺ \| HÀM BĂM | Số khối nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](./block.md#the-default-block-parameter) hoặc hàm băm khối. |

:::note

LƯU Ý: Trong các phiên bản trước phiên bản Klaytn v1.7.0, chỉ có số khối số nguyên, chuỗi `"earliest"` và `"latest"` khả dụng.

:::

**Giá trị trả về**

| Loại      | Mô tả                                                                            |
| ---------- | -------------------------------------------------------------------------------- |
| AccountKey | Khóa tài khoản bao gồm (các) khóa công khai và một loại khóa. |

**Ví dụ**

```shell
// Request (AccountKey type: AccountKeyPublic)
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getAccountKey","params":["0x3111a0577f322e8fb54f78d9982a26ae7ca0f722", "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    key: {
      x: "0x230037a99462acd829f317d0ce5c8e2321ac2951de1c1b1a18f9af5cff66f0d7",
      y: "0x18a7fb1b9012d2ac87bc291cbf1b3b2339356f1ce7669ae68405389be7f8b3b6"
    },
    keyType: 2
  }
}
```

```shell
// Request (AccountKey type: AccountKeyRoleBased)
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getAccountKey","params":["0x68756d616e616161000000000000000000000000", "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result (AccountKeyRoleBased has nested key structure)
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    key: [{
      key: {
        x: "0x819659d4f08e08d4bd97c6ce5ed2c2eb914201a5b3731eb9d208128df24b97dd",
        y: "0x1824267ab9e55f5a3fb1030f0299fa73fc0037305d5b1d90100e2131af41c010"
      },
      keyType: 2
    }, {
      key: {
        x: "0x73363604ca8776a2883b02046361b7eb6bd11f4fc10700ee51c525bcded134c1",
        y: "0xfc3e3cb3f4f5b709df5a2075107bc73c8618440c08456bafc44ee6f27f9e6326"
      },
      keyType: 2
    }, {
      key: {
        x: "0x95c920eb2571dff37baecdbbee32897e6e448c6725c5ab73569cc6f659684307",
        y: "0xef7839023c48acf710ad322356c12b7c5b7f475515ba7d5834f41a993f42b8f9"
      },
      keyType: 2
    }],
    keyType: 5
  }
}
```

```shell
// Request (AccountKey type: AccountKeyLegacy)
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getAccountKey","params":["0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    key: {},
    keyType: 1
  }
}
```

## klay_getBalance <a id="klay_getbalance"></a>

Trả về số dư tài khoản của địa chỉ đã cho.

**Tham số**

| Tên                  | type                       | Mô tả                                                                                                                                                                               |
| -------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address              | DỮ LIỆU 20 byte            | Địa chỉ để kiểm tra số dư.                                                                                                                                                          |
| số khối hoặc hàm băm | SỐ LƯỢNG \| THẺ \| HÀM BĂM | Số khối nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](./block.md#the-default-block-parameter) hoặc hàm băm khối. |

:::note

LƯU Ý: Trong các phiên bản trước phiên bản Klaytn v1.7.0, chỉ có số khối số nguyên, chuỗi `"earliest"` và `"latest"` khả dụng.

:::

**Giá trị trả về**

| type     | Mô tả                                       |
| -------- | ------------------------------------------- |
| SỐ LƯỢNG | Giá trị nguyên của số dư hiện tại theo peb. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getBalance","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

## klay_getCode <a id="klay_getcode"></a>

Trả về mã ở địa chỉ đã cho.

**Tham số**

| Loại                      | Mô tả                                                                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DỮ LIỆU 20 byte            | Địa chỉ                                                                                                                                                                             |
| SỐ LƯỢNG \| THẺ \| HÀM BĂM | Số khối nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](./block.md#the-default-block-parameter) hoặc hàm băm khối. |

:::note

LƯU Ý: Trong các phiên bản trước phiên bản Klaytn v1.7.0, chỉ có số khối số nguyên, chuỗi `"earliest"` và `"latest"` khả dụng.

:::

**Giá trị trả về**

| Loại | Mô tả                 |
| ----- | --------------------- |
| DATA  | Mã từ địa chỉ đã cho. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getCode","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result":   "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}
```

## klay_getTransactionCount <a id="klay_gettransactioncount"></a>

Trả về số lượng giao dịch _được gửi_ từ một địa chỉ.

**Tham số**

| Loại                      | Mô tả                                                                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DỮ LIỆU 20 byte            | Địa chỉ                                                                                                                                                                             |
| SỐ LƯỢNG \| THẺ \| HÀM BĂM | Số khối nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](./block.md#the-default-block-parameter) hoặc hàm băm khối. |

:::note

LƯU Ý: Trong các phiên bản trước phiên bản Klaytn v1.7.0, chỉ có số khối số nguyên, chuỗi `"earliest"` và `"latest"` khả dụng.

:::

**Giá trị trả về**

| Loại    | Mô tả                                                     |
| -------- | --------------------------------------------------------- |
| SỐ LƯỢNG | Giá trị nguyên chỉ số lượng giao dịch gửi từ địa chỉ này. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
 "jsonrpc": "2.0",
 "id":1,
 "result": "0x1" // 1
}
```

## klay_isContractAccount <a id="klay_iscontractaccount"></a>

Trả về `true` nếu tài khoản đầu vào có codeHash không trống vào thời điểm có số khối cụ thể. Trả về `false` nếu tài khoản là EOA hoặc tài khoản hợp đồng thông minh không có codeHash.

**Tham số**

| Tên                  | type                       | Mô tả                                                                                                                                                                               |
| -------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản            | DỮ LIỆU 20 byte            | Địa chỉ                                                                                                                                                                             |
| số khối hoặc hàm băm | SỐ LƯỢNG \| THẺ \| HÀM BĂM | Số khối nguyên hoặc thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](./block.md#the-default-block-parameter) hoặc hàm băm khối. |

:::note

LƯU Ý: Trong các phiên bản trước phiên bản Klaytn v1.7.0, chỉ có số khối số nguyên, chuỗi `"earliest"` và `"latest"` khả dụng.

:::

**Giá trị trả về**

| Loại   | Mô tả                                                                          |
| ------- | ------------------------------------------------------------------------------ |
| Boolean | `true` có nghĩa là tham số đầu vào là một địa chỉ hợp đồng thông minh hiện có. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_isContractAccount","params":["0x2f07d5b3fa1051460099dc9ea0c2975b6ea67776", "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```

## klay_sign <a id="klay_sign"></a>

Phương thức ký nhận tính toán chữ ký dành riêng cho Klaytn với:

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

Việc thêm tiền tố vào thông báo giúp chữ ký đã tính toán có thể được nhận dạng là chữ ký dành riêng cho Klaytn. Điều này ngăn chặn hành vi lạm dụng khi một dApp độc hại có thể ký nhận dữ liệu tùy ý, _ví dụ như_, giao dịch và sử dụng chữ ký để mạo danh nạn nhân.

**LƯU Ý**: Địa chỉ để ký phải ở trạng thái mở khóa.

**Tham số**

| Tên       | type            | Mô tả            |
| --------- | --------------- | ---------------- |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ          |
| tin nhắn  | DỮ LIỆU N byte  | Thông báo cần ký |

**Giá trị trả về**

| Loại | Mô tả  |
| ----- | ------ |
| DATA  | Chữ ký |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```
