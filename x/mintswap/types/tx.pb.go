// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: mintswap/tx.proto

package types

import (
	context "context"
	fmt "fmt"
	types "github.com/cosmos/cosmos-sdk/x/ibc/core/02-client/types"
	_ "github.com/gogo/protobuf/gogoproto"
	grpc1 "github.com/gogo/protobuf/grpc"
	proto "github.com/gogo/protobuf/proto"
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

type MsgMintSwap struct {
	// the port on which the packet will be sent
	SourcePort string `protobuf:"bytes,1,opt,name=source_port,json=sourcePort,proto3" json:"source_port,omitempty" yaml:"source_port"`
	// the channel by which the packet will be sent
	SourceChannel string `protobuf:"bytes,2,opt,name=source_channel,json=sourceChannel,proto3" json:"source_channel,omitempty" yaml:"source_channel"`
	// the tokens to be transferred
	MetadataRef string `protobuf:"bytes,3,opt,name=metadata_ref,json=metadataRef,proto3" json:"metadata_ref,omitempty"`
	// the sender address
	Sender string `protobuf:"bytes,4,opt,name=sender,proto3" json:"sender,omitempty"`
	// the recipient address on the destination chain
	Receiver string `protobuf:"bytes,5,opt,name=receiver,proto3" json:"receiver,omitempty"`
	// token name
	TokenName string `protobuf:"bytes,6,opt,name=token_name,json=tokenName,proto3" json:"token_name,omitempty"`
	// token symbol/id
	TokenSymbol string `protobuf:"bytes,7,opt,name=token_symbol,json=tokenSymbol,proto3" json:"token_symbol,omitempty"`
	// did owner
	DidOwner string `protobuf:"bytes,8,opt,name=did_owner,json=didOwner,proto3" json:"did_owner,omitempty"`
	Price    uint64 `protobuf:"varint,9,opt,name=price,proto3" json:"price,omitempty"`
	// Timeout height relative to the current block height.
	// The timeout is disabled when set to 0.
	TimeoutHeight types.Height `protobuf:"bytes,10,opt,name=timeout_height,json=timeoutHeight,proto3" json:"timeout_height" yaml:"timeout_height"`
	// Timeout timestamp (in nanoseconds) relative to the current block timestamp.
	// The timeout is disabled when set to 0.
	TimeoutTimestamp uint64 `protobuf:"varint,11,opt,name=timeout_timestamp,json=timeoutTimestamp,proto3" json:"timeout_timestamp,omitempty" yaml:"timeout_timestamp"`
}

func (m *MsgMintSwap) Reset()         { *m = MsgMintSwap{} }
func (m *MsgMintSwap) String() string { return proto.CompactTextString(m) }
func (*MsgMintSwap) ProtoMessage()    {}
func (*MsgMintSwap) Descriptor() ([]byte, []int) {
	return fileDescriptor_eabae4532b5ba362, []int{0}
}
func (m *MsgMintSwap) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgMintSwap) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgMintSwap.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgMintSwap) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgMintSwap.Merge(m, src)
}
func (m *MsgMintSwap) XXX_Size() int {
	return m.Size()
}
func (m *MsgMintSwap) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgMintSwap.DiscardUnknown(m)
}

var xxx_messageInfo_MsgMintSwap proto.InternalMessageInfo

// MsgMintSwap defines the Msg/Transfer response type.
type MsgMintSwapResponse struct {
}

func (m *MsgMintSwapResponse) Reset()         { *m = MsgMintSwapResponse{} }
func (m *MsgMintSwapResponse) String() string { return proto.CompactTextString(m) }
func (*MsgMintSwapResponse) ProtoMessage()    {}
func (*MsgMintSwapResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_eabae4532b5ba362, []int{1}
}
func (m *MsgMintSwapResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgMintSwapResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgMintSwapResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgMintSwapResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgMintSwapResponse.Merge(m, src)
}
func (m *MsgMintSwapResponse) XXX_Size() int {
	return m.Size()
}
func (m *MsgMintSwapResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgMintSwapResponse.DiscardUnknown(m)
}

var xxx_messageInfo_MsgMintSwapResponse proto.InternalMessageInfo

func init() {
	proto.RegisterType((*MsgMintSwap)(nil), "ElectronicSignaturesIndustries.anconprotocol.mintswap.MsgMintSwap")
	proto.RegisterType((*MsgMintSwapResponse)(nil), "ElectronicSignaturesIndustries.anconprotocol.mintswap.MsgMintSwapResponse")
}

func init() { proto.RegisterFile("mintswap/tx.proto", fileDescriptor_eabae4532b5ba362) }

