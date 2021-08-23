package main

import (
	"os"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/app"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/cmd/ancon-protocold/cmd"
	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
)

func main() {
	rootCmd, _ := cmd.NewRootCmd()
	if err := svrcmd.Execute(rootCmd, app.DefaultNodeHome); err != nil {
		os.Exit(1)
	}
}
