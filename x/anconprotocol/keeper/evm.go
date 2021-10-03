package keeper

import (
	"github.com/ethereum/go-ethereum/accounts/abi"
)

var (
	// CreateMetadata represent the signature of
	// `event _anconCreateMetadata(
	// address owner,
	// bytes did,
	// bytes name,
	// bytes description,
	// bytes image,
	// bytes parent,
	// bytes[]  sources,
	// bytes[]  links)`
	CreateMetadata abi.Event
)

func init() {
	addressType, _ := abi.NewType("address", "", nil)
	bytesAType, _ := abi.NewType("bytes[]", "", nil)
	bytesType, _ := abi.NewType("bytes", "", nil)
	//	stringType, _ := abi.NewType("string", "", nil)
	CreateMetadata = abi.NewEvent(
		"_anconCreateMetadata",
		"_anconCreateMetadata",
		false,
		abi.Arguments{abi.Argument{
			Name:    "owner",
			Type:    addressType,
			Indexed: false,
		}, abi.Argument{
			Name:    "did",
			Type:    bytesType,
			Indexed: false,
		}, abi.Argument{
			Name:    "name",
			Type:    bytesType,
			Indexed: false,
		}, abi.Argument{
			Name:    "description",
			Type:    bytesType,
			Indexed: false,
		}, abi.Argument{
			Name:    "image",
			Type:    bytesType,
			Indexed: false,
		}, abi.Argument{
			Name:    "parent",
			Type:    bytesType,
			Indexed: false,
		}, abi.Argument{
			Name:    "sources",
			Type:    bytesAType,
			Indexed: false,
		}, abi.Argument{
			Name:    "links",
			Type:    bytesAType,
			Indexed: false,
		}},
	)
}

type CreateMetadataHook struct {
	anconprotocolKeeper Keeper
}

func NewCreateMetadataHook(anconprotocolKeeper Keeper) *CreateMetadataHook {
	return &CreateMetadataHook{
		anconprotocolKeeper: anconprotocolKeeper,
	}
}

// func (h CreateMetadataHook) PostTxProcessing(ctx sdk.Context, txHash common.Hash, logs []*ethtypes.Log) error {
// 	for _, log := range logs {
// 		if len(log.Topics) == 0 || log.Topics[0] != CreateMetadata.ID {
// 			continue
// 		}
// 		// if !ContractAllowed(log.Address) {
// 		// 	// Check the contract whitelist to prevent accidental native call.
// 		// 	continue
// 		// }
// 		unpacked, err := CreateMetadata.Inputs.Unpack(log.Data)
// 		if err != nil {
// 			log.Warn("log signature matches but failed to decode")
// 			continue
// 		}
// 		contract := sdk.AccAddress(log.Address.Bytes())
// 		recipient := sdk.AccAddress(unpacked[0].(common.Address).Bytes())

// 		err := msg.ValidateBasic()
// 		if err != nil {
// 			return nil, err
// 		}

// 		lnk, _ := k.AddMetadata(
// 			ctx,
// 			msg,
// 		)
// 		ctx.EventManager().EmitEvents(sdk.Events{
// 			sdk.NewEvent(
// 				types.ChangeOwnerEvent,
// 				sdk.NewAttribute("Identity", res.Identity),
// 				sdk.NewAttribute("Owner", res.Owner),
// 				sdk.NewAttribute("Height", fmt.Sprint(res.PreviousChange)),
// 			),
// 		})

// 	}
// 	return nil
// }
