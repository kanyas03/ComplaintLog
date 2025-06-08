require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"localhost",
  solidity: "0.8.30",
  networks:{
    localhost:{
      url:" http://127.0.0.1:8545/"
    },
    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_KEY}`,
      accounts:[process.env.PRIVATE_KEY]
    }
  }
 
};
// console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);
// console.log("SEPOLIA_KEY:", process.env.SEPOLIA_KEY);

