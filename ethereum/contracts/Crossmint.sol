// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ICredentialRegistry.sol";
import "./ICrossmint.sol";
import "./IClaimsVerifier.sol";
import "./IERC721.sol";

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

    event _anconSendCrossmintRequest(
        uint256 recipientChainId,
        string fromTokenNft,
        string toTokenNft,
        string metadataHash,
        string fromOwner,
        string toOwner,
        string permitHash,
        string permitSignature
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

    // initiateCrossmint from any to Cosmos
    function initiateCrossmintExternal(
        uint256 recipientChainId,
        string memory fromTokenNft,
        string memory toTokenNft,
        string memory metadataHash,
        string memory fromOwner,
        string memory toOwner,
        string memory permitSignature,
        string memory permitHash
    ) public returns (bool) {
      // Verify Lock Metadata preimage
      // Escrow NFT Token ID
      // Emit InitiateCrossMintExternal
    }
    

    // initiateCrossmint from Cosmos EVM to EVM
    function initiateCrossmint(
        uint256 recipientChainId,
        string memory fromTokenNft,
        string memory toTokenNft,
        string memory metadataHash,
        string memory fromOwner,
        string memory toOwner,
        string memory permitSignature,
        string memory permitHash
    ) public returns (bool) {
        require(
            fromTokenNft == tokenNFT,
            "Contract does not support this token NFT"
        );

        require(
            senderChainId != recipientChainId,
            "Recipient chain Id must be different from this chain id"
        );


        bool ok = credentialRegistry.registerCredential(
            fromOwner,
            toOwner,
            permitHash,
            block.timestamp,
            block.timestamp + 2 days,
            permitSignature
        );

        require(ok, "Invalid permit credential, try again");

        // Hook validates if owner owns token and metadata

        emit _anconSendCrossmintRequest(
            recipientChainId,
            fromTokenNft,
            toTokenNft,
            metadataHash,
            fromOwner,
            toOwner,
            permitHash,
            permitSignature
        );

        return true;

        //when evm -> cosmos require aditional documentation}
    }

    /**
     * Receive crossmint callback, executed from bridge
     */
    function recieveCrossmintCallback(
        VerifiableCredential memory vc,
        uint8 v,
        bytes32 r,
        bytes32 s,
        string memory metadataHash,
        string memory to,
        string memory newOwner
    ) public returns(uint) {
        // verify permit exists, has not revoked, has valid issuer and is not expired
        (bool exists, bool hasRevoked, bool issuerValid, bool a, bool expired)  = verifier.verifyCredential(vc, v, r, s);
        require(exists, "Missing permit");
        require(hasRevoked, "Permit has been revoked");
        require(issuerValid, "Issuer is not valid");
        require(expired, "Permit has expired");
        // verify token exists
        // ERC721(tokenAddress)
        IERC721 nft = IERC721(to);

        // verify subject ==  vc.subject
        require(vc.subject == newOwner, "Invalid vc subject, recipient owner incorrect");

        // MINT
        uint256 newItemId =  nft.mint(newOwner, metadataHash);

        emit CrossMintCallbackReceived(newOwner, newItemId, metadataHash);
        return newItemId;
    }
}
