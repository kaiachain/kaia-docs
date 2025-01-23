# よく使うコマンド

## カイヤディレクトリ（通常「カイヤDIR」）の見つけ方

---

`kcn`または`kpn`のコンフィグでKaiaディレクトリを確認できる。 設定ファイルは `/etc/kcnd/conf` または `/etc/kpnd/conf` にある。

```bash
cat /etc/kcnd/conf/kcnd.conf (or /etc/kpnd/conf/kpnd.conf)

# Find DATA_DIR and LOG_DIR path as below example
DATA_DIR=/var/kcnd/data/
LOG_DIR=/var/kcnd/logs/
```

## カイア・コンソールへの接続方法

---

Kaia APIに接続し、ノードとネットワークの状態を確認します。

```bash
# 以下のコマンドをカイアのDATA_DIRパスで実行する
$ sudo kcn attach --datadir<DATA_DIR>
>. 
```

## 便利なAPI

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

## API結果のみを取得する方法

```jsx
# 下記のコマンドをカイアのDATA_DIRパスで実行
$ sudo kcn attach --exec<statement> --datadir<DATA_DIR>

例:
# 私のノードアドレスの確認
$ sudo kcn attach --exec "governance.nodeAddress" --datadir /path/to/datadir
"0xda23978e6e354fbf25dd87aaf1d1bb4ed112753f"
```
