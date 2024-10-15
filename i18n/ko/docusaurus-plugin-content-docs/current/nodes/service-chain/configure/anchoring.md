# 데이터 앵커링 사용

디자인 섹션에서 설명한 것처럼 서비스 체인은 데이터 앵커링 기능을 지원합니다.
이 페이지는 앵커링 기능을 활성화하는 방법을 보여줍니다.
이 기능을 활성화하면 SCN은 주기적으로 자식 체인 블록 데이터를 부모 체인에 앵커링하여 존재와 불변성을 증명합니다.
이를 통해 서비스 체인의 보안과 신뢰성을 보장합니다.

## 앵커링 활성화 <a id="enable-anchoring"></a>

### SCN의 부모 운영자 확인 <a id="check-parent-operator-of-scn"></a>

SCN을 성공적으로 설치하고 실행했다면 부모 체인 운영자 계정이 생성되어야 합니다.
부모 운영자로 사용할 키스토어 파일을 제공하거나, 제공하지 않은 경우 SCN에서 키를 생성합니다.
부모 운영자 주소는 RPC API `subbridge_parentOperator`를 통해 확인할 수 있습니다.

```
$ kscn attach ~/kscnd_home/kaia.ipc
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 > subbridge.parentOperator
 "0x726e5C8705892989DAB1E9982FBE0B0A92eC84Bf"

```

_이 상위 운영자 계정 주소는 `$dataDIR/parent_bridge_account` 디렉터리의 키스토어 파일에서 파생됩니다._

### 부모 운영자 계정에 KAIA 추가하기<a id="add-klay-to-parent-operator-account"></a>

SCN이 블록 데이터를 앵커링할 때, SCN은 부모 운영자로서 앵커링 트랜잭션을 생성합니다.
따라서 계정은 트랜잭션 수수료를 지불하기 위해 KAIA가 필요합니다. 부모 운영자 계정에 충분한 KAIA를 추가해야 합니다.

### 앵커링 활성화 <a id="enable-anchoring"></a>

KLAY를 전송한 후 아래와 같이 잔액을 확인할 수 있습니다.

```javascript
> subbridge.parentOperatorBalance
1e+50
```

이후 아래와 같이 RPC API인 `subbridge.anchoring`을 통해 앵커링을 활성화할 수 있습니다.
자세한 내용은 [subbridge API](../.../../references/json-rpc/subbridge/anchoring)를 참조하세요.

```
> subbridge.anchoring(true)
true
```

## 앵커링 데이터 확인 <a id="check-anchoring-data"></a>

앵커링 기능이 활성화되면 SCN은 주기적으로 블록 데이터를 메인 체인에 앵커링합니다.
앵커링된 데이터는 아래와 같이 확인할 수 있습니다.

### 하위 브리지 <a id="sub-bridge"></a>

서브 브리지에서는 아래와 같이 최신 앵커 블록 번호를 확인할 수 있습니다.
자세한 내용은 [subbridge API](../.../../references/json-rpc/subbridge/latest-anchored-block-number)를 참조하세요.

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```

또한 앵커링 트랜잭션 해시는 아래와 같이 서비스 체인 블록 번호로 확인할 수 있습니다.

```javascript
> subbridge.getAnchoringTxHashByBlockNumber(1055)
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

### 메인 브리지 <a id="sub-bridge"></a>

메인 브리지에서 체인 인덱싱 옵션이 활성화된 경우 아래와 같이 서비스 체인 블록 해시로 앵커링 tx 해시를 찾을 수 있습니다.
자세한 내용은 [mainbridge API](../../../references/json-rpc/mainbridge/convert-child-chain-block-hash-to-parent-chain-tx-hash)를 참조하세요.

```javascript
> mainbridge.convertChildChainBlockHashToParentChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

아래와 같이 트랜잭션 해시를 앵커링하여 디코딩된 앵커링 데이터를 얻을 수 있습니다.

```javascript
> kaia.getDecodedAnchoringTransactionByHash("0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51")
{
  BlockCount: 1,
  BlockHash: "0xcf5f591836d70a1da8e6bb8e5b2c5739329ca0e535b91e239b332af2e1b7f1f4",
  BlockNumber: 1055,
  ParentHash: "0x70f6115a5b597f29791d3b5e3f129df54778f69ae669842cc81ec8c432fee37c",
  ReceiptHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  StateRootHash: "0x654773348f77a6788c76c93946340323c9b39399d0aa173f6b23fe082848d056",
  TxCount: 0,
  TxHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
}
```
