// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ICredentialRegistry.sol";

//  a NFT secure document
contract XDVNFT is
    ERC721Burnable,
    ERC721Pausable,
    ERC721URIStorage,
    Ownable,
    IERC721Receiver
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 public stablecoin;
    address public verifierAddress;
    uint256 public serviceFeeForPaymentAddress = 0;
    uint256 public serviceFeeForContract = 0;

    event Withdrawn(address indexed paymentAddress, uint256 amount);

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
        address verifierAddr
    ) ERC721(name, symbol) {
        stablecoin = IERC20(tokenERC20);
        verifierAddress = verifierAddr;
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

    /**
     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721.onERC721Received.selector`.
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        // Verify operator
        require(operator == verifierAddress, "Invalid verifier");
        
        // Verify owner owns token id
        address owned = ownerOf(tokenId);
        require(owned == from, "Invalid token id owner");
        (
            string memory _metadata,
            uint256 _tokenId
        ) = abi.decode(
                data,
                (string, uint256)
            );
        require(bytes(_metadata).length == 0, "Empty metadata");

        // set metadata URI
        _setTokenURI(_tokenId, _metadata);
        return this.onERC721Received.selector;
    }

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

        require(stablecoin.transfer(payee, balance), "XDV: Transfer failed");

        emit Withdrawn(payee, balance);
    }
}
