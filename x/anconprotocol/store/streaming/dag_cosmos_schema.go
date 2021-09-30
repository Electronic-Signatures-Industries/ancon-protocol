package streaming

import "github.com/ipld/go-ipld-prime/schema"

func GetHeaderType() schema.Type {
	ts := schema.TypeSystem{}
	ts.Init()

	ts.Accumulate(schema.SpawnList("Aunts", "Hash", false))

	ts.Accumulate(schema.SpawnStruct("Proof",
		[]schema.StructField{
			schema.SpawnStructField("Total", "Int", false, false),
			schema.SpawnStructField("Index", "Int", false, false),
			schema.SpawnStructField("LeafHash", "Hash", false, false),
			schema.SpawnStructField("Aunts", "Aunts", false, false),
		},
		schema.SpawnStructRepresentationMap(nil),
	))

	ts.Accumulate(schema.SpawnStruct("Part",
		[]schema.StructField{
			schema.SpawnStructField("Index", "Uint", false, false),
			schema.SpawnStructField("Bytes", "HexBytes", false, false),
			schema.SpawnStructField("Proof", "Proof", false, false),
		},
		schema.SpawnStructRepresentationMap(nil),
	))
	ts.Accumulate(schema.SpawnList("PartSet", "Part", false))
	ts.Accumulate(schema.SpawnStruct("PartSetHeader",
		[]schema.StructField{
			schema.SpawnStructField("Total", "Uint", false, false),
			schema.SpawnStructField("Hash", "Link", false, false), // link to the root node of a merkle tree created from part set
		},
		schema.SpawnStructRepresentationMap(nil),
	))

	ts.Accumulate(schema.SpawnStruct("BlockID",
		[]schema.StructField{
			schema.SpawnStructField("Hash", "Link", false, false), // HeaderCID, link to the root node of a merkle tree created from all the consensus fields in a header
			schema.SpawnStructField("PartSetHeader", "PartSetHeader", false, false),
		},
		schema.SpawnStructRepresentationMap(nil),
	))
	ts.Accumulate(schema.SpawnStruct("Header",
		[]schema.StructField{
			schema.SpawnStructField("Version", "Version", false, false),
			schema.SpawnStructField("ChainID", "String", false, false),
			schema.SpawnStructField("Height", "Int", false, false),
			schema.SpawnStructField("Time", "Time", false, false),
			schema.SpawnStructField("LastBlockID", "BlockID", false, false),
			schema.SpawnStructField("LastCommitHash", "Link", false, false),     // CommitTreeCID
			schema.SpawnStructField("DataHash", "Link", false, false),           // TxTreeCID
			schema.SpawnStructField("ValidatorsHash", "Link", false, false),     // ValidatorTreeCID
			schema.SpawnStructField("NextValidatorsHash", "Link", false, false), // ValidatorTreeCID
			schema.SpawnStructField("ConsensusHash", "Link", false, false),      // HashedParamsCID
			schema.SpawnStructField("AppHash", "Link", false, false),            // AppStateTreeCID
			schema.SpawnStructField("LastResultsHash", "Link", false, false),    // LastResultsHash
			schema.SpawnStructField("EvidenceHash", "Link", false, false),       // EvidenceTreeCID
			schema.SpawnStructField("ProposerAddress", "Address", false, false),
		},
		schema.SpawnStructRepresentationMap(nil),
	))

	types := ts.GetTypes()

	return types["Header"]
}

/*

	# HashedParamsCID is a CID link to the HashedParams for this Header
	# This CID is composed of the SHA_256 multihash of the linked protobuf encoded HashedParams struct and the HashedParmas codec (tbd)
	type HashParamsCID &HashedParams
	# EvidenceTreeCID is a CID link to the root node of a Evidence merkle tree
	# This CID is composed of the SHA_256 multihash of the root node in the Evidence merkle tree and the Evidence codec (tbd)
	# The Evidence merkle tree is Merkle tree build from the list of evidence of Byzantine behaviour included in this block.
	type EvidenceTreeCID &MerkleTreeNode
	# ResultTreeCID is a CID link to the root node of a Result merkle tree
	# This CID is composed of the SHA_256 multihash of the root node in a Result merkle tree and the Result codec (tbd)
	# Result merkle tree is a Merkle tree built from ResponseDeliverTx responses (Log, Info, Codespace and Events fields are ignored)
	type ResultTreeCID &MerkleTreeNode
	# AppStateTreeCID is a CID link to the state root returned by the state machine after executing and commiting the previous block
	# It serves as the basis for validating any Merkle proofs that comes from the ABCI application and represents the state of the actual application rather than the state of the blockchain itself.
	# This nature of the hash is determined by the application, Tendermint can not perform validation on it
	type AppStateReference &MerkleTreeNode
	# ValidatorTreeCID is a CID link to the root node of a Validator merkle tree
	# This CID is composed of the SHA_256 multihash of the root node in the Validator merkle tree and the Validator codec (tbd)
	# Validator merkle tree is a Merkle tree built from the set of validators for the given block
	# The validators are first sorted by voting power (descending), then by address (ascending) prior to computing the MerkleRoot
	type ValidatorTreeCID &MerkleTreeNode
	# TxTreeCID is a CID link to the root node of a Tx merkle tree
	# This CID is composed of the SHA_256 multihash of the root node in the Tx merkle tree and the Tx codec (tbd)
	# Tx merkle tree is a Merkle tree built from the set of Txs at the given block
	# Note: The transactions are hashed before being included in the Merkle tree, the leaves of the Merkle tree contain the hashes, not the transactions themselves.
	type TxTreeCID &MerkleTreeNode
	# CommitTreeCID is a CID link to the root node of a Commit merkle tree
	# This CID is composed of the SHA_256 multihash of the root node in a Commit merkle tree and the Commit codec (tbd)
	# Commit merkle tree is a Merkle tree built from a set of validator's commits
	type CommitTreeCID &MerkleTreeNode
	# BlockID contains two distinct Merkle roots of the block.
	# The BlockID includes these two hashes, as well as the number of parts (ie. len(MakeParts(block)))
	type BlockID struct {
		Hash          HeaderCID
		PartSetHeader PartSetHeader
	}
	# HeaderCID is a CID link to the root node of a Header merkle tree
	# This CID is composed of the SHA_256 multihash of the root node in the Header merkle tree and the Header codec (tbd)
	# Header merkle tree is a Merklization of all of the fields in the header
	type HeaderCID &MerkleTreeNode
*/
