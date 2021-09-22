const Token = artifacts.require("TheAsset");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

require("dotenv").config({path: "../.env"});
console.log(process.env);

contract("Token Test", async (accounts) => {

	const [deployerAccount, recipient, CapoAccount] = accounts;

	beforeEach(async() => {
		this.myToken = await Token.new(process.env.INITIAL_SUPPLY);

	})

	it("all tokens should be in account 0", async () => {
		let instance = this.myToken;
		let totalSupply = await instance.totalSupply();
		expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
	})

	it("is possible to send tokens between accounts", async() => {
		const sendTokens = 1;
		let instance = this.myToken;
		let totalSupply = await instance.totalSupply();
		expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
		expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
		expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
		expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
	})

	it("is not possible to send more tokens than available in total", async () => {
		let instance = this.myToken;
		let balanceOfDeployer = await instance.balanceOf(deployerAccount);

		expect(instance.transfer(recipient, new BN(balanceOfDeployer))).to.eventually.be.fulfilled;

		expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
	})
})