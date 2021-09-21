// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: pki/query.proto

package types

import (
	context "context"
	fmt "fmt"
	_ "github.com/cosmos/cosmos-sdk/types/query"
	grpc1 "github.com/gogo/protobuf/grpc"
	proto "github.com/gogo/protobuf/proto"
	_ "google.golang.org/genproto/googleapis/api/annotations"
	grpc "google.golang.org/grpc"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

func init() { proto.RegisterFile("pki/query.proto", fileDescriptor_62972e0134af9ed2) }

var fileDescriptor_62972e0134af9ed2 = []byte{
	// 217 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x44, 0xcf, 0xc1, 0x4a, 0xc4, 0x40,
	0x0c, 0x80, 0xe1, 0xf6, 0xa0, 0xc2, 0x5e, 0x04, 0x8f, 0x8b, 0xcc, 0x03, 0x08, 0x6d, 0x5c, 0x7d,
	0x03, 0x41, 0xc1, 0xa3, 0x78, 0xf3, 0xe4, 0x74, 0x0c, 0x63, 0xd8, 0x6e, 0x32, 0x4e, 0x52, 0x71,
	0xdf, 0xc2, 0xc7, 0xf2, 0xb8, 0x47, 0x8f, 0xd2, 0xbe, 0x88, 0xb4, 0x65, 0xe9, 0x35, 0xfc, 0x24,
	0x5f, 0x56, 0xe7, 0x69, 0x4b, 0xf0, 0xd1, 0x61, 0xde, 0xd7, 0x29, 0x8b, 0xc9, 0xc5, 0xf5, 0x7d,
	0x8b, 0xc1, 0xb2, 0x30, 0x85, 0x67, 0x8a, 0xec, 0xad, 0xcb, 0xa8, 0x8f, 0xfc, 0xd6, 0xa9, 0x65,
	0x42, 0xad, 0x3d, 0x07, 0xe1, 0x29, 0x0d, 0xd2, 0xd6, 0x69, 0x4b, 0xeb, 0xcb, 0x28, 0x12, 0x5b,
	0x04, 0x9f, 0x08, 0x3c, 0xb3, 0x98, 0x37, 0x12, 0xd6, 0x79, 0xdf, 0xfa, 0x2a, 0x88, 0xee, 0x44,
	0xa1, 0xf1, 0x8a, 0xf3, 0x21, 0xf8, 0xdc, 0x34, 0x68, 0x7e, 0x03, 0xc9, 0x47, 0xe2, 0x29, 0x9e,
	0xdb, 0x9b, 0xb3, 0xd5, 0xc9, 0xd3, 0x58, 0xdc, 0xbd, 0xfe, 0xf4, 0xae, 0x3c, 0xf4, 0xae, 0xfc,
	0xeb, 0x5d, 0xf9, 0x3d, 0xb8, 0xe2, 0x30, 0xb8, 0xe2, 0x77, 0x70, 0xc5, 0xcb, 0x43, 0x24, 0x7b,
	0xef, 0x9a, 0x3a, 0xc8, 0x0e, 0x16, 0x69, 0xb5, 0x50, 0xab, 0xc5, 0x0a, 0x93, 0xb5, 0x3a, 0x62,
	0xe1, 0x0b, 0xc6, 0x67, 0x6d, 0x9f, 0x50, 0x9b, 0xd3, 0x69, 0x7a, 0xfb, 0x1f, 0x00, 0x00, 0xff,
	0xff, 0x4a, 0xc2, 0xb7, 0xc9, 0x00, 0x01, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// QueryClient is the client API for Query service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type QueryClient interface {
}

type queryClient struct {
	cc grpc1.ClientConn
}

func NewQueryClient(cc grpc1.ClientConn) QueryClient {
	return &queryClient{cc}
}

// QueryServer is the server API for Query service.
type QueryServer interface {
}

// UnimplementedQueryServer can be embedded to have forward compatible implementations.
type UnimplementedQueryServer struct {
}

func RegisterQueryServer(s grpc1.Server, srv QueryServer) {
	s.RegisterService(&_Query_serviceDesc, srv)
}

var _Query_serviceDesc = grpc.ServiceDesc{
	ServiceName: "ElectronicSignaturesIndustries.anconprotocol.pki.Query",
	HandlerType: (*QueryServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams:     []grpc.StreamDesc{},
	Metadata:    "pki/query.proto",
}
