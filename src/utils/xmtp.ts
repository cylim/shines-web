import { Conversation, DecodedMessage, SortDirection } from '@xmtp/xmtp-js'

const ENCODING = 'binary'

export const getEnv = (): 'dev' | 'production' => {
  const envVar = process.env.NEXT_PUBLIC_XMTP_ENVIRONMENT || 'dev'
  if (envVar === 'production') {
    return envVar
  }
  return 'production'
}

export const buildLocalStorageKey = (walletAddress: string) => `xmtp:${getEnv()}:keys:${walletAddress}`

export const loadKeys = (walletAddress: string): Uint8Array | null => {
  const val = localStorage.getItem(buildLocalStorageKey(walletAddress))
  return val ? Buffer.from(val, ENCODING) : null
}

export const storeKeys = (walletAddress: string, keys: Uint8Array) => {
  localStorage.setItem(buildLocalStorageKey(walletAddress), Buffer.from(keys).toString(ENCODING))
}

export const wipeKeys = (walletAddress: string) => {
  localStorage.removeItem(buildLocalStorageKey(walletAddress))
}

export const extractAddress = (conversationId: string | undefined): string | undefined => {
  if (!conversationId) {
    return undefined
  }
  if (conversationId.includes('/')) {
    return conversationId.split('/')[0]
  }
  return conversationId
}

export const getConversationId = (conversation?: Conversation): string => {
  return conversation?.context?.conversationId
    ? `${conversation?.peerAddress}/${conversation?.context?.conversationId}`
    : conversation?.peerAddress ?? ''
}

export const extractId = (conversationId: string): string => {
  if (conversationId.includes('/')) {
    return conversationId.split('/').slice(1).join('/')
  }

  return ''
}

export const fetchMostRecentMessage = async (
  convo: Conversation
): Promise<{ key: string; message?: DecodedMessage }> => {
  const key = getConversationId(convo)
  const newMessages = await convo?.messages({
    limit: 1,
    direction: SortDirection.SORT_DIRECTION_DESCENDING,
  })

  if (!newMessages?.length) {
    return { key }
  }
  return { key, message: newMessages[0] }
}
