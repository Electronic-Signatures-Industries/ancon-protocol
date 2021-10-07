package keeper

import (
	"context"
	"crypto/ecdsa"
	"fmt"
	"log"
	"math"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	// server := api.GetAPIServer()
	// port := "8080"
	// log.Println("Listening on port")

	// log.Fatal(http.ListenAndServe(":"+port, server))

	client, err := ethclient.Dial("http://localhost:8545")
	exitOnErr(err)

	accountPK, err := crypto.HexToECDSA("5ad53543cdbffb2aba59777b93ec1f97dc3c0c09293ffe24f466d733f95e10a7")
	exitOnErr(err)

	paymentAddress := common.HexToAddress("0x8Ce77c5052f1aFd847eBd365729C0367De85626C")

	walletAddress := common.HexToAddress("0xA83B070a68336811e9265fbEc6d49B98538F61EA")

	paymentContract, err := didpayment.NewDidpayment(paymentAddress, client)
	exitOnErr(err)

	auth := getBindOptions(client, walletAddress, accountPK)

	//this is from administrative account only
	tx, err := paymentContract.SetWhitelistedUser(auth, walletAddress, true)
	exitOnErr(err)

	fmt.Println(tx.Hash().Hex())

	opts := bind.CallOpts{}

	auth = getBindOptions(client, walletAddress, accountPK)

	// query := ethereum.FilterQuery{

	// 	Addresses: []common.Address{
	// 		paymentAddress,
	// 	},
	// }

	// logs, err := client.FilterLogs(context.Background(), query)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// for _, l := range logs {
	// 	log.Println(l)
	// }

	// allredyPaid, err := paymentContract.Orders(&opts, walletAddress)
	// exitOnErr(err)

	allredyPaid, err := paymentContract.VerifyPayment(&opts, walletAddress)
	// exitOnErr(err)

	if !allredyPaid {
		tx2, err := paymentContract.PayKYCService(auth, walletAddress)
		exitOnErr(err)

		//wait for transaction to be mined
		bind.WaitMined(context.Background(), client, tx2)
		receipt, err := client.TransactionReceipt(context.Background(), tx2.Hash())
		_ = receipt.BlockNumber

		fmt.Println("Receipt", receipt)
		fmt.Println("TX Error", err)

		//exitOnErr(err)
	} else {
		fmt.Println("ya pago")
	}

}

func getBindOptions(client *ethclient.Client, address common.Address, pk *ecdsa.PrivateKey) *bind.TransactOpts {
	gasPrice, err := client.SuggestGasPrice(context.Background())
	exitOnErr(err)

	nonce, err := client.PendingNonceAt(context.Background(), address)
	auth := bind.NewKeyedTransactor(pk)
	auth.Nonce = big.NewInt(int64(nonce))
	auth.GasLimit = uint64(300000)
	auth.GasPrice = gasPrice
	return auth
}

func exitOnErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func mintUSDCToWallet(pk *ecdsa.PrivateKey, walletAddress common.Address, client *ethclient.Client) {
	usdcAddress := common.HexToAddress("0xb84A298335C3eda7a6aB5Eb51b9b9D836D5128c1")

	gasPrice, err := client.SuggestGasPrice(context.Background())
	exitOnErr(err)

	nonce, err := client.PendingNonceAt(context.Background(), walletAddress)
	auth := bind.NewKeyedTransactor(pk)
	auth.Nonce = big.NewInt(int64(nonce))
	auth.GasLimit = uint64(300000) // in units
	auth.GasPrice = gasPrice

	usdcContract, err := usdc.NewUsdc(usdcAddress, client)
	exitOnErr(err)

	mintAmout := big.NewInt(95)
	toMint := mintAmout.Mul(big.NewInt(int64(math.Pow10(17))), mintAmout)

	tr, err := usdcContract.Mint(auth, walletAddress, toMint)
	log.Println(tr.Hash().Hex())

}
