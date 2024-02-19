import { MouseEvent, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { isValidAddr, toChecksumAddress } from '@/utils/string'
import dynamic from 'next/dynamic'
import { Button, Dropdown, DropdownMenu, DropdownTrigger, Menu, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { useAccount } from 'wagmi'

const ChatPanel = dynamic(() => import('@/components/chat/ChatPanel'), {
  suspense: false,
  ssr: false,
})

const ChatMenu = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [selected, setSelected] = useState<string | undefined>(undefined)
  const { address } = useAccount()
  const [open, setOpen] = useState(!!(params.get('to') || false))

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen)
    if(!isOpen) {
      setSelected(undefined)
      const route = `${pathname?.split('?')?.[0]}`
      router.replace(route, undefined)
    }
  }

  const handleClose = () => {
    handleOpen(false)
  }

  useEffect(() => {
    const to = params.get('to') || undefined
    if (isValidAddr(to)) {
      setOpen(true)
      setSelected(toChecksumAddress(to as string))
    }
  }, [params])

  if (!address) {
    return null
  }

  return (
    <Popover isOpen={open} onOpenChange={handleOpen} placement="bottom" offset={12}>
      <PopoverTrigger>
        <Button>Chat</Button>
      </PopoverTrigger>
      <PopoverContent className={'flex flex-col items-center min-w-[360px] min-h-[640px] max-w-[360px] max-h-[640px] overflow-hidden'}>
          <ChatPanel onClose={handleClose} selected={selected} setSelected={setSelected} />
      </PopoverContent>
    </Popover>
  )
}

export default ChatMenu
