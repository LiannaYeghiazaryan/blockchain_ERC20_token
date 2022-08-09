var chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;

const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var ChaiASPromised = require("chai-as-promised");
chai.use(ChaiASPromised);

module.exports = chai;