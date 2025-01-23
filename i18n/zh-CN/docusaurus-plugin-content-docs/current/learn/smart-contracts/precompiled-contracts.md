# 预编合同

Kaia 提供了几种有用的预编译合同，这些合同都不会改变国家。
这些合约作为原生实现在平台本身中实施，这意味着它们是 Kaia 客户端规范的一部分。
从地址 0x01 到 0x0A 的预编译合约与以太坊中的合约相同。
预编译的功用可分为四大类：
。 椭圆曲线数字签名恢复
. 哈希方法
. 存储器复制
. 为 zk 证明启用椭圆曲线数学的方法。
Kaia 还实现了从 0x3FD 到 0x3FF 的预编译合约，以支持新的 Kaia 功能。

:::note

伊斯坦布尔 EVM 硬分叉前部署的合同应使用原始地址。

- 情况 1）Kairos 中块号为 `#75373310` 的合约将 0x09、0x0a 和 0x0b 分别作为 vmLog、feePayer 和 validateSender 的地址，因此无法使用 blake2f。
- 案例 2）Kairos 中块号为 `#75373314` 的合约将 0x09 识别为 blake2f 的地址，并将 0x3fd、0x3fe 和 0xff 识别为 vmLog、feePayer 和 validateSender 的地址。

预编译的合同相关硬分叉变更可在本页底部找到。 转到 [Hardfork Changes](#hardfork-changes)。

:::

## 地址 0x01: ecrecover\(hash, v, r, s\)<a id="address-0x-01-ecrecover-hash-v-r-s"></a>

地址 0x01 实现了 ecrecover。 它通过计算 ECDSA 的恢复函数来返回给定签名的地址。 它是唯一带有 solidity 封装的预编译器。 其功能原型如下

```text
function ecRecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) public view returns (address) {
        address r = ecrecover(hash, v, r, s); // prototype function 
        require(r != address(0), "signature is invalid");
} // solidity wrapper
```

## 地址 0x02: sha256\(data\)<a id="address-0x-02-sha-256-data"></a>

地址 0x02 实现了 SHA256 散列。 它根据给定数据返回 SHA256 哈希值。 它主要用于比特币和 Zcash，而以太坊则使用 Keccak256。 其功能原型如下

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
      mstore(0, numberToHash) // store number in zeroth memory word

      let ok := staticcall(gas(), 2, 0, 32, 0, 32)
      if iszero(ok) {
    revert(0,0)
      }
          return(0, 32)
  }
}
```

## 地址 0x03: ripemd160\(data\)<a id="address-0x-03-ripemd-160-data"></a>

地址 0x03 实现了 RIPEMD160 哈希算法。 它根据给定数据返回 RIPEMD160 哈希值。 其功能原型如下

```text
函数 RIPEMD160(bytes calldata data) 公共视图返回 (bytes20 h) {
  (bool ok, bytes memory out) = address(0x03).staticcall(data);
  require(ok);
  h = bytes20(abi.decode(out, (bytes32))<< 96);
}
```

## 地址 0x04: datacopy\(data\)<a id="address-0x-04-datacopy-data"></a>

地址 0x04 实现了数据复制（即身份识别功能）。 它直接返回输入数据，不做任何修改。 Solidity 编译器不支持这种预编译合同。 可以使用以下带有内联程序集的代码来调用这个预编译合同。

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

地址 0x05 实现了公式`base**exp%mod`。 它根据给定数据返回结果。 Solidity 编译器不支持这种预编译合同。 下面的代码可以用来调用这个预编译合同。 请注意，尽管预编译合同支持任意长度的输入，但下面的代码以固定长度的输入为例。

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

地址 0x06 实现了本地椭圆曲线点加法。 它返回一个代表 `(ax, ay) + (bx, by)` 的椭圆曲线点，这样 \(ax, ay\) 和 \(bx, by\) 是曲线 bn256 上的有效点。 Solidity 编译器不支持这种预编译合同。 下面的代码可以用来调用这个预编译合同。

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

地址 0x07 实现了与标量值的本地椭圆曲线乘法。 它返回一个代表 `scalar * (x, y)`，并且 \(x, y\) 是 bn256 曲线上一个有效曲线点的椭圆曲线点。 Solidity 编译器不支持这种预编译合同。 下面的代码可以用来调用这个预编译合同。

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

地址 0x08 实现了椭圆曲线解析操作，以执行 zkSNARK 验证。 更多信息，请参见 [EIP-197](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md)。 Solidity 编译器不支持这种预编译合同。 下面的代码可以用来调用这个预编译合同。

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

地址 0x09 实现了 BLAKE2b F 压缩功能。 更多信息，请参阅 [EIP-152](https://eips.ethereum.org/EIPS/eip-152)。 Solidity 编译器不支持这种预编译合同。 下面的代码可以用来调用这个预编译合同。

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

地址 0x0A 实现了 KZG 验证，在给定点验证到给定值。 更多信息，请参阅 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)。 Solidity 编译器不支持这种预编译合同。 下面的代码可以用来调用这个预编译合同。

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

地址 0x3FD 将指定的字符串 `str` 打印到特定文件或传递给日志记录器模块。 更多信息，请参阅 [debug_setVMLogTarget](../../references/json-rpc/debug/set-vm-log-target)。 请注意，该预编译合约只能用于调试目的，并且需要在 Kaia 节点启动时启用 `--vmlog` 选项。 此外，Kaia 节点的日志级别应为 4 或更高，以便查看 vmLog 的输出。 Solidity 编译器不支持这种预编译合同。 下面的代码可以用来调用这个预编译合同。

```text
function callVmLog(bytes memory str) public {
    address(0x3fd).call(str);
}
```

## 地址 0x3fe: feePayer\(\)<a id="address-0x-3fd-feepayer"></a>

地址 0x3FE 返回执行交易的付费方。 Solidity 编译器不支持这种预编译合同。 下面的代码可以用来调用这个预编译合同。

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

地址 0x3FF 验证发件人与报文的签名。 由于 Kaia [将密钥对与地址解耦](../accounts.md#decoupling-key-pairs-from-addresses)，因此需要验证签名是否由相应的发送方正确签名。 为此，这份预编译合同会收到三个参数：

- 用于获取公钥的发件人地址
- 用于生成签名的信息哈希值
- 由发送者私钥和给定信息哈希值签名的签名

预编译合同验证给定签名是否由发送者的私钥正确签名。 请注意，Kaia 本机支持多签名，这意味着可以有多个签名。 签名长度必须为 65 字节。

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

## 硬叉变化<a id="hardfork-changes"></a>

| 硬叉        | 新项目                                     | 变化                                                                                                                       |
| --------- | :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| 坎昆 EVM    | kzg (0x0a) 预编译合同     |                                                                                                                          |
| 韩国        |                                         | modExp (0x05) 预编译合同使用新的气体<br/>计算逻辑。 计算成本也受到影响。 <br/>更加准确。                                             |
| 伊斯坦布尔 EVM | blake2f (0x09) 预编译合同 | <br/>kaia 预编译合同地址已从 0x09,0x0A,0x0B移动<br/>至 0x3FD,0x3FE,0x3FF。详情请参见下面的 [预编译合同地址更改表](#precomiled-contract-address-change)。 |

### 预编合同地址变更<a id="precompiled-contract-address-change"></a>

| 预编合同     | 伊斯坦布尔 EVM 硬分叉前\*\*地址 | 地址 **后** 伊斯坦布尔 EVM 硬叉子 |
| :------- | :------------------- | :--------------------- |
| vmLog    | 0x09                 | 0x3fd                  |
| feePayer | 0x0a                 | 0x3fe                  |
| 验证发件人    | 0x0b                 | 0x3ff                  |
