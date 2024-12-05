# Ghi bản ghi

## debug_backtraceAt <a id="debug_backtraceat"></a>

Thiết lập vị trí truy nguyên bản ghi. Khi một vị trí truy nguyên được thiết lập và một thông báo bản ghi được phát ra tại vị trí đó, ngăn xếp của goroutine đang thực thi câu lệnh bản ghi sẽ được in ra `stderr`.
message is emitted at that location, the stack of the goroutine executing the
log statement will be printed to `stderr`.

|    Máy khách    | Gọi phương pháp                                       |
| :-------------: | ----------------------------------------------------- |
| Bảng điều khiển | `debug.backtraceAt(location)`                         |
|       RPC       | `{"method": "debug_backtraceAt", "params": [string]}` |

**Tham số**

| Tên    | Loại | Mô tả                                                            |
| ------ | ----- | ---------------------------------------------------------------- |
| vị trí | chuỗi | Vị trí truy nguyên bản ghi được chỉ định là `<filename>:<line>`. |

**Giá trị trả về**

Không có

**Ví dụ**

```javascript
> debug.backtraceAt("server.go:443")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_backtraceAt","params":["server.go:443"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_setVMLogTarget <a id="debug_setvmlogtarget"></a>

Thiết lập mục tiêu đầu ra của hợp đồng đã lập trước vmlog.  Khi mục tiêu đầu ra là một tệp thì bản ghi từ lệnh gọi `vmlog` trong hợp đồng thông minh sẽ được ghi vào `DATADIR/log/vm.log`.
is a file, logs from `vmlog` calls in smart contracts will be written to
`DATADIR/log/vm.log`.  `DATADIR` ở đây là thư mục được chỉ định bởi `--datadir` khi khởi chạy `klay`.
when launching `klay`.  Mặt khác, mục tiêu đầu ra là `stdout`, bản ghi sẽ được hiển thị như một thông báo gỡ lỗi trên đầu ra tiêu chuẩn.
will be displayed like a debug message on the standard output.

|    Máy khách    | Gọi phương pháp                                          |
| :-------------: | -------------------------------------------------------- |
| Bảng điều khiển | `debug.setVMLogTarget(target)`                           |
|       RPC       | `{"method": "debug_setVMLogTarget", "params": [number]}` |

**Tham số**

| Tên      | Loại | Mô tả                                                                                                                  |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------- |
| mục tiêu | int   | Mục tiêu đầu ra (0: không có đầu ra, 1: tệp, 2: stdout, 3: cả hai) (mặc định: 0) |

**Giá trị trả về**

| type  | Mô tả                                                                        |
| ----- | ---------------------------------------------------------------------------- |
| chuỗi | Mục tiêu đầu ra.  Xem các ví dụ bên dưới để biết các giá trị trả về thực tế. |

**Ví dụ**

Bảng điều khiển

```javascript
> debug.setVMLogTarget(0)
"no output"

> debug.setVMLogTarget(1)
"file"

> debug.setVMLogTarget(2)
"stdout"

> debug.setVMLogTarget(3)
"both file and stdout"

