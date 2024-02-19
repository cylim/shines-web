import { DecodedMessage } from '@xmtp/xmtp-js'
import React, { MutableRefObject } from 'react'
import MessageListItem from './MessageListItem'
import { Kbd } from '@nextui-org/react'

export type MessageListProps = {
  messages: DecodedMessage[]
  walletAddress: string | undefined
  messagesEndRef: MutableRefObject<null>
}

const isOnSameDay = (d1?: Date, d2?: Date): boolean => {
  return d1?.toDateString() === d2?.toDateString()
}

const formatDate = (d?: Date) => d?.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const DateDivider = ({ date }: { date?: Date }): JSX.Element => (
  <div className='flex flex-row justify-center'>
    <Kbd className='text-center px-3 py-1 mx-1 my-2'>
      {formatDate(date)}
    </Kbd>
  </div>
)

const ConversationBeginningNotice = (): JSX.Element => {
  return (
    <div className={'items-center justify-center pb-4'}>
      <p className={'text-center text-xs'}>
        {'Messages start here'}
      </p>
    </div>
  )
}

const MessageList = ({ messages, walletAddress, messagesEndRef }: MessageListProps): JSX.Element => {
  let lastMessageDate: Date | undefined

  const renderMessage = (msg: DecodedMessage, index: number) => {
    const isSender = msg.senderAddress === walletAddress
    const dateHasChanged = !isOnSameDay(lastMessageDate, msg.sent)
    lastMessageDate = msg.sent

    return (
      <div key={msg.id} className={'flex flex-col gap-2'}>
        {dateHasChanged ? <DateDivider date={msg.sent} /> : null}
        <MessageListItem
          message={msg}
          isSender={isSender}
          nextMessage={index < messages.length ? messages[index + 1] : undefined}
        />
      </div>
    )
  }

  return (
    <div
      className={'flex flex-1 flex-col self-end w-[100%] overflow-y-scroll max-h-[calc(100vh - 140px)] sm:max-h-[500px] '}
    >
          <ConversationBeginningNotice />
          {messages?.map(renderMessage)}
          <div ref={messagesEndRef} />
    </div>
  )
}
export default React.memo(MessageList)
