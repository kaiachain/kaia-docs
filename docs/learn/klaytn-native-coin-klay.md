# Kaia native coin - KLAY

## KLAY <a id="klay"></a>

KLAY is the main internal transferable cryptocurrency of Kaia and is used to pay transaction fees when creating or executing smart contracts or when transferring KLAY.

KLAY is a necessary element--a fuel--for operating the Kaia distributed application platform. It is a form of payment made by the clients of the platform to the consensus nodes \(CNs\) executing the requested operations. To put it another way, KLAY is an incentive; it ensures that developers write high-quality applications \(wasteful code costs more\) and that the network remains healthy \(CNs are compensated for the resources they contribute\).

## Units of KLAY <a id="units-of-klay"></a>

Kaia uses the following unit system for KLAY.

* `peb` is the smallest currency unit.
* `ston` is an alias for `Gpeb` and introduced for convenience.
* A `KLAY` is 10^18 peb.

| Unit | peb value | peb |
| :--- | :--- | :--- |
| peb | 1 peb | 1 |
| kpeb | 10^3 peb | 1,000 |
| Mpeb | 10^6 peb | 1,000,000 |
| Gpeb | 10^9 peb | 1,000,000,000 |
| ston | 10^9 peb | 1,000,000,000 |
| uKLAY | 10^12 peb | 1,000,000,000,000 |
| mKLAY | 10^15 peb | 1,000,000,000,000,000 |
| KLAY | 10^18 peb | 1,000,000,000,000,000,000 |
| kKLAY | 10^21 peb | 1,000,000,000,000,000,000,000 |
| MKLAY | 10^24 peb | 1,000,000,000,000,000,000,000,000 |
| GKLAY | 10^27 peb | 1,000,000,000,000,000,000,000,000,000 |
| TKLAY | 10^30 peb | 1,000,000,000,000,000,000,000,000,000,000 |

#### APIs Related to KLAY Units <a id="apis-related-to-klay-units"></a>

`klay.toPeb` and `klay.fromPeb` are convenient APIs for converting between KLAY units.

```text
$ ./klay attach data/dd/klay.ipc
...
> klay.fromPeb(25, "peb")
"25"
> klay.fromPeb(25, "Gpeb")
"0.000000025"
> klay.fromPeb(25, "ston")
"0.000000025"
> klay.fromPeb(25, "KLAY")
"0.000000000000000025"
> klay.toPeb(25, "peb")
"25"
> klay.toPeb(25, "ston")
"25000000000"
> klay.toPeb(25, "KLAY")
"25000000000000000000"
```

You can get the list of all units supported by `klay.toPeb` and `klay.fromPeb` by sending an invalid unit string such as the one below.

```text
> klay.toPeb(1, "something-does-not-exist")
Error: This unit doesn't exist, please use one of the following units
"noKLAY": "0"
"peb": "1"
"kpeb": "1000"
"Mpeb": "1000000"
"Gpeb": "1000000000"
"ston": "1000000000"
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