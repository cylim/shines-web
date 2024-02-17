import type { DecodedMessage } from '@xmtp/xmtp-js'
import { useCallback, useReducer } from 'react'
import { MessageStoreEvent } from './XmtpContext'

type MessageStore = { [address: string]: DecodedMessage[] }

const useLatestMessageStore = () => {
  const [messageStore, dispatchRecentMessages] = useReducer(
    (state: MessageStore, { conversationId, messages }: MessageStoreEvent) => {
      console.log('Dispatching new messages for peer address', conversationId)

      return {
        ...state,
        [conversationId]: messages,
      }
    },
    {}
  )

  const recentMessage = useCallback((conversationId: string) => messageStore[conversationId] || [], [messageStore])

  return {
    recentMessage,
    dispatchRecentMessages,
  }
}

export default useLatestMessageStore
