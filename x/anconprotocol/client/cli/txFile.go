package cli

import (
	"github.com/spf13/cobra"
	"strconv"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
)

var _ = strconv.Itoa(0)

func CmdFile() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "file [path] [content] [mode] [time] [content_type] [did] [from]",
		Short: "Broadcast message file",
		Args:  cobra.ExactArgs(7),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsPath := string(args[0])
			argsContent := string(args[1])
			argsMode := string(args[2])
			argsTime := string(args[3])
			argsContent_type := string(args[4])
			argsDid := string(args[5])
			argsFrom := string(args[6])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgFile(clientCtx.GetFromAddress().String(), string(argsPath), string(argsContent), string(argsMode), string(argsTime), string(argsContent_type), string(argsDid), string(argsFrom))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
