package types

// import (
// 	"bytes"
// 	"encoding/json"
// 	"fmt"
// 	"strings"

// 	"gopkg.in/yaml.v2"

// 	sdk "github.com/cosmos/cosmos-sdk/types"
// 	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

// 	// "github.com/cosmos/cosmos-sdk/x/auth/exported"

// 	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
// 	"github.com/pkg/errors"

// 	ethcmn "github.com/ethereum/go-ethereum/common"
// 	ethcrypto "github.com/ethereum/go-ethereum/crypto"
// )

// //var _ exported.Account = (*EthAccount)(nil)
// //var _ exported.GenesisAccount = (*EthAccount)(nil)
// const ethAddressPrefix = "0x"

// func init() {
// 	authtypes.RegisterAccountTypeCodec(&EthAccount{}, EthAccountName)
// }

// // ----------------------------------------------------------------------------
// // Main Ethermint account
// // ----------------------------------------------------------------------------

// // EthAccount implements the auth.Account interface and embeds an
// // auth.BaseAccount type. It is compatible with the auth.AccountKeeper.
// type EthAccount struct {
// 	*authtypes.BaseAccount `json:"base_account" yaml:"base_account"`
// 	CodeHash               []byte `json:"code_hash" yaml:"code_hash"`
// }

// // ProtoAccount defines the prototype function for BaseAccount used for an
// // AccountKeeper.
// func ProtoAccount() authtypes.BaseAccount {
// 	return &EthAccount{
// 		BaseAccount: &authtypes.BaseAccount{},
// 		CodeHash:    ethcrypto.Keccak256(nil),
// 	}
// }

// // EthAddress returns the account address ethereum format.
// func (acc EthAccount) EthAddress() ethcmn.Address {
// 	return ethcmn.BytesToAddress(acc.Address.Bytes())
// }

// type ethermintAccountPretty struct {
// 	Address       sdk.AccAddress `json:"address" yaml:"address"`
// 	EthAddress    string         `json:"eth_address" yaml:"eth_address"`
// 	Coins         sdk.Coins      `json:"coins" yaml:"coins"`
// 	PubKey        string         `json:"public_key" yaml:"public_key"`
// 	AccountNumber uint64         `json:"account_number" yaml:"account_number"`
// 	Sequence      uint64         `json:"sequence" yaml:"sequence"`
// 	CodeHash      string         `json:"code_hash" yaml:"code_hash"`
// }

// // MarshalYAML returns the YAML representation of an account.
// func (acc EthAccount) MarshalYAML() (interface{}, error) {
// 	alias := ethermintAccountPretty{
// 		Address:       acc.Address,
// 		EthAddress:    acc.EthAddress().String(),
// 		Coins:         acc.Coins,
// 		AccountNumber: acc.AccountNumber,
// 		Sequence:      acc.Sequence,
// 		CodeHash:      ethcmn.Bytes2Hex(acc.CodeHash),
// 	}

// 	var err error

// 	if acc.PubKey != nil {
// 		alias.PubKey, err = sdk.Bech32ifyPubKey(sdk.Bech32PubKeyTypeAccPub, acc.PubKey)
// 		if err != nil {
// 			return nil, err
// 		}
// 	}

// 	bz, err := yaml.Marshal(alias)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return string(bz), err
// }

// // MarshalJSON returns the JSON representation of an EthAccount.
// func (acc EthAccount) MarshalJSON() ([]byte, error) {
// 	var ethAddress = ""

// 	if acc.BaseAccount != nil && acc.Address != nil {
// 		ethAddress = acc.EthAddress().String()
// 	}

// 	alias := ethermintAccountPretty{
// 		Address:       acc.Address,
// 		EthAddress:    ethAddress,
// 		Coins:         acc.Coins,
// 		AccountNumber: acc.AccountNumber,
// 		Sequence:      acc.Sequence,
// 		CodeHash:      ethcmn.Bytes2Hex(acc.CodeHash),
// 	}

// 	var err error

// 	if acc.PubKey != nil {
// 		alias.PubKey, err = sdk.Bech32ifyPubKey(sdk.Bech32PubKeyTypeAccPub, acc.PubKey)
// 		if err != nil {
// 			return nil, err
// 		}
// 	}

// 	return json.Marshal(alias)
// }

// // UnmarshalJSON unmarshals raw JSON bytes into an EthAccount.
// func (acc *EthAccount) UnmarshalJSON(bz []byte) error {
// 	var (
// 		alias ethermintAccountPretty
// 		err   error
// 	)

