pragma solidity ^0.4.18;

contract Perscription {

    //Set by patient/doctor
    uint private drugID;
    uint private dosage;
    uint private numberOfDoses;
    uint private frequencyOfDose;
    uint private doctorId = 123456;
    address private patient;

    bool private signed; //false if no bid acc, true if bid acc and provider signed on
    //agreed upon by pharma and set at time of signature
    uint private costPerDose;
    uint private startDate;
    uint private endDate;
    address private provider;

    uint[] public paymentsRecieved;

    modifier authorizedToViewCheck {
        require (msg.sender == patient || msg.sender == provider); /* || msg.sender == doctorId*/
        _;
    }

    modifier signedContract {
        require(signed);
        _;
    }

    function Perscription(uint incDrugID, uint incDosage, uint incNumberOfDoses, uint incFrequencyOfDose) public {
        patient = msg.sender;
        drugID = incDrugID;
        dosage = incDosage;
        numberOfDoses = incNumberOfDoses;
        frequencyOfDose = incFrequencyOfDose;
        signed = false;
    }

    function providerSignWithTerms(uint accCostPerDose, uint accStartDate, uint accEndDate, address accProvider) public {
        if (msg.sender == patient) {  //make sure that auction is being ended by the creator themselves
            costPerDose = accCostPerDose;
            startDate = accStartDate;
            endDate = accEndDate;
            provider = accProvider;
            signed = true;
            return;
        }
    }

    // MAKE GETTERS FOR EVERYTHING AND THEN A JS FUNCTION ON THE OTHER SIDE THAT CALLS THEM ALL AND COMPILES INTO NICE OBJECT

}