# Theo dõi thời gian chạy Go

## debug_goTrace <a id="debug_gotrace"></a>

Bật theo dõi thời gian chạy Go trong khoảng thời gian nhất định và ghi dữ liệu theo dõi vào đĩa.
trace data to disk.

|    Máy khách    | Gọi phương pháp                                           |
| :-------------: | --------------------------------------------------------- |
| Bảng điều khiển | `debug.goTrace(file, seconds)`                            |
|       RPC       | `{"method": "debug_goTrace", "params": [string, number]}` |

**Tham số**

| Tên     | type  | Mô tả                              |
| ------- | ----- | ---------------------------------- |
| tệp tin | chuỗi | Tên tệp cho đầu ra theo dõi.       |
| giây    | int   | Thời gian theo dõi tính bằng giây. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.goTrace("go.trace", 5)
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_goTrace","params":["go.trace",5],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_startGoTrace <a id="debug_startgotrace"></a>

Bắt đầu ghi theo dõi thời gian chạy Go vào tệp đã cho.

|    Máy khách    | Gọi phương pháp                                        |
| :-------------: | ------------------------------------------------------ |
| Bảng điều khiển | `debug.startGoTrace(file)`                             |
|       RPC       | `{"method": "debug_startGoTrace", "params": [string]}` |

**Tham số**

| Tên     | type  | Mô tả                        |
| ------- | ----- | ---------------------------- |
| tệp tin | chuỗi | Tên tệp cho đầu ra theo dõi. |

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.startGoTrace("go.trace")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startGoTrace","params":["go.trace"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_stopGoTrace <a id="debug_stopgotrace"></a>

Dừng ghi theo dõi thời gian chạy Go.

|    Máy khách    | Gọi phương pháp                                 |
| :-------------: | ----------------------------------------------- |
| Bảng điều khiển | `debug.stopGoTrace()`                           |
|       RPC       | `{"method": "debug_stopGoTrace", "params": []}` |

**Tham số**

Không có

**Giá trị trả về**

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> debug.stopGoTrace()
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopGoTrace","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
