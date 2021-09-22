var TheAsset = artifacts.require("TheAsset");
var AssetSale = artifacts.require("AssetSale");
require("dotenv").config({path: "../.env"});
console.log(process.env);

module.exports = async function(deployer) {
	let addr = await web3.eth.getAccounts()
	await deployer.deploy(TheAsset, process.env.INITIAL_SUPPLY);
	await deployer.deploy(AssetSale, 1, addr[0], TheAsset.address)
	let instance = await TheAsset.deployed();
	await instance.transfer(AssetSale.address, process.env.INITIAL_SUPPLY);

}