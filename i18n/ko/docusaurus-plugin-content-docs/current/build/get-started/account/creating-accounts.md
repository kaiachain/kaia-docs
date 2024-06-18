# 계정 만들기

## 새 계정 만들기 <a id="creating-a-new-account"></a>

이렇게 하면 새 계정이 생성되고 화면에 주소가 인쇄됩니다. 데이터 디렉터리 아래에 키스토어 파일이 생성됩니다.

**클레이튼 키스토어(keystore) 파일**

계정을 생성하면 키스토어 파일이 생성됩니다. 키스토어 파일은 트랜잭션에 서명할 때 사용할 고유한 클레이튼 개인키의 암호화된 버전입니다. 키스토어 파일 이름은 다음과 같은 형식입니다:

- `UTC--<created_at UTC ISO8601>-<address hex>`

클레이튼 노드 간에 전체 디렉터리 또는 그 안에 있는 개별 키스토어 파일을 전송하는 것은 안전합니다. 다른 노드에서 노드에 키를 추가하는 경우 계정 순서가 변경될 수 있습니다. 따라서 스크립트나 코드 스니펫의 인덱스에 의존하지 않도록 주의하세요.

### ken <a id="ken"></a>

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

**`경고`**: 비밀번호 파일은 테스트용으로만 사용해야 하며, 비밀번호를 파일에 저장하거나 다른 방식으로 노출하는 것은 좋지 않습니다. 비밀번호 파일에 비밀번호 플래그를 사용하는 경우, 본인 외의 다른 사람이 파일을 읽거나 나열할 수 없도록 하는 것이 가장 좋습니다. You achieve this with:

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
I type my pass here
^D
```

### JavaScript 콘솔 <a id="javascript-console"></a>

콘솔에서 다음 함수를 호출하여 계정을 만들 수 있습니다:

```javascript
> personal.newAccount("passphrase")
```

계정은 암호화된 형식으로 저장됩니다. 나중에 계정을 잠금 해제하려면 이 비밀번호를 **반드시** 기억해야 합니다.

## 계정 가져오기 <a id="importing-an-account"></a>

키 파일(keyfile)을 사용하여 계정을 가져올 수 있습니다. 키 파일에는 암호화되지 않은 개인 키가 16진수로 인코딩된 표준 EC Raw 바이트가 포함된 것으로 가정합니다. 간단히 말해서 선행 '0x'가 없는 일반 텍스트로 된 개인 키입니다.

이렇게 하면 지정된 키 파일에서 암호화되지 않은 개인 키를 가져와서 새 계정을 만들고, 데이터 디렉터리 아래에 키스토어 파일을 생성한 다음 콘솔에 주소를 인쇄합니다. 나중에 계정을 잠금 해제하려면 비밀번호를 기억해 두어야 합니다.

**참고**: 키스토어 파일을 다른 클레이튼 인스턴스로 직접 복사할 수 있다면 이 가져오기/내보내기 메커니즘이 필요하지 않습니다.

### ken <a id="ken-1"></a>

```bash
$ ken account import --datadir <datadir> <keyfile>
$ ken account import --password <passwordfile> --datadir <datadir> <keyfile>
```

### JavaScript 콘솔 <a id="javascript-console-1"></a>

```bash
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"​

// Using a Klaytn wallet key
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```