var fileDescriptor_eabae4532b5ba362 = []byte{
	// 542 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xa4, 0x53, 0x3d, 0x6f, 0xd3, 0x40,
	0x18, 0xb6, 0xe9, 0x07, 0xc9, 0x85, 0x56, 0xf4, 0x68, 0xab, 0x23, 0x50, 0xbb, 0x78, 0xea, 0x52,
	0x5b, 0x2d, 0x42, 0x48, 0x9d, 0x50, 0x10, 0x12, 0x05, 0x15, 0x90, 0xcb, 0xc4, 0x12, 0x2e, 0xe7,
	0xb7, 0xce, 0x09, 0xfb, 0xce, 0xba, 0xbb, 0xf4, 0xe3, 0x1f, 0x20, 0xb1, 0x30, 0x33, 0x55, 0xfc,
	0x9a, 0x8e, 0x1d, 0x99, 0x22, 0xd4, 0x2e, 0xcc, 0xfd, 0x05, 0xc8, 0x67, 0xbb, 0x49, 0x56, 0x98,
	0x72, 0xcf, 0xd7, 0xfb, 0x9c, 0x72, 0xaf, 0xd1, 0x4a, 0xce, 0x85, 0xd1, 0x27, 0xb4, 0x88, 0xcc,
	0x69, 0x58, 0x28, 0x69, 0x24, 0x7e, 0xf6, 0x2a, 0x03, 0x66, 0x94, 0x14, 0x9c, 0x1d, 0xf2, 0x54,
	0x50, 0x33, 0x52, 0xa0, 0xf7, 0x45, 0x32, 0xd2, 0x46, 0x71, 0xd0, 0x21, 0x15, 0x4c, 0x0a, 0x6b,
	0x65, 0x32, 0x0b, 0x9b, 0x7c, 0x77, 0x35, 0x95, 0xa9, 0xb4, 0x74, 0x54, 0x9e, 0xaa, 0x61, 0x5d,
	0x9f, 0x0f, 0x58, 0xc4, 0xa4, 0x82, 0x88, 0x65, 0x1c, 0x84, 0x89, 0x8e, 0x77, 0xea, 0x53, 0x65,
	0x08, 0xbe, 0xcd, 0xa3, 0xce, 0x81, 0x4e, 0x0f, 0xb8, 0x30, 0x87, 0x27, 0xb4, 0xc0, 0xcf, 0x51,
	0x47, 0xcb, 0x91, 0x62, 0xd0, 0x2f, 0xa4, 0x32, 0xc4, 0xdd, 0x74, 0xb7, 0xda, 0xbd, 0xf5, 0x9b,
	0xb1, 0x8f, 0xcf, 0x68, 0x9e, 0xed, 0x05, 0x53, 0x62, 0x10, 0xa3, 0x0a, 0x7d, 0x90, 0xca, 0xe0,
	0x17, 0x68, 0xb9, 0xd6, 0xd8, 0x90, 0x0a, 0x01, 0x19, 0xb9, 0x63, 0xb3, 0x0f, 0x6f, 0xc6, 0xfe,
	0xda, 0x4c, 0xb6, 0xd6, 0x83, 0x78, 0xa9, 0x22, 0x5e, 0x56, 0x18, 0x3f, 0x41, 0xf7, 0x72, 0x30,
	0x34, 0xa1, 0x86, 0xf6, 0x15, 0x1c, 0x91, 0xb9, 0x32, 0x1f, 0x77, 0x1a, 0x2e, 0x86, 0x23, 0xbc,
	0x8e, 0x16, 0x35, 0x88, 0x04, 0x14, 0x99, 0xb7, 0x62, 0x8d, 0x70, 0x17, 0xb5, 0x14, 0x30, 0xe0,
	0xc7, 0xa0, 0xc8, 0x82, 0x55, 0x6e, 0x31, 0xde, 0x40, 0xc8, 0xc8, 0x2f, 0x20, 0xfa, 0x82, 0xe6,
	0x40, 0x16, 0xad, 0xda, 0xb6, 0xcc, 0x3b, 0x9a, 0x43, 0xd9, 0x5a, 0xc9, 0xfa, 0x2c, 0x1f, 0xc8,
	0x8c, 0xdc, 0xad, 0x5a, 0x2d, 0x77, 0x68, 0x29, 0xfc, 0x08, 0xb5, 0x13, 0x9e, 0xf4, 0xe5, 0x89,
	0x00, 0x45, 0x5a, 0xd5, 0xf8, 0x84, 0x27, 0xef, 0x4b, 0x8c, 0x57, 0xd1, 0x42, 0xa1, 0x38, 0x03,
	0xd2, 0xde, 0x74, 0xb7, 0xe6, 0xe3, 0x0a, 0xe0, 0xcf, 0x68, 0xd9, 0xf0, 0x1c, 0xe4, 0xc8, 0xf4,
	0x87, 0xc0, 0xd3, 0xa1, 0x21, 0x68, 0xd3, 0xdd, 0xea, 0xec, 0x76, 0x43, 0x3e, 0x60, 0x61, 0xf9,
	0x20, 0x61, 0xfd, 0x0c, 0xc7, 0x3b, 0xe1, 0x6b, 0xeb, 0xe8, 0x6d, 0x5c, 0x8c, 0x7d, 0x67, 0xf2,
	0x6f, 0xcd, 0xe6, 0x83, 0x78, 0xa9, 0x26, 0x2a, 0x37, 0xde, 0x47, 0x2b, 0x8d, 0xa3, 0xfc, 0xd5,
	0x86, 0xe6, 0x05, 0xe9, 0x94, 0x77, 0xe8, 0x3d, 0xbe, 0x19, 0xfb, 0x64, 0x76, 0xc8, 0xad, 0x25,
	0x88, 0xef, 0xd7, 0xdc, 0xc7, 0x86, 0xda, 0x6b, 0x7d, 0x3d, 0xf7, 0x9d, 0x3f, 0xe7, 0xbe, 0x13,
	0xac, 0xa1, 0x07, 0x53, 0xcb, 0x10, 0x83, 0x2e, 0xa4, 0xd0, 0xb0, 0xfb, 0xd3, 0x45, 0x73, 0x07,
	0x3a, 0xc5, 0x3f, 0x5c, 0xd4, 0xba, 0xdd, 0x94, 0x5e, 0xf8, 0x4f, 0x8b, 0x1a, 0x4e, 0x15, 0x74,
	0xdf, 0xfc, 0xff, 0x8c, 0xe6, 0x92, 0x3d, 0xb8, 0xb8, 0xf2, 0xdc, 0xcb, 0x2b, 0xcf, 0xfd, 0x7d,
	0xe5, 0xb9, 0xdf, 0xaf, 0x3d, 0xe7, 0xf2, 0xda, 0x73, 0x7e, 0x5d, 0x7b, 0xce, 0xa7, 0xb7, 0x29,
	0x37, 0xc3, 0xd1, 0x20, 0x64, 0x32, 0x8f, 0x26, 0x7d, 0xdb, 0x93, 0xc2, 0xed, 0x49, 0x63, 0x64,
	0x1b, 0xb7, 0x9b, 0xca, 0xe8, 0x34, 0x9a, 0x7c, 0xa1, 0x67, 0x05, 0xe8, 0xc1, 0xa2, 0x95, 0x9e,
	0xfe, 0x0d, 0x00, 0x00, 0xff, 0xff, 0xe2, 0x17, 0xa4, 0x9b, 0xba, 0x03, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// MsgClient is the client API for Msg service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type MsgClient interface {
	// MintSwap defines a rpc handler method for MsgMintSwap.
	MintSwap(ctx context.Context, in *MsgMintSwap, opts ...grpc.CallOption) (*MsgMintSwapResponse, error)
}

