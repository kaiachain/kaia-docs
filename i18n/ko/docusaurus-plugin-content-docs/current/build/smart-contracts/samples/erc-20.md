# ERC-20

## 소개 <a id="introduction"></a>

이 튜토리얼은 [Kaia 토큰 표준](../token-standard.md), 특히 [대체 가능한 토큰 표준 (ERC-20)](../token-standard.md#fungible-token-standard-kip-7)을 준수하는 ERC-20 호환 토큰 예제를 만들 수 있도록 도와줍니다.

[ERC-20 토큰 표준](https://eips.ethereum.org/EIPS/eip-20)은 아래와 같이 두 가지 이벤트와 9가지 메서드(3가지 옵션 메서드 포함)를 정의하고 있습니다. ERC-20 호환 토큰은 다음과 같은 인터페이스를 구현하는 토큰 컨트랙트입니다.

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

개발자는 위 인터페이스를 기반으로 새로운 기능과 로직을 추가하여 토큰을 커스터마이징하고 Kaia 네트워크에 배포할 수 있습니다. 자세한 내용은 공식 [ERC-20 문서](https://eips.ethereum.org/EIPS/eip-20)를 참고하시기 바랍니다.

이 튜토리얼에서는 ERC-20 호환 토큰인 `MyERC20.sol`을 구현하겠습니다. 이 토큰은 미리 정의된 양의 토큰을 발행하고 배포 시 모든 토큰을 컨트랙트 소유자에게 보냅니다.

`MyERC20.sol`은 OpenZeppelin의 ERC20 구현을 기반으로 합니다. 이 튜토리얼의 코드 대부분은 [OpenZeppelin 2.3](https://github.com/OpenZeppelin/openzeppelin-solidity/releases/tag/v2.3.0)에서 포크되었으며, `MyERC20.sol`을 구현하기 위해 다음 Solidity 파일이 사용됩니다.

- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol)
- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol)
- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol)
- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol)

## 1. ERC-20 스마트 컨트랙트 작성하기 <a id="1-writing-erc-20-smart-contract"></a>

### 1.1 MyERC20의 전체 구조 <a id="1-1-overall-structure-of-myerc20"></a>

`MyERC20.sol`의 전체 소스 코드는 아래와 같습니다. 이 구현에서 `constructor`는 컨트랙트 배포 시 미리 정의된 양의 토큰을 발행하기 위해 `_mint`를 호출합니다.

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

`MyERC20.sol`은 하나의 인터페이스 `IERC20`, 하나의 라이브러리 `SafeMath`, 그리고 `IERC20` 인터페이스를 구현하는 하나의 컨트랙트 `MyERC20`으로 구성되어 있습니다.

- `IERC20` 인터페이스는 [ERC-20 규격](https://eips.ethereum.org/EIPS/eip-20)에서 설명하는 필수 인터페이스를 정의합니다.
- `SafeMath` 라이브러리는 Solidity의 산술 연산에 대한 래퍼를 정의하며, `uint256` 타입의 Solidity를 안전하게 계산하기 위해 오버플로우 검사를 추가했습니다.
- `MyERC20`은 `IERC20` 인터페이스를 구현하며, [ERC-20 사양](https://eips.ethereum.org/EIPS/eip-20)에 설명된 세 가지 선택적 메서드도 정의합니다.
  - ERC20 외에도 `constructor`가 정의되어 있으며, 이 생성자는 새로운 ERC20 토큰 이름과 심볼을 정의하고 미리 정의된 양의 토큰을 발행하는 데 사용됩니다. `constructor`는 처음 배포할 때 한 번 호출됩니다.

### 1.2 중요한 방법 살펴보기 <a id="1-2-take-a-look-at-important-methods"></a>

몇 가지 중요한 방법을 자세히 살펴보겠습니다.

#### (1) `function balanceOf(address account) external view returns (uint256);` <a id="1-function-balanceof-address-account-external-view-returns-uint256"></a>

`balanceOf`는 ERC-20의 필수 메서드입니다. balanceOf\\`는 주어진 주소의 잔액을 반환합니다.

```text
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
```

`balanceOf`는 `_balances`에 저장된 `account` 키의 값을 아래와 같이 `mapping (address => uint256)` 유형으로 반환합니다.

```text
    mapping (address => uint256) private _balances;
```

`balances`에 사용 가능한 키 `account`가 없으면 `0`을 반환합니다.

#### (2) `function transfer(address recipient, uint256 amount) external returns (bool);` <a id="2-function-transfer-address-recipient-uint256-amount-external-returns-bool"></a>

`transfer`은 ERC-20의 필수 메서드입니다. `transfer`은 `recipient`에게 `amount`의 토큰을 전송하며, 반드시 `Transfer` 이벤트를 발생시켜야 합니다. 메시지 발신자의 계정 잔액에 사용할 토큰이 충분하지 않은 경우 이 함수가 발생해야 합니다.

`transfer`는 아래와 같이 실제 전송 및 이벤트를 구현하는 내부 메서드 `_transfer`를 호출하기만 하면 됩니다.

```text
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }
```

`transfer`은 ERC-20의 `transfer` 메서드의 실제 동작을 구현합니다.

또한 아래와 같이 `require`를 사용하여 0 주소로 토큰을 보내거나 보내는 것을 방지합니다.

```text
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }
```

#### (3) `function approve(address spender, uint256 amount) external returns (bool);` <a id="3-function-approve-address-spender-uint256-amount-external-returns-bool"></a>

`approve`은 ERC-20의 필수 방식입니다. `approve`을 사용하면 `spender`가 `amount`까지 계정에서 여러 번 인출할 수 있습니다. 이 함수가 여러 번 호출되면 단순히 허용량을 `amount`으로 재설정합니다.

`approve`은 `approve`의 실제 동작을 구현하는 내부 메서드 `_approve`를 호출할 뿐입니다. `msg.sender`는 계정 `owner`로서 전달됩니다.

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

`_approve`은 특정 `address`에서 `spender`에 대해 허용된 `value`를 유지하는 2차원 사전인 `_allowances`을 업데이트합니다.

```text
    mapping (address => mapping (address => uint256)) private _allowances;
