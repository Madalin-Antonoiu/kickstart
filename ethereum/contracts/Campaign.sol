pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender); //msg.sender is the user trying to create the campaign
        deployedCampaigns.push(newCampaign);
    }
    
    function getAllDeployedCampaigns () public view returns (address[]) {
        return deployedCampaigns;
    }
}
contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true; // adds a new key of sender address and sets its value to true ( alike JS)
        approversCount++; // how many people contributed
    }
    
    function createRequest(string description, uint value, address recipient) public restricted{
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        // Request(description,value, recipient, false); DON'T DO THIS
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index]; // manipulate the copy
        
        require(approvers[msg.sender]); // must be marked as a contributor (has donated already)
        require(!request.approvals[msg.sender]); // if the user has not yet approved
    
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2) ); //has gotten enough approvals (at least > half of them)
        require(!request.complete);  // not already marked as complete
        
        request.recipient.transfer(request.value);   //take the money and send to the recipient
        
        request.complete = true; // prevent multiple-spending
    }
    
}