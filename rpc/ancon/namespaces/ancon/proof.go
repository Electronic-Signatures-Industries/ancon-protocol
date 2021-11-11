package ancon

import (
	"fmt"
	"math/bits"

	ics23 "github.com/confio/ics23/go"
	"github.com/cosmos/cosmos-sdk/client"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	"github.com/tendermint/tendermint/crypto/merkle"

	txtypes "github.com/tendermint/tendermint/types"
)

func CreateProof(e client.Context, txs []txtypes.Tx, rootKeyPath string) ([]byte, []*ics23.ExistenceProof, []*ics23.CommitmentProof, error) {
	l := len(txs)
	bzs := make([][]byte, l)
	for i := 0; i < l; i++ {
		bzs[i] = txs[i].Hash()
	}
	var kp merkle.KeyPath
	root, proofs := merkle.ProofsFromByteSlices(bzs)
	keys, err := merkle.KeyPathToKeys(rootKeyPath)
	if err != nil {
		return nil, nil, nil, err
	}
	for i := 0; i < len(keys); i++ {
		kp = kp.AppendKey(keys[i], merkle.KeyEncodingURL)
	}

	var exps []*ics23.ExistenceProof
	var commitments []*ics23.CommitmentProof

	for i := 0; i < len(proofs); i++ {
		err := proofs[i].Verify(root, txs[i].Hash())
		if err != nil {
			return nil, nil, nil, err
		}
		k := kp.AppendKey(txs[i].Hash(), merkle.KeyEncodingHex)
		d := (merkle.NewValueOp([]byte(k.String()), proofs[i]))

		path, err := convertInnerOps(d.Proof)
		if err != nil {
			return nil, nil, nil, err
		}
		px := ics23.CommitmentProof_Exist{
			Exist: &ics23.ExistenceProof{
				Key:   []byte(k.String()),
				Value: txs[i].Hash(),
				Leaf:  convertLeafOp(),
				Path:  path,
			},
		}
		c := storetypes.CommitmentOp{
			Type: storetypes.ProofOpSimpleMerkleCommitment,
			Spec: ics23.TendermintSpec,
			Key:  []byte(k.String()),
			Proof: &ics23.CommitmentProof{
				Proof: &px,
			},
		}

		if err != nil {
			return nil, nil, nil, err
		}

		// err = res.Verify(ics23.IavlSpec, root, []byte(k.String()), txs[i].Hash())
		// if err != nil {
		// 	return nil, nil, err
		// }
		exps = append(exps, c.Proof.GetExist())
		commitments = append(commitments, c.Proof)
	}

	return root, exps, commitments, nil
}

// ConvertExistenceProof will convert the given proof into a valid
// existence proof, if that's what it is.
//
// This is the simplest case of the range proof and we will focus on
// demoing compatibility here
func ConvertExistenceProof(p *merkle.Proof, key, value []byte) (*ics23.ExistenceProof, error) {
	path, err := convertInnerOps(p)
	if err != nil {
		return nil, err
	}

	proof := &ics23.ExistenceProof{
		Key:   key,
		Value: value,
		Leaf:  convertLeafOp(),
		Path:  path,
	}
	return proof, nil
}

// this is adapted from merkle/hash.go:leafHash()
// and merkle/simple_map.go:KVPair.Bytes()
func convertLeafOp() *ics23.LeafOp {
	prefix := []byte{0}

	return &ics23.LeafOp{
		Hash:         ics23.HashOp_SHA256,
		PrehashKey:   ics23.HashOp_NO_HASH,
		PrehashValue: ics23.HashOp_SHA256,
		Length:       ics23.LengthOp_VAR_PROTO,
		Prefix:       prefix,
	}
}

func convertInnerOps(p *merkle.Proof) ([]*ics23.InnerOp, error) {
	var inners []*ics23.InnerOp
	path := buildPath(int(p.Index), int(p.Total))

	if len(p.Aunts) != len(path) {
		return nil, fmt.Errorf("Calculated a path different length (%d) than provided by SimpleProof (%d)", len(path), len(p.Aunts))
	}

	for i, aunt := range p.Aunts {
		auntRight := path[i]

		// combine with: 0x01 || lefthash || righthash
		inner := &ics23.InnerOp{Hash: ics23.HashOp_SHA256}
		if auntRight {
			inner.Prefix = []byte{1}
			inner.Suffix = aunt
		} else {
			inner.Prefix = append([]byte{1}, aunt...)
		}
		inners = append(inners, inner)
	}
	return inners, nil
}

// buildPath returns a list of steps from leaf to root
// in each step, true means index is left side, false index is right side
// code adapted from merkle/simple_proof.go:computeHashFromAunts
func buildPath(idx int, total int) []bool {
	if total < 2 {
		return nil
	}
	numLeft := getSplitPoint(total)
	goLeft := idx < numLeft

	// we put goLeft at the end of the array, as we recurse from top to bottom,
	// and want the leaf to be first in array, root last
	if goLeft {
		return append(buildPath(idx, numLeft), goLeft)
	}
	return append(buildPath(idx-numLeft, total-numLeft), goLeft)
}

func getSplitPoint(length int) int {
	if length < 1 {
		panic("Trying to split a tree with size < 1")
	}
	uLength := uint(length)
	bitlen := bits.Len(uLength)
	k := 1 << uint(bitlen-1)
	if k == length {
		k >>= 1
	}
	return k
}
