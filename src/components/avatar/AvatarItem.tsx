'use client'
import { Button, Card, Image, Link } from "@nextui-org/react";
import { Avatar } from "@/utils/scheme";
import toast from "react-hot-toast";
import { HOST } from "@/utils/env";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import NextLink from 'next/link'

export const AvatarItem = ({ item }: { item: Avatar}) => {
  const router = useRouter()

  const getFrame = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(`${HOST}/frames/${item.id}`);
      toast.success('Copied')

    } catch (err: any) {
      toast.error('Failed to copy frame url: ', err.message)
    }
  }

  const createVideo = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`create?avatar_id=${item.id}`)
  }

  return <Link as={NextLink} href={`avatars/${item.id}`}>
    <div className="flex flex-col gap-2 border-slate-500 border-1 p-2 rounded-xl">
      <div className="font-semibold text-2xl grow flex flex-row items-start">
        <Image src={item.sourceUrl} height={180} width={180} className={'max-h-[180px] max-w-[180px] min-h-[180px] min-w-[180px]'} />
      </div>

      <div className={'flex flex-col flex-wrap justify-center gap-2 items-center'}>
        {/* <Button radius="full" onClick={createVideo} color={'primary'} className="w-[220px]">Create</Button> */}
        <Button radius="full"  color={'primary'} className="w-[234px]">View Prompts</Button>
        <Button radius="full" onClick={getFrame} color={'secondary'} className="w-[234px]">Frame</Button>
      </div>
    </div>

  </Link>
}