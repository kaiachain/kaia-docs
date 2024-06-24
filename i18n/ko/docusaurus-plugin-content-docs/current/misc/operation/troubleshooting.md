# 문제 해결

## 카이아 바이너리 패키지를 사용하여 실행 중인 카이아 노드의 로그 파일은 어디에서 찾을 수 있나요? <a id="where-can-i-find-a-log-file-for-the-running-klaytn-node-using-the-klaytn-binary"></a>

**답변**

로그 파일은 데이터 디렉터리에서 찾을 수 있습니다. 예를 들어, `kcnd` RPM 패키지를 설치할 때 `kcnd`에 대한 로그의 기본 위치는 `/var/log/kcnd/kcnd.out`입니다.

## 아래와 같이 `Protocol istanbul/64 failed` 및 `Genesis block mismatch` 에러 메시지와 함께 카이아 노드가 네트워크에 연결할 수 없습니다. <a id="klaytn-node-can-not-connect-to-network-with-protocol-istanbul-64-failed-and-gene"></a>

```
ERROR[01/27,17:11:33 +09] [33] Protocol istanbul/64 failed               id=b10697e43d4f8e30 conn=staticdial err="Genesis block mismatch - 81cf117d44f99b21 (!= 74647b98b9f06cb4)"
```

**답변**

이 오류는 `genesis.json`이 다를 때 발생할 수 있습니다.
카이아 노드를 중지하고 데이터 디렉터리를 제거해주세요. 그런 다음 아래와 같이 올바른 `genesis.json`을 사용하여 `ken init`을 다시 실행합니다.

예를 들어, 데이터 디렉터리가 `/var/kend/data`인 경우.

```
sudo kend stop
sudo rm -rf /var/kend/data
sudo ken init --datadir /var/kend/data genesis.json
sudo kend start
```

## 다음 오류 메시지와 함께 Truffle을 사용하여 스마트 컨트랙트를 배포할 수 없습니다. <a id="can-t-deploy-smart-contract-using-truffle-with-following-error-message"></a>

```
Error: Returned error: The method net_version does not exist/is not available
    at Object.ErrorResponse (/usr/local/lib/node_modules/truffle/build/webpack:/~/web3-eth/~/web3-core-helpers/src/errors.js:29:1)
    at /usr/local/lib/node_modules/truffle/build/webpack:/~/web3-eth/~/web3-core-requestmanager/src/index.js:140:1
    at /usr/local/lib/node_modules/truffle/build/webpack:/packages/truffle-provider/wrapper.js:112:1
    at XMLHttpRequest.request.onreadystatechange (/usr/local/lib/node_modules/truffle/build/webpack:/~/web3/~/web3-providers-http/src/index.js:96:1)
    at XMLHttpRequestEventTarget.dispatchEvent (/usr/local/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request-event-target.js:34:1)
    at XMLHttpRequest._setReadyState (/usr/local/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request.js:208:1)
    at XMLHttpRequest._onHttpResponseEnd (/usr/local/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request.js:318:1)
    at IncomingMessage.<anonymous> (/usr/local/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request.js:289:47)
    at IncomingMessage.emit (events.js:194:15)
    at endReadableNT (_stream_readable.js:1125:12)
    at process._tickCallback (internal/process/next_tick.js:63:19)
```

**답변**

아래와 같이 `kend.conf` 파일을 편집하여 RPC 콘솔에 `net` 및 기타 API를 활성화합니다.

```
RPC_API="admin,debug,klay,miner,net,personal,rpc,txpool,web3" # available apis: admin,debug,klay,miner,net,personal,rpc,txpool,web3
```

kend.conf\\`를 업데이트한 후 카이아 노드를 재시작합니다.

## 바이너리 패키지 설치 후 아래와 같이 `Unit not found` 에러가 발생하여 카이아 노드를 시작할 수 없습니다. <a id="can-t-start-klaytn-node-with-unit-not-found-error-as-below-after-installing-bina"></a>

```
Failed to start kcnd.service: Unit not found.
```

**답변**

아래와 같이 데몬을 다시 로드하세요.

```
sudo systemctl daemon-reload
```

## `Add dial candidate from static nodes` 로그 메시지와 함께 CN이 네트워크에 연결할 수 없습니다. <a id="cn-can-t-connect-to-network-with-add-dial-candidate-from-static-nodes-log-messag"></a>

```
INFO[02/20,12:35:34 Z] [21] [Dial] Add dial candidate from static nodes  id=7eaa1e3136fd16a3 addr=13.209.225.108:32323
...
INFO[02/20,12:35:38 Z] [21] [Dial] Add dial candidate from static nodes  id=7eaa1e3136fd16a3 addr=13.209.225.108:32323
```

**답변**

이 오류는 `genesis.json`과 노드키/검증자(nodekey/validator) 정보가 다를 때 발생할 수 있습니다.
노드키/검증자 및 `genesis.json` 파일을 다시 확인하시기 바랍니다.

## 다음 오류 로그 메시지와 함께 Kaia 노드를 시작할 수 없습니다. <a id="klaytn-node-can-t-start-with-following-error-log-message"></a>

```
Fatal: Error starting protocol stack: listen unix /Users/username/some_directory/more_directories/klaytn/klaytn_client/my_test_klaytn/data/dd/kaia.ipc: bind: invalid argument
```

**답변**

로그 파일에 위의 프로토콜 스택 오류 메시지가 표시된다면, 현재 작업 디렉터리의 전체 경로 이름이 너무 길어서 카이아를 시작하지 못했다는 뜻입니다. 더 짧은 전체 데이터 디렉터리로 카이아 노드를 시작하세요. 경로 이름의 최대 허용 길이는 운영체제에 따라 다릅니다.

## 다음 로그 메시지와 함께 EN이 CC에 연결할 수 없습니다. <a id="en-can-t-connect-to-cc-with-following-log-message"></a>

```
ERROR[01/28,06:20:07 Z] [23] Protocol istanbul/64 failed id=845f596536450bad conn=staticdial err="InvalidPeerHierarchy - (PeerIsOnParentChain:false) == (OnChildChain:false)"
```

**답변**

메인체인과 서비스 체인의 제네시스가 다를 때 발생할 수 있습니다. 두 체인의 제네시스가 동일한지 확인해 주세요.

## Head state missing 오류 <a id="head-state-missing-error"></a>

```
"ERROR[06/21,14:35:16 +09] [5] Head state missing, repairing chain       number=2955620 hash=66bba2…e15f8d
Fatal: Error starting protocol stack: rewound to block number 0, but repair failed"
```

호환성 문제로 인해 이전 버전(`<=` v0.8.2)으로 EN을 실행 중인 경우 EN의 바이너리를 v0.9.6으로 업그레이드할 것을 강력히 권장합니다. EN을 v0.9.x로 처음 업그레이드하고 이전 버전의 데이터를 마이그레이션하려는 경우, 최신 버전을 설치할 때 구성 파일에 `ADDITIONAL="--db.num-statetrie-partitions 1"` 옵션을 지정해야 합니다.
