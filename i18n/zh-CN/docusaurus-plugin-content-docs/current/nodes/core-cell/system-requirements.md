# 系统要求

## 硬件/软件规格<a id="h-w-specification"></a>

网络性能是根据网络内最差的硬件规格来衡量的。 根据区块链网络结构，它只能纵向扩展（增加硬件容量）。 因此，建议网络内的所有节点至少都应拥有规格相似的最佳硬件。

如果你想了解这一硬件规格的原理，medium 上的文章[为 Kaia 节点操作员确定最佳硬件规格](https://klaytn.foundation/node-operator-optimal-specs/) 会帮助你理解。

以下各节列出了 CN 和 PN 的建议规格。

### 裸机服务器<a id="bare-metal-server"></a>

#### 一般要求（所有节点类型）

| 类别  | 规格                                                                                            |
| :-- | :-------------------------------------------------------------------------------------------- |
| CPU | 基本频率 2.6 GHz - 最大频率 3.4 GHz 或更高（例如，第 3 代 Intel® Xeon® 可扩展处理器） |
| 存储  | ≥ 4 TB SSD（根据链数据大小进行调整；请咨询 Kaia 团队以获得指导）                                                      |

任何具有类似硬件配置的物理机器都足以运行 CN 或 PN。

#### 按节点类型推荐的规格

| Node Type                                    | 核心/线程      | 内存    |
| :------------------------------------------- | :--------- | :---- |
| CN                                           | 16 核/32 线程 | 128GB |
| PN                                           | 8 核/16 线程  | 64 GB |
| PN (with Live Pruning DB) | 4 核/8 线程   | 32 GB |

您可以使用和应用实时修剪选项来使用实时修剪 DB。 更多详情，请参阅 https://docs.kaia.io/learn/storage/live-pruning/。 但要注意的是，目前不建议对 CN 进行活体修剪，但这一做法将来可能会改变。

### 云虚拟机<a id="cloud-vm"></a>

#### AWS 建议规格<a id="recommended-specification-for-aws"></a>

|                   Node Type                  |            Model            | vCPU | 内存（GiB） |                存储大小                | 存储速度（IOPS） |     价格（首尔地区，美元/小时）    |
| :------------------------------------------: | :-------------------------: | :--: | :-----: | :--------------------------------: | :--------: | :-------------------: |
|                      CN                      | m6i.8xlarge |  32  |   128   | 4,000 (Minimum) |    9,000   | 1.888 |
|                      PN                      | m6i.4xlarge |  16  |    64   | 4,000 (Minimum) |    9,000   | 0.944 |
| PN (with Live Pruning DB) | m6i.2xlarge |   8  |    32   | 3,500 (Minimum) |    9,000   | 0.472 |

此存储规范源自 AWS EBS SSD (gp3) 规范。

以上信息来自 [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) 和 [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)，可能会被 AWS 更改。

#### 建议的 "Azure "规范<a id="recommended-specification-for-azure"></a>

|     节点类型     |  Model  | vCPU | 内存（GiB） |          存储类型 （GiB\）          | 存储速度（IOPS） |     价格（韩国中部，美元/小时）    |
| :----------: | :-----: | :--: | :-----: | :---------------------------: | :--------: | :-------------------: |
|      CN      | D32s v5 |  32  |   128   | P50 (4096) |    7500    | 1.888 |
|      PN      | D16s v5 |  16  |    64   | P50 (4096) |    7500    | 0.944 |
| PN（带实时修剪 DB） |  D8s v5 |   8  |    32   | P50 (4096) |    7500    | 0.472 |

此存储规范源自 Azure Premium Disk 规范。

以上信息来自 [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) 和 [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing)，微软可能会对其进行修改。

#### 建议的 GCP 规范<a id="recommended-specification-for-gcp"></a>

|     节点类型     |       模型       | vCPU | 内存（GiB） | 存储类型 （GiB\） | 存储速度（IOPS） |      价格（亚洲-东北3，美元/小时）      |
| :----------: | :------------: | :--: | :-----: | :---------: | :--------: | :------------------------: |
|      CN      | c4-standard-32 |  32  |   120   |  4,000（最少）  |    7500    | 2.03078256 |
|      PN      |    n2- 标准-16   |  16  |    64   |  4,000（最少）  |    7500    |  1.016243  |
| PN（带实时修剪 DB） |    n2- 标准-8    |   8  |    32   |  3,500（最低）  |    7500    |  0.508121  |

以上信息来自 [https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/](https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/) 和 [https://cloud.google.com/storage/pricing#asia](https://cloud.google.com/storage/pricing#asia)，谷歌可能会对其进行修改。

## 存储要求<a id="storage-requirements"></a>

假设平均 TPS 为 100，平均事务大小为 300 字节，区块延迟为 1 秒，则预计每天的存储需求约为 2.5 GB/天（=300x100x86400）。

## 操作系统<a id="operating-system"></a>

建议环境与 RHEL（7.8 或更高版本）兼容。
Kaia 二进制文件已在亚马逊 Linux 2 上进行了全面测试，但也可在其他基于 Linux 的环境中运行。 还提供了用于开发的 macOS 二进制文件。
