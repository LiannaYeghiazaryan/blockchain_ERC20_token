const MyToken = artifacts.require("MyToken");

var chai = require("./chaisetup");

const BN = web3.utils.BN;
// const chaiBN = require('chai-bn')(BN);
// chai.use(chaiBN);

// var chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);

const expect = chai.expect;
require("dotenv").config({path:"../.env"})

contract("MyToken Test", async accounts => {
    const [ initialHolder, recipient, anotherAccount ] = accounts;

    beforeEach(async () => {
        this.MyToken = await MyToken.new(process.env.INITIAL_TOKENS)
    })

    it("All tokens should be in my account", async () => {
    let instance =this.MyToken;
    let totalSupply = await instance.totalSupply();
    // console.log(await instance.balanceOf(initialHolder), 'initialHolder', totalSupply, 'totalSupply');
    //old style:
    //let balance = await instance.balanceOf.call(initialHolder);
    //assert.equal(balance.valueOf(), 0, "Account 1 has a balance");
    //condensed, easier readable style:
    expect(await instance.balanceOf(initialHolder)).to.be.a.bignumber.equal(totalSupply);
    });

    it("I can send tokens from Account 1 to Account 2", async () => {
        const sendTokens = 1;
        let instance = this.MyToken;
        let totalSupply = await instance.totalSupply();
        // console.log(await instance.balanceOf(initialHolder), 'initialHolder', totalSupply, 'totalSupply');
        // console.log( expect(await instance.balanceOf(initialHolder)).to.be.a.bignumber.equal(totalSupply), 'ddd')

        expect(await instance.balanceOf(initialHolder)).to.be.a.bignumber.equal(totalSupply);
        
        // console.log(expect(await instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled, 'sdfsdf');     
         await expect(instance.transfer(recipient, sendTokens)).to.be.eventually.fulfilled;
        // console.log(await instance.balanceOf(initialHolder), 'intial holder');
        // console.log(sendTokens,'sendTokens', new BN(sendTokens), 'new BN(sendTokens)', await instance.balanceOf(initialHolder), 'initialHolder', new BN(totalSupply.sub(new BN(sendTokens))), 'totalSupply');
        expect(await instance.balanceOf(initialHolder)).to.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        expect( await instance.balanceOf(recipient)).to.be.a.bignumber.equal(new BN(sendTokens));
      });
  
  
      it("It's not possible to send more tokens than account 1 has", async () => {
        let instance = this.MyToken;
        let balanceOfAccount = await instance.balanceOf(initialHolder);
        await expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;
  
        //check if the balance is still the same
        expect(await instance.balanceOf(initialHolder)).to.be.a.bignumber.equal(balanceOfAccount);
  
      });
});