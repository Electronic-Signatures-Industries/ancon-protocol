package types

import "errors"

var (
	ErrInvalidCollection = errors.New("invalid nft collection")
	ErrUnknownCollection = errors.New("unknown nft collection")
	ErrInvalidNFT        = errors.New("invalid nft")
	ErrNFTAlreadyExists  = errors.New("nft already exists")
	ErrUnknownNFT        = errors.New("unknown nft")
	ErrEmptyTokenData    = errors.New("nft data can't be empty")
	ErrUnauthorized      = errors.New("unauthorized address")
	ErrInvalidDenom      = errors.New("invalid denom")
	ErrInvalidTokenID    = errors.New("invalid nft id")
	ErrInvalidTokenURI   = errors.New("invalid nft uri")
)