type msgClient struct {
	cc grpc1.ClientConn
}

func NewMsgClient(cc grpc1.ClientConn) MsgClient {
	return &msgClient{cc}
}

func (c *msgClient) MintSwap(ctx context.Context, in *MsgMintSwap, opts ...grpc.CallOption) (*MsgMintSwapResponse, error) {
	out := new(MsgMintSwapResponse)
	err := c.cc.Invoke(ctx, "/ElectronicSignaturesIndustries.anconprotocol.mintswap.Msg/MintSwap", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MsgServer is the server API for Msg service.
type MsgServer interface {
	// MintSwap defines a rpc handler method for MsgMintSwap.
	MintSwap(context.Context, *MsgMintSwap) (*MsgMintSwapResponse, error)
}

// UnimplementedMsgServer can be embedded to have forward compatible implementations.
type UnimplementedMsgServer struct {
}

func (*UnimplementedMsgServer) MintSwap(ctx context.Context, req *MsgMintSwap) (*MsgMintSwapResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method MintSwap not implemented")
}

func RegisterMsgServer(s grpc1.Server, srv MsgServer) {
	s.RegisterService(&_Msg_serviceDesc, srv)
}

func _Msg_MintSwap_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgMintSwap)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).MintSwap(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ElectronicSignaturesIndustries.anconprotocol.mintswap.Msg/MintSwap",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).MintSwap(ctx, req.(*MsgMintSwap))
	}
	return interceptor(ctx, in, info, handler)
}

