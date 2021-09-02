// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: anconprotocol/query.proto

package types

import (
	context "context"
	fmt "fmt"
	_ "github.com/cosmos/cosmos-sdk/codec/types"
	_ "github.com/cosmos/cosmos-sdk/types/query"
	_ "github.com/gogo/protobuf/gogoproto"
	grpc1 "github.com/gogo/protobuf/grpc"
	proto "github.com/gogo/protobuf/proto"
	_ "github.com/regen-network/cosmos-proto"
	_ "google.golang.org/genproto/googleapis/api/annotations"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	io "io"
	math "math"
	math_bits "math/bits"
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

// this line is used by starport scaffolding # 3
type QueryOwnersRequest struct {
}

func (m *QueryOwnersRequest) Reset()         { *m = QueryOwnersRequest{} }
func (m *QueryOwnersRequest) String() string { return proto.CompactTextString(m) }
func (*QueryOwnersRequest) ProtoMessage()    {}
func (*QueryOwnersRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_9e5642cda6493b99, []int{0}
}
func (m *QueryOwnersRequest) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryOwnersRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryOwnersRequest.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryOwnersRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryOwnersRequest.Merge(m, src)
}
func (m *QueryOwnersRequest) XXX_Size() int {
	return m.Size()
}
func (m *QueryOwnersRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryOwnersRequest.DiscardUnknown(m)
}

var xxx_messageInfo_QueryOwnersRequest proto.InternalMessageInfo

type QueryOwnersResponse struct {
}

func (m *QueryOwnersResponse) Reset()         { *m = QueryOwnersResponse{} }
func (m *QueryOwnersResponse) String() string { return proto.CompactTextString(m) }
func (*QueryOwnersResponse) ProtoMessage()    {}
func (*QueryOwnersResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_9e5642cda6493b99, []int{1}
}
func (m *QueryOwnersResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryOwnersResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryOwnersResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryOwnersResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryOwnersResponse.Merge(m, src)
}
func (m *QueryOwnersResponse) XXX_Size() int {
	return m.Size()
}
func (m *QueryOwnersResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryOwnersResponse.DiscardUnknown(m)
}

var xxx_messageInfo_QueryOwnersResponse proto.InternalMessageInfo

type QueryResourceRequest struct {
	Cid  string `protobuf:"bytes,1,opt,name=cid,proto3" json:"cid,omitempty"`
	Path string `protobuf:"bytes,2,opt,name=path,proto3" json:"path,omitempty"`
}

func (m *QueryResourceRequest) Reset()         { *m = QueryResourceRequest{} }
func (m *QueryResourceRequest) String() string { return proto.CompactTextString(m) }
func (*QueryResourceRequest) ProtoMessage()    {}
func (*QueryResourceRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_9e5642cda6493b99, []int{2}
}
func (m *QueryResourceRequest) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryResourceRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryResourceRequest.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryResourceRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryResourceRequest.Merge(m, src)
}
func (m *QueryResourceRequest) XXX_Size() int {
	return m.Size()
}
func (m *QueryResourceRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryResourceRequest.DiscardUnknown(m)
}

var xxx_messageInfo_QueryResourceRequest proto.InternalMessageInfo

func (m *QueryResourceRequest) GetCid() string {
	if m != nil {
		return m.Cid
	}
	return ""
}

func (m *QueryResourceRequest) GetPath() string {
	if m != nil {
		return m.Path
	}
	return ""
}

type QueryResourceResponse struct {
	Data string `protobuf:"bytes,1,opt,name=data,proto3" json:"data,omitempty"`
}

func (m *QueryResourceResponse) Reset()         { *m = QueryResourceResponse{} }
func (m *QueryResourceResponse) String() string { return proto.CompactTextString(m) }
func (*QueryResourceResponse) ProtoMessage()    {}
func (*QueryResourceResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_9e5642cda6493b99, []int{3}
}
func (m *QueryResourceResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *QueryResourceResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_QueryResourceResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *QueryResourceResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_QueryResourceResponse.Merge(m, src)
}
func (m *QueryResourceResponse) XXX_Size() int {
	return m.Size()
}
func (m *QueryResourceResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_QueryResourceResponse.DiscardUnknown(m)
}

