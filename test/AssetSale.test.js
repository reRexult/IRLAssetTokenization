const Token = artifacts.require("TheAsset");
const AssetSale = artifacts.require("AssetSale");

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

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
		expect(balanceOfSaleContract).to.be.a.bignumber.equal(totalSupply);
	})

	it("should be possible to buy")
})