pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FunEscrow is Ownable{

  address payable private _treasury;

  constructor(address payable treasury_) public {
    require(treasury_ != address(0), "INVALID TREASURY ADDRESS");
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

  function withdraw(address payable _payee) public onlyOwner {
    require(withdrawalAllowed(_payee), "NOT ALLOWED TO WITHDRAWAL");
    uint256 payeePayment = _deposits[_payee];
    _deposits[_payee] = 0;
    _withdrawalList[_payee] == false;
    _payee.transfer(payeePayment);
    emit Withdrawn(_payee, payeePayment);
  }
  
  function withdrawalAllowed(address _payee) public view returns (bool) {
    return _withdrawalList[_payee];
  }

  function enableWithdrawal(address _payee) public onlyOwner {
    require(_payee != address(0), "INVALID ADDRESS");
    _withdrawalList[_payee] == true;
  }

}
