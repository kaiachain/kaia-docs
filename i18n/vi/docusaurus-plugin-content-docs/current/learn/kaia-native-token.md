# Kaia native coin - KAIA

## KAIA <a id="klay"></a>

KAIA is the main internal transferable cryptocurrency of Kaia and is used to pay transaction fees when creating or executing smart contracts or when transferring KAIA.

KAIA is a necessary element--a fuel--for operating the Kaia distributed application platform. It is a form of payment made by the clients of the platform to the consensus nodes \(CNs\) executing the requested operations. To put it another way, KAIA is an incentive; it ensures that developers write high-quality applications \(wasteful code costs more\) and that the network remains healthy \(CNs are compensated for the resources they contribute\).

## Units of KAIA <a id="units-of-klay"></a>

Kaia uses the following unit system for KAIA.

- `kei` is the smallest currency unit.
- A `Gkei` is 10^9 kei.
- A `KAIA` is 10^18 kei.

| Unit | kei value | kei                       |
| :--- | :-------- | :------------------------ |
| kei  | 1 kei     | 1                         |
| Gkei | 10^9 kei  | 1,000,000,000             |
| KAIA | 10^18 kei | 1,000,000,000,000,000,000 |

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
