// Help Truffle find TruffleTutorial.sol in the /contracts directory
const TruffleTutorial = artifacts.require("LendingContract");

module.exports = function(deployer) {
  // Command Truffle to deploy the Smart Contract
  deployer.deploy(TruffleTutorial,"0x13f360136E91edC0B13Ea73C244985bB07cE184B","3","3","3");
};