const fs = require('fs');
const Web3 = require('web3');

const main = async() => {
  const funDaoContractFactory = await hre.ethers.getContractFactory("FunDAO");
  const funDaoContract = await funDaoContractFactory.deploy();
  await funDaoContract.deployed();
  console.log("CONTRACT DEPLOYED TO: ", funDaoContract.address);

  let txn;
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log("ERROR", error);
    process.exit(1);
  }

}
runMain();
