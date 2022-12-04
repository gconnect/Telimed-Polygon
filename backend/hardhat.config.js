require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "alfajores",
  networks: {
     mumbai: {
     url: API_URL,
     accounts: [PRIVATE_KEY],
   }
  }
};
