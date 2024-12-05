---
description: |-
  description: >-
    API được sử dụng để kiểm tra và gỡ lỗi trạng thái nút và dữ liệu chuỗi khối trong thời gian chạy.
---

# debug

Không gian tên `debug` cung cấp cho bạn quyền truy cập vào một số phương pháp RPC phi tiêu chuẩn, cho phép bạn kiểm tra, gỡ lỗi và đặt các cờ gỡ lỗi nhất định trong thời gian chạy.

**NOTE** Some debug namespace APIs are unsafe/unappropriate to be opened to public.
We recommend you to provide the debug namespace APIs to authorized users only.
However, if you want to maintain a public EN and provide debug namespace APIs to the public, we strongly recommend you to set the `rpc.unsafe-debug.disable` flag which will disable APIs that are unsafe/unappropriate to be opened to the public and enable only a subset of the debug namespace APIs.
we strongly recommend you to set the `rpc.unsafe-debug.disable` flag which will disable APIs
that are unsafe/unappropriate to be opened to the public and enable only a subset of the debug namespace APIs.
The enabled APIs are as follows:

- [VM Tracing](./tracing.md) APIs, however with limited functionality (only [pre-defined tracers](./tracing.md#tracing-options) are allowed)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

## [Ghi bản ghi](./logging.md) <a id="logging"></a>

- [debug_backtraceAt](./logging.md#debug_backtraceat)
- [debug_setVMLogTarget](./logging.md#debug_setvmlogtarget)
- [debug_verbosity](./logging.md#debug_verbosity)
- [debug_verbosityByName](./logging.md#debug_verbositybyname)
- [debug_verbosityByID](./logging.md#debug_verbositybyid)
- [debug_vmodule](./logging.md#debug_vmodule)

## [Tạo hồ sơ](./profile.md) <a id="profiling"></a>

- [debug_blockProfile](./profile.md#debug_blockprofile)
- [debug_cpuProfile](./profile.md#debug_cpuprofile)
- [debug_mutexProfile](./profile.md#debug_mutexprofile)
- [debug_isPProfRunning](./profile.md#debug_ispprofrunning)
- [debug_setBlockProfileRate](./profile.md#debug_setblockprofilerate)
- [debug_startCPUProfile](./profile.md#debug_startcpuprofile)
- [debug_stopCPUProfile](./profile.md#debug_stopcpuprofile)
- [debug_startPProf](./profile.md#debug_startpprof)
- [debug_stopPProf](./profile.md#debug_stoppprof)
- [debug_writeBlockProfile](./profile.md#debug_writeblockprofile)
- [debug_writeMemProfile](./profile.md#debug_writememprofile)
- [debug_writeMutexProfile](./profile.md#debug_writemutexprofile)

## [Theo dõi thời gian chạy](./go_trace.md) <a id="runtime-tracing"></a>

- [debug_goTrace](./go_trace.md#debug_gotrace)
- [debug_startGoTrace](./go_trace.md#debug_startgotrace)
- [debug_stopGoTrace](./go_trace.md#debug_stopgotrace)

## [Gỡ lỗi thời gian chạy](./runtime.md) <a id="runtime-debugging"></a>

- [debug_freeOSMemory](./runtime.md#debug_freeosmemory)
- [debug_gcStats](./runtime.md#debug_gcstats)
- [debug_memStats](./runtime.md#debug_memstats)
- [debug_metrics](./runtime.md#debug_metrics)
- [debug_setGCPercent](./runtime.md#debug_setgcpercent)
- [debug_stacks](./runtime.md#debug_stacks)

## [Theo dõi VM](./tracing.md) <a id="vm-tracing"></a>

- [debug_traceBadBlock](./tracing.md#debug_tracebadblock)
- [debug_traceBlock](./tracing.md#debug_traceblock)
- [debug_traceBlockByHash](./tracing.md#debug_traceblockbyhash)
- [debug_traceBlockByNumber](./tracing.md#debug_traceblockbynumber)
- [debug_traceBlockByNumberRange](./tracing.md#debug_traceblockbynumberrange)
- [debug_traceBlockFromFile](./tracing.md#debug_traceblockfromfile)
- [debug_traceTransaction](./tracing.md#debug_tracetransaction)
- [debug_traceCall](./tracing.md#debug_tracecall)
- [debug_traceChain](./tracing.md#debug_tracechain)
- [Tracing Options](./tracing.md#tracing-options)
- [JavaScript-based Tracing](./tracing.md#javascript-based-tracing)

## [Theo dõi tiêu chuẩn VM](./standard_tracing.md) <a id="vm-standard-tracing"></a>

- [debug_standardTraceBadBlockToFile](./standard_tracing.md#debug_standardtracebadblocktofile)
- [debug_standardTraceBlockToFile](./standard_tracing.md#debug_standardtraceblocktofile)
- [Standard Tracing Options](./standard_tracing.md#standard-tracing-options)

## [Kiểm soát chuỗi khối](./blockchain.md) <a id="blockchain-inspection"></a>

- [debug_dumpBlock](./blockchain.md#debug_dumpblock)
- [debug_dumpStateTrie](./blockchain.md#debug_dumpstatetrie)
- [debug_getBlockRlp](./blockchain.md#debug_getblockrlp)
- [debug_getModifiedAccountsByHash](./blockchain.md#debug_getmodifiedaccountsbyhash)
- [debug_getModifiedAccountsByNumber](./blockchain.md#debug_getmodifiedaccountsbynumber)
- [debug_getBadBlocks](./blockchain.md#debug_getbadblocks)
- [debug_preimage](./blockchain.md#debug_preimage)
- [debug_printBlock](./blockchain.md#debug_printblock)
- [debug_setHead](./blockchain.md#debug_sethead)
- [debug_seedHash](./blockchain.md#debug_seedhash)
- [debug_startWarmUp](./blockchain.md#debug_startwarmup)
- [debug_startContractWarmUp](./blockchain.md#debug_startcontractwarmup)
- [debug_stopWarmUp](./blockchain.md#debug_stopwarmup)
- [debug_startCollectingTrieStats](./blockchain.md#debug_startCollectingTrieStats)
