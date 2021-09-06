package cli

import (
    "strconv"
	"github.com/spf13/cobra"

    "github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
)

var _ = strconv.Itoa(0)

func CmdNonce() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "nonce [delegates]",
		Short: "Broadcast message nonce",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
      argsDelegates := string(args[0])
      
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgNonce(clientCtx.GetFromAddress().String(), string(argsDelegates))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

    return cmd
}