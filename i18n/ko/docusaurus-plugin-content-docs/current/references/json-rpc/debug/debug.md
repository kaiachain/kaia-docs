---
description: 런타임에 노드 상태와 블록체인 데이터를 검사하고 디버깅하는 데 사용되는 API입니다.
---

# debug

네임스페이스 `debug`는 런타임에 특정 디버깅 플래그를 검사, 디버깅 및 설정할 수 있는 몇 가지 비표준 RPC 메서드에 대한 액세스를 제공합니다.

**참고** 일부 디버그 네임스페이스 API는 일반에 공개하기에 안전하지 않거나 부적절합니다.
디버그 네임스페이스 API는 권한이 있는 사용자에게만 제공하는 것이 좋습니다.
그러나 공개 EN을 유지하면서 디버그 네임스페이스 API를 일반에 제공하려는 경우
안전하지 않거나 부적절한 API를 비활성화하도록 `rpc.unsafe-debug.disable` 플래그를 설정하고 디버그 네임스페이스 API의 하위 집합만 활성화하도록 설정하는 것이 좋습니다.
활성화된 API는 다음과 같습니다:

- [VM 추적](./tracing.md) API(기능이 제한됨)(단, [사전 정의된 tracer](./tracing.md#tracing-options)만 허용됨)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

## [로깅](./logging.md) <a id="logging"></a>

- [debug_backtraceAt](./logging.md#debug_backtraceat)
- [debug_setVMLogTarget](./logging.md#debug_setvmlogtarget)
- [debug_verbosity](./logging.md#debug_verbosity)
- [debug_verbosityByName](./logging.md#debug_verbositybyname)
- [debug_verbosityByID](./logging.md#debug_verbositybyid)
- [debug_vmodule](./logging.md#debug_vmodule)

## [프로파일링](./profile.md) <a id="profiling"></a>

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

## [런타임 추적](./go_trace.md) <a id="runtime-tracing"></a>

- [debug_goTrace](./go_trace.md#debug_gotrace)
- [debug_startGoTrace](./go_trace.md#debug_startgotrace)
- [debug_stopGoTrace](./go_trace.md#debug_stopgotrace)

## [런타임 디버깅](./runtime.md) <a id="runtime-debugging"></a>

- [debug_freeOSMemory](./runtime.md#debug_freeosmemory)
- [debug_gcStats](./runtime.md#debug_gcstats)
- [debug_memStats](./runtime.md#debug_memstats)
- [debug_metrics](./runtime.md#debug_metrics)
- [debug_setGCPercent](./runtime.md#debug_setgcpercent)
- [debug_stacks](./runtime.md#debug_stacks)

## [VM 추적](./tracing.md) <a id="vm-tracing"></a>

- [debug_traceBadBlock](./tracing.md#debug_tracebadblock)
- [debug_traceBlock](./tracing.md#debug_traceblock)
- [debug_traceBlockByHash](./tracing.md#debug_traceblockbyhash)
- [debug_traceBlockByNumber](./tracing.md#debug_traceblockbynumber)
- [debug_traceBlockByNumberRange](./tracing.md#debug_traceblockbynumberrange)
- [debug_traceBlockFromFile](./tracing.md#debug_traceblockfromfile)
- [debug_traceTransaction](./tracing.md#debug_tracetransaction)
- [debug_traceCall](./tracing.md#debug_tracecall)
- [debug_traceChain](./tracing.md#debug_tracechain)
- [추적 옵션](./tracing.md#tracing-options)
- [JavaScript 기반 추적](./tracing.md#javascript-based-tracing)

## [VM 표준 추적](./standard_tracing.md) <a id="vm-standard-tracing"></a>

- [debug_standardTraceBadBlockToFile](./standard_tracing.md#debug_standardtracebadblocktofile)
- [debug_standardTraceBlockToFile](./standard_tracing.md#debug_standardtraceblocktofile)
- [표준 추적 옵션](./standard_tracing.md#standard-tracing-options)

## [블록체인 검사](./blockchain.md) <a id="blockchain-inspection"></a>

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
