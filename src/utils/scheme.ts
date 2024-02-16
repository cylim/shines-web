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