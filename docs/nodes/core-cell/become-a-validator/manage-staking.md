# Managing Staking Contracts

![Manage Staking menu](/img/nodes/become-a-validator/image23.png)

In the **Manage Staking** menu, you can modify information on previously deployed staking contracts.

If you connect using the wallet that deployed the contracts, you can browse the list of staking contracts, select a specific contract, and click **[Manage Staking]** to enter its management screen.

![Enter staking contract address](/img/nodes/become-a-validator/image24.png)

Alternatively, if you log in with any staking contract admin wallet, you can enter the staking contract address in the **[Enter a CnStaking contract address to manage it]** box to enter the management screen.

![Manage Staking overview](/img/nodes/become-a-validator/image25.png)

On this screen you can perform the following actions.

## Admin Management <a id="admin-management"></a>

1. **Add Admin** — add a staking contract admin.
2. **Remove Admin** — remove a staking contract admin.
3. **Update Requirement** — change the multisig threshold for the staking contract.

## Staking Operations <a id="staking-operations"></a>

![Stake / Unstake / Pending Withdrawals](/img/nodes/become-a-validator/image26.png)
![Staking operations detail](/img/nodes/become-a-validator/image27.png)

4. **Stake KAIA** — if Public Delegation is disabled, you can stake KAIA at your discretion.
5. **Unstake KAIA** — if Public Delegation is disabled, the staking contract admin can unstake KAIA at their discretion.
6. **Pending Withdrawals** — after clicking the unstake button, you can claim KAIA between **7 days** and **14 days** later.

## Address & Tracker Management <a id="address-and-tracker-management"></a>

![Reward address & voter](/img/nodes/become-a-validator/image28.png)

7. **Reward Address** — if Public Delegation is disabled, you can change the reward address.
8. **Voter & Staking Tracker** — change the voter address used for GC voting. When Staking Tracker is updated, you can also change the Staking Tracker address.

## Redelegation <a id="redelegation"></a>

![Redelegation](/img/nodes/become-a-validator/image29.png)

9. **Redelegation** — enable or disable the Redelegation feature, which waives the 7-day unstaking period and moves KAIA immediately between staking contracts. Both the source and destination staking contracts must have Redelegation enabled. See [KIP-163](https://kips.kaia.io/KIPs/kip-163) for details.

## Multisig Requests <a id="multisig-requests"></a>

![Multisig requests](/img/nodes/become-a-validator/image30.png)

10. **Multisig requests** — when the multisig threshold is 2 or more, performing any of actions 1–9 requires confirmations from the staking contract admins. For requests that have not yet gathered enough confirmations, each admin can log in via this screen and perform the confirmation flow. As soon as enough confirmations are collected, the change request is executed.
