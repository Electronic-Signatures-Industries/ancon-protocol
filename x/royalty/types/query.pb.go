// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: royalty/query.proto

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

func init() { proto.RegisterFile("royalty/query.proto", fileDescriptor_f11de72c85a3052e) }

var fileDescriptor_f11de72c85a3052e = []byte{
	// 219 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x44, 0xcf, 0xb1, 0x4a, 0xc4, 0x40,
	0x10, 0xc6, 0xf1, 0xa4, 0x50, 0xe1, 0x4a, 0xed, 0x0e, 0xd9, 0x07, 0x10, 0x92, 0xe1, 0xd4, 0x27,
	0x10, 0x2c, 0xb4, 0x13, 0x3b, 0xbb, 0xc9, 0xde, 0xb0, 0x2e, 0xe4, 0x66, 0xe2, 0xce, 0x44, 0xcc,
	0x5b, 0xf8, 0x58, 0x96, 0x57, 0x5a, 0x4a, 0xf2, 0x22, 0xe2, 0xc6, 0x90, 0x7a, 0xff, 0x7c, 0xfb,
	0x9b, 0xcd, 0x45, 0x92, 0x01, 0x5b, 0x1b, 0xe0, 0xad, 0xa7, 0x34, 0xd4, 0x5d, 0x12, 0x93, 0xf3,
	0xdb, 0xfb, 0x96, 0xbc, 0x25, 0xe1, 0xe8, 0x9f, 0x63, 0x60, 0xb4, 0x3e, 0x91, 0x3e, 0xf0, 0xbe,
	0x57, 0x4b, 0x91, 0xb4, 0x46, 0xf6, 0xc2, 0x39, 0xf5, 0xd2, 0xd6, 0xff, 0x0b, 0xdb, 0xcb, 0x20,
	0x12, 0x5a, 0x02, 0xec, 0x22, 0x20, 0xb3, 0x18, 0x5a, 0x14, 0xd6, 0x79, 0x73, 0x7b, 0xe5, 0x45,
	0x0f, 0xa2, 0xd0, 0xa0, 0xd2, 0xfc, 0x19, 0xbc, 0xef, 0x1a, 0x32, 0xdc, 0x41, 0x87, 0x21, 0x72,
	0x8e, 0xe7, 0xf6, 0xfa, 0x6c, 0x73, 0xf2, 0xf4, 0x57, 0xdc, 0xed, 0xbf, 0x46, 0x57, 0x1e, 0x47,
	0x57, 0xfe, 0x8c, 0xae, 0xfc, 0x9c, 0x5c, 0x71, 0x9c, 0x5c, 0xf1, 0x3d, 0xb9, 0xe2, 0xe5, 0x31,
	0x44, 0x7b, 0xed, 0x9b, 0xda, 0xcb, 0x01, 0x56, 0x6d, 0xb5, 0x72, 0xab, 0xd5, 0x0b, 0xd9, 0x5b,
	0x2d, 0x60, 0xf8, 0x80, 0xe5, 0x68, 0x1b, 0x3a, 0xd2, 0xe6, 0x34, 0xbf, 0xdc, 0xfc, 0x06, 0x00,
	0x00, 0xff, 0xff, 0xc0, 0xc8, 0x46, 0x2b, 0x0c, 0x01, 0x00, 0x00,
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
	ServiceName: "ElectronicSignaturesIndustries.anconprotocol.royalty.Query",
	HandlerType: (*QueryServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams:     []grpc.StreamDesc{},
	Metadata:    "royalty/query.proto",
}
