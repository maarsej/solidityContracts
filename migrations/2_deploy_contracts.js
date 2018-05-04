var Voting = artifacts.require("./Voting.sol");
//var buyDrugs = artifacts.require("./buyDrugs.sol");
/* var terms = {
          dosage: 100, //in mG
          amount: 31, //number of doses
          frequency: 24 //every ** hours
          doctorID: 123, 
          ppmG: 1000, //in cents per mG
          drugID: 123,
          startDate: 01/01/2018,
          endDate: 01/02/2018
} */

module.exports = function(deployer) {
  deployer.deploy(Voting, ['Rama', 'Nick', 'Jose'], {gas: 6700000});
  // deployer.deploy(buyDrugs, terms, {gas: 6700000});
};
