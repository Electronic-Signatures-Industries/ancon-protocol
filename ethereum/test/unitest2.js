const { BigNumber } = require("bignumber.js");
const { assert } = require("chai");
const Bluebird = require("bluebird");
//const TestUSDC = artifacts.require("USDC");
const AnconVerifier = artifacts.require("AnconVerifier");
//const XDVController = artifacts.require("XDVController");

contract("XDV: Anchoring and Minting", (accounts) => {
  // let erc20Contract;
  // let controllerContract;
  // let documentMinterAddress;
  let anconVerifierContract;

  // Initialize the contracts and make sure they exist
  before(async () => {
    ({ anconVerifierContract } = await Bluebird.props({
      anconVerifierContract: AnconVerifier.deployed(),
      //erc20Contract: TestUSDC.deployed(),
      //controllerContract: XDVController.deployed(),
    }));
  });

  describe("when registering a document issuing provider", () => {
    it("should create a new entry", async () => {
      //const res = await controllerContract.registerMinter();
      const res = await anconVerifierContract.changeOwnerWithProof(

      )
      // documentMinterAddress = res.logs[0].args.minter;
      // assert.strictEqual(documentMinterAddress, accounts[1]);
      assert.equal()
    });
  });

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
});
