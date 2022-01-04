pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/escrow/RefundEscrow.sol";
import "@openzeppelin/contracts/utils/escrow/ConditionalEscrow.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract FunEscrow is Ownable, RefundEscrow{
  address private _beneficiary;
  constructor(address beneficiary_) {
    _beneficiary = beneficiary_; 
  }
  
  function depositEther() public payable {
    deposit(msg.sender);
    emit Deposited(msg.sender, msg.value);
  }

  function withdrawEther(address payable _payee) public payable {
    require(withdrawalAllowed(_payee), "NOT ALLOWED TO WITHDRAWAL");
    withdraw(_payee);
    emit Withdrawn(_payee, msg.value);
  }
  
  function isAllowedForWithdrawal(address _payee) public view returns (bool){
    return withdrawalAllowed(_payee);
  }
}
