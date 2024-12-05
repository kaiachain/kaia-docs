# 런타임 디버깅

**참고** 다른 모든 디버그 네임스페이스 API **제외** 다음 API는 `rpc.unsafe-debug.disable` 플래그로 제한됩니다:

- [VM 추적](./tracing.md) API(기능이 제한됨)(단, [사전 정의된 tracer](./tracing.md#tracing-options)만 허용됨)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

## debug_freeOSMemory <a id="debug_freeosmemory"></a>

사용하지 않는 메모리를 OS에 반환합니다.

| 클라이언트 | 메서드 호출                             |
| :---: | ---------------------------------- |
|   콘솔  | `debug.freeOSMemory()`             |
|  RPC  | `{"method": "debug_freeOSMemory"}` |

**매개변수**

없음

**리턴 값**

없음

**예시**

콘솔

```javascript
> debug.freeOSMemory()
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_freeOSMemory","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_gcStats <a id="debug_gcstats"></a>

GC 통계를 반환합니다.

| 클라이언트 | 메서드 호출                                      |
| :---: | ------------------------------------------- |
|   콘솔  | `debug.gcStats()`                           |
|  RPC  | `{"method": "debug_gcStats", "params": []}` |

**매개변수**

없음

**리턴 값**

반환된 객체의 필드에 대한 자세한 내용은 [https://golang.org/pkg/runtime/debug/#GCStats](https://golang.org/pkg/runtime/debug/#GCStats)
에서 반환된 객체의 필드에 대한 정보를 확인하세요.

**예시**

콘솔

```javascript
> debug.gcStats()
{
  LastGC: "2018-10-08T14:27:34.030659164Z",
  NumGC: 40,
  Pause: [4582691, 2863122, 1578188, 459447, 197699, 1688008, 678298, 117924, 6871625, 298523, 1281135, 616022, 2513029, 265029, 704801, 685752, 383625, 677657, 1135878, 1730593, 603201, 2667691, 1901266, 1035406, 1624233, 1112526, 397637, 158158, 596931, 2675197, 4421722, 745039, 847417, 4423680, 653433, 281915, 605418, 8127664, 138283, 1810200],
  PauseEnd: ["2018-10-08T14:27:34.030659164Z", "2018-10-08T14:25:34.032422737Z", "2018-10-08T14:23:34.015065773Z", "2018-10-08T14:21:34.031893519Z", "2018-10-08T14:19:33.791324489Z", "2018-10-08T14:19:01.028883257Z", "2018-10-08T14:17:01.054270356Z", "2018-10-08T14:15:01.032846304Z", "2018-10-08T14:13:01.07313761Z", "2018-10-08T14:11:01.042653342Z", "2018-10-08T14:09:01.034458873Z", "2018-10-08T14:07:01.022701083Z", "2018-10-08T14:05:01.046456415Z", "2018-10-08T14:03:01.030075376Z", "2018-10-08T14:01:01.027838941Z", "2018-10-08T13:59:01.033363592Z", "2018-10-08T13:57:01.032853252Z", "2018-10-08T13:55:01.06825876Z", "2018-10-08T13:53:01.071426346Z", "2018-10-08T13:51:01.099618831Z", "2018-10-08T13:49:01.016314071Z", "2018-10-08T13:47:01.031721975Z", "2018-10-08T13:45:01.029069094Z", "2018-10-08T13:43:01.026156953Z", "2018-10-08T13:41:01.019240344Z", "2018-10-08T13:39:01.026699743Z", "2018-10-08T13:37:01.02642045Z", "2018-10-08T13:35:00.997556262Z", "2018-10-08T13:33:01.023605742Z", "2018-10-08T13:31:01.025436347Z", "2018-10-08T13:29:01.024808072Z", "2018-10-08T13:27:01.01508169Z", "2018-10-08T13:25:01.023461518Z", "2018-10-08T13:23:01.0144789Z", "2018-10-08T13:21:01.022121597Z", "2018-10-08T13:19:30.748905748Z", "2018-10-08T13:19:29.588457028Z", "2018-10-08T13:19:29.461820065Z", "2018-10-08T13:19:29.436792038Z", "2018-10-08T13:19:29.408990947Z"],
  PauseQuantiles: null,
  PauseTotal: 64156063
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_gcStats","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":{"LastGC":"2018-10-15T00:42:08.2787037Z","NumGC":14,"PauseTotal":292805500,"Pause":[3384700,60164200,259500,354600,62331200,241700,29701500,4868200,8242800,35177700,27621100,12647400,38250100,9560800],"PauseEnd":["2018-10-15T00:42:08.2787037Z","2018-10-15T00:40:19.3302813Z","2018-10-15T00:38:41.2202755Z","2018-10-15T00:36:41.2785669Z","2018-10-15T00:36:18.3196569Z","2018-10-15T00:34:48.2073609Z","2018-10-15T00:33:01.3309817Z","2018-10-15T00:31:28.3465898Z","2018-10-15T00:30:05.4245261Z","2018-10-15T00:28:58.6377593Z","2018-10-15T00:27:55.315809Z","2018-10-15T00:27:45.075085Z","2018-10-15T00:27:44.9164574Z","2018-10-15T00:27:44.8406572Z"],"PauseQuantiles":null}}
```

## debug_memStats <a id="debug_memstats"></a>

자세한 런타임 메모리 통계를 반환합니다.

| 클라이언트 | 메서드 호출                                       |
| :---: | -------------------------------------------- |
|   콘솔  | `debug.memStats()`                           |
|  RPC  | `{"method": "debug_memStats", "params": []}` |

**매개변수**

없음

**리턴 값**

반환된 객체의 필드에 대한 자세한 내용은 [https://golang.org/pkg/runtime/#MemStats](https://golang.org/pkg/runtime/#MemStats)
에서 반환된 객체의 필드에 대한 정보를 확인하세요.

**예시**

콘솔

```javascript
> debug.memStats()
{
  Alloc: 132244280,
  BuckHashSys: 1922010,
  BySize: [{
      Frees: 0,
      Mallocs: 0,
      Size: 0
  }, {
      Frees: 496599,
      Mallocs: 499580,
      Size: 8
  },
  ...
  StackSys: 1195456,
  Sys: 107909880,
  TotalAlloc: 2105944960
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_memStats","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":{"Alloc":265525152,"TotalAlloc":3548997112,"Sys":756177144,"Lookups":2165,"Mallocs":25572268,"Frees":24933943,
...
"Frees":36},{"Size":16384,"Mallocs":123,"Frees":122},{"Size":18432,"Mallocs":11,"Frees":3},{"Size":19072,"Mallocs":2,"Frees":1}]}}
```

## debug_metrics <a id="debug_metrics"></a>

노드에서 수집한 모든 알려진 시스템 메트릭을 검색합니다.

| 클라이언트 | 메서드 호출                                         |
| :---: | ---------------------------------------------- |
|   콘솔  | `debug.metrics(raw)`                           |
|  RPC  | `{"method": "debug_metrics", "params": [raw]}` |

**매개변수**

| 이름  | 유형      | 설명                                               |
| --- | ------- | ------------------------------------------------ |
| raw | Boolean | `true`: Raw 데이터를 그대로 출력하는 경우, `false`: 그렇지 않은 경우 |

**리턴 값**

| 유형          | 설명                    |
| ----------- | --------------------- |
| JSON string | 노드에서 수집한 구조화된 메트릭입니다. |

**예시**

콘솔

```javascript
> debug.metrics(true)
debug.metrics(true)
{
...
chain: {
  inserts: {
    AvgRate01Min: 0.9999999999999988,
    AvgRate05Min: 0.9999950225324217,
    AvgRate15Min: 0.9963720514881304,
    MeanRate: 0.9936029165254054,
    Overall: 5122,
    Percentiles: {
      20: 6266950,
      5: 5950439.75,
      50: 6682947,
      80: 7255046,
      95: 9365905.249999994
    }
  }
},
...
system: {
  disk: {
    readcount: {
      AvgRate01Min: 56.44435697476854,
      AvgRate05Min: 55.584662531212246,
      AvgRate15Min: 55.34119664885956,
      MeanRate: 47.632311872105376,
      Overall: 245543
    },
    readdata: {
      AvgRate01Min: 12317.25061664709,
      AvgRate05Min: 12166.068673100728,
      AvgRate15Min: 12672.361505927352,
      MeanRate: 15647.98456421136,
      Overall: 80664847
    },
    writecount: {
      AvgRate01Min: 181.87825585990814,
      AvgRate05Min: 179.42841085089034,
      AvgRate15Min: 177.29930723824663,
      MeanRate: 145.6261462083422,
      Overall: 750698
    },
    writedata: {
      AvgRate01Min: 24683.661802447285,
      AvgRate05Min: 24302.28523786675,
      AvgRate15Min: 24142.37073674183,
      MeanRate: 25207.081062276873,
      Overall: 129941675
    }
  }
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_metrics","params":[true],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":{"blockchain":{"block":{"tx":{"counter":{"Overall":98307},"rate":{"AvgRate01Min":19.99999999999893,"AvgRate05Min":19.999669059400787,"AvgRate15Min":19.91097896398045,"MeanRate":16.321034565305364,"Overall":98307}}},"head":{"blocknumber":"Unknown metric type"}},"bridgeTxpool":{"refuse":{"Overall":0}}, ...{"AvgRate01Min":0.9999999999999988,"AvgRate05Min":0.9999997215208508,"AvgRate15Min":0.9986124269288207,"MeanRate":0.9946322927570416,"Overall":5991,"Percentiles":{"20":6229668,"5":5986862.3,"50":6585653,"80":6864326.2,"95":7486187.249999999}}}}
```

## debug_setGCPercent <a id="debug_setgcpercent"></a>

가비지 컬렉션 목표 비율을 설정합니다. 이전 설정을 반환합니다.
음수 값은 GC를 비활성화합니다.

**매개변수**

| 이름      | 유형      | 설명                |
| ------- | ------- | ----------------- |
| Percent | integer | 가비지 수집 목표 백분율입니다. |

**리턴 값**

| 유형      | 설명                |
| ------- | ----------------- |
| integer | 이전 가비지 수집 목표 백분율. |

**예제**
콘솔

```javascript
> debug.setGCPercent(50)
100
> debug.setGCPercent(70)
50
> debug.setGCPercent(100)
70
```

HTTP RPC

```shell
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"debug_setGCPercent", "params":[100],"id":73}' https://public-en-baobab.klaytn.net

{
  "jsonrpc":"2.0",
  "id":73,
  "result":70
}
```

## debug_stacks <a id="debug_stacks"></a>

모든 go루틴 스택의 인쇄된 표현을 반환합니다.

| 클라이언트 | 메서드 호출                                     |
| :---: | ------------------------------------------ |
|   콘솔  | `debug.stacks()`                           |
|  RPC  | `{"method": "debug_stacks", "params": []}` |

**매개변수**

없음

**리턴 값**

| 유형     | 설명                 |
| ------ | ------------------ |
| string | 모든 go루틴의 스택 정보입니다. |

**예시**

콘솔

```javascript
> debug.stacks()
goroutine 163577 [running]:
/api/debug.(*HandlerT).Stacks(0xc4200a4780, 0x0, 0x0)
	/klaytn/build/_workspace/src/github.com/klaytn/klaytn/api/debug/api.go:173 +0x74
reflect.Value.call(0xc4213a80c0, 0xc42134d1f0, 0x13, 0xf050ec, 0x4, 0xc4233957a0, 0x1, 0x1, 0x474401, 0xc4233956c8, ...)
...
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stacks","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"goroutine 76176 [running]:\ngithub.com/klaytn/klaytn/api/debug.(*HandlerT).Stacks(0xc0002ce050, 0x0, 0x0)\n\t/private/tmp/klaytn-20181001-13887-zbyv2z/build/_workspace/src/github.com/klaytn/klaytn/api/debug/api.go:173 +0x74\nreflect.Value.call(0xc01867c660, 0xc000231bd8, 0x13, 0x4b26ca7, 0x4, 0xc008d8b7c0, 0x1, 0x1, 0x30, 0xc0323211d0 ..."}
```
