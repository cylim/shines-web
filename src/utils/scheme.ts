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
  fid: string
  address: string
  avatarPrompted: string
}