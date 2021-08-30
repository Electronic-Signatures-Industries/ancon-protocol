package keeper

import (
	"bytes"
	"encoding/json"
	"io"

	// This package is needed so that all the preloaded plugins are loaded automatically

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/ipld/go-ipld-prime"
	_ "github.com/ipld/go-ipld-prime/codec/dagcbor"
	"github.com/ipld/go-ipld-prime/fluent"
	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	cid "github.com/ipfs/go-cid"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	basicnode "github.com/ipld/go-ipld-prime/node/basic"
)

func (k Keeper) AddFile(ctx sdk.Context, msg *types.MsgFile) (string, error) {
	lsys := cidlink.DefaultLinkSystem()

	//   you just need a function that conforms to the ipld.BlockWriteOpener interface.
	lsys.StorageWriteOpener = func(lnkCtx ipld.LinkContext) (io.Writer, ipld.BlockWriteCommitter, error) {
		// change prefix
		buf := bytes.Buffer{}
		return &buf, func(lnk ipld.Link) error {
			//a := "hello"
			//TODO: append link string::path string (on file and metadata)
			//TODO: bafyreie5m2h2ewlqllhps5mg6ekb62eft67gvyieqon6643obz5m7zdhcy::index.html
			//TODO: bafyreie5m2h2ewlqllhps5mg6ekb62eft67gvyieqon6643obz5m7zdhcy::/json/index.html
			//TODO: bafyreie5m2h2ewlqllhps5mg6ekb62eft67gvyieqon6643obz5m7zdhcy::/json/xml/index.html
			//TODO: bafyreie5m2h2ewlqllhps5mg6ekb62eft67gvyieqon6643obz5m7zdhcy::
			//append()
			store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
			store.Set([]byte(lnk.String()), buf.Bytes())
			return nil
		}, nil
	}

	// Add Document
	// Basic Node
	n := fluent.MustBuildMap(basicnode.Prototype.Map, 6, func(na fluent.MapAssembler) {
		na.AssembleEntry("path").AssignString(msg.Path)
		na.AssembleEntry("content").AssignString(msg.Content)
		na.AssembleEntry("mode").AssignString(msg.Mode)

		na.AssembleEntry("time").AssignInt(cast.ToInt64(msg.Time))
		na.AssembleEntry("contentType").AssignString(msg.ContentType)
		na.AssembleEntry("kind").AssignString("file")
	})

	// tip: 0x0129 dag-json
	lp := cidlink.LinkPrototype{cid.Prefix{
		Version:  1,
		Codec:    0x71, // dag-cbor
		MhType:   0x12, // sha2-256
		MhLength: 32,   // sha2-256 hash has a 32-byte sum.
	}}

	link, err := lsys.Store(
		ipld.LinkContext{}, // The zero value is fine.  Configure it it you want cancellability or other features.
		lp,                 // The LinkPrototype says what codec and hashing to use.
		n,                  // And here's our data.
	)
	if err != nil {
		return "", err
	}

	// id, _ := cid.Decode(link.String())
	return link.String(), nil
}

func (k Keeper) AddMetadata(ctx sdk.Context, msg *types.MsgMetadata) (string, error) {
	lsys := cidlink.DefaultLinkSystem()

	//   you just need a function that conforms to the ipld.BlockWriteOpener interface.
	lsys.StorageWriteOpener = func(lnkCtx ipld.LinkContext) (io.Writer, ipld.BlockWriteCommitter, error) {
		// change prefix
		buf := bytes.Buffer{}
		return &buf, func(lnk ipld.Link) error {
			store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
			store.Set([]byte(lnk.String()), buf.Bytes())
			return nil
		}, nil
	}

	// Add Document
	v := []string{}
	json.Unmarshal([]byte(msg.Sources), &v)
	sources := v

	u := []string{}
	json.Unmarshal([]byte(msg.Links), &u)
	links := u
	n := fluent.MustBuildMap(basicnode.Prototype.Map, 7, func(na fluent.MapAssembler) {
		// TODO:
		na.AssembleEntry("name").AssignString(msg.Name)
		na.AssembleEntry("description").AssignString(msg.Description)
		na.AssembleEntry("image").AssignString(msg.Image)
		na.AssembleEntry("did").AssignString(msg.Did)
		if msg.VerifiedCredentialRef != "" {
			l, _ := cid.Parse(msg.VerifiedCredentialRef)
			na.AssembleEntry("verifiedCredentialRef").AssignLink(cidlink.Link{Cid: l})
		}
		na.AssembleEntry("owner").AssignString(msg.Owner)
		if msg.Parent != "" {
			p, _ := cid.Parse(msg.Parent)
			na.AssembleEntry("parent").AssignLink(cidlink.Link{Cid: p})
		}

		na.AssembleEntry("kind").AssignString("metadata")
		// Sources
		if len(sources) > 0 {

			na.AssembleEntry("sources").CreateList(cast.ToInt64(len(sources)), func(la fluent.ListAssembler) {
				for i := 0; i < len(sources); i++ {
					//c, _ := cid.Parse(sources[i])
					// todo: implement error handling
					//la.AssembleValue().AssignLink(cidlink.Link{Cid: c})
					la.AssembleValue().AssignString(sources[i])
				}
			})
		}
		// Link
		if len(links) > 0 {

			na.AssembleEntry("links").CreateList(cast.ToInt64(len(links)), func(la fluent.ListAssembler) {
				for i := 0; i < len(links); i++ {
					//c, _ := cid.Parse(links[i])
					// todo: implement error handling
					// la.AssembleValue().AssignLink(cidlink.Link{Cid: c})
					la.AssembleValue().AssignString(links[i])
				}
			})
		}
	})

	// tip: 0x0129 dag-json
	lp := cidlink.LinkPrototype{cid.Prefix{
		Version:  1,
		Codec:    0x71, // dag-cbor
		MhType:   0x12, // sha2-256
		MhLength: 32,   // sha2-256 hash has a 32-byte sum.
	}}

	link, err := lsys.Store(
		ipld.LinkContext{}, // The zero value is fine.  Configure it it you want cancellability or other features.
		lp,                 // The LinkPrototype says what codec and hashing to use.
		n,                  // And here's our data.
	)
	if err != nil {
		return "", err
	}

	//	id, _ := cid.Decode(link.String())
	return link.String(), nil
}
