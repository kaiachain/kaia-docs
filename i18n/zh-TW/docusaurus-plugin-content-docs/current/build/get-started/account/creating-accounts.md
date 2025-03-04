# 創建賬戶

## 創建新賬戶<a id="creating-a-new-account"></a>

這將創建一個新賬戶，並在屏幕上打印地址。 在數據目錄下創建密鑰存儲文件。

**Kaia密鑰存儲文件**

創建賬戶時，會創建一個密鑰存儲文件。 密鑰存儲文件是您唯一的 Kaia 私鑰的加密版本，您將用它來簽署您的交易。 密鑰存儲文件名的格式如下：

- `UTC--<created_at UTC ISO8601>-<address hex>`

在 Kaia 節點之間傳輸整個目錄或其中的單個密鑰存儲文件是安全的。 請注意，如果您從其他節點向您的節點添加密鑰，賬戶的順序可能會改變。 因此，請確保不要在腳本或代碼片段中依賴索引。

### ken <a id="ken"></a>

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

**`WARNING`**：請注意，使用密碼文件僅供測試之用；將密碼保存在文件中或以任何其他方式暴露密碼都不是好主意。 如果在密碼文件中使用密碼標誌，最好確保該文件除了你之外，任何人都無法讀取，甚至無法列出。 您可以通過以下方式實現這一目標

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
I type my pass here
^D
```

### JavaScript 控制檯<a id="javascript-console"></a>

在控制檯中，您可以調用以下函數來創建賬戶：

```javascript
> personal.newAccount("passphrase")
```

賬戶以加密格式保存。 您**必須**記住這個密碼，以便將來解鎖您的賬戶。

## 導入賬戶<a id="importing-an-account"></a>

您可以使用密鑰文件導入賬戶。 密鑰文件假定包含未加密的私人密鑰，以十六進制編碼的 EC 原始字節形式表示。 簡單地說，它是一個不帶前綴 "0x "的純文本私人密鑰。

從給定的密鑰文件中導入未加密的私鑰，創建新賬戶，在數據目錄下生成密鑰存儲文件，並在控制檯中打印地址。 您必須記住密碼，以便將來解鎖賬戶。

**注意**：如果可以直接將密鑰存儲文件複製到另一個 Kaia 實例，則不需要此導入/導出機制。

### ken <a id="ken-1"></a>

```bash
$ ken account import --datadir <datadir> <keyfile>
$ ken account import --password <passwordfile> --datadir <datadir> <keyfile>
```

### JavaScript 控制檯<a id="javascript-console-1"></a>

```bash
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"​

// Using a Kaia wallet key
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```