var _Msg_serviceDesc = grpc.ServiceDesc{
	ServiceName: "ElectronicSignaturesIndustries.anconprotocol.mintswap.Msg",
	HandlerType: (*MsgServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "MintSwap",
			Handler:    _Msg_MintSwap_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "mintswap/tx.proto",
}

func (m *MsgMintSwap) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgMintSwap) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgMintSwap) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.TimeoutTimestamp != 0 {
		i = encodeVarintTx(dAtA, i, uint64(m.TimeoutTimestamp))
		i--
		dAtA[i] = 0x58
	}
	{
		size, err := m.TimeoutHeight.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintTx(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x52
	if m.Price != 0 {
		i = encodeVarintTx(dAtA, i, uint64(m.Price))
		i--
		dAtA[i] = 0x48
	}
	if len(m.DidOwner) > 0 {
		i -= len(m.DidOwner)
		copy(dAtA[i:], m.DidOwner)
		i = encodeVarintTx(dAtA, i, uint64(len(m.DidOwner)))
		i--
		dAtA[i] = 0x42
	}
	if len(m.TokenSymbol) > 0 {
		i -= len(m.TokenSymbol)
		copy(dAtA[i:], m.TokenSymbol)
		i = encodeVarintTx(dAtA, i, uint64(len(m.TokenSymbol)))
		i--
		dAtA[i] = 0x3a
	}
	if len(m.TokenName) > 0 {
		i -= len(m.TokenName)
		copy(dAtA[i:], m.TokenName)
		i = encodeVarintTx(dAtA, i, uint64(len(m.TokenName)))
		i--
		dAtA[i] = 0x32
	}
	if len(m.Receiver) > 0 {
		i -= len(m.Receiver)
		copy(dAtA[i:], m.Receiver)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Receiver)))
		i--
		dAtA[i] = 0x2a
	}
	if len(m.Sender) > 0 {
		i -= len(m.Sender)
		copy(dAtA[i:], m.Sender)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Sender)))
		i--
		dAtA[i] = 0x22
	}
	if len(m.MetadataRef) > 0 {
		i -= len(m.MetadataRef)
		copy(dAtA[i:], m.MetadataRef)
		i = encodeVarintTx(dAtA, i, uint64(len(m.MetadataRef)))
		i--
		dAtA[i] = 0x1a
	}
	if len(m.SourceChannel) > 0 {
		i -= len(m.SourceChannel)
		copy(dAtA[i:], m.SourceChannel)
		i = encodeVarintTx(dAtA, i, uint64(len(m.SourceChannel)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.SourcePort) > 0 {
		i -= len(m.SourcePort)
		copy(dAtA[i:], m.SourcePort)
		i = encodeVarintTx(dAtA, i, uint64(len(m.SourcePort)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *MsgMintSwapResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgMintSwapResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgMintSwapResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	return len(dAtA) - i, nil
}

func encodeVarintTx(dAtA []byte, offset int, v uint64) int {
	offset -= sovTx(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *MsgMintSwap) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.SourcePort)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.SourceChannel)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.MetadataRef)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.Sender)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.Receiver)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.TokenName)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.TokenSymbol)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.DidOwner)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	if m.Price != 0 {
		n += 1 + sovTx(uint64(m.Price))
	}
	l = m.TimeoutHeight.Size()
	n += 1 + l + sovTx(uint64(l))
	if m.TimeoutTimestamp != 0 {
		n += 1 + sovTx(uint64(m.TimeoutTimestamp))
	}
	return n
}

func (m *MsgMintSwapResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	return n
}

func sovTx(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozTx(x uint64) (n int) {
	return sovTx(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *MsgMintSwap) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
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
			return fmt.Errorf("proto: MsgMintSwap: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgMintSwap: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field SourcePort", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.SourcePort = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field SourceChannel", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.SourceChannel = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field MetadataRef", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.MetadataRef = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Sender", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Sender = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Receiver", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Receiver = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 6:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field TokenName", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.TokenName = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 7:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field TokenSymbol", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.TokenSymbol = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 8:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field DidOwner", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.DidOwner = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 9:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Price", wireType)
			}
			m.Price = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Price |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 10:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field TimeoutHeight", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.TimeoutHeight.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 11:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field TimeoutTimestamp", wireType)
			}
			m.TimeoutTimestamp = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.TimeoutTimestamp |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
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
func (m *MsgMintSwapResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
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
			return fmt.Errorf("proto: MsgMintSwapResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgMintSwapResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
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
func skipTx(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowTx
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
					return 0, ErrIntOverflowTx
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
					return 0, ErrIntOverflowTx
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
				return 0, ErrInvalidLengthTx
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupTx
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthTx
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthTx        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowTx          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupTx = fmt.Errorf("proto: unexpected end of group")
)