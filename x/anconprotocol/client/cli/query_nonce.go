package cli

// import (
// 	"github.com/spf13/cobra"
// 	"strconv"

// 	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
// 	"github.com/cosmos/cosmos-sdk/client"
// 	"github.com/cosmos/cosmos-sdk/client/flags"
// )

// var _ = strconv.Itoa(0)

// func CmdNonce() *cobra.Command {
// 	cmd := &cobra.Command{
// 		Use:   "nonce [delegates]",
// 		Short: "Query nonce",
// 		Args:  cobra.ExactArgs(1),
// 		RunE: func(cmd *cobra.Command, args []string) error {
//       reqDelegates := string(args[0])

// 			clientCtx, err := client.GetClientTxContext(cmd)
// 			if err != nil {
// 				return err
// 			}

// 			queryClient := types.NewQueryClient(clientCtx)

// 			params := &types.QueryNonceRequest{

//                 Delegates: string(reqDelegates),
//             }

// 			res, err := queryClient.Nonce(cmd.Context(), params)
//             if err != nil {
//                 return err
//             }

//             return clientCtx.PrintProto(res)
// 		},
// 	}

// 	flags.AddQueryFlagsToCmd(cmd)

//     return cmd
// }
