"use strict";
const Token = artifacts.require("TheAsset");
const AssetSale = artifacts.require("AssetSale");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
module.exports = chai;