// 	if err := json.Unmarshal(bz, &alias); err != nil {
// 		return err
// 	}

// 	switch {
// 	case !alias.Address.Empty() && alias.EthAddress != "":
// 		// Both addresses provided. Verify correctness
// 		ethAddress := ethcmn.HexToAddress(alias.EthAddress)
// 		ethAddressFromAccAddress := ethcmn.BytesToAddress(alias.Address.Bytes())

// 		if !bytes.Equal(ethAddress.Bytes(), alias.Address.Bytes()) {
// 			err = sdkerrors.Wrapf(
// 				sdkerrors.ErrInvalidAddress,
// 				"expected %s, got %s",
// 				ethAddressFromAccAddress.String(), ethAddress.String(),
// 			)
// 		}

// 	case !alias.Address.Empty() && alias.EthAddress == "":
// 		// unmarshal sdk.AccAddress only. Do nothing here
// 	case alias.Address.Empty() && alias.EthAddress != "":
// 		// retrieve sdk.AccAddress from ethereum address
// 		ethAddress := ethcmn.HexToAddress(alias.EthAddress)
// 		alias.Address = sdk.AccAddress(ethAddress.Bytes())
// 	case alias.Address.Empty() && alias.EthAddress == "":
// 		err = sdkerrors.Wrapf(
// 			sdkerrors.ErrInvalidAddress,
// 			"account must contain address in Ethereum Hex or Cosmos Bech32 format",
// 		)
// 	}

// 	if err != nil {
// 		return err
// 	}

// 	acc.BaseAccount = &authtypes.BaseAccount{
// 		Coins:         alias.Coins,
// 		Address:       alias.Address,
// 		AccountNumber: alias.AccountNumber,
// 		Sequence:      alias.Sequence,
// 	}
// 	acc.CodeHash = ethcmn.Hex2Bytes(alias.CodeHash)

// 	if alias.PubKey != "" {
// 		acc.BaseAccount.PubKey, err = sdk.GetPubKeyFromBech32(sdk.Bech32PubKeyTypeAccPub, alias.PubKey)
// 		if err != nil {
// 			return err
// 		}
// 	}
// 	return nil
// }

// // String implements the fmt.Stringer interface
// func (acc EthAccount) String() string {
// 	out, _ := yaml.Marshal(acc)
// 	return string(out)
// }

// func ToEthAddress(addr string) (string, error) {
// 	if strings.HasPrefix(addr, sdk.GetConfig().GetBech32AccountAddrPrefix()) {
// 		// Check to see if address is Cosmos bech32 formatted
// 		toAddr, err := sdk.AccAddressFromBech32(addr)
// 		if err != nil {
// 			return "", errors.Wrap(err, "must provide a valid Bech32 address")
// 		}
// 		ethAddr := ethcmn.BytesToAddress(toAddr.Bytes())
// 		return ethAddr.Hex(), nil
// 	}

// 	if !strings.HasPrefix(addr, "0x") {
// 		addr = "0x" + addr
// 	}

// 	valid := ethcmn.IsHexAddress(addr)
// 	if !valid {
// 		return "", fmt.Errorf("%s is not a valid Ethereum or Cosmos address", addr)
// 	}

// 	ethAddr := ethcmn.HexToAddress(addr)

// 	return ethAddr.Hex(), nil
// }

// func FromEthAddress(addr string) (string, error) {
// 	//if strings.HasPrefix(addr, sdk.GetConfig().GetBech32AccountAddrPrefix()) {

// 	if strings.HasPrefix(addr, ethAddressPrefix) {
// 		// Check to see if address is Cosmos bech32 formatted
// 		fromAddr, err := sdk.AccAddress(addr) //alguna forma de fomatear a dirección de eth
// 		if err != nil {
// 			return "", errors.Wrap(err, "must provide a valid Eth address")
// 		}
// 		ethAddr := ethcmn.BytesToAddress(toAddr.Bytes()) //alguna libreria que tenga bytes to cosmos address

// 		return ethAddr.Hex(), nil //encontrar alguna función
// 	}
// }

// func formatKeyToHash(key string) string {
// 	if !strings.HasPrefix(key, "0x") {
// 		key = "0x" + key
// 	}

// 	ethkey := ethcmn.HexToHash(key)

// 	return ethkey.Hex()
// }
