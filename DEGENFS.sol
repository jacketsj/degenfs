// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract DecentralizedDatabase {

    // data owner requests data storer to provide proof that storer still has the data
    struct ProofRequest {
        uint256 result;
        uint256 salt;
    }

    uint64 public id_count = 0;

    struct StoreDataBid {
        uint256 amount;
        uint256 expiry;
        string  data_loc;
        address owner;
    }

    struct Proof {
        uint256 pre_result; // result of taking file and salt and hashing together
    }

    mapping(uint64 => StoreDataBid) public storeDataBids;
    mapping(uint64 => address) public dataToStorer;
    mapping(uint64 => ProofRequest) public idToProofRequests;


    /**
     * @dev Store value in variable
     */
    function storeData_Bid(uint256 amount, uint256 expiry, string memory executable_file) public returns(bool){
        // creates a StoreDataBid struct with the params passed
        // maps id to ^this struct variable
        // store that data inside of storeDataBids
        storeDataBids[id_count] = StoreDataBid(amount, expiry, executable_file, msg.sender);
        id_count = id_count + 1;
        // returns true of all this happens successfully       
        return true;
    }

    function acceptDataBid(uint64 storeBidId) public returns(bool) {
        // maps storeBidId to caller's account address
        // save in contract state
        dataToStorer[storeBidId] = msg.sender;
        return true;
    }

    function requestForDataStoredProof(uint64 id, uint256 result, uint64 salt ) public returns(bool){
        // create a ProofRequest struct variable
        // map id to ^ variable
        // store that info to the state
        idToProofRequests[id] = ProofRequest(result, salt);
        return true;
    }

    // pre_result means data and salt hashed
    function submitDataStoredProof(uint64 id, uint256 pre_result) public returns(bool){
        // verify that hash(pre_result)=result
        uint256 temp = uint256(sha256(abi.encodePacked(pre_result)));
        if(temp == idToProofRequests[id].result) {
            // pay storer

            // if equal, everything corresponding to the id is cleared, and the storer is paid
            
            return true;
        } 

        return false;
    }

    function punishLatePayment(uint64 id) public returns(bool) {
       // if after certain period, proof request is not satisfied
            // storer will have to pay collatoral damages
    }

    /**
    * Helper: shows all the available data bits
    */
    function showDataBids() public returns(bool) {
        return true;
    }

}