var xxx_messageInfo_QueryResourceResponse proto.InternalMessageInfo

func (m *QueryResourceResponse) GetData() string {
	if m != nil {
		return m.Data
	}
	return ""
}

func init() {
	proto.RegisterType((*QueryOwnersRequest)(nil), "ElectronicSignaturesIndustries.anconprotocol.anconprotocol.QueryOwnersRequest")
	proto.RegisterType((*QueryOwnersResponse)(nil), "ElectronicSignaturesIndustries.anconprotocol.anconprotocol.QueryOwnersResponse")
	proto.RegisterType((*QueryResourceRequest)(nil), "ElectronicSignaturesIndustries.anconprotocol.anconprotocol.QueryResourceRequest")
	proto.RegisterType((*QueryResourceResponse)(nil), "ElectronicSignaturesIndustries.anconprotocol.anconprotocol.QueryResourceResponse")
}

func init() { proto.RegisterFile("anconprotocol/query.proto", fileDescriptor_9e5642cda6493b99) }

var fileDescriptor_9e5642cda6493b99 = []byte{
	// 495 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xd4, 0x94, 0xc1, 0x6b, 0x13, 0x41,
	0x14, 0xc6, 0x3b, 0xb1, 0x96, 0x3a, 0x14, 0x91, 0x69, 0x02, 0xe9, 0x2a, 0x4b, 0xc9, 0x49, 0x94,
	0xec, 0x50, 0xbd, 0x89, 0x27, 0xd1, 0x82, 0x50, 0xda, 0x34, 0x0a, 0x82, 0x17, 0x99, 0x9d, 0x7d,
	0xdd, 0x8c, 0x6c, 0xe7, 0x6d, 0x77, 0x66, 0xd5, 0x50, 0x7a, 0x11, 0xbc, 0x0b, 0xfe, 0x45, 0xde,
	0x3c, 0x46, 0xbc, 0x78, 0x94, 0xc4, 0x3f, 0x41, 0xf0, 0x2a, 0x3b, 0xb3, 0x35, 0x6e, 0xf1, 0x20,
	0xb6, 0x97, 0xdc, 0xde, 0x37, 0xf3, 0xbd, 0xef, 0xed, 0x6f, 0x66, 0x12, 0xba, 0x21, 0xb4, 0x44,
	0x9d, 0x17, 0x68, 0x51, 0x62, 0xc6, 0x8f, 0x4a, 0x28, 0xc6, 0x91, 0x93, 0xec, 0xde, 0xa3, 0x0c,
	0xa4, 0x2d, 0x50, 0x2b, 0xf9, 0x44, 0xa5, 0x5a, 0xd8, 0xb2, 0x00, 0xf3, 0x58, 0x27, 0xa5, 0xb1,
	0x85, 0x02, 0x13, 0x35, 0x3a, 0x9b, 0x2a, 0x68, 0xa7, 0x98, 0xa2, 0x53, 0xbc, 0xaa, 0x7c, 0x62,
	0xb0, 0x91, 0x22, 0xa6, 0x19, 0x70, 0xa7, 0xe2, 0xf2, 0x80, 0x0b, 0x3d, 0x3e, 0xdd, 0x92, 0x68,
	0x0e, 0xd1, 0xbc, 0xf0, 0x3d, 0x5e, 0xd4, 0x5b, 0x37, 0xea, 0x2e, 0x91, 0x2b, 0x2e, 0xb4, 0x46,
	0x2b, 0xac, 0x42, 0x7d, 0xba, 0x7b, 0xcb, 0x7b, 0x79, 0x2c, 0x0c, 0xf8, 0xcf, 0xe7, 0xaf, 0xb6,
	0x62, 0xb0, 0x62, 0x8b, 0xe7, 0x22, 0x55, 0xda, 0x99, 0xbd, 0xb7, 0xd7, 0xa6, 0x6c, 0xbf, 0x72,
	0xec, 0xbd, 0xd6, 0x50, 0x98, 0x21, 0x1c, 0x95, 0x60, 0x6c, 0xaf, 0x43, 0xd7, 0x1b, 0xab, 0x26,
	0x47, 0x6d, 0xa0, 0x77, 0x9f, 0xb6, 0xdd, 0xf2, 0x10, 0x0c, 0x96, 0x85, 0x84, 0xda, 0xce, 0xae,
	0xd1, 0x4b, 0x52, 0x25, 0x5d, 0xb2, 0x49, 0x6e, 0x5e, 0x19, 0x56, 0x25, 0x63, 0x74, 0x39, 0x17,
	0x76, 0xd4, 0x6d, 0xb9, 0x25, 0x57, 0xf7, 0x6e, 0xd3, 0xce, 0x99, 0x6e, 0x1f, 0x5b, 0x99, 0x13,
	0x61, 0x45, 0xdd, 0xef, 0xea, 0x3b, 0x3f, 0x56, 0xe9, 0x65, 0xe7, 0x66, 0x13, 0x42, 0xd7, 0x86,
	0x20, 0x92, 0x67, 0xca, 0x8e, 0x06, 0xc2, 0x8e, 0xd8, 0x20, 0xfa, 0xff, 0x5b, 0x88, 0xfe, 0xf6,
	0xfd, 0xc1, 0xfe, 0x05, 0x26, 0xd6, 0x47, 0x75, 0xfd, 0xed, 0x97, 0xef, 0x1f, 0x5a, 0x1d, 0xb6,
	0xce, 0x9d, 0x9b, 0x1f, 0x4b, 0x95, 0x9c, 0xf0, 0xe3, 0xea, 0x20, 0x4e, 0xd8, 0x67, 0x42, 0x57,
	0x2b, 0xa4, 0x6d, 0x95, 0xc1, 0x62, 0xe0, 0x6c, 0x3a, 0x9c, 0x80, 0x75, 0x6b, 0x9c, 0x03, 0x95,
	0x41, 0x93, 0xe9, 0x23, 0xa1, 0xcb, 0x15, 0xd3, 0x62, 0xf0, 0xb4, 0x1d, 0xcf, 0x55, 0xb6, 0xf6,
	0xe7, 0xf5, 0xb0, 0x9f, 0x84, 0xae, 0xf8, 0x27, 0xcf, 0x76, 0xcf, 0x3d, 0xb3, 0xf1, 0x8b, 0x0a,
	0xf6, 0x2e, 0x2c, 0xaf, 0x26, 0xd8, 0x71, 0x04, 0xdb, 0xec, 0x21, 0x9f, 0x07, 0xf7, 0xe7, 0xc9,
	0xfd, 0x79, 0x34, 0x6f, 0xfe, 0x9f, 0x35, 0x15, 0x7a, 0xdc, 0x77, 0xad, 0xea, 0x45, 0xfa, 0x43,
	0x5a, 0x8c, 0x1b, 0x7c, 0xea, 0xf8, 0x77, 0xd9, 0xce, 0xf9, 0xf8, 0x8b, 0x3a, 0xd7, 0xbf, 0x80,
	0x07, 0x2f, 0x3f, 0x4d, 0x43, 0x32, 0x99, 0x86, 0xe4, 0xdb, 0x34, 0x24, 0xef, 0x67, 0xe1, 0xd2,
	0x64, 0x16, 0x2e, 0x7d, 0x9d, 0x85, 0x4b, 0xcf, 0x07, 0xa9, 0xb2, 0xa3, 0x32, 0x8e, 0x24, 0x1e,
	0xfe, 0xe3, 0xc4, 0xfe, 0xef, 0x21, 0x6f, 0xce, 0x0c, 0xb5, 0xe3, 0x1c, 0x4c, 0xbc, 0xe2, 0xf4,
	0xdd, 0x5f, 0x01, 0x00, 0x00, 0xff, 0xff, 0x19, 0x3c, 0x0e, 0x6b, 0x70, 0x06, 0x00, 0x00,
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
	// Queries a list of resource items.
	ReadWithPath(ctx context.Context, in *QueryResourceRequest, opts ...grpc.CallOption) (*QueryResourceResponse, error)
	//additional handler that uses ReadFile
	// Queries a list of resource items.
	ReadFile(ctx context.Context, in *QueryResourceRequest, opts ...grpc.CallOption) (*QueryResourceResponse, error)
	// Queries a list of resource items.
	Read(ctx context.Context, in *QueryResourceRequest, opts ...grpc.CallOption) (*QueryResourceResponse, error)
	// Queries a list of owners items.
	Owners(ctx context.Context, in *QueryOwnersRequest, opts ...grpc.CallOption) (*QueryOwnersResponse, error)
	// Queries a list of resource items.
	Resource(ctx context.Context, in *QueryResourceRequest, opts ...grpc.CallOption) (*QueryResourceResponse, error)
}

