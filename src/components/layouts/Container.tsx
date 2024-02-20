import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { useState } from "react"
import { useAccount } from "wagmi"
import NextLink from 'next/link'
import dynamic from "next/dynamic";

const CreateModal = dynamic(async () => (await import('@/components/avatar/CreateModal')).CreateModal, { ssr: false })


export const Container = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useAccount()
  const [open, setOpen] = useState(false)

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen)
  }

  return (<>
    <main className={
      `flex flex-col justify-start items-center w-[100%] container bg-gray-900 text-white rounded-3xl p-10`}
      >
      {children}
    </main>
    {!isConnected ? null : <Popover isOpen={open} onOpenChange={handleOpen} placement="bottom" offset={12}>
      <PopoverTrigger className="fixed right-5 bottom-5">
        <Button radius="full" className="py-10 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg text-4xl">+</Button>
      </PopoverTrigger>
      <PopoverContent className={'flex flex-col gap-2 items-center overflow-hidden bg-transparent border-0 shadow-none'}>
        <Button className={'text-xl py-4 px-8'} as={NextLink} color="primary" href="/create">New Video</Button>
        <Button className={'text-xl py-4 px-8'} as={NextLink} color="primary" href="?avatar=true">New Avatar</Button>
      </PopoverContent>
    </Popover>}
    {!isConnected ? null : <CreateModal />}
  </>
  )
}