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
const { base64 } = require('ethers/lib/utils')
const Web3 = require('web3')
const ethers = require('ethers')

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
jest.setTimeout(10000)
let ics23Contract
describe('ics23', () => {
  beforeEach(async () => {
    const basePath = path.resolve(__dirname, '../atlantico')
    // You can specify different port to parallelize execution of describe blocks
    const port = 8080
    // Setting logging flag to true will pipe emulator output to console
    const logging = false

    await init(basePath, { port })
    await emulator.start(port, logging)

    try {
      const to = await getAccountAddress('Alice')
      const name = `ICS23`
      const deploymentResult = await deployContractByName({ to, name })
      console.log({ deploymentResult })
    } catch (e) {
      // If we encounter any errors during teployment, we can catch and process them here
      console.log(e)
    }
  })

  // Stop emulator, so it could be restarted
  afterEach(async () => {
    return emulator.stop()
  })

  test('when requesting an ownership update to a NFT using an ics23 vector commitment proof, return  ok', async () => {
    const contract = await getContractAddress('ICS23')
    console.log({ contract })
    const code = `
      import ICS23 from ${contract}
      pub fun main(
        key: [UInt8],
        value: [UInt8],
        leafPrefix: [UInt8],
        pathPrefix: [UInt8],
        pathSuffix: [UInt8],
        leaf: {
          String: AnyStruct        },
        path: [{
String: AnyStruct
        }]
        
        ): String?{

          let p =  ICS23.ExistenceProof(
            valid:  true,
            key: key,
            value: value,
            leaf: leaf,
            path:   path

          )
        return ICS23.calculate(p:p)
      }
    }
    `
    const Alice = await getAccountAddress('Alice')
    ///   const signers = [Alice]

    const proof = toABI(proofCombined[0])
    const args = [proof.key, proof.value, proof.leafOp, proof.innerOp]
    console.log(args)
    const result = await executeScript({ code, args })
    console.log({ result })

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
