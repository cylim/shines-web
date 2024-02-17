import { useXmtp } from '@/utils/useXmtp'
import { useCallback } from 'react'
import ConversationsList from './ConversationList'
import MessagePanel from './MessagePanel'
import { extractAddress } from '@/utils/xmtp'
import { Button, CircularProgress } from '@nextui-org/react'
import { EmptyComponent } from '../EmptyComponent'
import { useAccount } from 'wagmi'
import { useEthersSigner } from '@/utils/ethers'
import { polygonMumbai } from 'viem/chains'
import { ConnectButton } from '@rainbow-me/rainbowkit'

type ChatPanelProps = {
  onClose?: () => void
  selected?: string | undefined
  setSelected?: any
}


export const ChatPanel = ({ onClose, selected, setSelected}: ChatPanelProps) => {
  const { isConnected, address } = useAccount()
  const signer = useEthersSigner({chainId: polygonMumbai.id})
  const { conversations, loadingConversations, client, connect } = useXmtp()

  const handleConnect = useCallback(async () => { 
    if(!signer) return
      await connect(signer)
  }, [connect, signer])

  const renderConversations = () => {
    if (!address || !client) {
      return (
        <div className={'flex flex-col'} >
          <a
          className={'text-center pb-2'}
            href={'https://xmtp.org'}
            target={'_blank'}
          >
            {'Powered by XMTP'}
          </a>
          <p >Sign In</p>
        </div>
      )
    }

    if (loadingConversations) {
      return (
        <div className={'flex flex-col items-center w-[100%] py-3'}>
          <CircularProgress />
        </div>
      )
    }

    return conversations?.length > 0 ? (
      <div className={'overflow-y-auto xs:max-height-[100%] max-height-[590px]'}>
        <ConversationsList conversations={conversations} onClick={setSelected} />
      </div>
    ) : (
      <EmptyComponent />
    )
  }

  const renderMessages = () => {
    if (!selected) {
      return null
    }
    if (address === extractAddress(selected)) {
      return <p className={'text-center'}>{`Can't chat with yourself`}</p>
    }
    if (!address || !extractAddress(selected)) {
      return <p className={'text-center'}>{'Sign in'}</p>
    }
    return (
      <div className={'overflow-y-auto xs:max-height-[100%] max-height-[590px] xs:min-height-[100%] min-height-[590px]'}>
        <MessagePanel conversationId={selected} key={selected} onConnect={handleConnect}  />
      </div>
    )
  }

  return (
    <div className={'flex flex-col'}>
        <div className={'flex flex-row justify-between py-1 px-2 border-b-1'}>
          {selected ? (
            <p >🔙</p>
          ) : null}
          <p className={'flex-1'} >
            {'Conversations'}
          </p>
          <p>X</p>
        </div>
      {!!selected ? renderMessages() : renderConversations()}
      {!client ? (
        <div className={'px-2 py-1 self-center'}>
          {isConnected ? <Button variant="faded" onClick={handleConnect}>
            {'Connect'}
          </Button> : <ConnectButton />}
        </div>
      ) : null}
    </div>
  )
}

export default ChatPanel
