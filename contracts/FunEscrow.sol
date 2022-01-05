pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/escrow/RefundEscrow.sol";
import "@openzeppelin/contracts/utils/escrow/ConditionalEscrow.sol";
import "@openzeppelin/contracts/utils/escrow/Escrow.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FunEscrow is Ownable{

  address payable private _treasury;

  constructor(address payable treasury_) public {
    require(treasury_ != address(0), "INVALID BENEFIFICIARY ADDRESS");
    _treasury = treasury_; 
  }
  
  event Deposited(address payee, uint256 weiAmount);
  event Withdrawn(address payee, uint256 weiAmount);

  mapping (address => uint256) private _deposits;
  mapping (address => bool) private _withdrawalList; 

  function deposit() public payable {
    require(msg.sender != address(0), "INVALID ADDRESS");
    require(msg.value != 0, "INSUFFICIENT ETHER");
    uint256 amount = msg.value;
    _deposits[msg.sender] += amount;
    emit Deposited(msg.sender, msg.value);
  }

  function withdraw(address payable _payee) public payable {
    require(withdrawalAllowed(_payee), "NOT ALLOWED TO WITHDRAWAL");
    withdraw(_payee);
    emit Withdrawn(_payee, msg.value);
  }
  
  function withdrawalAllowed(address _payee) public view returns (bool) {
    return _withdrawalList[_payee];
  }

}
