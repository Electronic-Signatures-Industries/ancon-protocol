// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ics23.sol";

contract AnconVerifier is ICS23 {
    constructor() public {
        verify();
    }

    function verify() public view returns (bool) {
        return true;
    }

    //Gotten from https://stackoverflow.com/a/69007075
    function st2num(string memory numString) public pure returns (uint256) {
        uint256 val = 0;
        bytes memory stringBytes = bytes(numString);
        for (uint256 i = 0; i < stringBytes.length; i++) {
            uint256 exp = stringBytes.length - i;
            bytes1 ival = stringBytes[i];
            uint8 uval = uint8(ival);
            uint256 jval = uval - uint256(0x30);

            val += (uint256(jval) * (10**(exp - 1)));
        }
        return val;
    }

    function bytes2num(bytes memory numBytes) public pure returns (uint256) {
        return st2num(string(numBytes));
    }

    //Separate arguments to not convert from uint 256 to byte
    function convertProof(
        bytes memory key,
        bytes memory value,
        bytes[] memory _leafOp,
        bytes[][] memory _innerOp
    ) public pure returns (ExistenceProof memory) {
        LeafOp memory leafOp = LeafOp({
            hash: HashOp(bytes2num(_leafOp[0])),
            prehash_key: HashOp(bytes2num(_leafOp[1])),
            prehash_value: HashOp(bytes2num(_leafOp[2])),
            len: LengthOp(bytes2num(_leafOp[3])),
            valid: true,
            prefix: _leafOp[4]
        });

        // innerOpArr
        InnerOp[] memory innerOpArr;

        for (uint256 i = 0; i < _innerOp.length; i++) {
            bytes[] memory temp = _innerOp[i];
            innerOpArr[i] = InnerOp({
                valid: true,
                hash: HashOp(uint256(bytes2num(temp[0]))),
                prefix: temp[1],
                suffix: temp[2]
            });
        }
        ExistenceProof memory proof = ExistenceProof({
            valid: false,
            key: key,
            value: value,
            leaf: leafOp,
            path: innerOpArr
        });

        return proof;
    }

    function changeOwnerWithProof(
        bytes[] memory existenceProofLeafOp,
        bytes[][] memory existenceProofInnerOp,
        bytes memory existenceProofValue,
        bytes memory existenceProofKey,
        bytes memory rootBz,
        bytes memory pathBz,
        bytes memory value
    ) public returns (bool) {
        // todo: verify not empty
        ExistenceProof memory proof = convertProof(
            existenceProofKey,
            existenceProofValue,
            existenceProofLeafOp,
            existenceProofInnerOp
        );

        // Verify membership
        return verifyMembership(getIavlSpec(), rootBz, proof, pathBz, value);

        //proof.key = xp.

        // verify permit exists, has not revoked, has valid issuer and is not expired
        //return this.verifyMembership(iavlSpec, rootBz, xp, pathBz, value);
        // verify token exists
        //_lock(vc.data);
        // _release
    }
}
