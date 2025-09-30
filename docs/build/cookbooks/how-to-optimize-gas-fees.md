# How to optimise gas fees in Solidity Smart Contract

This guide provides a practical, step-by-step walkthrough on how to optimize gas costs when writing smart contracts in Solidity.

## Why Does Gas Optimization Matter?

Gas optimization is a critical part of smart contract development. It helps ensure that smart contracts remain efficient and cost-effective, even under high network congestion. By reducing the computational overhead of contract execution, developers can lower transaction fees, speed up confirmation times, and improve the overall scalability of their dApps.

For developers, gas optimization is about writing clean, secure, and predictable code that minimizes unnecessary computations. For users, it's about ensuring they can interact with your contract without paying excessive fees. 

## Why It’s Especially Important on Kaia

With over 83 Mini dApps launched and counting, the Kaia blockchain has emerged as the leading EVM-compatible chain in transaction volume driven largely by the explosive growth of these onchain applications.

Each Mini dApp relies on smart contracts to perform onchain actions. Whether minting items, placing bets, or managing in-game assets, every contract interaction consumes gas. Without optimization, these dApps could quickly become too expensive for users to interact with — especially at scale.

That’s why gas efficiency isn’t just a nice-to-have. It’s a necessity. Developers building on Kaia must ensure that each function call is optimized to minimize cost while preserving functionality and security. 

## Gas Optimization Techniques 

### Storage Packing

Storing and retrieving data on the blockchain is one of the most gas-expensive operations, especially when the data must persist across transactions and blocks. In Solidity, this data is stored in contract storage, which is permanent and incurs gas costs. To reduce these costs, developers must carefully optimize how storage is used, especially when declaring state variables.

The Kaia Virtual Machine (KVM) stores contract data in units called storage slots. Each storage slot can hold exactly 256 bits (32 bytes) of data. Solidity data types come in various sizes — for example, a bool is 1 byte, and an address is 20 bytes. 

Through a technique known as storage packing, we can tightly arrange smaller variables to fit within a single 32-byte storage slot. This helps reduce gas usage because reading from or writing to one storage slot is significantly cheaper than accessing multiple.

Let’s consider the following example:

![](/img/build/wallets/storagePacking.png)

**Breakdown:** 

In the unoptimized version (**SlotUnOptimized**), Solidity stores the struct like this:

- address to -> takes 20 bytes -> stored in slot 0
- uint256 numConfirmations -> takes 32 bytes -> stored in slot 1
- uint80 value (10 bytes) and bool executed (1 byte) -> stored in slot 2

Despite **value** and **executed** variable being small, Solidity places them in their own storage slot due to alignment padding unless explicitly reordered. As a result, this struct uses 3 storage slots, which means 3x the gas cost for storage operations. However, the total size of `address (20 bytes) + uint80 (10 bytes) + bool (1 byte)` is **31 bytes** and falls within the **32-byte** limit of a single slot. By simply reordering the declarations so that smaller variables are grouped together, Solidity can pack them into the same slot. This is the essence of storage packing.

In the optimized version (**SlotOptimized**) as seen above, all the smaller variables are placed adjacent to each other, allowing the compiler to store them in fewer slots —  reducing deployment and runtime gas costs.

### Cache Storage

Beyond how variables are laid out in storage slots, it’s also important to understand the gas cost associated with accessing and modifying storage.

Each storage slot on the Kaia Virtual Machine costs:
20,000 gas to initialize (first write)
5,000 gas to update (subsequent writes)
Because of this, it’s critical to minimize the number of direct storage reads and writes, especially in functions that get called frequently. One effective pattern is to cache storage variables into memory when you need to access them multiple times within a function.

Let’s consider the following example:

![](/img/build/wallets/cacheStorage.png)

### Avoid initializing variables to default values

In Solidity, every data type has a predefined default value. For example, **address** defaults to address(0), **bool** defaults to false, and **uint** defaults to 0. A common inefficiency occurs when developers explicitly assign these default values during variable declaration, such as writing `bool isActive = false` or `uint total = 0`. 

Although this is functionally correct, it introduces unnecessary gas costs during deployment because Solidity already sets these values by default. By declaring state variables without assigning values to them, you reduce the contract's bytecode size and avoid extra storage operations. This small adjustment helps make your smart contracts more efficient and easier to maintain, especially when dealing with multiple variables. 

Lets consider the following example:

![](/img/build/wallets/variableInit.png)

### Minimize On chain Data 

Knowing fully well that majority of the gas cost from a transaction comes from data stored in contract storage. It's best to always question what data actually needs to be stored on chain or off chain and consider the trade-offs for both options. We can see this in the case of fully onchain NFTs and how expensive they are compared to traditional NFTs with off chain metadata. Meaning that you can significantly reduce the gas consumption of your smart contracts by storing information off-chain, just because you allocated less variables to storage.

### Free up unused storage 

