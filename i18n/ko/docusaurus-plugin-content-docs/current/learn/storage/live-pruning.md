# StateDB 라이브 프루닝

StateDB 라이브 프루닝은 [상태 마이그레이션](state-migration.md)과 동일한 문제(상태 트라이의 데이터가 계속 누적되는 문제)를 해결하기 위한 새로운 기법입니다.

StateDB에서 데이터는 StateTrie라는 데이터 구조에 저장됩니다. 블록에서 상태 데이터가 변경되면 트라이 내의 여러 노드가 수정되고 새로운 데이터 또는 업데이트된 데이터가 저장됩니다. Kaia 네트워크가 계속 확장됨에 따라 데이터의 양은 그에 따라 증가합니다. 이러한 문제는 오래된 데이터를 지속적으로 삭제하여 저장 공간을 절약하는 스테이트 마이그레이션을 통해 완화할 수 있습니다. 하지만 스테이트 마이그레이션은 전체 트라이를 탐색해야 하고 수동으로 트리거해야 한다는 단점이 있습니다. 이러한 한계를 극복하기 위해 StateDB 라이브 프루닝 기법이 도입되었습니다.

전체 StateTrie를 탐색하지 않고도 기록 데이터를 효과적으로 제거하기 위해서는 특정 시점의 TrieNode가 오래된 것인지 아닌지를 확인하는 것이 필수적입니다. 원래의 StateTrie 구조에서는 하나의 트리노드가 여러 개의 스테이트트리에 포함될 수 있었습니다. 따라서 특정 시점에 특정 블록의 상태가 업데이트되더라도 일부 트라이노드가 중복으로 사용되어 쉽게 삭제되지 않을 수 있습니다. 이 문제를 해시 중복 문제라고 합니다.

스테이트DB 라이브 프루닝은 32바이트 해시 뒤에 7바이트의 고유한 직렬 인덱스를 추가하여 스테이트 트라이의 이러한 문제를 해결합니다. 이렇게 하면 모든 스테이트 트라이의 모든 노드가 고유하고 특정 블록 전에 스테이트 트라이를 안전하게 삭제할 수 있습니다.

```
Hash: Keccak256 - 32-byte Hash key
ExtHash: Keccak256 - 32-byte Hash Key + 7-byte Serial index
```

또한 확장 해시에서 원래 해시값을 계산하기 때문에 블록에서 StateRoot는 변경되지 않습니다. 스테이트 루트 값을 얻기 위해 ExtHash에 추가된 7바이트 시리얼 인덱스가 제거되고, 이전과 동일한 스테이트 루트 값을 얻기 위해 해시가 다시 계산되므로 이전 버전과 호환됩니다.

자세한 내용은 이 [미디엄 블로그](https://medium.com/klaytn/strong-efficient-management-of-blockchain-data-capacity-with-statedb-live-pruning-strong-6aaa09b05f91)를 참조하세요.

StateDB 라이브 프루닝은 정보 변경 후 48시간(기본값) 후에 데이터를 삭제하므로 과거 계정 잔액, 오래된 블록에 대한 컨트랙트 실행 등 StateDB 조회와 관련된 기능은 지원되지 않습니다. StateDB 라이브 프루닝 기능을 활성화하기 전에 운영 중인 노드의 용도를 신중하게 고려하시기 바랍니다.

StateDB 라이브 프루닝을 사용하려면 다음과 같은 환경이 설정되어 있어야 합니다:

1. klaytn v1.11.0 이상의 바이너리를 사용합니다.
2. Please download the pruned DB snapshot from this [link](https://packages.kaia.io/kairos/pruning-chaindata/) if you don't want to synchronize all blocks from the genesis block.
3. (선택 사항) 최근 상태가 유지되는 기간에 대한 플래그 `--state.live-pruning-retention <value>`를 추가합니다. 기본값은 172800(48시간)입니다.
4. [체인데이터 변경](../../misc/operation/chaindata-change.md) 섹션을 참고하여 DB 위치를 설정하고 여기에 `--state.live-pruning`을 추가하여 노드를 재시작합니다.
