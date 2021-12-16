Fun Dao - A fun dao for frens.


----------What we want: ---------

--> Non plutonian.

--> Assign delegates, these will be created by 1.) Delegate votes + members votes. 
      (delegate vote = (n(d) / n(m)) where d = delegator & m = members)

----  All Proposals are created by delegators. ----

--> Proposal to Vote on next project.

--> Proposal to invest w/ treasury.

--> Proposal to vote on changes.

--> Proposal to remove someone from DAO. (Investments will be given back)

--> One proposal at a time, minimum proposal time = 1 week, max = 1 month

---- Structs -----

Vote (
  Null # Default
  Yes
  No
)

Member (
  uint256 id
  bool isDelegate
  uin256 shares
)


----- Mappings -----

--> members (address => Member)

--> delegates (address => Member[delegate])



------ Function ----

--> submitVote (onlyMember)

--> leaveDao (onlyMember)

----- Proposal Function ----

--> submitProposal (onlyDelegator)

--> voteDelegator (onlyDelegator) # Votes for delegator

--> removeDelegator (onlyDelegator) # Votes to remove delegator


-----FunToken-----

ERC-20 Token. Used for voting
