pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initSupply
    )
        ERC20(name, symbol)
        public
    {
        _mint(msg.sender, initSupply);
    }
}
