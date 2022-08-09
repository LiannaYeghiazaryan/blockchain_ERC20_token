pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";


contract kycContract is Ownable{
    event setKycEvent(address whichaccountIsgonnabekyc,address msgSender);
    mapping (address=>bool) allowed;

    function SetKycCompleted(address _addr) public onlyOwner {
        emit setKycEvent(_addr, msg.sender);
        allowed[_addr] = true;
    
    }

    function SetKycRevoked(address _addr) public  onlyOwner {
        allowed[_addr] = false;
    }

    function kycCompleted(address _addr) public view returns(bool) {
        return allowed[_addr];
    }
}
