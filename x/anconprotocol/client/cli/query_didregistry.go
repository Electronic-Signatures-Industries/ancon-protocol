package cli

import (
	"strconv"
)

var _ = strconv.Itoa(0)

// func CmdOwners() *cobra.Command {
// 	cmd := &cobra.Command{
// 		Use:   "owners",
// 		Short: "Query owners",
// 		Args:  cobra.ExactArgs(0),
// 		RunE: func(cmd *cobra.Command, args []string) error {

// 			clientCtx, err := client.GetClientTxContext(cmd)
// 			if err != nil {
// 				return err
// 			}

// 			queryClient := types.NewQueryClient(clientCtx)

// 			params := &types.QueryOwnersRequest{}

// 			res, err := queryClient.Owners(cmd.Context(), params)
// 			if err != nil {
// 				return err
// 			}

// 			return clientCtx.PrintProto(res)
// 		},
// 	}

// 	flags.AddQueryFlagsToCmd(cmd)

// 	return cmd
// }
