pragma solidity ^0.8.11;
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./FunTreasury.sol";
import "./FunEscrow.sol";

contract FunDAO {

  address public escrowAddress;
  FunEscrow escrow;
  constructor() {
    escrow = new FunEscrow(payable(address(this))); // create FunTreasury
    escrowAddress = address(escrow);
    members[msg.sender].isDelegate = true;          // for 
    members[msg.sender].memberAddress = msg.sender; //    testing 
    members[msg.sender].shares = 10;                // only for testing -- delete this!
  }

  using SafeMath for uint256;

  modifier onlyDelegate{
    require(members[msg.sender].isDelegate == true, "Not a delegate");
    _;
  }

  modifier onlyMember {
    address test = members[msg.sender].memberAddress;
    console.log("MSG.SENDER", msg.sender);
    console.log("SENDER MEMBER ADDRESS", test);
    require(members[msg.sender].memberAddress != address(0), "Not a member");
    _;
  }

  mapping (address => Member) members;
  mapping (address => mapping(uint256 => uint256)) memberVotes; // keep track of member votes per proposal index
  Proposal[] public proposals;

  event SubmitVote(address memberAddress, uint256 proposalIndex, uint8 vote);
  event SubmitApplicantProposal(address applicantAddress, uint256 requestedShares, uint minTime, uint maxTime);
  event ProcessProposal(uint256 proposalIndex);

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
    uint256 _requestedShares,
    uint _minTime,
    uint _maxTime
  ) public onlyMember
  {
    require(msg.sender != address(0));
    Proposal memory newProposal = Proposal (
      {
        proposer: msg.sender,
        applicant: msg.sender,
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
    require(_vote < 3, "INVALID VOTE");
    require(memberVotes[msg.sender][_indexProposal] == 0, "MEMBER ALREADY VOTED");
    /*Proposal memory calledProposal = proposals[_indexProposal]; */
    if (_vote == 1) {
      proposals[_indexProposal].yesVotes = proposals[_indexProposal].yesVotes += members[msg.sender].shares;
      memberVotes[msg.sender][_indexProposal] += members[msg.sender].shares;
      //proposals[_indexProposal] = proposals[_indexProposal].yesVotes.add(1);
    }
    else if (_vote == 2) {
      proposals[_indexProposal].noVotes = proposals[_indexProposal].noVotes += members[msg.sender].shares; 
      memberVotes[msg.sender][_indexProposal] += members[msg.sender].shares;
      //proposals[_indexProposal] = proposals[_indexProposal].noVotes.add(1);
    }
    processProposal(_indexProposal);
    emit SubmitVote(msg.sender, _indexProposal, _vote);
  }

  function processProposal(uint256 _indexProposal) public {
    require(_indexProposal <= proposals.length);
    Proposal memory prop = proposals[_indexProposal]; 
    if (prop.minTime <= block.timestamp) { // if time <= current time
      if (prop.yesVotes > prop.noVotes) {
        proposals[_indexProposal].passed = true;
        assignMember(proposals[_indexProposal].applicant); // add applicant to members
        members[proposals[_indexProposal].applicant].shares += proposals[_indexProposal].requestedShares; // add shares
        // move eth from escrow to treasury.
      } 
      else if (prop.noVotes > prop.yesVotes){
        proposals[_indexProposal].passed = false;
        // refund eth to applicant
        escrow.enableWithdrawal(prop.applicant);
        escrow.withdraw(payable(prop.applicant));
      }
    } 
    emit ProcessProposal(_indexProposal);
  }


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

  function getProposalByIndex(uint256 _index) public view returns (Proposal memory) { // will call by index... lazy
    return proposals[_index];
  }

  function getProposals() public view returns (uint256) {
    return proposals.length;
  }

}


