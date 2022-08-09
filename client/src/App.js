import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import kycContract from "./contracts/kycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, kycAddress: "0x123", tokenSaleAddress: "", userTokens: 0};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();
      console.log(this.web3, 'web3')

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();
      console.log(this.accounts, 'accounts')

      // Get the contract instance.
      // this.networkId = await this.web3.eth.net.getId();

      this.networkId = await this.web3.eth.getChainId();      

      // this.deployedNetwork = SimpleStorageContract.networks[networkId];

      this.MyTokenInstance = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] &&  MyToken.networks[this.networkId].address
      );
      // console.log( MyToken.networks[this.networkId],'[asd', MyToken.networks[this.networkId].address, 'MyTokenInstance', MyToken.networks[this.networkId] &&  MyToken.networks[this.networkId].address, 'aaaaaaaa')

      this.MyTokenSaleInstance = new this.web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address
      );
    console.log(this.MyTokenSaleInstance, 'my token sale instance');

      this.kycContractInstance = new this.web3.eth.Contract(
        kycContract.abi,
        kycContract.networks[this.networkId] && kycContract.networks[this.networkId].address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      this.setState({loaded: true, tokenSaleAddress: this.MyTokenSaleInstance._address}, this.updateTokens);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  listenToTokenTransfer = async() => {
    this.MyTokenInstance.events.Transfer({to: this.accounts[0]}).on("data", this.updateTokens);
  }

  updateTokens = async () => {
    console.log(this.accounts, 'accounts')
    let userTokens = await this.MyTokenInstance.methods.balanceOf(this.accounts[0]).call();
    console.log(this.MyTokenInstance, 'usertokens')
    this.setState({userTokens: userTokens})
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleKycSubmit = async () => {
    const {kycAddress} = this.state;
    let t = await this.kycContractInstance.methods.SetKycCompleted(kycAddress).send({from: this.accounts[0]});
    // console.log(t.event.setKycEvent,'t')
    alert("Account "+kycAddress+" is now whitelisted");
  };

  buyTokens = async () => {
    await this.MyTokenSaleInstance.methods.buyTokens(this.accounts[0]).send({from: this.accounts[0], value: '1'});

  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Capuccino Token for StarDucks</h1>

        <h2>Enable your account</h2>
        Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleKycSubmit}>Add Address to Whitelist</button>
        <h2>Buy Cappucino-Tokens</h2>
        <p>Send Ether to this address: {this.state.tokenSaleAddress}</p>
        <p>You have {this.state.userTokens} SCt  tokens </p>
        <button type="button" onClick={this.buyTokens}>Buy tokenss</button>
      </div>
    );
  }
}

export default App;
