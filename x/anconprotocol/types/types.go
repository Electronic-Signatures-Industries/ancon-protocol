package types

type IPLDMetadataStore struct {
	Name                  string   `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	Description           string   `protobuf:"bytes,2,opt,name=description,proto3" json:"description,omitempty"`
	Image                 string   `protobuf:"bytes,3,opt,name=image,proto3" json:"image,omitempty"`
	Owner                 string   `protobuf:"bytes,4,opt,name=owner,proto3" json:"owner,omitempty"`
	Parent                string   `protobuf:"bytes,5,opt,name=parent,proto3" json:"parent,omitempty"`
	Sources               []string `protobuf:"bytes,6,opt,name=sources,proto3" json:"sources,omitempty"`
	Links                 []string `protobuf:"bytes,7,opt,name=links,proto3" json:"links,omitempty"`
	VerifiedCredentialRef string   `protobuf:"bytes,8,opt,name=verified_credential_ref,json=verifiedCredentialRef,proto3" json:"verified_credential_ref,omitempty"`
	Did                   string   `protobuf:"bytes,9,opt,name=did,proto3" json:"did,omitempty"`
	Kind                  string   `protobuf:"bytes,10,opt,name=kind,proto3" json:"kind,omitempty"`
}

type IPLDFileStore struct {
	Content     string `json:"content"`
	Path        string `json:"path"`
	ContentType string `json:"contentType"`
	Mode        string `json:"mode"`
	Time        string `json:"time"`
	Kind        string `json:"kind"`
}
type Metadata struct {
	Creator               string
	Name                  string
	Description           string
	Image                 string
	Owner                 string
	Parent                string
	Sources               []string
	Links                 []string
	VerifiedCredentialRef string
	Did                   string
	From                  string
}

type File struct {
	Path        string
	Content     string
	Mode        string
	Time        uint64
	ContentType string
	Did         string
	From        string
}

type JSONArrayOfString struct {
	Items []string
}
