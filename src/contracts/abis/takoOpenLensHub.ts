const json = [
    {
      "inputs": [
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
      "name": "ETHTransferFailed",
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
      "name": "NotTimeToClaimYet",
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
              "name": "contentId",
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
              "name": "bidTime",
              "type": "uint256"
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
            }
          ],
          "indexed": false,
          "internalType": "struct TakoOpenLensHub.Content",
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
              "name": "contentId",
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
              "name": "bidTime",
              "type": "uint256"
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
            }
          ],
          "indexed": false,
          "internalType": "struct TakoOpenLensHub.Content",
          "name": "content",
          "type": "tuple"
        }
      ],
      "name": "modifiBidEvent",
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
          "components": [
            {
              "internalType": "string",
              "name": "contentId",
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
            }
          ],
          "internalType": "struct TakoOpenLensHub.BidData",
          "name": "vars",
          "type": "tuple"
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
              "name": "contentId",
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
            }
          ],
          "internalType": "struct TakoOpenLensHub.BidData[]",
          "name": "vars",
          "type": "tuple[]"
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
      "inputs": [],
      "name": "curateDuration",
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
              "name": "contentId",
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
              "name": "bidTime",
              "type": "uint256"
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
            }
          ],
          "internalType": "struct TakoOpenLensHub.Content",
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
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "contentId",
          "type": "string"
        }
      ],
      "name": "loanWithRelayer",
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
      "inputs": [],
      "name": "rewardClaimProtectionDuration",
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
          "name": "duration",
          "type": "uint256"
        }
      ],
      "name": "setCurateDuration",
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
          "internalType": "bytes32",
          "name": "newMerkleRoot",
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
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        }
      ],
      "name": "setRewardClaimProtectionDuration",
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