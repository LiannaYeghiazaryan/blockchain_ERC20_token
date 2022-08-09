const MyTokenSale = artifacts.require("MyTokenSale");
const MyToken = artifacts.require("MyToken")
const kycContract = artifacts.require("kycContract");


var chai = require("./chaisetup");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path:"../.env"})

contract("MyToken Test", async function(accounts){

    const [ initialHolder, recipient, anotherAccount ] = accounts;

    it("there shouldnt be any coins in my account",  async() => {
        let instance =  await MyToken.deployed()
        expect(await instance.balanceOf.call(initialHolder)).to.be.a.bignumber.equal(new BN(0));
        // console.log(await instance.balanceOf.call(initialHolder), 'instance');
        // expect(instance)
    });

    it("all coins should be in the tokensale smart contract", async () => {
        let instance = await MyToken.deployed();
        let balance = await instance.balanceOf.call(MyTokenSale.address);
        let totalSupply = await instance.totalSupply.call();
        return expect(balance).to.be.a.bignumber.equal(totalSupply);
    });
    
    it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
        let tokenInstance = await MyToken.deployed();
        let tokenSaleInstance = await MyTokenSale.deployed();
        // let kycInstance = await KycContract.deployed();
        // console.log(kycInstance, '111', KycContract, '123' );
        // await kycInstance.SetKycCompleted(initialHolder);
        let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);

        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.rejected;
        await expect(balanceBeforeAccount).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    
        let kycInstance = await kycContract.deployed();
        await kycInstance.SetKycCompleted(recipient);
    
        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    
    });

});