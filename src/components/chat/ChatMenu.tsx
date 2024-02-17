import { MouseEvent, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { isValidAddr, toChecksumAddress } from '@/utils/string'
import dynamic from 'next/dynamic'
import { Button, Menu } from '@nextui-org/react'
import { useAccount } from 'wagmi'

const ChatPanel = dynamic(() => import('@/components/chat/ChatPanel'), {
  suspense: false,
  ssr: false,
})

const ChatMenu = () => {
  const chatRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [selected, setSelected] = useState<string | undefined>(undefined)
  const { address } = useAccount()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    const route = `${pathname?.split('?')?.[0]}`
    router.push(route, undefined)
  }

  useEffect(() => {
    const chatModal = params.get('chatModal') || false
    const to = params.get('to') || undefined
    if (!!chatModal) {
      setAnchorEl(chatRef.current)
      if (isValidAddr(to as string)) {
        setSelected(toChecksumAddress(to as string))
      } else {
        setSelected(undefined)
      }
    }
  }, [params])

  if (!address) {
    return null
  }

  return (
    <>
      <Button onClick={handleClick} id={`chat-modal-btn`}
        key={`chat-modal-btn`}
        aria-controls={open ? 'chat-modal' : undefined}
        aria-haspopup="true"
        ref={chatRef}
        aria-expanded={open ? 'true' : undefined}>
        📬
      </Button>
      <Menu key={'chat-modal'}
        id={'chat-modal'}
        // anchorEl={anchorEl as any}
        // open={open}
        onClose={handleClose}
        className={'top-5 rounded-2xl'}
        >
        <div
          className={'flex flex-col items-center min-w-[360px] min-h-[640px] max-w-[360px] max-h-[640px] overflow-hidden'}
        >
          {open ? (
            <ChatPanel onClose={handleClose} selected={selected} setSelected={setSelected} />
          ) : null}
        </div>
      </Menu>
    </>
  )
}

export default ChatMenu
