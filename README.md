<h1>Fun Dao - A fun dao for frens. </h1>


<h3>----------What I want: --------- </h3>

--> Non plutonian.

--> Assign delegates, these will be created by 1.) Delegate votes + members votes. 
(delegate vote = (n(d) / n(m)) where d = delegator & m = members)

---- Applicant Proposals can be sent by anyone, main Proposals & Delegate Proposals are made by members  ----

--> Proposal to Vote on next project (In future).

--> Proposal to invest w/ treasury (In future).

--> Proposal to vote on changes (In future).

--> Proposal to remove someone from DAO. (Investments will be given back)

--> One proposal at a time, minimum proposal time = 1 week, max = 1 month


<h3>----------- WORKING ------------- </h3>

--> Members vote count is based on number of shares they hold.. (I guess this is a plutonian dao. Lol)
      (mapping (Member.address => Mapping(Proposal.id => shares))

--> assignMembers ==> votes.

--> assignDelegate ==> Handled from frontend, n(d) + n(m).

<h3> ------ Types of Proposals ------- </h3>

--> When a applicant wants to become a member.

--> When a member wants to become a delegate.

--> When a delegate wants something added / changed.

<h3>---- Structs ----- </h3>

<h4>Member {</h4> <br></br>
uint256 id <br></br>
bool isDelegate <br></br>
uin256 shares <br></br>
{ 

<h4> Proposal { </h4> <br></br>
  address proposer <br></br>
  uint256 requestedShares <br></br>
  boolean passed <br></br>
  uint256 yesVotes <br></br>
  uint256 noVotes <br></br>
}

<h3> ----- Enums ------ </h3>
Vote { <br></br> 
  Null # Default <br></br>
  Yes <br></br>
  No <br></br>
}


<h3>----- Mappings ----- </h3>

--> members (address => Member)

--> delegates (address => Member[delegate])



<h3>------ Function ---- </h3>

--> submitVote (onlyMember)

--> leaveDao (onlyMember)

----- Proposal Function ----

--> submitProposal (onlyDelegator)

--> voteDelegator (onlyDelegator) # Votes for delegator

--> removeDelegator (onlyDelegator) # Votes to remove delegator


<h3>-----FunToken----- </h3>

ERC-20 Token. Used for voting

<h3>-----Fun Treasury----- </h3>
Treasury Contract for DAO

<h3>-----Escrow---------</h3>
Escrow contract for new applicants / delegates.
Waits for proposal to pass before releasing funds to treasury. Or back to applicant / delegate.
