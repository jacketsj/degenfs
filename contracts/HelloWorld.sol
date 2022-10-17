// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract HelloWorld {

    uint64 public id_count = 0;

    struct JobBid {
        uint256 amount;
        uint256 expiry;
        string  job_loc;
        address owner;
    }

    mapping(uint64 => JobBid) public jobBids;
    mapping(uint64 => address payable) public jobToCompleter;
    mapping(uint64 => string) public outputLocs;

    function genUUID() public returns(uint64) {
        return id_count++;
    }
    /**
     * @dev Store value in variable
     */
    function createJobBid(uint256 expiry, string memory job_loc) public payable returns (uint64) {
        uint64 uuid = genUUID();
        jobBids[uuid] = JobBid(msg.value, expiry, job_loc, msg.sender);
        return uuid;
    }

    function registerJobCompletion(uint64 jobId, string calldata output_loc) public {
        // TODO don't let this run if the job was already completed and paid for
        // caller completed the job
        // should permanently store the location of the output
        jobToCompleter[jobId] = payable(msg.sender);
        outputLocs[jobId] = output_loc;
        // pay the caller the amount for the job
        // jobToCompleter[jobId].transfer(jobBids[jobId].amount/100);
        (bool sent, bytes memory data) = jobToCompleter[jobId].call{value: jobBids[jobId].amount}("");
        require(sent);
    }
}
