// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../ICredentialRegistry.sol";
import "../ICrossmint.sol";
import "../IClaimsVerifier.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//import "@openzeppelin/contracts/utils/Counters.sol";
import "./ICS23Verifier.sol";

contract AnconMetadataOwnableBridge is ICS23Verifier {


    event CrossMintCallbackReceived(
        address indexed newOwner,
        string indexed metadataHash,
        uint256 indexed tokenId
    );

    constructor(
    ) public {
    }

    /**
     * changeOwnerWithProof
     */
    function changeOwnerWithProof(
        ExistenceProof memory existenceProof,
        bytes memory rootBz,
        bytes memory pathBz,
        bytes memory value
    ) public returns (bool) {
        // verify permit exists, has not revoked, has valid issuer and is not expired
        return this.verifyMembership(iavlSpec, rootBz, existenceProof, pathBz, value);
        // verify token exists
        //_lock(vc.data);
        // _release
    }

    function _lock(bytes memory data) internal returns (bool){
        // ERC721(tokenAddress)
        (
            string memory metadata,
            address to,
            address newOwner,
            address fromOwner,
            address escrowAddress,
            // fromTokenId
            // toTokenId
            uint256 id,
            bool isNew
        ) = abi.decode(
                data,
                (string, address, address, address, uint256, bool)
            );
        // FromTokenId verification
        ERC721 nft = ERC721(to);
        require(nft.ownerOf(id) == fromOwner, "Invalid token id");

        if (isNew) {
            // todo: should mint
        } else {
            // Escrow Address aka Lock
            nft.safeTransferFrom(fromOwner, escrowAddress, id, data);
        }

        emit CrossMintCallbackReceived(newOwner, metadata, id);

        return true;
    }
}