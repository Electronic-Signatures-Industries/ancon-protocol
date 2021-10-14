// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.7;
pragma experimental ABIEncoderV2;

import "../tibc-solidity/libraries/07-tendermint/LightClient.sol";
import "../tibc-solidity/proto/Validator.sol";

contract LightClientVerifier {
    function genValidatorSetHash(bytes memory data)
        public
        pure
        returns (bytes memory)
    {
        ValidatorSet.Data memory set = ValidatorSet.decode(data);
        return LightClient.genValidatorSetHash(set);
    }

    function genHeaderHash(bytes memory data)
        public
        pure
        returns (bytes memory)
    {
        SignedHeader.Data memory header = SignedHeader.decode(data);
        return LightClient.genHeaderHash(header.header);
    }
}
