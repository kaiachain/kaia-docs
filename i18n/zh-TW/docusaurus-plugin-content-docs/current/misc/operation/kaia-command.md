# 常用命令

## 如何找到 Kaia 目錄（通常為 "Kaia DIR）

---

您可以在 `kcn` 或 `kpn` 配置中查看 Kaia 目錄。 配置文件位於 `/etc/kcnd/conf` 或 `/etc/kpnd/conf` 下。

```bash
cat /etc/kcnd/conf/kcnd.conf (or /etc/kpnd/conf/kpnd.conf)

# Find DATA_DIR and LOG_DIR path as below example
DATA_DIR=/var/kcnd/data/
LOG_DIR=/var/kcnd/logs/
```

## 如何連接到 Kaia 控制檯

---

連接到 Kaia API，檢查節點和網絡狀態。

```bash
# 使用 Kaia DATA_DIR 路徑執行下面的命令
$ sudo kcn attach --datadir<DATA_DIR>
> 
```

## 實用的應用程序接口

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

## 如何僅獲取 API 結果

```jsx
# 使用 Kaia DATA_DIR 路徑執行下面的命令
$ sudo kcn attach --exec<statement> --datadir<DATA_DIR>

例如
# 檢查我的節點地址
$ sudo kcn attach --exec "governance.nodeAddress" --datadir /path/to/datadir
"0xda23978e6e354fbf25dd87aaf1d1bb4ed112753f"
```
