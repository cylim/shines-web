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

  return <Link as={NextLink} href={`/avatars/${item.id}`} prefetch={true}>
    <div className="flex flex-col gap-2 border-slate-500 border-1 p-2 rounded-xl">
      <div className="font-semibold text-2xl grow flex flex-row items-start">
        <Image src={item.sourceUrl} height={240} width={240} className={'max-h-[240px] max-w-[240px] min-h-[240px] min-w-[240px]'} />
      </div>

      <div className={'flex flex-col flex-wrap justify-center gap-2 items-center'}>
        {/* <Button radius="full" onClick={createVideo} color={'primary'} className="w-[220px]">Create</Button> */}
        <Button radius="full"  color={'primary'} className="w-[234px]">View Prompts</Button>
        <Button radius="full" onClick={getFrame} color={'secondary'} className="w-[234px]">Frame</Button>
      </div>
    </div>

  </Link>
}