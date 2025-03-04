# ERC-20

## 导言<a id="introduction"></a>

本教程帮助你创建一个符合[Kaia 代币标准](../token-standard.md)，尤其是[Fungible Token Standard （ERC-20）](../token-standard.md#fungible-token-standard-kip-7)的ERC-20 兼容代币示例。

[ERC-20令牌标准](https://eips.ethereum.org/EIPS/eip-20) 定义了以下 2 个事件和 9 个方法（包括 3 个可选方法）。 与 ERC-20 兼容的代币是实现以下接口的代币合约。

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

在上述界面的基础上，开发人员可以通过添加新功能和逻辑来定制令牌，并将其部署到 Kaia 网络上。 更多信息，请参阅官方 [ERC-20 文档](https://eips.ethereum.org/EIPS/eip-20)。

在本教程中，您将实现与 ERC-20 兼容的令牌 `MyERC20.sol`。 该代币将发行预定数量的代币，并在部署时将所有代币发送给合约所有者。

MyERC20.sol "基于 OpenZeppelin 的 ERC20 实现。 本教程的大部分代码来自 [OpenZeppelin 2.3 ](https://github.com/OpenZeppelin/openzeppelin-solidity/releases/tag/v2.3.0)，以下 Solidity 文件用于实现 `MyERC20.sol`。

- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol)
- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol)
- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol)
- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol)

## 1. 编写 ERC-20 智能合约<a id="1-writing-erc-20-smart-contract"></a>

### 1.1 MyERC20 的总体结构<a id="1-1-overall-structure-of-myerc20"></a>

MyERC20.sol "的完整源代码如下。 在此实现中，"构造器 "调用 "铸币"，在部署合约时铸入预定数量的代币。

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

MyERC20.sol "由一个接口 "IERC20"、一个库 "SafeMath "和一个实现 "IERC20 "接口的合约 "MyERC20 "组成。

- IERC20 "接口定义了[ERC-20 规范](https://eips.ethereum.org/EIPS/eip-20) 中描述的强制接口。
- SafeMath "库定义了 Solidity 算术运算的包装器，并增加了溢出检查功能，可安全计算 Solidity 的 "uint256 "类型。
- MyERC20 "实现了 "IERC20 "接口，还定义了三个可选方法，详见[ERC-20 规范](https://eips.ethereum.org/EIPS/eip-20)。
 - 除 ERC20 外，还定义了 "构造器"，该构造器用于定义新的 ERC20 令牌名称和符号，并铸造预定数量的令牌。 `constructor` 在首次部署时被调用一次。

### 1.2 看看重要的方法<a id="1-2-take-a-look-at-important-methods"></a>

让我们来详细了解一些重要的方法。

#### \(1\) `function balanceOf(address account) external view returns (uint256);`<a id="1-function-balanceof-address-account-external-view-returns-uint256"></a>

balanceOf "是 ERC-20 的强制方法。 `balanceOf` 返回给定地址的余额。

```text
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
```

`balanceOf` 只返回存储在 `_balances`中的 key`account` 的值，它是 `mapping (address => uint256)`类型，如下所示。

```text
    mapping (address => uint256) private _balances;
```

如果 `_balances`中没有可用的 key `account` ，则只会返回 `0`。

#### \(2\) `function transfer(address recipient, uint256 amount) external returns (bool);`<a id="2-function-transfer-address-recipient-uint256-amount-external-returns-bool"></a>

转让 "是 ERC-20 的强制性方法。 transfer "会将 "数量 "代币转移给 "接收方"，并且必须触发 "Transfer "事件。 如果消息调用者的账户余额没有足够的代币可供使用，函数应抛出。

transfer "只是调用内部方法"_transfer"，它实现的实际传输和事件如下。

```text
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }
```

`_transfer` 实现 ERC-20 的 `transfer` 方法的实际行为。

此外，它还能防止使用下面的 `require` 从零地址或向零地址发送令牌。

```text
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }
```

#### \(3\) `function approve(address spender, uint256 amount) external returns (bool);`<a id="3-function-approve-address-spender-uint256-amount-external-returns-bool"></a>

批准 "是 ERC-20 的强制性方法。 批准 "允许 "支出人 "多次从您的账户中提款，但以 "金额 "为限。 如果多次调用此函数，则会将津贴重置为 `amount`。

