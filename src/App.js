import React, { Component } from "react";
import TheAsset from "./contracts/TheAsset.json";
import AssetSale from "./contracts/AssetSale.json";
import KyC from "./contracts/KyC.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {loaded:false, kycAddress: "0x00..."};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.tokenInstance = new this.web3.eth.Contract(
        TheAsset.abi,
        TheAsset.networks[this.networkId] && TheAsset.networks[this.networkId].address,
      );
      this.tokenSaleInstance = new this.web3.eth.Contract(
        AssetSale.abi, AssetSale.networks[this.networkId] && AssetSale.networks[this.networkId].address,
      );
      this.kycInstance = new this.web3.eth.Contract(
        KyC.abi, KyC.networks[this.networkId] && KyC.networks[this.networkId].address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({loaded:true}, this.runExample)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleKycWhitelisting = async () => {
    await this.kycInstance.setKyCCompleted(this.state.kycAddress).send({from: this.accounts[0]});
    alert("KYC for "+this.state.kycAddress+" is completed");
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Point of Sale for tokenized asset.</h1>
        <p>Imagine the possibilties.</p>
        <h2>Whitelisting through KyC Smart Contract</h2>
        Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleKycWhitelisting}>Submit Address For Whitelisting</button>
      </div>
    );
  }
}

export default App;
