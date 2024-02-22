import keccak from 'keccak'


export const truncate = (addr: string, count = 4): string => `${addr.substring(0, count + 2)}...${addr.substring(addr.length - count)}`


export const stripHexPrefix = (value: string): string => {
  return value.slice(0, 2) === '0x' ? value.slice(2) : value
}

export const toChecksumAddress = (address: string, chainId: string | null = null): string => {
  if (typeof address !== 'string') {
    return ''
  }
  if (address === 'aibot') {
    return 'aibot'
  }
  try {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      throw new Error(`Given address "${address}" is not a valid Ethereum address.`)
    }

    const stripAddress = stripHexPrefix(address).toLowerCase()
    const prefix = chainId != null ? chainId.toString() + '0x' : ''
    const keccakHash = keccak('keccak256')
      .update(prefix + stripAddress)
      .digest('hex')
    let checksumAddress = '0x'

    for (let i = 0; i < stripAddress.length; i++) {
      checksumAddress += parseInt(keccakHash[i], 16) >= 8 ? stripAddress[i].toUpperCase() : stripAddress[i]
    }

    return checksumAddress
  } catch (_) {
    return address
  }
}

export const isValidAddr = (address: string | undefined | null) => {
  if (!address) {
    return false
  }
  if (address === 'aibot') {
    return true
  }
  const re = /^0x[a-fA-F0-9]{40}$/
  return address?.match(re) || false
}
// Replace IPFS address
export const replaceIPFS = (url: string = '') => {
  return url
    .replace('ipfs://ipfs/', 'https://ipfs.io/ipfs/') // case: ipfs://ipfs/xyz/image.png
    .replace('ipfs://', 'https://ipfs.io/ipfs/') // case: ipfs://xyz/1.gif
}