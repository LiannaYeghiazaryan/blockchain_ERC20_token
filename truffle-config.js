const path = require("path");
require('dotenv').config({path: './.env'});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      network_id: "*",
      host: "127.0.0.1"
      },
    ganache_local: {
      provider: function(){
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", MetaMaskAccountIndex)
      },
      network_id: "1337"
    },
    guerli_infura: {
      provider: function(){
        return new HDWalletProvider(process.env.MNEMONIC, "https://goerli.infura.io/v3/5bd75d1859164e6cac2d85aa5abf4eb3", MetaMaskAccountIndex)
      },
      network_id: "5"
    },
    ropsten_infura: {
      provider: function(){
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/5bd75d1859164e6cac2d85aa5abf4eb3", MetaMaskAccountIndex)
      },
      network_id: "3"
    },
  },
  compilers: {    
    solc: {
      version: "^0.8.0"
    }
}

};
