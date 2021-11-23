package cmd

import (
	"encoding/base64"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

// GetEncodeCommand returns the encode command to take a JSONified transaction and turn it into
// Amino-serialized bytes
func ExecuteCelContract() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "execute [payload file] [input file] [datacontract file]",
		Short: "Encode transactions generated offline",
		Long: `Encode transactions created with the --generate-only flag and signed with the sign command.
Read a transaction from <file>, serialize it to the Amino wire protocol, and output it as base64.
If you supply a dash (-) argument in place of an input filename, the command reads from standard input.`,
		Args: cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			tx, err := ReadTxFromFile(clientCtx, args[0])

			if err != nil {
				return err
			}

			// re-encode it
			txBytes, err := clientCtx.TxConfig.TxEncoder()(tx)
			if err != nil {
				return err
			}

			// base64 encode the encoded tx bytes
			txBytesBase64 := base64.StdEncoding.EncodeToString(txBytes)

			return clientCtx.PrintString(txBytesBase64 + "\n")
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
