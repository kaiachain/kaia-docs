# コンパイル済み契約書

Kaiaはいくつかの便利なコンパイル済みコントラクトを提供しますが、どれも状態を変更するものではありません。
これらのコントラクトはネイティブ実装としてプラットフォーム自体に実装されており、Kaiaクライアント仕様の一部であることを意味します。
アドレス0x01から0x0Aまでのプリコンパイルされたコントラクトは、イーサリアムのものと同じである。
The utility of precompiles falls into four major categories:
. 楕円曲線デジタル署名の復元
. Hash Methods
. Memory copying
. zk証明のための楕円曲線数学を可能にする方法。
Kaiaはさらに、Kaiaの新機能をサポートするために、0x3FDから0x3FFまでのプリコンパイルされたコントラクトを実装しています。

:::note

istanbulのEVMハードフォーク以前に導入された契約は、元のアドレスを使用する必要があります。

- case 1) The contracts deployed in Baobab at block number `#75373310` recognizes 0x09, 0x0a, and 0x0b as addresses of vmLog, feePayer, and validateSender, respectively, and blake2f cannot be used.
- case 2) The contracts deployed in Baobab at block number `#75373314` recognizes 0x09 as the address of blake2f, and recognizes 0x3fd, 0x3fe, and 0xff as addresses of vmLog, feePayer, and validateSender.

