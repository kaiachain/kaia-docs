# Frequently Used Commands

## How to find the Kaia Directory (Normally “Kaia DIR”)

---
You can check Kaia directory at `kcn` or `kpn` config. Config file is located under `/etc/kcnd/conf` or `/etc/kpnd/conf`.

```bash
cat /etc/kcnd/conf/kcnd.conf (or /etc/kpnd/conf/kpnd.conf)

# Find DATA_DIR and LOG_DIR path as below example
DATA_DIR=/var/kcnd/data/
LOG_DIR=/var/kcnd/logs/
```

## How to connect to Kaia Console

---
Connect to Kaia API to check node and network status.

```bash
# execute the command below with the Kaia DATA_DIR Path
$ sudo kcn attach --datadir <DATA_DIR>
> 
```

## Useful APIs

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

## How to get the API Result only

```jsx
# execute the command below with the Kaia DATA_DIR Path
$ sudo kcn attach --exec <statement> --datadir <DATA_DIR>

e.g.
# Check my dode address
$ sudo kcn attach --exec "governance.nodeAddress" --datadir /path/to/datadir
"0xda23978e6e354fbf25dd87aaf1d1bb4ed112753f"
```
