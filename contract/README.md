# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell

//Compile after a change
yarn hardhat compile

//Start node
yarn hardhat node

# //Make sure that ./ignition/parameters.json has the correct params
//Deploy
yarn hardhat ignition deploy ./ignition/modules/Lock.ts
# yarn hardhat ignition deploy ./ignition/modules/Lock.ts --network localhost --parameters ./ignition/parameters.json

//Test
yarn hardhat test

//Full-Test
yarn hardhat coverage

//Copy ./artifacts/contracts/Lock.sol/Lock.json abi list to client/src/utils/Lock_ABI.json

//Copy deployed address to client/src/utils/constants.js
```
