var TheAsset = artifacts.require("TheAsset");
var AssetSale = artifacts.require("AssetSale");

module.exports = async function(deployer) {
	let addr = await web3.eth.getAccounts()
	await deployer.deploy(TheAsset, 1000000);
	await deployer.deploy(AssetSale, 1, addr[0], TheAsset.address)
	let instance = await TheAsset.deployed();
	await instance.transfer(AssetSale.address, 1000000);
}