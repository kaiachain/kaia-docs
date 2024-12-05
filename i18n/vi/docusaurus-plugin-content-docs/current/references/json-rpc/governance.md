---
description: |-
  Các API liên quan đến Cơ chế quản trị của Klaytn.
    Các API liên quan đến Cơ chế quản trị của Klaytn.
---

# governance

Để quản trị mạng, Klaytn cung cấp các API sau trong phần không gian tên `quản trị`.

Có ba chế độ quản trị khác nhau tại Klaytn.

- `Không có`: Tất cả các nút tham gia mạng đều có quyền thay đổi cấu hình.
- `duy nhất`: Chỉ một nút được chỉ định có quyền thay đổi cấu hình.
- `biểu quyết`: Tất cả các nút có quyền biểu quyết đều có thể biểu quyết cho một sự thay đổi. Khi tổng số quyền biểu quyết quá bán, một cuộc biểu quyết sẽ được thông qua.

Dựa trên chế độ quản trị, người đề xuất có thể biểu quyết về các tham số mạng như đơn giá, số lượng ngăn xếp tối thiểu, v.v.
Để trở thành người đề xuất, các nút ứng viên cần nạp một lượng KLAY tối thiểu.
Tất cả các nút hợp cách có thể đề xuất một khối nhưng cơ hội sẽ phụ thuộc vào số lượng nắm giữ.

Khi tính toán tỷ lệ nắm giữ để xác định số lượng vị trí (số lượng cơ hội) để trở thành người đề xuất trong một khoảng thời gian nhất định, Một nút có thể không được phân bổ bất kỳ vị trí nào do làm tròn số.
it is possible that a node may not be allocated any slots as a result of rounding numbers.
Tuy nhiên, một nút hợp cách đã nạp một lượng KLAY tối thiểu sẽ luôn được đảm bảo một vị trí.

Nghĩa là, nếu một nút không hợp cách - nút này không có đủ số lượng KLAY - thì sẽ không có cơ hội đề xuất cũng như xác thực một khối.

**Cảnh báo**

- Một nút quản trị luôn hợp cách ở chế độ `duy nhất` như một ngoại lệ.
- Một cuộc biểu quyết sẽ được thực hiện khi một khối được đề xuất. Cuộc biểu quyết này được áp dụng sau hai giai đoạn bao gồm cả giai đoạn mà khối được đề xuất.
  Như một ngoại lệ, chỉ addValidator/removeValidator được áp dụng ngay lập tức.

## governance_vote <a id="governance_vote"></a>

Phương thức `biểu quyết` sẽ gửi một phiếu bầu mới. Nếu nút có quyền biểu quyết dựa trên chế độ quản trị thì có thể đặt phiếu bầu. Nếu không, một thông báo lỗi sẽ được trả về và phiếu bầu sẽ bị bỏ qua.

**Tham số**

- `Khóa` : Tên của tùy chọn cài đặt cấu hình sẽ được thay đổi. Khóa có dạng `domain.field`
- `Giá trị` : Các loại giá trị khác nhau cho mỗi khóa.

