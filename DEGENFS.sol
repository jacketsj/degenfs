// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract DeCloud {

    uint64 public id_count = 0;

    struct JobBid {
        uint256 amount;
        uint256 expiry;
        string  job_loc;
        address owner;
    }

    mapping(uint64 => JobBid) public jobBids;
    mapping(uint64 => address) public jobToCompleter;
    mapping(uint64 => string) public outputLocs;

    function genUUID() public returns(uint64) {
        return id_count++;
    }
    /**
     * @dev Store value in variable
     */
    function createJobBid(uint256 expiry, string memory job_loc) public payable {
        jobBids[genUUID()] = JobBid(msg.value, expiry, job_loc, msg.sender);
        
        // TODO put msg.value into contract wallet
    }

    function registerJobCompletion(uint64 jobId, string memory output_loc) public {
        // caller completed the job
        // should permanently store the location of the output
        jobToCompleter[jobId] = msg.sender;
        outputLocs[jobId] = output_loc;
        // TODO pay the caller the amount for the job
        // transfer(msg.sender, jobBids[jobId].amount);
    }
}