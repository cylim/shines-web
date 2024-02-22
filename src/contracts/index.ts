import {
  polygonMumbai
} from 'viem/chains';

import takoOpenLensHub from './abis/takoOpenLensHub'

export type SupportedNetworks = 'typeDef' | 'Polygon Mumbai'
type SupportedContracts = 'takoOpenLensHub'

interface IContract {
  address: string
  abi: any
  chainId: number
}

export const Contracts = {
  [polygonMumbai.name]: {
    takoOpenLensHub: {
      address: '0xC158A4319BC125e315120DbDfBEa8b8343aa3234',
      abi: takoOpenLensHub,
      chainId: polygonMumbai.id,
    },
  },
  'typeDef': {
    takoOpenLensHub: {
      address: '0xAbc' as `0x${string}`,
      abi: takoOpenLensHub,
      chainId: 0 as number,
    },
  },
} as const satisfies {[key in SupportedNetworks]: {[key in SupportedContracts]: IContract}}

export default Contracts


// "a","0xAbB840EF2f94925e957B6680541793565d63f228",1704379627
