pragma solidity 0.6.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract TheAsset is ERC20, ERC20Detailed {
	constructor(uint256 initialSupply) ERC20Detailed("The Asset Token", "TAT", 0) public {
		_mint(msg.sender, 1000000);
	}
}