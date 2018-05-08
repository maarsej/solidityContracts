
// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'

import prescription_artifacts from '../../build/contracts/Prescription.json'
import { EROFS } from "constants";

// Contract object
var Prescription = contract(prescription_artifacts);

let values = { "drugID": "field-1", "dosage": "field-2", "numberOfDoses": "field-3", "frequencyOfDose": "field-4" }

$(document).ready(function () {
  if (typeof web3 !== 'undefined' /*'&& false' used to escape metamask being installed in my browser */) {
    console.warn("Using web3 detected from external source like Metamask")
    // Use MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Prescription.setProvider(web3.currentProvider);
  let valueNames = Object.keys(values);
  for (var i = 0; i < valueNames.length; i++) {
    let value = valueNames[i];
    const contractInstance = Prescription.at("0xd49bDC6802Acc58931591749607ad08cb13F8e67");
    contractInstance[value].call().then(function (v) {
      $("#" + values[value]).html(v.toString());
    })
  }
});
    //****takes last deployed contract i think?****

    // Prescription.deployed().then(function (contractInstance) { 
    //   contractInstance[value].call().then(function (v) {
    //     $("#" + values[value]).html(v.toString());
    //   }).catch((error => {
    //     console.log(error)
    //   }))
    // }).catch((error) => {
    //   console.log(error)
    // })


let currentUser = web3.eth.accounts[0];

window.newPrescription = function (/*PUT currentUser HERE*/) {
  if (typeof web3 !== 'undefined' /*'&& false' used to escape metamask being installed in my browser */) {
    console.warn("Using web3 detected from external source like Metamask")
    // Use MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Prescription.setProvider(web3.currentProvider);

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

  Prescription.new(drugID, dosage, numberOfDoses, frequencyOfDose, { from: currentUser, gas: 6000000 }).then(instance => {
    var checkAddress  = setInterval(() => { 
      if (instance.address) {
        console.log("Contract address: " + instance.address);
        clearInterval(checkAddress)
        $("#msg").html("Contract has been added!")
      }
    }, 100);
  });

  console.log("contract created?")

}
/* ******************** IMPORTANT ************************
 TO GET AN INSTANCE OF A CONTRACT WITH A KNOWN ADDRESS

 const instance = Prescription.at(contractAddress)

 http://truffleframework.com/docs/getting_started/contracts
******************** IMPORTANT ************************ */
