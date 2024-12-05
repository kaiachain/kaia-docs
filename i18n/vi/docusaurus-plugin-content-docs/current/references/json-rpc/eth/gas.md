# Gas

## eth_feeHistory<a id="eth_feehistory"></a>

Trả về phí cơ sở cho mỗi gas và phí ưu tiên hiệu quả của một giao dịch trên mỗi lịch sử gas đối với phạm vi khối được yêu cầu, nếu có.êu cầu (nếu có).

**Tham số**

| Tên               | Loại                      | Mô tả                                                                                                                                                                                                                                                                                                              |
| ----------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| blockCount        | SỐ LƯỢNG                   | Số lượng khối trong khoảng yêu cầu được trình bày dưới dạng số thập lục phân. Có thể yêu cầu trong khoảng từ 1 (0x1) đến 1024 (0x400) khối trong một truy vấn duy nhất. Nếu không có đủ các khối cần truy vấn, thì số lượng khối trả về có thể ít hơn số lượng khối yêu cầu. |
| lastBlock         | SỐ LƯỢNG \| THẺ            | Khối cao nhất trong khoảng được yêu cầu dưới dạng số khối hoặc thẻ khối.                                                                                                                                                                                                                                           |
| rewardPercentiles | Mảng SỐ THỰC DẤU PHẨY ĐỘNG | Mảng giá trị số thực dấu phẩy động nằm trong khoảng từ 0 đến 100.                                                                                                                                                                                                                                                  |

**Giá trị trả về**

| Tên           | type                       | Mô tả                                                                                                                                                             |
| ------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oldestBlock   | SỐ LƯỢNG                   | Khối thấp nhất trong khoảng trả về được trình bày dưới dạng số thập lục phân.                                                                                     |
| baseFeePerGas | Mảng SỐ LƯỢNG              | Mảng phí cơ bản của khối trên mỗi gas. Mảng này bao gồm khối tiếp theo sau khối mới nhất trong khoảng trả về, vì giá trị này có thể được suy ra từ khối mới nhất. |
| gasUsedRatio  | Mảng SỐ THỰC DẤU PHẨY ĐỘNG | Mảng tỷ lệ sử dụng gas của khối. Các tỷ lệ này được tính bằng tỷ lệ giữa gasUsed và gasLimit.                                                                     |
| phần thưởng   | Mảng SỐ LƯỢNG              | Mảng phí ưu tiên hiệu quả trên mỗi điểm dữ liệu gas từ một khối duy nhất. Nếu khối không chứa điểm dữ liệu nào, thì tất cả các giá trị được trả về sẽ là 0.       |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_feeHistory","params":["0x10", "latest", [0.1, 0.2, 0.3]],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "oldestBlock": "0xa5b",
    "reward": [
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x5d21dba00",
        "0x5d21dba00",
        "0x5d21dba00"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x5d21dba00",
        "0x5d21dba00",
        "0x5d21dba00"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x5d21dba00",
        "0x5d21dba00",
        "0x5d21dba00"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ]
    ],
    "baseFeePerGas": [
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0"
    ],
    "gasUsedRatio": [
      0,
      0,
      0,
      0,
      0,
      0.0002952004000002952,
      0,
      0,
      0.00029504250000029504,
      0,
      0,
      0.0002963777000002964,
      0,
      0,
      0,
      0
    ]
  }
}
```

## eth_maxPriorityFeePerGas <a id="eth_maxpriorityfeepergas"></a>

Trả về đề xuất giới hạn tối đa phí gas trả thêm cho giao dịch phí biến đổi theo đơn vị peb.

**LƯU Ý**: This API has different behavior from Ethereum's.
Before Magma hardfork, it returns a gas price of Klaytn instead of suggesting a gas price as in Ethereum.
After Magma hardfork, it just returns 0.

**Tham số**

Không có

**Giá trị trả về**

| type     | Mô tả                                              |
| -------- | -------------------------------------------------- |
| SỐ LƯỢNG | Giá trị nguyên chỉ giá gas hiện tại tính bằng peb. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston (Gwei)
}
```
