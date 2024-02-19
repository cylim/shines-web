import { XmtpContext } from '@/utils/XmtpContext'
import type { Conversation, DecodedMessage } from '@xmtp/xmtp-js'
import { useSearchParams } from 'next/navigation'
import { useContext } from 'react'
import ConversationListItem from './ConversationListItem'
import { fetchMostRecentMessage, getConversationId } from '@/utils/xmtp'

type ConversationsListProps = {
  conversations: Conversation[]
  onClick?: (address: string) => void
}

const ConversationsList = ({ conversations, onClick = () => { } }: ConversationsListProps): JSX.Element => {
  const params = useSearchParams()
  const { recentMessage } = useContext(XmtpContext)
  const orderByLatestMessage = (a: Conversation, b: Conversation): number => {
    const aMsg = recentMessage(getConversationId(a))
    const bMsg = recentMessage(getConversationId(b))
    const aDate = aMsg?.[0]?.sent || 0
    const bDate = bMsg?.[0]?.sent || 0

    return +aDate < +bDate ? 1 : -1
  }

  return (
    <>
      {conversations &&
        conversations.sort(orderByLatestMessage).map((convo) => {
          const isSelected = params.get('to') == convo.peerAddress
          return (
            <ConversationListItem
              key={getConversationId(convo)}
              conversation={convo}
              latestMessage={recentMessage(getConversationId(convo))?.[0]}
              isSelected={isSelected}
              onClick={onClick}
            />
          )
        })}
    </>
  )
}

export default ConversationsList
