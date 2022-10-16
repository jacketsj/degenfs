// interact.js

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");
console.log(JSON.stringify(contract.abi));

/**
 * In order to interact with our contract we need to create an instance of it in our code.
 * To do so with Ethers.js, we'll need to work with three concepts:
 * Provider - this is a node provider that gives you read and write access to the blockchain.
 * Signer - this represents an Ethereum account that has the ability to sign transactions.
 * Contract - this is an Ethers.js object that represents a specific contract deployed on-chain.
 *
 * more: https://docs.ethers.io/v5/
 */

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);
