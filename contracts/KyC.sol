pragma solidity 0.6.1;


import "@openzeppelin/contracts/ownership/Ownable.sol";

contract KyC is Ownable{
	mapping(address => bool) confirmed;

	function setKyCCompleted(address _addr) public onlyOwner {
		confirmed[_addr] = true;

	}
	function setKyCRemoved(address _addr) public onlyOwner {
		confirmed [_addr] = false;
	}
	function KyCCompleted(address _addr) public view returns (bool) {
		return confirmed[_addr];
	}
}