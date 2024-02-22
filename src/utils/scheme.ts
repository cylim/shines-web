import { AnyPublicationFragment, PublicationMetadataMediaVideoFragment } from "@lens-protocol/client"

type DatabaseRow = {
  timestamp: {
    seconds: number
  }
  id: string
}

export type Avatar = {
  address: string
  sourceUrl: string
  avatarUrl?: string
  description: string
  prompt?: string
  type?: string
} & DatabaseRow

export type Video = {
  address: string
  url: string
  type?: string
} & DatabaseRow

export type Prompt = {
  content: string
  fid: number
  generatedImageURL?: string
  address: string
  avatarPrompted: string
  displayName?: string
  username?: string
  profileImage?: string
  userData: any
} & DatabaseRow

export type Post = {
  id: string
  by: {
    id: string,
    ownedBy: {
      address: string
    }
  }
  metadata: {
    title: string,
    asset: PublicationMetadataMediaVideoFragment
  }
} 