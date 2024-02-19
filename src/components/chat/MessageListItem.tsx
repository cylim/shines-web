import { Avatar, Spacer } from '@nextui-org/react'
import { DecodedMessage } from '@xmtp/xmtp-js'
import Link from 'next/link'

type MessageListItemProps = {
  message: DecodedMessage
  nextMessage?: DecodedMessage
  isSender: boolean
}

export const MessageListItem = ({ isSender, message, nextMessage }: MessageListItemProps) => {
  const sameAuthor = message.senderAddress === nextMessage?.senderAddress

  if (!message) {
    return null
  }

  return (
    <div className={`flex flex-${isSender ? 'row-reverse' : 'row'} pb-${sameAuthor ? 1 : 2} items-end gap-1 ${isSender ? 'justify-end' : 'justify-start'}`}>
      {isSender || sameAuthor ? null : (
        <Link href={`/users/${message.senderAddress as string}`} passHref style={{ cursor: 'pointer' }}>
          <Avatar name={message.senderAddress as string} size='md' />
        </Link>
      )}
      {!isSender && sameAuthor ? <Spacer x={44} /> : null}
      <div className={'flex flex-col'}>
        <p className={`max-w-[260px] min-w-[40px] text-left mx-1 px-2 py-1 rounded-2xl bg-${isSender ? 'blue-600' : 'gray-200'} text-lg text-${isSender ? 'white' : 'black'}`}>
          {message.error ? `Error: ${message.error?.message}` : message.content}
        </p>
      </div>
    </div>
  )
}

export default MessageListItem
