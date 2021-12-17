pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FunDAO {

  constructor() {
    console.log(msg.sender);
    members[msg.sender].isDelegate = true;
  }

  modifier onlyDelegate{
    require(members[msg.sender].isDelegate == true, "Not a delegate");
    _;
  }

  mapping (address => Member) members;
  struct Member {
    uint256 id;
    bool isDelegate;
    uint256 shares;
  }

  struct Proposal {
    address proposer;
    uint256 yesVotes;
    uint256 noVotes;
  }

  enum Vote {
    Null,
    Yes,
    No
  }

  function assignDelegate() public onlyDelegate {
    members[msg.sender].isDelegate = true;
  }


  function getMember(address _member) public view returns (Member memory){
    return members[_member];
  }

  /*
  function submitProposal(Member) public onlyDelegate {
          
  }
  */


}
