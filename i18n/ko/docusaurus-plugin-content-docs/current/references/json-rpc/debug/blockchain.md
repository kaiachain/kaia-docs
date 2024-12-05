# 블록체인 검사

**참고:** 아래 API를 **제외한** 모든 디버그 네임스페이스 API는 `rpc.unsafe-debug.disable` 플래그로 제한됩니다:

- [VM 추적](./tracing.md) API(기능이 제한됨)(단, [사전 정의된 tracer](./tracing.md#tracing-options)는 허용됨)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

## debug_dumpBlock <a id="debug_dumpblock"></a>

블록 번호에 해당하는 상태를 검색하고 계정 목록을 반환합니다.

**참고**: 이 함수는 현재 4개인 최신 블록의 상태를 올바르게 반환합니다.  옵션 `--state.block-interval`(기본값: 128)에 설정한 값에 따라 제한됩니다.  즉, 함수는
함수는 state.block-interval의 배수인 블록 번호에 대해서만 상태 검색을 수행합니다.  예를 들어, 다음과 같은 경우
state.block-interval이 128이면 이 함수는 블록 번호
블록 번호 "0x0", "0x80", "0x100", "0x180" 등의 상태를 반환합니다.  블록
번호가 state.block-interval의 배수가 아닌 경우, 'missing trie node' 오류를 반환합니다.

| 클라이언트 | 메서드 호출                                              |
| :---: | --------------------------------------------------- |
|   콘솔  | `debug.dumpBlock(number)`                           |
|  RPC  | `{"method": "debug_dumpBlock", "params": [number]}` |

**매개변수**

| 이름                   | 유형                      | 설명                                                                                                                                         |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| block number 또는 hash | QUANTITY \| TAG \| HASH | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](../klay/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열 또는 블록 해시. |

:::note

참고: Klaytn v1.7.0 이전 버전에서는 16진수 문자열 유형만 사용할 수 있습니다.

:::

**리턴 값**

| 유형          | 설명        |
| ----------- | --------- |
| JSON string | 블록 정보입니다. |

**예시**

콘솔

```javascript
> debug.dumpBlock("0x80")
{
  accounts: {
    0000000000000000000000000000000000000035: {
      balance: "12800000000000000000",
      code: "6080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a723058201307c3756f4e627009187dcdbc0b3e286c13b98ba9279a25bfcc18dd8bcd73e40029",
      codeHash: "62b00472fac99d94ccc52f5addac43d54c129cd2c6d2357c9557abea67efdec5",
      nonce: 0,
      root: "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      storage: {}
    },
    /...(skipped).../
      codeHash: "3f34b5d7038ae652086ba4847ede2668b26a50107c5258d1412f764b942e2661",
      nonce: 1,
      root: "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      storage: {}
    }
  },
  root: "70383c826d1161ec2f12d799023317d8da7775dd47b8502d2d7ef646d094d3a5"
}

> debug.dumpBlock("0x81")
Error: missing trie node a573119868e0898fe5526732a079dd713c005fcbcce38dec5cae75af0378e4d3 (path )
    at web3.js:3239:20
    at web3.js:6447:15
    at web3.js:5181:36
    at <anonymous>:1:1
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_dumpBlock","params":["0x80"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":{"root":"70383c826d1161ec2f12d799023317d8da7775dd47b8502d2d7ef646d094d3a5","accounts":{"0000000000000000000000000000000000000035":{"balance":"12800000000000000000","nonce":0,"root":"56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421","codeHash":"62b00472fac99d94ccc52f5addac43d54c129cd2c6d2357c9557abea67efdec5","code":"6080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a723058201307c3756f4e627009187dcdbc0b3e286c13b98ba9279a25bfcc18dd8bcd73e40029","storage":{}},...(skipped)...}}}
```

## debug_dumpStateTrie <a id="debug_dumpstatetrie"></a>

주어진 상태 루트의 모든 상태/저장 시도를 검색합니다.

| 클라이언트 | 메서드 호출                                                  |
| :---: | ------------------------------------------------------- |
|   콘솔  | `debug.dumpStateTrie(number)`                           |
|  RPC  | `{"method": "debug_dumpStateTrie", "params": [number]}` |

**매개변수**

| 이름     | 유형  | 설명        |
| ------ | --- | --------- |
| number | int | 블록 번호입니다. |

**리턴 값**

| 유형          | 설명           |
| ----------- | ------------ |
| JSON string | 덤프 상태 트라이 결과 |

**예시**

콘솔

```javascript
> debug.dumpStateTrie(10)
{
    root: "70383c826d1161ec2f12d799023317d8da7775dd47b8502d2d7ef646d094d3a5",
    tries: [...]
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_dumpStateTrie","params":["0x80"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":{"root":"70383c826d1161ec2f12d799023317d8da7775dd47b8502d2d7ef646d094d3a5","tries":[...]}}
```

## debug_getBlockRlp <a id="debug_getblockrlp"></a>

블록 번호로 RLP 인코딩된 블록을 검색하여 반환합니다.

| 클라이언트 | 메서드 호출                                                |
| :---: | ----------------------------------------------------- |
|   콘솔  | `debug.getBlockRlp(number)`                           |
|  RPC  | `{"method": "debug_getBlockRlp", "params": [number]}` |

참고 자료: [RLP](https://github.com/ethereum/wiki/wiki/RLP)

**매개변수**

| 이름                   | 유형                      | 설명                                                                                                                                         |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| block number 또는 hash | QUANTITY \| TAG \| HASH | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](../klay/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열 또는 블록 해시. |

:::note

참고: Klaytn v1.7.0 이전 버전에서는 정수형만 사용할 수 있습니다.

:::

**리턴 값**

| 유형     | 설명              |
| ------ | --------------- |
| string | RLP 인코딩된 블록입니다. |

**예시**

콘솔

```javascript
> debug.getBlockRlp(100)
"f90399f90394a05a825207c8396b848fefc73e442db004adee6596309af27630871b6a3d424758a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347940000000000000000000000000000000000000000940000000000000000000000000000000000000000a0b2ff1e4173123faa241fb93d83860e09f9e1ca1cfaf24c40c9e963e65c0b0317a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421b9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016485e8d4a50fff80845bb9e92eb90187d7820401846b6c617988676f312e31302e33856c696e75780000000000000000f90164f854943b215ed129645b949722d4efbd9c749838d85bf0947050164b7718c667c9661afd924f6c0c5e5d4a01947f303b360063efc575e99cf2f7602efa034e832e94f38624dba0e106aa6a79335f77d3fd6409f9e4d8b84126d1ae355905704d8ffcc50599a8a051ac7c50ed6fc6d7caf6510cf0329b56cf3e3babfe45cc95143074ca0385627ea3b6ac3f6ad7961b60f23e32965d3b0c2900f8c9b841c3423ecb41ee86b193dbb98bf74e0c1b8e0c475503a8f5ef37ef7566af34443c77b492a1f92e5a7411c36efeae08ebc698d02353c38f07a3d5c32168243ab7e901b841ec6558f4e5d123b9dc240e77db493f1e5e2f55f108d3c4f9b39e10dbca39ad7b3fc2dd5d27a7a3d92938ad4245bef5a914377fb2b92cbe342067a9963ab121b700b841f34ed94f29cd0aefd841cc8aba9dcc9d4c2fe14795f3a661e8ce92c2014c2099327e5f4285e1d1821e55f297cf5252bafed521ab49906b9b596a3187ce1e529c00a063746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365880000000000000000c0c0"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_getBlockRlp","params":['200'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"f905ebf905e6a03ab9a91f37811c1a2e975d1f684e4f9acbfcda09ff1529369a50a0c95ed0c026a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347940000000000000000000000000000000000000000940000000000000000000000000000000000000000a067302a0f946f9a676f187c0bebe6a61515321ff34614af507ac2fad9edac9018a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421b90100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000181c885e8d4a50fff80845bc3e058b903d8d7820302846b6c617988676f312e31302e34856c696e75780000000000000000f903b5f9011194011feb9f54d7cf0c59563d4f621a90e59fe839d9941aa5286f1ae8e183a8f8aebf2cb8425654a4979f94417a9f6e635f458be805702d85dd76d5dbb80aa8944eeabc5dbca48ff84a7fb36d67b51240ad37b01694518df54c51a355d1d961a641a1ee58a4acac62219453113c502402751deec24f6b4ca046878a74afa09459d4136ee1b30d9055b39675c86b5435d48662f9945b36da8763dce3bf84137ca79d56c468017383d2949b974f03aa0bb7d73882e3cfb80ec7a9e9ba543694af70cadbacb65d3a98352a12cc464dffb7e8181894c21dc40330bf91583c79eb58ae527487008f669d94c4a852238132f40ca085554f7bdcaf5f9ebab00f94ebd17315849780edc86f5f32081c8fbb0bd90a23b841ca7b5ac7fa0f6f228ba67544cf898005466a713bb863aaaaada20e58a838b2b468856e6277890a42ec92f8af40ca348a45438efa09d5e572ed8be4b535e016b701f9025bb841e64b232ed585759854e609c7947d19931a14e7906c5bbfe4acaa9aa7484d28f70b9dbfb7047dbd971e5d077d97306f26be258d2b016446fd41474082cc274a2b01b84195cf54ec0ac1ad4137be193f8d111f893590bd840cdb514c42ac169eb69e666a47e6cb358847364411c9cacb6261005d7fd4583e0d40216a1fa86fb083be270901b841e6caa2cb395a6e9d9c0853834a87a4c03444ec2b94035b3742c19ca09a72384c3ea9738aa66b43ad6f40269e8fd0ba015e23db36d7d7ccf666adba67c4bda4fc01b8418ad3f264ebb0dc47788f1d872423b7b067137d5d550f3311642308d5251f3e50049af533b8e16309ace3bf41ecf38a65a6e364458f8224c9efe57983c590590601b84129e147bf2666826af23027237e2894b074014ff38711ffe7168aa808a52c7e4863f2da1c5abd625567ef59b053f0b7abd36459b30a1e4d4d953784cb5f568fc500b841d58b713b28dba4bcb26ebbd274bbb12a8738a054c9cd18a2ee7298264e683a720dd633b66fa98edfe926e844d6e45f884b5e22fcd0df39d4d6f1fc84f1caceb701b8412dfaeadac01129c1ff9352c1b4b66e1c6b035b80e4b53e3ea5344a82ef607e3321fa05e57f6bdb27e4bd665af3e6c8b19575b3888f1b949c0cadbb186857b7cb01b841bb240246258aae93db40017e0ba437e0c4e517a25643282ee361f89fdb877a745f682a1f2c0441aa2d59cfa2058dc61d46f046499d4036efa02557b33a2f395200b841fdb9bb602e321d80ea09621e6ac36c01dc11152651404b4f7dba8be13466142914d97592c2625d83c27e220521d860b6128a0172c0ff39cdc23dabbfd4fdbb8100a063746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365880000000000000000c0c0"}
```

## debug_getModifiedAccountsByHash <a id="debug_getmodifiedaccountsbyhash"></a>

블록 해시로 지정된 두 블록 사이에 변경된 모든 계정을 반환합니다. `endBlockHash`에서 변경된 내용은 포함되지만 `startBlockHash`에서 변경된 내용은 포함되지 않습니다. `endBlockHash`가 지정되지 않으면 `startBlockHash`에서 수정된 계정을 반환합니다. 변경은 nonce, 잔액, 코드 해시 또는 스토리지 해시의 차이로 정의됩니다.

| 클라이언트 | 메서드 호출                                                                                      |
| :---: | ------------------------------------------------------------------------------------------- |
|   콘솔  | `debug.getModifiedAccountsByNumber(startBlockHash, endBlockHash)`                           |
|  RPC  | `{"method": "debug_getModifiedAccountsByNumber", "params": [startBlockHash, endBlockHash]}` |

**매개변수**

| 이름             | 유형           | 설명                                           |
| -------------- | ------------ | -------------------------------------------- |
| startBlockHash | 32-byte DATA | 확인할 범위의 첫 번째 블록 해시입니다.                       |
| endBlockHash   | 32-byte DATA | (선택 사항) 범위의 마지막 블록 해시입니다. |

**리턴 값**

| 유형          | 설명                     |
| ----------- | ---------------------- |
| JSON string | 지정된 범위에서 수정된 주소 목록입니다. |

**예시**

콘솔

```javascript
> debug.getModifiedAccountsByHash("0x583a02df4222c82d4ffe5d3658d0f7ac233f4dc5de83f6430d74199038b606b6", "0x69833f0fc012dc36be910aa6909f5395cd35136dbeae29ed2170a7d4162a009c")

["0x31b93ca83b5ad17582e886c400667c6f698b8ccd", "0xb7fe15c42e66bd71835b07dc6e7daee7729f6235", "0xe31a0edb11357dba71377e625fc6174da4ef4321", "0x16b11cf9c2186a117b0da38315b42b1eaa03bbe5", "0xd3ec3c7e4cad042dbdcb6a7e0fdbc55a92276f12", "0xa4e0d726ce51572e66295756ad93206592c43a59", "0xf65e07b6626ab43ecea744803fa46bd4a89bfdb6", "0xaac56dfe44f9894d4f536cd17acfbc44bf81a843", "0x3855407fa65c4c5104648b3a9e495072df62b585", "0x61a7cbdd597848494fa85cbb76f9c63ad9c06cad", "0xa4845491cb0dad5bd6707a33c02af0d9db435c15", "0x026e8f70a26b6e5c8bec25e23869846edfdd6728", "0x3cf3e8caea91501321feee0f0692fcd98f1c6292", "0x18822790d7baf2fa6bbca6ad8baa46985abeb81b"]
```

HTTP RPC

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_getModifiedAccountsByHash","params":["0x583a02df4222c82d4ffe5d3658d0f7ac233f4dc5de83f6430d74199038b606b6", "0x69833f0fc012dc36be910aa6909f5395cd35136dbeae29ed2170a7d4162a009c"],"id":1}' https://public-en-baobab.klaytn.net

{"jsonrpc":"2.0","id":1,"result":["0x31b93ca83b5ad17582e886c400667c6f698b8ccd","0xb7fe15c42e66bd71835b07dc6e7daee7729f6235","0xe31a0edb11357dba71377e625fc6174da4ef4321","0x16b11cf9c2186a117b0da38315b42b1eaa03bbe5","0xd3ec3c7e4cad042dbdcb6a7e0fdbc55a92276f12","0xa4e0d726ce51572e66295756ad93206592c43a59","0xf65e07b6626ab43ecea744803fa46bd4a89bfdb6","0xaac56dfe44f9894d4f536cd17acfbc44bf81a843","0x3855407fa65c4c5104648b3a9e495072df62b585","0x61a7cbdd597848494fa85cbb76f9c63ad9c06cad","0xa4845491cb0dad5bd6707a33c02af0d9db435c15","0x026e8f70a26b6e5c8bec25e23869846edfdd6728","0x3cf3e8caea91501321feee0f0692fcd98f1c6292","0x18822790d7baf2fa6bbca6ad8baa46985abeb81b"]}
```

## debug_getModifiedAccountsByNumber <a id="debug_getmodifiedaccountsbynumber"></a>

블록 번호로 지정된 두 블록 사이에 변경된 모든 계정을 반환합니다. `endBlockNum`에서 변경된 내용은 포함되지만 `startBlockNum`에서 변경된 내용은 포함되지 않습니다. `endBlockNum`이 지정되지 않으면 `startBlockNum`에서 수정된 계정을 반환합니다. 코드 해시 또는 저장소 해시의 차이로 정의됩니다.

| 클라이언트 | 메서드 호출                                                                                    |
| :---: | ----------------------------------------------------------------------------------------- |
|   콘솔  | `debug.getModifiedAccountsByNumber(startBlockNum, endBlockNum)`                           |
|  RPC  | `{"method": "debug_getModifiedAccountsByNumber", "params": [startBlockNum, endBlockNum]}` |

**매개변수**

| 이름          | 유형  | 설명                                           |
| ----------- | --- | -------------------------------------------- |
| 시작 블록 번호    | int | 검사할 범위의 첫 번째 블록 번호입니다.                       |
| endBlockNum | int | (선택 사항) 범위의 마지막 블록 번호입니다. |

**리턴 값**

| 유형          | 설명                     |
| ----------- | ---------------------- |
| JSON string | 지정된 범위에서 수정된 주소 목록입니다. |

**예시**

콘솔

```javascript
> debug.getModifiedAccountsByNumber(171904, 172160)
["0x31b93ca83b5ad17582e886c400667c6f698b8ccd", "0xb7fe15c42e66bd71835b07dc6e7daee7729f6235", "0xe31a0edb11357dba71377e625fc6174da4ef4321", "0x16b11cf9c2186a117b0da38315b42b1eaa03bbe5", "0xd3ec3c7e4cad042dbdcb6a7e0fdbc55a92276f12", "0xa4e0d726ce51572e66295756ad93206592c43a59", "0xf65e07b6626ab43ecea744803fa46bd4a89bfdb6", "0xaac56dfe44f9894d4f536cd17acfbc44bf81a843", "0x3855407fa65c4c5104648b3a9e495072df62b585", "0x61a7cbdd597848494fa85cbb76f9c63ad9c06cad", "0xa4845491cb0dad5bd6707a33c02af0d9db435c15", "0x026e8f70a26b6e5c8bec25e23869846edfdd6728", "0x3cf3e8caea91501321feee0f0692fcd98f1c6292", "0x18822790d7baf2fa6bbca6ad8baa46985abeb81b"]
```

HTTP RPC

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_getModifiedAccountsByNumber","params":[171904, 172160],"id":1}' https://public-en-baobab.klaytn.net

{"jsonrpc":"2.0","id":1,"result":["0x31b93ca83b5ad17582e886c400667c6f698b8ccd","0xb7fe15c42e66bd71835b07dc6e7daee7729f6235","0xe31a0edb11357dba71377e625fc6174da4ef4321","0x16b11cf9c2186a117b0da38315b42b1eaa03bbe5","0xd3ec3c7e4cad042dbdcb6a7e0fdbc55a92276f12","0xa4e0d726ce51572e66295756ad93206592c43a59","0xf65e07b6626ab43ecea744803fa46bd4a89bfdb6","0xaac56dfe44f9894d4f536cd17acfbc44bf81a843","0x3855407fa65c4c5104648b3a9e495072df62b585","0x61a7cbdd597848494fa85cbb76f9c63ad9c06cad","0xa4845491cb0dad5bd6707a33c02af0d9db435c15","0x026e8f70a26b6e5c8bec25e23869846edfdd6728","0x3cf3e8caea91501321feee0f0692fcd98f1c6292","0x18822790d7baf2fa6bbca6ad8baa46985abeb81b"]}
```

## debug_preimage <a id="debug_preimage"></a>

알고 있는 경우 sha3 해시에 대한 프리이미지를 반환합니다.

| 클라이언트 | 메서드 호출                                           |
| :---: | ------------------------------------------------ |
|   콘솔  | `debug.preimage(hash)`                           |
|  RPC  | `{"method": "debug_preimage", "params": [hash]}` |

**매개변수**

| 이름   | 유형     | 설명       |
| ---- | ------ | -------- |
| hash | string | SHA3 해시. |

**리턴 값**

| 이름       | 유형     | 설명               |
| -------- | ------ | ---------------- |
| preimage | string | 샤3 해시에 대한 프리이미지. |

**예시**

콘솔

```javascript
> debug.preimage("0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586")
"0xdd738d9a7d987a98798123b2322d389470328420bb3d84023a8405a5523cc532235ba325235243242cb9a4758609a8604 ...  98bbd743053d0cbadaaccd4865cc0348685460ada874506ad984506ad80458ad69038fd6f908340fd9af68faf903760"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_preimage","params":["0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586")
"0xdd738d9a7d987a98798123b2322d389470328420bb3d84023a8405a5523cc532235ba325235243242cb9a4758609a8604 ...  98bbd743053d0cbadaaccd4865cc0348685460ada874506ad984506ad80458ad69038fd6f908340fd9af68faf903760"}
```

## debug_getBadBlocks <a id="debug_getbadblocks"></a>

클라이언트가 네트워크에서 마지막으로 본 'bad blocks'의 목록을 반환합니다.

| 클라이언트 | 메서드 호출                                           |
| :---: | ------------------------------------------------ |
|   콘솔  | `debug.getBadBlocks()`                           |
|  RPC  | `{"method": "debug_getBadBlocks", "params": []}` |

**매개변수**

없음

**리턴 값**

| 이름       | 유형   | 설명             |
| -------- | ---- | -------------- |
| badBlock | JSON | 블록 해시의 JSON 목록 |

**예시**

콘솔

```javascript
> debug.getBadBlocks()
[]
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_getBadBlocks","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":[]}
```

## debug_printBlock <a id="debug_printblock"></a>

블록을 검색하고 예쁜 인쇄된 형태를 반환합니다.

| 클라이언트 | 메서드 호출                                               |
| :---: | ---------------------------------------------------- |
|   콘솔  | `debug.printBlock(number)`                           |
|  RPC  | `{"method": "debug_printBlock", "params": [number]}` |

**매개변수**

| 이름                   | 유형                      | 설명                                                                                                                                         |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| block number 또는 hash | QUANTITY \| TAG \| HASH | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](../klay/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열 또는 블록 해시. |

:::note

참고: Klaytn v1.7.0 이전 버전에서는 정수형만 사용할 수 있습니다.

:::

**리턴 값**

| 유형     | 설명          |
| ------ | ----------- |
| string | 블록 구조체의 덤프. |

**예시**

콘솔

```javascript
> debug.printBlock(65120)
"(*types.Block)(0xc436fad3b0)(Block(#65120): Size: 2.95 kB {\nMinerHash: 7a5f8d37d34be6d9d19c5f161756d607da62227bb725ddb2f372682d7a9f1445\nHeader(e96d6477acfeba8ba865c315020471dcf751aa1bddca77f469334ab0492d218f):\n[\n\tParentHash:      e768b5b7eeb1005fe130c26da744d47e042e9227cee675fa70c89ede38653aea\n\tCoinbase:         0000000000000000000000000000000000000000\n\tRewardbase:       0000000000000000000000000000000000000000\n\tRoot: ... 0xc3be927ae5c0c48a0c83a1dbdf2df737c4a708eb6dae0ccb4a7eb042ea0a6ebf\n\tS:       0x53d8bed6357f88c8bab1f3d83942aa53c14269e58016e284656b12996a5d759a\n\tHex:      f863829d9280825208949619a83fcefc5647736cfd28845fcc4f716ff53b8080820fe7a0c3be927ae5c0c48a0c83a1dbdf2df737c4a708eb6dae0ccb4a7eb042ea0a6ebfa053d8bed6357f88c8bab1f3d83942aa53c14269e58016e284656b12996a5d759a\n]\n}\n)\n"

```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_printBlock","params":[65120],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"(*types.Block)(0xc4355b05a0)(Block(#65120): Size: 2.95 kB {\nMinerHash: 7a5f8d37d34be6d9d19c5f161756d607da62227bb725ddb2f372682d7a9f1445\nHeader(e96d6477acfeba8ba865c315020471dcf751aa1bddca77f469334ab0492d218f):\n[\n\tParentHash:       e768b5b7eeb1005fe130c26da744d47e042e9227cee675fa70c89ede38653aea\n\tCoinbase:         0000000000000000000000000000000000000000\n\tRewardbase:  ... 0000000000000000000000000000000000000000\n\tRoot:             4fd68a8f550cbd9ad665bc1a8021882ced5e1859fd9e28a48cb2910532b6ef27\n\tTxSha:            e3dbb8245038adcdc849de54af1d05f0c36c4c20d2710e31d525bd012d20a193\n\tReceiptSha:       212d4f453a897e2a486c86a4b120c1a850e89753865fe7f1aafa4"}
```

## debug_setHead <a id="debug_sethead"></a>

블록 번호별로 로컬 체인의 현재 헤드를 설정합니다.

**참고**: 이는 파괴적인 행동이며 체인이 심각하게 손상될 수 있습니다.
매우\* 주의해서 사용하세요.

| 클라이언트 | 메서드 호출                                            |
| :---: | ------------------------------------------------- |
|   콘솔  | `debug.setHead(number)`                           |
|  RPC  | `{"method": "debug_setHead", "params": [number]}` |

**매개변수**

| 이름     | 유형              | 설명                                                                                                                                    |
| ------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| number | QUANTITY \| TAG | 정수 또는 16진수 블록 번호, 또는 [기본 블록 매개변수](../klay/block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |

**리턴 값**

없음

**예시**

콘솔

```javascript
> debug.setHead("0x100")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setHead","params":["0x100"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_seedHash <a id="debug_seedhash"></a>

블록의 시드 해시를 검색합니다.

| 클라이언트 | 메서드 호출                                             |
| :---: | -------------------------------------------------- |
|   콘솔  | `debug.seedHash(number)`                           |
|  RPC  | `{"method": "debug_seedHash", "params": [number]}` |

**매개변수**

| 이름     | 유형     | 설명        |
| ------ | ------ | --------- |
| number | uint64 | 블록 번호입니다. |

**리턴 값**

| 이름       | 유형     | 설명           |
| -------- | ------ | ------------ |
| seedHash | string | 블록 시드 해시입니다. |

**예시**

콘솔

```javascript
> debug.seedHash(100)
"0x0000000000000000000000000000000000000000000000000000000000000000"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_seedHash","params":[100],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0x0000000000000000000000000000000000000000000000000000000000000000"}
```

## debug_startWarmUp <a id="debug_startwarmup"></a>

`startWarmUp`은 최신 상태 트라이를 반복하여 트라이 캐시를 워밍업합니다.
트라이 캐시의 90%가 가득 차면 반복은 자동으로 중지됩니다.
이 메서드는 워밍업 시작에 실패하면 오류를 반환하고, 성공적으로 시작하면 `null`을 반환합니다.

| 클라이언트 | 메서드 호출                            |
| :---: | --------------------------------- |
|   콘솔  | `debug.startWarmUp()`             |
|  RPC  | `{"method": "debug_startWarmUp"}` |

**매개변수**

없음

**리턴 값**

| 유형    | 설명                                       |
| ----- | ---------------------------------------- |
| Error | 워밍업이 시작된 경우 `null`, 그렇지 않은 경우 오류를 반환합니다. |

**예시**

콘솔

```javascript
> debug.startWarmUp()
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startWarmUp","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_startContractWarmUp <a id="debug_startcontractwarmup"></a>

`startContractWarmUp`은 주어진 컨트랙트 주소의 최신 스토리지 트라이를 반복하여 트라이 캐시를 워밍업합니다.
시도 캐시의 90%가 가득 차면 반복이 자동으로 중지됩니다.
이 메서드는 워밍업 시작에 실패하거나 주어진 주소가 컨트랙트 주소가 아닌 경우 에러를 반환합니다.

| 클라이언트 | 메서드 호출                                                         |
| :---: | -------------------------------------------------------------- |
|   콘솔  | `debug.startContractWarmUp(address)`                           |
|  RPC  | `{"method": "debug_startContractWarmUp", "params": [address]}` |

**매개변수**

| 유형           | 설명              |
| ------------ | --------------- |
| 20-byte DATA | contractAddress |

**리턴 값**

| 유형    | 설명                                       |
| ----- | ---------------------------------------- |
| Error | 워밍업이 시작된 경우 `null`, 그렇지 않은 경우 오류를 반환합니다. |

**예시**

콘솔

```javascript
> debug.startContractWarmUp("0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startContractWarmUp", "params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"], "id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_stopWarmUp <a id="debug_stopwarmup"></a>

`stopWarmUp`은 현재 실행 중인 워밍업을 중지합니다.
이 메서드는 매개변수를 받지 않으며, 워밍업이 중지되었는지 여부에 따라 `null` 또는 오류를 반환합니다.

| 클라이언트 | 메서드 호출                     |
| :---: | -------------------------- |
|   콘솔  | `debug.stopWarmUp()`       |
|  RPC  | `{"method": "stopWarmUp"}` |

**매개변수**

없음

**리턴 값**

| 유형    | 설명                                       |
| ----- | ---------------------------------------- |
| Error | 워밍업이 중지된 경우 `null`, 그렇지 않은 경우 오류를 반환합니다. |

**예시**

콘솔

```javascript
> debug.stopWarmUp()
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopWarmUp","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_startCollectingTrieStats <a id="debug_startCollectingTrieStats"></a>

`startCollectingTrieStats`는 최신 상태 또는 스토리지 트라이를 반복하여 트라이 통계를 수집합니다. 주어진 주소에 있는 컨트랙트의 스토리지 시도 통계를 수집합니다. 빈 주소(="0x00...00")가 주어지면 전체 스테이트 트라이에 대한 통계를 수집합니다. 통계는 종료 전 1분마다 기록되며, 전체 및 심도별 정보를 포함합니다.
이 메서드는 작업 시작에 실패하면 오류를 반환하고, 성공적으로 시작하면 `null`을 반환합니다.

| 클라이언트 | 메서드 호출                                                              |
| :---: | ------------------------------------------------------------------- |
|   콘솔  | `debug.startCollectingTrieStats(address)`                           |
|  RPC  | `{"method": "debug_startCollectingTrieStats", "params": [address]}` |

**매개변수**

| 유형           | 설명              |
| ------------ | --------------- |
| 20-byte DATA | contractAddress |

**리턴 값**

| 유형    | 설명                                               |
| ----- | ------------------------------------------------ |
| Error | 시도 통계 수집 작업이 시작된 경우 `null`, 그렇지 않은 경우 오류를 반환합니다. |

**예시**

콘솔

```javascript
// empty address to collect whole state trie statistics
> debug.startCollectingTrieStats("0x0000000000000000000000000000000000000000")
null
// contract address to collect storage trie statistics
> debug.startCollectingTrieStats("0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startCollectingTrieStats", "params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"], "id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

로그

```
INFO[03/10,12:03:12 +09] [5] Started collecting trie statistics        blockNum=1491072 root=0x64af12b6374b92f6db457fa1b98fe9522d9f36ba352e3c4e01cdb75f001e8264 len(children)=16
...
INFO[03/10,12:03:12 +09] [5] Finished collecting trie statistics       elapsed=95.152412ms numNodes=133036 numLeafNodes=95948 maxDepth=9
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=5 numNodes=22098
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=6 numNodes=65309
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=7 numNodes=8083
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=8 numNodes=456
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=9 numNodes=2
```
