# 系统要求

与以太坊或其他区块链相比，运行端点节点（EN）需要更高的硬件规格，因为 EN 必须验证由配备企业级硬件的成熟共识节点生成的区块。

对于 EN，建议采用以下规格。

## 硬件/软件规格<a id="h-w-specification"></a>

### 云虚拟机<a id="cloud-vm"></a>

#### 建议规格<a id="recommended-specification-based-on-aws"></a>

| vCPU | 内存（GB） | 存储（GiB） | 磁盘带宽（兆比特/秒） | 网络带宽（吉比特/秒） |
| :--- | :----- | :------ | :---------- | :---------- |
| 8    | 64     | > 4,000 | 3,500       | 最多 10       |

### 裸机<a id="bare-metal-machine"></a>

我们没有指定 EN 的具体物理机规格，但任何具有与云虚拟机部分类似硬件配置的物理机都足以运行 EN。

## 存储要求<a id="storage-requirements"></a>

假设平均 TPS 为 100，平均事务大小为 300 字节，区块延迟为 1 秒，则 EN 的预计日存储需求为 2.5 GB/天（=300x100x86400）。

## 操作系统<a id="operating-system"></a>

建议使用 [Amazon Linux 2](https://aws.amazon.com/ko/about-aws/whats-new/2017/12/introducing-amazon-linux-2/)。
Kaia 二进制文件已在亚马逊 Linux 2 上进行了全面测试，但也可在其他基于 Linux 的环境中运行。
还提供了用于开发的 macOS 二进制文件。

