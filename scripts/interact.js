// interact.js

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { exec } = require("child_process");
const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");
// console.log(JSON.stringify(contract.abi));

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

async function main() {
  //1. read from smart contract state variable
  //   const resp = await helloWorldContract.id_count();
  //   console.log("The response is: " + resp);
  //2. update smart contract
  //   console.log("Creating a job bid..."); // mining process, might take a while
  //   const tx = await helloWorldContract.createJobBid(2008, "google.com", {
  //     value: ethers.utils.parseEther("0.000000001"),
  //   });
  //   await tx.wait();
  //   console.log(tx);
  //3. read stored job bid
  //   const resp = await helloWorldContract.jobBids;
  //   console.log("The response is: " + resp);
  //   console.log("registering job completation..."); // mining process, might take a while
  //   const tx = await helloWorldContract.registerJobCompletion(0, "google.com");
  //   console.log("job completed.");
  awaitAndRunJobs();
  function test() {
    let i = 0;
    for (n = 0; n < 10; ++n) {
      i += (n + 1) * 2;
    }
    return i;
  }
  console.log("run result: ", await run(test, "0.001"));
}
main();

async function awaitAndRunJobs() {
  let lastJobRan = 11;
  let numJobs = 0;
  while (true) {
    while (lastJobRan >= numJobs - 1) {
      numJobs = await helloWorldContract.id_count();
    }
    // run job with id=lastJobRan+1
    let id = lastJobRan + 1;
    console.log("Found job with id ", id);
    let jobBid = await helloWorldContract.jobBids(id);
    let jobLoc = jobBid.job_loc;
    console.log("Running job: ", jobLoc);
    let jobLocModified = "var job = " + jobLoc;
    let jobResult = eval("(" + jobLoc + ")()");
    console.log("jobResult=", jobResult);
    //let jobResult = job();
    console.log("Job completion successful! Registering result to chain...");
    const tx = await helloWorldContract.registerJobCompletion(id, jobResult); // mining process, might take a while
    console.log("job uploaded.");
  }
}

async function run(job, paymentAmt) {
  let jobString = job.toString();
  console.log("Creating a job bid..."); // mining process, might take a while
  const tx = await helloWorldContract.createJobBid(2008, jobString, {
    value: ethers.utils.parseEther(paymentAmt),
  });
  // TODO get id from tx?
  // console.log("Job created: ", tx);
  const jobResult = "";
  const id = (await helloWorldContract.id_count()) - 1;
  console.log("id=", id);
  do {
    const jobResult = await helloWorldContract.outputLocs(id);
  } while (jobResult === "");
  return jobResult;
  //   const tx = await helloWorldContract.createJobBid(2008, "google.com", {
  //     value: ethers.utils.parseEther("0.000000001"),
  //   });
}
