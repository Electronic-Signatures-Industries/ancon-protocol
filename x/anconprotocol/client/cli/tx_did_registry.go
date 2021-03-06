package cli

import (
	_ "github.com/spf13/cobra"
	"strconv"

	_ "github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	_ "github.com/cosmos/cosmos-sdk/client"
	_ "github.com/cosmos/cosmos-sdk/client/flags"
	_ "github.com/cosmos/cosmos-sdk/client/tx"
)

var _ = strconv.Itoa(0)

// func CmdDidRegistry() *cobra.Command {
// 	cmd := &cobra.Command{
// 		Use:   "did-registry",
// 		Short: "Broadcast message did_registry",
// 		Args:  cobra.ExactArgs(0),
// 		RunE: func(cmd *cobra.Command, args []string) error {

// 			clientCtx, err := client.GetClientTxContext(cmd)
// 			if err != nil {
// 				return err
// 			}

// 			msg := types.NewMsgDidRegistry(clientCtx.GetFromAddress().String())
// 			if err := msg.ValidateBasic(); err != nil {
// 				return err
// 			}
// 			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
// 		},
// 	}

// 	flags.AddTxFlagsToCmd(cmd)

// 	return cmd
// }
