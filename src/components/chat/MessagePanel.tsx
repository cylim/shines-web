import { useXmtp } from '@/utils/useXmtp'
import { useCallback, useEffect, useRef, useState } from 'react'
import useConversation from '@/utils/useConversation'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { toChecksumAddress } from '@/utils/string'
import { extractAddress } from '@/utils/xmtp'
import { Button, CircularProgress } from '@nextui-org/react'

interface MessagePanelProps {
  conversationId: string
  onConnect?: () => Promise<void>
}

export const MessagePanel = ({ conversationId, onConnect }: MessagePanelProps) => {
  const [error, setError] = useState<string | undefined>(undefined)
  const { address, client } = useXmtp()
  const messagesEndRef = useRef(null)
  const scrollToMessagesEndRef = useCallback(() => {
    ; (messagesEndRef.current as any)?.scrollIntoView({ behavior: 'smooth' })
  }, [messagesEndRef])
  const { messages, sendMessage, loading } = useConversation(conversationId, scrollToMessagesEndRef)

  const hasMessages = messages.length > 0
  useEffect(() => {
    if (!hasMessages) return
    const initScroll = () => {
      scrollToMessagesEndRef()
    }
    initScroll()
  }, [conversationId, hasMessages, scrollToMessagesEndRef])

  const checkIfOnNetwork = useCallback(
    async (address: string): Promise<boolean> => {
      return client?.canMessage(address) || false
    },
    [client]
  )

  useEffect(() => {
    async function check() {
      if (await checkIfOnNetwork(toChecksumAddress(extractAddress(conversationId) as string))) {
        setError(undefined)
      } else {
        setError('Both user must be XMTP users.')
      }
    }

    if (!!conversationId) {
      check()
    }
  }, [conversationId, checkIfOnNetwork])

  if (loading && !messages?.length) {
    return <CircularProgress size='lg' />
  }

  if (!conversationId || !address || !client) {
    return (
      <div className={'items-center pt-2'}>
        <p>
          {conversationId ? 'Login' : 'Select'}
        </p>
        <p >{conversationId ? '' : 'Start'}</p>
        {!client ? (
          <Button variant="faded" onClick={onConnect} className={'mt-2'}>
            {'Connect'}
          </Button>
        ) : null}
      </div>
    )
  }

  return (
    <div className={`flex flex-col overflow-y-hidden px-1 max-h-[calc(100vh - 90px)] sm:max-h-[590px] min-h-[calc(100vh - 90px)] sm:min-h-[590px]`}
    >
      {!!error && (
        <div className={'items-center'}>
          <p className={'py-2'}>
            {error}
          </p>
        </div>
      )}
      <MessageList
        messagesEndRef={messagesEndRef}
        messages={messages}
        walletAddress={address}
      />
      {address && <MessageInput onSend={sendMessage} scrollRef={scrollToMessagesEndRef} />}
    </div>
  )
}

export default MessagePanel
