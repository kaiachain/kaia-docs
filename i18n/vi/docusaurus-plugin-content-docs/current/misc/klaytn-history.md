# Lịch sử Hard Fork của Klaytn

Trang này hiển thị tất cả các hard fork của blockchain Klaytn.

:::info

Tài liệu này liệt kê các hard fork đã xảy ra trước khi chuyển đổi Kaia. Đối với các hard fork sau quá trình chuyển đổi, vui lòng tham khảo [Lịch sử hard fork Kaia](kaia-history.md).

:::

## Randao

| ` `     | Cây baobab                                                                 | Cây bách                                                    |
| ------- | -------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Ngày    | Ngày 19 tháng 12 năm 2023 10:05:01 / UTC+9 | 04/03/2024 10:25:34 / UTC+9 |
| Số khối | `#141.367.000`                                                             | `#147.534.000`                                              |

### Tóm tắt

Randao hardfork đã được giới thiệu cùng với bản phát hành [v1.12.0](https://github.com/klaytn/klaytn/releases/tag/v1.12.0). Nó thực hiện một hardfork tùy chọn để triển khai tính ngẫu nhiên trên chuỗi Randao theo [KIP-113](https://kips.klaytn.foundation/KIPs/kip-113), [KIP-114](https://kips.klaytn.foundation/KIPs/kip-114), [KIP-146](https://kips.klaytn.foundation/KIPs/kip-146).

## Cancún

| ` `     | Cây baobab                                                                 | Cây bách                                                    |
| ------- | -------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Ngày    | Ngày 19 tháng 12 năm 2023 10:05:01 / UTC+9 | 04/03/2024 10:25:34 / UTC+9 |
| Số khối | `#141.367.000`                                                             | `#147.534.000`                                              |

### Tóm tắt

Các tính năng của bản hardfork Cancun của Ethereum đã được giới thiệu trong bản phát hành [v1.12.0](https://github.com/klaytn/klaytn/releases/tag/v1.12.0). Để biết thông tin chi tiết, vui lòng tham khảo ghi chú phát hành. Ngoài ra, loại giao dịch AccessList (được giới thiệu trong [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)) đã được hỗ trợ đầy đủ ([#1955](https://github.com/klaytn/klaytn/pull/1955)).

## Thượng Hải

| ` `     | Cây baobab                                                 | Cây bách                                                    |
| ------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| Ngày    | 28/4/2023 10:30:31 / UTC+9 | 16/10/2023 10:50:24 / UTC+9 |
| Số khối | `#131.608.000`                                             | `#135.456.000`                                              |

### Tóm tắt

Các tính năng của bản hardfork Shanghai của Ethereum đã được giới thiệu trong bản phát hành [v1.11.0](https://github.com/klaytn/klaytn/releases/tag/v1.11.0). Nó bao gồm các tính năng tương đương với bản cập nhật Shanghai của Ethereum ([#1883](https://github.com/klaytn/klaytn/pull/1883), [#1861](https://github.com/klaytn/klaytn/pull/1861), [#1888](https://github.com/klaytn/klaytn/pull/1888)) và đã được sửa chữa để cho phép tạo tài khoản hợp đồng mới bằng cách ghi đè lên một tài khoản người dùng (EOA) ([#1904](https://github.com/klaytn/klaytn/pull/1904)).

## KIP-103 <a id="kip-103"></a>

| ` `     | Cây baobab                                                                | Cây bách                                                   |
| ------- | ------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Ngày    | Ngày 06 tháng 4 năm 2023 04:25:03 / UTC+9 | 17/4/2023 01:24:48 / UTC+9 |
| Số khối | `#119.145.600`                                                            | `#119.750.400`                                             |

### Tóm tắt

KIP-103 hardfork đã được giới thiệu cùng với bản phát hành [v1.10.2](https://github.com/klaytn/klaytn/releases/tag/v1.10.2). Nó bao gồm một triển khai của [KIP-103](https://kips.klaytn.foundation/KIPs/kip-103), đây là một thông số kỹ thuật về việc tái cân bằng kho bạc ([KGP-6](https://govforum.klaytn.foundation/t/kgp-6-proposal-to-establish-a-sustainable-and-verifiable-klay-token-economy/157)).

### Cân đối lại Kho bạc <a id="treasury-rebalance"></a>

| ` `                                   | Cây baobab                                 | Cây bách                                   |
| ------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| Địa chỉ hợp đồng cân bằng lại kho bạc | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 |
| Địa chỉ KCV                           | 0xaa8d19a5e17e9e1bA693f13aB0E079d274a7e51E | 0x4f04251064274252D27D4af55BC85b68B3adD992 |
| Địa chỉ KFF                           | 0x8B537f5BC7d176a94D7bF63BeFB81586EB3D1c0E | 0x85D82D811743b4B8F3c48F3e48A1664d1FfC2C10 |
| Địa chỉ KCF                           | 0x47E3DbB8c1602BdB0DAeeE89Ce59452c4746CA1C | 0xdd4C8d805fC110369D3B148a6692F283ffBDCcd3 |

## Kore <a id="kore"></a>

| ` `     | Cây baobab                                                           | Cây bách                                                   |
| ------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| Ngày    | 10 tháng 1 năm 2023 10:20:50 / UTC+9 | 17/4/2023 01:24:48 / UTC+9 |
| Số khối | `#111.736.800`                                                       | `#119.750.400`                                             |

### Tóm tắt

Kore hardfork đã được giới thiệu cùng với bản phát hành [v1.10.0](https://github.com/klaytn/klaytn/releases/tag/v1.10.0). Đây là việc triển khai phương pháp bỏ phiếu quản trị trên chuỗi ([KIP-81](https://kips.klaytn.foundation/KIPs/kip-81)), cấu trúc phần thưởng GC mới ([KIP-82](https://kips.klaytn.foundation/KIPs/kip-82)), và các thay đổi liên quan đến EVM.

## Magma <a id="magma"></a>

| ` `     | Cây baobab                                                                | Cây bách                                                   |
| ------- | ------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Ngày    | Ngày 08 tháng 8 năm 2022 11:01:20 / UTC+9 | 29/8/2022 11:51:00 / UTC+9 |
| Số khối | `#98.347.376`                                                             | `#99.841.497`                                              |

### Tóm tắt

Magma hardfork đã được giới thiệu cùng với bản phát hành [v1.9.0](https://github.com/klaytn/klaytn/releases/tag/v1.9.0). Nó bao gồm cơ chế định giá phí gas động, [#1493](https://github.com/klaytn/klaytn/pull/1493)) và là một triển khai của [KIP-71](https://kips.klaytn.foundation/KIPs/kip-71).

## Loại EthTx <a id="eth-tx-type"></a>

| ` `     | Cây baobab                                                 | Cây bách                                                   |
| ------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| Ngày    | 27/3/2022 23:56:31 / UTC+9 | 31/3/2022 12:14:39 / UTC+9 |
| Số khối | `#86.513.895`                                              | `#86.816.005`                                              |

### Tóm tắt

Các thay đổi về EthTxType của Ethereum đã được giới thiệu trong bản phát hành [v1.8.0](https://github.com/klaytn/klaytn/releases/tag/v1.8.0). Nó bao gồm các loại giao dịch mới để hỗ trợ các loại giao dịch Ethereum: TxTypeEthereumAccessList và TxTypeEthereumDynamicFee ([#1142](https://github.com/klaytn/klaytn/pull/1142), [#1158](https://github.com/klaytn/klaytn/pull/1158)).

## London EVM <a id="london-evm"></a>

| ` `     | Cây baobab                                                           | Cây bách                                                   |
| ------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| Ngày    | 14 tháng 1 năm 2022 11:02:55 / UTC+9 | 31/3/2022 12:14:39 / UTC+9 |
| Số khối | `#80.295.291`                                                        | `#86.816.005`                                              |

### Tóm tắt

Các tính năng của bản hard fork London của Ethereum đã được giới thiệu trong bản phát hành [v1.7.3](https://github.com/klaytn/klaytn/releases/tag/v1.7.3), bao gồm mã lệnh EVM BaseFee để tương thích với EVM London của Ethereum ([#1065](https://github.com/klaytn/klaytn/pull/1065), [#1066](https://github.com/klaytn/klaytn/pull/1066), [#1096](https://github.com/klaytn/klaytn/pull/1096)).

## Istanbul EVM <a id="istanbul-evm"></a>

| ` `     | Cây baobab                                                  | Cây bách                                                  |
| ------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| Ngày    | 17/11/2021 23:42:13 / UTC+9 | 31/3/2022 12:14:39 / UTC+ |
| Số khối | `#75.373.312`                                               | `#86.816.005`                                             |

### Tóm tắt

Các tính năng của bản hard fork Istanbul của Ethereum đã được giới thiệu trong bản phát hành [v1.7.0](https://github.com/klaytn/klaytn/releases/tag/v1.7.0), bao gồm các thay đổi từ [EIP-152](https://eips.ethereum.org/EIPS/eip-152), [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108), [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344), [EIP-1844](https://eips.ethereum.org/EIPS/eip-1844), và [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200).
