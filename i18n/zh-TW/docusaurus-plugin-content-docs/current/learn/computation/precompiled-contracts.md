# 預編合同

Kaia 提供了幾種有用的預編譯合同，這些合同都不會改變國家。
這些合約作為原生實現在平臺本身中實施，這意味著它們是 Kaia 客戶端規範的一部分。
從地址 0x01 到 0x0A 的預編譯合約與以太坊中的合約相同。
預編譯的功用可分為四大類：
。 橢圓曲線數字簽名恢復
. 哈希方法
. 存儲器複製
. 為 zk 證明啟用橢圓曲線數學的方法。
Kaia 還實現了從 0x3FD 到 0x3FF 的預編譯合約，以支持新的 Kaia 功能。

:::note

伊斯坦布爾 EVM 硬分叉前部署的合同應使用原始地址。

- 情況 1）Kairos 中塊號為 `#75373310` 的合約將 0x09、0x0a 和 0x0b 分別作為 vmLog、feePayer 和 validateSender 的地址，因此無法使用 blake2f。
- 案例 2）Kairos 中塊號為 `#75373314` 的合約將 0x09 識別為 blake2f 的地址，並將 0x3fd、0x3fe 和 0xff 識別為 vmLog、feePayer 和 validateSender 的地址。

預編譯的合同相關硬分叉變更可在本頁底部找到。 轉到 [Hardfork Changes](#hardfork-changes)。

:::

## 地址 0x01: ecrecover\(hash, v, r, s\)<a id="address-0x-01-ecrecover-hash-v-r-s"></a>

地址 0x01 實現了 ecrecover。 它通過計算 ECDSA 的恢復函數來返回給定簽名的地址。 它是唯一帶有 solidity 封裝的預編譯器。 其功能原型如下

```text
function ecRecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) public view returns (address) {
        address r = ecrecover(hash, v, r, s); // prototype function 
        require(r != address(0), "signature is invalid");
} // solidity wrapper
```

## 地址 0x02: sha256\(data\)<a id="address-0x-02-sha-256-data"></a>

地址 0x02 實現了 SHA256 散列。 它根據給定數據返回 SHA256 哈希值。 它主要用於比特幣和 Zcash，而以太坊則使用 Keccak256。 其功能原型如下

```text
function sha256(uint256 numberToHash) public view returns (bytes32 hash) {
      (bool ok, bytes memory hashData) = address(0x02).staticcall(abi.encode(numberToHash));
      require(ok);
      hash = abi.decode(hashData, (bytes32));
}
```

在 Yul / Inline Assembly 中的使用：

```text
function sha256Yul(uint256 numberToHash) public view returns (bytes32) {
        assembly {
	    mstore(0, numberToHash) // store number in the zeroth memory word

	    let ok := staticcall(gas(), 2, 0, 32, 0, 32)
	    if iszero(ok) {
		revert(0,0)
	    }
	        return(0, 32)
	}
}
```

## 地址 0x03: ripemd160\(data\)<a id="address-0x-03-ripemd-160-data"></a>

地址 0x03 實現了 RIPEMD160 哈希算法。 它根據給定數據返回 RIPEMD160 哈希值。 其功能原型如下

```text
function RIPEMD160(bytes calldata data) public view returns (bytes20 h) {
	(bool ok, bytes memory out) = address(0x03).staticcall(data);
	require(ok);
	h = bytes20(abi.decode(out, (bytes32)) << 96);
}
```

## 地址 0x04: datacopy\(data\)<a id="address-0x-04-datacopy-data"></a>

地址 0x04 實現了數據複製（即身份識別功能）。 它直接返回輸入數據，不做任何修改。 Solidity 編譯器不支持這種預編譯合同。 可以使用以下帶有內聯程序集的代碼來調用這個預編譯合同。

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

## 地址 0x05： bigModExp\(base, exp, mod\)<a id="address-0x05-bigmodexp-base-exp-mod"></a>

地址 0x05 實現了公式`base**exp%mod`。 它根據給定數據返回結果。 Solidity 編譯器不支持這種預編譯合同。 下面的代碼可以用來調用這個預編譯合同。 請注意，儘管預編譯合同支持任意長度的輸入，但下面的代碼以固定長度的輸入為例。

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

## 地址 0x06： bn256Add\(ax, ay, bx, by\)<a id="address-0x-06-bn-256-add-ax-ay-bx-by"></a>

地址 0x06 實現了本地橢圓曲線點加法。 它返回一個代表 `(ax, ay) + (bx, by)` 的橢圓曲線點，這樣 \(ax, ay\) 和 \(bx, by\) 是曲線 bn256 上的有效點。 Solidity 編譯器不支持這種預編譯合同。 下面的代碼可以用來調用這個預編譯合同。

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

## 地址 0x07： bn256ScalarMul\(x, y, scalar\)<a id="address-0x-07-bn-256-scalarmul-x-y-scalar"></a>

地址 0x07 實現了與標量值的本地橢圓曲線乘法。 它返回一個代表 `scalar * (x, y)`，並且 \(x, y\) 是 bn256 曲線上一個有效曲線點的橢圓曲線點。 Solidity 編譯器不支持這種預編譯合同。 下面的代碼可以用來調用這個預編譯合同。

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

## 地址 0x08： bn256Pairing\(a1, b1, a2, b2, a3, b3, ..., ak, bk\)<a id="address-0x-08-bn-256-pairing-a-1-b-1-a-2-b-2-a-3-b-3-ak-bk"></a>

地址 0x08 實現了橢圓曲線解析操作，以執行 zkSNARK 驗證。 更多信息，請參見 [EIP-197](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md)。 Solidity 編譯器不支持這種預編譯合同。 下面的代碼可以用來調用這個預編譯合同。

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

地址 0x09 實現了 BLAKE2b F 壓縮功能。 更多信息，請參閱 [EIP-152](https://eips.ethereum.org/EIPS/eip-152)。 Solidity 編譯器不支持這種預編譯合同。 下面的代碼可以用來調用這個預編譯合同。

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

地址 0x0A 實現了 KZG 驗證，在給定點驗證到給定值。 更多信息，請參閱 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)。 Solidity 編譯器不支持這種預編譯合同。 下面的代碼可以用來調用這個預編譯合同。

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

## 地址 0x3fd: vmLog\(str\)<a id="address-0x-3fc-vmlog-str"></a>

地址 0x3FD 將指定的字符串 `str` 打印到特定文件或傳遞給日誌記錄器模塊。 更多信息，請參閱 [debug_setVMLogTarget](../../../references/json-rpc/debug/set-vm-log-target) 。 請注意，該預編譯合約只能用於調試目的，並且需要在 Kaia 節點啟動時啟用 `--vmlog` 選項。 此外，Kaia 節點的日誌級別應為 4 或更高，以便查看 vmLog 的輸出。 Solidity 編譯器不支持這種預編譯合同。 下面的代碼可以用來調用這個預編譯合同。

```text
function callVmLog(bytes memory str) public {
    address(0x3fd).call(str);
}
```

## 地址 0x3fe: feePayer\(\)<a id="address-0x-3fd-feepayer"></a>

地址 0x3FE 返回執行交易的付費方。 Solidity 編譯器不支持這種預編譯合同。 下面的代碼可以用來調用這個預編譯合同。

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

## 地址 0x3ff: validateSender\(\)<a id="address-0x-3fe-validatesender"></a>

地址 0x3FF 驗證發件人與報文的簽名。 由於 Kaia [將密鑰對與地址解耦](../accounts.md#decoupling-key-pairs-from-addresses)，因此需要驗證簽名是否由相應的發送方正確簽名。 為此，這份預編譯合同會收到三個參數：

- 用於獲取公鑰的發件人地址
- 用於生成簽名的信息哈希值
- 由發送者私鑰和給定信息哈希值簽名的簽名

預編譯合同驗證給定簽名是否由發送者的私鑰正確簽名。 請注意，Kaia 本機支持多簽名，這意味著可以有多個簽名。 簽名長度必須為 65 字節。

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

## 硬叉變化<a id="hardfork-changes"></a>

| 硬叉        | 新項目                                     | 變化                                                                                                                       |
| --------- | :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| 坎昆 EVM    | kzg (0x0a) 預編譯合同     |                                                                                                                          |
| 韓國        |                                         | modExp (0x05) 預編譯合同使用新的氣體<br/>計算邏輯。 計算成本也受到影響。 <br/>更加準確。                                             |
| 伊斯坦布爾 EVM | blake2f (0x09) 預編譯合同 | <br/>kaia 預編譯合同地址已從 0x09,0x0A,0x0B移動<br/>至 0x3FD,0x3FE,0x3FF。詳情請參見下面的 [預編譯合同地址更改表](#precomiled-contract-address-change)。 |

### 預編合同地址變更<a id="precompiled-contract-address-change"></a>

| 預編合同     | 伊斯坦布爾 EVM 硬分叉前\*\*地址 | 地址 **後** 伊斯坦布爾 EVM 硬叉子 |
| :------- | :------------------- | :--------------------- |
| vmLog    | 0x09                 | 0x3fd                  |
| feePayer | 0x0a                 | 0x3fe                  |
| 驗證發件人    | 0x0b                 | 0x3ff                  |
