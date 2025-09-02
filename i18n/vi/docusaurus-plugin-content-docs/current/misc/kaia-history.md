# Lịch sử Hard Fork của Kaia

Trang này hiển thị tất cả các hard fork của blockchain Kaia.

:::note

- Để biết thêm chi tiết về các bản phát hành Kaia, vui lòng tham khảo [Bản ghi chú phát hành Kaia trên GitHub](https://github.com/kaiachain/kaia/releases).
- Đối với các hard fork trước khi chuyển sang Kaia, vui lòng tham khảo [Lịch sử hard fork của Klaytn](klaytn-history.md).

:::

## Praha

| ` `     | Kairos                                  | Mạng chính                              |
| ------- | --------------------------------------- | --------------------------------------- |
| Ngày    | 10/6/2025 10:26 / UTC+9 | 17/7/2025 10:26 / UTC+9 |
| Số khối | `#187.930.000`                          | `#190.670.000`                          |

### Tóm tắt

Cập nhật Prague hardfork đã được triển khai cùng với bản phát hành [v2.0.0](https://github.com/kaiachain/kaia/releases/tag/v2.0.0) cho mạng thử nghiệm Kairos và bản phát hành [v2.0.2](https://github.com/kaiachain/kaia/releases/tag/v2.0.2) cho mạng chính. Nó giới thiệu các bản biên dịch trước BLS12-381 theo EIP-2537, hợp đồng hệ thống băm khối lịch sử theo EIP-2935, kiểm tra tạo hợp đồng theo EIP-7610, giá gas calldata cập nhật theo EIP-7623 và [KIP-223](https://kips.kaia.io/KIPs/kip-223), loại giao dịch SetCode theo EIP-7702 và [KIP-228](https://kips.kaia.io/KIPs/kip-228), và tính năng Consensus Liquidity theo [KIP-226](https://kips.kaia.io/KIPs/kip-226). Ngoài ra, nó còn bao gồm tính năng Gas Abstraction cho phép thanh toán phí gas bằng token.

## Kaia Chuyển đổi

| ` `     | Kairos                                  | Mạng chính                              |
| ------- | --------------------------------------- | --------------------------------------- |
| Ngày    | 13/6/2024 10:13 / UTC+9 | 29/8/2024 10:29 / UTC+9 |
| Số khối | `#156.660.000`                          | `#162.900.480`                          |

### Tóm tắt

Kaia Transition hardfork đã được giới thiệu cùng với bản phát hành [v1.0.0](https://github.com/kaiachain/kaia/releases/tag/v1.0.0) cho mạng thử nghiệm Kairos và bản phát hành [v1.0.2](https://github.com/kaiachain/kaia/releases/tag/v1.0.2) cho mạng chính. Hardfork này đánh dấu sự chuyển đổi từ blockchain Klaytn sang blockchain Kaia. Nó bao gồm hardfork TreasuryRebalanceV2 và các hợp đồng phân bổ token theo [KIP-160](https://kips.kaia.io/KIPs/kip-160), phí ưu tiên giao dịch (tip) theo [KIP-162](https://kips.kaia.io/KIPs/kip-162) tương tự như EIP-1559, hợp đồng PublicDelegation và CnStakingV3 của validator như mô tả trong [KIP-163](https://kips.kaia.io/KIPs/kip-163), và khoảng thời gian cập nhật staking được điều chỉnh thành 1 khối.