> debug.setVMLogTarget(4)
Error: target should be between 0 and 3
    at web3.js:3239:20
    at web3.js:6447:15
    at web3.js:5181:36
    at <anonymous>:1:1
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setVMLogTarget","params":[3],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"both file and stdout"}
```

## debug_verbosity <a id="debug_verbosity"></a>

Thiết lập giới hạn mức độ chi tiết ghi bản ghi. Ghi bản ghi thông báo với cấp độ lên đến và bao gồm mức đã cho sẽ được in ra.
the given level will be printed.

(Cấp độ: 0=crit, 1=lỗi, 2=cảnh báo, 3=thông tin, 4=gỡ lỗi, 5=truy vết)

Có thể tăng mức độ chi tiết của các gói và tệp nguồn riêng lẻ bằng cách sử dụng `debug_vmodule`.
can be raised using `debug_vmodule`.

|    Máy khách    | Gọi phương pháp                                   |
| :-------------: | ------------------------------------------------- |
| Bảng điều khiển | `debug.verbosity(level)`                          |
|       RPC       | `{"method": "debug_vmodule", "params": [number]}` |

**Tham số**

| Tên    | type | Mô tả                        |
| ------ | ---- | ---------------------------- |
| cấp độ | int  | Cấp độ chi tiết ghi bản ghi. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.verbosity(3)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosity","params":['3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_verbosityByName <a id="debug_verbositybyname"></a>

Thiết lập mức độ chi tiết của mô-đun bản ghi với tên đã cho.
Xin lưu ý rằng VerbosityByName chỉ hoạt động với zapLogger.

(Cấp độ: 0=crit, 1=lỗi, 2=cảnh báo, 3=thông tin, 4=gỡ lỗi, 5=truy vết)

Có thể tăng mức độ chi tiết của các gói và tệp nguồn riêng lẻ bằng cách sử dụng `debug_vmodule`.
can be raised using `debug_vmodule`.

|    Máy khách    | Gọi phương pháp                                                   |
| :-------------: | ----------------------------------------------------------------- |
| Bảng điều khiển | `debug.verbosityByName(name, level)`                              |
|       RPC       | `{"method": "debug_verbosityByName", "params": [string, number]}` |

**Tham số**

| Tên    | type  | Mô tả                        |
| ------ | ----- | ---------------------------- |
| tên    | chuỗi | Tên mô-đun.                  |
| cấp độ | int   | Cấp độ chi tiết ghi bản ghi. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.verbosityByName("name", 3)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosityByName","params":["name", '3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_verbosityByID <a id="debug_verbositybyid"></a>

Thiết lập mức độ chi tiết của mô-đun bản ghi với ModuleID đã cho.
Xin lưu ý rằng VerbosityByID chỉ hoạt động với zapLogger.

(ModuleID : Vui lòng tham khảo mã trên [github](https://github.com/klaytn/klaytn/blob/dev/log/log_modules.go). )

(Cấp độ: 0=crit, 1=lỗi, 2=cảnh báo, 3=thông tin, 4=gỡ lỗi, 5=truy vết)

Có thể tăng mức độ chi tiết của các gói và tệp nguồn riêng lẻ bằng cách sử dụng `debug_vmodule`.
can be raised using `debug_vmodule`.

|    Máy khách    | Gọi phương pháp                                                 |
| :-------------: | --------------------------------------------------------------- |
| Bảng điều khiển | `debug.verbosityByID(id, level)`                                |
|       RPC       | `{"method": "debug_verbosityByID", "params": [number, number]}` |

**Tham số**

| Tên    | type | Mô tả                        |
| ------ | ---- | ---------------------------- |
| id     | int  | Id mô-đun.                   |
| cấp độ | int  | Cấp độ chi tiết ghi bản ghi. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.verbosityById(1, 3)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosityById","params":['1',3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_vmodule <a id="debug_vmodule"></a>

Thiết lập mẫu mức độ chi tiết ghi bản ghi.

|    Máy khách    | Gọi phương pháp                                   |
| :-------------: | ------------------------------------------------- |
| Bảng điều khiển | `debug.vmodule(module)`                           |
|       RPC       | `{"method": "debug_vmodule", "params": [string]}` |

**Tham số**

| Tên    | type  | Mô tả                      |
| ------ | ----- | -------------------------- |
| mô-đun | chuỗi | Tên mô-đun để ghi bản ghi. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

Nếu bạn muốn xem thông báo từ một gói Go cụ thể (thư mục) và tất cả các thư mục con, sử dụng
and all subdirectories, use

```javascript
> debug.vmodule("p2p/*=5")
```

Nếu bạn muốn giới hạn thông báo trong một gói cụ thể (_ví dụ:_, p2p) nhưng loại trừ các thư mục con, sử dụng
but exclude subdirectories, use

```javascript
> debug.vmodule("p2p=4")
```

Nếu bạn muốn xem thông báo bản ghi từ một tệp nguồn cụ thể, hãy sử dụng

```javascript
> debug.vmodule("server.go=3")
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_vmodule","params":["p2p=4"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
