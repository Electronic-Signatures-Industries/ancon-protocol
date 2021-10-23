// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.7;

// import "./ics23.sol";

// contract AnconVerifier is ICS23 {
//     address public whitelisted;

//     constructor(address onlyOwner) public {
//         whitelisted = onlyOwner;
//     }
// // claimed ics23 proofs
// // key = prefix + cid eg  ancon+cid
// // value = sha256(dagcbor)
// // TODO: Change to verifyRelayMessage
//     function initiateCrossNftSwap(
//         uint256[] memory leafOpUint,
//         bytes memory prefix,
//         bytes[][] memory existenceProofInnerOp,
//         uint256 existenceProofInnerOpHash,
//         bytes memory existenceProofKey,
//         bytes memory existenceProofValue,
//         bytes memory root,
//         bytes memory key,
//         bytes memory value,
//         // -- packet
//         string memory metadata,
//         uint256 tokenId,
//         address token,
//         address to
//     ) public pure returns (bool) {
//         // 1. verifier.changeOwnerWithProof

//         // 2. instantiate nft 
//     //     ERC721 nft = ERC721(msg.sender);
//     //     require(nft.ownerOf(id) == msg.sender, "Invalid token id");

//     //     if (isNew) {
//     //         // todo: should mint
//     //     } else {
//     //         // Escrow Address aka Lock
//     //         nft.safeTransferFrom(sender, to, id, abi.encodePacked(metadata, tokenId););
//     //     }

//     //     emit CrossMintCallbackReceived(newOwner, metadata, id);



//         return true;

//         //proof.key = xp.

//         // verify permit exists, has not revoked, has valid issuer and is not expired
//         //return this.verifyMembership(iavlSpec, root, xp, key, value);
//         // verify token exists
//         //_lock(vc.data);
//         // _release
//     }

// }
