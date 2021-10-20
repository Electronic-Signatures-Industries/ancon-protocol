const { BigNumber } = require('bignumber.js')
const { assert } = require('chai')
const Web3 = require('web3')
const ethers = require('ethers')
const Bluebird = require('bluebird')
//const TestUSDC = artifacts.require("USDC");
const AnconVerifier = artifacts.require('AnconVerifier')
//const XDVController = artifacts.require("XDVController");
const ics23 = require('@confio/ics23')
const { base64 } = require('ethers/lib/utils')

contract('Ancon - ICS23 Javascript to ABI', (accounts) => {
  // let erc20Contract;
  // let controllerContract;
  // let documentMinterAddress;
  let anconVerifierContract
  let toABI = (exists) => {
    const innerOp = [[]]
    const leafOp = [
      ics23.ics23.HashOp[exists.leaf.hash],
      ics23.ics23.HashOp[exists.leaf.prehash_key],
      ics23.ics23.HashOp[exists.leaf.prehash_value],
      ics23.ics23.LengthOp[exists.leaf.length],
    ]

    return {
      leafOp,
      prefix: exists.leaf.prefix,
      innerOp,
      key: exists.key,
      value: exists.value,
    }
  }
  let proof = {
    key:
      'YmFmeXJlaWNkNGd2cGJqcDR3ZWN0Yno0Mjc0YWd2ZnN4Mm4zd3J4cWR6dXA0M2V1azN0dWQyN2N4bWU=',
    value:
      'qmNkaWRgZGtpbmRobWV0YWRhdGFkbmFtZWp0ZW5kZXJtaW50ZWltYWdldWh0dHA6Ly9sb2NhbGhvc3Q6MTMxN2VsaW5rc4HYKlglAAFxEiAe9b351lHuEQAZl2qWbdxrvaLk6O7sh5TzqMDBMwQ3EmVvd25lcngzZGlkOmV0aHI6MHhlZUM1OEU4OTk5NjQ5NjY0MGM4YjU4OThBN2UwMjE4RTliNkU5MGNCZnBhcmVudGBnc291cmNlc4F4LlFtUVJXR3hvRGhnOEpNb0RaYU4xdDFLaVlDYzVkTTlOUFhZRVk3VzhrSjhKd2prZGVzY3JpcHRpb25qdGVuZGVybWludHV2ZXJpZmllZENyZWRlbnRpYWxSZWZg',
    leaf: {
      hash: 'SHA256',
      prehash_key: 'NO_HASH',
      prehash_value: 'SHA256',
      length: 'VAR_PROTO',
      prefix: 'AA==',
    },
    path: [],
  }
  // Initialize the contracts and make sure they exist
  before(async () => {
    ;({ anconVerifierContract } = await Bluebird.props({
      anconVerifierContract: AnconVerifier.deployed(),
      //erc20Contract: TestUSDC.deployed(),
      //controllerContract: XDVController.deployed(),
    }))
  })

  describe('when requesting an ownership update to a NFT using an ics23 vector commitment proof', () => {
    it('should verify ownership ok', async () => {
      const abiProof = toABI(proof)

      const root = await anconVerifierContract.requestRoot(
        abiProof.leafOp,
        ethers.utils.toUtf8Bytes(abiProof.prefix),
        abiProof.innerOp,
        ethers.utils.toUtf8Bytes(abiProof.key),
        ethers.utils.toUtf8Bytes(abiProof.value), {
          from: accounts[0],
        }
      )


      const res = await anconVerifierContract.changeOwnerWithProof(
        abiProof.leafOp,
        ethers.utils.toUtf8Bytes(abiProof.prefix),
        abiProof.innerOp,
        ethers.utils.toUtf8Bytes(abiProof.key),
        ethers.utils.toUtf8Bytes(abiProof.value),
        root,
        ethers.utils.toUtf8Bytes(abiProof.key),
        ethers.utils.toUtf8Bytes(abiProof.value),
      )
      //   function changeOwnerWithProof(
      //     bytes[] memory existenceProofLeafOp,
      //     bytes[][] memory existenceProofInnerOp,
      //     bytes memory existenceProofKey,
      //     bytes memory existenceProofValue,
      //     bytes memory rootBz,
      //     bytes memory pathBz,
      //     bytes memory value
      // ) public returns (bool) {

      assert.equal(res, true)
    })
  })

  // describe("when requesting minting from a document issuing provider", () => {
  //   let requestId;

  //   // Add some cash to the contracts
  //   before(async () => {
  //     const usdcAmount = new BigNumber(22 * 10e18);
  //     const recipentAddresses = [
  //       controllerContract.address,
  //       anconVerifierContract.address,
  //     ];

  //     await erc20Contract.mint(
  //       accounts[2],
  //       usdcAmount.times(recipentAddresses.length)
  //     );
  //     const coroutines = recipentAddresses.map((addr) =>
  //       erc20Contract.approve(addr, usdcAmount, { from: accounts[2] })
  //     );
  //     await Bluebird.all(coroutines);
  //   });

  //   it("should anchor document and add it to request list", async () => {
  //     const minterAccount = accounts[1];
  //     const senderAccount = accounts[2];

  //     const res = await controllerContract.requestDataProviderService(
  //       `did:ethr:${minterAccount}`,
  //       minterAccount,
  //       `did:ethr:${senderAccount}`,
  //       "https://ipfs.io/ipfs/xxxx",
  //       "Notariar",
  //       {
  //         from: senderAccount,
  //       }
  //     );

  //     requestId = res.logs[0].args.id;
  //     assert.equal(requestId, 0);

  //     await controllerContract.mint(
  //       requestId,
  //       senderAccount,
  //       minterAccount,
  //       `https://bobb.did.pa`,
  //       {
  //         from: minterAccount,
  //       }
  //     );

  //     const bal = await anconVerifierContract.balanceOf(senderAccount);
  //     assert.equal(bal, 1);
  //   });
  // });
})
