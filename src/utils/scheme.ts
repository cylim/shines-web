export type Avatar = {
  address: string
  sourceUrl: string
  avatarUrl: string
  id: string
  prompt: string
  type: string
}

export type Video = {
  address: string
  id: string
  url: string
}

export type Prompt = {
  content: string
  fid: number
  address: string
  avatarPrompted: string
  userData: any
}