| Khóa                                | Mô tả                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"governance.governancemode"`       | `CHUỖI`. Một trong ba chế độ quản trị. `"không có"`, `"duy nhất"`, `"biểu quyết"`                                                                                                                                                                                                                                             |
| `"governance.governingnode"`        | `ĐỊA CHỈ`. Địa chỉ của nút quản trị được chỉ định. Địa chỉ này chỉ hoạt động khi chế độ quản trị là `"duy nhất"` ví dụ:`"0xe733cb4d279da696f30d470f8c04decb54fcb0d2"`                                                                                                                                                         |
| `"governance.unitprice"`            | `SỐ`. Giá đơn vị gas. vd: `25000000000`                                                                                                                                                                                                                                                                                       |
| `"governance.addvalidator"`         | `ĐỊA CHỈ`. Địa chỉ của một ứng viên nút xác thực mới. vd: `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`                                                                                                                                                                                                                        |
| `"governance.removevalidator"`      | `ĐỊA CHỈ`. Địa chỉ của nút xác thực hiện tại cần được xóa. vd: `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`                                                                                                                                                                                                                   |
| `"governance.deriveshaimpl"`        | `SỐ`. Chính sách tạo hàm băm giao dịch và hàm băm biên lai trong tiêu đề khối. Xem [tại đây](https://github.com/klaytn/klaytn/blob/v1.10.0/blockchain/types/derive_sha.go#L34) để biết các tùy chọn khả dụng. vd: `2` (DeriveShaConcat)                                                                    |
| `"governance.govparamcontract"`     | `ĐỊA CHỈ`. Địa chỉ của hợp đồng GovParam. vd: `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`                                                                                                                                                                                                                                    |
| `"istanbul.epoch"`                  | `SỐ`. Khoảng thời gian trong đó các phiếu bầu được thu thập theo khối. Khi khoảng thời gian này kết thúc, tất cả các phiếu bầu chưa được thông qua sẽ bị xóa. vd: `86400`                                                                                                                                                     |
| `"istanbul.committeesize"`          | `SỐ`. Số lượng nút xác thực trong một ủy ban.(`sub` trong cấu hình chuỗi), ví dụ: `7`                                                                                                                                                                                                                      |
| `"reward.mintingamount"`            | `CHUỖI`. Số lượng Peb được tạo khi tạo ra một khối. Giá trị phải ở trong dấu ngoặc kép. vd: `"9600000000000000000"`                                                                                                                                                                                                           |
| `"reward.ratio"`                    | `CHUỖI`. Tỷ lệ phân phối cho CN/KGF/KIR được phân tách bằng `"/"`. Tổng của tất cả các giá trị phải bằng `100`. vd: `"50/40/10"` nghĩa là CN 50%, KGF 40%, KIR 10%                                                                                                                                                            |
| `"reward.kip82ratio"`               | `CHUỖI`. Tỷ lệ phân phối của người đề xuất khối cho người nắm giữ được phân tách bằng `"/"`. Tổng của tất cả các giá trị phải bằng `"100"`. Xem [KIP-82](https://github.com/klaytn/kips/blob/master/KIPs/kip-82.md) để biết thêm chi tiết. vd: `"20/80"` có nghĩa là người đề xuất nhận 20% trong khi người nắm giữ nhận 80%. |
| `"reward.useginicoeff"`             | `BOOL`. Sử dụng hệ số Gini hoặc không. `true`, `false`                                                                                                                                                                                                                                                                        |
| `"reward.deferredtxfee"`            | `BOOL`. Cách đưa ra phí giao dịch cho người đề xuất. Nếu true, điều đó có nghĩa là phí tx sẽ được tổng hợp bằng phần thưởng khối và được phân phối cho người đề xuất, KIR và KGF. Nếu false, thì tất cả phí tx sẽ được trao cho người đề xuất. `true`, `false`                                                                |
| `"reward.minimumstake"`             | `CHUỖI`. Lượng Klay cần thiết để trở thành CN (Nút đồng thuận). Giá trị phải ở trong dấu ngoặc kép. ví dụ như `"5000000"`                                                                                                                                                                                  |
| `"kip71.lowerboundbasefee"`         | `SỐ`. Phí cơ sở thấp nhất được phép. Xem [KIP-71](https://github.com/klaytn/kips/blob/main/KIPs/kip-71.md) để biết thêm chi tiết. vd: `25000000000`                                                                                                                                                                           |
| `"kip71.upperboundbasefee"`         | `SỐ`. Phí cơ sở cao nhất được phép. vd: `750000000000`                                                                                                                                                                                                                                                                        |
| `"kip71.gastarget"`                 | `SỐ`. Gas khối mà phí cơ sở muốn đạt được. Phí cơ sở tăng khi khối cha mẹ chứa nhiều hơn mục tiêu gas và giảm khi khối cha mẹ chứa ít hơn mục tiêu gas. vd: `30000000`                                                                                                                                                        |
| `"kip71.basefeedenominator"`        | `SỐ`. Kiểm soát tốc độ thay đổi phí cơ sở. vd: `20`                                                                                                                                                                                                                                                                           |
| `"kip71.maxblockgasusedforbasefee"` | `SỐ`. Gas khối tối đa nắm được trong tính toán phí cơ sở. vd: `60000000`                                                                                                                                                                                                                                                      |

**Giá trị trả về**

| type  | Mô tả                 |
| ----- | --------------------- |
| Chuỗi | Kết quả gửi phiếu bầu |

**Ví dụ**

```javascript
> governance.vote ("governance.governancemode", "ballot")
"Your vote was successfully placed."

> governance.vote ("governance.governingnode", "0x12345678990123456789901234567899012345678990")
"Your vote was successfully placed."

> governance.vote("istanbul.epoch", 604800)
"Your vote was successfully placed."

> governance.vote("governance.unitprice", 25000000000)
"Your vote was successfully placed."

> governance.vote("istanbul.committeesize", 7)
"Your vote was successfully placed."

> governance.vote("reward.mintingamount", "9600000000000000000")
"Your vote was successfully placed."

> governance.vote("reward.ratio", "40/30/30")
"Your vote was successfully placed."

> governance.vote("reward.useginicoeff", false)
"Your vote was successfully placed."

