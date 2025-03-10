# 创建账户

## 创建新账户<a id="creating-a-new-account"></a>

这将创建一个新账户，并在屏幕上打印地址。 在数据目录下创建密钥存储文件。

**Kaia密钥存储文件**

创建账户时，会创建一个密钥存储文件。 密钥存储文件是您唯一的 Kaia 私钥的加密版本，您将用它来签署您的交易。 密钥存储文件名的格式如下：

- `UTC--<created_at UTC ISO8601>-<address hex>`

在 Kaia 节点之间传输整个目录或其中的单个密钥存储文件是安全的。 请注意，如果您从其他节点向您的节点添加密钥，账户的顺序可能会改变。 因此，请确保不要在脚本或代码片段中依赖索引。

### ken <a id="ken"></a>

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

**`WARNING`**：请注意，使用密码文件仅供测试之用；将密码保存在文件中或以任何其他方式暴露密码都不是好主意。 如果在密码文件中使用密码标志，最好确保该文件除了你之外，任何人都无法读取，甚至无法列出。 您可以通过以下方式实现这一目标

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
I type my pass here
^D
```

### JavaScript 控制台<a id="javascript-console"></a>

在控制台中，您可以调用以下函数来创建账户：

```javascript
> personal.newAccount("passphrase")
```

账户以加密格式保存。 您**必须**记住这个密码，以便将来解锁您的账户。

## 导入账户<a id="importing-an-account"></a>

您可以使用密钥文件导入账户。 密钥文件假定包含未加密的私人密钥，以十六进制编码的 EC 原始字节形式表示。 简单地说，它是一个不带前缀 "0x "的纯文本私人密钥。

从给定的密钥文件中导入未加密的私钥，创建新账户，在数据目录下生成密钥存储文件，并在控制台中打印地址。 您必须记住密码，以便将来解锁账户。

**注意**：如果可以直接将密钥存储文件复制到另一个 Kaia 实例，则不需要此导入/导出机制。

### ken <a id="ken-1"></a>

```bash
$ ken account import --datadir <datadir> <keyfile>
$ ken account import --password <passwordfile> --datadir <datadir> <keyfile>
```

### JavaScript 控制台<a id="javascript-console-1"></a>

```bash
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"​

// Using a Kaia wallet key
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```