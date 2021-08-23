package cli

import (
	"github.com/spf13/cobra"
	"strconv"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
)

var _ = strconv.Itoa(0)

func CmdResource() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "resource [cid] [path]",
		Short: "Query resource",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			reqCid := string(args[0])
			reqPath := string(args[1])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryResourceRequest{

				Cid:  string(reqCid),
				Path: string(reqPath),
			}

			res, err := queryClient.Resource(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
