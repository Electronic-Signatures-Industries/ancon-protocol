const crypto = require( 'crypto' );
const moment = require( "moment" );
const web3Abi = require( "web3-eth-abi" );
const web3Utils = require( "web3-utils" );
const ethUtil = require( "ethereumjs-util" );

const VERIFIABLE_CREDENTIAL_TYPEHASH = web3Utils.soliditySha3( "VerifiableCredential(address issuer,address subject,bytes32 data,uint256 validFrom,uint256 validTo)" );
const EIP712DOMAIN_TYPEHASH = web3Utils.soliditySha3( "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)" );

const BigNumber = require('bignumber.js')
const fs = require('fs')
const XDVNFT = artifacts.require('XDVNFT')
const DAI = artifacts.require('DAI')

const ContractImportBuilder = require('../contract-import-builder')

function sha256( data ) {
	const hashFn = crypto.createHash( 'sha256' );
	hashFn.update( data );
	return hashFn.digest( 'hex' );
}

function getCredentialHash( vc, issuer, claimsVerifierContractAddress ) {
  // abi.encodePacked(....)
	const hashDiplomaHex = `0x${sha256( JSON.stringify( vc.credentialSubject ) )}`;

	const encodeEIP712Domain = web3Abi.encodeParameters(
		['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
		[EIP712DOMAIN_TYPEHASH, web3Utils.sha3( "EIP712Domain" ), web3Utils.sha3( "1" ), 648529, claimsVerifierContractAddress]
	);
	const hashEIP712Domain = web3Utils.soliditySha3( encodeEIP712Domain );

	const validFrom = new Date( vc.issuanceDate ).getTime();
	const validTo = new Date( vc.expirationDate ).getTime();
	const subjectAddress = vc.credentialSubject.id.split( ':' ).slice( -1 )[0];
	const encodeHashCredential = web3Abi.encodeParameters(
		['bytes32', 'address', 'address', 'bytes32', 'uint256', 'uint256'],
		[VERIFIABLE_CREDENTIAL_TYPEHASH, issuer, subjectAddress, hashDiplomaHex, Math.round( validFrom / 1000 ), Math.round( validTo / 1000 )]
	);
	const hashCredential = web3Utils.soliditySha3( encodeHashCredential );

	const encodedCredentialHash = web3Abi.encodeParameters( ['bytes32', 'bytes32'], [hashEIP712Domain, hashCredential.toString( 16 )] );
	return web3Utils.soliditySha3( '0x1901'.toString( 16 ) + encodedCredentialHash.substring( 2, 131 ) );
}

function signCredential( credentialHash, pkey ) {
	const rsv = ethUtil.ecsign(
		Buffer.from( credentialHash.substring( 2, 67 ), 'hex' ),
		Buffer.from( pkey, 'hex' )
	);
	return ethUtil.toRpcSig( rsv.v, rsv.r, rsv.s );
}

function createVc (sender, subject) {

	const issuer = {
		address: sender, //'0x47adc0faa4f6eb42b499187317949ed99e77ee85'
		privateKey: 'effa7c6816819ee330bc91f1623f3c66a9fed268ecd5b805a002452075b26c0b'
	};
	// const signers = [{
	// 	address: accounts[2], //'0x4a5a6460d00c4d8c2835a3067f53fb42021d5bb9'
	// 	privateKey: '09288ce70513941f8a859361aeb243c56d5b7a653c1c68374a70385612fe0c2a'
	// }, {
	// 	address: accounts[3], //'0x4222ec932c5a68b80e71f4ddebb069fa02518b8a'
	// 	privateKey: '6ccfcaa51011057276ef4f574a3186c1411d256e4d7731bdf8743f34e608d1d1'
	// }]

	const vc = {
		"@context": "https://www.w3.org/2018/credentials/v1",
		id: "73bde252-cb3e-44ab-94f9-eba6a8a2f28d",
		type: "VerifiableCredential",
		issuer: `did:lac:main:${issuer.address}`,
		issuanceDate: moment().toISOString(),
		expirationDate: moment().add( 1, 'years' ).toISOString(),
		credentialSubject: {
			id: `did:lac:main:${subject}`,
			data: 'test'
		},
		proof: []
	}

  return vc
}

module.exports = async (deployer, network, accounts) => {
    const builder = new ContractImportBuilder();
    const path = `${__dirname}/../abi-export/xdv.js`;

    builder.setOutput(path);
    builder.onWrite = (output) => {
        fs.writeFileSync(path, output);
    };
    let xdvnft;
    let stableCoinAddress = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
    let dai;

    if (network === "bsc") {
      stableCoinAddress = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
    }
    else{
      await deployer.deploy(DAI);
      dai = await DAI.deployed();
      stableCoinAddress = dai.address;
    }
    // else {

    await deployer.deploy(XDVNFT, "XDVNFT", "XDVNFT", stableCoinAddress, "0x50c8bC4391aCb0AF26282b0fA86Bce99Ba010FD4");

    xdvnft = await XDVNFT.deployed();
    await xdvnft.setServiceFeeForContract(new BigNumber(1 * 1e18));
    const fee_bn = new BigNumber(5 * 1e18);
    await dai.mint(accounts[0],fee_bn);

    await xdvnft.mint(accounts[0], "bafyreicztwstn4ujtsnabjabn3hj7mvbhsgrvefbh37ddnx4w2pvghvsfm")

    const vc = createVc(accounts[0], accounts[1])
    const credentialHash = getCredentialHash( vc, accounts[0], "0x50c8bC4391aCb0AF26282b0fA86Bce99Ba010FD4");
		const signature = await signCredential( credentialHash, "f3e81d148eb3ff285bbec91cce16f6809e75e5cfccc1a2140432ea1dba8d2e9c");

    

    xdvnft.swap(
      accounts[0],
      9000, 
      credentialHash, 
      //Math.round( moment( vc.issuanceDate ).valueOf() / 1000 ),
			//Math.round( moment( vc.expirationDate ).valueOf() / 1000 ),
      signature,
      "did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB", 
      "testMetadata",
      "metadata description",
      "bafyreicztwstn4ujtsnabjabn3hj7mvbhsgrvefbh37ddnx4w2pvghvsfm",
      "",
      "[\"QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D\"]",
      "[\"QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D\"]",
    )

    // builder.addContract(
    //   'DAI',
    //   dai,
    //   stableCoinAddress,
    //   network
    // );

    builder.addContract(
      'XDVNFT',
      xdvnft,
      xdvnft.address,
      network
    );
};
