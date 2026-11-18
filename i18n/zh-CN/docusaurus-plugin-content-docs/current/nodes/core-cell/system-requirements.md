# 系统要求

## 硬件/软件规格<a id="h-w-specification"></a>

网络性能是根据网络内最差的硬件规格来衡量的。根据区块链网络结构，它只能纵向扩展（增加硬件容量）。因此，建议网络内的所有节点至少都应拥有规格相似的最佳硬件。

如果你想了解这一硬件规格的原理，medium 上的文章[为 Kaia 节点操作员确定最佳硬件规格](https://klaytn.foundation/node-operator-optimal-specs/) 会帮助你理解。

以下各节列出了对 CN 的推荐规格。

### 裸机服务器<a id="bare-metal-server"></a>

#### 一般要求（所有节点类型）

| 类别  | 规格                                                                                                      |
| :-- | :------------------------------------------------------------------------------------------------------ |
| CPU | 英特尔® 第五代至强® 可扩展处理器（“Emerald Rapids”）或更新版本（例如：至强® 白金 85xx/86xx 系列）；AMD EPYC™ 9004 系列（“Genoa”）或更新版本，且性能相当 |
| 存储  | ≥ 3 TB SSD（请根据链上数据大小进行调整；如需指导，请咨询 Kaia 团队）                                                              |

任何硬件配置相似的物理服务器都足以运行一个CN。

#### 按节点类型推荐的规格

| Node Type | 核心/线程      | 内存      |
| :-------- | :--------- | :------ |
| CN        | 12核 / 24线程 | ≥ 64 GB |

### 云虚拟机<a id="cloud-vm"></a>

#### AWS 建议规格<a id="recommended-specification-for-aws"></a>

| Node Type |       建筑       |            Model            | vCPU | 内存（GiB） |    存储大小   | 存储速度（IOPS） | 价格 \(新加坡地区，美元/小时\) |
| :-------: | :------------: | :-------------------------: | :--: | :-----: | :-------: | :--------: | :-------------------------------------: |
|     CN    |    x86（英特尔）    | m8i.8xlarge |  32  |   128   | 3,000（最低） |    9,000   |          2.117          |
|     CN    | Arm（Graviton4） | m8g.8xlarge |  32  |   128   | 3,000（最低） |    9,000   |          1.795          |

此存储规范源自 AWS EBS SSD (gp3) 规范。

以上信息来自 [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) 和 [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)，可能会被 AWS 更改。

#### 建议的 "Azure "规范<a id="recommended-specification-for-azure"></a>

| 节点类型 |        建筑       |   Model  | vCPU | 内存（GiB） | 存储类型 （GiB\） | 存储速度（IOPS） | 价格 \(东南亚地区，美元/小时\) |
| :--: | :-------------: | :------: | :--: | :-----: | :---------: | :--------: | :-------------------------------------: |
|  CN  |     x86（英特尔）    |  D32s v6 |  32  |   128   |  3,000（最低）  |    7500    |          2.016          |
|  CN  | Arm（Cobalt 100） | D32ps v6 |  32  |   128   |  3,000（最低）  |    7500    |          1.398          |

此存储规范源自 Azure Premium SSD v2 规范。

以上信息来自 [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) 和 [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing)，微软可能会对其进行修改。

#### 建议的 GCP 规范<a id="recommended-specification-for-gcp"></a>

| 节点类型 |     建筑     |        模型       | vCPU | 内存（GiB） | 存储类型 （GiB\） | 存储速度（IOPS） | 价格 \(新加坡地区，美元/小时\) |
| :--: | :--------: | :-------------: | :--: | :-----: | :---------: | :--------: | :-------------------------------------: |
|  CN  |  x86（英特尔）  |  c4-standard-24 |  24  |    90   |  3,000（最低）  |    7500    |          1.463          |
|  CN  | Arm（Axion） | c4a-standard-32 |  32  |   128   |  3,000（最低）  |    7500    |          1.773          |

此存储规格源自 GCP Hyperdisk Balanced 规格。

以上信息来自 [https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/](https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/) 和 [https://cloud.google.com/compute/disks-image-pricing](https://cloud.google.com/compute/disks-image-pricing)，Google 可能会对其进行修改。

## 存储要求<a id="storage-requirements"></a>

假设平均 TPS 为 100，平均事务大小为 300 字节，区块延迟为 1 秒，则预计每天的存储需求约为 2.5 GB/天（=300x100x86400）。

## 操作系统<a id="operating-system"></a>

建议环境与 RHEL（7.8 或更高版本）兼容。
Kaia 二进制文件已在亚马逊 Linux 2 上进行了全面测试，但也可在其他基于 Linux 的环境中运行。还提供了用于开发的 macOS 二进制文件。
