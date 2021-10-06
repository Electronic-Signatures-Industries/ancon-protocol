package keeper

import (
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
)

var (
	// CreateMetadata represent the signature of
	// `event _anconCreateMetadata(
	// address owner,
	// string did,
	// string name,
	// string description,
	// string image,
	// string parent,
	// string  sources,
	// string  links)`
	CreateMetadata abi.Event
)

func init() {
	CreateMetadata = CreateMetedataAbiEvent()
}

func CreateMetedataAbiEvent() abi.Event {
	addressType, _ := abi.NewType("address", "", nil)
	//bytesAType, _ := abi.NewType("bytes[]", "", nil)
	//bytesType, _ := abi.NewType("bytes", "", nil)
	stringType, _ := abi.NewType("string", "", nil)
	metadata := abi.NewEvent(
		"_anconCreateMetadata",
		"_anconCreateMetadata",
		false,
		abi.Arguments{abi.Argument{
			Name:    "owner",
			Type:    addressType,
			Indexed: false,
		}, abi.Argument{
			Name:    "did",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "name",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "description",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "image",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "parent",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "sources",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "links",
			Type:    stringType,
			Indexed: false,
		}},
	)

	return metadata
}

func CreateMetadataAbi() abi.ABI {
	event := make(map[string]abi.Event)
	event["_anconCreateMetadata"] = CreateMetedataAbiEvent()

	return abi.ABI{
		Constructor: abi.Method{},
		Methods:     map[string]abi.Method{},
		Events:      event,
		Fallback:    abi.Method{},
		Receive:     abi.Method{},
	}
}

type CreateMetadataHook struct {
	anconprotocolKeeper Keeper
}

func NewCreateMetadataHook(anconprotocolKeeper Keeper) *CreateMetadataHook {
	return &CreateMetadataHook{
		anconprotocolKeeper: anconprotocolKeeper,
	}
}

func (h CreateMetadataHook) PostTxProcessing(ctx sdk.Context, txHash common.Hash, logs []*ethtypes.Log) error {
	for _, log := range logs {
		if len(log.Topics) == 0 || log.Topics[0] != CreateMetadata.ID {
			continue
		}
		// if !ContractAllowed(log.Address) {
		// 	// Check the contract whitelist to prevent accidental native call.
		// 	continue
		// }
		unpacked, err := CreateMetadata.Inputs.Unpack(log.Data)
		if err != nil {
			//log.Warn("log signature matches but failed to decode")
			continue
		}

		owner := sdk.AccAddress(unpacked[0].(common.Address).Bytes())
		did := unpacked[1].(string)
		name := unpacked[2].(string)
		description := unpacked[3].(string)
		image := unpacked[4].(string)
		parent := unpacked[5].(string)
		sources := unpacked[6].(string)
		links := unpacked[7].(string)

		msg := types.MsgMetadata{
			Creator:                owner.String(),
			Name:                   name,
			Description:            description,
			Image:                  image,
			Owner:                  owner.String(),
			Parent:                 parent,
			Sources:                sources,
			Links:                  links,
			VerifiedCredentialRef:  "",
			Did:                    did,
			From:                   "",
			EnableIpldForestAccess: false,
			FactRef:                "",
		}

		err = msg.ValidateBasic()
		if err != nil {
			return err
		}

		lnk, _ := h.anconprotocolKeeper.AddMetadata(
			ctx,
			&msg,
		)

		ctx.EventManager().EmitEvents(sdk.Events{
			sdk.NewEvent(
				"AddMetadataEvent",
				sdk.NewAttribute("TxHash", txHash.Hex()),
				sdk.NewAttribute("Link", lnk),
				sdk.NewAttribute("Sender", unpacked[0].(common.Address).Hex()),
			),
		})

	}
	return nil
}