// If wrong data are given
> governance.vote("reward.ratio", 100)
"Your vote couldn't be placed. Please check your vote's key and value"

> governance.vote("governance.governingnode", 1234)
"Your vote couldn't be placed. Please check your vote's key and value"

// when `governancemode` is "single" and the node is not `governingnode`
> governance.vote("governance.governancemode", "ballot")
"You don't have the right to vote"
```

## governance_showTally <a id="governance_showtally"></a>

Thuộc tính `showTally` cung cấp số phiếu bầu quản trị hiện tại. Thuộc tính này sẽ hiển thị tỷ lệ phê duyệt tổng hợp theo tỷ lệ phần trăm. Khi vượt quá 50%, một cuộc biểu quyết sẽ được thông qua.

**Tham số**

Không có

**Giá trị trả về**

| Loại | Mô tả                                                             |
| ----- | ----------------------------------------------------------------- |
| Tally | Giá trị của mỗi phiếu bầu và tỷ lệ tán thành theo tỷ lệ phần trăm |

**Ví dụ**

```javascript
> governance.showTally
[{
    ApprovalPercentage: 36.2,
    Key: "unitprice",
    Value: 25000000000
}, {
    ApprovalPercentage: 72.5,
    Key: "mintingamount",
    Value: "9600000000000000000"
}]
```

## governance_totalVotingPower <a id="governance_totalvotingpower"></a>

Thuộc tính `totalVotingPower` cung cấp tổng của tất cả quyền biểu quyết mà CN có. Mỗi CN có 1.0 \~ 2.0 quyền biểu quyết.
Trong chế độ quản trị `"không có"`, `"duy nhất"`, `totalVotingPower` không cung cấp bất kỳ thông tin nào.

**Tham số**

Không có

**Giá trị trả về**

| Loại                 | Mô tả                                    |
| --------------------- | ---------------------------------------- |
| Số thực dấu phẩy động | Tổng quyền biểu quyết hoặc thông báo lỗi |

**Ví dụ**

```javascript
// In "ballot" governance mode
> governance.totalVotingPower
32.452

// In "none", "single" governance mode
> governance.totalVotingPower
"In current governance mode, voting power is not available"
```

## governance_myVotingPower <a id="governance_myvotingpower"></a>

Thuộc tính `myVotingPower` cung cấp quyền biểu quyết của nút. Quyền biểu quyết có thể là 1.0 \~ 2.0.
Trong chế độ quản trị `"không có"`, `"duy nhất"`, `totalVotingPower` không cung cấp bất kỳ thông tin nào.

**Tham số**

Không có

**Giá trị trả về**

| Loại                 | Mô tả                                       |
| --------------------- | ------------------------------------------- |
| Số thực dấu phẩy động | Quyền biểu quyết của nút hoặc thông báo lỗi |

**Ví dụ**

```javascript
// In "ballot" governance mode
> governance.myVotingPower
1.323

// In "none", "single" governance mode
> governance.myVotingPower
"In current governance mode, voting power is not available"
```

## governance_myVotes <a id="governance_myvotes"></a>

Thuộc tính `myVotes` cung cấp thông tin phiếu bầu của tôi trong một giai đoạn. Mỗi phiếu bầu được lưu trữ trong một khối khi nút của người dùng tạo một khối mới. Sau khi giai đoạn hiện tại kết thúc, thông tin này sẽ bị xóa.

**Tham số**

Không có

**Giá trị trả về**

| Loại               | Mô tả                                                                                                                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Danh sách phiếu bầu | Trạng thái biểu quyết của nút trong giai đoạn<br/>- `BlockNum`: Số khối mà phiếu bầu này được lưu trữ<br/>- `Bỏ phiếu`: Nếu phiếu bầu này được lưu trữ trong một khối hay không <br/>- `Khóa/Giá trị`: Nội dung biểu quyết |

**Ví dụ**

```javascript
> governance.vote("governance.governancemode", "ballot")
"Your vote was successfully placed."

> governance.myVotes
[{
    BlockNum: 403,
    Casted: true,
    Key: "governance.governancemode",
    Value: "ballot"
}]

