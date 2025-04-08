import Lock_ABI from "./Lock_ABI.json";
import { BrowserProvider, Contract, parseEther, formatEther } from "ethers";
import { CONTRACT_ADDRESS } from "./Constants";
import { InterfaceAbi } from "ethers";

// Module-level variables to store provider, signer, and contract
let provider: BrowserProvider | null = null;
let signer = null;
let contract: Contract | null = null;

// Function to initialize the provider, signer, and contract
export const initialize = async () => {
  if (typeof window.ethereum !== "undefined") {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(
      CONTRACT_ADDRESS,
      Lock_ABI.abi as InterfaceAbi,
      signer
    );
    console.log("Contract initialized successfully!");
  } else {
    console.error(
      "MetaMask is not installed. Please install MetaMask to use this application."
    );
  }
};

// Function to request single account
export const requestAccount = async () => {
  if (!provider) {
    console.warn("Provider is not initialized. Attempting to initialize...");
    await initialize(); // Attempt to initialize the provider
    if (!provider) {
      console.error(
        "Failed to initialize provider. Call initialize() manually."
      );
      return null;
    }
  }
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0]; // Return the first account
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error requesting account:", error.message);
    } else {
      console.error("Error requesting account:", error);
    }
    return null;
  }
};

// Function to get contract balance in ETH
export const getContractBalanceInETH = async () => {
  if (!provider || !contract) {
    console.error(
      "Provider or contract is not initialized. Call initialize() first."
    );
    return null;
  }
  const balanceWei = await provider.getBalance(CONTRACT_ADDRESS);
  const balanceEth = formatEther(balanceWei); // Convert Wei to ETH string
  return balanceEth; // Convert ETH string to number
};

// Function to deposit funds to the contract
export const depositFund = async (depositValue: string) => {
  if (!contract) {
    console.error("Contract is not initialized. Call initialize() first.");
    return;
  }
  const ethValue = parseEther(depositValue);
  const deposit = await contract.deposit({ value: ethValue });
  await deposit.wait();
};

// Function to withdraw funds from the contract
export const withdrawFund = async () => {
  if (!contract) {
    console.error("Contract is not initialized. Call initialize() first.");
    return;
  }
  const withdrawTx = await contract.withdraw();
  await withdrawTx.wait();
  console.log("Withdrawal successful!");
};
