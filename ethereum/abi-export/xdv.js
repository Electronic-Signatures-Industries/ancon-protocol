module.exports = {"VERSION":"1.0.0","XDVNFT":{"raw":{"abi":[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"address","name":"tokenERC20","type":"address"},{"internalType":"address","name":"verifierAddr","type":"address"}],"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event","signature":"0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event","signature":"0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event","signature":"0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event","signature":"0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"paidToContract","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paidToPaymentAddress","type":"uint256"}],"name":"ServiceFeePaid","type":"event","signature":"0xff781da90c6b849a72bafc99aedde3dff0b039f697f31c21e96d587accee2760"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event","signature":"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event","signature":"0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"paymentAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event","signature":"0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x095ea7b3"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x70a08231"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x42966c68"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x081812fc"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xe985e9c5"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x06fdde03"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x8da5cb5b"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x6352211e"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x5c975abb"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x715018a6"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x42842e0e"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xb88d4fde"},{"inputs":[],"name":"serviceFeeForContract","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xe53ae102"},{"inputs":[],"name":"serviceFeeForPaymentAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xc014b9da"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xa22cb465"},{"inputs":[],"name":"stablecoin","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xe9cbd822"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x01ffc9a7"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x95d89b41"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x23b872dd"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xf2fde38b"},{"inputs":[],"name":"verifierAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x18bdffbb"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setServiceFeeForPaymentAddress","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xb86be2ca"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setServiceFeeForContract","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x2c078e8d"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"string","name":"uri","type":"string"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function","signature":"0xd0def521"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function","signature":"0x150b7a02"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xc87b56dd"},{"inputs":[{"internalType":"address payable","name":"payee","type":"address"}],"name":"withdrawBalance","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x756af45f"}]},"address":{"ancon":"0x2188170aEaDb2fE193366bCE016fbf69fC6fC91D","rinkeby-fork":"0xEcf598C751c0e129e68BB4cF7580a88cB2f03B46","development":"0xBD2e3dd65AF202B55e03682b796dF7090E4A36eE"}},"AnconMetadataOwnableBridge":{"raw":{"abi":[{"inputs":[{"internalType":"address","name":"onlyOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"inputs":[],"name":"getIavlSpec","outputs":[{"components":[{"components":[{"internalType":"bool","name":"valid","type":"bool"},{"internalType":"enum ICS23.HashOp","name":"hash","type":"uint8"},{"internalType":"enum ICS23.HashOp","name":"prehash_key","type":"uint8"},{"internalType":"enum ICS23.HashOp","name":"prehash_value","type":"uint8"},{"internalType":"enum ICS23.LengthOp","name":"len","type":"uint8"},{"internalType":"bytes","name":"prefix","type":"bytes"}],"internalType":"struct ICS23.LeafOp","name":"leafSpec","type":"tuple"},{"components":[{"internalType":"uint256[]","name":"childOrder","type":"uint256[]"},{"internalType":"uint256","name":"childSize","type":"uint256"},{"internalType":"uint256","name":"minPrefixLength","type":"uint256"},{"internalType":"uint256","name":"maxPrefixLength","type":"uint256"},{"internalType":"bytes","name":"emptyChild","type":"bytes"},{"internalType":"enum ICS23.HashOp","name":"hash","type":"uint8"}],"internalType":"struct ICS23.InnerSpec","name":"innerSpec","type":"tuple"},{"internalType":"uint256","name":"maxDepth","type":"uint256"},{"internalType":"uint256","name":"minDepth","type":"uint256"}],"internalType":"struct ICS23.ProofSpec","name":"","type":"tuple"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0x27dcd78c"},{"inputs":[{"components":[{"internalType":"bool","name":"valid","type":"bool"},{"internalType":"bytes","name":"key","type":"bytes"},{"internalType":"bytes","name":"value","type":"bytes"},{"components":[{"internalType":"bool","name":"valid","type":"bool"},{"internalType":"enum ICS23.HashOp","name":"hash","type":"uint8"},{"internalType":"enum ICS23.HashOp","name":"prehash_key","type":"uint8"},{"internalType":"enum ICS23.HashOp","name":"prehash_value","type":"uint8"},{"internalType":"enum ICS23.LengthOp","name":"len","type":"uint8"},{"internalType":"bytes","name":"prefix","type":"bytes"}],"internalType":"struct ICS23.LeafOp","name":"leaf","type":"tuple"},{"components":[{"internalType":"bool","name":"valid","type":"bool"},{"internalType":"enum ICS23.HashOp","name":"hash","type":"uint8"},{"internalType":"bytes","name":"prefix","type":"bytes"},{"internalType":"bytes","name":"suffix","type":"bytes"}],"internalType":"struct ICS23.InnerOp[]","name":"path","type":"tuple[]"}],"internalType":"struct ICS23.ExistenceProof","name":"proof","type":"tuple"},{"components":[{"components":[{"internalType":"bool","name":"valid","type":"bool"},{"internalType":"enum ICS23.HashOp","name":"hash","type":"uint8"},{"internalType":"enum ICS23.HashOp","name":"prehash_key","type":"uint8"},{"internalType":"enum ICS23.HashOp","name":"prehash_value","type":"uint8"},{"internalType":"enum ICS23.LengthOp","name":"len","type":"uint8"},{"internalType":"bytes","name":"prefix","type":"bytes"}],"internalType":"struct ICS23.LeafOp","name":"leafSpec","type":"tuple"},{"components":[{"internalType":"uint256[]","name":"childOrder","type":"uint256[]"},{"internalType":"uint256","name":"childSize","type":"uint256"},{"internalType":"uint256","name":"minPrefixLength","type":"uint256"},{"internalType":"uint256","name":"maxPrefixLength","type":"uint256"},{"internalType":"bytes","name":"emptyChild","type":"bytes"},{"internalType":"enum ICS23.HashOp","name":"hash","type":"uint8"}],"internalType":"struct ICS23.InnerSpec","name":"innerSpec","type":"tuple"},{"internalType":"uint256","name":"maxDepth","type":"uint256"},{"internalType":"uint256","name":"minDepth","type":"uint256"}],"internalType":"struct ICS23.ProofSpec","name":"spec","type":"tuple"},{"internalType":"bytes","name":"root","type":"bytes"},{"internalType":"bytes","name":"key","type":"bytes"},{"internalType":"bytes","name":"value","type":"bytes"}],"name":"verify","outputs":[],"stateMutability":"pure","type":"function","constant":true,"signature":"0xb0d264e7"},{"inputs":[],"name":"whitelisted","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x3d9287fa"},{"inputs":[{"internalType":"string","name":"numString","type":"string"}],"name":"st2num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0x79cd9055"},{"inputs":[{"internalType":"bytes","name":"numBytes","type":"bytes"}],"name":"bytes2num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0xe6aa73d6"},{"inputs":[{"internalType":"bytes","name":"key","type":"bytes"},{"internalType":"bytes","name":"value","type":"bytes"},{"internalType":"bytes","name":"_prefix","type":"bytes"},{"internalType":"uint256[]","name":"_leafOpUint","type":"uint256[]"},{"internalType":"bytes[][]","name":"_innerOp","type":"bytes[][]"},{"internalType":"uint256","name":"existenceProofInnerOpHash","type":"uint256"}],"name":"convertProof","outputs":[{"components":[{"internalType":"bool","name":"valid","type":"bool"},{"internalType":"bytes","name":"key","type":"bytes"},{"internalType":"bytes","name":"value","type":"bytes"},{"components":[{"internalType":"bool","name":"valid","type":"bool"},{"internalType":"enum ICS23.HashOp","name":"hash","type":"uint8"},{"internalType":"enum ICS23.HashOp","name":"prehash_key","type":"uint8"},{"internalType":"enum ICS23.HashOp","name":"prehash_value","type":"uint8"},{"internalType":"enum ICS23.LengthOp","name":"len","type":"uint8"},{"internalType":"bytes","name":"prefix","type":"bytes"}],"internalType":"struct ICS23.LeafOp","name":"leaf","type":"tuple"},{"components":[{"internalType":"bool","name":"valid","type":"bool"},{"internalType":"enum ICS23.HashOp","name":"hash","type":"uint8"},{"internalType":"bytes","name":"prefix","type":"bytes"},{"internalType":"bytes","name":"suffix","type":"bytes"}],"internalType":"struct ICS23.InnerOp[]","name":"path","type":"tuple[]"}],"internalType":"struct ICS23.ExistenceProof","name":"","type":"tuple"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0xb9406360"},{"inputs":[{"internalType":"uint256[]","name":"leafOpUint","type":"uint256[]"},{"internalType":"bytes","name":"prefix","type":"bytes"},{"internalType":"bytes[][]","name":"existenceProofInnerOp","type":"bytes[][]"},{"internalType":"uint256","name":"existenceProofInnerOpHash","type":"uint256"},{"internalType":"bytes","name":"existenceProofKey","type":"bytes"},{"internalType":"bytes","name":"existenceProofValue","type":"bytes"}],"name":"requestRoot","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xedce7cdc"},{"inputs":[{"internalType":"uint256[]","name":"leafOpUint","type":"uint256[]"},{"internalType":"bytes","name":"prefix","type":"bytes"},{"internalType":"bytes[][]","name":"existenceProofInnerOp","type":"bytes[][]"},{"internalType":"uint256","name":"existenceProofInnerOpHash","type":"uint256"},{"internalType":"bytes","name":"existenceProofKey","type":"bytes"},{"internalType":"bytes","name":"existenceProofValue","type":"bytes"},{"internalType":"bytes","name":"root","type":"bytes"},{"internalType":"bytes","name":"key","type":"bytes"},{"internalType":"bytes","name":"value","type":"bytes"}],"name":"changeOwnerWithProof","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function","constant":true,"signature":"0xeb044b38"}]},"address":{"ancon":"0x202433a3bEa700D101059c7E9c3c9f5301dcACC1","rinkeby-fork":"0x77C51E844495899727dB63221af46220b0b13B37","development":"0xD65C06928c1A13d8175D236062a18256613e358E"}}}