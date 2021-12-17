<h1>Fun Dao - A fun dao for frens. </h1>


<h3>----------What we want: --------- </h3>

--> Non plutonian.

--> Assign delegates, these will be created by 1.) Delegate votes + members votes. 
(delegate vote = (n(d) / n(m)) where d = delegator & m = members)

----  All Proposals are created by delegators. ----

--> Proposal to Vote on next project.

--> Proposal to invest w/ treasury.

--> Proposal to vote on changes.

--> Proposal to remove someone from DAO. (Investments will be given back)

--> One proposal at a time, minimum proposal time = 1 week, max = 1 month

<h3>---- Structs ----- </h3>

Member { <br></br>
uint256 id <br></br>
bool isDelegate <br></br>
uin256 shares <br></br>
{ 

Proposal {
  address proposer
  uint256 yesVotes
  uint256 noVotes
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
