const Token = artifacts.require("TheAsset");

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("Token Test", async (accounts) => {

	const [deployerAccount, recipient, CapoAccount] = accounts;

	beforeEach(async() => {
		this.myToken = await Token.new(process.env.INITIAL_SUPPLY);

	})

	it("all tokens should be in account 0", async () => {
		let instance = this.myToken;
		let totalSupply = await instance.totalSupply();
		return expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
	})

	it("is possible to send tokens between accounts", async() => {
		const sendTokens = 1;
		let instance = this.myToken;
		let totalSupply = await instance.totalSupply();
		expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
		expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
		expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
		return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
	})

	it("is not possible to send more tokens than available in total", async () => {
		let instance = this.myToken;
		let balanceOfDeployer = await instance.balanceOf(deployerAccount);

		expect(instance.transfer(recipient, new BN(balanceOfDeployer))).to.eventually.be.fulfilled;

		return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.not.equal(balanceOfDeployer);
	})
})