approve "只是调用内部方法"_approve"，它实现了 "approve "的实际行为。 msg.sender "作为账户 "owner "传递。

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

批准 "更新 "允许值"，"允许值 "是一个二维字典，保存了特定 "地址 "的 "支出人 "的允许 "值"。

```text
    mapping (address => mapping (address => uint256)) private _allowances;
```

#### \(4\) `function _mint(address account, uint256 amount) internal` <a id="4-function-_mint-address-account-uint256-amount-internal"></a>

`_mint` 不是 ERC-20 的一部分。 但是，我们需要一种方法来创建新的 ERC-20 令牌，因此在此实现中引入了 `_mint` 来创建新令牌，如下所示。

```text
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

`_mint` 是一个内部方法，可在本合同内部调用。

在`MyERC20.sol`中，当部署智能合约以铸造预定数量的代币时，`_mint`只从`constructor`调用一次。

如果想在部署智能合约后发行额外的代币，就必须引入一个新的公共方法，如 `mint`。 实施该方法时应小心谨慎，因为只有授权用户才能铸造令牌。

更多详情，请参阅 OpenZeppelin 示例 [ERC20Mintable.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Mintable.sol)。

## 2. 部署智能合约

在本节中，您将使用 Remix Online IDE 部署 MyERC20 智能合约。 MYERC20.sol 的完整源代码见 [编写 ERC-20 智能合约](https://docs.kaia.io/build/smart-contracts/samples/erc-20/#1-writing-erc-20-smart-contract)。

### 2.1 先决条件<a href="#2-1-prerequisites" id="2-1-prerequisites"></a>

- [Kaia Wallet](../../tools/wallets/kaia-wallet.md)：用于部署合约、签署交易和与合约交互。
- 从 [水龙头](https://faucet.kaia.io)测试 KAIA：为账户注入足够的 KAIA。

你可以使用 Remix Online IDE 或 Truffle 来部署 `MyERC20` 智能合约。

### 2.2 使用 Remix 在线集成开发环境部署智能合约<a href="#2-2-deploying-smart-contract-using-kaia-ide" id="2-2-deploying-smart-contract-using-kaia-ide"></a>

Remix IDE

- 导航至 [Kaia Remix 插件](https://ide.kaia.io/)
- 在合同文件夹中创建一个 `MyERC20.sol` 文件
- 在 Remix 中，点击**编译**合同。
- 安装插件后，点击左侧的 Kaia（前 Klaytn）选项卡
- 选择 **环境** > **注入式提供商** - **Kaia Wallet**。
- 在合同字段中，选择您的合同。 例如，MyERC20。
- 在部署 **KAIROSTOKEN**、**KAIROS** 和 **8** 时分配以下参数
- 点击 **部署**。

![ERC20-1-deploy](/img/build/smart-contracts/remix-layout-erc20-example.png)

部署完成后，可以使用用于部署合同的账户调用 `balanceOf` 。 您会发现您的账户中有 `10000000000000` 代币，如下所示。 由于您在部署上述合约时将 `decimal` 设置为 `8`，因此它在构造器中铸造了固定数量的 `100000` 代币，其中一个代币的十进制值为 `10^8`。 totalSupply "方法将返回已铸造代币的总供应量，也应为 "10000000000000"。

![ERC20-2-owner-token](/img/build/smart-contracts/bal-ts-erc20-example.png)

MyERC20 "现已上线！

## 3. 与 Kaia 钱包中的 ERC-20 令牌互动<a id="3-interacting-with-erc-20-token-from-kaia-wallet"></a>

您可以使用 Kaia 钱包查看余额，并转移您刚刚部署的与 ERC-20 兼容的 KAIROSTOKEN。 要在 Kaia 钱包中查看令牌余额，请按以下步骤操作：

Kaia 钱包

- 打开 Kaia 钱包
- 点击令牌列表图标，然后点击添加令牌按钮

![](/img/build/smart-contracts/kaia-add-token-kw.png)

- 在 "自定义令牌 "选项卡下的 "令牌合约地址 "字段中粘贴 myERC20.sol 合约的地址。
- 然后按照提示添加令牌。 您的令牌列表模式应该是这样的：

![](/img/build/smart-contracts/kaia-add-token-kw-ii.png)