```

#### (4) `function _mint(address account, uint256 amount) internal` <a id="4-function-_mint-address-account-uint256-amount-internal"></a>

`_mint`는 ERC-20의 일부가 아닙니다. 하지만 새로운 ERC-20 토큰을 생성하는 방법이 필요했고, 이번 구현에서는 아래와 같이 새로운 토큰을 생성하기 위해 `_mint`를 도입했습니다.

```text
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

`_mint`는 내부 메서드이며 이 컨트랙트 내부에서 호출할 수 있습니다.

`MyERC20.sol`에서 `_mint`는 스마트 컨트랙트를 배포할 때 `constructor`에서 한 번만 호출하여 미리 정의된 양의 토큰을 발행합니다.

스마트 컨트랙트를 배포한 후 토큰을 추가로 발행하려면 `mint`와 같은 새로운 공개 방식을 도입해야 합니다. 이 방법은 권한이 있는 사용자만 토큰을 발행할 수 있어야 하므로 주의해서 구현해야 합니다.

자세한 내용은 OpenZeppelin 예제 [ERC20Mintable.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Mintable.sol)을 참고하세요.

## 2. 스마트 컨트랙트 배포

Remix 온라인 IDE를 사용하거나 Truffle을 사용하여 `MyERC20` 스마트 컨트랙트를 배포할 수 있습니다.

### 2.1 Remix Online IDE를 사용하여 스마트 컨트랙트 배포하기 <a href="#2-1-deploying-smart-contract-using-klaytn-ide" id="2-1-deploying-smart-contract-using-klaytn-ide"></a>

- Please visit [Kaia Plugin for Remix](https://ide.kaia.io) and create a `MyERC20` contract. 전체 소스코드는 [ERC-20 스마트 컨트랙트 작성하기](#1-writing-erc-20-smart-contract)에서 확인하실 수 있습니다.
- 컨트랙트 배포에 사용할 계정을 준비합니다.
  - If you do not have an account yet, create one at [https://toolkit.kaia.io/account/accountKeyLegacy](https://toolkit.kaia.io/account/accountKeyLegacy).
  - Get some test KAIA from the faucet - [https://faucet.kaia.io](https://faucet.kaia.io)
- 배포 파라미터를 `BAOBABTOKEN`, `BAO`, `8`로 설정하여 `MyERC20.sol`을 배포해 봅시다.

![ERC20-1-deploy](/img/build/smart-contracts/erc20-1-deploy.png)

배포 후, 컨트랙트를 배포할 때 사용한 계정으로 `balanceOf`를 호출할 수 있습니다. 아래와 같이 계정에서 `10000000000000` 토큰을 사용할 수 있습니다. 위 컨트랙트를 배포할 때 `decimal`을 `8`로 설정했기 때문에 생성자에서 고정된 수의 `100000` 토큰을 발행했으며, 한 토큰의 소수점 값은 `10^8`입니다. `totalSupply` 메서드는 발행된 토큰의 총 공급량을 반환하며, 이 역시 `10000000000000`이어야 합니다.

![ERC20-2-owner-token](/img/build/smart-contracts/erc20-2-owner_token.png)

이제 `MyERC20`이 출시되었습니다!

## 3. 카이아 지갑에서 ERC-20 토큰과 상호작용하기 <a id="3-interacting-with-erc-20-token-from-klaytn-wallet"></a>

[Kairos 카이아 지갑](https://baobab.wallet.klaytn.foundation)을 통해 잔액을 조회하고 방금 배포한 ERC-20 호환 `BAOBABTOKEN`을 전송할 수 있습니다.

아래와 같이 배포된 `MyERC20` 컨트랙트의 주소로 지갑에 ERC-20 호환 토큰을 추가할 수 있습니다.

![ERC20-3-Add\\_token](/img/build/smart-contracts/erc20-3-add_token.png)

지갑 앱에서 ERC-20 토큰을 추가하면 아래와 같이 KAIA의 잔액과 함께 `BAOBABTOKEN`의 잔액이 표시됩니다. 계정에 `100000` `BAO` 토큰이 있는 것을 확인할 수 있습니다.

![ERC20-4-wallet-token](/img/build/smart-contracts/erc20-4-wallet-token.png)