type queryClient struct {
	cc grpc1.ClientConn
}

func NewQueryClient(cc grpc1.ClientConn) QueryClient {
	return &queryClient{cc}
}

func (c *queryClient) ReadWithPath(ctx context.Context, in *QueryResourceRequest, opts ...grpc.CallOption) (*QueryResourceResponse, error) {
	out := new(QueryResourceResponse)
	err := c.cc.Invoke(ctx, "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query/ReadWithPath", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) ReadFile(ctx context.Context, in *QueryResourceRequest, opts ...grpc.CallOption) (*QueryResourceResponse, error) {
	out := new(QueryResourceResponse)
	err := c.cc.Invoke(ctx, "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query/ReadFile", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) Read(ctx context.Context, in *QueryResourceRequest, opts ...grpc.CallOption) (*QueryResourceResponse, error) {
	out := new(QueryResourceResponse)
	err := c.cc.Invoke(ctx, "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query/Read", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) Owners(ctx context.Context, in *QueryOwnersRequest, opts ...grpc.CallOption) (*QueryOwnersResponse, error) {
	out := new(QueryOwnersResponse)
	err := c.cc.Invoke(ctx, "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query/Owners", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) Resource(ctx context.Context, in *QueryResourceRequest, opts ...grpc.CallOption) (*QueryResourceResponse, error) {
	out := new(QueryResourceResponse)
	err := c.cc.Invoke(ctx, "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query/Resource", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// QueryServer is the server API for Query service.
type QueryServer interface {
	// Queries a list of resource items.
	ReadWithPath(context.Context, *QueryResourceRequest) (*QueryResourceResponse, error)
	//additional handler that uses ReadFile
	// Queries a list of resource items.
	ReadFile(context.Context, *QueryResourceRequest) (*QueryResourceResponse, error)
	// Queries a list of resource items.
	Read(context.Context, *QueryResourceRequest) (*QueryResourceResponse, error)
	// Queries a list of owners items.
	Owners(context.Context, *QueryOwnersRequest) (*QueryOwnersResponse, error)
	// Queries a list of resource items.
	Resource(context.Context, *QueryResourceRequest) (*QueryResourceResponse, error)
}

// UnimplementedQueryServer can be embedded to have forward compatible implementations.
type UnimplementedQueryServer struct {
}

func (*UnimplementedQueryServer) ReadWithPath(ctx context.Context, req *QueryResourceRequest) (*QueryResourceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ReadWithPath not implemented")
}
func (*UnimplementedQueryServer) ReadFile(ctx context.Context, req *QueryResourceRequest) (*QueryResourceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ReadFile not implemented")
}
func (*UnimplementedQueryServer) Read(ctx context.Context, req *QueryResourceRequest) (*QueryResourceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Read not implemented")
}
func (*UnimplementedQueryServer) Owners(ctx context.Context, req *QueryOwnersRequest) (*QueryOwnersResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Owners not implemented")
}
func (*UnimplementedQueryServer) Resource(ctx context.Context, req *QueryResourceRequest) (*QueryResourceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Resource not implemented")
}

func RegisterQueryServer(s grpc1.Server, srv QueryServer) {
	s.RegisterService(&_Query_serviceDesc, srv)
}

func _Query_ReadWithPath_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryResourceRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).ReadWithPath(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query/ReadWithPath",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).ReadWithPath(ctx, req.(*QueryResourceRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_ReadFile_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryResourceRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).ReadFile(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query/ReadFile",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).ReadFile(ctx, req.(*QueryResourceRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_Read_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryResourceRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).Read(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query/Read",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).Read(ctx, req.(*QueryResourceRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_Owners_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryOwnersRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).Owners(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query/Owners",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).Owners(ctx, req.(*QueryOwnersRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_Resource_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryResourceRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).Resource(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query/Resource",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).Resource(ctx, req.(*QueryResourceRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Query_serviceDesc = grpc.ServiceDesc{
	ServiceName: "ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query",
	HandlerType: (*QueryServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "ReadWithPath",
			Handler:    _Query_ReadWithPath_Handler,
		},
		{
			MethodName: "ReadFile",
			Handler:    _Query_ReadFile_Handler,
		},
		{
			MethodName: "Read",
			Handler:    _Query_Read_Handler,
		},
		{
			MethodName: "Owners",
			Handler:    _Query_Owners_Handler,
		},
		{
			MethodName: "Resource",
			Handler:    _Query_Resource_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "anconprotocol/query.proto",
}

func (m *QueryOwnersRequest) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryOwnersRequest) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryOwnersRequest) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	return len(dAtA) - i, nil
}

func (m *QueryOwnersResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryOwnersResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryOwnersResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	return len(dAtA) - i, nil
}

func (m *QueryResourceRequest) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryResourceRequest) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryResourceRequest) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Path) > 0 {
		i -= len(m.Path)
		copy(dAtA[i:], m.Path)
		i = encodeVarintQuery(dAtA, i, uint64(len(m.Path)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.Cid) > 0 {
		i -= len(m.Cid)
		copy(dAtA[i:], m.Cid)
		i = encodeVarintQuery(dAtA, i, uint64(len(m.Cid)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *QueryResourceResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *QueryResourceResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *QueryResourceResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Data) > 0 {
		i -= len(m.Data)
		copy(dAtA[i:], m.Data)
		i = encodeVarintQuery(dAtA, i, uint64(len(m.Data)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintQuery(dAtA []byte, offset int, v uint64) int {
	offset -= sovQuery(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *QueryOwnersRequest) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	return n
}

func (m *QueryOwnersResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	return n
}

func (m *QueryResourceRequest) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Cid)
	if l > 0 {
		n += 1 + l + sovQuery(uint64(l))
	}
	l = len(m.Path)
	if l > 0 {
		n += 1 + l + sovQuery(uint64(l))
	}
	return n
}

func (m *QueryResourceResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Data)
	if l > 0 {
		n += 1 + l + sovQuery(uint64(l))
	}
	return n
}

func sovQuery(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozQuery(x uint64) (n int) {
	return sovQuery(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *QueryOwnersRequest) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryOwnersRequest: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryOwnersRequest: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *QueryOwnersResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryOwnersResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryOwnersResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *QueryResourceRequest) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryResourceRequest: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryResourceRequest: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Cid", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthQuery
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthQuery
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Cid = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Path", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthQuery
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthQuery
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Path = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *QueryResourceResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: QueryResourceResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: QueryResourceResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Data", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthQuery
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthQuery
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Data = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipQuery(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthQuery
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipQuery(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowQuery
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowQuery
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthQuery
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupQuery
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthQuery
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthQuery        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowQuery          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupQuery = fmt.Errorf("proto: unexpected end of group")
)
