# Solidity - Smart Contract Language

This chapter describes only the high-level concepts, development processes, and examples written in Solidity because Solidity is already well documented on its official websites. For language specifications or implementations, please refer to the [References](#references) below. The content of this chapter is based on various websites listed in the [References](#references).

## Solidity and Kaia <a id="solidity-and-kaia"></a>

[Solidity](https://github.com/ethereum/solidity) is a high-level, statically typed, contract-oriented language for implementing smart contracts on the Ethereum platform. Although Solidity was originally designed for Ethereum, it is general enough to write smart contracts; therefore, it can also be used for other blockchain platforms, such as Kaia.

Kaia is officially compatible with **London** Ethereum Virtual Machine (EVM) version. Backward compatibility is not guaranteed with other EVM versions on Kaia. Thus, it is highly recommended to compile Solidity code with the Istanbul target option. Please refer to [how to set the EVM version of solc](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target).  

:::note

v1.7.0 Protocol Upgrade - incompatible changes including **Istanbul** hard fork items and Kaia's own items.
It has been enabled from block number `#75,373,312` in case of Kairos network and `#86,816,005` for the Mainnet.

v1.7.3 Protocol Upgrade - incompatible changes including Base Fee from the **London** hard fork.
It has been enabled from block number `#80,295,291` in case of Kairos network and `#86,816,005` for the Mainnet.

v1.8.0 Protocol Upgrade - incompatible changes including Base Fee from the **London** hard fork.
It has been enabled from block number `#86,513,895` in case of Kairos network and `#86,816,005` for the Mainnet.

:::  

Development tools such as [Remix](https://remix.ethereum.org/) \(a browser-based IDE\) and [Truffle](https://github.com/trufflesuite/truffle) \(a development framework\) can be utilized when developing smart contracts for Kaia. The Kaia team will attempt to maintain compatibility between Ethereum's development tools and Kaia's but may elect to provide the Kaia smart contract developers with enhanced or updated versions of those tools when necessary.

It is convenient to utilize Remix or Truffle to develop smart contracts, but the Solidity compiler can be used locally, by building or installing it by following the instructions described in the web page below:

* [Installing the Solidity Compiler](https://docs.soliditylang.org/en/latest/installing-solidity.html)

Note that there are two command-line Solidity compilers:

* _solc_: the full-featured compiler
  * Covered in the Solidity documentation
* _solcjs_: Javascript binding for _solc_
  * Maintained as a separate project [solc-js](https://github.com/ethereum/solc-js)
  * _solcjs_'s command-line options are not compatible with those of _solc_.

Other materials that are useful for getting started with Solidity include the following:

* [Top Solidity tutorials](https://medium.com/coinmonks/top-solidity-tutorials-4e7adcacced8)

## How to Write a Smart Contract <a id="how-to-write-a-smart-contract"></a>

This section presents an example of Solidity source code to provide readers with an idea of how smart contracts look and how to write a contract. Note that the code included here is provided solely for explanatory purposes; it is not intended for production purposes. In the code, `(require)` means that the line is required for any Solidity source file while `(optional)` indicates that the line is not always needed. The symbol `Ln:` is not part of the Solidity code and is included here only to show the line numbers. Please do not include these symbols in source code intended for real use.

```text
L01: pragma solidity 0.5.12;   // (required) version pragma
L02:
L03: import "filename";        // (optional) importing other source files
L04:
L05: // (optional) smart contract definition
L06: contract UserStorage {
L07:    mapping(address => uint) userData;  // state variable
L08:
L09:    function set(uint x) public {
L10:       userData[msg.sender] = x;
L11:    }
L12:
L13:    function get() public view returns (uint) {
L14:       return userData[msg.sender];
L15:    }
L16:
L17:    function getUserData(address user) public view returns (uint) {
L18:       return userData[user];
L19:    }
L20: }
```

The above code should be self-explanatory; thus people familiar with any other programming language can skip the following explanation in this section and jump to the next section. However, for those who do not gain a clear understanding of what the code does or those for whom Solidity is a first programming language, we include a short description of the source code below:

* The portions of the code starting with a double forward slash \(`//`\) are comments rather than code; they are used to annotate and explain the code.  The compiler ignores comments.
* The `pragma` statement in `L01` indicates the minimum compiler version.  
* The `import` statement in `L03` imports all global symbols from "`filename`". The `filename` should be an actual file name.
* `L05` - `L20` define a smart contract called `UserStorage`.  The keyword `contract` is located before the contract name and declares that the code represents a smart contract.  Contracts in Solidity are similar to classes in object-oriented languages.  Each contract can contain declarations for state variables, functions, function modifiers, events, struct types and enum types.  Furthermore, contracts can inherit from other contracts.  The example code contains one contract definition, but a single Solidity file may contain more than one contract definition.
* In `L07`, `userData` is a state variable for the mapping type.  State variables are permanently stored in contract storage.  The state variable `userData` maintains a mapping between `address` and a `uint` value.  The `address` type holds a 20-byte address \(Kaia uses a 20-byte address similar to Ethereum\).
* `L09` defines a public function `set` that saves the value `x` in `userData` for the message's sender.  The variable `msg.sender` is a special variable defined in Solidity that represents the address of the message \(_i.e._, current call\) sender.  The keyword `public` means that the function is part of the contract interface and can be called externally or internally.
* The functions `get` in `L13` and `getUserData` in `L17` are declared with `view`, which means that the functions promise not to modify any state variable.  Their declarations include `returns (uint)`, which implies that they return a `uint` value.

For more information concerning the syntax and semantics of the Solidity language, please refer to the [Solidity documentation](https://docs.soliditylang.org/).

## How to Compile, Deploy, and Execute <a id="how-to-compile-deploy-and-execute"></a>

One way to compile Solidity code is to use the command-line compiler _solc_. This compiler can produce various outputs, ranging from simple binaries and assembly to an abstract syntax tree \(parse tree\). Assuming that the code above is saved in `UserStorage.sol` \(`L03` is excluded in the source file shown above\), some examples of compiling the file `UserStorage.sol` are as follows.

```bash
$ solc --bin UserStorage.sol
```

* This command will print the compilation output as a binary, _i.e._, bytecode.

```bash
solc -o output --bin --ast --asm UserStorage.sol
```

* The compiler generates a binary \(by `--bin`\), an abstract syntax tree \(by `--ast`\), and assembly code \(by `--asm`\) as separate files in the `output` directory.

```bash
solc --optimize --bin UserStorage.sol
```

* For better performance, the optimizer can be activated during compilation using the `--optimize` flag.

Some resources for compiling, deploying, and executing smart contracts are listed below.

* [Using the Solidity command-line compiler](https://docs.soliditylang.org/en/latest/using-the-compiler.html)
* [Compiling contracts using Remix](https://remix-ide.readthedocs.io/en/stable/compile.html)
* [Running transactions with Remix](https://remix-ide.readthedocs.io/en/stable/run.html)
* [Remix Learneth Tutorials](https://remix-ide.readthedocs.io/en/latest/remix_tutorials_learneth.html)
* [Compiling contracts with Truffle](https://trufflesuite.com/docs/truffle/getting-started/compiling-contracts)
* [Deploying contracts with Truffle](https://trufflesuite.com/docs/truffle/getting-started/running-migrations)

NOTE: This section will be updated in the future.

## Debugging Smart Contracts <a id="debugging-smart-contracts"></a>

It is more difficult to debug Solidity code than to debug code written in other programming languages due to the lack of mature debugging tools. Below, we list some resources for Solidity debugging.

* [Debugging a transaction with Remix](https://remix-ide.readthedocs.io/en/latest/debugger.html)
* [Tutorial on debugging transactions with Remix](https://remix-ide.readthedocs.io/en/latest/tutorial_debug.html)
* [Debugging contracts with Truffle](https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-debugger/)

NOTE: This section will be updated in the future.

## Smart Contract Best Practices <a id="smart-contract-best-practices"></a>

To eliminate security concerns and code quality issues from your smart contract, it is important to study and follow best practices in Solidity programming. Here, we show a reference for Solidity best practices.

* [Smart Contract Security Best Practices](https://github.com/ConsenSys/smart-contract-best-practices)

NOTE: This section will be updated in the future.

## References <a id="references"></a>

* [Solidity GitHub page](https://github.com/ethereum/solidity)
* [Solidity documentation](https://solidity.readthedocs.io/en/latest/index.html)
* [Remix documentation](https://remix-ide.readthedocs.io/en/latest/)
* [Truffle documentation](https://trufflesuite.com/docs/truffle/)
