pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20Mintable.sol";

contract MyToken is ERC20 , ERC20Mintable{
    // constructor(uint256 initialSupply) ERC20("StarDucks Capu-Token", "SCT") public {
    //     _mint(msg.sender, initialSupply);
    // // _setupDecimals(0);
    // }

    // constructor() ERC20Mintable() public {
    //     // super.mint(msg.sender);
    // }

    // function mint(address account, uint256 amount) public override returns(bool) {
    //     return super.mint(account, amount);
    // }

      constructor() ERC20("StarDucks Capu-Token", "NIC")  public{

    }



}