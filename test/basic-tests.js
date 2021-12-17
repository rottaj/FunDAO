const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Mint Token", function () {
  it("Should return mint a new FUN token", async function () {

    var supply = 100000;
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
    const FunDao = await ethers.getContractFactory("FunDAO");
    const fun = await FunDao.deploy()
    await fun.deployed();

    expect(fun)
  });
});

describe("Test delegate", function () {
  it("Should return delegate from constructor", async function() {
    const FunDao = await ethers.getContractFactory("FunDAO");
    const fun = await FunDao.deploy()
    await fun.deployed();
    let address = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" 
    let member = await fun.getMember(address)
    console.log(member)
  });
});

describe("Get current proposal", function () {
  it("Should get current proposal", async function () {
    const FunDao = await ethers.getContractFactory("FunDAO");
    const fun = await FunDao.deploy()
    await fun.deployed();   
    let applicantAddress = "0x71be63f3384f5fb98995898a86b02fb2426c5788";
    let requestedShares = 10;
    let proposalTx = await fun.submitProposal(applicantAddress, requestedShares);

    let proposal = await fun.getCurrentProposal();
    console.log(proposal)
  });
});

describe("Test submitVote by index", function () {
  it("Should get proposal by index & test vote", async function () {
    const FunDao = await ethers.getContractFactory("FunDAO");
    const fun = await FunDao.deploy()
    await fun.deployed();      
    let address = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    let assignMemberTx = await fun.assignMember(address);
    
    let applicantAddress = "0x71be63f3384f5fb98995898a86b02fb2426c5788";
    let requestedShares = 10;
    let proposalTx = await fun.submitProposal(applicantAddress, requestedShares);

    let proposalIndex = 0; // first proposal in queue
    let vote = 1; // vote = yes
    let voteProposalTx = await fun.submitVote(proposalIndex, vote);

    let proposal = await fun.getCurrentProposal();
    console.log(proposal)
  });
});

