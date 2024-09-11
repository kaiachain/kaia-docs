# ERC-20

## Introduction <a id="introduction"></a>

This tutorial helps you to create an example ERC-20 compatible token that conforms to the [Kaia Token Standards](../token-standard.md), especially [Fungible Token Standard \(ERC-20\)](../token-standard.md#fungible-token-standard-kip-7).

[ERC-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20) defines two events and 9 methods \(including 3 optional methods\) as below. ERC-20-compatible tokens are token contracts that implements the following interface.

```text
function name() public view returns (string) //optional
function symbol() public view returns (string) //optional
function decimals() public view returns (uint8) //optional
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

Based on above interface, developers may customize tokens by adding new features and logics, and deploy on Kaia network. For more information, refer to official [ERC-20 documentation](https://eips.ethereum.org/EIPS/eip-20).

In this tutorial, you are going to implement `MyERC20.sol`, an ERC-20 compatible token. This token will issue a predefined amount of tokens and sends all of the tokens to the contract owner on its deploy.

`MyERC20.sol` is based on OpenZeppelin's ERC20 implementation. A major part of the code in this tutorial is forked from [OpenZeppelin 2.3 ](https://github.com/OpenZeppelin/openzeppelin-solidity/releases/tag/v2.3.0) and following Solidity files are used to implement `MyERC20.sol`.

* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol)

## 1. Writing ERC-20 Smart Contract <a id="1-writing-erc-20-smart-contract"></a>

### 1.1 Overall structure of MyERC20 <a id="1-1-overall-structure-of-myerc20"></a>

The complete source code of `MyERC20.sol` is given below. In this implementation, `constructor` invokes `_mint` to mint a predefined amount of token on contract deploy.

```text
pragma solidity ^0.5.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP. Does not include
 * the optional functions; to access them see `ERC20Detailed`.
 */
interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "SafeMath: modulo by zero");
        return a % b;
    }
}

/**
 * @dev Implementation of the `IERC20` interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using `_mint`.
 * For a generic mechanism see `ERC20Mintable`.
 *
 * *For a detailed writeup see our guide [How to implement supply
 * mechanisms](https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226).*
 *
 * We have followed general OpenZeppelin guidelines: functions revert instead
 * of returning `false` on failure. This behavior is nonetheless conventional
 * and does not conflict with the expectations of ERC20 applications.
 *
 * Additionally, an `Approval` event is emitted on calls to `transferFrom`.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard `decreaseAllowance` and `increaseAllowance`
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See `IERC20.approve`.
 */
contract MyERC20 is IERC20 {
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowances;

    // NOTE Start of https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    constructor (string memory name, string memory symbol, uint8 decimals) public {
        _name = name;
        _symbol = symbol;
        _decimals = decimals;

        _mint(msg.sender, 100000 * 10 ** uint256(decimals)); // CAUTION!
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei.
     *
     * > Note that this information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * `IERC20.balanceOf` and `IERC20.transfer`.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
    // NOTE End of https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol

    uint256 private _totalSupply;

    /**
     * @dev See `IERC20.totalSupply`.
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See `IERC20.balanceOf`.
     */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See `IERC20.transfer`.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    /**
     * @dev See `IERC20.allowance`.
     */
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See `IERC20.approve`.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    /**
     * @dev See `IERC20.transferFrom`.
     *
     * Emits an `Approval` event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of `ERC20`;
     *
     * Requirements:
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `value`.
     * - the caller must have allowance for `sender`'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender].sub(amount));
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to `approve` that can be used as a mitigation for
     * problems described in `IERC20.approve`.
     *
     * Emits an `Approval` event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].add(addedValue));
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to `approve` that can be used as a mitigation for
     * problems described in `IERC20.approve`.
     *
     * Emits an `Approval` event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].sub(subtractedValue));
        return true;
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to `transfer`, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a `Transfer` event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a `Transfer` event with `from` set to the zero address.
     *
     * Requirements
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }

     /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a `Transfer` event with `to` set to the zero address.
     *
     * Requirements
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 value) internal {
        require(account != address(0), "ERC20: burn from the zero address");

	_balances[account] = _balances[account].sub(value);
        _totalSupply = _totalSupply.sub(value);
        emit Transfer(account, address(0), value);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner`s tokens.
     *
     * This is internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an `Approval` event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 value) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    /**
     * @dev Destoys `amount` tokens from `account`.`amount` is then deducted
     * from the caller's allowance.
     *
     * See `_burn` and `_approve`.
     */
    function _burnFrom(address account, uint256 amount) internal {
        _burn(account, amount);
        _approve(account, msg.sender, _allowances[account][msg.sender].sub(amount));
    }
}
```

`MyERC20.sol` consists of one interface `IERC20`, one library `SafeMath` and one contract `MyERC20` which implements `IERC20` interface.

* `IERC20` interface defines mandatory interface described at [ERC-20 specification](https://eips.ethereum.org/EIPS/eip-20).
* `SafeMath` library defines wrappers over Solidity's arithmetic operations with added overflow checks for safe calculation of `uint256` type of Solidity.
* `MyERC20` implements `IERC20` interfaces and also defines three optional methods described at [ERC-20 specification](https://eips.ethereum.org/EIPS/eip-20).
  * In addition to ERC20, `constructor` is defined and this constructor is used to define a new ERC20 token name and symbol, and to mint a predefined amount of token. `constructor` is called once on its first deploy.

### 1.2 Take a look at important methods <a id="1-2-take-a-look-at-important-methods"></a>

Let's take a look at some important methods in detail.

#### \(1\) `function balanceOf(address account) external view returns (uint256);` <a id="1-function-balanceof-address-account-external-view-returns-uint256"></a>

`balanceOf` is a mandatory method of ERC-20. `balanceOf` returns the balance of the given address.

```text
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
```

`balanceOf` just returns of value of key `account` stored in `_balances` which is `mapping (address => uint256)` type as below.

```text
    mapping (address => uint256) private _balances;
