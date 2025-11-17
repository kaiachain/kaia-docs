# Optimize Node Storage

[Kaia v2.1.0](https://github.com/kaiachain/kaia/releases/tag/v2.1.0) introduces two complementary storage optimization features that can significantly reduce disk space requirements:

- **Database Compression**: Reduces storage by compressing repetitive block data
- **FlatTrie State Scheme**: Experimental feature that drastically reduces archive node state database size

This guide explains how to apply these optimizations to your Kaia node.

## Database Compression

Database compression uses LevelDB's built-in Snappy compression to reduce the size of block headers, transaction bodies, and receipts—which often contain repetitive data like zero-padding in ABI-encoded transactions.

**Expected savings:**
- Full nodes: ~2TB reduction (from ~4.2TB to ~2TB on Mainnet)

### Prerequisites

- Kaia v2.1.0 or higher
- For manual compaction: sufficient free disk space and ability to accept sustained disk I/O (see **Resource Impact** section below)

### Enable Compression for New Installations

Starting from v2.1.0, compression is enabled by default. Simply start your node:

**Package installation:**
```bash
# Configure network in kend.conf
sudo vi /etc/kend/conf/kend.conf
# Set: NETWORK=mainnet or NETWORK=kairos

# Start node (compression enabled by default in v2.1.0+)
kend start

# Verify
kend status
tail -f /var/kend/logs/kend.out
```

All newly written data will be automatically compressed.

### Enable Compression for Existing Nodes

If you're upgrading from a version prior to v2.1.0:

**Step 1: Check your version**

```bash
ken version
```

**Step 2: For v2.1.0 and later**

Compression is already enabled by default. New data compresses automatically. Skip to Step 4 to compress existing data.

**Step 3: For versions before v2.1.0 only**

Add the compression flag to your configuration:

**Package installation:**
```bash
sudo vi /etc/kend/conf/kend.conf
# Add to ADDITIONAL variable:
ADDITIONAL="--db.leveldb.compression 2"
```

The compression flag values are:
- `0`: No compression
- `1`: Compress receipts only
- `2`: Compress headers, bodies, and receipts (recommended)
- `3`: Compress all tables including state trie (not recommended)

:::note

Option 2 is recommended because state trie data doesn't compress well (appears random), so option 3 provides minimal additional benefit.

:::

Then restart:
```bash
kend stop
kend start
```

**Step 4: Compress existing data (optional but recommended)**

Trigger database compaction via RPC. Attach to your node console:

```bash
ken attach --datadir /var/kend/data
```

In the console, trigger compaction using the "allbutstate" preset:

```javascript
> debug.chaindbCompact({ "preset": "allbutstate" })
null
```

**Available presets:**

- `"default"`: Full-range compaction of all database components
- `"allbutstate"`: Selective compaction excluding state trie (recommended for compression)
- `"custom"`: Define custom ranges for specific database tables

The compaction runs in the background. Monitor progress in your node logs:

```bash
tail -f /var/kend/logs/kend.out | grep -i Compact
```

You should see log entries like:
```
INFO[07/25,12:50:17 Z] [3] Compacting database started               range=0x48-0x49
INFO[07/25,12:55:17 Z] [3] Compacting database completed             range=0x48-0x49 elapsed=5m0.085s
```

The node will continue processing blocks during compaction.

**Expected duration:** Approximately 10 hours for a Mainnet full node (on SSD with ~4TB data). Duration varies based on hardware and data size.

**Resource impact:**
- High disk I/O (peaks >400 MiB/s read, >300 MiB/s write)
- High disk IOPS (often >2000 operations/sec)
- Node remains operational and continues syncing blocks

:::note

While the node remains operational during compaction, query performance may be impacted during peak I/O periods. For production RPC nodes, schedule compaction during maintenance windows or low-traffic periods.

:::

### Use Pre-Compressed Chaindata Snapshots (TBD)

Pre-compressed chaindata snapshots are planned for future releases but are not yet available. When available, they will be listed on the [Chaindata Snapshot page](https://docs.kaia.io/misc/operation/chaindata-snapshot/).

Currently, you must either:
- Enable compression on a new v2.1.0+ installation (automatic for new data)
- Run manual compaction on existing nodes (see above)

Check the snapshot page periodically for updates on compressed snapshot availability.

### Verify Compression is Active

Check your node startup logs for compression configuration:

```bash
grep "compressionType" /var/kend/logs/kend.out
```

Look for log entries showing `compressionType=snappy` for non-state-trie tables.

### Monitoring and Troubleshooting

**Check disk usage reduction:**

```bash
du -h --max-depth=1 /var/kend/data/klay/chaindata
```

Compare before and after compaction. You should see significant storage reductions in the directories containing block bodies and receipts.

**Common issues:**

1. **Compaction fails**: Ensure sufficient disk space. Compaction temporarily requires additional space for rewriting data.
2. **FlatTrie won't start**: FlatTrie requires an empty database. If you see errors about existing data, delete the chaindata directory and sync from genesis.
3. **Merkle proof API errors**: FlatTrie does not support `eth_getProof`. Use a traditional node if this API is required.

## FlatTrie State Scheme (Experimental)

FlatTrie is an experimental state storage scheme adapted from the Erigon Ethereum client. It stores account states in a flat structure and maintains only the latest block's complete Merkle Patricia Trie (MPT), reconstructing historical tries on-demand.

**Expected savings:**
- Total storage: ~75% reduction (projected from Kairos testnet results)
- Kairos testnet: 4.3TB → 1TB
- Mainnet: ~35TB → ~10TB (estimated based on proportional reduction)

:::warning

FlatTrie is an experimental feature in v2.1.0. It is not recommended for production use. Expect potential stability issues, performance bottlenecks, and breaking changes in future releases. Use only for testing and development environments.

:::

### Prerequisites

- Kaia v2.1.0 or higher
- **Must sync from genesis** (cannot convert existing database)
- Empty data directory

### Current Limitations

Before enabling FlatTrie, understand these restrictions:

**Unsupported features:**

- Batch pruning and live pruning
- Block rewinding (`--start-block-number` flag and `debug_setHead` API)
- Merkle proof generation (`eth_getProof` API)

**Incompatibilities:**

- Cannot migrate from existing database (must start from genesis)
- Cannot switch between FlatTrie and non-FlatTrie modes
- Databases with and without FlatTrie are incompatible

### Enable FlatTrie

**Step 1: Prepare empty data directory**

```bash
# Ensure clean data directory
sudo rm -rf /var/kend/data
sudo mkdir -p /var/kend/data
```

**Step 2: Start node with FlatTrie flag and sync from genesis**

```bash
# Mainnet
ken --state.experimental-flat-trie

# Kairos testnet
ken --state.experimental-flat-trie --kairos
```

:::note

When FlatTrie is enabled, archive mode is automatically activated regardless of `--gcmode` and `--state.block-interval` flags. These flags are ignored when using FlatTrie.

:::

**Step 3: Wait for full sync**

The node will sync all blocks from genesis. This may take several weeks depending on your hardware and network.

### Verify FlatTrie is Active

Check your node startup logs to confirm FlatTrie mode:

```bash
grep -i "flat" /var/kend/logs/kend.out | head -20
```

You should see indications that experimental flat trie is active.

### Monitor FlatTrie Performance

FlatTrie uses different resource profiles compared to traditional state storage:

**Expected characteristics:**
- Lower CPU usage
- Higher memory usage (~30GB)
- Higher goroutine count (~900-1000)
- Slower block finalization time

Monitor these metrics via your node's Prometheus metrics endpoint or Grafana dashboard.

### Troubleshooting FlatTrie

**Cannot start FlatTrie on existing database:**
If you see errors indicating FlatTrie cannot be enabled on non-empty data, you must start from genesis. Delete your chaindata directory and perform a full sync with the `--state.experimental-flat-trie` flag.

**Merkle proof API failures:**
FlatTrie does not support `eth_getProof` and related Merkle proof APIs. If your application requires these APIs, use a traditional node instead.

**High memory usage:**
Memory usage around 30GB is expected for FlatTrie nodes during sync. Ensure your system has sufficient RAM. The team is working on optimizations to reduce this in future versions.

**Slow sync speed:**
Initial sync with FlatTrie is comparable to traditional nodes. If sync is significantly slower, check:

- Disk I/O performance (SSD strongly recommended)
- Network bandwidth
- CPU utilization

## Best Practices

1. **Always backup before major changes**: Especially before running manual compaction.
2. **Monitor disk space**: Ensure you have sufficient free space before compaction. Compaction temporarily requires additional space for rewriting database files.
3. **Schedule compaction during low-traffic periods**: If running public RPC endpoints.
4. **Use SSD for production nodes**: Both compression and FlatTrie benefit from fast random I/O.
5. **Plan for experimental features**: FlatTrie is experimental in v2.1.x. Test thoroughly before production use.
6. **Stay updated**: Check release notes for future optimizations and when FlatTrie graduates from experimental status.