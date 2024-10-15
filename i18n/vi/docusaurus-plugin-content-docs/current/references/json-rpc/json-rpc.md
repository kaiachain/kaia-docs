# Tham chiếu API RPC

Tài liệu này giải thích cách sử dụng API Klaytn. Hầu hết các API ngoại trừ API Toolkit đều hỗ trợ các giao thức từ xa (RPC, Websocket) và Bảng điều khiển JavaScript Klaytn. Tài liệu này được viết bằng `ken` làm ví dụ nhưng hầu hết các API cũng có thể được sử dụng trên `kcn` và `kpn`.

**LƯU Ý**: Vì một số API không hỗ trợ cả giao thức từ xa và bảng điều khiển Klaytn JavaScript, nên các API có sẵn trong giao thức từ xa chủ yếu sẽ được ghi lại. Phần còn lại của API sẽ được ghi lại sau.

## Kích hoạt API <a id="enabling-apis"></a>

Để cung cấp API qua các điểm cuối Klaytn RPC, vui lòng chỉ định chúng bằng đối số dòng lệnh `--${interface}api` trong đó `${interface}` có thể là `rpc` cho điểm cuối HTTP hoặc `ws` cho điểm cuối WebSocket.

`ipc` cung cấp tất cả các API trên socket unit (Unix) hoặc điểm cuối ống dẫn kênh truyền có tên (Windows) mà không có bất kỳ cờ báo nào.

Bạn có thể khởi chạy nút Klaytn với các API cụ thể mà bạn muốn thêm như ví dụ bên dưới. Nhưng hãy nhớ rằng bạn không thể thay đổi API sau khi khởi chạy nút.

Ví dụ) khởi chạy một nút Klaytn có bật các mô-đun `klay` và `net`:

```bash
$ ken --rpcapi klay,net --rpc --{other options}
```

Giao diện HTTP RPC phải được bật bằng cách sử dụng cờ báo `--rpc`.

**LƯU Ý**: Việc cung cấp API qua giao diện HTTP (`rpc`) hoặc WebSocket (`ws`) sẽ cấp quyền truy cập cho mọi người vào các API có thể truy cập giao diện này (DApps, trình duyệt tab, v.v.). Hãy thận trọng với những API bạn bật. Theo mặc định, Klay bật tất cả các API trên giao diện IPC (`ipc`) nhưng đối với `rpc` và `ws` các mô-đun bắt buộc phải được bật.

Để xác định API mà giao diện cung cấp, có thể gọi ra phương pháp `mô-đun` JSON-RPC. Ví dụ, trên giao diện `rpc`:

**IPC**

```bash
$ echo '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' | nc -U klay.ipc
```

**HTTP**

```bash
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' https://public-en-baobab.klaytn.net
```

sẽ cung cấp cho bạn tất cả các mô-đun đã kích hoạt bao gồm cả số phiên bản:

```text
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "admin":"1.0",
      "debug":"1.0",
      "istanbul":"1.0",
      "klay":"1.0",
      "eth":"1.0",
      "miner":"1.0",
      "net":"1.0",
      "personal":"1.0",
      "rpc":"1.0",
      "txpool":"1.0",
      "web3":"1.0"
   }
}
```

## Disabling unsafe debug APIs <a id="disabling-unsafe-debug-apis"></a>

Some debug namespace APIs are unsafe/unappropriate to be opened to public.
We recommend you to provide the debug namespace APIs to authorized users only.
However, if you want to maintain a public EN and provide debug namespace APIs to the public, we strongly recommend you to set the `rpc.unsafe-debug.disable` flag which will disable APIs that are unsafe/unappropriate to be opened to the public and enable only a subset of the debug namespace APIs.
we strongly recommend you to set the `rpc.unsafe-debug.disable` flag which will disable APIs
that are unsafe/unappropriate to be opened to the public and enable only a subset of the debug namespace APIs.

All other debug namespace APIs **EXCEPT FOR** the following APIs are restricted with `rpc.unsafe-debug.disable` flag:

- [VM Tracing](./debug/tracing.md) APIs, however with limited functionality (only [pre-defined tracers](./debug/tracing.md#tracing-options) are allowed)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

To set the `rpc.unsafe-debug.disable` flag, append the following line in the `kend.conf` file.

```
ADDITIONAL="$ADDITIONAL --rpc.unsafe-debug.disable"
```
