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

func CmdMetadata() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "metadata [name] [description] [image] [owner] [parent] [sources] [links] [verified_credential_ref] [did] [from]",
		Short: "Broadcast message metadata",
		Args:  cobra.ExactArgs(10),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsName := string(args[0])
			argsDescription := string(args[1])
			argsImage := string(args[2])
			argsOwner := string(args[3])
			argsParent := string(args[4])
			argsSources := string(args[5])
			argsLinks := string(args[6])
			argsVerified_credential_ref := string(args[7])
			argsDid := string(args[8])
			argsFrom := string(args[9])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgMetadata(clientCtx.GetFromAddress().String(), string(argsName), string(argsDescription), string(argsImage), string(argsOwner), string(argsParent), string(argsSources), string(argsLinks), string(argsVerified_credential_ref), string(argsDid), string(argsFrom))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
