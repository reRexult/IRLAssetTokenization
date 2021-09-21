var TheAsset = artifacts.require("TheAsset");

module.exports = async function(deployer) {
	await deployer.deploy(TheAsset, 1000000);
}