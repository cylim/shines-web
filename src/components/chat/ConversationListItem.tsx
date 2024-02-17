import { DecodedMessage, Conversation } from '@xmtp/xmtp-js'
import { truncate } from '@/utils/string'
import { getConversationId } from '@/utils/xmtp'
import { Button, Kbd, Avatar } from '@nextui-org/react'

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
      className={`flex flex-row rounded-lg bg-${isSelected ? 'gray-200' : 'white'} m-1 cursor-pointer hover:bg-gray-500 p-1 items-center w-[calc(100% - 15px)]`}
      onClick={() => onClick(getConversationId(conversation))}
    >
      <div className={'flex flex-row items-center w-[100%]'}>
        <Avatar src={'#'} name={conversation.peerAddress} size={'md'} />
        <div className={'flex flex-col flex-1 px-1'}>
          {latestMessage?.conversation?.context?.conversationId && (
            <Kbd>
              {
                latestMessage?.conversation.context?.conversationId.split('/')?.[0] ??
                latestMessage?.conversation.context?.conversationId
              }
            </Kbd>
          )}
          <p className={'text-left '}>conversation.peerAddress</p>
              <p className="text-sm text-left">
            {latestMessage?.content ? truncate(latestMessage.content, 55) : 'No latest messages'}
              </p>
        </div>
        <p className={'text-xs self-start'}>
          {latestMessage?.sent && new Date(latestMessage?.sent as Date).toLocaleString()}
        </p>
      </div>
    </Button>
  )
}

export default ConversationListItem
