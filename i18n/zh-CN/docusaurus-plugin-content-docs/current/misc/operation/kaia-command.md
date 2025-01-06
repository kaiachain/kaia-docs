# 常用命令

## 如何找到 Kaia 目录（通常为 "Kaia DIR）

---

您可以在 `kcn` 或 `kpn` 配置中查看 Kaia 目录。 配置文件位于 `/etc/kcnd/conf` 或 `/etc/kpnd/conf` 下。

```bash
cat /etc/kcnd/conf/kcnd.conf (or /etc/kpnd/conf/kpnd.conf)

# Find DATA_DIR and LOG_DIR path as below example
DATA_DIR=/var/kcnd/data/
LOG_DIR=/var/kcnd/logs/
```

## 如何连接到 Kaia 控制台

---

连接到 Kaia API，检查节点和网络状态。

```bash
# 使用 Kaia DATA_DIR 路径执行下面的命令
$ sudo kcn attach --datadir<DATA_DIR>
> 
```

## 实用的应用程序接口

```bash
# Check current block Number
  > kaia.blockNumber

# Check my kni address
  > admin.nodeInfo

# Check my dode address
  > governance.nodeAddress

# Check other connected nodes
  > admin.peers

# Add or remove nodes
  > admin.addPeer("kni")
  > admin.removePeer("kni")
```

## 如何仅获取 API 结果

```jsx
# 使用 Kaia DATA_DIR 路径执行下面的命令
$ sudo kcn attach --exec<statement> --datadir<DATA_DIR>

例如
# 检查我的节点地址
$ sudo kcn attach --exec "governance.nodeAddress" --datadir /path/to/datadir
"0xda23978e6e354fbf25dd87aaf1d1bb4ed112753f"
```
