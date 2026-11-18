# System Requirements

## H/W Specification <a id="h-w-specification"></a>

The network performance is measured based on the worst hardware specification within the network. According to the blockchain network structure, it is only possible to be scaled up vertically \(increasing hardware capacity\). Hence, it is recommended that all the nodes within the network should have the best hardwares having the similar specifications with each other at least.

If you're curious about the rationale of this hardware spec, the medium article [Determining optimal hardware specs for Kaia node operators](https://klaytn.foundation/node-operator-optimal-specs/) would help you understand.

Các phần sau đây trình bày các thông số kỹ thuật được khuyến nghị cho các CN.

### Bare-metal Server <a id="bare-metal-server"></a>

#### Yêu cầu chung (Tất cả các loại nút)

| Category | Thông số kỹ thuật                                                                                                                                                                                                                                                                                      |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU      | Bộ vi xử lý Intel® Xeon® Scalable thế hệ thứ 5 (“Emerald Rapids”) hoặc các phiên bản mới hơn (ví dụ: dòng Xeon® Platinum 85xx/86xx); AMD EPYC™ dòng 9004 (“Genoa”) hoặc các phiên bản mới hơn, mang lại hiệu năng tương đương |
| Storage  | ≥ 3 TB SSD (điều chỉnh tùy theo kích thước dữ liệu chuỗi; vui lòng liên hệ với Nhóm Kaia để được hướng dẫn)                                                                                                                                                                         |

Bất kỳ máy vật lý nào có cấu hình phần cứng tương tự đều đủ điều kiện để vận hành một CN.

#### Các thông số kỹ thuật được khuyến nghị theo loại nút

| Node Type | Lõi/Luồng          | Memory  |
| :-------- | :----------------- | :------ |
| CN        | 12 nhân / 24 luồng | ≥ 64 GB |

### Cloud VM <a id="cloud-vm"></a>

#### Recommended Specification for AWS<a id="recommended-specification-for-aws"></a>

| Node Type |              Kiến trúc             |            Model            | vCPU | Memory \(GiB\) |       Storage size \(GiB\)      | Storage speed \(IOPS\) | Giá \(khu vực Singapore, USD/giờ\) |
| :-------: | :--------------------------------: | :-------------------------: | :--: | :---------------------------------: | :--------------------------------------------------: | :-----------------------------------------: | :-----------------------------------------------------: |
|     CN    |   x86 (Intel)   | m8i.8xlarge |  32  |                 128                 | 3.000 (tối thiểu) |                    9,000                    |                          2,117                          |
|     CN    | Arm (Graviton4) | m8g.8xlarge |  32  |                 128                 | 3.000 (Tối thiểu) |                    9,000                    |                          1,795                          |

This storage specification is derived from AWS EBS SSD (gp3) specification.

The information above is from [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) and [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/) and may be changed by AWS.

#### Recommended Specification for Azure<a id="recommended-specification-for-azure"></a>

| Node Type |              Kiến trúc              |       Model       | vCPU | Memory \(GiB\) |       Storage type \(GiB\)      | Storage speed \(IOPS\) | Giá \(khu vực Đông Nam Á, USD/giờ\) |
| :-------: | :---------------------------------: | :---------------: | :--: | :---------------------------------: | :--------------------------------------------------: | :-----------------------------------------: | :------------------------------------------------------: |
|     CN    |    x86 (Intel)   |  D32s phiên bản 6 |  32  |                 128                 | 3.000 (tối thiểu) |                     7500                    |                   2.016                  |
|     CN    | Arm (Cobalt 100) | D32ps phiên bản 6 |  32  |                 128                 | 3.000 (Tối thiểu) |                     7500                    |                   1.398                  |

Thông số kỹ thuật lưu trữ này được xây dựng dựa trên thông số kỹ thuật của Azure Premium SSD v2.

The information above is from [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) and [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing) and may be changed by Microsoft.

#### Recommended Specification for GCP<a id="recommended-specification-for-gcp"></a>

| Loại nút |            Kiến trúc           |       Model       | vCPU | Memory \(GiB\) |       Storage type \(GiB\)      | Storage speed \(IOPS\) | Giá \(khu vực Singapore, USD/giờ\) |
| :------: | :----------------------------: | :---------------: | :--: | :---------------------------------: | :--------------------------------------------------: | :-----------------------------------------: | :-----------------------------------------------------: |
|    CN    | x86 (Intel) |  c4-tiêu-chuẩn-24 |  24  |                  90                 | 3.000 (Tối thiểu) |                     7500                    |                  1.463                  |
|    CN    | Arm (Axion) | c4a-tiêu-chuẩn-32 |  32  |                 128                 | 3.000 (tối thiểu) |                     7500                    |                  1.773                  |

Thông số kỹ thuật lưu trữ này được xây dựng dựa trên thông số kỹ thuật GCP Hyperdisk Balanced.

Thông tin trên được trích từ [https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/](https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/) và [https://cloud.google.com/compute/disks-image-pricing](https://cloud.google.com/compute/disks-image-pricing) và có thể được Google điều chỉnh.

## Storage Requirements <a id="storage-requirements"></a>

Assuming 100 TPS in average, 300 bytes average transaction size, and 1-second block latency, the expected daily storage requirement is about 2.5 GB/day \(=300x100x86400\).

## Operating System <a id="operating-system"></a>

Recommended environment is compatible with RHEL (7.8 or later).
Kaia binaries are fully tested on Amazon Linux 2, but they should work on other linux-based environments as well. macOS binaries are also provided for development purpose.
