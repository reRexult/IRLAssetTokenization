const Token = artifacts.require("TheAsset");
const AssetSale = artifacts.require("AssetSale");

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;
const KyC = artifacts.require("KyC");

require("dotenv").config({path: "../.env"});

contract("Asset Sale Test", async (accounts) => {

	const [deployerAccount, recipient, CapoAccount] = accounts;

	it("should not have any tokens in my deployerAccount", async () => {
		let instance = await Token.deployed();
		return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
	})

	it("all tokens should be in the AssetSale Contract by default", async() => {
		let instance = await Token.deployed();
		let balanceOfSaleContract = await instance.balanceOf(AssetSale.address);
		let totalSupply = await instance.totalSupply();
		return expect(balanceOfSaleContract).to.be.a.bignumber.equal(totalSupply);
	})

	it("should be possible to buy", async () => {
		let tokenInstance = await Token.deployed();
		let kycInstance = await KyC.deployed();
		let tokenSaleInstance = await AssetSale.deployed();
		await kycInstance.setKyCCompleted(deployerAccount, {from: deployerAccount});
		let priorBalance = await tokenInstance.balanceOf(deployerAccount);
		expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
		priorBalance = priorBalance.add(new BN(1));
		return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(priorBalance);
	})
})