# 系統要求

## 硬件/軟件規格<a id="h-w-specification"></a>

網絡性能是根據網絡內最差的硬件規格來衡量的。根據區塊鏈網絡結構，它只能縱向擴展（增加硬件容量）。因此，建議網絡內的所有節點至少都應擁有規格相似的最佳硬件。

如果你想了解這一硬件規格的原理，medium 上的文章[為 Kaia 節點操作員確定最佳硬件規格](https://klaytn.foundation/node-operator-optimal-specs/) 會幫助你理解。

以下各節列出針對 CN 的建議規格。

### 裸機服務器<a id="bare-metal-server"></a>

#### 一般要求（所有節點類型）

| 類別  | 規格                                                                                                                      |
| :-- | :---------------------------------------------------------------------------------------------------------------------- |
| CPU | Intel® 第五代 Xeon® 可擴展處理器（「Emerald Rapids」）或更新版本（例如：Xeon® Platinum 85xx/86xx 系列）；AMD EPYC™ 9004 系列（「Genoa」）或更新版本，且具備相當的效能 |
| 存儲  | ≥ 3 TB SSD（請根據區塊鏈資料大小進行調整；如需指引，請諮詢 Kaia 團隊）                                                                             |

任何具備類似硬體配置的實體機器，皆足以運行 CN。

#### 依節點類型建議的規格

| Node Type | 核心/線程          | 內存      |
| :-------- | :------------- | :------ |
| CN        | 12 核心 / 24 執行緒 | ≥ 64 GB |

### 雲虛擬機<a id="cloud-vm"></a>

#### AWS 建議規格<a id="recommended-specification-for-aws"></a>

| Node Type |       建築       |            Model            | vCPU | 內存（GiB） |    存儲大小   | 存儲速度（IOPS） | 價格 \(新加坡地區，美元／小時\) |
| :-------: | :------------: | :-------------------------: | :--: | :-----: | :-------: | :--------: | :-------------------------------------: |
|     CN    |   x86（Intel）   | m8i.8xlarge |  32  |   128   | 3,000（最低） |    9,000   |          2.117          |
|     CN    | Arm（Graviton4） | m8g.8xlarge |  32  |   128   | 3,000（最低） |    9,000   |          1.795          |

此存儲規範源自 AWS EBS SSD (gp3) 規範。

以上信息來自 [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) 和 [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)，可能會被 AWS 更改。

#### 建議的 "Azure "規範<a id="recommended-specification-for-azure"></a>

| 節點類型 |        建築       |   Model  | vCPU | 內存（GiB） | 存儲類型 （GiB\） | 存儲速度（IOPS） | 價格 \(東南亞地區，美元／小時\) |
| :--: | :-------------: | :------: | :--: | :-----: | :---------: | :--------: | :-------------------------------------: |
|  CN  |    x86（Intel）   |  D32s v6 |  32  |   128   |  3,000（最低）  |    7500    |          2.016          |
|  CN  | Arm（Cobalt 100） | D32ps v6 |  32  |   128   |  3,000（最低）  |    7500    |          1.398          |

此儲存規格源自 Azure Premium SSD v2 規格。

以上信息來自 [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) 和 [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing)，微軟可能會對其進行修改。

#### 建議的 GCP 規範<a id="recommended-specification-for-gcp"></a>

| 節點類型 |     建築     |        模型       | vCPU | 內存（GiB） | 存儲類型 （GiB\） | 存儲速度（IOPS） | 價格 \(新加坡地區，美元／小時\) |
| :--: | :--------: | :-------------: | :--: | :-----: | :---------: | :--------: | :-------------------------------------: |
|  CN  | x86（Intel） |  c4-standard-24 |  24  |    90   |  3,000（最低）  |    7500    |          1.463          |
|  CN  | Arm（Axion） | c4a-standard-32 |  32  |   128   |  3,000（最低）  |    7500    |          1.773          |

此儲存規格源自 GCP Hyperdisk Balanced 規格。

上述資訊來自 [https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/](https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/) 及 [https://cloud.google.com/compute/disks-image-pricing](https://cloud.google.com/compute/disks-image-pricing)，Google 可能會對其進行變更。

## 存儲要求<a id="storage-requirements"></a>

假設平均 TPS 為 100，平均事務大小為 300 字節，區塊延遲為 1 秒，則預計每天的存儲需求約為 2.5 GB/天（=300x100x86400）。

## 操作系統<a id="operating-system"></a>

建議環境與 RHEL（7.8 或更高版本）兼容。
Kaia 二進制文件已在亞馬遜 Linux 2 上進行了全面測試，但也可在其他基於 Linux 的環境中運行。還提供了用於開發的 macOS 二進制文件。
