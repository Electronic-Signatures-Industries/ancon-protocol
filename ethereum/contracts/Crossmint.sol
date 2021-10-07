// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ICredentialRegistry.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH USES HARDCODED VALUES FOR CLARITY.
 * PLEASE DO NOT USE THIS CODE IN PRODUCTION.
 */
contract Crossmint {
  
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    address public tokenNFT;
    uint256 public  senderChainId;

    ICredentialRegistry public credentialRegistry;

    event _anconSendCrossmintRequest(
      uint recipientChainId, 
      string fromTokenNft, 
      string toTokenNft, 
      string metadataHash, 
      string fromOwner, 
      string toOwner, 
      string permitHash,
      string permitSignature
    );
    
    constructor (
      address _tokenNFT,
      address _credentialRegistry,
      uint _senderChainId
    ) public {
        
        setPublicChainlinkToken();
        credentialRegistry = ICredentialRegistry(credentialAddr);
        tokenNFT = _tokenNFT;
    }
    
    function initiateCrossmint(
      uint recipientChainId, 
      string memory fromTokenNft, 
      string memory toTokenNft, 
      string memory metadataHash, 
      string memory fromOwner, 
      string memory toOwner, 
      string memory permitSignature,
      string memory permitHash
    )public returns (bool){

        require(fromTokenNft == tokenNFT, "Contract does not support this token NFT");

        require(senderChainId != recipientChainId, "Recipient chain Id must be different from this chainIf");

        credentialRegistry.registerCredential(
        fromOwner, 
        toOwner,
        permitHash, 
        block.timestamp, 
        block.timestamp + 2 days , 
        permitSignature);
        
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
     * Receive the response in the form of uint256
     */ 
    function recieveCrossmintCallback(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}

