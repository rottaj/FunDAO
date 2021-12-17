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
  Proposal[] public proposals;

  struct Member {
    uint256 id;
    bool isDelegate;
    uint256 shares;
  }

  struct Proposal {
    address proposer;
    address applicant;
    uint256 requestedShares;
    uint256 yesVotes;
    uint256 noVotes;
  }

  enum Vote {
    Null,
    Yes,
    No
  }

  function assignDelegate(address _assignee) public onlyDelegate {
    members[_assignee].isDelegate = true;
  }


  function getMember(address _member) public view returns (Member memory){
    return members[_member];
  }

  function getCurrentProposal() public view returns (Proposal memory) {
    return proposals[0];
  }

  function submitProposal(address _applicant, uint256 _requestedShares) public onlyDelegate {
    require(_applicant != address(0));
    Proposal memory newProposal = Proposal (
      {
        proposer: msg.sender,
        applicant: _applicant,
        requestedShares: _requestedShares,
        yesVotes: 0,
        noVotes: 0
      }
    );
    proposals.push(newProposal);
  }


}
