const Migrations = artifacts.require("Migrations");
const CredentialRegistry = artifacts.require("CredentialRegistry");
const ClaimsVerifier = artifacts.require("ClaimsVerifier");
const Web3 = require("web3");


module.exports = function (deployer) {
  deployer.deploy(Migrations);

  const verifier = '0x77C51E844495899727dB63221af46220b0b13B37'
  const registry = '0xF1Ef6C5BCbEEb904F70501A3Bdb45F45A148ACEE'
 const tokenid = '0xb0c578D19f6E7dD455798b76CC92FfdDb61aD635' 
const chainid = '3'

await deployer.deploy(Migrations);
const registry = await deployer.deploy(CredentialRegistry);
const verifier = await deployer.deploy(ClaimsVerifier, registry.address);
const registryContract = await CredentialRegistry.deployed();

deployer.deploy(Crossmint, tokenid, registry, verifier, chainid);




};