ハードフォークの変更に関連するコンパイル済みの契約書は、このページの一番下にあります。 ハードフォーク変更](#hardfork-changes)へ。

:::

## アドレス 0x01: ecrecover<a id="address-0x-01-ecrecover-hash-v-r-s"></a>

アドレス0x01はecrecoverを実装している。 ECDSAの復元関数を計算することで、与えられた署名からアドレスを返す。 これは、ソリディティ・ラッパーが付属している唯一のプリコンパイルである。 この関数のプロトタイプは以下の通りである：

```text
function ecRecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) public view returns (address) {
        address r = ecrecover(hash, v, r, s); // prototype function 
        require(r != address(0), "signature is invalid");
} // solidity wrapper
```

## アドレス 0x02: sha256(data)<a id="address-0x-02-sha-256-data"></a>

アドレス0x02はSHA256ハッシュを実装している。 与えられたデータからSHA256ハッシュを返す。 イーサリアムがKeccak256を使用しているように、ビットコインとZcashで主に使用されている。 この関数のプロトタイプは以下の通りである：

```text
function sha256(uint256 numberToHash) public view returns (bytes32 hash) {
      (bool ok, bytes memory hashData) = address(0x02).staticcall(abi.encode(numberToHash));
      require(ok);
      hash = abi.decode(hashData, (bytes32));
}
```

ユール/インライン・アセンブリでの使用：

```text
function sha256Yul(uint256 numberToHash) public view returns (bytes32) {
        assembly {
      mstore(0, numberToHash) // 0番目のメモリワードに数値を格納

      let ok := staticcall(gas(), 2, 0, 32, 0, 32)
      if iszero(ok) {
    revert(0,0)
      }
          return(0, 32)
  }.
}
```

## アドレス 0x03: ripemd160<a id="address-0x-03-ripemd-160-data"></a>

アドレス0x03はRIPEMD160ハッシュを実装している。 与えられたデータからRIPEMD160ハッシュを返す。 この関数のプロトタイプは以下の通りである：

```text
function RIPEMD160(bytes calldata data) public view returns (bytes20 h) {
  (bool ok, bytes memory out) = address(0x03).staticcall(data);
  require(ok);
  h = bytes20(abi.decode(out, (bytes32)))<< 96);
}.
```

## アドレス 0x04: datacopy(data)<a id="address-0x-04-datacopy-data"></a>

アドレス0x04はdatacopy(＝identity function)を実装している。 入力データをそのまま返す。 このプリコンパイルされたコントラクトは Solidity コンパイラではサポートされていません。 このプリコンパイルされたコントラクトを呼び出すには、インライン・アセンブリを使った以下のコードを使うことができる。

```text
function callDatacopy(bytes memory data) public returns (bytes memory) {
    bytes memory ret = new bytes(data.length);
    assembly {
        let len := mload(data)
        if iszero(call(gas, 0x04, 0, add(data, 0x20), len, add(ret,0x20), len)) {
            invalid()
        }
    }

    return ret;
}     
```

## アドレス 0x05: bigModExp(base, exp, mod\)<a id="address-0x05-bigmodexp-base-exp-mod"></a>

アドレス0x05は、`base**exp % mod`という数式を実装している。 与えられたデータから結果を返す。 このプリコンパイルされたコントラクトは Solidity コンパイラではサポートされていません。 このコンパイル済みコントラクトを呼び出すには、以下のコードを使用する。 このコンパイル済みコントラクトは任意の長さの入力をサポートしているが、以下のコードでは例として固定長の入力を使用していることに注意。

```text
function callBigModExp(bytes32 base, bytes32 exponent, bytes32 modulus) public returns (bytes32 result) {
    assembly {
        // free memory pointer
        let memPtr := mload(0x40)

        // length of base, exponent, modulus
        mstore(memPtr, 0x20)
        mstore(add(memPtr, 0x20), 0x20)
        mstore(add(memPtr, 0x40), 0x20)

        // assign base, exponent, modulus
        mstore(add(memPtr, 0x60), base)
        mstore(add(memPtr, 0x80), exponent)
        mstore(add(memPtr, 0xa0), modulus)

        // call the precompiled contract BigModExp (0x05)
        let success := call(gas, 0x05, 0x0, memPtr, 0xc0, memPtr, 0x20)
        switch success
        case 0 {
            revert(0x0, 0x0)
        } default {
            result := mload(memPtr)
        }
    }
}
```

## アドレス 0x06: bn256Add(ax, ay, bx, by)<a id="address-0x-06-bn-256-add-ax-ay-bx-by"></a>

アドレス0x06は、ネイティブの楕円曲線ポイント加算を実装している。 (ax,ay)+(bx,by)\`を表す楕円曲線の点で、(ax,ay)と(bx,by)が曲線bn256上の有効な点であるものを返す。 このプリコンパイルされたコントラクトは Solidity コンパイラではサポートされていません。 このコンパイル済みコントラクトを呼び出すには、以下のコードを使用する。

```text
function callBn256Add(bytes32 ax, bytes32 ay, bytes32 bx, bytes32 by) public returns (bytes32[2] memory result) {
    bytes32[4] memory input;
    input[0] = ax;
    input[1] = ay;
    input[2] = bx;
    input[3] = by;
    assembly {
        let success := call(gas, 0x06, 0, input, 0x80, result, 0x40)
        switch success
        case 0 {
            revert(0,0)
        }
    }
}
```

## アドレス 0x07: bn256ScalarMul(x, y, scalar)<a id="address-0x-07-bn-256-scalarmul-x-y-scalar"></a>

アドレス0x07は、スカラー値とのネイティブな楕円曲線乗算を実装している。 (x,y)が曲線bn256上の有効な曲線点であるような楕円曲線点(scalar \* (x, y)\`)を返す。 このプリコンパイルされたコントラクトは Solidity コンパイラではサポートされていません。 このコンパイル済みコントラクトを呼び出すには、以下のコードを使用する。

```text
function callBn256ScalarMul(bytes32 x, bytes32 y, bytes32 scalar) public returns (bytes32[2] memory result) {
    bytes32[3] memory input;
    input[0] = x;
    input[1] = y;
    input[2] = scalar;
    assembly {
        let success := call(gas, 0x07, 0, input, 0x60, result, 0x40)
        switch success
        case 0 {
            revert(0,0)
        }
    }
}
```

## アドレス 0x08: bn256Pairing (a1, b1, a2, b2, a3, b3, ..., ak, bk)<a id="address-0x-08-bn-256-pairing-a-1-b-1-a-2-b-2-a-3-b-3-ak-bk"></a>

アドレス0x08は、zkSNARK検証を実行するための楕円曲線パーリング操作を実装している。 詳しくは[EIP-197](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md)を参照のこと。 このプリコンパイルされたコントラクトは Solidity コンパイラではサポートされていません。 このコンパイル済みコントラクトを呼び出すには、以下のコードを使用する。

```text
function callBn256Pairing(bytes memory input) public returns (bytes32 result) {
    // input is a serialized bytes stream of (a1, b1, a2, b2, ..., ak, bk) from (G_1 x G_2)^k
    uint256 len = input.length;
    require(len % 192 == 0);
    assembly {
        let memPtr := mload(0x40)
        let success := call(gas, 0x08, 0, add(input, 0x20), len, memPtr, 0x20)
        switch success
        case 0 {
            revert(0,0)
        } default {
            result := mload(memPtr)
        }
    }
}
```

## Address 0x09: blake2F\(rounds, h, m, t, f\) <a id="address-0x-09-blake2F-rounds-h-m-t-f"></a>

アドレス0x09はBLAKE2bのF圧縮機能を実装している。 詳しくは[EIP-152](https://eips.ethereum.org/EIPS/eip-152)を参照のこと。 このプリコンパイルされたコントラクトは Solidity コンパイラではサポートされていません。 このコンパイル済みコントラクトを呼び出すには、以下のコードを使用する。

```text
function callBlake2F(uint32 rounds, bytes32[2] memory h, bytes32[4] memory m, bytes8[2] memory t, bool f) public view returns (bytes32[2] memory) {
    bytes32[2] memory output;

    bytes memory args = abi.encodePacked(rounds, h[0], h[1], m[0], m[1], m[2], m[3], t[0], t[1], f);

    assembly {
        if iszero(staticcall(not(0), 0x09, add(args, 32), 0xd5, output, 0x40)) {
            revert(0, 0)
        }
    }

    return output;
}
```

## Address 0x0A: kzg\(data\) <a id="address-0x-0a-kzg-data"></a>

アドレス0x0Aは、KZG証明の検証を所定の時点で所定の値まで実行する。 詳細は[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)を参照のこと。 このプリコンパイルされたコントラクトは Solidity コンパイラではサポートされていません。 このコンパイル済みコントラクトを呼び出すには、以下のコードを使用する。

```text
function callKzg(bytes memory data) public returns (bytes memory) {
    bytes memory ret;
    assembly {
        let len := mload(data)
        if iszero(call(gas(), 0x0a, 0, add(data, 0x20), len, 0, 0)) {
            revert (0,0)
        }
    }
    return ret;
}
```

## アドレス 0x3fd: vmLog<a id="address-0x-3fc-vmlog-str"></a>

アドレス0x3FDは、指定された文字列 `str` を特定のファイルに出力するか、ロガーモジュールに渡す。 詳細は、[debug_setVMLogTarget](../../references/json-rpc/debug/set-vm-log-target) を参照してください。 このプリコンパイルされたコントラクトはデバッグ目的でのみ使用されるべきで、Kaiaノードが起動するときに`--vmlog`オプションを有効にする必要があることに注意してください。 また、vmLogの出力を見るには、Kaiaノードのログレベルを4以上にする必要があります。 このプリコンパイルされたコントラクトは Solidity コンパイラではサポートされていません。 このコンパイル済みコントラクトを呼び出すには、以下のコードを使用する。

```text
function callVmLog(bytes memory str) public {
    address(0x3fd).call(str);
}
```

## Address 0x3fe: feePayer(\)<a id="address-0x-3fd-feepayer"></a>

アドレス 0x3FE は、実行中のトランザクションの料金支払人を返す。 このプリコンパイルされたコントラクトは Solidity コンパイラではサポートされていません。 このコンパイル済みコントラクトを呼び出すには、以下のコードを使用する。

```text
function feePayer() internal returns (address addr) {
    assembly {
        let freemem := mload(0x40)
        let start_addr := add(freemem, 12)
        if iszero(call(gas, 0x3fe, 0, 0, 0, start_addr, 20)) {
          invalid()
        }
        addr := mload(freemem)
    }
}
```

## Address 0x3ff: validateSender(Γ)<a id="address-0x-3fe-validatesender"></a>

アドレス0x3FFは、メッセージとともに送信者の署名を検証する。 Kaiaは[鍵ペアをアドレスから切り離す](../accounts.md#decoupling-key-pairs-from-addresses)ので、署名が対応する送信者によって適切に署名されていることを検証する必要がある。 そのために、このコンパイル済みコントラクトは3つのパラメーターを受け取る：

- 公開鍵を取得するための送信者のアドレス
- 署名の生成に使われるメッセージ・ハッシュ。
- 送信者の秘密鍵によって、与えられたメッセージ・ハッシュで署名された署名。

プリコンパイルされたコントラクトは、与えられた署名が送信者の秘密鍵によって適切に署名されていることを検証する。 Kaiaはネイティブにマルチシグネチャをサポートしていることに注意してください。 署名は65バイト長でなければならない。

```text
function ValidateSender(address sender, bytes32 msgHash, bytes sigs) public returns (bool) {
    require(sigs.length % 65 == 0);
    bytes memory data = new bytes(20+32+sigs.length);
    uint idx = 0;
    uint i;
    for( i = 0; i < 20; i++) {
        data[idx++] = (bytes20)(sender)[i];
    }
    for( i = 0; i < 32; i++ ) {
        data[idx++] = msgHash[i];
    }
    for( i = 0; i < sigs.length; i++) {
        data[idx++] = sigs[i];
    }
    assembly {
        // skip length header.
        let ptr := add(data, 0x20)
        if iszero(call(gas, 0x3ff, 0, ptr, idx, 31, 1)) {
          invalid()
        }
        return(0, 32)
    }
}
```

## ハードフォークの変更<a id="hardfork-changes"></a>

| ハードフォーク    | 新商品                                          | 変更点                                                                                                                                                |
| ---------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| カンクンEVM    | kzg (0x0a) コンパイル済み契約書     |                                                                                                                                                    |
| コレ         |                                              | modExp (0x05) プリコンパイルされた契約は、新しいガス<br/>計算ロジックを使用する。 計算コストも影響する。 <br/>より正確になる。                                                    |
| イスタンブールEVM | blake2f (0x09) コンパイル済み契約書 | kaiaのプリコンパイル契約アドレスは、<br/>、0x09,0x0A,0x0Bから0x3FD,0x3FE,0x3FFに移動されました。<br/>詳細は、以下の[プリコンパイル契約アドレス変更表](#precompiled-contract-address-change)を参照してください。 |

### 契約書住所変更<a id="precompiled-contract-address-change"></a>

| コンパイル済み契約書 | アドレス **BEFORE** イスタンブールEVMハードフォーク | アドレス **AFTER** イスタンブールEVMハードフォーク |
| :--------- | :-------------------------------- | :------------------------------- |
| vmLog      | 0x09                              | 0x3fd                            |
| feePayer   | 0x0a                              | 0x3fe                            |
| バリデート送信者   | 0x0b                              | 0x3ff                            |
