// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ComplaintLog {

    struct Complaint {
        uint id;
        string title;
        string description;
        address reporter;
        uint timestamp;
        uint upvotes;
    }

    Complaint[] public complaints;
    mapping(uint => mapping(address => bool)) public hasVoted;

    address public admin;
    uint public complaintCounter = 0;

    constructor() {
        admin = msg.sender;
    }

    function writeComplaint(string memory _title, string memory _description) public {
        complaints.push(Complaint({
            id: complaintCounter,
            title: _title,
            description: _description,
            reporter: msg.sender,
            timestamp: block.timestamp,
            upvotes: 0
        }));
        complaintCounter++;
    }

    function getComplaint(uint _id) public view returns (
        uint, string memory, string memory, address, uint, uint
    ) {
        require(_id < complaintCounter, "Complaint not found");
        Complaint memory c = complaints[_id];
        return (
            c.id, c.title, c.description, c.reporter, c.timestamp, c.upvotes
        );
    }

    function upvoteComplaint(uint _id) public {
        require(_id < complaintCounter, "Complaint not found");
        require(!hasVoted[_id][msg.sender], "Already voted");
        complaints[_id].upvotes++;
        hasVoted[_id][msg.sender] = true;
    }

    function getTotalComplaints() public view returns (uint) {
        return complaintCounter;
    }

    function deleteComplaint(uint _id) public {
        require(msg.sender == admin, "Only admin");
        require(_id < complaintCounter, "Complaint not found");
        delete complaints[_id];
    }
}
