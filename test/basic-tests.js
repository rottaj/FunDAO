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

    let proposal = await fun.getCurrentProposal();
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
    let minTime = parseInt(now.setDate(now.getDate()) + (2 * 7));
    let maxTime = parseInt(now.setDate(now.getDate()) + (4 * 7));
    let currentTime = parseInt(now.setDate(now.getDate()) + (3 * 7));

    let proposalTx = await fun.submitProposal(addresses[1].address,
                                              requestedShares,
                                              minTime,
                                              maxTime);

    let proposalIndex = 0; // first proposal in queue
    let vote = 1; // vote = yes
    let voteProposalTx = await fun.submitVote(proposalIndex, vote);

    processProposalTx = await fun.processProposal(0, currentTime);
    let proposal = await fun.getCurrentProposal();   
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
    let proposalTx = await fun.submitProposal(addresses[1].address,
                                              requestedShares,
                                              minTime,
                                              maxTime);

    let proposalIndex = 0; // first proposal in queue
    let vote = 1; // vote = yes
    let voteProposalTx = await fun.submitVote(proposalIndex, vote);
    //automate random voting

    for (let i = 0; i <= addresses.length-1; i++) {
      let voteTx = await fun.connect(addresses[i]).submitVote(0, getRandomInt(3));;
    }
    // process proposal

    processProposalTx = await fun.processProposal(0, currentTime);
    let proposal = await fun.getCurrentProposal();   
    console.log(proposal)
  });
});
