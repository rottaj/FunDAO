const { expect } = require("chai");
const { ethers } = require("hardhat");



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function automateRandomVoting(addresses, contract) { 
  for (i in addresses.length) {
    contract.submitVote(addresses[i], getRandomInt(3));
  }
}

describe("Mint Token", function () {
  it("Should return mint a new FUN token", async function () {
    var supply = 100000;
    const addresses = await ethers.getSigners();
    const FunToken = await ethers.getContractFactory("FunToken");
    const fun = await FunToken.deploy(supply);
    await fun.deployed();
    
    var totalSupply = await fun.totalSupply()

    console.log(totalSupply)
    expect(totalSupply == supply);
  });
});


describe("Initialize FunDao", function () {
  it("Should initialize FunDao without any errors", async function () {
    const addresses = await ethers.getSigners();
    const FunDao = await ethers.getContractFactory("FunDAO");
    const fun = await FunDao.deploy()
    await fun.deployed();

    expect(fun)
  });
});

describe("Test delegate", function () {
  it("Should return delegate from constructor", async function() {
    const addresses = await ethers.getSigners();
    const FunDao = await ethers.getContractFactory("FunDAO");
    const fun = await FunDao.deploy()
    await fun.deployed();
    let member = await fun.getMember(addresses[0].address)
    console.log(member)
  });
});

describe("Get current proposal", function () {
  it("Should get current proposal", async function () {
    const addresses = await ethers.getSigners();
    const FunDao = await ethers.getContractFactory("FunDAO");
    const fun = await FunDao.deploy()
    await fun.deployed();   
    let requestedShares = 10;
    let now = new Date()
    let minTime = parseInt(now.setDate(now.getDate()) + (2 * 7));
    let maxTime = parseInt(now.setDate(now.getDate()) + (4 * 7));

    console.log("MINTIME", minTime)
    console.log("MAXTTIME", maxTime)
    let proposalTx = await fun.submitProposal(addresses[1].address,
                                              requestedShares,
                                              minTime,
                                              maxTime);

    let proposal = await fun.getProposalByIndex(0);
    console.log(proposal)
  });
});

describe("Test submitVote by index", function () {
  it("Should get proposal by index & test vote", async function () {
    const addresses = await ethers.getSigners();
    const FunDao = await ethers.getContractFactory("FunDAO");
    const fun = await FunDao.deploy()
    await fun.deployed();      
    
    let requestedShares = 10;
    let now = new Date()
    //let minTime = parseInt(now.setDate(today.getDate()) + (2 * 7));
    var minTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()-7).getTime() / 1000;

    let maxTime = parseInt(now.setDate(now.getDate()) + (4 * 7));
    let currentTime = parseInt(now.setDate(now.getDate()) + (3 * 7));

    let proposalTx = await fun.submitApplicantProposal(requestedShares,
                                              minTime,
                                              maxTime);

    let proposalIndex = 0; // first proposal in queue
    let vote = 1; // vote = yes
    let voteProposalTx = await fun.submitVote(proposalIndex, vote);

    processProposalTx = await fun.processProposal(0);
    let proposal = await fun.getProposalByIndex(0);   
    console.log(proposal)
  });
});

describe("Test process proposal by index", function () {
  it("Should process proposal (by index)", async function () {
    const addresses = await ethers.getSigners();
    const FunDao = await ethers.getContractFactory("FunDAO");
    const fun = await FunDao.deploy()
    await fun.deployed();      
        
    let requestedShares = 10;
    // initialize testing times
    let now = new Date()
    let minTime = parseInt(now.setDate(now.getDate()) + (2 * 7));
    let maxTime = parseInt(now.setDate(now.getDate()) + (4 * 7));
    //let currentTime = parseInt(now.setDate(now.getDate())); // uncomment if testing time < minTime
    let currentTime = parseInt(now.setDate(now.getDate()) + (3 * 7));
    // create proposal
    let proposalTx = await fun.submitApplicantProposal(requestedShares,
                                              minTime,
                                              maxTime);

    let proposalIndex = 0; // first proposal in queue
    let vote = 1; // vote = yes
    let voteProposalTx = await fun.submitVote(proposalIndex, vote);
    //automate random voting
  
    let memberAddresses = []
    memberAddresses.push(addresses[0]) // initialize memberAddresses
    for (let i = 1; i <= addresses.length-1; i++) { // iterate through addresses
      let proposalTx = await fun.submitApplicantProposal(requestedShares,
                                                minTime,
                                                maxTime);
      
      console.log("MEMBERADDRESS LENGTH", memberAddresses.length);
      for (let j = 0; j <= memberAddresses.length-1; j++) { // all members vote randomly
        let voteTx = await fun.connect(memberAddresses[j]).submitVote(i, getRandomInt(3));
      }

      processProposalTx = await fun.processProposal(i);//process new proposal
      let proposal = await fun.getProposalByIndex(i);  //get current
      console.log(proposal);
      if (proposal.passed == true) {
        memberAddresses.push(addresses[i]); // if passed push address to members
      }
    }

  });
});

describe("Test Proposal Approved", function() {
  it("Should assign member to members array w/ requested shares", async function() {
    const addresses = await ethers.getSigners();
    const FunDao = await ethers.getContractFactory("FunDAO");
    const fun = await FunDao.deploy()
    await fun.deployed();
    let requestedShares = 10;
    // initialize testing times
    let now = new Date()
    var minTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()-7).getTime() / 1000;
    //let minTime = parseInt(now.setDate(now.getDate()) - (4 * 7));   
    let maxTime = parseInt(now.setDate(now.getDate()) + (4 * 7));
    const proposalTx = await fun.submitApplicantProposal(requestedShares,
                                                   minTime,
                                                   maxTime);
    const voteTx = await fun.submitVote(0, 1);
    let proposal = await fun.getProposalByIndex(0);
    let proposalLen = await fun.getProposals();
    let member = await fun.getMember(addresses[0].address);
    console.log("MinTime: ", minTime)
    console.log("Proposal Len: ", proposalLen);
    console.log("Proposal", proposal);
    console.log("Member", member);

  });
});

