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
        <div className={'flex flex-col h-96 items-center justify-center gap-4 pt-4'} >
          <a
            className={'text-center pb-2 text-lg'}
            href={'https://xmtp.org'}
            target={'_blank'}
          >
            {'Powered by XMTP'}
          </a>
          <p className={'text-center pb-2 text-lg'}>Sign In</p>
        </div>
      )
    }

    if (loadingConversations) {
      return (
        <div className={'flex flex-col h-96 justify-center items-center'}>
          <CircularProgress size="lg" />
        </div>
      )
    }

    return conversations?.length > 0 ? (
      <div className={'overflow-y-auto flex flex-col gap-2 w-[100%] max-w-[360px]'}>
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
      return <p className={'text-center text-lg'}>{`Can't chat with yourself`}</p>
    }
    if (!address || !extractAddress(selected)) {
      return <p className={'text-center text-lg'}>{'Sign in'}</p>
    }
    return (
      <div className={'overflow-y-auto xs:max-height-[100%] max-height-[580px] xs:min-height-[100%] min-height-[580px]'}>
        <MessagePanel conversationId={selected} key={selected} onConnect={handleConnect}  />
      </div>
    )
  }

  return (
    <div className={'flex flex-col min-w-[360px] min-h-[640px] max-w-[360px] max-h-[640px] overflow-hidden'}>
        <div className={'flex flex-row gap-4 justify-start p-4 border-b-1 items-center'}>
          {selected ? (
          <div className='cursor-pointer ' onClick={() => setSelected(undefined)}>⬅</div>
          ) : null}
          <p className={'flex-1 text-xl'} >
            {'Conversations'}
          </p>
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
