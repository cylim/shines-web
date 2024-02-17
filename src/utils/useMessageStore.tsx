import type { DecodedMessage } from '@xmtp/xmtp-js'
import { useCallback, useReducer } from 'react'
import { MessageStoreEvent } from './XmtpContext'

type MessageDeduper = (message: DecodedMessage) => boolean
type MessageStore = { [address: string]: DecodedMessage[] }

const buildMessageDeduper = (state: DecodedMessage[]): MessageDeduper => {
  const existingMessageKeys = state.map((msg) => msg.id)

  return (msg: DecodedMessage) => existingMessageKeys.indexOf(msg.id) === -1
}

const useMessageStore = () => {
  const [messageStore, dispatchMessages] = useReducer(
    (state: MessageStore, { conversationId, messages }: MessageStoreEvent) => {
      const existing = state[conversationId] || []
      const newMessages = messages.filter(buildMessageDeduper(existing))
      if (!newMessages.length) {
        return state
      }
      console.log('Dispatching new messages for peer address', conversationId)

      return {
        ...state,
        [conversationId]: existing.concat(newMessages),
      }
    },
    {}
  )

  const getMessages = useCallback((conversationId: string) => messageStore[conversationId] || [], [messageStore])

  return {
    getMessages,
    dispatchMessages,
  }
}

export default useMessageStore
