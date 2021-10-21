// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ics23.sol";

contract AnconVerifier is ICS23 {
    address public whitelisted;

    constructor(address onlyOwner) public {
        whitelisted = onlyOwner;
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
        bytes memory _prefix,
        uint256[] memory _leafOpUint,
        bytes[][] memory _innerOp,
        uint256 existenceProofInnerOpHash
    ) public pure returns (ExistenceProof memory) {
        LeafOp memory leafOp = LeafOp(
            true,
            HashOp((_leafOpUint[0])),
            HashOp((_leafOpUint[1])),
            HashOp((_leafOpUint[2])),
            LengthOp((_leafOpUint[3])),
            _prefix
        );

        // // innerOpArr
        InnerOp[] memory innerOpArr;

        for (uint256 i = 0; i < _innerOp.length; i++) {
            bytes[] memory temp = _innerOp[i];
            innerOpArr[i] = InnerOp({
                valid: true,
                hash: HashOp(existenceProofInnerOpHash),
                prefix: temp[1],
                suffix: temp[2]
            });
        }
        ExistenceProof memory proof = ExistenceProof({
            valid: true,
            key: key,
            value: value,
            leaf: leafOp,
            path: innerOpArr
        });

        return proof;
    }

    function requestRoot(
        uint256[] memory leafOpUint,
        bytes memory prefix,
        bytes[][] memory existenceProofInnerOp,
        uint256 existenceProofInnerOpHash,
        bytes memory existenceProofKey,
        bytes memory existenceProofValue
    ) public view returns (bytes memory) {
        require(msg.sender == whitelisted, "Must be whitelisted or registered");
        // todo: verify not empty
        ExistenceProof memory proof = convertProof(
            existenceProofKey,
            existenceProofValue,
            prefix,
            leafOpUint,
            existenceProofInnerOp,
            existenceProofInnerOpHash
        );
        return bytes(calculate(proof));
    }

    function changeOwnerWithProof(
        uint256[] memory leafOpUint,
        bytes memory prefix,
        bytes[][] memory existenceProofInnerOp,
        uint256 existenceProofInnerOpHash,
        bytes memory existenceProofKey,
        bytes memory existenceProofValue,
        bytes memory root,
        bytes memory key,
        bytes memory value
    ) public pure returns (bool) {
        // todo: verify not empty
        ExistenceProof memory proof = convertProof(
            existenceProofKey,
            existenceProofValue,
            prefix,
            leafOpUint,
            existenceProofInnerOp,
            existenceProofInnerOpHash
        );
        //        return bytes(calculate(proof));
        // Verify membership

        verify(proof, getIavlSpec(), root, key, value);

        return true;

        //proof.key = xp.

        // verify permit exists, has not revoked, has valid issuer and is not expired
        //return this.verifyMembership(iavlSpec, root, xp, key, value);
        // verify token exists
        //_lock(vc.data);
        // _release
    }

}
