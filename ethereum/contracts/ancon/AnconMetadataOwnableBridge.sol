// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Proofs.sol";
import "./ics23.sol";

contract AnconMetadataOwnableBridge {
    using ICS23 for ICS23.HashOp;
    using ICS23 for ICS23.LengthOp;
    using ICS23 for ICS23.ExistenceProof;
    using IBCExistenceProof for IBCExistenceProof.Data;
    event CrossMintCallbackReceived(
        address indexed newOwner,
        string indexed metadataHash,
        uint256 indexed tokenId
    );

    constructor() public {}

    function convertProof(IBCExistenceProof.Data memory testxp)
        public
        returns (bool)
    {
        ICS23.LeafOp memory leafOp = ICS23.LeafOp({
            hash: ICS23.HashOp(uint256(testxp.leaf.hash)),
            prehash_key: ICS23.HashOp(uint256(testxp.leaf.prehash_key)),
            prehash_value: ICS23.HashOp(uint256(testxp.leaf.prehash_value)),
            len: ICS23.LengthOp(uint256(testxp.leaf.length)),
            valid: false,
            prefix: bytes("")
        });

        // innerOpArr
        ICS23.InnerOp[] memory innerOpArr;

        for (uint256 i = 0; i < testxp.path.length; i++) {
            innerOpArr[i] = ICS23.InnerOp({
                valid: false,
                hash: ICS23.HashOp(uint256(testxp.leaf.hash)),
                prefix: bytes(""),
                suffix: bytes("")
            });
        }
        ICS23.ExistenceProof memory proof = ICS23.ExistenceProof({
            valid: false,
            key: testxp.key,
            value: testxp.value,
            leaf: leafOp,
            path: innerOpArr
        });

        return true;
    }

    /**
     * changeOwnerWithProof
     */
    function changeOwnerWithProof(
        bytes memory existenceProof,
        bytes memory rootBz,
        bytes memory pathBz,
        bytes memory value
    ) public returns (bool) {
        IBCExistenceProof.Data memory exProof;
        
        exProof = IBCExistenceProof.decode(existenceProof);

        // IBCExistenceProof.Data memory memoryXp = IBCExistenceProof.Data({
        //     key: testxp.key,
        //     value: testxp.value,
        //     leaf: testxp.leaf,
        //     path: testxp.path
        // });

        convertProof(exProof);

        //proof.key = xp.

        // verify permit exists, has not revoked, has valid issuer and is not expired
        //return this.verifyMembership(iavlSpec, rootBz, xp, pathBz, value);
        return true;
        // verify token exists
        //_lock(vc.data);
        // _release
    }

    // function _lock(bytes memory data) internal returns (bool) {
    //     // ERC721(tokenAddress)
    //     (
    //         string memory metadata,
    //         address to,
    //         address newOwner,
    //         address fromOwner,
    //         address escrowAddress,
    //         // fromTokenId
    //         // toTokenId
    //         uint256 id,
    //         bool isNew
    //     ) = abi.decode(
    //             data,
    //             (string, address, address, address, address, uint256, bool)
    //         );
    //     // FromTokenId verification
    //     ERC721 nft = ERC721(to);
    //     require(nft.ownerOf(id) == fromOwner, "Invalid token id");

    //     if (isNew) {
    //         // todo: should mint
    //     } else {
    //         // Escrow Address aka Lock
    //         nft.safeTransferFrom(fromOwner, escrowAddress, id, data);
    //     }

    //     emit CrossMintCallbackReceived(newOwner, metadata, id);

    //     return true;
    // }
}
