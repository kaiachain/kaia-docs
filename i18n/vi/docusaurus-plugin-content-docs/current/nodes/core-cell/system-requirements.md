# System Requirements

## H/W Specification <a id="h-w-specification"></a>

The network performance is measured based on the worst hardware specification within the network. According to the blockchain network structure, it is only possible to be scaled up vertically \(increasing hardware capacity\). Hence, it is recommended that all the nodes within the network should have the best hardwares having the similar specifications with each other at least.

If you're curious about the rationale of this hardware spec, the medium article [Determining optimal hardware specs for Kaia node operators](https://klaytn.foundation/node-operator-optimal-specs/) would help you understand.

The following sections show the recommended specifications for both CNs and PNs.

### Bare-metal Server <a id="bare-metal-server"></a>

#### Yêu cầu chung (Tất cả các loại nút)

| Category | Thông số kỹ thuật                                                                                                                                  |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU      | Tần số cơ bản 2,6 GHz – Tần số tối đa 3,4 GHz hoặc cao hơn (ví dụ: Bộ xử lý Intel® Xeon® Scalable thế hệ thứ 3) |
| Storage  | ≥ 4 TB SSD (điều chỉnh theo kích thước dữ liệu chuỗi; vui lòng liên hệ với Đội ngũ Kaia để được hướng dẫn)                      |

Any physical machine with similar hardware configurations would be sufficient to operate a CN or a PN.

#### Các thông số kỹ thuật được khuyến nghị theo loại nút

| Node Type                                    | Lõi/Luồng          | Memory       |
| :------------------------------------------- | :----------------- | :----------- |
| CN                                           | 16 nhân / 32 luồng | 128 gigabyte |
| PN                                           | 8 nhân / 16 luồng  | 64 gigabyte  |
| PN (with Live Pruning DB) | 4 nhân / 8 luồng   | 32 gigabyte  |

You can use and apply a live-pruning option to use live-pruning DB. For more details, please refer https://docs.kaia.io/learn/storage/live-pruning/. However, note that live-pruning spec is not recommended for CNs but this may change in the future.

### Cloud VM <a id="cloud-vm"></a>

#### Recommended Specification for AWS<a id="recommended-specification-for-aws"></a>

|                   Node Type                  |            Model            | vCPU | Memory \(GiB\) | Storage size \(GiB\) | Storage speed \(IOPS\) | Price \(Seoul region, USD/h\) |
| :------------------------------------------: | :-------------------------: | :--: | :---------------------------------: | :---------------------------------------: | :-----------------------------------------: | :------------------------------------------------: |
|                      CN                      | m6i.8xlarge |  32  |                 128                 |     4,000 (Minimum)    |                    9,000                    |                1.888               |
|                      PN                      | m6i.4xlarge |  16  |                  64                 |     4,000 (Minimum)    |                    9,000                    |                0.944               |
| PN (with Live Pruning DB) | m6i.2xlarge |   8  |                  32                 |     3,500 (Minimum)    |                    9,000                    |                0.472               |

This storage specification is derived from AWS EBS SSD (gp3) specification.

The information above is from [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) and [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/) and may be changed by AWS.

#### Recommended Specification for Azure<a id="recommended-specification-for-azure"></a>

|                   Node Type                  |  Model  | vCPU | Memory \(GiB\) | Storage type \(GiB\) | Storage speed \(IOPS\) | Price \(Korea Central, USD/h\) |
| :------------------------------------------: | :-----: | :--: | :---------------------------------: | :---------------------------------------: | :-----------------------------------------: | :-------------------------------------------------: |
|                      CN                      | D32s v5 |  32  |                 128                 |       P50 (4096)       |                     7500                    |                1.888                |
|                      PN                      | D16s v5 |  16  |                  64                 |       P50 (4096)       |                     7500                    |                0.944                |
| PN (with Live Pruning DB) |  D8s v5 |   8  |                  32                 |       P50 (4096)       |                     7500                    |                0.472                |

This storage specification is derived from Azure Premium Disk specification.

The information above is from [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) and [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing) and may be changed by Microsoft.

#### Recommended Specification for GCP<a id="recommended-specification-for-gcp"></a>

|                           Loại nút                          |       Model      | vCPU | Memory \(GiB\) | Storage type \(GiB\) | Storage speed \(IOPS\) | Price \(asia-northeast3, USD/h\) |
| :---------------------------------------------------------: | :--------------: | :--: | :---------------------------------: | :---------------------------------------: | :-----------------------------------------: | :---------------------------------------------------: |
|                              CN                             | c4-tiêu chuẩn-32 |  32  |                 120                 |     4,000 (Minimum)    |                     7500                    |               2.03078256              |
|                              PN                             |  n2-standard-16  |  16  |                  64                 |     4,000 (Minimum)    |                     7500                    |                1.016243               |
| PN (với cơ sở dữ liệu cắt tỉa trực tiếp) |   n2-standard-8  |   8  |                  32                 |     3,500 (Minimum)    |                     7500                    |                0.508121               |

The information above is from [https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/](https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/) and [https://cloud.google.com/storage/pricing#asia](https://cloud.google.com/storage/pricing#asia) and may be changed by Google.

## Storage Requirements <a id="storage-requirements"></a>

Assuming 100 TPS in average, 300 bytes average transaction size, and 1-second block latency, the expected daily storage requirement is about 2.5 GB/day \(=300x100x86400\).

## Operating System <a id="operating-system"></a>

Recommended environment is compatible with RHEL (7.8 or later).
Kaia binaries are fully tested on Amazon Linux 2, but they should work on other linux-based environments as well. macOS binaries are also provided for development purpose.
