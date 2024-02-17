import { Conversation, DecodedMessage, Stream } from '@xmtp/xmtp-js'
import { useContext, useCallback, useState, useEffect } from 'react'
import { XmtpContext } from './XmtpContext'
import { extractAddress, extractId, getConversationId } from './xmtp'

type OnMessageCallback = () => void

const useConversation = (conversationId: string, onMessageCallback?: OnMessageCallback) => {
  const { client, getMessages, dispatchMessages } = useContext(XmtpContext)
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [stream, setStream] = useState<Stream<DecodedMessage>>()
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const getConvo = async () => {
      if (!client || !conversationId) {
        return
      }
      try {
        setConversation(
          await client.conversations.newConversation(
            extractAddress(conversationId) as string,
            conversationId.length > 42
              ? {
                conversationId: extractId(conversationId),
                metadata: {},
              }
              : undefined
          )
        )
      } catch (err) { }
    }
    getConvo()
  }, [client, conversationId])

  useEffect(() => {
    const closeStream = async () => {
      if (!stream) return
      await stream.return()
    }
    closeStream()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation])

  useEffect(() => {
    const listMessages = async () => {
      if (!conversation) return
      const id = getConversationId(conversation)
      console.log('Listing messages for conversation', id)
      setLoading(true)
      console.log('conversation', conversation)
      const msgs = await conversation.messages()
      console.log('msgs', msgs)
      if (dispatchMessages) {
        dispatchMessages({
          conversationId: id,
          messages: msgs,
        })
      }

      if (onMessageCallback) {
        onMessageCallback()
      }
      setLoading(false)
    }
    listMessages()
  }, [conversation, conversationId])

  useEffect(() => {
    const streamMessages = async () => {
      if (!conversation) return
      const stream = await conversation.streamMessages()
      setStream(stream)
      const id = getConversationId(conversation)
      for await (const msg of stream) {
        if (dispatchMessages) {
          dispatchMessages({
            conversationId: id,
            messages: [msg],
          })
        }

        if (onMessageCallback) {
          onMessageCallback()
        }
      }
    }
    streamMessages()
  }, [conversation])

  const handleSend = useCallback(
    async (message: string) => {
      if (!conversation) return
      await conversation.send(message)
    },
    [conversation]
  )

  return {
    conversation,
    loading,
    messages: getMessages(conversationId ?? ''),
    sendMessage: handleSend,
  }
}

export default useConversation
