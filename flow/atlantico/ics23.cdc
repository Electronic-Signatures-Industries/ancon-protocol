
contract ICS23 {
    // Data structures and helper functions

    pub enum HashOp: uint8 {
        pub NO_HASH
        pub SHA256
        pub SHA512
        pub KECCAK
        pub RIPEMD160
        pub BITCOIN
    }
    enum LengthOp: uint8 {

        pub NO_PREFIX
        pub VAR_PROTO
        pub VAR_RLP
        pub FIXED32_BIG
        pub FIXED32_LITTLE
        pub FIXED64_BIG
        pub FIXED64_LITTLE
        pub REQUIRE_32_BYTES
      pub  REQUIRE_64_BYTES
    }

   pub struct ExistenceProof {
      pub var    valid: Bool
      pub var  key: [Uint8]
      pub var  value: [Uint8] 
      pub var leaf: LeafOp
      pub var  path:[InnerOp] 
    }

   pub struct NonExistenceProof {
      pub var    valid
      pub var  [Uint8] key
      pub var  ExistenceProof left
      pub var  ExistenceProof right
    }

   pub struct LeafOp {
      pub var    valid
      pub var  HashOp hash
      pub var  HashOp prehash_key
      pub var  HashOp prehash_value
      pub var  LengthOp len
      pub var  [Uint8] prefix
    }

   pub struct InnerOp {
      pub var    valid
      pub var  HashOp hash
      pub var  [Uint8] prefix
      pub var  [Uint8] suffix
    }

   pub struct ProofSpec {
      pub var  LeafOp leafSpec
      pub var  InnerSpec innerSpec
      pub var  uint256 maxDepth
      pub var  uint256 minDepth
    }

   pub struct InnerSpec {
      pub var  uint256[] childOrder
      pub var  uint256 childSize
      pub var  uint256 minPrefixLength
      pub var  uint256 maxPrefixLength
      pub var  [Uint8] emptyChild
      pub var  HashOp hash
    }

    fun getIavlSpec()    : (ProofSpec  ) {
        ProofSpec   spec;

        uint256[]   childOrder = new uint256[](2);
        childOrder[0] = 0;
        childOrder[1] = 1;

        spec.leafSpec = LeafOp(
            true,
            HashOp.SHA256,
            HashOp.NO_HASH,
            HashOp.SHA256,
            LengthOp.VAR_PROTO,
            hex"00"
        );

        spec.innerSpec = InnerSpec(
            childOrder,
            33,
            4,
            12,
            "",
            HashOp.SHA256
        );
        return spec;
    }

    enum Ordering {
        LT,
        EQ,
        GT
    }

    fun checkAgainstSpecLeafOp(LeafOp   op, ProofSpec   spec)
         
        
    {
        require(op.hash == spec.leafSpec.hash, "Unexpected HashOp");
        require(
            op.prehash_key == spec.leafSpec.prehash_key,
            "Unexpected PrehashKey"
        );
        require(
            op.prehash_value == spec.leafSpec.prehash_value,
            "Unexpected PrehashKey"
        );
        require(op.len == spec.leafSpec.len, "UnexpecteleafSpec LengthOp");
        require(
            Bytes.hasPrefix(op.prefix, spec.leafSpec.prefix),
            "LeafOpLib: wrong prefix"
        );
    }

    fun applyValueLeafOp(
        LeafOp   op,
        [Uint8]   key,
        [Uint8]   value
    )    : ([Uint8]  ) {
        require(key.length > 0, "Leaf op needs key");
        require(value.length > 0, "Leaf op needs value");
        [Uint8]   data = abi.encodePacked(
            abi.encodePacked(
                op.prefix,
                prepareLeafData(op.prehash_key, op.len, key)
            ),
            prepareLeafData(op.prehash_value, op.len, value)
        );
        return doHash(op.hash, data);
    }

    fun prepareLeafData(
        HashOp hashOp,
        LengthOp lengthOp,
        [Uint8]   data
    )    : ([Uint8]  ) {
        return doLength(lengthOp, doHashOrNoop(hashOp, data));
    }

    fun doHashOrNoop(HashOp hashOp, [Uint8]   data)
        private
        
        : ([Uint8]  )
    {
        if (hashOp == HashOp.NO_HASH) {
            return data;
        }
        return doHash(hashOp, data);
    }

    fun checkAgainstSpecInnerOp(InnerOp   op, ProofSpec   spec)
         
        
    {
        require(op.hash == spec.leafSpec.hash, "Unexpected HashOp");
        require(
            !Bytes.hasPrefix(op.prefix, spec.leafSpec.prefix),
            "InnerOpLib: wrong prefix"
        );
        require(
            op.prefix.length >= uint256(spec.innerSpec.minPrefixLength),
            "InnerOp prefix too short"
        );

        uint256 maxLeftChildLen = (spec.innerSpec.childOrder.length - 1) *
            uint256(spec.innerSpec.childSize);
        require(
            op.prefix.length <=
                uint256(spec.innerSpec.maxPrefixLength) + maxLeftChildLen,
            "InnerOp prefix too short"
        );
    }

    fun applyValueInnerOp(InnerOp   op, [Uint8]   child)
         
        
        : ([Uint8]  )
    {
        require(child.length > 0, "Inner op needs child value");
        return
            doHash(
                op.hash,
                abi.encodePacked(abi.encodePacked(op.prefix, child), op.suffix)
            );
    }

    fun doHash(HashOp hashOp, [Uint8]   data)
         
        
        : ([Uint8]  )
    {
        if (hashOp == HashOp.SHA256) {
            return Bytes.fromBytes32(sha256(data));
        }

        if (hashOp == HashOp.SHA512) {
            //TODO: implement sha512
            revert("SHA512 not implemented");
        }

        if (hashOp == HashOp.RIPEMD160) {
            return Bytes.fromBytes32(ripemd160(data));
        }

        if (hashOp == HashOp.BITCOIN) {
            bytes32 hash = sha256(data);
            return Bytes.fromBytes32(ripemd160(Bytes.fromBytes32(hash)));
        }
        revert("Unsupported hashop");
    }

    fun doLength(LengthOp lengthOp, [Uint8]   data)
         
        
        : ([Uint8]  )
    {
        if (lengthOp == LengthOp.NO_PREFIX) {
            return data;
        }
        if (lengthOp == LengthOp.VAR_PROTO) {
            return abi.encodePacked(encodeVarintProto(uint64(data.length)), data);
        }
        if (lengthOp == LengthOp.REQUIRE_32_BYTES) {
            require(data.length == 32, "Expected 32 [Uint8]");
            return data;
        }
        if (lengthOp == LengthOp.REQUIRE_64_BYTES) {
            require(data.length == 64, "Expected 64 [Uint8]");
            return data;
        }
        revert("Unsupported lengthop");
    }

    fun encodeVarintProto(uint64 n)    : ([Uint8]  ) {
        // Count the number of groups of 7 bits
        // We need this pre-processing step since Solidity doesn't allow dynamic   resizing
        uint64 tmp = n;
        uint64 num_bytes = 1;
        while (tmp > 0x7F) {
            tmp = tmp >> 7;
            num_bytes += 1;
        }

        [Uint8]   buf = new [Uint8](num_bytes);

        tmp = n;
        for (uint64 i = 0; i < num_bytes; i++) {
            // Set the first bit in the byte for each group of 7 bits
            buf[i] = bytes1(0x80 | uint8(tmp & 0x7F));
            tmp = tmp >> 7;
        }
        // Unset the first bit of the last byte
        buf[num_bytes - 1] &= 0x7F;

        return buf;
    }

    fun verify(
        ExistenceProof   proof,
        ProofSpec   spec,
        [Uint8]   root,
        [Uint8]   key,
        [Uint8]   value
    )    {
        checkAgainstSpec(proof, spec);
        require(
            Bytes.equals(proof.key, key),
            "Provided key doesn't match proof"
        );
        require(
            Bytes.equals(proof.value, value),
            "Provided value doesn't match proof"
        );
        require(
            Bytes.equals(calculate(proof), root),
            "Calculcated root doesn't match provided root"
        );
    }

    fun checkAgainstSpec(ExistenceProof   proof, ProofSpec   spec)
        private
        
    {
        checkAgainstSpecLeafOp(proof.leaf, spec);
        require(
            spec.minDepth == 0 || proof.path.length >= uint256(spec.minDepth),
            "InnerOps depth too short"
        );
        require(
            spec.maxDepth == 0 || proof.path.length >= uint256(spec.maxDepth),
            "InnerOps depth too short"
        );

        for (uint256 i = 0; i < proof.path.length; i++) {
            checkAgainstSpecInnerOp(proof.path[i], spec);
        }
    }

    // Calculate determines the root hash that matches the given proof.
    // You must validate the result is what you have in a header.
    // Returns error if the calculations cannot be performed.
    fun calculate(ExistenceProof   p)
         
        
        : ([Uint8]  )
    {
        // leaf step takes the key and value as input
        [Uint8]   res = applyValueLeafOp(p.leaf, p.key, p.value);

        // the rest just take the output of the last step (reducing it)
        for (uint256 i = 0; i < p.path.length; i++) {
            res = applyValueInnerOp(p.path[i], res);
        }
        return res;
    }
}