```

## governance_getChainConfig <a id="governance_getchainconfig"></a>

`getChainConfig` trả về cấu hình chuỗi tại một khối cụ thể.
Nếu tham số không được đặt, phương pháp này sẽ trả về cấu hình chuỗi tại khối latest.

**Tham số**

| type            | Mô tả                                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG \| THẺ | Số nguyên hoặc khối thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](klay/block.md#the-default-block-parameter). |

:::note

LƯU Ý: Số khối có thể lớn hơn số khối latest, trong trường hợp đó API sẽ trả về giá trị dự kiến ​​dựa trên trạng thái chuỗi hiện tại. Các tham số quản trị trong tương lai có thể thay đổi thông qua các phiếu bầu quản trị bổ sung hoặc các thay đổi trạng thái hợp đồng GovParam.

:::

**Giá trị trả về**

| Loại | Mô tả                             |
| ----- | --------------------------------- |
| JSON  | Cấu hình chuỗi tại số khối đã cho |

**Ví dụ**

```javascript
> governance.getChainConfig()
{
  chainId: 1001,
  deriveShaImpl: 0,
  ethTxTypeCompatibleBlock: 86513895,
  governance: {
    govParamContract: "0x84214cec245d752a9f2faf355b59ddf7f58a6edb",
    governanceMode: "single",
    governingNode: "0x99fb17d324fa0e07f23b49d09028ac0919414db6",
    kip71: {
      basefeedenominator: 20,
      gastarget: 30000000,
      lowerboundbasefee: 25000000000,
      maxblockgasusedforbasefee: 60000000,
      upperboundbasefee: 750000000000
    },
    reward: {
      deferredTxFee: true,
      kip82ratio: "20/80",
      minimumStake: 5000000,
      mintingAmount: 6400000000000000000,
      proposerUpdateInterval: 3600,
      ratio: "50/40/10",
      stakingUpdateInterval: 86400,
      useGiniCoeff: true
    }
  },
  istanbul: {
    epoch: 604800,
    policy: 2,
    sub: 22
  },
  istanbulCompatibleBlock: 75373312,
  koreCompatibleBlock: 111736800,
  londonCompatibleBlock: 80295291,
  magmaCompatibleBlock: 98347376,
  unitPrice: 250000000000
}
```

## governance_chainConfig <a id="governance_chainconfig"></a>

Thuộc tính `chainConfig` cung cấp cấu hình chuỗi latest.
Nó tương đương với `chainConfigAt()` với tham số trống.

:::caution

`governance_chainConfig` Không được dùng API kể từ Klaytn v1.11 (Xem [klaytn#1783](https://github.com/klaytn/klaytn/pull/1783)).
Thay vào đó, hãy sử dụng <a href="#governance_getchainconfig">`governance_getChainConfig`</a>.

LƯU Ý: API RPC không còn được sử dụng kể từ v1.11. Tuy nhiên, thuộc tính `governance.chainConfig` trong bảng điều khiển Klaytn JavaScript đã bị xóa kể từ Klaytn v1.10.2.
is removed since Klaytn v1.10.2.

:::

:::note

LƯU Ý: Trong các phiên bản trước phiên bản Klaytn v1.10.0, API này trả về cấu hình chuỗi ban đầu.
Tuy nhiên, do tên dễ gây nhầm lẫn nên nó được cập nhật kể từ phiên bản Klaytn v1.10.0.
Để truy vấn cấu hình chuỗi ban đầu, hãy sử dụng `chainConfigAt(0)` thay thế.

:::

**Tham số**

Không có

**Giá trị trả về**

| Loại | Mô tả                   |
| ----- | ----------------------- |
| JSON  | Cấu hình chuỗi hiện tại |

**Ví dụ**

```javascript
> governance.chainConfig
{
  chainId: 1001,
  deriveShaImpl: 2,
  governance: {
    govParamContract: "0x0000000000000000000000000000000000000000",
    governanceMode: "ballot",
    governingNode: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
    kip71: {
      basefeedenominator: 20,
      gastarget: 30000000,
      lowerboundbasefee: 25000000000,
      maxblockgasusedforbasefee: 60000000,
      upperboundbasefee: 750000000000
    },
    reward: {
      deferredTxFee: true,
      kip82ratio: "20/80",
      minimumStake: 5000000,
      mintingAmount: 6400000000000000000,
      proposerUpdateInterval: 3600,
      ratio: "50/40/10",
      stakingUpdateInterval: 20,
      useGiniCoeff: false
    }
  },
  istanbul: {
    epoch: 20,
    policy: 2,
    sub: 1
  },
  istanbulCompatibleBlock: 0,
  koreCompatibleBlock: 0,
  londonCompatibleBlock: 0,
  magmaCompatibleBlock: 0,
  unitPrice: 25000000000
}
```

## governance_chainConfigAt <a id="governance_chainconfigat"></a>

`chainConfigAt` trả về cấu hình chuỗi tại một khối cụ thể.
Nếu tham số không được đặt, phương pháp này sẽ trả về cấu hình chuỗi tại khối latest.

:::caution

`governance_chainConfigAt` Không được dùng API kể từ Klaytn v1.11 (xem [klaytn#1783](https://github.com/klaytn/klaytn/pull/1783)).
Thay vào đó, hãy sử dụng <a href="#governance_getchainconfig">`governance_getChainConfig`</a>.

:::

**Tham số**

| Loại           | Mô tả                                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG \| THẺ | Số nguyên hoặc khối thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](klay/block.md#the-default-block-parameter). |

:::note

LƯU Ý: Số khối có thể lớn hơn số khối latest, trong trường hợp đó API sẽ trả về giá trị dự kiến ​​dựa trên trạng thái chuỗi hiện tại. Các tham số quản trị trong tương lai có thể thay đổi thông qua các phiếu bầu quản trị bổ sung hoặc các thay đổi trạng thái hợp đồng GovParam.

:::

**Giá trị trả về**

| Loại | Mô tả                             |
| ----- | --------------------------------- |
| JSON  | Cấu hình chuỗi tại số khối đã cho |

**Ví dụ**

```javascript
> governance.chainConfigAt()
{
  chainId: 1001,
  deriveShaImpl: 2,
  governance: {
    govParamContract: "0x0000000000000000000000000000000000000000",
    governanceMode: "ballot",
    governingNode: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
    kip71: {
      basefeedenominator: 20,
      gastarget: 30000000,
      lowerboundbasefee: 25000000000,
      maxblockgasusedforbasefee: 60000000,
      upperboundbasefee: 750000000000
    },
    reward: {
      deferredTxFee: true,
      kip82ratio: "20/80",
      minimumStake: 5000000,
      mintingAmount: 6400000000000000000,
      proposerUpdateInterval: 3600,
      ratio: "50/40/10",
      stakingUpdateInterval: 20,
      useGiniCoeff: false
    }
  },
  istanbul: {
    epoch: 20,
    policy: 2,
    sub: 1
  },
  istanbulCompatibleBlock: 0,
  koreCompatibleBlock: 0,
  londonCompatibleBlock: 0,
  magmaCompatibleBlock: 0,
  unitPrice: 25000000000
}
```

## governance_nodeAddress <a id="governance_nodeaddress"></a>

Thuộc tính `nodeAddress` cung cấp địa chỉ của nút mà người dùng đang sử dụng. Nó được lấy từ nodekey và được sử dụng để ký các thông báo đồng thuận. Và giá trị `"governingnode"` phải là một trong những địa chỉ nút của nút xác thực.

**Tham số**

Không có

**Giá trị trả về**

| Loại   | Mô tả                       |
| ------- | --------------------------- |
| ĐỊA CHỈ | 20 địa chỉ BYTE của một nút |

**Ví dụ**

```javascript
> governance.nodeAddress
"0xe733cb4d279da696f30d470f8c04decb54fcb0d2"
```

## governance_getParams <a id="governance_getparams"></a>

`getParams` trả về các tham số quản trị tại một khối cụ thể.

**Tham số**

| type            | Mô tả                                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG \| THẺ | Số nguyên hoặc khối thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](klay/block.md#the-default-block-parameter). |

:::note

LƯU Ý: Số khối có thể lớn hơn số khối latest, trong trường hợp đó API sẽ trả về giá trị dự kiến ​​dựa trên trạng thái chuỗi hiện tại. Các tham số quản trị trong tương lai có thể thay đổi thông qua các phiếu bầu quản trị bổ sung hoặc các thay đổi trạng thái hợp đồng GovParam.

:::

**Giá trị trả về**

| Loại | Mô tả            |
| ----- | ---------------- |
| JSON  | tham số quản trị |

**Ví dụ**

```javascript
> governance.getParams(89)
{
  governance.deriveshaimpl: 2,
  governance.governancemode: "single",
  governance.governingnode: "0x99fb17d324fa0e07f23b49d09028ac0919414db6",
  governance.govparamcontract: "0x0000000000000000000000000000000000000000",
  governance.unitprice: 25000000000,
  istanbul.committeesize: 22,
  istanbul.epoch: 604800,
  istanbul.policy: 2,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: true,
  reward.kip82ratio: "20/80",
  reward.minimumstake: "5000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.ratio: "34/54/12",
  reward.stakingupdateinterval: 86400,
  reward.useginicoeff: true
}
```

## governance_itemsAt <a id="governance_itemsat"></a>

`itemsAt` trả về các tham số quản trị tại một khối cụ thể.

:::caution

API `governance_itemsAt` sẽ không còn được dùng kể từ Klaytn v1.11 (xem [klaytn#1783](https://github.com/klaytn/klaytn/pull/1783)).
Thay vào đó, hãy sử dụng <a href="#governance_getparams">`governance_getParams`</a>.

:::

**Tham số**

| Loại           | Mô tả                                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG \| THẺ | Số nguyên hoặc khối thập lục phân hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](klay/block.md#the-default-block-parameter). |

:::note

LƯU Ý: Trong các phiên bản trước phiên bản Klaytn v1.7.0, chỉ có số khối số nguyên, chuỗi `"earliest"` và `"latest"` khả dụng.

:::

:::note

LƯU Ý: Số khối có thể lớn hơn số khối latest, trong trường hợp đó API sẽ trả về giá trị dự kiến ​​dựa trên trạng thái chuỗi hiện tại. Các tham số quản trị trong tương lai có thể thay đổi thông qua các phiếu bầu quản trị bổ sung hoặc các thay đổi trạng thái hợp đồng GovParam.

:::

**Giá trị trả về**

| Loại | Mô tả        |
| ----- | ------------ |
| JSON  | mục quản trị |

**Ví dụ**

```javascript
> governance.itemsAt(89)
{
  governance.deriveshaimpl: 2,
  governance.governancemode: "single",
  governance.governingnode: "0x7bf29f69b3a120dae17bca6cf344cf23f2daf208",
  governance.govparamcontract: "0x0000000000000000000000000000000000000000",
  governance.unitprice: 25000000000,
  istanbul.committeesize: 13,
  istanbul.epoch: 30,
  istanbul.policy: 2,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: true,
  reward.kip82ratio: "20/80",
  reward.minimumstake: "5000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 30,
  reward.ratio: "34/54/12",
  reward.stakingupdateinterval: 60,
  reward.useginicoeff: true
}
```

## governance_pendingChanges <a id="governance_pendingchanges"></a>

`pendingChanges` trả về danh sách các mục đã nhận đủ số phiếu nhưng chưa hoàn tất. Vào cuối giai đoạn hiện tại, những thay đổi này sẽ được hoàn tất và kết quả sẽ có hiệu lực từ giai đoạn này đến giai đoạn tiếp theo.

**Tham số**

Không có

**Giá trị trả về**

| Loại               | Mô tả                                                        |
| ------------------- | ------------------------------------------------------------ |
| Danh sách phiếu bầu | Các thay đổi hiện đang chờ xử lý bao gồm các khóa và giá trị |

**Ví dụ**

```javascript
> governance.pendingChanges
{
  reward.minimumstake: "5000000",
  reward.useginicoeff: false
}
```

## governance_votes <a id="governance_votes"></a>

`phiếu bầu` trả về phiếu bầu từ tất cả các nút trong một giai đoạn. Những phiếu bầu này được thu thập từ tiêu đề của mỗi khối.

**Tham số**

Không có

**Giá trị trả về**

| Loại               | Mô tả                                                       |
| ------------------- | ----------------------------------------------------------- |
| Danh sách phiếu bầu | Phiếu bầu hiện tại bao gồm các khóa, giá trị và địa chỉ nút |

**Ví dụ**

```javascript
> governance.votes
[{
    key: "reward.minimumstake",
    validator: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
    value: "5000000"
}, {
    key: "reward.useginicoeff",
    validator: "0xa5bccb4d279419abe2d470f8c04dec0789ac2d54",
    value: false
}]
```

## governance_idxCache <a id="governance_idxcache"></a>

Thuộc tính `idxCache` trả về một mảng idxCache hiện tại trong bộ nhớ đệm. idxCache chứa số khối nơi diễn ra thay đổi về quản trị. Theo mặc định, bộ đệm có thể có tối đa 1000 số khối trong bộ nhớ.

**Tham số**

Không có

**Giá trị trả về**

| Loại       | Mô tả                                    |
| ----------- | ---------------------------------------- |
| mảng uint64 | Số khối nơi diễn ra thay đổi về quản trị |

**Ví dụ**

```javascript
> governance.idxCache
[0, 30]
```

## governance_idxCacheFromDb <a id="governance_idxcachefromdb"></a>

`idxCacheFromDb` trả về một mảng chứa tất cả các số khối đã từng có thay đổi quản trị. Kết quả `idxCacheFromDb` giống hoặc dài hơn kết quả của `idxCache`

**Tham số**

Không có

**Giá trị trả về**

| Loại       | Mô tả                                           |
| ----------- | ----------------------------------------------- |
| mảng uint64 | Tất cả số khối nơi diễn ra thay đổi về quản trị |

**Ví dụ**

```javascript
> governance.idxCacheFromDb
[0, 30]
```

## governance_itemCacheFromDb <a id="governance_itemcachefromdb"></a>

`itemCacheFromDb` trả về thông tin quản trị được lưu trữ trong khối đã cho. Nếu không có thay đổi nào được lưu trữ trong khối đã cho, hàm sẽ trả về `null`.

**Tham số**

| Loại  | Mô tả                                                            |
| ------ | ---------------------------------------------------------------- |
| uint64 | Số khối để truy vấn thay đổi quản trị được thực hiện trong khối. |

**Giá trị trả về**

| type | Mô tả                                                  |
| ---- | ------------------------------------------------------ |
| JSON | Thông tin quản trị được lưu trữ tại một khối nhất định |

**Ví dụ**

```javascript
> governance.itemCacheFromDb(0)
{
  governance.governancemode: "single",
  governance.governingnode: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
  governance.unitprice: 25000000000,
  istanbul.committeesize: 1,
  istanbul.epoch: 30,
  istanbul.policy: 2,
  reward.deferredtxfee: true,
  reward.minimumstake: "5000000",
  reward.mintingamount: "6400000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.ratio: "50/40/10",
  reward.stakingupdateinterval: 20,
  reward.useginicoeff: false
}
```

## governance_getStakingInfo <a id="governance_getstakinginfo"></a>

`getStakingInfo` trả về thông tin nắm giữ tại một khối cụ thể. Kết quả bao gồm các thông tin sau.

- `BlockNum`: Số khối nơi cung cấp thông tin nắm giữ.
- `CouncilNodeAddrs`: Địa chỉ của nút đồng thuận.
- `CouncilRewardAddrs`: Các địa chỉ mà phần thưởng khối của các nút liên kết được gửi đến.
- `CouncilStakingAddrs`: Địa chỉ hợp đồng mà các nút được liên kết triển khai để nắm giữ.
- `CouncilStakingAmounts`: Số lượng KLAY mà các nút được liên kết nắm giữ.
- `Gini`: Hệ số Gini.
- `KIRAddr`: Địa chỉ hợp đồng của KIR.
- `PoCAdr`: Địa chỉ hợp đồng của KGF. PoC là tên trước đây của KGF.
- `UseGini`: Giá trị boolean dù hệ số Gini có được sử dụng hay không.

Lưu ý rằng thứ tự của tất cả các địa chỉ và số lượng nắm giữ phải khớp với nhau.

**Tham số**

| type            | Mô tả                                                                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG \| THẺ | Số nguyên của số khối hoặc chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định](./klay/block.md#the-default-block-parameter). |

**Giá trị trả về**

| Loại | Mô tả             |
| ----- | ----------------- |
| JSON  | Thông tin nắm giữ |

**Ví dụ**

```javascript
> governance.getStakingInfo("latest")
{
  BlockNum: 57801600,
  CouncilNodeAddrs: ["0x99fb17d324fa0e07f23b49d09028ac0919414db6", "0x571e53df607be97431a5bbefca1dffe5aef56f4d", "0xb74ff9dea397fe9e231df545eb53fe2adf776cb2", "0x5cb1a7dccbd0dc446e3640898ede8820368554c8", "0x776817c0ef3d06d794cf01ae9afa33d7397b9b40", "0xc180ca565b34b5b63877674f5fe647e7da079022", "0x03497f51c31fe8b402df0bde90fd5a85f87aa943"],
  CouncilRewardAddrs: ["0xb2bd3178affccd9f9f5189457f1cad7d17a01c9d", "0x6559a7b6248b342bc11fbcdf9343212bbc347edc", "0x82829a60c6eac4e3e9d6ed00891c69e88537fd4d", "0xa86fd667c6a340c53cc5d796ba84dbe1f29cb2f7", "0x6e22cbe2b8bbd1df9f1d3c8ebae6d7ff5414a734", "0x24e593fb29731e54905025c230727dc28d229f77", "0x2b2a7a1d29a203f60e0a964fc64231265a49cd97"],
  CouncilStakingAddrs: ["0x12fa1ab4c3e17c1c08c1b5a945c864c8e8bf707e", "0xfd56604f1a20268ff7a0eab2ab48e25ee1e0f653", "0x1e0f6aaa9baa6081dc4910a854eebf8854c262ab", "0x5e6988415ebe0f6b088f5a676003ba60f572875a", "0xbb44998c2af35b8faee694cffe216558056d747e", "0x68cba498b7175cde9de08fc2e85ad3e9c8caefa8", "0x98efb31eeccafe35d53a6926e2a54c0858d9eebc"],
  CouncilStakingAmounts: [5000000, 5000000, 5000000, 5000000, 5000000, 5000000, 5000000],
  Gini: 0,
  KIRAddr: "0x716f89d9bc333286c79db4ebb05516897c8d208a",
  PoCAddr: "0x2bcf9d3e4a846015e7e3152a614c684de16f37c6",
  UseGini: true
}
```

## governance_ getRewardsAccumulated<a id="governance_getRewardsAccumulated"></a>

Returns the rewards information accumulated within the given block range `[first, last]`.

:::note

NOTE: The block range should be less than 604800 (about 7 days) to protect endpoints from the resource exhaustion.

:::

**Parameters**

| Type            | Description                                                                                                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| QUANTITY \| TAG | Accumulation start (first) block number, inclusive. Integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](./klay/block.md#the-default-block-parameter). |
| QUANTITY \| TAG | Accumulation end (last) block number, inclusive. Integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](./klay/block.md#the-default-block-parameter).    |

**Return Value**

| Type | Description         |
| ---- | ------------------- |
| JSON | Rewards information |

**Example**

```javascript
> governance.getRewardsAccumulated(123400489,123416489)
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "firstBlockTime": "2023-05-29 15:11:27 +0900 KST",
        "lastBlockTime": "2023-05-29 19:38:11 +0900 KST",
        "firstBlock": 123400489,
        "lastBlock": 123416489,
        "totalMinted": 102406400000000000000000,
        "totalTxFee": 1012877568458206944160,
        "totalBurntTxFee": 1012877568458206944160,
        "totalProposerRewards": 10240640000000000224014,
        "totalStakingRewards": 40962559999999999775986,
        "totalKFFRewards": 20481280000000000000000,
        "totalKCFRewards": 30721920000000000000000,
        "rewards": {
            "0x04185389ec237dba242888a5a28b5555d011a223": 341760000000000007476,
            "0x064ce4c3e8409a544ce91245f9f8cfc33bde8925": 341158409421920578070,
            "0x0bb09aab5276ae532e33caf69d00a624adbc3fdf": 4692517369325951639990,
            "0x0c41cce8ddaea235f97745a13207421dca7340fa": 341158442792400102695,
            "0x179679457f93094a4e7186abcb2089661e92fc22": 4670094563747132209866,
            "0x186de0382923086f73367bab16af09aeda4e54bf": 3344700808386003997995,
            "0x1a147924d0489fccf53471904dc271b9d20157a4": 812253494122089774069,
            "0x24e593fb29731e54905025c230727dc28d229f77": 341120033370479516086,
            "0x2b2a7a1d29a203f60e0a964fc64231265a49cd97": 405647783029499903389,
            "0x2fd3ff6e4ead7430ea25bab5e5b2b073492b7e6e": 4179365177477290146362,
            "0x4b87df856044f2580ca62f44f6e15121d7ebcc91": 943429290876805235278,
            "0x5459c9591c3c3f260eff1a538d84610015332c91": 399791330615756805978,
            "0x54e8bc489cee5ab638920cc80160d8095df846b1": 1342241347422787927227,
            "0x5ed9914689a2fafb55a0c99a1c10d2f911d37734": 1150518010638720583027,
            "0x5f1dbd747996d8d31e2ab0317be7ffffd155522a": 507972397569861326690,
            "0x75239993ac422a4e6a7441d5ab47ed6e91faf306": 9708690430353790307357,
            "0x758476368db33864b704f41cc63b8460f8e7d39a": 719558444429276229872,
            "0x85d82d811743b4b8f3c48f3e48a1664d1ffc2c10": 20481280000000000000000,
            "0x999999999939ba65abb254339eec0b2a0dac80e9": 2546664690927360639974,
            "0xac7f6f8a63733877a78917dc798ed7693095be7b": 976294207626140822860,
            "0xadb287e1f8405f085c740e791a3914f9b07acae0": 4834561973146129955927,
            "0xb89a760eb082dbae4f334a9374fa32e7b077e00d": 341120033370479516086,
            "0xbb121974208b9282e72cb0da7f48d8ae14dba954": 477271623157965876433,
            "0xc8e7053dc17bce47d2317718734ef087be40a023": 533654318603814390326,
            "0xcd7cd61f0b221a61405640b8ba10f1455cce6d51": 1153716971545888984956,
            "0xda5609a74470689a3b51cb53ee3c499b0f54f31a": 401005661421389210969,
            "0xdbd3fbdc9e1965855b773a4746f27165b787fe3c": 1153644257271028044532,
            "0xdc7dda990c08513962d5ae6dfb195b1f6879bfaf": 1954666498718499702479,
            "0xdd4c8d805fc110369d3b148a6692f283ffbdccd3": 30721920000000000000000,
            "0xdedbab7de9551a2bee78792638af67d59b8675c6": 1285976941809533886160,
            "0xe3d49ffc285c668425b2966b683776f632859efa": 714216865143954209314,
            "0xf786c3720a10cb48c8f12d0ac2086dcf227c7cde": 588428623678048468557
        }
    }
}
```
