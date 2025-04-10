const hre = require("hardhat");

async function main() {
  const initialPremium = hre.ethers.parseEther("0.01"); // Example: 0.01 ETH
  const initialCoverage = hre.ethers.parseEther("0.5"); // Example: 0.5 ETH payout
  const policyDuration = 30 * 24 * 60 * 60; // 30 days in seconds

  console.log("Deploying InsurancePolicy contract...");
  console.log(` - Premium: ${hre.ethers.formatEther(initialPremium)} ETH`);
  console.log(` - Coverage: ${hre.ethers.formatEther(initialCoverage)} ETH`);
  console.log(` - Duration: ${policyDuration} seconds`);

  const InsurancePolicy = await hre.ethers.getContractFactory(
    "InsurancePolicy"
  );

  const insurancePolicy = await InsurancePolicy.deploy(
    initialPremium,
    initialCoverage,
    policyDuration
  );

  await insurancePolicy.waitForDeployment();
  const contractAddress = await insurancePolicy.getAddress();
  console.log(`InsurancePolicy deployed to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
