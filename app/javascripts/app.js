
// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3 } from 'web3';
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

import perscription_artifacts from '../../build/contracts/Perscription.json'
import { EROFS } from "constants";

// Contract object
var Perscription = contract(perscription_artifacts);

let values = { "drugID": "field-1", "dosage": "field-2", "numberOfDoses": "field-3", "frequencyOfDose": "field-4" }

$(document).ready(function () {
  if (typeof web3 !== 'undefined' /*'&& false' used to escape metamask being installed in my browser */) {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Perscription.setProvider(web3.currentProvider);
  let valueNames = Object.keys(values);
  for (var i = 0; i < valueNames.length; i++) {
    let value = valueNames[i];
    Perscription.deployed().then(function (contractInstance) {
      contractInstance[value].call().then(function (v) {
        $("#" + values[value]).html(v.toString());
      }).catch((error => {
        console.log(error)
      }))
    }).catch((error) => {
      console.log(error)
    })
  }
});

let currentUser = web3.eth.accounts[0];

window.newPerscription = function (/*PUT CURRENT USER HERE*/) {
  if (typeof web3 !== 'undefined' && false /*'&& false' used to escape metamask being installed in my browser */) {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Perscription.setProvider(web3.currentProvider);

  let candidateName = $("#candidate").val();
  let drugID = $("#drugID").val();
  let dosage = $("#dosage").val();
  let numberOfDoses = $("#numberOfDoses").val();
  let frequencyOfDose = $("#frequencyOfDose").val();

  $("#msg").html("Contract has been submitted to the blockchain. Please wait.")
  $("#drugID").val("");
  $("#dosage").val("");
  $("#numberOfDoses").val("");
  $("#frequencyOfDose").val("");

  Perscription.new(drugID, dosage, numberOfDoses, frequencyOfDose, { from: currentUser, gas: 6000000 }).then(instance => {
    console.log("Contract address: " + instance.address);
  });

  console.log("contract created?")

}
//******************** IMPORTANT ************************
// TO GET AN INSTANCE OF A CONTRACT WITH A KNOWN ADDRESS
// const instance = Perscription.at(contractAddress)
// http://truffleframework.com/docs/getting_started/contracts
//******************** IMPORTANT ************************