```

If there is no key `account` available in `_balances`, then it just returns `0`.

#### \(2\) `function transfer(address recipient, uint256 amount) external returns (bool);` <a id="2-function-transfer-address-recipient-uint256-amount-external-returns-bool"></a>

`transfer` is a mandatory method of ERC-20. `transfer` transfers `amount` of tokens to `recipient`, and MUST fire the `Transfer` event. The function SHOULD throw if the message caller’s account balance does not have enough tokens to spend.

`transfer` just invokes internal method `_transfer` which implements actual transfer and event as below.

```text
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }
```

`_transfer` implements actual behavior of `transfer` method of ERC-20.

In addition, it prevents sending token from or to zero address using `require` as below.

```text
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }
```

#### \(3\) `function approve(address spender, uint256 amount) external returns (bool);` <a id="3-function-approve-address-spender-uint256-amount-external-returns-bool"></a>

`approve` is a mandatory method of ERC-20. `approve` allows `spender` to withdraw from your account multiple times, up to the `amount`. If this function is called multiple times, it simply resets the allowance to `amount`.

`approve` just invokes internal method `_approve` which implements actual behavior of `approve`. `msg.sender` is passed as the account `owner`.

```text
    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    function _approve(address owner, address spender, uint256 value) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = value;
        emit Approval(owner, spender, value);
    }
```

`_approve` updates `_allowances` which is a 2-dimensional dictionary maintaining allowed `value` for `spender` from specific `address`.

```text
    mapping (address => mapping (address => uint256)) private _allowances;
```

#### \(4\) `function _mint(address account, uint256 amount) internal` <a id="4-function-_mint-address-account-uint256-amount-internal"></a>

`_mint` is not part of ERC-20. However we need a way to create new ERC-20 tokens and introduced `_mint` to create new tokens in this implementation as below.

```text
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

`_mint` is an internal method and can be invoked inside of this contract.

In `MyERC20.sol`, `_mint` is invoked only once from `constructor` when deploying the smart contract to mint a predefined amount of token.

If you want to issue additional tokens after deploying the smart contract, you have to introduce a new public method such as `mint`. The method should be implemented with CAUTION because only authorized users should be able to mint tokens.

Please take a look at OpenZeppelin example [ERC20Mintable.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Mintable.sol) for more detail.

## 2. Deploying Smart Contract

In this section, you'll deploy your MyERC20 smart contract using Remix Online IDE. The complete source code for MYERC20.sol was given at [Writing ERC-20 Smart Contract](https://docs.kaia.io/build/smart-contracts/samples/erc-20/#1-writing-erc-20-smart-contract).

### 2.1 Prerequisites <a href="#2-1-prerequisites" id="2-1-prerequisites"></a>
- [Kaia Wallet](../../tools/wallets/kaia-wallet.md): used to deploy contracts, sign transactions and interact with contracts.
- Test KAIA from [Faucet](https://faucet.kaia.io): fund your account with sufficient KAIA.

You can use Remix Online IDE or use Truffle to deploy `MyERC20` smart contract.

### 2.2 Deploying smart contract using Remix Online IDE <a href="#2-2-deploying-smart-contract-using-kaia-ide" id="2-2-deploying-smart-contract-using-kaia-ide"></a>

Remix IDE
* Navigate to [Kaia Plugin for Remix](https://ide.kaia.io/)
* Create a `MyERC20.sol` file in the contracts folder
* In Remix, click **compile** contract.
* Click the Kaia (prev Klaytn) tab on your left having installed the plugin
* Select **Environment** > **Injected Provider** - **Kaia Wallet**.
* In Contract field, select your contract. For example, MyERC20.
* Assign the following arguments at deployment **KAIROSTOKEN**, **KAIROS** and **8**
* Click **Deploy**.

![ERC20-1-deploy](/img/build/smart-contracts/remix-layout-erc20-example.png)

After deploying, you can invoke `balanceOf` with your account, which was used to deploy the contract. You will find there are `10000000000000` tokens available in your account as below. Because you set `decimal` as `8` when deploying the contract above, it minted a fixed number of `100000` tokens in the constructor, with one token having a decimal value of `10^8`. `totalSupply` method will return the total supply of tokens minted which should be also `10000000000000`.

![ERC20-2-owner-token](/img/build/smart-contracts/bal-ts-erc20-example.png)

`MyERC20` is now live !

## 3. Interacting with ERC-20 token from Kaia Wallet <a id="3-interacting-with-erc-20-token-from-kaia-wallet"></a>

You can use Kaia Wallet to check your balance and transfer the ERC-20-compatible KAIROSTOKEN you just deployed. To view your token balance in Kaia Wallet, follow the steps below:
 
Kaia Wallet
* Open up Kaia Wallet
* Click on the Token List Icon, and then click Add Token button 

![](/img/build/smart-contracts/kaia-add-token-kw.png)


* Paste the address of myERC20.sol contract in the Token Contract Address field under Custom Token tab.
* Follow the prompts afterwards to add your token. Your Token List modal should like like this: 

![](/img/build/smart-contracts/kaia-add-token-kw-ii.png)


