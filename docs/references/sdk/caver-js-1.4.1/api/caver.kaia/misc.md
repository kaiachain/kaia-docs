# Miscellaneous

## sha3 <a id="sha3"></a>

```javascript
caver.kaia.sha3(data[, callback])
```

Returns the Keccak-256 hash (not the standardized SHA3-256) of the given data.


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| data | String | The data to convert into a SHA3 hash. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `String` - The SHA3 result of the given data.

**Example**

```javascript
> caver.kaia.sha3("0x11223344").then(console.log);
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```