Sometimes, we forget to free up unused data in our contract which invariably sometimes increases gas cost and also causes network bloating. In any case, freeing unused storage is as simple as setting a value back to 0 once you are sure it will not be used anymore. You can also make use of the special keyword `delete` in solidity to free up any data type. 

Lets consider the following example:

![](/img/build/wallets/freeUpUnusedVariable.png)

### Store data in calldata instead of memory for certain function parameters 

One effective gas golfing technique is to use calldata for read-only array arguments in your functions. Calldata is a non modifiable, non persistent area where function arguments are stored during external calls. It is significantly cheaper than memory because it does not involve any storage allocation or copying. 

When your function only needs to read an input array or string without modifying it, declaring the parameter as calldata helps reduce gas consumption. This is especially beneficial for functions that are called frequently or operate on large input data, such as batch transfers or multi recipient airdrops.

Lets consider the following example: 

![](/img/build/wallets/memory-calldata.png)

### Use Mappings instead of Arrays 

At their core, there are two primary data structures for managing data in Solidity: **arrays** and **mappings**. Arrays store collections of items where each element is assigned to a specific index, making them suitable for ordered lists. Mappings, on the other hand, function as key value stores that allow direct access to values through unique keys.

When working with arrays, retrieving a specific value often requires looping through the entire collection, which incurs a gas cost for each computational step. This makes arrays less efficient for lookups, especially in larger datasets. Unless ordered iteration or grouping of similar items is necessary, it is more gas efficient to use mappings to manage lists of data. 

Mappings offer constant time access and avoid the overhead associated with array traversal, making them a preferred choice for optimizing gas usage in many smart contracts. 

Lets consider the following example: 

![](/img/build/wallets/mappingVsArray.png)

### Fixed-size Arrays Over Dynamic Arrays

While mappings are generally more gas efficient than arrays, there are valid cases where arrays are necessary. In such scenarios, it is advisable to use fixed size arrays when the number of elements is known at compile time. Fixed size arrays offer predictable storage patterns and avoid the overhead associated with resizing operations. 

In contrast, dynamic arrays can grow in size during contract execution, which introduces additional gas costs for memory allocation and boundary checks. By choosing fixed size arrays where possible, you help reduce gas consumption and improve the overall performance of your smart contract.

Lets take a look at this example:

![](/img/build/wallets/dynamic-fixed-arr.png)

### Use Immutable and constant 

An effective way to optimize gas cost in Solidity is by declaring variables as constant or immutable. These special variable types are assigned values only once, either at compile time in the case of constants or during contract deployment for immutables — and become read-only thereafter. Since their values are embedded directly into the contract's bytecode, they avoid the need for storage access, which is typically one of the most expensive operations in smart contract execution. This makes them a powerful tool for reducing gas usage while maintaining code clarity and efficiency

Lets take a look at this example :

![](/img/build/wallets/constant-imm.png)

### Optimized Error Handling
 
When optimizing gas in Solidity, keeping it simple and efficient applies to error handling too. Custom errors offer a gas-saving alternative to traditional require statements that use string messages. Unlike string-based errors — which are stored in contract bytecode and increase size based on the length of the message, custom errors are significantly cheaper. 

They work by using a compact 4-byte selector, derived from the keccak256 hash of the error signature, similar to how function selectors are computed. Whether used inside require or if statements, custom errors help reduce bytecode size and runtime gas costs while still providing clarity during debugging.

Lets take a look at this example :

![](/img/build/wallets/custom-err.png)

### Use External Visibility Modifier

When you are certain that a function will only be called from outside the contract, either by an externally owned account or another smart contract, it is a best practice to declare the function's visibility as external. This guidance is based on how Solidity handles function arguments and memory allocation.

External functions read their parameters directly from call data, which is a read only section optimized for external input. On the other hand, public functions can be accessed both internally and externally. When a public function is called from outside the contract, it reads arguments from call data just like an external function. 

However, when it is called internally, the arguments are passed through memory, which is more expensive due to additional memory allocation and copying. By marking a function as external, especially when it is not meant for internal use, you reduce memory operations and improve gas efficiency. This small change can lead to more optimized and cost effective smart contracts.

Lets take a look at this example :

![](/img/build/wallets/externalVsPublic.png)

### Use inline Assembly

Inline assembly allows developers to interact directly with KVM opcodes. This technique can result in more gas efficient execution compared to standard Solidity code in certain scenarios. Although it bypasses Solidity’s safety checks and reduces readability, it is particularly useful for performance of critical operations such as direct memory access, bitwise operations, or custom control flows. When used with care, inline assembly can help reduce gas costs by giving precise control over how operations are executed under the hood.

Lets take a look at this example : 

![](/img/build/wallets/inline-assembly.png)

## Conclusion

Optimizing gas cost is a vital part of writing efficient and cost effective smart contracts in Solidity. While deploying on Kaia already offers lower transaction costs for users, it remains the developer’s responsibility to apply proven gas optimization techniques.  By following the practices outlined in this guide, you can significantly reduce execution costs, improve contract scalability, and deliver a more seamless and sustainable experience for your users.




