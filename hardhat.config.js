require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
//require("dotenv").config({path:'../.env'});
require("dotenv").config();

const RINKEBY_URL = process.env.RINKEBY_URL;
const PHRASE = process.env.PHRASE;


module.exports = {
  solidity: "0.8.11",
  networks: {
    rinkeby: {
      url: RINKEBY_URL,
      accounts: [PHRASE],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
};
