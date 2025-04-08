import "@nomicfoundation/hardhat-ethers";
import "solidity-coverage";
import "@nomicfoundation/hardhat-ignition";

module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
    hardhat: {
      // See defaults
      chainId: 1337,
    },
  },
  solidity: "0.8.27",
};
