# 카이아 네이티브 코인 - KAIA

## KAIA <a id="klay"></a>

KAIA는 카이아의 주요 내부 전송 가능한 암호화폐로, 스마트 컨트랙트를 생성하거나 실행할 때 또는 KAIA를 전송할 때 트랜잭션 수수료를 지불하는 데 사용됩니다.

KAIA는 카이아 분산 애플리케이션 플랫폼을 운영하기 위한 필수 요소, 즉 연료입니다. 이는 플랫폼의 클라이언트가 요청된 작업을 실행하는 컨센서스 노드 (CN)에게 지불하는 형태입니다. 다시 말해, KAIA는 인센티브이며, 개발자가 고품질의 애플리케이션을 작성하고(낭비적인 코드는 더 많은 비용이 들며) 네트워크가 건강하게 유지되도록 하며(CN은 기여한 리소스에 대해 보상을 받습니다), 이를 통해 개발자가 더 많은 보상을 받도록 합니다.

## KAIA 단위 <a id="units-of-klay"></a>

카이아는 다음과 같은 단위 시스템을 사용합니다.

- `peb`는 가장 작은 화폐 단위입니다.
- `Gkei`는 10^9 kei입니다.
- `KAIA`는 10^18kei입니다.

| 단위   | peb 값     | kei                       |
| :--- | :-------- | :------------------------ |
| kei  | 1 kei     | 1                         |
| Gkei | 10^9 kei  | 1,000,000,000             |
| KAIA | 10^18 kei | 1,000,000,000,000,000,000 |

[Download KLAY historical pricing](pathname:///files/Klaytn_historical_data_coinmarketcap.csv)

[Download FNSA historical pricing](pathname:///files/Finschia_historical_data_coinmarketcap.csv)

<!-- 
#### APIs Related to KAIA Units <a id="apis-related-to-kaia-units"></a>

`kaia.toPeb` and `kaia.fromPeb` are convenient APIs for converting between KAIA units.

```text
$ ./kaia attach data/dd/kaia.ipc
...
> kaia.fromPeb(25, "peb")
"25"
> kaia.fromPeb(25, "Gpeb")
"0.000000025"
> kaia.fromPeb(25, "Gkei")
"0.000000025"
> kaia.fromPeb(25, "KAIA")
"0.000000000000000025"
> kaia.toPeb(25, "peb")
"25"
> kaia.toPeb(25, "Gkei")
"25000000000"
> kaia.toPeb(25, "KLAY")
"25000000000000000000"
```

You can get the list of all units supported by `kaia.toPeb` and `kaia.fromPeb` by sending an invalid unit string such as the one below.

```text
> kaia.toPeb(1, "something-does-not-exist")
Error: This unit doesn't exist, please use one of the following units
"noKLAY": "0"
"peb": "1"
"kpeb": "1000"
"Mpeb": "1000000"
"Gpeb": "1000000000"
"Gkei": "1000000000"
"uKLAY": "1000000000000"
"mKLAY": "1000000000000000"
"KLAY": "1000000000000000000"
"kKLAY": "1000000000000000000000"
"MKLAY": "1000000000000000000000000"
"GKLAY": "1000000000000000000000000000"
"TKLAY": "1000000000000000000000000000000"

    at web3.js:2170:19
    at web3.js:2255:49
    at <anonymous>:1:1
```
-->
