// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ICredentialRegistry.sol";
import "./ICrossmint.sol";
import "./IClaimsVerifier.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Crossmint is ICrossmint {
    address public tokenNFT;
    uint256 public senderChainId;

    ICredentialRegistry public credentialRegistry;
    IClaimsVerifier public verifier;

    event CrossMintCallbackReceived(
        address indexed newOwner,
        string indexed metadataHash,
        uint256 indexed tokenId
    );

    constructor(
        address _tokenNFT,
        address _credentialRegistry,
        address _verifier,
        uint256 _senderChainId
    ) public {
        senderChainId = _senderChainId;
        verifier = IClaimsVerifier(_verifier);
        credentialRegistry = ICredentialRegistry(_credentialRegistry);
        tokenNFT = _tokenNFT;
    }

    // initiateCrossmint from Cosmos EVM to EVM
    function initiateCrossmint(
        address fromOwner,
        address toOwner,
        bytes memory permitSignature,
        bytes32 permitHash
    ) public returns (bool) {

// const role = await registryContract.ISSUER_ROLE()
// console.log(role)
// credentialRegistry.grantRole( credentialRegistry.ISSUER_ROLE, verifier.address );

        bool ok = credentialRegistry.registerCredential(
            fromOwner,
            toOwner,
            permitHash,
            block.timestamp,
            block.timestamp + 6 hours,
            permitSignature
        );

        require(ok, "Invalid permit credential, try again");

        return true;
    }

    /**
     * applyCrossmintChangeRequest
     */
    function applyCrossmintChangeRequest(
        VerifiableCredential memory vc,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public returns (uint256) {
        // verify permit exists, has not revoked, has valid issuer and is not expired
        (
            bool exists,
            bool hasRevoked,
            bool issuerValid,
            bool a,
            bool expired
        ) = verifier.verifyCredential(vc, v, r, s);
        require(exists, "Missing permit");
        require(hasRevoked, "Permit has been revoked");
        require(issuerValid, "Issuer is not valid");
        require(expired, "Permit has expired");
        // verify token exists
        // ERC721(tokenAddress)
        (
            string memory metadata,
            address to,
            address fromOwner,
            address newOwner,
            uint256 tokenId,
            bool isNew
        ) = abi.decode(
                vc.data,
                (string, address, address, address, uint256, bool)
            );
        ERC721 nft = ERC721(to);

        address owned = nft.ownerOf(tokenId);
        require(owned == fromOwner, "Invalid token id");

        
        // Cross update
        //  function safeTransferFrom(
        // address from,
        // address to,
        // uint256 tokenId,
        // bytes memory _data
        uint256 newItemId = 0;

        emit CrossMintCallbackReceived(newOwner, metadata, newItemId);
        return newItemId;
    }
}
