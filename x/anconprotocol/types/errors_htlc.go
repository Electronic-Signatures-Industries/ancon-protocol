package types

import "errors"

// HTLC module sentinel errors
var (
	ErrInvalidID                   = errors.New("invalid htlc id")
	ErrInvalidHashLock             = errors.New("invalid hash lock")
	ErrInvalidTimeLock             = errors.New("invalid time lock")
	ErrInvalidSecret               = errors.New("invalid secret")
	ErrInvalidExpirationHeight     = errors.New("invalid expiration height")
	ErrInvalidTimestamp            = errors.New("invalid timestamp")
	ErrInvalidState                = errors.New("invalid state")
	ErrInvalidClosedBlock          = errors.New("invalid closed block")
	ErrInvalidDirection            = errors.New("invalid direction")
	ErrHTLCExists                  = errors.New("htlc already exists")
	ErrUnknownHTLC                 = errors.New("unknown htlc")
	ErrHTLCNotOpen                 = errors.New("htlc not open")
	ErrAssetNotSupported           = errors.New("asset not found")
	ErrAssetNotActive              = errors.New("asset is currently inactive")
	ErrInvalidAccount              = errors.New("invalid account")
	ErrInvalidAmount               = errors.New("invalid amount")
	ErrInsufficientAmount          = errors.New("amount cannot cover the deputy fixed fee")
	ErrExceedsSupplyLimit          = errors.New("asset supply over limit")
	ErrExceedsTimeBasedSupplyLimit = errors.New("asset supply over limit for current time period")
	ErrInvalidCurrentSupply        = errors.New("supply decrease puts current asset supply below 0")
	ErrInvalidIncomingSupply       = errors.New("supply decrease puts incoming asset supply below 0")
	ErrInvalidOutgoingSupply       = errors.New("supply decrease puts outgoing asset supply below 0")
	ErrExceedsAvailableSupply      = errors.New("outgoing swap exceeds total available supply")
	ErrAssetSupplyNotFound         = errors.New("asset supply not found in store")
)
