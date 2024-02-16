type DatabaseRow = {
  timestamp: string
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
} & DatabaseRow

export type Prompt = {
  content: string
  fid: number
  address: string
  avatarPrompted: string
  displayName?: string
  username?: string
  profileImage?: string
  userData: any
} & DatabaseRow