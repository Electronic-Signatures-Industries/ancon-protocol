// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ICredentialRegistry.sol";

//  a NFT secure document 
contract XDVNFT is ERC721Burnable, ERC721Pausable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 public stablecoin;
    ICredentialRegistry public credentialRegistry;
    uint256 public serviceFeeForPaymentAddress = 0;
    uint256 public serviceFeeForContract = 0;

    event Withdrawn(address indexed paymentAddress, uint256 amount);
    // Ancon EVM Hook
	event _anconCreateMetadata(
	address owner,
	string did,
	string name,
	string description,
	string image,
	string parent,
	string  sources,
	string  links);

    event ServiceFeePaid(
        address indexed from,
        uint256 paidToContract,
        uint256 paidToPaymentAddress
    );

    /**
     * XDVNFT Data Token
     */
    constructor(
        string memory name,
        string memory symbol,
        address tokenERC20,
        address credentialAddr
    ) ERC721(name, symbol) {
        stablecoin = IERC20(tokenERC20);
        credentialRegistry = ICredentialRegistry(credentialAddr);
    }

    function setServiceFeeForPaymentAddress(uint256 _fee) public onlyOwner {
        serviceFeeForPaymentAddress = _fee;
    }

    function setServiceFeeForContract(uint256 _fee) public onlyOwner {
        serviceFeeForContract = _fee;
    }

    /**
     * @dev Mints a XDV Data Token
     */
    function mint(address user, string memory uri) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(user, newItemId);
        _setTokenURI(newItemId, uri);

        return newItemId;
    }

        // TODO: later lacchain vc eip1812
    function swap(
        address user, //owner
        uint256 chainid,
        bytes32 credentialHash,
        bytes memory signature,
        // MsgMetadata
        string memory did,
        string memory name,
        string memory description,
        string memory image,
        string memory parent,
        // JSON Encoded arrays
        string memory  sources,
        string memory  links
    ) public returns (bool
        // string memory did, 
        // string memory description, 
        // string memory image, 
        // string memory parent
    ) {
	
    // swap 
    // user
    // chainid
    // vc  lacchain
    //  register(msg.sender, user, 1h, validfrom, data)
    credentialRegistry.registerCredential(
        msg.sender, 
        user, 
        credentialHash, 
        block.timestamp, 
        block.timestamp + 2 days , 
        signature);
    // metadata(...)

    //logs
    // log := &ethtypes.Log{
	// 	Address:     common.HexToAddress("0xecf8f87f810ecf450940c9f60066b4a7a501d6a7"),
	// 	BlockHash:   common.HexToHash("0x656c34545f90a730a19008c0e7a7cd4fb3895064b48d6d69761bd5abad681056"),
	// 	BlockNumber: 2019236,
	// 	Data:        pck,
	// 	Index:       2,
	// 	TxIndex:     3,
	// 	TxHash:      common.HexToHash("0x3b198bfd5d2907285af009e9ae84a0ecd63677110d89d7e030251acb87f6487e"),
	// 	Topics: []common.Hash{
	// 		evm_hook_abi.Events["_anconCreateMetadata"].ID,
	// 	},
	// }

        emit _anconCreateMetadata(user,
            did,
            name,
            description,
            image,
            parent,
            sources,
            links
        );

        return true;

    }
    // supportWith

    /**
     * @dev Just overrides the superclass' function. Fixes inheritance
     * source: https://forum.openzeppelin.com/t/how-do-inherit-from-erc721-erc721enumerable-and-erc721uristorage-in-v4-of-openzeppelin-contracts/6656/4
     */
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    /**
     * @dev Just overrides the superclass' function. Fixes inheritance
     * source: https://forum.openzeppelin.com/t/how-do-inherit-from-erc721-erc721enumerable-and-erc721uristorage-in-v4-of-openzeppelin-contracts/6656/4
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Pausable) {
        require(!paused(), "XDV: Token execution is paused");

        if (from == address(0)) {
            paymentBeforeMint(msg.sender);
        }

        super._beforeTokenTransfer(from, to, tokenId);
    }

    /**
     * @dev tries to execute the payment when the token is minted.
     * Reverts if the payment procedure could not be completed.
     */
    function paymentBeforeMint(address tokenHolder) internal virtual {

        // Transfer tokens to pay service fee
        require(
            stablecoin.transferFrom(
                tokenHolder,
                address(this),
                serviceFeeForContract
            ),
            "XDV: Transfer failed for recipient"
        );

        emit ServiceFeePaid(
            tokenHolder,
            serviceFeeForContract,
            serviceFeeForPaymentAddress
        );
    }

    function withdrawBalance(address payable payee) public onlyOwner {
        uint256 balance = stablecoin.balanceOf(address(this));

        require(
            stablecoin.transfer(payee, balance),
            "XDV: Transfer failed"
        );

        emit Withdrawn(payee, balance);
    }
}
