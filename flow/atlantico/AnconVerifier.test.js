import path from 'path'
import {
  init,
  emulator,
  getContractAddress,
  executeScript,
  getAccountAddress,
  deployContractByName,
} from 'flow-js-testing'
const ics23 = require('@confio/ics23')
const ethers = require('ethers')
const { assert } = require('chai');

let toABI = ({ exist }) => {
  const innerOp = []
  innerOp.push({
    valid: true,
    hash: ics23.ics23.HashOp[exist.path[0].hash],
    prefix: ethers.utils.base64.decode(exist.path[0].prefix),
    suffix: ethers.utils.base64.decode(exist.path[0].suffix),
  })
  const leafOp = {
    valid: true,
    hash: ics23.ics23.HashOp[exist.leaf.hash],
    prehash_key: ics23.ics23.HashOp[exist.leaf.prehash_key],
    prehash_value: ics23.ics23.HashOp[exist.leaf.prehash_value],
    //  length: ics23.ics23.LengthOp[exist.leaf.length],
    len: ics23.ics23.LengthOp[exist.leaf.length],
    prefix: ethers.utils.base64.decode(exist.leaf.prefix),
  }

  return {
    leafOp,
    innerOp,
    innerOpHash: ics23.ics23.HashOp[exist.path[0].hash],
    key:         ethers.utils.base64.decode(exist.key),
    value:         ethers.utils.base64.decode(exist.value),
  }
}

const proofCombined = [
  {
    exist: {
      key:
        'YW5jb25iYWZ5cmVpY2Q0Z3ZwYmpwNHdlY3RiejQyNzRhZ3Zmc3gybjN3cnhxZHp1cDQzZXVrM3R1ZDI3Y3htZQ==',
      value:
        'qmNkaWRgZGtpbmRobWV0YWRhdGFkbmFtZWp0ZW5kZXJtaW50ZWltYWdldWh0dHA6Ly9sb2NhbGhvc3Q6MTMxN2VsaW5rc4HYKlglAAFxEiAe9b351lHuEQAZl2qWbdxrvaLk6O7sh5TzqMDBMwQ3EmVvd25lcngzZGlkOmV0aHI6MHhlZUM1OEU4OTk5NjQ5NjY0MGM4YjU4OThBN2UwMjE4RTliNkU5MGNCZnBhcmVudGBnc291cmNlc4F4LlFtUVJXR3hvRGhnOEpNb0RaYU4xdDFLaVlDYzVkTTlOUFhZRVk3VzhrSjhKd2prZGVzY3JpcHRpb25qdGVuZGVybWludHV2ZXJpZmllZENyZWRlbnRpYWxSZWZg',
      leaf: {
        hash: 'SHA256',
        prehash_key: 'NO_HASH',
        prehash_value: 'SHA256',
        length: 'VAR_PROTO',
        prefix: 'AAKSAQ==',
      },
      path: [
        {
          hash: 'SHA256',
          prefix: 'AgSSASA=',
          suffix: 'INdSgAXFKAv2D5wqrrbM+uSs2ynW0VuytR2UdOMuNagz',
        },
      ],
    },
  },
]

// Increase timeout if your tests failing due to timeout
describe('AnconVerifier', () => {
  let contractAddress;

  beforeEach(async () => {
    const basePath = path.resolve(__dirname, '../atlantico')
    // You can specify different port to parallelize execution of describe blocks
    const port = 8080
    // Setting logging flag to true will pipe emulator output to console
    const logging = false

    await init(basePath, { port })
    await emulator.start(port, logging)

    const name = `AnconVerifier`
    contractAddress = await getContractAddress(name)
    if (!contractAddress) {
      const to = await getAccountAddress('emulator-account')
      await deployContractByName({ to, name })
    }
  })

  // Stop emulator, so it could be restarted
  afterEach(async () => {
    return emulator.stop()
  })

  test('when requesting an ownership update to a NFT using an ics23 vector commitment proof, return  ok', async () => {
    const code = `
      import AnconVerifier from ${contractAddress}

      pub fun main(
        key: [UInt8],
        value: [UInt8],
        leafPrefix: [UInt8],
        pathPrefix: [UInt8],
        pathSuffix: [UInt8],
      ): [UInt8] {
        let leafStruct = AnconVerifier.LeafOp(
          valid: true,
          hash: AnconVerifier.HashOp.SHA256,
          prehash_key: AnconVerifier.HashOp.NO_HASH,
          prehash_value: AnconVerifier.HashOp.SHA256,
          len: AnconVerifier.LengthOp.VAR_PROTO,
          prefix: leafPrefix
        )

        let pathStruct = AnconVerifier.InnerOp(
          valid: true,
          hash: AnconVerifier.HashOp.SHA256,
          prefix: pathPrefix,
          suffix: pathSuffix,
        )

        let p = AnconVerifier.ExistenceProof(
          valid: true,
          key: key,
          value: value,
          leaf: leafStruct,
          path: [pathStruct]
        )
        return AnconVerifier.calculate(p:p)
      }
    `

    const proof = toABI(proofCombined[0])

    const args = [
      Array.from(proof.key),
      Array.from(proof.value),
      Array.from(proof.leafOp.prefix),
      Array.from(proof.innerOp[0].prefix),
      Array.from(proof.innerOp[0].suffix),
    ]
    const result = await executeScript({ code, args });
    assert.equal(
      ethers.utils.hexlify(result),
      '0x16dbcad17f5eff1b8fc04ea7527023811794839765764a6e62e41bb79ebac2cc'
    );

    //   function changeOwnerWithProof(
    //     bytes[] memory existenceProofLeafOp,
    //     bytes[][] memory existenceProofInnerOp,
    //     bytes memory existenceProofKey,
    //     bytes memory existenceProofValue,
    //     bytes memory rootBz,
    //     bytes memory pathBz,
    //     bytes memory value
    // ) public returns (bool) {

    // assert.equal(res, true)
  })
})
