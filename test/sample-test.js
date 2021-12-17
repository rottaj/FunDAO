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

