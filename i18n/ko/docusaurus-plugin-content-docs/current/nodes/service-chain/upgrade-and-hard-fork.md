# 서비스 체인 업그레이드

카이아와 서비스체인은 새로운 기능을 개발하고 버그를 수정하기 위해 지속적으로 새로운 버전을 출시하고 있습니다. 이 페이지는 서비스체인 바이너리를 업그레이드하고 서비스체인의 하드포크 블록 번호를 설정하는 방법에 대한 가이드입니다.

## 업그레이드 <a href="#upgrade" id="upgrade"></a>

이 섹션에서는 ServiceChain 바이너리를 업그레이드하는 방법을 설명합니다.

**참고** 서비스체인 바이너리 업그레이드는 되돌릴 수 없고 이전 버전과 호환되지 않을 수 있으므로 이전 버전으로 다운그레이드할 수 없습니다. 자세한 내용은 릴리스 노트를 참고하세요. 예를 들어, [Kaia v1.9.0 릴리스 노트](https://medium.com/klaytn/klaytn-v1-9-0-release-notes-medium-58e4644f7544)를 참고하세요:

> 참고: 이 버전은 스냅샷 동기화를 지원하도록 데이터베이스 버전을 업데이트합니다. v1.9.0으로 업데이트한 후에는 기존 데이터가 있는 이전 버전으로 다운그레이드할 수 없습니다.

아래 링크 중 하나에서 최신 버전의 카이아와 서비스체인 바이너리를 받을 수 있습니다:

- [카이아 문서](../downloads/downloads.md)
- [Kaia Github Repository](https://github.com/kaiachain/kaia/releases)

서비스체인 바이너리를 업그레이드하려면 서비스체인 노드를 중지하고 바이너리를 교체합니다. 예를 들어, 아래 명령을 사용하여 SCN 노드를 중지하고 바이너리를 최신 버전으로 바꿀 수 있습니다.

```bash
$ kscnd stop
Shutting down kscnd: OK
$ cp /path/to/new/kscn /path/to/original/kscn
```

업그레이드 후 서비스체인 노드를 다시 시작할 수 있습니다. 단, 서비스체인에서 하드포크를 진행하려는 경우 서비스체인 노드를 다운 상태로 유지해야 합니다. 서비스체인 하드포크에 대한 안내는 [하드포크](#hard-fork)를 참고하세요.

```bash
$ kscnd start
```

## 하드 포크 <a href="#hard-fork" id="hard-fork"></a>

이 섹션에서는 카이아 [하드포크](../../misc/klaytn-history.md)를 서비스체인에 적용하는 단계를 설명합니다.

서비스체인에 하드포크를 적용하려면 다음을 수행해야 합니다:

1. 하드포크에 적합한 블록 번호를 선택합니다.
2. 서비스체인 바이너리를 하드포크를 지원하는 버전으로 업그레이드합니다.
3. 서비스체인에서 하드포크 블록 번호를 설정합니다.

### 1) 1) 하드포크에 적합한 블록 번호 선택 <a href="#1-pick-an-appropriate-block-number-for-the-hard-fork" id="1-pick-an-appropriate-block-number-for-the-hard-fork"></a>

서비스체인의 JavaScript 콘솔에서 아래와 같이 현재 블록 번호를 확인할 수 있습니다.

```bash
$ kscn attach ~/kscnd_home/kaia.ipc
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> kaia.blockNumber
1234
```

이제 하드포크를 활성화하기 위해 적절한 블록 번호를 선택해야 합니다. 현재 블록과 하드포크 블록 사이에 충분한 블록 수(매초마다 생성됨)가 있는지 확인해야 합니다.

### 2. 서비스체인 바이너리 업그레이드 <a href="#2-upgrade-the-servicechain-binary" id="2-upgrade-the-servicechain-binary"></a>

서비스체인 바이너리 업그레이드에 대한 지침은 이 페이지의 [업그레이드](#upgrade) 섹션을 참조하세요. 지금은 서비스체인 노드를 다운(또는 중지) 상태로 유지해야 합니다. 하드포크 블록 번호를 설정한 후 다시 시작하게 됩니다.

### 3. 하드포크 블록 번호 설정 <a href="#3-set-the-hard-fork-block-number" id="3-set-the-hard-fork-block-number"></a>

원하는 하드포크를 지원하는 버전으로 서비스체인 바이너리를 업그레이드한 경우, 업데이트된 제네시스로 체인 구성을 다시 초기화하여 서비스체인에서 하드포크 블록 번호를 설정할 수 있습니다.

#### 모든 서비스체인 노드에 대한 제네시스 업데이트 및 체인 구성 재초기화 <a href="#update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes" id="update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes"></a>

먼저, `genesis.json`의 `config` 필드에 하드포크 번호를 지정합니다. 예를 들어, 서비스체인에서 Magma 하드포크를 활성화하려는 경우 아래와 같이 제네시스의 `config` 필드에 `magmaCompatibleBlock`을 지정해야 합니다.

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    ...
    "magmaCompatibleBlock": 1500,
    ...
  },
  ...
}
```

체인 구성에서 하드포크를 활성화하려면 이전 하드포크를 활성화해야 합니다. 즉, Magma 하드포크를 활성화하려면 EthTxType 하드포크가 이미 활성화되어 있어야 합니다. 체인 구성에 이전 하드포크의 호환 가능한 블록 번호에 대한 필드가 누락된 경우 해당 필드도 추가해야 합니다.

예를 들어 Magma 하드포크 블록 번호를 설정하고 싶지만, 아래와 같이 `genesis.json`의 `config` 필드에 `ethTxTypeCompatibleBlock`이 없는 경우입니다:

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

아래와 같이 `config` 필드에 `magmaCompatibleBlock`을 추가할 때 `ethTxTypeCompatibleBlock`도 추가해야 합니다.

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "ethTxTypeCompatibleBlock": 1500,
    "magmaCompatibleBlock": 1500,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

카이아 하드포크의 역사는 [Kaia Docs](../../misc/klaytn-history.md)에서 확인할 수 있습니다.

원하는 하드포크로 `genesis.json`을 업데이트한 경우 체인 구성을 다시 초기화하고 변경 사항을 적용합니다.

```bash
$ kscn --datadir /path/to/data/directory init /path/to/genesis.json
```

**참고** 체인 구성을 다시 초기화할 때 다음과 같은 오류 로그가 출력되는 것은 정상입니다.

```
ERROR[08/02,09:12:39 Z] [48] The same or more recent governance index exist. Skip writing governance index  newIdx=0 govIdxes=[0]
```

#### 업데이트된 체인 구성 확인 <a href="#confirm-the-updated-chain-config" id="confirm-the-updated-chain-config"></a>

이제 ServiceChain 노드를 다시 시작합니다. 예를 들어, 다음 명령으로 SCN 노드를 다시 시작할 수 있습니다.

```bash
$ kscnd start
```

그런 다음 SCN의 JavaScript 콘솔에서 업데이트된 체인 구성을 확인할 수 있습니다.

```bash
$ kscn attach ~/kscnd_home/kaia.ipc
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.chainConfig.magmaCompatibleBlock
1500
```

## 일부 하드 포크 세부 정보 <a href="#some-hard-fork-specifics" id="some-hard-fork-specifics"></a>

이 섹션에서는 특정 하드포크에 대한 몇 가지 세부 사항을 설명합니다.

### Magma <a href="#magma" id="magma"></a>

Magma 하드포크는 동적 가스 요금인 KIP-71을 도입합니다. 여기에는 가스 가격의 상한과 하한이 포함됩니다.

기본적으로 상한은 `750000000000`, 하한은 `25000000000`로 설정되어 있습니다. [거버넌스 API](../../../references/json-rpc/governance/chain-config)를 사용하여 SCN 노드의 Javascript 콘솔에서 이러한 제한을 변경할 수 있습니다. 물론 하한은 상한을 초과할 수 없습니다.

가스 가격을 정적 값으로 설정하려면 가스 가격의 상한과 하한을 같은 값으로 설정해야 합니다. 예를 들어, SCN 노드의 JavaScript 콘솔에서 `governance.vote` API를 사용하여 가스 가격을 `0`으로 설정할 수 있습니다.

```bash
$ kscn attach ~/kscnd_home/kaia.ipc
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.vote("kip71.lowerboundbasefee", 0)
"Your vote is prepared. It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
> governance.vote("kip71.upperboundbasefee", 0)
"Your vote is prepared. It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
```

**참고** 거버넌스 투표 및 업데이트는 Magma 하드포크 활성화와 관계없이 가능합니다. 즉, Magma 하드포크가 활성화되기 전에도 거버넌스 투표를 진행할 수 있습니다.

가스 가격의 상한과 하한을 업데이트하는 투표가 성공하면 해당 변경 사항은 2 Istanbul epoch(epoch는 블록 번호로 값을 가집니다) 후에 적용됩니다.

예를 들어, epoch가 3600이고 가스 가격의 상한과 하한을 업데이트하기 위한 투표가 블록 #4000에서 이루어졌다면, 해당 변경 사항은 블록 #10800부터 적용될 것입니다. 세부적으로는 첫 번째 epoch가 블록 #7200에 도달하면 투표가 완료되고 두 번째 epoch(블록 #10800)에서 변경 사항이 적용됩니다.

epoch를 확인하려면 아래와 같이 `governanace.itemsAt` API를 사용하면 됩니다.

```javascript
> governance.itemsAt(kaia.blockNumber)
{
  governance.governancemode: "none",
  governance.governingnode: "0x05ad406f31e22b74f18c9ed65ed1ccd349bbbee0",
  governance.unitprice: 0,
  istanbul.committeesize: 21,
  istanbul.epoch: 3600,
  istanbul.policy: 0,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: false,
  reward.minimumstake: "2000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.useginicoeff: false
}
```

`istanbul.epoch`의 블록 값이 3600 블록이며, 일반적으로 한 시간이 걸리는 것을 볼 수 있습니다.

`governance.vote` API를 사용하여 epoch를 변경할 수도 있습니다.

```javascript
> governance.vote("istanbul.epoch", 60)
"Your vote is prepared. It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
```
