# ERC-20

## はじめに<a id="introduction"></a>

このチュートリアルでは、[Kaia Token Standards](../token-standard.md)、特に[Fungible Token Standard \(ERC-20)](../token-standard.md#fungible-token-standard-kip-7)に準拠した、ERC-20互換トークンの例を作成します。

[ERC-20 Token Standard】(https://eips.ethereum.org/EIPS/eip-20)では、以下のように2つのイベントと9つのメソッド(3つのオプショ ンメソッドを含む)を定義している。 ERC-20互換トークンは、以下のインターフェイスを実装したトークンコントラクトです。

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

上記のインターフェイスに基づき、開発者は新しい機能やロジックを追加することでトークンをカスタマイズし、Kaiaネットワークにデプロイすることができる。 詳細については、公式の[ERC-20ドキュメント](https://eips.ethereum.org/EIPS/eip-20)を参照してください。

このチュートリアルでは、ERC-20互換トークンである`MyERC20.sol`を実装する。  このトークンはあらかじめ定義された量のトークンを発行し、デプロイ時にすべてのトークンを契約オーナーに送信する。

`MyERC20.sol`はOpenZeppelinのERC20実装に基づいている。 `MyERC20.sol`はOpenZeppelinのERC20実装に基づいている。 このチュートリアルのコードの大部分は[OpenZeppelin 2.3 ](https://github.com/OpenZeppelin/openzeppelin-solidity/releases/tag/v2.3.0)からフォークしたもので、`MyERC20.sol`を実装するために以下のSolidityファイルを使用しています。

- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol)
- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol)
- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol)
- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol)

## 1. デプロイ後、コントラクトのデプロイに使用したアカウントで `balanceOf` を呼び出すことができる。 あなたのアカウントには以下のように`10000000000`トークンがあります。 上のコントラクトをデプロイするときに `decimal` を `8` に設定したため、コンストラクタで固定数の `100000` トークンが鋳造され、1 つのトークンは `10^8` の小数値を持つ。 `totalSupply`メソッドは、鋳造されたトークンの総供給量を返す。

### 1.1 MyERC20の全体構造<a id="1-1-overall-structure-of-myerc20"></a>

`MyERC20.sol`のソースコード全体を以下に示す。 この実装では、 `constructor` が `_mint` を呼び出して、コントラクトのデプロイ時にあらかじめ定義された量のトークンを鋳造する。

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

`MyERC20.sol` は1つのインターフェース `IERC20`、1つのライブラリ `SafeMath`、そして `IERC20` インターフェースを実装した1つのコントラクト `MyERC20` から構成されている。

- IERC20\\` インターフェースは、[ERC-20 仕様書](https://eips.ethereum.org/EIPS/eip-20) に記述されている必須インターフェースを定義する。
- `SafeMath`ライブラリは、Solidityの `uint256` 型の安全な計算のためのオーバーフローチェックを追加した、Solidityの算術演算のラッパーを定義する。
- MyERC20`は`IERC20\\` インターフェースを実装し、[ERC-20 仕様書](https://eips.ethereum.org/EIPS/eip-20) で説明されている 3 つのオプションのメソッドも定義している。
  - ERC20に加えて、`コンストラクタ`が定義されており、このコンストラクタを使って新しいERC20トークンの名前とシンボルを定義し、あらかじめ定義された量のトークンをミントする。  コンストラクター\`は最初のデプロイ時に一度だけ呼ばれる。

### 1.2 重要なメソッドを見てみよう<a id="1-2-take-a-look-at-important-methods"></a>

いくつかの重要な方法を詳しく見てみよう。

#### (1) `function balanceOf(address account) external view returns (uint256);` <a id="1-function-balanceof-address-account-external-view-returns-uint256"></a>

`balanceOf`はERC-20の必須メソッドである。 `balanceOf` は指定されたアドレスの残高を返す。

```text
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
```

`balanceOf` は `_balances` に格納されているキー `account` の値を返すだけである。

```text
    mapping (address => uint256) private _balances;
```

もし `_balances` に `account` というキーがなければ、単に `0` を返す。

#### (2) `function transfer(address recipient, uint256 amount) external returns (bool);` <a id="2-function-transfer-address-recipient-uint256-amount-external-returns-bool"></a>

転送`はERC-20の必須メソッドである。  また、 `Transfer\` イベントを発生させなければならない。 この関数は、メッセージ呼び出し元のアカウント残高が、使用するのに十分なトークンを 持っていない場合に throw すべきである。

`transfer`は内部メソッド `_transfer` を呼び出すだけで、以下のように実際の転送とイベントを実装している。

```text
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }
```

`_transfer` は ERC-20 の `transfer` メソッドの実際の動作を実装している。

また、以下のように `require` を使用することで、ゼロアドレスからのトークン送信やゼロアドレスへのトークン送信を防ぐことができます。

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

`approve`はERC-20の必須メソッドである。 `approve`は `spender`が `amount`を上限として何度もあなたの口座から引き出すことを許可する。 この関数が複数回呼ばれた場合、単純に許容量を `amount` にリセットする。

これは `approve` の実際の動作を実装した内部メソッド `_approve` を呼び出すだけである。 `msg.sender`にはアカウント`owner`が渡される。 `msg.sender`にはアカウント`owner`が渡される。

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

`_approve` は `_allowances` を更新する。この `_allowances` は、特定の `address` からの `spender` に対して許可される `value` を保持する 2 次元の辞書である。

```text
    mapping (address => mapping (address => uint256)) private _allowances;
```

#### \(4\) `function _mint(address account, uint256 amount) internal` <a id="4-function-_mint-address-account-uint256-amount-internal"></a>

`_mint`はERC-20の一部ではない。 `_mint`はERC-20の一部ではない。 しかし、新しいERC-20トークンを作成する方法が必要であり、この実装では以下のように新しいトークンを作成するために`_mint`を導入しました。

```text
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

`_mint`は内部メソッドであり、このコントラクトの内部で呼び出すことができる。

`MyERC20.sol`では、`_mint`はスマートコントラクトをデプロイするときに`constructor`から一度だけ呼び出され、事前に定義された量のトークンを鋳造する。

スマートコントラクトをデプロイした後で追加トークンを発行したい場合は、`mint`のような新しいパブリックメソッドを導入しなければならない。 トークンを鋳造できるのは許可されたユーザーだけであるべきなので、この方法は注意して実装されるべきである。

詳しくはOpenZeppelinのサンプル[ERC20Mintable.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Mintable.sol)をご覧ください。

## 2. スマートコントラクトのデプロイ

このセクションでは、MyERC20 スマートコントラクをRemix Online IDEを利用してデプロイします  MYERC20.solの完全なソースコードは、[ERC-20スマートコントラクトの作成](https://docs.kaia.io/build/smart-contracts/samples/erc-20/#1-writing-erc-20-smart-contract)に記載されている。

### 2.1 前提条件<a href="#2-1-prerequisites" id="2-1-prerequisites"></a>

- [Kaia Wallet](../../tools/wallets/kaia-wallet.md)：コントラクトのデプロイ、トランザクションへの署名、コントラクトとのやりとりに使用。
- [Faucet](https://faucet.kaia.io)からKAIAをテスト: 口座に十分なKAIAを入金してください。

MyERC20\\`スマートコントラクトをデプロイするには、Remix Online IDEを使用するか、Truffleを使用する。

### 2.2 Remix Online IDEを使ったスマートコントラクトのデプロイ<a href="#2-2-deploying-smart-contract-using-kaia-ide" id="2-2-deploying-smart-contract-using-kaia-ide"></a>

リミックスIDE

- [Kaia Plugin for Remix](https://ide.kaia.io/) に移動します。
- contractsフォルダに`MyERC20.sol`ファイルを作成する。
- Remixで**コンパイル**契約をクリックします。
- プラグインをインストールしたら、左側のKaia (prev Klaytn) タブをクリックします。
- **Environment** > **Injected Provider** - **Kaia Wallet** を選択します。
- 契約フィールドで、契約を選択します。 例えば、MyERC20。 例えば、MyERC20。
- **KAIROSTOKEN**、**KAIROS**、_8_\* 配置で以下の引数を指定する。
- 「Deploy」（展開）をクリックします。

![ERC20-1-deploy](/img/build/smart-contracts/remix-layout-erc20-example.png)

デプロイ後、コントラクトのデプロイに使用したアカウントで `balanceOf` を呼び出すことができる。 あなたのアカウントには以下のように`10000000000`トークンがあります。 上のコントラクトをデプロイするときに `decimal` を `8` に設定したため、コンストラクタで固定数の `100000` トークンが鋳造され、1 つのトークンは `10^8` の小数値を持つ。 `totalSupply`メソッドは、鋳造されたトークンの総供給量を返す。

![ERC20-2-owner-token](/img/build/smart-contracts/bal-ts-erc20-example.png)

MyERC20\\`は現在ライブです！

## 3. Kaia WalletからERC-20トークンとやりとりする <a id="3-interacting-with-erc-20-token-from-kaia-wallet"></a>

カイアウォレットで残高を確認し、ERC-20互換のKAIROSTOKENを送金することができます。 カイアウォレットでトークン残高を確認するには、以下の手順に従ってください： カイアウォレットでトークン残高を確認するには、以下の手順に従ってください：

カイア・ウォレット

- カイア・ウォレットを開く
- トークン一覧アイコンをクリックし、トークンの追加ボタンをクリックします。

![](/img/build/smart-contracts/kaia-add-token-kw.png)

- カスタム・トークン]タブの[トークン契約アドレス]フィールドに、myERC20.sol 契約のアドレスを貼り付けます。
- その後、指示に従ってトークンを追加してください。 トークンリスト・モーダルは次のようになります：

![](/img/build/smart-contracts/kaia-add-token-kw-ii.png)


