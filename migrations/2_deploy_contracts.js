var MyToken = artifacts.require("MyToken.sol");
var MyTokenSales = artifacts.require("MyTokenSale");
var Kyc = artifacts.require("kycContract");

require("dotenv").config({path: "../.env"});
// console.log(process.env)

module.exports = async function(deployer){
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken);
    
    await deployer.deploy(Kyc);
    
    await deployer.deploy(MyTokenSales, 1, addr[0], MyToken.address, Kyc.address);
    
    let tokenInstance = await MyToken.deployed();

    await tokenInstance.addMinter(MyTokenSales.address);     
    await tokenInstance.renounceMinter();
    // await tokenInstance.transfer(MyTokenSales.address, process.env.INITIAL_TOKENS);
}