pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract FunDAO {
  constructor() {
    console.log(msg.sender);
    members[msg.sender].isDelegate = true;
    members[msg.sender].memberAddress = msg.sender;
  }

  using SafeMath for uint256;

  modifier onlyDelegate{
    require(members[msg.sender].isDelegate == true, "Not a delegate");
    _;
  }

  modifier onlyMember {
    address test = members[msg.sender].memberAddress;
    console.log(test);
    console.log(msg.sender);
    require(members[msg.sender].memberAddress != address(0), "Not a member");
    _;
  }

  mapping (address => Member) members;
  Proposal[] public proposals;

  struct Member {
    address memberAddress;
    bool isDelegate;
    uint256 shares;
  }

  struct Proposal {
    address proposer;
    address applicant;
    uint256 requestedShares;
    uint256 yesVotes;
    uint256 noVotes;
    bool passed;
    uint minTime;
    uint maxTime;
  }

  enum Vote {
    Null,
    Yes,
    No
  }


  function submitProposal(
    address _applicant, 
    uint256 _requestedShares,
    uint _minTime,
    uint _maxTime
  ) public onlyDelegate 
  {
    require(_applicant != address(0));
    Proposal memory newProposal = Proposal (
      {
        proposer: msg.sender,
        applicant: _applicant,
        requestedShares: _requestedShares,
        yesVotes: 0,
        noVotes: 0,
        passed: false,
        minTime: _minTime,
        maxTime: _maxTime
      }
    );
    proposals.push(newProposal);
  }


  function submitVote(uint256 _indexProposal, uint8 _vote) public onlyMember {
    require(_vote < 3, "Invalid vote");
    Proposal memory calledProposal = proposals[_indexProposal];
    if (_vote == 1) {
      proposals[_indexProposal].yesVotes = proposals[_indexProposal].yesVotes + 1;
      //proposals[_indexProposal] = proposals[_indexProposal].yesVotes.add(1);
    }
    else if (_vote == 2) {
      proposals[_indexProposal].noVotes = proposals[_indexProposal].noVotes + 1; 
      //proposals[_indexProposal] = proposals[_indexProposal].noVotes.add(1);
    }
  }

  function processProposal(uint256 _indexProposal, uint256 _currentTime) public {
    require(_indexProposal <= proposals.length);
    require(_currentTime != 0);
    Proposal memory prop = proposals[_indexProposal]; 
    if (prop.minTime <= _currentTime) {
      console.log("Process Proposal");
      if (prop.yesVotes > prop.noVotes) {
        proposals[_indexProposal].passed = true;
        assignDelegate(proposals[_indexProposal].applicant); // add applicant to members
        console.log("Yes votes > No Votes");
      } 
      else if (prop.noVotes > prop.yesVotes){
        proposals[_indexProposal].passed = false;
        console.log("No votes > Yes Votes");
      }
    } 
    else {
      console.log("Needs to wait for processing");
    }
  }

  // Add modifier that checks if voting allows for approval?
  // Keeping now for testing purposes.. with the expectation that this is not the case of prod.

  function assignMember(address _assignee) internal { // called from delegate
    require(_assignee != address(0), "address can't be 0");
    members[_assignee].memberAddress = _assignee;
  }

  function assignDelegate(address _assignee) public onlyDelegate { // called from delegate
    require(_assignee != address(0), "address can't be 0");
    members[_assignee].isDelegate = true;
  }


  function getMember(address _member) public view returns (Member memory){ 
    return members[_member]; 
  }

  function getCurrentProposal() public view returns (Proposal memory) { // will call by index... lazy
    return proposals[0];
  }
}


