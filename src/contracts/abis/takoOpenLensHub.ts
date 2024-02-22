const json = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "lensHub",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "lensFreeCollectModule",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "initMerkleRoot",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "AddressCanNotBeZero",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "target",
				"type": "address"
			}
		],
		"name": "AddressEmptyCode",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "AddressInsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BidIsClose",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BidTokenNotWhitelisted",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BidTypeNotAccept",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DurationLimitExceeded",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ETHTransferFailed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Expired",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "FailedInnerCall",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InsufficientInputAmount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotBidder",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotCurator",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotExpired",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotGovernance",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotProfileOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotReachedMinimum",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotWhitelisted",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ParamsInvalid",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "RateExceedsMaximum",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "SafeERC20FailedOperation",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SignatureExpired",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SignatureInvalid",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ToCuratorLimitExceeded",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "profileIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "bidToken",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "bidAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bidAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bidExpires",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "toCurators",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "curatorId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "curatorContentId",
						"type": "uint256"
					},
					{
						"internalType": "enum DataTypes.AuditStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "enum TakoLensHub.BidType",
						"name": "bidType",
						"type": "uint8"
					}
				],
				"indexed": false,
				"internalType": "struct TakoLensHub.Content",
				"name": "content",
				"type": "tuple"
			}
		],
		"name": "addBidEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "mirror",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "commentOn",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "bidToken",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "bidAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bidAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bidExpires",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "toCurators",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "curatorId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "curatorContentId",
						"type": "string"
					},
					{
						"internalType": "enum DataTypes.AuditStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "enum TakoLensHub.BidType",
						"name": "bidType",
						"type": "uint8"
					}
				],
				"indexed": false,
				"internalType": "struct TakoLensHub.MomokaContent",
				"name": "content",
				"type": "tuple"
			}
		],
		"name": "addBidMomokaEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "profileIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "bidToken",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "bidAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bidAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bidExpires",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "toCurators",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "curatorId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "curatorContentId",
						"type": "uint256"
					},
					{
						"internalType": "enum DataTypes.AuditStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "enum TakoLensHub.BidType",
						"name": "bidType",
						"type": "uint8"
					}
				],
				"indexed": false,
				"internalType": "struct TakoLensHub.Content",
				"name": "content",
				"type": "tuple"
			}
		],
		"name": "modifiBidEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "mirror",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "commentOn",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "bidToken",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "bidAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bidAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bidExpires",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "toCurators",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "curatorId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "curatorContentId",
						"type": "string"
					},
					{
						"internalType": "enum DataTypes.AuditStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "enum TakoLensHub.BidType",
						"name": "bidType",
						"type": "uint8"
					}
				],
				"indexed": false,
				"internalType": "struct TakoLensHub.MomokaContent",
				"name": "content",
				"type": "tuple"
			}
		],
		"name": "modifiBidMomokaEvent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "FEE_DENOMINATOR",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "curatorId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "v",
						"type": "uint8"
					},
					{
						"internalType": "bytes32",
						"name": "r",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "s",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					}
				],
				"internalType": "struct DataTypes.EIP712Signature",
				"name": "sig",
				"type": "tuple"
			}
		],
		"name": "auditBidComment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "curatorId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "v",
						"type": "uint8"
					},
					{
						"internalType": "bytes32",
						"name": "r",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "s",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					}
				],
				"internalType": "struct DataTypes.EIP712Signature",
				"name": "sig",
				"type": "tuple"
			}
		],
		"name": "auditBidMirror",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "curatorId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "v",
						"type": "uint8"
					},
					{
						"internalType": "bytes32",
						"name": "r",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "s",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					}
				],
				"internalType": "struct DataTypes.EIP712Signature",
				"name": "sig",
				"type": "tuple"
			}
		],
		"name": "auditBidPost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "profileIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "bidToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bidAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "toCurators",
						"type": "uint256[]"
					}
				],
				"internalType": "struct TakoLensHub.BidData",
				"name": "vars",
				"type": "tuple"
			},
			{
				"internalType": "enum TakoLensHub.BidType",
				"name": "bidType",
				"type": "uint8"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "bytes32[]",
						"name": "merkleProof",
						"type": "bytes32[]"
					}
				],
				"internalType": "struct DataTypes.MerkleVerifyData",
				"name": "verifyData",
				"type": "tuple"
			}
		],
		"name": "bid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "profileIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "bidToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bidAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "toCurators",
						"type": "uint256[]"
					}
				],
				"internalType": "struct TakoLensHub.BidData[]",
				"name": "vars",
				"type": "tuple[]"
			},
			{
				"internalType": "enum TakoLensHub.BidType[]",
				"name": "bidType",
				"type": "uint8[]"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "bytes32[]",
						"name": "merkleProof",
						"type": "bytes32[]"
					}
				],
				"internalType": "struct DataTypes.MerkleVerifyData",
				"name": "verifyData",
				"type": "tuple"
			}
		],
		"name": "bidBatch",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "mirror",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "commentOn",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "bidToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bidAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "toCurators",
						"type": "uint256[]"
					}
				],
				"internalType": "struct TakoLensHub.MomokaBidData",
				"name": "vars",
				"type": "tuple"
			},
			{
				"internalType": "enum TakoLensHub.BidType",
				"name": "bidType",
				"type": "uint8"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "bytes32[]",
						"name": "merkleProof",
						"type": "bytes32[]"
					}
				],
				"internalType": "struct DataTypes.MerkleVerifyData",
				"name": "verifyData",
				"type": "tuple"
			}
		],
		"name": "bidMomoka",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "mirror",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "commentOn",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "bidToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bidAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "toCurators",
						"type": "uint256[]"
					}
				],
				"internalType": "struct TakoLensHub.MomokaBidData[]",
				"name": "vars",
				"type": "tuple[]"
			},
			{
				"internalType": "enum TakoLensHub.BidType[]",
				"name": "bidType",
				"type": "uint8[]"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "bytes32[]",
						"name": "merkleProof",
						"type": "bytes32[]"
					}
				],
				"internalType": "struct DataTypes.MerkleVerifyData",
				"name": "verifyData",
				"type": "tuple"
			}
		],
		"name": "bidMomokaBatch",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "claimBackBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "indexArr",
				"type": "uint256[]"
			}
		],
		"name": "claimBackBidBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "claimBackBidMomoka",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "indexArr",
				"type": "uint256[]"
			}
		],
		"name": "claimBackBidMomokaBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "feeCollector",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "feeRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBidCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getContentByIndex",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "profileIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "bidToken",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "bidAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bidAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bidExpires",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "toCurators",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "curatorId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "curatorContentId",
						"type": "uint256"
					},
					{
						"internalType": "enum DataTypes.AuditStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "enum TakoLensHub.BidType",
						"name": "bidType",
						"type": "uint8"
					}
				],
				"internalType": "struct TakoLensHub.Content",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "enum TakoLensHub.BidType",
				"name": "bidType",
				"type": "uint8"
			}
		],
		"name": "getDisableAcceptType",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "getMinBidAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMomokaBidCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getMomokaContentByIndex",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "mirror",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "commentOn",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "bidToken",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "bidAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bidAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bidExpires",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "toCurators",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "curatorId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "curatorContentId",
						"type": "string"
					},
					{
						"internalType": "enum DataTypes.AuditStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "enum TakoLensHub.BidType",
						"name": "bidType",
						"type": "uint8"
					}
				],
				"internalType": "struct TakoLensHub.MomokaContent",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "isBidTokenWhitelisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "isGovernance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "isRelayerWhitelisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "curatorId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "relayer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "contentId",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "v",
						"type": "uint8"
					},
					{
						"internalType": "bytes32",
						"name": "r",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "s",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					}
				],
				"internalType": "struct DataTypes.EIP712Signature",
				"name": "sig",
				"type": "tuple"
			}
		],
		"name": "loanWithSig",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxDuration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxToCuratorCounter",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "merkleRoot",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool[]",
				"name": "disableAuditTypes",
				"type": "bool[]"
			}
		],
		"name": "setDisableAuditTypes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newsFeeCollector",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "newFeeRate",
				"type": "uint256"
			}
		],
		"name": "setFeeCollector",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "gov",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "whitelist",
				"type": "bool"
			}
		],
		"name": "setGovernance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "hub",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "collectModule",
				"type": "address"
			}
		],
		"name": "setLensContracts",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "max",
				"type": "uint256"
			}
		],
		"name": "setMaxDuration",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "newMerkelRoot",
				"type": "bytes32"
			}
		],
		"name": "setMerkleRoot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "min",
				"type": "uint256"
			}
		],
		"name": "setMinBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "counter",
				"type": "uint8"
			}
		],
		"name": "setToCuratorLimit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "min",
				"type": "uint256"
			},
			{
				"internalType": "bool[]",
				"name": "disableAuditTypes",
				"type": "bool[]"
			}
		],
		"name": "settings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "updateBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "updateBidMomoka",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "whitelist",
				"type": "bool"
			}
		],
		"name": "whitelistBidToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "relayer",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "whitelist",
				"type": "bool"
			}
		],
		"name": "whitelistRelayer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
] as const 

export default json;