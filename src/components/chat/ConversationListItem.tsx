import { DecodedMessage, Conversation } from '@xmtp/xmtp-js'
import { truncate } from '@/utils/string'
import { getConversationId } from '@/utils/xmtp'
import { Button, Kbd, User } from '@nextui-org/react'

type ConversationListItemProps = {
  conversation: Conversation
  isSelected: boolean
  latestMessage: DecodedMessage | undefined
  onClick?: (address: string) => void
}

export const ConversationListItem = ({
  conversation,
  isSelected,
  latestMessage,
  onClick = () => { },
}: ConversationListItemProps) => {
  if (!conversation || !latestMessage) {
    return null
  }

  return (
    <Button
      className={`flex flex-col min-h-24 items-center rounded-lg p-4 bg-${isSelected ? 'gray-200' : 'gray-500'} m-1 cursor-pointer hover:bg-gray-500`}
      onClick={() => onClick(getConversationId(conversation))}
    >
      <div className={'flex flex-row justify-between items-center w-[100%]'}>
        <User name={truncate(conversation.peerAddress, 4)} classNames={{ name: 'font-semibold' }} />
        <p className={'text-xs font-semibold'}>
          {latestMessage?.sent && new Date(latestMessage?.sent as Date).toDateString()}
        </p>
      </div>
      <div className={'flex flex-col flex-1 px-1'}>
        {latestMessage?.conversation?.context?.conversationId && (
          <Kbd>
            {
              latestMessage?.conversation.context?.conversationId.split('/')?.[0] ??
              latestMessage?.conversation.context?.conversationId
            }
          </Kbd>
        )}
        <p className="text-sm text-left">
          {latestMessage?.content ? truncate(latestMessage.content, 16) : 'No latest messages'}
        </p>
      </div>
    </Button>
  )
}

export default ConversationListItem
