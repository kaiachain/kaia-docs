# Tạo hồ sơ

## debug_blockProfile <a id="debug_blockprofile"></a>

Bật hồ sơ khối trong khoảng thời gian nhất định và ghi dữ liệu hồ sơ vào đĩa.
disk. Nó sử dụng tốc độ tạo hồ sơ là 1 để có thông tin chính xác nhất. Nếu yêu cầu một tốc độ khác, hãy thiết lập tỷ lệ và ghi theo cách thủ công bằng cách sử dụng [debug_writeBlockProfile](#debug_writeblockprofile).
rate is desired, set the rate and write the profile manually using
[debug_writeBlockProfile](#debug_writeblockprofile).

|    Máy khách    | Gọi phương pháp                                                |
| :-------------: | -------------------------------------------------------------- |
| Bảng điều khiển | `debug.blockProfile(file, seconds)`                            |
|       RPC       | `{"method": "debug_blockProfile", "params": [string, number]}` |

**Tham số**

| Tên     | type  | Mô tả                                     |
| ------- | ----- | ----------------------------------------- |
| tệp tin | chuỗi | Tên tệp cho kết quả cấu hình.             |
| giây    | int   | Khoảng thời gian cấu hình tính bằng giây. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.blockProfile("block.profile", 10)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_blockProfile","params":["block.profile", 10],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_cpuProfile <a id="debug_cpuprofile"></a>

Bật cấu hình CPU trong khoảng thời gian nhất định và ghi dữ liệu hồ sơ vào đĩa.

|    Máy khách    | Gọi phương pháp                                              |
| :-------------: | ------------------------------------------------------------ |
| Bảng điều khiển | `debug.cpuProfile(file, seconds)`                            |
|       RPC       | `{"method": "debug_cpuProfile", "params": [string, number]}` |

**Tham số**

| Tên     | type  | Mô tả                                     |
| ------- | ----- | ----------------------------------------- |
| tệp tin | chuỗi | Tên tệp cho kết quả cấu hình.             |
| giây    | int   | Khoảng thời gian cấu hình tính bằng giây. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.cpuProfile("block.profile", 10)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_cpuProfile","params":["block.profile", 10],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_mutexProfile <a id="debug_mutexprofile"></a>

Bật cấu hình mutex trong nsec (nano giây) và ghi dữ liệu hồ sơ vào tệp.
Nó sử dụng tốc độ tạo hồ sơ là 1 để có thông tin chính xác nhất. Nếu muốn một tốc độ khác, hãy thiết lập tốc độ và ghi theo cách thủ công.

|    Máy khách    | Gọi phương pháp                                                |
| :-------------: | -------------------------------------------------------------- |
| Bảng điều khiển | `debug.mutexProfile(file, seconds)`                            |
|       RPC       | `{"method": "debug_mutexProfile", "params": [string, number]}` |

**Tham số**

| Tên     | Loại | Mô tả                                     |
| ------- | ----- | ----------------------------------------- |
| tệp tin | chuỗi | Tên tệp cho kết quả cấu hình.             |
| giây    | int   | Khoảng thời gian cấu hình tính bằng giây. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.mutexProfile("mutex.profile", 10)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_mutexProfile","params":["mutex.profile", 10],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_isPProfRunning <a id="debug_ispprofrunning"></a>

Trả về `true` nếu máy chủ HTTP pprof đang chạy và ngược lại sẽ là `false`.

|    Máy khách    | Gọi phương pháp                                    |
| :-------------: | -------------------------------------------------- |
| Bảng điều khiển | `debug.isPProfRunning()`                           |
|       RPC       | `{"method": "debug_isPProfRunning", "params": []}` |

**Tham số**

Không có

**Giá trị trả về**

| type | Mô tả                                                               |
| ---- | ------------------------------------------------------------------- |
| bool | `true` nếu máy chủ HTTP pprof đang chạy và ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

```javascript
> debug.isPProfRunning()
false
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_isPProfRunning","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## debug_setBlockProfileRate <a id="debug_setblockprofilerate"></a>

Đặt tốc độ (tính bằng mẫu/giây) thu thập dữ liệu hồ sơ khối goroutine. Một tốc độ khác 0 cho phép tạo hồ sơ khối, đặt thành 0 sẽ dừng cấu hình.
non-zero rate enables block profiling, setting it to zero stops the profile.
Dữ liệu hồ sơ được thu thập có thể được ghi bằng cách sử dụng [debug_writeBlockProfile](#debug_writeblockprofile).
[debug_writeBlockProfile](#debug_writeblockprofile).

|    Máy khách    | Gọi phương pháp                                               |
| :-------------: | ------------------------------------------------------------- |
| Bảng điều khiển | `debug.setBlockProfileRate(rate)`                             |
|       RPC       | `{"method": "debug_setBlockProfileRate", "params": [number]}` |

**Tham số**

| Tên    | Loại | Mô tả                               |
| ------ | ----- | ----------------------------------- |
| tốc độ | int   | Tốc độ cấu hình tính bằng mẫu/giây. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.setBlockProfileRate(1)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setBlockProfileRate","params":['3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_startCPUProfile <a id="debug_startcpuprofile"></a>

Bật cấu hình CPU vô thời hạn, ghi vào tệp đã cho.

|    Máy khách    | Gọi phương pháp                                           |
| :-------------: | --------------------------------------------------------- |
| Bảng điều khiển | `debug.startCPUProfile(file)`                             |
|       RPC       | `{"method": "debug_startCPUProfile", "params": [string]}` |

**Tham số**

| Tên     | type  | Mô tả                        |
| ------- | ----- | ---------------------------- |
| tệp tin | chuỗi | Tên tệp cho đầu ra cấu hình. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.startCPUProfile("cpu.profile")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startCPUProfile","params":["cpu.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_stopCPUProfile <a id="debug_stopcpuprofile"></a>

Tắt cấu hình CPU.

|    Máy khách    | Gọi phương pháp                                    |
| :-------------: | -------------------------------------------------- |
| Bảng điều khiển | `debug.stopCPUProfile()`                           |
|       RPC       | `{"method": "debug_stopCPUProfile", "params": []}` |

**Tham số**

Không có

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.stopCPUProfile()
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopCPUProfile","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_startPProf <a id="debug_startpprof"></a>

Khởi động máy chủ HTTP pprof.  Máy chủ pprof đang chạy có thể được truy cập bởi (khi cấu hình mặc định, ví dụ như localhost: 6060 được sử dụng):
(when the default configuration, i.e., localhost:6060, is used):

- http\://localhost:6060/debug/pprof (đối với kết quả pprof)
- http\://localhost:6060/memsize/ (đối với các báo cáo dung lượng bộ nhớ)
- http\://localhost:6060/debug/vars (đối với các số liệu)

|    Máy khách    | Gọi phương pháp                                              |
| :-------------: | ------------------------------------------------------------ |
| Bảng điều khiển | `debug.startPProf(address, port)`                            |
|       RPC       | `{"method": "debug_startPProf", "params": [string, number]}` |

**Tham số**

| Tên     | Loại | Mô tả                                                                                                       |
| ------- | ----- | ----------------------------------------------------------------------------------------------------------- |
| address | chuỗi | (tùy chọn) giao diện nghe máy chủ HTTP pprof (mặc định: "127.0.0.1"). |
| cổng    | int   | (tùy chọn) cổng nghe máy chủ HTTP pprof (mặc định: 6060).             |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
# To start the pprof server at 127.0.0.1:6060
> debug.startPProf()
null

# To start the pprof server at localhost:12345
> debug.startPProf("localhost", 12345)
null
```

HTTP RPC

```shell
# To start the pprof server at localhost:6060
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startPProf","params":["localhost", 6060],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_stopPProf <a id="debug_stoppprof"></a>

Dừng máy chủ HTTP pprof.

|    Máy khách    | Gọi phương pháp                               |
| :-------------: | --------------------------------------------- |
| Bảng điều khiển | `debug.stopPProf()`                           |
|       RPC       | `{"method": "debug_stopPProf", "params": []}` |

**Tham số**

Không có

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.stopPProf()
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopPProf","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_writeBlockProfile <a id="debug_writeblockprofile"></a>

Ghi hồ sơ khối goroutine vào tệp đã cho.

|    Máy khách    | Gọi phương pháp                                             |
| :-------------: | ----------------------------------------------------------- |
| Bảng điều khiển | `debug.writeBlockProfile(file)`                             |
|       RPC       | `{"method": "debug_writeBlockProfile", "params": [string]}` |

**Tham số**

| Tên     | type  | Mô tả                        |
| ------- | ----- | ---------------------------- |
| tệp tin | chuỗi | Tên tệp cho đầu ra cấu hình. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.writeBlockProfile("block.profile")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeBlockProfile","params":["block.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_writeMemProfile <a id="debug_writememprofile"></a>

Ghi cấu hình phân bổ vào tệp đã cho.  Lưu ý rằng tốc độ tạo hồ sơ không thể được đặt thông qua API, mà phải được đặt trên dòng lệnh bằng cách sử dụng cờ `--memprofilerate`.
cannot be set through the API, it must be set on the command line using the
`--memprofilerate` flag.

|    Máy khách    | Gọi phương pháp                                           |
| :-------------: | --------------------------------------------------------- |
| Bảng điều khiển | `debug.writeMemProfile(file)`                             |
|       RPC       | `{"method": "debug_writeMemProfile", "params": [string]}` |

**Tham số**

| Tên     | type  | Mô tả                        |
| ------- | ----- | ---------------------------- |
| tệp tin | chuỗi | Tên tệp cho đầu ra cấu hình. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.writeMemProfile("mem.profile")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeMemProfile","params":["mem.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_writeMutexProfile <a id="debug_writemutexprofile"></a>

Ghi hồ sơ khối goroutine vào tệp đã cho.

|    Máy khách    | Gọi phương pháp                                             |
| :-------------: | ----------------------------------------------------------- |
| Bảng điều khiển | `debug.writeMutexProfile(file)`                             |
|       RPC       | `{"method": "debug_writeMutexProfile", "params": [string]}` |

**Tham số**

| Tên     | type  | Mô tả                        |
| ------- | ----- | ---------------------------- |
| tệp tin | chuỗi | Tên tệp cho đầu ra cấu hình. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.writeMutexProfile("mutex.profile")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeMutexProfile","params":["mutex.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
