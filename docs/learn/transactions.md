# Transactions

Transactions are the core mechanism for state changes on the Kaia blockchain. They represent messages passed between accounts, altering balances, deploying smart contracts, or executing contract functions. For example, when a transaction that sends 10 KAIA from Alice’s account to Bob’s is executed, Alice's balance decreases by 10 KAIA, and Bob's balance increases by 10 KAIA. Understanding transactions is fundamental to grasping how Kaia works.

## Key Aspects of Kaia Transactions

* **Atomic Operations:** Each transaction is treated as a single, indivisible unit. Either the entire transaction succeeds, applying all changes, or it fails, leaving the blockchain state unchanged. This ensures data integrity and prevents partial updates.

* **Components:** Kaia transactions share core components with other blockchains but also have unique elements due to its decoupling of key pairs and addresses. This decoupling enhances flexibility but requires explicit sender information within the transaction. Typical components include:
    * **Sender:** The originating account (`from` field).  This is explicitly included in Kaia transactions because addresses and key pairs are not directly linked.
    * **Recipient:** The destination account (`to` field, for value transfers and smart contract interactions).
    * **Value:** The amount of KAIA being transferred (`value` field, in `kei`).
    * **Data:**  Additional information (`input` field), often used as input for smart contract execution.
    * **Fees:** Calculated based on `gas` (maximum gas allowed) * `gasPrice` (price per unit of gas).  Fees are paid in KAIA (unit: `kei`, see [link to KAIA units documentation]).
    * **Signature (`v`, `r`, `s` fields):** Cryptographic proof authorizing the transaction.

* **Transaction Types:** Kaia offers a variety of transaction types to support different use cases, from basic value transfers to complex smart contract interactions and fee delegation. This flexibility caters to diverse needs and optimizes performance. See the [Implementing Transactions](../build/transactions/transactions.md#transaction-types) page for details on each type.

* **Fee Mechanism:** Transactions require fees to incentivize validators. These fees are calculated based on the computational resources consumed (`gas`) and a price per unit of gas (`gasPrice`), which can be dynamic.

* **Security:** Transactions are cryptographically signed, ensuring authenticity and preventing unauthorized modifications. Kaia's decoupling of key pairs and addresses adds another layer of security.

* **Fee Delegation:** Kaia's fee delegation feature allows third parties to pay transaction fees on behalf of users, simplifying user onboarding and supporting various business models.  This requires two signatures: one from the sender and one from the fee payer. See the [Fee Delegation](../build/transactions/fee-delegation.md) for its implementation details.

This conceptual overview provides a foundation for understanding Kaia transactions. The [Implementing Transactions](../build/transactions/transactions.md) offers a detailed guide for developers.