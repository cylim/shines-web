import { useCallback, useEffect, useReducer, useState } from 'react'
import type { Conversation, DecodedMessage } from '@xmtp/xmtp-js'
import { Client } from '@xmtp/xmtp-js'
import { Signer } from 'ethers'
import useMessageStore from './useMessageStore'

import { createContext, Dispatch } from 'react'
import { fetchMostRecentMessage, getConversationId, getEnv, loadKeys, storeKeys, wipeKeys } from './xmtp'
import { toast } from 'react-hot-toast'
import { APP_NAME } from '@/utils/env'
import useLatestMessageStore from './useLatestMessageStore'
import { useAccount } from 'wagmi'
import { useEthersSigner } from './ethers'
import { polygonMumbai } from 'viem/chains'

export type MessageStoreEvent = {
  conversationId: string
  messages: DecodedMessage[]
}

export type XmtpContextType = {
  wallet: Signer | undefined
  address: `0x${string}` | undefined
  client: Client | undefined
  conversations: Conversation[]
  loadingConversations: boolean
  recentMessage: (conversationId: string) => DecodedMessage[]
  getMessages: (conversationId: string) => DecodedMessage[]
  dispatchMessages?: Dispatch<MessageStoreEvent>
  connect: (wallet: Signer) => void
  disconnect: () => void
}

export const XmtpContext = createContext<XmtpContextType>({
  wallet: undefined,
  address: undefined,
  client: undefined,
  conversations: [],
  loadingConversations: false,
  recentMessage: () => [],
  getMessages: () => [],
  connect: () => undefined,
  disconnect: () => undefined,
})

export const XmtpProvider = ({ children }: { children: JSX.Element }) => {
  const { address }= useAccount()
  const signer = useEthersSigner({chainId: polygonMumbai.id})
  const [wallet, setWallet] = useState<Signer>()
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false)
  const [client, setClient] = useState<Client>()
  const { getMessages, dispatchMessages } = useMessageStore()
  const { recentMessage, dispatchRecentMessages } = useLatestMessageStore()
  const [loadingConversations, setLoadingConversations] = useState<boolean>(false)

  const [conversations, dispatchConversations] = useReducer(
    (state: Conversation[], newConvos: Conversation[] | undefined) => {
      if (newConvos === undefined) {
        return []
      }
      newConvos = newConvos.filter(
        (convo) =>
          state.findIndex((otherConvo) => {
            return getConversationId(convo) === getConversationId(otherConvo)
          }) < 0 &&
          convo.peerAddress != client?.address &&
          getConversationId(convo).length < 84
      )
      return newConvos === undefined ? [] : state.concat(newConvos)
    },
    []
  )

  const connect = useCallback(async () => {
    if (signer && !client) {
      try {
        setIsRequestPending(true)
        let keys = loadKeys(address as string)
        if (!keys) {
          keys = await Client.getKeys(signer, {
            env: getEnv(),
          })
          storeKeys(address as string, keys)
        }
        const xmtp = await Client.create(null, {
          env: getEnv(),
          privateKeyOverride: keys,
          appVersion: `${APP_NAME}/v0.0.1`,
        })
        setClient(xmtp)
        setIsRequestPending(false)
      } catch (e) {
        toast('Failed to connect to XMTP network.')
        console.error(e)
        setClient(undefined)
        setIsRequestPending(false)
      }
    }
  }, [client, signer, address])

  const disconnect = useCallback(async () => {
    if (address) {
      wipeKeys(address)
    }
    setWallet(undefined)
    setClient(undefined)
    dispatchConversations(undefined)
  }, [address, setWallet, setClient, dispatchConversations])

  useEffect(() => {
    const checkLogin = async (address: string) => {
      const keys = loadKeys(address)
      if (!!keys) {
        signer ? connect() : disconnect()
      }
    }
    if (!isRequestPending && !!address) {
      checkLogin(address as string)
    }
  }, [signer, address, loadKeys, connect])

  useEffect(() => {
    const listConversations = async () => {
      if (!client) return
      setLoadingConversations(true)
      const convos = (await client.conversations.list()) ?? []
      convos.forEach(async (convo) => {
        const msg = await fetchMostRecentMessage(convo)
        dispatchRecentMessages({ conversationId: getConversationId(convo), messages: [msg.message as DecodedMessage] })
      })
      dispatchConversations(convos)
      setLoadingConversations(false)
    }
    listConversations()
  }, [client])

  useEffect(() => {
    const streamConversations = async () => {
      if (!client) return
      const stream = await client.conversations.stream()
      for await (const convo of stream) {
        dispatchConversations([convo])
      }
    }
    streamConversations()
  }, [client])

  const [providerState, setProviderState] = useState<XmtpContextType>({
    wallet,
    address,
    client,
    conversations,
    loadingConversations,
    recentMessage,
    getMessages,
    dispatchMessages,
    connect,
    disconnect,
  })

  useEffect(() => {
    setProviderState({
      wallet,
      address,
      client,
      conversations,
      loadingConversations,
      recentMessage,
      getMessages,
      dispatchMessages,
      connect,
      disconnect,
    })
  }, [
    wallet,
    address,
    client,
    conversations,
    loadingConversations,
    recentMessage,
    getMessages,
    dispatchMessages,
    connect,
    disconnect,
  ])

  return <XmtpContext.Provider value={providerState}>{children}</XmtpContext.Provider>
}

export default XmtpProvider
