export const contractAddress = "0x901dd28A9094717d86fdB89aEd7B90f31CA968bc";

export const _abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_assignee",
          "type": "address"
        }
      ],
      "name": "assignDelegate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_member",
          "type": "address"
        }
      ],
      "name": "getMember",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "memberAddress",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isDelegate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "shares",
              "type": "uint256"
            }
          ],
          "internalType": "struct FunDAO.Member",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getProposalByIndex",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "proposer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "applicant",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "requestedShares",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "yesVotes",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "noVotes",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "passed",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "minTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxTime",
              "type": "uint256"
            }
          ],
          "internalType": "struct FunDAO.Proposal",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getProposals",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_indexProposal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_currentTime",
          "type": "uint256"
        }
      ],
      "name": "processProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "proposals",
      "outputs": [
        {
          "internalType": "address",
          "name": "proposer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "applicant",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "requestedShares",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "yesVotes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "noVotes",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "passed",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "minTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maxTime",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_requestedShares",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_minTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxTime",
          "type": "uint256"
        }
      ],
      "name": "submitApplicantProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_applicant",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_requestedShares",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_minTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxTime",
          "type": "uint256"
        }
      ],
      "name": "submitProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_indexProposal",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "_vote",
          "type": "uint8"
        }
      ],
      "name": "submitVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]