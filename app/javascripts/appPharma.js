
// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

/*
 * When you compile and deploy your Voting contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Voting abstraction. We will use this abstraction
 * later to create an instance of the Voting contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

import perscrip_artifacts from '../../build/contracts/Perscription.json'

var Perscription = contract(perscrip_artifacts);

let values = {"drugID": "value-1", "dosage": "value-2", "numberOfDoses": "value-3"}

// window.voteForCandidate = function(candidate) {
//   let candidateName = $("#candidate").val();
//   try {
//     $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
//     $("#candidate").val("");

//     /* Voting.deployed() returns an instance of the contract. Every call
//      * in Truffle returns a promise which is why we have used then()
//      * everywhere we have a transaction call
//      */
//     Voting.deployed().then(function(contractInstance) {
//       contractInstance.voteForCandidate(candidateName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
//         let div_id = candidates[candidateName];
//         return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
//           $("#" + div_id).html(v.toString());
//           $("#msg").html("");
//         });
//       });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

$( document ).ready(function() {
if (typeof web3 !== 'undefined' && false /*'&& false' used to escape metamask being installed in my browser */) {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Voting.setProvider(web3.currentProvider);
  let valueNames = Object.keys(values);
  for (var i = 0; i < valueNames.length; i++) {
    let value = valueNames[i];
    Perscription.deployed().then(function(contractInstance) {
      contractInstance.totalVotesFor.call(name).then(function(v) {
        $("#" + values[value]).html(v.toString());
      });
    })
  }
});