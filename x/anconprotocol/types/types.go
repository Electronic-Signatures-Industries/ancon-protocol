package types

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
