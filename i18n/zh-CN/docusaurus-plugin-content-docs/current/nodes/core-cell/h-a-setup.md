# 配置高可用性

配置 CN 以实现高可用性是有效运行核心单元的关键。 推荐的高可用性方案取决于核心单元是部署在物理基础设施还是云基础设施上。

## 主动-备用（建议用于裸机）<a id="active-standby-recommended-for-bare-metal"></a>

在此配置中，两个 CN 节点采用主动-备用配置。 正常运行时，活动节点参与区块生成，而备用节点仅同步来自网络的链数据。 这种配置可确保在活动节点发生故障时，备用 CN 节点拥有链数据的新副本。

### 设置<a id="setup"></a>

1. 创建活动 CN 的`nodekey`备份。
2. 安装备用 CN。 除此以外，配置与活动 CN 相同：
   - 备用机应使用不同的 \`nodekey
   - 将 PN 地址添加到 `$DATA_DIR/static-nodes.json` 中

### 故障切换<a id="failover"></a>

1. 停止备用 CN：\`sudo systemctl stop kcnd
2. 用发生故障的活动 CN 的 "节点密钥 "替换备用 CN 的 "节点密钥"。
3. 将活动 CN 的 IP 地址重新分配给备用 CN。
4. 启动备用 CN 并验证其是否与网络同步：sudo systemctl start kcnd

## 机器图像和快照（推荐用于云计算）<a id="machine-image-snapshot-recommended-for-cloud"></a>

云基础设施允许运营商更快地替换故障节点，因此没有必要运行第二个备用 CN。 相反，只需确保新的 CN 可以快速配置，并提供链数据的最新副本即可。

不同云环境的具体术语和程序可能有所不同。 以下程序基于 AWS（特别是 EC2 和 EBS），但也可适用于其他云平台。

### 设置<a id="setup"></a>

1. 创建活动 CN 的`nodekey`备份。
2. 每次更新 CN 配置或软件时，创建一个机器映像（例如 AMI/）。 请勿将包含 `DATA_DIR` 的卷包含在此映像中 -- 这将单独获取。

### 故障切换<a id="failover"></a>

使用 CC 的任何 PN 节点获取链数据快照：

1. 连接到任何 PN 节点并停止 kpnd：`sudo systemctl stop kpnd`。 必须先停止 kpnd，以确保数据的一致性。
2. 使用 AWS 控制台，创建包含 PN`DATA_DIR` 的卷的快照。
3. 启动 kpnd启动 kpnd

使用基本 CN 映像和 chaindata 映像创建新的 CN：

1. 使用 CN 映像（在上面的 "设置 "中创建）创建一个实例。
2. 附加根据 PN 的快照创建的卷`$DATA_DIR`。
3. 删除卷中除 `$DATA_DIR/klay/chaindata` 以外的所有文件。 确认 `kcnd.conf` 中设置的 `DATA_DIR` 与包含链数据的目录一致。 如果目录名称不同，可能需要重新命名。
4. 将故障 CN 的 `nodekey` 复制到 `$DATA_DIR/klay/nodekey`。
5. 将故障 CN 的 IP 地址重新分配给替换 CN。
6. 启动 kcnd启动 kcnd
7. 验证 CN 是否与网络同步。

## 其他考虑因素<a id="additional-considerations"></a>

将故障 CN 的公共 IP 重新分配给替换 CN，可使替换 CN 立即连接到其他 CN。 如果 IP 变更，在所有其他 CCO 更新其防火墙配置之前，新的 CN 将无法连接到网络。

