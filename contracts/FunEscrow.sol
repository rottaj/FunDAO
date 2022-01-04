pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/escrow/ConditionalEscrow.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FunEscrow is Ownable, ConditionalEscrow {
  
  function depositEther() public payable {
    deposit(msg.sender);
    Deposited(msg.sender, msg.value);
  }

  function withdrawEther(address payable _payee) public payable {
    withdraw(_payee);
    Withdrawn(_payee, msg.value);
  }
  
  function isAllowedForWithdrawal(address _payee) public view returns (bool){
    bool status = withdrawalAllowed(_payee);
    return status;
  }
}
