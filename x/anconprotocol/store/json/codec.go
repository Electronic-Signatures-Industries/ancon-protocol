package json

import (
	"bytes"
	"strings"

	"github.com/ipld/go-ipld-prime/codec/dagcbor"
	_ "github.com/ipld/go-ipld-prime/codec/dagcbor"
	"github.com/ipld/go-ipld-prime/codec/dagjson"
	"github.com/ipld/go-ipld-prime/datamodel"
)

func Encode(n datamodel.Node) (string, error) {
	var sb strings.Builder
	err := dagjson.Encode(n, &sb)
	return sb.String(), err
}

func Decode(proto datamodel.NodePrototype, src string) (datamodel.Node, error) {
	nb := proto.NewBuilder()
	err := dagjson.Decode(nb, strings.NewReader(src))
	return nb.Build(), err
}

func EncodeCBOR(n datamodel.Node) ([]byte, error) {
	var sb bytes.Buffer
	err := dagcbor.Encode(n, &sb)
	return sb.Bytes(), err
}

func DecodeCBOR(proto datamodel.NodePrototype, src []byte) (datamodel.Node, error) {
	nb := proto.NewBuilder()
	err := dagcbor.Decode(nb, bytes.NewReader(src))
	return nb.Build(), err
}
