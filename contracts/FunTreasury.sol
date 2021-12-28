pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FunTreasury is Ownable {
  constructor(address tokenAddress) public {
    // import erc20 (FunToken) for use. 
    IERC20 funToken = IERC20(tokenAddress); 
  }
  // withdraw erc20 (FunToken)
  function withdaw(uint256 _numberToken) public onlyOwner {
    //safeTransfer(
  }
}
