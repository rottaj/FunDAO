pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FunToken is ERC20 {
  constructor(uint256 supply) ERC20("FUN", "FUN") {
    _mint(msg.sender, supply);
  }
}
